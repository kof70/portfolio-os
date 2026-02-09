"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Liste des fonds d'écran disponibles
export const wallpapers = [
  { id: "bg-1", src: "/assets/bg-1.jpg", name: "Gradient Blue" },
  { id: "bg-3", src: "/assets/bg-3.jpg", name: "Abstract Dark" },
  { id: "bg", src: "/assets/bg.jpg", name: "Default" },
  { id: "macos-bg", src: "/assets/macos-bg.jpg", name: "macOS Ventura" },
  { id: "macos-bg-2", src: "/assets/macos-bg-2.png", name: "macOS Sonoma" },
  { id: "space", src: "/assets/space.jpg", name: "Space" },
  { id: "word", src: "/assets/word.jpg", name: "World" },
  { id: "bg033", src: "/assets/wallpapers/Bg033.jpg", name: "Sunset Glow" },
  { id: "bg034", src: "/assets/wallpapers/Bg034.jpg", name: "Warm Horizon" },
  { id: "bg050", src: "/assets/wallpapers/Bg050.JPG", name: "Nature Light" },
  { id: "bg071", src: "/assets/wallpapers/Bg071.JPG", name: "Mountain Haze" },
  { id: "bg079", src: "/assets/wallpapers/Bg079.JPG", name: "Ocean Breeze" },
  { id: "bg130", src: "/assets/wallpapers/Bg130.JPG", name: "Golden Hour" },
  { id: "bg135", src: "/assets/wallpapers/Bg135.JPG", name: "Sky Canvas" },
  { id: "bg187", src: "/assets/wallpapers/Bg187.JPG", name: "Twilight" },
  { id: "bg210", src: "/assets/wallpapers/Bg210.JPG", name: "Deep Blue" },
  { id: "bg361", src: "/assets/wallpapers/Bg361.PNG", name: "Neon Pulse" },
  { id: "bg430", src: "/assets/wallpapers/Bg430.PNG", name: "Aurora" },
  { id: "bg450", src: "/assets/wallpapers/Bg450.png", name: "Cosmic Dust" },
];

interface WallpaperPickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentWallpaper: string;
  onSelect: (wallpaper: string) => void;
}

export const WallpaperPicker: React.FC<WallpaperPickerProps> = ({
  isOpen,
  onClose,
  currentWallpaper,
  onSelect,
}) => {
  const pickerRef = React.useRef<HTMLDivElement>(null);

  // Fermer le picker au clic extérieur
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSelect = (src: string) => {
    onSelect(src);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Picker Modal */}
          <motion.div
            ref={pickerRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[90vw] max-w-2xl max-h-[80vh]",
              "bg-black/80 backdrop-blur-xl",
              "border border-white/10 rounded-2xl",
              "shadow-2xl shadow-black/50",
              "z-[9999] overflow-hidden"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">
                Choisir un fond d&apos;écran
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="size-5 text-white/70" />
              </button>
            </div>

            {/* Grid de wallpapers */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {wallpapers.map((wallpaper) => {
                  const isSelected = currentWallpaper === wallpaper.src;
                  return (
                    <motion.button
                      key={wallpaper.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(wallpaper.src)}
                      className={cn(
                        "relative aspect-video rounded-xl overflow-hidden",
                        "border-2 transition-all duration-200",
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-500/30"
                          : "border-white/10 hover:border-white/30"
                      )}
                    >
                      <Image
                        src={wallpaper.src}
                        alt={wallpaper.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Nom du wallpaper */}
                      <span className="absolute bottom-2 left-3 text-sm text-white font-medium">
                        {wallpaper.name}
                      </span>

                      {/* Check icon si sélectionné */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 bg-blue-500 rounded-full p-1"
                        >
                          <Check className="size-4 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WallpaperPicker;
