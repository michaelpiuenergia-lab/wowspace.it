import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { FounderPhoto } from "@/components/sections/founder-photo";
import { founder } from "@/lib/site-content";
import styles from "./about-section.module.css";

export function AboutSection() {
  const initials = founder.name
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);

  return (
    <section id="chi-siamo" className={`section-spacing ${styles.section}`}>
      <div className={`section-shell ${styles.layout}`}>
        <Reveal className={styles.photoWrap}>
          <div className={styles.photoFrame}>
            <FounderPhoto
              src={founder.photo}
              alt={founder.photoAlt}
              className={styles.photo}
              fallbackClassName={styles.photoFallback}
              initials={initials}
            />
            <div className={styles.photoVignette} aria-hidden="true" />
            <div className={styles.photoGrid} aria-hidden="true" />
            <div className={styles.photoSweep} aria-hidden="true" />
          </div>
          <div className={styles.photoTag}>
            <span className={styles.tagDot} aria-hidden="true" />
            <span>online · risponde personalmente</span>
          </div>
        </Reveal>

        <Reveal className={styles.copy} delay={120}>
          <span className="eyebrow">{founder.eyebrow}</span>
          <h2 className={styles.title}>
            {founder.pitch}
          </h2>

          <div className={styles.signature}>
            <strong>{founder.name}</strong>
            <span>{founder.role}</span>
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
