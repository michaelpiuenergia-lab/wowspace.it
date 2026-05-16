"use client";

import { useEffect } from "react";

export function PointerGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        progress.toFixed(4),
      );
    };

    const handleMove = (event: PointerEvent) => {
      const rx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ry = (event.clientY / window.innerHeight - 0.5) * 2;

      document.documentElement.style.setProperty(
        "--pointer-x",
        `${event.clientX}px`,
      );
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${event.clientY}px`,
      );
      document.documentElement.style.setProperty("--pointer-rx", rx.toFixed(4));
      document.documentElement.style.setProperty("--pointer-ry", ry.toFixed(4));
    };

    updateScroll();
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return null;
}
