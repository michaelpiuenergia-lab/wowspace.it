import Link from "next/link";
import { Reveal } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeServices } from "@/lib/site-content";
import styles from "./solutions-section.module.css";

export function SolutionsSection() {
  return (
    <section id="cosa-facciamo" className={`section-spacing ${styles.section}`}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.glowA} />
        <div className={styles.glowB} />
      </div>

      <div className={`section-shell-wide ${styles.shell}`}>
        <SectionHeading
          eyebrow="Cosa facciamo // 5 aree"
          title="Cinque cose concrete che costruiamo per la tua azienda."
          description="Siti, CRM, gestionali, AI e portali clienti. Tutto su misura, tutto pensato per farti risparmiare tempo, ridurre gli errori e vendere di piu'."
        />

        <div className={styles.grid}>
          {homeServices.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 70}
              className={styles.cardSlot}
            >
              <Link
                href={service.href}
                className={`panel ${styles.card}`}
                style={{ "--card-accent": service.accent } as React.CSSProperties}
              >
                <span className={styles.glyph} aria-hidden="true">
                  {service.icon}
                </span>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.tagline}>{service.tagline}</p>
                <ul className={styles.points}>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <span className={styles.more}>Scopri →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
