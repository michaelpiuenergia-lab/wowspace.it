import type { Metadata } from "next";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { ServicesSection } from "@/components/sections/services-section";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Servizi · Wowspace",
  description:
    "Servizi digitali su misura: siti Next.js, e-commerce, CRM proprietari, area clienti, automazioni AI.",
};

export default function ServiziPage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://servizi"
        title="Servizi"
        description="Cosa costruiamo davvero: siti che fanno percepire livello, CRM che reggono il processo, AI dove ha senso, portali clienti seri."
        status="catalog live"
        uptime="6 lanes · open"
        prev={{ href: "/", ...routeIndex["/"] ?? { kicker: "home", title: "Home", meta: "Wowspace base" } }}
        next={{ href: "/runtime", ...routeIndex["/runtime"]! }}
      >
        <ServicesSection />
      </PageShell>
    </>
  );
}
