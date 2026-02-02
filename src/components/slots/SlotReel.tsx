import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SlotSymbol } from "./SlotSymbol";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

interface SlotReelProps {
  symbols: SlotSymbolType[];
  displayedSymbolIds: string[];
  isSpinning: boolean;
  winningPositions?: number[];
  isExpanded?: boolean;
  delay?: number;
}

export function SlotReel({
  symbols,
  displayedSymbolIds,
  isSpinning,
  winningPositions = [],
  isExpanded = false,
  delay = 0,
}: SlotReelProps) {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const [spinOffset, setSpinOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Create an extended list of symbols for the spinning effect
  const extendedSymbols = useMemo(() => {
    // Repeat symbols multiple times for smooth looping
    const repeated: SlotSymbolType[] = [];
    for (let i = 0; i < 10; i++) {
      symbols.forEach(s => repeated.push(s));
    }
    return repeated;
  }, [symbols]);

  // Symbol height calculation (matches the CSS sizes)
  const symbolHeight = 128; // lg size
  const gap = 16; // gap between symbols
  const totalSymbolHeight = symbolHeight + gap;

  useEffect(() => {
    if (isSpinning) {
      // Start spinning with delay per reel
      const startDelay = delay * 150;
      
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
        
        // Animate the spin
        let currentOffset = 0;
        const spinSpeed = 50; // pixels per frame
        const targetSpins = 20 + delay * 5; // More spins for later reels
        const targetOffset = targetSpins * totalSymbolHeight;
        
        const animate = () => {
          currentOffset += spinSpeed;
          setSpinOffset(currentOffset % (extendedSymbols.length * totalSymbolHeight / 2));
          
          if (currentOffset < targetOffset) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, startDelay);

      return () => clearTimeout(startTimeout);
    } else {
      // Reset when not spinning
      setIsAnimating(false);
      setSpinOffset(0);
    }
  }, [isSpinning, delay, extendedSymbols.length, totalSymbolHeight]);

  // When spinning, show the extended symbol strip
  if (isAnimating) {
    return (
      <div 
        className="relative overflow-hidden rounded-lg"
        style={{ 
          height: `${3 * totalSymbolHeight - gap}px`,
          width: `${symbolHeight}px`
        }}
      >
        <div 
          className="absolute left-0 right-0 flex flex-col gap-4 transition-none"
          style={{ 
            transform: `translateY(-${spinOffset}px)`,
          }}
        >
          {extendedSymbols.map((symbol, index) => (
            <SlotSymbol
              key={`spin-${index}`}
              symbol={symbol}
              isSpinning={true}
            />
          ))}
        </div>
        {/* Blur overlay for speed effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/30 pointer-events-none" />
      </div>
    );
  }

  // When stopped, show the final symbols
  return (
    <div className={cn(
      "flex flex-col gap-2 sm:gap-3 md:gap-4",
      isExpanded && "animate-pulse"
    )}>
      {displayedSymbolIds.map((symbolId, rowIndex) => {
        const symbol = symbolsById.get(symbolId);
        if (!symbol) return null;

        return (
          <SlotSymbol
            key={`${rowIndex}-${symbolId}`}
            symbol={symbol}
            isWinning={winningPositions.includes(rowIndex)}
            isSpinning={false}
            isExpanded={isExpanded}
          />
        );
      })}
    </div>
  );
}
