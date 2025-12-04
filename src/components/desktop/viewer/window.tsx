"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useWindows, WindowState } from "./window-context";

interface WindowProps {
  window: WindowState;
  children?: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ window: windowState }) => {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindows();

  const windowRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [resizeDirection, setResizeDirection] = React.useState<string | null>(
    null,
  );
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

  // Position et taille avant maximisation (pour restaurer)
  const [preMaximizeState, setPreMaximizeState] = React.useState<{
    position: { x: number; y: number };
    size: { width: number; height: number };
  } | null>(null);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(windowState.id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(windowState.id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (windowState.isMaximized) {
      restoreWindow(windowState.id);
      if (preMaximizeState) {
        updateWindowPosition(windowState.id, preMaximizeState.position);
        updateWindowSize(windowState.id, preMaximizeState.size);
      }
    } else {
      setPreMaximizeState({
        position: windowState.position,
        size: windowState.size,
      });
      maximizeWindow(windowState.id);
    }
  };

  const handleFocus = () => {
    if (!windowState.isFocused) {
      focusWindow(windowState.id);
    }
  };

  // Drag handlers
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();

    // Si la fenêtre est maximisée, on la restaure d'abord
    if (windowState.isMaximized) {
      // Restaurer avec la position centrée sur le curseur
      const restoredWidth = preMaximizeState?.size.width || 800;
      const newX = e.clientX - restoredWidth / 2;
      const newY = e.clientY - 20; // 20px sous le curseur (milieu de la barre de titre)

      restoreWindow(windowState.id);
      if (preMaximizeState) {
        updateWindowSize(windowState.id, preMaximizeState.size);
      }
      updateWindowPosition(windowState.id, {
        x: Math.max(0, newX),
        y: Math.max(0, newY),
      });

      setDragOffset({
        x: restoredWidth / 2,
        y: 20,
      });
    } else {
      setDragOffset({
        x: e.clientX - windowState.position.x,
        y: e.clientY - windowState.position.y,
      });
    }

    setIsDragging(true);
    focusWindow(windowState.id);
  };

  // Resize handlers
  const handleResizeStart = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  // Global mouse move and up handlers
  React.useEffect(() => {
    if (!isDragging && !isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = Math.max(0, e.clientY - dragOffset.y);
        updateWindowPosition(windowState.id, { x: newX, y: newY });
      }

      if (isResizing && resizeDirection && windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        let newWidth = windowState.size.width;
        let newHeight = windowState.size.height;
        let newX = windowState.position.x;
        let newY = windowState.position.y;

        const minWidth = windowState.minSize?.width || 300;
        const minHeight = windowState.minSize?.height || 200;

        if (resizeDirection.includes("e")) {
          newWidth = Math.max(minWidth, e.clientX - rect.left);
        }
        if (resizeDirection.includes("w")) {
          const diff = rect.left - e.clientX;
          const possibleWidth = windowState.size.width + diff;
          if (possibleWidth >= minWidth) {
            newWidth = possibleWidth;
            newX = e.clientX;
          }
        }
        if (resizeDirection.includes("s")) {
          newHeight = Math.max(minHeight, e.clientY - rect.top);
        }
        if (resizeDirection.includes("n")) {
          const diff = rect.top - e.clientY;
          const possibleHeight = windowState.size.height + diff;
          if (possibleHeight >= minHeight) {
            newHeight = possibleHeight;
            newY = Math.max(0, e.clientY);
          }
        }

        updateWindowSize(windowState.id, {
          width: newWidth,
          height: newHeight,
        });
        if (
          newX !== windowState.position.x ||
          newY !== windowState.position.y
        ) {
          updateWindowPosition(windowState.id, { x: newX, y: newY });
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    dragOffset,
    resizeDirection,
    windowState.id,
    windowState.size,
    windowState.position,
    windowState.minSize,
    updateWindowSize,
    updateWindowPosition,
  ]);

  // Ne pas afficher si minimisé
  if (windowState.isMinimized) {
    return null;
  }

  return (
    <motion.div
      ref={windowRef}
      className={cn(
        "bg-neutral-900/95 backdrop-blur-xl rounded-xl overflow-hidden",
        "border border-white/10 shadow-2xl",
        "flex flex-col",
        windowState.isFocused ? "ring-1 ring-white/20" : "opacity-90",
      )}
      style={
        windowState.isMaximized
          ? {
              position: "fixed",
              top: 40,
              left: 4,
              right: 4,
              bottom: 100,
              width: "auto",
              height: "auto",
              zIndex: 150,
            }
          : {
              position: "absolute",
              left: windowState.position.x,
              top: windowState.position.y,
              width: windowState.size.width,
              height: windowState.size.height,
              zIndex: windowState.zIndex,
            }
      }
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onMouseDown={handleFocus}
    >
      {/* Title Bar */}
      <div
        className={cn(
          "h-11 flex items-center px-4 gap-3",
          "bg-neutral-800/80 border-b border-white/5",
          "select-none",
          !windowState.isMaximized && "cursor-grab",
          isDragging && "cursor-grabbing",
        )}
        onMouseDown={handleDragStart}
        onDoubleClick={handleMaximize}
      >
        {/* Traffic Lights */}
        <div
          className="flex items-center gap-2"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            className="group w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-2 h-2 text-[#990000] opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Minimize */}
          <button
            onClick={handleMinimize}
            className="group w-3 h-3 rounded-full bg-[#febc2
e] hover:bg-[#febc2e]/80 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-2 h-2 text-[#9a6700] opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>

          {/* Maximize */}
          <button
            onClick={handleMaximize}
            className="group w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-2 h-2 text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {windowState.isMaximized ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 9V5h10v10h-4M5 5h10v10H5z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4h16v16h-4"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center justify-center gap-2">
          {windowState.icon && (
            <div className="w-4 h-4">{windowState.icon}</div>
          )}
          <span className="text-white/80 text-sm font-medium truncate">
            {windowState.title}
          </span>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-14" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">{windowState.content}</div>

      {/* Resize Handles (only when not maximized) */}
      {!windowState.isMaximized && (
        <>
          {/* Edges */}
          <div
            className="absolute top-0 left-2 right-2 h-1 cursor-n-resize"
            onMouseDown={handleResizeStart("n")}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"
            onMouseDown={handleResizeStart("s")}
          />
          <div
            className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize"
            onMouseDown={handleResizeStart("w")}
          />
          <div
            className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize"
            onMouseDown={handleResizeStart("e")}
          />

          {/* Corners */}
          <div
            className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
            onMouseDown={handleResizeStart("nw")}
          />
          <div
            className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
            onMouseDown={handleResizeStart("ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
            onMouseDown={handleResizeStart("sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
            onMouseDown={handleResizeStart("se")}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;
