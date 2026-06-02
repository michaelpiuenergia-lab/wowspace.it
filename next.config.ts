import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import { securityHeaders } from "./lib/security/headers";

// Bundle analyzer attivo solo con ANALYZE=true (npm run analyze).
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Nasconde l'indicatore di sviluppo Next.js (la "N" in basso a sinistra): è
  // solo in dev e non compare mai in produzione.
  devIndicators: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
