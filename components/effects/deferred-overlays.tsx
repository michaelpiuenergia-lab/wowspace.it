"use client";

import dynamic from "next/dynamic";

// Widget e overlay non critici per la SEO: caricati in lazy (ssr:false), così
// restano fuori dal bundle e dall'HTML iniziali e si montano dopo l'hydration.
const LiveSystemBar = dynamic(
  () =>
    import("@/components/effects/live-system-bar").then((m) => m.LiveSystemBar),
  { ssr: false },
);
const CommandPalette = dynamic(
  () =>
    import("@/components/effects/command-palette").then((m) => m.CommandPalette),
  { ssr: false },
);
const ConsoleGreet = dynamic(
  () => import("@/components/effects/console-greet").then((m) => m.ConsoleGreet),
  { ssr: false },
);
const ChatWidget = dynamic(
  () => import("@/components/chat/chat-widget").then((m) => m.ChatWidget),
  { ssr: false },
);
const CookieConsent = dynamic(
  () => import("@/components/legal/cookie-consent").then((m) => m.CookieConsent),
  { ssr: false },
);

export function DeferredOverlays() {
  return (
    <>
      <LiveSystemBar />
      <CommandPalette />
      <ConsoleGreet />
      <ChatWidget />
      <CookieConsent />
    </>
  );
}
