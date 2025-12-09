"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useWindows, WindowState } from "./window-context";

interface WindowProps {
  window: WindowState;
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
  const isDraggingRef = React.useRef(false);
  const isResizingRef = React.useRef(false);
  const resizeDirectionRef = React.useRef<string | null>(null);
  const dragOffsetRef = React.useRef({ x: 0, y: 0 });
  const animationFrameRef = React.useRef<number | null>(null);
  const prevMinimizedRef = React.useRef(windowState.isMinimized);

  // UI States
  const [isDragging, setIsDragging] = React.useState(false);
  const [isResizing, setIsResizing] = React.useState(false);
  const [animationState, setAnimationState] = React.useState<
    "entering" | "visible" | "minimizing" | "closing"
  >(windowState.isMinimized ? "visible" : "entering");

  // Position and size states
  const [currentPos, setCurrentPos] = React.useState(windowState.position);
  const [currentSize, setCurrentSize] = React.useState(windowState.size);
  const [isMaximizeAnimating, setIsMaximizeAnimating] = React.useState(false);

  // Pre-maximize state storage
  const [savedState, setSavedState] = React.useState<{
    position: { x: number; y: number };
    size: { width: number; height: number };
  } | null>(null);

  // Handle restore from minimize - detect when isMinimized changes from true to false
  React.useEffect(() => {
    const wasMinimized = prevMinimizedRef.current;
    const isNowMinimized = windowState.isMinimized;

    // Restoring from minimized state
    if (wasMinimized && !isNowMinimized) {
      setAnimationState("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationState("visible");
        });
      });
    }

    prevMinimizedRef.current = isNowMinimized;
  }, [windowState.isMinimized]);

  // Initial mount animation
  React.useEffect(() => {
    if (animationState === "entering" && !windowState.isMinimized) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimationState("visible");
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync with external state changes (but not during interactions)
  React.useEffect(() => {
    if (
      !isDraggingRef.current &&
      !isResizingRef.current &&
      !isMaximizeAnimating
    ) {
      setCurrentPos(windowState.position);
      setCurrentSize(windowState.size);
    }
  }, [windowState.position, windowState.size, isMaximizeAnimating]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimationState("closing");
    setTimeout(() => {
      closeWindow(windowState.id);
    }, 200);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimationState("minimizing");
    setTimeout(() => {
      minimizeWindow(windowState.id);
    }, 250);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximizeAnimating(true);

    if (windowState.isMaximized) {
      // Restore from maximized
      if (savedState) {
        setCurrentPos(savedState.position);
        setCurrentSize(savedState.size);

        setTimeout(() => {
          restoreWindow(windowState.id);
          updateWindowPosition(windowState.id, savedState.position);
          updateWindowSize(windowState.id, savedState.size);
          setIsMaximizeAnimating(false);
        }, 300);
      } else {
        restoreWindow(windowState.id);
        setIsMaximizeAnimating(false);
      }
    } else {
      // Maximize
      setSavedState({
        position: currentPos,
        size: currentSize,
      });

      const maxPos = { x: 0, y: 28 };
      const maxSize = {
        width: window.innerWidth,
        height: window.innerHeight - 108,
      };

      setCurrentPos(maxPos);
      setCurrentSize(maxSize);

      setTimeout(() => {
        maximizeWindow(windowState.id);
        setIsMaximizeAnimating(false);
      }, 300);
    }
  };

  const handleFocus = () => {
    if (!windowState.isFocused) {
      focusWindow(windowState.id);
    }
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();

    if (windowState.isMaximized) {
      // Unmaximize while dragging
      const restoredWidth = savedState?.size.width || 800;
      const restoredHeight = savedState?.size.height || 600;
      const newX = Math.max(0, e.clientX - restoredWidth / 2);
      const newY = Math.max(28, e.clientY - 20);

      setIsMaximizeAnimating(true);
      setCurrentSize({ width: restoredWidth, height: restoredHeight });
      setCurrentPos({ x: newX, y: newY });

      dragOffsetRef.current = { x: restoredWidth / 2, y: 20 };

      setTimeout(() => {
        restoreWindow(windowState.id);
        updateWindowSize(windowState.id, {
          width: restoredWidth,
          height: restoredHeight,
        });
        updateWindowPosition(windowState.id, { x: newX, y: newY });
        setIsMaximizeAnimating(false);
        isDraggingRef.current = true;
        setIsDragging(true);
      }, 200);
    } else {
      dragOffsetRef.current = {
        x: e.clientX - currentPos.x,
        y: e.clientY - currentPos.y,
      };
      isDraggingRef.current = true;
      setIsDragging(true);
    }

    focusWindow(windowState.id);
  };

  const handleResizeStart = (direction: string) => (e: React.MouseEvent) => {
    if (e.button !== 0 || windowState.isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    resizeDirectionRef.current = direction;
    setIsResizing(true);
    focusWindow(windowState.id);
  };

  // Mouse event handlers
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          const newX = e.clientX - dragOffsetRef.current.x;
          const newY = Math.max(28, e.clientY - dragOffsetRef.current.y);
          setCurrentPos({ x: newX, y: newY });
        });
      }

      if (isResizingRef.current && resizeDirectionRef.current) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          const direction = resizeDirectionRef.current!;
          const minW = windowState.minSize?.width || 300;
          const minH = windowState.minSize?.height || 200;

          let newW = currentSize.width;
          let newH = currentSize.height;
          let newX = currentPos.x;
          let newY = currentPos.y;

          if (direction.includes("e")) {
            newW = Math.max(minW, e.clientX - currentPos.x);
          }
          if (direction.includes("w")) {
            const delta = currentPos.x - e.clientX;
            if (currentSize.width + delta >= minW) {
              newW = currentSize.width + delta;
              newX = e.clientX;
            }
          }
          if (direction.includes("s")) {
            newH = Math.max(minH, e.clientY - currentPos.y);
          }
          if (direction.includes("n")) {
            const delta = currentPos.y - e.clientY;
            if (currentSize.height + delta >= minH && e.clientY >= 28) {
              newH = currentSize.height + delta;
              newY = e.clientY;
            }
          }

          setCurrentSize({ width: newW, height: newH });
          setCurrentPos({ x: newX, y: newY });
        });
      }
    };

    const handleMouseUp = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (isDraggingRef.current) {
        updateWindowPosition(windowState.id, currentPos);
        isDraggingRef.current = false;
        setIsDragging(false);
      }
      if (isResizingRef.current) {
        updateWindowSize(windowState.id, currentSize);
        updateWindowPosition(windowState.id, currentPos);
        isResizingRef.current = false;
        resizeDirectionRef.current = null;
        setIsResizing(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    windowState.id,
    windowState.minSize,
    currentPos,
    currentSize,
    updateWindowPosition,
    updateWindowSize,
  ]);

  // Don't render if minimized
  if (windowState.isMinimized) {
    return null;
  }

  // Animation styles based on state
  const getAnimationStyles = (): React.CSSProperties => {
    switch (animationState) {
      case "entering":
        return {
          transform: "scale(0.5)",
          opacity: 0,
          transition: "none",
        };

      case "closing":
        return {
          transform: "scale(0.85)",
          opacity: 0,
          transition:
            "transform 0.2s cubic-bezier(0.4, 0, 1, 1), opacity 0.2s ease-out",
        };

      case "minimizing":
        return {
          transform: "scale(0.5) translateY(50px)",
          opacity: 0,
          transition:
            "transform 0.25s cubic-bezier(0.4, 0, 1, 1), opacity 0.2s ease-out",
        };

      case "visible":
      default:
        return {
          transform: "scale(1)",
          opacity: 1,
          transition:
            isDragging || isResizing
              ? "none"
              : "transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.25s ease-out",
        };
    }
  };

  // Window positioning styles
  const positionStyles: React.CSSProperties =
    windowState.isMaximized && !isMaximizeAnimating
      ? {
          position: "fixed",
          left: 0,
          top: 28,
          width: "100%",
          height: "calc(100vh - 108px)",
          zIndex: windowState.zIndex,
          borderRadius: 0,
        }
      : {
          position: "fixed",
          left: currentPos.x,
          top: currentPos.y,
          width: currentSize.width,
          height: currentSize.height,
          zIndex: windowState.zIndex,
        };

  // Maximize/restore animation transition
  const layoutTransition = isMaximizeAnimating
    ? "left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
    : undefined;

  const animationStyles = getAnimationStyles();

  return (
    <div
      ref={windowRef}
      className={cn(
        "bg-black/20 backdrop-blur-2xl overflow-hidden",
        "border border-white/10 shadow-2xl shadow-black/50",
        "flex flex-col",
        windowState.isMaximized && !isMaximizeAnimating ? "" : "rounded-xl",
        windowState.isFocused
          ? "ring-1 ring-white/20 shadow-2xl"
          : "ring-0 opacity-95 shadow-xl",
        isDragging && "cursor-grabbing select-none",
        isResizing && "select-none",
      )}
      style={{
        ...positionStyles,
        ...animationStyles,
        transition: [layoutTransition, animationStyles.transition]
          .filter(Boolean)
          .join(", "),
        transformOrigin: "center center",
        willChange:
          isDragging ||
          isResizing ||
          isMaximizeAnimating ||
          animationState !== "visible"
            ? "transform, opacity, left, top, width, height"
            : "auto",
      }}
      onMouseDown={handleFocus}
    >
      {/* Title Bar */}
      <div
        className={cn(
          "h-12 flex items-center px-4 gap-3 shrink-0",
          "bg-neutral-800/90 border-b border-white/5",
          "select-none",
          !windowState.isMaximized && !isDragging && "cursor-grab",
          isDragging && "cursor-grabbing",
        )}
        onMouseDown={handleDragStart}
        onDoubleClick={handleMaximize}
      >
        {/* Traffic Light Buttons */}
        <div
          className="flex items-center gap-2 group/buttons"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className={cn(
              "size-4 rounded-full bg-[#ff5f57]",
              "flex items-center justify-center",
              "transition-all duration-150 ease-out",
              "hover:bg-[#ff4444] hover:scale-110",
              "active:scale-95 active:bg-[#cc4040]",
              "group-hover/buttons:shadow-sm",
            )}
            aria-label="Close"
          >
            <svg
              className="w-2 h-2 text-black/0 group-hover/buttons:text-black/60 transition-colors"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3l6 6M9 3l-6 6" />
            </svg>
          </button>

          <button
            onClick={handleMinimize}
            className={cn(
              "size-4  rounded-full bg-[#febc2e]",
              "flex items-center justify-center",
              "transition-all duration-150 ease-out",
              "hover:bg-[#f5a623] hover:scale-110",
              "active:scale-95 active:bg-[#cc8800]",
              "group-hover/buttons:shadow-sm",
            )}
            aria-label="Minimize"
          >
            <svg
              className="w-2 h-2 text-black/0 group-hover/buttons:text-black/60 transition-colors"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 6h8" />
            </svg>
          </button>

          <button
            onClick={handleMaximize}
            className={cn(
              "size-4  rounded-full bg-[#28c840]",
              "flex items-center justify-center",
              "transition-all duration-150 ease-out",
              "hover:bg-[#1db934] hover:scale-110",
              "active:scale-95 active:bg-[#17a02a]",
              "group-hover/buttons:shadow-sm",
            )}
            aria-label="Maximize"
          >
            <svg
              className="w-2 h-2 text-black/0 group-hover/buttons:text-black/60 transition-colors"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {windowState.isMaximized ? (
                <path d="M3 8V4h4M9 4v4H5" />
              ) : (
                <>
                  <path d="M2 2l3.5 3.5M10 10l-3.5-3.5" />
                  <path d="M6.5 2H2v4.5M5.5 10H10V5.5" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Title */}
        <div className="flex-1 flex items-center justify-center gap-2 min-w-0">
          {windowState.icon && (
            <div className="w-4 h-4 shrink-0">{windowState.icon}</div>
          )}
          <span className="text-white/80 text-sm font-medium truncate">
            {windowState.title}
          </span>
        </div>

        {/* Spacer for symmetry */}
        <div className="w-14" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto window-viewport">
        {windowState.content}
      </div>

      {/* Resize Handles */}
      {!windowState.isMaximized && (
        <>
          {/* Edge handles */}
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize hover:bg-white/10 transition-colors"
            onMouseDown={handleResizeStart("n")}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize hover:bg-white/10 transition-colors"
            onMouseDown={handleResizeStart("s")}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize hover:bg-white/10 transition-colors"
            onMouseDown={handleResizeStart("w")}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize hover:bg-white/10 transition-colors"
            onMouseDown={handleResizeStart("e")}
          />

          {/* Corner handles */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={handleResizeStart("nw")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={handleResizeStart("ne")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={handleResizeStart("sw")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={handleResizeStart("se")}
          />
        </>
      )}
    </div>
  );
};

export default Window;
