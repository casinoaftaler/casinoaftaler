import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, Crown, Sparkles, Gamepad2, ArrowRight, LogIn, Clock, Timer, Gift, User, CalendarDays, BookOpen, Users, Target, BarChart3, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import type { TwitchBadges as TwitchBadgesType } from "@/hooks/useTwitchBadges";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { CommunityJoinCTA } from "@/components/community/CommunityJoinCTA";
import { CommunityFooterSeo } from "@/components/community/CommunityFooterSeo";
import { FAQSection } from "@/components/FAQSection";
import { CommunityNav } from "@/components/community/CommunityNav";

import { SidebarLeaderboard } from "@/components/games/SidebarLeaderboard";
import { SidebarShopLeaderboard } from "@/components/games/SidebarShopLeaderboard";
import { SidebarSocialProof } from "@/components/games/SidebarSocialProof";
import { ContentSidebar } from "@/components/ContentSidebar";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { UserProfileLink } from "@/components/UserProfileLink";
import { useAuth } from "@/hooks/useAuth";
import { useTournaments, useTournamentLeaderboard, useTournamentParticipation, useTournamentParticipants, useJoinTournament, type Tournament, type TournamentEntry } from "@/hooks/useTournaments";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { CompletedTournamentRow } from "@/components/tournament/CompletedTournamentRow";
import { MonthlyTournamentBoxes } from "@/components/tournament/MonthlyTournamentBoxes";
import { TournamentSeoContent, getTournamentFaqSchema, tournamentFaqs } from "@/components/tournament/TournamentSeoContent";
import { TurneringerSeoText } from "@/components/tournament/TurneringerSeoText";
import turneringerHero from "@/assets/community/turneringer-hero.jpg";

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
          <div className="flex items-center gap-1.5">
            <p className={cn("font-medium truncate", rank <= 3 ? "text-foreground" : "text-muted-foreground")}>{entry.display_name || "Anonym"}</p>
            <TwitchBadgesInline badges={entry.twitch_badges as unknown as TwitchBadgesType | null} />
          </div>
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

