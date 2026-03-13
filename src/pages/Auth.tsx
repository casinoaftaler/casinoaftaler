import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TwitchAuthButton } from "@/components/TwitchAuthButton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Unlink, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

interface Profile {
  twitch_id: string | null;
  twitch_username: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

export default function Auth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [unlinking, setUnlinking] = useState(false);
  const [acceptsTermsAndAge, setAcceptsTermsAndAge] = useState(false);

  // Fetch profile when user is logged in
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        return;
      }

      setProfileLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("twitch_id, twitch_username, display_name, avatar_url")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!error && data) {
        setProfile(data);
      }
      setProfileLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleUnlinkTwitch = async () => {
    if (!user) return;

    setUnlinking(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        twitch_id: null,
        twitch_username: null,
        display_name: null,
        avatar_url: null,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke fjerne Twitch-tilknytning",
        variant: "destructive",
      });
    } else {
      setProfile((prev) => prev ? { ...prev, twitch_id: null, twitch_username: null, display_name: null, avatar_url: null } : null);
      toast({
        title: "Twitch fjernet",
        description: "Din Twitch-konto er nu fjernet fra din profil",
      });
    }
    setUnlinking(false);
  };

  if (loading || profileLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <SEO title="Log ind" description="Log ind med Twitch for at få adgang til Casinoaftaler community." noindex />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // User is logged in
  if (user) {
    const hasTwitchLinked = profile?.twitch_id != null;

    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {hasTwitchLinked ? "Twitch tilknyttet" : "Tilknyt Twitch"}
            </CardTitle>
            <CardDescription>
              {hasTwitchLinked
                ? "Din Twitch-konto er tilknyttet din profil"
                : "Tilknyt din Twitch-konto for at få adgang til eksklusive funktioner"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            {hasTwitchLinked ? (
              <>
                <div className="flex items-center gap-4 rounded-lg border bg-muted/50 p-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.display_name || "Twitch"} />
                    <AvatarFallback className="bg-[#9146FF] text-white text-xl">
                      {profile?.display_name?.charAt(0) || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{profile?.display_name}</p>
                    <p className="text-sm text-muted-foreground">@{profile?.twitch_username}</p>
                  </div>
                </div>

                <a
                  href={`https://twitch.tv/${profile?.twitch_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Se Twitch-kanal
                </a>

                <Button
                  variant="outline"
                  onClick={handleUnlinkTwitch}
                  disabled={unlinking}
                  className="w-full"
                >
                  {unlinking ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Unlink className="mr-2 h-4 w-4" />
                  )}
                  Fjern Twitch-tilknytning
                </Button>

                <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
                  Tilbage til forsiden
                </Button>
              </>
            ) : (
              <>
                <TwitchAuthButton className="w-full" linkMode />
                
                <Button variant="ghost" onClick={() => navigate("/")} className="w-full">
                  Tilbage til forsiden
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is not logged in - show regular Twitch login
  return (
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Log ind</CardTitle>
          <CardDescription>
            Log ind med din Twitch-konto for at få adgang til eksklusive funktioner
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="flex items-start gap-3 w-full">
            <Checkbox
              id="terms-acceptance"
              checked={acceptsTermsAndAge}
              onCheckedChange={(checked) => setAcceptsTermsAndAge(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="terms-acceptance" className="text-sm leading-relaxed cursor-pointer text-muted-foreground">
              Jeg bekræfter at jeg er 18+ år og accepterer{" "}
              <a 
                href="/terms" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                vilkår og betingelser
              </a>{" "}
              og{" "}
              <a 
                href="/privatlivspolitik" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-primary"
                onClick={(e) => e.stopPropagation()}
              >
                privatlivspolitik
              </a>
            </label>
          </div>

          <TwitchAuthButton className="w-full" disabled={!acceptsTermsAndAge} />
        </CardContent>
      </Card>
    </div>
  );
}
