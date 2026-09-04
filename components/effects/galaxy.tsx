"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { PLANET_PAD, paintPlanet } from "@/components/effects/draw-planets";
import { waitArrival } from "@/components/effects/planet-traveler";
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
import { PATH_KEY, PREV_PATH_KEY } from "@/components/effects/page-transition";
import { navLinks, routeIndex } from "@/lib/site-content";
import {
  loadSurface,
  SURFACE_MAX_RES,
} from "@/components/effects/surface-cache";
import { discRect, isTraveling, landing, takeoff } from "@/lib/traveler";
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
  "/piattaforma": { hue: 92, style: 2, ring: 1, size: 38, phase: 2 * STEP },
  "/runtime": { hue: 268, style: 4, ring: 0, size: 54, phase: STEP },
  "/sistema": { hue: 222, style: 3, ring: 1, size: 36, phase: 5 * STEP },
  "/vetrina": { hue: 312, style: 5, ring: 2, size: 44, phase: 3 * STEP },
  "/metodo": { hue: 38, style: 0, ring: 0, size: 32, phase: 4 * STEP },
};

const FLIGHT_MS = 1250;

// dipinge il pianeta i sul suo canvas; boost > 1 alza la risoluzione del
// canvas (il pianeta in volo viene zoomato oltre 4 volte: senza, sgrana)
function paintBody(cv: HTMLCanvasElement, b: Body, boost: number) {
  const touch = document.documentElement.getAttribute("data-perf") === "off";
  const dpr = Math.min(window.devicePixelRatio || 1, touch ? 1.5 : 2);
  const size = b.size * PLANET_PAD;
  const k = Math.min(boost, 1100 / (size * dpr)); // tetto ~1100 px di lato
  paintPlanet(
    cv,
    {
      id: 0,
      x: 0,
      y: 0,
      pr: b.size / 2,
      hue: b.hue,
      style: b.style,
      la: 5.5,
      depth: 1,
      solid: true,
      seed: b.hue,
    },
    dpr * Math.max(1, k),
  );
}

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

// La pagina da cui si arriva in home (PageTransition la annota): se è una
// pagina della galassia, l'indice del suo pianeta; altrimenti -1. Consuma
// l'informazione, così un ricaricamento della home non ripete il ritorno.
function returnFrom(): number {
  try {
    const cur = sessionStorage.getItem(PATH_KEY);
    const prev = sessionStorage.getItem(PREV_PATH_KEY);
    const from = cur && cur !== "/" ? cur : prev;
    sessionStorage.setItem(PATH_KEY, "/");
    sessionStorage.setItem(PREV_PATH_KEY, "");
    if (!from) return -1;
    const first = "/" + (from.split("/")[1] ?? "");
    return BODIES.findIndex((b) => b.href === first);
  } catch {
    return -1;
  }
}

