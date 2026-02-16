import { useState, useEffect } from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Crown, Sparkles, Gamepad2, ArrowRight, LogIn, Clock, Timer, Gift, User, CalendarDays, BookOpen } from "lucide-react";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CommunityNav } from "@/components/community/CommunityNav";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { UserProfileLink } from "@/components/UserProfileLink";
import { useAuth } from "@/hooks/useAuth";
import { useTournaments, useTournamentLeaderboard, useTournamentParticipation, useTournamentParticipants, useJoinTournament, type Tournament, type TournamentEntry } from "@/hooks/useTournaments";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const GAME_THEMES: Record<string, { gradient: string; border: string; accent: string; accentBg: string; glow: string; badgeBg: string; badgeText: string; badgeBorder: string }> = {
  "book-of-fedesvin": {
    gradient: "from-amber-950/90 via-amber-900/80 to-amber-950/90",
    border: "border-amber-500/30",
    accent: "text-amber-400",
    accentBg: "bg-amber-500/20",
    glow: "shadow-[0_0_30px_rgba(251,191,36,0.15)]",
    badgeBg: "bg-amber-500/20",
    badgeText: "text-amber-300",
    badgeBorder: "border-amber-500/40",
  },
  "rise-of-fedesvin": {
    gradient: "from-purple-950/90 via-purple-900/80 to-purple-950/90",
    border: "border-purple-500/30",
    accent: "text-purple-400",
    accentBg: "bg-purple-500/20",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    badgeBg: "bg-purple-500/20",
    badgeText: "text-purple-300",
    badgeBorder: "border-purple-500/40",
  },
};

const GAME_NAMES: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
};

const GAME_HREFS: Record<string, string> = {
  "book-of-fedesvin": "/community/slots/book-of-fedesvin",
  "rise-of-fedesvin": "/community/slots/rise-of-fedesvin",
};

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full animate-pulse opacity-50" />
      <div className="relative bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
        <Crown className="h-4 w-4 text-amber-900" />
      </div>
    </div>
  );
  if (rank === 2) return (
    <div className="w-8 h-8 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-md">
      <Medal className="h-4 w-4 text-gray-700" />
    </div>
  );
  if (rank === 3) return (
    <div className="w-8 h-8 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-full flex items-center justify-center shadow-md">
      <Award className="h-4 w-4 text-amber-200" />
    </div>
  );
  return (
    <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
      <span className="text-sm font-bold text-muted-foreground">{rank}</span>
    </div>
  );
}

function LeaderboardRow({ entry, rank, isCurrentUser, maxCredits }: { entry: TournamentEntry; rank: number; isCurrentUser?: boolean; maxCredits?: number | null }) {
  const formattedMultiplier = entry.biggest_multiplier > 0 ? `${Number(entry.biggest_multiplier.toFixed(1))}x` : "-";
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
      rank === 1 && "bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent",
      rank === 2 && "bg-gradient-to-r from-gray-400/10 via-gray-400/5 to-transparent",
      rank === 3 && "bg-gradient-to-r from-amber-700/10 via-amber-700/5 to-transparent",
      rank > 3 && "hover:bg-muted/30",
      isCurrentUser && "ring-1 ring-primary/50 bg-primary/5"
    )}>
      <RankBadge rank={rank} />
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <UserProfileLink
          userId={entry.user_id}
          displayName={entry.display_name || "Anonym"}
          avatarUrl={entry.avatar_url}
          avatarClassName={cn("h-8 w-8", rank <= 3 && "ring-2 ring-offset-2 ring-offset-background", rank === 1 && "ring-amber-400", rank === 2 && "ring-gray-400", rank === 3 && "ring-amber-600")}
        />
        <div className="flex-1 min-w-0">
          <p className={cn("font-medium truncate", rank <= 3 ? "text-foreground" : "text-muted-foreground")}>{entry.display_name || "Anonym"}</p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">{entry.total_spins.toLocaleString()} spins</p>
            {isCurrentUser && maxCredits && (
              <p className="text-xs text-muted-foreground">· {Math.round(entry.total_credits_used).toLocaleString()} / {maxCredits.toLocaleString()} credits</p>
            )}
          </div>
        </div>
      </div>
      {isCurrentUser && <Badge variant="outline" className="text-xs border-primary/50 text-primary bg-primary/10">Du</Badge>}
      <div className="flex items-center gap-4 text-right">
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-green-400">{formattedMultiplier}</p>
          <p className="text-xs text-muted-foreground">bedste</p>
        </div>
        <div>
          <p className={cn("font-bold", rank === 1 ? "text-amber-400" : rank === 2 ? "text-gray-300" : rank === 3 ? "text-amber-600" : "text-foreground")}>
            {entry.total_points.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">point</p>
        </div>
      </div>
    </div>
  );
}

