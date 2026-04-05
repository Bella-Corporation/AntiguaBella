import useScrollReveal from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import StaysSection from "@/components/StaysSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ChartersSection from "@/components/ChartersSection";
import WellnessSection from "@/components/WellnessSection";
import ConciergeSection from "@/components/ConciergeSection";
import AwardsSection from "@/components/AwardsSection";
import ResortFooter from "@/components/ResortFooter";

const Index = () => {
  useScrollReveal();
  usePageMeta({
    title: "AntiguaBella — The Caribbean, Curated",
    description:
      "Discover Antigua's finest private villas, curated island experiences, and private charter services. Enquiry-led — every arrangement fulfilled personally.",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <IntroSection />
        <StaysSection />
        <ExperiencesSection />
        <ChartersSection />
        <WellnessSection />
        <ConciergeSection />
        <AwardsSection />
      </main>
      <ResortFooter />
    </div>
  );
};

export default Index;
