"use client";

import * as React from "react";

export interface WindowViewportSize {
  width: number;
  height: number;
}

export type WindowBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";

interface WindowViewportContextValue {
  size: WindowViewportSize;
  breakpoint: WindowBreakpoint;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  // Responsive helpers - true if window is at least this size
  isSmUp: boolean;
  isMdUp: boolean;
  isLgUp: boolean;
  isXlUp: boolean;
}

const WindowViewportContext =
  React.createContext<WindowViewportContextValue | null>(null);

/**
 * Hook to access the current window viewport dimensions and breakpoints.
 * Use this to make content responsive relative to the window size, not the screen.
 */
export const useWindowViewport = (): WindowViewportContextValue => {
  const context = React.useContext(WindowViewportContext);
  if (!context) {
    // Return default values if not within a WindowViewportProvider
    // This allows components to work outside of windows too
    return {
      size: { width: 800, height: 600 },
      breakpoint: "md",
      isXs: false,
      isSm: false,
      isMd: true,
      isLg: false,
      isXl: false,
      isSmUp: true,
      isMdUp: true,
      isLgUp: false,
      isXlUp: false,
    };
  }
  return context;
};

/**
 * Get the breakpoint name based on width
 */
const getBreakpoint = (width: number): WindowBreakpoint => {
  if (width < 400) return "xs";
  if (width < 600) return "sm";
  if (width < 800) return "md";
  if (width < 1000) return "lg";
  return "xl";
};

interface WindowViewportProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that tracks window viewport size using ResizeObserver.
 * Wrap your window content with this to enable useWindowViewport hook.
 */
export const WindowViewportProvider: React.FC<WindowViewportProviderProps> = ({
  children,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<WindowViewportSize>({
    width: 800,
    height: 600,
  });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    resizeObserver.observe(container);

    // Initial measurement
    const rect = container.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const breakpoint = getBreakpoint(size.width);

  const value: WindowViewportContextValue = React.useMemo(
    () => ({
      size,
      breakpoint,
      isXs: breakpoint === "xs",
      isSm: breakpoint === "sm",
      isMd: breakpoint === "md",
      isLg: breakpoint === "lg",
      isXl: breakpoint === "xl",
      isSmUp: size.width >= 400,
      isMdUp: size.width >= 600,
      isLgUp: size.width >= 800,
      isXlUp: size.width >= 1000,
    }),
    [size, breakpoint]
  );

  return (
    <div ref={containerRef} className="w-full h-full">
      <WindowViewportContext.Provider value={value}>
        {children}
      </WindowViewportContext.Provider>
    </div>
  );
};

export default useWindowViewport;
