import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TwitchAuthButton } from "@/components/TwitchAuthButton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Log ind</CardTitle>
          <CardDescription>
            Log ind med din Twitch-konto for at få adgang til eksklusive funktioner
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Logger ind...</p>
            </div>
          ) : (
            <TwitchAuthButton className="w-full" />
          )}
          
          <p className="text-center text-xs text-muted-foreground">
            Ved at logge ind accepterer du vores{" "}
            <a href="/terms" className="underline hover:text-primary">
              vilkår og betingelser
            </a>{" "}
            og{" "}
            <a href="/privacy" className="underline hover:text-primary">
              privatlivspolitik
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
