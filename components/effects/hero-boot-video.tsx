"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
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

// Passi di adattamento della dashboard su schermi stretti: zoom via via più
// piccolo con impaginazione più larga (layout da desktop in miniatura), così
// la scena entra sempre tutta nella prima schermata, mai tagliata a metà.
const FIT_ZOOMS = [0.5, 0.42, 0.36, 0.3, 0.25];

export function HeroBootVideo({ stage }: HeroBootVideoProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  // "Una pagina": la dashboard deve stare sopra la piega. Misuriamo lo spazio
  // tra la scena e il nastro in fondo all'hero e scegliamo zoom/larghezza.
  // Su desktop basta ridurre lo zoom; su telefono usiamo il layout largo in
  // miniatura. Rifatto al resize (rotazione, finestra ridimensionata).
  useEffect(() => {
    const stageEl = stageRef.current;
    const scaleEl = scaleRef.current;
    if (!stageEl || !scaleEl) return;
    const hero = stageEl.closest<HTMLElement>("[data-hero]");
    if (!hero) return;
    const tape = hero.querySelector<HTMLElement>("[data-tape]");

    // Larghezza in px, non in %: sotto zoom una larghezza in % resta uguale
    // (si adatta al contenitore), mentre una in px viene ridotta davvero.
    const apply = (widthPx: number, z: number) => {
      scaleEl.style.setProperty("--stage-px", `${Math.round(widthPx)}px`);
      scaleEl.style.setProperty("--stage-zoom", z.toFixed(3));
    };
    // Geometria di LAYOUT (offsetTop), non getBoundingClientRect: durante la
    // sequenza di accensione gli elementi sono traslati e le misure a schermo
    // mentirebbero (la dashboard risultava 48px più in basso di dov'è).
    const stageTop = () => {
      let y = 0;
      let el: HTMLElement | null = stageEl;
      while (el && el !== hero) {
        y += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      return y;
    };
    const available = () => {
      const tapeH = tape ? tape.offsetHeight : 0;
      // ciò che sta sotto la scena dentro il blocco hero (padding, margini)
      const block = stageEl.parentElement as HTMLElement;
      const afterStage =
        block.offsetHeight - stageEl.offsetTop - stageEl.offsetHeight;
      return window.innerHeight - stageTop() - afterStage - tapeH - 4;
    };
    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));
    const fit = () => {
      const containerW = stageEl.clientWidth;
      apply(containerW, 1);
      const natural = scaleEl.getBoundingClientRect().height;
      if (natural <= available()) return;
      if (window.innerWidth >= 900) {
        // desktop: stessa impaginazione, solo più piccola (mai sotto 0.3)
        let z = clamp(available() / natural, 0.3, 1);
        apply(containerW, z);
        // il contenuto si ricentra: seconda passata con le misure vere
        const h = scaleEl.getBoundingClientRect().height;
        const av = available();
        if (h > av) {
          z = clamp((z * av) / h, 0.3, 1);
          apply(containerW, z);
        }
        return;
      }
      // telefono: impaginata larga (containerW / z) e rimpicciolita di z →
      // occupa sempre tutta la larghezza, ma è più bassa
      for (const z of FIT_ZOOMS) {
        apply(containerW / z, z);
        if (scaleEl.getBoundingClientRect().height <= available()) return;
      }
    };

    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(fit, 120);
    };
    fit();
    // i font cambiano le altezze del testo sopra: rimisuriamo quando ci sono
    document.fonts?.ready.then(fit).catch(() => {});
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

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
        <div ref={stageRef} className={styles.stage} aria-hidden="true">
          <div className={styles.stageGlow} />
          <div ref={scaleRef} className={styles.stageScale}>
            <div className={styles.stageMock}>{stage}</div>
          </div>
        </div>
      )}
    </div>
  );
}
