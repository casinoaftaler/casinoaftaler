import { Button } from "@/components/ui/button";
import { Minus, Plus, Sparkles } from "lucide-react";

interface BetControlsProps {
  bet: number;
  onBetChange: (bet: number) => void;
  disabled?: boolean;
  minBet?: number;
  maxBet?: number;
  showSpins?: boolean;
  spinsRemaining?: number;
  maxSpins?: number;
  spinsLoading?: boolean;
}

export function BetControls({
  bet,
  onBetChange,
  disabled,
  minBet = 1,
  maxBet = 10,
  showSpins = false,
  spinsRemaining = 0,
  maxSpins = 100,
  spinsLoading = false,
}: BetControlsProps) {
  return (
    <div className="flex flex-col gap-1.5 bg-gradient-to-b from-amber-950/90 via-amber-900/70 to-amber-950/90 backdrop-blur-sm border-2 border-amber-600/50 rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-[inset_0_1px_0_rgba(251,191,36,0.3),0_4px_12px_rgba(0,0,0,0.4)]">
      {/* Bet controls row */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xs sm:text-sm font-semibold text-amber-400 uppercase tracking-wider drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]">
          Indsats
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-gradient-to-b from-amber-800/80 to-amber-950/80 hover:from-amber-700/80 hover:to-amber-900/80 text-amber-300 border border-amber-500/40 shadow-[inset_0_1px_0_rgba(251,191,36,0.2)]"
            onClick={() => onBetChange(Math.max(minBet, bet - 1))}
            disabled={disabled || bet <= minBet}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 sm:w-10 text-center font-bold text-lg sm:text-xl text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
            {bet}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-gradient-to-b from-amber-800/80 to-amber-950/80 hover:from-amber-700/80 hover:to-amber-900/80 text-amber-300 border border-amber-500/40 shadow-[inset_0_1px_0_rgba(251,191,36,0.2)]"
            onClick={() => onBetChange(Math.min(maxBet, bet + 1))}
            disabled={disabled || bet >= maxBet}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Spins remaining - integrated below */}
      {showSpins && (
        <div className="flex items-center justify-center gap-1.5 pt-1 border-t border-amber-600/30">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          {spinsLoading ? (
            <span className="text-xs text-amber-500/60 animate-pulse">Indlæser...</span>
          ) : (
            <span className="text-xs font-medium">
              <span className="text-amber-300 drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]">{spinsRemaining}</span>
              <span className="text-amber-500/70">/{maxSpins} spins</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
