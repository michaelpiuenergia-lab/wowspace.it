import { HeroBootVideo } from "@/components/effects/hero-boot-video";
import { OffscreenPause } from "@/components/effects/offscreen-pause";
import { ProductMock } from "@/components/graphics/product-mock";
import { heroTape } from "@/lib/site-content";
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

      <HeroBootVideo stage={<ProductMock variant="dashboard" />} />

      {/* Nastro dei segnali: scorre piano, si ferma fuori schermo e in idle.
          La seconda copia serve solo alla continuità: nascosta agli screen
          reader. */}
      <div className={styles.tape} data-tape>
        <OffscreenPause target="[data-tape]" />
        <div className={styles.tapeTrack}>
          {[...heroTape, ...heroTape].map((item, index) => (
            <span
              key={`${item}-${index}`}
              aria-hidden={index >= heroTape.length || undefined}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <OffscreenPause target="[data-hero]" />
    </section>
  );
}
