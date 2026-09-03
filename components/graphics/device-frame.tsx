import type { ReactNode } from "react";
import styles from "./device-frame.module.css";

// Cornici di dispositivi (solo CSS): un portatile e un telefono. Dentro ci
// va una schermata (ProductMock, PhoneScreen): così i prodotti si vedono
// "in mano", come in una foto di prodotto, senza una sola immagine.
export function DeviceFrame({
  kind,
  children,
  className = "",
}: {
  kind: "laptop" | "phone";
  children: ReactNode;
  className?: string;
}) {
  if (kind === "phone") {
    return (
      <div className={`${styles.phone} ${className}`.trim()} aria-hidden="true">
        <span className={styles.island} />
        <div className={styles.phoneScreen}>{children}</div>
      </div>
    );
  }
  return (
    <div className={`${styles.laptop} ${className}`.trim()} aria-hidden="true">
      <div className={styles.lid}>
        <span className={styles.camera} />
        <div className={styles.laptopScreen}>{children}</div>
      </div>
      <div className={styles.base}>
        <span className={styles.notch} />
      </div>
    </div>
  );
}

export type PhoneScreenVariant = "notify" | "chat";

const NOTES: Record<
  "site" | "erp",
  { title: string; body: string; when: string }[]
> = {
  site: [
    {
      title: "Nuova richiesta dal sito",
      body: "Rossi Costruzioni · preventivo",
      when: "adesso",
    },
    {
      title: "Call prenotata",
      body: "Giovedì 10:30 · Studio Bianchi",
      when: "2 min",
    },
    {
      title: "Lead assegnato a Marco",
      body: "Caffè Centrale · sito + CRM",
      when: "9 min",
    },
  ],
  erp: [
    {
      title: "Commessa #1042 chiusa",
      body: "Officine Po · € 19.500",
      when: "adesso",
    },
    {
      title: "Fattura inviata",
      body: "Verdi & Co. · scadenza 30 gg",
      when: "5 min",
    },
    {
      title: "Magazzino sotto scorta",
      body: "Profili alluminio · 12 pz",
      when: "18 min",
    },
  ],
};

// La schermata del telefono: notifiche che arrivano (l'azienda che gira
// anche quando non sei alla scrivania) oppure la chat con l'assistente.
export function PhoneScreen({
  variant,
  notes = "site",
}: {
  variant: PhoneScreenVariant;
  notes?: "site" | "erp";
}) {
  return (
    <div className={styles.screen}>
      <div className={styles.status}>
        <span>9:41</span>
        <span className={styles.signal}>
          <i />
          <i />
          <i />
          <b />
        </span>
      </div>
      <div className={styles.appHead}>
        <span className={styles.appLogo} />
        <span className={styles.appName}>Wowspace</span>
        <span className={styles.appDot} />
      </div>
      {variant === "chat" ? (
        <div className={styles.chat}>
          <p className={styles.bubbleIn}>
            Quanti preventivi aperti questa settimana?
          </p>
          <p className={styles.bubbleOut}>
            Sette, per € 61.300. Tre scadono venerdì: te li mando in ordine di
            valore?
          </p>
          <p className={styles.bubbleIn}>Sì, e prepara i follow-up.</p>
          <span className={styles.typing}>
            <i />
            <i />
            <i />
          </span>
        </div>
      ) : (
        <div className={styles.notes}>
          {NOTES[notes].map((n, i) => (
            <div
              key={n.title}
              className={styles.note}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.noteIcon} />
              <span className={styles.noteText}>
                <strong>{n.title}</strong>
                <span>{n.body}</span>
              </span>
              <em>{n.when}</em>
            </div>
          ))}
          <div className={styles.kpi}>
            <strong>+18%</strong>
            <span>richieste questo mese</span>
          </div>
        </div>
      )}
    </div>
  );
}
