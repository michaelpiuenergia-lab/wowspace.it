"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { paintPlanet } from "@/components/effects/draw-planets";
import {
  BASE_PHI,
  LABEL_GAP_Y,
  RINGS,
  TILT,
  coreRadius,
  depthScale,
  labelOffset,
  orbit,
  planLabels,
  scaleK,
  swingAt,
  swingPath,
  type LabelSize,
  type Swing,
  type Vec,
} from "@/lib/galaxy-layout";
import { navLinks, routeIndex } from "@/lib/site-content";
import styles from "./galaxy.module.css";

// La galassia Wowspace: il nucleo al centro e sei pianeti in orbita, uno per
// pagina. Passandoci sopra si accende; cliccandolo la camera VOLA sul pianeta
// (zoom, l'asse della galassia ruota, gli altri si spengono) e poi si apre la
// pagina — il warp dello spazio (NebulaField) completa il salto. I pianeti
// sono link veri (<a>): tastiera, screen reader e prefetch funzionano.
// La geometria (orbite, posto dei nomi, giro del nome) è in
// lib/galaxy-layout.ts, pura e testata; qui solo tempo, misure e DOM. Sei
// transform per frame: costo trascurabile. Fermo con "riduci movimento" e
// quando l'hero non è sullo schermo.

type Look = {
  hue: number;
  style: number;
  ring: number;
  size: number;
  phase: number;
};

const LOOK: Record<string, Look> = {
  "/servizi": { hue: 188, style: 1, ring: 0, size: 46, phase: 0.4 },
  "/piattaforma": {
    hue: 92,
    style: 0,
    ring: 0,
    size: 38,
    phase: 0.4 + Math.PI,
  },
  "/runtime": { hue: 268, style: 3, ring: 1, size: 54, phase: 1.5 },
  "/sistema": { hue: 222, style: 2, ring: 1, size: 36, phase: 1.5 + Math.PI },
  "/vetrina": { hue: 312, style: 1, ring: 2, size: 44, phase: 2.7 },
  "/metodo": { hue: 38, style: 0, ring: 2, size: 32, phase: 2.7 + Math.PI },
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
const SIZES = BODIES.map((b) => b.size);

export function Galaxy() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);
  const bodyRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const slotRef = useRef<number[]>(BODIES.map(() => 0));
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
        },
        dpr,
      );
    });
  }, []);

  // il loop: orbite, asse che deriva piano, nomi al loro posto, e il volo
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

    // misure dei nomi: cambiano con la larghezza (font più piccolo sotto i
    // 640px) e quando arriva il font; si rimisura quando serve
    const slots = slotRef.current;
    let labels: LabelSize[] = [];
    let measuredAt = -1;
    const cur: Vec[] = BODIES.map(() => ({ x: 0, y: 0 }));
    const swings: (Swing | null)[] = BODIES.map(() => null);
    const setOffset = (i: number, off: Vec) => {
      cur[i] = off;
      const label = labelRefs.current[i];
      if (!label) return;
      label.style.setProperty("--lx", `${off.x.toFixed(1)}px`);
      label.style.setProperty("--ly", `${off.y.toFixed(1)}px`);
    };
    // nuovo posto: subito (now = 0) oppure con il giro attorno al disco dal
    // lato che passa più lontano dal centro della galassia
    const place = (
      i: number,
      slot: number,
      now = 0,
      center: Vec = { x: 0, y: 0 },
    ) => {
      slots[i] = slot;
      const to = labelOffset(SIZES[i], labels[i], slot);
      if (!now || reduce) {
        swings[i] = null;
        setOffset(i, to);
        return;
      }
      swings[i] = swingPath(cur[i], to, center, now);
    };
    // dopo una misura i nomi vanno subito al loro posto, senza giro
    let fresh = true;
    const measure = (S: number) => {
      measuredAt = S;
      fresh = true;
      labels = BODIES.map((_, i) => {
        const label = labelRefs.current[i];
        return { lw: label?.offsetWidth ?? 0, lh: label?.offsetHeight ?? 0 };
      });
    };
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        measuredAt = -1;
      });
      labelRefs.current.forEach((label) => label && ro?.observe(label));
    }

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
      const H = root.clientHeight;
      if (S !== measuredAt) measure(S);
      const cx = S / 2;
      const cy = H / 2;
      const k = scaleK(S);
      const fp = flight ? Math.min(1, (now - flight.start) / FLIGHT_MS) : 0;
      const fe = easeInOut(fp);
      // l'asse ruota piano da solo; durante il volo si sposta di più
      const phi = BASE_PHI + (reduce ? 0 : Math.sin(t / 9) * 0.1) + fe * 0.6;
      const zoom = 1 + fe * 1.7;

      const pos = orbit(BODIES, t, S, cx, cy, phi, reduce);
      const scales = pos.map((p, i) =>
        depthScale(p.d, k, flight?.index === i ? 1 + fe * 0.7 : 1),
      );

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

      // i nomi: mai sul marchio, dentro lo schermo in orizzontale e dentro lo
      // spazio in verticale, senza pestarsi
      const bounds = root.getBoundingClientRect();
      const plan = planLabels({
        pos,
        scales,
        sizes: SIZES,
        labels,
        slots,
        cx,
        cy,
        coreR: coreRadius(S),
        bounds: {
          minX: -bounds.left + 6,
          maxX: window.innerWidth - bounds.left - 6,
          minY: -8,
          maxY: H + 8,
        },
        target: flight?.index ?? null,
      });

      pos.forEach((p, i) => {
        const el = bodyRefs.current[i];
        if (!el) return;
        const isTarget = flight?.index === i;
        const depth = (p.d + 1) / 2; // 0 dietro … 1 davanti
        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scales[i].toFixed(3)})`;
        el.style.zIndex = String(isTarget ? 40 : 10 + Math.round(depth * 10));
        el.style.opacity =
          flight && !isTarget ? (1 - fe * 0.9).toFixed(3) : "1";
        if (fresh) {
          place(i, plan.slots[i]);
        } else if (plan.slots[i] !== slots[i]) {
          place(i, plan.slots[i], now, {
            x: (cx - p.x) / scales[i],
            y: (cy - p.y) / scales[i],
          });
        }
        const sw = swings[i];
        if (sw) {
          const { off, done } = swingAt(sw, now);
          setOffset(i, off);
          if (done) swings[i] = null;
        }
        el.toggleAttribute("data-label-hidden", plan.hidden[i]);
      });
      fresh = false;

      if (flight && fp >= 0.78 && !flight.pushed) {
        flight.pushed = true;
        router.push(BODIES[flight.index].href);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
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
                    // prima del JS: sotto il disco (stessa formula del loop)
                    "--ly": `${b.size / 2 + LABEL_GAP_Y + 14}px`,
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
