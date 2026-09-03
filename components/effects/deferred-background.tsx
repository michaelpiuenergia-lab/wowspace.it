"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { PERF_ATTR } from "@/lib/perf-tier";
import { PerfGuard } from "@/components/effects/perf-guard";
import { IdleGuard } from "@/components/effects/idle-guard";

// Effetti di sfondo client-only, caricati in lazy (ssr:false): alleggeriscono
// l'HTML e il JS iniziali e si montano dopo l'hydration. Stessa posizione DOM
// dell'originale, così lo stacking (z-index) resta identico.
const PointerGlow = dynamic(
  () => import("@/components/effects/pointer-glow").then((m) => m.PointerGlow),
  { ssr: false },
);
const PointerFx = dynamic(
  () => import("@/components/effects/pointer-fx").then((m) => m.PointerFx),
  { ssr: false },
);
const AmbientEngine = dynamic(
  () =>
    import("@/components/effects/ambient-engine").then((m) => m.AmbientEngine),
  { ssr: false },
);

export function DeferredBackground() {
  // Su touch (data-perf="off", messo dallo script inline prima del primo paint)
  // gli effetti non vengono proprio montati: né scaricati né renderizzati.
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(document.documentElement.getAttribute(PERF_ATTR) !== "off");
  }, []);
  if (!enabled) return null;

  return (
    <>
      <PerfGuard />
      <IdleGuard />
      <PointerGlow />
      <AmbientEngine />
      <PointerFx />
    </>
  );
}
