import { cn } from "@/lib/utils";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

interface SlotSymbolProps {
  symbol: SlotSymbolType;
  isWinning?: boolean;
  isSpinning?: boolean;
  isExpanded?: boolean;
  isNewlyExpanded?: boolean;
}

// Larger symbol sizes for bigger slot machine
export function SlotSymbol({ symbol, isWinning, isSpinning, isExpanded, isNewlyExpanded }: SlotSymbolProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-lg bg-gradient-to-br from-amber-900/80 to-amber-950 border-2 transition-all duration-300 overflow-hidden",
        isWinning
          ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105"
          : "border-amber-700/50",
        isSpinning && "animate-pulse",
        isExpanded && "border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-110",
        isNewlyExpanded && "animate-[expansion-flash_0.6s_ease-out]",
        symbol.is_scatter && "ring-2 ring-purple-500/50"
      )}
    >
      {symbol.image_url ? (
        <img
          src={symbol.image_url}
          alt={symbol.name}
            className={cn(
              "w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 object-contain transition-transform duration-300",
            isExpanded && "scale-110",
            isNewlyExpanded && "animate-[symbol-expand_0.5s_ease-out]"
          )}
        />
      ) : (
        <span className={cn(
          "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl transition-transform duration-300",
          isExpanded && "scale-110",
          isNewlyExpanded && "animate-[symbol-expand_0.5s_ease-out]"
        )}>
          {getSymbolEmoji(symbol.name)}
        </span>
      )}
      
      {/* Glow effect for winning */}
      {isWinning && (
        <div className="absolute inset-0 rounded-lg bg-amber-400/20 animate-pulse" />
      )}
      
      {/* Expanded glow effect */}
      {isExpanded && (
        <div className="absolute inset-0 rounded-lg bg-purple-400/30 animate-pulse" />
      )}
      
      {/* Expansion burst effect */}
      {isNewlyExpanded && (
        <>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/0 via-purple-400/50 to-purple-500/0 animate-[shine_0.6s_ease-out]" />
          <div className="absolute inset-[-4px] rounded-xl border-2 border-purple-300 animate-[expand-ring_0.6s_ease-out] opacity-0" />
        </>
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
