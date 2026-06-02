import { AboutSection } from "@/components/sections/about-section";
import { FeatureBandsSection } from "@/components/sections/feature-bands-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { FitSection } from "@/components/sections/fit-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ManifestoSection } from "@/components/sections/manifesto-section";
import { RouteDeck } from "@/components/sections/route-deck";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureBandsSection />
      <FitSection />
      <ManifestoSection />
      <AboutSection />
      <RouteDeck />
      <FinalCtaSection />
    </>
  );
}
