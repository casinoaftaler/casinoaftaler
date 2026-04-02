import { useState, useEffect, useRef, useCallback } from "react";
import { Award, Crown, Gamepad2, Gift, Medal, Sparkles, Trophy, Users } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileLink } from "@/components/UserProfileLink";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import type { TwitchBadges as TwitchBadgesType } from "@/hooks/useTwitchBadges";
import { useTournamentLeaderboard, useTournamentParticipants, type Tournament, type TournamentEntry } from "@/hooks/useTournaments";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const GAME_NAMES: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
};

function useIsDark() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

// --- Animated counter with micro-bounce ---
function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current || target === 0) return;
    ref.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setDone(true);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return { value, done };
}

// --- Mouse parallax hook ---
function useParallax(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setOffset({ x, y });
    };
    const reset = () => setOffset({ x: 0, y: 0 });
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", reset);
    return () => { el.removeEventListener("mousemove", handle); el.removeEventListener("mouseleave", reset); };
  }, [ref, enabled]);
  return offset;
}

// --- Animated Grid Background (both modes) ---
function AnimatedGrid({ isDark }: { isDark: boolean }) {
  const gridId = useRef(`lb-grid-${Math.random().toString(36).slice(2, 8)}`).current;
  const fadeId = `${gridId}-fade`;
  const maskId = `${gridId}-mask`;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: isDark ? 0.06 : 0.035 }}>
        <defs>
          <pattern id={gridId} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "hsl(230 70% 60%)" : "hsl(240 60% 55%)"} strokeWidth="0.5" />
          </pattern>
          <radialGradient id={fadeId} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill={`url(#${fadeId})`} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} mask={`url(#${maskId})`}>
          <animateTransform attributeName="transform" type="translate" from="0 0" to="0 40" dur="8s" repeatCount="indefinite" />
        </rect>
      </svg>
      {isDark && (
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle 1px, hsl(230 70% 60% / 0.12) 0%, transparent 100%)",
          backgroundSize: "40px 40px",
          animation: "ctc-gridPulse 4s ease-in-out infinite alternate",
        }} />
      )}
    </div>
  );
}

