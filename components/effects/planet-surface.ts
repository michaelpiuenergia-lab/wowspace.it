// Le SUPERFICI dei pianeti "pieni" (galassia dell'hero, pianeta di pagina,
// viaggiatore, sfere delle scene 3D). Ogni disco viene dipinto pixel per
// pixel UNA volta (e messo in cache): rumore 3D campionato sulla sfera
// (niente cuciture né poli schiacciati), luce con terminatore morbido,
// atmosfera sul bordo, riflesso speculare dove serve. Sei mondi diversi:
//   0 roccioso a crateri · 1 ghiaccio striato (con gli anelli, disegnati in
//   draw-planets) · 2 oceano con continenti, nuvole e calotte · 3 gigante
//   gassoso a bande con la tempesta · 4 lava, crosta nera e crepe
//   incandescenti · 5 cristallo a facce.
// Con lo stesso seme il pianeta è identico ovunque: può viaggiare.

export const SURFACE_STYLES = 6;

type Rgb = [number, number, number];

// generatore deterministico (mulberry32)
export function seeded(seed: number): () => number {
  let a = seed >>> 0 || 1;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hsl(h: number, s: number, l: number): Rgb {
  const hh = (((h % 360) + 360) % 360) / 360;
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const ch = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [ch(hh + 1 / 3), ch(hh), ch(hh - 1 / 3)];
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const mix = (a: Rgb, b: Rgb, t: number, o: Rgb): Rgb => {
  o[0] = a[0] + (b[0] - a[0]) * t;
  o[1] = a[1] + (b[1] - a[1]) * t;
  o[2] = a[2] + (b[2] - a[2]) * t;
  return o;
};

// ---- rumore 3D a valori su un reticolo periodico (32³) -------------------
const N = 32;
const MASK = N - 1;

class Noise3 {
  private t: Float32Array;
  constructor(rnd: () => number) {
    this.t = new Float32Array(N * N * N);
    for (let i = 0; i < this.t.length; i++) this.t[i] = rnd();
  }
  at(x: number, y: number, z: number): number {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const zi = Math.floor(z);
    let fx = x - xi;
    let fy = y - yi;
    let fz = z - zi;
    fx = fx * fx * fx * (fx * (fx * 6 - 15) + 10);
    fy = fy * fy * fy * (fy * (fy * 6 - 15) + 10);
    fz = fz * fz * fz * (fz * (fz * 6 - 15) + 10);
    const x0 = xi & MASK;
    const x1 = (xi + 1) & MASK;
    const y0 = (yi & MASK) << 5;
    const y1 = ((yi + 1) & MASK) << 5;
    const z0 = (zi & MASK) << 10;
    const z1 = ((zi + 1) & MASK) << 10;
    const t = this.t;
    const c000 = t[x0 + y0 + z0];
    const c100 = t[x1 + y0 + z0];
    const c010 = t[x0 + y1 + z0];
    const c110 = t[x1 + y1 + z0];
    const c001 = t[x0 + y0 + z1];
    const c101 = t[x1 + y0 + z1];
    const c011 = t[x0 + y1 + z1];
    const c111 = t[x1 + y1 + z1];
    const a = c000 + (c100 - c000) * fx;
    const b = c010 + (c110 - c010) * fx;
    const c = c001 + (c101 - c001) * fx;
    const d = c011 + (c111 - c011) * fx;
    const e = a + (b - a) * fy;
    const f = c + (d - c) * fy;
    return e + (f - e) * fz;
  }
  // somma di ottave, riportata con un po' di contrasto attorno a 0.5
  fbm(x: number, y: number, z: number, oct: number): number {
    let v = 0;
    let amp = 0.5;
    let sum = 0;
    for (let i = 0; i < oct; i++) {
      v += this.at(x, y, z) * amp;
      sum += amp;
      amp *= 0.5;
      x *= 2.02;
      y *= 2.02;
      z *= 2.02;
    }
    return (v / sum - 0.5) * 1.7 + 0.5;
  }
  // creste (alto sulle "vene"): per le crepe di lava
  ridged(x: number, y: number, z: number, oct: number): number {
    let v = 0;
    let amp = 0.55;
    let sum = 0;
    for (let i = 0; i < oct; i++) {
      const n = 1 - Math.abs(this.at(x, y, z) * 2 - 1);
      v += n * n * amp;
      sum += amp;
      amp *= 0.55;
      x *= 2.1;
      y *= 2.1;
      z *= 2.1;
    }
    return v / sum;
  }
}

// hash intero di una cella (per il rumore a celle del cristallo)
function cellHash(x: number, y: number, z: number, seed: number): number {
  let n =
    (Math.imul(x, 73856093) ^
      Math.imul(y, 19349663) ^
      Math.imul(z, 83492791) ^
      seed) |
    0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  n ^= n >>> 16;
  return (n >>> 0) / 4294967296;
}

type Cells = { f1: number; f2: number; id: number };
function cells(x: number, y: number, z: number, seed: number, o: Cells): Cells {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const zi = Math.floor(z);
  let f1 = 9;
  let f2 = 9;
  let id = 0;
  for (let dz = -1; dz <= 1; dz++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const cx = xi + dx;
        const cy = yi + dy;
        const cz = zi + dz;
        const h = cellHash(cx, cy, cz, seed);
        const px = cx + cellHash(cx, cy, cz, seed ^ 0x9e37) - x;
        const py = cy + cellHash(cx, cy, cz, seed ^ 0x79b9) - y;
        const pz = cz + cellHash(cx, cy, cz, seed ^ 0x5f3a) - z;
        const d = px * px + py * py + pz * pz;
        if (d < f1) {
          f2 = f1;
          f1 = d;
          id = h;
        } else if (d < f2) f2 = d;
      }
    }
  }
  o.f1 = Math.sqrt(f1);
  o.f2 = Math.sqrt(f2);
  o.id = id;
  return o;
}

