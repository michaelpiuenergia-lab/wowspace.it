import { DeferredBackground } from "@/components/effects/deferred-background";
import { DeferredOverlays } from "@/components/effects/deferred-overlays";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Orbitron, Sora, IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Font self-hosted via next/font: niente richieste a CDN esterni, niente layout
// shift (display: swap) e variabili CSS già usate in globals.css.
const fontDisplay = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});
const fontSans = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});
const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

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
    "agenzia web Marche",
    "siti web Marche",
    "siti web Porto Sant'Elpidio",
    "agenzia digitale Fermo",
    "realizzazione siti web Ascoli Piceno",
    "CRM su misura",
    "software gestionali Marche",
    "e-commerce Marche",
    "automazioni AI aziende",
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
    // l'immagine OG è fornita da app/opengraph-image.png (convenzione Next).
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    // l'immagine è fornita da app/twitter-image.png (convenzione Next).
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

// Dati strutturati per la SEO locale (Google: scheda attività + zone servite).
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#business`,
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  image: `${siteConfig.url}/icon.svg`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Marche" },
    "Fermo",
    "Ascoli Piceno",
    "Macerata",
    "Ancona",
    "Porto Sant'Elpidio",
    "Civitanova Marche",
    "San Benedetto del Tronto",
  ],
  knowsAbout: [
    "siti web",
    "e-commerce",
    "CRM su misura",
    "software gestionali",
    "automazioni AI",
    "portali clienti",
    "SEO",
  ],
  priceRange: "€€",
  sameAs: [siteConfig.socials.github].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      data-scroll-behavior="smooth"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body>
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        <DeferredBackground />
        <div className="site-frame">
          <SiteHeader />
          <main id="contenuto">{children}</main>
          <SiteFooter />
        </div>
        <DeferredOverlays />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
