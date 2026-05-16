import type { Metadata } from "next";
import { LegalPage, legalStyles } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy · Wowspace",
  description:
    "Come Wowspace tratta i tuoi dati personali, ai sensi del GDPR e della normativa italiana.",
  robots: { index: true, follow: true },
};

const updated = "16 maggio 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      breadcrumb="route://privacy"
      title="Privacy Policy"
      intro="Ti spieghiamo che dati raccogliamo, perche', per quanto tempo, con chi li condividiamo e che diritti hai. Senza giri di parole."
      updated={updated}
    >
      <div className={legalStyles.callout}>
        <strong>nota tecnica</strong>
        <p>
          I campi marcati come <span className={legalStyles.placeholder}>&lt;da completare&gt;</span> vanno
          riempiti con i dati reali della tua societa' (ragione sociale, P.IVA, sede, PEC) prima del go-live.
        </p>
      </div>

      <section>
        <h2>1. Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento dei dati personali e' <span className={legalStyles.placeholder}>&lt;Ragione sociale&gt;</span>,
          con sede in <span className={legalStyles.placeholder}>&lt;Indirizzo sede legale&gt;</span>,
          P.IVA <span className={legalStyles.placeholder}>&lt;P.IVA&gt;</span>, C.F. <span className={legalStyles.placeholder}>&lt;C.F.&gt;</span>.
          Contatti: <a href="mailto:morettienergia@live.it">morettienergia@live.it</a> — PEC <span className={legalStyles.placeholder}>&lt;pec@example.it&gt;</span>.
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
          <li>Hosting / CDN (es. <span className={legalStyles.placeholder}>&lt;Vercel, Hetzner, AWS&gt;</span>) — UE/USA con SCC.</li>
          <li>Email transazionale (es. <span className={legalStyles.placeholder}>&lt;Resend, Postmark&gt;</span>).</li>
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
          Per esercitare i diritti scrivi a <a href="mailto:morettienergia@live.it">morettienergia@live.it</a>. Rispondiamo
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
