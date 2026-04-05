import { useLanguage } from "@/contexts/LanguageContext";

const RequestInquiryFraming = () => {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-border/40 bg-secondary/30 p-5 lg:p-6">
      <p className="luxury-subheading text-primary/70 mb-3">
        {t("request_form_eyebrow")}
      </p>
      <h2 className="luxury-heading text-2xl text-foreground mb-3">
        {t("request_form_title")}
      </h2>
      <p className="luxury-body text-muted-foreground/70 text-sm mb-3">
        {t("request_form_copy")}
      </p>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
        {t("request_form_truth_note")}
      </p>
    </div>
  );
};

export default RequestInquiryFraming;
