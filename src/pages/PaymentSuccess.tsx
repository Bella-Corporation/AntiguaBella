import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

type VerifyStatus = "loading" | "paid" | "unpaid" | "error";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<VerifyStatus>("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "paid") {
          setStatus("paid");
        } else if (data.status === "unpaid") {
          setStatus("unpaid");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-center py-8 px-6 relative">
        <Link
          to="/"
          className="luxury-heading tracking-wide text-[1.6rem] lg:text-[2rem]"
        >
          <span className="text-foreground/90">
            Antigua<span className="gold-text">Bella</span>
          </span>
        </Link>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 pt-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl rounded-2xl border border-border/40 bg-card p-8 lg:p-12 text-center"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {status === "loading" && (
            <>
              <p className="luxury-subheading text-primary/60 mb-4">Verifying Payment</p>
              <h1 className="luxury-heading text-3xl text-foreground mb-4">One moment…</h1>
              <p className="luxury-body text-muted-foreground/60 text-sm">
                Confirming your deposit with Stripe.
              </p>
            </>
          )}

          {status === "paid" && (
            <>
              <p className="luxury-subheading text-primary/70 mb-4">Payment Confirmed</p>
              <h1 className="luxury-heading text-3xl md:text-4xl text-foreground mb-4">
                Your Deposit is Secured
              </h1>
              <div className="luxury-divider mb-6" />
              <p className="luxury-body text-muted-foreground/70 text-sm max-w-xl mx-auto mb-3">
                Thank you. Your $500 deposit has been received and your requested dates are held.
              </p>
              <p className="luxury-body text-muted-foreground/60 text-sm max-w-xl mx-auto mb-8">
                A member of our team will be in touch within 24 hours to confirm the details
                of your stay and arrange the balance.
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/40 mb-8">
                A receipt has been sent to your email by Stripe.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/" className="luxury-btn-outline text-center">
                  Return Home
                </Link>
                <Link to="/stays" className="luxury-btn-bold text-center">
                  Explore More Stays
                </Link>
              </div>
            </>
          )}

          {status === "unpaid" && (
            <>
              <p className="luxury-subheading text-primary/60 mb-4">Payment Incomplete</p>
              <h1 className="luxury-heading text-3xl text-foreground mb-4">
                Payment Not Processed
              </h1>
              <div className="luxury-divider mb-6" />
              <p className="luxury-body text-muted-foreground/60 text-sm mb-8 max-w-md mx-auto">
                Your inquiry has been saved — only the deposit payment was not completed.
                You can return to your confirmation to try again, or contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/request" className="luxury-btn-outline text-center">
                  Back to Request
                </Link>
                <Link to="/concierge" className="luxury-btn-bold text-center">
                  Contact Concierge
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <p className="luxury-subheading text-primary/60 mb-4">Something Went Wrong</p>
              <h1 className="luxury-heading text-3xl text-foreground mb-4">
                We Could Not Verify Your Payment
              </h1>
              <div className="luxury-divider mb-6" />
              <p className="luxury-body text-muted-foreground/60 text-sm mb-8 max-w-md mx-auto">
                This sometimes happens if the page was refreshed. Your inquiry is safe —
                please contact us directly and we will confirm your payment manually.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/" className="luxury-btn-outline text-center">
                  Return Home
                </Link>
                <Link to="/concierge" className="luxury-btn-bold text-center">
                  Contact Concierge
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default PaymentSuccess;
