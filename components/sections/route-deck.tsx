import Link from "next/link";
import { LightRule } from "@/components/effects/light-rule";
import { Reveal } from "@/components/effects/reveal";
import { navLinks, routeIndex } from "@/lib/site-content";
import styles from "./route-deck.module.css";

export function RouteDeck() {
  return (
    <section
      className={`section-shell-wide ${styles.section}`}
      aria-label="Mappa del sito"
    >
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>Mappa del sito</span>
          <h2 className={styles.title}>
            Sei aree, sei pagine. Entra dove ti serve.
          </h2>
          <p className={styles.lead}>
            Niente scroll infinito: ogni parte del lavoro ha la sua pagina
            dedicata — servizi, AI in azione, tecnologia, CRM e area clienti,
            lavori e metodo.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {navLinks.map((link, index) => {
          const info = routeIndex[link.href];
          if (!info) return null;
          return (
            <Reveal key={link.href} delay={index * 70}>
              <Link
                href={link.href}
                className={styles.card}
                data-spot
                prefetch={false}
              >
                <i className="fx-spot" aria-hidden="true" />
                <span className={styles.kicker}>{info.kicker}</span>
                <strong className={styles.cardTitle}>{info.title}</strong>
                <p className={styles.cardMeta}>{info.meta}</p>
                <span className={styles.cardCmd}>Apri →</span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <LightRule className={`fx-rule-slant ${styles.rule}`} delay={2.4} />
    </section>
  );
}
