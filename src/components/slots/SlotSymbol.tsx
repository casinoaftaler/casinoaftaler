import { cn } from "@/lib/utils";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

interface SlotSymbolProps {
  symbol: SlotSymbolType;
  isWinning?: boolean;
  isSpinning?: boolean;
  isExpanded?: boolean;
  isNewlyExpanded?: boolean;
  hasLanded?: boolean;
}

// Symbol sizes: xs=64, mobile=76, sm=96, md=112, lg=140, xl=160
export function SlotSymbol({ symbol, isWinning, isSpinning, isExpanded, isNewlyExpanded, hasLanded }: SlotSymbolProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border-2 transition-all duration-300 overflow-hidden",
        // Symbol container sizes matching SYMBOL_SIZE constants
        "w-[64px] h-[64px] xs:w-[76px] xs:h-[76px] sm:w-[96px] sm:h-[96px] md:w-[112px] md:h-[112px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px]",
        isWinning
          ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105 bg-amber-900/30"
          : "border-transparent",
        isSpinning && "animate-pulse",
        isExpanded && "scale-110 border-amber-400/50",
        isNewlyExpanded && "animate-[expansion-flash_0.6s_ease-out]",
        // Scatter land animation
        symbol.is_scatter && hasLanded && !isSpinning && "animate-[scatter-land_0.5s_ease-out]"
      )}
    >
      {symbol.image_url ? (
        <img
          src={symbol.image_url}
          alt={symbol.name}
          className={cn(
            // Image fills most of the container
            "w-[52px] h-[52px] xs:w-[64px] xs:h-[64px] sm:w-[80px] sm:h-[80px] md:w-[96px] md:h-[96px] lg:w-[124px] lg:h-[124px] xl:w-[144px] xl:h-[144px] object-contain transition-transform duration-300",
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
        <div className="absolute inset-0 rounded-lg bg-amber-400/20 animate-pulse" />
      )}
      
      {/* Expansion burst effect */}
      {isNewlyExpanded && (
        <>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 via-amber-400/50 to-amber-500/0 animate-[shine_0.6s_ease-out]" />
          <div className="absolute inset-[-4px] rounded-xl border-2 border-amber-300 animate-[expand-ring_0.6s_ease-out] opacity-0" />
        </>
      )}
      
    </div>
  );
}
