import { CreditCoin } from "@/components/CreditCoin";
import { cn } from "@/lib/utils";

interface BonanzaSidePanelsProps {
  bet: number;
  doubleChance: boolean;
  onDoubleChanceToggle: () => void;
  onBuyBonus: () => void;
  disabled?: boolean;
  isBonusActive?: boolean;
  horizontal?: boolean;
}

export function BonanzaSidePanels({
  bet,
  doubleChance,
  onDoubleChanceToggle,
  onBuyBonus,
  disabled,
  isBonusActive,
  horizontal = false,
}: BonanzaSidePanelsProps) {
  const buyBonusCost = bet * 100;
  const displayBet = doubleChance ? bet * 2 : bet;

  return (
    <div className={cn(
      "flex shrink-0",
      horizontal
        ? "flex-row gap-3 w-full"
        : "flex-col gap-[14px] ml-2"
    )} style={horizontal ? undefined : { width: 160 }}>
      {/* ── Buy Feature ── */}
      <button
        onClick={onBuyBonus}
        disabled={disabled || isBonusActive}
        className={cn(
          "relative transition-all duration-[180ms] cursor-pointer select-none",
          "hover:-translate-y-[2px] active:translate-y-[2px]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:translate-y-0",
          horizontal && "flex-1",
        )}
        style={{
          borderRadius: 20,
          padding: "14px 16px 18px",
          background: "linear-gradient(180deg, #ff6db3 0%, #f0408a 40%, #d42568 100%)",
          border: "3px solid rgba(255,255,255,0.4)",
          boxShadow: [
            // inner top highlight
            "inset 0 2px 0 rgba(255,255,255,0.45)",
            // inner bottom darkening
            "inset 0 -4px 0 rgba(0,0,0,0.2)",
            // solid colored bottom edge (the "3D lip")
            "0 6px 0 #b01e55",
            // ambient shadow
            "0 10px 20px rgba(0,0,0,0.4)",
          ].join(", "),
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          Køb Bonus
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <CreditCoin size="lg" />
          <span
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.55), 0 0 20px rgba(255,255,255,0.15)",
              WebkitTextStroke: "1px rgba(0,0,0,0.1)",
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
          "relative transition-all duration-[180ms] cursor-pointer select-none",
          "hover:-translate-y-[2px] active:translate-y-[2px]",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:translate-y-0",
        )}
        style={{
          borderRadius: 20,
          padding: "14px 14px 14px",
          background: doubleChance
            ? "linear-gradient(180deg, #4cdc7a 0%, #2db85a 40%, #1a9744 100%)"
            : "linear-gradient(180deg, #ffc933 0%, #ffb300 35%, #f59400 70%, #e07800 100%)",
          border: "3px solid rgba(255,255,255,0.4)",
          boxShadow: [
            "inset 0 2px 0 rgba(255,255,255,0.45)",
            "inset 0 -4px 0 rgba(0,0,0,0.2)",
            doubleChance
              ? "0 7px 0 #147a34"
              : "0 7px 0 #b86500",
            "0 12px 24px rgba(0,0,0,0.4)",
          ].join(", "),
        }}
      >
        {/* BET label */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#fff",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          Bet
        </div>

        {/* Bet value */}
        <div className="flex items-center justify-center gap-1.5" style={{ marginBottom: 6 }}>
          <CreditCoin size="lg" />
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.55), 0 0 20px rgba(255,255,255,0.15)",
              WebkitTextStroke: "1px rgba(0,0,0,0.1)",
              lineHeight: 1.1,
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
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#fff",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            textAlign: "center",
            lineHeight: 1.25,
            marginBottom: 8,
          }}
        >
          Forøg chance
          <br />
          for scatterdrop
          <br />
          med x2
        </div>

        {/* Toggle row */}
        <div className="flex items-center justify-center gap-2">
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: doubleChance
                ? "linear-gradient(180deg, #4cdc7a, #1a9744)"
                : "linear-gradient(180deg, #50b86a, #28843e)",
              border: "3px solid rgba(255,255,255,0.35)",
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,0.3)",
                "inset 0 -2px 0 rgba(0,0,0,0.2)",
                doubleChance ? "0 3px 0 #0e6628" : "0 3px 0 #1a5e2a",
              ].join(", "),
            }}
          >
            <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#fff" strokeWidth={3.5}>
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 900,
              color: "#fff",
              textTransform: "uppercase",
              textShadow: "0 2px 4px rgba(0,0,0,0.55)",
            }}
          >
            {doubleChance ? "On" : "Off"}
          </span>
        </div>
      </button>
    </div>
  );
}
