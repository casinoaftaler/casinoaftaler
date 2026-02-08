import { cn } from "@/lib/utils";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { Sparkles } from "lucide-react";

interface BonusStatusBarProps {
  isActive: boolean;
  freeSpinsRemaining: number;
  totalFreeSpins: number;
  expandingSymbol: SlotSymbol | null;
  expandingSymbols?: SlotSymbol[];
  bonusWinnings: number;
}

export function BonusStatusBar({
  isActive,
  freeSpinsRemaining,
  totalFreeSpins,
  expandingSymbol,
  expandingSymbols = [],
  bonusWinnings,
}: BonusStatusBarProps) {
  if (!isActive) return null;

  return (
    <div
      className={cn(
        "w-full p-2.5 sm:p-3 rounded-xl",
        "bg-gradient-to-b from-amber-950/90 via-amber-900/70 to-amber-950/90",
        "backdrop-blur-sm",
        "border-2 border-amber-600/50",
        "shadow-[inset_0_1px_0_rgba(251,191,36,0.3),0_0_25px_rgba(251,191,36,0.4),0_4px_12px_rgba(0,0,0,0.4)]",
        "animate-[bonus-bar-glow_2s_ease-in-out_infinite]",
        "animate-fade-in"
      )}
    >
      {/* Mobile: 2x2 grid, Desktop: horizontal flex */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-between gap-2 sm:gap-4">
        {/* Bonus indicator */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 animate-pulse drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
          <span className="text-sm sm:text-lg font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            FREE SPINS
          </span>
        </div>

        {/* Spins remaining */}
        <div className="flex items-center gap-1 sm:gap-2 justify-end sm:justify-start">
          <span className="text-amber-500/70 text-xs sm:text-base">Spins:</span>
          <span className="text-base sm:text-xl font-bold text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]">
            {freeSpinsRemaining}/{totalFreeSpins}
          </span>
        </div>

        {/* Expanding symbol(s) */}
        {(expandingSymbols.length > 0 || expandingSymbol) && (
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-amber-500/70 text-xs sm:text-sm">Expanding:</span>
            <div className="flex items-center gap-1">
              {(expandingSymbols.length > 0 ? expandingSymbols : (expandingSymbol ? [expandingSymbol] : [])).map((sym) => (
                <div
                  key={sym.id}
                  className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 bg-gradient-to-b from-amber-800/50 to-amber-950/50 rounded-lg border border-amber-500/40 shadow-[inset_0_1px_0_rgba(251,191,36,0.2)]"
                >
                  {sym.image_url ? (
                    <img
                      src={sym.image_url}
                      alt={sym.name}
                      className="w-4 h-4 sm:w-6 sm:h-6 object-contain drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]"
                    />
                  ) : (
                    <span className="text-sm sm:text-lg">
                      {getSymbolEmoji(sym.name)}
                    </span>
                  )}
                  <span className="text-amber-300 font-medium text-xs sm:text-sm hidden sm:inline">
                    {sym.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bonus winnings */}
        <div className="flex items-center gap-1 sm:gap-2 justify-end sm:justify-start">
          <span className="text-amber-500/70 text-xs sm:text-base">Gevinst:</span>
          <span className="text-base sm:text-xl font-bold text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
            {bonusWinnings}
          </span>
        </div>
      </div>
    </div>
  );
}
