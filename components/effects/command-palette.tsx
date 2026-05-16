"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navLinks, routeIndex } from "@/lib/site-content";
import styles from "./command-palette.module.css";

type Action = {
  id: string;
  label: string;
  hint: string;
  command: string;
  group: "route" | "azione";
  keywords: string;
  run: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const actions = useMemo<Action[]>(() => {
    const close = () => setOpen(false);
    const go = (href: string) => {
      close();
      router.push(href);
    };
    const routes: Action[] = [
      {
        id: "/",
        label: "Home",
        hint: "torna alla base di wowspace",
        command: "cd /",
        group: "route",
        keywords: "home base inizio",
        run: () => go("/"),
      },
      ...navLinks.map((link) => {
        const info = routeIndex[link.href];
        return {
          id: link.href,
          label: info?.title ?? link.label,
          hint: info?.meta ?? link.label,
          command: `cd ${link.href}`,
          group: "route" as const,
          keywords: `${link.label} ${info?.title ?? ""} ${info?.kicker ?? ""}`,
          run: () => go(link.href),
        };
      }),
    ];
    const extras: Action[] = [
      {
        id: "accesso",
        label: "Area clienti",
        hint: "demo del portale auth privato",
        command: "open /accesso",
        group: "azione",
        keywords: "auth login portale clienti privata",
        run: () => go("/accesso"),
      },
      {
        id: "mail",
        label: "Scrivi a Wowspace",
        hint: "ciao@wowspace.it",
        command: "mail --to=ciao@wowspace.it",
        group: "azione",
        keywords: "email mail contatti scrivi",
        run: () => {
          close();
          window.location.href = "mailto:ciao@wowspace.it";
        },
      },
      {
        id: "contatti",
        label: "Sezione contatti",
        hint: "panel contatti in fondo alla home",
        command: "scroll /#contatti",
        group: "azione",
        keywords: "contatti call prenota",
        run: () => go("/#contatti"),
      },
      {
        id: "copy-mail",
        label: "Copia email",
        hint: "mette ciao@wowspace.it in clipboard",
        command: "echo ciao@wowspace.it | pbcopy",
        group: "azione",
        keywords: "copia clipboard email",
        run: () => {
          close();
          if (navigator.clipboard) {
            navigator.clipboard.writeText("ciao@wowspace.it");
          }
        },
      },
    ];
    return [...routes, ...extras];
  }, [router]);

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter((a) =>
      `${a.label} ${a.command} ${a.hint} ${a.keywords}`.toLowerCase().includes(q),
    );
  }, [query, actions]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      const editing =
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        target?.isContentEditable === true;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
        return;
      }
      if (!editing && event.key === "/" && !open) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (event.key === "Escape" && open) {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const action = filtered[activeIndex];
        if (action) action.run();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, activeIndex, filtered]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={styles.trigger}
        aria-label="Apri palette comandi"
      >
        <kbd>/</kbd>
        command
      </button>
    );
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Palette comandi"
    >
      <div className={styles.palette} onMouseDown={(event) => event.stopPropagation()}>
        <div className={styles.bar}>
          <span className={styles.shell}>root@wowspace:~$</span>
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="cerca rotta o azione…"
            className={styles.input}
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className={styles.esc}>esc</kbd>
        </div>

        {filtered.length === 0 ? (
          <ul className={styles.list}>
            <li className={styles.empty}>nessuna rotta che combaci.</li>
          </ul>
        ) : (
          <ul className={styles.list}>
            {filtered.map((action, idx) => (
              <li key={action.id}>
                <button
                  type="button"
                  onClick={() => action.run()}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`${styles.item} ${idx === activeIndex ? styles.active : ""}`}
                >
                  <span className={styles.itemGroup}>{action.group}</span>
                  <span className={styles.itemBody}>
                    <span className={styles.itemLabel}>{action.label}</span>
                    <span className={styles.itemHint}>{action.hint}</span>
                  </span>
                  <code className={styles.itemCmd}>{action.command}</code>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.foot}>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            nav
          </span>
          <span>
            <kbd>↵</kbd>
            esegui
          </span>
          <span>
            <kbd>esc</kbd>
            chiudi
          </span>
          <span style={{ marginLeft: "auto" }}>
            <kbd>/</kbd>
            apri
          </span>
        </div>
      </div>
    </div>
  );
}
