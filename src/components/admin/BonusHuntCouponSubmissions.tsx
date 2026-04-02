import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Check, X, Clock, Crown, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CouponMarket } from "@/components/bonus-hunt/slotCouponMarkets";

interface Props {
  session: any;
}

interface CouponSubmission {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  answers: Record<string, boolean | null>;
  correctCount: number;
  wrongCount: number;
  pendingCount: number;
  totalAnswered: number;
  /** Combined odds of all "yes" answers that were correct */
  combinedOdds: number;
  /** Combined odds if ALL answers go their way */
  potentialCombinedOdds: number;
  isAllCorrect: boolean;
}

export function BonusHuntCouponSubmissions({ session }: Props) {
  const huntNumber = session.hunt_number;
  const couponResults = session.coupon_results as Record<string, boolean | null> | null;
  const markets: CouponMarket[] = Array.isArray(session.coupon_markets) ? session.coupon_markets : [];
  const enabledMarkets = markets.filter((m: any) => m.enabled !== false);
  const marketCount = enabledMarkets.length;

  const { data: submissions = [], isLoading } = useQuery({
    queryKey: ['admin-coupon-submissions', huntNumber],
    queryFn: async () => {
      const { data: coupons, error } = await supabase
        .from('bonus_hunt_slot_coupons')
        .select('user_id, answers')
        .eq('hunt_number', huntNumber);

      if (error || !coupons?.length) return [];

      const userIds = coupons.map(c => c.user_id);
      const { data: profiles } = await supabase
        .from('profiles_leaderboard')
        .select('user_id, display_name, avatar_url')
        .in('user_id', userIds);

      const profileMap = new Map(
        (profiles || []).map(p => [p.user_id, p])
      );

      const result: CouponSubmission[] = coupons.map(coupon => {
        const profile = profileMap.get(coupon.user_id);
        const answers = (coupon.answers || {}) as Record<string, boolean | null>;

        let correctCount = 0;
        let wrongCount = 0;
        let pendingCount = 0;
        let totalAnswered = 0;
        let combinedOdds = 1;
        let potentialCombinedOdds = 1;

        for (let i = 0; i < marketCount; i++) {
          const userAnswer = answers[String(i)];
          if (userAnswer === null || userAnswer === undefined) continue;
          totalAnswered++;

          const market = enabledMarkets[i];
          const selectedOdds = userAnswer ? market.oddsYes : market.oddsNo;
          potentialCombinedOdds *= selectedOdds;

          if (!couponResults) {
            pendingCount++;
            continue;
          }

          const actualResult = couponResults[String(i)];
          if (actualResult === null || actualResult === undefined) {
            pendingCount++;
          } else if (userAnswer === actualResult) {
            correctCount++;
            combinedOdds *= selectedOdds;
          } else {
            wrongCount++;
          }
        }

        return {
          userId: coupon.user_id,
          displayName: profile?.display_name || 'Anonym',
          avatarUrl: profile?.avatar_url || null,
          answers,
          correctCount,
          wrongCount,
          pendingCount,
          totalAnswered,
          combinedOdds: Math.round(combinedOdds * 100) / 100,
          potentialCombinedOdds: Math.round(potentialCombinedOdds * 100) / 100,
          isAllCorrect: correctCount === marketCount && wrongCount === 0 && pendingCount === 0,
        };
      });

      // Sort: all correct first (by combined odds desc), then by most correct, then fewest wrong
      result.sort((a, b) => {
        // All correct first
        if (a.isAllCorrect && !b.isAllCorrect) return -1;
        if (!a.isAllCorrect && b.isAllCorrect) return 1;
        if (a.isAllCorrect && b.isAllCorrect) return b.combinedOdds - a.combinedOdds;
        // Then most correct
        if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
        // Then fewest wrong
        if (a.wrongCount !== b.wrongCount) return a.wrongCount - b.wrongCount;
        // Tiebreaker: highest combined odds
        return b.combinedOdds - a.combinedOdds;
      });

      return result;
    },
    staleTime: 15_000,
    refetchInterval: 30_000,
    refetchIntervalInBackground: false,
  });

  const hasResults = couponResults && Object.values(couponResults).some(v => v !== null && v !== undefined);
  const allResolved = couponResults && Object.keys(couponResults).length >= marketCount &&
    Object.values(couponResults).every(v => v !== null && v !== undefined);

  // Determine winner
  const winner = allResolved && submissions.length > 0 ? submissions[0] : null;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-6 text-center text-muted-foreground text-sm">
          Henter kuponer...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Indsendte Kuponer ({submissions.length})
          </CardTitle>
          {winner && (
            <Badge className="bg-amber-500/20 text-amber-400 gap-1">
              <Crown className="h-3 w-3" />
              Vinder: {winner.displayName}
            </Badge>
          )}
        </div>
        {allResolved && (
          <p className="text-xs text-muted-foreground mt-1">
            {winner?.isAllCorrect
              ? `Vinderen har alle ${marketCount} rigtige med samlet odds ${winner.combinedOdds}x`
              : winner
                ? `Ingen havde alle rigtige. Vinderen har ${winner.correctCount}/${marketCount} rigtige (odds: ${winner.combinedOdds}x)`
                : 'Ingen kuponer indsendt'}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {submissions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Ingen har indsendt en kupon endnu
          </p>
        ) : (
          <div className="rounded-lg border border-border/50 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 px-3 py-2 bg-muted/30 border-b border-border/30 text-[10px] font-semibold text-muted-foreground uppercase">
              <span className="w-6">#</span>
              <span>Spiller</span>
              <span className="text-right min-w-[60px]">Score</span>
              <span className="text-right min-w-[70px]">Samlet Odds</span>
              <span className="text-right min-w-[50px]">Status</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border/20 max-h-[400px] overflow-y-auto scrollbar-thin">
              {submissions.map((s, idx) => {
                const isWinner = allResolved && idx === 0;
                return (
                  <div
                    key={s.userId}
                    className={cn(
                      "grid grid-cols-[auto_1fr_auto_auto_auto] gap-2 px-3 py-2.5 items-center text-xs",
                      isWinner && "bg-amber-500/[0.06]"
                    )}
                  >
                    {/* Rank */}
                    <span className={cn(
                      "w-6 text-center font-bold text-[10px]",
                      isWinner ? "text-amber-400" : "text-muted-foreground"
                    )}>
                      {isWinner ? <Crown className="h-3.5 w-3.5 text-amber-400" /> : idx + 1}
                    </span>

                    {/* Player */}
                    <div className="flex items-center gap-2 min-w-0">
                      <Avatar className="h-6 w-6 shrink-0">
                        <AvatarImage src={s.avatarUrl || undefined} alt={s.displayName} />
                        <AvatarFallback className="text-[9px] bg-muted">
                          {s.displayName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-foreground truncate">{s.displayName}</span>
                    </div>

                    {/* Score */}
                    <div className="flex items-center gap-1.5 justify-end min-w-[60px]">
                      {hasResults ? (
                        <>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-green-500">
                            <Check className="h-3 w-3" />
                            {s.correctCount}
                          </span>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-red-400">
                            <X className="h-3 w-3" />
                            {s.wrongCount}
                          </span>
                          {s.pendingCount > 0 && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {s.pendingCount}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[10px] text-muted-foreground tabular-nums">
                          {s.totalAnswered}/{marketCount}
                        </span>
                      )}
                    </div>

                    {/* Combined Odds */}
                    <div className="text-right min-w-[70px]">
                      <span className={cn(
                        "text-[10px] font-semibold tabular-nums",
                        s.isAllCorrect ? "text-amber-400" : "text-muted-foreground"
                      )}>
                        {hasResults ? `${s.combinedOdds}x` : `${s.potentialCombinedOdds}x`}
                      </span>
                      {!hasResults && (
                        <span className="text-[9px] text-muted-foreground ml-0.5">(pot.)</span>
                      )}
                    </div>

                    {/* Status */}
                    <div className="text-right min-w-[50px]">
                      {s.isAllCorrect ? (
                        <Badge className="bg-green-500/20 text-green-400 text-[9px] px-1.5 py-0">
                          Perfekt
                        </Badge>
                      ) : allResolved ? (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-muted-foreground">
                          {s.correctCount}/{marketCount}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-muted-foreground">
                          Afventer
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Answer details - expandable per user */}
        {hasResults && submissions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground">Markeder & Svar</h4>
            <div className="rounded-lg border border-border/50 overflow-x-auto">
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="bg-muted/30 border-b border-border/30">
                    <th className="text-left px-2 py-1.5 font-semibold text-muted-foreground sticky left-0 bg-muted/30">Spiller</th>
                    {enabledMarkets.map((m, i) => (
                      <th key={i} className="px-1.5 py-1.5 font-semibold text-muted-foreground text-center min-w-[28px]" title={m.q}>
                        M{i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {submissions.slice(0, 20).map((s) => (
                    <tr key={s.userId}>
                      <td className="px-2 py-1.5 font-medium text-foreground truncate max-w-[100px] sticky left-0 bg-background">
                        {s.displayName}
                      </td>
                      {enabledMarkets.map((_, i) => {
                        const userAnswer = s.answers[String(i)];
                        const result = couponResults?.[String(i)];
                        const isCorrect = result !== null && result !== undefined && userAnswer === result;
                        const isWrong = result !== null && result !== undefined && userAnswer !== result && userAnswer !== null && userAnswer !== undefined;

                        return (
                          <td key={i} className="px-1.5 py-1.5 text-center">
                            {userAnswer === null || userAnswer === undefined ? (
                              <span className="text-muted-foreground">-</span>
                            ) : isCorrect ? (
                              <Check className="h-3 w-3 text-green-500 mx-auto" />
                            ) : isWrong ? (
                              <X className="h-3 w-3 text-red-400 mx-auto" />
                            ) : (
                              <Clock className="h-3 w-3 text-muted-foreground mx-auto" />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
