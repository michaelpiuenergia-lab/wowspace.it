export const siteConfig = {
  name: "Wowspace",
  short: "Wowspace",
  tagline: "Sites · CRM · AI systems",
  description:
    "Wowspace progetta siti Next.js, e-commerce, CRM proprietari e flussi AI per aziende che vogliono un impatto forte e una piattaforma costruita su misura.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://wowspace.it",
  locale: "it_IT",
  email: "ciao@wowspace.it",
  socials: {
    linkedin: "",
    github: "https://github.com/michaelpiuenergia-lab/wowspace.it",
  },
} as const;

export type SiteConfig = typeof siteConfig;
