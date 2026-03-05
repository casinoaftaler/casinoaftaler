import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Users } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";

const GROUPS = [
  { letter: 'A', range: '0-59x', color: 'bg-red-500/20 text-red-400 border-red-500/40' },
  { letter: 'B', range: '60-69x', color: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
  { letter: 'C', range: '70-79x', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  { letter: 'D', range: '80-89x', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  { letter: 'E', range: '90-99x', color: 'bg-lime-500/20 text-lime-400 border-lime-500/40' },
  { letter: 'F', range: '100-109x', color: 'bg-green-500/20 text-green-400 border-green-500/40' },
  { letter: 'G', range: '110-119x', color: 'bg-teal-500/20 text-teal-400 border-teal-500/40' },
  { letter: 'H', range: '120-129x', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
  { letter: 'I', range: '130-139x', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
  { letter: 'J', range: '140x+', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
];

interface Props {
  session: any;
  bets: any[];
  userId?: string;
  openedBonuses?: number;
  onBetPlaced: () => void;
}

export function BonusHuntAvgXTab({ session, bets, userId, openedBonuses = 0, onBetPlaced }: Props) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const userBet = bets.find(b => b.user_id === userId);
  const isOpen = session?.avgx_betting_open;
  const remaining = Math.max(0, 3 - openedBonuses);
  const totalPot = bets.reduce((sum: number, b: any) => sum + b.bet_amount, 0);

  const groupStats = useMemo(() => {
    const stats: Record<string, { count: number; total: number }> = {};
    GROUPS.forEach(g => { stats[g.letter] = { count: 0, total: 0 }; });
    bets.forEach((b: any) => {
      if (stats[b.group_letter]) {
        stats[b.group_letter].count++;
        stats[b.group_letter].total += b.bet_amount;
      }
    });
    return stats;
  }, [bets]);

  const handlePlaceBet = async () => {
    const bet = parseInt(betAmount || (userBet ? String(userBet.bet_amount) : ''));
    const group = selectedGroup || (userBet ? userBet.group_letter : null);
    if (!group || !bet || bet <= 0) {
      toast.error("Vælg en gruppe og angiv bet amount");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('bonus-hunt-place-bet', {
        body: {
          sessionId: session.id,
          betType: 'avgx',
          betAmount: bet,
          groupLetter: group,
        },
      });

      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success(data.updated ? `AVG X bet opdateret! Gruppe: ${selectedGroup}` : `AVG X bet på gruppe ${selectedGroup} placeret!`);
      onBetPlaced();
    } catch (e: any) {
      toast.error(e.message || "Fejl ved placering af bet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Group buttons grid */}
      <div className="grid grid-cols-5 gap-2">
        {GROUPS.map(g => {
          const stats = groupStats[g.letter];
          const pct = totalPot > 0 ? Math.round((stats.total / totalPot) * 100) : 0;
          const isSelected = selectedGroup === g.letter;
          const isWinner = session?.winning_group === g.letter;

          return (
            <button
              key={g.letter}
              onClick={() => isOpen && userId && setSelectedGroup(g.letter)}
              className={`
                flex flex-col items-center gap-0.5 p-2 rounded-lg border text-xs transition-all
                ${isWinner ? 'ring-2 ring-green-500 bg-green-500/20' : ''}
                ${isSelected ? 'ring-2 ring-primary' : ''}
                ${g.color}
                ${isOpen && userId ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
              `}
            >
              <span className="font-bold text-base">{g.letter}</span>
              <span className="opacity-70">{g.range}</span>
              <span className="font-semibold">{pct}%</span>
            </button>
          );
        })}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
              <CreditCoin size="sm" /> Total Pot
            </p>
            <p className="text-lg font-bold flex items-center justify-center gap-1"><CreditCoin size="lg" />{totalPot}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1 flex items-center justify-center gap-1">
              <Users className="h-3 w-3" /> Deltagere
            </p>
            <p className="text-lg font-bold">{bets.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* User bet info */}
      {userBet && (
        <Card>
          <CardContent className="p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Dit Bet</p>
                <p className="font-semibold flex items-center gap-1">Gruppe {userBet.group_letter} — <CreditCoin size="sm" />{userBet.bet_amount}</p>
              </div>
              {userBet.winnings !== null && (
                <Badge variant={userBet.winnings > 0 ? "default" : "secondary"}>
                  {userBet.winnings > 0 ? <span className="flex items-center gap-1">+<CreditCoin size="sm" />{userBet.winnings}</span> : 'Tabt'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Winning group result */}
      {session?.winning_group && (
        <Card className="border-green-500/50">
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Vindende Gruppe</p>
            <p className="text-2xl font-bold text-green-500">{session.winning_group}</p>
            <p className="text-sm text-muted-foreground">
              Average X: {session.average_x}x
            </p>
          </CardContent>
        </Card>
      )}

      {/* Betting countdown indicator */}
      {isOpen && remaining > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
          <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
          Betting lukker efter {remaining} åbne{remaining === 1 ? 't' : 'de'} bonus{remaining === 1 ? '' : 'ser'}
        </div>
      )}

      {/* Betting form - show when betting open and user logged in */}
      {isOpen && userId && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h4 className="text-sm font-semibold">
              {selectedGroup ? `${userBet ? 'Opdater' : 'Bet på'} Gruppe ${selectedGroup}` : (userBet ? `Dit bet: Gruppe ${userBet.group_letter} — Vælg ny gruppe ovenfor` : 'Vælg en gruppe ovenfor')}
            </h4>
            <Input
              type="number"
              placeholder={`Credits (${session.avgx_min_bet}-${session.avgx_max_bet})`}
              value={betAmount || (userBet ? String(userBet.bet_amount) : '')}
              onChange={e => setBetAmount(e.target.value)}
              min={session.avgx_min_bet}
              max={session.avgx_max_bet}
            />
            <Button onClick={handlePlaceBet} disabled={loading || (!selectedGroup && !userBet)} className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {userBet ? 'Opdater AVG X Bet' : 'Placer AVG X Bet'}
            </Button>
          </CardContent>
        </Card>
      )}

      {isOpen && !userId && (
        <Card>
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            Log ind for at placere et bet
          </CardContent>
        </Card>
      )}

      {!isOpen && !userBet && (
        <Badge variant="outline" className="w-full justify-center py-2">
          AVG X betting er lukket
        </Badge>
      )}

      {/* Participants list */}
      {bets.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold mb-2">Deltagere ({bets.length})</h4>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {bets.map(bet => (
                <div
                  key={bet.id}
                  className={`flex items-center gap-2 text-sm py-1 ${
                    bet.user_id === userId ? 'text-primary font-semibold' : ''
                  }`}
                >
                  <Avatar className="h-5 w-5 shrink-0">
                    {bet.avatar_url && <AvatarImage src={bet.avatar_url} />}
                    <AvatarFallback className="text-[9px]">
                      {(bet.display_name || '?')[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate flex-1 min-w-0">{bet.display_name || 'Anonym'}</span>
                  <Badge variant="outline" className="text-xs shrink-0">
                    Gruppe {bet.group_letter}
                  </Badge>
                  <span className="text-xs text-muted-foreground shrink-0 flex items-center gap-0.5"><CreditCoin size="sm" />{bet.bet_amount}</span>
                  {bet.winnings !== null && bet.winnings > 0 && (
                    <Badge variant="default" className="text-xs shrink-0 flex items-center gap-0.5">+<CreditCoin size="sm" />{bet.winnings}</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
