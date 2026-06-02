"use client";

import { useEffect } from "react";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./error.module.css";

// Error boundary di route: cattura gli errori runtime dei segmenti sotto il
// root layout ed evita la pagina bianca in produzione. Lascia intatti header e
// footer (è renderizzato dentro <main>).
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In produzione qui si potrebbe inoltrare a un servizio di monitoraggio.
    console.error(error);
  }, [error]);

  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <span className={styles.tag}>errore</span>
        <h1 className={styles.title}>Qualcosa è andato storto.</h1>
        <p className={styles.body}>
          Si è verificato un problema imprevisto. Riprova: spesso si risolve da
          solo. Se persiste, scrivici e lo sistemiamo.
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.retry}
            onClick={() => reset()}
          >
            Riprova
          </button>
          <CtaLink href="/" variant="ghost" compact>
            Torna alla home
          </CtaLink>
        </div>
        {error.digest ? (
          <p className={styles.digest}>rif. {error.digest}</p>
        ) : null}
      </div>
    </section>
  );
}
