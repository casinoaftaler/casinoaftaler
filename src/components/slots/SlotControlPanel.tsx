import { Button } from "@/components/ui/button";
import { BetControls } from "./BetControls";
import { AutospinRow } from "./AutospinRow";
import { VolumeControl } from "./VolumeControl";
import { PayTable } from "./PayTable";
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
  minBet?: number;
  maxBet?: number;
  spinsRemaining: number;
  maxSpins: number;
  spinsLoading?: boolean;
  showBonusTrigger?: boolean;
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
  minBet = 1,
  maxBet = 10,
  spinsRemaining,
  maxSpins,
  spinsLoading,
  showBonusTrigger,
}: SlotControlPanelProps) {
  const canSpinNow = bonusState.isActive
    ? bonusState.freeSpinsRemaining > 0
    : canSpin;

  return (
    <div className="w-full flex flex-col items-center gap-3 sm:gap-4">
      {/* Main control row - responsive layout */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
        {/* Left Panel: Bet + Spins (stacks first on mobile) */}
        <div className="order-1 sm:order-1">
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
        </div>

        {/* Center: Spin Button */}
        <Button
          className={cn(
            // Round shape
            "rounded-full aspect-square order-2",
            // Responsive sizing
            "w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28",
            // Golden gradient with 3D effect
            "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700",
            // Golden border
            "border-2 md:border-4 border-amber-400/60",
            // Deep glow shadow
            "shadow-[0_0_20px_rgba(251,191,36,0.5),0_4px_15px_rgba(0,0,0,0.3)] md:shadow-[0_0_30px_rgba(251,191,36,0.6),0_6px_20px_rgba(0,0,0,0.4)]",
            // Hover effects
            !isSpinning &&
              canSpinNow &&
              !isAutoSpinning &&
              "hover:shadow-[0_0_40px_rgba(251,191,36,0.8),0_8px_30px_rgba(0,0,0,0.5)]",
            "hover:scale-105 transition-all duration-200",
            // Active/press effect
            "active:scale-95 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]",
            // Spinning animation
            isSpinning && "animate-pulse",
            // Disabled state
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
            // Text styling
            "text-white font-bold text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col items-center justify-center"
          )}
          onClick={onSpin}
          disabled={isSpinning || !canSpinNow || showBonusTrigger || isAutoSpinning}
        >
          {isSpinning ? (
            <div className="relative">
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/80 border-r-white/40 animate-spin"
                style={{ animationDuration: "0.8s" }}
              />
              {/* Inner spinning icon */}
              <Gamepad2
                className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:h-12 animate-spin drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
              />
            </div>
          ) : !canSpinNow ? (
            <span className="text-[10px] sm:text-xs md:text-sm text-center leading-tight">
              INGEN
              <br />
              SPINS
            </span>
          ) : bonusState.isActive ? (
            <>
              <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:h-8 lg:h-10 lg:w-10 mb-0.5" />
              <span className="text-xs sm:text-sm md:text-base">FREE</span>
            </>
          ) : (
            <>
              <Gamepad2 className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:h-8 lg:h-10 lg:w-10 mb-0.5" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">SPIN</span>
            </>
          )}
        </Button>

        {/* Right Panel: Volume + PayTable */}
        <div className="flex items-center gap-2 order-3 bg-gradient-to-b from-amber-950/90 via-amber-900/70 to-amber-950/90 backdrop-blur-sm border-2 border-amber-600/50 rounded-xl px-3 py-2 shadow-[inset_0_1px_0_rgba(251,191,36,0.3),0_4px_12px_rgba(0,0,0,0.4)]">
          <VolumeControl className="text-amber-400 hover:text-amber-300" />
          <div className="w-px h-6 bg-amber-600/40" />
          <PayTable />
        </div>
      </div>

      {/* Autospin Row - below spin button */}
      <AutospinRow
        isAutoSpinning={isAutoSpinning}
        autoSpinCount={autoSpinCount}
        onAutoSpinCountChange={onAutoSpinCountChange}
        onToggle={onAutoSpinToggle}
        autoSpinsRemaining={autoSpinsRemaining}
        disabled={!canSpinNow || showBonusTrigger}
      />
    </div>
  );
}
