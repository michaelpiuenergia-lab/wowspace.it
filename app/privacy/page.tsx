import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy · Wowspace",
  description:
    "Come Wowspace tratta i tuoi dati personali, ai sensi del GDPR e della normativa italiana.",
  robots: { index: true, follow: true },
};

const updated = "2 giugno 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      breadcrumb="route://privacy"
      title="Privacy Policy"
      intro="Ti spieghiamo che dati raccogliamo, perche', per quanto tempo, con chi li condividiamo e che diritti hai. Senza giri di parole."
      updated={updated}
    >
      <section>
        <h2>1. Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento dei dati personali e&apos; <strong>Michael Moretti</strong>,
          con sede in Via Garda 24, 63821 Porto Sant&apos;Elpidio (FM),
          C.F. MRTMHL90L02G478E.
          Contatti: <a href="mailto:wowspaceweb@gmail.com">wowspaceweb@gmail.com</a>.
        </p>
      </section>

      <section>
        <h2>2. Tipologie di dati raccolti</h2>
        <ul>
          <li>
            <strong>Dati di contatto.</strong> Nome, email, eventuale numero di telefono e contenuto del
            messaggio, quando ci scrivi via email o tramite form di contatto.
          </li>
          <li>
            <strong>Conversazioni con l&apos;assistente AI.</strong> Il testo che scrivi nel chatbot del
            sito, usato solo per generare la risposta. Ti invitiamo a non inserire dati personali sensibili
            o riservati nella chat.
          </li>
          <li>
            <strong>Dati tecnici di navigazione.</strong> Indirizzo IP, user agent, pagine visitate, timestamp,
            referer. Raccolti dai log del server per finalita' di sicurezza e diagnostica.
          </li>
          <li>
            <strong>Dati di account (solo per area clienti).</strong> Email, password (hashata), ruolo,
            preferenze. Conservati solo se attivi un account su <code>/accesso</code>.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalita' del trattamento</h2>
        <ol>
          <li>
            <strong>Rispondere alle tue richieste</strong> di contatto, preventivi, supporto. Base giuridica:
            esecuzione di misure precontrattuali (art. 6.1.b GDPR).
          </li>
          <li>
            <strong>Erogare il servizio</strong> dell'area clienti, dove presente. Base giuridica: contratto.
          </li>
          <li>
            <strong>Sicurezza e diagnostica</strong> tecnica del sito. Base giuridica: legittimo interesse
            (art. 6.1.f) a prevenire abusi e garantire stabilita'.
          </li>
          <li>
            <strong>Adempimenti di legge</strong> (fatturazione, antiriciclaggio, conservazione documenti).
            Base giuridica: obbligo legale (art. 6.1.c).
          </li>
        </ol>
      </section>

      <section>
        <h2>4. Modalita' e durata del trattamento</h2>
        <p>
          I dati sono trattati con strumenti elettronici, con misure tecniche e organizzative adeguate
          (HTTPS, controllo accessi, backup cifrati). Tempi di conservazione:
        </p>
        <ul>
          <li>Email di contatto: fino a 24 mesi dall'ultima interazione.</li>
          <li>Log tecnici: massimo 6 mesi salvo richieste di autorita'.</li>
          <li>Dati account: fino alla cancellazione dell'account + 12 mesi per backup.</li>
          <li>Dati fiscali: 10 anni come da normativa.</li>
        </ul>
      </section>

      <section>
        <h2>5. Destinatari e responsabili esterni</h2>
        <p>
          I dati possono essere comunicati a fornitori tecnici che agiscono come responsabili del trattamento
          (art. 28 GDPR):
        </p>
        <ul>
          <li>Fornitori di hosting e infrastruttura cloud (UE/USA, con SCC dove applicabile).</li>
          <li>
            Assistente AI / chatbot: <strong>Anthropic PBC</strong> (modelli Claude), USA — con Clausole
            Contrattuali Standard. Riceve i messaggi che scrivi in chat, solo per generare la risposta.
          </li>
          <li>Consulenti contabili e legali, in adempimento di obblighi.</li>
        </ul>
        <p>
          Non vendiamo dati personali a terzi. Non li usiamo per profilazione automatizzata.
        </p>
      </section>

      <section>
        <h2>6. Trasferimenti extra-UE</h2>
        <p>
          Alcuni fornitori possono trattare dati negli Stati Uniti o in altri paesi terzi. In quei casi
          adottiamo Clausole Contrattuali Standard (SCC) approvate dalla Commissione europea e, dove
          richiesto, misure supplementari.
        </p>
      </section>

      <section>
        <h2>7. I tuoi diritti</h2>
        <p>
          Puoi esercitare in qualsiasi momento i diritti previsti dagli artt. 15-22 GDPR:
        </p>
        <ul>
          <li>Accesso, rettifica, cancellazione dei tuoi dati.</li>
          <li>Limitazione e opposizione al trattamento.</li>
          <li>Portabilita' dei dati in formato leggibile.</li>
          <li>Revoca del consenso quando il trattamento si basa su consenso.</li>
          <li>Reclamo all'autorita' di controllo (Garante Privacy italiano, <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">garanteprivacy.it</a>).</li>
        </ul>
        <p>
          Per esercitare i diritti scrivi a <a href="mailto:wowspaceweb@gmail.com">wowspaceweb@gmail.com</a>. Rispondiamo
          entro 30 giorni.
        </p>
      </section>

      <section>
        <h2>8. Modifiche</h2>
        <p>
          Questa policy puo' essere aggiornata. La versione corrente, con data, e' sempre disponibile su
          questa pagina.
        </p>
      </section>
    </LegalPage>
  );
}
