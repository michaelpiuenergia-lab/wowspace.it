// Apre il chatbot da qualunque punto del sito (es. CTA "Parliamo del
// progetto"). Modulo minuscolo e senza React: chi lo importa non si porta
// dietro tutto il widget della chat nel proprio chunk (il widget resta
// caricato dopo, con next/dynamic).
export const CHAT_OPEN_EVENT = "wowspace:chat-open";

export function openChat() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT));
}
