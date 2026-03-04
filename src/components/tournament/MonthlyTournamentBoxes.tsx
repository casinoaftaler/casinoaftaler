import { useState, useMemo } from "react";
import { Trophy, TrendingUp, Zap, Star, Clock, Gamepad2, Gift, BarChart3, Users, Search, History, Medal, Award, BookOpen, Info, ShieldCheck, Coins, AlertTriangle, Crown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./tournament-effects.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserProfileLink } from "@/components/UserProfileLink";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import { useTournamentCountdown } from "@/hooks/useTournamentCountdown";
import { useMonthlyTournamentArchive } from "@/hooks/useMonthlyTournamentArchive";
import {
  useSlotLeaderboard,
  getCategoryDisplayValue,
  formatCategoryValue,
  getCategoryLabel,
  getCategoryUnit,
  type LeaderboardEntry,
  type LeaderboardCategory,
} from "@/hooks/useSlotLeaderboard";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { TwitchBadges as TwitchBadgesType } from "@/hooks/useTwitchBadges";

import fedesvinBonanzaPreview from "@/assets/slots/fedesvin-bonanza-preview.jpg";
import bookOfFedesvinPreview from "@/assets/slots/book-of-fedesvin-preview.jpg";
import riseOfFedesvinIntro from "@/assets/slots/rise/intro-screen.jpg";

interface TournamentBoxConfig {
  category: LeaderboardCategory;
  gameName: string;
  gameSlug: string;
  image: string;
  icon: React.ReactNode;
  categoryLabel: string;
}

const TOURNAMENT_BOXES: TournamentBoxConfig[] = [
  {
    category: "total_points",
    gameName: "Fedesvin Bonanza",
    gameSlug: "fedesvin-bonanza",
    image: fedesvinBonanzaPreview,
    icon: <TrendingUp className="h-3.5 w-3.5" />,
    categoryLabel: "Flest Point",
  },
  {
    category: "highest_x",
    gameName: "Book of Fedesvin",
    gameSlug: "book-of-fedesvin",
    image: bookOfFedesvinPreview,
    icon: <Zap className="h-3.5 w-3.5" />,
    categoryLabel: "Højeste X",
  },
  {
    category: "highest_win",
    gameName: "Rise of Fedesvin",
    gameSlug: "rise-of-fedesvin",
    image: riseOfFedesvinIntro,
    icon: <Star className="h-3.5 w-3.5" />,
    categoryLabel: "Største Gevinst",
  },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return (
    <div className="relative flex items-center justify-center w-8 h-8">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full animate-pulse opacity-50" />
      <div className="relative bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
        <Trophy className="h-3.5 w-3.5 text-amber-900" />
      </div>
    </div>
  );
  if (rank === 2) return (
    <div className="w-7 h-7 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-md">
      <Medal className="h-3.5 w-3.5 text-gray-700" />
    </div>
  );
  if (rank === 3) return (
    <div className="w-7 h-7 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-full flex items-center justify-center shadow-md">
      <Award className="h-3.5 w-3.5 text-amber-200" />
    </div>
  );
  return (
    <div className="w-7 h-7 bg-muted/50 rounded-full flex items-center justify-center">
      <span className="text-xs font-bold text-muted-foreground">{rank}</span>
    </div>
  );
}

function LeaderboardRow({ entry, rank, isCurrentUser, category }: {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser?: boolean;
  category: LeaderboardCategory;
}) {
  const displayValue = getCategoryDisplayValue(entry, category);
  const formattedValue = formatCategoryValue(displayValue, category);

  return (
    <div className={cn(
      "flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all",
      rank === 1 && "bg-gradient-to-r from-amber-500/10 to-transparent",
      rank === 2 && "bg-gradient-to-r from-gray-400/10 to-transparent",
      rank === 3 && "bg-gradient-to-r from-amber-700/10 to-transparent",
      isCurrentUser && "ring-1 ring-primary/50 bg-primary/5"
    )}>
      <RankBadge rank={rank} />
      <UserProfileLink
        userId={entry.user_id}
        displayName={entry.display_name}
        avatarUrl={entry.avatar_url}
        avatarClassName={cn("h-6 w-6 shrink-0", rank <= 3 && "ring-1 ring-offset-1 ring-offset-background", rank === 1 && "ring-amber-400", rank === 2 && "ring-gray-400", rank === 3 && "ring-amber-600")}
      />
      <span className={cn("text-xs font-medium truncate flex-1 min-w-0", rank <= 3 ? "text-foreground" : "text-muted-foreground")}>
        {entry.display_name || "Anonym"}
      </span>
      {isCurrentUser && <Badge variant="outline" className="text-[9px] px-1 py-0 border-primary/50 text-primary">Du</Badge>}
      <span className={cn("text-xs font-bold tabular-nums shrink-0", rank === 1 ? "text-amber-400" : "text-foreground")}>
        {formattedValue}
      </span>
    </div>
  );
}

