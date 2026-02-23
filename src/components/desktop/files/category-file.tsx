"use client";

import * as React from "react";
import { Icons, type IconName } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { isMobile } = useIsMobile();
  const iconName = CATEGORY_ICONS[type];
  const Icon = Icons[iconName];
  const displayName = isMobile && name === "Open Source" ? "Open\nSource" : name;

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center w-full h-full rounded-xl",
        isMobile ? "gap-0.5" : "gap-1",
        "hover:bg-white/20 hover:border-[0.5px] border-white/10 transition-colors ease-in-out duration-150 select-none",
        className,
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            "shrink-0",
            isMobile ? "size-[44px] w-[44px] h-[44px]" : "size-[70px] w-[70px] h-[70px]",
          )}
        />
      ) : null}
      <span
        className={cn(
          "text-white font-medium text-center w-full",
          isMobile
            ? "text-[9px] leading-[1.05] px-0.5 whitespace-pre-line break-words"
            : "text-xs px-1 truncate",
        )}
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}
      >
        {displayName}
      </span>
    </div>
  );
};
