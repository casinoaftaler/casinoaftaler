import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { SlotSymbol } from "./SlotSymbol";
import { slotSounds } from "@/lib/slotSoundEffects";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

interface SlotReelProps {
  symbols: SlotSymbolType[];
  displayedSymbolIds: string[];
  isSpinning: boolean;
  winningPositions?: number[];
  isExpanded?: boolean;
  isNewlyExpanded?: boolean;
  expandingSymbolId?: string;
  delay?: number;
  shouldSlowDown?: boolean;  // NEW: Whether this reel should start slowing down
  onReelStop?: (reelIndex: number) => void;
  teaseMode?: boolean;
  isActiveTeaseReel?: boolean;
  scatterLandedOnPreviousReel?: boolean;
  extendedFakeLoop?: boolean;
  globalTeaseActive?: boolean;
  hasLandedScatter?: boolean;
}

// Match the responsive symbol sizes from SlotSymbol
const SYMBOL_SIZE = { xs: 64, mobile: 76, sm: 96, md: 112, lg: 140, xl: 160 };
const GAP = { xs: 4, mobile: 6, sm: 8, md: 12, lg: 16 };

export function SlotReel({
  symbols,
  displayedSymbolIds,
  isSpinning,
  winningPositions = [],
  isExpanded = false,
  isNewlyExpanded = false,
  expandingSymbolId,
  delay = 0,
  shouldSlowDown = false,
  onReelStop,
  teaseMode = false,
  isActiveTeaseReel = false,
  scatterLandedOnPreviousReel = false,
  extendedFakeLoop = false,
  globalTeaseActive = false,
  hasLandedScatter = false,
}: SlotReelProps) {
  const symbolsById = new Map(symbols.map(s => [s.id, s]));
  const [spinState, setSpinState] = useState<"idle" | "spinning" | "stopping" | "stopped">("idle");
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedSpinRef = useRef(false);
  const hasStartedSlowdownRef = useRef(false);
  const stopTeaseSoundRef = useRef<(() => void) | null>(null);

  const [reelStrip, setReelStrip] = useState<SlotSymbolType[]>([]);

  // Build the reel strip: final symbols at start, then random symbols for spinning effect
  const buildReelStrip = () => {
    const strip: SlotSymbolType[] = [];
    
    // Add the final landing symbols at the START
    displayedSymbolIds.forEach(id => {
      const symbol = symbolsById.get(id);
      if (symbol) strip.push(symbol);
    });
    
    // Add random symbols for the spin animation
    const spinSymbolCount = 30;
    for (let i = 0; i < spinSymbolCount; i++) {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      strip.push(randomSymbol);
    }
    
    return strip;
  };

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

  // Start fake loop when spinning begins - ALL reels use this now
  useEffect(() => {
    if (isSpinning && !hasStartedSpinRef.current) {
      hasStartedSpinRef.current = true;
      hasStartedSlowdownRef.current = false;
      
      // Build reel strip
      const strip = buildReelStrip();
      setReelStrip(strip);
      
      const symbolHeight = getSymbolHeight();
      const gap = getGap();
      const totalSymbolHeight = symbolHeight + gap;
      const startOffset = (strip.length - 3) * totalSymbolHeight;
      setOffset(startOffset);
      
      // Start fake loop immediately
      setSpinState("spinning");
      
      const loopDuration = 600; // Constant speed loop cycle
      const fakeLoopStartTime = performance.now();
      
      const fakeLoopAnimate = (currentTime: number) => {
        if (!hasStartedSpinRef.current || hasStartedSlowdownRef.current) return;
        
        const elapsed = (currentTime - fakeLoopStartTime) % loopDuration;
        const loopProgress = elapsed / loopDuration;
        // Constant speed - linear motion, no easing
        const loopOffset = startOffset * (1 - loopProgress);
        setOffset(loopOffset);
        
        animationRef.current = requestAnimationFrame(fakeLoopAnimate);
      };
      
      animationRef.current = requestAnimationFrame(fakeLoopAnimate);
    }
  }, [isSpinning]);

  // Handle transition from fake loop to slowdown when shouldSlowDown becomes true
  useEffect(() => {
    if (shouldSlowDown && hasStartedSpinRef.current && !hasStartedSlowdownRef.current && spinState === "spinning") {
      hasStartedSlowdownRef.current = true;
      
      // Cancel fake loop animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // For tease reels, play the tease sound
      if (teaseMode && isActiveTeaseReel) {
        stopTeaseSoundRef.current = slotSounds.playActiveTeaseSlowdown(delay);
      }
      
      // Rebuild reel strip with fresh symbols for the slowdown
      const strip = buildReelStrip();
      setReelStrip(strip);
      
      const symbolHeight = getSymbolHeight();
      const gap = getGap();
      const totalSymbolHeight = symbolHeight + gap;
      const startOffset = (strip.length - 3) * totalSymbolHeight;
      setOffset(startOffset);
      
      const startTime = performance.now();
      // Tease reels get longer slowdown (3s), normal reels get fast 600ms
      const spinDuration = teaseMode ? 3000 : 600;
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Easing: slower for tease, normal for regular
        const easeOut = teaseMode
          ? 1 - Math.pow(1 - progress, 5)  // Very slow deceleration for tease
          : 1 - Math.pow(1 - progress, 2); // Normal ease out
        
        const currentOffset = startOffset * (1 - easeOut);
        setOffset(currentOffset);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Stop tease sound when reel lands
          if (stopTeaseSoundRef.current) {
            stopTeaseSoundRef.current();
            stopTeaseSoundRef.current = null;
          }
          
          setOffset(0);
          setSpinState("stopping");
          
          // Trigger the reel stop callback
          onReelStop?.(delay);
          
          // Small settle effect
          setTimeout(() => {
            setSpinState("stopped");
            setTimeout(() => {
              setSpinState("idle");
              hasStartedSpinRef.current = false;
              hasStartedSlowdownRef.current = false;
            }, 100);
          }, 50);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [shouldSlowDown, spinState, teaseMode, isActiveTeaseReel, delay, onReelStop]);

  // Reset when isSpinning goes false
  useEffect(() => {
    if (!isSpinning && spinState === "idle" && hasStartedSpinRef.current) {
      hasStartedSpinRef.current = false;
      hasStartedSlowdownRef.current = false;
      setOffset(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (stopTeaseSoundRef.current) {
        stopTeaseSoundRef.current();
        stopTeaseSoundRef.current = null;
      }
    }
  }, [isSpinning, spinState]);

  // Force cleanup if isSpinning goes false while still animating
  useEffect(() => {
    if (!isSpinning && spinState !== "idle") {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (stopTeaseSoundRef.current) {
        stopTeaseSoundRef.current();
        stopTeaseSoundRef.current = null;
      }
      setSpinState("idle");
      setOffset(0);
      hasStartedSpinRef.current = false;
      hasStartedSlowdownRef.current = false;
    }
  }, [isSpinning, spinState]);

  // Helper to check if a symbol should show expansion effect
  const shouldShowExpansion = (symbolId: string): boolean => {
    return isExpanded && !!expandingSymbolId && symbolId === expandingSymbolId;
  };

  const shouldShowNewlyExpanded = (symbolId: string): boolean => {
    return isNewlyExpanded && !!expandingSymbolId && symbolId === expandingSymbolId;
  };

  // When idle or stopped, show just the final symbols
  if (spinState === "idle" || spinState === "stopped") {
    return (
      <div className="flex flex-col gap-[4px] xs:gap-[6px] sm:gap-[8px] md:gap-[12px] lg:gap-[16px]">
        {displayedSymbolIds.map((symbolId, rowIndex) => {
          const symbol = symbolsById.get(symbolId);
          if (!symbol) return null;

          const symbolIsExpanded = shouldShowExpansion(symbolId);
          const symbolIsNewlyExpanded = shouldShowNewlyExpanded(symbolId);

          return (
            <div
              key={`final-${rowIndex}-${symbolId}`}
              className={cn(
                spinState === "stopped" && "animate-[slot-land_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
              )}
              style={{
                animationFillMode: spinState === "stopped" ? "both" : undefined
              }}
            >
              <SlotSymbol
                symbol={symbol}
                isWinning={winningPositions.includes(rowIndex)}
                isSpinning={false}
                isExpanded={symbolIsExpanded}
                isNewlyExpanded={symbolIsNewlyExpanded}
                hasLanded={spinState === "stopped"}
                isTeasing={globalTeaseActive && hasLandedScatter && symbol.is_scatter}
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

  // Calculate blur amount based on speed
  const getBlurAmount = () => {
    if (spinState !== "spinning") return 0;
    const maxOffset = (reelStrip.length - 3) * totalSymbolHeight;
    const progress = 1 - (offset / maxOffset);
    // Blur is strongest at the start and fades as reel slows
    return Math.max(0, 8 * (1 - progress * progress));
  };

  const blurAmount = getBlurAmount();

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg bg-amber-950/50 transition-shadow duration-300",
        // Fake looping glow - only show when scatter has landed on previous reel
        !hasStartedSlowdownRef.current && scatterLandedOnPreviousReel &&
        "shadow-[0_0_15px_rgba(251,191,36,0.3),0_0_25px_rgba(251,191,36,0.15)] animate-pulse",
        // Active tease: Intense glow
        hasStartedSlowdownRef.current && teaseMode && 
        "shadow-[0_0_30px_rgba(251,191,36,0.9),0_0_60px_rgba(251,191,36,0.6),0_0_90px_rgba(251,191,36,0.3)] animate-[glow-intense_0.5s_ease-in-out_infinite]"
      )}
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
            isTeasing={false}
          />
        ))}
      </div>
      
      {/* Speed blur overlay effect */}
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
