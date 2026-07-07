import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /accesso NON è disallow: dev'essere crawlabile perché il suo
        // noindex (nei metadata della pagina) venga letto. Bloccarla via
        // robots impedirebbe a Google di vedere il noindex.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
