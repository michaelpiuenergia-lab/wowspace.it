import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { founder } from "@/lib/site-content";
import styles from "./about-section.module.css";

export function AboutSection() {
  return (
    <section id="chi-siamo" className={`section-spacing ${styles.section}`}>
      <span aria-hidden="true" className={`depth-rail ${styles.sideLabel}`}>
        chi siamo
      </span>
      <div className={`section-shell ${styles.layout}`}>
        <Reveal className={styles.copy}>
          <span className="eyebrow">{founder.eyebrow}</span>
          <h2 className={styles.title}>{founder.pitch}</h2>

          <div className={styles.signature}>
            <strong>{founder.name}</strong>
            <span>{founder.role}</span>
          </div>

          <div className={styles.photoTag}>
            <span className={styles.tagDot} aria-hidden="true" />
            <span>online · risponde personalmente</span>
          </div>

          {founder.bio.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}

          <ul className={styles.badges}>
            {founder.badges.map((item) => (
              <li key={item.label}>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <CtaLink href="/#contatti">Scrivimi</CtaLink>
            <CtaLink href="/metodo" variant="ghost">
              Come lavoro
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
