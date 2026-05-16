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

  const current = modes.find((item) => item.id === mode) ?? modes[0];

  return (
    <div className={`panel ${styles.console}`}>
      <div className={styles.topBar}>
        <span className={styles.live}>Secure auth</span>
        <span className={styles.status}>Sync active</span>
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

      <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
        <label>
          Business email
          <input
            type="email"
            placeholder="team@azienda.it"
            autoComplete="email"
          />
        </label>

        <label>
          {mode === "login" ? "Password" : "Nome del portale"}
          <input
            type={mode === "login" ? "password" : "text"}
            placeholder={mode === "login" ? "••••••••" : "CRM / Support / Academy"}
            autoComplete={mode === "login" ? "current-password" : "organization"}
          />
        </label>

        {mode === "register" ? (
          <label>
            Team coinvolti
            <input type="text" placeholder="Sales, Support, Operations" />
          </label>
        ) : null}

        <button type="submit" className={styles.submit}>
          {current.cta}
        </button>
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

