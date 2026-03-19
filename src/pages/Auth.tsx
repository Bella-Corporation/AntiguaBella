import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate("/");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) setError(error.message);
      else setMessage("Check your email to confirm your account.");
    }
    setLoading(false);
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
              onClick={() => { setIsLogin(true); setError(""); setMessage(""); }}
              className={`flex-1 pb-2 font-aguero text-[12px] tracking-[0.2em] uppercase border-b-2 transition-colors duration-300 ${
                isLogin ? "border-primary text-foreground/90" : "border-transparent text-foreground/30"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(""); setMessage(""); }}
              className={`flex-1 pb-2 font-aguero text-[12px] tracking-[0.2em] uppercase border-b-2 transition-colors duration-300 ${
                !isLogin ? "border-primary text-foreground/90" : "border-transparent text-foreground/30"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
            <div>
              <label className="block font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                placeholder="••••••••"
              />
            </div>
            {!isLogin && (
              <div>
                <label className="block font-aguero text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-background/50 border border-foreground/10 rounded-lg px-4 py-3 text-foreground/80 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            )}

              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            {message && (
              <p className="text-primary text-sm text-center">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-aguero text-[11px] tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
