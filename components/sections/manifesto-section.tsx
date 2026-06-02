import { NeuralCore } from "@/components/graphics/neural-core";
import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./manifesto-section.module.css";

const bandWords = [
  "più clienti",
  "meno lavoro manuale",
  "tutto in un posto",
  "vendite in ordine",
  "area clienti",
  "su misura",
];

const statementWords = ["VENDI", "ORGANIZZA", "CRESCI"];

export function ManifestoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.backdrop} />

      <div className={`section-shell-wide ${styles.layout}`}>
        <Reveal className={styles.copy}>
          <span className="eyebrow">Come la pensiamo</span>
          <p className={styles.kicker}>Non basta un sito bello.</p>

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
            Ti costruiamo un sistema completo che attira clienti, mette ordine
            nelle vendite e nel lavoro di ogni giorno, e cresce con te. Sito,
            CRM e area clienti collegati tra loro, non pezzi sparsi.
          </p>

          <div className={styles.actions}>
            <CtaLink href="/piattaforma">Scopri CRM e area clienti</CtaLink>
            <CtaLink href="/metodo" variant="ghost">
              Guarda il metodo
            </CtaLink>
          </div>

          <div className={styles.wordGrid}>
            <span>sito</span>
            <span>clienti</span>
            <span>vendite</span>
            <span>crm</span>
            <span>ordine</span>
            <span>automazioni</span>
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
