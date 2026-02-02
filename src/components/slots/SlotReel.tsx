import { cn } from "@/lib/utils";
import { SlotSymbol } from "./SlotSymbol";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

interface SlotReelProps {
  symbols: SlotSymbolType[];
  displayedSymbolIds: string[];
  isSpinning: boolean;
  winningPositions?: number[];
  delay?: number;
}

export function SlotReel({
  symbols,
  displayedSymbolIds,
  isSpinning,
  winningPositions = [],
  delay = 0,
}: SlotReelProps) {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));

  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      {displayedSymbolIds.map((symbolId, rowIndex) => {
        const symbol = symbolsById.get(symbolId);
        if (!symbol) return null;

        return (
          <div
            key={`${rowIndex}-${symbolId}`}
            className={cn(
              "transition-transform duration-75",
              isSpinning && "animate-[slot-spin_0.1s_linear_infinite]"
            )}
            style={{
              animationDelay: isSpinning ? `${delay * 100}ms` : undefined,
            }}
          >
            <SlotSymbol
              symbol={symbol}
              isWinning={winningPositions.includes(rowIndex)}
              isSpinning={isSpinning}
            />
          </div>
        );
      })}
    </div>
  );
}
