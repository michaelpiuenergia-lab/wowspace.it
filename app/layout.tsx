import { AmbientEngine } from "@/components/effects/ambient-engine";
import { CommandPalette } from "@/components/effects/command-palette";
import { ConsoleGreet } from "@/components/effects/console-greet";
import { CookieConsent } from "@/components/legal/cookie-consent";
import type { Metadata, Viewport } from "next";
import { LiveSystemBar } from "@/components/effects/live-system-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PointerGlow } from "@/components/effects/pointer-glow";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "next.js agency",
    "crm su misura",
    "ai per pmi",
    "siti next.js",
    "portali clienti",
    "wowspace",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} · ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/icon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#040508",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
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
        <CookieConsent />
      </body>
    </html>
  );
}
