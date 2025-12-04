"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BentoCard } from "./bento-grid";
import { FolderClosed } from "lucide-react";

interface NoteCardProps {
  title?: string;
  content: string;
  className?: string;
  icon?: React.ReactNode;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  title = "À propos",
  content,
  className,
  icon,
}) => {
  return (
    <BentoCard
      colSpan={4}
      rowSpan={2}
      variant="solid"
      className={cn("flex flex-col p-0", className)}
    >
      {/* Header */}
      <div className="flex px-4 py-2 items-center bg-amber-300 gap-2 mb-3">
        <FolderClosed className="size-5 text-white" />
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden px-4">
        <p className="text-white/70 text-sm leading-relaxed line-clamp-6">
          {content}
        </p>
      </div>

      {/* Decorative lines - style note */}
      {/*<div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none overflow-hidden opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border-b border-white/30"
            style={{ marginTop: "24px" }}
          />
        ))}
      </div>*/}
    </BentoCard>
  );
};

export default NoteCard;
