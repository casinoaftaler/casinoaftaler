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
        "bg-gradient-to-r from-purple-900/80 via-amber-900/80 to-purple-900/80",
        "border-2 border-amber-400/50",
        "shadow-[0_0_20px_rgba(168,85,247,0.3)]"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Bonus indicator */}
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
          <span className="text-lg font-bold text-purple-300">
            FREE SPINS
          </span>
        </div>

        {/* Spins remaining */}
        <div className="flex items-center gap-2">
          <span className="text-amber-200">Spins:</span>
          <span className="text-xl font-bold text-amber-300">
            {freeSpinsRemaining} / {totalFreeSpins}
          </span>
        </div>

        {/* Expanding symbol */}
        {expandingSymbol && (
          <div className="flex items-center gap-2">
            <span className="text-amber-200 text-sm">Expanding:</span>
            <div className="flex items-center gap-1 px-2 py-1 bg-black/30 rounded-lg">
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
              <span className="text-amber-300 font-medium text-sm">
                {expandingSymbol.name}
              </span>
            </div>
          </div>
        )}

        {/* Bonus winnings */}
        <div className="flex items-center gap-2">
          <span className="text-amber-200">Gevinst:</span>
          <span className="text-xl font-bold text-green-400">
            {bonusWinnings}
          </span>
        </div>
      </div>
    </div>
  );
}
