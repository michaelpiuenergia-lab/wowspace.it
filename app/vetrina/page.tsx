import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { SolutionsGrid } from "@/components/sections/solutions-grid";
import { routeIndex } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Lavori: siti, CRM ed ecosistemi realizzati",
  description:
    "Esempi concreti di ciò che realizziamo: siti che spiegano, CRM su misura ed ecosistemi che collegano front-end, vendite e operazioni. Agenzia nelle Marche.",
  alternates: { canonical: "/vetrina" },
  openGraph: {
    title: "Lavori: siti, CRM ed ecosistemi realizzati · Wowspace",
    description:
      "Esempi concreti di ciò che realizziamo: siti che spiegano, CRM su misura ed ecosistemi che collegano front-end, vendite e operazioni. Agenzia nelle Marche.",
    url: "/vetrina",
  },
};

export default function VetrinaPage() {
  return (
    <>
      <PageShell
        breadcrumb="Vetrina"
        title="Lavori: siti, CRM e sistemi su misura"
        description="Niente pagine decorative. Tre casi d'uso che mostrano cosa cambia quando il sito, il CRM e l'AI parlano la stessa lingua."
        prev={{ href: "/piattaforma", ...routeIndex["/piattaforma"]! }}
        next={{ href: "/metodo", ...routeIndex["/metodo"]! }}
      >
        <SolutionsGrid />
        <ShowcaseSection />
      </PageShell>
    </>
  );
}
