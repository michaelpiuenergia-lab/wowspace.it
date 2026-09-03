"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { paintPlanet } from "@/components/effects/draw-planets";
import {
  LABEL_GAP,
  RINGS,
  TILT,
  axisAt,
  depthScale,
  labelBoost,
  orbit,
  scaleK,
} from "@/lib/galaxy-layout";
import { navLinks, routeIndex } from "@/lib/site-content";
import styles from "./galaxy.module.css";

// La galassia Wowspace: il nucleo al centro e sei pianeti in orbita, uno per
// pagina. Passandoci sopra si accende; cliccandolo la camera VOLA sul pianeta
// (zoom, l'asse della galassia ruota, gli altri si spengono) e poi si apre la
// pagina — il warp dello spazio (NebulaField) completa il salto. I pianeti
// sono link veri (<a>): tastiera, screen reader e prefetch funzionano.
// Il nome sta fermo sotto il suo pianeta; le orbite (lib/galaxy-layout.ts,
// testate) sono fatte in modo che davanti al nucleo non ci arrivi mai, e
// dietro ci passa dietro: il nucleo è un corpo solido. Sei transform per
// frame: costo trascurabile. Fermo con "riduci movimento" e quando l'hero
// non è sullo schermo.

type Look = {
  hue: number;
  style: number;
  ring: number;
  size: number;
  phase: number;
};

// nomi lunghi sulle orbite interne, corti su quella esterna: ai lati dello
// schermo non escono mai. Le fasi sono a 60° l'una dall'altra (gli stessi
// dell'orbita sono opposti): con un solo periodo per tutti, i pianeti non
// si toccano mai (lib/galaxy-layout.test.ts)
const STEP = Math.PI / 3;
const LOOK: Record<string, Look> = {
  "/servizi": { hue: 188, style: 1, ring: 2, size: 46, phase: 0 },
  "/piattaforma": { hue: 92, style: 0, ring: 1, size: 38, phase: 2 * STEP },
  "/runtime": { hue: 268, style: 3, ring: 0, size: 54, phase: STEP },
  "/sistema": { hue: 222, style: 2, ring: 1, size: 36, phase: 5 * STEP },
  "/vetrina": { hue: 312, style: 1, ring: 2, size: 44, phase: 3 * STEP },
  "/metodo": { hue: 38, style: 0, ring: 0, size: 32, phase: 4 * STEP },
};

const FLIGHT_MS = 1250;

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type Body = Look & { href: string; name: string; meta: string };

const BODIES: Body[] = navLinks.map((link, index) => ({
  href: link.href,
  name: link.label,
  meta: routeIndex[link.href]?.meta ?? "",
  ...(LOOK[link.href] ?? {
    hue: 200,
    style: index % 4,
    ring: index % 3,
    size: 24,
    phase: index,
  }),
}));

