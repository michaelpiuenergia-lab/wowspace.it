import type { Metadata } from "next";
import { AiHabitatSection } from "@/components/sections/ai-habitat-section";
import { PageShell } from "@/components/layout/page-shell";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Runtime · Wowspace",
  description:
    "Come pensa Wowspace: segnali, memoria, routing e priorita' applicati al tuo processo.",
};

export default function RuntimePage() {
  return (
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
  );
}
