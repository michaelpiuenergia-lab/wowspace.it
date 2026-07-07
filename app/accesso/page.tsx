import type { Metadata } from "next";
import { AuthConsole } from "@/components/auth/auth-console";
import { NebulaField } from "@/components/effects/nebula-field";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Area clienti",
  description:
    "Accesso premium per clienti, team e venditori: login elegante, dashboard private, CRM e automazioni AI. Richiedi una demo dell'area riservata Wowspace.",
  alternates: { canonical: "/accesso" },
  // Pagina utile agli utenti ma non una landing SEO: la teniamo fuori
  // dall'indice (follow attivo per non disperdere il link equity).
  robots: { index: false, follow: true },
  openGraph: {
    title: "Area clienti · Wowspace",
    description:
      "Login, dashboard private, CRM e automazioni AI: l'area riservata su misura di Wowspace.",
    url: "/accesso",
  },
};

export default function AccessPage() {
  return (
    <section className={styles.page}>
      <NebulaField />
      <div className={styles.backdrop} />
      <div className={styles.copy}>
        <span className={styles.eyebrow}>
          Area clienti // secure experience
        </span>
        <h1>Un accesso premium per clienti, team e venditori.</h1>
        <p>
          La stessa cura che mettiamo nella vetrina la portiamo dentro i flussi
          riservati: login elegante, onboarding pulito, dati organizzati e CRM
          pronti a lavorare con automazioni AI.
        </p>
        <div className={styles.actions}>
          <CtaLink href="/" variant="ghost">
            Torna alla home
          </CtaLink>
          <CtaLink href="/#contatti">Richiedi una demo</CtaLink>
        </div>
        <ul className={styles.signalList}>
          <li>Autenticazione e ruoli personalizzati</li>
          <li>Dashboard private per clienti e collaboratori</li>
          <li>Automazioni per lead, ticket e follow-up</li>
        </ul>
      </div>
      <div className={styles.console}>
        <AuthConsole />
      </div>
    </section>
  );
}
