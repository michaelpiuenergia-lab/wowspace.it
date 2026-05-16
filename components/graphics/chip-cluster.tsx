import styles from "./chip-cluster.module.css";

const nodes = [
  { id: "n1", className: styles.nodeTopLeft, title: "Offer sync", value: "armed" },
  { id: "n2", className: styles.nodeTopRight, title: "Prompt queue", value: "live" },
  { id: "n3", className: styles.nodeRight, title: "Portal auth", value: "2FA" },
  { id: "n4", className: styles.nodeBottomRight, title: "CRM graph", value: "24/7" },
  { id: "n5", className: styles.nodeBottomLeft, title: "Ops routing", value: "hot" },
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
        <strong>Cyber ops kernel</strong>
        <small>Launch surface, CRM memory, AI prompts and private runtime in one connected stack.</small>
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
