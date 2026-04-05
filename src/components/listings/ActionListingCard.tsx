import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";
import type { BaseListing } from "@/types/index";
import {
  getListingImage,
  getListingTagline,
} from "@/lib/listingPresentation";
import { getPrimaryRequestCtaKey } from "@/lib/request";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

interface ActionListingCardProps {
  listing: BaseListing;
  index: number;
  eyebrow: string;
  detailsTo: string;
  requestTo: string;
  chips?: string[];
  meta?: ReactNode;
}

const ActionListingCard = ({
  listing,
  index,
  eyebrow,
  detailsTo,
  requestTo,
  chips,
  meta,
}: ActionListingCardProps) => {
  const { t } = useLanguage();

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="rounded-2xl border border-border/40 bg-card overflow-hidden"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative overflow-hidden">
        <img
          src={getListingImage(listing)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w-full h-[240px] object-cover transition-transform duration-1400 ease-out hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
      </div>

      <div className="p-6 lg:p-7">
        <p className="luxury-subheading text-primary/60 mb-3">{eyebrow}</p>
        <h3 className="luxury-heading text-xl text-foreground mb-3">
          {listing.title}
        </h3>
        <p className="luxury-body text-muted-foreground/60 text-[13px] leading-[1.7] mb-6">
          {getListingTagline(listing)}
        </p>

        {chips && chips.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-6">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-[10px] uppercase tracking-[0.18em] text-foreground/50 border border-border/30 bg-background/30 rounded-full px-3 py-1"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}

        {meta ? <div className="mb-6">{meta}</div> : null}

        <div className="flex gap-3">
          <Link
            to={detailsTo}
            className="luxury-btn-outline flex-1 text-center py-3 px-3 text-[10px] tracking-[0.16em] whitespace-nowrap"
          >
            {t("common_details")}
          </Link>
          <Link
            to={requestTo}
            className="luxury-btn-bold flex-1 text-center py-3 px-3 text-[10px] tracking-[0.16em] whitespace-nowrap"
          >
            {t(getPrimaryRequestCtaKey(listing.type))}
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionListingCard;
