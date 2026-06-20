import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import useScrollReveal from "@/hooks/useScrollReveal";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getListingById } from "@/lib/listings";
import { getListingPriceLabel } from "@/lib/listingPresentation";
import {
  createRequestPath,
  createRequestSelectionContextFromListing,
} from "@/lib/request";
import { getDetailTrustCopy } from "@/lib/detailTrustCopy";
import type { BaseListing } from "@/types/index";
import ResortFooter from "@/components/ResortFooter";

const listingImage = (l: BaseListing) => l.featuredImage ?? l.images[0];

const villaGuestsLabel = (l: BaseListing) =>
  l.maxGuests != null ? `Up to ${l.maxGuests} guests` : "";

const villaSizeLabel = (l: BaseListing) => {
  if (l.bedrooms != null) return `${l.bedrooms} Bedroom${l.bedrooms === 1 ? "" : "s"}`;
  return l.category ?? "";
};

const villaTagline = (l: BaseListing) => l.subtitle ?? l.shortDescription ?? "";

const VillaDetail = () => {
  useScrollReveal();
  const { currency } = useCurrency();
  const { t } = useLanguage();

  const { villaId } = useParams();

  const villa = useMemo(() => {
    if (!villaId) return null;
    const l = getListingById(villaId);
    return l?.type === "villa" ? l : null;
  }, [villaId]);

  usePageMeta({
    title: villa
      ? `${villa.title} — Private Villa · AntiguaBella`
      : "Villa Not Found — AntiguaBella",
    description: villa
      ? (villa.shortDescription ?? villa.subtitle ?? "A private villa in Antigua, arranged by personal inquiry.")
      : "This villa is not available. Browse all private stays in Antigua on AntiguaBella.",
    canonicalPath: villa ? `/stays/${villaId}` : undefined,
  });

  if (!villa) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="py-8 px-6">
          <div className="mx-auto max-w-7xl flex items-center gap-3">
            <Link
              to="/stays"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span className="text-xs uppercase tracking-[0.2em]">{t("detail_back_to_stays")}</span>
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-24">
          <div className="rounded-2xl border border-border/40 bg-card p-8">
            <p className="luxury-subheading text-primary mb-4">{t("detail_villa_not_found_title")}</p>
            <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-4">{t("detail_villa_missing_heading")}</h1>
            <p className="luxury-body text-muted-foreground/60 text-sm max-w-2xl">
              {t("detail_villa_not_found_copy")}
            </p>
            <div className="mt-8">
              <Link to="/stays" className="luxury-btn-bold inline-block">
                {t("common_browse_stays")}
              </Link>
            </div>
          </div>
        </main>

        <ResortFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[78vh] overflow-hidden">
        <img src={listingImage(villa)} alt={`${villa.title} villa`} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, hsla(0,0%,0%,0.45) 0%, hsla(0,0%,0%,0.25) 45%, hsla(0,0%,0%,0.65) 100%)",
          }}
        />

        {/* Back nav + title */}
        <div className="absolute top-0 left-0 right-0 z-20 py-6 md:py-8 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link
              to="/stays"
              className="flex items-center gap-2 text-foreground/50 hover:text-foreground/80 transition-colors duration-300"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              <span className="luxury-subheading text-[10px] tracking-[0.22em]">{t("common_back")}</span>
            </Link>
            <Link to="/" className="luxury-heading text-foreground/90 text-lg md:text-xl tracking-wide">
              Antigua<span className="gold-text">Bella</span>
            </Link>
          </div>
        </div>

        <div className="relative z-10 h-full flex items-end pb-14 md:pb-16 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-7xl w-full grid lg:grid-cols-[1.4fr_0.6fr] gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="luxury-subheading text-primary/70 mb-3">{t("common_villa")}</p>
              <h1 className="luxury-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">{villa.title}</h1>
              <p className="luxury-body text-foreground/70 text-sm max-w-2xl">{villaTagline(villa)}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
              className="hidden lg:block lg:justify-self-end"
            >
              <div className="rounded-2xl border border-border/40 bg-background/40 backdrop-blur-md p-6">
                <p className="luxury-subheading text-primary/60 mb-2">{t("common_nightly")}</p>
                <div className="luxury-heading text-3xl text-primary mb-3">
                  {getListingPriceLabel(villa, "night", currency)}
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="text-sm text-foreground/70">{villaGuestsLabel(villa)}</span>
                  <span className="text-foreground/20">|</span>
                  <span className="text-sm text-foreground/70">{villaSizeLabel(villa)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-14 md:py-20">
        <div className="grid lg:grid-cols-[1.5fr_0.5fr] gap-10 lg:gap-12 items-start">
          <section>
            <div className="rounded-2xl border border-border/40 bg-card p-5 sm:p-8 lg:p-10" style={{ boxShadow: "var(--shadow-card)" }}>
              <p className="luxury-subheading text-primary mb-4">{t("detail_stay_overview_heading")}</p>
              <p className="luxury-body text-muted-foreground/70 text-sm">{villa.description}</p>

              <div className="my-8 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }} />

              <div>
                <p className="luxury-subheading text-primary/60 mb-4">{t("common_amenities")}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(villa.amenities ?? []).map((f) => (
                    <div
                      key={f}
                      className="rounded-xl border border-border/30 bg-background/30 px-4 py-3"
                      style={{ boxShadow: "none" }}
                    >
                      <p className="text-sm text-foreground/70">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border/40 bg-card p-4 sm:p-6 lg:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
              <p className="luxury-subheading text-primary/60 mb-6">{t("common_next_steps")}</p>

              <div className="space-y-4">
                <div>
                  <Link
                    to={createRequestPath(
                      createRequestSelectionContextFromListing(villa)
                    )}
                    className="luxury-btn-bold block text-center px-3 text-[10px] tracking-[0.16em] whitespace-nowrap"
                  >
                    {t("common_request_stay")}
                  </Link>
                  <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground/60">
                    {getDetailTrustCopy("stay")}
                  </p>
                </div>
                <Link to="/concierge" className="luxury-btn-outline block text-center">
                  {t("common_speak_to_concierge")}
                </Link>
              </div>

              <div className="my-6 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }} />

              <Link to="/stays" className="block text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary font-sans transition-colors duration-300">
                {t("common_explore_more_villas")}
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <ResortFooter />
    </div>
  );
};

export default VillaDetail;

