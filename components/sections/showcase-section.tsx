import { Reveal } from "@/components/effects/reveal";
import { HoloScene, type SceneVariant } from "@/components/graphics/holo-scene";
import { SectionHeading } from "@/components/ui/section-heading";
import { showcases } from "@/lib/site-content";
import styles from "./showcase-section.module.css";

// la "copertina" di ogni caso d'uso: la scena 3D del prodotto
const COVERS: SceneVariant[] = ["site", "crm", "portal"];

export function ShowcaseSection() {
  return (
    <section id="progetti" className="section-spacing">
      <div className="section-shell-wide">
        <SectionHeading
          eyebrow="Vetrina · digital launch feel"
          title="Niente pagine decorative: ogni sezione deve spiegare, convincere e accompagnare."
          description="L'ispirazione può essere da showroom tech, ma l'esecuzione resta orientata al business: messaggi chiari, CTA sensate, aree private e un backend capace di sostenere la crescita."
          align="center"
        />

        <div className={styles.stack}>
          {showcases.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 90}
              className={styles.cardSlot}
            >
              <article className={`panel ${styles.card}`}>
                <div className={styles.cover} aria-hidden="true">
                  <div className={styles.coverGlow} />
                  <div className={styles.coverLaptop}>
                    <HoloScene variant={COVERS[index % COVERS.length]} />
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.head}>
                    <span>{item.kicker}</span>
                    <strong>{item.metric}</strong>
                  </div>
                  <div className={styles.body}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <ul>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.foot}>
                    {item.stack.map((tech) => (
                      <small key={tech}>{tech}</small>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
