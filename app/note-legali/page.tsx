import type { Metadata } from "next";
import { LegalPage, legalStyles } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Note legali · Wowspace",
  description: "Informazioni societarie, condizioni di utilizzo del sito wowspace.it e proprieta' intellettuale.",
  robots: { index: true, follow: true },
};

const updated = "16 maggio 2026";

export default function NoteLegaliPage() {
  return (
    <LegalPage
      breadcrumb="route://note-legali"
      title="Note legali"
      intro="Chi siamo, condizioni di utilizzo del sito, proprieta' intellettuale e limiti di responsabilita'."
      updated={updated}
    >
      <div className={legalStyles.callout}>
        <strong>fill-in</strong>
        <p>
          Sostituisci i campi <span className={legalStyles.placeholder}>&lt;...&gt;</span> con i dati reali
          della societa' titolare prima di pubblicare in produzione.
        </p>
      </div>

      <section>
        <h2>1. Titolare del sito</h2>
        <ul>
          <li>Ragione sociale: <span className={legalStyles.placeholder}>&lt;Ragione sociale&gt;</span></li>
          <li>Sede legale: <span className={legalStyles.placeholder}>&lt;Indirizzo, CAP, Citta', Provincia&gt;</span></li>
          <li>P.IVA / C.F.: <span className={legalStyles.placeholder}>&lt;P.IVA&gt;</span> / <span className={legalStyles.placeholder}>&lt;C.F.&gt;</span></li>
          <li>REA: <span className={legalStyles.placeholder}>&lt;REA&gt;</span></li>
          <li>Capitale sociale: <span className={legalStyles.placeholder}>&lt;Capitale i.v.&gt;</span></li>
          <li>Email: <a href="mailto:wowspaceweb@gmail.com">wowspaceweb@gmail.com</a></li>
          <li>Telefono: <a href="tel:+393518181560">+39 351 818 1560</a></li>
          <li>PEC: <span className={legalStyles.placeholder}>&lt;pec@example.it&gt;</span></li>
        </ul>
      </section>

      <section>
        <h2>2. Oggetto del sito</h2>
        <p>
          Il sito <code>wowspace.it</code> presenta servizi di progettazione e sviluppo di siti web, CRM,
          area clienti e flussi AI. I contenuti hanno scopo informativo e commerciale, non costituiscono
          offerta al pubblico ai sensi dell'art. 1336 c.c.
        </p>
      </section>

      <section>
        <h2>3. Proprieta' intellettuale</h2>
        <p>
          Marchi, logo, testi, grafica, codice e ogni altro contenuto del sito sono di proprieta' di
          <span className={legalStyles.placeholder}>&lt;Ragione sociale&gt;</span> o dei rispettivi titolari e tutelati
          dalle leggi in materia di copyright, marchi e brevetti. E' vietata la riproduzione, anche parziale,
          senza autorizzazione scritta.
        </p>
      </section>

      <section>
        <h2>4. Limitazione di responsabilita'</h2>
        <p>
          Il sito viene fornito "as is". Pur impegnandoci a mantenere informazioni accurate e aggiornate, non
          garantiamo l'assenza di errori, l'aggiornamento costante o la disponibilita' continua del servizio.
          Eventuali link a siti terzi non implicano endorsement; non rispondiamo dei contenuti di terzi.
        </p>
      </section>

      <section>
        <h2>5. Legge applicabile e foro</h2>
        <p>
          Il presente sito e i rapporti che ne derivano sono regolati dalla legge italiana. Per ogni
          controversia e' competente in via esclusiva il foro di
          <span className={legalStyles.placeholder}>&lt;Foro competente&gt;</span>, fatta salva la competenza
          inderogabile del foro del consumatore.
        </p>
      </section>

      <section>
        <h2>6. ODR (controversie online)</h2>
        <p>
          Ai sensi dell'art. 14 del Regolamento UE 524/2013, la Commissione europea mette a disposizione una
          piattaforma per la risoluzione delle controversie online accessibile su <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">ec.europa.eu/consumers/odr</a>.
        </p>
      </section>
    </LegalPage>
  );
}
