"use client";
import * as React from "react";
import { Icons } from "@/components/icons";
interface TopBarProps {
  className?: string;
}

// Memoize formatted date/time to avoid unnecessary recalculations
function formatDateTime(date: Date) {
  return (
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) +
    ". " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
}

export const TopBar: React.FC<TopBarProps> = () => {
  const [dateTime, setDateTime] = React.useState<Date>(new Date());

  React.useEffect(() => {
    // Use requestAnimationFrame for better performance than setInterval
    let animationFrameId: number;
    let lastUpdate = Date.now();

    const updateTime = () => {
      const now = Date.now();
      // Only update once per second
      if (now - lastUpdate >= 1000) {
        setDateTime(new Date());
        lastUpdate = now;
      }
      animationFrameId = requestAnimationFrame(updateTime);
    };

    animationFrameId = requestAnimationFrame(updateTime);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const formattedDateTime = React.useMemo(
    () => formatDateTime(dateTime),
    [dateTime],
  );

  return (
    <nav className="h-9 bg-black/40 backdrop-blur-xs w-full flex justify-between items-center px-3">
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 hover:bg-secondary/20 p-2 rounded-full transition-all ease-in-out duration-150">
          <div className="bg-white h-2 rounded-full w-8" />
          <div className="size-2 bg-white/50 rounded-full" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center text-white gap-2 hover:bg-secondary/20 p-0.5 px-2 rounded-full transition-all ease-in-out duration-150">
          <span className="text-xs font-semibold">75%</span>
          <Icons.batteryHalf className="size-5 text-muted" />
        </button>
        <button className="flex items-center text-white gap-2 hover:bg-secondary/20 p-0.5 px-2 rounded-full transition-all ease-in-out duration-150">
          <Icons.wifi className="size-5 text-muted" />
        </button>
        <button className="flex items-center text-white gap-2 hover:bg-secondary/20 p-0.5 px-2 rounded-full transition-all ease-in-out duration-150">
          <Icons.search className="size-5 text-muted" />
        </button>
        <button className="flex items-center text-white gap-2 hover:bg-secondary/20 p-0.5 px-2 rounded-full transition-all ease-in-out duration-150">
          {/* Date et Heure style affichage apple */}
          <span className="text-xs font-semibold">{formattedDateTime}</span>
        </button>
      </div>
    </nav>
  );
};
