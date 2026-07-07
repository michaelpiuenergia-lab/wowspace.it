import type { Metadata } from "next";
import { LandingPage } from "@/components/layout/landing-page";
import { cityPages } from "@/lib/landing-content";

const page = cityPages["software-gestionali-marche"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: `/${page.path}` },
  openGraph: {
    title: `${page.metaTitle} · Wowspace`,
    description: page.metaDescription,
    url: `/${page.path}`,
  },
};

export default function Page() {
  return <LandingPage content={page} />;
}
