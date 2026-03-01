import { useState, useEffect, useRef } from "react";
import { Trophy, Crown, Sparkles, Gamepad2, Gift, Users, Medal, Award } from "lucide-react";
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

// --- Animated counter hook ---
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current || target === 0) return;
    ref.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

// --- Rank badge for leaderboard rows ---
function PremiumRankBadge({ rank }: { rank: number }) {
  if (rank === 1) return (
    <div className="relative flex items-center justify-center w-9 h-9">
      <div className="absolute inset-0 rounded-full opacity-40" style={{
        background: "radial-gradient(circle, hsl(45 90% 55% / 0.5), transparent 70%)",
        animation: "pulse 3s ease-in-out infinite",
      }} />
      <div className="relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{
        background: "linear-gradient(135deg, hsl(45 85% 55%), hsl(35 90% 45%))",
        color: "hsl(35 80% 15%)",
      }}>
        <Crown className="h-4 w-4" />
      </div>
    </div>
  );
  if (rank === 2) return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{
      background: "linear-gradient(135deg, hsl(220 10% 70%), hsl(220 10% 55%))",
      color: "hsl(220 10% 20%)",
    }}>
      <Medal className="h-4 w-4" />
    </div>
  );
  if (rank === 3) return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{
      background: "linear-gradient(135deg, hsl(25 60% 50%), hsl(20 55% 40%))",
      color: "hsl(25 50% 15%)",
    }}>
      <Award className="h-4 w-4" />
    </div>
  );
  return (
    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary">
      <span className="text-sm font-semibold text-muted-foreground">{rank}</span>
    </div>
  );
}

