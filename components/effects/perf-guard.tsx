"use client";

import { useEffect } from "react";

// Rete di sicurezza sugli FPS reali. Il tier iniziale (data-perf) lo mette lo
// script inline del layout da CPU/RAM, ma quei segnali NON vedono la GPU: una
// macchina con CPU decente ma grafica integrata debole arranca lo stesso. Qui
// campioniamo gli FPS del documento subito dopo il caricamento e, se sono
// bassi, declassiamo a "basso": la CSS toglie i blur, congela il glow del mouse
// e ferma le animazioni continue. Non torniamo mai indietro (nessun rimbalzo).
export function PerfGuard() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-perf") === "basso") return; // già al minimo
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let frames = 0;
    let start = 0;

    const measure = (t: number) => {
      if (!start) start = t;
      frames += 1;
      const elapsed = t - start;
      // ~1,5s di osservazione: abbastanza per distinguere una macchina che
      // regge (55-60 fps) da una che arranca (<45), senza dare un verdetto
      // sul singolo frame ballerino.
      if (elapsed >= 1500) {
        const fps = (frames * 1000) / elapsed;
        if (fps < 45) root.setAttribute("data-perf", "basso");
        return;
      }
      raf = requestAnimationFrame(measure);
    };

    // Aspettiamo che il caricamento si assesti (hydration, disegno del campo
    // stellare) per non scambiare il jank iniziale per una GPU debole.
    const startTimer = window.setTimeout(() => {
      raf = requestAnimationFrame(measure);
    }, 1200);

    return () => {
      window.clearTimeout(startTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
