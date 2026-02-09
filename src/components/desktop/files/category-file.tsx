"use client";

import * as React from "react";
import { Icons, type IconName } from "@/components/icons";
import { cn } from "@/lib/utils";

export const CATEGORY_ICONS: Record<
  "recommendation" | "community" | "opensource" | "hackathon" | "entreprise",
  IconName
> = {
  recommendation: "badgeRecommendation",
  community: "badgeCommunity",
  opensource: "badgeOpensource",
  hackathon: "badgeHackathon",
  entreprise: "badgeEntreprise",
};

interface CategoryFileProps {
  type: "recommendation" | "community" | "opensource" | "hackathon" | "entreprise";
  name: string;
  className?: string;
}

export const CategoryFile: React.FC<CategoryFileProps> = ({
  type,
  name,
  className,
}) => {
  const iconName = CATEGORY_ICONS[type];
  const Icon = Icons[iconName];

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-1 w-full h-full rounded-xl",
        "hover:bg-white/20 hover:border-[0.5px] border-white/10 transition-colors ease-in-out duration-150 select-none",
        className,
      )}
    >
      {Icon ? (
        <Icon className="size-[70px] shrink-0 w-[70px] h-[70px]" />
      ) : null}
      <span className="text-xs text-white font-medium text-center px-1 truncate max-w-full" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}>
        {name}
      </span>
    </div>
  );
};
