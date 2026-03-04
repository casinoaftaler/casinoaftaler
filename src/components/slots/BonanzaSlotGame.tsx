import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { CreditsExpiredOverlay } from "./CreditsExpiredOverlay";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useBombSymbols } from "@/hooks/useBombSymbols";
import { supabase } from "@/integrations/supabase/client";
import { getTodayDanish } from "@/lib/danishDate";
import { useServerSpin } from "@/hooks/useServerSpin";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { slotSounds } from "@/lib/slotSoundEffects";
import { BonanzaControlBar } from "./BonanzaControlBar";
import { AnimatedSpinCounter } from "./AnimatedSpinCounter";
import { WinCelebration } from "./WinCelebration";
import { SlotIdleEffects } from "./SlotIdleEffects";
import { SlotAmbientLight } from "./SlotAmbientLight";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getSlotTheme } from "@/lib/slotTheme";
import {
  BONANZA_COLS, BONANZA_ROWS, generateBonanzaDisplayGrid, countBonanzaScatters,
  flatToColRow, isBombSymbol, getBombValue, scanGridBombs,
  type BonanzaWin, type BonanzaMultiplierBomb, type BonanzaTumbleStep,
} from "@/lib/bonanzaGameLogic";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { BonanzaColumn, type BonanzaColumnSpinState, type BonanzaCellAnimState } from "./BonanzaColumn";
import { AnimatedWinCounter } from "./AnimatedWinCounter";
import { BonanzaBonusEntrySequence } from "./BonanzaBonusEntrySequence";
import fedesvinBonanzaLogo from "@/assets/fedesvin-bonanza-logo.png";
import { BonanzaRetriggerOverlay } from "./BonanzaRetriggerOverlay";
import { BonanzaBonusEndOverlay } from "./BonanzaBonusEndOverlay";
import { BonanzaTumbleWinPopup, type TumbleWinPopup } from "./BonanzaTumbleWinPopup";
import { BonanzaTumbleWinBar, type CollisionPhase } from "./BonanzaTumbleWinBar";
import { BonanzaFlyingMultiplier, type FlyingMultiplier } from "./BonanzaFlyingMultiplier";

const DEFAULT_SYMBOL_WIDTH = 180;
const DEFAULT_SYMBOL_HEIGHT = 140;
const SYMBOL_GAP = 5;

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface BonanzaSlotGameProps {
  gameId?: string;
}

