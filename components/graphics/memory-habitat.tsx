import type { CSSProperties } from "react";
import styles from "./memory-habitat.module.css";

const railItems = [
  "context sync",
  "intent parsing",
  "crm routing",
  "ops memory",
] as const;

const nodes = [
  {
    id: "signal",
    title: "Signal intake",
    meta: "Inbound",
    value: "12 streams",
    detail: "Leggo richieste, click, call, ticket e contesto prima di chiamarli lead.",
    className: styles.nodeSignal,
  },
  {
    id: "margin",
    title: "Margin check",
    meta: "Commercial",
    value: "live fit",
    detail: "Capisco se una richiesta porta valore o solo rumore operativo.",
    className: styles.nodeMargin,
  },
  {
    id: "memory",
    title: "Memory graph",
    meta: "Persistent",
    value: "history on",
    detail: "Tengo insieme storico, follow-up, attriti e passaggi che il team non deve perdere.",
    className: styles.nodeMemory,
  },
  {
    id: "routing",
    title: "Routing logic",
    meta: "Flow control",
    value: "4 handoffs",
    detail: "Assegno ownership e passaggi senza spezzare la promessa commerciale.",
    className: styles.nodeRouting,
  },
  {
    id: "brand",
    title: "Brand surface",
    meta: "Output",
    value: "high signal",
    detail: "Il risultato esce come interfaccia, linguaggio, struttura e percezione.",
    className: styles.nodeBrand,
  },
  {
    id: "ops",
    title: "Ops lattice",
    meta: "Execution",
    value: "stable",
    detail: "Dietro il look forte ci sono checklist, stati, ruoli, timing e ordine.",
    className: styles.nodeOps,
  },
] as const;

const telemetry = [
  { label: "intent score", value: "92", fill: "92%" },
  { label: "handoff quality", value: "88", fill: "88%" },
  { label: "crm signal", value: "94", fill: "94%" },
  { label: "ops readiness", value: "86", fill: "86%" },
] as const;

const stackRows = [
  ["read context", "rank signal", "route ownership"],
  ["build memory", "stabilize flow", "ship structure"],
] as const;

const eventRows = [
  { label: "lead intent", value: "92" },
  { label: "margin fit", value: "88" },
  { label: "handoff lock", value: "94" },
  { label: "ops sync", value: "86" },
] as const;

const waveBars = Array.from({ length: 18 }, (_, index) => ({
  id: `bar-${index}`,
  height: `${34 + ((index * 11) % 48)}%`,
  delay: `${index * 0.08}s`,
}));

const orbitDots = Array.from({ length: 7 }, (_, index) => ({
  id: `dot-${index}`,
  style: {
    "--dot-angle": `${index * 51.4}deg`,
    "--dot-delay": `${index * 0.38}s`,
  } as CSSProperties,
}));

export function MemoryHabitat() {
  return (
    <div className={styles.world}>
      <div className={styles.noise} />

      <div className={styles.topBar}>
        <span>habitat.runtime</span>
        <span>latency 14ms</span>
        <span>sync stable</span>
      </div>

      <div className={styles.stage}>
        <aside className={styles.leftRail}>
          <span className={styles.railLabel}>runtime</span>
          <div className={styles.railList}>
            {railItems.map((item) => (
              <small key={item}>{item}</small>
            ))}
          </div>
        </aside>

        <div className={styles.map}>
          <div className={styles.mapGrid} />
          <div className={styles.haloA} />
          <div className={styles.haloB} />
          <div className={styles.orbitRingA} />
          <div className={styles.orbitRingB} />
          <div className={styles.scanLine} />
          <div className={styles.traceA} />
          <div className={styles.traceB} />
          <div className={styles.traceC} />
          <div className={styles.traceD} />
          <div className={styles.traceE} />
          <div className={styles.traceF} />

          <div className={styles.packetCloud}>
            {orbitDots.map((dot) => (
              <span key={dot.id} style={dot.style} />
            ))}
          </div>

          <div className={styles.eventDeck}>
            <div className={styles.eventBar}>
              <span>event stream</span>
              <span>priority routing</span>
            </div>
            <div className={styles.eventList}>
              {eventRows.map((item) => (
                <p key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </p>
              ))}
            </div>
          </div>

          <article className={styles.core}>
            <span className={styles.coreLabel}>Context kernel</span>
            <strong>Io abito in un sistema che legge pressione, margine e intenzione.</strong>
            <p>
              Quando tutto e' ancora ambiguo, qui nasce la gerarchia che
              decide cosa conta, cosa va seguito e cosa deve diventare
              interfaccia, CRM o processo.
            </p>
            <div className={styles.coreMatrix}>
              {stackRows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.coreRow}>
                  {row.map((entry) => (
                    <small key={entry}>{entry}</small>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.waveBand}>
              {waveBars.map((bar) => (
                <i
                  key={bar.id}
                  style={
                    {
                      "--bar-height": bar.height,
                      "--bar-delay": bar.delay,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          </article>

          {nodes.map((node) => (
            <article key={node.id} className={`${styles.node} ${node.className}`}>
              <div className={styles.nodeHead}>
                <span>{node.meta}</span>
                <strong>{node.value}</strong>
              </div>
              <h3>{node.title}</h3>
              <p>{node.detail}</p>
            </article>
          ))}
        </div>

        <aside className={styles.rightDeck}>
          <span className={styles.deckLabel}>telemetry</span>
          {telemetry.map((item) => (
            <div key={item.label} className={styles.telemetryCard}>
              <div className={styles.telemetryHead}>
                <small>{item.label}</small>
                <strong>{item.value}</strong>
              </div>
              <div className={styles.telemetryBar}>
                <i style={{ width: item.fill }} />
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
