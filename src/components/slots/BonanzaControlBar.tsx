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
  gameId,
  debugButton,
}: BonanzaControlBarProps) {
  const theme = getSlotTheme(gameId);
  const canSpinNow = bonusState.isActive
    ? bonusState.freeSpinsRemaining > 0
    : canSpin;

  const isBetLocked = !bonusLoaded || bonusState.isActive;
  const isCurrentlySpinning = isSpinning || isSpinLocked;

  return (
    <div className="relative w-full">
      {/* Turbo hint - floats above */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/50 animate-pulse"
          style={{ textShadow: "0 0 10px rgba(236,72,153,0.4)" }}>
          Hold space for turbo spin
        </span>
      </div>

      {/* Main floating control bar */}
      <div className={cn(
        "relative mx-auto flex items-center justify-between gap-2 sm:gap-3",
        "px-3 sm:px-5 py-2 sm:py-2.5",
        "rounded-full",
        "bg-gradient-to-b from-[hsl(340,30%,10%)] via-[hsl(340,25%,7%)] to-[hsl(340,30%,4%)]",
        "border border-pink-500/15",
        "shadow-[0_-2px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-1px_0_rgba(0,0,0,0.3)]",
        "backdrop-blur-md",
      )}>

        {/* === LEFT GROUP: PayTable + Volume + Credit/Bet === */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* PayTable + Volume */}
          <div className="flex items-center gap-0.5">
            <BonanzaPayTable gameId={gameId || "fedesvin-bonanza"} bet={bet} />
            <VolumeControl className="text-pink-300/50 hover:text-pink-200 h-8 w-8" />
          </div>

          {/* Credit + Bet display - stacked labels like real slots */}
          {!bonusState.isActive && (
            <div className="hidden sm:flex flex-col leading-none gap-0.5 pl-2 border-l border-pink-500/10">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-widest font-bold text-amber-400/70">Credit</span>
                <div className="flex items-center gap-1">
                  <CreditCoin size="sm" />
                  {spinsLoading ? (
                    <span className="text-xs animate-pulse text-pink-300/40">...</span>
                  ) : (
                    <span className="text-sm font-black tabular-nums text-amber-300"
                      style={{ textShadow: "0 0 8px rgba(251,191,36,0.3)" }}>
                      {spinsRemaining.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] uppercase tracking-widest font-bold text-pink-300/50">Indsats</span>
                <span className="text-sm font-black tabular-nums text-white/90">{bet}</span>
              </div>
            </div>
          )}
        </div>

        {/* === CENTER GROUP: Bet controls + Spin button === */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile credit display */}
          {!bonusState.isActive && (
            <div className="flex sm:hidden items-center gap-1 flex-shrink-0">
              <CreditCoin size="sm" />
              {spinsLoading ? (
                <span className="text-xs animate-pulse text-pink-300/40">...</span>
              ) : (
                <span className="text-xs font-bold tabular-nums text-amber-300">{spinsRemaining}</span>
              )}
            </div>
          )}

          {/* Bet minus */}
          <button
            className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0",
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
            <Minus className="h-3.5 w-3.5" />
          </button>

          {/* Bet value */}
          <div className="flex flex-col items-center min-w-[2rem]">
            <span className="text-[8px] uppercase tracking-widest font-semibold text-pink-300/40 sm:hidden">Bet</span>
            <span className="text-lg sm:text-xl font-black tabular-nums text-white leading-none">{bet}</span>
          </div>

          {/* Bet plus */}
          <button
            className={cn(
              "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0",
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
            <Plus className="h-3.5 w-3.5" />
          </button>

          {/* === THE BIG SPIN BUTTON === */}
          <button
            className={cn(
              "relative rounded-full flex-shrink-0 flex flex-col items-center justify-center",
              "w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px]",
              // Radial gradient - candy pink
              "bg-[radial-gradient(ellipse_at_30%_20%,_hsl(330,85%,70%)_0%,_hsl(335,80%,55%)_25%,_hsl(340,75%,42%)_55%,_hsl(345,70%,30%)_100%)]",
              // Border
              "border-[3px] border-pink-300/60",
              // Shadows - inner glow + outer halo
              "shadow-[inset_0_3px_8px_rgba(255,200,230,0.5),inset_0_-4px_10px_rgba(80,15,50,0.5),0_0_30px_rgba(236,72,153,0.5),0_0_60px_rgba(236,72,153,0.2),0_8px_25px_rgba(0,0,0,0.5)]",
              // Hover
              !isCurrentlySpinning && canSpinNow && !isAutoSpinning && [
                "hover:shadow-[inset_0_3px_8px_rgba(255,200,230,0.7),inset_0_-4px_10px_rgba(80,15,50,0.3),0_0_50px_rgba(236,72,153,0.7),0_0_80px_rgba(236,72,153,0.3),0_8px_30px_rgba(0,0,0,0.5)]",
                "hover:border-pink-200/80",
                "hover:scale-105",
              ],
              // Active press
              "active:scale-[0.92] active:shadow-[inset_0_5px_15px_rgba(60,10,30,0.7),0_0_20px_rgba(236,72,153,0.3)]",
              // Transitions
              "transition-all duration-200 ease-out",
              // Spinning state
              isSpinning && "animate-pulse",
              // Disabled
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none disabled:hover:shadow-[inset_0_3px_8px_rgba(255,200,230,0.5),inset_0_-4px_10px_rgba(80,15,50,0.5),0_0_30px_rgba(236,72,153,0.5),0_8px_25px_rgba(0,0,0,0.5)]",
            )}
            onClick={onSpin}
            disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
          >
            {/* Outer glow ring */}
            <div className="absolute inset-[-4px] rounded-full bg-pink-500/10 blur-md pointer-events-none" />

            {/* Spin icon content */}
            {isSpinning ? (
              <RotateCw className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-spin" style={{ animationDuration: "0.7s" }} />
            ) : !canSpinNow ? (
              <span className="text-[9px] sm:text-[10px] text-white/80 text-center leading-tight font-bold">INGEN<br />SPINS</span>
            ) : isAutoSpinning && autoSpinsRemaining !== null ? (
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl font-black text-white">{autoSpinsRemaining}</span>
                <span className="text-[7px] uppercase text-white/60 -mt-0.5 tracking-wider">AUTO</span>
              </div>
            ) : isAutoSpinning ? (
              <div className="flex flex-col items-center">
                <RotateCw className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                <span className="text-[7px] uppercase text-white/60 -mt-0.5 tracking-wider">AUTO</span>
              </div>
            ) : bonusState.isActive ? (
              <div className="flex flex-col items-center">
                <RotateCw className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                <span className="text-[8px] sm:text-[9px] font-bold text-white">FREE</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <RotateCw className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
              </div>
            )}
          </button>
        </div>

        {/* === RIGHT GROUP: Debug + AutoSpin === */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
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