export function Galaxy() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<SVGSVGElement>(null);
  const bodyRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);
  // il volo: verso un pianeta (click) o di ritorno (back = true: la camera
  // parte sul pianeta della pagina da cui si torna e si allontana)
  const flightRef = useRef<{
    index: number;
    start: number;
    pushed: boolean;
    back?: boolean;
    /** ritorno: fermo sul pianeta finché il viaggiatore non è arrivato */
    hold?: boolean;
    landed?: boolean;
  } | null>(null);
  const [flying, setFlying] = useState<number | null>(null);

  // i pianeti vengono disegnati una volta sul proprio canvas; poi, a thread
  // libero, il worker prepara anche il disco grande di ognuno: serve al
  // pianeta zoomato nel volo e al viaggiatore, che così partono nitidi
  useEffect(() => {
    BODIES.forEach((b, i) => {
      const cv = canvasRefs.current[i];
      if (cv) paintBody(cv, b, 1);
    });
    const idle = window.requestIdleCallback;
    const warm = () =>
      BODIES.forEach(
        (b) =>
          void loadSurface({
            hue: b.hue,
            style: b.style,
            la: 5.5,
            seed: b.hue,
            res: SURFACE_MAX_RES,
          }),
      );
    const id =
      typeof idle === "function"
        ? idle(warm, { timeout: 4000 })
        : window.setTimeout(warm, 1500);
    return () => {
      if (typeof idle === "function") window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
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

    // Ritorno in home da una pagina della galassia (tasto indietro, logo,
    // link): la camera riparte sul pianeta di quella pagina e si allontana
    // fino alla vista intera, il volo al contrario. Poi la pagina di
    // provenienza viene "consumata": un ricaricamento non lo ripete.
    const from = returnFrom();
    if (from >= 0 && !reduce && !flightRef.current) {
      // se il pianeta della pagina sta arrivando in volo, la galassia lo
      // aspetta zoomata sul suo posto e parte quando è atterrato
      const hold = isTraveling();
      flightRef.current = {
        index: from,
        start: 0,
        pushed: true,
        back: true,
        hold,
      };
      navRef.current?.setAttribute("data-flying", "");
      bodyRefs.current[from]?.classList.add(styles.target);
      const cv = canvasRefs.current[from];
      if (cv) paintBody(cv, BODIES[from], 4); // nitido anche zoomato
      if (hold) {
        void waitArrival().then(() => {
          const f = flightRef.current;
          if (f?.back) f.hold = false;
        });
      }
    }

    // misure prese una volta (e a ogni resize), non a ogni frame: leggere
    // clientWidth nel loop forzava il layout 60 volte al secondo
    let S = root.clientWidth;
    let cy = root.clientHeight / 2;
    const ro =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(() => {
            S = root.clientWidth;
            cy = root.clientHeight / 2;
          })
        : null;
    ro?.observe(root);
    const touch = document.documentElement.getAttribute("data-perf") === "off";
    // ultimo valore scritto per pianeta: si scrive solo se cambia
    const lastZ: string[] = [];
    const lastOp: string[] = [];
    const lastLs: string[] = [];
    const lastLabelOp: string[] = [];
    let lastSpace = "";
    let tick = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const flight = flightRef.current;
      // fermo se la scheda è nascosta o l'hero è fuori schermo (ma il volo
      // deve sempre finire)
      if (!flight && (document.hidden || hero?.hasAttribute("data-offscreen")))
        return;
      // sul telefono, a riposo, l'orbita si aggiorna a 30 fps: basta (i
      // pianeti fanno un giro in 72 s) e dimezza il lavoro
      if (touch && !flight && tick++ & 1) return;
      if (flight && !flight.start && !flight.hold) flight.start = now;
      const t = (now - t0) / 1000;
      const cx = S / 2;
      const k = scaleK(S);
      const raw =
        flight && flight.start
          ? Math.min(1, (now - flight.start) / FLIGHT_MS)
          : 0;
      // al ritorno il volo scorre al contrario: da 1 (sul pianeta) a 0
      const fp = flight?.back ? 1 - raw : raw;
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
      const spaceT = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) scale(${zoom.toFixed(3)})`;
      if (spaceT !== lastSpace) {
        lastSpace = spaceT;
        space.style.transform = spaceT;
      }
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
        const z = String(
          isTarget
            ? 40
            : p.d >= 0
              ? 16 + Math.round(p.d * 4)
              : 10 + Math.round((1 + p.d) * 4),
        );
        if (z !== lastZ[i]) {
          lastZ[i] = z;
          el.style.zIndex = z;
        }
        // gli altri si attenuano (non spariscono); il pianeta meta si
        // nasconde quando al suo posto vola il viaggiatore
        const op =
          flight && !isTarget
            ? (1 - fe * 0.7).toFixed(3)
            : isTarget &&
                flight &&
                (flight.hold || (!flight.back && flight.pushed))
              ? "0"
              : "1";
        if (op !== lastOp[i]) {
          lastOp[i] = op;
          el.style.opacity = op;
        }
        // il nome dietro non diventa illeggibile: un po' di scala in più
        const ls = labelBoost(s).toFixed(2);
        if (ls !== lastLs[i]) {
          lastLs[i] = ls;
          label.style.setProperty("--ls", ls);
        }
        // il nome del pianeta in volo sparisce subito (zoomato sarebbe enorme)
        const lop =
          isTarget && flight ? Math.max(0, 1 - fe * 3).toFixed(3) : "1";
        if (lop !== lastLabelOp[i]) {
          lastLabelOp[i] = lop;
          label.style.opacity = lop;
        }
      });

      if (flight && fp >= 0.78 && !flight.pushed) {
        flight.pushed = true;
        // il pianeta parte in viaggio dalla sua posizione attuale: la pagina
        // nuova lo accoglierà nella sua intestazione
        const cv = canvasRefs.current[flight.index];
        const b = BODIES[flight.index];
        if (cv)
          takeoff(discRect(cv, PLANET_PAD), {
            hue: b.hue,
            style: b.style,
            seed: b.hue,
          });
        router.push(b.href);
      }
      if (flight?.back && flight.hold && !flight.landed) {
        // ritorno: dico al viaggiatore dove atterrare (il pianeta zoomato)
        flight.landed = true;
        const cv = canvasRefs.current[flight.index];
        const b = BODIES[flight.index];
        if (cv)
          landing(discRect(cv, PLANET_PAD), {
            hue: b.hue,
            style: b.style,
            seed: b.hue,
          });
      }
      if (flight?.back && raw >= 1) {
        // ritorno finito: la galassia torna normale
        flightRef.current = null;
        navRef.current?.removeAttribute("data-flying");
        bodyRefs.current[flight.index]?.classList.remove(styles.target);
        const cv = canvasRefs.current[flight.index];
        if (cv) paintBody(cv, BODIES[flight.index], 1);
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
    const cv = canvasRefs.current[index];
    if (cv) paintBody(cv, BODIES[index], 4); // nitido anche zoomato
    setFlying(index);
  };

  return (
    <nav
      ref={navRef}
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
