"use client";

import { useEffect } from "react";

export function PointerGlow() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;

    // --- Scroll → --scroll-progress: SEMPRE attivo. È economico (una lettura di
    // scrollY per frame di scroll) e guida l'opacità/ricchezza dello sfondo, così
    // anche la versione leggera resta viva quando scorri. ---
    let scrollScheduled = false;
    const flushScroll = () => {
      scrollScheduled = false;
      const scrollable = root.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll-progress", progress.toFixed(4));
    };
    const handleScroll = () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      window.requestAnimationFrame(flushScroll);
    };
    flushScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // --- Glow che segue il mouse: attivo sulle macchine capaci con un vero
    // cursore. Si aggiorna solo quando il mouse si muove (quando ti fermi resta
    // dov'è, costo zero); su hardware debole (basso) è statico. ---
    const capable = root.getAttribute("data-perf") !== "basso";
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    let pointerScheduled = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    const flushPointer = () => {
      pointerScheduled = false;
      const rx = (lastPointerX / window.innerWidth - 0.5) * 2;
      const ry = (lastPointerY / window.innerHeight - 0.5) * 2;
      root.style.setProperty("--pointer-x", `${lastPointerX}px`);
      root.style.setProperty("--pointer-y", `${lastPointerY}px`);
      root.style.setProperty("--pointer-rx", rx.toFixed(4));
      root.style.setProperty("--pointer-ry", ry.toFixed(4));
    };
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      if (pointerScheduled) return;
      pointerScheduled = true;
      window.requestAnimationFrame(flushPointer);
    };
    if (capable && finePointer) {
      window.addEventListener("pointermove", handleMove, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return null;
}
