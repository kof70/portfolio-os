"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import * as React from "react";

interface BackgroundProps {
  wallpaper?: string;
  wallpaperMobile?: string;
}

const Background: React.FC<BackgroundProps> = ({
  wallpaper = "/assets/bg-3.jpg",
  wallpaperMobile = "/assets/bg-mobile.jpg",
}) => {
  const { isMobile } = useIsMobile();
  const currentWallpaper = isMobile ? wallpaperMobile : wallpaper;

  return (
    <div
      className={cn(
        "w-full h-full bg-cover bg-center bg-no-repeat absolute top-0 left-0 transition-all duration-500",
      )}
      style={{
        backgroundImage: `url('${currentWallpaper}')`,
      }}
    />
  );
};

export default Background;
