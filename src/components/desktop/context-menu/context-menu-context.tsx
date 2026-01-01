"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";

// Types pour les options du menu contextuel
export type ContextMenuItemType = "action" | "separator" | "submenu";

export interface ContextMenuItem {
  id: string;
  type: ContextMenuItemType;
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  submenu?: ContextMenuItem[];
}

export type ContextMenuTarget =
  | "desktop"
  | "folder"
  | "file"
  | "window"
  | "dock";

export interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
  target: ContextMenuTarget;
  targetId?: string;
  targetData?: Record<string, unknown>;
}

interface ContextMenuContextType {
  menuState: ContextMenuState;
  openContextMenu: (
    position: { x: number; y: number },
    target: ContextMenuTarget,
    targetId?: string,
    targetData?: Record<string, unknown>
  ) => void;
  closeContextMenu: () => void;
  isOpen: boolean;
}

const defaultMenuState: ContextMenuState = {
  isOpen: false,
  position: { x: 0, y: 0 },
  target: "desktop",
  targetId: undefined,
  targetData: undefined,
};

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error(
      "useContextMenu must be used within a ContextMenuProvider"
    );
  }
  return context;
};

interface ContextMenuProviderProps {
  children: React.ReactNode;
}

export const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({
  children,
}) => {
  const [menuState, setMenuState] = useState<ContextMenuState>(defaultMenuState);

  const openContextMenu = useCallback(
    (
      position: { x: number; y: number },
      target: ContextMenuTarget,
      targetId?: string,
      targetData?: Record<string, unknown>
    ) => {
      // Ajuster la position pour éviter que le menu sorte de l'écran
      const menuWidth = 200;
      const menuHeight = 250;
      const padding = 10;

      let adjustedX = position.x;
      let adjustedY = position.y;

      if (typeof window !== "undefined") {
        if (position.x + menuWidth + padding > window.innerWidth) {
          adjustedX = window.innerWidth - menuWidth - padding;
        }
        if (position.y + menuHeight + padding > window.innerHeight) {
          adjustedY = window.innerHeight - menuHeight - padding;
        }
      }

      setMenuState({
        isOpen: true,
        position: { x: adjustedX, y: adjustedY },
        target,
        targetId,
        targetData,
      });
    },
    []
  );

  const closeContextMenu = useCallback(() => {
    setMenuState(defaultMenuState);
  }, []);

  const contextValue: ContextMenuContextType = {
    menuState,
    openContextMenu,
    closeContextMenu,
    isOpen: menuState.isOpen,
  };

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {children}
    </ContextMenuContext.Provider>
  );
};

export default ContextMenuProvider;
