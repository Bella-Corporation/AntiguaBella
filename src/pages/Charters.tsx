import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import useScrollReveal from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useListings } from "@/hooks/useListings";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ResortFooter from "@/components/ResortFooter";
import ActionListingCard from "@/components/listings/ActionListingCard";
import {
  getListingEyebrow,
  getListingGuestLabel,
  getListingImage,
  getListingPriceLabel,
} from "@/lib/listingPresentation";
import {
  createRequestPath,
  createRequestSelectionContextFromListing,
} from "@/lib/request";

const Charters = () => {
  useScrollReveal();
  usePageMeta({
    title: "Private Charters — AntiguaBella",
    description:
      "Private yacht and boat charters around Antigua and beyond. Enquiry-led — submit your requirements to begin planning.",
    canonicalPath: "/charters",
  });
  const { charters } = useListings();
  const { currency } = useCurrency();
  const { t } = useLanguage();
  const [guestsFilter, setGuestsFilter] = useState("any");

  const filteredCharters = useMemo(() => {
    if (guestsFilter === "any") return charters;
    const minGuests = parseInt(guestsFilter, 10);
    return charters.filter((c) => c.maxGuests != null && c.maxGuests >= minGuests);
  }, [charters, guestsFilter]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[62vh] md:h-[70vh] overflow-hidden">
        <img
          src={charters[0] ? getListingImage(charters[0]) : ""}
          alt="AntiguaBella private charter"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, hsla(0,0%,0%,0.48) 0%, hsla(0,0%,0%,0.25) 50%, hsla(0,0%,0%,0.68) 100%)",
          }}
        />

        {/* Top nav */}
        <div className="absolute top-0 left-0 right-0 z-20 py-6 md:py-8 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span className="luxury-subheading text-[10px] tracking-[0.22em]">{t("common_back")}</span>
            </Link>
            <Link to="/" className="luxury-heading text-foreground/90 text-lg md:text-xl tracking-wide">
              Antigua<span className="gold-text">Bella</span>
            </Link>
            <Link
              to="/request"
              className="luxury-subheading text-[10px] tracking-[0.22em] text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              {t("common_request")}
            </Link>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-14 md:pb-16 px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="luxury-subheading text-primary mb-4"
          >
            {t("charters_eyebrow")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4"
          >
            {t("charters_title_main")} <span className="italic">{t("charters_title_accent")}</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="luxury-divider mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="luxury-body text-foreground/50 max-w-xl text-sm md:text-base"
          >
            {t("charters_copy")}
          </motion.p>
        </div>
      </section>

      {/* Listings */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div
            className="mb-12 flex flex-wrap items-center gap-4 rounded-2xl border border-border/30 bg-card/50 px-5 py-4"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <span className="luxury-subheading text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
              {t("common_refine")}
            </span>
            <select
              value={guestsFilter}
              onChange={(e) => setGuestsFilter(e.target.value)}
              className="luxury-body rounded-lg border border-border/40 bg-background/50 px-4 py-2.5 text-[13px] text-foreground/80 focus:border-primary/40 focus:outline-none"
            >
              <option value="any">{t("common_any_guests")}</option>
              <option value="2">{t("common_guest_count", { count: 2 })}</option>
              <option value="4">{t("common_guest_count", { count: 4 })}</option>
              <option value="6">{t("common_guest_count", { count: 6 })}</option>
              <option value="8">8+ {t("common_guest_plural")}</option>
            </select>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {filteredCharters.length === 0 ? (
              <p className="luxury-body text-muted-foreground/70 text-center py-12 lg:col-span-3">
                {t("charters_no_match")}
              </p>
            ) : (
            filteredCharters.map((charter, i) => (
              <ActionListingCard
                key={charter.id}
                listing={charter}
                index={i}
                eyebrow={getListingEyebrow(charter, "Private charter")}
                meta={
                  <div className="flex flex-wrap gap-3">
                    <span className="text-[11px] text-foreground/50 uppercase tracking-[0.18em]">
                      {charter.location}
                    </span>
                    <span className="text-foreground/15">|</span>
                    <span className="text-[11px] text-foreground/50 uppercase tracking-[0.18em]">
                      {getListingGuestLabel(charter)}
                    </span>
                    <span className="text-foreground/15">|</span>
                    <span className="text-[11px] text-primary/70 uppercase tracking-[0.18em]">
                      {getListingPriceLabel(charter, "charter", currency)}
                    </span>
                  </div>
                }
                detailsTo={`/charters/${encodeURIComponent(charter.id)}`}
                requestTo={createRequestPath(
                  createRequestSelectionContextFromListing(charter)
                )}
              />
            ))
            )}
          </div>
        </div>
      </section>

      <ResortFooter />
    </div>
  );
};

export default Charters;

