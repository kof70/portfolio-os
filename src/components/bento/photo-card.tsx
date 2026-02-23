"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BentoCard } from "./bento-grid";
import { GlitchName } from "@/components/shared/glitch-name";
import { useIsMobile } from "@/hooks/use-mobile";


// ---------------------------------------------------------------------------
// PhotoCard
// ---------------------------------------------------------------------------

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
  const { isMobile } = useIsMobile();

  return (
    <BentoCard
      colSpan={isMobile ? 2 : 4}
      rowSpan={isMobile ? 2 : 3}
      variant="glass"
      className={cn("p-0 overflow-hidden group", isMobile && "min-h-[200px]", className)}
    >
      {/* Photo */}
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          priority
          sizes={
            isMobile ? "(max-width: 768px) 50vw" : "(max-width: 1200px) 33vw"
          }
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Info overlay */}
        {(name || title) && (
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0",
              isMobile ? "p-2" : "p-4",
            )}
          >
            {name && (
              <GlitchName
                fullName={name}
                pseudoClassName={isMobile ? "text-base" : "text-xl"}
                nameClassName={cn("tracking-tight", isMobile ? "text-base" : "text-xl")}
                className="min-h-[28px]"
              />
            )}
            {title && (
              <p
                className={cn(
                  "text-white/80 font-medium mt-0.5",
                  isMobile ? "text-xs line-clamp-1" : "text-sm mt-1",
                )}
              >
                {title}
              </p>
            )}
          </div>
        )}
      </div>
    </BentoCard>
  );
};

export default PhotoCard;
