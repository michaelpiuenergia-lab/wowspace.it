import type { Metadata } from "next";
import { CookiePrefsButton } from "@/components/legal/cookie-prefs-button";
import { LegalPage, legalStyles } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy · Wowspace",
  description:
    "Cookie e tecnologie simili usati su wowspace.it: cosa fanno, da chi sono installati, come revocare il consenso.",
  robots: { index: true, follow: true },
};

const updated = "16 maggio 2026";

export default function CookiePage() {
  return (
    <LegalPage
      breadcrumb="route://cookie"
      title="Cookie Policy"
      intro="Tutti i cookie e gli storage usati da Wowspace, con scopo, durata e provenienza. Puoi cambiare le tue preferenze quando vuoi."
      updated={updated}
    >
      <section>
        <h2>1. Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo che i siti salvano sul tuo
          dispositivo per ricordare informazioni tra una visita e l'altra.
          Alcuni sono indispensabili (tecnici), altri servono a misurare l'uso
          del sito o a profilare; per questi ultimi serve il tuo consenso.
        </p>
      </section>

      <section>
        <h2>2. Cookie usati da Wowspace</h2>

        <h3>Cookie tecnici (sempre attivi)</h3>
        <ul>
          <li>
            <code>wowspace.consent.v1</code> — <em>localStorage</em>. Memorizza
            la tua scelta sui cookie. Durata: 12 mesi.
          </li>
          <li>
            Cookie di sessione del framework (Next.js) e di sicurezza del
            server. Cancellati a fine sessione.
          </li>
        </ul>

        <h3>Cookie di preferenze (opzionali)</h3>
        <p>
          Se attivati, ricordano scelte di interfaccia (es. tema, lingua,
          layout). Oggi non ne installiamo, ma e' qui se in futuro li
          aggiungeremo.
        </p>

        <h3>Cookie statistici (opzionali)</h3>
        <p>
          Servirebbero a misurare in forma aggregata l'uso del sito. Oggi{" "}
          <strong>non sono installati</strong>. Se in futuro attiveremo un
          provider (es.{" "}
          <span className={legalStyles.placeholder}>
            &lt;Plausible, Umami, GA4&gt;
          </span>
          ), partira' solo dopo tuo consenso esplicito.
        </p>

        <h3>Cookie di marketing (opzionali)</h3>
        <p>
          Non ne installiamo. Se mai dovessimo lanciare campagne con
          remarketing, lo dichiareremo qui e richiederemo il consenso.
        </p>
      </section>

      <section>
        <h2>3. Cookie di terze parti</h2>
        <p>
          Le pagine di Wowspace non incorporano contenuti di terzi che
          installano cookie senza consenso (es. video YouTube embed, social
          widget, mappe). Eventuali link esterni portano a domini di terzi
          governati dalle loro policy.
        </p>
      </section>

      <section>
        <h2>4. Come gestire le preferenze</h2>
        <p>
          Puoi modificare la tua scelta in qualsiasi momento dal pulsante qui
          sotto, oppure dal link "Preferenze cookie" presente nel footer di ogni
          pagina. Puoi inoltre disabilitare i cookie dalle impostazioni del
          browser, ma alcune parti del sito potrebbero non funzionare
          correttamente.
        </p>
        <div className={legalStyles.btnRow}>
          <CookiePrefsButton className={legalStyles.linkPill}>
            apri preferenze cookie
          </CookiePrefsButton>
        </div>
      </section>

      <section>
        <h2>5. Riferimenti normativi</h2>
        <p>
          Regolamento (UE) 2016/679 (GDPR), Direttiva ePrivacy 2002/58/CE,
          Codice in materia di protezione dei dati personali (D.lgs. 196/2003 e
          ss.mm.ii.), linee guida del Garante per la protezione dei dati
          personali del 10 giugno 2021.
        </p>
      </section>
    </LegalPage>
  );
}
