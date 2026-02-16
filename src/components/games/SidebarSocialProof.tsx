import { useEffect, useState, useRef } from "react";
import { Users, Dices, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StatItem {
  icon: React.ReactNode;
  value: number | null;
  label: string;
}

function AnimatedCount({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);
  const triggered = useRef(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (value === 0 || triggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const duration = 1000;
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
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={containerRef}>
      {displayed.toLocaleString("da-DK")}
    </span>
  );
}

export function SidebarSocialProof() {
  const [stats, setStats] = useState<StatItem[]>([
    { icon: <Users className="h-4 w-4 text-violet-400" />, value: null, label: "Aktive medlemmer" },
    { icon: <Dices className="h-4 w-4 text-amber-400" />, value: null, label: "Spins spillet" },
    { icon: <Trophy className="h-4 w-4 text-emerald-400" />, value: null, label: "Turneringer denne måned" },
  ]);

  useEffect(() => {
    async function fetchStats() {
      const [membersRes, spinsRes, tournamentsRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }).not("twitch_id", "is", null),
        supabase.from("slot_game_results").select("id", { count: "exact", head: true }),
        supabase
          .from("tournaments")
          .select("id", { count: "exact", head: true })
          .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
      ]);

      setStats((prev) => [
        { ...prev[0], value: membersRes.count ?? null },
        { ...prev[1], value: spinsRes.count ?? null },
        { ...prev[2], value: tournamentsRes.count ?? null },
      ]);
    }

    fetchStats();
  }, []);

  return (
    <div
      className="rounded-xl p-4 overflow-hidden relative community-card"
      style={{
        background: "linear-gradient(180deg, hsl(260 28% 15%) 0%, hsl(250 22% 12%) 100%)",
        border: "1px solid hsl(260 40% 30% / 0.25)",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(260 60% 60% / 0.3), transparent)",
        }}
      />

      <ul className="space-y-3">
        {stats.map((stat, i) => (
          <li
            key={stat.label}
            className="flex items-center gap-3 rounded-lg px-2.5 py-2 transition-all duration-300"
            style={{
              background: "hsl(260 30% 18% / 0.5)",
            }}
          >
            <div
              className="flex items-center justify-center h-8 w-8 rounded-lg shrink-0"
              style={{
                background: i === 0
                  ? "hsl(260 60% 50% / 0.15)"
                  : i === 1
                  ? "hsl(45 90% 55% / 0.12)"
                  : "hsl(150 60% 45% / 0.12)",
              }}
            >
              {stat.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base font-bold text-foreground tabular-nums leading-tight">
                {stat.value !== null ? <AnimatedCount value={stat.value} /> : "–"}
              </span>
              <span className="text-[11px] text-muted-foreground leading-tight">
                {stat.label}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}