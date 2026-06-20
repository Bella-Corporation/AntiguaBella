import useScrollReveal from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import StaysSection from "@/components/StaysSection";
// MVP v0.0.1 — villa rentals only; re-enable when experiences/charters/concierge launch
// import ExperiencesSection from "@/components/ExperiencesSection";
// import ChartersSection from "@/components/ChartersSection";
// import WellnessSection from "@/components/WellnessSection";
// import ConciergeSection from "@/components/ConciergeSection";
import AwardsSection from "@/components/AwardsSection";
import ResortFooter from "@/components/ResortFooter";

const Index = () => {
  useScrollReveal();
  usePageMeta({
    title: "AntiguaBella — The Caribbean, Curated",
    description:
      "Discover AntiguaBella and AntiguaSoleil — two of Antigua's finest private villas. Inquiry-led — every stay arranged personally.",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <IntroSection />
        <StaysSection />
        {/* MVP v0.0.1 — villa rentals only; re-enable when experiences/charters/concierge launch */}
        {/* <ExperiencesSection /> */}
        {/* <ChartersSection /> */}
        {/* <WellnessSection /> */}
        {/* <ConciergeSection /> */}
        <AwardsSection />
      </main>
      <ResortFooter />
    </div>
  );
};

export default Index;
