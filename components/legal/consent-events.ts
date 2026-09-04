// Riapre il pannello delle preferenze cookie da qualunque punto del sito.
// Modulo minuscolo e senza React: chi lo importa non si porta dietro il
// banner nel proprio chunk (il banner resta caricato dopo, con next/dynamic).
export const CONSENT_OPEN_EVENT = "wowspace:consent-open";

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}
