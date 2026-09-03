"use client";

import { useEffect, type CSSProperties, type ReactNode } from "react";
import { CtaLink } from "@/components/ui/cta-link";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { DecodeText } from "@/components/effects/decode-text";
import { KineticText } from "@/components/effects/kinetic-text";
import { openChat } from "@/components/chat/chat-widget";
import { BOOT_KEY } from "@/lib/perf-tier";
import styles from "./hero-boot-video.module.css";

const HEADLINE =
  "Agenzia web nelle Marche: siti, CRM e software su misura per aziende che vogliono crescere.";

// Hero "aperto": logo, titolo e CTA direttamente sulla nebulosa globale, senza
// cornice/monitor né campo stellare interno (lo fornisce già <NebulaField />).
// Al caricamento si ACCENDE in sequenza (vedi il CSS): il marchio si posa, la
// riga servizi si decodifica, il titolo sale parola per parola, le CTA
// appaiono. Tutto CSS/transform tranne la decodifica (un nodo di testo).
type HeroBootVideoProps = {
  /** il prodotto "in scena" sotto le CTA (reso dal server, es. ProductMock) */
  stage?: ReactNode;
};

export function HeroBootVideo({ stage }: HeroBootVideoProps) {
  // La sequenza si vede UNA volta per sessione: finita (≈2s), segniamo la
  // sessione e mettiamo data-booted su <html>, così tornando in home (anche
  // con navigazione client) il titolo è subito lì. Lo script inline del layout
  // rimette l'attributo prima del paint ai caricamenti successivi.
  useEffect(() => {
    const root = document.documentElement;
    if (root.hasAttribute("data-booted")) return;
    const timer = window.setTimeout(() => {
      root.setAttribute("data-booted", "");
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        /* storage bloccato: l'intro si ripeterà, nessun danno */
      }
    }, 2400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={styles.hero}>
      {/* Niente wordmark "Wowspace" qui: c'è già nell'header a due dita di
          distanza — il marchio esagonale + la riga servizi bastano. */}
      <div className={styles.brand}>
        <WowspaceLogo
          size={64}
          showWordmark={false}
          className={styles.endMark}
        />
        <DecodeText
          text="Siti · CRM · Gestionali · Automazioni AI"
          className={styles.endTagline}
        />
      </div>

      <div className={styles.caption}>
        <h1 className={styles.title}>
          <KineticText
            text={HEADLINE}
            wordClassName={styles.word}
            innerClassName={styles.wordInner}
          />
        </h1>
        <div className={styles.actions}>
          <span
            className={styles.ctaWrap}
            style={{ "--i": 0 } as CSSProperties}
          >
            <CtaLink
              href="/#contatti"
              onClick={(e) => {
                e.preventDefault();
                openChat();
              }}
            >
              Parliamo del progetto
            </CtaLink>
          </span>
          <span
            className={styles.ctaWrap}
            style={{ "--i": 1 } as CSSProperties}
          >
            <CtaLink href="/prenota" variant="ghost">
              Prenota una call gratuita
            </CtaLink>
          </span>
        </div>
      </div>

      {/* Il prodotto in scena: la dashboard fluttua in prospettiva sotto le
          CTA e si raddrizza mentre scorri (scroll-driven). È ciò che
          costruiamo, mostrato invece che raccontato. */}
      {stage && (
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.stageGlow} />
          <div className={styles.stageMock}>{stage}</div>
        </div>
      )}
    </div>
  );
}
