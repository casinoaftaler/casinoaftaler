import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { CreditsExpiredOverlay } from "./CreditsExpiredOverlay";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useMultiplierSymbols } from "@/hooks/useMultiplierSymbols";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { getTodayDanish } from "@/lib/danishDate";
import { useServerSpin } from "@/hooks/useServerSpin";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { slotSounds } from "@/lib/slotSoundEffects";
import { GatesControlBar } from "./GatesControlBar";
import { AnimatedSpinCounter } from "./AnimatedSpinCounter";
import { WinCelebration } from "./WinCelebration";
import { SlotIdleEffects } from "./SlotIdleEffects";
import { SlotAmbientLight } from "./SlotAmbientLight";
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
import { useGatesIntensity } from "@/hooks/useGatesIntensity";
import { GatesZeusCharacter } from "./GatesZeusCharacter";

const SYMBOL_WIDTH = 140;
const SYMBOL_HEIGHT = 108;
const SYMBOL_GAP = 5;

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface GatesSlotGameProps {
  gameId?: string;
}

export function GatesSlotGame({ gameId = "gates-of-fedesvin" }: GatesSlotGameProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols(gameId);
  const { data: multSymbols } = useMultiplierSymbols();
  const { spinsRemaining, maxSpins, canSpin, hasEnoughSpins } = useSlotSpins(gameId);
  const { settings: slotSettings } = useSlotSettings();
  const { data: siteSettings } = useSiteSettings();
  const { spin: serverSpin } = useServerSpin(gameId);
  const theme = getSlotTheme(gameId);

  const multiplierSymbolsMap = useMemo(() => {
    if (!multSymbols) return undefined;
    return new Map(multSymbols.map(s => [s.id, s]));
  }, [multSymbols]);

  const [bet, setBet] = useState(10);
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
  const [animationEpoch, setAnimationEpoch] = useState(0); // force CSS animation restarts
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
  const pendingBonusActionRef = useRef<(() => void) | null>(null);

  const spinLockRef = useRef(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState<AutoSpinCount>(10);
  const [autoSpinsRemaining, setAutoSpinsRemaining] = useState<number | null>(null);
  const autoSpinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldStopAutoSpinRef = useRef(false);
  const [spinPressed, setSpinPressed] = useState(false);
  const [showReelFlash, setShowReelFlash] = useState(false);

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
        slotSounds.playSymbolHighlight();
        
        // Increment running win counter
        setRunningWin(prev => prev + step.stepWin);
        
        // Check if this is the last winning step (next step has no wins or doesn't exist)
        const isLastWinningStep = (i + 1 >= steps.length) || (steps[i + 1].wins.length === 0);
        
        // Show multiplier orbs visually but don't accumulate yet (they persist on grid)
        // Only accumulate + collect on the last winning step
        if (step.multiplierOrbs.length > 0) {
          // Screen shake + lightning on 50x+ multiplier orb (visual only)
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
        
        // Accumulate multiplier to bank ONLY on the last winning step
        if (isLastWinningStep && step.multiplierOrbs.length > 0) {
          const orbSum = step.multiplierOrbs.reduce((sum, o) => sum + o.value, 0);
          setRunningMultiplier(prev => prev + orbSum);
          // Enhanced multiplier collection in bonus: thunder boom + screen pulse
          if (isBonusActive) {
            slotSounds.playMultiplierSlam();
            setScreenShake('normal');
            setShowLightningFlash(true);
            setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 500);
          }
        }
        
        // Mark winning cells for highlight (multipliers only highlighted on last winning step)
        const winAnims = new Map<number, CellAnimState>();
        for (const pos of step.winningPositions) {
          winAnims.set(pos, 'winning');
        }
        // Only highlight multiplier symbols when they'll actually be collected (last winning step)
        if (isLastWinningStep) {
          for (const orb of step.multiplierOrbs) {
            winAnims.set(orb.position, 'winning');
          }
        }
        setCellAnimStates(winAnims);
        
        // Hold gold highlight (Step 1 — longer for dramatic effect)
        const holdTime = isSlowMotion ? 1600 : 1200;
        await new Promise(r => setTimeout(r, holdTime));
        
        // 2. Fly multipliers to bank ONLY on last winning step
        if (isLastWinningStep && step.multiplierOrbs.length > 0) {
          // --- Pause between win display and multiplier explosion ---
          const preMultDelay = isSlowMotion ? 800 : 600;
          await new Promise(r => setTimeout(r, preMultDelay));
          
          // First: highlight multiplier orbs with a pulsing glow before collecting
          const pulseAnims = new Map<number, CellAnimState>();
          for (const pos of step.winningPositions) {
            pulseAnims.set(pos, 'winning');
          }
          for (const orb of step.multiplierOrbs) {
            pulseAnims.set(orb.position, 'winning');
          }
          setCellAnimStates(pulseAnims);
          
          // Hold the multiplier highlight pulse
          const pulseHoldTime = isSlowMotion ? 700 : 500;
          await new Promise(r => setTimeout(r, pulseHoldTime));
          
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
        
        // Step 2: EXPLOSION — symbols burst into sparks
        setTumblePhase('tumbling');
        const removeAnims = new Map<number, CellAnimState>();
        // Only winning positions are removed; multipliers only removed on last winning step
        const allRemovedPositions = new Set(step.winningPositions);
        if (isLastWinningStep) {
          for (const orb of step.multiplierOrbs) {
            allRemovedPositions.add(orb.position);
          }
        }
        for (const pos of allRemovedPositions) {
          removeAnims.set(pos, 'exploding');
        }
        setCellAnimStates(removeAnims);
        
        // Play crackling explosion sound
        slotSounds.playCrackle();
        
        // Wait for explosion animation (longer in slow-motion)
        const removeTime = isSlowMotion ? 800 : 500;
        await new Promise(r => setTimeout(r, removeTime));
        
        // Step 3: Clear winning positions — pause after explosion before gravity
        const postExplodePause = isSlowMotion ? 250 : 150;
        await new Promise(r => setTimeout(r, postExplodePause));
        setWinningPositions(new Set());
        
        if (i + 1 < steps.length) {
          const nextGrid = steps[i + 1].grid;
          const dropAnims = new Map<number, CellAnimState>();
          const offsets = new Map<number, number>();
          const CELL_HEIGHT = SYMBOL_HEIGHT + SYMBOL_GAP;
          
          for (let col = 0; col < GATES_COLS; col++) {
            // Count how many were removed in this column
            let removedInCol = 0;
            for (let row = 0; row < GATES_ROWS; row++) {
              const flat = col * GATES_ROWS + row;
              if (allRemovedPositions.has(flat)) {
                removedInCol++;
              }
            }
            
            if (removedInCol > 0) {
              // Collect surviving rows in this column (original positions)
              const survivorRows: number[] = [];
              for (let row = 0; row < GATES_ROWS; row++) {
                const flat = col * GATES_ROWS + row;
                if (!allRemovedPositions.has(flat)) {
                  survivorRows.push(row);
                }
              }

              // New symbols fill the top `removedInCol` rows
              for (let row = 0; row < removedInCol; row++) {
                const flat = col * GATES_ROWS + row;
                dropAnims.set(flat, 'filling');
              }

              // Each survivor compacts to bottom: survivor[i] -> new row (removedInCol + i)
              for (let i = 0; i < survivorRows.length; i++) {
                const oldRow = survivorRows[i];
                const newRow = removedInCol + i;
                const dropRows = newRow - oldRow;
                if (dropRows > 0) {
                  const flat = col * GATES_ROWS + newRow;
                  dropAnims.set(flat, 'dropping');
                  offsets.set(flat, dropRows * CELL_HEIGHT);
                }
                // dropRows === 0 means no movement, no animation needed
              }
            }
            // Columns with no removals: no animation needed, symbols stay in place
          }
          
          setGrid(nextGrid);
          setCellAnimStates(dropAnims);
          setCellDropOffsets(offsets);
          setAnimationEpoch(prev => prev + 1);
          
          // Play clack sound when symbols land
          slotSounds.playClack();
          
          // Step 3: Gravity drop timing
          const dropTime = isSlowMotion ? 700 : 500;
          await new Promise(r => setTimeout(r, dropTime));
          
          // Step 4: Post-fill pause
          const postFillPause = isSlowMotion ? 300 : 200;
          await new Promise(r => setTimeout(r, postFillPause));
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
  }, [isSlowMotion, isBonusActive]);

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
    // Optimistically decrement free spins counter immediately
    if (isBonusSpin) {
      setFreeSpinsRemaining(prev => Math.max(0, prev - 1));
    }
    let shouldWaitForWinAnimation = false;
    setIsWinAnimating(false);
    setWinningPositions(new Set());
    setMultiplierOrbs([]);
    setScreenShake('none');
    setShowLightningFlash(false);
    setIsSlowMotion(false);
    setTumbleChainLength(0);
    serverResultRef.current = null;

    // Phase 1: Drop-off — stagger columns left to right
    const STAGGER_MS = 80;
    const DROP_OFF_DURATION = 350; // matches CSS .gates-drop-off duration
    const DROP_IN_DURATION = 400; // matches CSS .gates-drop-in duration

    for (let c = 0; c < GATES_COLS; c++) {
      setTimeout(() => {
        setColumnSpinStates(prev => {
          const next = [...prev];
          next[c] = 'dropping-off';
          return next;
        });
      }, c * STAGGER_MS);
    }

    slotSounds.playSpinStart();

    try {
      // Fire server request in parallel with drop-off animation
      const serverPromise = serverSpin(bet, isBonusSpin, clientSeedRef.current, nonceRef.current);

      // Wait for all drop-off animations to complete
      const totalDropOffTime = DROP_OFF_DURATION + (GATES_COLS - 1) * STAGGER_MS;
      await new Promise(r => setTimeout(r, totalDropOffTime));

      // Grid is now visually empty — wait for server result
      const response = await serverPromise;
      if (!response) {
        // Error already toasted by useServerSpin — just bail out
        return;
      }

      const result = response.result as any;

      // Set the new grid data
      if (result.tumbleSteps && result.tumbleSteps.length > 0) {
        setGrid(result.tumbleSteps[0].grid);
      }

      // Pre-detect scatters for slow-motion tease on final columns
      let scatterTeaseActive = false;
      if (result.tumbleSteps && result.tumbleSteps.length > 0 && symbols) {
        const { count: preScatterCount } = countGatesScatters(result.tumbleSteps[0].grid, symbols);
        scatterTeaseActive = preScatterCount >= 2;
      }

      // Phase 2: Drop-in — stagger columns left to right with column stop sounds
      // Apply slow-motion on final 2 columns when scatter tease is active
      for (let c = 0; c < GATES_COLS; c++) {
        const isSlowColumn = scatterTeaseActive && c >= GATES_COLS - 2;
        const delay = isSlowColumn
          ? (GATES_COLS - 2) * STAGGER_MS + (c - (GATES_COLS - 2)) * (STAGGER_MS * 2.5)
          : c * STAGGER_MS;
        setTimeout(() => {
          setColumnSpinStates(prev => {
            const next = [...prev];
            next[c] = 'dropping-in';
            return next;
          });
          // Play column stop — heavier sound in bonus mode
          if (isBonusSpin) {
            if (c === GATES_COLS - 1) {
              slotSounds.playBonusThunderCrack();
            } else {
              slotSounds.playBonusColumnStop();
            }
          } else {
            slotSounds.playColumnStop();
          }
        }, delay);
      }

      // Wait for all drop-in animations to complete (account for slow columns)
      const lastColumnDelay = scatterTeaseActive
        ? (GATES_COLS - 2) * STAGGER_MS + 1 * (STAGGER_MS * 2.5)
        : (GATES_COLS - 1) * STAGGER_MS;
      const totalDropInTime = DROP_IN_DURATION + lastColumnDelay;
      await new Promise(r => setTimeout(r, totalDropInTime));

      // Reel stop flash removed (was too flashy)

      // All columns landed — reset to idle
      setColumnSpinStates(Array(GATES_COLS).fill('idle'));

      // Scatter tease: detect 2-3 scatters and highlight them before proceeding
      if (result.tumbleSteps && result.tumbleSteps.length > 0 && symbols) {
        const firstGrid = result.tumbleSteps[0].grid;
        const { count: scatterCount, positions: scatterPositions } = countGatesScatters(firstGrid, symbols);
        
        if (scatterCount >= 2 && scatterCount <= 3) {
          // Apply scatter tease glow to detected scatter positions
          const teaseAnims = new Map<number, CellAnimState>();
          const teaseClass = scatterCount >= 3 ? 'scatter-tease-intense' : 'scatter-tease';
          scatterPositions.forEach(pos => teaseAnims.set(pos, teaseClass as CellAnimState));
          setCellAnimStates(teaseAnims);
          
          // Play rising pitch tease sound
          slotSounds.playScatterTease(scatterCount);
          
          // Hold tease visual — longer for 3 scatters
          const teaseDuration = scatterCount >= 3 ? 1200 : 800;
          await new Promise(r => setTimeout(r, teaseDuration));
          
          // Clear tease animations
          setCellAnimStates(new Map());
        }
      }

      if (result.tumbleSteps) {
        
        await processTumbleSteps(result.tumbleSteps);
        const totalWin = result.totalWin || 0;
        setWinAmount(totalWin);
        
        if (totalWin > 0) {
          shouldWaitForWinAnimation = true;
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

        // Handle bonus state — defer if win celebration is playing
        if (response.bonusState) {
          const bs = response.bonusState as any;
          if (bs.isActive !== undefined) {
            const executeBonusAction = () => {
              if (!isBonusActive && bs.freeSpinsRemaining > 0) {
                pendingBonusStateRef.current = bs;
                if (grid && symbols) {
                  const { positions: scatterPos } = countGatesScatters(grid, symbols);
                  if (scatterPos.length > 0) {
                    const scatterAnims = new Map<number, CellAnimState>();
                    scatterPos.forEach(pos => scatterAnims.set(pos, 'scatter-pulse'));
                    setCellAnimStates(scatterAnims);
                    slotSounds.playScatterCelebration();
                    setTimeout(() => {
                      setCellAnimStates(new Map());
                      setShowBonusTrigger(true);
                      showBonusTriggerRef.current = true;
                      setScreenShake('intense');
                      setShowLightningFlash(true);
                      setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 600);
                      setRunningWin(0);
                      setRunningMultiplier(0);
                    }, 1500);
                    return;
                  }
                }
                setShowBonusTrigger(true);
                showBonusTriggerRef.current = true;
                setScreenShake('intense');
                setShowLightningFlash(true);
                setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 600);
                setRunningWin(0);
                setRunningMultiplier(0);
              } else if (bs.isRetrigger) {
                setScreenShake('intense');
                setShowLightningFlash(true);
                setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 500);
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
                setRunningMultiplier(bs.cumulativeMultiplier || 0);
                if (bs.freeSpinsRemaining <= 0) {
                  setScreenShake('intense');
                  setShowLightningFlash(true);
                  setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 800);
                  setShowBonusComplete(true);
                  showBonusCompleteRef.current = true;
                }
              }
            };

            if (shouldWaitForWinAnimation) {
              pendingBonusActionRef.current = executeBonusAction;
            } else {
              executeBonusAction();
            }
          }
        }

        // Update spins remaining immediately via cache + refetch
        if (response.spinsRemaining !== undefined) {
          const today = getTodayDanish();
          queryClient.setQueryData(
            ["slot-spins", user?.id, today],
            (old: any) => old ? { ...old, spins_remaining: response.spinsRemaining } : old
          );
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
      // If win celebration is pending, don't auto-spin yet — WinCelebration onComplete handles it
      if (isBonusActive && freeSpinsRemaining > 0 && !showBonusTriggerRef.current && !showBonusCompleteRef.current && !showRetriggerRef.current && !pendingBonusActionRef.current) {
        if (shouldWaitForWinAnimation) {
          // Will be handled by WinCelebration onAnimationComplete
        } else {
          autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 500);
        }
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

  // Visual intensity state
  const { intensityState, bonusIntensityTier } = useGatesIntensity({
    tumblePhase,
    tumbleChainLength,
    winAmount: runningWin,
    bet,
    isBonusActive,
    cumulativeMultiplier,
  });

  // Spin button press animation
  const handleSpinWithPress = useCallback(async () => {
    setSpinPressed(true);
    setTimeout(() => setSpinPressed(false), 200);
    handleSpin();
  }, [handleSpin]);

  if (symbolsLoading || !symbols) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  const gridWidth = GATES_COLS * (SYMBOL_WIDTH + SYMBOL_GAP) + SYMBOL_GAP;
  const gridHeight = GATES_ROWS * (SYMBOL_HEIGHT + SYMBOL_GAP) + SYMBOL_GAP;

  return (
    <div
      className="flex flex-col items-center gap-4 relative"
      data-intensity={intensityState}
      data-bonus={isBonusActive ? "true" : "false"}
      data-mult-tier={bonusIntensityTier}
      data-last-spin={isBonusActive && freeSpinsRemaining === 1 ? "true" : "false"}
    >
      {/* Credits expired overlay */}
      <CreditsExpiredOverlay isVisible={spinsRemaining <= 0 && !isBonusActive && !isSpinning && tumblePhase === 'idle'} />
      {/* Ambient lightning overlay */}
      <div className="gates-lightning-ambient" />
      {/* Ambient glow background */}
      <div className="gates-ambient-glow" />

      {/* Zeus character - top center */}
      <GatesZeusCharacter intensityState={intensityState} chainLevel={tumbleChainLength} isBonusActive={isBonusActive} />

      {/* Bonus bar - only in bonus (free spins + multiplier shown above grid) */}
      {isBonusActive && (
        <div className="w-full flex justify-center animate-fade-in">
          <div className="flex items-center gap-6 px-8 py-3 rounded-2xl border-2 bg-gradient-to-b from-yellow-900/90 via-amber-950/95 to-yellow-950/90 border-yellow-500/60 shadow-[0_0_30px_rgba(250,204,21,0.3),0_0_60px_rgba(250,204,21,0.15)] animate-[bonus-bar-glow_2s_ease-in-out_infinite]">
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
            <div className="w-px h-10 bg-yellow-500/30" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-blue-400/80 font-semibold">Multiplier</span>
              <span className="text-2xl font-black text-blue-300 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)] tabular-nums">
                x{tumblePhase !== 'idle' ? runningMultiplier : cumulativeMultiplier}
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
          onAnimationComplete={() => {
            setIsWinAnimating(false);
            if (pendingBonusActionRef.current) {
              const action = pendingBonusActionRef.current;
              pendingBonusActionRef.current = null;
              setTimeout(() => action(), 300);
            }
          }}
          gameId={gameId}
        />
      )}

      {/* Main game grid */}
      <div 
        className={cn(
          "gates-grid-container relative rounded-xl border-2 overflow-hidden",
          "bg-gradient-to-b from-blue-950/95 via-slate-950/90 to-blue-950/95",
          "border-blue-500/30",
          "gates-grid-intensity-glow",
          screenShake === 'normal' && "gates-shake",
          screenShake === 'intense' && "gates-shake-intense",
          isSlowMotion && "gates-slow-motion",
          tumbleChainLength >= 3 && "gates-intensity-high"
        )}
        style={{
          width: gridWidth,
          height: gridHeight,
        }}
      >
        <SlotAmbientLight isIdle={!isSpinning && tumblePhase === 'idle' && !isBonusActive} theme="blue" />
        <SlotIdleEffects isIdle={!isSpinning && tumblePhase === 'idle' && !isBonusActive} theme="blue" width={gridWidth} height={gridHeight} />
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
                animationEpoch={animationEpoch}
                multiplierSymbolsMap={multiplierSymbolsMap}
              />
            );
          })}
        </div>
      </div>

      {/* Running win counter removed - consolidated into Gevinst bar */}

      {/* Gevinst bar - always visible, above control panel */}
      <div className="w-full flex justify-center">
        <div className={cn(
          "flex items-center gap-4 px-6 py-2 rounded-xl border",
          isBonusActive
            ? "bg-gradient-to-b from-yellow-900/60 via-amber-950/70 to-yellow-950/60 border-yellow-500/40"
            : "bg-gradient-to-b from-blue-950/60 via-slate-950/60 to-blue-950/60 border-blue-500/20"
        )}>
          <div className="flex flex-col items-center">
            <span className={cn(
              "text-[10px] uppercase tracking-widest font-semibold",
              isBonusActive ? "text-green-400/80" : "text-green-400/70"
            )}>Gevinst</span>
            <span className={cn(
              "text-2xl font-black tabular-nums",
              isBonusActive
                ? "text-green-300 drop-shadow-[0_0_10px_rgba(74,222,128,0.7)]"
                : "text-green-300/90 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]"
            )}>
              {isBonusActive
                ? (tumblePhase !== 'idle' ? (bonusWinnings + runningWin) : bonusWinnings).toLocaleString()
                : (tumblePhase !== 'idle' ? runningWin : winAmount).toLocaleString()
              }
            </span>
          </div>
          {/* Tumble win - shown during active tumbles in bonus */}
          {isBonusActive && tumblePhase !== 'idle' && runningWin > 0 && (
            <>
              <div className="w-px h-8 bg-yellow-500/30" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-yellow-400/70">Tumble</span>
                <span className="text-lg font-bold tabular-nums text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                  +{runningWin.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Control panel */}
      <div className="w-full">
        <GatesControlBar
          bet={bet}
          onBetChange={setBet}
          onSpin={handleSpinWithPress}
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
