import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useLanguage } from "@/contexts/LanguageContext";
import type { RequestSelectionContext } from "@/lib/request";
import { getRequestTypeLabelKey } from "@/lib/request";

interface RequestConfirmationStateProps {
  context: RequestSelectionContext | null;
  inquiryId?: string | null;
  isVillaRequest?: boolean;
}

const RequestConfirmationState = ({
  context,
  inquiryId,
  isVillaRequest,
}: RequestConfirmationStateProps) => {
  const { t } = useLanguage();
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositError, setDepositError] = useState<string | null>(null);
  const requestedTypeLabel = context
    ? t(getRequestTypeLabelKey(context.type))
    : null;

  const handleDepositClick = async () => {
    if (!inquiryId || depositLoading) return;
    setDepositLoading(true);
    setDepositError(null);

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiry_id: inquiryId,
          listing_name: context?.name ?? "AntiguaBella",
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.url) {
        throw new Error(json.error ?? "Could not create checkout session");
      }

      window.location.href = json.url;
    } catch (err) {
      console.error("Deposit checkout error:", err);
      setDepositError("Could not start payment. Please try again or contact us directly.");
      setDepositLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl border border-border/40 bg-card p-8 lg:p-10 text-center"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <p className="luxury-subheading text-primary/70 mb-4">
          {t("common_confirmation")}
        </p>
        <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-4">
          {t("request_confirmation_title")}
        </h1>
        <div className="luxury-divider mb-6" />
        <p className="luxury-body text-muted-foreground/70 text-sm max-w-2xl mx-auto mb-3">
          {t("common_thank_you_request")}
        </p>
        <p className="luxury-body text-muted-foreground/60 text-sm max-w-2xl mx-auto mb-3">
          {t("request_confirmation_copy")}
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60 mb-8">
          {t("request_confirmation_truth_note")}
        </p>
        {context ? (
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70 mb-8">
            {t("common_selection")}: {context.name}
            {requestedTypeLabel ? ` · ${requestedTypeLabel}` : ""}
          </p>
        ) : null}

        {isVillaRequest && inquiryId ? (
          <div className="mt-8 pt-8 border-t border-border/30">
            <p className="luxury-subheading text-primary/60 mb-2">
              Secure Your Dates
            </p>
            <p className="text-sm text-muted-foreground/60 font-sans mb-5 max-w-md mx-auto">
              Pay a $500 deposit to hold your requested dates while we confirm availability.
              Applied to your total balance upon confirmation.
            </p>
            {depositError ? (
              <p className="text-sm text-red-400/80 text-center mb-3">{depositError}</p>
            ) : null}
            <button
              type="button"
              disabled={depositLoading}
              onClick={handleDepositClick}
              className={`
                w-full sm:w-auto mx-auto block px-10 py-4 rounded-lg
                text-[11px] uppercase tracking-[0.25em] font-sans font-medium
                border transition-all duration-500
                ${depositLoading
                  ? "border-border/30 text-muted-foreground/40 cursor-not-allowed"
                  : "border-primary/50 text-primary bg-primary/5 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] cursor-pointer"
                }
              `}
            >
              {depositLoading ? "Redirecting to payment…" : "Pay $500 Deposit — Stripe Checkout"}
            </button>
            <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/30 font-sans">
              Secure checkout · SSL encrypted · Powered by Stripe
            </p>
          </div>
        ) : null}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          <Link to="/" className="luxury-btn-outline text-center">
            {t("common_return_home")}
          </Link>
          <Link to="/stays" className="luxury-btn-outline text-center">
            {t("common_explore_stays")}
          </Link>
          <Link
            to="/concierge"
            className="luxury-btn-bold text-center"
          >
            {t("common_concierge")}
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default RequestConfirmationState;
