import { useMemo } from "react";
import { Check, X, Clock, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_MARKETS, type CouponMarket } from "./slotCouponMarkets";
import "@/styles/slot-coupon-receipt.css";

interface Props {
  huntNumber: number;
  answers: Record<number, boolean | null>;
  /** Map of market index -> true (hit) / false (miss) / null (pending) */
  results?: Record<number, boolean | null>;
  isLive?: boolean;
  markets?: CouponMarket[];
}

export function SlotCouponReceipt({ huntNumber, answers, results, isLive, markets: marketsProp }: Props) {
  const MARKETS = marketsProp && marketsProp.length > 0 ? marketsProp : DEFAULT_MARKETS;
  const totalOdds = useMemo(() => {
    let product = 1;
    Object.entries(answers).forEach(([idx, val]) => {
      if (val === null) return;
      const m = MARKETS[Number(idx)];
      product *= val ? m.oddsYes : m.oddsNo;
    });
    return product;
  }, [answers]);

  const resolvedCount = results
    ? Object.values(results).filter((v) => v !== null).length
    : 0;

  const allResolved = resolvedCount === MARKETS.length;

  const allCorrect = results
    ? Object.entries(results).every(([, v]) => v === true || v === null) &&
      resolvedCount > 0
    : false;

  return (
    <div className="slot-receipt-container">
      {/* Watermark pattern */}
      <div className="slot-receipt-watermark" aria-hidden="true">
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
        <span>Casinoaftaler.dk</span>
      </div>

      {/* Header */}
      <div className="slot-receipt-header">
        <div className="flex items-center justify-center gap-2">
          <Ticket className="h-5 w-5" />
          <span className="text-xl font-black tracking-tight">Slot Kupon</span>
          <span className="text-[10px] font-semibold opacity-60">®</span>
        </div>
        <p className="text-[10px] opacity-70 mt-0.5 tracking-wide">
          Udbydes af Casinoaftaler.dk
        </p>
      </div>

      {/* Column headers */}
      <div className="slot-receipt-col-headers">
        <span className="flex-1 text-left">MARKED</span>
        <span className="w-20 text-center">RESULTAT</span>
        <span className="w-16 text-right">ODDS</span>
      </div>

      {/* Divider */}
      <div className="slot-receipt-divider" />

      {/* Market rows */}
      <div className="slot-receipt-rows">
        {MARKETS.map((market, i) => {
          const answer = answers[i];
          if (answer === null) return null;

          const odds = answer ? market.oddsYes : market.oddsNo;
          const choice = answer ? "JA" : "NEJ";
          const result = results?.[i] ?? null;

          return (
            <div
              key={i}
              className={cn(
                "slot-receipt-row",
                result === true && "slot-receipt-row-hit",
                result === false && "slot-receipt-row-miss"
              )}
            >
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold leading-tight truncate">
                  {market.q}
                </p>
                <p className="text-[9px] opacity-50 mt-0.5">Valg: {choice}</p>
              </div>
              <div className="w-20 flex justify-center">
                {result === true ? (
                  <span className="slot-receipt-badge-hit">
                    <Check className="h-3 w-3" />
                  </span>
                ) : result === false ? (
                  <span className="slot-receipt-badge-miss">
                    <X className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="slot-receipt-badge-pending">
                    <Clock className="h-3 w-3" />
                  </span>
                )}
              </div>
              <div className="w-16 text-right">
                <span className="text-[11px] font-bold font-mono tabular-nums">
                  {odds.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="slot-receipt-divider" />

      {/* Footer totals */}
      <div className="slot-receipt-footer">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold opacity-70">TOTAL ODDS:</span>
          <span className="text-sm font-black font-mono tabular-nums">
            {totalOdds.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-semibold opacity-70">HUNT:</span>
          <span className="text-[11px] font-bold">#{huntNumber}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] font-semibold opacity-70">STATUS:</span>
          <span
            className={cn(
              "text-[11px] font-bold",
              allResolved && allCorrect && "text-green-400",
              allResolved && !allCorrect && "text-red-400",
              !allResolved && "text-amber-400"
            )}
          >
            {allResolved
              ? allCorrect
                ? "✓ ALLE RIGTIGE"
                : "✗ TABT"
              : isLive
                ? `LIVE – ${resolvedCount}/${MARKETS.length}`
                : `AFVENTER – ${resolvedCount}/${MARKETS.length}`}
          </span>
        </div>
      </div>

      {/* Perforated edge */}
      <div className="slot-receipt-tear" aria-hidden="true" />
    </div>
  );
}
