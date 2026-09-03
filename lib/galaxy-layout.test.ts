import { describe, expect, it } from "vitest";
import {
  BASE_PHI,
  SLOTS,
  SWING_MS,
  coreRadius,
  depthScale,
  hitsCircle,
  labelOffset,
  labelRect,
  orbit,
  overlapArea,
  planLabels,
  scaleK,
  swingAt,
  swingPath,
  type LabelSize,
  type Rect,
  type Swing,
  type Vec,
} from "@/lib/galaxy-layout";

// gli stessi sei pianeti del componente (anello, diametro, fase)
const BODIES = [
  { ring: 0, size: 46, phase: 0.4 },
  { ring: 0, size: 38, phase: 0.4 + Math.PI },
  { ring: 1, size: 54, phase: 1.5 },
  { ring: 1, size: 36, phase: 1.5 + Math.PI },
  { ring: 2, size: 44, phase: 2.7 },
  { ring: 2, size: 32, phase: 2.7 + Math.PI },
];
const SIZES = BODIES.map((b) => b.size);
// misure dei nomi prese dal browser (px): desktop e sotto i 640px
const LABELS_DESKTOP: LabelSize[] = [71, 129, 146, 102, 66, 141].map((lw) => ({
  lw,
  lh: 27,
}));
const LABELS_MOBILE: LabelSize[] = [59, 106, 121, 85, 55, 117].map((lw) => ({
  lw,
  lh: 23,
}));

type Scenario = {
  name: string;
  S: number; // lato dello spazio
  vw: number; // larghezza dello schermo
  left: number; // bordo sinistro dello spazio sullo schermo
  labels: LabelSize[];
};

const SCENARI: Scenario[] = [
  { name: "desktop 1440", S: 660, vw: 1440, left: 750, labels: LABELS_DESKTOP },
  {
    name: "pieghevole 904",
    S: 520,
    vw: 904,
    left: 192,
    labels: LABELS_DESKTOP,
  },
  { name: "tablet 820", S: 520, vw: 820, left: 150, labels: LABELS_DESKTOP },
  { name: "telefono 412", S: 346, vw: 412, left: 33, labels: LABELS_MOBILE },
  { name: "telefono 360", S: 302, vw: 360, left: 29, labels: LABELS_MOBILE },
];

// Simula il loop del componente a 60 fps: orbite, scelta del posto, giro del
// nome. Conta tutto quello che non deve succedere.
function simulate(sc: Scenario, seconds = 300, fps = 60) {
  const { S, vw, left, labels } = sc;
  const H = S;
  const cx = S / 2;
  const cy = H / 2;
  const coreR = coreRadius(S);
  const k = scaleK(S);
  const bounds = {
    minX: -left + 6,
    maxX: vw - left - 6,
    minY: -8,
    maxY: H + 8,
  };
  const coreEdge = S * 0.12; // il bordo del nucleo (anello luminoso)
  const logoR = coreEdge * 0.62; // il marchio vero e proprio
  let slots = BODIES.map(() => 0);
  const cur: Vec[] = BODIES.map((b, i) => labelOffset(b.size, labels[i], 0));
  const swings: (Swing | null)[] = BODIES.map(() => null);
  const stats = {
    frames: 0,
    hidden: 0,
    restOnCore: 0,
    swingOnLogo: 0,
    swingOnCore: 0,
    outOfBounds: 0,
    overlapFrames: 0,
    maxOverlap: 0,
    changes: BODIES.map(() => 0),
    swingFrames: 0,
  };
  for (let f = 0; f < seconds * fps; f++) {
    const t = f / fps;
    const now = t * 1000;
    const phi = BASE_PHI + Math.sin(t / 9) * 0.1;
    const pos = orbit(BODIES, t, S, cx, cy, phi);
    const scales = pos.map((p) => depthScale(p.d, k));
    const plan = planLabels({
      pos,
      scales,
      sizes: SIZES,
      labels,
      slots,
      cx,
      cy,
      coreR,
      bounds,
    });
    const rects: (Rect | null)[] = [];
    pos.forEach((p, i) => {
      if (f === 0) {
        // come nel componente: al primo frame i nomi vanno subito al posto
        cur[i] = labelOffset(SIZES[i], labels[i], plan.slots[i]);
      } else if (plan.slots[i] !== slots[i]) {
        stats.changes[i]++;
        swings[i] = swingPath(
          cur[i],
          labelOffset(SIZES[i], labels[i], plan.slots[i]),
          { x: (cx - p.x) / scales[i], y: (cy - p.y) / scales[i] },
          now,
        );
      }
      const sw = swings[i];
      if (sw) {
        const { off, done } = swingAt(sw, now);
        cur[i] = off;
        if (done) swings[i] = null;
      }
      if (plan.hidden[i]) {
        stats.hidden++;
        rects.push(null);
        return;
      }
      const r = labelRect(p, scales[i], cur[i], labels[i]);
      rects.push(r);
      if (swings[i]) {
        stats.swingFrames++;
        if (hitsCircle(r, cx, cy, logoR)) stats.swingOnLogo++;
        if (hitsCircle(r, cx, cy, coreEdge)) stats.swingOnCore++;
      } else {
        if (hitsCircle(r, cx, cy, coreEdge)) stats.restOnCore++;
        if (
          r.x < bounds.minX - 0.5 ||
          r.x + r.w > bounds.maxX + 0.5 ||
          r.y < bounds.minY - 0.5 ||
          r.y + r.h > bounds.maxY + 0.5
        )
          stats.outOfBounds++;
      }
    });
    slots = plan.slots;
    let overlapped = false;
    for (let a = 0; a < rects.length; a++) {
      for (let b = a + 1; b < rects.length; b++) {
        const ra = rects[a];
        const rb = rects[b];
        if (!ra || !rb || swings[a] || swings[b]) continue;
        const area = overlapArea(ra, rb);
        if (area > 0) {
          overlapped = true;
          stats.maxOverlap = Math.max(stats.maxOverlap, area);
        }
      }
    }
    if (overlapped) stats.overlapFrames++;
    stats.frames++;
  }
  return stats;
}

