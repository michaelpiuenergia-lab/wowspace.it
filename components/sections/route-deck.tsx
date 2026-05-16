import Link from "next/link";
import { Reveal } from "@/components/effects/reveal";
import { navLinks, routeIndex } from "@/lib/site-content";
import styles from "./route-deck.module.css";

export function RouteDeck() {
  return (
    <section className={`section-shell-wide ${styles.section}`} aria-label="Mappa del sito">
      <div className={styles.head}>
        <div>
          <span className={styles.eyebrow}>map // 6 routes online</span>
          <h2 className={styles.title}>
            Sei rotte. Ogni rotta una pagina viva.
          </h2>
          <p className={styles.lead}>
            Wowspace non e' uno scroll infinito. Ogni dominio ha la sua
            interfaccia: servizi, runtime, sistema, AI, vetrina, metodo. Entra
            dove ti serve.
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
