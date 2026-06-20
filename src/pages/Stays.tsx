import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import useScrollReveal from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useListings } from "@/hooks/useListings";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { convertCurrencyAmount, formatCurrencyAmount } from "@/lib/currency";
import ResortFooter from "@/components/ResortFooter";
import {
  getListingGuestLabel,
  getListingHighlights,
  getListingImage,
  getListingPriceLabel,
  getListingTagline,
  getVillaSizeLabel,
} from "@/lib/listingPresentation";
import {
  createRequestPath,
  createRequestSelectionContextFromListing,
} from "@/lib/request";

import resortAerial from "@/assets/resort-aerial.jpg";

const highlights = [
  {
    title: "Private Villas & Suites",
    body: "Each residence is positioned for privacy, calm pacing, and a strong sense of place.",
  },
  {
    title: "Design-Led Residences",
    body: "Caribbean vernacular and contemporary minimalism are combined to frame the island landscape.",
  },
  {
    title: "Dedicated Villa Service",
    body: "Requests are reviewed manually and every stay is followed up directly with clear next steps.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Stays = () => {
  useScrollReveal();
  usePageMeta({
    title: "Private Stays — AntiguaBella",
    description:
      "Browse Antigua's finest private villas and residences. Each stay is matched to your requirements and arranged by personal inquiry.",
    canonicalPath: "/stays",
  });
  const { villas } = useListings();
  const { currency } = useCurrency();
  const { t } = useLanguage();
  const [guestsFilter, setGuestsFilter] = useState("any");
  const [priceFilter, setPriceFilter] = useState("any");

  const priceThresholds = useMemo(
    () => ({
      lower: convertCurrencyAmount(2000, "USD", currency),
      upper: convertCurrencyAmount(4000, "USD", currency),
    }),
    [currency]
  );

  const filteredVillas = useMemo(() => {
    return villas.filter((v) => {
      if (guestsFilter !== "any") {
        const minGuests = parseInt(guestsFilter, 10);
        if (v.maxGuests == null || v.maxGuests < minGuests) return false;
      }
      if (priceFilter !== "any") {
        const p = convertCurrencyAmount(v.price, v.currency, currency);
        if (priceFilter === "under2k" && p >= priceThresholds.lower) return false;
        if (priceFilter === "2k-4k" && (p < priceThresholds.lower || p > priceThresholds.upper)) return false;
        if (priceFilter === "4k+" && p > 0 && p <= priceThresholds.upper) return false;
      }
      return true;
    });
  }, [villas, guestsFilter, priceFilter, currency, priceThresholds]);

  const galleryImages = (() => {
    const unique = Array.from(
      new Set<string>([
        resortAerial,
        ...villas.flatMap((v) => v.images),
        ...villas.flatMap((v) => (v.featuredImage ? [v.featuredImage] : [])),
      ])
    );

    if (unique.length === 0) return [resortAerial];
    return unique.length >= 6 ? unique.slice(0, 6) : [...unique, ...unique].slice(0, 6);
  })();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src={resortAerial}
          alt="Aerial view of AntiguaBella resort villas"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(0,0%,0%,0.45) 0%, hsla(0,0%,0%,0.25) 50%, hsla(0,0%,0%,0.55) 100%)",
          }}
        />

        {/* Back nav */}
        <div className="absolute top-0 left-0 right-0 z-20 py-6 md:py-8 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span className="luxury-subheading text-[10px] tracking-[0.22em]">{t("common_back")}</span>
            </Link>
            <a href="/" className="luxury-heading text-foreground/90 text-lg md:text-xl tracking-wide">
              Antigua<span className="gold-text">Bella</span>
            </a>
            <Link
              to="/request"
              className="luxury-subheading text-[10px] tracking-[0.22em] text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              {t("common_request")}
            </Link>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 md:pb-20 px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="luxury-subheading text-primary mb-4"
          >
            <span style={{ WebkitTextStroke: '0.5px black', textShadow: '-0.3px 0 black, 0 0.3px black, 0.3px 0 black, 0 -0.3px black' }}>{t("stays_eyebrow")}</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="luxury-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-4"
          >
            {t("stays_title_main")} <span className="italic">{t("stays_title_accent")}</span>
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
            className="luxury-body text-foreground/50 max-w-lg text-sm md:text-base"
          >
            {t("stays_copy")}
          </motion.p>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="bg-card border-y border-border/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-10 md:py-16 lg:py-20">
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="text-center md:text-left"
              >
                <h3 className="luxury-heading text-lg text-foreground mb-3">{item.title}</h3>
                <p className="luxury-body text-muted-foreground/60 text-sm leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Villa Listings */}
      <section className="py-12 md:py-20 lg:py-28">
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
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="luxury-body rounded-lg border border-border/40 bg-background/50 px-4 py-2.5 text-[13px] text-foreground/80 focus:border-primary/40 focus:outline-none"
            >
              <option value="any">{t("common_any")}</option>
              <option value="under2k">{t("common_under_amount", { amount: formatCurrencyAmount(priceThresholds.lower, currency) })}</option>
              <option value="2k-4k">
                {t("common_range_amount", {
                  lower: formatCurrencyAmount(priceThresholds.lower, currency),
                  upper: formatCurrencyAmount(priceThresholds.upper, currency),
                })}
              </option>
              <option value="4k+">{t("common_amount_plus", { amount: formatCurrencyAmount(priceThresholds.upper, currency) })}</option>
            </select>
          </div>
          <div className="space-y-14 md:space-y-24 lg:space-y-32">
            {filteredVillas.length === 0 ? (
              <p className="luxury-body text-muted-foreground/70 text-center py-12">
                {t("stays_no_match")}
              </p>
            ) : (
            filteredVillas.map((villa, i) => {
              const isEven = i % 2 === 0;
              const sizeText = getVillaSizeLabel(villa);
              const guestsText = getListingGuestLabel(villa);
              const priceText = getListingPriceLabel(villa, "night", currency);

              return (
                <motion.div
                  key={villa.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                    !isEven ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden rounded-2xl ${!isEven ? "lg:order-2" : ""}`}>
                    <img
                      src={getListingImage(villa)}
                      alt={`${villa.title} at AntiguaBella`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[240px] sm:h-[320px] md:h-[480px] object-cover transition-transform duration-1400 ease-out hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(180deg, transparent 60%, hsla(0,0%,0%,0.3) 100%)",
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className={`flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}>
                    <p className="luxury-subheading text-primary mb-3 text-[10px]">
                      {getListingTagline(villa)}
                    </p>
                    <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-4">
                      {villa.title}
                    </h2>
                    <div className="luxury-divider mb-5 !mx-0" />
                    <p className="luxury-body text-muted-foreground/60 text-sm leading-[1.8] mb-6">
                      {villa.description}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      <span className="luxury-subheading text-[10px] text-foreground/40">
                        {sizeText}
                      </span>
                      <span className="text-foreground/15">|</span>
                      <span className="luxury-subheading text-[10px] text-foreground/40">
                        {guestsText}
                      </span>
                      <span className="text-foreground/15">|</span>
                      <span className="luxury-subheading text-[10px] text-primary/80">
                        {priceText}
                      </span>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-8">
                      {getListingHighlights(villa).map((f) => (
                        <span
                          key={f}
                          className="luxury-body text-foreground/40 text-[13px] flex items-center gap-2"
                        >
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: "hsl(var(--primary))" }}
                          />
                          {f}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={createRequestPath(
                        createRequestSelectionContextFromListing(villa)
                      )}
                      className="luxury-btn-outline self-start"
                    >
                      {t("common_request_stay")}
                    </Link>
                  </div>
                </motion.div>
              );
            })
            )}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-card py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div data-reveal="slide-up" className="section-header mb-12">
            <p className="luxury-subheading text-primary mb-4">Gallery</p>
            <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              A Glimpse of <span className="italic">Paradise</span>
            </h2>
            <div className="luxury-divider mb-6" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-xl aspect-[4/3]"
                >
                  <img
                    src={img}
                    alt={`Resort gallery image ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1400 ease-out hover:scale-[1.05]"
                  />
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 lg:py-28 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <p className="luxury-subheading text-primary mb-4">Begin Your Journey</p>
            <h2 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              {t("stays_ready_main")} <span className="italic">{t("stays_ready_accent")}</span>
            </h2>
            <div className="luxury-divider mb-6" />
            <p className="luxury-body text-muted-foreground/60 text-sm leading-relaxed mb-10">
              {t("stays_ready_copy")}
            </p>
            <Link to="/request" className="luxury-btn-outline">
              {t("common_request_with_concierge")}
            </Link>
          </motion.div>
        </div>
      </section>

      <ResortFooter />
    </div>
  );
};

export default Stays;
