import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageMeta } from "@/hooks/usePageMeta";
import { supabase } from "@/integrations/supabase/client";

interface ConfirmationState {
  villaLabel:        string;
  checkIn:           string;
  checkOut:          string;
  guests:            string;
  nights:            number | null;
  totalPaid?:        number;   // cents
  bookingConfirmed?: boolean;  // true when arriving from Stripe success
}

const RequestConfirmed = () => {
  const location    = useLocation();
  const navigate    = useNavigate();
  const [searchParams] = useSearchParams();
  const state       = location.state as ConfirmationState | null;

  // bookingConfirmed can be set from state OR confirmed via Supabase lookup
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(
    state?.bookingConfirmed === true
  );
  const [totalPaid, setTotalPaid] = useState<number | undefined>(state?.totalPaid);

  usePageMeta({
    title: "Booking Confirmed — AntiguaBella",
    description: "Your villa booking has been confirmed. Your dates are reserved.",
    canonicalPath: "/request/confirmed",
  });

  // Guard: if someone lands here directly without state, send them back
  useEffect(() => {
    if (!state?.villaLabel) {
      navigate("/request", { replace: true });
    }
  }, [state, navigate]);

  // If arriving from Stripe success_url with ?booking_id= but no confirmed state,
  // verify against Supabase (anon key, RLS SELECT own rows)
  useEffect(() => {
    const bookingId = searchParams.get("booking_id");
    if (!bookingId || bookingConfirmed) return;

    supabase
      .from("booking_requests")
      .select("status, total_amount_cents")
      .eq("id", bookingId)
      .single()
      .then(({ data }) => {
        if (data?.status === "confirmed") {
          setBookingConfirmed(true);
          if (data.total_amount_cents != null) {
            setTotalPaid(data.total_amount_cents);
          }
        }
      })
      .catch(() => {
        // Non-fatal — page still renders with inquiry-received copy
      });
  }, [searchParams, bookingConfirmed]);

  if (!state?.villaLabel) return null;

  const { villaLabel, checkIn, checkOut, guests, nights } = state;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-center py-8 px-6 relative">
        <Link
          to="/"
          className="absolute left-6 lg:left-12 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-sans"
        >
          ← Home
        </Link>
        <Link to="/" className="luxury-heading tracking-wide text-[1.6rem] lg:text-[2rem]">
          <span className="text-foreground/90">
            Antigua<span className="gold-text">Bella</span>
          </span>
        </Link>
      </header>

      <main className="flex justify-center px-4 pb-24 pt-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          {/* Page heading */}
          <div className="text-center mb-10">
            {/* Animated checkmark ring */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="mx-auto mb-6 w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center"
              style={{ boxShadow: "0 0 32px hsl(var(--primary)/0.18)" }}
            >
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                />
              </motion.svg>
            </motion.div>

            {bookingConfirmed ? (
              <>
                <p className="luxury-subheading text-primary/60 mb-3">Payment Received</p>
                <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-4">
                  Booking <span className="italic">Confirmed</span>
                </h1>
                <p className="font-sans text-sm text-muted-foreground/60 leading-relaxed max-w-md mx-auto">
                  Your payment was received and your dates are reserved. A Stripe receipt has been
                  sent to your email.
                </p>
              </>
            ) : (
              <>
                <p className="luxury-subheading text-primary/60 mb-3">Inquiry Received</p>
                <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-4">
                  Thank You for <span className="italic">Reaching Out</span>
                </h1>
                <p className="font-sans text-sm text-muted-foreground/60 leading-relaxed max-w-md mx-auto">
                  We've received your inquiry and will personally follow up within 24 hours
                  to confirm availability and finalize your stay.
                </p>
              </>
            )}
            <div className="luxury-divider mt-6" />
          </div>

          {/* Summary card */}
          <div
            className="rounded-2xl border border-border/40 bg-card overflow-hidden"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="p-6 lg:p-8">
              <p className="luxury-subheading text-primary/60 mb-5">
                {bookingConfirmed ? "Booking Summary" : "Your Inquiry Summary"}
              </p>

              <div className="space-y-3">
                <ConfirmRow label="Villa"     value={villaLabel} />
                <ConfirmRow label="Check-in"  value={checkIn} />
                <ConfirmRow label="Check-out" value={checkOut} />
                {nights != null && (
                  <ConfirmRow
                    label="Duration"
                    value={`${nights} ${nights === 1 ? "night" : "nights"}`}
                  />
                )}
                <ConfirmRow label="Guests" value={guests} />
                {bookingConfirmed && totalPaid != null && (
                  <ConfirmRow
                    label="Total Paid"
                    value={new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(totalPaid / 100)}
                  />
                )}
              </div>

              {/* What happens next */}
              <div
                className="mt-7 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4"
                style={{ boxShadow: "0 0 20px hsl(var(--primary)/0.06)" }}
              >
                <p className="luxury-subheading text-primary/70 text-[10px] mb-1.5 tracking-[0.2em]">
                  What Happens Next
                </p>
                {bookingConfirmed ? (
                  <p className="font-sans text-sm text-foreground/70 leading-relaxed">
                    Your stay is confirmed. Victor and the AntiguaBella team will be in touch
                    before your arrival with everything you need to know.
                  </p>
                ) : (
                  <p className="font-sans text-sm text-foreground/70 leading-relaxed">
                    Victor and the AntiguaBella team review every inquiry personally.
                    You'll hear from us within 24 hours with confirmed availability,
                    a tailored rate, and next steps to secure your stay.
                  </p>
                )}
              </div>
            </div>

            {/* Footer actions */}
            <div className="border-t border-border/20 px-6 py-5 lg:px-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="flex-1 text-center py-3.5 rounded-lg text-[11px] uppercase tracking-[0.3em] font-sans font-medium border border-border/30 text-muted-foreground/50 hover:text-foreground/70 hover:border-border/60 transition-all duration-300"
              >
                Return Home
              </Link>
              <Link
                to="/request"
                className="flex-1 text-center py-3.5 rounded-lg text-[11px] uppercase tracking-[0.3em] font-sans font-medium border border-primary/30 bg-primary/8 text-primary hover:bg-primary/15 hover:shadow-[0_0_24px_hsl(var(--primary)/0.18)] transition-all duration-300"
              >
                {bookingConfirmed ? "Book Another Stay" : "Submit Another Inquiry"}
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

function ConfirmRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[12px] font-sans text-muted-foreground/50 shrink-0">{label}</span>
      <span className="text-[13px] font-sans text-foreground/80 text-right">{value}</span>
    </div>
  );
}

export default RequestConfirmed;
