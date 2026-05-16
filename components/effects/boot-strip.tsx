"use client";

import { useEffect, useState } from "react";
import styles from "./boot-strip.module.css";

const sequence = [
  "wowspace --init --target=brand --layer=ai+crm",
  "deploy site --runtime=next --edge=on --tone=premium",
  "mount client-area --auth=2fa --roles=team,client",
  "sync crm --pipeline=open --owner=auto --memory=on",
  "spawn agent --context=docs --route=sales --confidence=high",
];

const metaCycle = [
  "system online",
  "edge stable",
  "latency 38ms",
  "build 24.05 • live",
];

const TYPE_SPEED = 48;
const HOLD_AFTER_TYPE = 4200;
const HOLD_AFTER_DELETE = 700;

export function BootStrip() {
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "pause">(
    "typing",
  );
  const [cmdIndex, setCmdIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [metaIndex, setMetaIndex] = useState(0);

  const command = sequence[cmdIndex] ?? "";

  useEffect(() => {
    if (phase === "typing") {
      if (typed.length >= command.length) {
        const id = window.setTimeout(() => setPhase("holding"), HOLD_AFTER_TYPE);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => {
        setTyped(command.slice(0, typed.length + 1));
      }, TYPE_SPEED);
      return () => window.clearTimeout(id);
    }

    if (phase === "holding") {
      const id = window.setTimeout(() => setPhase("deleting"), 600);
      return () => window.clearTimeout(id);
    }

    if (phase === "deleting") {
      if (typed.length === 0) {
        const id = window.setTimeout(() => setPhase("pause"), HOLD_AFTER_DELETE);
        return () => window.clearTimeout(id);
      }
      const id = window.setTimeout(() => {
        setTyped(command.slice(0, typed.length - 1));
      }, 26);
      return () => window.clearTimeout(id);
    }

    if (phase === "pause") {
      const id = window.setTimeout(() => {
        setCmdIndex((current) => (current + 1) % sequence.length);
        setPhase("typing");
      }, 220);
      return () => window.clearTimeout(id);
    }
  }, [phase, typed, command]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMetaIndex((current) => (current + 1) % metaCycle.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, []);

  const ghost = command.slice(typed.length);

  return (
    <div className={styles.strip} role="status" aria-live="polite">
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.tag}>boot</span>
      <span className={styles.shell}>$</span>
      <span className={styles.typed}>{typed}</span>
      <span className={styles.ghost}>{ghost}</span>
      <span className={styles.cursor} aria-hidden="true" />
      <span className={styles.meta}>
        <span>{metaCycle[metaIndex]}</span>
      </span>
    </div>
  );
}
