"use client";

import { useEffect, type CSSProperties } from "react";
import { CtaLink } from "@/components/ui/cta-link";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { DecodeText } from "@/components/effects/decode-text";
import { KineticText } from "@/components/effects/kinetic-text";
import { openChat } from "@/components/chat/chat-widget";
import { BOOT_KEY } from "@/lib/perf-tier";
import styles from "./hero-boot-video.module.css";

// Il titolo (H1, SEO) resta una frase sola: la prima parte è il "cappello",
// la seconda è la riga grande; le ultime due parole sono in gradiente animato.
const HEADLINE_LEAD = "siti, CRM e software su misura per aziende che";
const HEADLINE_LEAD_WORDS = HEADLINE_LEAD.split(" ").length;

const SIGNALS = ["Su misura", "Made in Marche", "Assistenza diretta"];

// Hero: il nucleo AI (marchio dentro un anello di luce che ruota, con un
// satellite in orbita), la riga che si decodifica, il titolo che sale parola
// per parola, il lead, le CTA e tre segnali. Si ACCENDE in sequenza al primo
// caricamento della sessione; tutto transform/opacity, identico su mobile.
export function HeroBootVideo() {
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
      <div className={styles.core} aria-hidden="true">
        <span className={styles.halo} />
        <span className={styles.ring} />
        <span className={styles.ringInner} />
        <span className={styles.orbit}>
          <i />
        </span>
        <WowspaceLogo size={64} showWordmark={false} className={styles.mark} />
      </div>

      <DecodeText
        text="Software house · Siti · CRM · AI"
        className={styles.tagline}
      />

      <h1 className={styles.title}>
        <span className={styles.kicker}>Agenzia web nelle Marche:</span>{" "}
        <span className={styles.headline}>
          <KineticText
            text={HEADLINE_LEAD}
            wordClassName={styles.word}
            innerClassName={styles.wordInner}
          />{" "}
          <span
            className={styles.word}
            style={{ "--i": HEADLINE_LEAD_WORDS } as CSSProperties}
          >
            <span className={`${styles.wordInner} ${styles.glow}`}>
              vogliono crescere.
            </span>
          </span>
        </span>
      </h1>

      <p className={styles.lead}>
        Progettiamo siti, CRM, gestionali e automazioni AI cuciti sul tuo modo
        di lavorare. Belli da vedere, fatti per vendere.
      </p>

      <div className={styles.actions}>
        <span className={styles.ctaWrap} style={{ "--i": 0 } as CSSProperties}>
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
        <span className={styles.ctaWrap} style={{ "--i": 1 } as CSSProperties}>
          <CtaLink href="/prenota" variant="ghost">
            Prenota una call gratuita
          </CtaLink>
        </span>
      </div>

      <ul className={styles.signals}>
        {SIGNALS.map((item, index) => (
          <li key={item} style={{ "--i": index } as CSSProperties}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
