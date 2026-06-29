import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard } from "lucide-react";

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

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function ApplePayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 shrink-0"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePayIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

// ─── PaymentForm ──────────────────────────────────────────────────────────────

type PaymentMethod = "apple_pay" | "google_pay" | "card";

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
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  const { villaLabel, checkIn, checkOut, nights, guestCount, bookingRequestId } = booking;

  const successState = {
    villaLabel,
    checkIn,
    checkOut,
    guests: `${guestCount} guest${guestCount !== 1 ? "s" : ""}`,
    nights,
    totalPaid: total,
    bookingConfirmed: true,
  };

  // ── Card submit handler ──────────────────────────────────────────────────────
  const handleCardSubmit = async (e: React.FormEvent) => {
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
      navigate("/request/confirmed", { state: successState });
    } else {
      setProcessing(false);
    }
  };

  // ── Express checkout confirm handler ─────────────────────────────────────────
  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/request/confirmed?booking_id=${bookingRequestId}`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      navigate("/request/confirmed", { state: successState });
    }
  };

  // ── Pill button styles ───────────────────────────────────────────────────────
  const pillBase =
    "w-full py-3 rounded-full border font-aguero text-[11px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer";
  const pillDefault =
    "border-foreground/20 bg-transparent text-foreground/60 hover:border-primary/40 hover:text-foreground/80";
  const pillSelected = "border-primary bg-primary/10 text-primary";

  return (
    <form onSubmit={handleCardSubmit} className="space-y-6">
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

      {/* Method selector pills */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setSelectedMethod("apple_pay")}
          className={`${pillBase} ${selectedMethod === "apple_pay" ? pillSelected : pillDefault}`}
        >
          <ApplePayIcon />
          Apple Pay
        </button>
        <button
          type="button"
          onClick={() => setSelectedMethod("card")}
          className={`${pillBase} ${selectedMethod === "card" ? pillSelected : pillDefault}`}
        >
          <CreditCard className="w-4 h-4 shrink-0" />
          Card
        </button>
        <button
          type="button"
          onClick={() => setSelectedMethod("google_pay")}
          className={`${pillBase} ${selectedMethod === "google_pay" ? pillSelected : pillDefault}`}
        >
          <GooglePayIcon />
          Google Pay
        </button>
      </div>

      {/* Stripe payment element — swaps based on selected method */}
      <div className="rounded-xl overflow-hidden">
        {selectedMethod === "card" ? (
          <PaymentElement
            options={{
              layout: "tabs",
              paymentMethodOrder: ["card"],
              defaultValues: { billingDetails: {} },
              wallets: {
                applePay: "never",
                googlePay: "never",
              },
            }}
          />
        ) : (
          <ExpressCheckoutElement
            options={{
              paymentMethods: {
                applePay: selectedMethod === "apple_pay" ? "always" : "never",
                googlePay: selectedMethod === "google_pay" ? "always" : "never",
                link: "never",
                amazonPay: "never",
              },
            }}
            onConfirm={handleExpressConfirm}
          />
        )}
      </div>

      {/* Inline error */}
      {errorMessage && (
        <p className="text-destructive text-sm font-sans leading-snug">{errorMessage}</p>
      )}

      {/* Submit — card only */}
      {selectedMethod === "card" && (
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
      )}

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
