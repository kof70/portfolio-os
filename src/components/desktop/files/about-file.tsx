"use client";
import * as React from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

interface AboutFileProps {
  className?: string;
  name?: string;
}

export const AboutFile: React.FC<AboutFileProps> = ({
  className,
  name = "About",
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={`flex cursor-pointer flex-col items-center justify-center ${
        isMobile ? "gap-0.5" : "gap-1"
      } w-full h-full rounded-xl ${className ?? ""}`}
    >
      <Image
        draggable={"false"}
        src="/icons/info.png"
        alt="Info Icon"
        width={isMobile ? 44 : 70}
        height={isMobile ? 44 : 70}
        sizes={isMobile ? "44px" : "70px"}
      />
      <span
        className={`text-white font-medium text-center px-0.5 max-w-full ${
          isMobile ? "text-[10px] leading-3 line-clamp-2" : "text-xs truncate"
        }`}
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}
      >
        {name}
      </span>
    </div>
  );
};
