"use client";

import { useEffect, useRef, useState } from "react";
import { CtaLink } from "@/components/ui/cta-link";
import styles from "./hero-boot-video.module.css";

type Phase = "off" | "boot" | "playing" | "ended";

export function HeroBootVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("off");
  const [needsTap, setNeedsTap] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bootDelay = reduce ? 60 : 420;
    const playDelay = reduce ? 90 : 1280;

    const startVideo = () => {
      setPhase("playing");
      const video = videoRef.current;
      if (!video) return;
      video.play().catch(() => {
        // L'autoplay è stato bloccato dal browser: mostro un tasto per avviare.
        setNeedsTap(true);
      });
    };

    const t1 = window.setTimeout(() => setPhase("boot"), bootDelay);
    const t2 = window.setTimeout(startVideo, playDelay);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  const handleManualPlay = () => {
    setNeedsTap(false);
    setPhase("playing");
    videoRef.current?.play().catch(() => setNeedsTap(true));
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setPhase("playing");
    video.play().catch(() => {});
  };

  return (
    <div className={`${styles.stage} ${styles[phase]}`}>
      <div className={styles.rig}>
        <div className={styles.monitor}>
          <span className={styles.camera} aria-hidden="true" />

          <div className={styles.screen}>
            <video
              ref={videoRef}
              className={styles.video}
              muted
              playsInline
              preload="auto"
              poster="/media/hero-poster.jpg"
              onEnded={() => setPhase("ended")}
            >
              <source src="/media/hero.mp4" type="video/mp4" />
            </video>

            <span className={styles.scan} aria-hidden="true" />
            <span className={styles.vignette} aria-hidden="true" />
            <span className={styles.flash} aria-hidden="true" />

            {needsTap && (
              <button
                type="button"
                className={styles.tap}
                onClick={handleManualPlay}
                aria-label="Avvia il video"
              >
                ▶
              </button>
            )}

            {phase === "ended" && (
              <button
                type="button"
                className={styles.replay}
                onClick={handleReplay}
                aria-label="Rivedi il video"
              >
                ↺ Rivedi
              </button>
            )}

            <div className={styles.caption}>
              <span className="eyebrow">
                Wowspace // accessibile l&apos;inaccessibile
              </span>
              <h1>
                Siti web, CRM e software su misura per aziende che vogliono
                crescere.
              </h1>
              <div className={styles.actions}>
                <CtaLink href="/#contatti">Parliamo del progetto</CtaLink>
                <CtaLink href="/vetrina" variant="ghost">
                  Esplora la vetrina
                </CtaLink>
              </div>
            </div>
          </div>

          <span className={styles.chinBrand} aria-hidden="true">
            WOWSPACE
          </span>
          <span className={styles.led} aria-hidden="true" />
        </div>

        <div className={styles.stand} aria-hidden="true">
          <span className={styles.neck} />
          <span className={styles.base} />
        </div>
      </div>
    </div>
  );
}
