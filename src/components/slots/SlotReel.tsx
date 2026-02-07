import React, { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SlotSymbol } from "./SlotSymbol";
import { slotSounds } from "@/lib/slotSoundEffects";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";
import { useResponsiveSlotDimensions } from "@/hooks/useResponsiveSlotDimensions";

interface SlotReelProps {
  symbols: SlotSymbolType[];
  displayedSymbolIds: string[];
  isSpinning: boolean;
  winningPositions?: number[];
  isExpanded?: boolean;
  isNewlyExpanded?: boolean;
  expandingSymbolId?: string;
  delay?: number;
  shouldSlowDown?: boolean;
  spinLoopMs?: number;
  reelSlowdownMs?: number;
  onReelStop?: (reelIndex: number) => void;
  teaseMode?: boolean;
  isActiveTeaseReel?: boolean;
  scatterLandedOnPreviousReel?: boolean;
  extendedFakeLoop?: boolean;
  globalTeaseActive?: boolean;
  hasLandedScatter?: boolean;
  isScatterCelebrating?: boolean;
  isDarkenedForTease?: boolean;
  isDarkenedForExpansion?: boolean;
}

export const SlotReel = React.memo(function SlotReel({
  symbols,
  displayedSymbolIds,
  isSpinning,
  winningPositions = [],
  isExpanded = false,
  isNewlyExpanded = false,
  expandingSymbolId,
  delay = 0,
  shouldSlowDown = false,
  spinLoopMs = 400,
  reelSlowdownMs = 300,
  onReelStop,
  teaseMode = false,
  isActiveTeaseReel = false,
  scatterLandedOnPreviousReel = false,
  extendedFakeLoop = false,
  globalTeaseActive = false,
  hasLandedScatter = false,
  isScatterCelebrating = false,
  isDarkenedForTease = false,
  isDarkenedForExpansion = false,
}: SlotReelProps) {
  // Use cached responsive dimensions
  const { symbolSize: symbolHeight, gap } = useResponsiveSlotDimensions();
  
  const symbolsById = useMemo(() => new Map(symbols.map(s => [s.id, s])), [symbols]);
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


  // Start fake loop when spinning begins - ALL reels use this now
  useEffect(() => {
    if (isSpinning && !hasStartedSpinRef.current) {
      // Ensure we're in a clean idle state before starting
      if (spinState !== "idle") {
        // Force reset to idle first
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        setSpinState("idle");
        setOffset(0);
      }
      
      hasStartedSpinRef.current = true;
      hasStartedSlowdownRef.current = false;
      
      // Build reel strip
      const strip = buildReelStrip();
      setReelStrip(strip);
      
      const totalSymbolHeight = symbolHeight + gap;
      const startOffset = (strip.length - 3) * totalSymbolHeight;
      setOffset(startOffset);
      
      // Start fake loop immediately
      setSpinState("spinning");
      
      const loopDuration = spinLoopMs; // Use configurable speed
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
      
      const totalSymbolHeight = symbolHeight + gap;
      const startOffset = (strip.length - 3) * totalSymbolHeight;
      setOffset(startOffset);
      
      const startTime = performance.now();
      // Tease reels get longer slowdown (3s), normal reels use configurable speed
      const spinDuration = teaseMode ? 3000 : reelSlowdownMs;
      
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

  // Compute viewport dimensions consistently for ALL states
  const totalSymbolHeight = symbolHeight + gap;
  const viewportHeight = 3 * symbolHeight + 2 * gap;

  // Calculate blur amount based on speed (only during spinning)
  const getBlurAmount = () => {
    if (spinState !== "spinning") return 0;
    const maxOffset = (reelStrip.length - 3) * totalSymbolHeight;
    if (maxOffset <= 0) return 0;
    const progress = 1 - (offset / maxOffset);
    return Math.max(0, 8 * (1 - progress * progress));
  };

  const blurAmount = getBlurAmount();
  const isAnimating = spinState === "spinning" || spinState === "stopping";

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg transition-shadow duration-300",
        isAnimating && "bg-amber-950/50",
        // Fake looping glow - only show when scatter has landed on previous reel
        !hasStartedSlowdownRef.current && scatterLandedOnPreviousReel && isAnimating &&
        "shadow-[0_0_15px_rgba(251,191,36,0.3),0_0_25px_rgba(251,191,36,0.15)] animate-pulse",
        // Active tease: Intense glow
        hasStartedSlowdownRef.current && teaseMode && isAnimating &&
        "shadow-[0_0_30px_rgba(251,191,36,0.9),0_0_60px_rgba(251,191,36,0.6),0_0_90px_rgba(251,191,36,0.3)] animate-[glow-intense_0.5s_ease-in-out_infinite]"
      )}
      style={{ 
        height: `${viewportHeight}px`,
        width: `${symbolHeight}px`
      }}
    >
      {isAnimating ? (
        /* Spinning/stopping: animated reel strip */
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
      ) : (
        /* Idle/stopped: final symbols in same container */
        <div 
          className="absolute left-0 right-0 flex flex-col"
          style={{ gap: `${gap}px` }}
        >
          {displayedSymbolIds.map((symbolId, rowIndex) => {
            const symbol = symbolsById.get(symbolId);
            if (!symbol) return null;

            const symbolIsExpanded = shouldShowExpansion(symbolId);
            const symbolIsNewlyExpanded = shouldShowNewlyExpanded(symbolId);
            const shouldDarkenSymbol = (isDarkenedForTease && !symbol.is_scatter) || isDarkenedForExpansion;

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
                  isScatterCelebrating={isScatterCelebrating && symbol.is_scatter}
                  isDarkened={shouldDarkenSymbol}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
