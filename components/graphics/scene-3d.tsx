"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { paintPlanet } from "@/components/effects/draw-planets";
import { paintDrop, paintTorus } from "@/components/graphics/draw-objects";
import styles from "./scene-3d.module.css";

// La scena 3D astratta di una sezione: sfere, anelli e gocce di vetro con
// luce e riflessi, un raggio di luce e il riflesso sul "pavimento", più uno
// o due frammenti di interfaccia su vetro (un numero grande, una riga).
// Ogni oggetto è un canvas dipinto una volta e mosso solo dal CSS; la
// composizione cambia con la variante, così ogni sezione ha la sua scena.
export type SceneVariant = "site" | "crm" | "erp" | "ai" | "portal";

type Obj =
  | {
      kind: "sphere";
      x: number;
      y: number;
      w: number;
      hue: number;
      style: number;
      la?: number;
      z?: number;
      T?: number;
      reflect?: boolean;
    }
  | {
      kind: "torus";
      x: number;
      y: number;
      w: number;
      hue: number;
      squash: number;
      rot?: number;
      z?: number;
      T?: number;
    }
  | {
      kind: "drop";
      x: number;
      y: number;
      w: number;
      hue: number;
      z?: number;
      T?: number;
    };

type Frag = {
  kind: "kpi" | "lead" | "chat" | "status" | "bar";
  x: number;
  y: number;
  w: number;
  z?: number;
  T?: number;
};

type Scene = { hue: number; objects: Obj[]; frags: Frag[] };

// posizioni e misure in % della larghezza della scena (x, y dal centro
// dell'oggetto; w = larghezza dell'oggetto)
const SCENES: Record<SceneVariant, Scene> = {
  site: {
    hue: 188,
    objects: [
      {
        kind: "torus",
        x: 56,
        y: 52,
        w: 78,
        hue: 188,
        squash: 0.34,
        rot: -18,
        z: 1,
      },
      {
        kind: "sphere",
        x: 54,
        y: 48,
        w: 40,
        hue: 188,
        style: 1,
        la: 5.3,
        z: 2,
        reflect: true,
      },
      {
        kind: "sphere",
        x: 16,
        y: 26,
        w: 12,
        hue: 205,
        style: 0,
        la: 5.6,
        z: 3,
        T: 9,
      },
      { kind: "drop", x: 84, y: 24, w: 14, hue: 188, z: 3, T: 11 },
    ],
    frags: [
      { kind: "kpi", x: 22, y: 74, w: 36, z: 4, T: 10 },
      { kind: "status", x: 79, y: 70, w: 38, z: 4, T: 12 },
    ],
  },
  crm: {
    hue: 92,
    objects: [
      {
        kind: "sphere",
        x: 44,
        y: 46,
        w: 46,
        hue: 92,
        style: 2,
        la: 5.5,
        z: 2,
        reflect: true,
      },
      {
        kind: "torus",
        x: 48,
        y: 58,
        w: 84,
        hue: 158,
        squash: 0.28,
        rot: 12,
        z: 3,
      },
      {
        kind: "sphere",
        x: 86,
        y: 30,
        w: 14,
        hue: 158,
        style: 5,
        la: 5.2,
        z: 1,
        T: 10,
      },
      { kind: "drop", x: 12, y: 36, w: 11, hue: 92, z: 3, T: 9 },
    ],
    frags: [
      { kind: "lead", x: 74, y: 76, w: 42, z: 4, T: 11 },
      { kind: "kpi", x: 20, y: 72, w: 30, z: 4, T: 13 },
    ],
  },
  erp: {
    hue: 222,
    objects: [
      {
        kind: "torus",
        x: 50,
        y: 40,
        w: 70,
        hue: 222,
        squash: 0.3,
        rot: -8,
        z: 1,
      },
      {
        kind: "torus",
        x: 50,
        y: 56,
        w: 90,
        hue: 205,
        squash: 0.3,
        rot: -8,
        z: 3,
      },
      {
        kind: "sphere",
        x: 50,
        y: 46,
        w: 36,
        hue: 222,
        style: 3,
        la: 5.4,
        z: 2,
        reflect: true,
      },
      { kind: "drop", x: 86, y: 26, w: 12, hue: 222, z: 3, T: 10 },
    ],
    frags: [
      { kind: "bar", x: 24, y: 76, w: 38, z: 4, T: 12 },
      { kind: "kpi", x: 80, y: 74, w: 30, z: 4, T: 9 },
    ],
  },
  ai: {
    hue: 312,
    objects: [
      {
        kind: "sphere",
        x: 58,
        y: 44,
        w: 42,
        hue: 312,
        style: 5,
        la: 5.2,
        z: 2,
        reflect: true,
      },
      {
        kind: "torus",
        x: 56,
        y: 50,
        w: 80,
        hue: 268,
        squash: 0.42,
        rot: 24,
        z: 3,
      },
      {
        kind: "sphere",
        x: 18,
        y: 30,
        w: 16,
        hue: 268,
        style: 4,
        la: 5.6,
        z: 1,
        T: 11,
      },
      { kind: "drop", x: 88, y: 22, w: 12, hue: 312, z: 3, T: 9 },
    ],
    frags: [{ kind: "chat", x: 26, y: 72, w: 44, z: 4, T: 10 }],
  },
  portal: {
    hue: 158,
    objects: [
      {
        kind: "sphere",
        x: 52,
        y: 46,
        w: 38,
        hue: 158,
        style: 1,
        la: 5.4,
        z: 2,
        reflect: true,
      },
      {
        kind: "torus",
        x: 52,
        y: 54,
        w: 76,
        hue: 188,
        squash: 0.32,
        rot: -14,
        z: 3,
      },
      { kind: "drop", x: 16, y: 28, w: 14, hue: 158, z: 3, T: 10 },
      {
        kind: "sphere",
        x: 86,
        y: 30,
        w: 10,
        hue: 188,
        style: 2,
        la: 5,
        z: 1,
        T: 12,
      },
    ],
    frags: [
      { kind: "status", x: 77, y: 74, w: 40, z: 4, T: 11 },
      { kind: "kpi", x: 22, y: 74, w: 30, z: 4, T: 9 },
    ],
  },
};

