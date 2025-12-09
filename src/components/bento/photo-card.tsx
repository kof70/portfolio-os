"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BentoCard } from "./bento-grid";

interface PhotoCardProps {
  src: string;
  alt?: string;
  name?: string;
  title?: string;
  className?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  src,
  alt = "Photo de profil",
  name,
  title,
  className,
}) => {
  return (
    <BentoCard
      colSpan={4}
      rowSpan={3}
      variant="glass"
      className={cn("p-0 overflow-hidden group", className)}
    >
      {/* Photo */}
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Info overlay */}
        {(name || title) && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {name && (
              <h2 className="text-white text-xl font-bold tracking-tight">
                {name}
              </h2>
            )}
            {title && (
              <p className="text-white/80 text-sm font-medium mt-1">{title}</p>
            )}
          </div>
        )}
      </div>
    </BentoCard>
  );
};

export default PhotoCard;
