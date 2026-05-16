"use client";

import { useEffect, useEffectEvent, useRef, useState, type CSSProperties } from "react";
import styles from "./cmd-panel.module.css";

type CmdLine = {
  channel?: string;
  state?: string;
  command: string;
  output?: string;
};

type CmdPanelProps = {
  title: string;
  status: string;
  lines: CmdLine[];
  footer?: string[];
  className?: string;
};

export function CmdPanel({
  title,
  status,
  lines,
  footer = [],
  className = "",
}: CmdPanelProps) {
  const seededLines = lines.slice(0, Math.min(lines.length, 3)).map((line, index) => ({
    ...line,
    id: `seed-${index}`,
  }));
  const idRef = useRef(seededLines.length);
  const [renderedLines, setRenderedLines] = useState(seededLines);
  const [cursor, setCursor] = useState(seededLines.length);
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    const nextSeed = lines.slice(0, Math.min(lines.length, 3)).map((line, index) => ({
      ...line,
      id: `seed-${index}`,
    }));

    idRef.current = nextSeed.length;
    setRenderedLines(nextSeed);
    setCursor(nextSeed.length);
  }, [lines]);

  const pushRuntimeLine = useEffectEvent(() => {
    if (lines.length < 2) {
      return;
    }

    setCursor((currentCursor) => {
      let probe = currentCursor;
      let nextLine = lines[probe % lines.length];

      setRenderedLines((current) => {
        const lastCommand = current[current.length - 1]?.command;
        let attempts = 0;
        while (nextLine && nextLine.command === lastCommand && attempts < lines.length) {
          probe += 1;
          nextLine = lines[probe % lines.length];
          attempts += 1;
        }
        if (!nextLine) {
          return current;
        }
        idRef.current += 1;
        return [...current, { ...nextLine, id: `line-${idRef.current}` }].slice(-4);
      });

      return probe + 1;
    });
  });

  useEffect(() => {
    if (lines.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      pushRuntimeLine();
    }, 5200);

    return () => {
      window.clearInterval(interval);
    };
  }, [lines.length, pushRuntimeLine]);

  const activeCommand = lines[cursor % Math.max(lines.length, 1)]?.command ?? "";

  useEffect(() => {
    setTypedCount(0);

    if (!activeCommand) {
      return;
    }

    const interval = window.setInterval(() => {
      setTypedCount((current) =>
        current >= activeCommand.length ? activeCommand.length : current + 1,
      );
    }, 55);

    return () => {
      window.clearInterval(interval);
    };
  }, [activeCommand]);

  return (
    <div className={`${styles.panel} ${className}`}>
      <div className={styles.bar}>
        <div className={styles.dots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className={styles.title}>{title}</span>
        <span className={styles.status}>{status}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.scanlines} aria-hidden="true" />
        {renderedLines.map((line, index) => (
          <div
            key={line.id}
            className={styles.line}
            style={
              {
                "--line-delay": `${index * 0.22}s`,
              } as CSSProperties
            }
          >
            <div className={styles.meta}>
              <small>{line.channel ?? `stream ${String(index + 1).padStart(2, "0")}`}</small>
              <strong>{line.state ?? "online"}</strong>
            </div>
            <p className={styles.command}>
              <span>C:\Wowspace&gt;</span> {line.command}
            </p>
            {line.output ? <p className={styles.output}>{line.output}</p> : null}
          </div>
        ))}
      </div>

      <div className={styles.inputLine}>
        <span className={styles.shell}>root@wowspace:~$</span>
        <span className={styles.active}>{activeCommand.slice(0, typedCount)}</span>
        <span className={styles.ghost}>{activeCommand.slice(typedCount)}</span>
        <i className={styles.cursor} aria-hidden="true" />
      </div>

      {footer.length ? (
        <div className={styles.footer}>
          {footer.map((item) => (
            <small key={item}>{item}</small>
          ))}
        </div>
      ) : null}
    </div>
  );
}
