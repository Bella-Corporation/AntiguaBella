import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  getListingEyebrow,
  getListingGuestLabel,
  getListingImage,
  getListingPriceLabel,
  getListingTagline,
  getVillaSizeLabel,
} from "@/lib/listingPresentation";
import type { RequestSelectionContext } from "@/lib/request";
import { getRequestTypeLabelKey } from "@/lib/request";
import type { BaseListing } from "@/types";

interface RequestSelectedItemSummaryProps {
  context: RequestSelectionContext | null;
  listing: BaseListing | null;
}

const RequestSelectedItemSummary = ({
  context,
  listing,
}: RequestSelectedItemSummaryProps) => {
  const { currency } = useCurrency();
  const { t } = useLanguage();

  if (!context) {
    return (
      <section className="flex justify-center px-4">
        <div
          className="w-full max-w-3xl rounded-2xl border border-border/40 bg-card p-6 lg:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p className="luxury-subheading text-primary/60 mb-3">
            {t("request_summary_eyebrow")}
          </p>
          <h1 className="luxury-heading text-2xl lg:text-3xl text-foreground mb-3">
            {t("request_summary_generic_title")}
          </h1>
          <p className="luxury-body text-muted-foreground/70 text-sm">
            {t("request_summary_generic_copy")}
          </p>
        </div>
      </section>
    );
  }

  const typeLabel = t(getRequestTypeLabelKey(context.type));
  const summaryEyebrow =
    listing?.category != null
      ? getListingEyebrow(listing, typeLabel)
      : context.categoryLabel ?? typeLabel;
  const summaryCopy =
    listing != null ? getListingTagline(listing) : context.tagline;
  const imageSrc = listing ? getListingImage(listing) : null;
  const summaryBadges = listing
    ? [
        summaryEyebrow,
        listing.location,
        context.type === "villa"
          ? getListingPriceLabel(listing, "night", currency)
          : context.type === "charter"
            ? getListingPriceLabel(listing, "charter", currency)
            : getListingGuestLabel(listing),
        context.type === "villa"
          ? getVillaSizeLabel(listing)
          : context.type === "charter"
            ? getListingGuestLabel(listing)
            : null,
      ].filter((badge): badge is string => Boolean(badge))
    : [summaryEyebrow].filter((badge): badge is string => Boolean(badge));

  return (
    <section className="flex justify-center px-4">
      <div
        className="w-full max-w-3xl overflow-hidden rounded-2xl border border-border/40 bg-card"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {imageSrc ? (
          <div className="relative h-52 w-full overflow-hidden">
            <img
              src={imageSrc}
              alt={context.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/35 to-transparent" />
          </div>
        ) : null}

        <div className="p-6 lg:p-8">
          <p className="luxury-subheading text-primary/60 mb-3">
            {t("request_summary_selected_label", { itemType: typeLabel })}
          </p>
          <h1 className="luxury-heading text-2xl lg:text-3xl text-foreground mb-3">
            {context.name}
          </h1>
          {summaryCopy ? (
            <p className="luxury-body text-muted-foreground/70 text-sm mb-5">
              {summaryCopy}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            {summaryBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border/30 bg-background/30 px-4 py-2 text-xs text-foreground/70"
              >
                {badge}
              </span>
            ))}
          </div>
          {!listing ? (
            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
              {t("request_summary_fallback_note")}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default RequestSelectedItemSummary;
