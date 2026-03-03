import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Trophy, Crown, ChevronRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import { Button } from "@/components/ui/button";
import { useTournamentCountdown } from "@/hooks/useTournamentCountdown";
import "@/styles/community-micro.css";

interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  total_winnings: number;
  twitch_badges: any | null;
}

function AnimatedScore({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span ref={ref}>
      {displayed.toLocaleString("da-DK")}
    </span>
  );
}

export function SidebarLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const countdown = useTournamentCountdown();

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("slot_leaderboard")
        .select("user_id, monthly_winnings")
        .order("monthly_winnings", { ascending: false })
        .limit(5);

      if (!data || data.length === 0) return;

      const userIds = data.map((d) => d.user_id).filter(Boolean) as string[];
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url, twitch_badges")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.user_id, p])
      );

      setEntries(
        data
          .filter((d) => (d as any).monthly_winnings > 0)
          .map((d) => {
            const profile = profileMap.get(d.user_id!);
            return {
              user_id: d.user_id!,
              display_name: profile?.display_name || "Anonym",
              avatar_url: profile?.avatar_url || null,
              total_winnings: (d as any).monthly_winnings || 0,
              twitch_badges: profile?.twitch_badges || null,
            };
          })
      );
    }

    fetch();
  }, []);

  if (entries.length === 0) return null;

  const medals = ["🥇", "🥈", "🥉", "4.", "5."];
  const glowColors = [
    "hsl(45 90% 55% / 0.12)",
    "hsl(220 10% 70% / 0.08)",
    "hsl(25 60% 50% / 0.08)",
    "transparent",
    "transparent",
  ];

  return (
    <div
      ref={containerRef}
      className="community-panel-vertical rounded-xl p-4 overflow-hidden relative"
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(45 90% 55% / 0.3), transparent)",
        }}
      />
      {/* Radial glow behind 1st place */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 w-full h-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(45 90% 55% / 0.06), transparent 70%)",
        }}
      />

      <div className="flex items-center gap-2 mb-1">
        <Trophy className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-bold text-foreground">Månedsturnering</h3>
      </div>

      {/* Countdown + subtitle row */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] text-muted-foreground">Top 5 spillere</p>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
          <Clock className="h-3 w-3" />
          <span>{countdown.label}</span>
        </div>
      </div>

      <ul className="space-y-1.5">
        {entries.map((entry, i) => {
          const profileUrl = entry.display_name !== "Anonym"
            ? `/u/${encodeURIComponent(entry.display_name)}`
            : null;

          const content = (
            <li
              key={entry.user_id}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-all duration-300 ${
                profileUrl ? "cursor-pointer hover:bg-muted/30" : ""
              }`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.4s ease ${i * 0.12}s, transform 0.4s ease ${i * 0.12}s`,
                background: i < 3 ? `radial-gradient(ellipse at left, ${glowColors[i]}, transparent 80%)` : undefined,
              }}
            >
              {/* Crown for 1st place */}
              <span className="relative text-base shrink-0 w-5 text-center">
                {i === 0 && (
                  <Crown
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-3 w-3 text-amber-400"
                    style={{ filter: "drop-shadow(0 0 3px rgba(251,191,36,0.4))" }}
                  />
                )}
                {medals[i]}
              </span>
              <Avatar
                className={`h-6 w-6 shrink-0 transition-transform duration-200 ${
                  profileUrl ? "hover:scale-105" : ""
                }`}
                style={i === 0
                  ? { boxShadow: "0 0 6px rgba(251,191,36,0.3)", border: "1.5px solid rgba(251,191,36,0.35)" }
                  : i === 1
                  ? { border: "1.5px solid rgba(192,192,192,0.25)" }
                  : i === 2
                  ? { border: "1.5px solid rgba(205,127,50,0.25)" }
                  : undefined
                }
              >
                <AvatarImage src={entry.avatar_url || undefined} alt={entry.display_name} />
                <AvatarFallback className="text-[10px]">
                  {entry.display_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className={`flex-1 truncate text-xs flex items-center gap-1 ${
                i === 0 ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}>
                {entry.display_name}
                <TwitchBadgesInline badges={entry.twitch_badges} />
              </span>
              <span className={`text-[11px] font-mono font-semibold tabular-nums ${
                i === 0 ? "text-amber-400" : "text-muted-foreground/70"
              }`}>
                {visible ? <AnimatedScore value={Math.round(entry.total_winnings)} /> : "0"}
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

      {/* "Se alle" button */}
      <Link to="/community/turneringer" className="block no-underline mt-3">
        <Button
          variant="ghost"
          className="w-full text-xs text-muted-foreground hover:text-foreground border border-border/50 hover:border-border"
          size="sm"
        >
          Se alle
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </Link>
    </div>
  );
}
