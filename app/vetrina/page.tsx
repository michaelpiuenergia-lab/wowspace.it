import type { Metadata } from "next";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Vetrina · Wowspace",
  description:
    "Casi d'uso: home che spiega, CRM su misura, ecosistemi connessi tra front-end e operazioni.",
};

export default function VetrinaPage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://vetrina"
        title="Vetrina"
        description="Niente pagine decorative. Tre casi d'uso che mostrano cosa cambia quando il sito, il CRM e l'AI parlano la stessa lingua."
        status="cases · 3 active"
        uptime="library v2"
        prev={{ href: "/piattaforma", ...routeIndex["/piattaforma"]! }}
        next={{ href: "/metodo", ...routeIndex["/metodo"]! }}
      >
        <ShowcaseSection />
      </PageShell>
    </>
  );
}
