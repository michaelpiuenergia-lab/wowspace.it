"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Consent, ALL_OFF, parseConsent } from "@/lib/consent";
import { useFocusTrap } from "@/lib/use-focus-trap";
import styles from "./cookie-consent.module.css";

const STORAGE_KEY = "wowspace.consent.v1";
import { CONSENT_OPEN_EVENT as OPEN_EVENT } from "@/components/legal/consent-events";

function read(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    return parseConsent(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function write(consent: Consent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(
      new CustomEvent("wowspace:consent-change", { detail: consent }),
    );
  } catch {
    /* ignore */
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Dialog modale accessibile: focus intrappolato dentro e chiusura con Esc,
  // come già fanno chat e palette (stesso hook).
  useFocusTrap(modalRef, showPrefs);
  useEffect(() => {
    if (!showPrefs) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setShowPrefs(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showPrefs]);
  const [state, setState] = useState<Consent>(ALL_OFF);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = read();
    if (!existing) {
      setOpen(true);
    } else {
      setState(existing);
    }

    const handler = () => {
      const current = read();
      if (current) setState(current);
      setShowPrefs(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const persist = useCallback((next: Consent) => {
    const stamped = { ...next, updatedAt: new Date().toISOString() };
    write(stamped);
    setState(stamped);
    setOpen(false);
    setShowPrefs(false);
  }, []);

  const acceptAll = () =>
    persist({
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
      updatedAt: "",
    });

  const onlyNecessary = () =>
    persist({
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
      updatedAt: "",
    });

  const saveCustom = () => persist(state);

  if (!mounted || !open) return null;

  if (showPrefs) {
    return (
      <div
        className={styles.backdrop}
        role="dialog"
        aria-modal="true"
        aria-label="Preferenze cookie"
        onMouseDown={() => setShowPrefs(false)}
      >
        <div
          ref={modalRef}
          className={styles.modal}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHead}>
            <span className={styles.eyebrow}>cookie · preferenze</span>
            <h2>Decidi tu cosa lasciamo girare.</h2>
            <p>
              Solo i cookie necessari sono obbligatori per il funzionamento del
              sito. Tutto il resto puoi accenderlo o spegnerlo qui. Dettagli
              nella{" "}
              <Link href="/cookie" prefetch={false}>
                Cookie Policy
              </Link>
              .
            </p>
          </div>
          <div className={styles.modalBody}>
            <ConsentRow
              label="Necessari"
              tag="sempre attivi"
              description="Servono al funzionamento del sito, alla navigazione e alla memorizzazione della tua scelta sui cookie. Senza non possiamo erogare il servizio."
              checked
              locked
            />
            <ConsentRow
              label="Preferenze"
              tag="opzionale"
              description="Ricordano impostazioni di interfaccia (es. tema, lingua, layout). Non li usiamo per profilarti."
              checked={state.preferences}
              onChange={(v) => setState((s) => ({ ...s, preferences: v }))}
            />
            <ConsentRow
              label="Statistiche"
              tag="opzionale"
              description="Misurano in forma aggregata come viene usato il sito. Attivati solo se ci dai consenso, e niente strumenti che tracciano la persona."
              checked={state.analytics}
              onChange={(v) => setState((s) => ({ ...s, analytics: v }))}
            />
            <ConsentRow
              label="Marketing"
              tag="opzionale"
              description="Mai usati senza tuo consenso esplicito. Servirebbero per misurare campagne o per remarketing: oggi sono spenti per default."
              checked={state.marketing}
              onChange={(v) => setState((s) => ({ ...s, marketing: v }))}
            />
          </div>
          <div className={styles.modalFoot}>
            <button
              type="button"
              className={`${styles.btn} ${styles.ghost}`}
              onClick={onlyNecessary}
            >
              solo necessari
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.ghost}`}
              onClick={acceptAll}
            >
              accetta tutti
            </button>
            <span className={styles.spacer} />
            <button
              type="button"
              className={`${styles.btn} ${styles.primary}`}
              onClick={saveCustom}
            >
              salva scelta
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.banner} role="region" aria-label="Avviso cookie">
      <div className={styles.bannerInner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>cookie · gdpr</span>
          <h2>Cookie, dati, privacy: tutto in chiaro.</h2>
          <p>
            Usiamo cookie tecnici per far girare il sito. Tracciamo solo se ci
            dai consenso. Leggi la{" "}
            <Link href="/cookie" prefetch={false}>
              Cookie Policy
            </Link>{" "}
            e la{" "}
            <Link href="/privacy" prefetch={false}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.ghost}`}
            onClick={onlyNecessary}
          >
            solo necessari
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.primary}`}
            onClick={acceptAll}
          >
            accetta tutti
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.link}`}
            onClick={() => setShowPrefs(true)}
          >
            personalizza →
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  label,
  tag,
  description,
  checked,
  onChange,
  locked = false,
}: {
  label: string;
  tag: string;
  description: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  locked?: boolean;
}) {
  return (
    <div className={styles.row}>
      <div>
        <div className={styles.rowTop}>
          <span className={styles.rowLabel}>{label}</span>
          <span className={styles.rowTag}>{tag}</span>
        </div>
        <p>{description}</p>
      </div>
      <button
        type="button"
        className={styles.toggle}
        data-on={checked}
        data-locked={locked}
        aria-pressed={checked}
        aria-label={`${label}: ${checked ? "attivi" : "spenti"}`}
        disabled={locked}
        onClick={() => !locked && onChange?.(!checked)}
      />
    </div>
  );
}
