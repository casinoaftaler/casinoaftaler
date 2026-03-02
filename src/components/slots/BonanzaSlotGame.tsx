import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
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
import { GatesControlBar } from "./GatesControlBar";
import { AnimatedSpinCounter } from "./AnimatedSpinCounter";
import { WinCelebration } from "./WinCelebration";
import { Loader2, Bug } from "lucide-react";
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
import { BonanzaRetriggerOverlay } from "./BonanzaRetriggerOverlay";
import { BonanzaBonusEndOverlay } from "./BonanzaBonusEndOverlay";

const SYMBOL_WIDTH = 140;
const SYMBOL_HEIGHT = 108;
const SYMBOL_GAP = 5;

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface BonanzaSlotGameProps {
  gameId?: string;
}

export function BonanzaSlotGame({ gameId = "fedesvin-bonanza" }: BonanzaSlotGameProps) {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols(gameId);
  const { data: bombSymbols } = useBombSymbols(gameId);
  const { spinsRemaining, maxSpins, canSpin, hasEnoughSpins } = useSlotSpins();
  const { settings: slotSettings } = useSlotSettings();
  const { data: siteSettings } = useSiteSettings();
  const { spin: serverSpin } = useServerSpin(gameId);
  const theme = getSlotTheme(gameId);

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
  const debugScattersRef = useRef(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState<AutoSpinCount>(10);
  const [autoSpinsRemaining, setAutoSpinsRemaining] = useState<number | null>(null);
  const autoSpinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldStopAutoSpinRef = useRef(false);
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
      for (const bomb of sorted) {
        const animState = bomb.activated ? 'bomb-activate' : 'bomb-fizzle';
        // Keep previously exploded bombs hidden while animating next
        const currentAnims = new Map(explodedPositions);
        currentAnims.set(bomb.position, animState);
        setCellAnimStates(currentAnims);
        if (bomb.activated) {
          slotSounds.playCrackle();
          setRunningMultiplier(prev => prev + bomb.value);
          setScreenShake('normal');
          setTimeout(() => setScreenShake('none'), 400);
        }
        await new Promise(r => setTimeout(r, 400));
        // After animation, mark as exploded so it stays hidden
        explodedPositions.set(bomb.position, 'bomb-exploded');
      }
      // Keep exploded decals visible — they persist until next spin
      setCellAnimStates(new Map(explodedPositions));
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
    setCellAnimStates(new Map()); // Clear bomb-exploded decals on new spin
    if (isBonusSpin) setFreeSpinsRemaining(prev => Math.max(0, prev - 1));
    setIsWinAnimating(false);
    setWinningPositions(new Set());
    setScreenShake('none');
    setTumbleChainLength(0);
    serverResultRef.current = null;

    const STAGGER_MS = 80;
    const DROP_OFF_DURATION = 350;
    const DROP_IN_DURATION = 400;

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

    try {
      const useDebugScatters = debugScattersRef.current;
      debugScattersRef.current = false;
      const serverPromise = serverSpin(bet, isBonusSpin, clientSeedRef.current, nonceRef.current, useDebugScatters || undefined);
      const totalDropOffTime = DROP_OFF_DURATION + (BONANZA_COLS - 1) * STAGGER_MS;
      await new Promise(r => setTimeout(r, totalDropOffTime));

      const response = await serverPromise;
      if (!response) throw new Error("Spin failed");
      const result = response.result as any;

      if (result.tumbleSteps && result.tumbleSteps.length > 0) {
        setGrid(result.tumbleSteps[0].grid);
      }

      // Drop in
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
          if (totalWin >= bet * 10) slotSounds.playBigWin();
          else if (totalWin >= bet * 3) slotSounds.playMediumWin();
          else slotSounds.playSmallWin();
          // DEV MODE: Skip leaderboard invalidation for Bonanza
          // queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
        }

        // Handle bonus state
        if (response.bonusState) {
          const bs = response.bonusState as any;
          if (bs.isActive !== undefined) {
            if (!isBonusActive && bs.freeSpinsRemaining > 0) {
              pendingBonusStateRef.current = bs;
              if (grid && symbols) {
                const { positions: scatterPos } = countBonanzaScatters(grid, symbols);
                if (scatterPos.length > 0) {
                  const scatterAnims = new Map<number, BonanzaCellAnimState>();
                  scatterPos.forEach(pos => scatterAnims.set(pos, 'scatter-pulse'));
                  setCellAnimStates(scatterAnims);
                  slotSounds.playScatterCelebration();
                  await new Promise(r => setTimeout(r, 1500));
                  setCellAnimStates(new Map());
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
          }
        }

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
      console.error("Bonanza spin error:", err);
      toast.error("Der opstod en fejl. Prøv igen.");
    } finally {
      setIsSpinning(false);
      setTumblePhase('idle');
      spinLockRef.current = false;

      if (isBonusActive && freeSpinsRemaining > 0 && !showBonusTriggerRef.current && !showBonusCompleteRef.current && !showRetriggerRef.current) {
        autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 500);
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
    setBonusAutoSpinPending(true);
  }, []);

  useEffect(() => {
    if (isAutoSpinning && !isSpinning && !showBonusTriggerRef.current && !showBonusCompleteRef.current && !showRetriggerRef.current) {
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [isAutoSpinning]);

  useEffect(() => {
    if (bonusAutoSpinPending && isBonusActive && !isSpinning) {
      setBonusAutoSpinPending(false);
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [bonusAutoSpinPending, isBonusActive, isSpinning, handleSpin]);

  const handleSpinWithPress = useCallback(async () => {
    setSpinPressed(true);
    setTimeout(() => setSpinPressed(false), 200);
    handleSpin();
  }, [handleSpin]);

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
    <div className="flex flex-col items-center gap-4" style={{ width: gridWidth, maxWidth: "100%" }}>
      {/* Bonus bar */}
      {isBonusActive && (
        <div className="w-full flex justify-center animate-fade-in">
          <div className="flex items-center gap-6 px-8 py-3 rounded-2xl border-2 bg-gradient-to-b from-pink-900/90 via-pink-950/95 to-pink-950/90 border-pink-500/60 shadow-[0_0_30px_rgba(236,72,153,0.3),0_0_60px_rgba(236,72,153,0.15)]">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-pink-400/80 font-semibold">Free Spins</span>
              <div className="flex items-baseline gap-1">
                <AnimatedSpinCounter
                  value={freeSpinsRemaining}
                  className="text-4xl font-black text-pink-300 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] tabular-nums"
                />
                <span className="text-lg text-pink-500/60 font-bold">/ {totalFreeSpins}</span>
              </div>
            </div>
            <div className="w-px h-10 bg-pink-500/30" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-pink-400/80 font-semibold">Tumble Win</span>
              <span className="text-2xl font-black text-pink-200 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] tabular-nums">
                {runningWin.toFixed(2)}
              </span>
            </div>
            <div className="w-px h-10 bg-pink-500/30" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-yellow-400/80 font-semibold">Multiplier</span>
              <span className="text-2xl font-black text-yellow-300 drop-shadow-[0_0_10px_rgba(250,204,21,0.7)] tabular-nums">
                x{runningMultiplier}
              </span>
            </div>
            <div className="w-px h-10 bg-pink-500/30" />
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-semibold">Total</span>
              <span className="text-2xl font-black text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.7)] tabular-nums">
                {(runningWin * Math.max(1, runningMultiplier)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bonus overlays */}
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
          setCumulativeMultiplier(0);
          setRunningMultiplier(0);
          setBonusWinnings(0);
          setRunningWin(0);
        }}
      />

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
          "bg-gradient-to-b from-pink-950/80 via-fuchsia-950/70 to-pink-950/80",
          "border-pink-500/30",
          screenShake === 'normal' && "bonanza-shake",
          screenShake === 'intense' && "bonanza-shake-intense",
        )}
        style={{ width: gridWidth, height: gridHeight }}
      >
        <div
          className="relative flex"
          style={{ gap: `${SYMBOL_GAP}px`, padding: `${SYMBOL_GAP}px` }}
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
              />
            );
          })}
          {/* Static vertical reel dividers — absolutely positioned so animations can't move them */}
          {Array.from({ length: BONANZA_COLS - 1 }).map((_, i) => (
            <div
              key={`divider-${i}`}
              className="absolute top-0 bottom-0 w-px bg-pink-400/20 pointer-events-none"
              style={{ left: SYMBOL_GAP + (i + 1) * (SYMBOL_WIDTH + SYMBOL_GAP) - SYMBOL_GAP / 2 }}
            />
          ))}
        </div>
      </div>

      {/* Gevinst bar */}
      <div className="w-full flex justify-center">
        <div className={cn(
          "flex items-center gap-4 px-6 py-2 rounded-xl border",
          isBonusActive
            ? "bg-gradient-to-b from-pink-900/60 via-pink-950/70 to-pink-950/60 border-pink-500/40"
            : "bg-gradient-to-b from-pink-950/60 via-fuchsia-950/60 to-pink-950/60 border-pink-500/20"
        )}>
          <div className="flex flex-col items-center">
            <span className={cn(
              "text-[10px] uppercase tracking-widest font-semibold",
              "text-green-400/70"
            )}>Gevinst</span>
            <span className="text-2xl font-black tabular-nums text-green-300/90 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
              {isBonusActive
                ? (tumblePhase !== 'idle' ? (bonusWinnings + runningWin) : bonusWinnings).toLocaleString()
                : (tumblePhase !== 'idle' ? runningWin : winAmount).toLocaleString()
              }
            </span>
          </div>
          {isBonusActive && tumblePhase !== 'idle' && runningWin > 0 && (
            <>
              <div className="w-px h-8 bg-pink-500/30" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-pink-400/70">Tumble</span>
                <span className="text-lg font-bold tabular-nums text-pink-300 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                  +{runningWin.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Control panel */}
      <div className="w-full relative">
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
        {isAdmin && !isBonusActive && (
          <button
            onClick={() => {
              if (isSpinning || tumblePhase !== 'idle' || spinLockRef.current) return;
              debugScattersRef.current = true;
              handleSpin();
            }}
            disabled={isSpinning || tumblePhase !== 'idle'}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/30 text-pink-300 transition-colors disabled:opacity-30"
            title="Debug: Force 4 Scatters"
          >
            <Bug className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