function useCountdown(endDate: string) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const update = () => {
      const diff = new Date(endDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Afsluttet"); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(d > 0 ? `${d}d ${h}t ${m}m` : `${h}t ${m}m ${s}s`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [endDate]);
  return timeLeft;
}

function TournamentLeaderboardCard({ tournament }: { tournament: Tournament }) {
  const [selectedGame, setSelectedGame] = useState<string | undefined>(
    tournament.separate_leaderboards ? tournament.game_ids[0] : undefined
  );
  const { data, isLoading } = useTournamentLeaderboard(tournament.id, selectedGame);
  const { data: participants } = useTournamentParticipants(tournament.id);
  const { user } = useAuth();
  const { data: hasJoined, isLoading: participationLoading } = useTournamentParticipation(tournament.id);
  const joinMutation = useJoinTournament();
  const entries = data?.entries ?? [];
  const currentUser = data?.currentUser;
  const top10 = entries.slice(0, 10);
  const isActive = tournament.status === "active";
  const isEnded = tournament.status === "ended";
  const isUpcoming = tournament.status === "upcoming";
  const countdown = useCountdown(isActive ? tournament.ends_at : tournament.starts_at);
  const winner = isEnded && entries.length > 0 ? entries[0] : null;

  const themeKey = tournament.game_ids[0] || "book-of-fedesvin";
  const theme = GAME_THEMES[themeKey] || GAME_THEMES["book-of-fedesvin"];

  const handleJoin = async () => {
    try {
      const result = await joinMutation.mutateAsync(tournament.id);
      toast({
        title: "Du er tilmeldt! 🎉",
        description: result.creditsAwarded > 0
          ? `Du har modtaget ${result.creditsAwarded} credits. Held og lykke!`
          : "Held og lykke i turneringen!",
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Kunne ikke tilmelde dig";
      toast({ title: "Fejl", description: message, variant: "destructive" });
    }
  };

  return (
    <Card className={cn(
      "relative overflow-hidden border backdrop-blur-md transition-all duration-300",
      theme.border, theme.glow,
      `bg-gradient-to-b ${theme.gradient}`,
      isEnded && "opacity-80"
    )}>
      <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-20 blur-2xl -z-10", theme.accentBg)} />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl", theme.accentBg)}>
              <Trophy className={cn("h-5 w-5", theme.accent)} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{tournament.title}</h3>
              {tournament.description && <p className="text-sm text-muted-foreground">{tournament.description}</p>}
              {tournament.prize_text && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Gift className={cn("h-4 w-4", theme.accent)} />
                  <span className={cn("text-sm font-medium", theme.accent)}>Præmie: {tournament.prize_text}</span>
                </div>
              )}
              {tournament.max_credits && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-muted-foreground">💰 Maks {tournament.max_credits.toLocaleString()} credits</span>
                </div>
              )}
              {tournament.exclude_from_global_leaderboard && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Badge variant="outline" className="text-xs">Ekskl. globalt leaderboard</Badge>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isActive && hasJoined && (
              <Badge className="bg-green-500/20 text-green-300 border-green-500/40 border">
                <Sparkles className="h-3 w-3 mr-1" /> Du deltager
              </Badge>
            )}
            {isActive && (
              <Badge className={cn("border", theme.badgeBg, theme.badgeText, theme.badgeBorder)}>
                <Timer className="h-3 w-3 mr-1" /> {countdown}
              </Badge>
            )}
            {isUpcoming && (
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 border">
                <Clock className="h-3 w-3 mr-1" /> Starter om {countdown}
              </Badge>
            )}
            {isEnded && (
              <Badge variant="secondary">Afsluttet</Badge>
            )}
          </div>
        </div>

        {/* Join button for active tournaments */}
        {isActive && user && !hasJoined && !participationLoading && (
          <div className={cn("mt-3 p-3 rounded-xl border text-center", theme.accentBg, theme.border)}>
            <p className="text-sm text-muted-foreground mb-2">
              Tilmeld dig for at deltage i turneringen
              {tournament.max_credits ? ` og modtag op til ${tournament.max_credits.toLocaleString()} credits!` : "!"}
            </p>
            <Button
              onClick={handleJoin}
              disabled={joinMutation.isPending}
              className={cn("gap-2", theme.accentBg, "hover:opacity-90 border", theme.border)}
              variant="ghost"
            >
              <Trophy className="h-4 w-4" />
              {joinMutation.isPending ? "Tilmelder..." : "Deltag"}
            </Button>
          </div>
        )}

        {/* Game filter tabs for separate leaderboards */}
        {tournament.separate_leaderboards && tournament.game_ids.length > 1 && (
          <Tabs value={selectedGame} onValueChange={setSelectedGame} className="mt-3">
            <TabsList className="w-full grid" style={{ gridTemplateColumns: `repeat(${tournament.game_ids.length}, 1fr)` }}>
              {tournament.game_ids.map((gid) => (
                <TabsTrigger key={gid} value={gid} className="text-xs">
                  {GAME_NAMES[gid] || gid}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        {/* Game names for combined */}
        {!tournament.separate_leaderboards && (
          <p className="text-xs text-muted-foreground mt-2">
            <Gamepad2 className="h-3 w-3 inline mr-1" />
            {tournament.game_ids.map((id) => GAME_NAMES[id] || id).join(" + ")}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Winner announcement for ended tournaments */}
        {isEnded && winner && (
          <div className={cn("mb-4 p-4 rounded-xl border text-center", theme.accentBg, theme.border)}>
            <Crown className={cn("h-8 w-8 mx-auto mb-2", theme.accent)} />
            <p className="text-sm text-muted-foreground">Vinder</p>
            <p className="font-bold text-lg text-foreground">{winner.display_name || "Anonym"}</p>
            <p className={cn("font-bold text-xl", theme.accent)}>{winner.total_points.toLocaleString()} point</p>
          </div>
        )}

        {isUpcoming ? (
          <div className="text-center py-8">
            <Clock className={cn("h-12 w-12 mx-auto mb-3 opacity-30", theme.accent)} />
            <p className="text-muted-foreground">Turneringen er ikke startet endnu</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-muted/20 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : top10.length > 0 ? (
          <div className="space-y-1">
            {top10.map((entry, index) => (
              <LeaderboardRow
                key={`${entry.user_id}-${entry.game_id}`}
                entry={entry}
                rank={index + 1}
                isCurrentUser={user?.id === entry.user_id}
                maxCredits={tournament.max_credits}
              />
            ))}
            {currentUser && currentUser.rank > 10 && (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="flex-1 border-t border-dashed border-muted-foreground/20" />
                  <span className="text-xs text-muted-foreground">Din placering</span>
                  <div className="flex-1 border-t border-dashed border-muted-foreground/20" />
                </div>
                <LeaderboardRow entry={currentUser.entry} rank={currentUser.rank} isCurrentUser maxCredits={tournament.max_credits} />
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <Trophy className={cn("h-10 w-10 mx-auto mb-2 opacity-30", theme.accent)} />
            <p className="text-muted-foreground">Ingen har spillet endnu</p>
            <p className="text-sm text-muted-foreground/70">Vær den første på ranglisten!</p>
          </div>
        )}

        {/* Show joined participants */}
        {participants && participants.length > 0 && (
          <div className={cn(top10.length > 0 ? "mt-4 pt-4 border-t border-border/30" : "")}>
            <p className="text-sm text-muted-foreground mb-3">
              {participants.length} tilmeldte spillere
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

        {/* Play buttons - only show if joined or ended */}
        {isActive && hasJoined && (
          <div className={cn("flex gap-2 mt-4", tournament.game_ids.length === 1 ? "" : "flex-col sm:flex-row")}>
            {tournament.game_ids.map((gid) => (
              <Button
                key={gid}
                asChild
                className={cn("flex-1 gap-2", GAME_THEMES[gid]?.accentBg || theme.accentBg, "hover:opacity-90 border", GAME_THEMES[gid]?.border || theme.border)}
                variant="ghost"
              >
                <Link to={GAME_HREFS[gid] || "/community/slots"}>
                  Spil {GAME_NAMES[gid] || gid}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Leaderboard() {
  const { user, loading } = useAuth();
  const { data: tournaments, isLoading: tournamentsLoading } = useTournaments();

  const active = tournaments?.filter((t) => t.status === "active") || [];
  const upcoming = tournaments?.filter((t) => t.status === "upcoming") || [];
  const ended = tournaments?.filter((t) => t.status === "ended") || [];

  return (
    <>
      <SEO
        title="Turneringer – Slot Turneringer | Casinoaftaler"
        description="Deltag i slot-turneringer og vind præmier! Se aktive turneringer, ranglister og vindere hos Casinoaftaler."
        noindex
      />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Kæmp om Præmier
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Turneringer</h1>
            <p className="text-lg text-white/80">
              Deltag i slot-turneringer og kæmp om præmier! Se aktive turneringer, ranglister og vindere.
            </p>
          </div>
        </div>
      </section>

      <CommunityNav />

      <div className="container py-8 md:py-12">

        {tournamentsLoading ? (
          <div className="max-w-5xl mx-auto space-y-4">
            {[1, 2].map((i) => <div key={i} className="h-64 bg-muted/20 rounded-xl animate-pulse" />)}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Active tournaments */}
            {active.length > 0 && (
              <div className="space-y-6">
                {active.map((t) => <TournamentLeaderboardCard key={t.id} tournament={t} />)}
              </div>
            )}

            {/* Upcoming tournaments */}
            {upcoming.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-muted-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5" /> Kommende turneringer
                </h2>
                {upcoming.map((t) => <TournamentLeaderboardCard key={t.id} tournament={t} />)}
              </div>
            )}

            {/* Ended tournaments */}
            {ended.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-muted-foreground">Afsluttede turneringer</h2>
                {ended.map((t) => <TournamentLeaderboardCard key={t.id} tournament={t} />)}
              </div>
            )}

            {/* No tournaments */}
            {!active.length && !upcoming.length && !ended.length && (
              <Card className="border-dashed border-muted-foreground/30 bg-muted/10">
                <CardContent className="py-12 text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted/20 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-medium text-muted-foreground mb-1">Ingen turneringer endnu</h3>
                  <p className="text-sm text-muted-foreground/70">Hold øje med nye turneringer og events!</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="mt-12">
          <RelatedGuides currentPath="/community/leaderboard" />
        </div>
      </div>
    </>
  );
}
