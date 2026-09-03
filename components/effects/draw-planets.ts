// Pochi PIANETI LONTANI nel campo stellare. Ognuno è DIVERSO dagli altri:
// tinta unica (niente doppioni), dimensione/luminosità variabili e uno "stile"
// diverso (falce in fase, anellato, gigante a bande, alone soffuso). Ogni
// pianeta viene disegnato UNA volta sul proprio piccolo canvas (nessun loop);
// a muoverlo è poi solo il CSS (transform), vedi NebulaField.

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

// Disegna un pianeta al centro del suo canvas.
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
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);
  drawPlanet(ctx, size / 2, size / 2, spec.pr, spec.hue, spec.style, spec.la);
}

function drawRings(
  ctx: CanvasRenderingContext2D,
  pr: number,
  hue: number,
  tilt: number,
  squash: number,
  count: number,
): void {
  ctx.save();
  ctx.rotate(tilt);
  ctx.scale(1, squash);
  for (let k = 0; k < count; k++) {
    const rr = pr * (1.55 + k * 0.5);
    ctx.beginPath();
    ctx.arc(0, 0, rr, 0, Math.PI * 2);
    ctx.strokeStyle = `hsla(${hue}, 62%, 80%, ${0.3 - k * 0.09})`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
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
): void {
  const ringed = style === 1;
  const ringTilt = -0.6 + Math.random() * 1.2;
  const ringSquash = 0.26 + Math.random() * 0.12;
  const ringCount = 1 + Math.floor(Math.random() * 2); // 1-2 anelli

  // alone: più marcato per il pianeta "alone soffuso"
  const haloStrength = style === 2 ? 0.2 : 0.09;
  const haloR = pr * (style === 2 ? 3.2 : 2.6);
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
    drawRings(ctx, pr, hue, ringTilt, ringSquash, ringCount);
    ctx.restore();
  }

  // disco con lato illuminato (sorgente di luce decentrata)
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
    const bands = 3 + Math.floor(Math.random() * 3);
    for (let b = 0; b < bands; b++) {
      const yy = py - pr + ((b + 0.5) / bands) * pr * 2;
      ctx.globalAlpha = 0.12 + Math.random() * 0.1;
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
    drawRings(ctx, pr, hue, ringTilt, ringSquash, ringCount);
    ctx.restore();
  }
}
