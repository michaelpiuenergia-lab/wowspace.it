import Link from "next/link";
import { NavMobileTrigger } from "@/components/layout/nav-mobile-trigger";
import { navLinks } from "@/lib/site-content";
import { CtaLink } from "@/components/ui/cta-link";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`section-shell ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Wowspace · home">
          <WowspaceLogo size={42} />
        </Link>

        <nav className={styles.nav} aria-label="Principale">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/accesso" className={styles.secondary}>
            Area clienti
          </Link>
          <CtaLink href="/prenota" compact>
            Prenota una call
          </CtaLink>
          <NavMobileTrigger />
        </div>
      </div>
    </header>
  );
}
