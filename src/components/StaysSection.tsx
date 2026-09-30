import { Link } from "react-router-dom";
import PropertyPicture from "@/components/PropertyPicture";
import { useListings } from "@/hooks/useListings";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getListingGuestLabel,
  getListingTagline,
  getVillaSizeLabel,
} from "@/lib/listingPresentation";
import { panoBella, panoBoth, panoSoleil, type SharedPhoto } from "@/data/sharedMedia";

type StayCard = {
  key: string;
  title: string;
  href: string;
  external?: boolean;
  photo: SharedPhoto;
  meta: [string, string];
  tagline: string;
  action: string;
};

const StaysSection = () => {
  const { villas } = useListings();
  const { t } = useLanguage();
  const soleil = villas.find((villa) => villa.id === "AntiguaSoleil");
  const bella = villas.find((villa) => villa.id === "AntiguaBella");

  const cards: StayCard[] = [
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
    },
    {
      key: "SoleilBella",
      title: "Soleil + Bella",
      href: "/request?villa=BothVillas",
      photo: panoBoth,
      meta: ["Two villas", "One request"],
      tagline: "Both residences, requested together.",
      action: t("common_request"),
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
    },
  ];

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

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-5">
          {cards.map((card, i) => (
            <Link
              key={card.key}
              to={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              aria-label={card.external ? `${card.title} on Airbnb (opens in a new tab)` : undefined}
              data-reveal="slide-up"
              data-reveal-delay={String(520 + i * 100)}
              className="stay-card block cursor-pointer overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[3/2] overflow-hidden sm:aspect-[5/4] lg:aspect-square">
                <PropertyPicture
                  photo={card.photo}
                  alt={card.photo.alt}
                  sizes="(min-width: 1024px) 420px, 100vw"
                  pictureClassName="block h-full w-full"
                  className="stay-card-image h-full w-full object-cover object-[center_62%] lg:object-center"
                />
                <div className="stay-card-dim absolute inset-0" />
                <div className="stay-card-action absolute bottom-0 left-0 right-0 z-10 p-5">
                  <span className="luxury-subheading text-[11px] font-bold" style={{ color: "hsl(41 54% 54%)" }}>
                    {card.action} <span className="stay-card-arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6 lg:p-7">
                <h3 className="luxury-heading mb-3 text-xl text-foreground lg:text-[1.35rem]">
                  {card.title}
                </h3>
                <div className="mb-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                  <span>{card.meta[0]}</span>
                  {card.meta[1] ? (
                    <>
                      <span className="text-foreground/20">|</span>
                      <span>{card.meta[1]}</span>
                    </>
                  ) : null}
                </div>
                <p className="luxury-body text-[13px] leading-[1.7] text-muted-foreground/60">
                  {card.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div data-reveal="fade" data-reveal-delay="750" className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row lg:mt-16">
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
