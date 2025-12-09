"use client";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplashScreen } from "./splash-screen";

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [showSplash, setShowSplash] = React.useState(true);
  // const [showFullscreenPrompt, setShowFullscreenPrompt] = React.useState(true);

  // const requestFullscreen = React.useCallback(async () => {
  //   try {
  //     const elem = document.documentElement;
  //     if (elem.requestFullscreen) {
  //       await elem.requestFullscreen();
  //     } else if (
  //       (
  //         elem as HTMLElement & {
  //           webkitRequestFullscreen?: () => Promise<void>;
  //         }
  //       ).webkitRequestFullscreen
  //     ) {
  //       await (
  //         elem as HTMLElement & { webkitRequestFullscreen: () => Promise<void> }
  //       ).webkitRequestFullscreen();
  //     } else if (
  //       (elem as HTMLElement & { msRequestFullscreen?: () => Promise<void> })
  //         .msRequestFullscreen
  //     ) {
  //       await (
  //         elem as HTMLElement & { msRequestFullscreen: () => Promise<void> }
  //       ).msRequestFullscreen();
  //     }
  //   } catch {
  //     console.log("Fullscreen request denied or not supported");
  //   }
  //   setShowFullscreenPrompt(false);
  // }, []);

  const handleSplashComplete = React.useCallback(() => {
    setShowSplash(false);
    // Show fullscreen prompt after splash
    // setTimeout(() => {
    //   setShowFullscreenPrompt(true);
    // }, 300);
  }, []);

  // const handleSkipFullscreen = React.useCallback(() => {
  //   setShowFullscreenPrompt(false);
  // }, []);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Main Content - always rendered, animated in */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02, filter: "blur(12px)" }}
        animate={{
          opacity: showSplash ? 0 : 1,
          scale: showSplash ? 1.02 : 1,
          filter: showSplash ? "blur(12px)" : "blur(0px)",
        }}
        transition={{
          duration: 1,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="w-full h-full overflow-hidden"
      >
        {children}
      </motion.div>

      {/* Splash Screen */}
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999]"
        >
          <SplashScreen onComplete={handleSplashComplete} duration={3500} />
        </motion.div>
      )}

      {/* Fullscreen Prompt Overlay */}
      <AnimatePresence></AnimatePresence>
    </div>
  );
};

export default AppWrapper;
