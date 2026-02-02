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
  isNewlyExpanded?: boolean;
  delay?: number;
}

// Match the responsive symbol sizes from SlotSymbol - LARGER
const SYMBOL_SIZE = { xs: 80, mobile: 96, sm: 112, md: 128, lg: 160, xl: 176 };
const GAP = { xs: 6, mobile: 8, sm: 10, md: 14, lg: 18 };

export function SlotReel({
  symbols,
  displayedSymbolIds,
  isSpinning,
  winningPositions = [],
  isExpanded = false,
  isNewlyExpanded = false,
  delay = 0,
}: SlotReelProps) {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const [spinState, setSpinState] = useState<"idle" | "spinning" | "stopping" | "stopped">("idle");
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Build the reel strip: final symbols at start, then random symbols for spinning effect
  const buildReelStrip = () => {
    const strip: SlotSymbolType[] = [];
    
    // Add the final landing symbols at the START (these will be visible at offset 0)
    displayedSymbolIds.forEach(id => {
      const symbol = symbolsById.get(id);
      if (symbol) strip.push(symbol);
    });
    
    // Add random symbols after for the spin animation
    const spinSymbolCount = 30;
    for (let i = 0; i < spinSymbolCount; i++) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      strip.push(randomSymbol);
    }
    
    return strip;
  };

  const [reelStrip, setReelStrip] = useState<SlotSymbolType[]>([]);
  const hasStartedSpinRef = useRef(false);

  // Get responsive dimensions
  const getSymbolHeight = () => {
    if (typeof window === "undefined") return SYMBOL_SIZE.xl;
    const width = window.innerWidth;
    if (width < 400) return SYMBOL_SIZE.xs;
    if (width < 640) return SYMBOL_SIZE.mobile;
    if (width < 768) return SYMBOL_SIZE.sm;
    if (width < 1024) return SYMBOL_SIZE.md;
    if (width < 1280) return SYMBOL_SIZE.lg;
    return SYMBOL_SIZE.xl;
  };

  const getGap = () => {
    if (typeof window === "undefined") return GAP.lg;
    const width = window.innerWidth;
    if (width < 400) return GAP.xs;
    if (width < 640) return GAP.mobile;
    if (width < 768) return GAP.sm;
    if (width < 1024) return GAP.md;
    return GAP.lg;
  };

  // Start spinning when isSpinning becomes true
  useEffect(() => {
    if (isSpinning && !hasStartedSpinRef.current) {
      hasStartedSpinRef.current = true;
      
      // Build new reel strip with final symbols at start
      const strip = buildReelStrip();
      setReelStrip(strip);
      
      // Calculate the target offset (we start high and animate to 0)
      const symbolHeight = getSymbolHeight();
      const gap = getGap();
      const totalSymbolHeight = symbolHeight + gap;
      
      // Start offset: we show random symbols first, then animate down to show final symbols at position 0
      const startOffset = (strip.length - 3) * totalSymbolHeight;
      setOffset(startOffset);
      
      // All reels start at the same time for visual sync
      const startDelay = 50;
      
      const startTimeout = setTimeout(() => {
        setSpinState("spinning");
        
        const startTime = performance.now();
        // Base spin duration - same for all reels
        const baseSpinDuration = 1000;
        // Each reel stops 350ms after the previous
        const reelStopDelay = delay * 350;
        const spinDuration = baseSpinDuration + reelStopDelay;
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / spinDuration, 1);
          
          // Smooth easing - ease out for natural deceleration
          const easeOutQuad = 1 - Math.pow(1 - progress, 2);
          
          // Animate from startOffset down to 0 (symbols move UP on screen)
          const currentOffset = startOffset * (1 - easeOutQuad);
          setOffset(currentOffset);
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            // Ensure we land exactly at 0
            setOffset(0);
            setSpinState("stopping");
            // Small settle effect at the end
            setTimeout(() => {
              setSpinState("stopped");
              // Reset for next spin after showing result
              setTimeout(() => {
                setSpinState("idle");
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

  // When idle, show just the final symbols (same as spinning at offset 0)
  // When stopped, also show final symbols with a small bounce animation
  if (spinState === "idle" || spinState === "stopped") {
    return (
      <div className={cn(
        "flex flex-col gap-1 xs:gap-1.5 sm:gap-2 md:gap-3",
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
                isNewlyExpanded={isNewlyExpanded}
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

  // Calculate blur amount based on current speed (higher offset = faster spin)
  const getBlurAmount = () => {
    if (spinState !== "spinning") return 0;
    const symbolHeight = getSymbolHeight();
    const gap = getGap();
    const totalSymbolHeight = symbolHeight + gap;
    const maxOffset = (reelStrip.length - 3) * totalSymbolHeight;
    // Blur is proportional to how far we are from the final position
    const progress = 1 - (offset / maxOffset);
    // Blur is strongest at the start (8px) and fades out as the reel slows
    return Math.max(0, 8 * (1 - progress * progress));
  };

  const blurAmount = getBlurAmount();

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
          filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
          transition: spinState === "stopping" ? 'filter 0.2s ease-out' : 'none',
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
      
      {/* Speed blur overlay effect - enhances motion blur perception */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: spinState === "spinning" 
            ? "linear-gradient(to bottom, hsl(var(--background) / 0.5), transparent 25%, transparent 75%, hsl(var(--background) / 0.5))"
            : "none",
          opacity: spinState === "stopping" ? 0 : 1,
        }}
      />
    </div>
  );
}