// --- Floating particles (dark only) ---
function FloatingParticles() {
  const particles = useRef(
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1.5 + Math.random() * 2,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.15 + Math.random() * 0.2,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: "hsl(230 70% 70%)",
            opacity: p.opacity,
            animation: `ctc-floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// --- Light mode ambient motes ---
function LightMotes() {
  const motes = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80,
      size: 80 + Math.random() * 120,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 6,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {motes.map((m) => (
        <div
          key={m.id}
          className="absolute rounded-full"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            background: "radial-gradient(circle, hsl(250 60% 60% / 0.04), transparent 70%)",
            animation: `ctc-lightMote ${m.duration}s ease-in-out ${m.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// --- Rank badge ---
function PremiumRankBadge({ rank, isDark }: { rank: number; isDark: boolean }) {
  const badgeStyle = rank === 1
    ? {
        bg: isDark
          ? "linear-gradient(135deg, hsl(45 85% 55%), hsl(35 90% 45%))"
          : "linear-gradient(135deg, hsl(42 70% 58%), hsl(38 65% 48%))",
        color: "hsl(35 80% 15%)",
        glow: "hsl(45 90% 55% / 0.35)",
      }
    : rank === 2
    ? {
        bg: isDark
          ? "linear-gradient(135deg, hsl(220 10% 72%), hsl(220 10% 58%))"
          : "linear-gradient(135deg, hsl(220 12% 68%), hsl(220 12% 55%))",
        color: "hsl(220 10% 20%)",
        glow: "hsl(220 10% 70% / 0.2)",
      }
    : rank === 3
    ? {
        bg: isDark
          ? "linear-gradient(135deg, hsl(25 60% 52%), hsl(20 55% 42%))"
          : "linear-gradient(135deg, hsl(25 50% 55%), hsl(22 48% 45%))",
        color: "hsl(25 50% 15%)",
        glow: "hsl(25 60% 50% / 0.2)",
      }
    : null;

  if (!badgeStyle) {
    return (
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary/60">
        <span className="text-sm font-semibold text-muted-foreground">{rank}</span>
      </div>
    );
  }

  const Icon = rank === 1 ? Crown : rank === 2 ? Medal : Award;

  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      {/* Glow + shimmer only in dark */}
      {isDark && (
        <>
          <div className="absolute inset-0 rounded-full" style={{
            background: `radial-gradient(circle, ${badgeStyle.glow}, transparent 70%)`,
            animation: rank === 1 ? "ctc-badgePulse 3s ease-in-out infinite" : undefined,
          }} />
          <div className="absolute inset-0 rounded-full overflow-hidden" style={{
            background: badgeStyle.bg,
            opacity: 0.15,
          }}>
            <div className="absolute inset-0" style={{
              background: "linear-gradient(105deg, transparent 30%, hsl(0 0% 100% / 0.3) 50%, transparent 70%)",
              animation: "ctc-shimmerSlide 4s ease-in-out infinite",
            }} />
          </div>
        </>
      )}
      {/* Light mode: soft shadow halo */}
      {!isDark && (
        <div className="absolute inset-[-3px] rounded-full" style={{
          boxShadow: rank === 1
            ? "0 2px 12px hsl(42 70% 50% / 0.2)"
            : rank === 2
            ? "0 2px 12px hsl(220 12% 60% / 0.15)"
            : "0 2px 12px hsl(25 50% 50% / 0.15)",
        }} />
      )}
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{
        background: badgeStyle.bg,
        color: badgeStyle.color,
      }}>
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}

// --- Premium Row ---
function PremiumRow({ entry, rank, isCurrentUser, delay = 0, isDark }: {
  entry: TournamentEntry;
  rank: number;
  isCurrentUser?: boolean;
  delay?: number;
  isDark: boolean;
}) {
  const multiplier = entry.biggest_multiplier > 0 ? `${Number(entry.biggest_multiplier.toFixed(1))}x` : "–";
  const rowRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const el = rowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const strength = isDark ? 4 : 2;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -strength;
    setTilt({ x: y, y: x });
  }, [isDark]);

  const isTop3 = rank <= 3;
  const scale = rank === 1 ? "scale-[1.01]" : rank === 2 ? "scale-[1.005]" : "";

  const rowBg = isDark
    ? isTop3
      ? rank === 1 ? "linear-gradient(135deg, hsl(45 80% 50% / 0.05), hsl(35 70% 40% / 0.02))" : rank === 2 ? "linear-gradient(135deg, hsl(220 10% 65% / 0.05), transparent)" : "linear-gradient(135deg, hsl(25 55% 45% / 0.05), transparent)"
      : "hsl(220 30% 14% / 0.4)"
    : isTop3
      ? rank === 1
        ? "linear-gradient(135deg, hsl(42 80% 95%), hsl(42 60% 97%))"
        : rank === 2
        ? "linear-gradient(135deg, hsl(220 20% 96%), hsl(220 15% 98%))"
        : "linear-gradient(135deg, hsl(25 40% 96%), hsl(25 30% 98%))"
      : undefined;

  const lightRowShadow = !isDark && isTop3
    ? rank === 1
      ? "0 2px 12px hsl(42 70% 50% / 0.08), 0 1px 3px hsl(0 0% 0% / 0.03), inset 0 1px 0 hsl(0 0% 100% / 0.7)"
      : "0 2px 8px hsl(0 0% 0% / 0.04), 0 1px 2px hsl(0 0% 0% / 0.02), inset 0 1px 0 hsl(0 0% 100% / 0.6)"
    : undefined;

  const pointColor = isDark
    ? rank === 1 ? "hsl(45 85% 58%)" : rank === 2 ? "hsl(220 10% 78%)" : rank === 3 ? "hsl(25 55% 58%)" : undefined
    : rank === 1 ? "hsl(38 75% 38%)" : rank === 2 ? "hsl(220 15% 42%)" : rank === 3 ? "hsl(25 50% 36%)" : undefined;

  return (
    <div
      ref={rowRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={cn(
        "group relative flex items-center gap-3 p-4 rounded-2xl cursor-default",
        !isDark && !isTop3 && "bg-card hover:bg-secondary/30",
        !isDark && isTop3 && "border border-border/30",
        isDark && "border border-transparent",
        isTop3 && scale,
        isCurrentUser && "ring-1 ring-primary/30",
      )}
      style={{
        background: rowBg,
        backdropFilter: isDark ? "blur(8px)" : isTop3 ? "blur(4px)" : undefined,
        boxShadow: isDark ? undefined : lightRowShadow,
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease-out, box-shadow 0.25s ease-out, background 0.25s ease-out",
        animation: `ctc-rowSlideIn 0.5s ease-out ${delay}ms both`,
      }}
    >
      {/* Left accent line for top 3 */}
      {isTop3 && (
        <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full" style={{
          background: rank === 1
            ? `linear-gradient(180deg, hsl(42 75% ${isDark ? 55 : 50}%), hsl(42 75% ${isDark ? 55 : 50}% / 0.15))`
            : rank === 2
            ? `linear-gradient(180deg, hsl(220 12% ${isDark ? 70 : 58}%), hsl(220 12% ${isDark ? 70 : 58}% / 0.15))`
            : `linear-gradient(180deg, hsl(25 50% ${isDark ? 50 : 45}%), hsl(25 50% ${isDark ? 50 : 45}% / 0.15))`,
        }} />
      )}

      <PremiumRankBadge rank={rank} isDark={isDark} />

      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <UserProfileLink
          userId={entry.user_id}
          displayName={entry.display_name || "Anonym"}
          avatarUrl={entry.avatar_url}
          avatarClassName={cn("h-9 w-9 ring-2 ring-offset-1 ring-offset-background transition-all duration-200",
            rank === 1 ? "ring-[hsl(45,85%,55%)]" : rank === 2 ? "ring-[hsl(220,10%,65%)]" : rank === 3 ? "ring-[hsl(25,55%,45%)]" : "ring-border/40"
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={cn("font-semibold truncate text-sm", isTop3 ? "text-foreground" : "text-muted-foreground")}>
              {entry.display_name || "Anonym"}
            </span>
            <TwitchBadgesInline badges={entry.twitch_badges as unknown as TwitchBadgesType | null} />
            {isCurrentUser && (
              <Badge variant="outline" className="text-[10px] border-primary/40 text-primary bg-primary/10 px-1.5 py-0">Du</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">{entry.total_spins.toLocaleString()} spins</span>
            <span className="text-xs text-muted-foreground/40">·</span>
            <span className="text-xs font-medium" style={{ color: isDark ? "hsl(142 60% 48%)" : "hsl(152 55% 32%)" }}>
              {multiplier}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right transition-transform duration-250 group-hover:scale-105">
        <span className={cn("text-lg font-bold tabular-nums tracking-tight", !pointColor && "text-foreground")} style={pointColor ? { color: pointColor } : undefined}>
          {entry.total_points.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// --- Hero Winner Section ---
function WinnerHero({ winner, parallax, isDark }: { winner: TournamentEntry; parallax: { x: number; y: number }; isDark: boolean }) {
  const { value: animatedPoints, done } = useCountUp(winner.total_points);
  const multiplier = winner.biggest_multiplier > 0 ? `${Number(winner.biggest_multiplier.toFixed(1))}x` : "–";

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 md:p-10"
      style={{
        background: isDark
          ? "linear-gradient(135deg, hsl(260 55% 18%), hsl(240 45% 15%) 50%, hsl(220 60% 16%))"
          : "linear-gradient(145deg, hsl(245 50% 97%), hsl(230 55% 95%) 40%, hsl(250 45% 96%) 70%, hsl(220 50% 97%))",
        boxShadow: isDark
          ? "0 20px 60px hsl(260 50% 10% / 0.5), 0 4px 12px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(260 40% 30% / 0.15)"
          : "0 12px 40px hsl(240 50% 50% / 0.08), 0 4px 12px hsl(0 0% 0% / 0.03), inset 0 1px 0 hsl(0 0% 100% / 0.8), inset 0 -1px 0 hsl(240 30% 80% / 0.2)",
        transform: `translateZ(40px) translate(${parallax.x * -3}px, ${parallax.y * -3}px)`,
        transition: "transform 0.3s ease-out",
        border: isDark ? undefined : "1px solid hsl(240 30% 90%)",
      }}
    >
      {/* Dark overlays */}
      {isDark && (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 50% 60% at ${50 + parallax.x * 5}% ${35 + parallax.y * 5}%, hsl(260 70% 60% / 0.12), transparent)`,
            transition: "background 0.3s ease-out",
          }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(260 70% 70% / 0.05) 45%, hsl(260 70% 70% / 0.08) 50%, hsl(260 70% 70% / 0.05) 55%, transparent 60%)",
            backgroundSize: "250% 100%",
            animation: "ctc-shimmerHero 10s ease-in-out infinite",
          }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />
          <FloatingParticles />
        </>
      )}

      {/* Light overlays */}
      {!isDark && (
        <>
          {/* Radial luminous glow behind center */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 55% 50% at ${50 + parallax.x * 3}% ${40 + parallax.y * 3}%, hsl(250 65% 70% / 0.08), transparent)`,
            transition: "background 0.3s ease-out",
          }} />
          {/* Top-down ambient light */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(180deg, hsl(0 0% 100% / 0.4) 0%, transparent 50%)",
          }} />
          {/* Subtle grain */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }} />
          {/* Slow shimmer */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "linear-gradient(105deg, transparent 40%, hsl(250 60% 60% / 0.03) 45%, hsl(250 60% 60% / 0.05) 50%, hsl(250 60% 60% / 0.03) 55%, transparent 60%)",
            backgroundSize: "250% 100%",
            animation: "ctc-shimmerHero 12s ease-in-out infinite",
          }} />
        </>
      )}

      <div className="relative flex flex-col items-center text-center space-y-5">
        {/* Trophy with aura */}
        <div className="relative" style={{
          transform: `translate(${parallax.x * -6}px, ${parallax.y * -6}px)`,
          transition: "transform 0.3s ease-out",
        }}>
          {isDark && (
            <div className="absolute -inset-4 blur-2xl" style={{
              background: "radial-gradient(circle, hsl(45 90% 60% / 0.2), transparent 70%)",
              animation: "ctc-auraPulse 4s ease-in-out infinite",
            }} />
          )}
          {!isDark && (
            <div className="absolute -inset-6 blur-3xl" style={{
              background: "radial-gradient(circle, hsl(42 70% 55% / 0.12), transparent 70%)",
            }} />
          )}
          <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{
            background: isDark
              ? "linear-gradient(135deg, hsl(45 85% 55% / 0.12), hsl(45 85% 55% / 0.04))"
              : "linear-gradient(135deg, hsl(42 70% 55% / 0.15), hsl(42 70% 55% / 0.05))",
            border: `1px solid hsl(42 70% 55% / ${isDark ? 0.15 : 0.2})`,
            boxShadow: isDark
              ? "0 0 30px hsl(45 85% 55% / 0.1)"
              : "0 4px 20px hsl(42 70% 50% / 0.12), 0 2px 6px hsl(0 0% 0% / 0.04)",
          }}>
            <MenuIcon iconName="trophy" className="h-8 w-8" />
          </div>
        </div>

        {/* Points */}
        <div style={{ transform: `translate(${parallax.x * -2}px, ${parallax.y * -2}px)`, transition: "transform 0.3s ease-out" }}>
          <p
            className={cn(
              "text-5xl md:text-6xl font-extrabold tracking-tighter tabular-nums",
              done && "ctc-animate-bounce-once",
            )}
            style={{
              color: isDark ? "hsl(0 0% 96%)" : "hsl(245 50% 28%)",
              textShadow: isDark ? "0 0 20px hsl(260 50% 60% / 0.15)" : "0 1px 2px hsl(0 0% 0% / 0.05)",
            }}
          >
            {animatedPoints.toLocaleString()}
          </p>
        </div>

        {/* Winner name + avatar */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            {isDark && (
              <div className="absolute -inset-1 rounded-full" style={{
                background: "radial-gradient(circle, hsl(45 85% 55% / 0.25), transparent 70%)",
              }} />
            )}
            {!isDark && (
              <div className="absolute -inset-1 rounded-full" style={{
                boxShadow: "0 2px 10px hsl(42 70% 50% / 0.15)",
              }} />
            )}
            <UserProfileLink
              userId={winner.user_id}
              displayName={winner.display_name || "Anonym"}
              avatarUrl={winner.avatar_url}
              avatarClassName={cn(
                "h-9 w-9 ring-2 ring-[hsl(45,85%,55%)] ring-offset-2",
                isDark ? "ring-offset-[hsl(250,50%,17%)]" : "ring-offset-[hsl(240,40%,96%)]"
              )}
            />
          </div>
          <span className={cn("font-semibold text-lg", isDark ? "text-[hsl(0,0%,93%)]" : "text-foreground")}>
            {winner.display_name || "Anonym"}
          </span>
          <TwitchBadgesInline badges={winner.twitch_badges as unknown as TwitchBadgesType | null} />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{winner.total_spins.toLocaleString()} spins</span>
          <span className="text-muted-foreground/40">·</span>
          <span style={{ color: isDark ? "hsl(142 60% 50%)" : "hsl(152 55% 32%)" }}>Bedste: {multiplier}</span>
        </div>
      </div>
    </div>
  );
}

