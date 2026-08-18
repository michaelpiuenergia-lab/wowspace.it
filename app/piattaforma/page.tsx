import type { Metadata } from "next";
import { AiCommandSection } from "@/components/sections/ai-command-section";
import { AuthPreviewSection } from "@/components/sections/auth-preview-section";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  // Title "di prodotto", distinto da /servizi/crm-su-misura (la pagina
  // commerciale) per non contendersi la stessa query.
  title: "La piattaforma Wowspace: command layer e area clienti",
  description:
    "CRM su misura e portali clienti costruiti sul tuo processo: lead, trattative, documenti e automazioni AI in un unico sistema. Agenzia nelle Marche.",
  alternates: { canonical: "/piattaforma" },
  openGraph: {
    title: "La piattaforma Wowspace: command layer e area clienti · Wowspace",
    description:
      "CRM su misura e portali clienti costruiti sul tuo processo: lead, trattative, documenti e automazioni AI in un unico sistema. Agenzia nelle Marche.",
    url: "/piattaforma",
  },
};

export default function PiattaformaPage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://piattaforma"
        title="CRM su misura e portali clienti per la tua azienda"
        description="Il command layer: AI applicata sui dati che esistono davvero (CRM, ticket, documenti) e portali clienti che non spezzano il brand."
        status="agents armed"
        uptime="4 agent · live"
        prev={{ href: "/sistema", ...routeIndex["/sistema"]! }}
        next={{ href: "/vetrina", ...routeIndex["/vetrina"]! }}
      >
        <AiCommandSection />
        <AuthPreviewSection />
      </PageShell>
    </>
  );
}
