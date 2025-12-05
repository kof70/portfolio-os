"use client";

import * as React from "react";
import { useWindows } from "./window-context";
import { Window } from "./window";

interface WindowManagerProps {
  className?: string;
}

export const WindowManager: React.FC<WindowManagerProps> = ({ className }) => {
  const { windows } = useWindows();

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-100 ${className ?? ""}`}
    >
      {windows.map((window) => (
        <div key={window.id} className="pointer-events-auto">
          <Window window={window} />
        </div>
      ))}
    </div>
  );
};

export default WindowManager;
