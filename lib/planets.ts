import { navPlanetHue } from "@/lib/site-content";

// Il "look" del pianeta di ogni pagina: tinta (hue HSL) e stile di disegno
// (0 falce in fase, 1 anellato, 2 alone soffuso, 3 gigante a bande). È lo
// stesso nella galassia dell'hero, nel menu mobile e nell'intestazione della
// pagina di destinazione: voli su un pianeta e atterri su QUEL pianeta.
export type PlanetLook = { hue: number; style: number };

// La "scena" attorno al pianeta di pagina: ogni pagina ha la sua, così le
// intestazioni non si somigliano. satellites = lune in orbita (i servizi
// attorno al cliente), streams = flussi di dati che convergono (piattaforma),
// pulses = impulsi che partono dal pianeta (automazioni), layers = strati
// impilati (lo stack), screens = schermate in orbita (i lavori), path = le
// quattro tappe lungo l'orbita (il metodo).
export type PlanetScene =
  | "satellites"
  | "streams"
  | "pulses"
  | "layers"
  | "screens"
  | "path"
  | "none";

const SCENE_BY_PATH: Record<string, PlanetScene> = {
  "/servizi": "satellites",
  "/piattaforma": "streams",
  "/runtime": "pulses",
  "/sistema": "layers",
  "/vetrina": "screens",
  "/metodo": "path",
  "/prenota": "pulses",
  "/chi-siamo": "satellites",
  "/accesso": "layers",
};

export function sceneFor(pathname: string): PlanetScene {
  const first = "/" + (pathname.split("/")[1] ?? "");
  if (SCENE_BY_PATH[first]) return SCENE_BY_PATH[first];
  if (/privacy|cookie|note-legali/.test(first)) return "none";
  return "satellites";
}

const STYLE_BY_PATH: Record<string, number> = {
  "/servizi": 1,
  "/piattaforma": 0,
  "/runtime": 3,
  "/sistema": 2,
  "/vetrina": 1,
  "/metodo": 0,
};

// pagine fuori dalla galassia: tinte proprie, così anche loro hanno una faccia
const EXTRA: Record<string, PlanetLook> = {
  "/prenota": { hue: 158, style: 2 },
  "/chi-siamo": { hue: 20, style: 0 },
  "/accesso": { hue: 205, style: 1 },
  "/privacy": { hue: 230, style: 0 },
  "/cookie": { hue: 230, style: 2 },
  "/note-legali": { hue: 230, style: 0 },
};

const DEFAULT: PlanetLook = { hue: 200, style: 2 };

export function planetLookFor(pathname: string): PlanetLook {
  // "/servizi/siti-web" → "/servizi"; le landing città → ciano dei servizi
  const first = "/" + (pathname.split("/")[1] ?? "");
  if (navPlanetHue[first] !== undefined) {
    return { hue: navPlanetHue[first], style: STYLE_BY_PATH[first] ?? 2 };
  }
  if (EXTRA[first]) return EXTRA[first];
  if (
    /siti-web|web-agency|agenzia-web|realizzazione|software-gestionali/.test(
      first,
    )
  ) {
    return { hue: 188, style: 1 };
  }
  return DEFAULT;
}
