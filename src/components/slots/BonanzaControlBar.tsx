import { Minus, Plus, RotateCw, Zap, Square } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";
import { cn } from "@/lib/utils";
import { VolumeControl } from "./VolumeControl";
import { BonanzaPayTable } from "./BonanzaPayTable";
import { AutoSpinPopover } from "./AutoSpinPopover";
import { getSlotTheme } from "@/lib/slotTheme";

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface BonusState {
  isActive: boolean;
  freeSpinsRemaining: number;
}

interface BonanzaControlBarProps {
  bet: number;
  onBetChange: (bet: number) => void;
  onSpin: () => void;
  onAutoSpinToggle: () => void;
  isSpinning: boolean;
  canSpin: boolean;
  isAutoSpinning: boolean;
  autoSpinCount: AutoSpinCount;
  onAutoSpinCountChange: (count: AutoSpinCount) => void;
  autoSpinsRemaining: number | null;
  bonusState: BonusState;
  bonusLoaded?: boolean;
  disabled?: boolean;
  isSpinLocked?: boolean;
  minBet?: number;
  maxBet?: number;
  spinsRemaining: number;
  maxSpins: number;
  spinsLoading?: boolean;
  showBonusTrigger?: boolean;
  winAmount: number;
  gameId?: string;
  debugButton?: React.ReactNode;
}

