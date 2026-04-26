"use client";
import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dock, DockIcon } from "../ui/dock";
import { CustomTooltip } from "../shared/custom-tooltip";
import { Icons, type IconProps } from "@/components/icons";
import { ProjectsView, useWindows } from "./viewer";
import Image from "next/image";
import { popTransition } from "@/lib/animations";
import Link from "next/link";
import {
  contactLinks,
  getDockTechProjects,
  type DockTechId,
} from "@/lib/data";
import { useIsMobile } from "@/hooks/use-mobile";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { DockProjectPopover } from "./dock-project-popover";
import { DockSearchPopover } from "./dock-search-popover";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/i18n";

const DOCK_TECH_LABELS: Record<DockTechId, string> = {
  postman: "API",
  typescript: "TypeScript",
  react: "React",
  nextjs: "Next.js",
  tailwind: "Tailwind CSS",
  nodejs: "Node.js",
  git: "Git",
  reactnative: "React Native",
  expo: "Expo",
  docker: "Docker",
  coolify: "Coolify",
};
import {
  FileText,
  Star,
  Users,
  GitBranch,
  Trophy,
  Building2,
  ImageIcon,
} from "lucide-react";
import { useDesktopStorage } from "@/hooks/use-desktop-storage-context";

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
  const { windows, focusWindow, restoreWindow, openWindow } = useWindows();
  const { isMobile } = useIsMobile();
  const { language } = useLanguage();
  const { openWallpaperPicker } = useDesktopStorage();
  const prefersReducedMotion = useReducedMotion();
  const [dockPopover, setDockPopover] = useState<{
    techId: DockTechId;
    anchorRect: DOMRect;
  } | null>(null);
  const [searchPopoverRect, setSearchPopoverRect] = useState<DOMRect | null>(null);
  const dockTechLabels = React.useMemo(
    () => ({
      ...DOCK_TECH_LABELS,
      postman: t(language, "integrationApi"),
    }),
    [language],
  );

  const openDockPopover = useCallback((techId: DockTechId, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSearchPopoverRect(null);
    setDockPopover({ techId, anchorRect: rect });
  }, []);
  const closeDockPopover = useCallback(() => setDockPopover(null), []);

  const handleWindowClick = (windowId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  };

  const handleOpenProjectFromDock = useCallback(
    (projectId: string) => {
      openWindow({
        id: "projects",
        title: t(language, "projects"),
        content: <ProjectsView initialProjectId={projectId} />,
        position: { x: 100, y: 50 },
        size: { width: 900, height: 600 },
        minSize: { width: 600, height: 400 },
        isMinimized: false,
        isMaximized: false,
      });
    },
    [language, openWindow],
  );

  const handleToggleSearchPopover = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDockPopover(null);
    setSearchPopoverRect((prev) => (prev ? null : rect));
  }, []);

  const closeSearchPopover = useCallback(() => setSearchPopoverRect(null), []);

  if (isMobile) {
    const mobileLinks = [
      { id: "github", icon: "/icons/github-m.png", label: "GitHub" },
      { id: "email", icon: "/icons/gmail-m.png", label: "Gmail" },
      { id: "linkedin", icon: "/icons/linkedin-m.png", label: "LinkedIn" },
      { id: "whatsapp", icon: "/icons/whatsapp-m.png", label: "WhatsApp" },
    ] as const;

    return (
      <div className="w-full flex justify-center">
        <DockSearchPopover
          open={searchPopoverRect !== null}
          onClose={closeSearchPopover}
          anchorRect={searchPopoverRect}
        />
        <div
          className={cn(
            "w-fit flex items-center gap-1.5 rounded-[20px] border border-white/12",
            "bg-black/45 backdrop-blur-2xl px-2 py-1.5 shadow-lg shadow-black/50",
          )}
        >
          <button
            type="button"
            onClick={handleToggleSearchPopover}
            className="size-10 !min-h-0 !min-w-0 shrink-0 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label={t(language, "openSearch")}
          >
            <Icons.circle className="size-6 text-white/90" />
          </button>

          <button
            type="button"
            onClick={openWallpaperPicker}
            className="size-10 !min-h-0 !min-w-0 shrink-0 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Changer le fond d'écran"
          >
            <ImageIcon className="size-5 text-white/80" />
          </button>

          <div className="w-px h-7 bg-white/15" />

          {mobileLinks.map((item) => {
            const href = contactLinks.find((f) => f.id === item.id)?.href || "#";
            return (
              <Link
                key={item.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 !min-h-0 !min-w-0 shrink-0 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label={item.label}
              >
                <Image
                  draggable={false}
                  src={item.icon}
                  alt={`${item.label} Icon`}
                  width={36}
                  height={36}
                  sizes="36px"
                  className="size-9"
                />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DockProjectPopover
        open={dockPopover !== null}
        onClose={closeDockPopover}
        onSelectProject={handleOpenProjectFromDock}
        anchorRect={dockPopover?.anchorRect ?? null}
        label={dockPopover ? dockTechLabels[dockPopover.techId] : ""}
        items={dockPopover ? getDockTechProjects(dockPopover.techId) : []}
      />
      <DockSearchPopover
        open={searchPopoverRect !== null}
        onClose={closeSearchPopover}
        anchorRect={searchPopoverRect}
      />
      <Dock
        className={cn(
          "bg-black/20 rounded-3xl border-[0.5px] border-white/10",
          isMobile ? "h-16 gap-1 p-1.5 rounded-2xl" : "",
        )}
        iconSize={isMobile ? 48 : 60}
        iconMagnification={isMobile ? 48 : 78}
        iconDistance={isMobile ? 36 : 50}
      >
        <DockIcon hidden={isMobile}>
          <CustomTooltip label={t(language, "launcher")}>
            <button
              type="button"
              onClick={handleToggleSearchPopover}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.circle className="size-10 text-white" />
            </button>
          </CustomTooltip>
        </DockIcon>

        {/* Skills / Technologies — clic = popover Projets */}
        <DockIcon hidden={isMobile}>
          <CustomTooltip label={t(language, "integrationApi")}>
            <button
              type="button"
              onClick={(e) => openDockPopover("postman", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.apiIntegration className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="TypeScript">
            <button
              type="button"
              onClick={(e) => openDockPopover("typescript", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.typescript className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="React">
            <button
              type="button"
              onClick={(e) => openDockPopover("react", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.react className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="Next.js">
            <button
              type="button"
              onClick={(e) => openDockPopover("nextjs", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.nextjs className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="Tailwind CSS">
            <button
              type="button"
              onClick={(e) => openDockPopover("tailwind", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.tailwind className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="Node.js">
            <button
              type="button"
              onClick={(e) => openDockPopover("nodejs", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.nodejs className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="Git">
            <button
              type="button"
              onClick={(e) => openDockPopover("git", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.git className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="React Native">
            <button
              type="button"
              onClick={(e) => openDockPopover("reactnative", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.reactNative className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="Expo">
            <button
              type="button"
              onClick={(e) => openDockPopover("expo", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.expo className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="Docker">
            <button
              type="button"
              onClick={(e) => openDockPopover("docker", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.docker className="size-full" />
            </button>
          </CustomTooltip>
        </DockIcon>
        <DockIcon hidden={isMobile}>
          <CustomTooltip label="Coolify">
            <button
              type="button"
              onClick={(e) => openDockPopover("coolify", e)}
              className="w-full h-full flex items-center justify-center"
            >
              <Icons.coolify className="size-full" />
            </button>
          </CustomTooltip>
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
                  sizes="44px"
                  className="size-11"
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
                  sizes="44px"
                  className="size-11"
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
                  sizes="44px"
                  className="size-11"
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
                  sizes="44px"
                  className="size-11"
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