// ---- superfici -----------------------------------------------------------
type Sample = {
  r: number;
  g: number;
  b: number;
  /** riflesso speculare (0 = opaco) e sua durezza */
  spec: number;
  shine: number;
  /** quanto il colore è luce propria (non si spegne dal lato in ombra) */
  emit: number;
  /** forza dell'atmosfera sul bordo */
  rim: number;
};
type Surface = (
  sx: number,
  sy: number,
  sz: number,
  lon: number,
  o: Sample,
) => void;

type Ctx = {
  hue: number;
  rnd: () => number;
  noise: Noise3;
  seed: number;
  /** direzione della luce nello spazio (ruotato) delle superfici */
  L: [number, number, number];
  /** longitudine che guarda lo spettatore */
  lon0: number;
};

const tmp: Rgb = [0, 0, 0];
const tmp2: Rgb = [0, 0, 0];

function rocky({ hue, rnd, noise, L }: Ctx): Surface {
  const dark = hsl(hue, 0.3, 0.19);
  const mid = hsl(hue, 0.4, 0.43);
  const light = hsl(hue, 0.36, 0.66);
  const dust = hsl(hue + 18, 0.5, 0.76);
  const o1 = rnd() * 20;
  const o2 = rnd() * 20;
  const o3 = rnd() * 20;
  // crateri: punti sulla sfera, raggio (corda) e profondità
  const craters: number[][] = [];
  const n = 26 + Math.floor(rnd() * 8);
  for (let i = 0; i < n; i++) {
    const z = rnd() * 2 - 1;
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(1 - z * z);
    craters.push([
      r * Math.cos(a),
      r * Math.sin(a),
      z,
      0.05 + rnd() * rnd() * 0.3,
    ]);
  }
  return (sx, sy, sz, _lon, o) => {
    const h = noise.fbm(sx * 2.4 + o1, sy * 2.4, sz * 2.4, 4);
    const grain = noise.fbm(sx * 12 + o2, sy * 12, sz * 12, 3);
    const c = mix(dark, mid, smooth(0.25, 0.7, h), tmp);
    mix(c, light, smooth(0.55, 0.85, h) * 0.75, c);
    mix(
      c,
      dust,
      smooth(0.58, 0.9, noise.fbm(sx * 1.3 + o3, sy * 1.3, sz * 1.3, 3)) * 0.55,
      c,
    );
    let shade = 0.82 + 0.36 * grain;
    for (let i = 0; i < craters.length; i++) {
      const k = craters[i];
      const dx = sx - k[0];
      const dy = sy - k[1];
      const dz = sz - k[2];
      const dd = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const t = dd / k[3];
      if (t >= 1.3) continue;
      // lato verso la luce (+) o opposto (−) rispetto al centro del cratere
      const dir = (dx * L[0] + dy * L[1] + dz * L[2]) / (dd + 1e-6);
      if (t < 0.8) {
        // fondo: in ombra la parete vicina alla luce, chiara quella lontana
        shade *= 0.7 - 0.45 * dir * smooth(0.1, 0.8, t);
      } else if (t < 1) {
        shade *= 0.72 - 0.55 * dir;
      } else {
        const kk = 1 - (t - 1) / 0.3;
        shade *= 1 + kk * (0.22 + 0.65 * dir);
      }
    }
    o.r = c[0] * shade;
    o.g = c[1] * shade;
    o.b = c[2] * shade;
    o.spec = 0;
    o.shine = 1;
    o.emit = 0;
    o.rim = 0.32;
  };
}

