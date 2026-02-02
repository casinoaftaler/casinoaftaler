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
        "w-full p-3 rounded-xl mb-4",
        // Use theme tokens to avoid any unintended purple tint across modes
        "bg-card/70 backdrop-blur-sm",
        "border border-border/60",
        "shadow-sm"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Bonus indicator */}
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <span className="text-lg font-bold text-foreground">
            FREE SPINS
          </span>
        </div>

        {/* Spins remaining */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Spins:</span>
          <span className="text-xl font-bold text-foreground">
            {freeSpinsRemaining} / {totalFreeSpins}
          </span>
        </div>

        {/* Expanding symbol */}
        {expandingSymbol && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Expanding:</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-background/40 rounded-lg border border-border/50">
              {expandingSymbol.image_url ? (
                <img
                  src={expandingSymbol.image_url}
                  alt={expandingSymbol.name}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <span className="text-lg">
                  {getSymbolEmoji(expandingSymbol.name)}
                </span>
              )}
              <span className="text-foreground font-medium text-sm">
                {expandingSymbol.name}
              </span>
            </div>
          </div>
        )}

        {/* Bonus winnings */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Gevinst:</span>
          <span className="text-xl font-bold text-primary">
            {bonusWinnings}
          </span>
        </div>
      </div>
    </div>
  );
}
