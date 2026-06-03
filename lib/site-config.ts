export const siteConfig = {
  name: "Wowspace",
  short: "Wowspace",
  tagline: "Sites · CRM · AI systems",
  description:
    "Wowspace è l'agenzia digitale nelle Marche (Porto Sant'Elpidio) che progetta siti web, e-commerce, CRM, gestionali e automazioni AI su misura per PMI e grandi aziende.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://wowspaceweb.com",
  locale: "it_IT",
  email: "wowspaceweb@gmail.com",
  phone: "+39 351 818 1560",
  phoneDisplay: "+39 351 818 1560",
  phoneHref: "tel:+393518181560",
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
