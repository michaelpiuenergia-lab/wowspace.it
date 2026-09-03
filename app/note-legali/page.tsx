import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Note legali",
  description:
    "Informazioni societarie, condizioni di utilizzo del sito wowspaceweb.com e proprietà intellettuale.",
  alternates: { canonical: "/note-legali" },
  robots: { index: true, follow: true },
};

const updated = "2 giugno 2026";

export default function NoteLegaliPage() {
  return (
    <LegalPage
      breadcrumb="Note legali"
      title="Note legali"
      intro="Chi siamo, condizioni di utilizzo del sito, proprietà intellettuale e limiti di responsabilità."
      updated={updated}
    >
      <section>
        <h2>1. Titolare del sito</h2>
        <ul>
          <li>Titolare: Michael Moretti</li>
          <li>Indirizzo: Via Garda 24, 63821 Porto Sant&apos;Elpidio (FM)</li>
          <li>Codice Fiscale: MRTMHL90L02G478E</li>
          <li>
            Email:{" "}
            <a href="mailto:wowspaceweb@gmail.com">wowspaceweb@gmail.com</a>
          </li>
          <li>
            Telefono: <a href="tel:+393518181560">+39 351 818 1560</a>
          </li>
        </ul>
      </section>

      <section>
        <h2>2. Oggetto del sito</h2>
        <p>
          Il sito <code>wowspace.it</code> presenta servizi di progettazione e
          sviluppo di siti web, CRM, area clienti e flussi AI. I contenuti hanno
          scopo informativo e commerciale, non costituiscono offerta al pubblico
          ai sensi dell'art. 1336 c.c.
        </p>
      </section>

      <section>
        <h2>3. Proprietà intellettuale</h2>
        <p>
          Marchi, logo, testi, grafica, codice e ogni altro contenuto del sito
          sono di proprietà di Michael Moretti (Wowspace) o dei rispettivi
          titolari e tutelati dalle leggi in materia di copyright, marchi e
          brevetti. È vietata la riproduzione, anche parziale, senza
          autorizzazione scritta.
        </p>
      </section>

      <section>
        <h2>4. Limitazione di responsabilità</h2>
        <p>
          Il sito viene fornito "as is". Pur impegnandoci a mantenere
          informazioni accurate e aggiornate, non garantiamo l'assenza di
          errori, l'aggiornamento costante o la disponibilità continua del
          servizio. Eventuali link a siti terzi non implicano endorsement; non
          rispondiamo dei contenuti di terzi.
        </p>
      </section>

      <section>
        <h2>5. Legge applicabile e foro</h2>
        <p>
          Il presente sito e i rapporti che ne derivano sono regolati dalla
          legge italiana. Per ogni controversia e&apos; competente il foro di
          Fermo, fatta salva la competenza inderogabile del foro del
          consumatore.
        </p>
      </section>

      <section>
        <h2>6. ODR (controversie online)</h2>
        <p>
          Ai sensi dell'art. 14 del Regolamento UE 524/2013, la Commissione
          europea mette a disposizione una piattaforma per la risoluzione delle
          controversie online accessibile su{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noreferrer"
          >
            ec.europa.eu/consumers/odr
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
