import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TwitchAuthButtonProps {
  className?: string;
}

export function TwitchAuthButton({ className }: TwitchAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTwitchLogin = async () => {
    setIsLoading(true);
    
    try {
      const redirectUri = `${window.location.origin}/auth/callback`;
      
      // Generate random state for CSRF protection
      const state = crypto.randomUUID();
      sessionStorage.setItem("twitch_auth_state", state);
      
      // Get the auth URL from the edge function
      const { data, error } = await supabase.functions.invoke("twitch-auth-url", {
        body: {
          redirect_uri: redirectUri,
          state: state,
        },
      });

      if (error) {
        throw new Error(error.message || "Kunne ikke starte login");
      }

      if (!data?.auth_url) {
        throw new Error("Ingen login-URL modtaget");
      }

      window.location.href = data.auth_url;
    } catch (err) {
      console.error("Twitch login error:", err);
      const message = err instanceof Error ? err.message : "Der opstod en fejl";
      toast({
        title: "Fejl",
        description: message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleTwitchLogin}
      disabled={isLoading}
      className={`bg-[#9146FF] hover:bg-[#7C3AED] text-white ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Logger ind...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
          </svg>
          Log ind med Twitch
        </span>
      )}
    </Button>
  );
}
