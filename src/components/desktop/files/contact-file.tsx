"use client";
import * as React from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

interface ContactFileProps {
  className?: string;
  name?: string;
}

export const ContactFile: React.FC<ContactFileProps> = ({
  className,
  name = "Contact",
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div
      className={`flex cursor-pointer flex-col items-center justify-center ${
        isMobile ? "gap-0.5" : "gap-1"
      } w-full h-full rounded-xl hover:bg-white/20 hover:border-[0.5px] border-white/10 transition-colors ease-in-out duration-150 select-none ${className ?? ""}`}
    >
      <Image
        draggable={"false"}
        src="/icons/contact.png"
        alt="Contact Icon"
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
