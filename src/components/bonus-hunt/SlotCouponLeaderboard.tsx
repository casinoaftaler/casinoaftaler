import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Check, X } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SlotCouponReceipt } from "./SlotCouponReceipt";
import type { CouponMarket } from "./slotCouponMarkets";

const MARKET_COUNT = 10;

interface CouponParticipant {
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  answers: Record<string, boolean | null>;
  correctCount: number;
  wrongCount: number;
  pendingCount: number;
  totalAnswered: number;
}

interface Props {
  huntNumber: number;
  couponResults?: Record<string, boolean | null> | null;
  markets?: CouponMarket[];
}

export function SlotCouponLeaderboard({ huntNumber, couponResults, markets }: Props) {
  const [selectedParticipant, setSelectedParticipant] = useState<CouponParticipant | null>(null);

  const { data: participants = [], isLoading } = useQuery({
    queryKey: ['slot-coupon-participants', huntNumber],
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

      const result: CouponParticipant[] = coupons.map(coupon => {
        const profile = profileMap.get(coupon.user_id);
        const answers = (coupon.answers || {}) as Record<string, boolean | null>;
        
        let correctCount = 0;
        let wrongCount = 0;
        let pendingCount = 0;
        let totalAnswered = 0;

        for (let i = 0; i < MARKET_COUNT; i++) {
          const userAnswer = answers[String(i)];
          if (userAnswer === null || userAnswer === undefined) continue;
          totalAnswered++;

          if (!couponResults) {
            pendingCount++;
            continue;
          }

          const actualResult = couponResults[String(i)];
          if (actualResult === null || actualResult === undefined) {
            pendingCount++;
          } else if (userAnswer === actualResult) {
            correctCount++;
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
        };
      });

      result.sort((a, b) => {
        if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
        return a.wrongCount - b.wrongCount;
      });

      return result;
    },
    staleTime: 30_000,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6 text-muted-foreground text-xs">
        Henter deltagere...
      </div>
    );
  }

  if (!participants.length) {
    return (
      <div className="flex flex-col items-center justify-center py-6 gap-2 text-muted-foreground">
        <MenuIcon iconName="users" className="h-5 w-5 opacity-50" />
        <p className="text-xs">Ingen har indsendt en kupon endnu</p>
      </div>
    );
  }

  const hasResults = couponResults && Object.values(couponResults).some(v => v !== null && v !== undefined);

  // Convert participant answers from string-keyed to number-keyed for the receipt
  const toReceiptAnswers = (answers: Record<string, boolean | null>): Record<number, boolean | null> => {
    const result: Record<number, boolean | null> = {};
    for (let i = 0; i < MARKET_COUNT; i++) {
      result[i] = answers[String(i)] ?? null;
    }
    return result;
  };

  const toReceiptResults = (results: Record<string, boolean | null> | null | undefined): Record<number, boolean | null> | undefined => {
    if (!results) return undefined;
    const r: Record<number, boolean | null> = {};
    for (let i = 0; i < MARKET_COUNT; i++) {
      r[i] = results[String(i)] ?? null;
    }
    return r;
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <MenuIcon iconName="trophy" className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            Kupon Deltagere ({participants.length})
          </span>
        </div>

        <div className="rounded-lg border border-border/50 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_auto] gap-2 px-3 py-2 bg-muted/30 border-b border-border/30">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Spiller</span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase text-right min-w-[80px]">
              {hasResults ? 'Score' : 'Markeder'}
            </span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-border/20 max-h-[300px] overflow-y-auto scrollbar-thin">
            {participants.map((p, idx) => (
              <button
                key={p.userId}
                type="button"
                onClick={() => setSelectedParticipant(p)}
                className={cn(
                  "w-full grid grid-cols-[1fr_auto] gap-2 px-3 py-2.5 items-center transition-colors hover:bg-muted/30 text-left cursor-pointer",
                  idx === 0 && hasResults && p.correctCount > 0 && "bg-primary/[0.04]"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Rank */}
                  <span className={cn(
                    "text-[10px] font-bold tabular-nums w-4 text-center shrink-0",
                    idx === 0 && hasResults && p.correctCount > 0 ? "text-amber-400" : "text-muted-foreground"
                  )}>
                    {idx === 0 && hasResults && p.correctCount > 0 ? (
                      <MenuIcon iconName="crown" className="h-3.5 w-3.5 text-amber-400" />
                    ) : (
                      idx + 1
                    )}
                  </span>

                  <Avatar className="h-6 w-6 shrink-0">
                    <AvatarImage src={p.avatarUrl || undefined} alt={p.displayName} />
                    <AvatarFallback className="text-[9px] bg-muted">
                      {p.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-xs font-medium text-foreground truncate">
                    {p.displayName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 min-w-[80px] justify-end">
                  {hasResults ? (
                    <>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-green-500">
                        <Check className="h-3 w-3" />
                        {p.correctCount}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-red-400">
                        <X className="h-3 w-3" />
                        {p.wrongCount}
                      </span>
                      {p.pendingCount > 0 && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-muted-foreground">
                          <MenuIcon iconName="clock" className="h-3 w-3" />
                          {p.pendingCount}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-[10px] font-medium text-muted-foreground tabular-nums">
                      {p.totalAnswered}/{MARKET_COUNT}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Player coupon dialog */}
      <Dialog open={!!selectedParticipant} onOpenChange={(open) => !open && setSelectedParticipant(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-transparent border-none shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedParticipant?.displayName}s kupon</DialogTitle>
          </DialogHeader>
          {selectedParticipant && (
            <div className="relative">
              {/* Player name badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-background border border-border rounded-full px-3 py-1 shadow-lg">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={selectedParticipant.avatarUrl || undefined} />
                  <AvatarFallback className="text-[8px] bg-muted">
                    {selectedParticipant.displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold text-foreground">
                  {selectedParticipant.displayName}
                </span>
              </div>
              <SlotCouponReceipt
                huntNumber={huntNumber}
                answers={toReceiptAnswers(selectedParticipant.answers)}
                results={toReceiptResults(couponResults)}
                markets={markets}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
