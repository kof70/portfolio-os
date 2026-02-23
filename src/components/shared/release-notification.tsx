"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { bouncySpringTransition } from "@/lib/animations";

const STORAGE_KEY = "release-notification-1.3.1-dismissed";
const NPM_URL = "https://www.npmjs.com/package/coolify-mcp-server";
const GITHUB_URL = "https://github.com/kof70/coolify-mcp-server";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: bouncySpringTransition,
};

export function ReleaseNotification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) setIsVisible(true);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -12,
            scale: 0.95,
            transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
          }}
          transition={{
            ...bouncySpringTransition,
            // Léger overshoot type Sileo
            stiffness: 400,
            damping: 18,
            mass: 0.6,
          }}
          className="fixed top-4 left-1/2 z-[9000] flex w-[min(90vw,420px)] -translate-x-1/2 items-start gap-3 rounded-2xl border border-white/10 bg-black/75 px-4 py-3.5 shadow-xl shadow-black/20 backdrop-blur-md"
          role="status"
          aria-live="polite"
        >
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="flex-1 min-w-0"
          >
            <motion.p
              variants={itemUp}
              className="text-sm font-semibold text-white"
            >
              Coolify MCP Server v1.3.1 — nouvelle release disponible
            </motion.p>
            <motion.p
              variants={itemUp}
              className="mt-1 text-xs text-white/80"
            >
              Package npm et dépôt GitHub à jour
            </motion.p>
            <motion.div
              variants={itemUp}
              className="mt-2 flex gap-2"
            >
              <a
                href={NPM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
              >
                npm
              </a>
              <span className="text-white/30">·</span>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>
          <motion.button
            type="button"
            onClick={dismiss}
            className="shrink-0 rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="Fermer la notification"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <X className="size-4" strokeWidth={2} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
