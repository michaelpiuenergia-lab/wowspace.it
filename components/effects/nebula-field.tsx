"use client";

import { useEffect, useRef } from "react";
import { drawPlanets } from "@/components/effects/draw-planets";
import { type PerfTier } from "@/lib/perf-tier";
import styles from "./nebula-field.module.css";

// Profili per tier: DPR (nitidezza/carico), tetto nuvole, nuvole per emissione.
// "alto" coincide coi valori storici del desktop → le macchine potenti non
// cambiano. Il tier arriva da detectPerfTier() (lib/perf-tier), condiviso con
// gli effetti in CSS via l'attributo data-perf su <html>.
const NEBULA_TIERS: Record<
  Exclude<PerfTier, "off">,
  { dpr: number; maxc: number; emit: number }
> = {
  alto: { dpr: 1.5, maxc: 90, emit: 3 },
  medio: { dpr: 1.25, maxc: 56, emit: 2 },
  basso: { dpr: 1.0, maxc: 28, emit: 1 },
};

// Sfondo nebulosa riutilizzabile (stelle + nebulose interattive), SENZA la
// cornice del monitor. Stesso motore dell'hero ma più sottile e a tutto schermo,
// dietro ai contenuti. Si accende al passaggio del mouse / al trascinamento del
// dito e si SPEGNE da solo quando fermo → non pesa quando non lo usi.
export function NebulaField() {
  const hostRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  // Campo stellare: disegnato UNA volta (nessun loop → non scalda). Anche su
  // touch: è l'unico pezzo di "spazio" che il telefono può permettersi, e
  // senza di lui la home su mobile era un fondo nero vuoto. Lì un filo più
  // rado e con DPR più basso.
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
      drawPlanets(ctx, w, h);
    };

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  // Nebulose interattive (stesso motore dell'hero, più sottili).
  useEffect(() => {
    const host = hostRef.current;
    const canvas = trailRef.current;
    if (!host || !canvas) return;
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    // Nebulosa interattiva che insegue il mouse: attiva sulle macchine capaci
    // (default), disattivata su hardware debole (basso) → lì resta solo il campo
    // stellare statico. Si accende al movimento del mouse e si spegne da sola
    // quando ti fermi (vedi il loop 'tick'): non è mai "sempre accesa".
    const tier = document.documentElement.getAttribute("data-perf");
    if (tier === "basso" || tier === "off") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const T = NEBULA_TIERS.medio;
    let decay = fine ? 0.0008 : 0.0018; // sfondo: vita un filo più corta dell'hero

    const SPRITE = 176;
    const SPECS = [
      { hue: 212, w: 0.22 },
      { hue: 224, w: 0.2 },
      { hue: 236, w: 0.18 },
      { hue: 252, w: 0.16 },
      { hue: 266, w: 0.12 },
      { hue: 286, w: 0.07 },
      { hue: 306, w: 0.05 },
    ];
    const VARIANTS = 2;
    const sprites: HTMLCanvasElement[] = [];
    const weights: number[] = [];
    const hslToRgb = (
      h: number,
      s: number,
      l: number,
    ): [number, number, number] => {
      const c1 = (1 - Math.abs(2 * l - 1)) * s;
      const hp = ((((h % 360) + 360) % 360) / 60) % 6;
      const xx = c1 * (1 - Math.abs((hp % 2) - 1));
      let r = 0;
      let g = 0;
      let b = 0;
      if (hp < 1) [r, g, b] = [c1, xx, 0];
      else if (hp < 2) [r, g, b] = [xx, c1, 0];
      else if (hp < 3) [r, g, b] = [0, c1, xx];
      else if (hp < 4) [r, g, b] = [0, xx, c1];
      else if (hp < 5) [r, g, b] = [xx, 0, c1];
      else [r, g, b] = [c1, 0, xx];
      const m = l - c1 / 2;
      return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255),
      ];
    };

    const makeNebula = (baseHue: number) => {
      const c = document.createElement("canvas");
      c.width = SPRITE;
      c.height = SPRITE;
      const cx = c.getContext("2d");
      if (!cx) return c;
      const GS = 8;
      const grid = new Float32Array(GS * GS);
      for (let i = 0; i < grid.length; i++) grid[i] = Math.random();
      const sm = (t: number) => t * t * (3 - 2 * t);
      const at = (gx: number, gy: number) => grid[gy * GS + gx];
      const noise = (fx: number, fy: number) => {
        const ix = Math.floor(fx);
        const iy = Math.floor(fy);
        const tx = sm(fx - ix);
        const ty = sm(fy - iy);
        const x0 = ((ix % GS) + GS) % GS;
        const y0 = ((iy % GS) + GS) % GS;
        const x1 = (x0 + 1) % GS;
        const y1 = (y0 + 1) % GS;
        const a = at(x0, y0);
        const b = at(x1, y0);
        const cc = at(x0, y1);
        const d = at(x1, y1);
        return (
          (a * (1 - tx) + b * tx) * (1 - ty) + (cc * (1 - tx) + d * tx) * ty
        );
      };
      const [rr, gg, bb] = hslToRgb(baseHue, 0.8, 0.62);
      const img = cx.createImageData(SPRITE, SPRITE);
      const data = img.data;
      const half = SPRITE / 2;
      const ax = 1.0 + Math.random() * 0.45;
      const ay = 1.0 + Math.random() * 0.45;
      for (let y = 0; y < SPRITE; y++) {
        for (let x = 0; x < SPRITE; x++) {
          const nx = (x / SPRITE) * GS;
          const ny = (y / SPRITE) * GS;
          const n =
            noise(nx, ny) * 0.5 +
            noise(nx * 2 + 1.7, ny * 2 + 0.3) * 0.28 +
            noise(nx * 4 + 0.5, ny * 4 + 2.1) * 0.14 +
            noise(nx * 8 + 3.1, ny * 8 + 5.3) * 0.08;
          const dx = ((x - half) / half) * ax;
          const dy = ((y - half) / half) * ay;
          const dd = dx * dx + dy * dy;
          const mask = dd >= 1 ? 0 : 1 - dd;
          let a = Math.pow(n * mask, 1.6) * 2;
          if (a > 1) a = 1;
          const idx = (y * SPRITE + x) * 4;
          data[idx] = rr;
          data[idx + 1] = gg;
          data[idx + 2] = bb;
          data[idx + 3] = Math.round(a * 168);
        }
      }
      cx.putImageData(img, 0, 0);
      return c;
    };
    SPECS.forEach((s) => {
      for (let v = 0; v < VARIANTS; v++) {
        sprites.push(makeNebula(s.hue));
        weights.push(s.w / VARIANTS);
      }
    });
    const totalW = weights.reduce((a, b) => a + b, 0);
    const pickSprite = () => {
      let r = Math.random() * totalW;
      for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r <= 0) return i;
      }
      return weights.length - 1;
    };

    // cap DPR dal tier (touch un gradino più giù) = meno calore
    const dprCap = fine ? T.dpr : Math.min(T.dpr, 1.3);
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = host.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type Cloud = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      r: number;
      grow: number;
      sprite: number;
      rot: number;
    };
    const clouds: Cloud[] = [];
    const EMIT = 88; // meno nebulose (più alto = più rade)
    // Tetto nuvole dal tier (touch un filo più basso). Mutabile: se gli FPS
    // crollano lo abbassiamo a runtime.
    let maxc = fine ? T.maxc : Math.min(T.maxc, 48);
    const emitN = fine ? T.emit : Math.max(1, T.emit - 1); // nuvole per emissione
    let lastX = 0;
    let lastY = 0;
    let has = false;
    let raf = 0;
    let idle = 0;
    let acc = 0;
    let lastEmit = 0;
    // Campionamento FPS reale → se la macchina non regge, alleggerisce e poi
    // congela (resta solo il campo stellare statico). È il segnale che cattura
    // la GPU debole, che CPU/RAM non vedono.
    let frozen = false;
    let downgrades = 0;
    let fpsPrev = 0;
    let fpsAcc = 0;
    let fpsFrames = 0;

    const spawn = (x: number, y: number, ang: number, sp: number) => {
      clouds.push({
        x,
        y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        life: 1,
        r: 28 + Math.random() * 42,
        grow: 0.04 + Math.random() * 0.07,
        sprite: pickSprite(),
        rot: Math.random() * Math.PI * 2,
      });
      if (clouds.length > maxc) clouds.splice(0, clouds.length - maxc);
    };

    const feed = (x: number, y: number) => {
      // Congelata: niente nuove nebulose, il RAF non riparte → costo ~zero.
      if (frozen) {
        lastX = x;
        lastY = y;
        has = true;
        return;
      }
      if (has) {
        const mvx = x - lastX;
        const mvy = y - lastY;
        const dist = Math.hypot(mvx, mvy);
        acc += dist;
        const now = performance.now();
        if (acc >= EMIT && now - lastEmit >= 110) {
          acc = 0;
          lastEmit = now;
          const dir = Math.atan2(mvy, mvx);
          const baseAng = dir + (Math.random() - 0.5) * 0.22;
          const headSp = 0.6 + Math.min(dist, 90) * 0.022; // lente (anche col mouse piano)
          const n = emitN;
          const len = 80 + Math.min(dist, 90) * 0.5; // corpo LUNGO anche coi gesti lenti
          const cos = Math.cos(baseAng);
          const sin = Math.sin(baseAng);
          for (let b = 0; b < n; b++) {
            const t = n > 1 ? b / (n - 1) : 0;
            const sp = headSp * (1 - t * 0.35) + 0.3;
            const ang = baseAng + (Math.random() - 0.5) * 0.08;
            const back = t * len;
            const ox = -cos * back + (Math.random() - 0.5) * 5;
            const oy = -sin * back + (Math.random() - 0.5) * 5;
            spawn(x + ox, y + oy, ang, sp);
          }
          idle = 0;
          if (!raf) raf = requestAnimationFrame(tick);
        }
      }
      lastX = x;
      lastY = y;
      has = true;
    };

    const onMove = (e: MouseEvent) => {
      const r = host.getBoundingClientRect();
      feed(e.clientX - r.left, e.clientY - r.top);
    };
    const onTouchStart = () => {
      has = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const r = host.getBoundingClientRect();
      feed(t.clientX - r.left, t.clientY - r.top);
    };

    const tick = () => {
      const now = performance.now();
      // FPS reali quando il loop è carico: salta il primo frame e i salti
      // anomali (tab in background). Sotto soglia → prima alleggerisce, poi
      // congela del tutto.
      if (fpsPrev && clouds.length > 3) {
        const dt = now - fpsPrev;
        if (dt > 0 && dt < 200) {
          fpsAcc += dt;
          fpsFrames += 1;
          if (fpsFrames >= 30) {
            const fps = 1000 / (fpsAcc / fpsFrames);
            fpsAcc = 0;
            fpsFrames = 0;
            if (fps < 45) {
              if (downgrades < 2) {
                downgrades += 1;
                maxc = Math.max(12, Math.round(maxc * 0.6));
                decay *= 1.7; // vita più corta = meno nuvole insieme
                if (clouds.length > maxc) {
                  clouds.splice(0, clouds.length - maxc);
                }
              } else {
                frozen = true; // resta solo il campo stellare statico
                clouds.length = 0;
              }
            }
          }
        }
      }
      fpsPrev = now;

      ctx.clearRect(0, 0, w, h);
      for (let i = clouds.length - 1; i >= 0; i--) {
        const p = clouds[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.9999;
        p.vy *= 0.9999;
        p.r += p.grow;
        p.life -= decay;
        if (p.life <= 0) {
          clouds.splice(i, 1);
          continue;
        }
        if (
          p.x < -p.r - 40 ||
          p.x > w + p.r + 40 ||
          p.y < -p.r - 40 ||
          p.y > h + p.r + 40
        ) {
          clouds.splice(i, 1);
          continue;
        }
        const fadeIn = Math.min(1, (1 - p.life) / 0.04);
        const fadeOut = Math.min(1, p.life / 0.3);
        const speed = Math.hypot(p.vx, p.vy);
        const vang = speed > 0.05 ? Math.atan2(p.vy, p.vx) : p.rot;
        const stretch = 3.1 + Math.min(speed * 0.36, 2.8);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(vang);
        ctx.globalAlpha = fadeIn * fadeOut * 0.6; // più sottile dell'hero (sfondo)
        const d = p.r * 2;
        ctx.drawImage(sprites[p.sprite], -p.r * stretch, -p.r, d * stretch, d);
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      if (clouds.length === 0) {
        idle += 1;
        if (idle > 20) {
          raf = 0;
          // azzera la misura FPS: alla ripartenza il delta sarebbe enorme
          fpsPrev = 0;
          fpsAcc = 0;
          fpsFrames = 0;
          return;
        }
      } else {
        idle = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    if (fine) {
      window.addEventListener("mousemove", onMove);
    } else {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
    }
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={hostRef} className={styles.field} aria-hidden="true">
      <canvas ref={starsRef} className={styles.stars} />
      <canvas ref={trailRef} className={styles.trail} />
    </div>
  );
}
