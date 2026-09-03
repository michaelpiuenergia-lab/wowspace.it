// Oggetti 3D astratti dipinti UNA volta su canvas (nessun loop): anelli
// (tori) e gocce di vetro. Insieme ai pianeti di draw-planets.ts formano le
// scene delle sezioni (components/graphics/scene-3d.tsx). A muoverli poi è
// solo il CSS (transform).

function prepare(canvas: HTMLCanvasElement, size: number, dpr: number) {
  canvas.width = Math.round(size * dpr);
  canvas.height = Math.round(size * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);
  return ctx;
}

// Un anello solido visto di taglio: il tubo è uno spesso tratto ellittico
// con un gradiente conico (luce da in alto a sinistra), un filo di luce
// sul bordo interno e l'ombra sul bordo esterno in basso.
export function paintTorus(
  canvas: HTMLCanvasElement,
  opts: { R: number; r: number; hue: number; squash: number; dpr: number },
): void {
  const { R, r, hue, squash, dpr } = opts;
  const size = Math.ceil((R + r) * 2 * 1.2);
  const ctx = prepare(canvas, size, dpr);
  if (!ctx) return;
  const c = size / 2;
  ctx.save();
  ctx.translate(c, c);
  ctx.scale(1, squash);
  const ring = (width: number, style: CanvasGradient | string, radius = R) => {
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius, 0, 0, Math.PI * 2);
    ctx.lineWidth = width;
    ctx.strokeStyle = style;
    ctx.stroke();
  };
  // corpo del tubo
  const body = ctx.createConicGradient(-2.2, 0, 0);
  body.addColorStop(0, `hsl(${hue} 70% 82%)`);
  body.addColorStop(0.25, `hsl(${hue} 60% 55%)`);
  body.addColorStop(0.55, `hsl(${hue} 55% 22%)`);
  body.addColorStop(0.8, `hsl(${hue} 60% 48%)`);
  body.addColorStop(1, `hsl(${hue} 70% 82%)`);
  ring(r * 2, body);
  // ombra sul bordo esterno in basso
  const shade = ctx.createConicGradient(0.6, 0, 0);
  shade.addColorStop(0, "rgba(2, 4, 8, 0)");
  shade.addColorStop(0.3, "rgba(2, 4, 8, 0.55)");
  shade.addColorStop(0.6, "rgba(2, 4, 8, 0)");
  shade.addColorStop(1, "rgba(2, 4, 8, 0)");
  ring(r * 0.7, shade, R + r * 0.6);
  // filo di luce sul bordo interno in alto
  const rim = ctx.createConicGradient(-2.6, 0, 0);
  rim.addColorStop(0, "rgba(255, 255, 255, 0.85)");
  rim.addColorStop(0.35, "rgba(255, 255, 255, 0)");
  rim.addColorStop(0.7, "rgba(255, 255, 255, 0)");
  rim.addColorStop(1, "rgba(255, 255, 255, 0.85)");
  ring(Math.max(1.2, r * 0.18), rim, R - r * 0.55);
  ctx.restore();
}

// Una goccia di vetro: trasparente al centro, tinta sul bordo, un riflesso
// bianco in alto a sinistra e un bagliore rifratto in basso a destra.
export function paintDrop(
  canvas: HTMLCanvasElement,
  opts: { r: number; hue: number; dpr: number },
): void {
  const { r, hue, dpr } = opts;
  const size = Math.ceil(r * 2 * 1.5);
  const ctx = prepare(canvas, size, dpr);
  if (!ctx) return;
  const c = size / 2;
  // ombra morbida sotto
  const shadow = ctx.createRadialGradient(
    c,
    c + r * 0.9,
    r * 0.2,
    c,
    c + r * 0.9,
    r * 1.1,
  );
  shadow.addColorStop(0, "rgba(0, 0, 0, 0.35)");
  shadow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = shadow;
  ctx.fillRect(0, 0, size, size);
  // corpo di vetro
  const glass = ctx.createRadialGradient(c, c, r * 0.2, c, c, r);
  glass.addColorStop(0, "rgba(255, 255, 255, 0.04)");
  glass.addColorStop(0.75, `hsla(${hue} 80% 70% / 0.16)`);
  glass.addColorStop(1, `hsla(${hue} 85% 78% / 0.5)`);
  ctx.fillStyle = glass;
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fill();
  // rifrazione: bagliore della tinta in basso a destra
  const glow = ctx.createRadialGradient(
    c + r * 0.35,
    c + r * 0.4,
    0,
    c + r * 0.35,
    c + r * 0.4,
    r * 0.8,
  );
  glow.addColorStop(0, `hsla(${hue} 90% 65% / 0.55)`);
  glow.addColorStop(1, `hsla(${hue} 90% 65% / 0)`);
  ctx.save();
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
  ctx.restore();
  // bordo
  ctx.beginPath();
  ctx.arc(c, c, r - 0.75, 0, Math.PI * 2);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
  ctx.stroke();
  // riflesso in alto a sinistra
  const spec = ctx.createRadialGradient(
    c - r * 0.38,
    c - r * 0.42,
    0,
    c - r * 0.38,
    c - r * 0.42,
    r * 0.42,
  );
  spec.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  spec.addColorStop(0.35, "rgba(255, 255, 255, 0.35)");
  spec.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = spec;
  ctx.beginPath();
  ctx.ellipse(
    c - r * 0.38,
    c - r * 0.42,
    r * 0.42,
    r * 0.3,
    -0.6,
    0,
    Math.PI * 2,
  );
  ctx.fill();
}