function SingleTournamentBox({ config }: { config: TournamentBoxConfig }) {
  const { user } = useAuth();
  const { data, isLoading } = useSlotLeaderboard(config.category);
  const countdown = useTournamentCountdown();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const entries = data?.entries || [];
  const currentUser = data?.currentUser;
  const top5 = entries.slice(0, 5);

  const filteredEntries = searchQuery
    ? entries.filter(e => e.display_name?.toLowerCase().includes(searchQuery.toLowerCase()))
    : entries;

  // Countdown urgency
  const isUrgent = countdown.days < 2;
  const isWarning = countdown.days < 7 && !isUrgent;

  // Particles (memoized, 8 particles)
  const particles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + (i * 12) % 85}%`,
      size: `${2 + (i % 3)}px`,
      duration: `${5 + (i % 4)}s`,
      delay: `${(i * 0.7) % 4}s`,
      drift: `${(i % 2 === 0 ? 1 : -1) * (5 + i * 3)}px`,
      driftEnd: `${(i % 2 === 0 ? -1 : 1) * (3 + i * 2)}px`,
    })),
  []);

  return (
    <div
      className="tournament-card rounded-xl border border-border/50 bg-background dark:bg-card overflow-hidden flex flex-col"
      data-category={config.category}
    >
      {/* Badge header with shine */}
      <div className="tournament-header-shine bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-center py-1.5 px-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center justify-center gap-1.5">
          <Crown className="h-3 w-3 tournament-crown" />
          Månedens Turnering
        </span>
      </div>

      {/* Game image with particles & countdown */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={config.image}
          alt={config.gameName}
          className="tournament-image w-full h-full object-cover"
        />
        {/* Particle overlay */}
        <div className="tournament-particles">
          {particles.map(p => (
            <div
              key={p.id}
              className="tournament-particle"
              style={{
                left: p.left,
                '--p-size': p.size,
                '--p-duration': p.duration,
                '--p-delay': p.delay,
                '--p-drift': p.drift,
                '--p-drift-end': p.driftEnd,
              } as React.CSSProperties}
            />
          ))}
        </div>
        <div className={cn(
          "tournament-countdown absolute top-2 left-2 z-[2] flex items-center gap-1 backdrop-blur-md rounded-md px-2.5 py-1 shadow-lg bg-black/70"
        )}>
          <Clock className="h-3.5 w-3.5 text-white" />
          <span className="text-xs font-mono text-white font-medium">Starter i morgen: 04-04-2026</span>
        </div>
      </div>

      {/* Game info */}
      <div className="px-3 pt-4 pb-1 text-center">
        <h3 className="tournament-title font-bold text-lg text-foreground transition-all duration-200">{config.gameName}</h3>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          {config.icon}
          <span className="text-sm text-muted-foreground">{config.categoryLabel}</span>
        </div>
      </div>

      {/* Prize section */}
      <div className="px-3 py-3">
        <div className="rounded-lg border border-border/40 bg-muted/30 overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-border/40">
            <div className="flex flex-col items-center py-2.5 px-1">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 mb-1.5 shadow-md">
                <Trophy className="h-3.5 w-3.5 text-amber-900" />
              </div>
              <span className="text-xs text-muted-foreground">1. præmie</span>
              <span className="text-sm font-bold text-amber-400">500 kr</span>
            </div>
            <div className="flex flex-col items-center py-2.5 px-1">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 mb-1.5 shadow-md">
                <Medal className="h-3.5 w-3.5 text-gray-700" />
              </div>
              <span className="text-xs text-muted-foreground">2. præmie</span>
              <span className="text-sm font-bold text-foreground">300 kr</span>
            </div>
            <div className="flex flex-col items-center py-2.5 px-1">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 mb-1.5 shadow-md">
                <Award className="h-3.5 w-3.5 text-amber-200" />
              </div>
              <span className="text-xs text-muted-foreground">3. præmie</span>
              <span className="text-sm font-bold text-foreground">200 kr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 mini leaderboard */}
      {!isLoading && top5.length > 0 && (
        <div className="px-2 pb-2 flex-1">
          <div className="space-y-0.5">
            {top5.map((entry, i) => (
              <LeaderboardRow
                key={entry.user_id}
                entry={entry}
                rank={i + 1}
                isCurrentUser={user?.id === entry.user_id}
                category={config.category}
              />
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="px-3 pb-3 mt-auto space-y-2">
        <Button
          size="lg"
          className="tournament-cta w-full text-sm font-bold h-10 text-primary-foreground border-0"
          asChild
        >
          <a href={`/community/slots/${config.gameSlug}`}>
            <Gamepad2 className="h-4 w-4 mr-1.5" />
            Spil nu
          </a>
        </Button>
        <div className="flex gap-2">
          <Dialog open={showInfo} onOpenChange={setShowInfo}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
              >
                <Info className="h-3 w-3 mr-1" />
                Information
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Vilkår & Betingelser
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-5 pr-4">
                  <p className="text-sm text-muted-foreground">
                    Ved deltagelse i disse turneringer bekræfter du følgende vilkår & betingelser:
                  </p>

                  {/* 1. Alderskrav */}
                  <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                      <h4 className="font-semibold text-sm text-foreground">1. Alderskrav</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      For at kunne modtage gevinster, præmier eller andre belønninger via casinoaftaler.dk skal du være minimum 18 år. Dette krav gælder uden undtagelse og er i overensstemmelse med gældende dansk lovgivning. Casinoaftaler.dk forbeholder sig retten til at anmode om aldersverifikation, før eventuelle gevinster udbetales.
                    </p>
                  </div>

                  {/* 2. Credits */}
                  <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-primary shrink-0" />
                      <h4 className="font-semibold text-sm text-foreground">2. Credits</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Credits på casinoaftaler.dk er en intern, fiktiv valuta, som udelukkende anvendes inden for platformen til ranglister, konkurrencer og belønningssystemer.
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1.5 mt-2">
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground/60 mt-0.5">•</span>
                        Credits har ingen reel pengeværdi
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground/60 mt-0.5">•</span>
                        Credits kan ikke veksles til kontanter
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground/60 mt-0.5">•</span>
                        Credits kan ikke hæves, overføres eller sælges
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-muted-foreground/60 mt-0.5">•</span>
                        Credits kan kun bruges i de sammenhænge, der er beskrevet på sitet
                      </li>
                    </ul>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 italic">
                      Credits er alene et underholdnings- og motivationsværktøj og må ikke opfattes som penge, kredit eller en finansiel værdi.
                    </p>
                  </div>

                  {/* 3. Gevinster */}
                  <div className="rounded-lg border border-border/50 bg-muted/30 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-amber-500 shrink-0" />
                      <h4 className="font-semibold text-sm text-foreground">3. Gevinster</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Eventuelle gevinster, præmier eller belønninger er underlagt alderskravet, de gældende vilkår og betingelser samt eventuelle krav fra samarbejdspartnere.
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      Casinoaftaler.dk er ikke et online casino, men fungerer som en informations- og formidlingsplatform for casinoaftaler og kampagner.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Dialog open={showLeaderboard} onOpenChange={setShowLeaderboard}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                Leaderboard
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  {config.gameName} — {config.categoryLabel}
                </DialogTitle>
              </DialogHeader>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Søg efter spiller..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                {filteredEntries.map((entry, i) => {
                  const rank = entries.indexOf(entry) + 1;
                  return (
                    <LeaderboardRow
                      key={entry.user_id}
                      entry={entry}
                      rank={rank}
                      isCurrentUser={user?.id === entry.user_id}
                      category={config.category}
                    />
                  );
                })}
                {currentUser && currentUser.rank > entries.length && (
                  <>
                    <Separator className="my-2" />
                    <LeaderboardRow entry={currentUser.entry} rank={currentUser.rank} isCurrentUser category={config.category} />
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export function MonthlyTournamentBoxes() {
  const countdown = useTournamentCountdown();
  const { data: archiveData } = useMonthlyTournamentArchive();
  const [showArchive, setShowArchive] = useState(false);

  const now = new Date();
  const monthLabel = `${now.toLocaleDateString("da-DK", { month: "long" }).replace(/^./, c => c.toUpperCase())} ${now.getFullYear()}`;

  return (
    <div className="space-y-3">
      {/* Section header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          <h2 className="font-bold text-lg text-foreground">Turneringer</h2>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize whitespace-nowrap">
            {monthLabel}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          {archiveData && archiveData.length > 0 && (
            <Dialog open={showArchive} onOpenChange={setShowArchive}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7 px-2">
                  <History className="h-3.5 w-3.5 mr-1" />
                  Arkiv
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <History className="h-5 w-5 text-amber-400" />
                    Tidligere vindere
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {archiveData.map(({ month, entries }) => {
                    const monthDate = new Date(month + "T00:00:00");
                    const monthName = monthDate.toLocaleDateString("da-DK", { month: "long", year: "numeric" });
                    return (
                      <div key={month}>
                        <h4 className="text-sm font-semibold text-foreground capitalize mb-2">{monthName}</h4>
                        <div className="space-y-1.5">
                          {entries.map((arch) => (
                            <div key={arch.id} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-muted/30">
                              <Avatar className="h-6 w-6 shrink-0">
                                <AvatarImage src={arch.winner_avatar_url || undefined} />
                                <AvatarFallback className="text-[10px]">{arch.winner_display_name.charAt(0).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium text-foreground truncate flex-1">{arch.winner_display_name}</span>
                              <span className="text-xs font-mono font-semibold tabular-nums text-amber-400">
                                {formatCategoryValue(arch.winning_value, arch.category as LeaderboardCategory)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* 3 tournament boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TOURNAMENT_BOXES.map((box) => (
          <SingleTournamentBox key={box.category} config={box} />
        ))}
      </div>
    </div>
  );
}