// --- Premium leaderboard row ---
function PremiumRow({ entry, rank, isCurrentUser, style }: {
  entry: TournamentEntry;
  rank: number;
  isCurrentUser?: boolean;
  style?: React.CSSProperties;
}) {
  const multiplier = entry.biggest_multiplier > 0 ? `${Number(entry.biggest_multiplier.toFixed(1))}x` : "–";
  return (
    <div
      className={cn(
        "group flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300",
        "border border-transparent",
        rank <= 3 ? "backdrop-blur-sm" : "hover:border-border/40",
        isCurrentUser && "ring-1 ring-primary/40"
      )}
      style={{
        background: rank === 1
          ? "linear-gradient(135deg, hsl(45 80% 50% / 0.06), hsl(35 70% 40% / 0.03))"
          : rank === 2
          ? "linear-gradient(135deg, hsl(220 10% 65% / 0.06), transparent)"
          : rank === 3
          ? "linear-gradient(135deg, hsl(25 55% 45% / 0.06), transparent)"
          : undefined,
        ...style,
      }}
    >
      <PremiumRankBadge rank={rank} />
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <UserProfileLink
          userId={entry.user_id}
          displayName={entry.display_name || "Anonym"}
          avatarUrl={entry.avatar_url}
          avatarClassName={cn("h-9 w-9 ring-2 ring-offset-1 ring-offset-background transition-all duration-200",
            rank === 1 ? "ring-[hsl(45,85%,55%)]" : rank === 2 ? "ring-[hsl(220,10%,65%)]" : rank === 3 ? "ring-[hsl(25,55%,45%)]" : "ring-border/50"
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={cn("font-semibold truncate text-sm", rank <= 3 ? "text-foreground" : "text-muted-foreground")}>
              {entry.display_name || "Anonym"}
            </span>
            <TwitchBadgesInline badges={entry.twitch_badges as unknown as TwitchBadgesType | null} />
            {isCurrentUser && (
              <Badge variant="outline" className="text-[10px] border-primary/40 text-primary bg-primary/10 px-1.5 py-0">
                Du
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">{entry.total_spins.toLocaleString()} spins</span>
            <span className="text-xs text-muted-foreground/50">·</span>
            <span className="text-xs font-medium transition-colors duration-200 group-hover:text-[hsl(142,72%,50%)]" style={{ color: "hsl(142 60% 45%)" }}>
              {multiplier}
            </span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <span className={cn(
          "text-lg font-bold tabular-nums tracking-tight",
          rank === 1 ? "text-[hsl(45,85%,55%)]" : rank === 2 ? "text-[hsl(220,10%,75%)]" : rank === 3 ? "text-[hsl(25,55%,55%)]" : "text-foreground"
        )}>
          {entry.total_points.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// --- Hero Winner Section ---
function WinnerHero({ winner }: { winner: TournamentEntry }) {
  const animatedPoints = useCountUp(winner.total_points);
  const multiplier = winner.biggest_multiplier > 0 ? `${Number(winner.biggest_multiplier.toFixed(1))}x` : "–";

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 md:p-8" style={{
      background: "linear-gradient(135deg, hsl(260 60% 22%), hsl(240 50% 18%) 50%, hsl(220 65% 20%))",
    }}>
      {/* Animated shine overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(105deg, transparent 40%, hsl(260 70% 70% / 0.06) 45%, hsl(260 70% 70% / 0.1) 50%, hsl(260 70% 70% / 0.06) 55%, transparent 60%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 8s ease-in-out infinite",
      }} />

      {/* Subtle noise texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <div className="relative flex flex-col items-center text-center space-y-4">
        {/* Trophy with glow */}
        <div className="relative">
          <div className="absolute inset-0 blur-xl opacity-30" style={{
            background: "radial-gradient(circle, hsl(45 90% 60%), transparent 70%)",
          }} />
          <div className="relative w-14 h-14 rounded-full flex items-center justify-center" style={{
            background: "linear-gradient(135deg, hsl(45 85% 55% / 0.15), hsl(45 85% 55% / 0.05))",
            border: "1px solid hsl(45 85% 55% / 0.2)",
          }}>
            <Trophy className="h-7 w-7" style={{ color: "hsl(45 85% 60%)" }} />
          </div>
        </div>

        {/* Points - primary hierarchy */}
        <div>
          <p className="text-4xl md:text-5xl font-bold tracking-tight tabular-nums" style={{ color: "hsl(0 0% 98%)" }}>
            {animatedPoints.toLocaleString()}
          </p>
          <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "hsl(250 20% 60%)" }}>
            point
          </p>
        </div>

        {/* Winner name */}
        <div className="flex items-center gap-2">
          <UserProfileLink
            userId={winner.user_id}
            displayName={winner.display_name || "Anonym"}
            avatarUrl={winner.avatar_url}
            avatarClassName="h-8 w-8 ring-2 ring-[hsl(45,85%,55%)] ring-offset-2 ring-offset-[hsl(250,55%,20%)]"
          />
          <span className="font-semibold text-lg" style={{ color: "hsl(0 0% 95%)" }}>
            {winner.display_name || "Anonym"}
          </span>
          <TwitchBadgesInline badges={winner.twitch_badges as unknown as TwitchBadgesType | null} />
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs" style={{ color: "hsl(250 15% 55%)" }}>
          <span>{winner.total_spins.toLocaleString()} spins</span>
          <span style={{ color: "hsl(250 15% 30%)" }}>·</span>
          <span style={{ color: "hsl(142 60% 50%)" }}>Bedste: {multiplier}</span>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

// --- Main Component ---
export function CompletedTournamentCard({ tournament }: { tournament: Tournament }) {
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

  return (
    <div className="rounded-2xl border border-border/30 overflow-hidden" style={{
      background: "hsl(var(--card))",
      boxShadow: "0 4px 24px hsl(0 0% 0% / 0.15), 0 1px 3px hsl(0 0% 0% / 0.1)",
    }}>
      {/* Header strip */}
      <div className="px-5 py-4 border-b border-border/20">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-primary/10">
              <Trophy className="h-5 w-5 text-primary" />
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

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mt-2">
          {tournament.prize_text && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              <Gift className="h-3.5 w-3.5" />
              Præmie: {tournament.prize_text}
            </span>
          )}
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Gamepad2 className="h-3 w-3" />
            {tournament.game_ids.map((id) => GAME_NAMES[id] || id).join(" + ")}
          </span>
        </div>
      </div>

      {/* Game filter tabs */}
      {tournament.separate_leaderboards && tournament.game_ids.length > 1 && (
        <div className="px-5 pt-4">
          <Tabs value={selectedGame} onValueChange={setSelectedGame}>
            <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(${tournament.game_ids.length}, 1fr)` }}>
              {tournament.game_ids.map((gid) => (
                <TabsTrigger key={gid} value={gid} className="text-xs">
                  {GAME_NAMES[gid] || gid}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}

      {/* Content */}
      <div className="px-5 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-secondary/30 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* Hero winner */}
            {winner && <WinnerHero winner={winner} />}

            {/* Leaderboard rows */}
            {top10.length > 0 && (
              <div className="mt-4 space-y-1.5">
                {top10.map((entry, index) => (
                  <PremiumRow
                    key={`${entry.user_id}-${entry.game_id}`}
                    entry={entry}
                    rank={index + 1}
                    isCurrentUser={user?.id === entry.user_id}
                    style={{
                      animation: `fadeSlideIn 0.4s ease-out ${index * 60}ms both`,
                    }}
                  />
                ))}

                {/* Current user below top 10 */}
                {currentUser && currentUser.rank > 10 && (
                  <>
                    <div className="flex items-center gap-2 py-2">
                      <div className="flex-1 border-t border-dashed border-border/30" />
                      <span className="text-xs text-muted-foreground">Din placering</span>
                      <div className="flex-1 border-t border-dashed border-border/30" />
                    </div>
                    <PremiumRow entry={currentUser.entry} rank={currentUser.rank} isCurrentUser />
                  </>
                )}
              </div>
            )}

            {top10.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="h-10 w-10 mx-auto mb-2 text-muted-foreground/30" />
                <p className="text-muted-foreground">Ingen har spillet</p>
              </div>
            )}
          </>
        )}

        {/* Participants */}
        {participants && participants.length > 0 && (
          <div className={cn(top10.length > 0 ? "mt-5 pt-4 border-t border-border/20" : "")}>
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {participants.length} deltagere
            </p>
            <div className="flex flex-wrap gap-2">
              {participants.map((p) => (
                <div key={p.user_id} className="flex items-center gap-1.5">
                  <UserProfileLink
                    userId={p.user_id}
                    displayName={p.display_name}
                    avatarUrl={p.avatar_url}
                    avatarClassName="h-6 w-6"
                    showDropdown={false}
                  />
                  <span className="text-xs text-muted-foreground">{p.display_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Keyframes for row animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