export function Galaxy() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);
  const bodyRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const flightRef = useRef<{
    index: number;
    start: number;
    pushed: boolean;
  } | null>(null);
  const [flying, setFlying] = useState<number | null>(null);

  // i pianeti vengono disegnati una volta sul proprio canvas
  useEffect(() => {
    const touch = document.documentElement.getAttribute("data-perf") === "off";
    const dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2);
    BODIES.forEach((b, i) => {
      const cv = canvasRefs.current[i];
      if (!cv) return;
      paintPlanet(
        cv,
        {
          id: i,
          x: 0,
          y: 0,
          pr: b.size / 2,
          hue: b.hue,
          style: b.style,
          la: 5.6,
          depth: 1,
          solid: true,
        },
        dpr,
      );
    });
  }, []);

  // il loop: orbite, asse che deriva piano, e il volo al click
  useEffect(() => {
    const root = rootRef.current;
    const space = spaceRef.current;
    const rings = ringsRef.current;
    if (!root || !space || !rings) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hero = root.closest<HTMLElement>("[data-hero]");
    const t0 = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const flight = flightRef.current;
      // fermo se la scheda è nascosta o l'hero è fuori schermo (ma il volo
      // deve sempre finire)
      if (!flight && (document.hidden || hero?.hasAttribute("data-offscreen")))
        return;
      if (flight && !flight.start) flight.start = now;
      const t = (now - t0) / 1000;
      const S = root.clientWidth;
      const cx = S / 2;
      const cy = root.clientHeight / 2;
      const k = scaleK(S);
      const fp = flight ? Math.min(1, (now - flight.start) / FLIGHT_MS) : 0;
      const fe = easeInOut(fp);
      // l'asse ruota piano da solo; durante il volo si sposta di più
      const phi = (reduce ? axisAt(0) : axisAt(t)) + fe * 0.6;
      const zoom = 1 + fe * 1.7;

      const pos = orbit(BODIES, t, S, cx, cy, phi, reduce);

      // la camera: durante il volo porta il pianeta al centro
      let px = 0;
      let py = 0;
      if (flight) {
        const p = pos[flight.index];
        px = -(p.x - cx) * zoom * fe;
        py = -(p.y - cy) * zoom * fe;
      }
      space.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) scale(${zoom.toFixed(3)})`;
      rings.style.transform = `rotate(${phi.toFixed(4)}rad)`;

      pos.forEach((p, i) => {
        const el = bodyRefs.current[i];
        const label = labelRefs.current[i];
        if (!el || !label) return;
        const isTarget = flight?.index === i;
        const s = depthScale(p.d, k, isTarget ? 1 + fe * 0.7 : 1);
        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${s.toFixed(3)})`;
        // dietro al nucleo (d < 0) sotto di lui, davanti sopra: il nucleo è
        // un corpo solido (z 15) e i nomi di chi passa dietro ci passano dietro
        el.style.zIndex = String(
          isTarget
            ? 40
            : p.d >= 0
              ? 16 + Math.round(p.d * 4)
              : 10 + Math.round((1 + p.d) * 4),
        );
        el.style.opacity =
          flight && !isTarget ? (1 - fe * 0.9).toFixed(3) : "1";
        // il nome dietro non diventa illeggibile: un po' di scala in più
        label.style.setProperty("--ls", labelBoost(s).toFixed(3));
      });

      if (flight && fp >= 0.78 && !flight.pushed) {
        flight.pushed = true;
        router.push(BODIES[flight.index].href);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [router]);

  const fly = (index: number, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (flightRef.current) {
      event.preventDefault();
      return;
    }
    // tasti modificatori (nuova scheda) e riduci movimento: link normale
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    // start=0: lo mette il primo frame del loop (niente performance.now() qui,
    // il compilatore React lo considera impuro durante il render)
    flightRef.current = { index, start: 0, pushed: false };
    setFlying(index);
  };

  return (
    <nav
      className={styles.galaxy}
      aria-label="La galassia Wowspace: le pagine del sito"
      data-flying={flying !== null ? "" : undefined}
    >
      <div ref={rootRef} className={styles.stage}>
        <div ref={spaceRef} className={styles.space}>
          <svg
            ref={ringsRef}
            className={styles.rings}
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            {RINGS.map((ring) => (
              <ellipse
                key={ring.r}
                cx="50"
                cy="50"
                rx={ring.r * 100}
                ry={ring.r * 100 * TILT}
              />
            ))}
          </svg>

          <div className={styles.core} aria-hidden="true">
            <span className={styles.halo} />
            <span className={styles.disc} />
            <span className={styles.ring} />
            <span className={styles.ringInner} />
            <WowspaceLogo
              size={56}
              showWordmark={false}
              className={styles.mark}
            />
          </div>

          {BODIES.map((b, i) => (
            <Link
              key={b.href}
              href={b.href}
              ref={(el) => {
                bodyRefs.current[i] = el;
              }}
              className={`${styles.body} ${flying === i ? styles.target : ""}`}
              style={{ "--hue": b.hue } as CSSProperties}
              onClick={(e) => fly(i, e)}
              aria-label={`${b.name}: ${b.meta}`}
            >
              <canvas
                ref={(el) => {
                  canvasRefs.current[i] = el;
                }}
                aria-hidden="true"
              />
              <span
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className={styles.label}
                aria-hidden="true"
                style={
                  {
                    // il nome sta sotto il disco, sempre lì
                    "--below": `${b.size / 2 + LABEL_GAP}px`,
                  } as CSSProperties
                }
              >
                <span className={styles.name}>{b.name}</span>
                <span className={styles.meta}>{b.meta}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
      <p className={styles.help} aria-hidden="true">
        <span className={styles.helpDesktop}>
          Clicca un pianeta per esplorare
        </span>
        <span className={styles.helpTouch}>Tocca un pianeta per esplorare</span>
      </p>
    </nav>
  );
}
