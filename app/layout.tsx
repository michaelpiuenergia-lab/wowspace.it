import { DeferredBackground } from "@/components/effects/deferred-background";
import { NebulaField } from "@/components/effects/nebula-field";
import { PageTransition } from "@/components/effects/page-transition";
import { DeferredOverlays } from "@/components/effects/deferred-overlays";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Orbitron, Sora, IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { PERF_INLINE_SCRIPT } from "@/lib/perf-tier";
import "./globals.css";
import "./motion.css";

// Font self-hosted via next/font: niente richieste a CDN esterni, niente layout
// shift (display: swap) e variabili CSS già usate in globals.css.
// Orbitron resta SOLO nel marchio (--font-logo): per titoli e testi si usa
// un'unica famiglia (Sora), così le scritte sono uguali su tutte le pagine.
const fontLogo = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-logo",
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
      // Solo profili reali: GBP e LinkedIn si aggiungono quando esistono.
      sameAs: [siteConfig.socials.github],
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
      className={`${fontLogo.variable} ${fontSans.variable} ${fontMono.variable}`}
      // data-perf viene messo dallo script inline prima dell'hydration: il
      // mismatch con l'HTML del server è voluto.
      suppressHydrationWarning
    >
      <body>
        {/* Prima di ogni paint: imposta data-perf. Su touch → "off" (niente
            effetti, solo su desktop); su desktop debole → "basso". Vedi
            lib/perf-tier. */}
        <script dangerouslySetInnerHTML={{ __html: PERF_INLINE_SCRIPT }} />
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        {/* Linea di progresso dello scroll e grana pellicola: solo CSS, vedi
            app/motion.css. */}
        <div className="fx-progress" aria-hidden="true" />
        {/* Lo spazio (stelle + pianeti) vive qui, una volta per tutte le
            pagine: così cambiando pagina non si ricrea ma "si sposta". */}
        <NebulaField />
        <DeferredBackground />
        <div className="site-frame">
          <SiteHeader />
          <main id="contenuto">
            {/* ogni cambio pagina entra con un movimento (vedi motion.css) */}
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
        </div>
        <div className="fx-grain" aria-hidden="true" />
        <DeferredOverlays />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
