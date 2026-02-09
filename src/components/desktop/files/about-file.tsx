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
      className={`flex cursor-pointer flex-col items-center justify-center gap-1 w-full h-full rounded-xl ${className ?? ""}`}
    >
      <Image
        draggable={"false"}
        src="/icons/info.png"
        alt="Info Icon"
        width={70}
        height={70}
        sizes="70px"
      />
      <span className="text-xs text-white font-medium text-center px-1 truncate max-w-full" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}>
        {name}
      </span>
    </div>
  );
};
