import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const next = sessionStorage.getItem('ab_oauth_next') || '/';
    sessionStorage.removeItem('ab_oauth_next');

    if (!code) {
      navigate("/auth", { replace: true });
      return;
    }

    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        navigate("/auth?error=oauth_failed", { replace: true });
      } else {
        navigate(next, { replace: true });
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="font-aguero text-[12px] tracking-[0.2em] uppercase text-foreground/50 animate-pulse">
        Signing you in…
      </p>
    </div>
  );
};

export default AuthCallback;
