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
      href: "/stays/AntiguaSoleil",
      photo: panoSoleil,
      meta: [
        soleil ? getVillaSizeLabel(soleil) : "AntiguaSoleil",
        soleil ? getListingGuestLabel(soleil) : "",
      ],
      tagline: soleil ? getListingTagline(soleil) : "",
      action: t("common_details"),
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
      href: "/stays/AntiguaBella",
      photo: panoBella,
      meta: [
        bella ? getVillaSizeLabel(bella) : "AntiguaBella",
        bella ? getListingGuestLabel(bella) : "",
      ],
      tagline: bella ? getListingTagline(bella) : "",
      action: t("common_details"),
    },
  ];

  return (
    <section id="stays" className="section-padding bg-card">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        <div className="section-header">
          <p data-reveal="slide-up" data-reveal-delay="120" className="luxury-subheading text-primary mb-4">{t("stays_eyebrow")}</p>
          <h2 data-reveal="slide-up" data-reveal-delay="220" data-scroll-cue className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-5">
            {t("stays_title_main")} <span className="italic">{t("stays_title_accent")}</span>
          </h2>
          <div data-reveal="fade" data-reveal-delay="340" className="luxury-divider mb-6" />
          <p data-reveal="slide-up" data-reveal-delay="420" className="luxury-body text-muted-foreground max-w-lg mx-auto">
            {t("stays_copy")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-5">
          {cards.map((card, i) => (
            <Link
              key={card.key}
              to={card.href}
              data-reveal="slide-up"
              data-reveal-delay={String(520 + i * 100)}
              className="group block cursor-pointer overflow-hidden rounded-2xl transition-colors duration-500"
              style={{ background: "hsl(0 0% 7%)", border: "1px solid hsl(41 54% 54% / 0.2)", boxShadow: "none" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px -4px hsl(41 54% 54% / 0.25), 0 0 40px -8px hsl(41 54% 54% / 0.1)";
                e.currentTarget.style.borderColor = "hsl(41 54% 54% / 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "hsl(41 54% 54% / 0.2)";
              }}
            >
              <div className="relative h-[250px] overflow-hidden sm:h-[300px] lg:aspect-square lg:h-auto">
                <PropertyPicture
                  photo={card.photo}
                  alt={card.photo.alt}
                  sizes="(min-width: 1024px) 420px, 100vw"
                  pictureClassName="block h-full w-full"
                  className="h-full w-full object-cover object-[center_62%] lg:object-center"
                />
                <div className="absolute inset-0 bg-background/0 transition-all duration-700 group-hover:bg-background/30" />
                <div className="absolute bottom-0 left-0 right-0 z-10 translate-y-2 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="luxury-subheading text-[11px] font-bold" style={{ color: "hsl(41 54% 54%)" }}>
                    {card.action} →
                  </span>
                </div>
              </div>
              <div className="p-6 lg:p-7">
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

        <div data-reveal="fade" data-reveal-delay="750" className="mt-14 flex flex-col justify-center gap-4 sm:flex-row lg:mt-16">
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
