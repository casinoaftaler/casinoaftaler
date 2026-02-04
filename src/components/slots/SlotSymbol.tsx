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
  isScatterCelebrating?: boolean;  // Scatter pulse/glow before bonus screen
}

// Symbol sizes: xs=61, mobile=71, sm=92, md=109, lg=133, xl=150
export function SlotSymbol({ symbol, isWinning, isSpinning, isExpanded, isNewlyExpanded, hasLanded, isTeasing, isScatterCelebrating }: SlotSymbolProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border-2 transition-all duration-300 overflow-hidden",
        // Symbol container sizes matching SYMBOL_SIZE constants
        "w-[61px] h-[61px] xs:w-[71px] xs:h-[71px] sm:w-[92px] sm:h-[92px] md:w-[109px] md:h-[109px] lg:w-[133px] lg:h-[133px] xl:w-[150px] xl:h-[150px]",
        isWinning
          ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] scale-105 bg-amber-900/30"
          : "border-transparent",
        isSpinning && "animate-pulse",
        isExpanded && "scale-110 border-amber-400/50",
        isNewlyExpanded && "animate-[expansion-flash_0.6s_ease-out]",
        // Scatter land animation
        symbol.is_scatter && hasLanded && !isSpinning && "animate-[scatter-land_0.5s_ease-out]",
        // Scatter tease glow - golden animated border during tease mode
        isTeasing && symbol.is_scatter && "border-amber-400 animate-[scatter-tease-glow_1s_ease-in-out_infinite]",
        // Scatter celebration - pulse and glow before bonus screen appears
        isScatterCelebrating && "border-amber-400 animate-[scatter-celebration_0.4s_ease-in-out_infinite]"
      )}
      style={isScatterCelebrating ? {
        boxShadow: '0 0 30px rgba(251,191,36,0.8), 0 0 60px rgba(251,191,36,0.4)'
      } : undefined}
    >
      {symbol.image_url ? (
        <img
          src={symbol.image_url}
          alt={symbol.name}
          loading="eager"
          decoding="async"
          className={cn(
            // Image fills most of the container with shadow for depth
            "w-[51px] h-[51px] xs:w-[61px] xs:h-[61px] sm:w-[78px] sm:h-[78px] md:w-[95px] md:h-[95px] lg:w-[119px] lg:h-[119px] xl:w-[136px] xl:h-[136px] object-cover rounded-lg transition-transform duration-300",
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
