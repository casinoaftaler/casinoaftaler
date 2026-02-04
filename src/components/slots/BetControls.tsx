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
    <div className="flex flex-col gap-1.5 bg-gradient-to-r from-amber-950/80 to-amber-900/60 backdrop-blur-sm border border-amber-500/30 rounded-xl px-3 py-2 sm:px-4 sm:py-3">
      {/* Bet controls row */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xs sm:text-sm font-medium text-amber-500/80 uppercase tracking-wide">
          Indsats
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-amber-950/60 hover:bg-amber-500/30 text-amber-500 border border-amber-500/20"
            onClick={() => onBetChange(Math.max(minBet, bet - 1))}
            disabled={disabled || bet <= minBet}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 sm:w-10 text-center font-bold text-lg sm:text-xl text-amber-400">
            {bet}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-amber-950/60 hover:bg-amber-500/30 text-amber-500 border border-amber-500/20"
            onClick={() => onBetChange(Math.min(maxBet, bet + 1))}
            disabled={disabled || bet >= maxBet}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Spins remaining - integrated below */}
      {showSpins && (
        <div className="flex items-center justify-center gap-1.5 pt-0.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          {spinsLoading ? (
            <span className="text-xs text-muted-foreground animate-pulse">Indlæser...</span>
          ) : (
            <span className="text-xs font-medium">
              <span className="text-amber-500">{spinsRemaining}</span>
              <span className="text-muted-foreground">/{maxSpins} spins</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
