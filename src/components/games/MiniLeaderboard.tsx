import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  display_name: string;
  total_winnings: number;
}

export function MiniLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data } = await supabase
        .from("slot_leaderboard")
        .select("user_id, monthly_winnings")
        .order("monthly_winnings", { ascending: false })
        .limit(3);

      if (!data || data.length === 0) return;

      const userIds = data.map((d) => d.user_id).filter(Boolean) as string[];
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.user_id, p.display_name])
      );

      setEntries(
        data
          .filter((d) => (d as any).monthly_winnings > 0)
          .map((d) => ({
            display_name: profileMap.get(d.user_id!) || "Anonym",
            total_winnings: (d as any).monthly_winnings || 0,
          }))
      );
    }

    fetchLeaderboard();
  }, []);

  if (entries.length === 0) return null;

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div
      className="rounded-xl p-4 overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, hsl(260 25% 14%) 0%, hsl(250 20% 11%) 100%)",
        border: "1px solid hsl(260 40% 30% / 0.25)",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(45 90% 55% / 0.3), transparent)",
        }}
      />

      <div className="flex items-center gap-2 mb-3">
        <Trophy className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-bold text-foreground">Månedsturnering</h3>
      </div>

      <ul className="space-y-2">
        {entries.map((entry, i) => (
          <li
            key={i}
            className={`flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition-all duration-300 ${
              i === 0
                ? "bg-amber-500/8"
                : "bg-transparent"
            }`}
            style={i === 0 ? { boxShadow: "0 0 12px rgba(251, 191, 36, 0.06)" } : undefined}
          >
            <span className="text-base shrink-0">{medals[i]}</span>
            <span className={`flex-1 truncate ${i === 0 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              {entry.display_name}
            </span>
            <span className={`text-xs font-mono tabular-nums ${i === 0 ? "text-amber-400" : "text-muted-foreground/70"}`}>
              {Math.round(entry.total_winnings).toLocaleString("da-DK")} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
