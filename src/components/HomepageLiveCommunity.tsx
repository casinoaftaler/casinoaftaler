import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Target, Trophy, Gamepad2, Users, TrendingUp, ArrowRight, Tv } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function useHomepageCommunityData() {
  return useQuery({
    queryKey: ["homepage-community-data"],
    queryFn: async () => {
      // Parallel fetches
      const [statsRes, huntRes, leaderboardRes] = await Promise.all([
        supabase.rpc("get_community_stats"),
        supabase
          .from("bonus_hunt_archives")
          .select("hunt_number, average_x, total_slots, opened_slots, created_at")
          .not("average_x", "is", null)
          .gt("total_slots", 0)
          .order("hunt_number", { ascending: false })
          .limit(3),
        supabase
          .from("slot_leaderboard")
          .select("user_id, monthly_winnings")
          .order("monthly_winnings", { ascending: false })
          .limit(3),
      ]);

      const stats = statsRes.data as { active_members?: number; total_spins?: number; tournaments_this_month?: number } | null;
      const hunts = (huntRes.data ?? []).map((h) => ({
        number: h.hunt_number,
        avgX: h.average_x != null ? Number(h.average_x) : null,
        totalSlots: h.total_slots ?? 0,
        date: h.created_at
          ? new Date(h.created_at).toLocaleDateString("da-DK", { day: "numeric", month: "short" })
          : null,
      }));

      // Fetch profiles for leaderboard
      const leaderboardData = (leaderboardRes.data ?? []).filter((d) => (d as any).monthly_winnings > 0);
      let leaders: { name: string; avatarUrl: string | null; points: number }[] = [];

      if (leaderboardData.length > 0) {
        const userIds = leaderboardData.map((d) => d.user_id).filter(Boolean) as string[];
        const { data: profiles } = await supabase
          .from("profiles_leaderboard")
          .select("user_id, display_name, avatar_url")
          .in("user_id", userIds);

        const profileMap = new Map((profiles || []).map((p) => [p.user_id, p]));
        leaders = leaderboardData.map((d) => {
          const profile = profileMap.get(d.user_id!);
          return {
            name: profile?.display_name || "Anonym",
            avatarUrl: profile?.avatar_url || null,
            points: Math.round((d as any).monthly_winnings || 0),
          };
        });
      }

      return {
        activeMembers: stats?.active_members ?? 0,
        totalSpins: stats?.total_spins ?? 0,
        tournamentsThisMonth: stats?.tournaments_this_month ?? 0,
        recentHunts: hunts,
        topPlayers: leaders,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

const medals = ["🥇", "🥈", "🥉"];

export function HomepageLiveCommunity() {
  const { data, isLoading } = useHomepageCommunityData();

  if (isLoading || !data) return null;

  const quickStats = [
    { icon: Users, label: "Aktive medlemmer", value: data.activeMembers.toLocaleString("da-DK"), color: "text-violet-400" },
    { icon: Gamepad2, label: "Spins spillet", value: data.totalSpins.toLocaleString("da-DK"), color: "text-amber-400" },
    { icon: Trophy, label: "Turneringer", value: `${data.tournamentsThisMonth} denne måned`, color: "text-emerald-400" },
  ];

  return (
    <section className="py-8 md:py-12" aria-label="Live fra communityet">
      <div className="container">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold">Live fra Communityet</h2>
          <Tv className="h-5 w-5 text-primary ml-1" />
        </div>
        <p className="text-muted-foreground mb-8 max-w-3xl leading-relaxed">
          Følg med i real-time data fra vores{" "}
          <a href="https://www.twitch.tv/fedesvinsejer" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Twitch-community</a>
          . Alle resultater er dokumenterede og verificerbare – fra live bonus hunts til månedlige turneringer.
        </p>

        {/* Quick stats strip – semantic HTML for crawlers */}
        <dl className="grid grid-cols-3 gap-3 mb-6" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Casinoaftaler.dk" />
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-card p-4 text-center"
              itemProp="interactionStatistic"
              itemScope
              itemType="https://schema.org/InteractionCounter"
            >
              <stat.icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
              <dd className="text-xl md:text-2xl font-bold text-foreground" itemProp="userInteractionCount">{stat.value}</dd>
              <dt className="text-[11px] text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <noscript>
          <p>Casinoaftaler.dk community: 100+ aktive medlemmer, 50.000+ spins spillet, 3+ turneringer denne måned.</p>
        </noscript>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recent bonus hunts */}
          {data.recentHunts.length > 0 && (
            <Card className="border-border bg-card">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-4 w-4 text-primary" />
                  <h3 className="font-bold text-sm">Seneste Bonus Hunts</h3>
                </div>
                <ul className="space-y-2.5">
                  {data.recentHunts.map((hunt) => (
                    <li key={hunt.number}>
                      <Link
                        to={`/bonus-hunt?hunt=${hunt.number}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm font-semibold text-foreground">#{hunt.number}</span>
                          <span className="text-xs text-muted-foreground">{hunt.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground">{hunt.totalSlots} slots</span>
                          <span className={`text-sm font-bold tabular-nums ${hunt.avgX && hunt.avgX >= 1 ? "text-emerald-400" : "text-destructive"}`}>
                            {hunt.avgX?.toFixed(2)}x
                          </span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Separator className="my-3" />
                <Link
                  to="/bonus-hunt/arkiv"
                  className="text-xs text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                >
                  Se alle i arkivet
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Leaderboard */}
          {data.topPlayers.length > 0 && (
            <Card className="border-border bg-card">
              <CardContent className="pt-5">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <h3 className="font-bold text-sm">Månedsturnering – Top 3</h3>
                </div>
                <ul className="space-y-2">
                  {data.topPlayers.map((player, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/30 transition-colors"
                    >
                      <span className="text-base w-6 text-center">{medals[i]}</span>
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={player.avatarUrl || undefined} alt={player.name} />
                        <AvatarFallback className="text-[10px]">
                          {player.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="flex-1 text-sm text-foreground truncate">{player.name}</span>
                      <span className="text-sm font-mono font-semibold tabular-nums text-muted-foreground">
                        {player.points.toLocaleString("da-DK")}
                      </span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-3" />
                <Link
                  to="/community/turneringer"
                  className="text-xs text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                >
                  Se fuld leaderboard
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        {/* CTA row */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button asChild variant="default" className="gap-2">
            <Link to="/bonus-hunt">
              <Target className="h-4 w-4" />
              Se live bonus hunt
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/community/slots">
              <Gamepad2 className="h-4 w-4" />
              Prøv spillehallen
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/slot-database">
              <TrendingUp className="h-4 w-4" />
              Slot Database
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
