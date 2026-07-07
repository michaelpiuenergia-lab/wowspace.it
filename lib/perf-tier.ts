// Tier hardware condiviso da tutto il sito: quanto far lavorare GPU/CPU in base
// alla "stazza" della macchina. Un PC datato — anche desktop, anche col mouse —
// NON deve prendere il trattamento pieno degli effetti (blur, glow al mouse,
// nebulose). Prima questa logica viveva solo dentro NebulaField; ora è centrale
// e guida anche gli effetti in CSS (attributo data-perf su <html>).
//
// CPU (hardwareConcurrency) è il segnale cross-browser; RAM e connessione
// (solo Chromium) spingono più in basso. La GPU non è leggibile qui: ci pensa il
// campionamento FPS a runtime (PerfGuard + il loop della nebulosa) a declassare
// a "basso" le macchine che arrancano davvero.
export type PerfTier = "alto" | "medio" | "basso";

export const PERF_ATTR = "data-perf";

export function detectPerfTier(): PerfTier {
  if (typeof navigator === "undefined") return "alto";
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const cores = nav.hardwareConcurrency || 4;
  const mem = nav.deviceMemory ?? 4; // GB, solo Chromium; altrove assumiamo medio
  const conn = nav.connection;
  const saveData = conn?.saveData === true;
  const slowNet = /(slow-2g|2g)$/.test(conn?.effectiveType || "");
  if (saveData || slowNet || cores <= 2 || mem <= 1) return "basso";
  // Il default automatico è "medio" = versione LEGGERA: stesso ambiente (campo
  // stellare, bagliori, griglia, glow) ma STATICO, così la GPU non è sempre sotto
  // carico. Il pieno ("alto", con nebulosa e glow animati che seguono il mouse) è
  // solo opt-in dall'interruttore "effetti immersivi", mai attivato in automatico.
  return "medio";
}

// Chiave localStorage della scelta manuale dell'utente sugli effetti.
export const FX_PREF_KEY = "wow-fx";

// Versione minificata da iniettare come script inline nel layout PRIMA del primo
// paint: così le macchine deboli non renderizzano nemmeno una volta gli effetti
// pesanti (niente flash). Prima di tutto rispetta la SCELTA MANUALE dell'utente
// (localStorage "wow-fx": "lite" → basso forzato, "full" → alto forzato); in
// assenza di scelta usa la stessa soglia hardware di detectPerfTier() qui sopra.
export const PERF_INLINE_SCRIPT = `(function(){try{var d=document.documentElement,p=null;try{p=localStorage.getItem("wow-fx")}catch(e){}if(p==="lite"){d.setAttribute("data-perf","basso");return}if(p==="full"){d.setAttribute("data-perf","alto");return}var n=navigator,c=n.hardwareConcurrency||4,m=n.deviceMemory||4,k=n.connection||{},s=k.saveData===true,g=/(slow-2g|2g)$/.test(k.effectiveType||""),t=(s||g||c<=2||m<=1)?"basso":"medio";d.setAttribute("data-perf",t)}catch(e){document.documentElement.setAttribute("data-perf","medio")}})();`;
