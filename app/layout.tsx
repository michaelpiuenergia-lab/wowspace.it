import { AmbientEngine } from "@/components/effects/ambient-engine";
import { CommandPalette } from "@/components/effects/command-palette";
import { ConsoleGreet } from "@/components/effects/console-greet";
import type { Metadata } from "next";
import { LiveSystemBar } from "@/components/effects/live-system-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PointerGlow } from "@/components/effects/pointer-glow";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wowspace | Siti, CRM e AI su misura",
  description:
    "Wowspace progetta siti Next.js, e-commerce, CRM proprietari e flussi AI per aziende che vogliono un impatto forte e una piattaforma costruita su misura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-scroll-behavior="smooth">
      <body>
        <PointerGlow />
        <AmbientEngine />
        <div className="site-frame">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <LiveSystemBar />
        <CommandPalette />
        <ConsoleGreet />
      </body>
    </html>
  );
}
