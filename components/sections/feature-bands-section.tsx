import { LightRule } from "@/components/effects/light-rule";
import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { Scene3D } from "@/components/graphics/scene-3d";
import { SectionHeading } from "@/components/ui/section-heading";
import { extraServices, featureBands } from "@/lib/site-content";
import styles from "./feature-bands-section.module.css";

export function FeatureBandsSection() {
  return (
    <section
      id="cosa-costruiamo"
      className={`section-spacing ${styles.section}`}
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="Cosa costruiamo per te"
          title="Non vendiamo siti generici: costruiamo strumenti che usi ogni giorno."
          description="Siti, CRM, gestionali, AI e portali clienti. Tutto cucito sul tuo lavoro — e parti senza un grande investimento iniziale, a progetto o ad abbonamento."
        />

        <div className={styles.bands}>
          {featureBands.map((band) => (
            <Reveal key={band.tag} className={styles.band}>
              <div className={styles.copy}>
                <span className={styles.tag}>{band.tag}</span>
                <h3 className={styles.title}>{band.title}</h3>
                <p className={styles.body}>{band.body}</p>
                <ul className={styles.points}>
                  {band.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className={styles.cta}>
                  <CtaLink href={band.cta.href} variant="ghost" compact>
                    {band.cta.label}
                  </CtaLink>
                </div>
              </div>

              {/* La scena della banda: sfere, anelli e gocce di vetro con un
                  frammento di interfaccia. Si posa entrando (fx-in-tilt) e su
                  desktop si inclina col mouse (data-tilt). */}
              <div className={`${styles.visual} fx-in-tilt`} data-tilt>
                <div className={styles.visualGlow} aria-hidden="true" />
                <div className={styles.mockWrap}>
                  <Scene3D variant={band.variant} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.extra}>
          <LightRule className={`fx-rule-slant ${styles.extraRule}`} />
          <SectionHeading
            eyebrow="Tutto il resto, se ti serve"
            title="E ci occupiamo anche di tutto il resto."
            description="Grafica, SEO, e-commerce, hosting e assistenza: un unico partner per la tua presenza digitale, dall'idea alla crescita nel tempo."
          />

          <div className={styles.extraGrid}>
            {extraServices.map((service, index) => (
              <Reveal
                key={service.title}
                delay={index * 60}
                className={styles.extraSlot}
              >
                <article
                  className={`panel ${styles.extraCard}`}
                  style={
                    { "--card-accent": service.accent } as React.CSSProperties
                  }
                  data-spot
                >
                  <i className="fx-spot" aria-hidden="true" />
                  <span className={styles.extraIcon} aria-hidden="true">
                    {service.icon}
                  </span>
                  <h3 className={styles.extraTitle}>{service.title}</h3>
                  <p className={styles.extraDesc}>{service.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
