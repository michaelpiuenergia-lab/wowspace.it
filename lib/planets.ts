import { navPlanetHue } from "@/lib/site-content";

// Il "look" del pianeta di ogni pagina: tinta (hue HSL) e mondo (vedi
// components/effects/planet-surface.ts). È lo
// stesso nella galassia dell'hero, nel menu mobile e nell'intestazione della
// pagina di destinazione: voli su un pianeta e atterri su QUEL pianeta.
export type PlanetLook = { hue: number; style: number };

// La "scena" attorno al pianeta di pagina: ogni pagina ha la sua, così le
// intestazioni non si somigliano. streams = flussi di dati che convergono
// (piattaforma), pulses = impulsi che partono dal pianeta (automazioni),
// layers = strati impilati (lo stack), path = le quattro tappe lungo
// l'orbita (il metodo), none = solo alone e orbita (il pianeta basta da
// solo: niente lune né schermate che gli girano attorno).
export type PlanetScene = "streams" | "pulses" | "layers" | "path" | "none";

const SCENE_BY_PATH: Record<string, PlanetScene> = {
  "/servizi": "none",
  "/piattaforma": "streams",
  "/runtime": "pulses",
  "/sistema": "layers",
  "/vetrina": "none",
  "/metodo": "path",
  "/prenota": "pulses",
  "/chi-siamo": "none",
  "/accesso": "layers",
};

export function sceneFor(pathname: string): PlanetScene {
  const first = "/" + (pathname.split("/")[1] ?? "");
  if (SCENE_BY_PATH[first]) return SCENE_BY_PATH[first];
  return "none";
}

// lo stile è il MONDO (components/effects/planet-surface.ts): 0 roccioso a
// crateri · 1 ghiaccio con gli anelli · 2 oceano con nuvole · 3 gigante
// gassoso · 4 lava · 5 cristallo. Sei pagine, sei mondi diversi.
const STYLE_BY_PATH: Record<string, number> = {
  "/servizi": 1,
  "/piattaforma": 2,
  "/runtime": 4,
  "/sistema": 3,
  "/vetrina": 5,
  "/metodo": 0,
};

// pagine fuori dalla galassia: tinte proprie, così anche loro hanno una faccia
const EXTRA: Record<string, PlanetLook> = {
  "/prenota": { hue: 158, style: 2 },
  "/chi-siamo": { hue: 20, style: 3 },
  "/accesso": { hue: 205, style: 0 },
  "/privacy": { hue: 230, style: 0 },
  "/cookie": { hue: 230, style: 2 },
  "/note-legali": { hue: 230, style: 3 },
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
