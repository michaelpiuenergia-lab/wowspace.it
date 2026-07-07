import Link from "next/link";
import { NebulaField } from "@/components/effects/nebula-field";
import { CtaLink } from "@/components/ui/cta-link";
import { siteConfig } from "@/lib/site-config";
import type { LandingContent } from "@/lib/landing-content";
import styles from "./landing-page.module.css";

// Pagina content-rich riutilizzabile per servizi (/servizi/*) e landing locali.
// Renderizza intro, sezioni, FAQ e link correlati, più i dati strutturati
// (Service + BreadcrumbList + FAQPage) collegati al nodo #business del layout.
export function LandingPage({ content }: { content: LandingContent }) {
  const url = `${siteConfig.url}/${content.path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: content.h1,
        serviceType: content.serviceType,
        description: content.metaDescription,
        provider: { "@id": `${siteConfig.url}/#business` },
        areaServed: content.areaServed
          ? { "@type": "AdministrativeArea", name: content.areaServed }
          : { "@type": "AdministrativeArea", name: "Marche" },
        url,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: content.breadcrumb.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: `${siteConfig.url}${c.href}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: content.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <NebulaField />
      <article className={`section-shell ${styles.wrap}`}>
        <nav className={styles.crumbs} aria-label="Percorso">
          {content.breadcrumb.map((c, i) => (
            <span key={c.href}>
              {i > 0 && <span className={styles.sep}>/</span>}
              {i < content.breadcrumb.length - 1 ? (
                <Link href={c.href}>{c.label}</Link>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <header className={styles.hero}>
          <span className="eyebrow">{content.kicker}</span>
          <h1 className={styles.h1}>{content.h1}</h1>
          <p className={styles.lead}>{content.lead}</p>
          <div className={styles.heroActions}>
            <CtaLink href={`mailto:${siteConfig.email}`}>
              {content.ctaLabel}
            </CtaLink>
            <CtaLink href={siteConfig.phoneHref} variant="ghost">
              {siteConfig.phoneDisplay}
            </CtaLink>
          </div>
        </header>

        <div className={styles.intro}>
          {content.introParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className={styles.sections}>
          {content.sections.map((s) => (
            <section key={s.h2} className={styles.block}>
              <h2>{s.h2}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {s.bullets && s.bullets.length > 0 && (
                <ul className={styles.bullets}>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {content.faq.length > 0 && (
          <section className={styles.faq} aria-label="Domande frequenti">
            <h2>Domande frequenti</h2>
            <div className={styles.faqList}>
              {content.faq.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {content.related.length > 0 && (
          <nav
            className={styles.related}
            aria-label="Approfondimenti correlati"
          >
            <h2 className={styles.relatedTitle}>Continua da qui</h2>
            <ul>
              {content.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href}>{r.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <section className={`panel ${styles.cta}`}>
          <h2>Parliamo del tuo progetto</h2>
          <p>
            Con sede a Porto Sant'Elpidio (FM), seguiamo aziende in tutte le
            Marche, di persona e da remoto. Ti risponde direttamente Michael.
          </p>
          <div className={styles.heroActions}>
            <CtaLink href={`mailto:${siteConfig.email}`}>
              {content.ctaLabel}
            </CtaLink>
            <CtaLink href="/servizi" variant="ghost">
              Tutti i servizi
            </CtaLink>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
