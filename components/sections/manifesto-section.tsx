import type { CSSProperties } from "react";
import { NeuralCore } from "@/components/graphics/neural-core";
import { KineticText } from "@/components/effects/kinetic-text";
import { OffscreenPause } from "@/components/effects/offscreen-pause";
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
          <h2 className={styles.kicker}>Non basta un sito bello.</h2>

          <div className={styles.statement}>
            {/* Le tre parole entrano da sinistra una dopo l'altra, legate
                allo scroll (fx-in-left + sfasamento per --i). */}
            {statementWords.map((word, index) => (
              <span
                key={word}
                className={`${index === 1 ? styles.outlineWord : styles.solidWord} ${styles.stmt} fx-in-left`}
                style={{ "--i": index } as CSSProperties}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Il testo si accende parola per parola mentre scorri (fx-fill). */}
          <p className={styles.description}>
            <KineticText
              className="fx-fill"
              text="Ti costruiamo un sistema completo che attira clienti, mette ordine nelle vendite e nel lavoro di ogni giorno, e cresce con te. Sito, CRM e area clienti collegati tra loro, non pezzi sparsi."
            />
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

      {/* marquee: si ferma quando non è sullo schermo (OffscreenPause) */}
      <div className={styles.band} data-marquee>
        <OffscreenPause target="[data-marquee]" />
        <div className={styles.bandTrack}>
          {/* la seconda copia serve solo allo scorrimento continuo: nascosta
              agli screen reader */}
          {[...bandWords, ...bandWords].map((word, index) => (
            <span
              key={`${word}-${index}`}
              aria-hidden={index >= bandWords.length || undefined}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
