"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./reveal.module.css";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** card con spotlight (il bordo si illumina dove passa il mouse, desktop) */
  spot?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  spot = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...(spot ? { "data-spot": "" } : {})}
    >
      {spot && <i className="fx-spot" aria-hidden="true" />}
      {children}
    </div>
  );
}
