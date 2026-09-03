import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { ServicesSection } from "@/components/sections/services-section";
import { routeIndex } from "@/lib/site-content";
import { servicePages } from "@/lib/landing-content";
import hub from "./hub.module.css";

export const metadata: Metadata = {
  title: "Servizi: siti web, e-commerce, CRM e software su misura",
  description:
    "I nostri servizi digitali nelle Marche: siti web, e-commerce, CRM su misura, software gestionali, automazioni AI e portali clienti per PMI e aziende.",
  alternates: { canonical: "/servizi" },
  openGraph: {
    title: "Servizi: siti web, e-commerce, CRM e software su misura · Wowspace",
    description:
      "I nostri servizi digitali nelle Marche: siti web, e-commerce, CRM su misura, software gestionali, automazioni AI e portali clienti per PMI e aziende.",
    url: "/servizi",
  },
};

export default function ServiziPage() {
  return (
    <>
      <PageShell
        breadcrumb="Servizi"
        title="Servizi digitali su misura nelle Marche"
        description="Cosa costruiamo davvero: siti che fanno percepire livello, CRM che reggono il processo, AI dove ha senso, portali clienti seri."
        prev={{
          href: "/",
          ...(routeIndex["/"] ?? {
            kicker: "home",
            title: "Home",
            meta: "Wowspace base",
          }),
        }}
        next={{ href: "/runtime", ...routeIndex["/runtime"]! }}
      >
        <ServicesSection />

        <nav className={hub.hub} aria-label="Aree di servizio">
          <h2 className={hub.hubTitle}>Approfondisci ogni servizio</h2>
          <div className={hub.grid}>
            {Object.values(servicePages).map((p) => (
              <Link
                key={p.path}
                href={`/${p.path}`}
                className={hub.card}
                data-spot
              >
                <i className="fx-spot" aria-hidden="true" />
                <strong>{p.kicker}</strong>
                <span>{p.lead}</span>
                <em>Scopri &rarr;</em>
              </Link>
            ))}
          </div>
        </nav>
      </PageShell>
    </>
  );
}
