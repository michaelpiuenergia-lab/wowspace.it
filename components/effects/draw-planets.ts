// I pianeti. Quelli LONTANI del campo stellare (NebulaField) sono dischi
// traslucidi economici: tinta unica, dimensione variabile e uno "stile"
// (falce in fase, anellato, gigante a bande, alone soffuso). Quelli PIENI
// (galassia dell'hero, pianeta di pagina, viaggiatore, scene 3D) hanno una
// superficie vera dipinta pixel per pixel (planet-surface.ts): crateri,
// oceani e nuvole, bande, lava, cristallo, ghiaccio con gli anelli. Ogni
// pianeta viene disegnato UNA volta sul proprio canvas; a muoverlo è solo
// il CSS (transform).
import { seeded } from "@/components/effects/planet-surface";
import {
  SURFACE_MAX_RES,
  getSurface,
  loadSurface,
  nearestSurface,
  surfaceRes,
} from "@/components/effects/surface-cache";

export type PlanetSpec = {
  id: number;
  /** posizione nel campo, in % della larghezza/altezza */
  x: number;
  y: number;
  /** raggio del disco in px */
  pr: number;
  hue: number;
  style: number;
  /** direzione della luce */
  la: number;
  /** 0 = lontanissimo (quasi fermo), 1 = vicino (parallasse piena) */
  depth: number;
  /** disco pieno e vivido (pianeti della galassia e di pagina); altrimenti
   *  traslucido, come i pianeti lontani del campo stellare */
  solid?: boolean;
  /** seme del disegno (superficie, anelli): con lo stesso seme il pianeta
   *  viene identico ovunque, così può "viaggiare" da un posto all'altro */
  seed?: number;
  /** tetto alla risoluzione del disco pieno (vedi surface-cache.ts) */
  maxRes?: number;
};

// Il canvas di un pianeta è più largo del disco: contiene alone e anelli.
export const PLANET_PAD = 3.4;

export function planPlanets(): PlanetSpec[] {
  // tinte distinte: blu, indaco, viola, magenta, ciano, ambra, verde-acqua
  const palette = [205, 222, 268, 312, 188, 38, 158];
  // mescolo (Fisher-Yates) così ogni pianeta prende una tinta e uno stile diversi
  const hues = palette.slice();
  for (let i = hues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [hues[i], hues[j]] = [hues[j], hues[i]];
  }
  const styles = [0, 1, 2, 3];
  for (let i = styles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [styles[i], styles[j]] = [styles[j], styles[i]];
  }

  const count = 3 + Math.floor(Math.random() * 2); // 3-4 pianeti
  const out: PlanetSpec[] = [];
  for (let i = 0; i < count; i++) {
    // dimensioni varie: qualcuno chiaramente più grande/vicino
    const pr = 6 + Math.random() * 22;
    out.push({
      id: i,
      x: 4 + Math.random() * 88,
      y: 4 + Math.random() * 60, // verso l'alto (cielo)
      pr,
      hue: hues[i % hues.length],
      style: styles[i % styles.length],
      la: Math.random() * Math.PI * 2,
      depth: 0.35 + ((pr - 6) / 22) * 0.65, // più grande = più vicino
    });
  }
  return out;
}

// Disegna un pianeta al centro del suo canvas. Il disco pieno arriva dal
// worker (surface-cache.ts): se non è ancora pronto si disegna subito un
// segnaposto (un disco pronto della stessa famiglia, o una sfera sfumata)
// e si ridipinge appena arriva, purché nel frattempo il canvas non sia
// stato ridipinto con altro.
export function paintPlanet(
  canvas: HTMLCanvasElement,
  spec: PlanetSpec,
  dpr: number,
): void {
  const size = Math.ceil(spec.pr * 2 * PLANET_PAD);
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const seed = spec.seed ?? Math.floor(Math.random() * 1e9);
  const solid = spec.solid ?? false;
  let surface: HTMLCanvasElement | null = null;
  if (solid) {
    const want = {
      hue: spec.hue,
      style: spec.style,
      la: spec.la,
      seed,
      res: surfaceRes(
        Math.ceil(spec.pr * 2 * dpr),
        spec.maxRes ?? SURFACE_MAX_RES,
      ),
    };
    surface = getSurface(want);
    if (!surface) {
      surface = nearestSurface(want);
      const token = `${want.style}|${want.hue}|${seed}|${want.res}|${dpr}`;
      canvas.dataset.planet = token;
      void loadSurface(want).then((ready) => {
        if (canvas.dataset.planet !== token) return; // nel frattempo è cambiato
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, size, size);
        drawPlanet(
          ctx,
          size / 2,
          size / 2,
          spec.pr,
          spec.hue,
          spec.style,
          spec.la,
          solid,
          seed,
          ready,
        );
      });
    } else {
      canvas.dataset.planet = "";
    }
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);
  drawPlanet(
    ctx,
    size / 2,
    size / 2,
    spec.pr,
    spec.hue,
    spec.style,
    spec.la,
    solid,
    seed,
    surface,
  );
}

