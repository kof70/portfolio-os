"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dock, DockIcon } from "../ui/dock";
import { CustomTooltip } from "../shared/custom-tooltip";
import { Icons, type IconProps } from "@/components/icons";
import { useWindows } from "./viewer";
import Image from "next/image";
import { popTransition } from "@/lib/animations";
import Link from "next/link";
import { contactLinks } from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  Star,
  Users,
  GitBranch,
  Trophy,
  Building2,
} from "lucide-react";

/**
 * WindowIcons: Map of window IDs to icon components.
 */
const WindowIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  projects: (props: IconProps) => (
    <Image
      src="/icons/project.png"
      alt="Project Icon"
      width={90}
      height={90}
      sizes="56px"
      className={props.className}
    />
  ),
  about: (props: IconProps) => (
    <Image
      src="/icons/info.png"
      alt="Info Icon"
      width={90}
      height={90}
      sizes="56px"
      className={props.className}
    />
  ),
  contact: (props: IconProps) => (
    <Image
      src="/icons/contact.png"
      alt="Contact Icon"
      width={90}
      height={90}
      sizes="56px"
      className={props.className}
    />
  ),
  cv: (props: IconProps) => (
    <div className={cn("flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-1.5", props.className)}>
      <FileText className="size-full text-white" strokeWidth={1.8} />
    </div>
  ),
  "category-recommendation": (props: IconProps) => (
    <div className={cn("flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-1.5", props.className)}>
      <Star className="size-full text-white" strokeWidth={1.8} />
    </div>
  ),
  "category-community": (props: IconProps) => (
    <div className={cn("flex items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-green-600 p-1.5", props.className)}>
      <Users className="size-full text-white" strokeWidth={1.8} />
    </div>
  ),
  "category-opensource": (props: IconProps) => (
    <div className={cn("flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 p-1.5", props.className)}>
      <GitBranch className="size-full text-white" strokeWidth={1.8} />
    </div>
  ),
  "category-hackathon": (props: IconProps) => (
    <div className={cn("flex items-center justify-center rounded-xl bg-gradient-to-br from-red-400 to-red-600 p-1.5", props.className)}>
      <Trophy className="size-full text-white" strokeWidth={1.8} />
    </div>
  ),
  "category-entreprise": (props: IconProps) => (
    <div className={cn("flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 p-1.5", props.className)}>
      <Building2 className="size-full text-white" strokeWidth={1.8} />
    </div>
  ),
};

const exitTransition = {
  duration: 0.2,
  ease: [0.4, 0, 1, 1] as const,
};

export function CustomDock() {
  const { windows, focusWindow, restoreWindow } = useWindows();
  const { isMobile } = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const handleWindowClick = (windowId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  };

  return (
    <div className="w-full">
      <Dock
        className="bg-black/20 rounded-3xl border-[0.5px] border-white/10"
        iconSize={isMobile ? 75 : 60}
        iconMagnification={78}
        iconDistance={isMobile ? 80 : 50}
      >
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="Launcher">
            <Icons.circle className="size-10 text-white" />
          </CustomTooltip>
        </DockIcon>

        {/* Skills / Technologies */}
        <DockIcon hidden={isMobile}>
          <Link
            href="https://www.postman.com/api-platform/api-integration"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Integration API">
              <Icons.apiIntegration className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="TypeScript">
              <Icons.typescript className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="React">
              <Icons.react className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Next.js">
              <Icons.nextjs className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Tailwind CSS">
              <Icons.tailwind className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://nodejs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Node.js">
              <Icons.nodejs className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://git-scm.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Git">
              <Icons.git className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://reactnative.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="React Native">
              <Icons.reactNative className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://expo.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Expo">
              <Icons.expo className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://www.docker.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Docker">
              <Icons.docker className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <Link
            href="https://coolify.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Coolify">
              <Icons.coolify className="size-full" />
            </CustomTooltip>
          </Link>
        </DockIcon>
        {/* Animated Window Icons */}
        <AnimatePresence mode="wait">
          {windows.map((window) => (
            <DockIcon key={window.id} hidden={isMobile} className="mx-2">
              <CustomTooltip label={window.title}>
                <motion.div
                  key={window.id}
                  initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: prefersReducedMotion ? { duration: 0 } : popTransition,
                  }}
                  exit={{
                    scale: prefersReducedMotion ? 1 : 0,
                    opacity: 0,
                    transition: prefersReducedMotion ? { duration: 0.1 } : exitTransition,
                  }}
                  style={{
                    originX: 0.5,
                    originY: 0.5,
                    willChange: prefersReducedMotion ? "auto" : "transform, opacity",
                  }}
                >
                  <button
                    onClick={() =>
                      handleWindowClick(window.id, window.isMinimized)
                    }
                    className="relative w-full h-full md:size-14 shrink-0 flex items-center justify-center"
                  >
                    {WindowIcons[window.id] &&
                      WindowIcons[window.id]({
                        className: "size-14 shrink-0",
                      })}

                    {/* Indicator dot */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.1,
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                        window.isMinimized
                          ? "bg-white/40"
                          : "bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                      }`}
                    />
                  </button>
                </motion.div>
              </CustomTooltip>
            </DockIcon>
          ))}
        </AnimatePresence>
        {/* Separator before social icons */}
        <div hidden={isMobile} className="w-px h-10 bg-white/20 mx-1" />
        {/* Social / Contact Apps */}
        <DockIcon>
          <Link
            href={contactLinks.find((f) => f.id === "github")?.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="GitHub">
              {isMobile ? (
                <Image
                  draggable={false}
                  src="/icons/github-m.png"
                  alt="Github Icon"
                  width={90}
                  height={90}
                  sizes="96px"
                  className="size-24"
                />
              ) : (
                <Icons.githubWithBg className="size-full" />
              )}
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon>
          <Link
            href={contactLinks.find((f) => f.id === "email")?.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="Gmail">
              {isMobile ? (
                <Image
                  draggable={false}
                  src="/icons/gmail-m.png"
                  alt="Gmail Icon"
                  width={90}
                  height={90}
                  sizes="96px"
                  className="size-24"
                />
              ) : (
                <Icons.gmailWithBg className="size-full" />
              )}
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon>
          <Link
            href={contactLinks.find((f) => f.id === "linkedin")?.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="LinkedIn">
              {isMobile ? (
                <Image
                  draggable={false}
                  src="/icons/linkedin-m.png"
                  alt="LinkedIn Icon"
                  width={90}
                  height={90}
                  sizes="96px"
                  className="size-24"
                />
              ) : (
                <Icons.linkedinWithBg className="size-full" />
              )}
            </CustomTooltip>
          </Link>
        </DockIcon>
        <DockIcon>
          <Link
            href={contactLinks.find((f) => f.id === "whatsapp")?.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CustomTooltip label="WhatsApp">
              {isMobile ? (
                <Image
                  draggable={false}
                  src="/icons/whatsapp-m.png"
                  alt="WhatsApp Icon"
                  width={90}
                  height={90}
                  sizes="96px"
                  className="size-24"
                />
              ) : (
                <Icons.whatsappWithBg className="size-full" />
              )}
            </CustomTooltip>
          </Link>
        </DockIcon>
      </Dock>
    </div>
  );
}
