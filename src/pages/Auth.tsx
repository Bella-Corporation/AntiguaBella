import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Auth = () => {
  const [searchParamsInit] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParamsInit.get("mode") !== "signup");
  const [isForgot, setIsForgot] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const returnTo = searchParams.get("next") || "/";

  useEffect(() => {
    if (user) {
      const oauthNext = sessionStorage.getItem('ab_oauth_next');
      if (oauthNext) {
        sessionStorage.removeItem('ab_oauth_next');
        navigate(oauthNext);
      } else {
        navigate(returnTo);
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (isForgot) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) setError(error.message);
      else setMessage("Check your email for a password reset link.");
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate(returnTo);
    } else {
      if (!firstName.trim() || !lastName.trim()) {
        setError("First and last name are required.");
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(returnTo)}`,
          data: { first_name: firstName, last_name: lastName },
        },
      });
      if (error) setError(error.message);
      else setMessage("Check your email to confirm your account.");
    }
    setLoading(false);
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    if (oauthLoading) return;
    setOauthLoading(true);
    sessionStorage.setItem('ab_oauth_next', returnTo);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth`,
      },
    });
    setOauthLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <a href="/" className="luxury-heading text-[1.6rem] text-foreground/90">
            Antigua<span className="gold-text">Bella</span>
          </a>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-foreground/5">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => { setIsLogin(true); setIsForgot(false); setError(""); setMessage(""); }}
              className={`flex-1 pb-2 font-aguero text-[12px] tracking-[0.2em] uppercase border-b-2 transition-colors duration-300 ${
                isLogin && !isForgot ? "border-primary text-foreground/90" : "border-transparent text-foreground/30"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setIsForgot(false); setError(""); setMessage(""); }}
              className={`flex-1 pb-2 font-aguero text-[12px] tracking-[0.2em] uppercase border-b-2 transition-colors duration-300 ${
                !isLogin && !isForgot ? "border-primary text-foreground/90" : "border-transparent text-foreground/30"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isForgot && (
            <p className="font-aguero text-[12px] tracking-[0.2em] uppercase text-foreground/60 text-center mb-6">
              Reset Password
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && !isForgot && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            {!isForgot && (
              <div>
                <label className="block font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 pr-12 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {isLogin && !isForgot && (
              <button
                type="button"
                onClick={() => { setIsForgot(true); setError(""); setMessage(""); }}
                className="text-primary/70 hover:text-primary text-xs transition-colors duration-300"
              >
                Forgot password?
              </button>
            )}

            {isForgot && (
              <button
                type="button"
                onClick={() => { setIsForgot(false); setError(""); setMessage(""); }}
                className="text-primary/70 hover:text-primary text-xs transition-colors duration-300"
              >
                ← Back to login
              </button>
            )}

            {error && (
              <p className="text-destructive text-sm text-center">{error}</p>
            )}
            {message && (
              <p className="text-primary text-sm text-center">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-aguero text-[11px] tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "..." : isForgot ? "Send Reset Link" : isLogin ? "Login" : "Create Account"}
            </button>

            {!isForgot && (
              <>
                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 border-t border-foreground/10" />
                  <span className="font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/30">
                    or continue with
                  </span>
                  <div className="flex-1 border-t border-foreground/10" />
                </div>

                {/* Google */}
                <button
                  type="button"
                  disabled={oauthLoading}
                  onClick={() => handleOAuth("google")}
                  className="w-full py-3 rounded-lg bg-background/50 border border-foreground/10 hover:border-primary/40 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-aguero text-[11px] tracking-[0.2em] uppercase text-foreground/80">
                    Continue with Google
                  </span>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  disabled={oauthLoading}
                  onClick={() => handleOAuth("apple")}
                  className="w-full py-3 rounded-lg bg-background/50 border border-foreground/10 hover:border-primary/40 transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <svg width="14" height="18" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                  <span className="font-aguero text-[11px] tracking-[0.2em] uppercase text-foreground/80">
                    Continue with Apple
                  </span>
                </button>
              </>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
