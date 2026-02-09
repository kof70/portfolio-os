"use client";
import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";

// Types
export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  position: WindowPosition;
  size: WindowSize;
  minSize?: WindowSize;
  maxSize?: WindowSize;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
}

// ---------------------------------------------------------------------------
// Actions context — stable callbacks, rarely changes
// ---------------------------------------------------------------------------
interface WindowActionsContextType {
  openWindow: (window: Omit<WindowState, "zIndex" | "isFocused">) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: WindowPosition) => void;
  updateWindowSize: (id: string, size: WindowSize) => void;
}

// ---------------------------------------------------------------------------
// State context — windows list, changes on every interaction
// ---------------------------------------------------------------------------
interface WindowStateContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  getWindow: (id: string) => WindowState | undefined;
  isWindowOpen: (id: string) => boolean;
}

// ---------------------------------------------------------------------------
// Combined type for backwards compatibility
// ---------------------------------------------------------------------------
type WindowContextType = WindowActionsContextType & WindowStateContextType;

const WindowActionsContext = createContext<WindowActionsContextType | null>(null);
const WindowStateContext = createContext<WindowStateContextType | null>(null);

/**
 * Use only when you need window actions (open, close, focus, etc.)
 * Does NOT cause re-renders when window state changes.
 */
export const useWindowActions = () => {
  const context = useContext(WindowActionsContext);
  if (!context) {
    throw new Error("useWindowActions must be used within a WindowProvider");
  }
  return context;
};

/**
 * Use only when you need window state (list, active window).
 * Re-renders when any window state changes.
 */
export const useWindowState = () => {
  const context = useContext(WindowStateContext);
  if (!context) {
    throw new Error("useWindowState must be used within a WindowProvider");
  }
  return context;
};

/**
 * Combined hook — backwards compatible with existing code.
 * Equivalent to using both useWindowActions + useWindowState.
 */
export const useWindows = (): WindowContextType => {
  const actions = useWindowActions();
  const state = useWindowState();
  return { ...actions, ...state };
};

interface WindowProviderProps {
  children: React.ReactNode;
}

export const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(100);

  // ---- Actions (stable callbacks) ----

  const openWindow = useCallback(
    (windowData: Omit<WindowState, "zIndex" | "isFocused">) => {
      setWindows((prev) => {
        const existingWindow = prev.find((w) => w.id === windowData.id);
        if (existingWindow) {
          return prev.map((w) =>
            w.id === windowData.id
              ? {
                  ...w,
                  isMinimized: false,
                  isFocused: true,
                  zIndex: highestZIndex + 1,
                }
              : { ...w, isFocused: false },
          );
        }

        const newWindow: WindowState = {
          ...windowData,
          isFocused: true,
          zIndex: highestZIndex + 1,
        };

        return [...prev.map((w) => ({ ...w, isFocused: false })), newWindow];
      });

      setHighestZIndex((prev) => prev + 1);
      setActiveWindowId(windowData.id);
    },
    [highestZIndex],
  );

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w,
      ),
    );
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: true } : w)),
    );
  }, []);

  const restoreWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? {
                ...w,
                isMinimized: false,
                isMaximized: false,
                isFocused: true,
                zIndex: highestZIndex + 1,
              }
            : { ...w, isFocused: false },
        ),
      );
      setHighestZIndex((prev) => prev + 1);
      setActiveWindowId(id);
    },
    [highestZIndex],
  );

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isFocused: true, zIndex: highestZIndex + 1 }
            : { ...w, isFocused: false },
        ),
      );
      setHighestZIndex((prev) => prev + 1);
      setActiveWindowId(id);
    },
    [highestZIndex],
  );

  const updateWindowPosition = useCallback(
    (id: string, position: WindowPosition) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, position } : w)),
      );
    },
    [],
  );

  const updateWindowSize = useCallback((id: string, size: WindowSize) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));
  }, []);

  // ---- State (derived) ----

  const getWindow = useCallback(
    (id: string) => {
      return windows.find((w) => w.id === id);
    },
    [windows],
  );

  const isWindowOpen = useCallback(
    (id: string) => {
      return windows.some((w) => w.id === id);
    },
    [windows],
  );

  // ---- Memoized context values ----

  const actionsValue = React.useMemo<WindowActionsContextType>(
    () => ({
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    }),
    [
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      focusWindow,
      updateWindowPosition,
      updateWindowSize,
    ],
  );

  const stateValue = React.useMemo<WindowStateContextType>(
    () => ({
      windows,
      activeWindowId,
      getWindow,
      isWindowOpen,
    }),
    [windows, activeWindowId, getWindow, isWindowOpen],
  );

  return (
    <WindowActionsContext.Provider value={actionsValue}>
      <WindowStateContext.Provider value={stateValue}>
        {children}
      </WindowStateContext.Provider>
    </WindowActionsContext.Provider>
  );
};

export default WindowProvider;
