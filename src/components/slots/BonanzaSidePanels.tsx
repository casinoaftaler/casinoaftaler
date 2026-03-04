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
    <div className="flex flex-col shrink-0" style={{ width: 150, gap: 16, marginLeft: 8 }}>
      {/* ── Buy Feature ── */}
      <button
        onClick={onBuyBonus}
        disabled={disabled || isBonusActive}
        className={cn(
          "relative transition-all duration-150 cursor-pointer select-none",
          "hover:-translate-y-0.5 active:translate-y-0.5",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:translate-y-0",
        )}
        style={{
          borderRadius: 18,
          padding: 14,
          background: "linear-gradient(180deg, #ff5aa6, #e72b6f)",
          border: "3px solid rgba(255,255,255,0.35)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.3)",
            "inset 0 -3px 0 rgba(0,0,0,0.25)",
            "0 6px 0 rgba(0,0,0,0.25)",
            "0 14px 24px rgba(0,0,0,0.35)",
          ].join(", "),
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 2px rgba(0,0,0,0.45)",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Buy Feature
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <CreditCoin size="lg" />
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
              textShadow: "0 2px 6px rgba(0,0,0,0.5)",
              WebkitTextStroke: "0.5px rgba(0,0,0,0.15)",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
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
          "relative transition-all duration-150 cursor-pointer select-none",
          "hover:-translate-y-0.5 active:translate-y-0.5",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:translate-y-0",
        )}
        style={{
          borderRadius: 18,
          padding: "14px 14px 12px",
          background: doubleChance
            ? "linear-gradient(180deg, #3ec96a, #1f9e4d)"
            : "linear-gradient(180deg, #ffb300, #ff8c00)",
          border: "3px solid rgba(255,255,255,0.35)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.28)",
            "inset 0 -3px 0 rgba(0,0,0,0.25)",
            doubleChance
              ? "0 8px 0 rgba(15,100,40,0.5)"
              : "0 8px 0 rgba(0,0,0,0.25)",
            "0 18px 28px rgba(0,0,0,0.35)",
          ].join(", "),
        }}
      >
        {/* BET label */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.92)",
            textShadow: "0 1px 2px rgba(0,0,0,0.45)",
            textAlign: "center",
            marginBottom: 2,
          }}
        >
          Bet
        </div>

        {/* Bet value */}
        <div className="flex items-center justify-center gap-1.5" style={{ marginBottom: 10 }}>
          <CreditCoin size="lg" />
          <span
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              textShadow: "0 2px 6px rgba(0,0,0,0.5)",
              WebkitTextStroke: "0.5px rgba(0,0,0,0.15)",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {displayBet}
          </span>
        </div>

        {/* Double Chance label */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.03em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.9)",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 10,
          }}
        >
          Double
          <br />
          Chance
          <br />
          to Win Feature
        </div>

        {/* Toggle row */}
        <div className="flex items-center justify-center gap-2.5">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: doubleChance
                ? "linear-gradient(180deg, #3fd36a, #23a84f)"
                : "linear-gradient(180deg, #888, #555)",
              border: "2px solid rgba(255,255,255,0.3)",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,0.22)",
                "inset 0 -2px 0 rgba(0,0,0,0.22)",
                doubleChance ? "0 3px 0 rgba(15,80,30,0.5)" : "0 3px 0 rgba(0,0,0,0.3)",
              ].join(", "),
            }}
          >
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#fff" strokeWidth={3}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#fff",
              textTransform: "uppercase",
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {doubleChance ? "On" : "Off"}
          </span>
        </div>
      </button>
    </div>
  );
}
