import type { Metadata } from "next";
import { AiHabitatSection } from "@/components/sections/ai-habitat-section";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Automazioni e AI per aziende",
  description:
    "Automazioni e intelligenza artificiale applicate ai processi aziendali: sintesi, classificazione e suggerimenti sui tuoi dati reali. Agenzia nelle Marche.",
  alternates: { canonical: "/runtime" },
};

export default function RuntimePage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://runtime"
        title="Automazioni e AI applicate ai tuoi processi"
        description="Dove abita il nostro lavoro: lettura segnali, memoria persistente, routing e ownership. Niente neon a vuoto."
        status="kernel armed"
        uptime="latency 14ms"
        prev={{ href: "/servizi", ...routeIndex["/servizi"]! }}
        next={{ href: "/sistema", ...routeIndex["/sistema"]! }}
      >
        <AiHabitatSection />
      </PageShell>
    </>
  );
}
