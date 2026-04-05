import { Link } from "react-router-dom";
import { useListings } from "@/hooks/useListings";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getListingGuestLabel,
  getListingImage,
  getListingTagline,
  getVillaSizeLabel,
} from "@/lib/listingPresentation";

const StaysSection = () => {
  const { villas } = useListings();
  const { t } = useLanguage();
  const staysPreview = villas.slice(0, 3);

  return (
    <section id="stays" className="section-padding bg-card">
      <div data-reveal="slide-up" className="mx-auto max-w-7xl">
        {/* Header */}
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

        {/* Villa Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {staysPreview.map((villa, i) => (
            <Link
              key={villa.id}
              to={`/stays/${encodeURIComponent(villa.id)}`}
              data-reveal="slide-up"
              data-reveal-delay={String(520 + i * 100)}
              className="group block cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]"
              style={{ background: 'hsl(0 0% 7%)', border: '1px solid hsl(41 54% 54% / 0.2)', boxShadow: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px -4px hsl(41 54% 54% / 0.25), 0 0 40px -8px hsl(41 54% 54% / 0.1)'; e.currentTarget.style.borderColor = 'hsl(41 54% 54% / 0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'hsl(41 54% 54% / 0.2)'; }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={getListingImage(villa)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[320px] lg:h-[380px] object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="luxury-subheading text-[11px] font-bold" style={{ color: 'hsl(41 54% 54%)' }}>
                    {t("common_details")} →
                  </span>
                </div>
              </div>
              <div className="p-6 lg:p-7">
                <h3 className="luxury-heading text-xl lg:text-[1.35rem] text-foreground mb-3">
                  {villa.title}
                </h3>
                <div className="mb-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.18em] text-foreground/45">
                  <span>{getVillaSizeLabel(villa)}</span>
                  <span className="text-foreground/20">|</span>
                  <span>{getListingGuestLabel(villa)}</span>
                </div>
                <p className="luxury-body text-muted-foreground/60 text-[13px] leading-[1.7]">
                  {getListingTagline(villa)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div data-reveal="fade" data-reveal-delay="750" className="mt-14 lg:mt-16 text-center">
          <Link to="/stays" className="luxury-btn-outline">
            {t("common_explore_stays")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StaysSection;
