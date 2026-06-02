import styles from "./loading.module.css";

// Fallback di caricamento a livello root: skeleton minimale e sobrio coerente
// col tema scuro, mostrato durante le transizioni/render lenti.
export default function Loading() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>Carico…</span>
    </div>
  );
}
