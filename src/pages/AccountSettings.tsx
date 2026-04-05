import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ResortFooter from "@/components/ResortFooter";

const AccountSettings = () => {
  const { currency, setCurrency, supportedCurrencies } = useCurrency();
  const { language, setLanguage, supportedLanguages, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border/10 bg-background/95 backdrop-blur py-6 px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link
            to="/account"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            <span className="luxury-subheading text-[10px] tracking-[0.22em]">{t("common_back")}</span>
          </Link>
          <Link to="/" className="luxury-heading text-foreground/90 text-lg md:text-xl tracking-wide">
            Antigua<span className="gold-text">Bella</span>
          </Link>
          <Link
            to="/request"
            className="luxury-subheading text-[10px] tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {t("common_request")}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-16 md:py-24">
        <p className="luxury-subheading text-primary/60 mb-4">{t("common_account")}</p>
        <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-6">
          {t("account_settings")}
        </h1>
        <div
          className="my-8 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
        />
        <p className="luxury-body text-muted-foreground/80 text-[15px] leading-[1.75] mb-8">
          {t("account_settings_intro")}
        </p>

        <div
          className="rounded-2xl border border-border/40 bg-card p-6 lg:p-8 mb-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p className="luxury-subheading text-primary/60 mb-3">{t("common_currency")}</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as typeof currency)}
              className="luxury-body rounded-lg border border-border/40 bg-background/50 px-4 py-3 text-[13px] text-foreground/80 focus:border-primary/40 focus:outline-none"
            >
              {supportedCurrencies.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <p className="luxury-body text-muted-foreground/60 text-sm">{t("common_language_saved_local")}</p>
          </div>

          <div
            className="mb-8 h-px"
            style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.15), transparent)" }}
          />

          <p className="luxury-subheading text-primary/60 mb-3">{t("common_language_preference")}</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as typeof language)}
              className="luxury-body rounded-lg border border-border/40 bg-background/50 px-4 py-3 text-[13px] text-foreground/80 focus:border-primary/40 focus:outline-none"
            >
              {supportedLanguages.map((option) => (
                <option key={option} value={option}>
                  {option === "en"
                    ? t("common_english")
                    : option === "es"
                      ? t("common_spanish")
                      : t("common_french")}
                </option>
              ))}
            </select>
            <p className="luxury-body text-muted-foreground/60 text-sm">{t("common_language_saved_local")}</p>
          </div>
        </div>

        <Link to="/account" className="luxury-btn-outline inline-block">
          {t("common_back_to_account")}
        </Link>
      </main>

      <ResortFooter />
    </div>
  );
};

export default AccountSettings;
