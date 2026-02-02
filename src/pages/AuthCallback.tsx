import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      const errorParam = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      // Check for Twitch errors
      if (errorParam) {
        console.error("Twitch auth error:", errorParam, errorDescription);
        setError(errorDescription || "Der opstod en fejl under login");
        toast({
          title: "Login fejlede",
          description: errorDescription || "Der opstod en fejl under login",
          variant: "destructive",
        });
        setTimeout(() => navigate("/auth"), 3000);
        return;
      }

      // Verify state for CSRF protection
      const savedState = sessionStorage.getItem("twitch_auth_state");
      if (state !== savedState) {
        console.error("State mismatch - possible CSRF attack");
        setError("Sikkerhedsfejl. Prøv igen.");
        toast({
          title: "Sikkerhedsfejl",
          description: "Der opstod en sikkerhedsfejl. Prøv venligst igen.",
          variant: "destructive",
        });
        setTimeout(() => navigate("/auth"), 3000);
        return;
      }

      // Check if this is a linking operation (user was already logged in)
      const isLinking = sessionStorage.getItem("twitch_link_mode") === "true";
      const linkToUserId = sessionStorage.getItem("twitch_link_user_id");

      // Clear the stored state and link info
      sessionStorage.removeItem("twitch_auth_state");
      sessionStorage.removeItem("twitch_link_mode");
      sessionStorage.removeItem("twitch_link_user_id");

      if (!code) {
        setError("Ingen autorisationskode modtaget");
        toast({
          title: "Fejl",
          description: "Ingen autorisationskode modtaget fra Twitch",
          variant: "destructive",
        });
        setTimeout(() => navigate("/auth"), 3000);
        return;
      }

      try {
        // Call our edge function to exchange the code
        const { data, error: fnError } = await supabase.functions.invoke("twitch-auth", {
          body: {
            code,
            redirect_uri: `${window.location.origin}/auth/callback`,
            state,
            // Pass link_to_user_id if this is a linking operation
            ...(isLinking && linkToUserId ? { link_to_user_id: linkToUserId } : {}),
          },
        });

        if (fnError) {
          console.error("Edge function error:", fnError);
          throw new Error(fnError.message || "Failed to authenticate");
        }

        if (!data.success) {
          throw new Error(data.error || "Authentication failed");
        }

        // If this was a linking operation, no need to verify OTP - just redirect
        if (isLinking && data.linked) {
          toast({
            title: "Twitch tilknyttet!",
            description: `Din Twitch-konto (${data.user.display_name}) er nu tilknyttet din profil`,
          });
          navigate("/auth");
          return;
        }

        // Use the token hash to verify the OTP and get a session
        const { error: verifyError } = await supabase.auth.verifyOtp({
          email: data.email,
          token: data.token_hash,
          type: "email",
        });

        if (verifyError) {
          console.error("Verify OTP error:", verifyError);
          throw new Error("Kunne ikke verificere login");
        }

        toast({
          title: "Velkommen!",
          description: `Du er nu logget ind som ${data.user.display_name}`,
        });

        navigate("/");
      } catch (err) {
        console.error("Auth callback error:", err);
        const message = err instanceof Error ? err.message : "Der opstod en fejl";
        setError(message);
        toast({
          title: "Login fejlede",
          description: message,
          variant: "destructive",
        });
        setTimeout(() => navigate("/auth"), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      {error ? (
        <>
          <div className="text-destructive">
            <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>
          <p className="text-lg font-medium text-destructive">{error}</p>
          <p className="text-sm text-muted-foreground">Du bliver omdirigeret...</p>
        </>
      ) : (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">Logger ind med Twitch...</p>
          <p className="text-sm text-muted-foreground">Vent venligst mens vi bekræfter din identitet</p>
        </>
      )}
    </div>
  );
}
