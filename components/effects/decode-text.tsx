"use client";

import { useEffect, useState } from "react";

type DecodeTextProps = {
  text: string;
  className?: string;
  /** ritardo prima di iniziare (ms) */
  delay?: number;
  /** durata totale della decodifica (ms) */
  duration?: number;
};

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+<>/\\|=_";

// "Decodifica" un testo: parte da caratteri casuali e si risolve da sinistra a
// destra nel testo vero. Il server rende SUBITO il testo finale (SEO, no-JS):
// l'effetto parte solo dopo il mount, dura ~1s e poi il DOM è di nuovo
// esattamente il testo originale. Mentre gira, la copia che cambia è
// aria-hidden e il testo vero resta disponibile (visivamente nascosto) agli
// screen reader. Un solo nodo di testo aggiornato per frame: costo
// trascurabile anche su mobile. Fermo con "riduci movimento", su hardware
// debole e se l'intro è già stata vista in sessione (data-booted).
export function DecodeText({
  text,
  className,
  delay = 120,
  duration = 950,
}: DecodeTextProps) {
  const [display, setDisplay] = useState(text);
  const [scrambling, setScrambling] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    if (root.hasAttribute("data-booted")) return;
    if (root.getAttribute("data-perf") === "basso") return;
    const chars = Array.from(text);
    // separatori e spazi restano fissi: la struttura si legge da subito
    const isFixed = (ch: string) => /[\s·•|/-]/.test(ch);
    let raf = 0;
    let startAt = 0;

    const frame = (now: number) => {
      if (!startAt) startAt = now;
      const t = Math.min(1, (now - startAt) / duration);
      // frontiera che avanza: prima delle sue posizioni il testo è risolto,
      // dopo è ancora "rumore"
      const resolved = Math.floor(t * chars.length);
      let out = "";
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        if (isFixed(ch) || i < resolved) out += ch;
        else out += POOL[Math.floor(Math.random() * POOL.length)];
      }
      if (t >= 1) {
        setDisplay(text);
        setScrambling(false);
        return;
      }
      setDisplay(out);
      raf = requestAnimationFrame(frame);
    };

    const timer = window.setTimeout(() => {
      setScrambling(true);
      raf = requestAnimationFrame(frame);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text, delay, duration]);

  return (
    <span className={className}>
      <span aria-hidden={scrambling || undefined}>{display}</span>
      {scrambling && <span className="sr-only">{text}</span>}
    </span>
  );
}
