import styles from "./chip-cluster.module.css";

const nodes = [
  { id: "n1", className: styles.nodeTopLeft, title: "Sito", value: "online" },
  {
    id: "n2",
    className: styles.nodeTopRight,
    title: "Automazioni",
    value: "24/7",
  },
  {
    id: "n3",
    className: styles.nodeRight,
    title: "Area clienti",
    value: "sicura",
  },
  {
    id: "n4",
    className: styles.nodeBottomRight,
    title: "CRM",
    value: "attivo",
  },
  {
    id: "n5",
    className: styles.nodeBottomLeft,
    title: "Dashboard",
    value: "live",
  },
] as const;

type ChipClusterProps = {
  className?: string;
};

export function ChipCluster({ className = "" }: ChipClusterProps) {
  return (
    <div className={`${styles.cluster} ${className}`}>
      <div className={styles.field} />
      <div className={styles.ringOuter} />
      <div className={styles.ringInner} />
      <div className={styles.traceHorizontal} />
      <div className={styles.traceVertical} />
      <div className={styles.traceDiagonalLeft} />
      <div className={styles.traceDiagonalRight} />

      <div className={styles.core}>
        <div className={styles.coreGrid} />
        <span className={styles.coreLabel}>WOWSPACE</span>
        <strong>Una sola piattaforma</strong>
        <small>
          Sito, CRM, automazioni AI e area clienti che lavorano insieme.
        </small>
      </div>

      {nodes.map((node) => (
        <article key={node.id} className={`${styles.node} ${node.className}`}>
          <span>{node.title}</span>
          <strong>{node.value}</strong>
        </article>
      ))}
    </div>
  );
}
