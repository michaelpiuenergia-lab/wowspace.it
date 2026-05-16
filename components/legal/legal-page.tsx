import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/page-shell";
import styles from "./legal-page.module.css";

type LegalPageProps = {
  breadcrumb: string;
  title: string;
  intro: string;
  updated: string;
  version?: string;
  children: ReactNode;
};

export function LegalPage({
  breadcrumb,
  title,
  intro,
  updated,
  version = "v1.0",
  children,
}: LegalPageProps) {
  return (
    <PageShell
      breadcrumb={breadcrumb}
      title={title}
      description={intro}
      status="legal · live"
      uptime={`updated ${updated}`}
    >
      <div className={styles.wrap}>
        <div className={styles.head}>
          <span className={styles.meta}>
            <code>{version}</code>
            <span>aggiornata il {updated}</span>
          </span>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </PageShell>
  );
}

export const legalStyles = styles;
