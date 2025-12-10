"use client";
import * as React from "react";
import { motion } from "motion/react";
import { CustomDock } from "./custom-dock";
import { useWindows } from "./viewer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface BottomBarProps {
  className?: string;
}

export const BottomBar: React.FC<BottomBarProps> = () => {
  const { windows } = useWindows();
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = React.useState(false);

  // Check if any window is open and not minimized
  const hasActiveWindow = windows.some((w) => !w.isMinimized);

  // Dock should be hidden when there are active windows and not hovered
  const shouldHide = hasActiveWindow && !isHovered;

  return (
    <>
      {/* Invisible hover trigger zone at the bottom */}
      <div
        className="fixed bottom-0 left-0 right-0 h-4 z-199"
        onMouseEnter={() => setIsHovered(true)}
      />

      {/* Dock container */}
      <div className="w-full flex justify-center items-center fixed z-200 left-0 right-0 bottom-2">
        <motion.footer
          initial={{ y: 0 }}
          animate={{
            y: shouldHide ? 100 : 0,
            opacity: shouldHide ? 0 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: "auto",
          }}
          className={cn(" mx-auto", {
            "rounded-3xl supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-sm":
              isMobile,
          })}
        >
          <CustomDock />
        </motion.footer>
      </div>
    </>
  );
};
