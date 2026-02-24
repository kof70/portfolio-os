"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/i18n";
import type { DockTechProjectItem } from "@/lib/data";

interface DockProjectPopoverProps {
  open: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
  /** Position de l’icône du dock (getBoundingClientRect) */
  anchorRect: DOMRect | null;
  /** Libellé de la techno (ex. "Coolify", "Next.js") */
  label: string;
  /** Projets à afficher */
  items: DockTechProjectItem[];
}

export function DockProjectPopover({
  open,
  onClose,
  onSelectProject,
  anchorRect,
  label,
  items,
}: DockProjectPopoverProps) {
  const { language } = useLanguage();
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const style: React.CSSProperties = React.useMemo(() => {
    if (!anchorRect) return {};
    // Au-dessus de l’icône : placer le bas du popover à 8px au-dessus du haut de l’icône
    const bottomPx = typeof window !== "undefined" ? window.innerHeight - anchorRect.top + 8 : 0;
    return {
      position: "fixed",
      left: anchorRect.left + anchorRect.width / 2,
      bottom: bottomPx,
      transform: "translateX(-50%)",
      zIndex: 9999,
    };
  }, [anchorRect]);

  return (
    <AnimatePresence>
      {open && anchorRect && items.length > 0 && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.1, ease: "easeOut" }}
          style={style}
          className={cn(
            "min-w-[260px] max-w-[320px] max-h-[70vh] overflow-y-auto py-1.5 rounded-xl",
            "bg-black/70 backdrop-blur-xl",
            "border border-white/10",
            "shadow-xl shadow-black/50",
          )}
        >
          <div className="px-3 py-1.5 border-b border-white/10">
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">
              {t(language, "projects")} — {label}
            </p>
          </div>
          <ul className="py-1">
            {items.map((item) => {
              const { projectId } = item;
              if (projectId && onSelectProject) {
                return (
                  <li key={`${item.title}-${projectId}`}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProject(projectId);
                        onClose();
                      }}
                      className={cn(
                        "w-full block px-3 py-2 text-left rounded-md transition-colors",
                        "hover:bg-white/10 focus:bg-white/10 focus:outline-none",
                      )}
                    >
                      <span className="font-medium text-accent block">
                        {item.title}
                      </span>
                      <span className="text-xs text-white/60 block mt-0.5">
                        {item.descriptionShort}
                      </span>
                    </button>
                  </li>
                );
              }

              if (!item.href) {
                return null;
              }
              const isInternal = item.href.startsWith("/");
              return (
                <li key={`${item.title}-${item.href}`}>
                  {isInternal ? (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block px-3 py-2 text-left rounded-md transition-colors",
                        "hover:bg-white/10 focus:bg-white/10 focus:outline-none",
                      )}
                    >
                      <span className="font-medium text-accent block">
                        {item.title}
                      </span>
                      <span className="text-xs text-white/60 block mt-0.5">
                        {item.descriptionShort}
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className={cn(
                        "flex items-start gap-2 px-3 py-2 text-left rounded-md transition-colors",
                        "hover:bg-white/10 focus:bg-white/10 focus:outline-none",
                      )}
                    >
                      <span className="flex-1 min-w-0">
                        <span className="font-medium text-accent block">
                          {item.title}
                        </span>
                        <span className="text-xs text-white/60 block mt-0.5">
                          {item.descriptionShort}
                        </span>
                      </span>
                      <ExternalLink className="size-3.5 shrink-0 text-white/40 mt-1" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
