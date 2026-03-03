import { Button } from "@/components/ui/button";
import { Minus, Plus, RotateCw, Zap } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";
import { cn } from "@/lib/utils";
import { VolumeControl } from "./VolumeControl";
import { GatesPayTable } from "./GatesPayTable";
import { BonanzaPayTable } from "./BonanzaPayTable";
import { PayTable } from "./PayTable";
import { AutoSpinPopover } from "./AutoSpinPopover";
import { getSlotTheme } from "@/lib/slotTheme";

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
  debugButton?: React.ReactNode;
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
  debugButton,
}: GatesControlBarProps) {
  const theme = getSlotTheme(gameId);
  const canSpinNow = bonusState.isActive
    ? bonusState.freeSpinsRemaining > 0
    : canSpin;

  const isBetLocked = !bonusLoaded || bonusState.isActive;
  const isCurrentlySpinning = isSpinning || isSpinLocked;

  const renderSpinContent = () => {
    if (isSpinning) {
      return <RotateCw className="h-7 w-7 text-white animate-spin" style={{ animationDuration: "0.8s" }} />;
    }
    if (!canSpinNow) {
      return <span className="text-[9px] text-white/80 text-center leading-tight font-bold">INGEN<br />SPINS</span>;
    }
    if (isAutoSpinning && autoSpinsRemaining !== null) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-lg font-black text-white">{autoSpinsRemaining}</span>
          <span className="text-[7px] uppercase text-white/70 -mt-1">AUTO</span>
        </div>
      );
    }
    if (isAutoSpinning) {
      return (
        <div className="flex flex-col items-center">
          <RotateCw className="h-6 w-6 text-white" />
          <span className="text-[7px] uppercase text-white/70 -mt-0.5">AUTO</span>
        </div>
      );
    }
    if (bonusState.isActive) {
      return (
        <div className="flex flex-col items-center">
          <RotateCw className="h-6 w-6 text-white" />
          <span className="text-[8px] font-bold text-white">FREE</span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center">
        <RotateCw className="h-7 w-7 text-white" />
        <span className="text-[9px] font-bold text-white tracking-wide">SPIN</span>
      </div>
    );
  };

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-2xl",
      "bg-gradient-to-b from-[hsl(340,40%,12%)] via-[hsl(340,35%,8%)] to-[hsl(340,40%,6%)]",
      "border border-pink-500/20",
      "shadow-[0_-2px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.03)]",
    )}>
      {/* Left: PayTable + Volume */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {gameId === "gates-of-fedesvin" ? (
          <GatesPayTable gameId={gameId!} bet={bet} />
        ) : gameId === "fedesvin-bonanza" ? (
          <BonanzaPayTable gameId={gameId} bet={bet} />
        ) : (
          <PayTable gameId={gameId} bet={bet} />
        )}
        <VolumeControl className="text-pink-300/60 hover:text-pink-200" />
      </div>

      <div className="w-px h-8 flex-shrink-0 bg-pink-500/15" />

      {/* Credits */}
      {!bonusState.isActive && (
        <>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <CreditCoin size="sm" />
            {spinsLoading ? (
              <span className="text-xs animate-pulse text-pink-300/50">...</span>
            ) : (
              <span className="text-sm font-bold tabular-nums text-pink-200">{spinsRemaining}</span>
            )}
          </div>
          <div className="w-px h-8 flex-shrink-0 bg-pink-500/15" />
        </>
      )}

      {/* Bet display (locked at 10) */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-pink-300/50">
          Indsats
        </span>
        <span className="w-8 text-center font-bold text-lg tabular-nums text-pink-100">
          {bet}
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Debug + Auto spin */}
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

      {/* Spin button — large circular, pink gradient like Sweet Bonanza */}
      <button
        className={cn(
          "rounded-full flex-shrink-0 flex flex-col items-center justify-center",
          "w-16 h-16",
          "bg-[radial-gradient(ellipse_at_30%_25%,_hsl(330,80%,65%)_0%,_hsl(335,75%,50%)_30%,_hsl(340,70%,40%)_60%,_hsl(345,65%,30%)_100%)]",
          "border-[3px] border-pink-400/70",
          "shadow-[inset_0_2px_6px_rgba(255,180,220,0.5),inset_0_-3px_8px_rgba(100,20,60,0.4),0_0_25px_rgba(236,72,153,0.5),0_6px_20px_rgba(0,0,0,0.5)]",
          !isCurrentlySpinning && canSpinNow && !isAutoSpinning && "hover:shadow-[inset_0_2px_6px_rgba(255,180,220,0.7),inset_0_-3px_8px_rgba(100,20,60,0.3),0_0_40px_rgba(236,72,153,0.7),0_6px_25px_rgba(0,0,0,0.5)] hover:border-pink-300",
          "hover:scale-105 active:scale-95 transition-all duration-200",
          "active:shadow-[inset_0_4px_12px_rgba(60,10,30,0.6),0_0_15px_rgba(236,72,153,0.3)]",
          isSpinning && "animate-pulse",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
        )}
        onClick={onSpin}
        disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
      >
        {renderSpinContent()}
      </button>
    </div>
  );
}
