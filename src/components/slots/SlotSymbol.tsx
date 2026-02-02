import { cn } from "@/lib/utils";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

interface SlotSymbolProps {
  symbol: SlotSymbolType;
  isWinning?: boolean;
  isSpinning?: boolean;
  isExpanded?: boolean;
}

export function SlotSymbol({ symbol, isWinning, isSpinning, isExpanded }: SlotSymbolProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-lg bg-gradient-to-br from-amber-900/80 to-amber-950 border-2 transition-all duration-300",
        isWinning
          ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105"
          : "border-amber-700/50",
        isSpinning && "animate-pulse",
        isExpanded && "border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-110",
        symbol.is_scatter && "ring-2 ring-purple-500/50"
      )}
    >
      {symbol.image_url ? (
        <img
          src={symbol.image_url}
          alt={symbol.name}
          className={cn(
            "w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 object-contain",
            isExpanded && "animate-pulse"
          )}
        />
      ) : (
        <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl">{getSymbolEmoji(symbol.name)}</span>
      )}
      
      {/* Glow effect for winning */}
      {isWinning && (
        <div className="absolute inset-0 rounded-lg bg-amber-400/20 animate-pulse" />
      )}
      
      {/* Expanded glow effect */}
      {isExpanded && (
        <div className="absolute inset-0 rounded-lg bg-purple-400/30 animate-pulse" />
      )}
      
      {/* Scatter indicator */}
      {symbol.is_scatter && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">W</span>
        </div>
      )}
    </div>
  );
}