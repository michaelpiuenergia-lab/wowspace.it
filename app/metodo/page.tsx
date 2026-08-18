import type { Metadata } from "next";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageShell } from "@/components/layout/page-shell";
import { ProcessSection } from "@/components/sections/process-section";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Come lavoriamo: dal progetto al rilascio",
  description:
    "Il nostro metodo in quattro tappe: capiamo offerta e processo, progettiamo, costruiamo sito, area privata e operatività, poi cresciamo con continuità.",
  alternates: { canonical: "/metodo" },
  openGraph: {
    title: "Come lavoriamo: dal progetto al rilascio · Wowspace",
    description:
      "Il nostro metodo in quattro tappe: capiamo offerta e processo, progettiamo, costruiamo sito, area privata e operatività, poi cresciamo con continuità.",
    url: "/metodo",
  },
};

export default function MetodoPage() {
  return (
    <>
      <NebulaField />
      <PageShell
        breadcrumb="route://metodo"
        title="Il nostro metodo in quattro tappe"
        description="Quattro tappe nette: capire offerta e processo, tradurli in struttura, costruire front-end + privato + ops insieme, evolvere senza ripartire."
        status="playbook open"
        uptime="ops · stable"
        prev={{ href: "/vetrina", ...routeIndex["/vetrina"]! }}
        next={{
          href: "/prenota",
          kicker: "call",
          title: "Prenota una call",
          meta: "Il metodo ti convince? Parliamone: call gratuita di 30 minuti.",
        }}
      >
        <ProcessSection />
      </PageShell>
    </>
  );
}
