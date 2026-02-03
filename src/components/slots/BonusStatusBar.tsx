import { cn } from "@/lib/utils";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { Sparkles } from "lucide-react";

interface BonusStatusBarProps {
  isActive: boolean;
  freeSpinsRemaining: number;
  totalFreeSpins: number;
  expandingSymbol: SlotSymbol | null;
  bonusWinnings: number;
}

export function BonusStatusBar({
  isActive,
  freeSpinsRemaining,
  totalFreeSpins,
  expandingSymbol,
  bonusWinnings,
}: BonusStatusBarProps) {
  if (!isActive) return null;

  return (
    <div
      className={cn(
        "w-full p-2 sm:p-3 rounded-xl",
        "bg-card/70 backdrop-blur-sm",
        "border border-amber-400/50",
        "animate-[bonus-bar-glow_2s_ease-in-out_infinite]",
        "animate-fade-in"
      )}
      style={{
        animationDuration: "0.4s",
        animationTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Mobile: 2x2 grid, Desktop: horizontal flex */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between gap-2 sm:gap-4">
        {/* Bonus indicator */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 animate-pulse" />
          <span className="text-sm sm:text-lg font-bold text-foreground">
            FREE SPINS
          </span>
        </div>

        {/* Spins remaining */}
        <div className="flex items-center gap-1 sm:gap-2 justify-end sm:justify-start">
          <span className="text-muted-foreground text-xs sm:text-base">Spins:</span>
          <span className="text-base sm:text-xl font-bold text-foreground">
            {freeSpinsRemaining}/{totalFreeSpins}
          </span>
        </div>

        {/* Expanding symbol */}
        {expandingSymbol && (
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-muted-foreground text-xs sm:text-sm">Expanding:</span>
            <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-background/40 rounded-lg border border-border/50">
              {expandingSymbol.image_url ? (
                <img
                  src={expandingSymbol.image_url}
                  alt={expandingSymbol.name}
                  className="w-4 h-4 sm:w-6 sm:h-6 object-contain"
                />
              ) : (
                <span className="text-sm sm:text-lg">
                  {getSymbolEmoji(expandingSymbol.name)}
                </span>
              )}
              <span className="text-foreground font-medium text-xs sm:text-sm">
                {expandingSymbol.name}
              </span>
            </div>
          </div>
        )}

        {/* Bonus winnings */}
        <div className="flex items-center gap-1 sm:gap-2 justify-end sm:justify-start">
          <span className="text-muted-foreground text-xs sm:text-base">Gevinst:</span>
          <span className="text-base sm:text-xl font-bold text-amber-400">
            {bonusWinnings}
          </span>
        </div>
      </div>
    </div>
  );
}
