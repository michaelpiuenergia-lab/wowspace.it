import { describe, expect, it } from "vitest";
import {
  RINGS,
  TILT,
  axisAt,
  circleDepth,
  coreEdge,
  depthScale,
  hitsCircle,
  labelRect,
  logoRadius,
  orbit,
  scaleK,
  type LabelSize,
} from "@/lib/galaxy-layout";

// gli stessi sei pianeti del componente (anello, diametro, fase)
// (nomi lunghi dentro, corti fuori: Servizi e Lavori sull'orbita esterna)
const BODIES = [
  { ring: 2, size: 46, phase: 0.4 }, // Servizi
  { ring: 1, size: 38, phase: 1.5 }, // CRM su misura
  { ring: 0, size: 54, phase: 2.7 }, // Automazioni & AI
  { ring: 1, size: 36, phase: 1.5 + Math.PI }, // Tecnologia
  { ring: 2, size: 44, phase: 0.4 + Math.PI }, // Lavori
  { ring: 0, size: 32, phase: 2.7 + Math.PI }, // Come lavoriamo
];
const SIZES = BODIES.map((b) => b.size);
// misure della pillola del nome prese dal browser con il font Sora caricato
// (px): desktop (0.9rem) e sotto i 640px (0.74rem)
const LABELS_DESKTOP: LabelSize[] = [71, 130, 148, 106, 67, 146].map((lw) => ({
  lw,
  lh: 27,
}));
const LABELS_MOBILE: LabelSize[] = [61, 109, 126, 90, 57, 121].map((lw) => ({
  lw,
  lh: 22,
}));

type Scenario = {
  name: string;
  S: number; // lato dello spazio
  vw: number; // larghezza visibile dello schermo
  left: number; // bordo sinistro dello spazio sullo schermo
  labels: LabelSize[];
};

// gli spazi reali: .galaxy min(100%, 700px, 80svh); su tablet .space
// min(64vw, 52svh, 560px); su telefono min(84vw, 44svh)
const SCENARI: Scenario[] = [
  { name: "desktop 1440", S: 660, vw: 1425, left: 750, labels: LABELS_DESKTOP },
  {
    name: "portatile 1024",
    S: 470,
    vw: 1024,
    left: 540,
    labels: LABELS_DESKTOP,
  },
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
  {
    name: "telefono 360x640",
    S: 282,
    vw: 360,
    left: 39,
    labels: LABELS_MOBILE,
  },
];

// Sei minuti di orbite a 60 fps, come nel componente. Conta tutto quello che
// non deve succedere.
function simulate(sc: Scenario, seconds = 360, fps = 60) {
  const { S, vw, left, labels } = sc;
  const cx = S / 2;
  const cy = S / 2;
  const k = scaleK(S);
  const logoR = logoRadius(S);
  const edge = coreEdge(S);
  const stats = {
    frames: 0,
    frontOnCore: 0,
    backOnLogo: 0,
    discOnLogo: 0,
    labelOffscreen: 0,
    labelBelowStage: 0,
    minFrontGap: Infinity,
  };
  for (let f = 0; f < seconds * fps; f++) {
    const t = f / fps;
    const pos = orbit(BODIES, t, S, cx, cy, axisAt(t));
    pos.forEach((p, i) => {
      const s = depthScale(p.d, k);
      const r = labelRect(p, s, SIZES[i], labels[i]);
      if (p.d >= 0) {
        // davanti al nucleo (disegnato sopra): il nome non lo tocca nemmeno
        const gap = -circleDepth(r, cx, cy, edge);
        stats.minFrontGap = Math.min(stats.minFrontGap, gap);
        if (gap <= 0) stats.frontOnCore++;
      } else if (hitsCircle(r, cx, cy, logoR)) {
        // dietro: il nome passa dietro al nucleo solido (conteggio informativo)
        stats.backOnLogo++;
      }
      if (r.x < -left || r.x + r.w > vw - left) stats.labelOffscreen++;
      if (r.y + r.h > S + 12) stats.labelBelowStage++;
      // il disco davanti (d > 0) sta sopra il nucleo: non deve coprire il
      // marchio
      if (p.d > 0) {
        const discEdge = Math.hypot(p.x - cx, p.y - cy) - (SIZES[i] / 2) * s;
        if (discEdge < logoR + 2) stats.discOnLogo++;
      }
    });
    stats.frames++;
  }
  return stats;
}

describe("galassia: orbite", () => {
  it("i pianeti restano dentro allo spazio quadrato", () => {
    const S = 640;
    for (let t = 0; t < 400; t += 0.5) {
      for (const p of orbit(BODIES, t, S, S / 2, S / 2, axisAt(t))) {
        expect(p.x).toBeGreaterThan(-2);
        expect(p.x).toBeLessThan(S + 2);
        expect(p.y).toBeGreaterThan(S * 0.1);
        expect(p.y).toBeLessThan(S * 0.9);
      }
    }
  });

  it("l'orbita interna gira larga attorno al nucleo", () => {
    // semiasse minore dell'orbita interna ben oltre il bordo del nucleo
    expect(RINGS[0].r * TILT).toBeGreaterThan(0.11 + 0.08);
  });

  it("con 'riduci movimento' i pianeti stanno fermi", () => {
    const a = orbit(BODIES, 0, 600, 300, 300, axisAt(0), true);
    const b = orbit(BODIES, 123, 600, 300, 300, axisAt(0), true);
    expect(a).toEqual(b);
  });
});

describe("galassia: il nome sta fermo sotto il pianeta, mai sopra il marchio", () => {
  for (const sc of SCENARI) {
    it(sc.name, () => {
      const st = simulate(sc);
      if (process.env.GALAXY_STATS) console.log(sc.name, JSON.stringify(st));
      // davanti al nucleo: né il nome né il disco lo toccano
      expect(st.frontOnCore).toBe(0);
      expect(st.minFrontGap).toBeGreaterThan(2);
      expect(st.discOnLogo).toBe(0);
      // mai fuori dallo schermo, mai sotto lo spazio (c'è il testo di aiuto)
      expect(st.labelOffscreen).toBe(0);
      expect(st.labelBelowStage).toBe(0);
    });
  }
});
