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
    <>
      {/* Desktop: single row - min-w prevents layout shift when autospin toggles */}
      <div className="hidden sm:flex w-full flex-row items-center justify-center gap-4 min-w-[700px]">
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
            "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28",
            theme.spinBtnGradient,
            "border-4", theme.spinBtnBorder,
            theme.spinBtnShadow, theme.spinBtnShadowMd,
            !isSpinning && !isSpinLocked && canSpinNow && !isAutoSpinning && theme.spinBtnHoverShadow,
            "hover:scale-105 transition-all duration-200",
            theme.spinBtnActiveShadow,
            isSpinning && "animate-pulse",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
            theme.spinBtnText, "font-bold text-lg md:text-xl lg:text-2xl flex flex-col items-center justify-center",
            theme.spinBtnTextShadow
          )}
          onClick={onSpin}
          disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
        >
          {isSpinning ? (
            <div className="relative">
              <div className={cn("absolute inset-0 rounded-full border-4 border-transparent animate-spin", theme.spinBtnRingBorder)} style={{ animationDuration: "0.8s" }} />
              <Gamepad2 className={cn("h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:h-12 animate-spin", theme.spinBtnIconColor)} style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
            </div>
          ) : !canSpinNow ? (
            <span className={cn("text-xs md:text-sm text-center leading-tight", theme.spinBtnIconColor, "opacity-80")}>INGEN<br />SPINS</span>
          ) : bonusState.isActive ? (
            <>
              <Gamepad2 className={cn("h-6 w-6 md:h-8 md:h-8 lg:h-10 lg:w-10 mb-0.5", theme.spinBtnIconColor)} />
              <span className={cn("text-sm md:text-base", theme.spinBtnIconColor)}>FREE</span>
            </>
          ) : (
            <>
              <Gamepad2 className={cn("h-6 w-6 md:h-8 md:h-8 lg:h-10 lg:w-10 mb-0.5", theme.spinBtnIconColor)} />
              <span className={cn("text-sm md:text-base lg:text-lg", theme.spinBtnIconColor)}>SPIN</span>
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
          <PayTable gameId={gameId} />
        </div>
      </div>

      {/* Mobile: two rows */}
      <div className="flex sm:hidden w-full flex-col items-center gap-1.5">
        {/* Row 1: Volume + Bet + Win + Spin */}
        <div className="flex items-center justify-center gap-1.5">
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
              "w-14 h-14",
              theme.spinBtnGradient,
              "border-[3px]", theme.spinBtnBorder,
              theme.spinBtnShadow,
              !isSpinning && !isSpinLocked && canSpinNow && !isAutoSpinning && theme.spinBtnHoverShadow,
              "hover:scale-105 transition-all duration-200",
              theme.spinBtnActiveShadow,
              isSpinning && "animate-pulse",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
              theme.spinBtnText, "font-bold text-sm flex flex-col items-center justify-center",
              theme.spinBtnTextShadow
            )}
            onClick={onSpin}
            disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning}
          >
            {isSpinning ? (
              <div className="relative">
                <div className={cn("absolute inset-0 rounded-full border-4 border-transparent animate-spin", theme.spinBtnRingBorder)} style={{ animationDuration: "0.8s" }} />
                <Gamepad2 className={cn("h-5 w-5 animate-spin", theme.spinBtnIconColor)} style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
              </div>
            ) : !canSpinNow ? (
              <span className={cn("text-[9px] text-center leading-tight", theme.spinBtnIconColor, "opacity-80")}>INGEN<br />SPINS</span>
            ) : bonusState.isActive ? (
              <>
                <Gamepad2 className={cn("h-4 w-4 mb-0.5", theme.spinBtnIconColor)} />
                <span className={cn("text-[10px]", theme.spinBtnIconColor)}>FREE</span>
              </>
            ) : (
              <>
                <Gamepad2 className={cn("h-4 w-4 mb-0.5", theme.spinBtnIconColor)} />
                <span className={cn("text-[10px]", theme.spinBtnIconColor)}>SPIN</span>
              </>
            )}
          </Button>
        </div>
        {/* Row 2: Autospin + PayTable */}
        <div className="flex items-center justify-center gap-2">
          <AutospinRow
            isAutoSpinning={isAutoSpinning}
            autoSpinCount={autoSpinCount}
            onAutoSpinCountChange={onAutoSpinCountChange}
            onToggle={onAutoSpinToggle}
            autoSpinsRemaining={autoSpinsRemaining}
            disabled={!canSpinNow || showBonusTrigger}
            gameId={gameId}
          />
          <PayTable gameId={gameId} />
        </div>
      </div>
    </>
  );
}
