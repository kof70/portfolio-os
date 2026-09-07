"use client";
import * as React from "react";
import { motion } from "motion/react";
import { CustomDock } from "./custom-dock";
import { useWindows } from "./viewer";
import { useIsMobile } from "@/hooks/use-mobile";
import { WallpaperPicker } from "./wallpaper-picker";
import { useDesktopStorage } from "@/hooks/use-desktop-storage-context";

interface BottomBarProps {
  className?: string;
}

export const BottomBar: React.FC<BottomBarProps> = () => {
  const { windows } = useWindows();
  const { isMobile } = useIsMobile();
  const { wallpaper, setWallpaper, isWallpaperPickerOpen, closeWallpaperPicker } = useDesktopStorage();
  const [isHovered, setIsHovered] = React.useState(false);

  const hasActiveWindow = React.useMemo(
    () => windows.some((w) => !w.isMinimized),
    [windows],
  );

  const shouldHide = !isMobile && hasActiveWindow && !isHovered;

  return (
    <>
      {isMobile ? (
        <div className="w-full flex justify-center items-center fixed z-200 left-0 right-0 bottom-0 pb-safe pointer-events-none transform-gpu">
          <motion.footer
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 34, delay: 0.2 }}
            className="mx-auto mb-1 w-fit pointer-events-auto transform-gpu will-change-transform"
          >
            <CustomDock />
          </motion.footer>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
            <div className="w-24 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      ) : (
        <>
          <div
            className="fixed bottom-0 left-0 right-0 h-4 z-199"
            onMouseEnter={() => setIsHovered(true)}
          />
          <div className="w-full flex justify-center items-center fixed z-200 left-0 right-0 bottom-2">
            <motion.footer
              initial={{ y: 0 }}
              animate={{ y: shouldHide ? 100 : 0, opacity: shouldHide ? 0 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ width: "auto" }}
              className="mx-auto"
            >
              <CustomDock />
            </motion.footer>
          </div>
        </>
      )}

      <WallpaperPicker
        isOpen={isWallpaperPickerOpen}
        onClose={closeWallpaperPicker}
        currentWallpaper={wallpaper}
        onSelect={setWallpaper}
      />
    </>
  );
};

export default BottomBar;
