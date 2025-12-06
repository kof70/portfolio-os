"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplashScreen } from "./splash-screen";

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [showSplash, setShowSplash] = React.useState(true);
  const [showFullscreenPrompt, setShowFullscreenPrompt] = React.useState(false);

  const requestFullscreen = React.useCallback(async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (
        (
          elem as HTMLElement & {
            webkitRequestFullscreen?: () => Promise<void>;
          }
        ).webkitRequestFullscreen
      ) {
        await (
          elem as HTMLElement & { webkitRequestFullscreen: () => Promise<void> }
        ).webkitRequestFullscreen();
      } else if (
        (elem as HTMLElement & { msRequestFullscreen?: () => Promise<void> })
          .msRequestFullscreen
      ) {
        await (
          elem as HTMLElement & { msRequestFullscreen: () => Promise<void> }
        ).msRequestFullscreen();
      }
    } catch {
      console.log("Fullscreen request denied or not supported");
    }
    setShowFullscreenPrompt(false);
  }, []);

  const handleSplashComplete = React.useCallback(() => {
    setShowSplash(false);
    // Show fullscreen prompt after splash
    setTimeout(() => {
      setShowFullscreenPrompt(true);
    }, 300);
  }, []);

  const handleSkipFullscreen = React.useCallback(() => {
    setShowFullscreenPrompt(false);
  }, []);

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
      <AnimatePresence>
        {showFullscreenPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="bg-neutral-900/90 border border-white/10 rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold text-white mb-2">
                Mode Plein Écran
              </h2>

              {/* Description */}
              <p className="text-white/60 text-sm mb-6">
                Pour une expérience optimale, activez le mode plein écran.
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={requestFullscreen}
                  className="w-full py-3 px-6 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
                >
                  Activer le plein écran
                </button>
                <button
                  onClick={handleSkipFullscreen}
                  className="w-full py-3 px-6 bg-white/10 text-white/70 rounded-xl font-medium hover:bg-white/20 hover:text-white transition-colors"
                >
                  Continuer sans
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppWrapper;
