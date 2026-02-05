import { Button } from "@/components/ui/button";
import { BetControls } from "./BetControls";
import { AutospinRow } from "./AutospinRow";
import { VolumeControl } from "./VolumeControl";
import { PayTable } from "./PayTable";
import { SmallWinBar } from "./SmallWinBar";
import { Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
}: SlotControlPanelProps) {
  const canSpinNow = bonusState.isActive
    ? bonusState.freeSpinsRemaining > 0
    : canSpin;

  return (
    <div className="w-full flex flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
      {/* Volume */}
      <VolumeControl className="text-amber-400 hover:text-amber-300 flex-shrink-0" />
      
      {/* Bet Controls */}
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
      />

      {/* Win Box */}
      <SmallWinBar amount={winAmount} />

      {/* Center: Spin Button */}
      <Button
          className={cn(
            // Round shape
            "rounded-full aspect-square flex-shrink-0",
            // Responsive sizing
            "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28",
            // Rich Egyptian gold gradient with metallic feel
            "bg-[radial-gradient(ellipse_at_30%_20%,_hsl(45,100%,70%)_0%,_hsl(43,96%,56%)_25%,_hsl(38,92%,45%)_50%,_hsl(30,85%,35%)_75%,_hsl(25,80%,25%)_100%)]",
            // Ornate golden border with inner glow
            "border-[3px] md:border-4 border-amber-400/80",
            // Multi-layer shadow for 3D depth + outer glow
            "shadow-[inset_0_2px_4px_rgba(255,230,150,0.6),inset_0_-3px_6px_rgba(120,80,20,0.4),0_0_25px_rgba(251,191,36,0.5),0_6px_20px_rgba(0,0,0,0.5)]",
            "md:shadow-[inset_0_3px_6px_rgba(255,230,150,0.6),inset_0_-4px_8px_rgba(120,80,20,0.4),0_0_35px_rgba(251,191,36,0.6),0_8px_25px_rgba(0,0,0,0.5)]",
            // Hover effects - intensify glow
            !isSpinning &&
              !isSpinLocked &&
              canSpinNow &&
              !isAutoSpinning &&
              "hover:shadow-[inset_0_2px_4px_rgba(255,230,150,0.8),inset_0_-3px_6px_rgba(120,80,20,0.3),0_0_50px_rgba(251,191,36,0.8),0_8px_30px_rgba(0,0,0,0.5)] hover:border-amber-300",
            "hover:scale-105 transition-all duration-200",
            // Active/press effect
            "active:scale-95 active:shadow-[inset_0_4px_12px_rgba(80,50,10,0.5),0_0_20px_rgba(251,191,36,0.4)]",
            // Spinning animation - override idle glow
            isSpinning && "animate-pulse",
            // Disabled state
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:animate-none",
            // Text styling - embossed gold text
            "text-amber-950 font-bold text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col items-center justify-center",
            // Text shadow for embossed effect
            "[text-shadow:0_1px_0_rgba(255,230,150,0.8),0_-1px_0_rgba(120,80,20,0.3)]"
          )}
          onClick={onSpin}
          disabled={isSpinning || isSpinLocked || !canSpinNow || showBonusTrigger || isAutoSpinning || bonusState.isActive}
        >
          {isSpinning ? (
            <div className="relative">
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-200/90 border-r-amber-400/50 animate-spin"
                style={{ animationDuration: "0.8s" }}
              />
              {/* Inner spinning icon */}
              <Gamepad2
                className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:h-12 animate-spin text-amber-900 drop-shadow-[0_1px_0_rgba(255,230,150,0.8)]"
                style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
              />
            </div>
          ) : !canSpinNow ? (
            <span className="text-[10px] sm:text-xs md:text-sm text-center leading-tight text-amber-900/80">
              INGEN
              <br />
              SPINS
            </span>
          ) : bonusState.isActive ? (
            <>
              <Gamepad2 className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:h-8 lg:h-10 lg:w-10 mb-0.5 text-amber-900" />
              <span className="text-[10px] sm:text-sm md:text-base text-amber-900">FREE</span>
            </>
          ) : (
            <>
              <Gamepad2 className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:h-8 lg:h-10 lg:w-10 mb-0.5 text-amber-900" />
              <span className="text-[10px] sm:text-sm md:text-base lg:text-lg text-amber-900">SPIN</span>
            </>
          )}
        </Button>

        {/* Autospin */}
        <AutospinRow
          isAutoSpinning={isAutoSpinning}
          autoSpinCount={autoSpinCount}
          onAutoSpinCountChange={onAutoSpinCountChange}
          onToggle={onAutoSpinToggle}
          autoSpinsRemaining={autoSpinsRemaining}
          disabled={!canSpinNow || showBonusTrigger}
        />

      {/* PayTable */}
      <div className="flex-shrink-0">
        <PayTable />
      </div>
    </div>
  );
}
