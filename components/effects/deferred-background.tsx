"use client";

import dynamic from "next/dynamic";

// Effetti di sfondo client-only, caricati in lazy (ssr:false): alleggeriscono
// l'HTML e il JS iniziali e si montano dopo l'hydration. Stessa posizione DOM
// dell'originale, così lo stacking (z-index) resta identico.
const PointerGlow = dynamic(
  () => import("@/components/effects/pointer-glow").then((m) => m.PointerGlow),
  { ssr: false },
);
const AmbientEngine = dynamic(
  () =>
    import("@/components/effects/ambient-engine").then((m) => m.AmbientEngine),
  { ssr: false },
);

export function DeferredBackground() {
  return (
    <>
      <PointerGlow />
      <AmbientEngine />
    </>
  );
}
