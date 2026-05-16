import Link from "next/link";
import { footerGroups, personaSignals } from "@/lib/site-content";
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

          <div className={styles.sigil} aria-hidden="true">
            <span className={styles.sigilLabel}>signal</span>
            <code>~/wowspace $ ping ciao@wowspace.it</code>
            <code className={styles.sigilOk}>200 ok · awaiting brief</code>
          </div>
        </div>
      </div>
    </footer>
  );
}

