import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PropertyPicture from "@/components/PropertyPicture";
import { sharedCoastIsland } from "@/data/sharedMedia";
const ResortFooter = () => {
  const { t } = useLanguage();

  return <footer id="begin" className="border-t border-border/10 text-foreground">
      <div className="relative isolate overflow-hidden">
        <PropertyPicture
          photo={sharedCoastIsland}
          alt={sharedCoastIsland.alt}
          sizes="100vw"
          pictureClassName="absolute inset-0 block h-full w-full"
          className="h-full w-full object-cover object-[center_42%]"
        />
        <div data-reveal="veil" className="absolute inset-0" aria-hidden="true" />
        <div className="relative px-5 py-12 sm:px-6 sm:py-16 md:px-12 md:py-20 lg:py-28">
          <div className="mx-auto flex min-h-[11rem] max-w-3xl flex-col items-center justify-center text-center sm:min-h-[18rem] lg:min-h-[22rem]">
            <div data-reveal="slide-up">
              <p className="luxury-subheading mb-4 text-primary md:mb-5">Begin</p>
              <h2 className="luxury-heading mb-5 text-[clamp(1.7rem,7.4vw,2.15rem)] leading-[1.12] text-white md:mb-6 md:text-[2.7rem] lg:text-[3.2rem]">
                Good Things Come to Those Who Go Beyond
              </h2>
              <p className="luxury-body mx-auto mb-6 max-w-md text-[15px] text-white/85 md:mb-8 md:text-[18px]">
                ~ AntiguaBella for the Curious Few ~
              </p>
            </div>
            <div data-reveal="fade" data-reveal-delay="180">
              <Link to="/request" className="luxury-btn-bold">
                Plan your stay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Combined footer */}
      <div data-reveal="fade" data-reveal-delay="200" className="mx-auto border-t border-border/8 px-5 py-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center md:justify-start md:text-left">
            <p className="luxury-heading text-sm">
              Antigua<span className="gold-text">Bella</span>
            </p>
            <span className="text-muted-foreground/30 text-[11px]">© 2021</span>
            <a href="mailto:concierge@antiguabella.com" className="text-muted-foreground/40 hover:text-primary text-[10px] uppercase tracking-[0.2em] transition-colors duration-300">
              {t("common_contact_support")}
            </a>
          </div>

          <div className="flex items-center">
            <span aria-hidden="true" className="social-icon-gold p-2">
              <Instagram size={16} strokeWidth={1.3} />
            </span>
            <span aria-hidden="true" className="social-icon-gold p-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </span>
            <span aria-hidden="true" className="social-icon-gold p-2">
              <Twitter size={16} strokeWidth={1.3} />
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 hover:text-primary/40 transition-colors duration-300">
              {t("common_privacy_policy")}
            </Link>
            <Link to="/sitemap" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 hover:text-primary/40 transition-colors duration-300">
              {t("common_sitemap")}
            </Link>
            <Link to="/terms" className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/30 hover:text-primary/40 transition-colors duration-300">
              {t("common_terms_of_service")}
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default ResortFooter;