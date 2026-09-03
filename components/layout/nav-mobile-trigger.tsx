"use client";

import { useCallback, useState } from "react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import styles from "./nav-mobile-trigger.module.css";

// Hamburger (solo sotto i 980px): apre il menu a tutto schermo.
export function NavMobileTrigger() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={styles.trigger}
        aria-label="Apri menu di navigazione"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className={styles.bars} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.triggerLabel}>Menu</span>
      </button>
      <MobileMenu open={open} onClose={close} />
    </>
  );
}
