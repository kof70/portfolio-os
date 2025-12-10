"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import * as React from "react";

const Background: React.FC = () => {
  const { isMobile } = useIsMobile();
  return (
    <div
      className={cn("w-full h-full  bg-cover absolute top-0 left-0", {
        "bg-[url('/assets/bg-mobile.jpg')]": isMobile,
        "bg-[url('/assets/bg-3.jpg')]": !isMobile,
      })}
    />
  );
};

export default Background;
