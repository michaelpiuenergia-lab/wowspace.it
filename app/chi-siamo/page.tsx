import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { legalStyles } from "@/components/legal/legal-page";
import { siteConfig } from "@/lib/site-config";
import { founder } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Wowspace è lo studio di Michael Moretti a Porto Sant'Elpidio (FM): siti web, e-commerce, CRM e gestionali su misura per aziende delle Marche. Un solo interlocutore, risposta entro 24 ore.",
  alternates: { canonical: "/chi-siamo" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Chi siamo · Wowspace",
    description:
      "Wowspace è lo studio di Michael Moretti a Porto Sant'Elpidio (FM): siti web, e-commerce, CRM e gestionali su misura per aziende delle Marche. Un solo interlocutore, risposta entro 24 ore.",
    url: "/chi-siamo",
  },
};

// Pagina E-E-A-T: chi c'è dietro il sito, dove siamo, come lavoriamo.
// L'AboutPage punta via @id ai nodi business/persona definiti nel layout.
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${siteConfig.url}/chi-siamo`,
  url: `${siteConfig.url}/chi-siamo`,
  name: "Chi siamo · Wowspace",
  mainEntity: { "@id": `${siteConfig.url}/#business` },
};

export default function ChiSiamoPage() {
  return (
    <PageShell
      breadcrumb="route://chi-siamo"
      title="Chi siamo"
      description="Uno studio piccolo per scelta: un solo interlocutore, un progetto alla volta, tutto su misura."
      status="humans · online"
      uptime="Porto Sant'Elpidio (FM)"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <div className={legalStyles.wrap}>
        <div className={legalStyles.body}>
          <section>
            <h2>{founder.name}, founder &amp; builder</h2>
            <p>{founder.pitch}</p>
            {founder.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section>
            <h2>Dove siamo</h2>
            <p>
              Wowspace ha sede a {siteConfig.address.street},{" "}
              {siteConfig.address.postalCode} {siteConfig.address.city} (
              {siteConfig.address.province}), nel cuore del distretto
              calzaturiero fermano. Lavoriamo con aziende di Porto
              Sant&apos;Elpidio, Fermo, Civitanova Marche, Macerata e in
              generale delle Marche: abbastanza vicini da vederci di persona
              quando serve, all&apos;avvio del progetto e nei momenti che
              contano.
            </p>
          </section>

          <section>
            <h2>Come lavoriamo</h2>
            <p>
              Un progetto alla volta, con la giusta attenzione. Parli sempre con
              la stessa persona — niente catena di account manager — e ricevi
              risposta entro 24 ore. Sviluppiamo tutto su misura con tecnologia
              moderna (Next.js): niente template riciclati, niente plugin
              appesantiti, solo ciò che serve al tuo lavoro.
            </p>
            <p>
              Si può lavorare a progetto oppure ad abbonamento, per partire
              senza un grande investimento iniziale e con costi chiari fin dal
              primo giorno.
            </p>
          </section>

          <section>
            <h2>Parliamone</h2>
            <p>
              Il modo più semplice per capire se siamo il partner giusto è una{" "}
              <a href="/prenota">call gratuita di 30 minuti</a>: ci racconti il
              progetto, ti diciamo come lo affronteremmo e con quali costi.
              Senza impegno.
            </p>
          </section>

          <section>
            <h2>Contatti</h2>
            <ul>
              <li>
                Email:{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                Telefono:{" "}
                <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              </li>
              <li>
                Sede: {siteConfig.address.street},{" "}
                {siteConfig.address.postalCode} {siteConfig.address.city} (
                {siteConfig.address.province})
              </li>
            </ul>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