function TournamentStatStrip({ tournaments }: { tournaments: Tournament[] }) {
  const active = tournaments.filter(t => t.status === "active").length;
  const totalParticipants = tournaments.length; // approximate
  const ended = tournaments.filter(t => t.status === "ended").length;

  const stats = [
    { label: "Aktive turneringer", value: active, icon: Trophy },
    { label: "Afsluttede turneringer", value: ended, icon: Target },
    { label: "Turneringer i alt", value: tournaments.length, icon: BarChart3 },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-card p-4 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-[0_0_15px_hsl(var(--primary)/0.08)]"
        >
          <stat.icon className="h-4 w-4 text-primary transition-all duration-200 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.5)]" />
          <span className="text-2xl font-bold text-foreground">{stat.value}</span>
          <span className="text-[10px] text-muted-foreground leading-tight">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

function TournamentCard({ tournament }: { tournament: Tournament }) {
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
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 md:px-5 md:py-4 border-b border-border/30">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-primary/10 shrink-0">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-foreground truncate">{tournament.title}</h3>
                {isActive && (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0 gap-1 uppercase font-semibold shrink-0">
                    <Timer className="h-2.5 w-2.5" />
                    {countdown}
                  </Badge>
                )}
                {isUpcoming && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 gap-1 uppercase font-semibold shrink-0">
                    <Clock className="h-2.5 w-2.5" />
                    Starter om {countdown}
                  </Badge>
                )}
                {isEnded && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 uppercase font-semibold shrink-0">
                    Afsluttet
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                {tournament.description && <span>{tournament.description}</span>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isActive && hasJoined && (
              <Badge variant="outline" className="text-xs border-green-500/40 text-green-500 bg-green-500/10">
                <Sparkles className="h-3 w-3 mr-1" /> Du deltager
              </Badge>
            )}
          </div>
        </div>

        {/* Meta: prize, credits, games */}
        <div className="flex flex-wrap items-center gap-3 mt-2">
          {tournament.prize_text && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
              <Gift className="h-3.5 w-3.5" />
              Præmie: {tournament.prize_text}
            </span>
          )}
          {tournament.max_credits && (
            <span className="text-xs text-muted-foreground">
              💰 Maks {tournament.max_credits.toLocaleString()} credits
            </span>
          )}
          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Gamepad2 className="h-3 w-3" />
            {tournament.game_ids.map((id) => GAME_NAMES[id] || id).join(" + ")}
          </span>
          {tournament.exclude_from_global_leaderboard && (
            <Badge variant="outline" className="text-[10px]">Ekskl. globalt leaderboard</Badge>
          )}
        </div>
      </div>

      {/* Join button */}
      {isActive && user && !hasJoined && !participationLoading && (
        <div className="px-4 py-3 border-b border-border/30 bg-primary/[0.03]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Tilmeld dig for at deltage
              {tournament.max_credits ? ` og modtag op til ${tournament.max_credits.toLocaleString()} credits!` : "!"}
            </p>
            <Button
              onClick={handleJoin}
              disabled={joinMutation.isPending}
              size="sm"
              className="gap-2 shrink-0"
            >
              <Trophy className="h-3.5 w-3.5" />
              {joinMutation.isPending ? "Tilmelder..." : "Deltag"}
            </Button>
          </div>
        </div>
      )}

      {/* Game filter tabs */}
      {tournament.separate_leaderboards && tournament.game_ids.length > 1 && (
        <div className="px-4 pt-3">
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

      {/* Leaderboard content */}
      <div className="px-4 py-3 md:px-5">
        {/* Winner for ended */}
        {isEnded && winner && (
          <div className="mb-4 p-4 rounded-xl border border-primary/20 bg-primary/[0.04] text-center">
            <Crown className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Vinder</p>
            <p className="font-bold text-lg text-foreground">{winner.display_name || "Anonym"}</p>
            <p className="font-bold text-xl text-primary">{winner.total_points.toLocaleString()} point</p>
          </div>
        )}

        {isUpcoming ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto mb-3 opacity-30 text-primary" />
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
            <Trophy className="h-10 w-10 mx-auto mb-2 opacity-30 text-primary" />
            <p className="text-muted-foreground">Ingen har spillet endnu</p>
            <p className="text-sm text-muted-foreground/70">Vær den første på ranglisten!</p>
          </div>
        )}

        {/* Participants */}
        {participants && participants.length > 0 && (
          <div className={cn(top10.length > 0 ? "mt-4 pt-4 border-t border-border/30" : "")}>
            <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
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

        {/* Play buttons */}
        {isActive && hasJoined && (
          <div className={cn("flex gap-2 mt-4", tournament.game_ids.length === 1 ? "" : "flex-col sm:flex-row")}>
            {tournament.game_ids.map((gid) => (
              <Button
                key={gid}
                asChild
                variant="outline"
                className="flex-1 gap-2"
              >
                <Link to={GAME_HREFS[gid] || "/community/slots"}>
                  Spil {GAME_NAMES[gid] || gid}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const { user, loading } = useAuth();
  const { data: tournaments, isLoading: tournamentsLoading } = useTournaments();

  const active = tournaments?.filter((t) => t.status === "active" && !t.is_monthly) || [];
  const upcoming = tournaments?.filter((t) => t.status === "upcoming" && !t.is_monthly) || [];
  const ended = tournaments?.filter((t) => t.status === "ended" && !t.is_monthly) || [];

  // Build JSON-LD: Event schema + FAQ schema
  const now = new Date();
  const currentMonth = now.toLocaleString("da-DK", { month: "long", year: "numeric" });
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        name: `Slot Turnering – ${currentMonth}`,
        description: "Månedlig gratis slot-turnering med præmier. Deltag i tre kategorier: Flest Point, Højeste X og Største Gevinst.",
        startDate: monthStart,
        endDate: monthEnd,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        location: {
          "@type": "VirtualLocation",
          url: "https://casinoaftaler.dk/community/turneringer",
        },
        organizer: {
          "@type": "Organization",
          name: "Casinoaftaler.dk",
          url: "https://casinoaftaler.dk",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "DKK",
          availability: "https://schema.org/InStock",
          url: "https://casinoaftaler.dk/community/turneringer",
          description: "Gratis deltagelse – spil med virtuelle credits",
        },
        isAccessibleForFree: true,
      },
      getTournamentFaqSchema(),
    ],
  };

  return (
    <>
      <SEO
        title="Slot Turneringer – Gratis Turneringer med Præmier 2026"
        description="Deltag gratis i månedlige slot-turneringer og vind præmier op til 500 kr. Tre kategorier, daglige credits og automatisk deltagelse."
        jsonLd={jsonLd}
        breadcrumbLabel="Turneringer"
      />

      {/* Hero Section – with tournament image */}
      <section
        className="relative overflow-hidden text-white"
      >
        <div className="absolute inset-0">
          <img
            src={turneringerHero}
            alt="Slot turneringer med præmier – trofæ, mønter og spilleautomater"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(260 70% 25% / 0.85), hsl(250 60% 20% / 0.8) 40%, hsl(210 80% 25% / 0.85))' }} />
        </div>
        <div className="relative container py-14 md:py-24">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <h1 className="text-3xl font-bold tracking-tight leading-tight md:text-5xl md:leading-tight">
              Slot Turneringer med Præmier
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              Deltag i ugentlige turneringer, kæmp om topplaceringer og vind credits og præmier.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-green-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                {active.length > 0 ? `${active.length} aktiv${active.length > 1 ? 'e' : ''} turnering${active.length > 1 ? 'er' : ''}` : 'Nye turneringer snart'}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                Gratis at deltage
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                Credits som præmier
              </span>
            </div>
          </div>
        </div>
      </section>

      <CommunityNav />

      <div className="container relative">
        {/* Left sidebar */}
        <div className="hidden min-[1540px]:block absolute right-full top-0 mr-6 w-[260px] pt-6">
          <div className="sticky top-24 h-fit flex flex-col gap-4">
            <SidebarSocialProof />
            <SidebarLeaderboard />
            <SidebarShopLeaderboard />
          </div>
        </div>

        {/* Main content + right sidebar */}
        <div className="flex gap-8 xl:gap-10">
          <div className="min-w-0 flex-1">
        <div className="py-8 md:py-12 space-y-8" style={{ minHeight: '80vh' }}>

          {/* Main content */}
          {tournamentsLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => <div key={i} className="h-64 bg-muted/20 rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Monthly tournament boxes */}
              <MonthlyTournamentBoxes />

              <SnippetAnswer answer="Deltag gratis i slot-turneringer med virtuelle credits og kæmp om præmier. Tre kategorier, daglige credits og automatisk deltagelse – kun for community-medlemmer." />

              {!user && <CommunityJoinCTA />}

              {/* Active tournaments */}
              {active.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-4">
                    <Trophy className="h-4 w-4" /> Aktive turneringer
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {active.map((t) => <TournamentCard key={t.id} tournament={t} />)}
                  </div>
                </div>
              )}

              {/* Upcoming tournaments */}
              {upcoming.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Kommende turneringer
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcoming.map((t) => <TournamentCard key={t.id} tournament={t} />)}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Tournament SEO content */}
          <TournamentSeoContent />

          {/* Ended tournaments - collapsible */}
          {ended.length > 0 && (
            <Collapsible>
              <CollapsibleTrigger className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors cursor-pointer group">
                <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                Afsluttede turneringer ({ended.length})
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="space-y-2">
                  {ended.map((t) => <CompletedTournamentRow key={t.id} tournament={t} />)}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Footer SEO – anti-footprint rotated */}
          <CommunityFooterSeo
            currentPath="/community/turneringer"
            author="kevin"
            before={<TurneringerSeoText />}
            after={<FAQSection title="Ofte stillede spørgsmål om turneringer" faqs={tournamentFaqs} />}
          />

          <div className="pb-12" />
        </div>
          </div>
          <ContentSidebar />
        </div>
      </div>
    </>
  );
}
