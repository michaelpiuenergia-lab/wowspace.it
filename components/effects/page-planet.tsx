"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type CSSProperties } from "react";
import { paintPlanet } from "@/components/effects/draw-planets";
import { planetLookFor, sceneFor, type PlanetScene } from "@/lib/planets";
import styles from "./page-planet.module.css";

type PagePlanetProps = {
  /** diametro del disco in px (il canvas è più largo: alone e anelli) */
  size?: number;
  className?: string;
  /** scena attorno al pianeta; se assente, quella della pagina corrente */
  scene?: PlanetScene;
};

// Il pianeta della pagina: lo stesso su cui hai cliccato nella galassia,
// ora grande, con l'alone della sua tinta e una scena tutta sua attorno
// (lune, flussi, impulsi, strati, schermate o tappe: lib/planets.ts).
// "Atterra" con la pagina (scala da 1.2 a 1) e poi galleggia piano.
// Disegnato una volta su canvas; la scena è solo CSS (transform/opacity,
// fermo in idle e con "riduci movimento"). Decorativo (aria-hidden).
export function PagePlanet({
  size = 220,
  className = "",
  scene,
}: PagePlanetProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLCanvasElement>(null);
  const look = planetLookFor(pathname);
  const kind = scene ?? sceneFor(pathname);

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
        solid: true,
      },
      Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2),
    );
  }, [size, look.hue, look.style]);

  const orbiters = sceneOrbiters(kind);

  return (
    <div
      className={`${styles.planet} ${className}`.trim()}
      style={{ "--hue": look.hue, "--size": `${size}px` } as CSSProperties}
      data-scene={kind}
      aria-hidden="true"
    >
      <span className={styles.glow} />
      {kind === "layers" && (
        <>
          <span className={`${styles.plate} ${styles.plateA}`} />
          <span className={`${styles.plate} ${styles.plateB}`} />
          <span className={`${styles.plate} ${styles.plateC}`} />
        </>
      )}
      {kind === "pulses" && (
        <>
          <span
            className={styles.pulse}
            style={{ "--d": "0s" } as CSSProperties}
          />
          <span
            className={styles.pulse}
            style={{ "--d": "-1.3s" } as CSSProperties}
          />
          <span
            className={styles.pulse}
            style={{ "--d": "-2.6s" } as CSSProperties}
          />
        </>
      )}
      {kind === "streams" && <Streams />}
      {kind === "path" && <PathNodes />}
      {orbiters && <div className={styles.back}>{orbiters}</div>}
      <span className={styles.orbit} />
      <div className={styles.float}>
        <canvas ref={ref} />
      </div>
      {orbiters && <div className={styles.front}>{orbiters}</div>}
    </div>
  );
}

// le cose che girano attorno al pianeta sull'orbita inclinata: lune,
// schermate, la cometa delle tappe. Stanno in due copie sincronizzate: una
// dietro al pianeta (metà alta dell'orbita) e una davanti (metà bassa).
function sceneOrbiters(kind: PlanetScene) {
  if (kind === "satellites") {
    return [0, 1, 2].map((i) => (
      <span
        key={i}
        className={styles.orbiter}
        style={
          {
            "--T": `${9 + i * 2.6}s`,
            "--d": `${-i * 3.1}s`,
            "--hs": i * 70,
            "--k": 1 - i * 0.22,
          } as CSSProperties
        }
      >
        <i className={styles.moon} />
      </span>
    ));
  }
  if (kind === "screens") {
    return [0, 1, 2].map((i) => (
      <span
        key={i}
        className={styles.orbiter}
        style={
          {
            "--T": `${11 + i * 2}s`,
            "--d": `${-i * 3.7}s`,
            "--k": 1 - i * 0.18,
          } as CSSProperties
        }
      >
        <i className={styles.screen} />
      </span>
    ));
  }
  if (kind === "path") {
    return (
      <span
        className={styles.orbiter}
        style={{ "--T": "7s", "--d": "0s", "--k": 1 } as CSSProperties}
      >
        <i className={styles.comet} />
      </span>
    );
  }
  return null;
}

// flussi di dati: quattro linee dagli angoli verso il pianeta, con punti che
// scorrono dentro
function Streams() {
  const corners = [
    [14, 12],
    [86, 16],
    [12, 84],
    [88, 82],
  ];
  return (
    <>
      <svg className={styles.streams} viewBox="0 0 100 100">
        {corners.map(([x, y]) => (
          <line key={`${x}-${y}`} x1={x} y1={y} x2="50" y2="50" />
        ))}
      </svg>
      {corners.map(([x, y], i) => (
        <span
          key={`${x}-${y}`}
          className={styles.drop}
          style={
            {
              "--fx": ((x - 50) / 100).toFixed(2),
              "--fy": ((y - 50) / 100).toFixed(2),
              "--d": `${-i * 0.9}s`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

// le quattro tappe del metodo, ferme lungo l'orbita (due dietro, due
// davanti al pianeta, come l'orbita inclinata vuole)
function PathNodes() {
  const nodes = [0, 1, 2, 3].map((i) => {
    const a = 0.35 + (i * Math.PI) / 2; // radianti lungo l'ellisse
    return {
      i,
      back: Math.sin(a) < 0,
      px: (Math.cos(a) * 0.72).toFixed(3),
      py: (Math.sin(a) * 0.27).toFixed(3),
    };
  });
  const render = (back: boolean) =>
    nodes
      .filter((n) => n.back === back)
      .map((n) => (
        <span
          key={n.i}
          className={styles.node}
          style={{ "--px": n.px, "--py": n.py } as CSSProperties}
        >
          {n.i + 1}
        </span>
      ));
  return (
    <>
      <div className={styles.back}>{render(true)}</div>
      <div className={styles.front}>{render(false)}</div>
    </>
  );
}
