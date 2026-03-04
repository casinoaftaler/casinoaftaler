import { Minus, Plus, RotateCw, Square } from "lucide-react";
import { AnimatedWinCounter } from "./AnimatedWinCounter";
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
  isMobile?: boolean;
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
  isMobile = false,
}: BonanzaControlBarProps) {
  const theme = getSlotTheme(gameId);
  const canSpinNow = bonusState.isActive
    ? bonusState.freeSpinsRemaining > 0
    : canSpin;

  const isBetLocked = !bonusLoaded || bonusState.isActive;
  const isCurrentlySpinning = isSpinning || isSpinLocked;

  const renderSpinContent = () => {
    if (isSpinning) {
      return <RotateCw className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-spin" style={{ animationDuration: "0.7s" }} />;
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
          <RotateCw className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          <span className="text-[7px] uppercase text-white/60 -mt-0.5 tracking-wider">AUTO</span>
        </div>
      );
    }
    if (bonusState.isActive) {
      return (
        <div className="flex flex-col items-center">
          <RotateCw className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          <span className="text-[8px] sm:text-[9px] font-bold text-white">FREE</span>
        </div>
      );
    }
    return <RotateCw className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />;
  };

  /* shared label style */
  const labelStyle: React.CSSProperties = {
    textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(255,140,0,0.4)",
    WebkitTextStroke: "0.5px rgba(0,0,0,0.5)",
  };
  const valueStyle: React.CSSProperties = {
    textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.2)",
    WebkitTextStroke: "1px rgba(0,0,0,0.4)",
  };

  return (
    <div className="relative w-full" style={{ height: 80 }}>
      {/* ─── LEFT: PayTable + Volume + Credit/Bet ─── */}
      <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 sm:gap-2 z-10">
        {/* Info (PayTable) button — circular like reference */}
        <BonanzaPayTable gameId={gameId || "fedesvin-bonanza"} bet={bet} />

        {/* Volume button — circular */}
        <VolumeControl className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border-2 border-white/15 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white" />

        {!bonusState.isActive && (
          <div className="flex flex-col leading-none gap-0.5 pl-2 border-l border-pink-500/10">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base uppercase tracking-wider font-black text-orange-400" style={labelStyle}>
                Credit
              </span>
              {spinsLoading ? (
                <span className="text-lg animate-pulse text-white/40">...</span>
              ) : (
                <span className="text-xl sm:text-2xl font-black tabular-nums text-white" style={valueStyle}>
                  {spinsRemaining.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base uppercase tracking-wider font-black text-orange-400" style={labelStyle}>
                Bet
              </span>
              <span className="text-xl sm:text-2xl font-black tabular-nums text-white" style={valueStyle}>
                {bet}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ─── CENTER: WIN / Gevinst ─── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
        {debugButton}
        <span
          className="text-lg sm:text-xl uppercase tracking-widest font-black text-orange-400"
          style={labelStyle}
        >
          WIN
        </span>
        <AnimatedWinCounter
          targetValue={winAmount}
          className="text-3xl sm:text-4xl font-black tabular-nums text-white"
          style={valueStyle}
        />
      </div>

      {/* ─── RIGHT: Space text + [-] [SPIN+Autoplay] [+] ─── */}
      <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex items-center gap-3 sm:gap-4 z-20">

        {/* TRYK PÅ SPACE text */}
        <span
          className="hidden lg:block text-base sm:text-lg font-black uppercase tracking-wider text-white"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.2)" }}
        >
          TRYK PÅ SPACE FOR AT SPINNE
        </span>

        {/* Minus button */}
        <button
          className={cn(
            "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0",
            "bg-black/30 backdrop-blur-sm",
            "border-2 border-white/15",
            "text-white/70",
            "hover:bg-white/10 hover:border-white/30 hover:text-white",
            "active:scale-90 transition-all duration-150",
            "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-black/30 disabled:hover:border-white/15"
          )}
          onClick={() => onBetChange(Math.max(minBet, bet - 1))}
          disabled={isBetLocked || isCurrentlySpinning || bet <= minBet}
        >
          <Minus className="h-5 w-5 text-white" />
        </button>

        {/* ═══ SPIN BUTTON with AUTOPLAY underneath ═══ */}
        <div className="flex flex-col items-center flex-shrink-0">
          <button
            className={cn(
              "relative rounded-full flex items-center justify-center",
              "w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] md:w-[105px] md:h-[105px]",
              "bg-black/25 backdrop-blur-sm",
              "border-[3px] border-white/20",
              "shadow-[0_0_25px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)]",
              !isCurrentlySpinning && canSpinNow && !isAutoSpinning && [
                "hover:bg-white/10",
                "hover:border-white/35",
                "hover:shadow-[0_0_40px_rgba(255,255,255,0.1),0_10px_35px_rgba(0,0,0,0.5)]",
                "hover:scale-105",
              ],
              "active:scale-[0.92] active:bg-black/40",
              "transition-all duration-200",
              isSpinning && "animate-pulse",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
            )}
            style={{
              marginTop: "-6px",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onClick={onSpin}
            disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
          >
            {renderSpinContent()}
          </button>

          {/* AUTOPLAY button — attached below spin */}
          <AutoSpinPopover
            isAutoSpinning={isAutoSpinning}
            autoSpinCount={autoSpinCount}
            onAutoSpinCountChange={onAutoSpinCountChange}
            onToggle={onAutoSpinToggle}
            autoSpinsRemaining={autoSpinsRemaining}
            disabled={!canSpinNow || showBonusTrigger}
            theme={theme}
            renderTrigger={({ onClick, disabled: triggerDisabled }) => (
              <button
                onClick={onClick}
                disabled={triggerDisabled}
                className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-b-lg -mt-1",
                  "text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/90",
                  "transition-all duration-150",
                  isAutoSpinning
                    ? "bg-red-500/60 hover:bg-red-500/80"
                    : "bg-black/30 hover:bg-black/50 backdrop-blur-sm",
                  "disabled:opacity-30 disabled:cursor-not-allowed"
                )}
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
              >
                {isAutoSpinning ? (
                  <>
                    <Square className="h-3 w-3 text-white" />
                    Stop
                  </>
                ) : (
                  <>
                    <RotateCw className="h-3 w-3 text-white" />
                    Autoplay
                  </>
                )}
              </button>
            )}
          />
        </div>

        {/* Plus button */}
        <button
          className={cn(
            "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0",
            "bg-black/30 backdrop-blur-sm",
            "border-2 border-white/15",
            "text-white/70",
            "hover:bg-white/10 hover:border-white/30 hover:text-white",
            "active:scale-90 transition-all duration-150",
            "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-black/30 disabled:hover:border-white/15"
          )}
          onClick={() => onBetChange(Math.min(maxBet, bet + 1))}
          disabled={isBetLocked || isCurrentlySpinning || bet >= maxBet}
        >
          <Plus className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  );
}
