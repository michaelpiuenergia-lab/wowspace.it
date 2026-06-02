"use client";

import { useEffect, useState } from "react";
import styles from "./live-system-bar.module.css";

const events = [
  "deploy://edge stable",
  "crm.sync 24/7",
  "ai.agent armed",
  "portal.auth · 2FA",
  "lead.route ok",
  "memory persist",
];

const TYPE_SPEED = 50;
const HOLD = 4500;
const ERASE_SPEED = 28;
const PAUSE = 600;

export function LiveSystemBar() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "erase" | "next">(
    "type",
  );

  const current = events[index] ?? "";

  useEffect(() => {
    if (phase === "type") {
      if (typed.length >= current.length) {
        const id = window.setTimeout(() => setPhase("hold"), HOLD);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => {
        setTyped(current.slice(0, typed.length + 1));
      }, TYPE_SPEED);
      return () => window.clearTimeout(id);
    }

    if (phase === "hold") {
      const id = window.setTimeout(() => setPhase("erase"), 500);
      return () => window.clearTimeout(id);
    }

    if (phase === "erase") {
      if (typed.length === 0) {
        const id = window.setTimeout(() => setPhase("next"), PAUSE);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => {
        setTyped(current.slice(0, typed.length - 1));
      }, ERASE_SPEED);
      return () => window.clearTimeout(id);
    }

    if (phase === "next") {
      setIndex((c) => (c + 1) % events.length);
      setPhase("type");
    }
  }, [phase, typed, current]);

  return (
    <aside className={styles.bar} aria-live="polite">
      <span className={styles.indicator} aria-hidden="true" />
      <span className={styles.label}>live</span>
      <span className={styles.value}>{typed}</span>
    </aside>
  );
}
