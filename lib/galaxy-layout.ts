// La geometria della galassia dell'hero (components/effects/galaxy.tsx) senza
// DOM: orbite, scala dei pianeti in profondità e il rettangolo del nome, che
// sta SEMPRE fermo sotto il suo pianeta. Le orbite sono disegnate in modo che
// il nome non arrivi mai sul marchio al centro e che il disco, passando
// davanti al nucleo, non lo copra: lo dimostra lib/galaxy-layout.test.ts
// simulando minuti di orbite a 60 fps su desktop, tablet e telefoni.

export type Vec = { x: number; y: number };
export type Rect = { x: number; y: number; w: number; h: number };
export type LabelSize = { lw: number; lh: number };
export type Orbiter = { ring: number; size: number; phase: number };
export type Planet = { x: number; y: number; d: number };

// raggio (frazione del lato) delle tre orbite. Orbite rotonde (TILT alto)
// e orbita interna larga: così anche il nome del pianeta che passa DIETRO al
// nucleo resta sotto al marchio senza toccarlo, perfino sul telefono più
// stretto (test). L'orbita esterna sfiora il bordo dello spazio: la galassia
// usa tutto il quadrato. I nomi più lunghi stanno sulle orbite interne, i
// più corti su quella esterna: così ai lati non escono dallo schermo.
// La galassia ruota tutta insieme (un solo periodo): i sei pianeti restano
// sempre a 60° l'uno dall'altro e non possono mai toccarsi, come farebbero
// con velocità diverse quando due si allineano (test).
export const RINGS = [{ r: 0.36 }, { r: 0.41 }, { r: 0.46 }] as const;
export const PERIOD = 72; // secondi per un giro completo
export const TILT = 0.7; // schiacciamento delle orbite (viste di taglio)
export const BASE_PHI = -0.42; // inclinazione dell'asse a riposo
export const PHI_DRIFT = 0.08; // l'asse deriva piano attorno a BASE_PHI
export const axisAt = (t: number) => BASE_PHI + Math.sin(t / 9) * PHI_DRIFT;

// il nucleo (con il marchio) è il 22% del lato; il marchio il 62% del nucleo
export const CORE_FRACTION = 0.11;
export const LOGO_FRACTION = 0.62;
export const coreEdge = (S: number) => S * CORE_FRACTION;
export const logoRadius = (S: number) => S * CORE_FRACTION * LOGO_FRACTION;

// pianeti proporzionati allo spazio: su telefono NON troppo piccoli, devono
// restare comodi da toccare
export const scaleK = (S: number) => Math.max(0.88, Math.min(1.25, S / 560));
// 0.72 dietro … 1.02 davanti (d = seno dell'angolo orbitale, +1 = davanti)
export const depthScale = (d: number, k: number, grow = 1) =>
  (0.72 + 0.3 * ((d + 1) / 2)) * grow * k;
// il testo del nome non scende sotto questa scala (leggibile anche dietro,
// anche sul telefono): il nome si ingrandisce di questo fattore extra
export const LABEL_MIN_SCALE = 0.85;
export const labelBoost = (s: number) => Math.max(LABEL_MIN_SCALE, s) / s;

// il nome sta sotto il disco, a questa distanza dal bordo (px non scalati)
export const LABEL_GAP = 8;

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
    const R = RINGS[b.ring].r * S;
    const th = b.phase + (still ? 0 : (2 * Math.PI * t) / PERIOD);
    const ex = R * Math.cos(th);
    const ey = R * Math.sin(th) * TILT;
    return {
      x: cx + ex * cp - ey * sp,
      y: cy + ex * sp + ey * cp,
      d: Math.sin(th),
    };
  });
}

// rettangolo del nome sullo schermo: centrato sotto il disco, scala con il
// pianeta (più il boost di leggibilità)
export function labelRect(
  p: Vec,
  s: number,
  size: number,
  label: LabelSize,
): Rect {
  const boost = labelBoost(s);
  const w = label.lw * boost * s;
  const h = label.lh * boost * s;
  return { x: p.x - w / 2, y: p.y + (size / 2 + LABEL_GAP) * s, w, h };
}

// di quanto il rettangolo entra nel cerchio (0 o meno = non lo tocca)
export const circleDepth = (
  r: Rect,
  cx: number,
  cy: number,
  radius: number,
) => {
  const nx = Math.max(r.x, Math.min(cx, r.x + r.w));
  const ny = Math.max(r.y, Math.min(cy, r.y + r.h));
  return radius - Math.hypot(nx - cx, ny - cy);
};
export const hitsCircle = (r: Rect, cx: number, cy: number, radius: number) =>
  circleDepth(r, cx, cy, radius) > 0;
