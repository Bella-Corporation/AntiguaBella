import ResortNavbar from "@/components/ResortNavbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import VillasSection from "@/components/VillasSection";
import DiningSection from "@/components/DiningSection";
import WellnessSection from "@/components/WellnessSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import AwardsSection from "@/components/AwardsSection";
import ResortFooter from "@/components/ResortFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ResortNavbar />
      <main>
        <HeroSection />
        <IntroSection />
        <VillasSection />
        <DiningSection />
        <WellnessSection />
        <ExperiencesSection />
        <AwardsSection />
      </main>
      <ResortFooter />
    </div>
  );
};

export default Index;
