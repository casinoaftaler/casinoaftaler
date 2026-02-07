import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trophy, Medal, Award, User, Users } from "lucide-react";
import { useSlotLeaderboard, type LeaderboardEntry } from "@/hooks/useSlotLeaderboard";
import { cn } from "@/lib/utils";

function LeaderboardRow({
  entry,
  rank,
  isCurrentUser = false,
}: {
  entry: LeaderboardEntry;
  rank: number;
  isCurrentUser?: boolean;
}) {
  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <span className="w-5 text-center text-muted-foreground font-bold">{rank}</span>;
  };

  const formattedMultiplier = entry.biggest_multiplier > 0
    ? `${Number(entry.biggest_multiplier.toFixed(1))}x`
    : "-";

  return (
    <div
      className={cn(
        "p-3 rounded-lg",
        rank <= 3 && !isCurrentUser && "bg-gradient-to-r from-amber-500/10 to-transparent",
        rank > 3 && !isCurrentUser && "hover:bg-muted/50",
        isCurrentUser && "ring-1 ring-amber-500/50 bg-amber-500/10"
      )}
    >
      {/* Top row: Rank, Avatar, Name */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-6 flex justify-center">{getRankIcon()}</div>
        <Avatar className="h-8 w-8">
          <AvatarImage src={entry.avatar_url} alt={entry.display_name} />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <p className="font-medium text-amber-100 flex-1 truncate">
          {entry.display_name}
        </p>
        {isCurrentUser && (
          <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-400 bg-amber-500/10">
            Du
          </Badge>
        )}
      </div>

      {/* Bottom row: Stats in 4 columns */}
      <div className="flex items-center justify-between text-sm pl-9">
        <div className="text-center">
          <p className="font-bold text-amber-500">{entry.total_winnings.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">point</p>
        </div>
        <div className="text-center">
          <p className="font-medium text-amber-100">{entry.total_spins.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">spins</p>
        </div>
        <div className="text-center">
          <p className="font-medium text-blue-400">{entry.total_bonuses.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">bonusser</p>
        </div>
        <div className="text-center">
          <p className="font-bold text-green-400">{formattedMultiplier}</p>
          <p className="text-xs text-muted-foreground">bedste</p>
        </div>
      </div>
    </div>
  );
}

export function SlotLeaderboard() {
  const [showFullList, setShowFullList] = useState(false);
  const [dialogPeriod, setDialogPeriod] = useState<"daily" | "weekly" | "alltime">("alltime");

  // Main card always shows alltime
  const { data: alltimeData, isLoading } = useSlotLeaderboard("alltime");
  // Dialog shows selected period
  const { data: dialogData, isLoading: dialogLoading } = useSlotLeaderboard(dialogPeriod);

  const entries = alltimeData?.entries;
  const currentUser = alltimeData?.currentUser;
  const dialogEntries = dialogData?.entries;
  const dialogCurrentUser = dialogData?.currentUser;

  const isCurrentUserInTop = (userId: string | undefined, list: LeaderboardEntry[] | undefined) =>
    !!userId && !!list && list.some(e => e.user_id === userId);

  return (
    <div className="relative animate-fade-in">
      <Card className="border-amber-500/30 bg-gradient-to-b from-amber-950/95 via-black/90 to-amber-950/95 backdrop-blur-md shadow-[0_0_30px_rgba(251,191,36,0.1)]">
        <CardHeader className="pb-2 border-b border-amber-500/10">
          <CardTitle className="flex items-center gap-2 text-lg text-amber-100">
            <div className="p-1.5 rounded-lg bg-amber-500/20">
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
            Rangliste
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : entries && entries.length > 0 ? (
            <>
              <div className="space-y-1">
                {entries.slice(0, 3).map((entry, index) => (
                  <LeaderboardRow
                    key={entry.user_id}
                    entry={entry}
                    rank={index + 1}
                    isCurrentUser={currentUser?.entry.user_id === entry.user_id}
                  />
                ))}
              </div>

              {/* Pinned current user row if not in top 3 */}
              {currentUser && !isCurrentUserInTop(currentUser.entry.user_id, entries.slice(0, 3)) && (
                <>
                  <Separator className="my-2 bg-amber-500/20" />
                  <LeaderboardRow
                    entry={currentUser.entry}
                    rank={currentUser.rank}
                    isCurrentUser
                  />
                </>
              )}

              {entries.length > 3 && (
                <Dialog open={showFullList} onOpenChange={setShowFullList}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full mt-3 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 border border-amber-500/30"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Vis alle ({entries.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md border-amber-500/30 bg-gradient-to-b from-amber-950/98 via-black/95 to-amber-950/98">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-amber-100">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        Fuld Rangliste
                      </DialogTitle>
                    </DialogHeader>

                    <Tabs value={dialogPeriod} onValueChange={(v) => setDialogPeriod(v as typeof dialogPeriod)} className="w-full">
                      <TabsList className="w-full grid grid-cols-3 bg-amber-950/50">
                        <TabsTrigger value="daily" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-100">
                          I dag
                        </TabsTrigger>
                        <TabsTrigger value="weekly" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-100">
                          Uge
                        </TabsTrigger>
                        <TabsTrigger value="alltime" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-100">
                          Måned
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                      {dialogLoading ? (
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                          ))}
                        </div>
                      ) : dialogEntries && dialogEntries.length > 0 ? (
                        <>
                          {dialogEntries.map((entry, index) => (
                            <LeaderboardRow
                              key={entry.user_id}
                              entry={entry}
                              rank={index + 1}
                              isCurrentUser={dialogCurrentUser?.entry.user_id === entry.user_id}
                            />
                          ))}

                          {/* Pinned current user if not in top 10 */}
                          {dialogCurrentUser && !isCurrentUserInTop(dialogCurrentUser.entry.user_id, dialogEntries) && (
                            <>
                              <Separator className="my-2 bg-amber-500/20" />
                              <LeaderboardRow
                                entry={dialogCurrentUser.entry}
                                rank={dialogCurrentUser.rank}
                                isCurrentUser
                              />
                            </>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <Trophy className="h-10 w-10 mx-auto mb-2 opacity-50 text-amber-500/50" />
                          <p className="text-amber-100/80">Ingen gevinster i denne periode</p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Trophy className="h-10 w-10 mx-auto mb-2 opacity-50 text-amber-500/50" />
              <p className="text-amber-100/80">Ingen gevinster endnu</p>
              <p className="text-sm text-amber-100/60">Vær den første på ranglisten!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