function icy({ hue, rnd, noise }: Ctx): Surface {
  const pale = hsl(hue, 0.42, 0.88);
  const tone = hsl(hue, 0.62, 0.6);
  const deep = hsl(hue + 8, 0.6, 0.34);
  const warm = hsl(hue - 34, 0.5, 0.78);
  const o1 = rnd() * 20;
  const o2 = rnd() * 20;
  const o3 = rnd() * 20;
  return (sx, sy, sz, _lon, o) => {
    // strie parallele all'equatore (rumore compresso in latitudine)
    const streak = noise.fbm(sx * 1.6 + o1, sy * 9, sz * 1.6, 5);
    const m = noise.fbm(sx * 2.2 + o2, sy * 2.2, sz * 2.2, 4);
    const fine = noise.fbm(sx * 9 + o3, sy * 30, sz * 9, 3);
    const c = mix(deep, tone, smooth(0.3, 0.62, streak), tmp);
    mix(c, pale, smooth(0.5, 0.8, m) * smooth(0.25, 0.7, fine), c);
    mix(
      c,
      warm,
      0.3 * smooth(0.6, 0.9, noise.fbm(sx * 3.1 + o3, sy * 3.1, sz * 3.1, 3)),
      c,
    );
    const k = 0.9 + 0.2 * fine;
    c[0] *= k;
    c[1] *= k;
    c[2] *= k;
    o.r = c[0];
    o.g = c[1];
    o.b = c[2];
    o.spec = 0.35;
    o.shine = 30;
    o.emit = 0;
    o.rim = 0.55;
  };
}

function ocean({ hue, rnd, noise, L }: Ctx): Surface {
  const deep = hsl(hue, 0.72, 0.22);
  const sea = hsl(hue, 0.68, 0.44);
  const shallow = hsl(hue + 10, 0.72, 0.62);
  const land = hsl(hue - 30, 0.34, 0.56);
  const forest = hsl(hue + 14, 0.42, 0.32);
  const high = hsl(hue - 40, 0.26, 0.8);
  const ice: Rgb = [0.93, 0.96, 1];
  const cloud: Rgb = [0.97, 0.98, 1];
  const o1 = rnd() * 20;
  const o2 = rnd() * 20;
  const o3 = rnd() * 20;
  return (sx, sy, sz, _lon, o) => {
    const h = noise.fbm(sx * 2.3 + o1, sy * 2.3, sz * 2.3, 5);
    const landMask = smooth(0.5, 0.535, h);
    const c = mix(deep, sea, smooth(0.15, 0.5, h), tmp);
    mix(c, shallow, smooth(0.455, 0.5, h), c);
    const l = mix(
      land,
      forest,
      smooth(0.4, 0.7, noise.fbm(sx * 4 + o2, sy * 4, sz * 4, 3)),
      tmp2,
    );
    mix(l, high, smooth(0.62, 0.76, h), l);
    mix(c, l, landMask, c);
    // calotte polari
    const cap = smooth(0.78, 0.9, Math.abs(sy) + 0.06 * (h - 0.5));
    mix(c, ice, cap, c);
    // nuvole, con la loro ombra sul suolo (spostata dalla parte opposta alla luce)
    const cl = smooth(
      0.55,
      0.74,
      noise.fbm(sx * 4.6 + o3, sy * 7.5, sz * 4.6, 4),
    );
    const ox = sx + L[0] * 0.05;
    const oy = sy + L[1] * 0.05;
    const oz = sz + L[2] * 0.05;
    const sh = smooth(
      0.55,
      0.74,
      noise.fbm(ox * 4.6 + o3, oy * 7.5, oz * 4.6, 4),
    );
    const k = 1 - sh * 0.4 * (1 - cl);
    c[0] *= k;
    c[1] *= k;
    c[2] *= k;
    mix(c, cloud, cl * 0.92, c);
    o.r = c[0];
    o.g = c[1];
    o.b = c[2];
    o.spec = (1 - landMask) * (1 - cl) * 0.85;
    o.shine = 46;
    o.emit = 0;
    o.rim = 0.95;
  };
}

