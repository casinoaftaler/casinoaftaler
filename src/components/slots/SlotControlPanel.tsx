import { Button } from "@/components/ui/button";
import { BetControls } from "./BetControls";
import { AutospinRow } from "./AutospinRow";
import { VolumeControl } from "./VolumeControl";
import { PayTable } from "./PayTable";
import { SmallWinBar } from "./SmallWinBar";
import { Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface BonusState {
  isActive: boolean;
  freeSpinsRemaining: number;
}

interface SlotControlPanelProps {
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

export function SlotControlPanel({
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
}: SlotControlPanelProps) {
  const theme = getSlotTheme(gameId);
  const canSpinNow = bonusState.isActive
    ? bonusState.freeSpinsRemaining > 0
    : canSpin;

  return (
    <div className="flex w-full flex-row items-center justify-center gap-4">
      <VolumeControl className={cn(theme.accent, "flex-shrink-0")} />
      <BetControls
        bet={bet}
        onBetChange={onBetChange}
        disabled={disabled || isSpinning || bonusState.isActive}
        minBet={minBet}
        maxBet={maxBet}
        showSpins={!bonusState.isActive}
        spinsRemaining={spinsRemaining}
        maxSpins={maxSpins}
        spinsLoading={spinsLoading}
        gameId={gameId}
      />
      <SmallWinBar amount={winAmount} gameId={gameId} />
      <Button
        className={cn(
          "rounded-full aspect-square flex-shrink-0",
          "w-28 h-28",
          theme.spinBtnGradient,
          "border-4", theme.spinBtnBorder,
          theme.spinBtnShadow, theme.spinBtnShadowMd,
          !isSpinning && !isSpinLocked && canSpinNow && !isAutoSpinning && theme.spinBtnHoverShadow,
          "hover:scale-105 transition-all duration-200",
          theme.spinBtnActiveShadow,
          isSpinning && "animate-pulse",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
          theme.spinBtnText, "font-bold text-2xl flex flex-col items-center justify-center",
          theme.spinBtnTextShadow
        )}
        onClick={onSpin}
        disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
      >
        {isSpinning ? (
          <div className="relative">
            <div className={cn("absolute inset-0 rounded-full border-4 border-transparent animate-spin", theme.spinBtnRingBorder)} style={{ animationDuration: "0.8s" }} />
            <Gamepad2 className={cn("h-12 w-12 animate-spin", theme.spinBtnIconColor)} style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
          </div>
        ) : !canSpinNow ? (
          <span className={cn("text-sm text-center leading-tight", theme.spinBtnIconColor, "opacity-80")}>INGEN<br />SPINS</span>
        ) : bonusState.isActive ? (
          <>
            <Gamepad2 className={cn("h-10 w-10 mb-0.5", theme.spinBtnIconColor)} />
            <span className={cn("text-base", theme.spinBtnIconColor)}>FREE</span>
          </>
        ) : (
          <>
            <Gamepad2 className={cn("h-10 w-10 mb-0.5", theme.spinBtnIconColor)} />
            <span className={cn("text-lg", theme.spinBtnIconColor)}>SPIN</span>
          </>
        )}
      </Button>
      <AutospinRow
        isAutoSpinning={isAutoSpinning}
        autoSpinCount={autoSpinCount}
        onAutoSpinCountChange={onAutoSpinCountChange}
        onToggle={onAutoSpinToggle}
        autoSpinsRemaining={autoSpinsRemaining}
        disabled={!canSpinNow || showBonusTrigger}
        gameId={gameId}
      />
      <div className="flex-shrink-0">
        <PayTable gameId={gameId} bet={bet} />
      </div>
    </div>
  );
}
