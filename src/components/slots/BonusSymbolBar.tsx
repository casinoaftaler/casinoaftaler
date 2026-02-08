import { cn } from "@/lib/utils";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";

interface BonusSymbolBarProps {
  isVisible: boolean;
  allSymbols: SlotSymbol[];
  expandingSymbols: SlotSymbol[];
}

export function BonusSymbolBar({
  isVisible,
  allSymbols,
  expandingSymbols,
}: BonusSymbolBarProps) {
  if (!isVisible || allSymbols.length === 0) return null;

  // Only show non-scatter symbols
  const displaySymbols = allSymbols.filter(s => !s.is_scatter);
  const expandingIds = new Set(expandingSymbols.map(s => s.id));

  return (
    <div
      className={cn(
        "w-full p-2 sm:p-2.5 rounded-xl",
        "bg-gradient-to-b from-amber-950/80 via-amber-900/60 to-amber-950/80",
        "backdrop-blur-sm",
        "border border-amber-600/40",
        "shadow-[inset_0_1px_0_rgba(251,191,36,0.2),0_0_15px_rgba(251,191,36,0.2)]",
        "animate-fade-in"
      )}
    >
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
        {displaySymbols.map((symbol) => {
          const isExpanding = expandingIds.has(symbol.id);

          return (
            <div
              key={symbol.id}
              className={cn(
                "relative flex items-center justify-center",
                "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
                "rounded-lg border transition-all duration-500",
                isExpanding
                  ? [
                      "border-amber-400/70",
                      "bg-gradient-to-b from-amber-800/50 to-amber-950/50",
                      "shadow-[0_0_12px_rgba(251,191,36,0.5)]",
                      "scale-110",
                    ]
                  : [
                      "border-amber-800/30",
                      "bg-black/30",
                      "grayscale opacity-35",
                    ]
              )}
            >
              {symbol.image_url ? (
                <img
                  src={symbol.image_url}
                  alt={symbol.name}
                  className={cn(
                    "w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 object-contain",
                    "transition-all duration-500",
                    isExpanding && "drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                  )}
                />
              ) : (
                <span
                  className={cn(
                    "text-sm sm:text-base md:text-lg",
                    "transition-all duration-500"
                  )}
                >
                  {getSymbolEmoji(symbol.name)}
                </span>
              )}

              {/* Active glow pulse */}
              {isExpanding && (
                <div className="absolute inset-0 rounded-lg bg-amber-400/15 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
