// Il worker che calcola le superfici dei pianeti fuori dal thread
// principale: riceve la specifica, restituisce i pixel (buffer trasferito,
// niente copia). Vedi surface-cache.ts.
import { computeSurface, type SurfaceSpec } from "./planet-surface";

type Job = { id: number; spec: SurfaceSpec };

self.addEventListener("message", (ev: MessageEvent<Job>) => {
  const { id, spec } = ev.data;
  const data = computeSurface(spec);
  (self as unknown as Worker).postMessage(
    { id, res: spec.res, buf: data.buffer },
    [data.buffer],
  );
});