function giant({ hue, rnd, noise, lon0 }: Ctx): Surface {
  const A = hsl(hue, 0.55, 0.74);
  const B = hsl(hue + 10, 0.52, 0.44);
  const C = hsl(hue - 24, 0.5, 0.62);
  const D = hsl(hue + 26, 0.46, 0.28);
  const storm = hsl(hue - 36, 0.72, 0.84);
  const o1 = rnd() * 20;
  const o2 = rnd() * 20;
  const ph = rnd() * 6;
  // la tempesta: sull'emisfero visibile
  const lat0 = (rnd() - 0.5) * 0.9;
  const lonS = lon0 + (rnd() - 0.5) * 1.3;
  const rot = rnd() * 6;
  return (sx, sy, sz, lon, o) => {
    const warp = (noise.fbm(sx * 2.6 + o1, sy * 2.6, sz * 2.6, 4) - 0.5) * 0.24;
    const turb = (noise.fbm(sx * 6 + o2, sy * 6, sz * 6, 3) - 0.5) * 0.06;
    const b = sy + warp + turb;
    const w1 = 0.5 + 0.5 * Math.sin(b * 11 + 0.8 * Math.sin(b * 5.3 + ph));
    const w2 = 0.5 + 0.5 * Math.sin(b * 23 + 2.1 + ph);
    const w3 = 0.5 + 0.5 * Math.sin(b * 7 + 0.4 + ph);
    const fine = noise.fbm(sx * 9 + o2, sy * 26, sz * 9, 3);
    const c = mix(B, A, w1, tmp);
    mix(c, C, smooth(0.55, 0.95, w2) * 0.5, c);
    mix(c, D, smooth(0.7, 1, w3) * 0.55, c);
    const k = 0.9 + 0.2 * fine;
    c[0] *= k;
    c[1] *= k;
    c[2] *= k;
    let dn = lon - lonS;
    if (dn > Math.PI) dn -= Math.PI * 2;
    if (dn < -Math.PI) dn += Math.PI * 2;
    const dl = (sy - lat0) / 0.13;
    dn /= 0.3;
    const e = dl * dl + dn * dn;
    if (e < 1.6) {
      const k = smooth(1.4, 0.7, e);
      const swirl = 0.5 + 0.5 * Math.sin(e * 7 - Math.atan2(dl, dn) * 2 + rot);
      mix(c, mix(storm, A, swirl * 0.6, tmp2), k * 0.9, c);
    }
    o.r = c[0];
    o.g = c[1];
    o.b = c[2];
    o.spec = 0.06;
    o.shine = 12;
    o.emit = 0;
    o.rim = 0.6;
  };
}

