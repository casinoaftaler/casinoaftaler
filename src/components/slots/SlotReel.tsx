import React, { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SlotSymbol } from "./SlotSymbol";
import { slotSounds } from "@/lib/slotSoundEffects";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

// Fixed dimensions at base resolution
const SYMBOL_HEIGHT = 150;
const GAP = 16;

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
  gameId?: string;
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
  gameId,
}: SlotReelProps) {
  const isWizard = gameId === "rise-of-fedesvin";
  
  const symbolsById = useMemo(() => new Map(symbols.map(s => [s.id, s])), [symbols]);
  const [spinState, setSpinState] = useState<"idle" | "spinning" | "stopping" | "stopped">("idle");
  const [offset, setOffset] = useState(0);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedSpinRef = useRef(false);
  const hasStartedSlowdownRef = useRef(false);
  const stopTeaseSoundRef = useRef<(() => void) | null>(null);

  const [reelStrip, setReelStrip] = useState<SlotSymbolType[]>([]);

  // Pre-generate a pool of random symbols once when symbols change, avoiding
  // repeated Math.random + array-index lookups during animation frames.
  const randomPoolRef = useRef<SlotSymbolType[]>([]);
  useEffect(() => {
    if (symbols.length === 0) return;
    const pool: SlotSymbolType[] = [];
    for (let i = 0; i < 60; i++) {
      pool.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
    randomPoolRef.current = pool;
  }, [symbols]);

  const poolIndexRef = useRef(0);

  const buildReelStrip = () => {
    const strip: SlotSymbolType[] = [];
    for (let i = 0; i < displayedSymbolIds.length; i++) {
      const symbol = symbolsById.get(displayedSymbolIds[i]);
      if (symbol) strip.push(symbol);
    }
    const pool = randomPoolRef.current;
    const poolLen = pool.length;
    if (poolLen === 0) return strip;
    let idx = poolIndexRef.current;
    for (let i = 0; i < 30; i++) {
      strip.push(pool[idx % poolLen]);
      idx++;
    }
    poolIndexRef.current = idx;
    return strip;
  };

  useEffect(() => {
    if (isSpinning && !hasStartedSpinRef.current) {
      if (spinState !== "idle") {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        setSpinState("idle");
        setOffset(0);
      }
      hasStartedSpinRef.current = true;
      hasStartedSlowdownRef.current = false;
      const strip = buildReelStrip();
      setReelStrip(strip);
      const totalSymbolHeight = SYMBOL_HEIGHT + GAP;
      const startOffset = (strip.length - 3) * totalSymbolHeight;
      setOffset(startOffset);
      setSpinState("spinning");
      const loopDuration = spinLoopMs;
      const fakeLoopStartTime = performance.now();
      const fakeLoopAnimate = (currentTime: number) => {
        if (!hasStartedSpinRef.current || hasStartedSlowdownRef.current) return;
        const elapsed = (currentTime - fakeLoopStartTime) % loopDuration;
        const loopProgress = elapsed / loopDuration;
        const loopOffset = startOffset * (1 - loopProgress);
        setOffset(loopOffset);
        animationRef.current = requestAnimationFrame(fakeLoopAnimate);
      };
      animationRef.current = requestAnimationFrame(fakeLoopAnimate);
    }
  }, [isSpinning]);

  useEffect(() => {
    if (shouldSlowDown && hasStartedSpinRef.current && !hasStartedSlowdownRef.current && spinState === "spinning") {
      hasStartedSlowdownRef.current = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (teaseMode && isActiveTeaseReel) {
        stopTeaseSoundRef.current = slotSounds.playActiveTeaseSlowdown(delay);
      }
      const strip = buildReelStrip();
      setReelStrip(strip);
      const totalSymbolHeight = SYMBOL_HEIGHT + GAP;
      const startOffset = (strip.length - 3) * totalSymbolHeight;
      setOffset(startOffset);
      const startTime = performance.now();
      const spinDuration = teaseMode ? 3000 : reelSlowdownMs;
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        const easeOut = teaseMode ? 1 - Math.pow(1 - progress, 5) : 1 - Math.pow(1 - progress, 2);
        const currentOffset = startOffset * (1 - easeOut);
        setOffset(currentOffset);
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          if (stopTeaseSoundRef.current) { stopTeaseSoundRef.current(); stopTeaseSoundRef.current = null; }
          setOffset(0);
          setSpinState("stopping");
          onReelStop?.(delay);
          setTimeout(() => {
            setSpinState("stopped");
            setTimeout(() => { setSpinState("idle"); hasStartedSpinRef.current = false; hasStartedSlowdownRef.current = false; }, 100);
          }, 50);
        }
      };
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [shouldSlowDown, spinState, teaseMode, isActiveTeaseReel, delay, onReelStop]);

  useEffect(() => {
    if (!isSpinning && spinState === "idle" && hasStartedSpinRef.current) {
      hasStartedSpinRef.current = false;
      hasStartedSlowdownRef.current = false;
      setOffset(0);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (stopTeaseSoundRef.current) { stopTeaseSoundRef.current(); stopTeaseSoundRef.current = null; }
    }
  }, [isSpinning, spinState]);

  useEffect(() => {
    if (!isSpinning && spinState !== "idle") {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (stopTeaseSoundRef.current) { stopTeaseSoundRef.current(); stopTeaseSoundRef.current = null; }
      setSpinState("idle");
      setOffset(0);
      hasStartedSpinRef.current = false;
      hasStartedSlowdownRef.current = false;
    }
  }, [isSpinning, spinState]);

  const shouldShowExpansion = (symbolId: string): boolean => isExpanded && !!expandingSymbolId && symbolId === expandingSymbolId;
  const shouldShowNewlyExpanded = (symbolId: string): boolean => isNewlyExpanded && !!expandingSymbolId && symbolId === expandingSymbolId;

  const totalSymbolHeight = SYMBOL_HEIGHT + GAP;
  const viewportHeight = 3 * SYMBOL_HEIGHT + 2 * GAP;

  const getBlurAmount = () => {
    if (spinState !== "spinning") return 0;
    const maxOffset = (reelStrip.length - 3) * totalSymbolHeight;
    if (maxOffset <= 0) return 0;
    const progress = 1 - (offset / maxOffset);
    return Math.max(0, 8 * (1 - progress * progress));
  };

  const blurAmount = getBlurAmount();
  const isAnimating = spinState === "spinning" || spinState === "stopping";

  const fakeLoopGlow = isWizard
    ? "shadow-[0_0_15px_rgba(168,85,247,0.3),0_0_25px_rgba(168,85,247,0.15)] animate-pulse"
    : "shadow-[0_0_15px_rgba(251,191,36,0.3),0_0_25px_rgba(251,191,36,0.15)] animate-pulse";
  const activeTeaseGlow = isWizard
    ? "shadow-[0_0_30px_rgba(168,85,247,0.9),0_0_60px_rgba(168,85,247,0.6),0_0_90px_rgba(168,85,247,0.3)] animate-[glow-intense-wizard_0.5s_ease-in-out_infinite]"
    : "shadow-[0_0_30px_rgba(251,191,36,0.9),0_0_60px_rgba(251,191,36,0.6),0_0_90px_rgba(251,191,36,0.3)] animate-[glow-intense_0.5s_ease-in-out_infinite]";

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg transition-shadow duration-300",
        isAnimating && (isWizard ? "bg-purple-950/50" : "bg-amber-950/50"),
        !hasStartedSlowdownRef.current && scatterLandedOnPreviousReel && isAnimating && fakeLoopGlow,
        hasStartedSlowdownRef.current && teaseMode && isAnimating && activeTeaseGlow
      )}
      style={{ 
        height: `${viewportHeight}px`,
        width: `${SYMBOL_HEIGHT}px`
      }}
    >
      {isAnimating ? (
        <div 
          className="absolute left-0 right-0 flex flex-col"
          style={{ 
            transform: `translateY(-${offset}px)`,
            gap: `${GAP}px`,
            filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
            transition: spinState === "stopping" ? 'filter 0.2s ease-out' : 'none',
          }}
        >
          {reelStrip.map((symbol, index) => (
            <SlotSymbol key={`reel-${index}-${symbol.id}`} symbol={symbol} isSpinning={true} isTeasing={false} gameId={gameId} />
          ))}
        </div>
      ) : (
        <div className="absolute left-0 right-0 flex flex-col" style={{ gap: `${GAP}px` }}>
          {displayedSymbolIds.map((symbolId, rowIndex) => {
            const symbol = symbolsById.get(symbolId);
            if (!symbol) return null;
            const symbolIsExpanded = shouldShowExpansion(symbolId);
            const symbolIsNewlyExpanded = shouldShowNewlyExpanded(symbolId);
            const shouldDarkenSymbol = (isDarkenedForTease && !symbol.is_scatter) || isDarkenedForExpansion;
            return (
              <div
                key={`final-${rowIndex}-${symbolId}`}
                className={cn(spinState === "stopped" && "animate-[slot-land_0.4s_cubic-bezier(0.34,1.56,0.64,1)]")}
                style={{ animationFillMode: spinState === "stopped" ? "both" : undefined }}
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
                  gameId={gameId}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
