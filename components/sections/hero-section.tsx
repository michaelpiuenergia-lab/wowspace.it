import { HeroBootVideo } from "@/components/effects/hero-boot-video";
import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.atmos} aria-hidden="true">
        <div className={styles.glowA} />
        <div className={styles.glowB} />
        <div className={styles.floor} />
        <div className={styles.vignette} />
      </div>

      <HeroBootVideo />
    </section>
  );
}
