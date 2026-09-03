import Link from "next/link";
import type { ReactNode } from "react";
import { PagePlanet } from "@/components/effects/page-planet";
import styles from "./page-shell.module.css";

export type RouteLink = {
  href: string;
  kicker: string;
  title: string;
  meta: string;
};

type PageShellProps = {
  breadcrumb: string;
  title: string;
  description: string;
  prev?: RouteLink;
  next?: RouteLink;
  children: ReactNode;
};

export function PageShell({
  breadcrumb,
  title,
  description,
  prev,
  next,
  children,
}: PageShellProps) {
  return (
    <div className={`section-shell-wide ${styles.shell}`}>
      <header className={styles.subhead}>
        <div className={styles.headLeft}>
          <span className={styles.breadcrumb}>
            <Link href="/">Wowspace</Link>
            <span className={styles.sep}>/</span>
            <span className={styles.current}>{breadcrumb}</span>
          </span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        {/* il pianeta di questa pagina: quello su cui hai cliccato nella
            galassia, ora grande */}
        <div className={styles.headArt}>
          <PagePlanet size={200} />
        </div>
      </header>

      <div className={styles.children}>{children}</div>

      {(prev || next) && (
        <nav className={styles.routeNav} aria-label="Altre rotte">
          {prev ? (
            <Link href={prev.href} className={styles.routeCard} data-spot>
              <i className="fx-spot" aria-hidden="true" />
              <span className={styles.routeKicker}>← {prev.kicker}</span>
              <strong className={styles.routeTitle}>{prev.title}</strong>
              <span className={styles.routeMeta}>{prev.meta}</span>
              <span className={styles.routeArrow}>Vai alla pagina</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href} className={styles.routeCard} data-spot>
              <i className="fx-spot" aria-hidden="true" />
              <span className={styles.routeKicker}>{next.kicker} →</span>
              <strong className={styles.routeTitle}>{next.title}</strong>
              <span className={styles.routeMeta}>{next.meta}</span>
              <span className={styles.routeArrow}>Vai alla pagina</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
