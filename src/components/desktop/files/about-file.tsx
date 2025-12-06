"use client";
import * as React from "react";
import Image from "next/image";

interface AboutFileProps {
  className?: string;
  name?: string;
}

export const AboutFile: React.FC<AboutFileProps> = ({
  className,
  name = "About",
}) => {
  return (
    <div
      className={`flex cursor-pointer flex-col items-center justify-center gap-1 w-full h-full rounded-xl hover:bg-white/20 hover:border-[0.5px] border-white/10 transition-colors ease-in-out duration-150 select-none ${className ?? ""}`}
    >
      <Image
        draggable={"false"}
        src="/icons/info.png"
        alt="Info Icon"
        width={70}
        height={70}
      />
      <span className="text-xs text-white font-medium text-shadow-lg/30 text-center px-1 truncate max-w-full">
        {name}
      </span>
    </div>
  );
};
