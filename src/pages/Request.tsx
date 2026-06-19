import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

import AvailabilityCalendar from "@/components/request/AvailabilityCalendar";
import RequestConfirmationState from "@/components/request/RequestConfirmationState";
import RequestInquiryFraming from "@/components/request/RequestInquiryFraming";
import RequestSelectedItemSummary from "@/components/request/RequestSelectedItemSummary";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getListingById } from "@/lib/listings";
import { decodeRequestSelectionContext } from "@/lib/request";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasDefinedCharterDuration = (
  title?: string,
  subtitle?: string,
  shortDescription?: string,
  category?: string,
  tags: string[] = []
) => {
  const source = [title, subtitle, shortDescription, category, ...tags]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    /\bday charter\b/.test(source) ||
    /\bfull[-\s]?day\b/.test(source) ||
    /\bhalf[-\s]?day\b/.test(source) ||
    /\bovernight\b/.test(source) ||
    /\b\d+\s*(hour|hours|hr|hrs)\b/.test(source)
  );
};

const RequestPage = () => {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  usePageMeta({
    title: "Submit an Enquiry — AntiguaBella",
    description:
      "Tell us what you're looking for. Every enquiry is reviewed and fulfilled personally — no automated booking, no live checkout.",
    canonicalPath: "/request",
  });

  const requestContext = useMemo(
    () => decodeRequestSelectionContext(searchParams),
    [searchParams]
  );
  const selectedListing = useMemo(
    () =>
      requestContext?.id != null
        ? getListingById(requestContext.id) ?? null
        : null,
    [requestContext]
  );

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [preferredDepartureTime, setPreferredDepartureTime] = useState("");
  const [duration, setDuration] = useState("");
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneOrWhatsApp, setPhoneOrWhatsApp] = useState("");
  const [notes, setNotes] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  const isStayRequest = requestContext?.type === "villa";
  const isExperienceRequest = requestContext?.type === "experience";
  const isCharterRequest = requestContext?.type === "charter";
  const charterHasDefinedDuration =
    isCharterRequest &&
    hasDefinedCharterDuration(
      selectedListing?.title ?? requestContext?.name,
      selectedListing?.subtitle ?? requestContext?.tagline,
      selectedListing?.shortDescription,
      selectedListing?.category ?? requestContext?.categoryLabel,
      selectedListing?.tags ?? []
    );
  const needsCharterDuration = isCharterRequest && !charterHasDefinedDuration;
  const todayInputValue = format(new Date(), "yyyy-MM-dd");
  const guestLabel =
    guests === 1
      ? t("common_guest_singular")
      : t("common_guest_plural");
  const hasValidEmail = EMAIL_REGEX.test(email.trim());
  const hasValidContact = fullName.trim().length > 0 && hasValidEmail;
  const hasValidStayWindow =
    checkIn != null && checkOut != null && checkOut > checkIn;
  const hasValidGuestCount = Number.isInteger(guests) && guests > 0;
  const hasValidRequestDetails = isStayRequest
    ? hasValidStayWindow && hasValidGuestCount
    : isExperienceRequest
      ? preferredDate.length > 0 && hasValidGuestCount
      : isCharterRequest
        ? preferredDate.length > 0 &&
          hasValidGuestCount &&
          (!needsCharterDuration || duration.trim().length > 0)
        : preferredDate.length > 0 && hasValidGuestCount;
  const submitDisabled = !hasValidContact || !hasValidRequestDetails;

  const handleSubmit = async () => {
    if (submitDisabled || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: fullName.trim(),
      email: email.trim(),
      phone: phoneOrWhatsApp.trim() || null,
      listing_name: requestContext?.name ?? null,
      listing_type: requestContext?.type ?? null,
      check_in: checkIn ? format(checkIn, "yyyy-MM-dd") : null,
      check_out: checkOut ? format(checkOut, "yyyy-MM-dd") : null,
      guests,
      notes: notes.trim() || null,
    };

    const { data: insertedRow, error: dbError } = await supabase
      .from("inquiries")
      .insert(payload)
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      setSubmitError(
        "We couldn't save your request. Please try again, or email us directly at hello@antiguabella.com"
      );
      setIsSubmitting(false);
      return;
    }

    if (insertedRow?.id) {
      setInquiryId(insertedRow.id);
    }

    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (emailErr) {
      console.error("Email notification failed (non-blocking):", emailErr);
    }

    setIsSubmitting(false);
    setRequestSubmitted(true);
  };

  const formatDateInput = (value: string) =>
    value ? new Date(`${value}T00:00:00`) : null;
  const checkInValue = checkIn ? format(checkIn, "yyyy-MM-dd") : "";
  const checkOutValue = checkOut ? format(checkOut, "yyyy-MM-dd") : "";
  const stayWindowLabel =
    checkIn && checkOut
      ? `${format(checkIn, "MMM d, yyyy")} - ${format(checkOut, "MMM d, yyyy")}`
      : checkIn
        ? `${format(checkIn, "MMM d, yyyy")} - ${t("common_departure")}`
        : t("request_summary_pending_value");

  if (requestSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="flex items-center justify-center py-8 px-6 relative">
          <Link
            to="/"
            className="absolute left-6 lg:left-12 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-sans"
          >
            ← {t("common_back")}
          </Link>
          <Link
            to="/"
            className="luxury-heading tracking-wide text-[1.6rem] lg:text-[2rem]"
          >
            <span className="text-foreground/90">
              Antigua<span className="gold-text">Bella</span>
            </span>
          </Link>
        </header>

        <RequestConfirmationState
          context={requestContext}
          inquiryId={inquiryId}
          isVillaRequest={isStayRequest}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <header className="flex items-center justify-center py-8 px-6 relative">
        <Link
          to="/"
          className="absolute left-6 lg:left-12 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-sans"
        >
          ← {t("common_back")}
        </Link>
        <Link
          to="/"
          className="luxury-heading tracking-wide text-[1.6rem] lg:text-[2rem]"
        >
          <span className="text-foreground/90">
            Antigua<span className="gold-text">Bella</span>
          </span>
        </Link>
      </header>

      <RequestSelectedItemSummary
        context={requestContext}
        listing={selectedListing}
      />

      <main className="flex justify-center px-4 pb-32 lg:pb-20 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl rounded-2xl border border-border/40 bg-card overflow-hidden"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="p-6 lg:p-10 space-y-6">
            <RequestInquiryFraming />

            <div className="space-y-4">
              <p className="luxury-subheading text-primary/60">
                {t("request_contact_title")}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <p className="luxury-subheading text-primary/60 mb-0">{t("request_label_full_name")}</p>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    aria-label={t("request_label_full_name")}
                    placeholder={t("request_placeholder_full_name")}
                    required
                    className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <p className="luxury-subheading text-primary/60 mb-0">{t("request_label_email")}</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    aria-label={t("request_label_email")}
                    placeholder={t("request_placeholder_email")}
                    required
                    className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <p className="luxury-subheading text-primary/60 mb-0">{t("request_label_phone_or_whatsapp")}</p>
                  <input
                    type="text"
                    value={phoneOrWhatsApp}
                    onChange={(event) => setPhoneOrWhatsApp(event.target.value)}
                    aria-label={t("request_label_phone_or_whatsapp")}
                    placeholder={t("request_placeholder_phone_or_whatsapp")}
                    className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  />
                  <p className="text-xs text-muted-foreground/60">{t("request_helper_phone_or_whatsapp")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="luxury-subheading text-primary/60">
                {t("request_details_title")}
              </p>

              {isStayRequest ? (
                <AvailabilityCalendar
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onRangeChange={(from, to) => {
                    setCheckIn(from);
                    setCheckOut(to);
                  }}
                  listingId={requestContext?.id ?? null}
                />
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="luxury-subheading text-primary/60 mb-0">
                      {t("request_label_preferred_date")}
                    </p>
                    <input
                      type="date"
                      min={todayInputValue}
                      value={preferredDate}
                      aria-label={t("request_label_preferred_date")}
                      onChange={(event) => setPreferredDate(event.target.value)}
                      required
                      className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                    />
                  </div>
                  {isExperienceRequest ? (
                    <div className="space-y-2">
                      <p className="luxury-subheading text-primary/60 mb-0">
                        {t("request_label_preferred_time")}
                      </p>
                      <input
                        type="time"
                        value={preferredTime}
                        aria-label={t("request_label_preferred_time")}
                        onChange={(event) => setPreferredTime(event.target.value)}
                        className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                      />
                    </div>
                  ) : null}
                  {isCharterRequest ? (
                    <div className="space-y-2">
                      <p className="luxury-subheading text-primary/60 mb-0">
                        {t("request_label_preferred_departure_time")}
                      </p>
                      <input
                        type="time"
                        value={preferredDepartureTime}
                        aria-label={t("request_label_preferred_departure_time")}
                        onChange={(event) =>
                          setPreferredDepartureTime(event.target.value)
                        }
                        className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                      />
                    </div>
                  ) : null}
                  {needsCharterDuration ? (
                    <div className="space-y-2 sm:col-span-2">
                      <p className="luxury-subheading text-primary/60 mb-0">
                        {t("request_label_duration")}
                      </p>
                      <input
                        type="text"
                        value={duration}
                        aria-label={t("request_label_duration")}
                        onChange={(event) => setDuration(event.target.value)}
                        placeholder={t("request_placeholder_duration")}
                        required
                        className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                      />
                    </div>
                  ) : null}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">
                  {isStayRequest
                    ? t("request_label_guests")
                    : t("request_label_group_size")}
                </span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    aria-label={`Decrease ${isStayRequest
                      ? t("request_label_guests")
                      : t("request_label_group_size")}`}
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary hover:shadow-[0_0_10px_hsl(var(--primary)/0.12)] transition-all duration-300"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span aria-live="polite" className="text-lg font-sans font-light text-primary min-w-16 text-center">
                    {guests} {guestLabel}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${isStayRequest
                      ? t("request_label_guests")
                      : t("request_label_group_size")}`}
                    onClick={() => setGuests(Math.min(12, guests + 1))}
                    className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary/40 hover:text-primary hover:shadow-[0_0_10px_hsl(var(--primary)/0.12)] transition-all duration-300"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="luxury-subheading text-primary/60">
                {t("request_notes_title")}
              </p>
              <p className="luxury-subheading text-primary/60 mb-0">{t("request_label_notes")}</p>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                aria-label={t("request_label_notes")}
                placeholder={t("request_placeholder_notes")}
                rows={3}
                className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors resize-y"
              />
              <p className="text-xs text-muted-foreground/60">{t("request_helper_notes")}</p>
            </div>

            <div className="rounded-xl bg-secondary/40 p-5">
              <p className="luxury-subheading text-primary/60 mb-4">
                {t("request_inquiry_summary")}
              </p>
              <div className="space-y-4">
                {requestContext ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-sans">
                      {t("common_selection")}
                    </span>
                    <span className="text-sm text-foreground/80 text-right">
                      {requestContext.name}
                    </span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-sans">
                    {isStayRequest
                      ? t("request_stay_window")
                      : t("common_preferred_date")}
                  </span>
                  <span className="text-sm text-foreground/80 text-right">
                    {isStayRequest
                      ? stayWindowLabel
                      : preferredDate || t("request_summary_pending_value")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-sans">
                    {isStayRequest
                      ? t("request_label_guests")
                      : t("request_label_group_size")}
                  </span>
                  <span className="text-sm text-foreground/80 text-right">
                    {guests} {guestLabel}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/50">
              {t("request_availability_note")}
            </p>

            {submitError ? (
              <p className="text-sm text-red-400/80 text-center px-2 -mb-2">
                {submitError}
              </p>
            ) : null}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={submitDisabled || isSubmitting}
              onClick={handleSubmit}
              className={`
                w-full py-4 rounded-lg text-[11px] uppercase tracking-[0.25em] font-sans font-medium
                border transition-all duration-500
                ${
                  submitDisabled || isSubmitting
                    ? "border-border/30 text-muted-foreground/40 cursor-not-allowed"
                    : "border-primary/50 text-primary bg-primary/5 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] cursor-pointer"
                }
              `}
            >
              {isSubmitting ? "Sending…" : t("request_submit")}
            </motion.button>

            <Link
              to="/concierge"
              className="block text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary font-sans transition-colors duration-300"
            >
              {t("common_speak_to_concierge")}
            </Link>
          </div>
        </motion.div>
      </main>

      <div className="fixed bottom-6 left-6 z-50">
        <AnimatePresence>
          {chatOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-4 w-72 rounded-2xl border border-primary/20 bg-card overflow-hidden"
              style={{ boxShadow: "0 8px 30px -8px hsl(0 0% 0% / 0.7)" }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border/30">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
                  Concierge
                </span>
                <button
                  type="button"
                  aria-label="Close concierge chat"
                  onClick={() => setChatOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-4 h-48 flex items-end">
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  {t("request_chat_intro")}
                </p>
              </div>
              <div className="p-3 border-t border-border/30">
                <input
                  type="text"
                  aria-label="Concierge note"
                  placeholder={t("request_chat_placeholder")}
                  className="w-full bg-secondary/40 rounded-lg px-3 py-2 text-sm font-sans text-foreground/80 placeholder:text-muted-foreground/40 outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <motion.button
          type="button"
          aria-label={chatOpen ? "Close concierge chat" : "Open concierge chat"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setChatOpen(!chatOpen)}
          className="w-12 h-12 rounded-full border border-primary/30 bg-card flex items-center justify-center hover:shadow-[0_0_16px_hsl(var(--primary)/0.15)] transition-all duration-300"
        >
          <span className="text-primary text-lg">🍍</span>
        </motion.button>
      </div>
    </div>
  );
};

export default RequestPage;
