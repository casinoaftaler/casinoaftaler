import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Target, Gamepad2, TrendingUp, Users, ArrowRight } from "lucide-react";

interface LiveCommunityDataStripProps {
  /** Context-aware: which cluster is this placed on? */
  context?: "bonus" | "casino" | "slots" | "general";
}

function useLatestHuntStats() {
  return useQuery({
    queryKey: ["live-community-latest-hunt"],
    queryFn: async () => {
      const { data } = await supabase
        .from("bonus_hunt_archives")
        .select("hunt_number, average_x, total_slots, opened_slots, created_at")
        .not("average_x", "is", null)
        .gt("total_slots", 0)
        .order("hunt_number", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!data) return null;
      return {
        huntNumber: data.hunt_number,
        avgX: data.average_x != null ? Number(data.average_x) : null,
        totalSlots: data.total_slots ?? 0,
        date: data.created_at
          ? new Date(data.created_at).toLocaleDateString("da-DK", { day: "numeric", month: "short" })
          : null,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

function useCommunityStats() {
  return useQuery({
    queryKey: ["live-community-quick-stats"],
    queryFn: async () => {
      const { data } = await supabase.rpc("get_community_stats");
      if (!data) return null;
      const d = data as { active_members?: number; total_spins?: number; tournaments_this_month?: number };
      return {
        activeMembers: d.active_members ?? 0,
        totalSpins: d.total_spins ?? 0,
        tournamentsThisMonth: d.tournaments_this_month ?? 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

function useTopLeaderboardEntry() {
  return useQuery({
    queryKey: ["live-community-top-player"],
    queryFn: async () => {
      const { data } = await supabase
        .from("slot_leaderboard")
        .select("user_id, monthly_winnings")
        .order("monthly_winnings", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!data || !(data as any).monthly_winnings) return null;

      const { data: profile } = await supabase
        .from("profiles_leaderboard")
        .select("display_name")
        .eq("user_id", data.user_id!)
        .maybeSingle();

      return {
        name: profile?.display_name || "Anonym",
        points: Math.round((data as any).monthly_winnings || 0),
      };
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function LiveCommunityDataStrip({ context = "general" }: LiveCommunityDataStripProps) {
  const { data: hunt } = useLatestHuntStats();
  const { data: stats } = useCommunityStats();
  const { data: topPlayer } = useTopLeaderboardEntry();

  // Need at least some data
  if (!hunt && !stats) return null;

  const items = [
    hunt && {
      icon: <Target className="h-4 w-4 text-primary" />,
      label: "Seneste hunt",
      value: `#${hunt.huntNumber} – ${hunt.avgX?.toFixed(1)}x avg`,
      to: `/bonus-hunt?hunt=${hunt.huntNumber}`,
    },
    stats && {
      icon: <Users className="h-4 w-4 text-violet-400" />,
      label: "Community",
      value: `${stats.activeMembers.toLocaleString("da-DK")} medlemmer`,
      to: "/community",
    },
    stats && stats.totalSpins > 0 && {
      icon: <Gamepad2 className="h-4 w-4 text-amber-400" />,
      label: "Spins spillet",
      value: stats.totalSpins.toLocaleString("da-DK"),
      to: "/community/slots",
    },
    topPlayer && {
      icon: <Trophy className="h-4 w-4 text-amber-400" />,
      label: "Månedens #1",
      value: `${topPlayer.name} (${topPlayer.points.toLocaleString("da-DK")} pts)`,
      to: "/community/turneringer",
    },
    hunt && {
      icon: <TrendingUp className="h-4 w-4 text-emerald-400" />,
      label: "Slots testet",
      value: `${hunt.totalSlots}+ i seneste hunt`,
      to: "/slot-database",
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; to: string }[];

  // Show max 4 items
  const displayed = items.slice(0, 4);

  return (
    <section className="my-8" aria-label="Live community data">
      <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-card to-card overflow-hidden">
        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm font-bold text-foreground">Live fra vores community</h3>
          <span className="text-[10px] text-muted-foreground ml-auto">Opdateres løbende</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30">
          {displayed.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="flex flex-col gap-1 px-4 py-3 bg-card hover:bg-muted/30 transition-colors group"
            >
              <div className="flex items-center gap-1.5">
                {item.icon}
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                {item.value}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between px-5 py-2.5 border-t border-border/30">
          <p className="text-[11px] text-muted-foreground">
            Data baseret på live bonus hunts og community-turneringer
          </p>
          <Link
            to="/bonus-hunt"
            className="text-[11px] text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
          >
            Se live resultater
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
