"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoCard } from "./bento-grid";
import { Icons } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-mobile";

interface NoteCardProps {
  title?: string;
  content: string;
  className?: string;
  icon?: React.ReactNode;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  title = "About",
  content,
  className,
  icon = <Icons.folderClosed className="size-5 text-white" />,
}) => {
  const { isMobile } = useIsMobile();
  return (
    <BentoCard
      colSpan={isMobile ? 1 : 4}
      rowSpan={isMobile ? 2 : 1}
      variant="solid"
      className={cn("flex flex-col p-0 max-md:hidden", className)}
    >
      {/* Header */}
      <div className="flex px-3 py-1.5 items-center bg-amber-300 gap-2 mb-2">
        {icon}
        <h3 className="text-white font-semibold text-sm">{title}</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden px-4 pb-3">
        <p className="text-white/70 text-xs leading-relaxed line-clamp-4">
          {content}
        </p>
      </div>
    </BentoCard>
  );
};

export default NoteCard;
