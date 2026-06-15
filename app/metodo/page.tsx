import type { Metadata } from "next";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { ProcessSection } from "@/components/sections/process-section";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Metodo",
  description:
    "Discovery, architettura, build, evoluzione. Come trasformiamo offerta e processo in un sistema vero.",
  alternates: { canonical: "/metodo" },
};

export default function MetodoPage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://metodo"
        title="Metodo"
        description="Quattro tappe nette: capire offerta e processo, tradurli in struttura, costruire front-end + privato + ops insieme, evolvere senza ripartire."
        status="playbook open"
        uptime="ops · stable"
        prev={{ href: "/vetrina", ...routeIndex["/vetrina"]! }}
        next={{
          href: "/",
          kicker: "home",
          title: "Base",
          meta: "Torna alla home di Wowspace.",
        }}
      >
        <ProcessSection />
      </PageShell>
    </>
  );
}
