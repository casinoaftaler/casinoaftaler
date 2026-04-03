import { SEO } from "@/components/SEO";
import { CommunityPageLayout } from "@/components/community/CommunityPageLayout";
import { useActiveRaffle, useRaffleEntries, useJoinRaffle, useRecentRaffleWinners } from "@/hooks/useRaffle";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Gift, Users, Clock, Trophy, Coins } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { buildArticleSchema, SITE_URL } from "@/lib/seo";

function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const tick = () => {
      const diff = new Date(endsAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("00:00");
        return;
      }
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return (
    <div className="flex items-center gap-2 text-2xl font-mono font-bold tabular-nums">
      <Clock className="h-6 w-6 text-muted-foreground" />
      <span>{timeLeft}</span>
    </div>
  );
}

export default function Raffle() {
  const { user } = useAuth();
  const { data: raffle, isLoading: raffleLoading } = useActiveRaffle();
  const { data: entries } = useRaffleEntries(raffle?.id);
  const joinMutation = useJoinRaffle();
  const { data: winners } = useRecentRaffleWinners();

  const hasJoined = entries?.some((e) => e.user_id === user?.id) ?? false;

  const articleSchema = useMemo(() => buildArticleSchema({
    headline: "Raffle – Vind Gratis Credits Hver 30. Minut",
    description: "Deltag i vores automatiske raffle og vind op til 500 credits hver halve time. Gratis at deltage!",
    url: `${SITE_URL}/community/raffle`,
    datePublished: "2026-04-03",
  }), []);

  return (
    <>
      <SEO
        title="Raffle – Vind Gratis Credits Hver 30. Minut"
        description="Deltag i vores automatiske raffle og vind op til 500 credits hver halve time. Gratis at deltage for alle community-medlemmer."
        jsonLd={{ "@context": "https://schema.org", "@graph": [articleSchema] }}
        breadcrumbLabel="Raffle"
      />
      <CommunityPageLayout
        title="Raffle"
        description="Vind gratis credits hver 30. minut – bare deltag og kryds fingre!"
        badgeText="Gratis Credits"
        badgeIcon={Gift}
      >
        <div className="pb-8 md:pb-12 space-y-6">
          {/* Active Raffle Card */}
          <Card className="border-primary/30 shadow-lg">
            <CardHeader className="text-center pb-2">
              <Badge variant="secondary" className="mx-auto mb-2 w-fit">
                <Gift className="mr-1.5 h-3.5 w-3.5" />
                Aktiv Raffle
              </Badge>
              <CardTitle className="text-2xl md:text-3xl">
                Vind {raffle?.prize_credits ?? 500} Credits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {raffleLoading ? (
                <div className="text-center py-8 text-muted-foreground">Indlæser raffle...</div>
              ) : raffle ? (
                <>
                  {/* Countdown */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-muted-foreground">Raffle slutter om</p>
                    <CountdownTimer endsAt={raffle.ends_at} />
                  </div>

                  {/* Join Button */}
                  <div className="flex flex-col items-center gap-3">
                    {!user ? (
                      <p className="text-sm text-muted-foreground">Log ind for at deltage</p>
                    ) : hasJoined ? (
                      <Badge variant="outline" className="text-base py-2 px-4 bg-primary/5">
                        ✅ Du deltager i denne raffle
                      </Badge>
                    ) : (
                      <Button
                        variant="cta"
                        size="lg"
                        onClick={() => joinMutation.mutate(raffle.id)}
                        disabled={joinMutation.isPending}
                      >
                        <Gift className="h-5 w-5 mr-2" />
                        {joinMutation.isPending ? "Tilmelder..." : "Deltag i Raffle"}
                      </Button>
                    )}
                  </div>

                  {/* Participants */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{entries?.length ?? 0} deltagere</span>
                    </div>
                    {entries && entries.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {entries.map((entry) => (
                          <div key={entry.id} className="flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5 text-sm">
                            <Avatar className="h-5 w-5">
                              {entry.profile?.avatar_url && (
                                <AvatarImage src={entry.profile.avatar_url} />
                              )}
                              <AvatarFallback className="text-[10px]">
                                {(entry.profile?.display_name ?? "?")[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>{entry.profile?.display_name ?? "Anonym"}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Ingen aktiv raffle lige nu. En ny starter snart!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Winners */}
          {winners && winners.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Seneste Vindere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {winners.map((w) => (
                    <div key={w.id} className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {w.winner_profile?.avatar_url && (
                            <AvatarImage src={w.winner_profile.avatar_url} />
                          )}
                          <AvatarFallback className="text-xs">
                            {(w.winner_profile?.display_name ?? "?")[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{w.winner_profile?.display_name ?? "Anonym"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-medium text-primary">
                        <Coins className="h-4 w-4" />
                        {w.prize_credits} credits
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CommunityPageLayout>
    </>
  );
}
