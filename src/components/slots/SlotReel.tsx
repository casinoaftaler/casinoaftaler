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
  expandingSymbolId?: string;  // Only symbols matching this ID show expansion effect
  delay?: number;
  onReelStop?: (reelIndex: number) => void;  // Callback when reel stops
  teaseMode?: boolean;  // Whether this reel should tease (slow reveal)
  isActiveTeaseReel?: boolean;  // Whether this tease reel should currently slow down
  scatterLandedOnPreviousReel?: boolean;  // Whether the scatter on previous reel has landed
  extendedFakeLoop?: boolean;  // Whether to extend the fake loop duration (for late scatter)
}

// Match the responsive symbol sizes from SlotSymbol - REDUCED FOR MOBILE
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
  onReelStop,
  teaseMode = false,
  isActiveTeaseReel = false,
  scatterLandedOnPreviousReel = false,
  extendedFakeLoop = false,
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

  // Track if we're in fake loop mode for tease reels waiting their turn
  const [isFakeLooping, setIsFakeLooping] = useState(false);
  const fakeLoopStartTimeRef = useRef<number>(0);
  const activeTeaseStartedRef = useRef(false);
  const stopTeaseSoundRef = useRef<(() => void) | null>(null);

  // Start spinning when isSpinning becomes true
  useEffect(() => {
    if (isSpinning && !hasStartedSpinRef.current) {
      hasStartedSpinRef.current = true;
      activeTeaseStartedRef.current = false;
      
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
        
        // For tease reels that aren't active yet, start fake loop
        if (teaseMode && !isActiveTeaseReel) {
          setIsFakeLooping(true);
          fakeLoopStartTimeRef.current = startTime;
          
          // Fake loop animation - constant speed, loops back
          // Extended duration when 2nd scatter is on reel 4 (late scatter)
          const loopDuration = extendedFakeLoop ? 2600 : 600; // Time for one full loop cycle
          
          const fakeLoopAnimate = (currentTime: number) => {
            if (!hasStartedSpinRef.current) return;
            
            const elapsed = (currentTime - fakeLoopStartTimeRef.current) % loopDuration;
            const loopProgress = elapsed / loopDuration;
            // Loop from startOffset back to startOffset (creates seamless loop illusion)
            const loopOffset = startOffset * (1 - loopProgress);
            setOffset(loopOffset);
            
            animationRef.current = requestAnimationFrame(fakeLoopAnimate);
          };
          
          animationRef.current = requestAnimationFrame(fakeLoopAnimate);
          return; // Don't proceed with normal stop logic
        }
        
        // Normal spin or active tease reel - calculate duration
        // Base spin duration - much longer for active tease (3 seconds slowdown)
        const baseSpinDuration = (teaseMode && isActiveTeaseReel) ? 3000 : 1000;
        // Each reel stops with stagger for non-tease reels
        const reelStopDelay = teaseMode ? 0 : delay * 350;
        const spinDuration = baseSpinDuration + reelStopDelay;
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / spinDuration, 1);
          
          // Smooth easing - much slower ease out for active tease mode
          const easeOutQuad = (teaseMode && isActiveTeaseReel)
            ? 1 - Math.pow(1 - progress, 5)  // Very slow deceleration for tease
            : 1 - Math.pow(1 - progress, 2); // Normal ease out
          
          // Animate from startOffset down to 0 (symbols move UP on screen)
          const currentOffset = startOffset * (1 - easeOutQuad);
          setOffset(currentOffset);
          
          if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
          } else {
            // Ensure we land exactly at 0
            setOffset(0);
            setSpinState("stopping");
            setIsFakeLooping(false);
            // Trigger the reel stop callback
            onReelStop?.(delay);
            // Small settle effect at the end
            setTimeout(() => {
              setSpinState("stopped");
              // Reset for next spin after showing result
              setTimeout(() => {
                setSpinState("idle");
                hasStartedSpinRef.current = false;
                activeTeaseStartedRef.current = false;
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
  }, [isSpinning, delay, teaseMode, isActiveTeaseReel]);

  // Handle transition from fake loop to active tease slowdown
  useEffect(() => {
    if (isFakeLooping && isActiveTeaseReel && !activeTeaseStartedRef.current) {
      activeTeaseStartedRef.current = true;
      setIsFakeLooping(false);
      
      // Start intense tease slowdown sound
      stopTeaseSoundRef.current = slotSounds.playActiveTeaseSlowdown(delay);
      
      // Cancel the fake loop animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Rebuild reel strip with fresh random symbols for the slowdown
      const strip = buildReelStrip();
      setReelStrip(strip);
      
      const symbolHeight = getSymbolHeight();
      const gap = getGap();
      const totalSymbolHeight = symbolHeight + gap;
      const startOffset = (strip.length - 3) * totalSymbolHeight;
      setOffset(startOffset);
      
      const startTime = performance.now();
      const spinDuration = 3000; // 3 second slowdown for tease
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Very slow deceleration for dramatic effect
        const easeOut = 1 - Math.pow(1 - progress, 5);
        
        const currentOffset = startOffset * (1 - easeOut);
        setOffset(currentOffset);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Stop the tease sound when reel lands
          if (stopTeaseSoundRef.current) {
            stopTeaseSoundRef.current();
            stopTeaseSoundRef.current = null;
          }
          setOffset(0);
          setSpinState("stopping");
          onReelStop?.(delay);
          setTimeout(() => {
            setSpinState("stopped");
            setTimeout(() => {
              setSpinState("idle");
              hasStartedSpinRef.current = false;
              activeTeaseStartedRef.current = false;
            }, 100);
          }, 50);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isFakeLooping, isActiveTeaseReel, delay, onReelStop]);

  // Reset when isSpinning goes false AND we're done animating
  useEffect(() => {
    if (!isSpinning && spinState === "idle" && hasStartedSpinRef.current) {
      hasStartedSpinRef.current = false;
      activeTeaseStartedRef.current = false;
      setIsFakeLooping(false);
      setOffset(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Stop tease sound if still playing
      if (stopTeaseSoundRef.current) {
        stopTeaseSoundRef.current();
        stopTeaseSoundRef.current = null;
      }
    }
  }, [isSpinning, spinState]);

  // Helper to check if a symbol should show expansion effect
  const shouldShowExpansion = (symbolId: string): boolean => {
    // Only show expansion if:
    // 1. This reel is marked as expanded
    // 2. We have an expanding symbol ID
    // 3. The symbol matches the expanding symbol
    return isExpanded && !!expandingSymbolId && symbolId === expandingSymbolId;
  };

  const shouldShowNewlyExpanded = (symbolId: string): boolean => {
    return isNewlyExpanded && !!expandingSymbolId && symbolId === expandingSymbolId;
  };

  // When idle, show just the final symbols (same as spinning at offset 0)
  // When stopped, also show final symbols with a small bounce animation
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
                isTeasing={symbol.is_scatter && scatterLandedOnPreviousReel && spinState !== "stopped"}
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
      className={cn(
        "relative overflow-hidden rounded-lg bg-amber-950/50 transition-shadow duration-300",
        // Fake looping: Dimmed amber glow - ONLY show when scatter has landed on previous reel
        isFakeLooping && !isActiveTeaseReel && spinState === "spinning" && scatterLandedOnPreviousReel &&
        "shadow-[0_0_15px_rgba(251,191,36,0.3),0_0_25px_rgba(251,191,36,0.15)] animate-pulse",
        // Active tease: Intense glow with faster animation
        isActiveTeaseReel && spinState === "spinning" && 
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
            isTeasing={(isFakeLooping && scatterLandedOnPreviousReel) || isActiveTeaseReel}
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
