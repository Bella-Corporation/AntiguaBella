import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code")
      ?? new URLSearchParams(window.location.hash.slice(1)).get("code");
    const next = sessionStorage.getItem('ab_oauth_next') || '/';

    console.log('[AuthCallback] mounted');
    console.log('[AuthCallback] code:', code ? 'present' : 'MISSING');
    console.log('[AuthCallback] code source:',
      searchParams.get("code") ? 'query param' :
      new URLSearchParams(window.location.hash.slice(1)).get("code") ?
      'hash fragment' : 'not found');
    console.log('[AuthCallback] next from sessionStorage:', next);

    if (!code) {
      console.log('[AuthCallback] no code — redirecting to /auth');
      navigate("/auth", { replace: true });
      return;
    }

    sessionStorage.removeItem('ab_oauth_next');

    supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
      console.log('[AuthCallback] exchangeCodeForSession result:');
      console.log('[AuthCallback] data:', data);
      console.log('[AuthCallback] error:', error);
      if (error) {
        console.log('[AuthCallback] exchange failed — redirecting to /auth?error=oauth_failed');
        navigate("/auth?error=oauth_failed", { replace: true });
      } else {
        console.log('[AuthCallback] exchange succeeded — navigating to:', next);
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
