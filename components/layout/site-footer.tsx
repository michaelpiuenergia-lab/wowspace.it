import Link from "next/link";
import { CookiePrefsButton } from "@/components/legal/cookie-prefs-button";
import { FxToggle } from "@/components/effects/fx-toggle";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { footerGroups, personaSignals } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  const { address } = siteConfig;

  return (
    <footer className={styles.footer}>
      <div className={`section-shell ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.brandTop}>
              <WowspaceLogo size={38} showWordmark={false} />
              <span className={styles.brandName}>Wowspace</span>
            </div>
            <p className={styles.tagline}>
              Strumenti digitali su misura: belli da vedere, fatti per vendere.
            </p>
            <p className={styles.desc}>
              Siti, CRM, gestionali, aree clienti e automazioni AI cuciti sul
              tuo modo di lavorare — non una presenza qualsiasi.
            </p>
          </div>

          <nav className={styles.columns} aria-label="Link del footer">
            {footerGroups.map((group) => (
              <div key={group.title} className={styles.col}>
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className={styles.col}>
              <h3>Contatti</h3>
              <address className={styles.address}>
                {address.street}
                <br />
                {address.postalCode} {address.city} ({address.province})
                <br />
                {address.region}, Italia
              </address>
              <a
                className={styles.contactLink}
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              <a
                className={`${styles.contactLink} ${styles.phone}`}
                href={siteConfig.phoneHref}
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>

        <dl className={styles.trust}>
          {personaSignals.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.legalBar}>
          <small className={styles.copyline}>
            © {new Date().getFullYear()} Wowspace · {address.street},{" "}
            {address.city} ({address.province})
          </small>
          <div className={styles.legalActions}>
            <FxToggle className={styles.cookieBtn} />
            <CookiePrefsButton className={styles.cookieBtn}>
              preferenze cookie
            </CookiePrefsButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
