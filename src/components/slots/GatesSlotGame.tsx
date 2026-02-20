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
import { GatesColumn, type ColumnSpinState, type CellAnimState } from "./GatesColumn";

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
  const [columnSpinStates, setColumnSpinStates] = useState<ColumnSpinState[]>(
    Array(GATES_COLS).fill('idle')
  );
  const columnStopTimersRef = useRef<NodeJS.Timeout[]>([]);
  const serverResultRef = useRef<any>(null);
  const [cellAnimStates, setCellAnimStates] = useState<Map<number, CellAnimState>>(new Map());
  const [runningWin, setRunningWin] = useState(0);
  
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
      columnStopTimersRef.current.forEach(t => clearTimeout(t));
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

  // Process tumble steps with full visual animation sequence
  const processTumbleSteps = useCallback(async (steps: TumbleStep[]) => {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setCurrentTumbleStep(i);
      
      if (i === 0) {
        // First step grid is already set by the landing sequence
        // Just show it briefly before checking wins
        await new Promise(r => setTimeout(r, 200));
      }

      if (step.wins.length > 0) {
        // 1. Highlight winning symbols with glow + pulse
        setTumblePhase('showing-wins');
        const winPositions = new Set(step.winningPositions);
        setWinningPositions(winPositions);
        setMultiplierOrbs(step.multiplierOrbs);
        
        // Increment running win counter
        setRunningWin(prev => prev + step.stepWin);
        
        // Mark winning cells
        const winAnims = new Map<number, CellAnimState>();
        for (const pos of step.winningPositions) {
          winAnims.set(pos, 'winning');
        }
        setCellAnimStates(winAnims);
        
        // Hold win highlight
        await new Promise(r => setTimeout(r, 1000));
        
        // 2. Remove winning symbols with fade/pop animation
        setTumblePhase('tumbling');
        const removeAnims = new Map<number, CellAnimState>();
        for (const pos of step.winningPositions) {
          removeAnims.set(pos, 'removing');
        }
        setCellAnimStates(removeAnims);
        
        // Wait for removal animation
        await new Promise(r => setTimeout(r, 400));
        
        // 3. Clear winning positions and prepare next grid
        setWinningPositions(new Set());
        
        // If there's a next step, set its grid (symbols have fallen + filled)
        if (i + 1 < steps.length) {
          const nextGrid = steps[i + 1].grid;
          
          // Determine which cells are new (dropped in from above) vs shifted down
          // Compare current grid to next grid to find changed positions
          const currentGrid = step.grid;
          const dropAnims = new Map<number, CellAnimState>();
          
          for (let col = 0; col < GATES_COLS; col++) {
            // Count how many were removed in this column
            let removedInCol = 0;
            for (let row = 0; row < GATES_ROWS; row++) {
              const flat = col * GATES_ROWS + row;
              if (step.winningPositions.includes(flat)) {
                removedInCol++;
              }
            }
            
            if (removedInCol > 0) {
              // Top N cells are new (filled from above)
              for (let row = 0; row < removedInCol; row++) {
                const flat = col * GATES_ROWS + row;
                dropAnims.set(flat, 'filling');
              }
              // Remaining cells shifted down (gravity)
              for (let row = removedInCol; row < GATES_ROWS; row++) {
                const flat = col * GATES_ROWS + row;
                dropAnims.set(flat, 'dropping');
              }
            }
          }
          
          setGrid(nextGrid);
          setCellAnimStates(dropAnims);
          
          // Wait for drop/gravity animation
          await new Promise(r => setTimeout(r, 500));
        }
        
        // Clear all cell animations
        setCellAnimStates(new Map());
      } else {
        // No wins in this step - just show multiplier orbs briefly
        setMultiplierOrbs(step.multiplierOrbs);
        await new Promise(r => setTimeout(r, 300));
      }
    }
    // Ensure clean state at end
    setCellAnimStates(new Map());
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
    setRunningWin(0);
    setIsWinAnimating(false);
    setWinningPositions(new Set());
    setMultiplierOrbs([]);
    serverResultRef.current = null;

    // Stagger column spin start (left to right)
    const STAGGER_MS = 120;
    for (let c = 0; c < GATES_COLS; c++) {
      setTimeout(() => {
        setColumnSpinStates(prev => {
          const next = [...prev];
          next[c] = 'spinning';
          return next;
        });
      }, c * STAGGER_MS);
    }

    slotSounds.playSpinStart();

    try {
      const response = await serverSpin(bet, isBonusSpin);
      if (!response) throw new Error("Spin failed");

      const result = response.result as any;

      // Stop columns left to right with stagger
      await new Promise<void>((resolve) => {
        if (result.tumbleSteps && result.tumbleSteps.length > 0) {
          // Set the initial grid from the first tumble step
          setGrid(result.tumbleSteps[0].grid);
        }
        
        let landed = 0;
        for (let c = 0; c < GATES_COLS; c++) {
          const timer = setTimeout(() => {
            setColumnSpinStates(prev => {
              const next = [...prev];
              next[c] = 'landing';
              return next;
            });
            // After landing animation, mark as landed
            setTimeout(() => {
              setColumnSpinStates(prev => {
                const next = [...prev];
                next[c] = 'landed';
                return next;
              });
              landed++;
              if (landed === GATES_COLS) resolve();
            }, 400);
          }, c * STAGGER_MS);
          columnStopTimersRef.current.push(timer);
        }
      });

      // All columns landed — reset to idle
      setColumnSpinStates(Array(GATES_COLS).fill('idle'));

      if (result.tumbleSteps) {
        
        await processTumbleSteps(result.tumbleSteps);
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
        {/* Grid of symbols - column-based rendering */}
        <div 
          className="relative flex"
          style={{ 
            gap: `${SYMBOL_GAP}px`,
            padding: `${SYMBOL_GAP}px`,
          }}
        >
          {Array.from({ length: GATES_COLS }).map((_, col) => {
            const colSymbolIds = grid ? grid[col] || [] : [];
            const orbFinder = (flatIndex: number) => multiplierOrbs.find(o => o.position === flatIndex);

            return (
              <GatesColumn
                key={col}
                col={col}
                spinState={columnSpinStates[col]}
                symbols={symbols}
                symbolsById={symbolsById}
                finalSymbolIds={colSymbolIds}
                winningPositions={winningPositions}
                cellAnimStates={cellAnimStates}
                multiplierOrbAt={orbFinder}
                tumblePhase={tumblePhase}
              />
            );
          })}
        </div>
      </div>

      {/* Running win counter during tumbles */}
      {runningWin > 0 && tumblePhase !== 'idle' && (
        <div className={cn(
          "px-6 py-2 rounded-full border font-bold text-lg gates-multiplier-bump",
          "bg-gradient-to-r from-yellow-900/80 to-amber-950/80",
          "border-yellow-500/50 text-yellow-100 animate-pulse"
        )}>
          GEVINST: {runningWin.toLocaleString()} POINT
        </div>
      )}

      {/* Final win display */}
      {winAmount > 0 && !isSpinning && tumblePhase === 'idle' && (
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
