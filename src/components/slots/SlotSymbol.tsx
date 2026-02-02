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
        "relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-amber-900/80 to-amber-950 border-2 transition-all duration-300",
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
            "w-12 h-12 sm:w-16 sm:h-16 object-contain",
            isExpanded && "animate-pulse"
          )}
        />
      ) : (
        <span className="text-3xl sm:text-4xl">{getSymbolEmoji(symbol.name)}</span>
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