export function BonanzaSlotGame({ gameId = "fedesvin-bonanza" }: BonanzaSlotGameProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols(gameId);
  const { data: bombSymbols } = useBombSymbols(gameId);
  const { spinsRemaining, maxSpins, canSpin, hasEnoughSpins } = useSlotSpins(gameId);
  const { settings: slotSettings } = useSlotSettings();
  const { data: siteSettings } = useSiteSettings();
  const { spin: serverSpin } = useServerSpin(gameId);
  const theme = getSlotTheme(gameId);

  const SYMBOL_WIDTH = siteSettings?.bonanza_symbol_width ? parseInt(siteSettings.bonanza_symbol_width) : DEFAULT_SYMBOL_WIDTH;
  const SYMBOL_HEIGHT = siteSettings?.bonanza_symbol_height ? parseInt(siteSettings.bonanza_symbol_height) : DEFAULT_SYMBOL_HEIGHT;
  const SYMBOL_SCALE = siteSettings?.bonanza_symbol_scale ? parseInt(siteSettings.bonanza_symbol_scale) : 100;

  const bombSymbolsMap = useMemo(() => {
    if (!bombSymbols) return new Map<number, (typeof bombSymbols)[0]>();
    return new Map(bombSymbols.map(b => [b.value, b]));
  }, [bombSymbols]);

  const [bet, setBet] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [isWinAnimating, setIsWinAnimating] = useState(false);
  const [winningPositions, setWinningPositions] = useState<Set<number>>(new Set());
  const [totalMultiplier, setTotalMultiplier] = useState(0);
  const [tumblePhase, setTumblePhase] = useState<'idle' | 'spinning' | 'showing-wins' | 'tumbling'>('idle');
  const [currentTumbleStep, setCurrentTumbleStep] = useState(0);
  const [columnSpinStates, setColumnSpinStates] = useState<BonanzaColumnSpinState[]>(
    Array(BONANZA_COLS).fill('idle')
  );
  const columnStopTimersRef = useRef<NodeJS.Timeout[]>([]);
  const serverResultRef = useRef<any>(null);
  const [cellAnimStates, setCellAnimStates] = useState<Map<number, BonanzaCellAnimState>>(new Map());
  const [cellDropOffsets, setCellDropOffsets] = useState<Map<number, number>>(new Map());
  const [runningWin, setRunningWin] = useState(0);
  const [runningMultiplier, setRunningMultiplier] = useState(0);
  const [screenShake, setScreenShake] = useState<'none' | 'normal' | 'intense'>('none');
  const [animationEpoch, setAnimationEpoch] = useState(0);
  const [tumbleChainLength, setTumbleChainLength] = useState(0);
  const [tumbleWinPopups, setTumbleWinPopups] = useState<TumbleWinPopup[]>([]);
  const [collisionPhase, setCollisionPhase] = useState<CollisionPhase>('idle');
  const [tumbleBarVisible, setTumbleBarVisible] = useState(false);
  const [flyingMultipliers, setFlyingMultipliers] = useState<FlyingMultiplier[]>([]);
  const gridContainerRef = useRef<HTMLDivElement>(null);
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
  const pendingPostWinSpinRef = useRef<"bonus" | "auto" | null>(null);
  const freeSpinsRemainingRef = useRef(0);
  const isBonusActiveRef = useRef(false);
  const [spinPressed, setSpinPressed] = useState(false);

  // Initialize grid
  useEffect(() => {
    if (symbols && symbols.length > 0 && !grid) {
      setGrid(generateBonanzaDisplayGrid(symbols));
    }
  }, [symbols, grid]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
      columnStopTimersRef.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // Load persisted bonus state
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
          setCumulativeMultiplier(Number(data.expanding_symbol_name) || 0);
          setRunningMultiplier(Number(data.expanding_symbol_name) || 0);
          setBonusAutoSpinPending(true);
        }
      } catch (err) {
        console.error("Failed to load Bonanza bonus state:", err);
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

  useEffect(() => {
    freeSpinsRemainingRef.current = freeSpinsRemaining;
  }, [freeSpinsRemaining]);

  useEffect(() => {
    isBonusActiveRef.current = isBonusActive;
  }, [isBonusActive]);

  const handleBonusEntryComplete = useCallback(() => {
    const bs = pendingBonusStateRef.current;
    setShowBonusTrigger(false);
    showBonusTriggerRef.current = false;
    setBonusAutoSpinPending(false);
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

  // Process tumble steps
  const processTumbleSteps = useCallback(async (steps: BonanzaTumbleStep[]) => {
    let winningStepCount = 0;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setCurrentTumbleStep(i);
      if (i === 0) await new Promise(r => setTimeout(r, 200));

      const hasWins = step.wins.length > 0;

      if (hasWins) {
        winningStepCount++;
        setTumbleChainLength(winningStepCount);
        // Show tumble bar on first win during bonus
        if (winningStepCount === 1 && isBonusActiveRef.current) {
          setTumbleBarVisible(true);
        }

        // Highlight winning symbols
        setTumblePhase('showing-wins');
        const winPositions = new Set(step.winningPositions);
        setWinningPositions(winPositions);
        slotSounds.playSymbolHighlight();
        setRunningWin(prev => prev + step.stepWin);

        // Mark winning cells + activated bombs
        const winAnims = new Map<number, BonanzaCellAnimState>();
        for (const pos of step.winningPositions) winAnims.set(pos, 'winning');
        // Bombs remain visually inert during tumbles — no highlight
        setCellAnimStates(winAnims);

        await new Promise(r => setTimeout(r, 1200));

        // Explode winning symbols + activated bombs
        setTumblePhase('tumbling');
        const removeAnims = new Map<number, BonanzaCellAnimState>();
        for (const pos of step.winningPositions) removeAnims.set(pos, 'exploding');
        // Bombs are NOT animated here — they blow up after all tumbles
        setCellAnimStates(removeAnims);
        slotSounds.playCrackle();

        // Spawn floating win popups when symbols pop (explode), not during highlight
        for (const win of step.wins) {
          if (win.payout > 0 && win.positions.length > 0) {
            let sumX = 0, sumY = 0;
            for (const pos of win.positions) {
              const { col, row } = flatToColRow(pos);
              sumX += SYMBOL_GAP + col * (SYMBOL_WIDTH + SYMBOL_GAP) + SYMBOL_WIDTH / 2;
              sumY += SYMBOL_GAP + row * (SYMBOL_HEIGHT + SYMBOL_GAP) + SYMBOL_HEIGHT / 2;
            }
            const cx = sumX / win.positions.length;
            const cy = sumY / win.positions.length;
            const popupId = `${i}-${win.symbolId}-${Date.now()}`;
            setTumbleWinPopups(prev => [...prev, { id: popupId, amount: win.payout, x: cx, y: cy }]);
            setTimeout(() => {
              setTumbleWinPopups(prev => prev.filter(p => p.id !== popupId));
            }, 1300);
          }
        }

        // Update Gevinst counter at the pop moment (base game: incrementally)
        if (!isBonusActiveRef.current) {
          setWinAmount(prev => prev + step.stepWin);
        }

        await new Promise(r => setTimeout(r, 500));

        setWinningPositions(new Set());

        // Gravity fill
        if (i + 1 < steps.length) {
          const nextGrid = steps[i + 1].grid;
          const dropAnims = new Map<number, BonanzaCellAnimState>();
          const offsets = new Map<number, number>();
          const CELL_HEIGHT = SYMBOL_HEIGHT + SYMBOL_GAP;

          const allRemovedPositions = new Set(step.winningPositions);
          // Do NOT add bomb positions — bombs persist in the grid during tumbles

          for (let col = 0; col < BONANZA_COLS; col++) {
            let removedInCol = 0;
            for (let row = 0; row < BONANZA_ROWS; row++) {
              const flat = col * BONANZA_ROWS + row;
              if (allRemovedPositions.has(flat)) removedInCol++;
            }
            if (removedInCol > 0) {
              const survivorRows: number[] = [];
              for (let row = 0; row < BONANZA_ROWS; row++) {
                const flat = col * BONANZA_ROWS + row;
                if (!allRemovedPositions.has(flat)) survivorRows.push(row);
              }
              for (let row = 0; row < removedInCol; row++) {
                const flat = col * BONANZA_ROWS + row;
                dropAnims.set(flat, 'filling');
              }
              for (let idx = 0; idx < survivorRows.length; idx++) {
                const oldRow = survivorRows[idx];
                const newRow = removedInCol + idx;
                const dropRows = newRow - oldRow;
                if (dropRows > 0) {
                  const flat = col * BONANZA_ROWS + newRow;
                  dropAnims.set(flat, 'dropping');
                  offsets.set(flat, dropRows * CELL_HEIGHT);
                }
              }
            }
          }

          setGrid(nextGrid);
          setCellAnimStates(dropAnims);
          setCellDropOffsets(offsets);
          setAnimationEpoch(prev => prev + 1);
          slotSounds.playClack();
          await new Promise(r => setTimeout(r, 500));
          await new Promise(r => setTimeout(r, 200));
        }

        // Clear animations after gravity has had time to render
        await new Promise(r => setTimeout(r, 100));
        setCellAnimStates(new Map());
        setCellDropOffsets(new Map());
      } else {
        // No win step — bombs sit silently, no tease
        await new Promise(r => setTimeout(r, 300));
      }
    }

    // === Sequential bomb blow-up AFTER all tumbles (only if there were wins) ===
    const lastStepWithBombs = winningStepCount > 0 ? [...steps].reverse().find(s => s.multiplierBombs?.length > 0) : null;
    if (lastStepWithBombs?.multiplierBombs?.length) {
      const sorted = [...lastStepWithBombs.multiplierBombs].sort((a, b) => a.position - b.position);
      const explodedPositions = new Map<number, BonanzaCellAnimState>();

      // Calculate target position for flying multipliers (center-top of grid = tumble bar mult area)
      const gridEl = gridContainerRef.current;
      const targetX = gridEl ? gridEl.offsetWidth / 2 : 300;
      const targetY = 20; // near top of grid where bar is

      for (const bomb of sorted) {
        const animState = bomb.activated ? 'bomb-activate' : 'bomb-fizzle';
        const currentAnims = new Map(explodedPositions);
        currentAnims.set(bomb.position, animState);
        setCellAnimStates(currentAnims);
        if (bomb.activated) {
          slotSounds.playCrackle();

          // Spawn flying multiplier from bomb position to bar
          const { col, row } = flatToColRow(bomb.position);
          const bombX = SYMBOL_GAP + col * (SYMBOL_WIDTH + SYMBOL_GAP) + SYMBOL_WIDTH / 2;
          const bombY = SYMBOL_GAP + row * (SYMBOL_HEIGHT + SYMBOL_GAP) + SYMBOL_HEIGHT / 2;
          const flyId = `fly-${bomb.position}-${Date.now()}`;
          setFlyingMultipliers(prev => [...prev, {
            id: flyId,
            value: bomb.value,
            startX: bombX,
            startY: bombY,
            targetX,
            targetY,
          }]);

          setScreenShake('normal');
          setTimeout(() => setScreenShake('none'), 400);
          setTimeout(() => {
            explodedPositions.set(bomb.position, 'bomb-exploded');
            setCellAnimStates(new Map(explodedPositions));
          }, 150);

          // Wait for fly animation, then update multiplier and remove flyer
          await new Promise(r => setTimeout(r, 500));
          setRunningMultiplier(prev => prev + bomb.value);
          setFlyingMultipliers(prev => prev.filter(f => f.id !== flyId));
        } else {
          await new Promise(r => setTimeout(r, 400));
          explodedPositions.set(bomb.position, 'bomb-exploded');
        }
      }
      setCellAnimStates(new Map(explodedPositions));
      // Wait for the last multiplier pop animation to fully settle before collision
      await new Promise(r => setTimeout(r, 500));
    }

    // Don't clear bomb-exploded states — they stay until next spin
    // Only clear non-bomb-exploded states
    setCellAnimStates(prev => {
      const kept = new Map<number, BonanzaCellAnimState>();
      for (const [pos, state] of prev) {
        if (state === 'bomb-exploded') kept.set(pos, state);
      }
      return kept;
    });
    setCellDropOffsets(new Map());
    setTumbleChainLength(0);

    // Trigger collision effect if there was a win with multiplier (bonus only)
    if (winningStepCount > 0 && isBonusActiveRef.current) {
      // tumbleBarVisible already set to true on first win
      if (lastStepWithBombs?.multiplierBombs?.some(b => b.activated)) {
        setCollisionPhase('colliding');
        await new Promise(r => setTimeout(r, 800));
        setCollisionPhase('resolved');
        await new Promise(r => setTimeout(r, 1200));
        setCollisionPhase('idle');
        setTumbleBarVisible(false);
      } else {
        // Show bar briefly then fade
        await new Promise(r => setTimeout(r, 800));
        setTumbleBarVisible(false);
      }
    }
  }, []);

  // Client seed for provably fair
  const clientSeedRef = useRef<string>(crypto.randomUUID());
  const nonceRef = useRef<number>(0);

  const handleSpin = useCallback(async () => {
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
    setRunningMultiplier(0);
    // Don't clear bomb-exploded decals yet — let them persist through drop-off animation
    if (isBonusSpin) setFreeSpinsRemaining(prev => Math.max(0, prev - 1));
    setIsWinAnimating(false);
    pendingPostWinSpinRef.current = null;
    setWinningPositions(new Set());
    setScreenShake('none');
    setTumbleChainLength(0);
    setTumbleWinPopups([]);
    setCollisionPhase('idle');
    setTumbleBarVisible(false);
    setFlyingMultipliers([]);
    serverResultRef.current = null;

    const STAGGER_MS = 80;
    const DROP_OFF_DURATION = 350;
    const DROP_IN_DURATION = 400;
    const DROP_OFF_ROW_STAGGER_MS = 40; // must match BonanzaColumn drop-off row delay

    for (let c = 0; c < BONANZA_COLS; c++) {
      setTimeout(() => {
        setColumnSpinStates(prev => {
          const next = [...prev];
          next[c] = 'dropping-off';
          return next;
        });
      }, c * STAGGER_MS);
    }

    slotSounds.playSpinStart();

    let shouldWaitForWinAnimation = false;

    try {
      const serverPromise = serverSpin(bet, isBonusSpin, clientSeedRef.current, nonceRef.current);
      const totalDropOffTime =
        DROP_OFF_DURATION +
        (BONANZA_COLS - 1) * STAGGER_MS +
        (BONANZA_ROWS - 1) * DROP_OFF_ROW_STAGGER_MS;
      await new Promise(r => setTimeout(r, totalDropOffTime + 100));

      // Clear bomb-exploded decals after drop-off animation fully completes
      setCellAnimStates(new Map());

      const response = await serverPromise;
      if (!response) {
        // Error already toasted by useServerSpin — just bail out
        return;
      }
      const result = response.result as any;

      if (result.tumbleSteps && result.tumbleSteps.length > 0) {
        setGrid(result.tumbleSteps[0].grid);
      }

      // Drop in
      slotSounds.playSymbolDropIn();
      for (let c = 0; c < BONANZA_COLS; c++) {
        setTimeout(() => {
          setColumnSpinStates(prev => {
            const next = [...prev];
            next[c] = 'dropping-in';
            return next;
          });
          slotSounds.playColumnStop();
        }, c * STAGGER_MS);
      }

      const totalDropInTime = DROP_IN_DURATION + (BONANZA_COLS - 1) * STAGGER_MS;
      await new Promise(r => setTimeout(r, totalDropInTime));
      setColumnSpinStates(Array(BONANZA_COLS).fill('idle'));

      // Scatter tease — only at exactly 3 scatters, shown after tumble wins pop (handled in processTumbleSteps)
      // No tease at 2 scatters anymore

      if (result.tumbleSteps) {
        await processTumbleSteps(result.tumbleSteps);
        const totalWin = result.totalWin || 0;
        setWinAmount(totalWin);

        if (totalWin > 0) {
          setIsWinAnimating(true);
          shouldWaitForWinAnimation = true;
          if (totalWin >= bet * 10) slotSounds.playBigWin();
          else if (totalWin >= bet * 3) slotSounds.playMediumWin();
          else slotSounds.playSmallWin();
          // queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
        }

        // Handle bonus state — defer if win celebration is playing
        if (response.bonusState) {
          const bs = response.bonusState as any;
          if (bs.isActive !== undefined) {
            const executeBonusAction = () => {
              if (!isBonusActive && bs.freeSpinsRemaining > 0) {
                pendingBonusStateRef.current = bs;
                const finalGrid = result.tumbleSteps?.[result.tumbleSteps.length - 1]?.grid || grid;
                if (finalGrid && symbols) {
                  const { positions: scatterPos } = countBonanzaScatters(finalGrid, symbols);
                  if (scatterPos.length > 0) {
                    const scatterAnims = new Map<number, BonanzaCellAnimState>();
                    scatterPos.forEach(pos => scatterAnims.set(pos, 'scatter-pulse'));
                    setCellAnimStates(scatterAnims);
                    slotSounds.playScatterCelebration();
                    setTimeout(() => {
                      setCellAnimStates(new Map());
                      setShowBonusTrigger(true);
                      showBonusTriggerRef.current = true;
                      setScreenShake('intense');
                      setTimeout(() => setScreenShake('none'), 600);
                      setRunningWin(0);
                      setRunningMultiplier(0);
                    }, 1500);
                    return;
                  }
                }
                setShowBonusTrigger(true);
                showBonusTriggerRef.current = true;
                setScreenShake('intense');
                setTimeout(() => setScreenShake('none'), 600);
                setRunningWin(0);
                setRunningMultiplier(0);
              } else if (bs.isRetrigger) {
                setScreenShake('intense');
                setTimeout(() => setScreenShake('none'), 500);
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
                  setTimeout(() => setScreenShake('none'), 800);
                  setShowBonusComplete(true);
                  showBonusCompleteRef.current = true;
                }
              }
            };

            // If win celebration is playing, defer; otherwise execute immediately
            if (shouldWaitForWinAnimation) {
              pendingBonusActionRef.current = executeBonusAction;
            } else {
              executeBonusAction();
            }
          }
        }

        if (response.spinsRemaining !== undefined) {
          const today = getTodayDanish();
          queryClient.setQueryData(
            ["slot-spins", user?.id, today, "shared"],
            (old: any) => old ? { ...old, spins_remaining: response.spinsRemaining } : old
          );
          queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
        }
      }
    } catch (err) {
      console.error("Bonanza spin error:", err);
      toast.error("Der opstod en fejl. Prøv igen.");
    } finally {
      setIsSpinning(false);
      setTumblePhase('idle');
      // Keep spin locked if a bonus action is pending (e.g. bonus trigger overlay about to show)
      if (!pendingBonusActionRef.current) {
        spinLockRef.current = false;
      }

      const shouldContinueBonus =
        isBonusActiveRef.current &&
        freeSpinsRemainingRef.current > 0 &&
        !showBonusTriggerRef.current &&
        !showBonusCompleteRef.current &&
        !showRetriggerRef.current &&
        !pendingBonusActionRef.current;

      if (shouldContinueBonus) {
        if (shouldWaitForWinAnimation) {
          pendingPostWinSpinRef.current = 'bonus';
        } else {
          if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
          autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 500);
        }
      } else if (isAutoSpinning && !shouldStopAutoSpinRef.current && !pendingBonusActionRef.current) {
        if (autoSpinsRemaining !== null) {
          const newCount = autoSpinsRemaining - 1;
          setAutoSpinsRemaining(newCount);
          if (newCount <= 0) { stopAutoSpin(); return; }
        }

        if (shouldWaitForWinAnimation) {
          pendingPostWinSpinRef.current = 'auto';
        } else {
          if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
          autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 1500);
        }
      }
    }
  }, [symbols, user, isSpinning, bet, isBonusActive, freeSpinsRemaining, hasEnoughSpins, serverSpin, processTumbleSteps, queryClient, isAutoSpinning, autoSpinsRemaining, stopAutoSpin]);

  const handleRetriggerComplete = useCallback(() => {
    setShowRetrigger(false);
    showRetriggerRef.current = false;
    setBonusAutoSpinPending(true);
  }, []);

  useEffect(() => {
    if (isAutoSpinning && !isSpinning && !showBonusTriggerRef.current && !showBonusCompleteRef.current && !showRetriggerRef.current) {
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [isAutoSpinning]);

  useEffect(() => {
    if (
      bonusAutoSpinPending &&
      isBonusActive &&
      freeSpinsRemainingRef.current > 0 &&
      !isSpinning &&
      !showBonusTriggerRef.current &&
      !showBonusCompleteRef.current &&
      !showRetriggerRef.current
    ) {
      setBonusAutoSpinPending(false);
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [bonusAutoSpinPending, isBonusActive, isSpinning, handleSpin]);

   const handleSpinWithPress = useCallback(async () => {
    setSpinPressed(true);
    setTimeout(() => setSpinPressed(false), 200);
    handleSpin();
  }, [handleSpin]);

  // Spacebar to spin + prevent page scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleSpinWithPress();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSpinWithPress]);

  if (symbolsLoading || !symbols) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-pink-400" />
      </div>
    );
  }

  const gridWidth = BONANZA_COLS * (SYMBOL_WIDTH + SYMBOL_GAP) + SYMBOL_GAP;
  const gridHeight = BONANZA_ROWS * (SYMBOL_HEIGHT + SYMBOL_GAP) + SYMBOL_GAP;

  return (
    <div className="flex flex-col items-center gap-4 relative" style={{ width: gridWidth, maxWidth: "100%" }}>
      {/* Credits expired overlay */}
      <CreditsExpiredOverlay isVisible={spinsRemaining <= 0 && !isBonusActive && !isSpinning && tumblePhase === 'idle'} />
      {/* Bonus overlays moved inside grid below */}

      {/* Win celebration */}
      {isWinAnimating && winAmount > 0 && (
        <WinCelebration
          isActive={true}
          winAmount={winAmount}
          bet={bet}
          onAnimationComplete={() => {
            setIsWinAnimating(false);

            // Execute deferred bonus/retrigger/complete action
            if (pendingBonusActionRef.current) {
              const action = pendingBonusActionRef.current;
              pendingBonusActionRef.current = null;
              spinLockRef.current = false; // Release lock now that bonus action is executing
              setTimeout(() => {
                action();

                // Let React commit bonus state updates first, then request bonus auto-spin resume.
                // The bonusAutoSpinPending effect will only fire when overlays are closed and spins remain.
                setTimeout(() => {
                  setBonusAutoSpinPending(true);
                }, 120);
              }, 300);
              return;
            }

            if (pendingPostWinSpinRef.current === 'bonus') {
              pendingPostWinSpinRef.current = null;
              if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
              autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 500);
              return;
            }

            if (pendingPostWinSpinRef.current === 'auto' && !shouldStopAutoSpinRef.current) {
              pendingPostWinSpinRef.current = null;
              if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
              autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 1000);
              return;
            }

            pendingPostWinSpinRef.current = null;
          }}
          gameId={gameId}
        />
      )}

      {/* Logo positioned above grid like Sweet Bonanza */}
      <div className="flex justify-center relative z-10" style={{ width: gridWidth, marginBottom: -22 }}>
        <img
          src={fedesvinBonanzaLogo}
          alt="Fedesvin Bonanza"
          className="pointer-events-none block"
          style={{ width: gridWidth * 0.54, transform: 'translateY(10px)' }}
          draggable={false}
        />
      </div>

      {/* Main game grid with candy stripe border */}
      <div className="relative" style={{ width: gridWidth }}>
        {/* Candy stripe border */}
        <div
          className="absolute pointer-events-none z-10 bonanza-candy-stripe-border"
          style={{
            inset: "-6px",
            borderRadius: "1rem",
          }}
        />
      <div
        ref={gridContainerRef}
        className={cn(
          "relative rounded-xl border-[3px] transition-all duration-500",
          isBonusActive
            ? "bg-gradient-to-b from-pink-800/80 via-fuchsia-900/70 to-pink-900/80 border-pink-500/50 shadow-[0_0_30px_rgba(180,50,120,0.5),inset_0_0_20px_rgba(120,30,80,0.3),0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-pink-100/80 via-rose-50/70 to-fuchsia-100/80 border-pink-400/60 shadow-[0_0_20px_rgba(236,72,153,0.3),inset_0_0_15px_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.4)]",
          screenShake === 'normal' && "bonanza-shake",
          screenShake === 'intense' && "bonanza-shake-intense",
        )}
        style={{ width: gridWidth, height: gridHeight, overflow: 'clip' }}
      >
        <SlotAmbientLight isIdle={!isSpinning && tumblePhase === 'idle' && !isBonusActive} theme="pink" />
        <SlotIdleEffects isIdle={!isSpinning && tumblePhase === 'idle' && !isBonusActive} theme="pink" width={gridWidth} height={gridHeight} />
        {/* Static vertical reel dividers — purely visual, above grid content */}
        {Array.from({ length: BONANZA_COLS - 1 }).map((_, i) => (
          <div
            key={`divider-v-${i}`}
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: SYMBOL_GAP + (i + 1) * (SYMBOL_WIDTH + SYMBOL_GAP) - SYMBOL_GAP / 2,
              width: 2,
              background: 'linear-gradient(to bottom, rgba(236,72,153,0.1), rgba(236,72,153,0.3), rgba(236,72,153,0.1))',
              zIndex: 10,
            }}
          />
        ))}
        <div
          className="relative flex"
          style={{ gap: `${SYMBOL_GAP}px`, padding: `${SYMBOL_GAP}px`, zIndex: 1 }}
        >
          {Array.from({ length: BONANZA_COLS }).map((_, col) => {
            const colSymbolIds = grid ? grid[col] || [] : [];
            return (
              <BonanzaColumn
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
                bombSymbolsMap={bombSymbolsMap}
                symbolWidth={SYMBOL_WIDTH}
                symbolHeight={SYMBOL_HEIGHT}
                symbolScale={SYMBOL_SCALE}
                isBonusActive={isBonusActive}
              />
            );
          })}
        </div>
        {/* Floating tumble win popups */}
        <BonanzaTumbleWinPopup popups={tumbleWinPopups} />
        {/* Flying bomb multipliers */}
        <BonanzaFlyingMultiplier flyers={flyingMultipliers} />
        {/* Tumble win bar overlay */}
        <BonanzaTumbleWinBar
          runningWin={runningWin}
          runningMultiplier={runningMultiplier}
          collisionPhase={collisionPhase}
          visible={tumbleBarVisible && isBonusActive}
        />
        {/* Bonus overlays — inside grid so they match grid size */}
        <BonanzaBonusEntrySequence
          isActive={showBonusTrigger}
          freeSpinsAwarded={pendingBonusStateRef.current?.freeSpinsRemaining || 10}
          onComplete={handleBonusEntryComplete}
        />
        <BonanzaRetriggerOverlay
          isActive={showRetrigger}
          spinsAwarded={5}
          onComplete={handleRetriggerComplete}
        />
        <BonanzaBonusEndOverlay
          isActive={showBonusComplete}
          totalWin={bonusWinnings}
          totalMultiplier={cumulativeMultiplier}
          totalSpins={totalFreeSpins}
          onComplete={() => {
            setShowBonusComplete(false);
            showBonusCompleteRef.current = false;
            setIsBonusActive(false);
            isBonusActiveRef.current = false;
            setBonusAutoSpinPending(false);
            setCumulativeMultiplier(0);
            setRunningMultiplier(0);
            setBonusWinnings(0);
            setRunningWin(0);
            
            // Resume auto-spinning after bonus ends
            if (isAutoSpinning && !shouldStopAutoSpinRef.current) {
              if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
              autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 1000);
            }
          }}
        />
      </div>
      </div>

      {/* Resterende spins — bonus only */}
      {isBonusActive && (
        <div className="w-full flex justify-center">
          <div className="flex items-baseline gap-2">
            <span
              className="text-sm uppercase tracking-widest font-bold text-pink-400"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(236,72,153,0.6)" }}
            >
              Resterende spins
            </span>
            <AnimatedSpinCounter
              value={freeSpinsRemaining}
              className="text-2xl font-black text-pink-300 tabular-nums"
            />
            <span
              className="text-sm text-pink-500/60 font-bold"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
            >
              / {totalFreeSpins}
            </span>
          </div>
        </div>
      )}

      {/* Control panel */}
      <div className="w-full relative">
        <BonanzaControlBar
          bet={bet}
          onBetChange={setBet}
          onSpin={handleSpinWithPress}
          minBet={slotSettings.minBet}
          maxBet={siteSettings?.bonanza_max_bet ? parseInt(siteSettings.bonanza_max_bet) : slotSettings.maxBet}
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
