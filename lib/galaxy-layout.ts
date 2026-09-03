// La geometria della galassia dell'hero (components/effects/galaxy.tsx) senza
// DOM: orbite, scala dei pianeti in profondità, il posto del nome di ogni
// pianeta e il giro del nome attorno al disco quando cambia posto. Tutto
// puro, così si simula a 60 fps per minuti in pochi millisecondi
// (lib/galaxy-layout.test.ts) e si dimostra che i nomi non passano mai sul
// marchio al centro, non escono dallo schermo e non sfarfallano.

export type Vec = { x: number; y: number };
export type Rect = { x: number; y: number; w: number; h: number };
export type LabelSize = { lw: number; lh: number };
export type Orbiter = { ring: number; size: number; phase: number };
export type Planet = { x: number; y: number; d: number };
export type Bounds = { minX: number; maxX: number; minY: number; maxY: number };

// raggio (frazione del lato) e periodo (secondi) delle tre orbite. L'orbita
// esterna arriva al bordo dello spazio: la galassia usa tutto il quadrato,
// i nomi trovano posto da soli (planLabels) anche sui bordi
export const RINGS = [
  { r: 0.28, period: 46 },
  { r: 0.39, period: 66 },
  { r: 0.5, period: 90 },
] as const;
export const TILT = 0.46; // schiacciamento delle orbite (viste di taglio)
export const BASE_PHI = -0.42; // inclinazione dell'asse a riposo

// Otto posti attorno al disco: sotto, sopra, ai lati e in diagonale. Il nome
// parte sotto e ci resta finché il posto è libero; se lì coprirebbe il
// marchio, uscirebbe dallo schermo o si pesterebbe con un altro nome, va nel
// posto libero più lontano dal centro. Se nessun posto è libero (schermi
// minuscoli) prende quello che si sovrappone di meno; sparisce solo se ogni
// posto coprirebbe il marchio o uscirebbe dallo schermo.
const D = 0.8; // le diagonali stanno un po' più vicine al disco
export const SLOTS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [D, D],
  [-D, D],
  [D, -D],
  [-D, -D],
];
export const LABEL_GAP_X = 8;
export const LABEL_GAP_Y = 12;
export const BLOCKED = 1e9; // penalità: sul marchio o fuori schermo

// il nucleo è il 22-24% del lato; il margine fa spostare il nome un po' prima
// che sfiori l'anello luminoso
export const coreRadius = (S: number) => S * 0.12 + 14;
// pianeti proporzionati allo spazio: su telefono NON troppo piccoli, devono
// restare comodi da toccare
export const scaleK = (S: number) => Math.max(0.88, Math.min(1.25, S / 560));
// 0.72 dietro … 1.02 davanti (d = seno dell'angolo orbitale, +1 = davanti)
export const depthScale = (d: number, k: number, grow = 1) =>
  (0.72 + 0.3 * ((d + 1) / 2)) * grow * k;

export function orbit(
  bodies: readonly Orbiter[],
  t: number,
  S: number,
  cx: number,
  cy: number,
  phi: number,
  still = false,
): Planet[] {
  const cp = Math.cos(phi);
  const sp = Math.sin(phi);
  return bodies.map((b) => {
    const ring = RINGS[b.ring];
    const R = ring.r * S;
    const th = b.phase + (still ? 0 : (2 * Math.PI * t) / ring.period);
    const ex = R * Math.cos(th);
    const ey = R * Math.sin(th) * TILT;
    return {
      x: cx + ex * cp - ey * sp,
      y: cy + ex * sp + ey * cp,
      d: Math.sin(th),
    };
  });
}

// offset del centro del nome rispetto al centro del disco (px non scalati)
export function labelOffset(size: number, label: LabelSize, slot: number): Vec {
  const [sx, sy] = SLOTS[slot];
  const vr = size / 2;
  return {
    x: sx * (vr + LABEL_GAP_X + label.lw / 2),
    y: sy * (vr + LABEL_GAP_Y + label.lh / 2),
  };
}

// rettangolo del nome sullo schermo (il nome scala insieme al pianeta)
export function labelRect(p: Vec, s: number, off: Vec, label: LabelSize): Rect {
  const w = label.lw * s;
  const h = label.lh * s;
  return { x: p.x + off.x * s - w / 2, y: p.y + off.y * s - h / 2, w, h };
}

export const overlapArea = (a: Rect, b: Rect) =>
  Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) *
  Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

export const hitsCircle = (r: Rect, cx: number, cy: number, radius: number) => {
  const nx = Math.max(r.x, Math.min(cx, r.x + r.w));
  const ny = Math.max(r.y, Math.min(cy, r.y + r.h));
  return (nx - cx) ** 2 + (ny - cy) ** 2 < radius * radius;
};

export type LabelPlanInput = {
  pos: Planet[];
  scales: number[];
  sizes: number[]; // diametro del disco di ogni pianeta
  labels: LabelSize[];
  slots: number[]; // posto attuale di ogni nome (isteresi)
  cx: number;
  cy: number;
  coreR: number;
  bounds: Bounds;
  target?: number | null; // il pianeta su cui si sta volando: non si tocca
};