function lava({ hue, rnd, noise }: Ctx): Surface {
  const crust = hsl(hue, 0.22, 0.07);
  const crust2 = hsl(hue, 0.28, 0.18);
  const ash = hsl(hue + 15, 0.12, 0.3);
  const glowD = hsl(hue, 0.95, 0.44);
  const glowH = hsl(hue + 16, 1, 0.7);
  const white = hsl(hue + 26, 0.9, 0.93);
  const o1 = rnd() * 20;
  const o2 = rnd() * 20;
  const o3 = rnd() * 20;
  const o4 = rnd() * 20;
  return (sx, sy, sz, _lon, o) => {
    const c = mix(
      crust,
      crust2,
      noise.fbm(sx * 3 + o1, sy * 3, sz * 3, 4),
      tmp,
    );
    mix(
      c,
      ash,
      smooth(0.6, 0.85, noise.fbm(sx * 1.6 + o2, sy * 1.6, sz * 1.6, 3)) * 0.6,
      c,
    );
    const r = noise.ridged(sx * 3 + o3, sy * 3, sz * 3, 5);
    const crack = smooth(0.6, 0.9, r);
    const pool = noise.fbm(sx * 3.4 + o4, sy * 3.4, sz * 3.4, 4);
    // pozze: bordo scuro e cuore caldo
    const lake =
      smooth(0.7, 0.78, pool) * (0.55 + 0.45 * smooth(0.78, 0.9, pool));
    const glow = Math.max(crack, lake);
    const g = mix(glowD, glowH, smooth(0.25, 0.9, glow), tmp2);
    mix(g, white, smooth(0.8, 1, glow) * 0.55, g);
    mix(c, g, glow, c);
    o.r = c[0];
    o.g = c[1];
    o.b = c[2];
    o.spec = 0;
    o.shine = 1;
    o.emit = glow * 0.92;
    o.rim = 0.3;
  };
}

function crystal({ hue, rnd, noise, seed }: Ctx): Surface {
  const c1 = hsl(hue, 0.55, 0.8);
  const c2 = hsl(hue, 0.7, 0.5);
  const c3 = hsl(hue + 32, 0.6, 0.64);
  const c4 = hsl(hue - 30, 0.55, 0.26);
  const o1 = rnd() * 20;
  const cs: Cells = { f1: 0, f2: 0, id: 0 };
  return (sx, sy, sz, _lon, o) => {
    cells(sx * 4.4 + o1, sy * 4.4, sz * 4.4, seed, cs);
    const edge = smooth(0.012, 0.06, cs.f2 - cs.f1);
    const idB = (cs.id * 7.13) % 1;
    const c = mix(c2, c1, cs.id, tmp);
    mix(c, c3, smooth(0.6, 0.9, idB) * 0.7, c);
    const facet = 0.78 + 0.44 * idB; // ogni faccia riflette diversamente
    c[0] *= facet;
    c[1] *= facet;
    c[2] *= facet;
    mix(c4, c, edge, c); // giunture scure
    const inner = noise.fbm(sx * 2 + o1, sy * 2, sz * 2, 3);
    o.r = c[0];
    o.g = c[1];
    o.b = c[2];
    o.spec = 0.6;
    o.shine = 22;
    o.emit = 0.12 + 0.2 * smooth(0.55, 0.9, inner);
    o.rim = 0.5;
  };
}

const MAKERS = [rocky, icy, ocean, giant, lava, crystal];

export type SurfaceSpec = {
  hue: number;
  style: number;
  /** direzione della luce (radianti, y verso il basso come sul canvas) */
  la: number;
  seed: number;
  /** lato del disco in pixel */
  res: number;
};

const cache = new Map<string, HTMLCanvasElement>();
const CACHE_MAX = 40;

