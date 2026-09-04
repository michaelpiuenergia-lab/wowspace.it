import type { CSSProperties } from "react";
import styles from "./assistant-panel.module.css";

// L'assistente AI al lavoro sui dati veri dell'azienda: domande in italiano
// (quelle che fa un imprenditore) e risposte concrete lette dal CRM,
// dall'area clienti, dalle richieste del sito. Al posto di un finto
// terminale con comandi in inglese: qui si vede COSA fa l'AI, non come
// "sembra" tecnica. Nessuno stato, nessun timer: si compone da sé con la
// CSS e la domanda successiva scorre in loop in fondo.
export type AssistantRow = {
  name: string;
  note?: string;
  tag?: string;
  tone?: "ok" | "warn" | "info";
};

export type AssistantExchange = {
  /** la domanda, come la farebbe chi lavora in azienda */
  ask: string;
  /** da dove l'assistente ha letto: "CRM · trattative", "Area clienti"… */
  source: string;
  title: string;
  rows: AssistantRow[];
  /** cosa propone di fare (propone, non decide) */
  action?: string;
};

type AssistantPanelProps = {
  title: string;
  status: string;
  exchanges: AssistantExchange[];
  /** le domande che scorrono in fondo, in loop (max 3) */
  next?: string[];
  footer?: string[];
  className?: string;
};

export function AssistantPanel({
  title,
  status,
  exchanges,
  next = [],
  footer = [],
  className = "",
}: AssistantPanelProps) {
  const queue = next.slice(0, 3);
  return (
    <div className={`${styles.panel} ${className}`.trim()}>
      <div className={styles.bar}>
        <i className={styles.live} aria-hidden="true" />
        <span className={styles.title}>{title}</span>
        <span className={styles.status}>{status}</span>
      </div>

      <ol className={styles.thread}>
        {exchanges.map((ex, i) => (
          <li
            key={ex.ask}
            className={styles.exchange}
            style={{ "--i": i } as CSSProperties}
          >
            <p className={styles.ask}>{ex.ask}</p>
            <div className={styles.answer}>
              <div className={styles.answerHead}>
                <small>{ex.source}</small>
                <strong>{ex.title}</strong>
              </div>
              <ul className={styles.rows}>
                {ex.rows.map((row) => (
                  <li key={row.name} data-tone={row.tone}>
                    <span className={styles.rowName}>{row.name}</span>
                    {row.note && (
                      <span className={styles.rowNote}>{row.note}</span>
                    )}
                    {row.tag && <em className={styles.tag}>{row.tag}</em>}
                  </li>
                ))}
              </ul>
              {ex.action && (
                <p className={styles.action}>
                  <i aria-hidden="true" />
                  {ex.action}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {queue.length > 0 && (
        <div className={styles.composer} aria-hidden="true">
          <span className={styles.typing}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.queue} data-count={queue.length}>
            {queue.map((q, i) => (
              <span key={q} style={{ "--q": i } as CSSProperties}>
                {q}
              </span>
            ))}
          </span>
        </div>
      )}

      {footer.length > 0 && (
        <div className={styles.footer}>
          {footer.map((item) => (
            <small key={item}>{item}</small>
          ))}
        </div>
      )}
    </div>
  );
}
