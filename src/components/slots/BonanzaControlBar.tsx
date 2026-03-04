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
      <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 sm:gap-3 z-10">
        <div className="flex items-center gap-0.5">
          <BonanzaPayTable gameId={gameId || "fedesvin-bonanza"} bet={bet} />
          <VolumeControl className="text-pink-300/50 hover:text-pink-200 h-8 w-8" />
        </div>

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

      {/* ─── CENTER-RIGHT: [-] [SPIN + AUTOPLAY] [+] ─── */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 sm:gap-4 z-20">

        {/* HOLD SPACE text */}
        <span
          className="hidden lg:block text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/70 mr-1"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
        >
          Hold Space for Turbo Spin
        </span>

        {/* Minus button */}
        <button
          className={cn(
            "w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0",
            "bg-gradient-to-b from-[hsl(340,15%,25%)] to-[hsl(340,15%,15%)]",
            "border-2 border-white/20",
            "text-white/80",
            "hover:border-white/40 hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]",
            "active:scale-90 transition-all duration-150",
            "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:border-white/20"
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
              marginTop: "-6px",
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onClick={onSpin}
            disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
          >
            <div className="absolute inset-[-6px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)" }} />
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
                  "text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white",
                  "transition-all duration-150",
                  isAutoSpinning
                    ? "bg-red-500/80 hover:bg-red-500"
                    : "bg-black/40 hover:bg-black/60 backdrop-blur-sm",
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
            "bg-gradient-to-b from-[hsl(340,15%,25%)] to-[hsl(340,15%,15%)]",
            "border-2 border-white/20",
            "text-white/80",
            "hover:border-white/40 hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.15)]",
            "active:scale-90 transition-all duration-150",
            "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:border-white/20"
          )}
          onClick={() => onBetChange(Math.min(maxBet, bet + 1))}
          disabled={isBetLocked || isCurrentlySpinning || bet >= maxBet}
        >
          <Plus className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* ─── RIGHT: Gevinst ─── */}
      <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
        {debugButton}
        <div className="flex items-center gap-2 leading-none">
          <span
            className="text-sm sm:text-base uppercase tracking-widest font-black text-orange-400"
            style={labelStyle}
          >
            Gevinst
          </span>
          <AnimatedWinCounter
            targetValue={winAmount}
            className="text-xl sm:text-2xl font-black tabular-nums text-white"
            style={valueStyle}
          />
        </div>
      </div>
    </div>
  );
}
