"use client";

import * as React from "react";
import { motion, useMotionValue } from "motion/react";
import { useDesktopGrid, GridPosition } from "./desktop-grid";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DraggableItemProps {
  id: string;
  initialPosition: GridPosition;
  children: React.ReactNode;
  className?: string;
  onDoubleClick?: () => void;
  onClick?: () => void;
  onContextMenu?: (e: React.MouseEvent | React.TouchEvent) => void;
  onPositionChange?: (id: string, position: GridPosition) => void;
  isSelected?: boolean;
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
  onClick,
  onContextMenu,
  onPositionChange,
  isSelected,
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

  const { isMobile } = useIsMobile();

  const [position, setPosition] = React.useState<GridPosition>(initialPosition);
  const [isDragging, setIsDragging] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const initialPositionRef = React.useRef<GridPosition>(initialPosition);

  // Long press state pour mobile
  const longPressTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const isLongPressRef = React.useRef(false);
  const touchStartPosRef = React.useRef<{ x: number; y: number } | null>(null);

  // Motion values pour le drag libre
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Constantes pour le long press
  const LONG_PRESS_DURATION = 500; // ms
  const MOVE_THRESHOLD = 10; // pixels

  // Mettre à jour la position si initialPosition change (ex: depuis le storage)
  React.useEffect(() => {
    if (
      initialPosition.row !== initialPositionRef.current.row ||
      initialPosition.col !== initialPositionRef.current.col
    ) {
      initialPositionRef.current = initialPosition;
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  // Enregistrer l'item au montage
  React.useEffect(() => {
    registerItem(id, position);
    const success = updateItemPosition(id, position);
    if (success) {
      setPosition(position);
    }
    return () => {
      unregisterItem(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, registerItem, unregisterItem]);

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
  const findBestCollision = React.useCallback((): GridPosition | null => {
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
  }, [gridRef, gridSize, cellSize, gap, padding]);

  // Nettoyer le timer de long press
  const clearLongPressTimer = React.useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  // Gestionnaire de début de touch (pour long press)
  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;

      const touch = e.touches[0];
      touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
      isLongPressRef.current = false;

      // Démarrer le timer de long press
      longPressTimerRef.current = setTimeout(() => {
        isLongPressRef.current = true;

        // Vibration tactile si disponible
        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(50);
        }

        // Déclencher le menu contextuel
        if (onContextMenu && touchStartPosRef.current) {
          const syntheticEvent = {
            preventDefault: () => {},
            stopPropagation: () => {},
            clientX: touchStartPosRef.current.x,
            clientY: touchStartPosRef.current.y,
          } as unknown as React.TouchEvent;

          onContextMenu(syntheticEvent);
        }
      }, LONG_PRESS_DURATION);
    },
    [isMobile, onContextMenu],
  );

  // Gestionnaire de mouvement touch
  const handleTouchMove = React.useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartPosRef.current) return;

      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartPosRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchStartPosRef.current.y);

      // Si le mouvement dépasse le seuil, annuler le long press
      if (deltaX > MOVE_THRESHOLD || deltaY > MOVE_THRESHOLD) {
        clearLongPressTimer();
      }
    },
    [clearLongPressTimer],
  );

  // Gestionnaire de fin de touch
  const handleTouchEnd = React.useCallback(() => {
    clearLongPressTimer();

    // Si c'était un long press, ne pas déclencher le click
    if (isLongPressRef.current) {
      isLongPressRef.current = false;
      return;
    }

    touchStartPosRef.current = null;
  }, [clearLongPressTimer]);

  // Nettoyer le timer au démontage
  React.useEffect(() => {
    return () => {
      clearLongPressTimer();
    };
  }, [clearLongPressTimer]);

  const handleDragStart = React.useCallback(() => {
    // Ne pas permettre le drag pendant un long press
    if (isLongPressRef.current) return;

    setIsDragging(true);
    setDraggingItem(id);
  }, [id, setDraggingItem]);

  const handleDrag = React.useCallback(() => {
    const collidingCell = findBestCollision();
    setHoveredCell(collidingCell);
  }, [findBestCollision, setHoveredCell]);

  const handleDragEnd = React.useCallback(() => {
    setIsDragging(false);
    setDraggingItem(null);

    const newPosition = findBestCollision();

    if (newPosition && !isPositionOccupied(newPosition, id)) {
      const success = updateItemPosition(id, newPosition);
      if (success) {
        setPosition(newPosition);
        // Notifier le parent du changement de position
        onPositionChange?.(id, newPosition);
      }
    }

    // Réinitialiser les valeurs de drag
    x.set(0);
    y.set(0);
  }, [id, findBestCollision, isPositionOccupied, updateItemPosition, onPositionChange, setDraggingItem, x, y]);

  const handleContextMenuInternal = React.useCallback(
    (e: React.MouseEvent) => {
      if (onContextMenu) {
        onContextMenu(e);
      }
    },
    [onContextMenu],
  );

  const handleClick = React.useCallback(() => {
    // Ne pas déclencher le click si c'était un long press
    if (isLongPressRef.current) return;
    onClick?.();
  }, [onClick]);

  const handleDoubleClick = React.useCallback(() => {
    // Ne pas déclencher le double click si c'était un long press
    if (isLongPressRef.current) return;
    onDoubleClick?.();
  }, [onDoubleClick]);

  return (
    <motion.div
      ref={itemRef}
      data-draggable-item={id}
      drag={!isMobile} // Désactiver le drag natif sur mobile (on utilise tap)
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
      whileTap={isMobile ? { scale: 0.95 } : undefined}
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      onContextMenu={handleContextMenuInternal}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "select-none rounded-xl transition-colors ease-in-out duration-150",
        !isMobile && "cursor-grab hover:bg-white/20",
        isMobile && "active:bg-white/20",
        "hover:border-[0.5px] border-white/10",
        isDragging ? "z-50" : "z-10",
        isSelected ? "hover:bg-white/30 bg-white/20 border-[0.5px]" : "",
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
