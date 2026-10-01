import { useMemo } from "react";
import { Link } from "react-router-dom";
import StayDeck, { type StayCard } from "@/components/listings/StayDeck";
import { useListings } from "@/hooks/useListings";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getListingGuestLabel,
  getListingTagline,
  getVillaSizeLabel,
} from "@/lib/listingPresentation";
import { panoBella, panoBoth, panoSoleil } from "@/data/sharedMedia";

const StaysSection = () => {
  const { villas } = useListings();
  const { t } = useLanguage();
  const soleil = villas.find((villa) => villa.id === "AntiguaSoleil");
  const bella = villas.find((villa) => villa.id === "AntiguaBella");

  const cards = useMemo<StayCard[]>(() => [
    {
      key: "AntiguaSoleil",
      title: "AntiguaSoleil",
      href: "https://www.airbnb.com/rooms/24248006?source_impression_id=p3_1790715224_P39J50mrmBjIMEhc",
      external: true,
      photo: panoSoleil,
      meta: [
        soleil ? getVillaSizeLabel(soleil) : "AntiguaSoleil",
        soleil ? getListingGuestLabel(soleil) : "",
      ],
      tagline: soleil ? getListingTagline(soleil) : "",
      action: "View on Airbnb",
      imagePosition: "center 64%",
    },
    {
      key: "SoleilBella",
      title: "Soleil + Bella",
      href: "/request?villa=BothVillas",
      photo: panoBoth,
      meta: ["Two villas", "One request"],
      tagline: "Both residences, requested together.",
      action: t("common_request"),
      imagePosition: "center 52%",
    },
    {
      key: "AntiguaBella",
      title: "AntiguaBella",
      href: "https://www.airbnb.com/rooms/46730249?source_impression_id=p3_1790715181_P3TzML2p4xQamHGv",
      external: true,
      photo: panoBella,
      meta: [
        bella ? getVillaSizeLabel(bella) : "AntiguaBella",
        bella ? getListingGuestLabel(bella) : "",
      ],
      tagline: bella ? getListingTagline(bella) : "",
      action: "View on Airbnb",
      imagePosition: "center 56%",
    },
  ], [soleil, bella, t]);

  return (
    <section id="stays" className="section-padding bg-card">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        <div className="section-header">
          <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary mb-4">{t("stays_eyebrow")}</p>
          <h2 data-reveal="slide-up" data-reveal-delay="220" className="luxury-heading mb-4 text-[clamp(2rem,8vw,2.5rem)] leading-[1.12] text-foreground md:mb-5 md:text-5xl lg:text-6xl">
            {t("stays_title_main")} <span className="italic">{t("stays_title_accent")}</span>
          </h2>
          <div data-reveal="fade" data-reveal-delay="340" className="luxury-divider mb-6" />
          <p data-reveal="slide-up" data-reveal-delay="420" className="luxury-body text-muted-foreground max-w-lg mx-auto">
            {t("stays_copy")}
          </p>
        </div>
      </div>

      <div className="stay-deck-bleed">
        <StayDeck cards={cards} />
      </div>

      <div className="mx-auto max-w-7xl">
        <div data-reveal="fade" data-reveal-delay="750" className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row lg:mt-14">
          <Link to="/stays" className="luxury-btn-outline text-center">
            {t("common_explore_stays")}
          </Link>
          <Link to="/request" className="luxury-btn-bold text-center">
            {t("common_request_stay")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StaysSection;