// Il disco pieno (res × res, trasparente fuori), in cache.
export function renderSurface(spec: SurfaceSpec): HTMLCanvasElement {
  const res = Math.max(8, Math.round(spec.res));
  const style =
    ((spec.style % SURFACE_STYLES) + SURFACE_STYLES) % SURFACE_STYLES;
  const key = `${style}|${spec.hue}|${spec.seed}|${spec.la.toFixed(2)}|${res}`;
  const hit = cache.get(key);
  if (hit) return hit;

  const cv = document.createElement("canvas");
  cv.width = res;
  cv.height = res;
  const ctx = cv.getContext("2d");
  if (!ctx) return cv;
  const img = ctx.createImageData(res, res);
  const data = img.data;

  const rnd = seeded((spec.seed * 7919 + style * 131 + 17) >>> 0);
  const noise = new Noise3(rnd);
  // luce: decentrata, un po' davanti
  const Lx = Math.cos(spec.la) * 0.62;
  const Ly = Math.sin(spec.la) * 0.62;
  const Lz = Math.sqrt(1 - 0.62 * 0.62);
  // orientamento del pianeta: asse inclinato e ruotato a caso (dal seme)
  const rz = (rnd() - 0.5) * 1.1;
  const rx = (rnd() - 0.5) * 0.7;
  const ry = rnd() * Math.PI * 2;
  const cz = Math.cos(rz);
  const sz_ = Math.sin(rz);
  const cx = Math.cos(rx);
  const sx_ = Math.sin(rx);
  const cy = Math.cos(ry);
  const sy_ = Math.sin(ry);
  const rot = (
    x: number,
    y: number,
    z: number,
    out: [number, number, number],
  ) => {
    // attorno a z, poi a x, poi a y
    const x1 = x * cz - y * sz_;
    const y1 = x * sz_ + y * cz;
    const y2 = y1 * cx - z * sx_;
    const z2 = y1 * sx_ + z * cx;
    out[0] = x1 * cy + z2 * sy_;
    out[1] = y2;
    out[2] = -x1 * sy_ + z2 * cy;
    return out;
  };
  const L = rot(Lx, Ly, Lz, [0, 0, 0]);
  const front = rot(0, 0, 1, [0, 0, 0]);
  const surface = MAKERS[style]({
    hue: spec.hue,
    rnd,
    noise,
    seed: (spec.seed * 31 + 7) | 0,
    L,
    lon0: Math.atan2(front[0], front[2]),
  });

  const rimCol = hsl(spec.hue, 0.9, 0.82);
  const specCol = hsl(spec.hue, 0.5, 0.96);
  const R = res / 2;
  const s: [number, number, number] = [0, 0, 0];
  const o: Sample = { r: 0, g: 0, b: 0, spec: 0, shine: 1, emit: 0, rim: 0 };
  for (let y = 0; y < res; y++) {
    const v = (y + 0.5 - R) / R;
    for (let x = 0; x < res; x++) {
      const u = (x + 0.5 - R) / R;
      const d2 = u * u + v * v;
      const d = Math.sqrt(d2);
      if (d > 1 + 1.5 / R) continue;
      const cover = clamp01((1 - d) * R + 0.5);
      let nx = u;
      let ny = v;
      let nz = 0;
      if (d2 < 1) nz = Math.sqrt(1 - d2);
      else {
        nx = u / d;
        ny = v / d;
      }
      rot(nx, ny, nz, s);
      surface(s[0], s[1], s[2], Math.atan2(s[0], s[2]), o);
      const ndl = nx * Lx + ny * Ly + nz * Lz;
      const diff = smooth(-0.14, 0.72, ndl);
      const light = 0.06 + 0.94 * diff;
      const lit = light * (1 - o.emit) + o.emit;
      let r = o.r * lit;
      let g = o.g * lit;
      let b = o.b * lit;
      // atmosfera: bordo luminoso, più forte dal lato della luce
      const fres = Math.pow(1 - nz, 2.6) * o.rim * (0.22 + 0.78 * diff);
      r += rimCol[0] * fres;
      g += rimCol[1] * fres;
      b += rimCol[2] * fres;
      if (o.spec > 0) {
        const rzv = 2 * ndl * nz - Lz; // riflesso verso lo spettatore
        if (rzv > 0) {
          const sp = Math.pow(rzv, o.shine) * o.spec;
          r += specCol[0] * sp;
          g += specCol[1] * sp;
          b += specCol[2] * sp;
        }
      }
      const i = (y * res + x) * 4;
      data[i] = clamp01(r) * 255;
      data[i + 1] = clamp01(g) * 255;
      data[i + 2] = clamp01(b) * 255;
      data[i + 3] = cover * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  if (cache.size >= CACHE_MAX) {
    const first = cache.keys().next().value;
    if (first !== undefined) cache.delete(first);
  }
  cache.set(key, cv);
  return cv;
}
