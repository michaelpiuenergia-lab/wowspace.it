import styles from "./ambient-engine.module.css";

const particles = Array.from({ length: 16 }, (_, index) => ({
  id: `p-${index}`,
  className: styles[`particle${(index % 4) + 1}` as keyof typeof styles] ?? "",
}));

export function AmbientEngine() {
  return (
    <div className={styles.engine} aria-hidden="true">
      <div className={styles.orbA} />
      <div className={styles.orbB} />
      <div className={styles.orbC} />
      <div className={styles.beamA} />
      <div className={styles.beamB} />
      <div className={styles.ring} />
      <div className={styles.ringInner} />

      <div className={styles.sideRailLeft}>
        <i />
      </div>
      <div className={styles.sideRailRight}>
        <i />
      </div>

      <div className={styles.field}>
        {particles.map((particle, index) => (
          <span
            key={particle.id}
            className={`${styles.particle} ${particle.className}`}
            style={{
              left: `${8 + ((index * 11) % 84)}%`,
              animationDelay: `${index * 0.35}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
