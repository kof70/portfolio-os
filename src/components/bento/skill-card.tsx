"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoCard } from "./bento-grid";

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  className?: string;
  color?: string;
  onClick?: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  name,
  icon,
  className,
  color,
  onClick,
}) => {
  return (
    <BentoCard
      colSpan={1}
      rowSpan={1}
      variant="glass"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 group",
        "hover:scale-105 transition-transform duration-300",
        className,
      )}
    >
      {/* Icon container */}
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          "transition-all duration-300 group-hover:scale-110",
          color ? color : "bg-white/10",
        )}
      >
        <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
      </div>

      {/* Skill name */}
      <span className="text-white/80 text-xs font-medium text-center truncate w-full px-1">
        {name}
      </span>

      {/* Glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20",
          "transition-opacity duration-300 pointer-events-none",
          color ? color.replace("bg-", "bg-") : "bg-white",
        )}
        style={{
          filter: "blur(20px)",
        }}
      />
    </BentoCard>
  );
};

export default SkillCard;
