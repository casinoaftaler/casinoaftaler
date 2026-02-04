import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, User, Users } from "lucide-react";
import { useSlotLeaderboard, type LeaderboardEntry } from "@/hooks/useSlotLeaderboard";
import { cn } from "@/lib/utils";

function LeaderboardRow({ entry, rank, period }: { entry: LeaderboardEntry; rank: number; period: string }) {
  const winnings = period === "daily" ? entry.daily_winnings : period === "weekly" ? entry.weekly_winnings : entry.total_winnings;

  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-700" />;
    return <span className="w-5 text-center text-muted-foreground">{rank}</span>;
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg",
        rank <= 3 ? "bg-gradient-to-r from-amber-500/10 to-transparent" : "hover:bg-muted/50"
      )}
    >
      <div className="w-8 flex justify-center">{getRankIcon()}</div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={entry.avatar_url} alt={entry.display_name} />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-amber-100 break-words">{entry.display_name}</p>
        <p className="text-xs text-muted-foreground">{entry.total_spins} spins</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-amber-500">{winnings.toLocaleString()}</p>
        {entry.biggest_win > 0 && (
          <p className="text-xs text-muted-foreground">Max: {entry.biggest_win}</p>
        )}
      </div>
    </div>
  );
}

export function SlotLeaderboard() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "alltime">("alltime");
  const [showFullList, setShowFullList] = useState(false);
  const { data: entries, isLoading } = useSlotLeaderboard(period);

  return (
    <Card className="border-amber-500/30 bg-gradient-to-b from-amber-950/95 via-black/90 to-amber-950/95 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-amber-100">
          <Trophy className="h-5 w-5 text-amber-500" />
          Rangliste
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-amber-950/50">
            <TabsTrigger value="daily">I dag</TabsTrigger>
            <TabsTrigger value="weekly">Uge</TabsTrigger>
            <TabsTrigger value="alltime">Alt</TabsTrigger>
          </TabsList>

          <TabsContent value={period} className="mt-0">
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
                      period={period}
                    />
                  ))}
                </div>
                {entries.length > 3 && (
                  <Dialog open={showFullList} onOpenChange={setShowFullList}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full mt-2 text-amber-500 hover:text-amber-400 hover:bg-amber-500/10 border border-amber-500/30"
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
                      <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                        {entries.map((entry, index) => (
                          <LeaderboardRow
                            key={entry.user_id}
                            entry={entry}
                            rank={index + 1}
                            period={period}
                          />
                        ))}
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
