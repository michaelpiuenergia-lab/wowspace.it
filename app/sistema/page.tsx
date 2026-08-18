import type { Metadata } from "next";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { TechPulseSection } from "@/components/sections/tech-pulse-section";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Tecnologia e stack dei software su misura",
  description:
    "Lo stack su cui costruiamo software su misura: autenticazione, ruoli, sicurezza, CRM e AI contestuale pensati insieme all'interfaccia. Agenzia nelle Marche.",
  alternates: { canonical: "/sistema" },
  openGraph: {
    title: "Tecnologia e stack dei software su misura · Wowspace",
    description:
      "Lo stack su cui costruiamo software su misura: autenticazione, ruoli, sicurezza, CRM e AI contestuale pensati insieme all'interfaccia. Agenzia nelle Marche.",
    url: "/sistema",
  },
};

export default function SistemaPage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://sistema"
        title="La tecnologia su cui costruiamo: stack, ruoli, sicurezza"
        description="Il tech layer va pensato con la UI, non incollato dopo. Auth, ruoli, documenti, prompt: insieme."
        status="stack online"
        uptime="build 24.05"
        prev={{ href: "/runtime", ...routeIndex["/runtime"]! }}
        next={{ href: "/piattaforma", ...routeIndex["/piattaforma"]! }}
      >
        <TechPulseSection />
      </PageShell>
    </>
  );
}
