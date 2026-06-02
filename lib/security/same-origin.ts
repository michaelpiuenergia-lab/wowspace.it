// La richiesta deve arrivare DAL nostro sito: confronta l'host di Origin (o,
// in mancanza, Referer) con l'Host della richiesta. Blocca le chiamate dirette
// da script esterni (curl/bot) che sfrutterebbero la nostra chiave API.
// Funziona su produzione, preview e locale perché confronta sempre col nostro host.
export function isFromSite(headers: Headers): boolean {
  const host = headers.get("host");
  if (!host) return false;
  const src = headers.get("origin") || headers.get("referer");
  if (!src) return false; // niente Origin/Referer = non è il nostro widget
  try {
    return new URL(src).host === host;
  } catch {
    return false;
  }
}
