import { Button } from "@/components/ui/button";
import { Minus, Plus, Gamepad2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { VolumeControl } from "./VolumeControl";
import { GatesPayTable } from "./GatesPayTable";
import { AutoSpinPopover } from "./AutoSpinPopover";

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface BonusState {
  isActive: boolean;
  freeSpinsRemaining: number;
}

interface GatesControlBarProps {
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
}

export function GatesControlBar({
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
}: GatesControlBarProps) {
  const canSpinNow = bonusState.isActive
    ? bonusState.freeSpinsRemaining > 0
    : canSpin;

  const isBetLocked = !bonusLoaded || bonusState.isActive;
  const isCurrentlySpinning = isSpinning || isSpinLocked;

  // What to show inside the spin button
  const renderSpinContent = () => {
    if (isSpinning) {
      return (
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-200/90 border-r-blue-400/50 animate-spin" style={{ animationDuration: "0.8s" }} />
          <Gamepad2 className="h-8 w-8 text-blue-900 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
        </div>
      );
    }
    if (!canSpinNow) {
      return <span className="text-[9px] text-center leading-tight text-blue-900/80">INGEN<br />SPINS</span>;
    }
    if (isAutoSpinning && autoSpinsRemaining !== null) {
      return (
        <>
          <span className="text-lg font-black text-blue-900">{autoSpinsRemaining}</span>
          <span className="text-[8px] uppercase text-blue-900/70 -mt-1">AUTO</span>
        </>
      );
    }
    if (isAutoSpinning) {
      return (
        <>
          <Gamepad2 className="h-6 w-6 text-blue-900" />
          <span className="text-[8px] uppercase text-blue-900/70 -mt-0.5">AUTO</span>
        </>
      );
    }
    if (bonusState.isActive) {
      return (
        <>
          <Gamepad2 className="h-7 w-7 text-blue-900" />
          <span className="text-xs font-bold text-blue-900">FREE</span>
        </>
      );
    }
    return (
      <>
        <Gamepad2 className="h-7 w-7 text-blue-900" />
        <span className="text-sm font-bold text-blue-900">SPIN</span>
      </>
    );
  };

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl",
      "bg-gradient-to-b from-blue-950/90 via-slate-950/85 to-blue-950/90",
      "border border-blue-500/25",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.5)]",
      "backdrop-blur-sm"
    )}>
      {/* Left: PayTable + Volume */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <GatesPayTable gameId={gameId!} bet={bet} />
        <VolumeControl className="text-blue-400/70 hover:text-blue-300" />
      </div>

      <div className="w-px h-8 bg-blue-500/20 flex-shrink-0" />

      {/* Credits */}
      {!bonusState.isActive && (
        <>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-blue-400/70" />
            {spinsLoading ? (
              <span className="text-xs animate-pulse text-blue-400/50">...</span>
            ) : (
              <span className="text-sm font-bold tabular-nums">
                <span className="text-blue-200">{spinsRemaining}</span>
                <span className="text-blue-500/60">/{maxSpins}</span>
              </span>
            )}
          </div>
          <div className="w-px h-8 bg-blue-500/20 flex-shrink-0" />
        </>
      )}

      {/* Bet controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-blue-400/70">
          Indsats
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md bg-blue-800/40 border border-blue-500/25 text-blue-300 hover:bg-blue-700/50 hover:text-blue-200"
          onClick={() => onBetChange(Math.max(minBet, bet - 1))}
          disabled={disabled || isCurrentlySpinning || isBetLocked || bet <= minBet}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="w-8 text-center font-bold text-lg text-blue-200 tabular-nums drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
          {bet}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-md bg-blue-800/40 border border-blue-500/25 text-blue-300 hover:bg-blue-700/50 hover:text-blue-200"
          onClick={() => onBetChange(Math.min(maxBet, bet + 1))}
          disabled={disabled || isCurrentlySpinning || isBetLocked || bet >= maxBet}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Auto spin popover */}
      <AutoSpinPopover
        isAutoSpinning={isAutoSpinning}
        autoSpinCount={autoSpinCount}
        onAutoSpinCountChange={onAutoSpinCountChange}
        onToggle={onAutoSpinToggle}
        autoSpinsRemaining={autoSpinsRemaining}
        disabled={!canSpinNow || showBonusTrigger}
      />

      {/* Spin button */}
      <Button
        className={cn(
          "rounded-full aspect-square flex-shrink-0",
          "w-16 h-16",
          "bg-[radial-gradient(ellipse_at_30%_20%,_hsl(210,80%,70%)_0%,_hsl(215,75%,56%)_25%,_hsl(220,70%,45%)_50%,_hsl(225,65%,35%)_75%,_hsl(230,60%,25%)_100%)]",
          "border-[3px] border-blue-400/80",
          "shadow-[inset_0_2px_4px_rgba(170,200,255,0.6),inset_0_-3px_6px_rgba(20,60,120,0.4),0_0_25px_rgba(59,130,246,0.5),0_6px_20px_rgba(0,0,0,0.5)]",
          !isCurrentlySpinning && canSpinNow && !isAutoSpinning && "hover:shadow-[inset_0_2px_4px_rgba(170,200,255,0.8),inset_0_-3px_6px_rgba(20,60,120,0.3),0_0_50px_rgba(59,130,246,0.8),0_8px_30px_rgba(0,0,0,0.5)] hover:border-blue-300",
          "hover:scale-105 transition-all duration-200",
          "active:shadow-[inset_0_4px_12px_rgba(10,40,80,0.5),0_0_20px_rgba(59,130,246,0.4)]",
          isSpinning && "animate-pulse",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
          "text-blue-950 font-bold flex flex-col items-center justify-center",
          "[text-shadow:0_1px_0_rgba(170,200,255,0.8),0_-1px_0_rgba(20,60,120,0.3)]"
        )}
        onClick={onSpin}
        disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
      >
        {renderSpinContent()}
      </Button>
    </div>
  );
}
