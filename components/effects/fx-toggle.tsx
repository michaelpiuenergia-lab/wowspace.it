"use client";

import { useEffect, useState } from "react";
import { FX_PREF_KEY } from "@/lib/perf-tier";

// Interruttore "effetti immersivi". Il sito di default è LEGGERO (ambiente
// statico, GPU a riposo). Chi vuole — e regge — la versione animata (nebulosa
// che segue il mouse, glow, griglia e bagliori in movimento) la attiva da qui.
// La scelta è salvata e applicata prima del primo paint dallo script inline del
// layout; ricarichiamo la pagina così i componenti si montano nella modalità
// giusta senza stati intermedi.
export function FxToggle({ className }: { className?: string }) {
  const [immersive, setImmersive] = useState(false);

  useEffect(() => {
    setImmersive(localStorage.getItem(FX_PREF_KEY) === "full");
  }, []);

  const toggle = () => {
    if (immersive) localStorage.removeItem(FX_PREF_KEY);
    else localStorage.setItem(FX_PREF_KEY, "full");
    window.location.reload();
  };

  return (
    <button
      type="button"
      className={className}
      onClick={toggle}
      aria-pressed={immersive}
      title={
        immersive
          ? "Effetti immersivi attivi (animazioni). Clicca per tornare alla versione leggera."
          : "Attiva gli effetti immersivi animati (usa di più la scheda video)."
      }
    >
      {immersive ? "effetti immersivi: on" : "effetti immersivi"}
    </button>
  );
}
