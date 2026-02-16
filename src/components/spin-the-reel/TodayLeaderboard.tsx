import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Coins, Zap } from "lucide-react";

export function TodayLeaderboard() {
  const { data: topSpins } = useQuery({
    queryKey: ["spin-leaderboard-today"],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from("spin_history")
        .select("user_id, reward_type, reward_value, created_at")
        .gte("created_at", today.toISOString())
        .neq("reward_type", "none")
        .order("reward_value", { ascending: false })
        .limit(5);

      if (error) throw error;
      if (!data || data.length === 0) return [];

      const userIds = [...new Set(data.map((d) => d.user_id))];
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.user_id, p])
      );

      return data.map((d) => ({
        ...d,
        display_name: profileMap.get(d.user_id)?.display_name || "Anonym",
        avatar_url: profileMap.get(d.user_id)?.avatar_url,
      }));
    },
    staleTime: 30_000,
  });

  if (!topSpins || topSpins.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
        <Trophy className="h-4 w-4 text-primary" />
        Top Gevinster i Dag
      </h2>
      <div className="space-y-1.5">
        {topSpins.map((entry, i) => (
          <div
            key={`${entry.user_id}-${entry.created_at}`}
            className="flex items-center justify-between rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm px-4 py-2.5"
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground w-4">#{i + 1}</span>
              {entry.avatar_url ? (
                <img src={entry.avatar_url} alt="" className="h-6 w-6 rounded-full" />
              ) : (
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-[10px] font-bold text-muted-foreground">?</span>
                </div>
              )}
              <span className="text-sm font-medium text-foreground">{entry.display_name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {entry.reward_type === "points" ? (
                <Coins className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Zap className="h-3.5 w-3.5 text-accent" />
              )}
              <span className="text-sm font-bold text-foreground">
                {entry.reward_value} {entry.reward_type === "points" ? "Points" : "Spins"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
