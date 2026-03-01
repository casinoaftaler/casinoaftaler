import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Lock, Ticket, Flame, Shield, Zap, TrendingUp, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlotCouponReceipt } from "./SlotCouponReceipt";
import { SlotCouponLeaderboard } from "./SlotCouponLeaderboard";
import { DEFAULT_MARKETS, type CouponMarket } from "./slotCouponMarkets";
import { resolveCouponMarkets } from "./slotCouponResolver";
import type { BonusHuntSlot } from "@/hooks/useBonusHuntData";
import "@/styles/slot-coupon.css";

interface MarketWithEnabled extends CouponMarket {
  enabled?: boolean;
}

interface Props {
  huntNumber: number;
  sessionId?: string;
  isLive?: boolean;
  isArchived?: boolean;
  huntSlots?: BonusHuntSlot[];
  totalSlots?: number;
  sessionMarkets?: MarketWithEnabled[] | null;
  couponOpen?: boolean;
}

export function BonusHuntSlotCoupon({ huntNumber, sessionId, isLive, isArchived, huntSlots, totalSlots, sessionMarkets, couponOpen }: Props) {
  const { user } = useAuth();

  const MARKETS = useMemo(() => {
    if (Array.isArray(sessionMarkets) && sessionMarkets.length > 0) {
      return sessionMarkets.filter((m) => m.enabled !== false);
    }
    return DEFAULT_MARKETS;
  }, [sessionMarkets]);

  const couponResults = useMemo(() => {
    if (!huntSlots || !totalSlots) return null;
    return resolveCouponMarkets(MARKETS, huntSlots, totalSlots);
  }, [MARKETS, huntSlots, totalSlots]);

  const [answers, setAnswers] = useState<Record<number, boolean | null>>(
    () => Object.fromEntries(MARKETS.map((_, i) => [i, null]))
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPostSubmit, setShowPostSubmit] = useState(false);
  const [lastChanged, setLastChanged] = useState<number | null>(null);

  useEffect(() => {
    if (!submitted) return;
    setShowPostSubmit(true);
    const timer = setTimeout(() => setShowPostSubmit(false), 10000);
    return () => clearTimeout(timer);
  }, [submitted]);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null).length,
    [answers]
  );
  const isComplete = answeredCount === MARKETS.length;

  const combinedMultiplier = useMemo(() => {
    let product = 1;
    let count = 0;
    Object.entries(answers).forEach(([idx, val]) => {
      if (val === null) return;
      const m = MARKETS[Number(idx)];
      product *= val ? m.oddsYes : m.oddsNo;
      count++;
    });
    return count > 0 ? product : null;
  }, [answers]);

  const riskProfile = useMemo(() => {
    const yesAggressive = Object.entries(answers).filter(
      ([idx, v]) => v === true && MARKETS[Number(idx)].aggressive
    ).length;
    const answered = Object.values(answers).filter((v) => v !== null).length;
    if (answered < 3) return null;
    if (yesAggressive >= 6) return { label: "High Roller", icon: Flame, type: "aggressive" as const };
    if (yesAggressive <= 2) return { label: "Sikker", icon: Shield, type: "defensive" as const };
    return { label: "Balanceret", icon: Zap, type: "balanced" as const };
  }, [answers]);

  const isCouponLocked = couponOpen === false || isArchived;

  const handleSelect = (index: number, value: boolean) => {
    if (submitted || isCouponLocked) return;
    setAnswers((prev) => ({ ...prev, [index]: value }));
    setLastChanged(index);
    setTimeout(() => setLastChanged(null), 400);
  };

  const handleSubmit = async () => {
    if (!user || !isComplete || submitted || isCouponLocked) return;
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("bonus_hunt_slot_coupons")
        .upsert(
          { user_id: user.id, hunt_number: huntNumber, session_id: sessionId || null, answers: answers as Record<string, boolean | null> },
          { onConflict: "user_id,hunt_number" }
        );
      if (error) throw error;
      setSubmitted(true);
      toast.success("Din Slot Kupon er registreret! 🎰");
    } catch {
      toast.error("Kunne ikke gemme kuponen. Prøv igen.");
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = (answeredCount / MARKETS.length) * 100;

  const resolvedCount = couponResults
    ? Object.values(couponResults).filter((v) => v !== null).length
    : 0;

  return (
    <>
    <div className="relative rounded-xl slot-coupon-bg overflow-hidden flex flex-col">
      {/* Watermark */}
      <div className="slot-coupon-watermark" aria-hidden="true">
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
      </div>

      {/* Header */}
      <div className="slot-coupon-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5" style={{ color: 'hsl(220 20% 20%)' }} />
            <span className="font-black text-base tracking-tight" style={{ color: 'hsl(220 20% 12%)' }}>
              Slot Kupon
            </span>
            <span className="text-[9px] font-semibold opacity-50">®</span>
          </div>
          <div className={cn(
            "flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full",
            isLive
              ? "border border-green-600/30"
              : "border border-gray-400/30"
          )} style={{
            background: isLive ? 'hsl(142 50% 40% / 0.12)' : 'hsl(30 10% 82%)',
            color: isLive ? 'hsl(142 60% 28%)' : 'hsl(220 10% 40%)'
          }}>
            {isLive ? (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="slot-coupon-live-dot absolute inset-0 rounded-full" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                </span>
                Hunt #{huntNumber}
              </>
            ) : isArchived ? (
              <>Hunt #{huntNumber}</>
            ) : (
              <>Hunt #{huntNumber}</>
            )}
          </div>
        </div>
        <p className="text-[9px] mt-0.5 tracking-wide" style={{ color: 'hsl(220 15% 45%)' }}>
          Udbydes af Casinoaftaler.dk
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-[1] px-4 pt-2">
        <div className="slot-coupon-progress-track">
          <div
            className="slot-coupon-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Markets – scrollable */}
      <div className="relative z-[1] overflow-y-auto max-h-[420px] scrollbar-thin">
        {MARKETS.map((market, i) => {
          const selected = answers[i];
          const justChanged = lastChanged === i;
          const result = couponResults?.[i] ?? null;
          return (
            <div
              key={i}
              className={cn(
                "slot-coupon-market-row px-4 py-3 transition-all duration-200",
                justChanged && "animate-in fade-in duration-300",
                result === true && "!bg-green-500/[0.08]",
                result === false && "!bg-red-500/[0.08]"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="slot-coupon-question text-[11px] font-semibold leading-snug">
                  {market.q}
                </p>
                {result !== null && (
                  <span className={cn(
                    "ml-2 shrink-0 flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                    result ? "slot-coupon-result-hit" : "slot-coupon-result-miss"
                  )}>
                    {result ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
                    {result ? "RAMT" : "MISS"}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {/* JA */}
                <button
                  type="button"
                  disabled={submitted || isArchived}
                  aria-label={`Ja til: ${market.q}`}
                  aria-pressed={selected === true}
                  onClick={() => handleSelect(i, true)}
                  className={cn(
                    "slot-coupon-select-pop relative flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold",
                    "slot-coupon-btn-ja",
                    selected === true && "slot-coupon-btn-ja-active",
                    selected === false && "opacity-50",
                    (submitted || isArchived) && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {selected === true && <Check className="h-3 w-3" />}
                    JA
                  </span>
                  <span className="slot-coupon-odds-text text-[10px] font-mono">{market.oddsYes.toFixed(2)}</span>
                </button>
                {/* NEJ */}
                <button
                  type="button"
                  disabled={submitted || isArchived}
                  aria-label={`Nej til: ${market.q}`}
                  aria-pressed={selected === false}
                  onClick={() => handleSelect(i, false)}
                  className={cn(
                    "slot-coupon-select-pop relative flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold",
                    "slot-coupon-btn-nej",
                    selected === false && "slot-coupon-btn-nej-active",
                    selected === true && "opacity-50",
                    (submitted || isArchived) && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {selected === false && <Check className="h-3 w-3" />}
                    NEJ
                  </span>
                  <span className="slot-coupon-odds-text text-[10px] font-mono">{market.oddsNo.toFixed(2)}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="slot-coupon-footer space-y-3 sticky bottom-0">
        {/* Combined multiplier */}
        {combinedMultiplier !== null && (
          <div className="slot-coupon-multiplier-box flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'hsl(220 15% 40%)' }}>
              <TrendingUp className="h-3.5 w-3.5" style={{ color: 'hsl(15 60% 50%)' }} />
              Samlet odds
            </div>
            <span className={cn(
              "text-base font-black tabular-nums font-mono",
              combinedMultiplier > 100 ? "text-orange-700" : combinedMultiplier > 20 ? "text-amber-700" : ""
            )} style={{ color: combinedMultiplier <= 20 ? 'hsl(220 20% 15%)' : undefined }}>
              {combinedMultiplier.toFixed(2)}
            </span>
          </div>
        )}

        {/* Live resolution progress */}
        {couponResults && resolvedCount > 0 && (
          <div className="slot-coupon-info-bar flex items-center justify-between text-[10px] font-medium">
            <span>Live resultater</span>
            <span className="font-bold tabular-nums">{resolvedCount}/{MARKETS.length} afgjort</span>
          </div>
        )}

        {/* Risk + count row */}
        <div className="flex items-center justify-between">
          {riskProfile ? (
            <span className={cn(
              "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full",
              riskProfile.type === "aggressive" && "slot-coupon-result-miss",
              riskProfile.type === "defensive" && "slot-coupon-result-hit",
              riskProfile.type === "balanced" && "slot-coupon-info-bar",
            )} style={{ padding: '2px 8px' }}>
              <riskProfile.icon className="h-3 w-3" />
              {riskProfile.label}
            </span>
          ) : <span />}
          <span className="text-xs font-bold tabular-nums" style={{ color: 'hsl(220 20% 15%)' }}>
            {answeredCount}/{MARKETS.length} markeder
          </span>
        </div>

        {/* Status */}
        {isArchived ? (
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium slot-coupon-status-text">
            <span className="h-2 w-2 rounded-full" style={{ background: 'hsl(220 10% 60%)' }} />
            <span>Bonus hunt afsluttet</span>
          </div>
        ) : (!submitted || showPostSubmit) ? (
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium">
            <span className={cn(
              "h-2 w-2 rounded-full transition-colors",
              submitted ? "bg-green-500" : isComplete ? "bg-amber-500 animate-pulse" : "bg-amber-400"
            )} />
            <span style={{
              color: submitted ? 'hsl(142 60% 30%)' : isComplete ? 'hsl(15 60% 45%)' : 'hsl(30 60% 40%)'
            }}>
              {submitted ? "Kupon registreret ✓" : isComplete ? "Kupon klar – Deltag nu!" : "Afventer valg"}
            </span>
          </div>
        ) : null}

        {/* CTA */}
        {isArchived ? (
          <div className="space-y-2">
            <div className="slot-coupon-info-bar flex items-center justify-center gap-2 text-xs font-semibold">
              <Lock className="h-3.5 w-3.5" />
              Bonus hunt afsluttet – kuponer låst
            </div>
          </div>
        ) : submitted ? (
          <div className="space-y-2">
            {showPostSubmit && (
              <div className="slot-coupon-confirmed-bar flex items-center justify-center gap-2 text-xs font-semibold">
                <Check className="h-3.5 w-3.5" />
                Din kupon er registreret
              </div>
            )}
            <button
              className="slot-coupon-info-bar w-full flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowReceipt((v) => !v)}
            >
              <Eye className="h-3.5 w-3.5" />
              {showReceipt ? "Skjul Slot Kupon" : "Se Slot Kupon"}
            </button>
          </div>
        ) : user ? (
          !showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!isComplete}
              className="slot-coupon-cta w-full rounded-lg py-3 text-sm slot-coupon-select-pop"
            >
              {isComplete ? "🎰 Placer dit bet" : `Vælg alle ${MARKETS.length} markeder`}
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-center text-xs" style={{ color: 'hsl(220 15% 40%)' }}>
                Er du sikker? Du kan ikke trække din kupon tilbage.
              </p>
              <div className="flex gap-2">
                <button
                  className="slot-coupon-info-bar flex-1 text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity text-center"
                  onClick={() => setShowConfirm(false)}
                >
                  Annuller
                </button>
                <button
                  className="slot-coupon-cta flex-1 rounded-lg py-2.5 text-xs"
                  disabled={submitting}
                  onClick={handleSubmit}
                >
                  {submitting ? "Gemmer..." : "Bekræft"}
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="slot-coupon-info-bar flex items-center justify-center gap-2 text-xs">
            <Lock className="h-3.5 w-3.5" />
            Log ind for at deltage
          </div>
        )}

        {/* Participant leaderboard */}
        <SlotCouponLeaderboard huntNumber={huntNumber} couponResults={couponResults} markets={MARKETS} />
      </div>

      {/* Perforated tear edge */}
      <div className="slot-coupon-tear" aria-hidden="true" />
    </div>

      {/* Receipt modal overlay */}
      {submitted && showReceipt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShowReceipt(false)}
        >
          <div
            className="relative max-w-sm w-full animate-in zoom-in-95 fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowReceipt(false)}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-card border border-border p-1.5 hover:bg-muted transition-colors"
              aria-label="Luk"
            >
              <X className="h-4 w-4" />
            </button>
            <SlotCouponReceipt
              huntNumber={huntNumber}
              answers={answers}
              results={couponResults ?? undefined}
              isLive={isLive}
              markets={MARKETS}
            />
          </div>
        </div>
      )}
    </>
  );
}
