import Link from "next/link";
import { Reveal } from "@/components/effects/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { siteConfig } from "@/lib/site-config";
import { personaSignals } from "@/lib/site-content";
import type { LandingContent } from "@/lib/landing-content";
import { PagePlanet } from "@/components/effects/page-planet";
import styles from "./landing-page.module.css";

const num = (i: number) => String(i + 1).padStart(2, "0");

// Pagina content-rich riutilizzabile per servizi (/servizi/*) e landing locali.
// Stessa estetica premium del resto del sito: pannelli glass, numeri-indice,
// bento card, rail mono, reveal-on-scroll. Nessuna animazione continua → GPU
// leggera. Emette Service + BreadcrumbList + FAQPage collegati al nodo #business.
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
      <article className={`section-shell-wide ${styles.wrap}`}>
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

        {/* ---- HERO ---- */}
        <header className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroArt}>
            <PagePlanet size={220} />
          </div>
          <div className={styles.heroCopy}>
            <span className="eyebrow">{content.kicker}</span>
            <h1 className={styles.h1}>{content.h1}</h1>
            <p className={styles.lead}>{content.lead}</p>
            <div className={styles.heroActions}>
              <CtaLink href="/prenota">{content.ctaLabel}</CtaLink>
              <CtaLink href={siteConfig.phoneHref} variant="ghost">
                {siteConfig.phoneDisplay}
              </CtaLink>
            </div>
            <dl className={styles.trust}>
              {personaSignals.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className={`panel ${styles.specPanel}`} aria-hidden="true">
            <div className={styles.specBar}>
              <span className={styles.dots}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.specTag}>{content.serviceType}</span>
            </div>
            <ul className={styles.specList}>
              {content.sections.map((s, i) => (
                <li key={s.h2}>
                  <span className={styles.specIndex}>{num(i)}</span>
                  <span className={styles.specText}>{s.h2}</span>
                </li>
              ))}
            </ul>
            <div className={styles.specFoot}>
              <span>su misura</span>
              <span>Made in Marche</span>
            </div>
          </aside>
        </header>

        {/* ---- INTRO ---- */}
        <div className={styles.intro}>
          {content.introParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* ---- SEZIONI ---- */}
        <div className={styles.sections}>
          {content.sections.map((s, i) => (
            <Reveal key={s.h2}>
              <section className={styles.block}>
                <div className={styles.blockHead}>
                  <span className={styles.blockIndex}>{num(i)}</span>
                  <h2>{s.h2}</h2>
                </div>
                <div className={styles.blockText}>
                  {s.paragraphs.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {s.bullets && s.bullets.length > 0 && (
                  <ul className={styles.bento}>
                    {s.bullets.map((b) => (
                      <li key={b} className={styles.bentoCard}>
                        <span className={styles.bentoDot} aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        {/* ---- FAQ ---- */}
        {content.faq.length > 0 && (
          <Reveal className={styles.faq}>
            <div className={styles.faqHead}>
              <span className="eyebrow">FAQ</span>
              <h2>Domande frequenti</h2>
            </div>
            <div className={styles.faqList}>
              {content.faq.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        )}

        {/* ---- CORRELATI ---- */}
        {content.related.length > 0 && (
          <nav
            className={styles.related}
            aria-label="Approfondimenti correlati"
          >
            <span className="eyebrow">Continua da qui</span>
            <div className={styles.relatedGrid}>
              {content.related.map((r) => (
                <Link key={r.href} href={r.href} className={styles.relatedCard}>
                  <strong>{r.label}</strong>
                  <span className={styles.relatedArrow}>Vai &rarr;</span>
                </Link>
              ))}
            </div>
          </nav>
        )}

        {/* ---- CTA FINALE ---- */}
        <section className={`panel ${styles.cta}`}>
          <div className={styles.ctaGlow} aria-hidden="true" />
          <div className={styles.ctaCopy}>
            <span className="eyebrow">Parliamone</span>
            <h2>Costruiamo qualcosa di serio, insieme.</h2>
            <p>
              Con sede a Porto Sant&apos;Elpidio (FM), seguiamo aziende in tutte
              le Marche, di persona e da remoto. Ti risponde direttamente
              Michael: un progetto alla volta, entro 24 ore.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <CtaLink href="/prenota">{content.ctaLabel}</CtaLink>
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
