// Il "pianeta viaggiatore": quando cambia pagina, il pianeta su cui hai
// cliccato nella galassia (o quello nell'intestazione della pagina che
// lasci) non sparisce: un pianeta identico, disegnato su un canvas fisso
// sopra a tutto (components/effects/planet-traveler.tsx), parte dalla sua
// posizione sullo schermo e vola fino al posto del pianeta della pagina
// nuova, che si mostra solo quando è arrivato. Qui il piccolo bus di eventi
// tra chi parte (Galaxy, PagePlanet), chi vola (PlanetTraveler) e chi
// accoglie (PagePlanet, Galaxy).

export type PlanetRect = { x: number; y: number; d: number }; // centro e diametro (px schermo)
export type PlanetLookSpec = { hue: number; style: number; seed: number };

export const TAKEOFF = "ws:planet-takeoff";
export const LANDING = "ws:planet-landing";
export const ARRIVED = "ws:planet-arrived";

let traveling = false;

export function isTraveling(): boolean {
  return traveling;
}

// parte: da questa posizione, con questo aspetto
export function takeoff(rect: PlanetRect, look: PlanetLookSpec): void {
  traveling = true;
  window.dispatchEvent(new CustomEvent(TAKEOFF, { detail: { rect, look } }));
}

// c'è un posto dove atterrare (la pagina nuova è pronta)
export function landing(rect: PlanetRect, look: PlanetLookSpec): void {
  window.dispatchEvent(new CustomEvent(LANDING, { detail: { rect, look } }));
}

// arrivato (o rinunciato): chi accoglie può mostrare il suo pianeta
export function arrived(): void {
  traveling = false;
  window.dispatchEvent(new Event(ARRIVED));
}

// il rettangolo del disco a partire dal canvas del pianeta (che è più largo
// del disco: bordo per alone e anelli, vedi draw-planets PLANET_PAD)
export function discRect(canvas: HTMLElement, pad: number, dy = 0): PlanetRect {
  const r = canvas.getBoundingClientRect();
  return {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2 - dy,
    d: r.width / pad,
  };
}
