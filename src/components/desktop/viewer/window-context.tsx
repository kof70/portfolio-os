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

interface WindowContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  openWindow: (window: Omit<WindowState, "zIndex" | "isFocused">) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: WindowPosition) => void;
  updateWindowSize: (id: string, size: WindowSize) => void;
  getWindow: (id: string) => WindowState | undefined;
  isWindowOpen: (id: string) => boolean;
}

const WindowContext = createContext<WindowContextType | null>(null);

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindows must be used within a WindowProvider");
  }
  return context;
};

interface WindowProviderProps {
  children: React.ReactNode;
}

export const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(100);

  // Ouvrir une nouvelle fenêtre
  const openWindow = useCallback(
    (windowData: Omit<WindowState, "zIndex" | "isFocused">) => {
      setWindows((prev) => {
        // Si la fenêtre existe déjà, on la focus
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
              : { ...w, isFocused: false }
          );
        }

        // Sinon, on crée une nouvelle fenêtre
        const newWindow: WindowState = {
          ...windowData,
          isFocused: true,
          zIndex: highestZIndex + 1,
        };

        return [
          ...prev.map((w) => ({ ...w, isFocused: false })),
          newWindow,
        ];
      });

      setHighestZIndex((prev) => prev + 1);
      setActiveWindowId(windowData.id);
    },
    [highestZIndex]
  );

  // Fermer une fenêtre
  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  // Minimiser une fenêtre
  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, isMinimized: true, isFocused: false } : w
      )
    );
    setActiveWindowId((prev) => (prev === id ? null : prev));
  }, []);

  // Maximiser une fenêtre
  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: true } : w))
    );
  }, []);

  // Restaurer une fenêtre (depuis minimisé ou maximisé)
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
            : { ...w, isFocused: false }
        )
      );
      setHighestZIndex((prev) => prev + 1);
      setActiveWindowId(id);
    },
    [highestZIndex]
  );

  // Focus sur une fenêtre
  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isFocused: true, zIndex: highestZIndex + 1 }
            : { ...w, isFocused: false }
        )
      );
      setHighestZIndex((prev) => prev + 1);
      setActiveWindowId(id);
    },
    [highestZIndex]
  );

  // Mettre à jour la position d'une fenêtre
  const updateWindowPosition = useCallback(
    (id: string, position: WindowPosition) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, position } : w))
      );
    },
    []
  );

  // Mettre à jour la taille d'une fenêtre
  const updateWindowSize = useCallback((id: string, size: WindowSize) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size } : w)));
  }, []);

  // Récupérer une fenêtre par ID
  const getWindow = useCallback(
    (id: string) => {
      return windows.find((w) => w.id === id);
    },
    [windows]
  );

  // Vérifier si une fenêtre est ouverte
  const isWindowOpen = useCallback(
    (id: string) => {
      return windows.some((w) => w.id === id);
    },
    [windows]
  );

  const contextValue: WindowContextType = {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    getWindow,
    isWindowOpen,
  };

  return (
    <WindowContext.Provider value={contextValue}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowProvider;
