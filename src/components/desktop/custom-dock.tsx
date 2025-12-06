"use client";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dock, DockIcon } from "../ui/dock";
import { CustomTooltip } from "../shared/custom-tooltip";
import { Icons, type IconProps } from "@/components/icons";
import { useWindows } from "./viewer";
import Image from "next/image";
import { popTransition } from "@/lib/animations";

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
      className={props.className}
    />
  ),
  about: (props: IconProps) => (
    <Image
      src="/icons/info.png"
      alt="Info Icon"
      width={90}
      height={90}
      className={props.className}
    />
  ),
  contact: (props: IconProps) => (
    <Image
      src="/icons/contact.png"
      alt="Contact Icon"
      width={90}
      height={90}
      className={props.className}
    />
  ),
};

const exitTransition = {
  duration: 0.2,
  ease: [0.4, 0, 1, 1] as const,
};

export function CustomDock() {
  const { windows, focusWindow, restoreWindow } = useWindows();

  const handleWindowClick = (windowId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(windowId);
    } else {
      focusWindow(windowId);
    }
  };

  return (
    <div className="relative">
      <Dock
        className="bg-black/20 backdrop-blur-xs rounded-3xl border-[0.5px] border-white/10"
        iconSize={60}
        iconMagnification={80}
        iconDistance={60}
      >
        <DockIcon>
          <CustomTooltip label="Launcher">
            <Icons.circle className="size-10 text-white" />
          </CustomTooltip>
        </DockIcon>

        {/* Skills / Technologies */}
        <DockIcon>
          <CustomTooltip label="TypeScript">
            <SkillIcons.typescript className="size-full" />
          </CustomTooltip>
        </DockIcon>
        <DockIcon>
          <CustomTooltip label="React">
            <SkillIcons.react className="size-full" />
          </CustomTooltip>
        </DockIcon>
        <DockIcon>
          <CustomTooltip label="Next.js">
            <SkillIcons.nextjs className="size-full" />
          </CustomTooltip>
        </DockIcon>
        <DockIcon>
          <CustomTooltip label="Tailwind CSS">
            <SkillIcons.tailwind className="size-full" />
          </CustomTooltip>
        </DockIcon>
        <DockIcon>
          <CustomTooltip label="Node.js">
            <SkillIcons.nodejs className="size-full" />
          </CustomTooltip>
        </DockIcon>
        <DockIcon>
          <CustomTooltip label="Git">
            <SkillIcons.git className="size-full" />
          </CustomTooltip>
        </DockIcon>
        {/* Animated Window Icons */}
        <AnimatePresence mode="sync">
          {windows.map((window) => (
            <DockIcon key={window.id} className="mx-2">
              <CustomTooltip label={window.title}>
                <motion.div
                  key={window.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: popTransition,
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    transition: exitTransition,
                  }}
                  style={{
                    originX: 0.5,
                    originY: 0.5,
                    willChange: "transform, opacity",
                  }}
                >
                  <button
                    onClick={() =>
                      handleWindowClick(window.id, window.isMinimized)
                    }
                    className="relative w-full h-full flex items-center hover:scale-125 transition-all duration-300 ease-in-out justify-center"
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
        <div className="w-px h-10 bg-white/20 mx-1" />
        {/* Social / Contact Apps */}
        <DockIcon>
          <CustomTooltip label="GitHub">
            <SocialIcons.github className="size-full" />
          </CustomTooltip>
        </DockIcon>
        <DockIcon>
          <CustomTooltip label="Gmail">
            <SocialIcons.gmail className="size-full" />
          </CustomTooltip>
        </DockIcon>
        <DockIcon>
          <CustomTooltip label="LinkedIn">
            <SocialIcons.linkedin className="size-full" />
          </CustomTooltip>
        </DockIcon>
        <DockIcon>
          <CustomTooltip label="WhatsApp">
            <SocialIcons.whatsapp className="size-full" />
          </CustomTooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}

// Skills Icons
const SkillIcons = {
  typescript: (props: IconProps) => (
    <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
      <path
        d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
        fill="#3178C6"
      />
      <path
        d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
        fill="#FFF"
      />
    </svg>
  ),
  react: (props: IconProps) => (
    <div className="rounded-xl overflow-hidden bg-[#20232a] p-1">
      <svg viewBox="0 0 128 128" {...props}>
        <g fill="#61DAFB">
          <circle cx="64" cy="64" r="11.4" />
          <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z" />
        </g>
      </svg>
    </div>
  ),
  nextjs: (props: IconProps) => (
    <svg {...props} viewBox="0 0 180 180">
      <mask
        height="180"
        id="nextjs_icon_dark__:r8:mask0_408_134"
        maskUnits="userSpaceOnUse"
        width="180"
        x="0"
        y="0"
        style={{ maskType: "alpha" }}
      >
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#nextjs_icon_dark__:r8:mask0_408_134)">
        <circle cx="90" cy="90" data-circle="true" fill="black" r="90" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#nextjs_icon_dark__:r8:paint0_linear_408_134)"
        />
        <rect
          fill="url(#nextjs_icon_dark__:r8:paint1_linear_408_134)"
          height="72"
          width="12"
          x="115"
          y="54"
        />
      </g>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="nextjs_icon_dark__:r8:paint0_linear_408_134"
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="nextjs_icon_dark__:r8:paint1_linear_408_134"
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  tailwind: (props: IconProps) => (
    <svg {...props} fill="none" viewBox="0 0 54 33">
      <g clipPath="url(#tailwindcss__a)">
        <path
          fill="#38bdf8"
          fillRule="evenodd"
          d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="tailwindcss__a">
          <path fill="#fff" d="M0 0h54v32.4H0z" />
        </clipPath>
      </defs>
    </svg>
  ),
  nodejs: (props: IconProps) => (
    <svg
      {...props}
      viewBox="0 0 256 292"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <linearGradient
          id="nodejs__a"
          x1="68.188%"
          x2="27.823%"
          y1="17.487%"
          y2="89.755%"
        >
          <stop offset="0%" stopColor="#41873F" />
          <stop offset="32.88%" stopColor="#418B3D" />
          <stop offset="63.52%" stopColor="#419637" />
          <stop offset="93.19%" stopColor="#3FA92D" />
          <stop offset="100%" stopColor="#3FAE2A" />
        </linearGradient>
        <linearGradient
          id="nodejs__c"
          x1="43.277%"
          x2="159.245%"
          y1="55.169%"
          y2="-18.306%"
        >
          <stop offset="13.76%" stopColor="#41873F" />
          <stop offset="40.32%" stopColor="#54A044" />
          <stop offset="71.36%" stopColor="#66B848" />
          <stop offset="90.81%" stopColor="#6CC04A" />
        </linearGradient>
        <linearGradient
          id="nodejs__f"
          x1="-4.389%"
          x2="101.499%"
          y1="49.997%"
          y2="49.997%"
        >
          <stop offset="9.192%" stopColor="#6CC04A" />
          <stop offset="28.64%" stopColor="#66B848" />
          <stop offset="59.68%" stopColor="#54A044" />
          <stop offset="86.24%" stopColor="#41873F" />
        </linearGradient>
        <path
          id="nodejs__b"
          d="M134.923 1.832c-4.344-2.443-9.502-2.443-13.846 0L6.787 67.801C2.443 70.244 0 74.859 0 79.745v132.208c0 4.887 2.715 9.502 6.787 11.945l114.29 65.968c4.344 2.444 9.502 2.444 13.846 0l114.29-65.968c4.344-2.443 6.787-7.058 6.787-11.945V79.745c0-4.886-2.715-9.501-6.787-11.944L134.923 1.832Z"
        />
        <path
          id="nodejs__e"
          d="M134.923 1.832c-4.344-2.443-9.502-2.443-13.846 0L6.787 67.801C2.443 70.244 0 74.859 0 79.745v132.208c0 4.887 2.715 9.502 6.787 11.945l114.29 65.968c4.344 2.444 9.502 2.444 13.846 0l114.29-65.968c4.344-2.443 6.787-7.058 6.787-11.945V79.745c0-4.886-2.715-9.501-6.787-11.944L134.923 1.832Z"
        />
      </defs>
      <path
        fill="url(#nodejs__a)"
        d="M134.923 1.832c-4.344-2.443-9.502-2.443-13.846 0L6.787 67.801C2.443 70.244 0 74.859 0 79.745v132.208c0 4.887 2.715 9.502 6.787 11.945l114.29 65.968c4.344 2.444 9.502 2.444 13.846 0l114.29-65.968c4.344-2.443 6.787-7.058 6.787-11.945V79.745c0-4.886-2.715-9.501-6.787-11.944L134.923 1.832Z"
      />
      <mask id="nodejs__d" fill="#fff">
        <use xlinkHref="#nodejs__b" />
      </mask>
      <path
        fill="url(#nodejs__c)"
        d="M249.485 67.8 134.65 1.833c-1.086-.542-2.443-1.085-3.529-1.357L2.443 220.912c1.086 1.357 2.444 2.443 3.8 3.258l114.834 65.968c3.258 1.9 7.059 2.443 10.588 1.357L252.47 70.515c-.815-1.086-1.9-1.9-2.986-2.714Z"
        mask="url(#nodejs__d)"
      />
      <mask id="nodejs__g" fill="#fff">
        <use xlinkHref="#nodejs__e" />
      </mask>
      <path
        fill="url(#nodejs__f)"
        d="M249.756 223.898c3.258-1.9 5.701-5.158 6.787-8.687L130.579.204c-3.258-.543-6.787-.272-9.773 1.628L6.786 67.53l122.979 224.238c1.628-.272 3.529-.815 5.158-1.63l114.833-66.239Z"
        mask="url(#nodejs__g)"
      />
    </svg>
  ),
  git: (props: IconProps) => (
    <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
      <path
        d="M251.17 116.6 139.4 4.82a16.49 16.49 0 0 0-23.31 0l-23.21 23.2 29.44 29.45a19.57 19.57 0 0 1 24.8 24.96l28.37 28.38a19.61 19.61 0 1 1-11.75 11.06L137.28 95.4v69.64a19.62 19.62 0 1 1-16.13-.57V94.2a19.61 19.61 0 0 1-10.65-25.73L81.46 39.44 4.83 116.08a16.49 16.49 0 0 0 0 23.32L116.6 251.17a16.49 16.49 0 0 0 23.32 0l111.25-111.25a16.5 16.5 0 0 0 0-23.33"
        fill="#DE4C36"
      />
    </svg>
  ),
};

// Social Icons
const SocialIcons = {
  github: (props: IconProps) => (
    <div className="bg-black rounded-full">
      <svg {...props} viewBox="0 0 1024 1024">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
          transform="scale(64)"
          fill="#fff"
        />
      </svg>
    </div>
  ),
  gmail: (props: IconProps) => (
    <div className="rounded-xl">
      <svg {...props} viewBox="0 49.4 512 399.42">
        <g fill="none" fillRule="evenodd">
          <g fillRule="nonzero">
            <path
              fill="#4285f4"
              d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
            />
            <path
              fill="#34a853"
              d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
            />
            <path
              fill="#fbbc04"
              d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
            />
          </g>
          <path
            fill="#ea4335"
            d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
          />
          <path
            fill="#c5221f"
            fillRule="nonzero"
            d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
          />
        </g>
      </svg>
    </div>
  ),
  linkedin: (props: IconProps) => (
    <div className="rounded-sm overflow-hidden size-[90%]">
      <svg {...props} preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
        <path d="M0 0h250v250H0z" fill="#ffff" />
        <path
          d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
          fill="#0A66C2"
        />
      </svg>
    </div>
  ),
  whatsapp: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 175.216 175.552"
      {...props}
    >
      <defs>
        <linearGradient
          id="b"
          x1="85.915"
          x2="86.535"
          y1="32.567"
          y2="137.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
        <filter
          id="a"
          width="1.115"
          height="1.114"
          x="-.057"
          y="-.057"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="3.531" />
        </filter>
      </defs>
      <path
        fill="#b3b3b3"
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        filter="url(#a)"
      />
      <path
        fill="#fff"
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
      />
      <path
        fill="url(#linearGradient1780)"
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
      />
      <path
        fill="url(#b)"
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
      />
    </svg>
  ),
};
