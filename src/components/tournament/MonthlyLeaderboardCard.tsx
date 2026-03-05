import { useState } from "react";
import { Trophy, Medal, Award, TrendingUp, Zap, Star, Clock, Users, Search, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserProfileLink } from "@/components/UserProfileLink";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import { useTournamentCountdown } from "@/hooks/useTournamentCountdown";
import { useMonthlyTournamentConfig } from "@/hooks/useMonthlyTournamentConfig";
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

function getCategoryIcon(category: LeaderboardCategory) {
  switch (category) {
    case "highest_x": return <Zap className="h-4 w-4" />;
    case "highest_win": return <Star className="h-4 w-4" />;
    case "total_points":
    default: return <TrendingUp className="h-4 w-4" />;
  }
}

function getCurrentMonthLabel(): string {
  const now = new Date();
  const month = now.toLocaleDateString("da-DK", { month: "long" });
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${now.getFullYear()}`;
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full animate-pulse opacity-50" />
      <div className="relative bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
        <Trophy className="h-4 w-4 text-amber-900" />
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

function MonthlyRow({ entry, rank, isCurrentUser, category }: {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser?: boolean;
  category: LeaderboardCategory;
}) {
  const displayValue = getCategoryDisplayValue(entry, category);
  const formattedValue = formatCategoryValue(displayValue, category);
  const unit = getCategoryUnit(category);

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
            <p className="text-xs text-muted-foreground">{entry.total_spins.toLocaleString()} credits · {entry.total_bonuses.toLocaleString()} bonusser</p>
          </div>
        </div>
      </div>
      {isCurrentUser && <Badge variant="outline" className="text-xs border-primary/50 text-primary bg-primary/10">Du</Badge>}
      <div className="text-right">
        <p className={cn("font-bold", rank === 1 ? "text-amber-400" : rank === 2 ? "text-gray-300" : rank === 3 ? "text-amber-600" : "text-foreground")}>
          {formattedValue}
        </p>
        <p className="text-xs text-muted-foreground">{unit}</p>
      </div>
    </div>
  );
}

export function MonthlyLeaderboardCard() {
  const { user } = useAuth();
  const [category, setCategory] = useState<LeaderboardCategory>("total_points");
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchive, setShowArchive] = useState(false);
  const countdown = useTournamentCountdown();
  
  // Get config to find the game_id for each category
  const { data: configs } = useMonthlyTournamentConfig();
  const activeConfig = configs?.find(c => c.category === category);
  const gameId = activeConfig?.game_id;
  
  const { data, isLoading } = useSlotLeaderboard(category, gameId);
  const { data: archiveData } = useMonthlyTournamentArchive();

  const entries = data?.entries || [];
  const currentUser = data?.currentUser;
  const top10 = entries.slice(0, 10);

  const filteredEntries = searchQuery
    ? entries.filter(e => e.display_name?.toLowerCase().includes(searchQuery.toLowerCase()))
    : entries;

  const monthLabel = getCurrentMonthLabel();

  return (
    <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 md:px-5 md:py-4 border-b border-border/30">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-amber-500/10 shrink-0">
              <Trophy className="h-5 w-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-foreground">Månedsturnering</h3>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize whitespace-nowrap">
                  {monthLabel}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Automatisk rangeret efter månedens resultater i alle slots
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Clock className="h-3.5 w-3.5" />
            <span>Starter i morgen: 04-04-2026</span>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="px-4 pt-3 md:px-5">
        <Tabs value={category} onValueChange={(v) => setCategory(v as LeaderboardCategory)}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="total_points" className="text-xs gap-1">
              <TrendingUp className="h-3 w-3" />
              Flest Point
            </TabsTrigger>
            <TabsTrigger value="highest_x" className="text-xs gap-1">
              <Zap className="h-3 w-3" />
              Højeste X
            </TabsTrigger>
            <TabsTrigger value="highest_win" className="text-xs gap-1">
              <Star className="h-3 w-3" />
              Største Gevinst
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Leaderboard content */}
      <div className="px-4 py-3 md:px-5">
        {!user ? (
          <div className="text-center py-8">
            <Trophy className="h-10 w-10 mx-auto mb-2 opacity-30 text-amber-400" />
            <p className="text-muted-foreground">Log ind for at se månedsturneringen</p>
          </div>
        ) : isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 bg-muted/20 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : top10.length > 0 ? (
          <>
            <div className="space-y-1">
              {top10.map((entry, index) => (
                <MonthlyRow
                  key={entry.user_id}
                  entry={entry}
                  rank={index + 1}
                  isCurrentUser={user?.id === entry.user_id}
                  category={category}
                />
              ))}
            </div>

            {/* Current user if outside top 10 */}
            {currentUser && currentUser.rank > 10 && (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="flex-1 border-t border-dashed border-muted-foreground/20" />
                  <span className="text-xs text-muted-foreground">Din placering</span>
                  <div className="flex-1 border-t border-dashed border-muted-foreground/20" />
                </div>
                <MonthlyRow entry={currentUser.entry} rank={currentUser.rank} isCurrentUser category={category} />
              </>
            )}

            {/* Show all button */}
            {entries.length > 10 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full mt-3 border border-border/50 text-xs text-muted-foreground hover:text-foreground" size="sm">
                    <Users className="h-3.5 w-3.5 mr-1.5" />
                    Vis alle {entries.length} spillere
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-amber-400" />
                      Månedsturnering — {getCategoryLabel(category)}
                    </DialogTitle>
                  </DialogHeader>

                  <Tabs value={category} onValueChange={(v) => setCategory(v as LeaderboardCategory)}>
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="total_points">Point</TabsTrigger>
                      <TabsTrigger value="highest_x">Højeste X</TabsTrigger>
                      <TabsTrigger value="highest_win">Største Gevinst</TabsTrigger>
                    </TabsList>
                  </Tabs>

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
                    {filteredEntries.map((entry) => {
                      const originalRank = entries.indexOf(entry) + 1;
                      return (
                        <MonthlyRow
                          key={entry.user_id}
                          entry={entry}
                          rank={originalRank}
                          isCurrentUser={user?.id === entry.user_id}
                          category={category}
                        />
                      );
                    })}
                    {!searchQuery && currentUser && currentUser.rank > entries.length && (
                      <>
                        <Separator className="my-2" />
                        <MonthlyRow entry={currentUser.entry} rank={currentUser.rank} isCurrentUser category={category} />
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <Trophy className="h-10 w-10 mx-auto mb-2 opacity-30 text-amber-400" />
            <p className="text-muted-foreground">Ingen gevinster i denne kategori endnu</p>
            <p className="text-sm text-muted-foreground/70">Vær den første på ranglisten!</p>
          </div>
        )}

        {/* Archive button */}
        {archiveData && archiveData.length > 0 && (
          <Dialog open={showArchive} onOpenChange={setShowArchive}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full mt-2 border border-border/50 text-xs text-muted-foreground" size="sm">
                <History className="h-3.5 w-3.5 mr-1.5" />
                Tidligere vindere
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
                {archiveData.map(({ month, entries: archEntries }) => {
                  const monthDate = new Date(month + "T00:00:00");
                  const monthName = monthDate.toLocaleDateString("da-DK", { month: "long", year: "numeric" });
                  return (
                    <div key={month}>
                      <h4 className="text-sm font-semibold text-foreground capitalize mb-2">{monthName}</h4>
                      <div className="space-y-1.5">
                        {archEntries.map((arch) => (
                          <div key={arch.id} className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-muted/30">
                            <div className="flex items-center gap-1 w-20 shrink-0">
                              {getCategoryIcon(arch.category as LeaderboardCategory)}
                              <span className="text-[10px] text-muted-foreground truncate">
                                {getCategoryLabel(arch.category as LeaderboardCategory)}
                              </span>
                            </div>
                            <Avatar className="h-6 w-6 shrink-0">
                              <AvatarImage src={arch.winner_avatar_url || undefined} />
                              <AvatarFallback className="text-[10px]">
                                {arch.winner_display_name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium text-foreground truncate flex-1">
                              {arch.winner_display_name}
                            </span>
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
  );
}
