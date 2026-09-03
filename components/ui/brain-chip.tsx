"use client";

import { useEffect, useState } from "react";
import styles from "./brain-chip.module.css";

const states = [
  {
    label: "ai · agents",
    title: "4 agenti commerciali online",
    meta: "live · 0.92",
  },
  {
    label: "ai · memory",
    title: "CRM memory · 12k ctx hits",
    meta: "sync · ok",
  },
  { label: "ai · route", title: "Lead routing armato", meta: "owner · auto" },
  { label: "ai · ops", title: "Workflow stabile", meta: "sempre attivo" },
];

export function BrainChip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((c) => (c + 1) % states.length);
    }, 5400);
    return () => window.clearInterval(id);
  }, []);

  const current = states[index] ?? states[0];

  return (
    <div className={styles.chip} role="status" aria-live="polite">
      <div className={styles.brain} aria-hidden="true">
        <div className={styles.brainTrace} />
        <div className={styles.brainCore} />
      </div>
      <div className={styles.body}>
        <span className={styles.label}>{current.label}</span>
        <strong className={styles.title}>{current.title}</strong>
      </div>
      <span className={styles.meta}>
        <span className={styles.metaDot} aria-hidden="true" />
        {current.meta}
      </span>
    </div>
  );
}
