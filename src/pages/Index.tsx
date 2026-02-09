import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import StaysSection from "@/components/StaysSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ConciergeSection from "@/components/ConciergeSection";
import AwardsSection from "@/components/AwardsSection";
import ResortFooter from "@/components/ResortFooter";
import useScrollReveal from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <IntroSection />
        <StaysSection />
        <ExperiencesSection />
        <ConciergeSection />
        <AwardsSection />
      </main>
      <ResortFooter />
    </div>
  );
};

export default Index;