describe("galassia: orbite", () => {
  it("i pianeti restano dentro allo spazio quadrato", () => {
    const S = 640;
    for (let t = 0; t < 400; t += 0.5) {
      const phi = BASE_PHI + Math.sin(t / 9) * 0.1;
      for (const p of orbit(BODIES, t, S, S / 2, S / 2, phi)) {
        expect(p.x).toBeGreaterThan(-2);
        expect(p.x).toBeLessThan(S + 2);
        expect(p.y).toBeGreaterThan(S * 0.15);
        expect(p.y).toBeLessThan(S * 0.85);
      }
    }
  });

  it("nessun pianeta passa sopra il marchio", () => {
    const S = 640;
    for (let t = 0; t < 400; t += 0.25) {
      const phi = BASE_PHI + Math.sin(t / 9) * 0.1;
      for (const p of orbit(BODIES, t, S, S / 2, S / 2, phi)) {
        expect(Math.hypot(p.x - S / 2, p.y - S / 2)).toBeGreaterThan(
          S * 0.12 * 0.62 + 20,
        );
      }
    }
  });

  it("con 'riduci movimento' i pianeti stanno fermi", () => {
    const a = orbit(BODIES, 0, 600, 300, 300, BASE_PHI, true);
    const b = orbit(BODIES, 123, 600, 300, 300, BASE_PHI, true);
    expect(a).toEqual(b);
  });
});

describe("galassia: il posto del nome", () => {
  const base = {
    scales: [1],
    sizes: [40],
    labels: [{ lw: 100, lh: 26 }],
    cx: 300,
    cy: 300,
    coreR: coreRadius(600),
    bounds: { minX: -400, maxX: 1000, minY: -8, maxY: 608 },
  };

  it("sotto il disco finché non copre il marchio, poi si sposta", () => {
    // pianeta lontano, in basso a destra: resta sotto
    const far = planLabels({
      ...base,
      pos: [{ x: 500, y: 450, d: 1 }],
      slots: [0],
    });
    expect(far).toEqual({ slots: [0], hidden: [false] });
    // pianeta appena sopra il nucleo: sotto coprirebbe il marchio
    const near = planLabels({
      ...base,
      pos: [{ x: 300, y: 190, d: -1 }],
      slots: [0],
    });
    expect(near.hidden).toEqual([false]);
    expect(near.slots[0]).not.toBe(0);
    const r = labelRect(
      { x: 300, y: 190 },
      1,
      labelOffset(40, base.labels[0], near.slots[0]),
      base.labels[0],
    );
    expect(hitsCircle(r, 300, 300, base.coreR)).toBe(false);
  });

  it("preferisce il posto che guarda lontano dal centro", () => {
    const near = planLabels({
      ...base,
      pos: [{ x: 300, y: 190, d: -1 }],
      slots: [0],
    });
    expect(near.slots[0]).toBe(1); // sopra
    // sopra il nucleo ma senza spazio in alto: di lato (sotto copre il marchio)
    const side = planLabels({
      ...base,
      pos: [{ x: 300, y: 180, d: 0 }],
      slots: [1],
      bounds: { ...base.bounds, minY: 150 },
    });
    expect(side.hidden).toEqual([false]);
    expect([2, 3]).toContain(side.slots[0]);
  });

  it("due nomi non si pestano: parla per primo chi sta davanti", () => {
    const two = planLabels({
      ...base,
      scales: [1, 1],
      sizes: [40, 40],
      labels: [
        { lw: 100, lh: 26 },
        { lw: 100, lh: 26 },
      ],
      pos: [
        { x: 480, y: 480, d: 1 },
        { x: 500, y: 490, d: -1 },
      ],
      slots: [0, 0],
    });
    expect(two.slots[0]).toBe(0);
    expect(two.slots[1]).not.toBe(0);
    expect(two.hidden).toEqual([false, false]);
  });

  it("il pianeta su cui si vola tiene il suo nome", () => {
    const fly = planLabels({
      ...base,
      pos: [{ x: 300, y: 190, d: -1 }],
      slots: [0],
      target: 0,
    });
    expect(fly).toEqual({ slots: [0], hidden: [false] });
  });

  it("sparisce solo se ogni posto coprirebbe il marchio o uscirebbe", () => {
    const boxed = planLabels({
      ...base,
      pos: [{ x: 300, y: 200, d: -1 }],
      slots: [0],
      bounds: { minX: 250, maxX: 350, minY: 150, maxY: 250 },
    });
    expect(boxed.hidden).toEqual([true]);
  });
});

