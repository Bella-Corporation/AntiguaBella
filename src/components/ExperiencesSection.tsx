import { Link } from "react-router-dom";
import { useListings } from "@/hooks/useListings";
import { useLanguage } from "@/contexts/LanguageContext";
import OverlayListingCard from "@/components/listings/OverlayListingCard";
import { getListingEyebrow } from "@/lib/listingPresentation";

const ExperiencesSection = () => {
  const { experiences } = useListings();
  const { t } = useLanguage();

  return (
    <section id="experiences" className="section-padding bg-background">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start mb-14 lg:mb-20">
          <div className="lg:col-span-5">
            <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary/60 mb-4">{t("experiences_eyebrow")}</p>
            <h2 data-reveal="slide-up" data-reveal-delay="220" data-scroll-cue className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-7">
              {t("experiences_title_main")}
              <br />
              <span className="italic">{t("experiences_title_accent")}</span>
            </h2>
            <div data-reveal="fade" data-reveal-delay="340" className="luxury-divider mx-0 mb-7" />
            <p data-reveal="slide-up" data-reveal-delay="420" className="luxury-body text-muted-foreground max-w-sm">
              {t("experiences_copy")}
            </p>
          </div>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {experiences.map((exp, i) => (
            <OverlayListingCard
              key={exp.id}
              listing={exp}
              to={`/experiences/${encodeURIComponent(exp.id)}`}
              reveal={i % 2 === 0 ? "slide-left" : "slide-right"}
              revealDelay={i < 2 ? "500" : "620"}
              eyebrow={getListingEyebrow(exp, t("common_experience"))}
            />
          ))}
        </div>

        <div data-reveal="fade" data-reveal-delay="800" className="mt-14 lg:mt-16">
          <Link to="/experiences" className="luxury-btn-outline">
            {t("common_explore_experiences")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
