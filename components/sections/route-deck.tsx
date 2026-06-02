import Link from "next/link";
import { Reveal } from "@/components/effects/reveal";
import { navLinks, routeIndex } from "@/lib/site-content";
import styles from "./route-deck.module.css";

export function RouteDeck() {
  return (
    <section className={`section-shell-wide ${styles.section}`} aria-label="Mappa del sito">
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>mappa // 6 pagine</span>
          <h2 className={styles.title}>
            Sei aree, sei pagine. Entra dove ti serve.
          </h2>
          <p className={styles.lead}>
            Niente scroll infinito: ogni parte del lavoro ha la sua pagina
            dedicata: servizi, AI in azione, tecnologia, CRM e area clienti,
            lavori e metodo.
          </p>
        </div>
        <div className={styles.terminal} aria-hidden="true">
          <small>root@wowspace:~$</small>
          <code>ls /routes</code>
          <code style={{ color: "#9bb5cd" }}>6 directories, 0 files</code>
        </div>
      </div>

      <div className={styles.grid}>
        {navLinks.map((link, index) => {
          const info = routeIndex[link.href];
          if (!info) return null;
          return (
            <Reveal key={link.href} delay={index * 70}>
              <Link href={link.href} className={styles.card}>
                <span className={styles.kicker}>{info.kicker}</span>
                <strong className={styles.cardTitle}>{info.title}</strong>
                <p className={styles.cardMeta}>{info.meta}</p>
                <span className={styles.cardCmd}>cd {link.href} →</span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