// --- Main Component ---
export function CompletedTournamentCard({ tournament }: { tournament: Tournament }) {
  const isDark = useIsDark();
  const [selectedGame, setSelectedGame] = useState<string | undefined>(
    tournament.separate_leaderboards ? tournament.game_ids[0] : undefined
  );
  const { data, isLoading } = useTournamentLeaderboard(tournament.id, selectedGame);
  const { data: participants } = useTournamentParticipants(tournament.id);
  const { user } = useAuth();
  const entries = data?.entries ?? [];
  const currentUser = data?.currentUser;
  const winner = entries.length > 0 ? entries[0] : null;
  const top10 = entries.slice(0, 10);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallax = useParallax(containerRef, true);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-2xl border overflow-hidden",
        isDark ? "border-border/20" : "border-border/40"
      )}
      style={isDark ? {
        background: "hsl(220 30% 8%)",
        boxShadow: "0 8px 40px hsl(0 0% 0% / 0.25), 0 2px 6px hsl(0 0% 0% / 0.15)",
        perspective: "1200px",
      } : {
        background: "linear-gradient(180deg, hsl(0 0% 100%), hsl(240 30% 99%))",
        boxShadow: "0 8px 30px hsl(240 40% 50% / 0.06), 0 2px 8px hsl(0 0% 0% / 0.03), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
        perspective: "1200px",
      }}
    >
      {/* Animated grid (both modes) */}
      <AnimatedGrid isDark={isDark} />

      {/* Dark-only noise texture */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />
      )}

      {/* Light-only ambient motes */}
      {!isDark && <LightMotes />}

      {/* Header */}
      <div className="relative px-5 py-4 border-b border-border/20">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-primary/10">
              <MenuIcon iconName="trophy" className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-foreground truncate">{tournament.title}</h3>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 uppercase font-semibold shrink-0">
                  Afsluttet
                </Badge>
              </div>
              {tournament.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{tournament.description}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          {tournament.prize_text && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              <MenuIcon iconName="gift" className="h-3.5 w-3.5" /> Præmie: {tournament.prize_text}
            </span>
          )}
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <MenuIcon iconName="gamepad2" className="h-3 w-3" />
            {tournament.game_ids.map((id) => GAME_NAMES[id] || id).join(" + ")}
          </span>
        </div>
      </div>

      {/* Game tabs */}
      {tournament.separate_leaderboards && tournament.game_ids.length > 1 && (
        <div className="relative px-5 pt-4">
          <Tabs value={selectedGame} onValueChange={setSelectedGame}>
            <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(${tournament.game_ids.length}, 1fr)` }}>
              {tournament.game_ids.map((gid) => (
                <TabsTrigger key={gid} value={gid} className="text-xs">{GAME_NAMES[gid] || gid}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Content */}
      <div className="relative px-5 py-5">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 rounded-2xl animate-pulse bg-secondary/30" />
            ))}
          </div>
        ) : (
          <>
            {winner && <WinnerHero winner={winner} parallax={parallax} isDark={isDark} />}

            {top10.length > 0 && (
              <div className="mt-5 space-y-2">
                {top10.map((entry, index) => (
                  <PremiumRow
                    key={`${entry.user_id}-${entry.game_id}`}
                    entry={entry}
                    rank={index + 1}
                    isCurrentUser={user?.id === entry.user_id}
                    delay={index * 60}
                    isDark={isDark}
                  />
                ))}
                {currentUser && currentUser.rank > 10 && (
                  <>
                    <div className="flex items-center gap-2 py-2">
                      <div className="flex-1 border-t border-dashed border-border/20" />
                      <span className="text-xs text-muted-foreground">Din placering</span>
                      <div className="flex-1 border-t border-dashed border-border/20" />
                    </div>
                    <PremiumRow entry={currentUser.entry} rank={currentUser.rank} isCurrentUser isDark={isDark} />
                  </>
                )}
              </div>
            )}

            {top10.length === 0 && (
              <div className="text-center py-10">
                <Sparkles className="h-10 w-10 mx-auto mb-2 text-muted-foreground/20" />
                <p className="text-muted-foreground">Ingen har spillet</p>
              </div>
            )}
          </>
        )}

        {participants && participants.length > 0 && (
          <div className={cn(top10.length > 0 ? "mt-6 pt-4 border-t border-border/20" : "")}>
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
              <MenuIcon iconName="users" className="h-3.5 w-3.5" /> {participants.length} deltagere
            </p>
            <div className="flex flex-wrap gap-2">
              {participants.map((p) => (
                <div key={p.user_id} className="flex items-center gap-1.5">
                  <UserProfileLink userId={p.user_id} displayName={p.display_name} avatarUrl={p.avatar_url} avatarClassName="h-6 w-6" showDropdown={false} />
                  <span className="text-xs text-muted-foreground">{p.display_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* All keyframes – namespaced to avoid collisions */}
      <style>{`
        @keyframes ctc-shimmerHero {
          0%, 100% { background-position: 250% 0; }
          50% { background-position: -250% 0; }
        }
        @keyframes ctc-gridPulse {
          0% { opacity: 0.03; }
          100% { opacity: 0.08; }
        }
        @keyframes ctc-floatParticle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-20px) translateX(10px); opacity: 0.1; }
        }
        @keyframes ctc-lightMote {
          0% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          100% { transform: translate(8px, -12px) scale(1.15); opacity: 1; }
        }
        @keyframes ctc-badgePulse {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.15); opacity: 0.5; }
        }
        @keyframes ctc-shimmerSlide {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes ctc-auraPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes ctc-rowSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ctc-animate-bounce-once {
          animation: ctc-microBounce 0.4s ease-out;
        }
        @keyframes ctc-microBounce {
          0% { transform: scale(1); }
          40% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
