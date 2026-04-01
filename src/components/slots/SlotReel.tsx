import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { SlotSymbol } from "./SlotSymbol";
import { slotSounds } from "@/lib/slotSoundEffects";
import { useIdleShimmer } from "@/hooks/useIdleShimmer";
import type { SlotSymbol as SlotSymbolType } from "@/lib/slotGameLogic";

// Fixed dimensions at base resolution
const SYMBOL_HEIGHT = 150;
const GAP = 16;
const TOTAL_SYMBOL_HEIGHT = SYMBOL_HEIGHT + GAP;
const VIEWPORT_HEIGHT = 3 * SYMBOL_HEIGHT + 2 * GAP;

interface SlotReelProps {
  symbols: SlotSymbolType[];
  displayedSymbolIds: string[];
  isSpinning: boolean;
  isBonusActive?: boolean;
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
  isBonusActive = false,
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
  const isBonanza = gameId === "fedesvin-bonanza";
  const shimmerTheme = isBonanza ? "slot-idle-shimmer-pink" : isWizard ? "slot-idle-shimmer-purple" : "slot-idle-shimmer-gold";
  
  const symbolsById = useMemo(() => new Map(symbols.map(s => [s.id, s])), [symbols]);
  const [spinState, setSpinState] = useState<"idle" | "spinning" | "stopping" | "stopped">("idle");
  const shimmeringCells = useIdleShimmer(3, !isSpinning && spinState === "idle" && !isBonusActive);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stripContainerRef = useRef<HTMLDivElement>(null);
  const hasStartedSpinRef = useRef(false);
  const hasStartedSlowdownRef = useRef(false);
  const stopTeaseSoundRef = useRef<(() => void) | null>(null);

  const [reelStrip, setReelStrip] = useState<SlotSymbolType[]>([]);

  // Pre-generate a pool of random symbols once when symbols change
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

  const buildReelStrip = useCallback(() => {
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
  }, [displayedSymbolIds, symbolsById]);

  // Direct DOM update for offset — bypasses React re-render entirely
  const applyOffset = useCallback((offset: number, blur: number, isSlowing: boolean) => {
    const el = stripContainerRef.current;
    if (!el) return;
    el.style.transform = `translateY(-${offset}px)`;
    el.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
    el.style.transition = isSlowing ? 'filter 0.2s ease-out' : 'none';
  }, []);

