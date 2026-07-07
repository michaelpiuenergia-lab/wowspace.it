export const siteConfig = {
  name: "Wowspace",
  short: "Wowspace",
  tagline: "Siti, CRM e gestionali su misura · Marche",
  description:
    "Agenzia web nelle Marche, a Porto Sant'Elpidio (FM): realizziamo siti web, e-commerce, CRM e software gestionali su misura per PMI e aziende. Prenota una call.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://wowspaceweb.com",
  locale: "it_IT",
  email: "wowspaceweb@gmail.com",
  phone: "+39 351 818 1560",
  phoneDisplay: "+39 351 818 1560",
  phoneHref: "tel:+393518181560",
  // Formato E.164 senza spazi: richiesto dai dati strutturati (schema.org).
  phoneE164: "+393518181560",
  address: {
    street: "Via Garda 24",
    city: "Porto Sant'Elpidio",
    province: "FM",
    postalCode: "63821",
    region: "Marche",
    country: "IT",
  },
  socials: {
    linkedin: "",
    github: "https://github.com/michaelpiuenergia-lab/wowspace.it",
  },
} as const;

export type SiteConfig = typeof siteConfig;
