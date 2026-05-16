import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { RouteDeck } from "@/components/sections/route-deck";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <RouteDeck />
      <FinalCtaSection />
    </>
  );
}
