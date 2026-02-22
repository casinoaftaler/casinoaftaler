import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Trophy } from "lucide-react";

interface Props {
  session: any;
  bets: any[];
  userId?: string;
  onBetPlaced: () => void;
}

export function BonusHuntGTWTab({ session, bets, userId, onBetPlaced }: Props) {
  const [guessAmount, setGuessAmount] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const userBet = bets.find(b => b.user_id === userId);
  const isOpen = session?.gtw_betting_open;
  const prizes = (session?.gtw_prizes || []) as Array<{ place: number; points: number }>;

  // Sort bets by rank or difference
  const rankedBets = [...bets]
    .sort((a, b) => {
      if (a.rank && b.rank) return a.rank - b.rank;
      if (a.difference !== null && b.difference !== null) return a.difference - b.difference;
      return 0;
    });

  const handlePlaceBet = async () => {
    const guess = parseFloat(guessAmount);
    const bet = parseInt(betAmount);
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

      toast.success(`GTW bet placeret! Credits tilbage: ${data.creditsRemaining}`);
      setGuessAmount("");
      setBetAmount("");
      onBetPlaced();
    } catch (e: any) {
      toast.error(e.message || "Fejl ved placering af bet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
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
                    {p.place === 1 ? '🥇' : p.place === 2 ? '🥈' : p.place === 3 ? '🥉' : `${p.place}.`} plads
                  </span>
                  <span className="font-medium">{p.points} points</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Betting form */}
      {isOpen && !userBet && userId && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h4 className="text-sm font-semibold">Placer dit gæt</h4>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="End balance gæt (kr)"
                value={guessAmount}
                onChange={e => setGuessAmount(e.target.value)}
              />
              <Input
                type="number"
                placeholder={`Credits (${session.gtw_min_bet}-${session.gtw_max_bet})`}
                value={betAmount}
                onChange={e => setBetAmount(e.target.value)}
                min={session.gtw_min_bet}
                max={session.gtw_max_bet}
              />
              <Button onClick={handlePlaceBet} disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Placer GTW Bet
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

      {userBet && (
        <Badge variant="outline" className="w-full justify-center py-2">
          ✅ Du har allerede placeret dit GTW bet
        </Badge>
      )}

      {/* Leaderboard */}
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-2">Leaderboard ({bets.length} deltagere)</h4>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {rankedBets.slice(0, 20).map((bet, i) => (
              <div key={bet.id} className={`flex justify-between text-sm py-1 ${bet.user_id === userId ? 'text-primary font-semibold' : ''}`}>
                <span className="text-muted-foreground">{bet.rank || i + 1}.</span>
                <span>{Number(bet.guess_amount).toLocaleString('da-DK')} kr</span>
                <span className="text-xs">
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
