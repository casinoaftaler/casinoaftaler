import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  total_winnings: number;
}

export function SidebarLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("slot_leaderboard")
        .select("user_id, total_winnings")
        .order("total_winnings", { ascending: false })
        .limit(3);

      if (!data || data.length === 0) return;

      const userIds = data.map((d) => d.user_id).filter(Boolean) as string[];
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.user_id, p])
      );

      setEntries(
        data.map((d) => {
          const profile = profileMap.get(d.user_id!);
          return {
            user_id: d.user_id!,
            display_name: profile?.display_name || "Anonym",
            avatar_url: profile?.avatar_url || null,
            total_winnings: d.total_winnings || 0,
          };
        })
      );
    }

    fetch();
  }, []);

  if (entries.length === 0) return null;

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div
      className="rounded-xl p-4 overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg, hsl(260 28% 15%) 0%, hsl(250 22% 12%) 100%)",
        border: "1px solid hsl(260 40% 30% / 0.25)",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(45 90% 55% / 0.3), transparent)",
        }}
      />

      <div className="flex items-center gap-2 mb-1">
        <Trophy className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-bold text-foreground">Leaderboard</h3>
      </div>
      <p className="text-[11px] text-muted-foreground mb-3">Top 3 i dag</p>

      <ul className="space-y-1.5">
        {entries.map((entry, i) => {
          const profileUrl = entry.display_name !== "Anonym"
            ? `/u/${encodeURIComponent(entry.display_name)}`
            : null;

          const content = (
            <li
              key={entry.user_id}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                profileUrl ? "cursor-pointer hover:bg-muted/30" : ""
              } ${i === 0 ? "bg-amber-500/8" : ""}`}
              style={i === 0 ? { boxShadow: "0 0 12px rgba(251, 191, 36, 0.06)" } : undefined}
            >
              <span className="text-base shrink-0 w-5 text-center">{medals[i]}</span>
              <Avatar className="h-6 w-6 shrink-0">
                <AvatarImage src={entry.avatar_url || undefined} alt={entry.display_name} />
                <AvatarFallback className="text-[10px]">
                  {entry.display_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className={`flex-1 truncate text-xs ${
                i === 0 ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}>
                {entry.display_name}
              </span>
              <span className={`text-[11px] font-mono font-semibold tabular-nums ${
                i === 0 ? "text-amber-400" : "text-muted-foreground/70"
              }`}>
                {Math.round(entry.total_winnings).toLocaleString("da-DK")}
              </span>
            </li>
          );

          if (profileUrl) {
            return (
              <Link key={entry.user_id} to={profileUrl} className="block no-underline">
                {content}
              </Link>
            );
          }
          return content;
        })}
      </ul>
    </div>
  );
}
