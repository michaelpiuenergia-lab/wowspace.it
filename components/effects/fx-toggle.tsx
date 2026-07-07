"use client";

import { useEffect, useState } from "react";
import { FX_PREF_KEY } from "@/lib/perf-tier";

// Interruttore effetti: l'utente sceglie "pieni" o "ridotti" e la scelta resta
// salvata (localStorage). "Ridotti" forza il tier basso → la CSS spegne blur,
// glow del mouse, animazioni continue e nebulosa interattiva: zero sforzo GPU.
// Riutilizza tutto il sistema data-perf già esistente.
export function FxToggle({ className }: { className?: string }) {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const pref = localStorage.getItem(FX_PREF_KEY);
    if (pref === "lite") setLite(true);
    else if (pref === "full") setLite(false);
    // nessuna scelta salvata: rispecchia ciò che ha deciso l'hardware
    else
      setLite(document.documentElement.getAttribute("data-perf") === "basso");
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !lite;
    setLite(next);
    if (next) {
      localStorage.setItem(FX_PREF_KEY, "lite");
      root.setAttribute("data-perf", "basso");
    } else {
      // "pieni" forzati: alto a prescindere dall'hardware (scelta esplicita)
      localStorage.setItem(FX_PREF_KEY, "full");
      root.setAttribute("data-perf", "alto");
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      aria-pressed={lite}
      title={
        lite
          ? "Effetti grafici ridotti: minimo sforzo per la scheda video"
          : "Effetti grafici pieni"
      }
    >
      {lite ? "effetti: ridotti" : "riduci effetti"}
    </button>
  );
}
