"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type CSSProperties } from "react";
import { paintPlanet } from "@/components/effects/draw-planets";
import { planetLookFor } from "@/lib/planets";
import styles from "./page-planet.module.css";

type PagePlanetProps = {
  /** diametro del disco in px (il canvas è più largo: alone e anelli) */
  size?: number;
  className?: string;
};

// Il pianeta della pagina: lo stesso su cui hai cliccato nella galassia,
// ora grande, con l'alone della sua tinta. "Atterra" con la pagina (scala da
// 1.2 a 1) e poi galleggia piano. Disegnato una volta su canvas; solo
// transform per il movimento. Decorativo (aria-hidden).
export function PagePlanet({ size = 220, className = "" }: PagePlanetProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLCanvasElement>(null);
  const look = planetLookFor(pathname);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const touch = document.documentElement.getAttribute("data-perf") === "off";
    paintPlanet(
      cv,
      {
        id: 0,
        x: 0,
        y: 0,
        pr: size / 2,
        hue: look.hue,
        style: look.style,
        la: 5.4,
        depth: 1,
      },
      Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2),
    );
  }, [size, look.hue, look.style]);

  return (
    <div
      className={`${styles.planet} ${className}`.trim()}
      style={{ "--hue": look.hue, "--size": `${size}px` } as CSSProperties}
      aria-hidden="true"
    >
      <span className={styles.glow} />
      <span className={styles.orbit} />
      <div className={styles.float}>
        <canvas ref={ref} />
      </div>
    </div>
  );
}
