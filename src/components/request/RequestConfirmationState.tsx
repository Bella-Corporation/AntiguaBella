import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useLanguage } from "@/contexts/LanguageContext";
import type { RequestSelectionContext } from "@/lib/request";
import { getRequestTypeLabelKey } from "@/lib/request";

interface RequestConfirmationStateProps {
  context: RequestSelectionContext | null;
}

const RequestConfirmationState = ({
  context,
}: RequestConfirmationStateProps) => {
  const { t } = useLanguage();
  const requestedTypeLabel = context
    ? t(getRequestTypeLabelKey(context.type))
    : null;

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Link to="/" className="luxury-btn-outline text-center">
            {t("common_return_home")}
          </Link>
          <Link to="/stays" className="luxury-btn-outline text-center">
            {t("common_explore_stays")}
          </Link>
          <Link to="/experiences" className="luxury-btn-outline text-center">
            {t("common_explore_experiences")}
          </Link>
          <Link to="/charters" className="luxury-btn-outline text-center">
            {t("common_explore_charters")}
          </Link>
          <Link
            to="/concierge"
            className="luxury-btn-bold text-center sm:col-span-2 lg:col-span-1"
          >
            {t("common_concierge")}
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default RequestConfirmationState;
