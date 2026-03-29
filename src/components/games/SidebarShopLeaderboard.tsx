import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import "@/styles/community-micro.css";

interface ShopLeaderboardEntry {
  username: string;
  points: number;
  avatar_url: string | null;
  display_name: string;
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

export function SidebarShopLeaderboard() {
  const [entries, setEntries] = useState<ShopLeaderboardEntry[]>([]);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: siteSettings } = useSiteSettings();

  const channelId = siteSettings?.streamelements_channel_id;

  useEffect(() => {
    if (!channelId) return;

    async function fetchTop() {
      try {
        // Fetch top 5 from StreamElements
        const response = await fetch(
          `https://api.streamelements.com/kappa/v2/points/${channelId}/top?limit=5`
        );
        if (!response.ok) return;

        const data = await response.json();
        const topUsers: { username: string; points: number }[] = data?.users || [];

        if (topUsers.length === 0) return;

        // Try to match with profiles by twitch_username using profiles_leaderboard won't work
        // Instead fetch profiles that have matching twitch_username
        const usernames = topUsers.map((u) => u.username.toLowerCase());

        // We need to look up profiles by twitch_username - use profiles_public view
        const { data: profiles } = await supabase
          .from("profiles_public" as any)
          .select("user_id, display_name, avatar_url")
          .filter("display_name", "in", `(${usernames.join(",")})`);

        // Fetch badges only for matched users instead of entire leaderboard table
        let badgeMap = new Map<string, any>();
        const profileIds = ((profiles || []) as any[])
          .map((p: any) => p.user_id)
          .filter(Boolean);

        if (profileIds.length > 0) {
          const { data: badgeProfiles } = await supabase
            .from("profiles_leaderboard")
            .select("user_id, twitch_badges")
            .in("user_id", profileIds);

          badgeMap = new Map(
            (badgeProfiles || []).map((p) => [p.user_id, p.twitch_badges])
          );
        }

        // Build a map by lowercase display_name
        const profileMap = new Map(
          ((profiles || []) as any[]).map((p: any) => [p.display_name?.toLowerCase() || "", p])
        );

        // Build badge map by user_id (targeted fetch only)


        setEntries(
          topUsers.map((u) => {
            const profile = profileMap.get(u.username.toLowerCase());
            return {
              username: u.username,
              points: u.points,
              avatar_url: profile?.avatar_url || null,
              display_name: profile?.display_name || u.username,
              twitch_badges: badgeMap.get(u.username.toLowerCase()) || null,
            };
          })
        );
      } catch (err) {
        console.error("Failed to fetch StreamElements top points:", err);
      }
    }

    fetchTop();
  }, [channelId]);

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
        <ShoppingBag className="h-4 w-4 text-amber-400" />
        <h3 className="text-sm font-bold text-foreground">Leaderboard - Butik Points</h3>
      </div>
      <p className="text-[11px] text-muted-foreground mb-3">Top 5 med flest points</p>

      <ul className="space-y-1.5">
        {entries.map((entry, i) => {
          const profileUrl = `/u/${encodeURIComponent(entry.display_name)}`;

          const content = (
            <li
              key={entry.username}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-all duration-300 cursor-pointer hover:bg-muted/30`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.4s ease ${i * 0.12}s, transform 0.4s ease ${i * 0.12}s`,
                background: i < 3 ? `radial-gradient(ellipse at left, ${glowColors[i]}, transparent 80%)` : undefined,
              }}
            >
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
                className="h-6 w-6 shrink-0 transition-transform duration-200 hover:scale-105"
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
                {visible ? <AnimatedScore value={entry.points} /> : "0"}
              </span>
            </li>
          );

          return (
            <Link key={entry.username} to={profileUrl} className="block no-underline">
              {content}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
