import { NeuralCore } from "@/components/graphics/neural-core";
import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./manifesto-section.module.css";

const bandWords = [
  "brand perception",
  "sales clarity",
  "crm control",
  "private portals",
  "operational order",
  "custom systems",
];

const statementWords = ["PERCEZIONE", "PIPELINE", "CONTROLLO"];

export function ManifestoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.backdrop} />

      <div className={`section-shell-wide ${styles.layout}`}>
        <Reveal className={styles.copy}>
          <span className="eyebrow">Manifesto // presence + control</span>
          <p className={styles.kicker}>SELL. ORGANIZE. SCALE.</p>

          <div className={styles.statement}>
            {statementWords.map((word, index) => (
              <span
                key={word}
                className={index === 1 ? styles.outlineWord : styles.solidWord}
              >
                {word}
              </span>
            ))}
          </div>

          <p className={styles.description}>
            Non ci interessa fare un sito solo bello. Ci interessa costruire
            una presenza che chiarisce l'offerta, aumenta il valore percepito e
            si collega a CRM, vendite e operativita' senza spezzarsi.
          </p>

          <div className={styles.actions}>
            <CtaLink href="/piattaforma">Scopri CRM e area clienti</CtaLink>
            <CtaLink href="/metodo" variant="ghost">
              Guarda il metodo
            </CtaLink>
          </div>

          <div className={styles.wordGrid}>
            <span>brand</span>
            <span>offerta</span>
            <span>lead</span>
            <span>vendite</span>
            <span>ops</span>
            <span>crm</span>
            <span>crescita</span>
          </div>
        </Reveal>

        <Reveal className={styles.visual} delay={140}>
          <NeuralCore />
        </Reveal>
      </div>

      <div className={styles.band}>
        <div className={styles.bandTrack}>
          {[...bandWords, ...bandWords].map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
