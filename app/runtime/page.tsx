import type { Metadata } from "next";
import { AiHabitatSection } from "@/components/sections/ai-habitat-section";
import { PageShell } from "@/components/layout/page-shell";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  // Title "di prodotto", distinto da /servizi/automazioni-ai (la pagina
  // commerciale) per non contendersi la stessa query.
  title: "Il runtime Wowspace: AI e automazioni in azione",
  description:
    "Automazioni e intelligenza artificiale applicate ai processi aziendali: sintesi, classificazione e suggerimenti sui tuoi dati reali. Agenzia nelle Marche.",
  alternates: { canonical: "/runtime" },
  openGraph: {
    title: "Il runtime Wowspace: AI e automazioni in azione · Wowspace",
    description:
      "Automazioni e intelligenza artificiale applicate ai processi aziendali: sintesi, classificazione e suggerimenti sui tuoi dati reali. Agenzia nelle Marche.",
    url: "/runtime",
  },
};

export default function RuntimePage() {
  return (
    <>
      <PageShell
        breadcrumb="Runtime"
        title="Automazioni e AI applicate ai tuoi processi"
        description="Dove abita il nostro lavoro: lettura segnali, memoria persistente, routing e ownership. Niente neon a vuoto."
        prev={{ href: "/servizi", ...routeIndex["/servizi"]! }}
        next={{ href: "/sistema", ...routeIndex["/sistema"]! }}
      >
        <AiHabitatSection />
      </PageShell>
    </>
  );
}
