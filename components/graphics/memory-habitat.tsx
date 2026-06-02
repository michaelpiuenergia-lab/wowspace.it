import type { CSSProperties } from "react";
import styles from "./memory-habitat.module.css";

type Stage = {
  id: string;
  step: string;
  title: string;
  caption: string;
  rows: { label: string; value: string }[];
  className: string;
};

const stages: Stage[] = [
  {
    id: "segnali",
    step: "01",
    title: "Segnali in entrata",
    caption: "Raccolgo tutto cio che arriva, prima di chiamarlo lead.",
    rows: [
      { label: "Nuovi lead", value: "24" },
      { label: "Documenti", value: "7" },
      { label: "Richieste", value: "12" },
    ],
    className: styles.stageSignals,
  },
  {
    id: "memoria",
    step: "02",
    title: "Memoria e contesto",
    caption: "Tengo insieme storico, follow-up e dettagli che non vanno persi.",
    rows: [
      { label: "Contatti attivi", value: "318" },
      { label: "Note collegate", value: "1.2k" },
      { label: "Contesto", value: "ok" },
    ],
    className: styles.stageMemory,
  },
  {
    id: "priorita",
    step: "03",
    title: "Priorita e routing",
    caption:
      "Decido cosa conta e a chi assegnarlo, senza far rincorrere il team.",
    rows: [
      { label: "Alta priorita", value: "5" },
      { label: "Assegnati", value: "19" },
      { label: "Follow-up", value: "8" },
    ],
    className: styles.stagePriority,
  },
  {
    id: "risultato",
    step: "04",
    title: "Risultato",
    caption:
      "Esce come sito, CRM aggiornato e automazioni che lavorano da sole.",
    rows: [
      { label: "Sito", value: "live" },
      { label: "CRM", value: "sync" },
      { label: "Automazioni", value: "3" },
    ],
    className: styles.stageResult,
  },
];

const kpis = [
  { label: "Risposta media", value: "2m", fill: "82%" },
  { label: "Lead instradati", value: "94%", fill: "94%" },
  { label: "Carico operativo", value: "-37%", fill: "63%" },
];

export function MemoryHabitat() {
  return (
    <div className={styles.panel}>
      <div className={styles.glow} aria-hidden="true" />

      <header className={styles.bar}>
        <span className={styles.brand}>Wowspace</span>
        <span className={styles.runtime}>runtime · AI in azione</span>
        <span className={styles.status}>
          <i className={styles.statusDot} />
          attivo
        </span>
      </header>

      <div className={styles.flow}>
        {stages.map((stage, index) => (
          <div key={stage.id} className={styles.track}>
            <article className={`${styles.stage} ${stage.className}`}>
              <div className={styles.stageHead}>
                <span className={styles.stageStep}>{stage.step}</span>
                <span className={styles.stageTag} />
              </div>
              <h3 className={styles.stageTitle}>{stage.title}</h3>
              <p className={styles.stageCaption}>{stage.caption}</p>
              <dl className={styles.stageRows}>
                {stage.rows.map((row) => (
                  <div key={row.label} className={styles.stageRow}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            {index < stages.length - 1 ? (
              <div className={styles.connector} aria-hidden="true">
                <span className={styles.connectorLine} />
                <span className={styles.connectorPulse} />
                <span className={styles.connectorArrow} />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        {kpis.map((kpi) => (
          <div key={kpi.label} className={styles.kpi}>
            <div className={styles.kpiHead}>
              <small>{kpi.label}</small>
              <strong>{kpi.value}</strong>
            </div>
            <div className={styles.kpiBar}>
              <i style={{ "--kpi-fill": kpi.fill } as CSSProperties} />
            </div>
          </div>
        ))}
      </footer>
    </div>
  );
}
