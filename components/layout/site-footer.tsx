import Link from "next/link";
import { CookiePrefsButton } from "@/components/legal/cookie-prefs-button";
import { footerGroups, personaSignals } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`section-shell ${styles.inner}`}>
        <div className={styles.brandBlock}>
          <span className={styles.kicker}>Wowspace // engineered for impact</span>
          <h2>Costruiamo esperienze digitali che sembrano il futuro e vendono oggi.</h2>
          <p>
            Siti Next.js, CRM proprietari, aree clienti e automazioni AI per
            aziende che non vogliono una presenza qualsiasi.
          </p>

          <dl className={styles.persona}>
            {personaSignals.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.groups}>
          {footerGroups.map((group) => (
            <div key={group.title}>
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

          <div className={styles.sigil}>
            <span className={styles.sigilLabel}>contatti diretti</span>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.phoneHref} className={styles.sigilOk}>
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className={`section-shell ${styles.legalBar}`}>
        <small className={styles.copyline}>
          © {new Date().getFullYear()} Wowspace · sites · crm · ai systems
        </small>
        <CookiePrefsButton className={styles.cookieBtn}>
          preferenze cookie
        </CookiePrefsButton>
      </div>
    </footer>
  );
}