export type LabelPlan = { slots: number[]; hidden: boolean[] };

// Il posto del nome di ogni pianeta per questo frame. Chi sta davanti sceglie
// per primo. Un nome resta dov'è finché il posto è libero; si sposta solo se
// deve (marchio, schermo) o se trova un posto libero o molto migliore:
// niente ping-pong tra posti affollati.
export function planLabels(input: LabelPlanInput): LabelPlan {
  const { pos, scales, sizes, labels, slots, cx, cy, coreR, bounds } = input;
  const target = input.target ?? null;
  const order = pos.map((_, i) => i).sort((a, b) => pos[b].d - pos[a].d);
  const placed: Rect[] = [];
  const next = slots.slice();
  const hidden = slots.map(() => false);

  const rectFor = (i: number, slot: number) =>
    labelRect(
      pos[i],
      scales[i],
      labelOffset(sizes[i], labels[i], slot),
      labels[i],
    );
  const penalty = (r: Rect) => {
    if (
      hitsCircle(r, cx, cy, coreR) ||
      r.x < bounds.minX ||
      r.x + r.w > bounds.maxX ||
      r.y < bounds.minY ||
      r.y + r.h > bounds.maxY
    )
      return BLOCKED;
    let sum = 0;
    for (const q of placed) sum += overlapArea(r, q);
    return sum;
  };

  for (const i of order) {
    let slot = slots[i];
    let rect = rectFor(i, slot);
    const curPen = i === target ? 0 : penalty(rect);
    if (curPen > 0) {
      // il posto libero che guarda più lontano dal centro
      const dx = pos[i].x - cx;
      const dy = pos[i].y - cy;
      const len = Math.hypot(dx, dy) || 1;
      let best = -1;
      let bestPen = BLOCKED;
      let bestScore = -Infinity;
      SLOTS.forEach(([sx, sy], alt) => {
        const pen = penalty(rectFor(i, alt));
        if (pen >= BLOCKED) return;
        const out = (sx * dx + sy * dy) / len / Math.hypot(sx, sy);
        // prima i posti liberi (poi il più esterno); tra quelli occupati il
        // meno sovrapposto
        const score = (pen === 0 ? 2 : 0) + out - pen / 400;
        if (score > bestScore) {
          bestScore = score;
          bestPen = pen;
          best = alt;
        }
      });
      if (
        curPen >= BLOCKED ||
        (best >= 0 && (bestPen === 0 || bestPen < curPen * 0.5))
      ) {
        if (best >= 0) {
          slot = best;
          rect = rectFor(i, slot);
        } else {
          hidden[i] = true;
        }
      }
    }
    next[i] = slot;
    if (!hidden[i]) placed.push(rect);
  }
  return { slots: next, hidden };
}

// ----------------- il giro del nome attorno al disco -----------------
// Quando cambia posto il nome non salta e non attraversa il disco: gli gira
// attorno (coordinate polari attorno al centro del pianeta) dal lato che
// passa più lontano dal centro della galassia, mai verso il marchio.
export const SWING_MS = 520;
export type Swing = {
  start: number;
  a0: number;
  delta: number;
  r0: number;
  r1: number;
};

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// a metà giro il nome si allontana un po' dal disco (SWING_BUMP px): così
// anche accanto a un pianeta rasente al nucleo non sfiora il marchio
export const SWING_BUMP = 24;

const arcPoint = (sw: Omit<Swing, "start">, e: number): Vec => {
  const a = sw.a0 + sw.delta * e;
  const r = sw.r0 + (sw.r1 - sw.r0) * e + SWING_BUMP * Math.sin(Math.PI * e);
  return { x: r * Math.cos(a), y: r * Math.sin(a) };
};

// `center` è il centro della galassia visto dal pianeta (px non scalati). Dei
// due versi possibili (corto e lungo) si sceglie quello che passa più
// lontano dal centro; a parità, il corto.
export function swingPath(
  from: Vec,
  to: Vec,
  center: Vec,
  start: number,
): Swing {
  const a0 = Math.atan2(from.y, from.x);
  const a1 = Math.atan2(to.y, to.x);
  const short = ((a1 - a0 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
  const long = short - Math.sign(short || 1) * 2 * Math.PI;
  const r0 = Math.hypot(from.x, from.y);
  const r1 = Math.hypot(to.x, to.y);
  const clearance = (delta: number) => {
    let min = Infinity;
    for (let e = 0.1; e < 1; e += 0.16) {
      const q = arcPoint({ a0, delta, r0, r1 }, e);
      min = Math.min(min, Math.hypot(q.x - center.x, q.y - center.y));
    }
    return min;
  };
  const delta = clearance(long) > clearance(short) + 1 ? long : short;
  return { start, a0, delta, r0, r1 };
}

export function swingAt(sw: Swing, now: number): { off: Vec; done: boolean } {
  const e = easeOut(Math.min(1, Math.max(0, (now - sw.start) / SWING_MS)));
  return { off: arcPoint(sw, e), done: e >= 1 };
}