export function BonanzaControlBar({
  bet,
  onBetChange,
  onSpin,
  onAutoSpinToggle,
  isSpinning,
  canSpin,
  isAutoSpinning,
  autoSpinCount,
  onAutoSpinCountChange,
  autoSpinsRemaining,
  bonusState,
  bonusLoaded = true,
  disabled,
  isSpinLocked,
  minBet = 1,
  maxBet = 10,
  spinsRemaining,
  maxSpins,
  spinsLoading,
  showBonusTrigger,
  winAmount,
  gameId,
  debugButton,
}: BonanzaControlBarProps) {
  const theme = getSlotTheme(gameId);
  const canSpinNow = bonusState.isActive
    ? bonusState.freeSpinsRemaining > 0
    : canSpin;

  const isBetLocked = !bonusLoaded || bonusState.isActive;
  const isCurrentlySpinning = isSpinning || isSpinLocked;

  const renderSpinContent = () => {
    if (isSpinning) {
      return <RotateCw className="h-9 w-9 sm:h-11 sm:w-11 text-white animate-spin" style={{ animationDuration: "0.7s" }} />;
    }
    if (!canSpinNow) {
      return <span className="text-[9px] sm:text-[10px] text-white/80 text-center leading-tight font-bold">INGEN<br />SPINS</span>;
    }
    if (isAutoSpinning && autoSpinsRemaining !== null) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-black text-white">{autoSpinsRemaining}</span>
          <span className="text-[7px] uppercase text-white/60 -mt-0.5 tracking-wider">AUTO</span>
        </div>
      );
    }
    if (isAutoSpinning) {
      return (
        <div className="flex flex-col items-center">
          <RotateCw className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
          <span className="text-[7px] uppercase text-white/60 -mt-0.5 tracking-wider">AUTO</span>
        </div>
      );
    }
    if (bonusState.isActive) {
      return (
        <div className="flex flex-col items-center">
          <RotateCw className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
          <span className="text-[8px] sm:text-[9px] font-bold text-white">FREE</span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <RotateCw className="h-9 w-9 sm:h-11 sm:w-11 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
      </div>
    );
  };

  return (
    <div className="relative w-full">

      {/* ===== CONTROL BAR CONTAINER — position:relative, 3 absolute zones ===== */}
      <div
        className={cn(
          "relative mx-auto overflow-visible",
        )}
        style={{ height: "80px" }}
      >
        {/* ─── LEFT ZONE: absolute left ─── */}
        <div
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3 z-10"
        >
          {/* PayTable + Volume */}
          <div className="flex items-center gap-0.5">
            <BonanzaPayTable gameId={gameId || "fedesvin-bonanza"} bet={bet} />
            <VolumeControl className="text-pink-300/50 hover:text-pink-200 h-8 w-8" />
          </div>

          {/* Credit + Bet stacked display */}
          {!bonusState.isActive && (
            <div className="flex flex-col leading-none gap-0.5 pl-2 border-l border-pink-500/10">
              <div className="flex items-center gap-2">
                <span
                  className="text-base uppercase tracking-wider font-black text-red-500"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(239,68,68,0.4)", WebkitTextStroke: "1px rgba(0,0,0,0.6)" }}
                >
                  Credit
                </span>
                <div className="flex items-center gap-1">
                  {spinsLoading ? (
                    <span className="text-lg animate-pulse text-pink-300/40">...</span>
                  ) : (
                    <span
                      className="text-2xl font-black tabular-nums text-emerald-400"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(52,211,153,0.4)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}
                    >
                      ${spinsRemaining.toLocaleString()}.00
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-base uppercase tracking-wider font-black text-red-500"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(239,68,68,0.4)", WebkitTextStroke: "1px rgba(0,0,0,0.6)" }}
                >
                  Bet
                </span>
                <span
                  className="text-2xl font-black tabular-nums text-emerald-400"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(52,211,153,0.4)", WebkitTextStroke: "1px rgba(0,0,0,0.5)" }}
                >
                  ${bet}.00
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ─── CENTER ZONE: absolute centered, bet controls + spin ─── */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 sm:gap-4 z-20"
        >
          {/* Bet minus */}
          <button
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
              "bg-gradient-to-b from-[hsl(340,20%,18%)] to-[hsl(340,20%,12%)]",
              "border border-pink-400/25",
              "text-pink-200/80",
              "hover:border-pink-400/50 hover:text-pink-100 hover:shadow-[0_0_12px_rgba(236,72,153,0.2)]",
              "active:scale-90 transition-all duration-150",
              "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:border-pink-400/25"
            )}
            onClick={() => onBetChange(Math.max(minBet, bet - 1))}
            disabled={isBetLocked || isCurrentlySpinning || bet <= minBet}
          >
            <Minus className="h-4 w-4" />
          </button>

          {/* ═══ THE DOMINANT SPIN BUTTON ═══ */}
          <button
            className={cn(
              "relative rounded-full flex-shrink-0 flex flex-col items-center justify-center",
              "w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] md:w-[110px] md:h-[110px]",
              "bg-[radial-gradient(ellipse_at_30%_20%,_hsl(330,85%,70%)_0%,_hsl(335,80%,55%)_25%,_hsl(340,75%,42%)_55%,_hsl(345,70%,28%)_100%)]",
              "border-[3px] border-pink-300/60",
              "shadow-[inset_0_3px_10px_rgba(255,200,230,0.5),inset_0_-5px_12px_rgba(80,15,50,0.5),0_0_35px_rgba(236,72,153,0.5),0_0_70px_rgba(236,72,153,0.15),0_10px_30px_rgba(0,0,0,0.5)]",
              !isCurrentlySpinning && canSpinNow && !isAutoSpinning && [
                "hover:shadow-[inset_0_3px_10px_rgba(255,200,230,0.7),inset_0_-5px_12px_rgba(80,15,50,0.3),0_0_55px_rgba(236,72,153,0.7),0_0_90px_rgba(236,72,153,0.3),0_10px_35px_rgba(0,0,0,0.5)]",
                "hover:border-pink-200/80",
                "hover:scale-105",
              ],
              "active:scale-[0.92] active:shadow-[inset_0_5px_15px_rgba(60,10,30,0.7),0_0_20px_rgba(236,72,153,0.3)]",
              "transition-all duration-200",
              isSpinning && "animate-pulse",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
            )}
            style={{
              marginTop: "-8px",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onClick={onSpin}
            disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
          >
            <div className="absolute inset-[-6px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)" }} />
            {renderSpinContent()}
          </button>

          {/* Bet plus */}
          <button
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0",
              "bg-gradient-to-b from-[hsl(340,20%,18%)] to-[hsl(340,20%,12%)]",
              "border border-pink-400/25",
              "text-pink-200/80",
              "hover:border-pink-400/50 hover:text-pink-100 hover:shadow-[0_0_12px_rgba(236,72,153,0.2)]",
              "active:scale-90 transition-all duration-150",
              "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:border-pink-400/25"
            )}
            onClick={() => onBetChange(Math.min(maxBet, bet + 1))}
            disabled={isBetLocked || isCurrentlySpinning || bet >= maxBet}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* ─── RIGHT ZONE: absolute right ─── */}
        <div
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3 z-10"
        >
          {/* Gevinst display */}
          <div className="flex flex-col items-center leading-none">
            <span
              className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-pink-400"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(236,72,153,0.6)" }}
            >
              Gevinst
            </span>
            <span
              className="text-xl sm:text-2xl font-black tabular-nums text-pink-300"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(236,72,153,0.6)" }}
            >
              {winAmount.toLocaleString()}
            </span>
          </div>
          {debugButton}
          <AutoSpinPopover
            isAutoSpinning={isAutoSpinning}
            autoSpinCount={autoSpinCount}
            onAutoSpinCountChange={onAutoSpinCountChange}
            onToggle={onAutoSpinToggle}
            autoSpinsRemaining={autoSpinsRemaining}
            disabled={!canSpinNow || showBonusTrigger}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
