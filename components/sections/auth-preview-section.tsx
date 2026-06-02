import { AuthConsole } from "@/components/auth/auth-console";
import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./auth-preview-section.module.css";

export function AuthPreviewSection() {
  return (
    <section id="accesso" className="section-spacing">
      <div className={`section-shell ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <span className="eyebrow">Auth // private portals</span>
          <h2>
            La parte privata non e' un accessorio: e' dove clienti, team e
            commerciale misurano davvero il valore del sistema.
          </h2>
          <p>
            Disegniamo accessi riservati che mantengono la stessa presenza della
            home, ma diventano strumenti di lavoro: area clienti, documenti,
            richieste, onboarding e dashboard operative.
          </p>
          <div className={styles.actions}>
            <CtaLink href="/accesso">Apri la demo auth</CtaLink>
            <CtaLink href="/#contatti" variant="ghost">
              Costruiamo il tuo portale
            </CtaLink>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <AuthConsole />
        </Reveal>
      </div>
    </section>
  );
}
