import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/servizi", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/runtime", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/sistema", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/piattaforma", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/vetrina", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/metodo", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/cookie", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/note-legali", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
