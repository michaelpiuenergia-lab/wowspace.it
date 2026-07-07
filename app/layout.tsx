import { DeferredBackground } from "@/components/effects/deferred-background";
import { DeferredOverlays } from "@/components/effects/deferred-overlays";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Orbitron, Sora, IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { PERF_INLINE_SCRIPT } from "@/lib/perf-tier";
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

// Title della home: keyword commerciale + geografia (segnale on-page #1).
// Non deriva più dalla tagline inglese. Tenuto sotto i ~60 caratteri per non
// venire troncato in SERP; il brand lo aggiunge Google dal nome sito (ed è
// esplicito nell'OG qui sotto).
const homeTitle = "Agenzia web nelle Marche: siti, CRM e software su misura";
const homeTitleSocial = `${siteConfig.name} · ${homeTitle}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeTitle,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "agenzia web Marche",
    "agenzia web Porto Sant'Elpidio",
    "realizzazione siti web Fermo",
    "siti web Civitanova Marche",
    "web agency Ascoli Piceno",
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
    title: homeTitleSocial,
    description: siteConfig.description,
    url: siteConfig.url,
    // l'immagine OG è fornita da app/opengraph-image.png (convenzione Next).
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitleSocial,
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

// Dati strutturati per la SEO locale: @graph con l'attività (ProfessionalService),
// il sito (WebSite) e la persona/founder, collegati per @id così Google li legge
// come un'unica entità. Volutamente NON includiamo geo, foundingDate, orari o
// aggregateRating finché non sono dati reali confermati (dalla scheda Google
// Business): meglio nessun campo che un dato inventato.
const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phoneE164,
      image: `${siteConfig.url}/opengraph-image.png`,
      logo: `${siteConfig.url}/icon.svg`,
      description: siteConfig.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.province,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
      areaServed: [
        { "@type": "City", name: "Porto Sant'Elpidio" },
        { "@type": "City", name: "Fermo" },
        { "@type": "City", name: "Civitanova Marche" },
        { "@type": "City", name: "San Benedetto del Tronto" },
        { "@type": "City", name: "Ascoli Piceno" },
        { "@type": "City", name: "Macerata" },
        { "@type": "City", name: "Ancona" },
        { "@type": "AdministrativeArea", name: "Marche" },
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
      founder: { "@id": `${siteConfig.url}/#michael-moretti` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      inLanguage: "it-IT",
      publisher: { "@id": `${siteConfig.url}/#business` },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#michael-moretti`,
      name: "Michael Moretti",
      jobTitle: "Founder & Builder",
      worksFor: { "@id": `${siteConfig.url}/#business` },
    },
  ],
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
        {/* Prima di ogni paint: imposta data-perf (alto/medio/basso) dai
            segnali hardware, così le macchine deboli non renderizzano nemmeno
            una volta blur e glow pesanti. Vedi lib/perf-tier. */}
        <script dangerouslySetInnerHTML={{ __html: PERF_INLINE_SCRIPT }} />
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
