import { Link } from "react-router-dom";
import { useListings } from "@/hooks/useListings";
import { useLanguage } from "@/contexts/LanguageContext";
import OverlayListingCard from "@/components/listings/OverlayListingCard";
import {
  getListingEyebrow,
  getListingGuestLabel,
} from "@/lib/listingPresentation";

const ChartersSection = () => {
  const { charters } = useListings();
  const { t } = useLanguage();
  const chartersPreview = charters.slice(0, 3);

  return (
    <section id="charters" className="section-padding bg-card border-t border-border/10">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start mb-14 lg:mb-20">
          <div className="lg:col-span-5">
            <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary/60 mb-4">
              {t("charters_eyebrow")}
            </p>
            <h2
              data-reveal="slide-up"
              data-reveal-delay="220"
              data-scroll-cue
              className="luxury-heading text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.18] mb-7"
            >
              {t("charters_title_main")}
              <br />
              <span className="italic">{t("charters_title_accent")}</span>
            </h2>
            <div data-reveal="fade" data-reveal-delay="340" className="luxury-divider mx-0 mb-7" />
            <p data-reveal="slide-up" data-reveal-delay="420" className="luxury-body text-muted-foreground max-w-sm">
              {t("charters_copy")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {chartersPreview.map((c, i) => (
            <OverlayListingCard
              key={c.id}
              listing={c}
              to={`/charters/${encodeURIComponent(c.id)}`}
              reveal="slide-up"
              revealDelay={String(520 + i * 100)}
              eyebrow={getListingGuestLabel(c) || getListingEyebrow(c, "Private charter")}
            />
          ))}
        </div>

        <div data-reveal="fade" data-reveal-delay="860" className="mt-14 lg:mt-16 flex flex-col sm:flex-row gap-4">
          <Link to="/charters" className="luxury-btn-outline text-center">
            {t("common_explore_charters")}
          </Link>
          <Link to="/request" className="luxury-btn-bold text-center">
            {t("common_request_with_concierge")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ChartersSection;

