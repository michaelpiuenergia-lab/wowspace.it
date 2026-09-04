"use client";

import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { CHAT_OPEN_EVENT } from "@/components/chat/open-chat";
import styles from "./chat-widget.module.css";

type Msg = { id: string; role: "user" | "assistant"; content: string };

// "assistente AI" esplicito nel saluto, nell'aria-label e nell'header: l'art. 50
// dell'AI Act (in vigore dal 2/8/2026) richiede che l'utente sappia dal primo
// contatto che sta parlando con un'AI.
const GREETING =
  "Ciao 👋 Sono l'assistente AI di Wowspace. Che progetto hai in mente? Siti, CRM, gestionali, AI, portali… dimmi pure e ti dico come possiamo aiutarti.";

const SUGGESTIONS = [
  "Cos'è un CRM su misura?",
  "Cosa può fare l'AI per la mia azienda?",
  "Come si parte con un progetto?",
];

const TEASER = "Ciao! Sono l'AI di Wowspace. Che progetto hai in mente?";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [typed, setTyped] = useState("");
  const [showBubble, setShowBubble] = useState(true);
  const [anchorId, setAnchorId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const idRef = useRef(0);

  // Pattern dialog WCAG: Escape chiude, e alla chiusura il focus torna al
  // launcher invece di perdersi nel body.
  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        launcherRef.current?.focus();
      }
      return;
    }
    wasOpenRef.current = true;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  useFocusTrap(panelRef, open);

  const nextId = () => `m${(idRef.current += 1)}`;

  // Fumetto "stile terminale": si digita carattere per carattere, resta un po',
  // poi sparisce. Riparte se la chat viene richiusa.
  useEffect(() => {
    if (open) {
      setShowBubble(false);
      return;
    }

    const timers: number[] = [];
    let typeId = 0;

    // Un ciclo: si digita → resta un attimo → sparisce (resta il pianeta) →
    // dopo una pausa ricompare. Così appare "di tanto in tanto".
    const touch = document.documentElement.getAttribute("data-perf") === "off";
    const runCycle = () => {
      setShowBubble(true);
      if (touch) {
        // sul telefono niente digitazione carattere per carattere (55
        // render in 3,5 s): il testo appare intero
        setTyped(TEASER);
        const holdId = window.setTimeout(() => {
          setShowBubble(false);
          timers.push(window.setTimeout(runCycle, 15000));
        }, 4500);
        timers.push(holdId);
        return;
      }
      setTyped("");
      let i = 0;
      typeId = window.setInterval(() => {
        i += 1;
        setTyped(TEASER.slice(0, i));
        if (i >= TEASER.length) {
          window.clearInterval(typeId);
          const holdId = window.setTimeout(() => {
            setShowBubble(false);
            const gapId = window.setTimeout(runCycle, 15000);
            timers.push(gapId);
          }, 3500);
          timers.push(holdId);
        }
      }, 65);
      timers.push(typeId);
    };

    runCycle();

    return () => {
      window.clearInterval(typeId);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [open]);

  // Saluto iniziale alla prima apertura.
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: nextId(), role: "assistant", content: GREETING }]);
    }
  }, [open, messages.length]);

  // All'arrivo di una nuova domanda porto la domanda dell'utente in cima, così
  // la risposta del bot si legge dall'inizio invece di saltare alla fine.
  useEffect(() => {
    if (!anchorId) return;
    const container = scrollRef.current;
    const el = container?.querySelector<HTMLElement>(
      `[data-mid="${anchorId}"]`,
    );
    if (container && el) {
      container.scrollTop = Math.max(0, el.offsetTop - 8);
    }
  }, [anchorId]);

  // Su desktop il cursore va subito nel campo. Sul telefono NO: il focus
  // aprirebbe la tastiera prima ancora di leggere il saluto e i
  // suggerimenti, coprendo mezzo schermo; lì si tocca il campo quando si
  // vuole scrivere.
  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    inputRef.current?.focus();
  }, [open]);

  // Apertura da eventi esterni (CTA del sito).
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(CHAT_OPEN_EVENT, handler);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, handler);
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");

    const userMsg: Msg = { id: nextId(), role: "user", content: trimmed };
    const assistantId = nextId();
    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setAnchorId(userMsg.id);
    setBusy(true);

    // Costruisco lo storico per l'API: deve iniziare con un messaggio "user",
    // quindi scarto il saluto iniziale dell'assistente.
    const convo = [...messages, userMsg].filter((m) => m.content.trim());
    while (convo.length && convo[0].role === "assistant") convo.shift();
    const history = convo.map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const fallback = await res.text().catch(() => "");
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: fallback || "Scusa, riprova tra poco." }
              : m,
          ),
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m)),
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Connessione interrotta. Riprova tra poco." }
            : m,
        ),
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {!open && (
        <div className={styles.launcherWrap}>
          <button
            type="button"
            className={`${styles.bubble} ${showBubble ? "" : styles.bubbleGone}`}
            onClick={() => setOpen(true)}
            aria-hidden={!showBubble}
            tabIndex={showBubble ? 0 : -1}
          >
            <span className={styles.bubbleText}>{typed}</span>
            <i className={styles.bubbleCursor} aria-hidden="true" />
          </button>
          <button
            ref={launcherRef}
            type="button"
            className={styles.planet}
            onClick={() => setOpen(true)}
            aria-label="Apri la chat con l'assistente AI di Wowspace"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="wowspace-chat-panel"
          >
            <span className={styles.orb} aria-hidden="true">
              <span className={styles.orbCore} />
            </span>
            <span className={styles.orbLabel} aria-hidden="true">
              Assistente AI
            </span>
          </button>
        </div>
      )}

      {open && (
        <div
          ref={panelRef}
          id="wowspace-chat-panel"
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Assistente AI Wowspace"
        >
          <header className={styles.head}>
            <span
              className={`${styles.orb} ${styles.headOrb}`}
              aria-hidden="true"
            >
              <span className={styles.orbCore} />
            </span>
            <span className={styles.headText}>
              <span className={styles.headTitle}>Assistente AI</span>
              <span className={styles.headSub}>
                di Wowspace · risponde subito
              </span>
            </span>
            <span className={styles.headStatus}>
              <i aria-hidden="true" />
              online
            </span>
            <button
              type="button"
              className={styles.close}
              onClick={() => setOpen(false)}
              aria-label="Chiudi la chat"
            >
              <svg
                viewBox="0 0 16 16"
                width="14"
                height="14"
                aria-hidden="true"
              >
                <path
                  d="M3 3l10 10M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div className={styles.messages} ref={scrollRef}>
            {messages.map((m) =>
              m.role === "user" ? (
                <p key={m.id} data-mid={m.id} className={styles.userLine}>
                  {m.content}
                </p>
              ) : (
                <p key={m.id} data-mid={m.id} className={styles.botLine}>
                  {m.content || (
                    <span className={styles.typing} aria-label="sto scrivendo">
                      <i />
                      <i />
                      <i />
                    </span>
                  )}
                </p>
              ),
            )}

            {messages.length <= 1 && (
              <div className={styles.suggestions}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    disabled={busy}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className={styles.inputRow}
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // Niente disabled durante la risposta: su mobile chiuderebbe la
              // tastiera a ogni messaggio. Il doppio invio è già bloccato in
              // send() dal check su busy.
              placeholder="Scrivi la tua domanda…"
              maxLength={500}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={busy || !input.trim()}
              aria-label="Invia messaggio"
            >
              <svg
                viewBox="0 0 20 20"
                width="18"
                height="18"
                aria-hidden="true"
              >
                <path
                  d="M3 10h13M11 5l5 5-5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <p className={styles.foot}>
            Risposte generate dall&apos;AI. Per i dettagli scrivici o prenota
            una call.
          </p>
        </div>
      )}
    </>
  );
}
