"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { navLinks, routeIndex } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";
import { useFocusTrap } from "@/lib/use-focus-trap";
import styles from "./command-palette.module.css";

const OPEN_EVENT = "wowspace:palette-open";

// Se il tap arriva prima che il chunk lazy della palette sia montato (rete
// mobile lenta), l'evento andrebbe perso: il flag lo accoda per il mount.
let pendingOpen = false;

export function openCommandPalette() {
  if (typeof window === "undefined") return;
  pendingOpen = true;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

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
  // Su touch il campo di ricerca fa saltare fuori la tastiera che copre la
  // lista: lì la palette è solo un menu di rotte toccabili, senza input.
  const [isTouch, setIsTouch] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouch(
      window.matchMedia?.("(hover: none), (pointer: coarse)").matches === true,
    );
  }, []);

  useFocusTrap(paletteRef, open);

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
        command: "Home",
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
          command: "Pagina",
          group: "route" as const,
          keywords: `${link.label} ${info?.title ?? ""} ${info?.kicker ?? ""} ${link.href}`,
          run: () => go(link.href),
        };
      }),
    ];
    const extras: Action[] = [
      {
        id: "accesso",
        label: "Area clienti",
        hint: "demo del portale auth privato",
        command: "Apri",
        group: "azione",
        keywords: "auth login portale clienti privata",
        run: () => go("/accesso"),
      },
      {
        id: "mail",
        label: "Scrivi a Wowspace",
        hint: siteConfig.email,
        command: "Email",
        group: "azione",
        keywords: "email mail contatti scrivi",
        run: () => {
          close();
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
      {
        id: "prenota",
        label: "Prenota una call",
        hint: "richiedi informazioni o un preventivo",
        command: "Apri",
        group: "azione",
        keywords: "prenota call preventivo informazioni appuntamento",
        run: () => go("/prenota"),
      },
      {
        id: "contatti",
        label: "Sezione contatti",
        hint: "panel contatti in fondo alla home",
        command: "Vai",
        group: "azione",
        keywords: "contatti call prenota",
        run: () => go("/#contatti"),
      },
      {
        id: "copy-mail",
        label: "Copia email",
        hint: `mette ${siteConfig.email} in clipboard`,
        command: "Copia",
        group: "azione",
        keywords: "copia clipboard email",
        run: () => {
          close();
          if (navigator.clipboard) {
            navigator.clipboard.writeText(siteConfig.email);
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
      `${a.label} ${a.command} ${a.hint} ${a.keywords}`
        .toLowerCase()
        .includes(q),
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
    const openHandler = () => {
      pendingOpen = false;
      setOpen(true);
    };
    window.addEventListener("keydown", handler);
    window.addEventListener(OPEN_EVENT, openHandler);
    // Tap arrivato prima del mount del chunk lazy: aprilo ora.
    if (pendingOpen) openHandler();
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener(OPEN_EVENT, openHandler);
    };
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
        aria-haspopup="dialog"
      >
        <kbd>/</kbd>
        cerca
      </button>
    );
  }

  return (
    <div
      ref={paletteRef}
      className={styles.backdrop}
      onMouseDown={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Palette comandi"
    >
      <div
        className={styles.palette}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.bar}>
          <span className={styles.shell}>›</span>
          {isTouch ? (
            <>
              <span className={styles.input}>menu rapido</span>
              <button
                type="button"
                className={styles.esc}
                onClick={() => setOpen(false)}
                aria-label="Chiudi la palette"
              >
                ✕
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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
                  onFocus={() => setActiveIndex(idx)}
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

        {/* Le scorciatoie da tastiera non esistono su touch: footer solo desktop. */}
        {!isTouch && (
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
        )}
      </div>
    </div>
  );
}
