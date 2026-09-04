"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import { PLANET_PAD, paintPlanet } from "@/components/effects/draw-planets";
import { waitArrival } from "@/components/effects/planet-traveler";
import { planetLookFor, sceneFor, type PlanetScene } from "@/lib/planets";
import { workflow } from "@/lib/site-content";
import { discRect, isTraveling, landing, takeoff } from "@/lib/traveler";
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
  const hostRef = useRef<HTMLDivElement>(null);
  const look = planetLookFor(pathname);
  const kind = scene ?? sceneFor(pathname);

  useEffect(() => {
    const cv = ref.current;
    const host = hostRef.current;
    if (!cv || !host) return;
    const touch = document.documentElement.getAttribute("data-perf") === "off";
    const spec = { hue: look.hue, style: look.style, seed: look.hue };
    paintPlanet(
      cv,
      {
        id: 0,
        x: 0,
        y: 0,
        pr: size / 2,
        hue: look.hue,
        style: look.style,
        la: 5.5,
        depth: 1,
        solid: true,
        seed: look.hue,
      },
      Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2),
    );

    // Se un pianeta sta arrivando in volo (dalla galassia o dalla pagina
    // precedente), questo resta nascosto e gli dice dove atterrare; si
    // mostra quando è arrivato, senza dissolvenza: è lui.
    let cancelled = false;
    if (isTraveling()) {
      host.setAttribute("data-arriving", "");
      // la pagina entra scivolando (.fx-page): tolgo quello spostamento
      const page = host.closest<HTMLElement>(".fx-page");
      const dy = page ? new DOMMatrix(getComputedStyle(page).transform).f : 0;
      landing(discRect(cv, PLANET_PAD, dy), spec);
      void waitArrival().then(() => {
        if (cancelled) return;
        host.removeAttribute("data-arriving");
        host.setAttribute("data-landed", "");
      });
    }

    return () => {
      cancelled = true;
    };
  }, [size, look.hue, look.style]);

  // Lascio la pagina: se il pianeta è sullo schermo, riparte in viaggio
  // verso la pagina nuova (la galassia o un'altra intestazione). Effetto di
  // layout: la sua pulizia gira mentre il nodo è ancora nel DOM, così la
  // posizione si può ancora misurare (nella pulizia di useEffect è già
  // stato tolto).
  useLayoutEffect(() => {
    const cv = ref.current;
    const host = hostRef.current;
    const spec = { hue: look.hue, style: look.style, seed: look.hue };
    return () => {
      if (!cv || !host) return;
      const r = cv.getBoundingClientRect();
      const onScreen =
        r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
      if (onScreen && !host.hasAttribute("data-arriving")) {
        takeoff(discRect(cv, PLANET_PAD), spec);
      }
    };
  }, [look.hue, look.style]);

  const orbiters = sceneOrbiters(kind);

  return (
    <div
      ref={hostRef}
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
  // le quattro tappe del metodo (lib/site-content), attorno al pianeta in
  // diagonale: tutte fuori dal disco, quindi tutte leggibili
  return (
    <div className={styles.nodes}>
      {workflow.slice(0, 4).map((step, i) => {
        const a = -Math.PI / 4 + (i * Math.PI) / 2;
        const name = step.step.split("·")[1]?.trim() ?? step.step;
        return (
          <span
            key={step.step}
            className={styles.node}
            style={
              {
                "--px": (Math.cos(a) * 0.86).toFixed(3),
                "--py": (Math.sin(a) * 0.5).toFixed(3),
              } as CSSProperties
            }
          >
            <b>{i + 1}</b>
            {name}
          </span>
        );
      })}
    </div>
  );
}
