import { Link } from "react-router-dom";

import { useLanguage } from "@/contexts/LanguageContext";
import type { BaseListing } from "@/types/index";
import {
  getListingImage,
  getListingTagline,
} from "@/lib/listingPresentation";

interface OverlayListingCardProps {
  listing: BaseListing;
  to: string;
  reveal: string;
  revealDelay: string;
  eyebrow?: string;
}

const OverlayListingCard = ({
  listing,
  to,
  reveal,
  revealDelay,
  eyebrow,
}: OverlayListingCardProps) => {
  const { t } = useLanguage();

  return (
    <Link
      to={to}
      data-reveal={reveal}
      data-reveal-delay={revealDelay}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border/15 image-card-hover"
    >
      <img
        src={getListingImage(listing)}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="w-full h-[210px] sm:h-[260px] lg:h-[340px] object-cover transition-transform duration-2500 ease-out group-hover:scale-[1.06] group-hover:rotate-[0.3deg]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/10 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <p
          className="luxury-subheading text-primary/80 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
        >
          {t("common_details")}
        </p>
        {eyebrow ? (
          <p className="luxury-subheading text-primary/70 mb-2">{eyebrow}</p>
        ) : null}
        <h3
          className="luxury-heading text-lg lg:text-[1.35rem] text-foreground mb-1"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
        >
          {listing.title}
        </h3>
        <p
          className="luxury-body text-foreground/60 text-[13px] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          {getListingTagline(listing)}
        </p>
      </div>
    </Link>
  );
};

export default OverlayListingCard;
