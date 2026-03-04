import { CreditCoin } from "@/components/CreditCoin";
import { cn } from "@/lib/utils";

interface BonanzaSidePanelsProps {
  bet: number;
  doubleChance: boolean;
  onDoubleChanceToggle: () => void;
  onBuyBonus: () => void;
  disabled?: boolean;
  isBonusActive?: boolean;
}

export function BonanzaSidePanels({
  bet,
  doubleChance,
  onDoubleChanceToggle,
  onBuyBonus,
  disabled,
  isBonusActive,
}: BonanzaSidePanelsProps) {
  const buyBonusCost = bet * 100;
  const displayBet = doubleChance ? bet * 2 : bet;

  return (
    <div className="flex flex-col gap-3 w-[140px] shrink-0">
      {/* Buy Feature / Køb Bonus */}
      <button
        onClick={onBuyBonus}
        disabled={disabled || isBonusActive}
        className={cn(
          "rounded-xl overflow-hidden transition-all duration-200",
          "bg-gradient-to-b from-pink-400 via-pink-500 to-pink-600",
          "border-2 border-pink-300/60",
          "shadow-[0_4px_16px_rgba(236,72,153,0.4)]",
          "hover:shadow-[0_6px_24px_rgba(236,72,153,0.6)] hover:scale-[1.03]",
          "active:scale-95",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none",
          "p-3 text-center"
        )}
      >
        <div
          className="text-[10px] uppercase tracking-wider font-bold text-white/90 mb-0.5"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        >
          Køb Bonus
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <CreditCoin size="lg" />
          <span
            className="text-2xl font-black text-white tabular-nums"
            style={{
              textShadow: "0 2px 6px rgba(0,0,0,0.5), 0 0 12px rgba(255,255,255,0.3)",
              WebkitTextStroke: "1px rgba(0,0,0,0.3)",
            }}
          >
            {buyBonusCost}
          </span>
        </div>
      </button>

      {/* Bet / Double Chance */}
      <button
        onClick={onDoubleChanceToggle}
        disabled={disabled || isBonusActive}
        className={cn(
          "rounded-xl overflow-hidden transition-all duration-200",
          "border-2",
          doubleChance
            ? "bg-gradient-to-b from-green-400 via-green-500 to-green-600 border-green-300/60 shadow-[0_4px_16px_rgba(34,197,94,0.4)]"
            : "bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-amber-300/60 shadow-[0_4px_16px_rgba(245,158,11,0.3)]",
          "hover:scale-[1.03]",
          "active:scale-95",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
          "p-3 text-center"
        )}
      >
        <div
          className="text-xs uppercase tracking-wider font-black text-white mb-0.5"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        >
          Bet
        </div>
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <CreditCoin size="lg" />
          <span
            className="text-2xl font-black text-white tabular-nums"
            style={{
              textShadow: "0 2px 6px rgba(0,0,0,0.5), 0 0 12px rgba(255,255,255,0.3)",
              WebkitTextStroke: "1px rgba(0,0,0,0.3)",
            }}
          >
            {displayBet}
          </span>
        </div>
        <div
          className="text-[9px] uppercase tracking-wide font-bold text-white/80 leading-tight mb-1.5"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
        >
          Double Chance
          <br />
          to Win Feature
        </div>
        <div className="flex items-center justify-center gap-2">
          <div
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-white",
              "bg-gradient-to-b",
              doubleChance
                ? "from-blue-400 to-blue-600 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                : "from-gray-400 to-gray-600"
            )}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            className="text-sm font-black text-white uppercase"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
          >
            {doubleChance ? "On" : "Off"}
          </span>
        </div>
      </button>
    </div>
  );
}
