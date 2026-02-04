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
  isTeasing?: boolean;  // Scatter tease glow during tease mode
}

// Symbol sizes: xs=72, mobile=84, sm=108, md=128, lg=156, xl=176
export function SlotSymbol({ symbol, isWinning, isSpinning, isExpanded, isNewlyExpanded, hasLanded, isTeasing }: SlotSymbolProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border-2 transition-all duration-300 overflow-hidden",
        // Symbol container sizes matching SYMBOL_SIZE constants
        "w-[72px] h-[72px] xs:w-[84px] xs:h-[84px] sm:w-[108px] sm:h-[108px] md:w-[128px] md:h-[128px] lg:w-[156px] lg:h-[156px] xl:w-[176px] xl:h-[176px]",
        isWinning
          ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105 bg-amber-900/30"
          : "border-transparent",
        isSpinning && "animate-pulse",
        isExpanded && "scale-110 border-amber-400/50",
        isNewlyExpanded && "animate-[expansion-flash_0.6s_ease-out]",
        // Scatter land animation
        symbol.is_scatter && hasLanded && !isSpinning && "animate-[scatter-land_0.5s_ease-out]",
        // Scatter tease glow - golden animated border during tease mode
        isTeasing && symbol.is_scatter && "border-amber-400 animate-[scatter-tease-glow_1s_ease-in-out_infinite]"
      )}
    >
      {symbol.image_url ? (
        <img
          src={symbol.image_url}
          alt={symbol.name}
          loading="eager"
          decoding="async"
          className={cn(
            // Image fills most of the container with shadow for depth
            "w-[60px] h-[60px] xs:w-[72px] xs:h-[72px] sm:w-[92px] sm:h-[92px] md:w-[112px] md:h-[112px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] object-cover rounded-lg transition-transform duration-300",
            "shadow-[0_4px_12px_rgba(0,0,0,0.5),0_2px_4px_rgba(0,0,0,0.3)]",
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
