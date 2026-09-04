// La cache dei dischi pronti (canvas) e il ponte con il worker che li
// calcola. Il thread principale non calcola mai un pixel: chiede il disco,
// intanto disegna un segnaposto (draw-planets.ts) e ridipinge quando arriva.
// Le risoluzioni sono poche e fisse (scala): così il pianeta della
// galassia zoomato, il viaggiatore e il pianeta di pagina condividono lo
// stesso disco, identico al pixel.
import { computeSurface, type SurfaceSpec } from "./planet-surface";

export const RES_LADDER = [96, 192, 320] as const;
export const SURFACE_MAX_RES: number = RES_LADDER[RES_LADDER.length - 1];

// la risoluzione della scala che copre i pixel richiesti (tetto incluso)
export function surfaceRes(
  needed: number,
  max: number = SURFACE_MAX_RES,
): number {
  const cap = Math.max(RES_LADDER[0], Math.min(max, SURFACE_MAX_RES));
  for (const r of RES_LADDER) if (r >= needed && r <= cap) return r;
  return cap;
}

const keyOf = (s: SurfaceSpec) =>
  `${s.style}|${s.hue}|${s.seed}|${s.la.toFixed(2)}|${Math.round(s.res)}`;
const familyOf = (s: SurfaceSpec) =>
  `${s.style}|${s.hue}|${s.seed}|${s.la.toFixed(2)}`;

const cache = new Map<string, HTMLCanvasElement>();
const pending = new Map<string, Promise<HTMLCanvasElement>>();
const CACHE_MAX = 36;

function store(spec: SurfaceSpec, cv: HTMLCanvasElement): HTMLCanvasElement {
  if (cache.size >= CACHE_MAX) {
    const first = cache.keys().next().value;
    if (first !== undefined) cache.delete(first);
  }
  cache.set(keyOf(spec), cv);
  return cv;
}

type Pixels = Uint8ClampedArray<ArrayBuffer>;

function toCanvas(data: Pixels, res: number): HTMLCanvasElement {
  const cv = document.createElement("canvas");
  cv.width = res;
  cv.height = res;
  const ctx = cv.getContext("2d");
  if (ctx) ctx.putImageData(new ImageData(data, res, res), 0, 0);
  return cv;
}

/** il disco pronto a QUESTA risoluzione, se c'è */
export function getSurface(spec: SurfaceSpec): HTMLCanvasElement | null {
  return cache.get(keyOf(spec)) ?? null;
}

/** il disco pronto più grande della stessa famiglia (qualsiasi
 *  risoluzione): un segnaposto fedele mentre arriva quello giusto */
export function nearestSurface(spec: SurfaceSpec): HTMLCanvasElement | null {
  const fam = familyOf(spec);
  let best: HTMLCanvasElement | null = null;
  for (const [k, cv] of cache) {
    if (k.startsWith(fam + "|") && (!best || cv.width > best.width)) best = cv;
  }
  return best;
}

// ---- il worker --------------------------------------------------------
type Reply = { id: number; res: number; buf: ArrayBuffer };
let worker: Worker | null | undefined; // undefined = mai provato
let nextId = 1;
const waiting = new Map<
  number,
  { resolve: (d: Pixels) => void; reject: (e: unknown) => void }
>();

function getWorker(): Worker | null {
  if (worker !== undefined) return worker;
  try {
    worker = new Worker(new URL("./planet-surface.worker.ts", import.meta.url));
    worker.addEventListener("message", (ev: MessageEvent<Reply>) => {
      const w = waiting.get(ev.data.id);
      if (!w) return;
      waiting.delete(ev.data.id);
      w.resolve(new Uint8ClampedArray(ev.data.buf));
    });
    worker.addEventListener("error", (ev) => {
      // il worker non va (CSP, bundle): da qui in poi si calcola sul thread
      // principale, e chi aspettava riparte da lì
      worker = null;
      for (const [, w] of waiting) w.reject(ev);
      waiting.clear();
    });
  } catch {
    worker = null;
  }
  return worker;
}

function computeInWorker(spec: SurfaceSpec): Promise<Pixels> {
  const w = getWorker();
  if (!w) return Promise.reject(new Error("no worker"));
  return new Promise((resolve, reject) => {
    const id = nextId++;
    waiting.set(id, { resolve, reject });
    w.postMessage({ id, spec });
  });
}

// senza worker: calcolo sul thread principale, ma fuori dal frame corrente
function computeLater(spec: SurfaceSpec): Promise<Pixels> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(computeSurface(spec)), 0);
  });
}

/** chiede il disco: dal worker, in cache appena pronto. Una sola
 *  richiesta per disco anche se lo chiedono in tanti. */
export function loadSurface(spec: SurfaceSpec): Promise<HTMLCanvasElement> {
  const key = keyOf(spec);
  const hit = cache.get(key);
  if (hit) return Promise.resolve(hit);
  const inFlight = pending.get(key);
  if (inFlight) return inFlight;
  const res = Math.round(spec.res);
  const job = computeInWorker({ ...spec, res })
    .catch(() => computeLater({ ...spec, res }))
    .then((data) => store(spec, toCanvas(data, res)))
    .finally(() => pending.delete(key));
  pending.set(key, job);
  return job;
}
