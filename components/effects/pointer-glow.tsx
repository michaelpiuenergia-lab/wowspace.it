"use client";

import { useEffect } from "react";

export function PointerGlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hardware debole (tier "basso"): il glow che segue il mouse è un layer
    // fisso a tutto schermo che si ridipinge ad ogni movimento. Lo saltiamo:
    // la CSS ([data-perf="basso"]) mostra un fallback statico congelato.
    if (document.documentElement.getAttribute("data-perf") === "basso") return;

    // Touch / coarse-pointer devices: no real cursor to follow, and the
    // scroll listener drives multiple CSS-var consumers which causes
    // jank on iOS Safari. We exit cleanly and the visuals get a frozen
    // (non-interactive) fallback from globals.css.
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const root = document.documentElement;
    let scrollScheduled = false;
    let pointerScheduled = false;
    let lastPointerX = 0;
    let lastPointerY = 0;

    const flushScroll = () => {
      scrollScheduled = false;
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    const flushPointer = () => {
      pointerScheduled = false;
      const rx = (lastPointerX / window.innerWidth - 0.5) * 2;
      const ry = (lastPointerY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--pointer-x", `${lastPointerX}px`);
      root.style.setProperty("--pointer-y", `${lastPointerY}px`);
      root.style.setProperty("--pointer-rx", rx.toFixed(4));
      root.style.setProperty("--pointer-ry", ry.toFixed(4));
    };

    const handleScroll = () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      window.requestAnimationFrame(flushScroll);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      if (pointerScheduled) return;
      pointerScheduled = true;
      window.requestAnimationFrame(flushPointer);
    };

    flushScroll();
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
