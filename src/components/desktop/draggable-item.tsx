"use client";

import * as React from "react";
import { motion, useMotionValue } from "motion/react";
import { useDesktopGrid, GridPosition } from "./desktop-grid";
import { cn } from "@/lib/utils";

interface DraggableItemProps {
  id: string;
  initialPosition: GridPosition;
  children: React.ReactNode;
  className?: string;
  onDoubleClick?: () => void;
}

// Vérifie si deux rectangles se chevauchent
const checkCollision = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number },
): boolean => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

// Calcule le pourcentage de chevauchement entre deux rectangles
const getOverlapArea = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number },
): number => {
  const xOverlap = Math.max(
    0,
    Math.min(rect1.x + rect1.width, rect2.x + rect2.width) -
      Math.max(rect1.x, rect2.x),
  );
  const yOverlap = Math.max(
    0,
    Math.min(rect1.y + rect1.height, rect2.y + rect2.height) -
      Math.max(rect1.y, rect2.y),
  );
  return xOverlap * yOverlap;
};

export const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  initialPosition,
  children,
  className,
  onDoubleClick,
}) => {
  const {
    cellSize,
    gap,
    padding,
    gridRef,
    gridSize,
    registerItem,
    unregisterItem,
    updateItemPosition,
    getCoordsFromPosition,
    isPositionOccupied,
    setDraggingItem,
    setHoveredCell,
  } = useDesktopGrid();

  const [position, setPosition] = React.useState<GridPosition>(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  // Motion values pour le drag libre
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Enregistrer l'item au montage
  React.useEffect(() => {
    registerItem(id, initialPosition);
    return () => {
      unregisterItem(id);
    };
  }, [id, initialPosition, registerItem, unregisterItem]);

  // Calculer les coordonnées de la position actuelle
  const coords = getCoordsFromPosition(position);

  // Réinitialiser les motion values quand la position change
  React.useEffect(() => {
    if (!isDragging) {
      x.set(0);
      y.set(0);
    }
  }, [position, isDragging, x, y]);

  // Trouve la cellule avec la plus grande collision
  const findBestCollision = (): GridPosition | null => {
    const itemElement = itemRef.current;
    const gridElement = gridRef.current;

    if (!itemElement || !gridElement) return null;

    const itemRect = itemElement.getBoundingClientRect();
    const gridRect = gridElement.getBoundingClientRect();

    // Rectangle de l'élément en cours de drag (relatif à la grille)
    const draggedRect = {
      x: itemRect.left - gridRect.left,
      y: itemRect.top - gridRect.top,
      width: itemRect.width,
      height: itemRect.height,
    };

    let bestCell: GridPosition | null = null;
    let maxOverlap = 0;

    // Parcourir toutes les cellules de la grille
    for (let row = 0; row < gridSize.rows; row++) {
      for (let col = 0; col < gridSize.cols; col++) {
        // Rectangle de la cellule
        const cellRect = {
          x: padding + col * (cellSize + gap),
          y: padding + row * (cellSize + gap),
          width: cellSize,
          height: cellSize,
        };

        // Vérifier la collision
        if (checkCollision(draggedRect, cellRect)) {
          const overlap = getOverlapArea(draggedRect, cellRect);

          if (overlap > maxOverlap) {
            maxOverlap = overlap;
            bestCell = { row, col };
          }
        }
      }
    }

    return bestCell;
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setDraggingItem(id);
  };

  const handleDrag = () => {
    const collidingCell = findBestCollision();
    setHoveredCell(collidingCell);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggingItem(null);

    const newPosition = findBestCollision();

    if (newPosition && !isPositionOccupied(newPosition, id)) {
      const success = updateItemPosition(id, newPosition);
      if (success) {
        setPosition(newPosition);
      }
    }

    // Réinitialiser les valeurs de drag
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={itemRef}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x,
        y,
        position: "absolute",
        left: coords.x,
        top: coords.y,
        width: cellSize,
        height: cellSize,
      }}
      animate={{
        scale: isDragging ? 1.02 : 1,
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        },
      }}
      whileDrag={{
        zIndex: 100,
        cursor: "grabbing",
      }}
      onDoubleClick={onDoubleClick}
      className={cn(
        "cursor-grab select-none rounded-xl",
        isDragging ? "z-50" : "z-10",
        className,
      )}
    >
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );
};

export default DraggableItem;
