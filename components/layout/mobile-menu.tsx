"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { openChat } from "@/components/chat/chat-widget";
import { WowspaceLogo } from "@/components/brand/wowspace-logo";
import { navLinks, navPlanetHue, routeIndex } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";
import { useFocusTrap } from "@/lib/use-focus-trap";
import styles from "./mobile-menu.module.css";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

// Menu a tutto schermo per telefono e tablet: le pagine come pianeti (stessa
// tinta della galassia), poi l'azione principale, l'assistente AI e i
// contatti diretti. Portal sul body: sta sopra a tutto (chat, cookie).
// Esc chiude, il focus resta dentro, lo scroll della pagina si blocca.
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // primo elemento utile a fuoco (il bottone di chiusura)
    panelRef.current
      ?.querySelector<HTMLElement>("button, a")
      ?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={panelRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Menu di navigazione"
    >
      <div className={styles.aurora} aria-hidden="true">
        <span className={styles.orbA} />
        <span className={styles.orbB} />
      </div>

      <div className={styles.top}>
        <Link href="/" className={styles.brand} onClick={onClose}>
          <WowspaceLogo size={38} />
        </Link>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Chiudi il menu"
        >
          ✕
        </button>
      </div>

      <nav className={styles.list} aria-label="Pagine">
        {navLinks.map((link, index) => {
          const info = routeIndex[link.href];
          const hue = navPlanetHue[link.href] ?? 200;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={styles.item}
              style={{ "--i": index, "--hue": hue } as CSSProperties}
              onClick={onClose}
            >
              <span className={styles.planet} aria-hidden="true" />
              <span className={styles.itemText}>
                <span className={styles.itemName}>{link.label}</span>
                {info ? (
                  <span className={styles.itemMeta}>{info.meta}</span>
                ) : null}
              </span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </Link>
          );
        })}
        <Link
          href="/accesso"
          className={`${styles.item} ${styles.itemSoft}`}
          style={{ "--i": navLinks.length, "--hue": 200 } as CSSProperties}
          onClick={onClose}
        >
          <span className={styles.planet} aria-hidden="true" />
          <span className={styles.itemText}>
            <span className={styles.itemName}>Area clienti</span>
            <span className={styles.itemMeta}>
              Il portale privato per i clienti
            </span>
          </span>
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        </Link>
      </nav>

      <div
        className={styles.actions}
        style={{ "--i": navLinks.length + 1 } as CSSProperties}
      >
        <Link href="/prenota" className={styles.primary} onClick={onClose}>
          Prenota una call gratuita
        </Link>
        <button
          type="button"
          className={styles.assistant}
          onClick={() => {
            onClose();
            openChat();
          }}
        >
          <span className={styles.orb} aria-hidden="true" />
          Parla con l&apos;Assistente AI
        </button>
        <p className={styles.contacts}>
          <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </p>
      </div>
    </div>,
    document.body,
  );
}
