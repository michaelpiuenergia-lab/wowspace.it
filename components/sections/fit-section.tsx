import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { fastAnswers, fitProfile } from "@/lib/site-content";
import styles from "./fit-section.module.css";

export function FitSection() {
  return (
    <section id="per-chi" className={`section-spacing ${styles.section}`}>
      <div className={`section-shell ${styles.layout}`}>
        <SectionHeading
          eyebrow={fitProfile.eyebrow}
          title={fitProfile.title}
          description={fitProfile.description}
        />

        <div className={styles.fitGrid}>
          <Reveal className={`panel ${styles.goodCard}`}>
            <header className={styles.cardHead}>
              <span className={styles.tagGood}>Sei nel posto giusto se</span>
            </header>
            <ul className={styles.goodList}>
              {fitProfile.good.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={`panel ${styles.notGoodCard}`} delay={120}>
            <header className={styles.cardHead}>
              <span className={styles.tagNot}>Probabilmente non siamo per te se</span>
            </header>
            <ul className={styles.notGoodList}>
              {fitProfile.notGood.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.notFoot}>
              Nessun problema: ti indichiamo dove ha senso guardare.
            </p>
          </Reveal>
        </div>

        <div className={styles.answersHead}>
          <span className="eyebrow">Risposte rapide</span>
          <h3>Le tre cose che vuoi sapere subito.</h3>
        </div>

        <div className={styles.answersGrid}>
          {fastAnswers.map((item, index) => (
            <Reveal
              key={item.label}
              className={`panel ${styles.answerCard}`}
              delay={index * 90}
            >
              <small>{item.label}</small>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </Reveal>
          ))}
        </div>

        <div className={styles.cta}>
          <CtaLink href="/#contatti">Prenota la call gratuita</CtaLink>
          <CtaLink href="/metodo" variant="ghost">
            Vedi come lavoriamo
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
