import { Reveal } from "@/components/effects/reveal";
import { MemoryHabitat } from "@/components/graphics/memory-habitat";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./ai-habitat-section.module.css";

const voiceLines = [
  "leggo prima contesto, obiettivo e valore, poi decido cosa deve diventare pagina, CRM o automazione",
  "metto ordine tra lead, documenti, richieste e ownership prima che il team inizi a rincorrere tutto",
  "uso AI dove puo' davvero alleggerire il lavoro e migliorare risposta, velocita' e controllo",
];

const chips = [
  "legge i segnali",
  "memoria del contesto",
  "priorità chiare",
  "routing dei lead",
  "automazioni utili",
  "controllo operativo",
];

export function AiHabitatSection() {
  return (
    <section id="habitat" className={styles.section}>
      <div className={styles.backdrop} />

      <div className={`section-shell-wide ${styles.layout}`}>
        <Reveal className={styles.copy}>
          <span className="eyebrow">AI in azione</span>
          <h2>
            Se vuoi capire dove vive davvero il nostro lavoro, non guardare il
            neon: guarda come leggiamo segnali, priorita' e passaggi.
          </h2>
          <p className={styles.description}>
            Il punto non e' aggiungere AI a caso. Il punto e' dare al sistema
            memoria, criterio e routing, cosi' richieste, lead, documenti e
            follow-up non restano sparsi ma diventano struttura utile.
          </p>

          <div className={styles.voiceBox}>
            <div className={styles.voiceBar}>
              <span>assistente AI</span>
              <span>come ragiona</span>
            </div>
            <div className={styles.voiceBody}>
              {voiceLines.map((line) => (
                <p key={line}>
                  <span>&gt;</span> {line}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.chips}>
            {chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <CtaLink href="/piattaforma">Scopri CRM e AI</CtaLink>
            <CtaLink href="/#contatti" variant="ghost">
              Parliamone
            </CtaLink>
          </div>
        </Reveal>

        <Reveal className={styles.visual} delay={120}>
          <MemoryHabitat />
        </Reveal>
      </div>

      <div className={`section-shell-wide ${styles.statement}`}>
        <div className={styles.statementLine}>
          <span>LEGGE</span>
          <span>CAPISCE</span>
          <span>AGISCE</span>
        </div>
      </div>
    </section>
  );
}
