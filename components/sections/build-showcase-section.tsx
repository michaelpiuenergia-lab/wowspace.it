import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildShowcase } from "@/lib/site-content";
import styles from "./build-showcase-section.module.css";

export function BuildShowcaseSection() {
  return (
    <section id="cosa-costruiamo" className={`section-spacing ${styles.section}`}>
      <div className={`section-shell-wide ${styles.shell}`}>
        <SectionHeading
          eyebrow="Cosa costruiamo davvero // esempi"
          title="Esempi concreti di quello che possiamo realizzare per te."
          description="Non solo siti vetrina: software che le aziende usano ogni giorno per vendere, gestire e risparmiare tempo."
          align="center"
        />

        <div className={styles.grid}>
          {buildShowcase.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 50}
              className={styles.cardSlot}
            >
              <article className={`panel ${styles.card}`}>
                <span className={styles.tag}>{item.tag}</span>
                <strong className={styles.title}>{item.title}</strong>
                <p className={styles.desc}>{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className={styles.cta}>
          <CtaLink href="/vetrina">Guarda la vetrina completa</CtaLink>
          <CtaLink href="/#contatti" variant="ghost">
            Raccontaci la tua idea
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
