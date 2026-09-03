import { ChipCluster } from "@/components/graphics/chip-cluster";
import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { chipHighlights, pulseMetrics } from "@/lib/site-content";
import styles from "./tech-pulse-section.module.css";

export function TechPulseSection() {
  return (
    <section id="tech-layer" className={styles.section}>
      <div className={`section-shell-wide ${styles.wrap}`}>
        <Reveal className={styles.copy}>
          <SectionHeading
            eyebrow="Tech Layer · system runtime"
            title="La parte tecnica deve essere bella da vedere, ma soprattutto comoda da governare."
            description="Auth, ruoli, CRM, documenti, prompt contestuali e parti operative vanno pensati insieme alla UI, non aggiunti dopo. È lì che un progetto inizia davvero a valere."
          />

          <div className={styles.metrics}>
            {pulseMetrics.map((item) => (
              <article key={item.label} className={`panel ${styles.metric}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>

          <div className={styles.actions}>
            <CtaLink href="/piattaforma">Apri il command layer</CtaLink>
            <CtaLink href="/accesso" variant="ghost">
              Apri la demo auth
            </CtaLink>
          </div>
        </Reveal>

        <Reveal className={styles.visual} delay={130}>
          <div className={styles.visualShell}>
            <ChipCluster className={styles.cluster} />
          </div>
        </Reveal>
      </div>

      <div className={`section-shell-wide ${styles.cards}`}>
        {chipHighlights.map((item, index) => (
          <Reveal key={item.title} delay={index * 90}>
            <article className={`panel ${styles.card}`}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
