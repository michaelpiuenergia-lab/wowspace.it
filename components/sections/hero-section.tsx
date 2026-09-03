import { HeroBootVideo } from "@/components/effects/hero-boot-video";
import { OffscreenPause } from "@/components/effects/offscreen-pause";
import styles from "./hero-section.module.css";

// Hero: un "nucleo AI" vivo (aurora di luce che respira, anello che ruota
// attorno al marchio) e un titolo grande. Niente prodotto in scena: la prima
// schermata è identità, non catalogo. Sta in una schermata su ogni formato.
export function HeroSection() {
  return (
    <section className={styles.section} data-hero>
      <div className={styles.atmos} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orbA}`} />
        <div className={`${styles.orb} ${styles.orbB}`} />
        <div className={`${styles.orb} ${styles.orbC}`} />
        <div className={`${styles.orb} ${styles.orbD}`} />
        <div className={styles.horizon} />
        <div className={styles.vignette} />
      </div>

      <HeroBootVideo />
      <OffscreenPause target="[data-hero]" />
    </section>
  );
}
