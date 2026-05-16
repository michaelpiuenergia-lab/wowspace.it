"use client";

import { openCommandPalette } from "@/components/effects/command-palette";
import styles from "./nav-mobile-trigger.module.css";

export function NavMobileTrigger() {
  return (
    <button
      type="button"
      onClick={() => openCommandPalette()}
      className={styles.trigger}
      aria-label="Apri menu di navigazione"
    >
      <span className={styles.bars} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className={styles.triggerLabel}>menu</span>
    </button>
  );
}
