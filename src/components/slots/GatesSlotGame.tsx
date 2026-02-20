import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useServerSpin } from "@/hooks/useServerSpin";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { slotSounds } from "@/lib/slotSoundEffects";
import { SlotControlPanel } from "./SlotControlPanel";
import { SlotSymbol as SlotSymbolComponent } from "./SlotSymbol";
import { WinCelebration } from "./WinCelebration";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";
import {
  GATES_COLS, GATES_ROWS, generateGatesDisplayGrid,
  flatToColRow, type GatesWin, type MultiplierOrb, type TumbleStep,
} from "@/lib/gatesGameLogic";
import type { SlotSymbol } from "@/lib/slotGameLogic";

const SYMBOL_SIZE = 100;
const SYMBOL_GAP = 4;

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface GatesSlotGameProps {
  gameId?: string;
}

export function GatesSlotGame({ gameId = "gates-of-fedesvin" }: GatesSlotGameProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols(gameId);
  const { spinsRemaining, maxSpins, canSpin, hasEnoughSpins } = useSlotSpins();
  const { settings: slotSettings } = useSlotSettings();
  const { data: siteSettings } = useSiteSettings();
  const { spin: serverSpin } = useServerSpin(gameId);
  const theme = getSlotTheme(gameId);

  const [bet, setBet] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [isWinAnimating, setIsWinAnimating] = useState(false);
  const [winningPositions, setWinningPositions] = useState<Set<number>>(new Set());
  const [multiplierOrbs, setMultiplierOrbs] = useState<MultiplierOrb[]>([]);
  const [totalMultiplier, setTotalMultiplier] = useState(0);
  const [tumblePhase, setTumblePhase] = useState<'idle' | 'spinning' | 'showing-wins' | 'tumbling'>('idle');
  const [currentTumbleStep, setCurrentTumbleStep] = useState(0);
  
  // Bonus state
  const [isBonusActive, setIsBonusActive] = useState(false);
  const [freeSpinsRemaining, setFreeSpinsRemaining] = useState(0);
  const [totalFreeSpins, setTotalFreeSpins] = useState(0);
  const [bonusWinnings, setBonusWinnings] = useState(0);
  const [cumulativeMultiplier, setCumulativeMultiplier] = useState(0);
  const [showBonusTrigger, setShowBonusTrigger] = useState(false);
  const [showBonusComplete, setShowBonusComplete] = useState(false);

  const spinLockRef = useRef(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState<AutoSpinCount>(10);
  const [autoSpinsRemaining, setAutoSpinsRemaining] = useState<number | null>(null);
  const autoSpinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldStopAutoSpinRef = useRef(false);

  // Initialize grid
  useEffect(() => {
    if (symbols && symbols.length > 0 && !grid) {
      setGrid(generateGatesDisplayGrid(symbols));
    }
  }, [symbols, grid]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
    };
  }, []);

  const symbolsById = useMemo(() => {
    if (!symbols) return new Map<string, SlotSymbol>();
    return new Map(symbols.map(s => [s.id, s]));
  }, [symbols]);

  const stopAutoSpin = useCallback(() => {
    setIsAutoSpinning(false);
    setAutoSpinsRemaining(null);
    shouldStopAutoSpinRef.current = true;
    if (autoSpinTimeoutRef.current) { clearTimeout(autoSpinTimeoutRef.current); autoSpinTimeoutRef.current = null; }
  }, []);

  const startAutoSpin = useCallback(() => {
    setIsAutoSpinning(true);
    setAutoSpinsRemaining(autoSpinCount === "infinite" ? null : autoSpinCount);
    shouldStopAutoSpinRef.current = false;
  }, [autoSpinCount]);

  const toggleAutoSpin = useCallback(() => {
    if (isAutoSpinning) stopAutoSpin(); else startAutoSpin();
  }, [isAutoSpinning, stopAutoSpin, startAutoSpin]);

  // Process tumble steps sequentially
  const processTumbleSteps = useCallback(async (steps: TumbleStep[]) => {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setCurrentTumbleStep(i);
      setGrid(step.grid);
      
      if (step.wins.length > 0) {
        // Show winning positions
        setTumblePhase('showing-wins');
        setWinningPositions(new Set(step.winningPositions));
        setMultiplierOrbs(step.multiplierOrbs);
        
        // Wait for win highlight animation
        await new Promise(r => setTimeout(r, 1200));
        
        // Tumble phase - remove winning symbols
        setTumblePhase('tumbling');
        await new Promise(r => setTimeout(r, 600));
        
        setWinningPositions(new Set());
      } else {
        // No wins - just show the final grid briefly
        setMultiplierOrbs(step.multiplierOrbs);
        await new Promise(r => setTimeout(r, 300));
      }
    }
  }, []);

  const handleSpin = useCallback(async () => {
    if (spinLockRef.current || !symbols || !user || isSpinning) return;
    if (showBonusTrigger || showBonusComplete) return;
    
    const isBonusSpin = isBonusActive && freeSpinsRemaining > 0;
    if (!isBonusSpin && !hasEnoughSpins(bet)) return;

    spinLockRef.current = true;
    setIsSpinning(true);
    setTumblePhase('spinning');
    setWinAmount(0);
    setIsWinAnimating(false);
    setWinningPositions(new Set());
    setMultiplierOrbs([]);

    slotSounds.playSpinStart();

    try {
      const response = await serverSpin(bet, isBonusSpin);
      if (!response) throw new Error("Spin failed");

      const result = response.result as any;
      
      if (result.tumbleSteps) {
        // Gates-style result
        await processTumbleSteps(result.tumbleSteps);
        
        setTotalMultiplier(result.totalMultiplier || 0);
        const totalWin = result.totalWin || 0;
        setWinAmount(totalWin);
        
        if (totalWin > 0) {
          setIsWinAnimating(true);
          if (totalWin >= bet * 10) {
            slotSounds.playBigWin();
          } else if (totalWin >= bet * 3) {
            slotSounds.playMediumWin();
          } else {
            slotSounds.playSmallWin();
          }
          // Invalidate leaderboard
          queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
        }

        // Handle bonus state
        if (response.bonusState) {
          const bs = response.bonusState as any;
          if (bs.isActive !== undefined) {
            if (!isBonusActive && bs.freeSpinsRemaining > 0) {
              // New bonus triggered
              setShowBonusTrigger(true);
              setTimeout(() => {
                setShowBonusTrigger(false);
                setIsBonusActive(true);
                setFreeSpinsRemaining(bs.freeSpinsRemaining);
                setTotalFreeSpins(bs.totalFreeSpins);
                setBonusWinnings(bs.bonusWinnings || 0);
                setCumulativeMultiplier(bs.cumulativeMultiplier || 0);
              }, 3000);
            } else {
              setFreeSpinsRemaining(bs.freeSpinsRemaining);
              setTotalFreeSpins(bs.totalFreeSpins);
              setBonusWinnings(bs.bonusWinnings || 0);
              setCumulativeMultiplier(bs.cumulativeMultiplier || 0);
              
              if (bs.freeSpinsRemaining <= 0) {
                setShowBonusComplete(true);
                setTimeout(() => {
                  setShowBonusComplete(false);
                  setIsBonusActive(false);
                  setCumulativeMultiplier(0);
                }, 4000);
              }
            }
          }
        }

        // Update spins remaining
        if (response.spinsRemaining !== undefined) {
          queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
        }
      }
    } catch (err) {
      console.error("Gates spin error:", err);
      toast.error("Der opstod en fejl. Prøv igen.");
    } finally {
      setIsSpinning(false);
      setTumblePhase('idle');
      spinLockRef.current = false;

      // Auto-spin
      if (isAutoSpinning && !shouldStopAutoSpinRef.current) {
        if (autoSpinsRemaining !== null) {
          const newCount = autoSpinsRemaining - 1;
          setAutoSpinsRemaining(newCount);
          if (newCount <= 0) { stopAutoSpin(); return; }
        }
        autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 1500);
      }
    }
  }, [symbols, user, isSpinning, bet, isBonusActive, freeSpinsRemaining, hasEnoughSpins, serverSpin, processTumbleSteps, queryClient, isAutoSpinning, autoSpinsRemaining, stopAutoSpin, showBonusTrigger, showBonusComplete]);

  // Auto-spin trigger
  useEffect(() => {
    if (isAutoSpinning && !isSpinning && !showBonusTrigger && !showBonusComplete) {
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [isAutoSpinning]);

  if (symbolsLoading || !symbols) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  const gridWidth = GATES_COLS * (SYMBOL_SIZE + SYMBOL_GAP) + SYMBOL_GAP;
  const gridHeight = GATES_ROWS * (SYMBOL_SIZE + SYMBOL_GAP) + SYMBOL_GAP;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Bonus status bar */}
      {isBonusActive && (
        <div className={cn(
          "w-full max-w-[700px] flex items-center justify-between px-4 py-2 rounded-lg border",
          "bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-blue-950/90",
          "border-blue-500/30 text-blue-100"
        )}>
          <span className="text-sm font-medium">
            Free Spins: <span className="text-blue-400 font-bold">{freeSpinsRemaining}/{totalFreeSpins}</span>
          </span>
          <span className="text-sm font-medium">
            Multiplier: <span className="text-yellow-400 font-bold">x{cumulativeMultiplier}</span>
          </span>
          <span className="text-sm font-medium">
            Bonus: <span className="text-green-400 font-bold">{bonusWinnings.toLocaleString()}</span>
          </span>
        </div>
      )}

      {/* Bonus trigger overlay */}
      {showBonusTrigger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-300 to-blue-400 animate-pulse">
              ⚡ FREE SPINS ⚡
            </div>
            <div className="text-3xl font-bold text-blue-100">15 Gratis Spins!</div>
            <div className="text-lg text-blue-300/80">Alle multipliers akkumuleres!</div>
          </div>
        </div>
      )}

      {/* Bonus complete overlay */}
      {showBonusComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="text-4xl font-black text-yellow-400">Bonus Færdig!</div>
            <div className="text-5xl font-bold text-blue-100">{bonusWinnings.toLocaleString()} POINT</div>
            <div className="text-lg text-blue-300/80">Total Multiplier: x{cumulativeMultiplier}</div>
          </div>
        </div>
      )}

      {/* Win celebration */}
      {isWinAnimating && winAmount > 0 && (
        <WinCelebration
          isActive={true}
          winAmount={winAmount}
          bet={bet}
          onAnimationComplete={() => setIsWinAnimating(false)}
          gameId={gameId}
        />
      )}

      {/* Main game grid */}
      <div 
        className={cn(
          "relative rounded-xl border-2 overflow-hidden",
          "bg-gradient-to-b from-blue-950/95 via-slate-950/90 to-blue-950/95",
          "border-blue-500/30"
        )}
        style={{
          width: gridWidth,
          height: gridHeight,
          boxShadow: '0 0 40px rgba(59,130,246,0.2), 0 0 80px rgba(59,130,246,0.1)',
        }}
      >
        {/* Grid of symbols */}
        <div 
          className="relative"
          style={{ 
            display: 'grid',
            gridTemplateColumns: `repeat(${GATES_COLS}, ${SYMBOL_SIZE}px)`,
            gridTemplateRows: `repeat(${GATES_ROWS}, ${SYMBOL_SIZE}px)`,
            gap: `${SYMBOL_GAP}px`,
            padding: `${SYMBOL_GAP}px`,
          }}
        >
          {grid && Array.from({ length: GATES_ROWS }).map((_, row) => (
            Array.from({ length: GATES_COLS }).map((_, col) => {
              const symbolId = grid[col]?.[row];
              const symbol = symbolId ? symbolsById.get(symbolId) : null;
              const flatIndex = col * GATES_ROWS + row;
              const isWinning = winningPositions.has(flatIndex);
              const orb = multiplierOrbs.find(o => o.position === flatIndex);
              
              return (
                <div 
                  key={`${col}-${row}`}
                  className={cn(
                    "relative rounded-lg overflow-hidden transition-all duration-300",
                    "bg-blue-950/50 border border-blue-500/10",
                    isWinning && "gates-win-highlight",
                    tumblePhase === 'spinning' && "opacity-80",
                  )}
                  style={{ width: SYMBOL_SIZE, height: SYMBOL_SIZE }}
                >
                  {symbol && (
                    <div className="w-full h-full flex items-center justify-center">
                      {symbol.image_url ? (
                        <img 
                          src={symbol.image_url} 
                          alt={symbol.name}
                          className="w-[85%] h-[85%] object-contain"
                          draggable={false}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-blue-200">{symbol.name.charAt(0)}</span>
                      )}
                    </div>
                  )}
                  
                  {/* Multiplier orb overlay */}
                  {orb && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 gates-multiplier-pulse">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center border-2 border-yellow-400/80 shadow-lg">
                        <span className="text-sm font-black text-yellow-200">{orb.value}x</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ))}
        </div>

        {/* Spinning overlay */}
        {tumblePhase === 'spinning' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
          </div>
        )}
      </div>

      {/* Win display */}
      {winAmount > 0 && !isSpinning && (
        <div className={cn(
          "px-6 py-2 rounded-full border font-bold text-lg",
          "bg-gradient-to-r from-blue-900/80 to-blue-950/80",
          "border-blue-500/40 text-blue-100",
          totalMultiplier > 1 && "border-yellow-500/50"
        )}>
          GEVINST: {winAmount.toLocaleString()} POINT
          {totalMultiplier > 1 && (
            <span className="text-yellow-400 ml-2">(x{totalMultiplier})</span>
          )}
        </div>
      )}

      {/* Control panel */}
      <div className="w-full max-w-[700px]">
        <SlotControlPanel
          bet={bet}
          onBetChange={setBet}
          onSpin={handleSpin}
          isSpinning={isSpinning || tumblePhase !== 'idle'}
          canSpin={canSpin}
          spinsRemaining={spinsRemaining}
          maxSpins={maxSpins}
          isAutoSpinning={isAutoSpinning}
          autoSpinCount={autoSpinCount}
          autoSpinsRemaining={autoSpinsRemaining}
          onAutoSpinCountChange={setAutoSpinCount}
          onAutoSpinToggle={toggleAutoSpin}
          bonusState={{ isActive: isBonusActive, freeSpinsRemaining: 0 }}
          bonusLoaded={true}
          winAmount={winAmount}
          gameId={gameId}
        />
      </div>
    </div>
  );
}
