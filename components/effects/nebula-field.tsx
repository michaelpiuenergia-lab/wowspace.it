"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  paintPlanet,
  planPlanets,
  type PlanetSpec,
} from "@/components/effects/draw-planets";
import styles from "./nebula-field.module.css";

// Lo spazio dietro a tutte le pagine: un campo stellare disegnato UNA volta
// su canvas (nessun loop) e pochi pianeti, ognuno sul proprio canvas, che il
// CSS fa derivare piano e scorrere in parallasse con lo scroll (solo
// transform: gira anche sul telefono). Cambiando pagina la galassia "si
// sposta": le stelle fanno un breve warp e i pianeti scivolano in posizioni
// nuove. Montato una volta nel layout. Le nebulose che inseguivano il mouse
// sono state tolte su richiesta del cliente.
type Shift = { x: number; y: number };

export function NebulaField() {
  const pathname = usePathname();
  const hostRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const [planets, setPlanets] = useState<PlanetSpec[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const lastPath = useRef<string | null>(null);

  // Campo stellare: disegnato una volta. Anche su touch: è l'unico pezzo di
  // "spazio" che il telefono può permettersi (un filo più rado, DPR più basso).
  useEffect(() => {
    const host = hostRef.current;
    const cv = starsRef.current;
    if (!host || !cv) return;
    const touch = document.documentElement.getAttribute("data-perf") === "off";
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let lastW = 0;
    let lastH = 0;

    const draw = () => {
      // letto a ogni disegno: cambiando monitor il DPR può cambiare
      const dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2);
      const r = host.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      if (w === 0 || h === 0) return;
      // Su mobile la barra degli indirizzi che si nasconde cambia l'altezza
      // di poco: ridisegnare sposterebbe tutte le stelle a ogni scroll.
      // Ridisegniamo solo per cambi veri (rotazione, finestra ridimensionata).
      if (
        lastW &&
        Math.abs(w - lastW) < 2 &&
        Math.abs(h - lastH) < lastH * 0.25
      )
        return;
      lastW = w;
      lastH = h;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const n = Math.round((w * h) / (touch ? 14000 : 11000)); // rade
      for (let i = 0; i < n; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const b = Math.random();
        const bright = b > 0.975;
        const rad = bright ? 1.2 + Math.random() : 0.3 + Math.random() * 0.9;
        const alpha = 0.18 + b * 0.5;
        if (bright) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, rad * 7);
          g.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          g.addColorStop(1, "rgba(150, 180, 255, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, rad * 7, 0, Math.PI * 2);
          ctx.fill();
        }
        const tint = b > 0.7 ? "255, 255, 255" : "210, 224, 255";
        ctx.fillStyle = `rgba(${tint}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  // Pianeti: generati sul client (posizioni casuali → niente mismatch di
  // hydration; il server non li rende, sono decorativi).
  useEffect(() => {
    const specs = planPlanets();
    setPlanets(specs);
    setShifts(specs.map(() => ({ x: 0, y: 0 })));
  }, []);

  // Cambio pagina: warp delle stelle + i pianeti scivolano altrove.
  useEffect(() => {
    if (lastPath.current === null) {
      lastPath.current = pathname;
      return;
    }
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const host = hostRef.current;
    if (host) {
      host.removeAttribute("data-warp");
      // l'animazione riparte al frame dopo (niente reflow forzato di tutta la
      // pagina: costava 150 ms a ogni cambio pagina sul telefono)
      requestAnimationFrame(() => host.setAttribute("data-warp", ""));
      window.setTimeout(() => host.removeAttribute("data-warp"), 1250);
    }
    // spostamenti ampi (fino a ±40% dello schermo): devono VEDERSI
    setShifts((prev) =>
      prev.map(() => ({
        x: (Math.random() - 0.5) * window.innerWidth * 0.8,
        y: (Math.random() - 0.5) * window.innerHeight * 0.5,
      })),
    );
  }, [pathname]);

  return (
    <div ref={hostRef} className={styles.field} aria-hidden="true">
      <canvas ref={starsRef} className={styles.stars} />
      <div className={styles.flash} />
      {planets.map((spec, index) => (
        <Planet key={spec.id} spec={spec} shift={shifts[index]} />
      ))}
    </div>
  );
}

function Planet({ spec, shift }: { spec: PlanetSpec; shift?: Shift }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const touch = document.documentElement.getAttribute("data-perf") === "off";
    paintPlanet(
      cv,
      spec,
      Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2),
    );
  }, [spec]);

  // deriva: ampiezza e durata diverse per ogni pianeta, i vicini più ampi
  const drift = 10 + spec.depth * 22;
  const style = {
    "--x": `${spec.x}%`,
    "--y": `${spec.y}%`,
    "--depth": spec.depth.toFixed(2),
    "--dx": `${(spec.id % 2 ? -1 : 1) * drift}px`,
    "--dy": `${-drift * 0.7}px`,
    "--dur": `${22 + spec.id * 5}s`,
    "--sx": `${shift?.x ?? 0}px`,
    "--sy": `${shift?.y ?? 0}px`,
  } as CSSProperties;

  return (
    <div className={styles.planet} style={style}>
      <div className={styles.planetFloat}>
        <canvas ref={ref} />
      </div>
    </div>
  );
}
