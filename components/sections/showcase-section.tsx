import { Reveal } from "@/components/effects/reveal";
import { DeviceFrame, PhoneScreen } from "@/components/graphics/device-frame";
import {
  ProductMock,
  type MockVariant,
} from "@/components/graphics/product-mock";
import { SectionHeading } from "@/components/ui/section-heading";
import { showcases } from "@/lib/site-content";
import styles from "./showcase-section.module.css";

// la "copertina" di ogni caso d'uso: il prodotto dentro un portatile, e
// davanti un telefono con notifiche o chat (come una foto di progetto)
const COVERS: {
  mock: MockVariant;
  phone: "notify" | "chat";
  notes: "site" | "erp";
}[] = [
  { mock: "site", phone: "notify", notes: "site" },
  { mock: "crm", phone: "chat", notes: "site" },
  { mock: "portal", phone: "notify", notes: "erp" },
];

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
                    <DeviceFrame kind="laptop">
                      <ProductMock
                        variant={COVERS[index % COVERS.length].mock}
                      />
                    </DeviceFrame>
                  </div>
                  <div className={styles.coverPhone}>
                    <DeviceFrame kind="phone">
                      <PhoneScreen
                        variant={COVERS[index % COVERS.length].phone}
                        notes={COVERS[index % COVERS.length].notes}
                      />
                    </DeviceFrame>
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
