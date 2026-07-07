"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./wowspace-logo.module.css";

type WowspaceLogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

const GLITCH_POOL = "WOWSPACE_X1Δ#@%∆◊⌬→⚡";
const WORD = "Wowspace";

function scramble(): string {
  return WORD.split("")
    .map(() => GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)])
    .join("");
}

export function WowspaceLogo({
  size = 40,
  showWordmark = true,
  className = "",
}: WowspaceLogoProps) {
  const uid = "ws-logo";
  const [display, setDisplay] = useState(WORD);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    },
    [],
  );

  const startGlitch = () => {
    if (timerRef.current !== null) return;
    let step = 0;
    const total = 14;
    timerRef.current = window.setInterval(() => {
      step += 1;
      if (step >= total) {
        if (timerRef.current !== null) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setDisplay(WORD);
        return;
      }
      const scrambled = scramble();
      const reveal = Math.floor((step / total) * WORD.length);
      setDisplay(WORD.slice(0, reveal) + scrambled.slice(reveal));
    }, 38);
  };

  return (
    <span
      className={`${styles.lockup} ${className}`.trim()}
      onMouseEnter={startGlitch}
      onFocus={startGlitch}
    >
      <span className={styles.mark} aria-hidden="true">
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id={`${uid}-hex`}
              x1="6"
              y1="6"
              x2="42"
              y2="42"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#15d4ff" />
              <stop offset="50%" stopColor="#f3faff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c8ff5a" />
            </linearGradient>
            <linearGradient
              id={`${uid}-w`}
              x1="24"
              y1="14"
              x2="24"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#f3faff" />
              <stop offset="60%" stopColor="#15d4ff" />
              <stop offset="100%" stopColor="#ff4fd8" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id={`${uid}-scan`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15d4ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#15d4ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#15d4ff" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#c8ff5a" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#15d4ff" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#15d4ff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <path
            d="M24 3 L41 12 L41 36 L24 45 L7 36 L7 12 Z"
            fill="rgba(21, 212, 255, 0.08)"
            className={styles.hexHalo}
          />

          <path
            d="M24 3 L41 12 L41 36 L24 45 L7 36 L7 12 Z"
            stroke={`url(#${uid}-hex)`}
            strokeWidth="1.4"
            strokeLinejoin="round"
            className={styles.hexFrame}
          />

          <g
            opacity="0.35"
            stroke="#15d4ff"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <line x1="11" y1="14" x2="11" y2="18.5" />
            <line x1="37" y1="14" x2="37" y2="18.5" />
            <line x1="11" y1="34" x2="11" y2="29.5" />
            <line x1="37" y1="34" x2="37" y2="29.5" />
          </g>

          <path
            d="M11.5 16 L17.5 32 L24 22.5 L30.5 32 L36.5 16"
            stroke={`url(#${uid}-w)`}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M9 23 L39 23"
            stroke={`url(#${uid}-scan)`}
            strokeWidth="0.9"
            strokeLinecap="round"
            className={styles.scan}
            opacity="0.7"
          />

          <circle
            cx="24"
            cy="24"
            r="5.5"
            fill={`url(#${uid}-glow)`}
            className={styles.coreGlow}
          />

          <circle
            cx="24"
            cy="24"
            r="1.6"
            fill="#c8ff5a"
            className={styles.core}
          />
        </svg>
      </span>

      {showWordmark && (
        <span className={styles.word}>
          <strong className={styles.wordMain} aria-label={WORD}>
            {display}
          </strong>
          <small>siti · crm · gestionali · ai</small>
        </span>
      )}
    </span>
  );
}
