import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 · pagina non trovata",
  description:
    "La pagina richiesta non esiste. Torna alla home di Wowspace o guarda i servizi.",
};

export default function NotFound() {
  return (
    <div className={`section-shell ${styles.wrap}`}>
      <div className={styles.frame}>
        <span className={styles.label}>Pagina non trovata</span>
        <span className={styles.code} aria-hidden="true">
          404
        </span>
        <h1 className={styles.title}>Questa pagina non esiste.</h1>
        <p className={styles.desc}>
          L&apos;indirizzo potrebbe essere stato spostato o scritto male. Torna
          alla home, guarda i servizi, oppure scrivici: ti diciamo noi dove
          trovare quello che cerchi.
        </p>
        <div className={styles.actions}>
          <CtaLink href="/">Torna alla home</CtaLink>
          <CtaLink href="/servizi" variant="ghost">
            Vedi i servizi
          </CtaLink>
          <CtaLink href="/prenota" variant="ghost">
            Parliamone
          </CtaLink>
        </div>
      </div>
    </div>
  );
}
