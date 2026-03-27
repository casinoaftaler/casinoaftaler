import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Trophy } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";

interface Props {
  session: any;
  bets: any[];
  userId?: string;
  openedBonuses?: number;
  onBetPlaced: () => void;
  endBalance?: number | null;
  startBalance?: number | null;
}

export function BonusHuntGTWTab({ session, bets, userId, openedBonuses = 0, onBetPlaced, endBalance, startBalance }: Props) {
  const [guessAmount, setGuessAmount] = useState(() => "");
  const [betAmount, setBetAmount] = useState(() => "");
  const [loading, setLoading] = useState(false);

  const userBet = bets.find(b => b.user_id === userId);
  const isOpen = session?.gtw_betting_open;
  const remaining = Math.max(0, 3 - openedBonuses);
  const prizes = (session?.gtw_prizes || []) as Array<{ place: number; points: number; credits?: number }>;

  const rankedBets = [...bets]
    .sort((a, b) => {
      if (a.rank && b.rank) return a.rank - b.rank;
      if (a.difference !== null && b.difference !== null) return a.difference - b.difference;
      return 0;
    });

  const isSettled = rankedBets.some(b => b.difference !== null && b.difference !== undefined);
  const top10 = isSettled ? rankedBets.slice(0, 10) : [];

  const handlePlaceBet = async () => {
    const guess = parseFloat(guessAmount || (userBet ? String(userBet.guess_amount) : ''));
    const bet = parseInt(betAmount || (userBet ? String(userBet.bet_amount) : ''));
    if (!guess || guess <= 0 || !bet || bet <= 0) {
      toast.error("Udfyld begge felter med gyldige tal");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('bonus-hunt-place-bet', {
        body: {
          sessionId: session.id,
          betType: 'gtw',
          betAmount: bet,
          guessAmount: guess,
        },
      });

      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success(data.updated ? `GTW bet opdateret! Credits tilbage: ${data.creditsRemaining}` : `GTW bet placeret! Credits tilbage: ${data.creditsRemaining}`);
      onBetPlaced();
    } catch (e: any) {
      toast.error(e.message || "Fejl ved placering af bet");
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}.`;
  };

  return (
    <div className="space-y-4">
      {/* Hunt result card – shown when settled */}
      {endBalance != null && (
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">Faktisk End Balance</p>
                <p className="text-2xl font-bold text-primary">{Number(endBalance).toLocaleString('da-DK')} kr</p>
              </div>
              {startBalance != null && (
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-1">Resultat</p>
                  <p className={`text-lg font-bold ${endBalance - startBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {endBalance - startBalance >= 0 ? '+' : ''}{(endBalance - startBalance).toLocaleString('da-DK')} kr
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* User status cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Dit Gæt</p>
            <p className="text-lg font-bold">
              {userBet ? `${Number(userBet.guess_amount).toLocaleString('da-DK')} kr` : '—'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Prediction Gap</p>
            <p className="text-lg font-bold">
              {userBet?.difference !== null && userBet?.difference !== undefined
                ? `${Number(userBet.difference).toLocaleString('da-DK')} kr`
                : '—'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Prize pool */}
      {prizes.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              Prize Pool
            </h4>
            <div className="space-y-1">
              {prizes.map(p => (
                <div key={p.place} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {getRankIcon(p.place)} plads
                  </span>
                  <span className="font-medium flex items-center gap-1">
                    {p.points > 0 && <span>{p.points} points</span>}
                    {p.points > 0 && p.credits && p.credits > 0 && <span>+</span>}
                    {p.credits && p.credits > 0 ? <><CreditCoin size="sm" />{p.credits}</> : null}
                    {!(p.points > 0) && !(p.credits && p.credits > 0) && '—'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top 10 Results (only when settled) */}
      {isSettled && top10.length > 0 && (
        <Card className="border-amber-500/30">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              Top 10 Resultater
            </h4>
            <div className="space-y-2">
              {top10.map((bet, i) => (
                <div
                  key={bet.id}
                  className={`flex items-center gap-2 text-sm py-1.5 px-2 rounded ${
                    bet.user_id === userId ? 'bg-primary/10 text-primary font-semibold' : ''
                  }`}
                >
                  <span className="w-8 text-center shrink-0">{getRankIcon(bet.rank || i + 1)}</span>
                  <Avatar className="h-6 w-6 shrink-0">
                    {bet.avatar_url && <AvatarImage src={bet.avatar_url} />}
                    <AvatarFallback className="text-[10px]">
                      {(bet.display_name || '?')[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate flex-1">{bet.display_name || 'Anonym'}</span>
                  <span className="shrink-0">{Number(bet.guess_amount).toLocaleString('da-DK')} kr</span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {Number(bet.difference).toLocaleString('da-DK')} kr gap
                  </span>
                </div>
              ))}
            </div>
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

      {/* Betting form - show when betting open and user is logged in */}
      {isOpen && userId && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h4 className="text-sm font-semibold">{userBet ? 'Opdater dit gæt' : 'Placer dit gæt'}</h4>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="End balance gæt (kr)"
                value={guessAmount || (userBet ? String(userBet.guess_amount) : '')}
                onChange={e => setGuessAmount(e.target.value)}
              />
              <Input
                type="number"
                placeholder={`Credits (${session.gtw_min_bet}-${session.gtw_max_bet})`}
                value={betAmount || (userBet ? String(userBet.bet_amount) : '')}
                onChange={e => setBetAmount(e.target.value)}
                min={session.gtw_min_bet}
                max={session.gtw_max_bet}
              />
              <Button onClick={handlePlaceBet} disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                {userBet ? 'Opdater GTW Bet' : 'Placer GTW Bet'}
              </Button>
            </div>
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

      {!isOpen && userBet && (
        <Badge variant="outline" className="w-full justify-center py-2">
          ✅ Dit GTW bet er låst
        </Badge>
      )}

      {/* Leaderboard */}
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-2">Leaderboard ({bets.length} deltagere)</h4>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {rankedBets.slice(0, 20).map((bet, i) => (
              <div
                key={bet.id}
                className={`flex items-center gap-2 text-sm py-1 ${
                  bet.user_id === userId ? 'text-primary font-semibold' : ''
                }`}
              >
                <span className="text-muted-foreground w-6 shrink-0">{bet.rank || i + 1}.</span>
                <Avatar className="h-5 w-5 shrink-0">
                  {bet.avatar_url && <AvatarImage src={bet.avatar_url} />}
                  <AvatarFallback className="text-[9px]">
                    {(bet.display_name || '?')[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate flex-1 min-w-0">{bet.display_name || 'Anonym'}</span>
                <span className="shrink-0">{Number(bet.guess_amount).toLocaleString('da-DK')} kr</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {bet.difference !== null ? `${Number(bet.difference).toLocaleString('da-DK')} kr gap` : `${bet.bet_amount} credits`}
                </span>
              </div>
            ))}
            {bets.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Ingen bets endnu</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
