import { cn } from "@/lib/utils";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { getSymbolEmoji } from "@/lib/slotGameLogic";
import { getSlotTheme } from "@/lib/slotTheme";

interface BonusSymbolBarProps {
  isVisible: boolean;
  allSymbols: SlotSymbol[];
  expandingSymbols: SlotSymbol[];
  gameId?: string;
}

export function BonusSymbolBar({
  isVisible,
  allSymbols,
  expandingSymbols,
  gameId,
}: BonusSymbolBarProps) {
  if (!isVisible || allSymbols.length === 0) return null;

  const theme = getSlotTheme(gameId);
  const displaySymbols = allSymbols.filter(s => !s.is_scatter);
  const expandingIds = new Set(expandingSymbols.map(s => s.id));

  return (
    <div
      className={cn(
        "w-full p-2 sm:p-2.5 rounded-xl",
        "bg-gradient-to-b", theme.panelFrom, theme.panelVia, theme.panelTo,
        "backdrop-blur-sm",
        "border", theme.borderAccent,
        theme.winBarShadow,
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
                      theme.borderAccent,
                      "bg-gradient-to-b", theme.btnFrom, theme.btnTo,
                      theme.winBarGlowShadow,
                      "scale-110",
                    ]
                  : [
                      "border-gray-800/30",
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
                    isExpanding && theme.dropShadowGlow
                  )}
                />
              ) : (
                <span className="text-sm sm:text-base md:text-lg transition-all duration-500">
                  {getSymbolEmoji(symbol.name)}
                </span>
              )}

              {isExpanding && (
                <div className={cn("absolute inset-0 rounded-lg animate-pulse", theme.bgAccent)} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
