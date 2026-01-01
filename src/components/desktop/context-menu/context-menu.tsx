"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  useContextMenu,
  ContextMenuItem,
  ContextMenuTarget,
} from "./context-menu-context";
import { cn } from "@/lib/utils";
import {
  RefreshCw,
  FolderOpen,
  Trash2,
  Copy,
  Info,
  Image as ImageIcon,
  ExternalLink,
  Download,
  Settings,
  Grid3X3,
} from "lucide-react";

// Définition des menus selon le contexte
const getMenuItems = (
  target: ContextMenuTarget,
  targetId?: string,
  callbacks?: {
    onRefresh?: () => void;
    onOpen?: () => void;
    onChangeWallpaper?: () => void;
    onShowInfo?: () => void;
    onDownload?: () => void;
    onResetPositions?: () => void;
  },
): ContextMenuItem[] => {
  switch (target) {
    case "desktop":
      return [
        {
          id: "refresh",
          type: "action",
          label: "Actualiser",
          icon: <RefreshCw className="size-4" />,
          shortcut: "⌘R",
          onClick: callbacks?.onRefresh,
        },
        { id: "sep1", type: "separator" },
        {
          id: "change-wallpaper",
          type: "action",
          label: "Changer le fond d'écran",
          icon: <ImageIcon className="size-4" />,
          onClick: callbacks?.onChangeWallpaper,
        },
        {
          id: "reset-positions",
          type: "action",
          label: "Réinitialiser les positions",
          icon: <Grid3X3 className="size-4" />,
          onClick: callbacks?.onResetPositions,
        },
        { id: "sep2", type: "separator" },
        {
          id: "settings",
          type: "action",
          label: "Paramètres",
          icon: <Settings className="size-4" />,
          disabled: true,
        },
      ];

    case "folder":
      return [
        {
          id: "open",
          type: "action",
          label: "Ouvrir",
          icon: <FolderOpen className="size-4" />,
          shortcut: "⏎",
          onClick: callbacks?.onOpen,
        },
        { id: "sep1", type: "separator" },
        {
          id: "get-info",
          type: "action",
          label: "Obtenir des informations",
          icon: <Info className="size-4" />,
          shortcut: "⌘I",
          onClick: callbacks?.onShowInfo,
        },
        {
          id: "duplicate",
          type: "action",
          label: "Dupliquer",
          icon: <Copy className="size-4" />,
          shortcut: "⌘D",
          disabled: true,
        },
        { id: "sep2", type: "separator" },
        {
          id: "delete",
          type: "action",
          label: "Mettre à la corbeille",
          icon: <Trash2 className="size-4" />,
          shortcut: "⌘⌫",
          danger: true,
          disabled: true,
        },
      ];

    case "file":
      return [
        {
          id: "open",
          type: "action",
          label: "Ouvrir",
          icon: <ExternalLink className="size-4" />,
          shortcut: "⏎",
          onClick: callbacks?.onOpen,
        },
        {
          id: "download",
          type: "action",
          label: "Télécharger",
          icon: <Download className="size-4" />,
          shortcut: "⌘S",
          onClick: callbacks?.onDownload,
        },
        { id: "sep1", type: "separator" },
        {
          id: "get-info",
          type: "action",
          label: "Obtenir des informations",
          icon: <Info className="size-4" />,
          shortcut: "⌘I",
          onClick: callbacks?.onShowInfo,
        },
        { id: "sep2", type: "separator" },
        {
          id: "delete",
          type: "action",
          label: "Mettre à la corbeille",
          icon: <Trash2 className="size-4" />,
          shortcut: "⌘⌫",
          danger: true,
          disabled: true,
        },
      ];

    default:
      return [];
  }
};

interface ContextMenuItemComponentProps {
  item: ContextMenuItem;
  onClose: () => void;
}

const ContextMenuItemComponent: React.FC<ContextMenuItemComponentProps> = ({
  item,
  onClose,
}) => {
  if (item.type === "separator") {
    return <div className="h-px bg-white/10 my-1 mx-2" />;
  }

  const handleClick = () => {
    if (item.disabled) return;
    item.onClick?.();
    onClose();
  };

  return (
    <button
      onClick={handleClick}
      disabled={item.disabled}
      className={cn(
        "w-full flex text-accent items-center gap-3 px-3 py-1.5 text-left text-sm rounded-md transition-colors",
        "hover:bg-white/10 focus:bg-white/10 focus:outline-none",
        item.disabled && "opacity-40 cursor-not-allowed hover:bg-transparent",
        item.danger && !item.disabled && "text-red-400 hover:bg-red-500/20",
      )}
    >
      {item.icon && (
        <span className={cn("shrink-0", item.danger && "text-red-400")}>
          {item.icon}
        </span>
      )}
      <span className="flex-1">{item.label}</span>
      {item.shortcut && (
        <span className="text-xs text-white/40 ml-4">{item.shortcut}</span>
      )}
    </button>
  );
};

interface ContextMenuProps {
  onRefresh?: () => void;
  onOpen?: (targetId: string) => void;
  onChangeWallpaper?: () => void;
  onShowInfo?: (targetId: string) => void;
  onDownload?: (targetId: string) => void;
  onResetPositions?: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  onRefresh,
  onOpen,
  onChangeWallpaper,
  onShowInfo,
  onDownload,
  onResetPositions,
}) => {
  const { menuState, closeContextMenu } = useContextMenu();
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Fermer le menu au clic extérieur
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeContextMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeContextMenu();
      }
    };

    if (menuState.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuState.isOpen, closeContextMenu]);

  const menuItems = getMenuItems(menuState.target, menuState.targetId, {
    onRefresh,
    onOpen: () => menuState.targetId && onOpen?.(menuState.targetId),
    onChangeWallpaper,
    onShowInfo: () => menuState.targetId && onShowInfo?.(menuState.targetId),
    onDownload: () => menuState.targetId && onDownload?.(menuState.targetId),
    onResetPositions,
  });

  return (
    <AnimatePresence>
      {menuState.isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: menuState.position.x,
            top: menuState.position.y,
            zIndex: 9999,
          }}
          className={cn(
            "min-w-[200px] py-1.5 rounded-xl",
            "bg-black/70 backdrop-blur-xl",
            "border border-white/10",
            "shadow-xl shadow-black/50",
          )}
        >
          {menuItems.map((item) => (
            <ContextMenuItemComponent
              key={item.id}
              item={item}
              onClose={closeContextMenu}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
