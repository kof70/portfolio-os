"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BentoCard } from "./bento-grid";
import { GlitchName } from "@/components/shared/glitch-name";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";


// ---------------------------------------------------------------------------
// PhotoCard
// ---------------------------------------------------------------------------

interface PhotoCardProps {
  src: string;
  alt?: string;
  name?: string;
  title?: string;
  description?: string;
  className?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  src,
  alt = "Photo de profil",
  name,
  title,
  description,
  className,
}) => {
  const { isMobile } = useIsMobile();
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  const openPreview = React.useCallback(() => {
    if (!isMobile) return;
    setIsPreviewOpen(true);
  }, [isMobile]);

  const closePreview = React.useCallback(() => {
    setIsPreviewOpen(false);
  }, []);

  React.useEffect(() => {
    if (!isPreviewOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isPreviewOpen, closePreview]);

  return (
    <>
      <BentoCard
        colSpan={isMobile ? 2 : 4}
        rowSpan={isMobile ? 2 : 3}
        variant="glass"
        className={cn(
          "p-0 overflow-hidden group",
          isMobile && "min-h-[200px] cursor-zoom-in",
          className,
        )}
        onClick={openPreview}
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
                  nameClassName={cn(
                    "tracking-tight",
                    isMobile ? "text-base" : "text-xl",
                  )}
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

      <AnimatePresence>
        {isMobile && isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm"
            onClick={closePreview}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute inset-x-4 top-6 bottom-6 rounded-2xl overflow-hidden border border-white/15 bg-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closePreview}
                className="absolute top-3 right-3 z-20 size-9 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center"
                aria-label="Fermer l'aperçu"
              >
                <X className="size-4" />
              </button>

              <div className="relative w-full h-[62%]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="h-[38%] overflow-y-auto p-4">
                {name && (
                  <h3 className="text-white text-base font-semibold">{name}</h3>
                )}
                {title && (
                  <p className="text-white/75 text-xs mt-1">{title}</p>
                )}
                {description && (
                  <p className="text-white/80 text-sm leading-relaxed mt-3">
                    {description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoCard;
