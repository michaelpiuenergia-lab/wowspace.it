import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { siteConfig } from "@/lib/site-config";
import styles from "./final-cta-section.module.css";

export function FinalCtaSection() {
  return (
    <section id="contatti" className="section-spacing">
      <div className="section-shell">
        <Reveal>
          <div className={`panel ${styles.wrap}`}>
            <div className={styles.copy}>
              <span className="eyebrow">Parla direttamente con me</span>
              <h2>
                Se ti serve un sito uguale agli altri, non siamo la scelta
                giusta.
              </h2>
              <p>
                Se invece vuoi una presenza forte, un CRM cucito sul tuo
                processo e una base seria su cui far lavorare team e clienti,
                scrivimi o chiamami. Rispondo io.
              </p>
              <p className={styles.area}>
                Abbiamo sede a Porto Sant'Elpidio (FM) e seguiamo aziende in
                tutte le Marche — Fermo, Civitanova Marche, San Benedetto del
                Tronto, Ascoli Piceno, Macerata e Ancona — di persona e da
                remoto.
              </p>
            </div>

            <div className={styles.contactGrid}>
              <a className={styles.contactCard} href={siteConfig.phoneHref}>
                <small>Telefono</small>
                <strong>{siteConfig.phoneDisplay}</strong>
                <span>Risposta diretta in orario d'ufficio</span>
              </a>
              <a
                className={styles.contactCard}
                href={`mailto:${siteConfig.email}`}
              >
                <small>Email</small>
                <strong>{siteConfig.email}</strong>
                <span>Risposta entro 24h</span>
              </a>
            </div>

            <div className={styles.actions}>
              <CtaLink href={`mailto:${siteConfig.email}`}>
                Scrivimi ora
              </CtaLink>
              <CtaLink href="/accesso" variant="ghost">
                Area clienti
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
