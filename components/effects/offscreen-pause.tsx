"use client";

import { useEffect } from "react";

type OffscreenPauseProps = {
  /** selettore dell'elemento da osservare (es. "[data-hero]") */
  target: string;
};

// Mette data-offscreen sull'elemento quando esce dallo schermo e lo toglie
// quando rientra: la CSS ci aggancia la pausa delle animazioni in loop
// (pavimento 3D dell'hero, marquee). Un loop infinito non deve girare per una
// cosa che non vedi — vale soprattutto sul telefono, dove non c'è IdleGuard.
export function OffscreenPause({ target }: OffscreenPauseProps) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(target);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) el.removeAttribute("data-offscreen");
        else el.setAttribute("data-offscreen", "");
      },
      { threshold: 0.02 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.removeAttribute("data-offscreen");
    };
  }, [target]);

  return null;
}
