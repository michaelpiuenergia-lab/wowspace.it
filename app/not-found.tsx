import type { Metadata } from "next";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 · rotta non trovata",
  description: "La rotta richiesta non esiste. Torna alla base di Wowspace.",
};

export default function NotFound() {
  return (
    <div className={`section-shell ${styles.wrap}`}>
      <div className={styles.frame}>
        <span className={styles.label}>signal lost</span>
        <span className={styles.code} aria-hidden="true">
          404
        </span>
        <h1 className={styles.title}>Questa rotta non e' montata.</h1>
        <p className={styles.desc}>
          Forse l'URL e' stato spostato, scritto male, oppure stiamo ancora
          costruendola. Torna alla base o usa la palette comandi.
        </p>
        <div className={styles.terminal}>
          <div>
            <span>root@wowspace:~$</span> <code>cat /var/log/wowspace.err</code>
          </div>
          <div>
            <em>ENOENT</em> <code>route not found in manifest</code>
          </div>
          <div>
            <span>root@wowspace:~$</span> <code>cd /</code>
          </div>
        </div>
        <div className={styles.actions}>
          <CtaLink href="/">Torna alla home</CtaLink>
          <CtaLink href="/servizi" variant="ghost">
            Vedi servizi
          </CtaLink>
        </div>
      </div>
    </div>
  );
}
