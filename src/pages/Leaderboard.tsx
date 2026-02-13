import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Crown, Sparkles, Gamepad2, ArrowRight, LogIn } from "lucide-react";
import { useSlotLeaderboard, type LeaderboardEntry } from "@/hooks/useSlotLeaderboard";
import { UserProfileLink } from "@/components/UserProfileLink";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

// Tournament definitions
const TOURNAMENTS = [
  {
    id: "book-of-fedesvin",
    name: "Book of Fedesvin",
    description: "Egyptisk eventyr med expanding symbols",
    href: "/community/slots/book-of-fedesvin",
    theme: {
      gradient: "from-amber-950/90 via-amber-900/80 to-amber-950/90",
      border: "border-amber-500/30",
      accent: "text-amber-400",
      accentBg: "bg-amber-500/20",
      glow: "shadow-[0_0_30px_rgba(251,191,36,0.15)]",
      badgeBg: "bg-amber-500/20",
      badgeText: "text-amber-300",
      badgeBorder: "border-amber-500/40",
    },
  },
  {
    id: "rise-of-fedesvin",
    name: "Rise of Fedesvin",
    description: "Merlins magi med multi-expanding bonus",
    href: "/community/slots/rise-of-fedesvin",
    theme: {
      gradient: "from-purple-950/90 via-purple-900/80 to-purple-950/90",
      border: "border-purple-500/30",
      accent: "text-purple-400",
      accentBg: "bg-purple-500/20",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      badgeBg: "bg-purple-500/20",
      badgeText: "text-purple-300",
      badgeBorder: "border-purple-500/40",
    },
  },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="relative flex items-center justify-center w-10 h-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full animate-pulse opacity-50" />
        <div className="relative bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
          <Crown className="h-4 w-4 text-amber-900" />
        </div>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-8 h-8 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-md">
        <Medal className="h-4 w-4 text-gray-700" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-8 h-8 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-full flex items-center justify-center shadow-md">
        <Award className="h-4 w-4 text-amber-200" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
      <span className="text-sm font-bold text-muted-foreground">{rank}</span>
    </div>
  );
}

function getDisplayWinnings(entry: LeaderboardEntry, period: "daily" | "weekly" | "monthly" | "alltime"): number {
  if (period === "daily") return entry.daily_winnings ?? 0;
  if (period === "weekly") return entry.weekly_winnings ?? 0;
  if (period === "monthly") return entry.monthly_winnings ?? 0;
  return entry.total_winnings;
}

function LeaderboardPlayerRow({
  entry,
  rank,
  isCurrentUser,
  compact = false,
  period = "alltime",
}: {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser?: boolean;
  compact?: boolean;
  period?: "daily" | "weekly" | "monthly" | "alltime";
}) {
  const formattedMultiplier = entry.biggest_multiplier > 0
    ? `${Number(entry.biggest_multiplier.toFixed(1))}x`
    : "-";

  const displayPoints = getDisplayWinnings(entry, period);

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
        rank === 1 && "bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent",
        rank === 2 && "bg-gradient-to-r from-gray-400/10 via-gray-400/5 to-transparent",
        rank === 3 && "bg-gradient-to-r from-amber-700/10 via-amber-700/5 to-transparent",
        rank > 3 && "hover:bg-muted/30",
        isCurrentUser && "ring-1 ring-primary/50 bg-primary/5"
      )}
    >
      <RankBadge rank={rank} />
      
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <UserProfileLink
          userId={entry.user_id}
          displayName={entry.display_name}
          avatarUrl={entry.avatar_url}
          avatarClassName={cn("h-8 w-8", rank <= 3 && "ring-2 ring-offset-2 ring-offset-background", rank === 1 && "ring-amber-400", rank === 2 && "ring-gray-400", rank === 3 && "ring-amber-600")}
        />
        <div className="flex-1 min-w-0">
          <p className={cn("font-medium truncate", rank <= 3 && "text-foreground", rank > 3 && "text-muted-foreground")}>
            {entry.display_name}
          </p>
          {!compact && (
            <p className="text-xs text-muted-foreground">
              {entry.total_spins.toLocaleString()} spins
            </p>
          )}
        </div>
      </div>

      {isCurrentUser && (
        <Badge variant="outline" className="text-xs border-primary/50 text-primary bg-primary/10">
          Du
        </Badge>
      )}

      <div className="flex items-center gap-4 text-right">
        {!compact && (
          <>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-blue-400">{entry.total_bonuses}</p>
              <p className="text-xs text-muted-foreground">bonusser</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-green-400">{formattedMultiplier}</p>
              <p className="text-xs text-muted-foreground">bedste</p>
            </div>
          </>
        )}
        <div>
          <p className={cn("font-bold", rank === 1 ? "text-amber-400" : rank === 2 ? "text-gray-300" : rank === 3 ? "text-amber-600" : "text-foreground")}>
            {displayPoints.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">point</p>
        </div>
      </div>
    </div>
  );
}

