import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { legalStyles } from "@/components/legal/legal-page";
import { BookingForm } from "@/components/contact/booking-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Prenota una call o chiedi informazioni",
  description:
    "Richiedi informazioni o prenota una call con Wowspace: siti web, e-commerce, CRM e gestionali su misura nelle Marche. Rispondiamo entro 24 ore.",
  alternates: { canonical: "/prenota" },
  robots: { index: true, follow: true },
};

// ContactPage collegata via @id al nodo business del layout: è anche l'URL
// da usare come link prenotazioni nella scheda Google Business Profile.
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteConfig.url}/prenota`,
  url: `${siteConfig.url}/prenota`,
  name: "Prenota una call · Wowspace",
  mainEntity: { "@id": `${siteConfig.url}/#business` },
};

export default function PrenotaPage() {
  return (
    <PageShell
      breadcrumb="route://prenota"
      title="Prenota una call"
      description="Raccontaci il progetto in due righe: ti rispondiamo entro 24 ore, di solito molto prima."
      status="inbox · aperta"
      uptime="risposta < 24h"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className={legalStyles.wrap}>
        <div className={legalStyles.body}>
          <section>
            <BookingForm />
          </section>

          <section>
            <h2>Preferisci fare da solo?</h2>
            <ul>
              <li>
                Telefono:{" "}
                <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
                {" (in orario d'ufficio, risponde direttamente il founder)"}
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                Sede: {siteConfig.address.street},{" "}
                {siteConfig.address.postalCode} {siteConfig.address.city} (
                {siteConfig.address.province}) — riceviamo su appuntamento
              </li>
            </ul>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
