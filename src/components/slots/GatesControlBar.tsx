import { Button } from "@/components/ui/button";
import { Minus, Plus, Gamepad2 } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";
import { cn } from "@/lib/utils";
import { VolumeControl } from "./VolumeControl";
import { GatesPayTable } from "./GatesPayTable";
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
  const theme = getSlotTheme(gameId);
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
          <div className={cn("absolute inset-0 rounded-full border-4 border-transparent animate-spin", theme.spinBtnRingBorder)} style={{ animationDuration: "0.8s" }} />
          <Gamepad2 className={cn("h-8 w-8 animate-spin", theme.spinBtnIconColor)} style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
        </div>
      );
    }
    if (!canSpinNow) {
      return <span className={cn("text-[9px] text-center leading-tight", theme.spinBtnIconColor, "opacity-80")}>INGEN<br />SPINS</span>;
    }
    if (isAutoSpinning && autoSpinsRemaining !== null) {
      return (
        <>
          <span className={cn("text-lg font-black", theme.spinBtnIconColor)}>{autoSpinsRemaining}</span>
          <span className={cn("text-[8px] uppercase -mt-1", theme.spinBtnIconColor, "opacity-70")}>AUTO</span>
        </>
      );
    }
    if (isAutoSpinning) {
      return (
        <>
          <Gamepad2 className={cn("h-6 w-6", theme.spinBtnIconColor)} />
          <span className={cn("text-[8px] uppercase -mt-0.5", theme.spinBtnIconColor, "opacity-70")}>AUTO</span>
        </>
      );
    }
    if (bonusState.isActive) {
      return (
        <>
          <Gamepad2 className={cn("h-7 w-7", theme.spinBtnIconColor)} />
          <span className={cn("text-xs font-bold", theme.spinBtnIconColor)}>FREE</span>
        </>
      );
    }
    return (
      <>
        <Gamepad2 className={cn("h-7 w-7", theme.spinBtnIconColor)} />
        <span className={cn("text-sm font-bold", theme.spinBtnIconColor)}>SPIN</span>
      </>
    );
  };

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl",
      "bg-gradient-to-b", theme.panelFrom, "via-slate-950/85", theme.panelTo,
      "border", theme.borderAccent,
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_20px_rgba(0,0,0,0.5)]",
      "backdrop-blur-sm"
    )}>
      {/* Left: PayTable + Volume */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {gameId === "gates-of-fedesvin" ? (
          <GatesPayTable gameId={gameId!} bet={bet} />
        ) : (
          <PayTable gameId={gameId} bet={bet} />
        )}
        <VolumeControl className={cn(theme.accentMuted, "hover:" + theme.accentLight.replace("text-", "text-"))} />
      </div>

      <div className={cn("w-px h-8 flex-shrink-0", theme.bgAccent)} />

      {/* Credits */}
      {!bonusState.isActive && (
        <>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <CreditCoin size="sm" />
            {spinsLoading ? (
              <span className={cn("text-xs animate-pulse", theme.accentMuted)}>...</span>
            ) : (
              <span className={cn("text-sm font-bold tabular-nums", theme.accentLight)}>{spinsRemaining}</span>
            )}
          </div>
          <div className={cn("w-px h-8 flex-shrink-0", theme.bgAccent)} />
        </>
      )}

      {/* Bet controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={cn("text-[10px] uppercase tracking-widest font-semibold", theme.accentMuted)}>
          Indsats
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-md border",
            "bg-gradient-to-b", theme.btnFrom, theme.btnTo,
            theme.borderAccent, theme.accentLight,
            "hover:opacity-80"
          )}
          onClick={() => onBetChange(Math.max(minBet, bet - 1))}
          disabled={disabled || isCurrentlySpinning || isBetLocked || bet <= minBet}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className={cn(
          "w-8 text-center font-bold text-lg tabular-nums",
          theme.accentLight, theme.dropShadowGlowStrong
        )}>
          {bet}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-md border",
            "bg-gradient-to-b", theme.btnFrom, theme.btnTo,
            theme.borderAccent, theme.accentLight,
            "hover:opacity-80"
          )}
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
        theme={theme}
      />

      {/* Spin button */}
      <Button
        className={cn(
          "rounded-full aspect-square flex-shrink-0",
          "w-16 h-16",
          theme.spinBtnGradient,
          "border-[3px]", theme.spinBtnBorder,
          theme.spinBtnShadow,
          !isCurrentlySpinning && canSpinNow && !isAutoSpinning && theme.spinBtnHoverShadow,
          "hover:scale-105 transition-all duration-200",
          theme.spinBtnActiveShadow,
          isSpinning && "animate-pulse",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
          theme.spinBtnText, "font-bold flex flex-col items-center justify-center",
          theme.spinBtnTextShadow
        )}
        onClick={onSpin}
        disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
      >
        {renderSpinContent()}
      </Button>
    </div>
  );
}
