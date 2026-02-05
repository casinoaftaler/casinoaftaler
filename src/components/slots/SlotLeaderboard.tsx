import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, User, Users, Zap } from "lucide-react";
import { useSlotLeaderboard, type LeaderboardEntry } from "@/hooks/useSlotLeaderboard";
import { cn } from "@/lib/utils";

function LeaderboardRow({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
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
        rank <= 3 ? "bg-gradient-to-r from-amber-500/10 to-transparent" : "hover:bg-muted/50"
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
  const [hasNewUpdate, setHasNewUpdate] = useState(false);
  
  // Main card always shows alltime
  const { data: entries, isLoading } = useSlotLeaderboard("alltime");
  // Dialog shows selected period
  const { data: dialogEntries, isLoading: dialogLoading } = useSlotLeaderboard(dialogPeriod);

  // Show update indicator when data changes
  useEffect(() => {
    setHasNewUpdate(true);
    const timer = setTimeout(() => setHasNewUpdate(false), 2000);
    return () => clearTimeout(timer);
  }, [entries?.length]);

  return (
    <div className="relative">
      {hasNewUpdate && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 bg-emerald-500/90 text-white px-3 py-1 rounded-full text-xs font-medium animate-fade-in z-10">
          <Zap className="h-3 w-3" />
          Opdateret
        </div>
      )}
      <Card className={cn(
        "border-amber-500/30 bg-gradient-to-b from-amber-950/95 via-black/90 to-amber-950/95 backdrop-blur-sm transition-all duration-300",
        hasNewUpdate && "ring-2 ring-emerald-500/50"
      )}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg text-amber-100">
          <Trophy className="h-5 w-5 text-amber-500" />
          Rangliste
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                />
              ))}
            </div>
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
                      dialogEntries.map((entry, index) => (
                        <LeaderboardRow
                          key={entry.user_id}
                          entry={entry}
                          rank={index + 1}
                        />
                      ))
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
