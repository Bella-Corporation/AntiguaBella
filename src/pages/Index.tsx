import ResortNavbar from "@/components/ResortNavbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import SuitesSection from "@/components/SuitesSection";
import DiningSection from "@/components/DiningSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ResortFooter from "@/components/ResortFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ResortNavbar />
      <main>
        <HeroSection />
        <IntroSection />
        <SuitesSection />
        <DiningSection />
        <ExperiencesSection />
      </main>
      <ResortFooter />
    </div>
  );
};

export default Index;
