import { Reveal } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/site-content";
import styles from "./services-section.module.css";

export function ServicesSection() {
  return (
    <section id="servizi" className={`section-spacing ${styles.section}`}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.leftPrism} />
        <div className={styles.leftGlow} />
        <div className={styles.rightGlow} />
        <div className={styles.diagonalTrace} />
      </div>

      <div className={`section-shell-wide ${styles.shell}`}>
        <SectionHeading
          eyebrow="Servizi // custom digital systems"
          title="Servizi pensati per aziende che vogliono sembrare più solide e lavorare meglio."
          description="Dal sito al CRM, dall'area clienti alle automazioni: costruiamo un ecosistema coerente, bello da vedere e concreto da usare ogni giorno."
        />

        <div className={styles.grid}>
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 70}
              className={styles.cardSlot}
            >
              <article className={`panel ${styles.card}`}>
                <span className={styles.index}>0{index + 1}</span>
                <span className={styles.kicker}>{service.kicker}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <strong>{service.result}</strong>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
