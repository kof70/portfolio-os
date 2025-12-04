"use client";
import * as React from "react";
import { CustomDock } from "./custom-dock";

interface BottomBarProps {
  className?: string;
}

export const BottomBar: React.FC<BottomBarProps> = () => {
  return (
    <footer className="flex flex-col items-center p-3 w-full">
      <CustomDock />
    </footer>
  );
};
