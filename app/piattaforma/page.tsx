import type { Metadata } from "next";
import { AiCommandSection } from "@/components/sections/ai-command-section";
import { AuthPreviewSection } from "@/components/sections/auth-preview-section";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "AI & CRM",
  description:
    "Command layer e portali clienti: AI utile dentro CRM, supporto, lead routing e area privata.",
  alternates: { canonical: "/piattaforma" },
};

export default function PiattaformaPage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://piattaforma"
        title="AI & CRM"
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
