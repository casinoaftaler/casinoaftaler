import { Link } from "react-router-dom";
import { Users, Gamepad2, Trophy, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CommunityActivityWidgetProps {
  casinoName: string;
  casinoSlug: string;
}

function useCommunityStats() {
  return useQuery({
    queryKey: ["community-activity-stats"],
    queryFn: async () => {
      // Get stats from our own slot machines + bonus hunts
      const [allTimeResult, weeklyResult, huntsResult] = await Promise.all([
        supabase
          .from("slot_game_results")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("slot_game_results")
          .select("user_id, win_amount, bet_amount, is_bonus_triggered")
          .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        supabase
          .from("bonus_hunt_archives")
          .select("hunt_number, average_x, total_slots, opened_slots")
          .order("hunt_number", { ascending: false })
          .limit(3),
      ]);

      const totalSpins = allTimeResult.count ?? 0;

      const weeklyData = weeklyResult.data ?? [];
      const uniqueWeeklyPlayers = new Set(weeklyData.map((r) => r.user_id)).size;
      const weeklySpins = weeklyData.length;
      const weeklyBonuses = weeklyData.filter((r) => r.is_bonus_triggered).length;
      const biggestWeeklyX =
        weeklyData.reduce((max, r) => {
          const x = r.bet_amount > 0 ? (r.win_amount ?? 0) / r.bet_amount : 0;
          return Math.max(max, x);
        }, 0);

      const recentHunts = (huntsResult.data ?? []).map((h) => ({
        number: h.hunt_number,
        avgX: h.average_x,
        totalSlots: h.total_slots,
        openedSlots: h.opened_slots,
      }));

      return {
        totalSpins,
        uniqueWeeklyPlayers,
        weeklySpins,
        weeklyBonuses,
        biggestWeeklyX,
        recentHunts,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return n.toString();
}

export function CommunityActivityWidget({ casinoName, casinoSlug }: CommunityActivityWidgetProps) {
  const { data, isLoading } = useCommunityStats();

  if (isLoading || !data) return null;

  return (
    <section className="mb-12" aria-label={`Community-aktivitet relateret til ${casinoName}`}>
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Community-aktivitet</h3>
            <p className="text-sm text-muted-foreground">
              Live data fra vores spillemaskiner – spillet af {formatNumber(data.uniqueWeeklyPlayers)}+ community-medlemmer
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto text-xs">
            <Zap className="mr-1 h-3 w-3" />
            Opdateres live
          </Badge>
        </div>

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon={Gamepad2}
            value={formatNumber(data.weeklySpins)}
            label="Spins denne uge"
          />
          <StatCard
            icon={Users}
            value={formatNumber(data.uniqueWeeklyPlayers)}
            label="Aktive spillere"
          />
          <StatCard
            icon={Trophy}
            value={`${data.biggestWeeklyX.toFixed(0)}x`}
            label="Største X denne uge"
          />
          <StatCard
            icon={TrendingUp}
            value={formatNumber(data.weeklyBonuses)}
            label="Bonusser trigget"
          />
        </div>

        {/* Recent bonus hunts */}
        {data.recentHunts.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Seneste Bonus Hunts
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.recentHunts.map((hunt) => (
                <Link
                  key={hunt.number}
                  to="/community"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="font-semibold">Hunt #{hunt.number}</span>
                  {hunt.avgX != null && (
                    <Badge variant="outline" className="text-xs">
                      {Number(hunt.avgX).toFixed(1)}x avg
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {hunt.openedSlots}/{hunt.totalSlots} slots
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-4 rounded-lg bg-primary/5 p-4">
          <p className="flex-1 text-sm text-muted-foreground">
            Vi streamer live på Twitch hvor vi bl.a. spiller på {casinoName}.
            Følg med i bonus hunts, spil på vores spillemaskiner og vind præmier i vores community.
          </p>
          <Link
            to="/community"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Gå til Community
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <Card className="border-border bg-card/50">
      <CardContent className="flex items-center gap-3 p-3">
        <Icon className="h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="text-lg font-bold leading-tight">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
