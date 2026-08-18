import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/layout/landing-page";
import { servicePages } from "@/lib/landing-content";

type Props = { params: Promise<{ slug: string }> };

// Solo gli slug definiti in servicePages sono validi: gli altri → 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages[slug];
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.path}` },
    // Senza OG proprio, Next eredita in blocco quello della home: condivise
    // su WhatsApp/LinkedIn queste pagine uscivano col titolo sbagliato.
    openGraph: {
      title: `${page.metaTitle} · Wowspace`,
      description: page.metaDescription,
      url: `/${page.path}`,
    },
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const page = servicePages[slug];
  if (!page) notFound();
  return <LandingPage content={page} />;
}