export function Scene3D({
  variant,
  compact = false,
  className = "",
}: {
  variant: SceneVariant;
  /** meno oggetti e un solo frammento (card piccole) */
  compact?: boolean;
  className?: string;
}) {
  const scene = SCENES[variant];
  const objects = compact ? scene.objects.slice(0, 2) : scene.objects;
  const frags = compact ? scene.frags.slice(0, 1) : scene.frags;
  return (
    <div
      className={`${styles.scene} ${compact ? styles.compact : ""} ${className}`.trim()}
      style={{ "--hue": scene.hue } as CSSProperties}
      aria-hidden="true"
    >
      <span className={styles.beam} />
      <span className={styles.glow} />
      {objects.map((o, i) => (
        <ObjectLayer key={i} obj={o} index={i} />
      ))}
      {frags.map((f, i) => (
        <Fragment key={i} frag={f} hue={scene.hue} index={i} />
      ))}
      <span className={styles.floor} />
    </div>
  );
}

function layerStyle(
  o: { x: number; y: number; w: number; z?: number; T?: number },
  i: number,
) {
  return {
    "--x": `${o.x}%`,
    "--y": `${o.y}%`,
    "--w": `${o.w}cqw`,
    "--z": o.z ?? 2,
    "--T": `${o.T ?? 8 + i}s`,
    "--d": `${-i * 1.7}s`,
  } as CSSProperties;
}

// le sfere costano (superficie pixel per pixel): le dipingo quando il
// thread è libero, non durante l'idratazione, e con un tetto più basso
const SCENE_SPHERE_RES = 288;

