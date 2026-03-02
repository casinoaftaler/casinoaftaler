import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Medal, Award, Users, Search, Zap, Star, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useSlotLeaderboard,
  getCategoryDisplayValue,
  formatCategoryValue,
  getCategoryLabel,
  getCategoryUnit,
  type LeaderboardEntry,
  type LeaderboardCategory,
} from "@/hooks/useSlotLeaderboard";
import { UserProfileLink } from "@/components/UserProfileLink";
import { TwitchBadgesInline } from "@/components/TwitchBadges";
import { cn } from "@/lib/utils";
import { getSlotTheme, type SlotTheme } from "@/lib/slotTheme";
import { useAuth } from "@/hooks/useAuth";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
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
  return now.toLocaleDateString("da-DK", { month: "long", year: "numeric" });
}

function LeaderboardRow({
  entry,
  rank,
  isCurrentUser = false,
  theme,
  category = "total_points",
}: {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser?: boolean;
  theme: SlotTheme;
  category?: LeaderboardCategory;
}) {
  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <span className="w-5 text-center text-muted-foreground font-bold">{rank}</span>;
  };

  const displayValue = getCategoryDisplayValue(entry, category);
  const formattedValue = formatCategoryValue(displayValue, category);
  const unit = getCategoryUnit(category);

  return (
    <div
      className={cn(
        "p-3 rounded-lg",
        rank <= 3 && !isCurrentUser && theme.leaderboardTopRowBg,
        rank > 3 && !isCurrentUser && "hover:bg-muted/50",
        isCurrentUser && `ring-1 ${theme.leaderboardUserRing} ${theme.leaderboardUserBg}`
      )}
    >
      {/* Top row: Rank, Avatar, Name */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-6 flex justify-center">{getRankIcon()}</div>
        <UserProfileLink
          userId={entry.user_id}
          displayName={entry.display_name}
          avatarUrl={entry.avatar_url}
          avatarClassName="h-8 w-8"
        />
        <p className={cn("font-medium flex-1 truncate", theme.leaderboardNameText)}>
          {entry.display_name}
        </p>
        <TwitchBadgesInline badges={entry.twitch_badges as unknown as TwitchBadgesType | null} />
        {isCurrentUser && (
          <Badge variant="outline" className={cn("text-xs", theme.leaderboardUserBadgeBorder, theme.leaderboardUserBadgeText, theme.leaderboardUserBadgeBg)}>
            Du
          </Badge>
        )}
      </div>

      {/* Bottom row: Primary stat + secondary stats */}
      <div className="grid grid-cols-4 gap-4 text-sm pl-2">
        <div className="text-center">
          <p className={cn("font-bold", theme.leaderboardPointsText)}>{formattedValue}</p>
          <p className="text-[10px] text-muted-foreground">{unit}</p>
        </div>
        <div className="text-center">
          <p className={cn("font-medium", theme.leaderboardSpinsText)}>{entry.total_spins.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">credits</p>
        </div>
        <div className="text-center">
          <p className="font-medium text-blue-400">{entry.total_bonuses.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">bonusser</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-green-400">
            {entry.biggest_multiplier > 0 ? `${Number(entry.biggest_multiplier.toFixed(1))}x` : "-"}
          </p>
          <p className="text-[10px] text-muted-foreground">bedste</p>
        </div>
      </div>
    </div>
  );
}

interface SlotLeaderboardProps {
  gameId?: string;
}

export function SlotLeaderboard({ gameId = "book-of-fedesvin" }: SlotLeaderboardProps) {
  const theme = getSlotTheme(gameId);
  const { user } = useAuth();
  const [showFullList, setShowFullList] = useState(false);
  const [category, setCategory] = useState<LeaderboardCategory>("total_points");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useSlotLeaderboard(category);

  const entries = data?.entries;
  const currentUser = data?.currentUser;

  const filteredEntries = entries?.filter(e =>
    e.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isCurrentUserInTop = (userId: string | undefined, list: LeaderboardEntry[] | undefined) =>
    !!userId && !!list && list.some(e => e.user_id === userId);

  const monthLabel = getCurrentMonthLabel();

  return (
    <div className="relative animate-fade-in">
      <Card className={cn(theme.leaderboardCardBorder, theme.leaderboardCardBg, "backdrop-blur-md", theme.leaderboardGlowShadow)}>
        <CardHeader className={cn("pb-2 border-b", theme.leaderboardHeaderBorder)}>
          <CardTitle className={cn("flex items-center gap-2 text-lg", theme.leaderboardTitleText)}>
            <div className={cn("p-1.5 rounded-lg", theme.leaderboardIconBg)}>
              <Trophy className={cn("h-5 w-5", theme.leaderboardIconColor)} />
            </div>
            Månedsturnering
            <Badge variant="outline" className={cn("ml-auto text-[10px] capitalize", theme.leaderboardUserBadgeBorder, theme.leaderboardUserBadgeText)}>
              {monthLabel}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {!user ? (
            <div className="text-center py-8">
              <LogIn className={cn("h-10 w-10 mx-auto mb-2 opacity-50", theme.leaderboardEmptyIconColor)} />
              <p className={theme.leaderboardEmptyText}>Log ind for at se ranglisten</p>
              <Link to="/auth">
                <Button variant="outline" className="mt-3">
                  <LogIn className="h-4 w-4 mr-2" />
                  Log ind
                </Button>
              </Link>
            </div>
          ) : isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : entries && entries.length > 0 ? (
            <>
              {/* Category tabs on card */}
              <Tabs value={category} onValueChange={(v) => setCategory(v as LeaderboardCategory)} className="mb-3">
                <TabsList className={cn("w-full grid grid-cols-3", theme.leaderboardTabsBg)}>
                  <TabsTrigger value="total_points" className={cn("text-xs", theme.leaderboardTabActive, theme.leaderboardTabActiveText)}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Point
                  </TabsTrigger>
                  <TabsTrigger value="highest_x" className={cn("text-xs", theme.leaderboardTabActive, theme.leaderboardTabActiveText)}>
                    <Zap className="h-3 w-3 mr-1" />
                    Højeste X
                  </TabsTrigger>
                  <TabsTrigger value="highest_win" className={cn("text-xs", theme.leaderboardTabActive, theme.leaderboardTabActiveText)}>
                    <Star className="h-3 w-3 mr-1" />
                    Største Gevinst
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-1">
                {entries.slice(0, 3).map((entry, index) => (
                  <LeaderboardRow
                    key={entry.user_id}
                    entry={entry}
                    rank={index + 1}
                    isCurrentUser={currentUser?.entry.user_id === entry.user_id}
                    theme={theme}
                    category={category}
                  />
                ))}
              </div>

              {entries.length > 3 && (
                <Dialog open={showFullList} onOpenChange={(open) => { setShowFullList(open); if (!open) setSearchQuery(""); }}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn("w-full mt-3 border", theme.leaderboardShowAllText, theme.leaderboardShowAllHoverText, theme.leaderboardShowAllHoverBg, theme.leaderboardShowAllBorder)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Vis alle ({entries.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className={cn("max-w-md", theme.leaderboardDialogBorder, theme.leaderboardDialogBg)}>
                    <DialogHeader>
                      <DialogTitle className={cn("flex items-center gap-2", theme.leaderboardDialogTitleText)}>
                        <Trophy className={cn("h-5 w-5", theme.leaderboardIconColor)} />
                        Månedsturnering — {getCategoryLabel(category)}
                      </DialogTitle>
                    </DialogHeader>

                    <Tabs value={category} onValueChange={(v) => setCategory(v as LeaderboardCategory)} className="w-full">
                      <TabsList className={cn("w-full grid grid-cols-3", theme.leaderboardTabsBg)}>
                        <TabsTrigger value="total_points" className={cn(theme.leaderboardTabActive, theme.leaderboardTabActiveText)}>
                          Point
                        </TabsTrigger>
                        <TabsTrigger value="highest_x" className={cn(theme.leaderboardTabActive, theme.leaderboardTabActiveText)}>
                          Højeste X
                        </TabsTrigger>
                        <TabsTrigger value="highest_win" className={cn(theme.leaderboardTabActive, theme.leaderboardTabActiveText)}>
                          Største Gevinst
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Søg efter spiller..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={cn("pl-9", theme.leaderboardSearchBg, theme.leaderboardSearchBorder, theme.leaderboardSearchText, theme.leaderboardSearchPlaceholder, theme.leaderboardSearchRing)}
                      />
                    </div>

                    <div className="space-y-1 max-h-[50vh] overflow-y-auto">
                      {isLoading ? (
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                          ))}
                        </div>
                      ) : filteredEntries && filteredEntries.length > 0 ? (
                        <>
                          {filteredEntries.map((entry) => {
                            const originalRank = entries!.indexOf(entry) + 1;
                            return (
                              <LeaderboardRow
                                key={entry.user_id}
                                entry={entry}
                                rank={originalRank}
                                isCurrentUser={currentUser?.entry.user_id === entry.user_id}
                                theme={theme}
                                category={category}
                              />
                            );
                          })}

                          {/* Pinned current user if not in filtered results */}
                          {!searchQuery && currentUser && !isCurrentUserInTop(currentUser.entry.user_id, entries) && (
                            <>
                              <Separator className={cn("my-2", theme.leaderboardSeparator)} />
                              <LeaderboardRow
                                entry={currentUser.entry}
                                rank={currentUser.rank}
                                isCurrentUser
                                theme={theme}
                                category={category}
                              />
                            </>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <Trophy className={cn("h-10 w-10 mx-auto mb-2 opacity-50", theme.leaderboardEmptyIconColor)} />
                          <p className={theme.leaderboardEmptyText}>
                            {searchQuery ? "Ingen spillere matcher søgningen" : "Ingen gevinster i denne kategori"}
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Trophy className={cn("h-10 w-10 mx-auto mb-2 opacity-50", theme.leaderboardEmptyIconColor)} />
              <p className={theme.leaderboardEmptyText}>Ingen gevinster endnu</p>
              <p className={cn("text-sm", theme.leaderboardEmptySubtext)}>Vær den første på ranglisten!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
