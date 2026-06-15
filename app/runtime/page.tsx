import type { Metadata } from "next";
import { AiHabitatSection } from "@/components/sections/ai-habitat-section";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Runtime",
  description:
    "Come pensa Wowspace: segnali, memoria, routing e priorita' applicati al tuo processo.",
  alternates: { canonical: "/runtime" },
};

export default function RuntimePage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://runtime"
        title="Runtime"
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
