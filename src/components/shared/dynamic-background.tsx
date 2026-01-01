"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDesktopStorage } from "@/hooks/use-desktop-storage-context";
import { cn } from "@/lib/utils";

const DynamicBackground: React.FC = () => {
  const { isMobile } = useIsMobile();
  const { wallpaper, wallpaperMobile } = useDesktopStorage();

  const currentWallpaper = isMobile ? wallpaperMobile : wallpaper;

  return (
    <div
      className={cn(
        "w-full h-full bg-cover bg-center bg-no-repeat fixed inset-0 transition-all duration-500 -z-10",
      )}
      style={{
        backgroundImage: `url('${currentWallpaper}')`,
      }}
    />
  );
};

export default DynamicBackground;
