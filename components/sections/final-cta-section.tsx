import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./final-cta-section.module.css";

export function FinalCtaSection() {
  return (
    <section id="contatti" className="section-spacing">
      <div className="section-shell">
        <Reveal>
          <div className={`panel ${styles.wrap}`}>
            <div className={styles.copy}>
              <span className="eyebrow">Contatti // launch your next system</span>
              <h2>Se ti serve un sito uguale agli altri, non siamo la scelta giusta.</h2>
              <p>
                Se invece vuoi una presenza forte, un CRM cucito sul tuo
                processo e una base seria su cui far lavorare team e clienti,
                possiamo iniziare da qui.
              </p>
            </div>

            <div className={styles.actions}>
              <CtaLink href="/accesso">Vedi area clienti</CtaLink>
              <CtaLink href="mailto:ciao@wowspace.it" variant="ghost">
                ciao@wowspace.it
              </CtaLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
