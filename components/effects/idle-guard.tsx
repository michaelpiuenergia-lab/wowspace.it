"use client";

import { useEffect } from "react";

// Mette il documento in stato "idle" dopo qualche secondo senza interazione:
// la CSS ([data-idle]) mette in pausa le animazioni di sfondo continue (griglia,
// motore ambientale) → la GPU riposa mentre l'utente legge, niente ventole.
// Riprendono appena si muove il mouse, si scrolla o si preme un tasto.
export function IdleGuard() {
  useEffect(() => {
    const root = document.documentElement;
    let timer = 0;

    const goIdle = () => root.setAttribute("data-idle", "");
    const wake = () => {
      root.removeAttribute("data-idle");
      window.clearTimeout(timer);
      timer = window.setTimeout(goIdle, 4000);
    };

    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("pointermove", wake, opts);
    window.addEventListener("pointerdown", wake, opts);
    window.addEventListener("scroll", wake, opts);
    window.addEventListener("keydown", wake, opts);
    wake(); // avvia subito il conto alla rovescia

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("pointerdown", wake);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("keydown", wake);
      root.removeAttribute("data-idle");
    };
  }, []);

  return null;
}
