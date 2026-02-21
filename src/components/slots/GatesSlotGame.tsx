import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { useServerSpin } from "@/hooks/useServerSpin";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { slotSounds } from "@/lib/slotSoundEffects";
import { SlotControlPanel } from "./SlotControlPanel";
import { AnimatedSpinCounter } from "./AnimatedSpinCounter";
import { WinCelebration } from "./WinCelebration";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";
import {
  GATES_COLS, GATES_ROWS, generateGatesDisplayGrid, countGatesScatters,
  flatToColRow, type GatesWin, type MultiplierOrb, type TumbleStep,
} from "@/lib/gatesGameLogic";
import { isMultiplierSymbol, getMultiplierValue } from "@/lib/gatesMultiplierSymbols";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { GatesColumn, type ColumnSpinState, type CellAnimState } from "./GatesColumn";
import { AnimatedWinCounter } from "./AnimatedWinCounter";
import { BonusEntrySequence } from "./BonusEntrySequence";
import { GatesRetriggerOverlay } from "./GatesRetriggerOverlay";
import { GatesBonusEndOverlay } from "./GatesBonusEndOverlay";

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
  const [multiplierOrbs, setMultiplierOrbs] = useState<MultiplierOrb[]>([]); // kept for type compat
  const [totalMultiplier, setTotalMultiplier] = useState(0);
  const [tumblePhase, setTumblePhase] = useState<'idle' | 'spinning' | 'showing-wins' | 'tumbling'>('idle');
  const [currentTumbleStep, setCurrentTumbleStep] = useState(0);
  const [columnSpinStates, setColumnSpinStates] = useState<ColumnSpinState[]>(
    Array(GATES_COLS).fill('idle')
  );
  const columnStopTimersRef = useRef<NodeJS.Timeout[]>([]);
  const serverResultRef = useRef<any>(null);
  const [cellAnimStates, setCellAnimStates] = useState<Map<number, CellAnimState>>(new Map());
  const [cellDropOffsets, setCellDropOffsets] = useState<Map<number, number>>(new Map());
  const [runningWin, setRunningWin] = useState(0);
  const [runningMultiplier, setRunningMultiplier] = useState(0);
  const [screenShake, setScreenShake] = useState<'none' | 'normal' | 'intense'>('none');
  const [showLightningFlash, setShowLightningFlash] = useState(false);
  const [isSlowMotion, setIsSlowMotion] = useState(false);
  const [tumbleChainLength, setTumbleChainLength] = useState(0);
  
  // Bonus state
  const [isBonusActive, setIsBonusActive] = useState(false);
  const [freeSpinsRemaining, setFreeSpinsRemaining] = useState(0);
  const [totalFreeSpins, setTotalFreeSpins] = useState(0);
  const [bonusWinnings, setBonusWinnings] = useState(0);
  const [cumulativeMultiplier, setCumulativeMultiplier] = useState(0);
  const [showBonusTrigger, setShowBonusTrigger] = useState(false);
  const [showBonusComplete, setShowBonusComplete] = useState(false);
  const [showRetrigger, setShowRetrigger] = useState(false);
  const showBonusTriggerRef = useRef(false);
  const showBonusCompleteRef = useRef(false);
  const showRetriggerRef = useRef(false);
  const pendingBonusStateRef = useRef<any>(null);

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

  // Load persisted bonus state on mount (resume if user left mid-bonus)
  const [bonusLoaded, setBonusLoaded] = useState(false);
  useEffect(() => {
    if (!user?.id || bonusLoaded) return;
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from("slot_bonus_state")
          .select("*")
          .eq("user_id", user.id)
          .eq("game_id", gameId)
          .maybeSingle();

        if (!error && data && data.is_active && data.free_spins_remaining > 0) {
          setIsBonusActive(true);
          setFreeSpinsRemaining(data.free_spins_remaining);
          setTotalFreeSpins(data.total_free_spins);
          setBonusWinnings(Number(data.bonus_winnings) || 0);
          setBet(Number(data.bet_amount) || 1);
          // expanding_symbol_name is repurposed to store cumulative multiplier
          setCumulativeMultiplier(Number(data.expanding_symbol_name) || 0);
          setRunningMultiplier(Number(data.expanding_symbol_name) || 0);
          // Trigger auto-spin to resume bonus
          setBonusAutoSpinPending(true);
        }
      } catch (err) {
        console.error("Failed to load Gates bonus state:", err);
      }
      setBonusLoaded(true);
    };
    load();
  }, [user?.id, gameId, bonusLoaded]);

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

  const [bonusAutoSpinPending, setBonusAutoSpinPending] = useState(false);

  const handleBonusEntryComplete = useCallback(() => {
    const bs = pendingBonusStateRef.current;
    setShowBonusTrigger(false);
    showBonusTriggerRef.current = false;
    if (bs) {
      setIsBonusActive(true);
      setFreeSpinsRemaining(bs.freeSpinsRemaining);
      setTotalFreeSpins(bs.totalFreeSpins);
      setBonusWinnings(0);
      setCumulativeMultiplier(0);
      pendingBonusStateRef.current = null;
      setBonusAutoSpinPending(true);
    }
  }, []);

  // Process tumble steps with full visual animation sequence
  const processTumbleSteps = useCallback(async (steps: TumbleStep[]) => {
    let winningStepCount = 0;
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setCurrentTumbleStep(i);
      
      if (i === 0) {
        await new Promise(r => setTimeout(r, 200));
      }

      if (step.wins.length > 0) {
        winningStepCount++;
        setTumbleChainLength(winningStepCount);
        
        // Activate slow-motion on long chains (4+ winning tumbles)
        if (winningStepCount >= 4 && !isSlowMotion) {
          setIsSlowMotion(true);
        }
        
        // 1. Highlight winning symbols with glow + pulse
        setTumblePhase('showing-wins');
        const winPositions = new Set(step.winningPositions);
        setWinningPositions(winPositions);
        
        // Increment running win counter
        setRunningWin(prev => prev + step.stepWin);
        
        // Accumulate multiplier orbs (now read from grid) + trigger screen shake
        if (step.multiplierOrbs.length > 0) {
          const orbSum = step.multiplierOrbs.reduce((sum, o) => sum + o.value, 0);
          setRunningMultiplier(prev => prev + orbSum);
          
          // Screen shake + lightning on 50x+ multiplier orb
          const maxOrb = Math.max(...step.multiplierOrbs.map(o => o.value));
          if (maxOrb >= 100) {
            setScreenShake('intense');
            setShowLightningFlash(true);
            slotSounds.playBigWin();
            setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 800);
          } else if (maxOrb >= 50) {
            setScreenShake('normal');
            setShowLightningFlash(true);
            setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 600);
          }
        }
        
        // Mark winning cells + multiplier cells for highlight
        const winAnims = new Map<number, CellAnimState>();
        for (const pos of step.winningPositions) {
          winAnims.set(pos, 'winning');
        }
        // Also highlight multiplier symbols being collected
        for (const orb of step.multiplierOrbs) {
          winAnims.set(orb.position, 'winning');
        }
        setCellAnimStates(winAnims);
        
        // Hold win highlight (longer in slow-motion)
        const holdTime = isSlowMotion ? 1400 : 1000;
        await new Promise(r => setTimeout(r, holdTime));
        
        // 2. Fly multipliers to bank FIRST (before removing winning symbols)
        if (step.multiplierOrbs.length > 0) {
          const collectAnims = new Map<number, CellAnimState>();
          // Keep winning symbols highlighted while multipliers fly
          for (const pos of step.winningPositions) {
            collectAnims.set(pos, 'winning');
          }
          // Multipliers get the fly-to-bank animation
          for (const orb of step.multiplierOrbs) {
            collectAnims.set(orb.position, 'collecting');
          }
          setCellAnimStates(collectAnims);
          
          // Wait for fly animation
          const flyTime = isSlowMotion ? 900 : 700;
          await new Promise(r => setTimeout(r, flyTime));
        }
        
        // 3. Remove winning symbols with fade/pop animation
        setTumblePhase('tumbling');
        const removeAnims = new Map<number, CellAnimState>();
        // All positions being removed (winning + collected multipliers)
        const allRemovedPositions = new Set(step.winningPositions);
        for (const orb of step.multiplierOrbs) {
          allRemovedPositions.add(orb.position);
        }
        for (const pos of allRemovedPositions) {
          removeAnims.set(pos, 'removing');
        }
        setCellAnimStates(removeAnims);
        
        // Wait for removal animation (longer in slow-motion)
        const removeTime = isSlowMotion ? 600 : 400;
        await new Promise(r => setTimeout(r, removeTime));
        
        // 3. Clear winning positions and prepare next grid
        setWinningPositions(new Set());
        
        if (i + 1 < steps.length) {
          const nextGrid = steps[i + 1].grid;
          const dropAnims = new Map<number, CellAnimState>();
          const offsets = new Map<number, number>();
          const CELL_HEIGHT = 104; // SYMBOL_SIZE + GAP
          
          for (let col = 0; col < GATES_COLS; col++) {
            let removedInCol = 0;
            for (let row = 0; row < GATES_ROWS; row++) {
              const flat = col * GATES_ROWS + row;
              if (allRemovedPositions.has(flat)) {
                removedInCol++;
              }
            }
            
            if (removedInCol > 0) {
              // Top rows = brand new symbols dropping in from above
              for (let row = 0; row < removedInCol; row++) {
                const flat = col * GATES_ROWS + row;
                dropAnims.set(flat, 'filling');
              }
              // Remaining rows = surviving symbols that shift down with gravity
              for (let row = removedInCol; row < GATES_ROWS; row++) {
                const flat = col * GATES_ROWS + row;
                dropAnims.set(flat, 'dropping');
                offsets.set(flat, removedInCol * CELL_HEIGHT);
              }
            }
          }
          
          setGrid(nextGrid);
          setCellAnimStates(dropAnims);
          setCellDropOffsets(offsets);
          
          const dropTime = isSlowMotion ? 700 : 500;
          await new Promise(r => setTimeout(r, dropTime));
        }
        
        setCellAnimStates(new Map());
        setCellDropOffsets(new Map());
      } else {
        // No win - multipliers persist on grid (no action needed, they're in the grid data)
        await new Promise(r => setTimeout(r, 300));
      }
    }
    // Clean up
    setCellAnimStates(new Map());
    setCellDropOffsets(new Map());
    setIsSlowMotion(false);
    setTumbleChainLength(0);
  }, [isSlowMotion]);

  // Client seed + nonce for provably fair RNG
  const clientSeedRef = useRef<string>(crypto.randomUUID());
  const nonceRef = useRef<number>(0);

  const handleSpin = useCallback(async () => {
    // Step 1: Lock inputs — prevent any duplicate calls
    if (spinLockRef.current || !symbols || !user || isSpinning) return;
    if (showBonusTriggerRef.current || showBonusCompleteRef.current || showRetriggerRef.current) return;
    
    const isBonusSpin = isBonusActive && freeSpinsRemaining > 0;
    if (!isBonusSpin && !hasEnoughSpins(bet)) return;

    spinLockRef.current = true;
    nonceRef.current += 1;
    setIsSpinning(true);
    setTumblePhase('spinning');
    setWinAmount(0);
    setRunningWin(0);
    // In bonus, keep cumulative multiplier across spins; in base game, reset
    if (!isBonusSpin) {
      setRunningMultiplier(0);
    }
    setIsWinAnimating(false);
    setWinningPositions(new Set());
    setMultiplierOrbs([]);
    setScreenShake('none');
    setShowLightningFlash(false);
    setIsSlowMotion(false);
    setTumbleChainLength(0);
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
      // Step 2: Server request with clientSeed + nonce for provably fair RNG
      const response = await serverSpin(bet, isBonusSpin, clientSeedRef.current, nonceRef.current);
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
              // New bonus triggered — highlight scatters before entry sequence
              pendingBonusStateRef.current = bs;
              
              // Find scatter positions on the current grid and pulse them
              if (grid && symbols) {
                const { positions: scatterPos } = countGatesScatters(grid, symbols);
                if (scatterPos.length > 0) {
                  const scatterAnims = new Map<number, CellAnimState>();
                  scatterPos.forEach(pos => scatterAnims.set(pos, 'scatter-pulse'));
                  setCellAnimStates(scatterAnims);
                  // Show scatters pulsing for 1.5s, then show bonus entry
                  await new Promise(r => setTimeout(r, 1500));
                  setCellAnimStates(new Map());
                }
              }
              
              setShowBonusTrigger(true);
              showBonusTriggerRef.current = true;
              // Reset counters for bonus entry
              setRunningWin(0);
              setRunningMultiplier(0);
            } else if (bs.isRetrigger) {
              // Retrigger during bonus — show retrigger overlay
              setShowRetrigger(true);
              showRetriggerRef.current = true;
              setFreeSpinsRemaining(bs.freeSpinsRemaining);
              setTotalFreeSpins(bs.totalFreeSpins);
              setBonusWinnings(bs.bonusWinnings || 0);
              setCumulativeMultiplier(bs.cumulativeMultiplier || 0);
              setRunningMultiplier(bs.cumulativeMultiplier || 0);
            } else {
              setFreeSpinsRemaining(bs.freeSpinsRemaining);
              setTotalFreeSpins(bs.totalFreeSpins);
              setBonusWinnings(bs.bonusWinnings || 0);
              setCumulativeMultiplier(bs.cumulativeMultiplier || 0);
              // Sync running multiplier with server's cumulative value for next spin
              setRunningMultiplier(bs.cumulativeMultiplier || 0);
              
              if (bs.freeSpinsRemaining <= 0) {
                setShowBonusComplete(true);
                showBonusCompleteRef.current = true;
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

      // Auto-spin: bonus free spins always auto-spin, or manual auto-spin
      if (isBonusActive && freeSpinsRemaining > 0 && !showBonusTriggerRef.current && !showBonusCompleteRef.current && !showRetriggerRef.current) {
        autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 1200);
      } else if (isAutoSpinning && !shouldStopAutoSpinRef.current) {
        if (autoSpinsRemaining !== null) {
          const newCount = autoSpinsRemaining - 1;
          setAutoSpinsRemaining(newCount);
          if (newCount <= 0) { stopAutoSpin(); return; }
        }
        autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 1500);
      }
    }
  }, [symbols, user, isSpinning, bet, isBonusActive, freeSpinsRemaining, hasEnoughSpins, serverSpin, processTumbleSteps, queryClient, isAutoSpinning, autoSpinsRemaining, stopAutoSpin]);

  const handleRetriggerComplete = useCallback(() => {
    setShowRetrigger(false);
    showRetriggerRef.current = false;
    // Auto-spin after retrigger overlay closes
    setBonusAutoSpinPending(true);
  }, []);

  // Auto-spin trigger (manual auto-spin)
  useEffect(() => {
    if (isAutoSpinning && !isSpinning && !showBonusTriggerRef.current && !showBonusCompleteRef.current && !showRetriggerRef.current) {
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [isAutoSpinning]);

  // Bonus auto-spin trigger (after entry/retrigger overlay)
  useEffect(() => {
    if (bonusAutoSpinPending && isBonusActive && !isSpinning) {
      setBonusAutoSpinPending(false);
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [bonusAutoSpinPending, isBonusActive, isSpinning, handleSpin]);

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
      {/* Prominent free spins counter - top center */}
      {isBonusActive && (
        <div className="w-full flex flex-col items-center gap-1 animate-fade-in">
          {/* Main spins counter */}
          <div className={cn(
            "relative flex items-center gap-6 px-8 py-3 rounded-2xl border-2",
            "bg-gradient-to-b from-yellow-900/90 via-amber-950/95 to-yellow-950/90",
            "border-yellow-500/60",
            "shadow-[0_0_30px_rgba(250,204,21,0.3),0_0_60px_rgba(250,204,21,0.15)]",
            "animate-[bonus-bar-glow_2s_ease-in-out_infinite]"
          )}>
            {/* Free spins label + count */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-yellow-500/80 font-semibold">Free Spins</span>
              <div className="flex items-baseline gap-1">
                <AnimatedSpinCounter
                  value={freeSpinsRemaining}
                  className="text-4xl font-black text-yellow-300 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)] tabular-nums"
                />
                <span className="text-lg text-yellow-500/60 font-bold">/ {totalFreeSpins}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-yellow-500/30" />

            {/* Cumulative multiplier */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-blue-400/80 font-semibold">Multiplier</span>
              <span className="text-2xl font-black text-blue-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] tabular-nums">
                x{cumulativeMultiplier}
              </span>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-yellow-500/30" />

            {/* Bonus winnings */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-green-400/80 font-semibold">Gevinst</span>
              <span className="text-2xl font-black text-green-300 drop-shadow-[0_0_10px_rgba(74,222,128,0.7)] tabular-nums">
                {bonusWinnings.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bonus entry sequence */}
      <BonusEntrySequence
        isActive={showBonusTrigger}
        freeSpinsAwarded={pendingBonusStateRef.current?.freeSpinsRemaining || 15}
        onComplete={handleBonusEntryComplete}
      />

      {/* Retrigger overlay */}
      <GatesRetriggerOverlay
        isActive={showRetrigger}
        spinsAwarded={5}
        onComplete={handleRetriggerComplete}
      />

      {/* Bonus complete overlay - animated count-up */}
      <GatesBonusEndOverlay
        isActive={showBonusComplete}
        totalWin={bonusWinnings}
        totalMultiplier={cumulativeMultiplier}
        totalSpins={totalFreeSpins}
        onComplete={() => {
          setShowBonusComplete(false);
          showBonusCompleteRef.current = false;
          setIsBonusActive(false);
          setCumulativeMultiplier(0);
          setRunningMultiplier(0);
          setBonusWinnings(0);
          setRunningWin(0);
        }}
      />

      {/* Lightning flash overlay */}
      {showLightningFlash && <div className="gates-lightning-overlay" />}

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
          "border-blue-500/30",
          screenShake === 'normal' && "gates-shake",
          screenShake === 'intense' && "gates-shake-intense",
          isSlowMotion && "gates-slow-motion",
          tumbleChainLength >= 3 && "gates-intensity-high"
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
                cellDropOffsets={cellDropOffsets}
                tumblePhase={tumblePhase}
              />
            );
          })}
        </div>
      </div>

      {/* Running win counter during tumbles - with animated counting */}
      {runningWin > 0 && tumblePhase !== 'idle' && (
        <div className={cn(
          "flex items-center gap-3 px-6 py-2 rounded-full border font-bold text-lg",
          "bg-gradient-to-r from-yellow-900/80 to-amber-950/80",
          "border-yellow-500/50 text-yellow-100",
          tumbleChainLength >= 3 && "gates-counter-glow"
        )}>
          <span>GEVINST: <AnimatedWinCounter targetValue={runningWin} className="gates-counter-bump" /> POINT</span>
          {runningMultiplier > 0 && (
            <span className="text-blue-300 border-l border-yellow-500/30 pl-3 gates-multiplier-land">
              MULTIPLIER: x<AnimatedWinCounter targetValue={runningMultiplier} duration={600} />
            </span>
          )}
        </div>
      )}

      {/* Final win display */}
      {winAmount > 0 && !isSpinning && tumblePhase === 'idle' && (
        <div className={cn(
          "px-6 py-2 rounded-full border font-bold text-lg",
          "bg-gradient-to-r from-blue-900/80 to-blue-950/80",
          "border-blue-500/40 text-blue-100",
          runningMultiplier > 0 && "border-yellow-500/50 gates-counter-glow"
        )}>
          GEVINST: {winAmount.toLocaleString()} POINT
          {runningMultiplier > 0 && (
            <span className="text-yellow-400 ml-2">(x{runningMultiplier})</span>
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
          isSpinLocked={spinLockRef.current}
          canSpin={canSpin}
          spinsRemaining={spinsRemaining}
          maxSpins={maxSpins}
          isAutoSpinning={isAutoSpinning}
          autoSpinCount={autoSpinCount}
          autoSpinsRemaining={autoSpinsRemaining}
          onAutoSpinCountChange={setAutoSpinCount}
          onAutoSpinToggle={toggleAutoSpin}
          bonusState={{ isActive: isBonusActive, freeSpinsRemaining: 0 }}
          bonusLoaded={bonusLoaded}
          winAmount={winAmount}
          gameId={gameId}
        />
      </div>
    </div>
  );
}