  useEffect(() => {
    if (isSpinning && !hasStartedSpinRef.current) {
      if (spinState !== "idle") {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        setSpinState("idle");
      }
      hasStartedSpinRef.current = true;
      hasStartedSlowdownRef.current = false;
      const strip = buildReelStrip();
      setReelStrip(strip);
      const startOffset = (strip.length - 3) * TOTAL_SYMBOL_HEIGHT;
      setSpinState("spinning");
      const loopDuration = spinLoopMs;
      const maxOffset = startOffset;
      const fakeLoopStartTime = performance.now();
      const fakeLoopAnimate = (currentTime: number) => {
        if (!hasStartedSpinRef.current || hasStartedSlowdownRef.current) return;
        const elapsed = (currentTime - fakeLoopStartTime) % loopDuration;
        const loopProgress = elapsed / loopDuration;
        const loopOffset = startOffset * (1 - loopProgress);
        // Compute blur inline
        const progress = 1 - (loopOffset / maxOffset);
        const blur = Math.max(0, 8 * (1 - progress * progress));
        applyOffset(loopOffset, blur, false);
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
      const startOffset = (strip.length - 3) * TOTAL_SYMBOL_HEIGHT;
      const startTime = performance.now();
      const spinDuration = teaseMode ? 3000 : reelSlowdownMs;
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        const easeOut = teaseMode ? 1 - Math.pow(1 - progress, 5) : 1 - Math.pow(1 - progress, 2);
        const currentOffset = startOffset * (1 - easeOut);
        // Skip blur during tease to avoid expensive per-frame filter repaints
        const blur = teaseMode ? 0 : Math.max(0, 8 * (1 - Math.pow(easeOut, 2)));
        applyOffset(currentOffset, blur, true);
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          if (stopTeaseSoundRef.current) { stopTeaseSoundRef.current(); stopTeaseSoundRef.current = null; }
          applyOffset(0, 0, false);
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
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (stopTeaseSoundRef.current) { stopTeaseSoundRef.current(); stopTeaseSoundRef.current = null; }
    }
  }, [isSpinning, spinState]);

  useEffect(() => {
    if (!isSpinning && spinState !== "idle") {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (stopTeaseSoundRef.current) { stopTeaseSoundRef.current(); stopTeaseSoundRef.current = null; }
      setSpinState("idle");
      hasStartedSpinRef.current = false;
      hasStartedSlowdownRef.current = false;
    }
  }, [isSpinning, spinState]);

  const shouldShowExpansion = (symbolId: string): boolean => isExpanded && !!expandingSymbolId && symbolId === expandingSymbolId;
  const shouldShowNewlyExpanded = (symbolId: string): boolean => isNewlyExpanded && !!expandingSymbolId && symbolId === expandingSymbolId;

  const isAnimating = spinState === "spinning" || spinState === "stopping";

  // Use simple static shadows instead of animated box-shadow keyframes to avoid repaint lag
  const fakeLoopGlow = isWizard
    ? "shadow-[0_0_12px_rgba(168,85,247,0.25)]"
    : "shadow-[0_0_12px_rgba(251,191,36,0.25)]";
  const activeTeaseGlow = isWizard
    ? "shadow-[0_0_20px_rgba(168,85,247,0.7),0_0_40px_rgba(168,85,247,0.3)] ring-2 ring-purple-400/50"
    : "shadow-[0_0_20px_rgba(251,191,36,0.7),0_0_40px_rgba(251,191,36,0.3)] ring-2 ring-amber-400/50";

  // Memoize spinning strip symbols to avoid re-creating JSX on every render
  const spinningStripJsx = useMemo(() => {
    if (reelStrip.length === 0) return null;
    return reelStrip.map((symbol, index) => (
      <SlotSymbol key={`reel-${index}-${symbol.id}`} symbol={symbol} isSpinning={true} isTeasing={false} gameId={gameId} />
    ));
  }, [reelStrip, gameId]);

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
        height: `${VIEWPORT_HEIGHT}px`,
        width: `${SYMBOL_HEIGHT}px`
      }}
    >
      {isAnimating ? (
        <div 
          ref={stripContainerRef}
          className="absolute left-0 right-0 flex flex-col"
          style={{ gap: `${GAP}px`, willChange: 'transform, filter' }}
        >
          {spinningStripJsx}
        </div>
      ) : (
        <div className="absolute left-0 right-0 flex flex-col" style={{ gap: `${GAP}px` }}>
          {displayedSymbolIds.map((symbolId, rowIndex) => {
            const symbol = symbolsById.get(symbolId);
            if (!symbol) return null;
            const symbolIsExpanded = shouldShowExpansion(symbolId);
            const symbolIsNewlyExpanded = shouldShowNewlyExpanded(symbolId);
            const shouldDarkenSymbol = !symbolIsExpanded && ((isDarkenedForTease && !symbol.is_scatter) || isDarkenedForExpansion);
            return (
              <div
                key={`final-${rowIndex}-${symbolId}`}
                className={cn(
                  spinState === "stopped" && "animate-[slot-land_0.4s_cubic-bezier(0.34,1.56,0.64,1)]",
                  spinState === "idle" && !isSpinning && !isBonusActive && `relative slot-cell-idle-hover slot-cell-idle-hover-${isBonanza ? "pink" : isWizard ? "purple" : "gold"}`
                )}
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
                    shimmerClass={shimmeringCells.has(rowIndex) && spinState === "idle" ? `slot-idle-shimmer ${shimmerTheme}` : undefined}
                  />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
