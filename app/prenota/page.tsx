import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { legalStyles } from "@/components/legal/legal-page";
import { BookingForm } from "@/components/contact/booking-form";
import { siteConfig } from "@/lib/site-config";
import styles from "./prenota.module.css";

export const metadata: Metadata = {
  title: "Prenota una call o chiedi informazioni",
  description:
    "Richiedi informazioni o prenota una call con Wowspace: siti web, e-commerce, CRM e gestionali su misura nelle Marche. Rispondiamo entro 24 ore.",
  alternates: { canonical: "/prenota" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Prenota una call o chiedi informazioni · Wowspace",
    description:
      "Richiedi informazioni o prenota una call con Wowspace: siti web, e-commerce, CRM e gestionali su misura nelle Marche. Rispondiamo entro 24 ore.",
    url: "/prenota",
  },
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
      description="Una call gratuita di 30 minuti, senza impegno: raccontaci il progetto in due righe, ti rispondiamo entro 24 ore."
      status="inbox · aperta"
      uptime="risposta < 24h"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className={legalStyles.wrap}>
        <div className={styles.layout}>
          <div className={legalStyles.body}>
            <section>
              <BookingForm />
            </section>
          </div>

          <aside className={styles.aside}>
            <h2 className={styles.asideTitle}>Cosa succede dopo</h2>
            <ol className={styles.steps}>
              <li>
                <strong>Ti rispondiamo entro 24 ore</strong>
                Di solito molto prima. Risponde direttamente Michael, il
                fondatore.
              </li>
              <li>
                <strong>Call gratuita di 30 minuti</strong>
                Capiamo obiettivi, tempi e budget. Se non siamo il partner
                giusto te lo diciamo subito.
              </li>
              <li>
                <strong>Proposta chiara, senza sorprese</strong>
                Cosa facciamo, quanto costa e in quanto tempo. Poi decidi tu,
                con calma.
              </li>
            </ol>

            <div className={styles.direct}>
              <span className={styles.directLabel}>Preferisci sentirci?</span>
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
              <a href={`mailto:${siteConfig.email}`}>
                {siteConfig.email.split("@")[0]}@<wbr />
                {siteConfig.email.split("@")[1]}
              </a>
              <p>
                {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
                {siteConfig.address.city} ({siteConfig.address.province}) —
                riceviamo su appuntamento.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