describe("galassia: il giro del nome", () => {
  it("gira dal lato esterno, mai verso il centro", () => {
    // da sotto a sopra, con il centro della galassia a sinistra: passa a destra
    const path = (center: Vec) => {
      const sw = swingPath({ x: 0, y: 50 }, { x: 0, y: -50 }, center, 0);
      const xs: number[] = [];
      for (let ms = 0; ms <= SWING_MS; ms += 10) xs.push(swingAt(sw, ms).off.x);
      return xs;
    };
    expect(Math.max(...path({ x: -200, y: 0 }))).toBeGreaterThan(40);
    expect(Math.min(...path({ x: -200, y: 0 }))).toBeGreaterThan(-1);
    // e con il centro a destra: passa a sinistra
    expect(Math.min(...path({ x: 200, y: 0 }))).toBeLessThan(-40);
    expect(Math.max(...path({ x: 200, y: 0 }))).toBeLessThan(1);
  });

  it("parte dal punto attuale e arriva esattamente al nuovo posto", () => {
    const from = { x: 30, y: 40 };
    const to = { x: -60, y: 10 };
    const sw = swingPath(from, to, { x: 300, y: 0 }, 1000);
    expect(swingAt(sw, 1000).off.x).toBeCloseTo(from.x, 5);
    expect(swingAt(sw, 1000).off.y).toBeCloseTo(from.y, 5);
    const end = swingAt(sw, 1000 + SWING_MS);
    expect(end.done).toBe(true);
    expect(end.off.x).toBeCloseTo(to.x, 5);
    expect(end.off.y).toBeCloseTo(to.y, 5);
  });

  it("ogni posto sta fuori dal disco", () => {
    const label = { lw: 100, lh: 26 };
    SLOTS.forEach((_, slot) => {
      const off = labelOffset(40, label, slot);
      const r = labelRect({ x: 0, y: 0 }, 1, off, label);
      expect(hitsCircle(r, 0, 0, 20)).toBe(false);
    });
  });
});

describe("galassia: cinque minuti a 60 fps", () => {
  for (const sc of SCENARI) {
    it(sc.name, () => {
      const st = simulate(sc);
      const labelFrames = st.frames * BODIES.length;
      if (process.env.GALAXY_STATS) console.log(sc.name, JSON.stringify(st));
      // mai sul nucleo, mai fuori dallo schermo
      expect(st.restOnCore).toBe(0);
      expect(st.outOfBounds).toBe(0);
      // durante il giro il nome può sfiorare il bordo del nucleo, mai il
      // marchio (sul telefono stretto: al più un frame ogni cinque minuti)
      const tiny = sc.S < 320;
      expect(st.swingOnLogo).toBeLessThanOrEqual(tiny ? 2 : 0);
      // i nomi non spariscono (su un telefono stretto, con sei nomi attorno a
      // uno spazio di 300px, al massimo un lampo raro)
      expect(st.hidden / labelFrames).toBeLessThan(tiny ? 0.01 : 0.001);
      // i nomi non si pestano (a riposo); sul telefono può capitare, e allora
      // sta sopra quello del pianeta davanti
      expect(st.overlapFrames / st.frames).toBeLessThan(
        sc.S < 400 ? 0.06 : 0.02,
      );
      // niente sfarfallio: pochi cambi di posto per pianeta
      for (const c of st.changes) expect(c).toBeLessThan(40);
    });
  }
});
