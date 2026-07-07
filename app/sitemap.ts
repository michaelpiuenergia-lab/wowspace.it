import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { servicePages, cityPages } from "@/lib/landing-content";

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/servizi", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/runtime", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sistema", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/piattaforma", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/vetrina", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/metodo", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cookie", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/note-legali", priority: 0.3, changeFrequency: "yearly" as const },
];

// Pagine-servizio (money page) e landing locali: alta priorità, sono gli asset
// costruiti per rankare sulle query commerciali.
const serviceRoutes = Object.values(servicePages).map((p) => ({
  path: `/${p.path}`,
  priority: 0.9,
  changeFrequency: "monthly" as const,
}));
const cityRoutes = Object.values(cityPages).map((p) => ({
  path: `/${p.path}`,
  priority: 0.8,
  changeFrequency: "monthly" as const,
}));

const routes = [...staticRoutes, ...serviceRoutes, ...cityRoutes];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
