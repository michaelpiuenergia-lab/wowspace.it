"use client";

import { useEffect, useRef } from "react";
import { PLANET_PAD, paintPlanet } from "@/components/effects/draw-planets";
import {
  ARRIVED,
  LANDING,
  TAKEOFF,
  arrived,
  isTraveling,
  type PlanetLookSpec,
  type PlanetRect,
} from "@/lib/traveler";
import styles from "./planet-traveler.module.css";

// Il pianeta che viaggia tra una pagina e l'altra (vedi lib/traveler.ts).
// Un solo canvas fisso, dipinto una volta per viaggio; si muove solo con
// transform e opacity. Se la pagina nuova non offre un posto dove atterrare
// entro poco, svanisce.
const LOGICAL = 260; // diametro dipinto (px): il viaggio scala da qui
const DRIFT_MS = 450; // prima che la pagina nuova risponda: continua il volo
const FLY_MS = 680; // dal punto attuale al posto d'arrivo
const FADE_MS = 240;
const GIVE_UP_MS = 1500;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: PlanetRect, b: PlanetRect, e: number): PlanetRect => ({
  x: a.x + (b.x - a.x) * e,
  y: a.y + (b.y - a.y) * e,
  d: a.d + (b.d - a.d) * e,
});

export function PlanetTraveler() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = 0;
    let giveUp = 0;
    let phase: "idle" | "drift" | "fly" | "fade" = "idle";
    let t0 = 0;
    let from: PlanetRect = { x: 0, y: 0, d: 0 };
    let cur: PlanetRect = from;
    let to: PlanetRect | null = null;
    let look: PlanetLookSpec | null = null;
    let alpha = 0;

    const half = (LOGICAL * PLANET_PAD) / 2;
    const apply = () => {
      cv.style.transform = `translate3d(${(cur.x - half).toFixed(1)}px, ${(cur.y - half).toFixed(1)}px, 0) scale(${(cur.d / LOGICAL).toFixed(4)})`;
      cv.style.opacity = alpha.toFixed(3);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      window.clearTimeout(giveUp);
      phase = "idle";
      alpha = 0;
      apply();
      cv.hidden = true;
    };
    const finish = () => {
      // arrivato: chi accoglie mostra il suo pianeta, questo svanisce
      arrived();
      phase = "fade";
      t0 = performance.now();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (phase === "drift") {
        // la pagina nuova non ha ancora risposto: il volo prosegue un po'
        // (cresce e va verso il centro dello schermo), poi aspetta
        const e = easeOut(Math.min(1, (now - t0) / DRIFT_MS));
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight * 0.42;
        cur = {
          x: from.x + (cx - from.x) * 0.18 * e,
          y: from.y + (cy - from.y) * 0.18 * e,
          d: from.d * (1 + 0.35 * e),
        };
        alpha = 1;
      } else if (phase === "fly" && to) {
        const e = easeInOut(Math.min(1, (now - t0) / FLY_MS));
        cur = lerp(from, to, e);
        alpha = 1;
        if (e >= 1) finish();
      } else if (phase === "fade") {
        const e = Math.min(1, (now - t0) / FADE_MS);
        alpha = 1 - e;
        if (e >= 1) {
          stop();
          return;
        }
      }
      apply();
    };

    const onTakeoff = (ev: Event) => {
      const { rect, look: lk } = (
        ev as CustomEvent<{ rect: PlanetRect; look: PlanetLookSpec }>
      ).detail;
      if (reduce) return; // niente viaggio: la pagina nuova mostra il suo
      look = lk;
      paintPlanet(
        cv,
        {
          id: lk.seed,
          x: 0,
          y: 0,
          pr: LOGICAL / 2,
          hue: lk.hue,
          style: lk.style,
          la: 5.5,
          depth: 1,
          solid: true,
          seed: lk.seed,
        },
        Math.min(window.devicePixelRatio || 1, 1.5),
      );
      cv.hidden = false;
      from = rect;
      cur = rect;
      to = null;
      alpha = 1;
      phase = "drift";
      t0 = performance.now();
      apply();
      if (!raf) raf = requestAnimationFrame(frame);
      window.clearTimeout(giveUp);
      giveUp = window.setTimeout(() => {
        if (phase === "drift") finish();
      }, GIVE_UP_MS);
    };

    const onLanding = (ev: Event) => {
      if (phase !== "drift" || !look) {
        // un decollo che questo viaggiatore non ha visto (per esempio il
        // doppio montaggio di React in sviluppo): niente volo, la pagina
        // mostra subito il suo pianeta e qui non resta nulla sullo schermo
        if (isTraveling()) arrived();
        stop();
        return;
      }
      const { rect } = (
        ev as CustomEvent<{ rect: PlanetRect; look: PlanetLookSpec }>
      ).detail;
      window.clearTimeout(giveUp);
      from = cur;
      to = rect;
      phase = "fly";
      t0 = performance.now();
    };

    window.addEventListener(TAKEOFF, onTakeoff);
    window.addEventListener(LANDING, onLanding);
    return () => {
      window.removeEventListener(TAKEOFF, onTakeoff);
      window.removeEventListener(LANDING, onLanding);
      stop(); // mai un pianeta fermo sullo schermo senza nessuno a muoverlo
    };
  }, []);

  return (
    <canvas ref={ref} className={styles.traveler} hidden aria-hidden="true" />
  );
}

// per chi accoglie: promessa che si risolve all'arrivo (o dopo un po')
export function waitArrival(maxMs = 1400): Promise<void> {
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener(ARRIVED, finish);
      resolve();
    };
    window.addEventListener(ARRIVED, finish, { once: true });
    window.setTimeout(finish, maxMs);
  });
}
