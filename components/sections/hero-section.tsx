import { HeroBootVideo } from "@/components/effects/hero-boot-video";
import { OffscreenPause } from "@/components/effects/offscreen-pause";
import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section className={styles.section} data-hero>
      <div className={styles.atmos} aria-hidden="true">
        <div className={styles.glowA} />
        <div className={styles.glowB} />
        <div className={styles.glowC} />
        {/* pavimento 3D: la griglia interna scorre verso chi guarda */}
        <div className={styles.floor}>
          <div className={styles.floorGrid} />
        </div>
        <div className={styles.horizon} />
        <div className={styles.vignette} />
      </div>

      <HeroBootVideo />
      <OffscreenPause target="[data-hero]" />
    </section>
  );
}
