"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className,
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={cn(
        "grid gap-3 p-4 h-full w-full mx-auto",
        // Sur mobile: grille 2 colonnes compacte
        // Sur desktop: grille 4 colonnes avec plus d'espace
        isMobile
          ? "grid-cols-2 max-w-[320px] auto-rows-[100px]"
          : "grid-cols-4 max-w-md auto-rows-[120px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
  variant?: "default" | "glass" | "solid";
  onClick?: () => void;
}

const colSpanClasses = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

const rowSpanClasses = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
};

const variantClasses = {
  default:
    "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15",
  glass:
    "bg-black/20 backdrop-blur-xl border border-white/10 hover:bg-black/30",
  solid: "bg-neutral-900 border border-neutral-800 hover:bg-neutral-800",
};

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  variant = "default",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl p-4 transition-all duration-300 ease-out",
        "overflow-hidden relative",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        variantClasses[variant],
        onClick && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default BentoGrid;
