import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { servicePages } from "@/lib/landing-content";
import styles from "./faq-section.module.css";

// Le domande che ci fanno prima di iniziare: prese dalle FAQ delle pagine di
// servizio (una sola fonte di verità), così qui e lì si risponde uguale.
const PICK: [keyof typeof servicePages, number][] = [
  ["siti-web", 0],
  ["siti-web", 2],
  ["siti-web", 3],
  ["crm-su-misura", 0],
  ["software-gestionali", 0],
  ["automazioni-ai", 0],
];

export function FaqSection() {
  const faqs = PICK.map(([slug, i]) => servicePages[slug].faq[i]).filter(
    Boolean,
  );
  return (
    <section id="domande" className={`section-spacing ${styles.section}`}>
      <div className={`section-shell ${styles.grid}`}>
        <Reveal className={styles.intro}>
          <span className="eyebrow">Domande frequenti</span>
          <h2 className={styles.title}>
            Le cose che ci chiedono prima di iniziare.
          </h2>
          <p className={styles.lead}>
            Costi, tempi, tecnologia, SEO e cosa succede dopo la consegna:
            risposte dirette, le stesse che diamo in call.
          </p>
          <div className={styles.actions}>
            <CtaLink href="/prenota">Prenota una call gratuita</CtaLink>
            <CtaLink href="/servizi" variant="ghost">
              Vedi tutti i servizi
            </CtaLink>
          </div>
        </Reveal>

        <Reveal className={styles.list} delay={80}>
          {faqs.map((f, i) => (
            <details key={f.q} className={styles.item}>
              <summary>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.q}>{f.q}</span>
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
