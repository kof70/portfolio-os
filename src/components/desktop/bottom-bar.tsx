"use client";
import * as React from "react";
import { motion } from "motion/react";
import { CustomDock } from "./custom-dock";
import { useWindows } from "./viewer";
import { useIsMobile } from "@/hooks/use-mobile";

interface BottomBarProps {
  className?: string;
}

export const BottomBar: React.FC<BottomBarProps> = () => {
  const { windows } = useWindows();
  const { isMobile } = useIsMobile();
  const [isHovered, setIsHovered] = React.useState(false);

  // Check if any window is open and not minimized
  const hasActiveWindow = React.useMemo(
    () => windows.some((w) => !w.isMinimized),
    [windows],
  );

  // Dock should be hidden when there are active windows and not hovered (only on desktop)
  const shouldHide = !isMobile && hasActiveWindow && !isHovered;

  // Sur mobile, on montre toujours le dock de façon simplifiée
  if (isMobile) {
    return (
      <div className="w-full flex justify-center items-center fixed md:z-200 left-0 right-0 bottom-0 pb-safe">
        <motion.footer
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            delay: 0.2,
          }}
          className="mx-auto mb-2"
        >
          <CustomDock />
        </motion.footer>

        {/* Home indicator - iOS style */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    );
  }

  // Desktop dock behavior
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
          className="mx-auto"
        >
          <CustomDock />
        </motion.footer>
      </div>
    </>
  );
};

export default BottomBar;
