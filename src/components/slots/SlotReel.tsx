import { useState, useEffect, useRef } from "react";
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

// Symbol dimensions (should match SlotSymbol component)
const SYMBOL_SIZE = { mobile: 80, sm: 96, md: 112, lg: 128 };
const GAP = { mobile: 8, sm: 12, md: 16 };

export function SlotReel({
  symbols,
  displayedSymbolIds,
  isSpinning,
  winningPositions = [],
  isExpanded = false,
  delay = 0,
}: SlotReelProps) {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const [spinState, setSpinState] = useState<"idle" | "spinning" | "stopping" | "stopped">("idle");
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build the reel strip: random symbols + final 3 symbols at the end
  const buildReelStrip = () => {
    const strip: SlotSymbolType[] = [];
    
    // Add random symbols for spinning - more for later reels
    const spinSymbolCount = 20 + delay * 8;
    for (let i = 0; i < spinSymbolCount; i++) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      strip.push(randomSymbol);
    }
    
    // Add the final landing symbols at the end
    displayedSymbolIds.forEach(id => {
      const symbol = symbolsById.get(id);
      if (symbol) strip.push(symbol);
    });
    
    return strip;
  };

  const [reelStrip, setReelStrip] = useState<SlotSymbolType[]>([]);
  const hasStartedSpinRef = useRef(false);

  // Get responsive dimensions
  const getSymbolHeight = () => {
    if (typeof window === "undefined") return SYMBOL_SIZE.lg;
    const width = window.innerWidth;
    if (width < 640) return SYMBOL_SIZE.mobile;
    if (width < 768) return SYMBOL_SIZE.sm;
    if (width < 1024) return SYMBOL_SIZE.md;
    return SYMBOL_SIZE.lg;
  };

  const getGap = () => {
    if (typeof window === "undefined") return GAP.md;
    const width = window.innerWidth;
    if (width < 640) return GAP.mobile;
    if (width < 768) return GAP.sm;
    return GAP.md;
  };

  // Start spinning when isSpinning becomes true
  useEffect(() => {
    if (isSpinning && !hasStartedSpinRef.current) {
      hasStartedSpinRef.current = true;
      
      // Build new reel strip with final symbols
      const strip = buildReelStrip();
      setReelStrip(strip);
      
      // Calculate the target offset to land on the final 3 symbols
      const symbolHeight = getSymbolHeight();
      const gap = getGap();
      const totalSymbolHeight = symbolHeight + gap;
      
      // Target offset: scroll to show the last 3 symbols (the actual result)
      const targetOffset = (strip.length - 3) * totalSymbolHeight;
      
      // All reels start at the same time for visual sync
      const startDelay = 50;
      
      const startTimeout = setTimeout(() => {
        setSpinState("spinning");
        
        const startTime = performance.now();
        // All reels spin for the same base time, but STOP sequentially
        // Each reel waits for the previous one to stop before stopping
        const baseSpinDuration = 1200; // Base spin time
        const reelStopDelay = delay * 400; // 400ms between each reel stopping
        const spinDuration = baseSpinDuration + reelStopDelay;
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / spinDuration, 1);
          
          // Custom easing: starts very fast, then gradually slows down
          let easeProgress: number;
          if (progress < 0.7) {
            // Fast spinning phase (70% of duration)
            easeProgress = (progress / 0.7) * 0.5;
          } else {
            // Deceleration phase (30% of duration)
            const decelProgress = (progress - 0.7) / 0.3;
            // Ease-out cubic for smooth deceleration
            const easeOutCubic = 1 - Math.pow(1 - decelProgress, 3);
            easeProgress = 0.5 + easeOutCubic * 0.5;
          }
          
          // Calculate current offset
          const currentOffset = easeProgress * targetOffset;
          setOffset(currentOffset);
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setSpinState("stopping");
            // Small settle effect at the end
            setTimeout(() => {
              setSpinState("stopped");
              // Reset for next spin after showing result
              setTimeout(() => {
                setSpinState("idle");
                setOffset(0);
                hasStartedSpinRef.current = false;
              }, 100);
            }, 50);
          }
        };
        
        animationRef.current = requestAnimationFrame(animate);
      }, startDelay);

      return () => {
        clearTimeout(startTimeout);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isSpinning, delay]);

  // Reset when isSpinning goes false AND we're done animating
  useEffect(() => {
    if (!isSpinning && spinState === "idle" && hasStartedSpinRef.current) {
      hasStartedSpinRef.current = false;
      setOffset(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isSpinning, spinState]);

  // When idle or fully stopped, show just the final symbols
  if (spinState === "idle" || spinState === "stopped") {
    return (
      <div className={cn(
        "flex flex-col gap-2 sm:gap-3 md:gap-4",
        isExpanded && "animate-pulse"
      )}>
        {displayedSymbolIds.map((symbolId, rowIndex) => {
          const symbol = symbolsById.get(symbolId);
          if (!symbol) return null;

          return (
            <div
              key={`final-${rowIndex}-${symbolId}`}
              className={cn(
                spinState === "stopped" && "animate-[bounce_0.3s_ease-out]"
              )}
            >
              <SlotSymbol
                symbol={symbol}
                isWinning={winningPositions.includes(rowIndex)}
                isSpinning={false}
                isExpanded={isExpanded}
              />
            </div>
          );
        })}
      </div>
    );
  }

  // During spinning, show the animated reel strip
  const symbolHeight = getSymbolHeight();
  const gap = getGap();
  const totalSymbolHeight = symbolHeight + gap;
  const viewportHeight = 3 * symbolHeight + 2 * gap;

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-lg bg-amber-950/50"
      style={{ 
        height: `${viewportHeight}px`,
        width: `${symbolHeight}px`
      }}
    >
      <div 
        className="absolute left-0 right-0 flex flex-col"
        style={{ 
          transform: `translateY(-${offset}px)`,
          gap: `${gap}px`,
        }}
      >
        {reelStrip.map((symbol, index) => (
          <SlotSymbol
            key={`reel-${index}-${symbol.id}`}
            symbol={symbol}
            isSpinning={true}
          />
        ))}
      </div>
      
      {/* Speed blur effect - stronger at the start, fades as it slows */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: spinState === "spinning" 
            ? "linear-gradient(to bottom, hsl(var(--background) / 0.4), transparent 20%, transparent 80%, hsl(var(--background) / 0.4))"
            : "none",
          opacity: spinState === "stopping" ? 0 : 1,
        }}
      />
    </div>
  );
}
