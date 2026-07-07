"use client";

import { CtaLink } from "@/components/ui/cta-link";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { openChat } from "@/components/chat/chat-widget";
import styles from "./hero-boot-video.module.css";

// Hero "aperto": logo, titolo e CTA direttamente sulla nebulosa globale, senza
// cornice/monitor né campo stellare interno (lo fornisce già <NebulaField />).
export function HeroBootVideo() {
  return (
    <div className={styles.hero}>
      <div className={styles.brand}>
        <WowspaceLogo
          size={64}
          showWordmark={false}
          className={styles.endMark}
        />
        <span className={styles.endWordmark}>Wowspace</span>
        <span className={styles.endTagline}>
          Siti · CRM · Gestionali · Automazioni AI
        </span>
      </div>

      <div className={styles.caption}>
        <h1>
          Agenzia web nelle Marche: siti, CRM e software su misura per aziende
          che vogliono crescere.
        </h1>
        <div className={styles.actions}>
          <CtaLink
            href="/#contatti"
            onClick={(e) => {
              e.preventDefault();
              openChat();
            }}
          >
            Parliamo del progetto
          </CtaLink>
          <CtaLink href="/vetrina" variant="ghost">
            Esplora la vetrina
          </CtaLink>
        </div>
      </div>
    </div>
  );
}