function ObjectLayer({ obj, index }: { obj: Obj; index: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reflRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const touch = document.documentElement.getAttribute("data-perf") === "off";
    const dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2);
    const paint = (canvas: HTMLCanvasElement) => {
      if (obj.kind === "sphere") {
        paintPlanet(
          canvas,
          {
            id: index,
            x: 0,
            y: 0,
            pr: 120,
            hue: obj.hue,
            style: obj.style,
            la: obj.la ?? 5.4,
            depth: 1,
            solid: true,
            // stesso seme per il riflesso: è la stessa sfera
            seed: obj.hue * 7 + index,
            maxRes: SCENE_SPHERE_RES,
          },
          dpr,
        );
      } else if (obj.kind === "torus") {
        paintTorus(canvas, {
          R: 150,
          r: 16,
          hue: obj.hue,
          squash: obj.squash,
          dpr,
        });
      } else {
        paintDrop(canvas, { r: 80, hue: obj.hue, dpr });
      }
      canvas.style.width = "100%";
      canvas.style.height = "auto";
    };
    const run = () => {
      paint(cv);
      if (reflRef.current) paint(reflRef.current);
    };
    const idle = window.requestIdleCallback;
    if (typeof idle === "function") {
      const id = idle(run, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(run, 0);
    return () => window.clearTimeout(id);
  }, [obj, index]);

  const style = layerStyle(obj, index);
  if (obj.kind === "torus") {
    return (
      <span
        className={`${styles.layer} ${styles.torus}`}
        style={{ ...style, "--rot": `${obj.rot ?? 0}deg` } as CSSProperties}
      >
        <canvas ref={ref} />
      </span>
    );
  }
  return (
    <span
      className={`${styles.layer} ${obj.kind === "sphere" ? styles.sphere : styles.drop}`}
      style={style}
    >
      <canvas ref={ref} />
      {obj.kind === "sphere" && obj.reflect && (
        <canvas ref={reflRef} className={styles.reflection} />
      )}
    </span>
  );
}

// frammenti di interfaccia, ridotti all'osso: un numero, una riga, una bolla
function Fragment({
  frag,
  hue,
  index,
}: {
  frag: Frag;
  hue: number;
  index: number;
}) {
  const style = {
    ...layerStyle(frag, index + 4),
    "--hue": hue,
  } as CSSProperties;
  return (
    <div className={`${styles.layer} ${styles.glass}`} style={style}>
      {frag.kind === "kpi" && (
        <div className={styles.kpi}>
          <strong>+18%</strong>
          <span>richieste questo mese</span>
          <svg
            viewBox="0 0 100 32"
            className={styles.spark}
            preserveAspectRatio="none"
          >
            <path d="M0,26 L14,22 L28,24 L42,14 L56,17 L70,8 L84,11 L100,3" />
          </svg>
        </div>
      )}
      {frag.kind === "status" && (
        <div className={styles.status}>
          <i />
          <span>Sito online</span>
          <em>0,8 s</em>
        </div>
      )}
      {frag.kind === "lead" && (
        <div className={styles.lead}>
          <b>RC</b>
          <span>
            <strong>Rossi Costruzioni</strong>
            <small>Nuovo lead · € 12.400</small>
          </span>
        </div>
      )}
      {frag.kind === "bar" && (
        <div className={styles.bar}>
          <span>
            <strong>42</strong> commesse in corso
          </span>
          <i>
            <b style={{ width: "78%" }} />
          </i>
        </div>
      )}
      {frag.kind === "chat" && (
        <div className={styles.chat}>
          <p>Prepara il preventivo per Rossi.</p>
          <p className={styles.reply}>Fatto: bozza pronta, € 12.400.</p>
          <span className={styles.typing}>
            <i />
            <i />
            <i />
          </span>
        </div>
      )}
    </div>
  );
}
