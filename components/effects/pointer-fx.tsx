"use client";

import { useEffect, useRef } from "react";
import styles from "./pointer-fx.module.css";

// Livello interattivo da desktop (solo mouse vero, mai su touch né con
// "riduci movimento" né su hardware debole):
// - cursore custom: un punto che segue il mouse e un anello che lo insegue
//   con un filo di inerzia; si allarga sui link, diventa lime sulle CTA,
//   sparisce sui campi di testo (lì torna il cursore di sistema);
// - CTA magnetiche ([data-magnet]): il bottone si sposta di qualche px verso
//   il mouse mentre ci sei sopra e torna a posto quando esci;
// - tilt 3D ([data-tilt]): il mock si inclina seguendo il mouse, con un
//   riflesso che si sposta (--gx/--gy);
// - spotlight ([data-spot]): il bordo della card si illumina dove sei.
// Un solo listener pointermove; il lavoro vero avviene in un rAF (una volta
// per frame), che si spegne da solo quando l'anello ha raggiunto il punto.
const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary';

export function PointerFx() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;
    if (root.getAttribute("data-perf") === "basso") return;

    let disabled = false;
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let raf = 0;
    let target: Element | null = null;
    let dirty = false;

    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;
    let spot: HTMLElement | null = null;

    const clearMagnet = () => {
      if (!magnet) return;
      magnet.style.removeProperty("--mx");
      magnet.style.removeProperty("--my");
      magnet = null;
    };
    const clearTilt = () => {
      if (!tilt) return;
      for (const v of ["--tx", "--ty", "--gx", "--gy"]) {
        tilt.style.removeProperty(v);
      }
      tilt = null;
    };
    const clearSpot = () => {
      if (!spot) return;
      spot.removeAttribute("data-spot-on");
      spot = null;
    };

    const frame = () => {
      raf = 0;
      // l'anello insegue il punto con inerzia
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0)`;

      if (dirty) {
        dirty = false;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        // stato del cursore in base a ciò che c'è sotto
        const inter = target?.closest?.(INTERACTIVE) as HTMLElement | null;
        let state = "on";
        if (inter) {
          state = /^(INPUT|TEXTAREA|SELECT)$/.test(inter.tagName)
            ? "text"
            : inter.closest('[data-magnet="primary"]')
              ? "cta"
              : "link";
        }
        root.setAttribute("data-cursor", state);

        // magnete
        const m = (target?.closest?.("[data-magnet]") as HTMLElement) ?? null;
        if (m !== magnet) {
          clearMagnet();
          magnet = m;
        }
        if (magnet) {
          const r = magnet.getBoundingClientRect();
          const dx = (x - (r.left + r.width / 2)) / r.width;
          const dy = (y - (r.top + r.height / 2)) / r.height;
          magnet.style.setProperty("--mx", `${(dx * 16).toFixed(1)}px`);
          magnet.style.setProperty("--my", `${(dy * 12).toFixed(1)}px`);
        }

        // tilt 3D + riflesso
        const t = (target?.closest?.("[data-tilt]") as HTMLElement) ?? null;
        if (t !== tilt) {
          clearTilt();
          tilt = t;
        }
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const px = Math.min(1, Math.max(0, (x - r.left) / r.width));
          const py = Math.min(1, Math.max(0, (y - r.top) / r.height));
          tilt.style.setProperty("--tx", (px * 2 - 1).toFixed(3));
          tilt.style.setProperty("--ty", (py * 2 - 1).toFixed(3));
          tilt.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
          tilt.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        }

        // spotlight
        const s = (target?.closest?.("[data-spot]") as HTMLElement) ?? null;
        if (s !== spot) {
          clearSpot();
          spot = s;
          if (spot) spot.setAttribute("data-spot-on", "");
        }
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--sx", `${(x - r.left).toFixed(1)}px`);
          spot.style.setProperty("--sy", `${(y - r.top).toFixed(1)}px`);
        }
      }

      if (Math.abs(x - rx) > 0.15 || Math.abs(y - ry) > 0.15 || dirty) {
        raf = requestAnimationFrame(frame);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (disabled || e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      target = e.target as Element | null;
      dirty = true;
      schedule();
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") root.setAttribute("data-cursor-press", "");
    };
    const onUp = () => root.removeAttribute("data-cursor-press");
    // il mouse esce dalla finestra (mouseout senza relatedTarget) → il cursore
    // custom sparisce e torna quello di sistema (niente "cursore fantasma")
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) onLeave();
    };
    const onLeave = () => {
      root.removeAttribute("data-cursor");
      root.removeAttribute("data-cursor-press");
      clearMagnet();
      clearTilt();
      clearSpot();
    };
    // Se PerfGuard declassa a "basso" dopo la misura FPS, ci spegniamo.
    const perfWatch = new MutationObserver(() => {
      if (root.getAttribute("data-perf") === "basso") {
        disabled = true;
        onLeave();
      }
    });
    perfWatch.observe(root, {
      attributes: true,
      attributeFilter: ["data-perf"],
    });

    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("pointermove", onMove, opts);
    window.addEventListener("pointerdown", onDown, opts);
    window.addEventListener("pointerup", onUp, opts);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", onLeave);
      perfWatch.disconnect();
      if (raf) cancelAnimationFrame(raf);
      onLeave();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true">
        <i />
      </div>
      <div ref={ringRef} className={styles.ring} aria-hidden="true">
        <i />
      </div>
    </>
  );
}