function TournamentCard({
  tournament,
  period,
}: {
  tournament: typeof TOURNAMENTS[number];
  period: "daily" | "weekly" | "monthly" | "alltime";
}) {
  const { data, isLoading } = useSlotLeaderboard(period);
  const entries = data?.entries ?? [];
  const currentUser = data?.currentUser;
  const top5 = entries.slice(0, 5);

  return (
    <Card className={cn(
      "relative overflow-hidden border backdrop-blur-md transition-all duration-300 hover:scale-[1.01]",
      tournament.theme.border,
      tournament.theme.glow,
      `bg-gradient-to-b ${tournament.theme.gradient}`
    )}>
      {/* Decorative corner glow */}
      <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-20 blur-2xl -z-10", tournament.theme.accentBg)} />
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl", tournament.theme.accentBg)}>
              <Gamepad2 className={cn("h-5 w-5", tournament.theme.accent)} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{tournament.name}</h3>
              <p className="text-sm text-muted-foreground">{tournament.description}</p>
            </div>
          </div>
          <Badge className={cn("border", tournament.theme.badgeBg, tournament.theme.badgeText, tournament.theme.badgeBorder)}>
            <Trophy className="h-3 w-3 mr-1" />
            {entries.length} spillere
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-muted/20 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : top5.length > 0 ? (
          <div className="space-y-1">
            {top5.map((entry, index) => (
              <LeaderboardPlayerRow
                key={entry.user_id}
                entry={entry}
                rank={index + 1}
                isCurrentUser={currentUser?.entry.user_id === entry.user_id}
                period={period}
              />
            ))}
            
            {/* Current user if not in top 5 */}
            {currentUser && currentUser.rank > 5 && (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="flex-1 border-t border-dashed border-muted-foreground/20" />
                  <span className="text-xs text-muted-foreground">Din placering</span>
                  <div className="flex-1 border-t border-dashed border-muted-foreground/20" />
                </div>
                <LeaderboardPlayerRow
                  entry={currentUser.entry}
                  rank={currentUser.rank}
                  isCurrentUser
                  period={period}
                />
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy className={cn("h-12 w-12 mx-auto mb-3 opacity-30", tournament.theme.accent)} />
            <p className="text-muted-foreground">Ingen spillere endnu</p>
            <p className="text-sm text-muted-foreground/70">Vær den første på ranglisten!</p>
          </div>
        )}

        {/* Play button */}
        <Button
          asChild
          className={cn("w-full mt-4 gap-2", tournament.theme.accentBg, "hover:opacity-90 border", tournament.theme.border)}
          variant="ghost"
        >
          <Link to={tournament.href}>
            Spil nu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Leaderboard() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly" | "alltime">("alltime");
  const { user, loading } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] relative">
      <SEO
        title="Rangliste – Top Spillere | Casinoaftaler"
        description="Se hvem der topper ranglisten hos Casinoaftaler. Daglige, ugentlige og månedlige leaderboards for vores gratis spilleautomater."
      />
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent -z-10" />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-14 md:py-20"
        style={{
          background: "linear-gradient(135deg, hsl(260 70% 20%), hsl(250 60% 15%) 40%, hsl(210 80% 20%))",
        }}
      >
        <div className="container relative z-10">
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-amber-500/15 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center animate-pulse">
              <Trophy className="h-10 w-10 text-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Leaderboard
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto">
              Top spillere på tværs af igangværende slot-turneringer
            </p>
          </div>
        </div>
        
        {/* Decorative blur circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-amber-500 opacity-10 blur-3xl"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />
          <div
            className="absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-purple-500 opacity-10 blur-3xl"
            style={{ animation: "float 8s ease-in-out infinite 1s" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-32 w-32 rounded-full bg-blue-500 opacity-10 blur-3xl"
            style={{ animation: "float 7s ease-in-out infinite 0.5s" }}
          />
        </div>
        
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-15px) translateX(5px); }
            50% { transform: translateY(-8px) translateX(-5px); }
            75% { transform: translateY(-20px) translateX(3px); }
          }
        `}</style>
      </section>

      {/* Content */}
      <div className="container py-10">
        {!loading && !user ? (
          <Card className="max-w-md mx-auto border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="py-12 text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <LogIn className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Log ind for at se ranglisten</h3>
              <p className="text-sm text-muted-foreground">
                Du skal være logget ind for at se turneringsranglisterne.
              </p>
              <Button asChild className="gap-2">
                <Link to="/auth">
                  <LogIn className="h-4 w-4" />
                  Log ind
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Period Tabs */}
            <div className="flex justify-center mb-8">
              <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)} className="w-full max-w-md">
                <TabsList className="w-full grid grid-cols-4 bg-muted/50 p-1">
                  <TabsTrigger
                    value="daily"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <Sparkles className="h-4 w-4 mr-1.5 hidden sm:inline" />
                    I dag
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <Sparkles className="h-4 w-4 mr-1.5 hidden sm:inline" />
                    Uge
                  </TabsTrigger>
                  <TabsTrigger
                    value="monthly"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <Sparkles className="h-4 w-4 mr-1.5 hidden sm:inline" />
                    Måned
                  </TabsTrigger>
                  <TabsTrigger
                    value="alltime"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                  >
                    <Trophy className="h-4 w-4 mr-1.5 hidden sm:inline" />
                    All-time
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Tournament Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {TOURNAMENTS.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  period={period}
                />
              ))}
            </div>

            {/* Coming Soon Placeholder */}
            <div className="mt-8 max-w-5xl mx-auto">
              <Card className="border-dashed border-muted-foreground/30 bg-muted/10">
                <CardContent className="py-12 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-medium text-muted-foreground mb-1">Flere turneringer kommer snart</h3>
                  <p className="text-sm text-muted-foreground/70">
                    Hold øje med nye spil og specielle events!
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
