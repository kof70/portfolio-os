"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";

// Types
export interface GridPosition {
  row: number;
  col: number;
}

export interface DesktopItemData {
  id: string;
  position: GridPosition;
}

interface DesktopGridContextType {
  gridSize: { rows: number; cols: number };
  cellSize: number;
  gap: number;
  padding: number;
  gridRef: React.RefObject<HTMLDivElement | null>;
  registerItem: (id: string, position: GridPosition) => void;
  unregisterItem: (id: string) => void;
  updateItemPosition: (id: string, newPosition: GridPosition) => boolean;
  isPositionOccupied: (position: GridPosition, excludeId?: string) => boolean;
  getPositionFromCoords: (x: number, y: number) => GridPosition;
  getCoordsFromPosition: (position: GridPosition) => { x: number; y: number };
  getItemPosition: (id: string) => GridPosition | undefined;
  setDraggingItem: (id: string | null) => void;
  setHoveredCell: (position: GridPosition | null) => void;
  draggingItemId: string | null;
  hoveredCell: GridPosition | null;
}

const DesktopGridContext = createContext<DesktopGridContextType | null>(null);

export const useDesktopGrid = () => {
  const context = useContext(DesktopGridContext);
  if (!context) {
    throw new Error("useDesktopGrid must be used within a DesktopGridProvider");
  }
  return context;
};

// Props
interface DesktopGridProps {
  children: React.ReactNode;
  rows?: number;
  cols?: number;
  cellSize?: number;
  gap?: number;
  padding?: number;
  className?: string;
}

export const DesktopGrid: React.FC<DesktopGridProps> = ({
  children,
  rows = 6,
  cols = 10,
  cellSize = 100,
  gap = 12,
  padding = 16,
  className,
}) => {
  const [items, setItems] = useState<Map<string, GridPosition>>(new Map());
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<GridPosition | null>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  // Enregistre un nouvel item
  const registerItem = useCallback((id: string, position: GridPosition) => {
    setItems((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, position);
      return newMap;
    });
  }, []);

  // Désenregistre un item
  const unregisterItem = useCallback((id: string) => {
    setItems((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  // Récupère la position d'un item
  const getItemPosition = useCallback(
    (id: string): GridPosition | undefined => {
      return items.get(id);
    },
    [items],
  );

  // Vérifie si une position est déjà occupée
  const isPositionOccupied = useCallback(
    (position: GridPosition, excludeId?: string): boolean => {
      for (const [id, pos] of items.entries()) {
        if (
          id !== excludeId &&
          pos.row === position.row &&
          pos.col === position.col
        ) {
          return true;
        }
      }
      return false;
    },
    [items],
  );

  // Trouve la position de grille la plus proche à partir des coordonnées absolues
  const getPositionFromCoords = useCallback(
    (x: number, y: number): GridPosition => {
      const gridRect = gridRef.current?.getBoundingClientRect();
      if (!gridRect) return { row: 0, col: 0 };

      const relativeX = x - gridRect.left - padding;
      const relativeY = y - gridRect.top - padding;

      const col = Math.max(
        0,
        Math.min(cols - 1, Math.round(relativeX / (cellSize + gap))),
      );
      const row = Math.max(
        0,
        Math.min(rows - 1, Math.round(relativeY / (cellSize + gap))),
      );

      return { row, col };
    },
    [cols, rows, cellSize, gap, padding],
  );

  // Convertit une position de grille en coordonnées pixels
  const getCoordsFromPosition = useCallback(
    (position: GridPosition): { x: number; y: number } => {
      return {
        x: padding + position.col * (cellSize + gap),
        y: padding + position.row * (cellSize + gap),
      };
    },
    [cellSize, gap, padding],
  );

  // Met à jour la position d'un élément (retourne true si réussi)
  const updateItemPosition = useCallback(
    (id: string, newPosition: GridPosition): boolean => {
      if (isPositionOccupied(newPosition, id)) {
        return false;
      }

      setItems((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, newPosition);
        return newMap;
      });
      return true;
    },
    [isPositionOccupied],
  );

  const setDraggingItem = useCallback((id: string | null) => {
    setDraggingItemId(id);
    if (id === null) {
      setHoveredCell(null);
    }
  }, []);

  const contextValue: DesktopGridContextType = {
    gridSize: { rows, cols },
    cellSize,
    gap,
    padding,
    gridRef,
    registerItem,
    unregisterItem,
    updateItemPosition,
    isPositionOccupied,
    getPositionFromCoords,
    getCoordsFromPosition,
    getItemPosition,
    setDraggingItem,
    setHoveredCell,
    draggingItemId,
    hoveredCell,
  };

  // Générer les cellules de la grille pour le highlight
  const renderGridCells = () => {
    if (!draggingItemId) return null;

    const cells = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isHovered = hoveredCell?.row === row && hoveredCell?.col === col;
        const isOccupied = isPositionOccupied({ row, col }, draggingItemId);

        cells.push(
          <div
            key={`cell-${row}-${col}`}
            className={`absolute rounded-xl transition-all duration-150 pointer-events-none ${
              isHovered
                ? isOccupied
                  ? "bg-red-500/30 border-2 border-red-500/50"
                  : "bg-white/20 border-2 border-white/40"
                : "bg-transparent"
            }`}
            style={{
              left: padding + col * (cellSize + gap),
              top: padding + row * (cellSize + gap),
              width: cellSize,
              height: cellSize,
            }}
          />,
        );
      }
    }
    return cells;
  };

  return (
    <DesktopGridContext.Provider value={contextValue}>
      <div
        ref={gridRef}
        className={`relative w-full h-full overflow-hidden ${className ?? ""}`}
      >
        {/* Cellules de highlight */}
        {renderGridCells()}

        {/* Items draggables */}
        {children}
      </div>
    </DesktopGridContext.Provider>
  );
};

export default DesktopGrid;
