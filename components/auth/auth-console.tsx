"use client";

import { useState } from "react";
import styles from "./auth-console.module.css";

const modes = [
  {
    id: "login",
    label: "Accesso",
    title: "Bentornato nel tuo cockpit digitale",
    description:
      "Entra nell'area clienti per consultare lead, ticket, commesse e performance in un unico punto.",
    cta: "Accedi al workspace",
  },
  {
    id: "register",
    label: "Invito",
    title: "Attiva un portale che fa salire il livello",
    description:
      "Onboarding clienti, collaboratori o rete vendita con flussi guidati e ruoli cuciti sul business.",
    cta: "Richiedi l'attivazione",
  },
] as const;

type ModeId = (typeof modes)[number]["id"];

export function AuthConsole() {
  const [mode, setMode] = useState<ModeId>("login");
  const [submitted, setSubmitted] = useState(false);

  const current = modes.find((item) => item.id === mode) ?? modes[0];

  return (
    <div className={`panel ${styles.console}`}>
      {/* Etichetta demo esplicita: nessuno deve credere che sia un login vero
          (né inserirci credenziali reali). */}
      <div className={styles.topBar}>
        <span className={styles.live}>Demo</span>
        <span className={styles.status}>Interfaccia dimostrativa</span>
      </div>

      <div className={styles.tabRow}>
        {modes.map((item) => (
          <button
            key={item.id}
            type="button"
            className={mode === item.id ? styles.activeTab : styles.tab}
            onClick={() => setMode(item.id)}
            aria-pressed={mode === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={styles.hero}>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
      </div>

      {/* form solo DIMOSTRATIVO: niente autocomplete / password manager, così non
          mostra mai credenziali salvate del browser (autofill). */}
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        autoComplete="off"
      >
        <label>
          Business email
          <input
            type="text"
            inputMode="email"
            name="ws-demo-contact"
            placeholder="team@azienda.it"
            autoComplete="off"
            readOnly
            onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
            data-1p-ignore="true"
            data-lpignore="true"
            data-form-type="other"
          />
        </label>

        <label>
          {mode === "login" ? "Password" : "Nome del portale"}
          <input
            type={mode === "login" ? "password" : "text"}
            name="ws-demo-secret"
            placeholder={
              mode === "login" ? "••••••••" : "CRM / Support / Academy"
            }
            autoComplete="off"
            readOnly
            onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
            data-1p-ignore="true"
            data-lpignore="true"
            data-form-type="other"
          />
        </label>

        {mode === "register" ? (
          <label>
            Team coinvolti
            <input
              type="text"
              name="ws-demo-teams"
              placeholder="Sales, Support, Operations"
              autoComplete="off"
              readOnly
              onFocus={(e) => e.currentTarget.removeAttribute("readonly")}
              data-1p-ignore="true"
              data-lpignore="true"
            />
          </label>
        ) : null}

        <button type="submit" className={styles.submit}>
          {current.cta}
        </button>

        {submitted && (
          <p className={styles.demoNote} role="status">
            Questa è una demo: l&apos;area clienti la costruiamo su misura per
            ogni azienda. <a href="/prenota">Parliamone in una call gratuita</a>
            .
          </p>
        )}
      </form>

      <div className={styles.meta}>
        <div>
          <strong>2FA</strong>
          <span>Ruoli, permessi e sicurezza centralizzati</span>
        </div>
        <div>
          <strong>AI</strong>
          <span>Assistenti operativi dentro CRM, ticket e report</span>
        </div>
      </div>
    </div>
  );
}
