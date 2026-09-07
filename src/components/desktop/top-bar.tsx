"use client";
import * as React from "react";
import { Icons } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Signal, Wifi } from "lucide-react";

interface TopBarProps {
  className?: string;
}

// Memoize formatted date/time to avoid unnecessary recalculations
function formatDateTime(date: Date, isMobile: boolean, locale: string) {
  if (isMobile) {
    // Format iOS style: "9:41"
    return date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  }

  return (
    date.toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    }) +
    ". " +
    date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
}

export const TopBar: React.FC<TopBarProps> = () => {
  const [dateTime, setDateTime] = React.useState<Date>(new Date());
  const { isMobile } = useIsMobile();
  const { language, setLanguage } = useLanguage();
  const locale = language === "fr" ? "fr-FR" : "en-US";

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
    () => formatDateTime(dateTime, isMobile, locale),
    [dateTime, isMobile, locale],
  );

  // Mobile iOS-style status bar
  if (isMobile) {
    return (
      <nav
        className={cn(
          "h-12 w-full flex justify-between items-center px-6 pt-2",
          "absolute top-0 left-0 right-0 z-50",
          "bg-transparent",
        )}
      >
        {/* Left side - Time (iOS style center-ish on notch phones) */}
        <div className="flex-1 flex items-center">
          <span className="text-white text-base font-semibold">
            {formattedDateTime}
          </span>
        </div>

        {/* Center - Dynamic Island area (empty on non-notch) */}
        <div className="flex-1 flex justify-center">
          {/* Space for dynamic island / notch */}
        </div>

        {/* Right side - Status icons */}
        <div className="flex-1 flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
            className="text-[11px] font-semibold text-white/90 px-2 py-0.5 rounded-md border border-white/30"
          >
            {language.toUpperCase()}
          </button>
          {/* Signal strength */}
          <Signal className="size-4 text-white" strokeWidth={2.5} />

          {/* WiFi */}
          <Wifi className="size-4 text-white" strokeWidth={2.5} />
        </div>
      </nav>
    );
  }

  // Desktop macOS-style menu bar
  return (
    <nav
      className={cn(
        "h-9 bg-black/40 backdrop-blur-xs w-full flex justify-between items-center px-3 shrink-0 relative z-50",
      )}
    >
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 hover:bg-secondary/20 p-2 rounded-full transition-all ease-in-out duration-150">
          <div className="bg-white h-2 rounded-full w-8" />
          <div className="size-2 bg-white/50 rounded-full" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
          className="flex items-center text-white gap-2 hover:bg-secondary/20 p-0.5 px-2 rounded-full transition-all ease-in-out duration-150"
        >
          <span className="text-xs font-semibold">{language.toUpperCase()}</span>
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

export default TopBar;
