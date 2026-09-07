"use client";

import * as React from "react";

/**
 * Keeps a `--app-height` CSS variable in sync with the *visible* viewport height.
 *
 * iOS Safari's `100vh` / `height: 100%` resolve against the large viewport
 * (toolbars retracted), which leaves the layout taller than what the user sees
 * and makes fixed elements (the dock) drift while the address bar animates.
 * `visualViewport.height` — with `window.innerHeight` as a fallback — always
 * reflects the currently visible area, so the layout stays put.
 *
 * Modern browsers get `100dvh` from CSS; this variable is the fallback and the
 * value the mobile home screen uses for its vertical centering math.
 */
export function useAppHeight() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const vv = window.visualViewport;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const h = Math.round(vv?.height ?? window.innerHeight);
      if (h > 0) {
        document.documentElement.style.setProperty("--app-height", `${h}px`);
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("resize", schedule);
    window.addEventListener("orientationchange", schedule);
    vv?.addEventListener("resize", schedule);
    vv?.addEventListener("scroll", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("orientationchange", schedule);
      vv?.removeEventListener("resize", schedule);
      vv?.removeEventListener("scroll", schedule);
    };
  }, []);
}
