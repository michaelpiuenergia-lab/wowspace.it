import type { Metadata } from "next";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { TechPulseSection } from "@/components/sections/tech-pulse-section";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Sistema · Wowspace",
  description:
    "Tech layer: auth, ruoli, CRM, documenti e prompt contestuali pensati insieme alla UI.",
};

export default function SistemaPage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://sistema"
        title="Sistema"
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
