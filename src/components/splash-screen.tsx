"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CircleIcon } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/i18n";

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  yOffset: number;
}

// Pre-generate particles outside component to avoid impure function calls
const generateParticles = (): Particle[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: (i * 17 + 13) % 100,
    y: (i * 23 + 7) % 100,
    duration: 2 + (i % 5) * 0.6,
    delay: (i % 4) * 0.5,
    yOffset: -50 - (i % 6) * 30,
  }));
};

const PARTICLES = generateParticles();

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  duration = 3500,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = React.useState(true);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [showWelcome, setShowWelcome] = React.useState(false);

  // Skip or shorten splash screen when user prefers reduced motion
  const effectiveDuration = prefersReducedMotion ? 500 : duration;

  React.useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = 5 + prev / 10;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    // Show welcome message
    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(true);
    }, effectiveDuration * 0.6);

    // Complete splash screen
    const completeTimeout = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, effectiveDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(welcomeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [effectiveDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(8px)",
            scale: 1.05,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Animated background particles — skip when reduced motion */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 overflow-hidden">
              {PARTICLES.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    y: [0, particle.yOffset],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                  }}
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                />
              ))}
            </div>
          )}

          {/* Main content */}
          <motion.div
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo / Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2,
              }}
              className="mb-8"
            >
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  // animate={{
                  //   boxShadow: [
                  //     "0 0 20px rgba(255,255,255,0.1)",
                  //     "0 0 40px rgba(255,255,255,0.2)",
                  //     "0 0 20px rgba(255,255,255,0.1)",
                  //   ],
                  // }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-24 h-24 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold text-white"
                  >
                    <CircleIcon size={100} />
                  </motion.span>
                </motion.div>

                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-white/10"
                  style={{
                    borderTopColor: "rgba(255,255,255,0.4)",
                  }}
                />
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative h-1 bg-white/10 rounded-full overflow-hidden mb-6"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/50 to-white rounded-full"
              />
            </motion.div>

            {/* Loading text */}
            <AnimatePresence mode="wait">
              {!showWelcome ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-white/60 text-sm">
                    {loadingProgress < 30 && t(language, "loadingInit")}
                    {loadingProgress >= 30 &&
                      loadingProgress < 60 &&
                      t(language, "loadingResources")}
                    {loadingProgress >= 60 &&
                      loadingProgress < 90 &&
                      t(language, "loadingUi")}
                    {loadingProgress >= 90 && t(language, "loadingReady")}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <h1 className="text-2xl font-semibold text-white mb-2">
                    {t(language, "welcome")}
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 text-center"
          >
            <p className="text-white/30 text-xs">Portfolio OS • Version 1.0</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