function drawRings(
  ctx: CanvasRenderingContext2D,
  pr: number,
  hue: number,
  tilt: number,
  squash: number,
  count: number,
  solid: boolean,
): void {
  ctx.save();
  ctx.rotate(tilt);
  ctx.scale(1, squash);
  for (let k = 0; k < count; k++) {
    const rr = pr * (1.55 + k * 0.5);
    ctx.beginPath();
    ctx.arc(0, 0, rr, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${hue}, 62%, 80%, ${(solid ? 0.55 : 0.3) - k * 0.09})`;
    ctx.lineWidth = solid ? Math.max(1.2, pr * 0.05) : 1.2;
    ctx.stroke();
  }
  ctx.restore();
}

// Anelli VERI per il pianeta pieno: un sistema di bande (con la lacuna) e
// l'ombra del pianeta sugli anelli, dalla parte opposta alla luce.
function drawRingSystem(
  ctx: CanvasRenderingContext2D,
  pr: number,
  hue: number,
  tilt: number,
  squash: number,
  la: number,
  gap: number,
): void {
  const inner = pr * 1.28;
  const outer = pr * 2.05;
  const g = ctx.createRadialGradient(0, 0, inner, 0, 0, outer);
  // bande: alternanza chiaro/scuro con una lacuna netta verso i due terzi
  const bands = 9;
  for (let k = 0; k <= bands; k++) {
    const t = k / bands;
    const nearGap = Math.abs(t - gap) < 0.05;
    const a = nearGap ? 0.06 : k % 2 ? 0.62 : 0.3;
    const l = k % 2 ? 84 : 72;
    g.addColorStop(t, `hsla(${hue}, 60%, ${l}%, ${a * (1 - t * 0.35)})`);
  }
  ctx.save();
  ctx.rotate(tilt);
  ctx.scale(1, squash);
  ctx.beginPath();
  ctx.arc(0, 0, outer, 0, Math.PI * 2);
  ctx.arc(0, 0, inner, 0, Math.PI * 2, true);
  ctx.fillStyle = g;
  ctx.fill("evenodd");
  // ombra del pianeta sugli anelli: una striscia larga quanto il disco che
  // parte dal centro e va dalla parte opposta alla luce (nel piano degli
  // anelli)
  const ax = Math.cos(la - tilt);
  const ay = Math.sin(la - tilt) / squash;
  const len = Math.hypot(ax, ay) || 1;
  const dx = -ax / len;
  const dy = -ay / len;
  ctx.beginPath();
  ctx.arc(0, 0, outer, 0, Math.PI * 2);
  ctx.arc(0, 0, inner, 0, Math.PI * 2, true);
  ctx.clip("evenodd");
  const sh = ctx.createLinearGradient(0, 0, dx * outer, dy * outer);
  sh.addColorStop(0, "rgba(2, 4, 8, 0.85)");
  sh.addColorStop(0.55, "rgba(2, 4, 8, 0.55)");
  sh.addColorStop(1, "rgba(2, 4, 8, 0)");
  ctx.fillStyle = sh;
  ctx.beginPath();
  ctx.moveTo(-dy * pr * 0.96, dx * pr * 0.96);
  ctx.lineTo(
    -dy * pr * 0.96 + dx * outer * 1.1,
    dx * pr * 0.96 + dy * outer * 1.1,
  );
  ctx.lineTo(
    dy * pr * 0.96 + dx * outer * 1.1,
    -dx * pr * 0.96 + dy * outer * 1.1,
  );
  ctx.lineTo(dy * pr * 0.96, -dx * pr * 0.96);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  pr: number,
  hue: number,
  style: number,
  la: number,
  solid: boolean,
  seed: number,
  surface: HTMLCanvasElement | null,
): void {
  const rnd = seeded(seed);
  const ringed = style === 1;
  const ringTilt = -0.6 + rnd() * 1.2;
  const ringSquash = 0.26 + rnd() * 0.12;
  const ringCount = 1 + Math.floor(rnd() * 2); // 1-2 anelli
  const ringGap = 0.58 + rnd() * 0.08; // dove sta la lacuna (pianeta pieno)

  // alone: più marcato per il pianeta "alone soffuso" (lontano) e per la
  // lava, che fa luce propria
  const haloStrength = solid
    ? style === 4
      ? 0.26
      : 0.12
    : style === 2
      ? 0.2
      : 0.09;
  const haloR =
    pr * (solid ? (style === 4 ? 3.2 : 2.6) : style === 2 ? 3.2 : 2.6);
  const halo = ctx.createRadialGradient(px, py, pr * 0.6, px, py, haloR);
  halo.addColorStop(0, `hsla(${hue}, 70%, 68%, ${haloStrength})`);
  halo.addColorStop(1, `hsla(${hue}, 70%, 68%, 0)`);
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(px, py, haloR, 0, Math.PI * 2);
  ctx.fill();

  // anelli DIETRO il disco (vengono poi coperti dal pianeta nella metà inferiore)
  if (ringed) {
    ctx.save();
    ctx.translate(px, py);
    if (solid) drawRingSystem(ctx, pr, hue, ringTilt, ringSquash, la, ringGap);
    else drawRings(ctx, pr, hue, ringTilt, ringSquash, ringCount, solid);
    ctx.restore();
  }

  if (solid) {
    if (surface) {
      // superficie vera (planet-surface.ts), calcolata dal worker
      ctx.drawImage(surface, px - pr, py - pr, pr * 2, pr * 2);
    } else {
      // segnaposto: una sfera piena sfumata della sua tinta, con il
      // terminatore; dura il tempo che il worker consegni il disco
      const lx = px + Math.cos(la) * pr * 0.55;
      const ly = py + Math.sin(la) * pr * 0.55;
      const g = ctx.createRadialGradient(lx, ly, pr * 0.1, px, py, pr);
      g.addColorStop(0, `hsla(${hue}, 60%, 70%, 1)`);
      g.addColorStop(0.5, `hsla(${hue}, 55%, 46%, 1)`);
      g.addColorStop(0.88, `hsla(${hue}, 50%, 22%, 1)`);
      g.addColorStop(1, `hsla(${hue}, 50%, 12%, 1)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }
    // oceano e gigante gassoso: un velo d'atmosfera appena fuori dal disco
    if (style === 2 || style === 3) {
      const atm = ctx.createRadialGradient(
        px,
        py,
        pr * 0.98,
        px,
        py,
        pr * 1.14,
      );
      atm.addColorStop(
        0,
        `hsla(${hue}, 85%, 78%, ${style === 2 ? 0.42 : 0.28})`,
      );
      atm.addColorStop(
        0.35,
        `hsla(${hue}, 85%, 78%, ${style === 2 ? 0.16 : 0.1})`,
      );
      atm.addColorStop(1, `hsla(${hue}, 85%, 78%, 0)`);
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(px, py, pr * 1.14, 0, Math.PI * 2);
      ctx.fill();
    }
    if (ringed) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(px - pr * 3, py, pr * 6, pr * 3); // solo sotto il centro
      ctx.clip();
      ctx.translate(px, py);
      drawRingSystem(ctx, pr, hue, ringTilt, ringSquash, la, ringGap);
      ctx.restore();
    }
    return;
  }

  // pianeta lontano: disco traslucido con lato illuminato (luce decentrata)
  const lx = px + Math.cos(la) * pr * 0.55;
  const ly = py + Math.sin(la) * pr * 0.55;
  const g = ctx.createRadialGradient(lx, ly, pr * 0.1, px, py, pr);
  g.addColorStop(0, `hsla(${hue}, 62%, 74%, 0.62)`);
  g.addColorStop(0.55, `hsla(${hue}, 55%, 47%, 0.4)`);
  g.addColorStop(1, `hsla(${hue}, 52%, 18%, 0.16)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(px, py, pr, 0, Math.PI * 2);
  ctx.fill();

  // gigante gassoso: bande orizzontali sottili, ritagliate sul disco
  if (style === 3) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.clip();
    const bands = 3 + Math.floor(rnd() * 3);
    for (let b = 0; b < bands; b++) {
      const yy = py - pr + ((b + 0.5) / bands) * pr * 2;
      ctx.globalAlpha = 0.12 + rnd() * 0.1;
      ctx.fillStyle = `hsla(${hue}, 55%, ${b % 2 ? 64 : 32}%, 1)`;
      ctx.fillRect(px - pr, yy - pr * 0.11, pr * 2, pr * 0.22);
    }
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  // pianeta in FASE: ombra a falce sul lato opposto alla luce
  if (style === 0) {
    const sx = px - Math.cos(la) * pr * 0.7;
    const sy = py - Math.sin(la) * pr * 0.7;
    const sh = ctx.createRadialGradient(sx, sy, pr * 0.15, sx, sy, pr * 1.3);
    sh.addColorStop(0, "rgba(2, 4, 8, 0.66)");
    sh.addColorStop(1, "rgba(2, 4, 8, 0)");
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = sh;
    ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);
    ctx.restore();
  }

  // anelli DAVANTI: ridisegno solo la metà inferiore così l'anello passa
  // davanti al pianeta sotto e dietro sopra (occlusione corretta).
  if (ringed) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(px - pr * 3, py, pr * 6, pr * 3); // solo sotto il centro
    ctx.clip();
    ctx.translate(px, py);
    drawRings(ctx, pr, hue, ringTilt, ringSquash, ringCount, solid);
    ctx.restore();
  }
}
