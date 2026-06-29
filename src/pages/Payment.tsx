import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useToast } from "@/hooks/use-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

interface BookingState {
  bookingRequestId: string;
  villaLabel: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestCount: number;
  userId: string;
  userEmail: string;
}

function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

// ─── PaymentForm ──────────────────────────────────────────────────────────────

interface PaymentFormProps {
  booking: BookingState;
  total: number;
}

function PaymentForm({ booking, total }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { villaLabel, checkIn, checkOut, nights, guestCount, bookingRequestId } = booking;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || processing) return;

    setProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/request/confirmed?booking_id=${bookingRequestId}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      navigate("/request/confirmed", {
        state: {
          villaLabel,
          checkIn,
          checkOut,
          guests: `${guestCount} guest${guestCount !== 1 ? "s" : ""}`,
          nights,
          totalPaid: total,
          bookingConfirmed: true,
        },
      });
    } else {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Booking summary */}
      <div className="rounded-xl border border-border/30 bg-background/60 p-5 space-y-2.5">
        <p className="font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-3">
          Booking Summary
        </p>
        <SummaryRow label="Villa" value={villaLabel} />
        <SummaryRow label="Check-in" value={checkIn} />
        <SummaryRow label="Check-out" value={checkOut} />
        <SummaryRow
          label="Duration"
          value={`${nights} ${nights === 1 ? "night" : "nights"}`}
        />
        <SummaryRow
          label="Guests"
          value={`${guestCount} guest${guestCount !== 1 ? "s" : ""}`}
        />
        <div className="pt-3 mt-1 border-t border-border/20 flex items-baseline justify-between">
          <span className="font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40">
            Total
          </span>
          <span className="text-primary text-lg font-medium tracking-wide">
            {formatUsd(total)}
          </span>
        </div>
      </div>

      {/* Stripe Payment Element */}
      <div className="rounded-xl overflow-hidden">
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {/* Inline error */}
      {errorMessage && (
        <p className="text-destructive text-sm font-sans leading-snug">{errorMessage}</p>
      )}

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={!stripe || !elements || processing}
        whileHover={!processing ? { scale: 1.01 } : {}}
        whileTap={!processing ? { scale: 0.99 } : {}}
        className={`
          w-full py-4 rounded-full font-aguero text-[11px] tracking-[0.2em] uppercase
          transition-all duration-300
          ${
            processing
              ? "bg-primary/50 text-background/60 cursor-not-allowed"
              : "bg-primary text-background hover:shadow-[0_0_36px_hsl(var(--primary)/0.40)] cursor-pointer"
          }
        `}
      >
        {processing ? "PROCESSING…" : "CONFIRM BOOKING"}
      </motion.button>

      <p className="text-center text-[10px] font-sans text-muted-foreground/30 leading-relaxed">
        Payments secured by Stripe · 256-bit SSL encryption
      </p>
    </form>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40 shrink-0">
        {label}
      </span>
      <span className="text-sm font-sans text-foreground/80 text-right">{value}</span>
    </div>
  );
}

// ─── Payment Page ─────────────────────────────────────────────────────────────

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const state = location.state as BookingState | null;

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Guard: no booking state → back to /request
  useEffect(() => {
    if (!state?.bookingRequestId) {
      navigate("/request", { replace: true });
    }
  }, [state, navigate]);

  // On mount: create payment intent, fall back to Stripe Checkout on failure
  useEffect(() => {
    if (!state?.bookingRequestId) return;

    const {
      bookingRequestId,
      userId,
      userEmail,
      villaLabel,
      checkIn,
      checkOut,
      nights,
      guestCount,
    } = state;

    // Derive villaId from villaLabel (reverses VILLA_ID_MAP)
    const villaId =
      villaLabel === "AntiguaBella"
        ? "antiguabella"
        : villaLabel === "AntiguaSoleil"
          ? "antiguasoleil"
          : "both";

    const createIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingRequestId,
            userId,
            villaId,
            villaLabel,
            checkIn,
            checkOut,
            nights,
            guestCount,
            userEmail,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.clientSecret) {
          throw new Error(data.error ?? "No client secret returned");
        }

        setClientSecret(data.clientSecret);
        setTotal(data.total);
        setLoading(false);
      } catch {
        // Silent fallback to Stripe Checkout
        try {
          const fallbackRes = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookingRequestId,
              userId,
              villaId,
              villaLabel,
              checkIn,
              checkOut,
              nights,
              guestCount,
              userEmail,
              origin: window.location.origin,
            }),
          });

          const fallbackData = await fallbackRes.json();

          if (fallbackRes.ok && fallbackData.url) {
            window.location.href = fallbackData.url;
            return;
          }
        } catch {
          // both APIs failed
        }

        toast({
          variant: "destructive",
          title: "Payment setup failed",
          description: "Please try again.",
        });
        navigate("/request", { replace: true });
      }
    };

    createIntent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount-only: state is stable at mount

  if (!state?.bookingRequestId) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-center py-8 px-6 relative">
        <Link
          to="/request"
          className="absolute left-6 lg:left-12 text-muted-foreground hover:text-primary transition-colors duration-300 text-xs uppercase tracking-[0.2em] font-sans"
        >
          ← Back
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
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <p className="luxury-subheading text-primary/60 mb-3">Secure Payment</p>
            <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-5">
              Complete Your <span className="italic">Booking</span>
            </h1>
            <div className="luxury-divider" />
          </div>

          <div
            className="rounded-2xl border border-foreground/5 bg-card p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <motion.p
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="font-aguero text-primary/50 tracking-[0.3em] text-xs uppercase"
                >
                  Preparing your booking…
                </motion.p>
              </div>
            ) : clientSecret ? (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "night",
                    variables: {
                      colorPrimary: "#C9A84C",
                      colorBackground: "#0a0a0a",
                      colorText: "#ffffff",
                      colorDanger: "#ef4444",
                      fontFamily: "inherit",
                      borderRadius: "8px",
                      spacingUnit: "4px",
                    },
                  },
                }}
              >
                <PaymentForm booking={state} total={total} />
              </Elements>
            ) : null}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default PaymentPage;
