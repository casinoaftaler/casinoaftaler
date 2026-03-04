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
    <div className="flex flex-col w-[150px] shrink-0" style={{ gap: 16 }}>
      {/* ── Buy Feature ── */}
      <button
        onClick={onBuyBonus}
        disabled={disabled || isBonusActive}
        className={cn(
          "relative transition-transform duration-150 cursor-pointer select-none",
          "hover:-translate-y-0.5 active:translate-y-0.5",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:translate-y-0",
        )}
        style={{
          borderRadius: 18,
          padding: "14px 16px",
          background: "linear-gradient(180deg, #ff6eb4, #ff3a82)",
          border: "3px solid rgba(255,255,255,0.45)",
          boxShadow: [
            "inset 0 2px 0 rgba(255,255,255,0.55)",
            "inset 0 -3px 0 rgba(0,0,0,0.2)",
            "0 6px 0 rgba(180,20,80,0.55)",
            "0 12px 28px rgba(0,0,0,0.35)",
            "0 0 22px rgba(255,60,140,0.4)",
          ].join(", "),
          animation: "softGlow 3s ease-in-out infinite",
        }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.12em] font-extrabold text-white/90 mb-1 text-center"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          Køb Bonus
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <CreditCoin size="lg" />
          <span
            className="text-[26px] font-black text-white tabular-nums leading-none"
            style={{
              textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 0 16px rgba(255,255,255,0.25)",
              WebkitTextStroke: "1px rgba(0,0,0,0.25)",
            }}
          >
            {buyBonusCost}
          </span>
        </div>
      </button>

      {/* ── Bet / Double Chance ── */}
      <button
        onClick={onDoubleChanceToggle}
        disabled={disabled || isBonusActive}
        className={cn(
          "relative transition-transform duration-150 cursor-pointer select-none",
          "hover:-translate-y-0.5 active:translate-y-0.5",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:translate-y-0",
        )}
        style={{
          borderRadius: 18,
          padding: "14px 16px 12px",
          background: doubleChance
            ? "linear-gradient(180deg, #44d66a, #28a745)"
            : "linear-gradient(180deg, #ffb800, #ff8c00)",
          border: "3px solid rgba(255,255,255,0.4)",
          boxShadow: [
            "inset 0 2px 0 rgba(255,255,255,0.5)",
            "inset 0 -3px 0 rgba(0,0,0,0.2)",
            doubleChance
              ? "0 7px 0 rgba(20,120,50,0.55)"
              : "0 7px 0 rgba(160,90,0,0.55)",
            "0 14px 28px rgba(0,0,0,0.35)",
          ].join(", "),
        }}
      >
        {/* BET label */}
        <div
          className="text-xs uppercase tracking-[0.14em] font-extrabold text-white text-center mb-0.5"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
        >
          Bet
        </div>

        {/* Bet value */}
        <div className="flex items-center justify-center gap-1.5 mb-1.5">
          <CreditCoin size="lg" />
          <span
            className="text-[28px] font-black text-white tabular-nums leading-none"
            style={{
              textShadow: "0 2px 8px rgba(0,0,0,0.5), 0 0 16px rgba(255,255,255,0.2)",
              WebkitTextStroke: "1px rgba(0,0,0,0.25)",
            }}
          >
            {displayBet}
          </span>
        </div>

        {/* Double Chance label */}
        <div
          className="text-[9px] uppercase tracking-wide font-bold text-white/85 leading-tight mb-2 text-center"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}
        >
          Double Chance
          <br />
          to Win Feature
        </div>

        {/* Toggle row */}
        <div className="flex items-center justify-center gap-2">
          <div
            className="flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: doubleChance
                ? "linear-gradient(180deg, #60b4ff, #2563eb)"
                : "linear-gradient(180deg, #aaa, #666)",
              border: "2px solid rgba(255,255,255,0.4)",
              boxShadow: doubleChance
                ? "0 0 10px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.4)"
                : "inset 0 1px 0 rgba(255,255,255,0.3)",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={3}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            className="text-sm font-black text-white uppercase"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
          >
            {doubleChance ? "On" : "Off"}
          </span>
        </div>
      </button>

      {/* Glow pulse keyframes */}
      <style>{`
        @keyframes softGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.08); }
        }
      `}</style>
    </div>
  );
}
