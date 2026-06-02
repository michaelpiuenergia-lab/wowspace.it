"use client";

import { useEffect, useState } from "react";
import styles from "./neural-core.module.css";

const chips = [
  {
    kicker: "agent.01",
    title: "Sales brain",
    meta: "intent · score",
    cls: "chip1",
  },
  {
    kicker: "agent.02",
    title: "Ops memory",
    meta: "context · sync",
    cls: "chip2",
  },
  {
    kicker: "agent.03",
    title: "CRM neural",
    meta: "graph · 24/7",
    cls: "chip3",
  },
  {
    kicker: "agent.04",
    title: "Portal auth",
    meta: "roles · 2FA",
    cls: "chip4",
  },
] as const;

const feedRotation = [
  "neural.route lead → owner · confidence 0.92",
  "context.pool query crm.memory → 14 hit",
  "agent.summary ticket #4192 · 3 actions",
  "policy.check portal:client/3 · pass",
  "stream sales.signal → priority high",
  "embed docs/v2 → vector store · ok",
];

const TYPE_SPEED = 46;
const HOLD = 4800;
const ERASE = 24;
const PAUSE = 600;

export function NeuralCore() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"type" | "hold" | "erase" | "next">(
    "type",
  );

  const current = feedRotation[index] ?? "";

  useEffect(() => {
    if (phase === "type") {
      if (typed.length >= current.length) {
        const id = window.setTimeout(() => setPhase("hold"), HOLD);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(
        () => setTyped(current.slice(0, typed.length + 1)),
        TYPE_SPEED,
      );
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
      const id = window.setTimeout(
        () => setTyped(current.slice(0, typed.length - 1)),
        ERASE,
      );
      return () => window.clearTimeout(id);
    }
    if (phase === "next") {
      setIndex((c) => (c + 1) % feedRotation.length);
      setPhase("type");
    }
  }, [phase, typed, current]);

  const chipClassMap: Record<string, string> = {
    chip1: styles.chip1,
    chip2: styles.chip2,
    chip3: styles.chip3,
    chip4: styles.chip4,
  };

  return (
    <div className={styles.neural} aria-hidden="true">
      <div className={styles.grid} />

      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path className={styles.line} d="M14 12 Q34 36 50 50" />
        <path className={styles.line2} d="M86 14 Q66 36 50 50" />
        <path className={styles.line3} d="M14 80 Q34 64 50 50" />
        <path className={styles.line4} d="M86 80 Q66 64 50 50" />
        <path className={styles.line} d="M50 50 L50 95" />
        <path className={styles.line2} d="M14 12 L86 14" />
        <path className={styles.line3} d="M14 80 L86 80" />
      </svg>

      <div className={styles.brain}>
        <div className={styles.brainTrace} />
        <span className={styles.brainLabel}>ai · core</span>
        <strong className={styles.brainTitle}>neural runtime</strong>
      </div>

      {chips.map((chip) => (
        <article
          key={chip.kicker}
          className={`${styles.chip} ${chipClassMap[chip.cls]}`}
        >
          <span className={styles.chipKicker}>{chip.kicker}</span>
          <strong className={styles.chipTitle}>{chip.title}</strong>
          <span className={styles.chipMeta}>{chip.meta}</span>
        </article>
      ))}

      <div className={styles.feed}>
        <span className={styles.feedShell}>$</span>
        <span className={styles.feedText}>{typed}</span>
        <span className={styles.feedCursor} />
      </div>
    </div>
  );
}
