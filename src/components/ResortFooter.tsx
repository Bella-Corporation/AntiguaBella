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
        <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
        <div className="relative section-padding">
          <div data-reveal="slide-up" className="mx-auto flex min-h-[280px] max-w-3xl flex-col items-center justify-center text-center sm:min-h-[340px]">
            <p className="luxury-subheading mb-5 text-primary">Begin</p>
            <h2 data-scroll-cue className="luxury-heading mb-6 text-[2rem] leading-[1.15] text-white md:text-[2.7rem] lg:text-[3.2rem]">
              Good Things Come to Those Who Go Beyond
            </h2>
            <p className="luxury-body mx-auto mb-8 max-w-md text-[16px] text-white/85 md:text-[18px]">
              ~ AntiguaBella for the Curious Few ~
            </p>
            <Link to="/request" className="luxury-btn-bold">
              Plan your stay
            </Link>
          </div>
        </div>
      </div>

      {/* Combined footer */}
      <div data-reveal="fade" data-reveal-delay="200" className="border-t border-border/8 py-6 px-6 lg:px-12 mx-auto">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
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

          <div className="flex gap-6">
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