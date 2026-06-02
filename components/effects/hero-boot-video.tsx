"use client";

import { useEffect, useRef } from "react";
import { CtaLink } from "@/components/ui/cta-link";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { openChat } from "@/components/chat/chat-widget";
import styles from "./hero-boot-video.module.css";

export function HeroBootVideo() {
  const screenRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);

  // Campo stellare REALE: stelle a posizioni/dimensioni/luminosità casuali,
  // disegnate UNA volta (anche su mobile: un solo draw, niente loop = non scalda).
  useEffect(() => {
    const screen = screenRef.current;
    const cv = starsRef.current;
    if (!screen || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const draw = () => {
      const r = screen.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      if (w === 0 || h === 0) return;
      cv.width = Math.max(1, Math.round(w * dpr));
      cv.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const n = Math.round((w * h) / 8500);
      for (let i = 0; i < n; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const b = Math.random();
        const bright = b > 0.97;
        const rad = bright ? 1.3 + Math.random() * 1.1 : 0.35 + Math.random() * 0.95;
        const alpha = 0.22 + b * 0.62;
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

  // Nebulose che emanano dal cursore, SI STACCANO e derivano verso l'esterno
  // ("ricreano lo spazio"), poi si dissolvono lentissime. Niente velo accumulato
  // (niente smog): ogni frame pulisco il canvas e ridisegno solo le nuvole vive,
  // ciascuna con la SUA dissolvenza → fermando il mouse svaniscono dolci, mai a
  // scatto. Sprite pre-renderizzate (drawImage) per restare leggero.
  // Solo desktop con mouse; su touch/reduced-motion: nessun loop.
  useEffect(() => {
    const screen = screenRef.current;
    const canvas = trailRef.current;
    if (!screen || !canvas) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sprite "nebulosa" pre-renderizzate: ogni sprite è una nuvola IRREGOLARE,
    // fatta di più batuffoli morbidi sovrapposti (non un cerchio perfetto), così
    // sembrano nebulose e non palline. Più varianti + rotazione casuale a schermo
    // → nessuna si ripete uguale. drawImage resta leggerissimo.
    const SPRITE = 176;
    const SPECS = [
      { hue: 212, w: 0.22 }, // blu
      { hue: 224, w: 0.2 },
      { hue: 236, w: 0.18 }, // indaco
      { hue: 252, w: 0.16 }, // viola
      { hue: 266, w: 0.12 },
      { hue: 286, w: 0.07 }, // magenta
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

    // Nebulosa VERA: rumore coerente (value noise multi-ottava) modellato da una
    // maschera radiale morbida → nuvola di gas con filamenti, vuoti e bordi
    // sfrangiati, silhouette ellittica (non un cerchio pieno = non una pallina).
    const makeNebula = (baseHue: number) => {
      const c = document.createElement("canvas");
      c.width = SPRITE;
      c.height = SPRITE;
      const cx = c.getContext("2d");
      if (!cx) return c;
      const GS = 8; // reticolo del rumore
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
        return (a * (1 - tx) + b * tx) * (1 - ty) + (cc * (1 - tx) + d * tx) * ty;
      };
      const [rr, gg, bb] = hslToRgb(baseHue, 0.8, 0.62);
      const img = cx.createImageData(SPRITE, SPRITE);
      const data = img.data;
      const half = SPRITE / 2;
      const ax = 0.78 + Math.random() * 0.5; // assi ellittici → silhouette irregolare
      const ay = 0.78 + Math.random() * 0.5;
      for (let y = 0; y < SPRITE; y++) {
        for (let x = 0; x < SPRITE; x++) {
          const nx = (x / SPRITE) * GS;
          const ny = (y / SPRITE) * GS;
          const n =
            noise(nx, ny) * 0.6 +
            noise(nx * 2 + 1.7, ny * 2 + 0.3) * 0.3 +
            noise(nx * 4 + 0.5, ny * 4 + 2.1) * 0.1;
          const dx = ((x - half) / half) * ax;
          const dy = ((y - half) / half) * ay;
          const dd = dx * dx + dy * dy;
          const mask = dd >= 1 ? 0 : 1 - dd; // morbida verso i bordi
          let a = Math.pow(n * mask, 1.7) * 1.7; // curva → filamenti e vuoti
          if (a > 1) a = 1;
          const idx = (y * SPRITE + x) * 4;
          data[idx] = rr;
          data[idx + 1] = gg;
          data[idx + 2] = bb;
          data[idx + 3] = Math.round(a * 150);
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
    // estrazione pesata: dominante blu/indaco, un po' di viola, poco magenta
    const pickSprite = () => {
      let r = Math.random() * totalW;
      for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r <= 0) return i;
      }
      return weights.length - 1;
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      const r = screen.getBoundingClientRect();
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
    const EMIT = 54; // px di movimento tra un soffio e l'altro (lanci distanziati)
    let lastX = 0;
    let lastY = 0;
    let has = false;
    let raf = 0;
    let idle = 0;
    let acc = 0; // distanza accumulata dall'ultima emissione
    let lastEmit = 0; // freno temporale tra i soffi (ms)

    const spawn = (x: number, y: number, ang: number, sp: number) => {
      clouds.push({
        x,
        y,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        life: 1,
        r: 26 + Math.random() * 44,
        grow: 0.025 + Math.random() * 0.05, // crescita lenta: non si gonfiano/allargano mentre volano
        sprite: pickSprite(),
        rot: Math.random() * Math.PI * 2,
      });
      if (clouds.length > 220) clouds.splice(0, clouds.length - 220);
    };

    const onMove = (e: MouseEvent) => {
      const r = screen.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const mvx = has ? x - lastX : 0;
      const mvy = has ? y - lastY : 0;
      if (has) {
        const dist = Math.hypot(mvx, mvy);
        const dir = Math.atan2(mvy, mvx);
        acc += dist;
        const now = performance.now();
        // MISSILE: a ogni soffio lancio una nebulosa COESA e VELOCE nella
        // direzione del gesto. Vola dritta e se ne va: NON segue il cursore.
        // Una volta partita la traiettoria è fissa → se giri a sinistra i
        // missili già lanciati proseguono per la loro strada (niente serpente).
        if (acc >= EMIT && now - lastEmit >= 64) {
          acc = 0;
          lastEmit = now;
          const baseAng = dir + (Math.random() - 0.5) * 0.14;
          const headSp = 1.3 + Math.min(dist, 90) * 0.035; // spinta calma: non corrono
          const n = 10 + Math.floor(Math.random() * 5); // 10-14 nuvole = scia ben piena
          const len = 70 + Math.min(dist, 90) * 1.3; // scia molto più LUNGA lungo l'asse
          const cos = Math.cos(baseAng);
          const sin = Math.sin(baseAng);
          for (let b = 0; b < n; b++) {
            const t = n > 1 ? b / (n - 1) : 0; // 0 = testa, 1 = coda
            const sp = headSp * (1 - t * 0.6) + 0.4; // testa più veloce della coda → la scia si allunga mentre vola
            const ang = baseAng + (Math.random() - 0.5) * 0.06; // apertura minima → STRETTA
            // la coda nasce più INDIETRO lungo l'asse → cometa già allungata
            const back = t * len;
            const ox = -cos * back + (Math.random() - 0.5) * 6; // dispersione laterale minima
            const oy = -sin * back + (Math.random() - 0.5) * 6;
            spawn(x + ox, y + oy, ang, sp);
          }
        }
      } else {
        spawn(x, y, Math.random() * Math.PI * 2, 0.5 + Math.random() * 0.4);
      }
      lastX = x;
      lastY = y;
      has = true;
      idle = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      // canvas sempre pulito: niente accumulo, niente smog, niente bordi netti
      ctx.clearRect(0, 0, w, h);

      for (let i = clouds.length - 1; i >= 0; i--) {
        const p = clouds[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.9999; // NESSUN freno: proseguono dritte fino a uscire dallo schermo
        p.vy *= 0.9999;
        p.r += p.grow;
        p.life -= 0.0009; // vita lunghissima (~18s): pur andando piano arrivano al bordo prima di sfumare
        if (p.life <= 0) {
          clouds.splice(i, 1);
          continue;
        }
        // uscita dallo schermo: la nebulosa se n'è andata, la libero
        if (
          p.x < -p.r - 40 ||
          p.x > w + p.r + 40 ||
          p.y < -p.r - 40 ||
          p.y > h + p.r + 40
        ) {
          clouds.splice(i, 1);
          continue;
        }
        // dissolvenza individuale: entra dolce nei primi istanti, poi sfuma
        // per tutta la seconda metà della vita → sparizione impercettibile
        const fadeIn = Math.min(1, (1 - p.life) / 0.04);
        const fadeOut = Math.min(1, p.life / 0.3); // resta piena quasi tutto il tragitto, sfuma solo in fondo
        // allungo la nuvola lungo la direzione del moto (effetto gas/cometa):
        // una nebulosa che vola sembra fumo che sfreccia, non una pallina.
        const speed = Math.hypot(p.vx, p.vy);
        const vang = speed > 0.05 ? Math.atan2(p.vy, p.vx) : p.rot;
        const stretch = 1 + Math.min(speed * 0.3, 3.2); // allungata lungo il moto (scia lunga)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(vang);
        ctx.globalAlpha = fadeIn * fadeOut * 0.9;
        ctx.drawImage(
          sprites[p.sprite],
          -p.r * stretch,
          -p.r,
          p.r * 2 * stretch,
          p.r * 2,
        );
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      // quando non resta nessuna nuvola il canvas è già pulito: fermo il loop.
      if (clouds.length === 0) {
        idle += 1;
        if (idle > 20) {
          raf = 0;
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

    screen.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      screen.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.monitor}>
        <span className={styles.camera} aria-hidden="true" />

        <div className={styles.screen} ref={screenRef}>
          <div className={styles.nebula} aria-hidden="true" />
          <canvas ref={starsRef} className={styles.stars} aria-hidden="true" />
          <canvas ref={trailRef} className={styles.trail} aria-hidden="true" />
          <span className={styles.vignette} aria-hidden="true" />

          <div className={styles.brand}>
            <WowspaceLogo
              size={56}
              showWordmark={false}
              className={styles.endMark}
            />
            <span className={styles.endWordmark}>Wowspace</span>
            <span className={styles.endTagline}>Sites · CRM · AI Systems</span>
          </div>

          <div className={styles.caption}>
            <h1>
              Siti web, CRM e software su misura per aziende che vogliono
              crescere.
            </h1>
            <div className={styles.actions}>
              <CtaLink
                href="/#contatti"
                onClick={(e) => {
                  e.preventDefault();
                  openChat();
                }}
              >
                Parliamo del progetto
              </CtaLink>
              <CtaLink href="/vetrina" variant="ghost">
                Esplora la vetrina
              </CtaLink>
            </div>
          </div>
        </div>

        <span className={styles.chinBrand} aria-hidden="true">
          WOWSPACE
        </span>
        <span className={styles.led} aria-hidden="true" />
      </div>
    </div>
  );
}
