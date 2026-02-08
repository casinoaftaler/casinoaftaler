import { Button } from "@/components/ui/button";
import { Minus, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";

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
  gameId?: string;
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
  gameId,
}: BetControlsProps) {
  const theme = getSlotTheme(gameId);

  return (
    <div className={cn(
      "flex flex-col gap-1.5 w-auto min-w-fit backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 sm:py-3",
      "bg-gradient-to-b", theme.panelFrom, theme.panelVia, theme.panelTo,
      "border-2", theme.borderAccentStrong,
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.4)]"
    )}>
      {/* Bet controls row */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className={cn(
          "text-xs sm:text-sm font-semibold uppercase tracking-wider",
          theme.accent, theme.dropShadowGlow
        )}>
          Indsats
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-gradient-to-b border",
              theme.btnFrom, theme.btnTo, theme.accentLight,
              theme.borderAccent,
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            )}
            onClick={() => onBetChange(Math.max(minBet, bet - 1))}
            disabled={disabled || bet <= minBet}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className={cn(
            "w-8 sm:w-10 text-center font-bold text-lg sm:text-xl",
            theme.accentLight, theme.dropShadowGlowStrong
          )}>
            {bet}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-gradient-to-b border",
              theme.btnFrom, theme.btnTo, theme.accentLight,
              theme.borderAccent,
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            )}
            onClick={() => onBetChange(Math.min(maxBet, bet + 1))}
            disabled={disabled || bet >= maxBet}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Spins remaining - integrated below */}
      {showSpins && (
        <div className={cn("flex items-center justify-center gap-1.5 pt-1 border-t", theme.borderAccent)}>
          <Sparkles className={cn("h-3.5 w-3.5", theme.accent)} />
          {spinsLoading ? (
            <span className={cn("text-xs animate-pulse", theme.accentMuted)}>Indlæser...</span>
          ) : (
            <span className="text-xs font-medium">
              <span className={cn(theme.accentLight, theme.dropShadowGlow)}>{spinsRemaining}</span>
              <span className={theme.accentMuted}>/{maxSpins} spins</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
