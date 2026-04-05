import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { MULTIPLIER_SYMBOLS } from "@/lib/gatesMultiplierSymbols";
import { CreditsExpiredOverlay } from "./CreditsExpiredOverlay";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useBombSymbols } from "@/hooks/useBombSymbols";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSiteSettings } from "@/hooks/useSiteSettings";
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
  GATES_COLS, GATES_ROWS, generateGatesDisplayGrid, flatToColRow,
  isBombSymbol, getBombValue, scanGridBombs,
} from "@/lib/gatesGameLogic";
import { countGatesScatters } from "@/lib/gatesGameLogic";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { GatesColumn, type ColumnSpinState, type CellAnimState } from "./GatesColumn";
import { AnimatedWinCounter } from "./AnimatedWinCounter";
import { BonusEntrySequence } from "./BonusEntrySequence";
import { GatesRetriggerOverlay } from "./GatesRetriggerOverlay";
import { GatesBonusEndOverlay } from "./GatesBonusEndOverlay";
import { useGatesIntensity } from "@/hooks/useGatesIntensity";
import gatesTitleArt from "@/assets/slots/gates/title-art.png";
import { ChromaKeyVideo } from "./ChromaKeyVideo";

import { BonanzaTumbleWinPopup, type TumbleWinPopup } from "./BonanzaTumbleWinPopup";
import { BonanzaTumbleWinBar, type CollisionPhase } from "./BonanzaTumbleWinBar";
import { BonanzaFlyingMultiplier, type FlyingMultiplier } from "./BonanzaFlyingMultiplier";
import { BonanzaSidePanels } from "./BonanzaSidePanels";
import { GatesMultiplierOrb } from "./GatesMultiplierOrb";
import { GatesBonusSpinWinReveal } from "./GatesBonusSpinWinReveal";

const DEFAULT_SYMBOL_WIDTH = 180;
const DEFAULT_SYMBOL_HEIGHT = 140;
const SYMBOL_GAP = 5;

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

interface GatesSlotGameProps {
  gameId?: string;
  isMobile?: boolean;
}

export function GatesSlotGame({ gameId = "gates-of-fedesvin", isMobile = false }: GatesSlotGameProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols(gameId);
  const { data: bombSymbols } = useBombSymbols(gameId);
  const { spinsRemaining, maxSpins, canSpin, hasEnoughSpins } = useSlotSpins(gameId);
  const { settings: slotSettings } = useSlotSettings();
  const { data: siteSettings } = useSiteSettings();
  const { spin: serverSpin } = useServerSpin(gameId);
  const theme = getSlotTheme(gameId);

  // On mobile, calculate symbol size to fill viewport width
  const mobileSymbolWidth = useMemo(() => {
    if (!isMobile || typeof window === 'undefined') return DEFAULT_SYMBOL_WIDTH;
    const viewportWidth = window.innerWidth;
    const totalGaps = (GATES_COLS + 1) * SYMBOL_GAP;
    const padding = 8;
    return Math.floor((viewportWidth - totalGaps - padding) / GATES_COLS);
  }, [isMobile]);

  const SYMBOL_WIDTH = isMobile ? mobileSymbolWidth : DEFAULT_SYMBOL_WIDTH;
  const SYMBOL_HEIGHT = isMobile ? Math.floor(mobileSymbolWidth * 0.78) : DEFAULT_SYMBOL_HEIGHT;

  const bombSymbolsMap = useMemo(() => {
    if (!bombSymbols) return new Map<number, (typeof bombSymbols)[0]>();
    const map = new Map(bombSymbols.map(b => [b.value, b]));
    // Override with local orb images
    for (const ms of MULTIPLIER_SYMBOLS) {
      const existing = map.get(ms.value);
      if (existing) {
        map.set(ms.value, { ...existing, image_url: ms.imageUrl });
      }
    }
    return map;
  }, [bombSymbols]);

  const [bet, setBet] = useState(1);
  const [doubleChance, setDoubleChance] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [winAmount, setWinAmountRaw] = useState(0);
  const [isBuyingBonus, setIsBuyingBonus] = useState(false);
  const [isWinAnimating, setIsWinAnimating] = useState(false);
  const [currentSpinWin, setCurrentSpinWin] = useState(0);
  const [winningPositions, setWinningPositions] = useState<Set<number>>(new Set());
  const [totalMultiplier, setTotalMultiplier] = useState(0);
  const [tumblePhase, setTumblePhase] = useState<'idle' | 'spinning' | 'showing-wins' | 'tumbling'>('idle');
  const [currentTumbleStep, setCurrentTumbleStep] = useState(0);
  const [columnSpinStates, setColumnSpinStates] = useState<ColumnSpinState[]>(
    Array(GATES_COLS).fill('idle')
  );
  const columnStopTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const serverResultRef = useRef<any>(null);
  const [cellAnimStates, setCellAnimStates] = useState<Map<number, CellAnimState>>(new Map());
  const [cellDropOffsets, setCellDropOffsets] = useState<Map<number, number>>(new Map());
  const [runningWin, setRunningWin] = useState(0);
  const [runningMultiplier, setRunningMultiplier] = useState(0);
  const [screenShake, setScreenShake] = useState<'none' | 'normal' | 'intense'>('none');
  const [showLightningFlash, setShowLightningFlash] = useState(false);
  const [animationEpoch, setAnimationEpoch] = useState(0);
  const [tumbleChainLength, setTumbleChainLength] = useState(0);
  const [tumbleWinPopups, setTumbleWinPopups] = useState<TumbleWinPopup[]>([]);
  const [collisionPhase, setCollisionPhase] = useState<CollisionPhase>('idle');
  const [tumbleBarVisible, setTumbleBarVisible] = useState(false);
  const [flyingMultipliers, setFlyingMultipliers] = useState<FlyingMultiplier[]>([]);
  const [showOrbVideo, setShowOrbVideo] = useState(false);
  const [orbVideoTrigger, setOrbVideoTrigger] = useState(0);
  const orbVideoPlayingRef = useRef(false);
  const lastOrbReactionSignatureRef = useRef("");
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [showSpinWinReveal, setShowSpinWinReveal] = useState(false);
  const [revealTumbleWin, setRevealTumbleWin] = useState(0);
  const [revealMultiplier, setRevealMultiplier] = useState(0);

  // Bonus state
  const [isBonusActive, setIsBonusActive] = useState(false);
  const [freeSpinsRemaining, setFreeSpinsRemaining] = useState(0);
  const [totalFreeSpins, setTotalFreeSpins] = useState(0);
  const [bonusWinnings, setBonusWinnings] = useState(0);
  const [cumulativeMultiplier, setCumulativeMultiplier] = useState(0);
  const cumulativeMultiplierRef = useRef(0);
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
  const autoSpinsRemainingRef = useRef<number | null>(null);
  const autoSpinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldStopAutoSpinRef = useRef(false);
  const isAutoSpinningRef = useRef(false);
  const pendingPostWinSpinRef = useRef<"bonus" | "auto" | null>(null);
  const freeSpinsRemainingRef = useRef(0);
  const isBonusActiveRef = useRef(false);
  const [spinPressed, setSpinPressed] = useState(false);

  // Keep cumulativeMultiplierRef in sync
  useEffect(() => { cumulativeMultiplierRef.current = cumulativeMultiplier; }, [cumulativeMultiplier]);

  // Persist winAmount to localStorage when bonus is active
  const bonusWinKey = `gates_win_${gameId}_${user?.id}`;
  const setWinAmount = useCallback((val: number | ((prev: number) => number)) => {
    setWinAmountRaw(prev => {
      const next = typeof val === 'function' ? val(prev) : val;
      if (isBonusActiveRef.current) {
        try { localStorage.setItem(bonusWinKey, String(next)); } catch {}
      }
      return next;
    });
  }, [bonusWinKey]);

  // Initialize grid
  useEffect(() => {
    if (symbols && symbols.length > 0 && !grid) {
      setGrid(generateGatesDisplayGrid(symbols));
    }
  }, [symbols, grid]);

  // Unlock audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      slotSounds.unlockAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
      columnStopTimersRef.current.forEach(t => clearTimeout(t));
      slotSounds.stopMusic();
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
          cumulativeMultiplierRef.current = Number(data.expanding_symbol_name) || 0;
          setRunningMultiplier(Number(data.expanding_symbol_name) || 0);
          try {
            const savedWin = localStorage.getItem(`gates_win_${gameId}_${user.id}`);
            if (savedWin) setWinAmountRaw(Number(savedWin) || 0);
          } catch {}
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
    isAutoSpinningRef.current = false;
    setAutoSpinsRemaining(null);
    autoSpinsRemainingRef.current = null;
    shouldStopAutoSpinRef.current = true;
    if (autoSpinTimeoutRef.current) { clearTimeout(autoSpinTimeoutRef.current); autoSpinTimeoutRef.current = null; }
  }, []);

  const startAutoSpin = useCallback(() => {
    const count = autoSpinCount === "infinite" ? null : autoSpinCount;
    setIsAutoSpinning(true);
    isAutoSpinningRef.current = true;
    setAutoSpinsRemaining(count);
    autoSpinsRemainingRef.current = count;
    shouldStopAutoSpinRef.current = false;
  }, [autoSpinCount]);

  const toggleAutoSpin = useCallback(() => {
    if (isAutoSpinning) stopAutoSpin(); else startAutoSpin();
  }, [isAutoSpinning, stopAutoSpin, startAutoSpin]);

  const [bonusAutoSpinPending, setBonusAutoSpinPending] = useState(false);

  const resetOrbReactionState = useCallback(() => {
    setShowOrbVideo(false);
    orbVideoPlayingRef.current = false;
    lastOrbReactionSignatureRef.current = "";
  }, []);

  const triggerOrbReaction = useCallback((multiplierBombs?: Array<{ position: number; value: number }>) => {
    if (!multiplierBombs?.length) return;

    const signature = [...multiplierBombs]
      .sort((a, b) => a.position - b.position)
      .map(bomb => `${bomb.position}:${bomb.value}`)
      .join("|");

    if (!signature || signature === lastOrbReactionSignatureRef.current) return;

    lastOrbReactionSignatureRef.current = signature;
    orbVideoPlayingRef.current = true;
    setShowOrbVideo(true);
    setOrbVideoTrigger(prev => prev + 1);
  }, []);

  useEffect(() => { freeSpinsRemainingRef.current = freeSpinsRemaining; }, [freeSpinsRemaining]);
  useEffect(() => { isBonusActiveRef.current = isBonusActive; }, [isBonusActive]);

  const handleSpinRef = useRef<() => void>(() => {});

  const handleBonusEntryComplete = useCallback(() => {
    const bs = pendingBonusStateRef.current;
    setShowBonusTrigger(false);
    showBonusTriggerRef.current = false;
    spinLockRef.current = false;
    if (bs) {
      setIsBonusActive(true);
      isBonusActiveRef.current = true;
      setFreeSpinsRemaining(bs.freeSpinsRemaining);
      freeSpinsRemainingRef.current = bs.freeSpinsRemaining;
      setTotalFreeSpins(bs.totalFreeSpins);
      setBonusWinnings(0);
      setCumulativeMultiplier(0);
      cumulativeMultiplierRef.current = 0;
      pendingBonusStateRef.current = null;
      // Always auto-spin during bonus
      if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
      autoSpinTimeoutRef.current = setTimeout(() => handleSpinRef.current(), 800);
    }
    setBonusAutoSpinPending(false);
  }, []);

  // Process tumble steps — Bonanza-style with sequential bomb blow-up
  const processTumbleSteps = useCallback(async (steps: any[], serverTotalWin?: number) => {
    let winningStepCount = 0;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setCurrentTumbleStep(i);
      if (i === 0) await new Promise(r => setTimeout(r, 200));

      // Trigger the character reaction only when the currently visible grid contains a new orb layout.
      triggerOrbReaction(step.multiplierBombs);

      const hasWins = step.wins.length > 0;

      if (hasWins) {
        winningStepCount++;
        setTumbleChainLength(winningStepCount);
        if (winningStepCount === 1) setTumbleBarVisible(true);

        setTumblePhase('showing-wins');
        const winPositions = new Set<number>(step.winningPositions);
        setWinningPositions(winPositions);
        slotSounds.playSymbolHighlight();
        setRunningWin(prev => prev + step.stepWin);

        const winAnims = new Map<number, CellAnimState>();
        for (const pos of step.winningPositions) winAnims.set(pos, 'winning');
        setCellAnimStates(winAnims);

        await new Promise(r => setTimeout(r, 1200));

        setTumblePhase('tumbling');
        const removeAnims = new Map<number, CellAnimState>();
        for (const pos of step.winningPositions) removeAnims.set(pos, 'exploding');
        setCellAnimStates(removeAnims);
        slotSounds.playCrackle();

        // Floating win popups
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
            setTimeout(() => { setTumbleWinPopups(prev => prev.filter(p => p.id !== popupId)); }, 1300);
          }
        }

        await new Promise(r => setTimeout(r, 500));
        setWinningPositions(new Set());

        // Gravity fill
        if (i + 1 < steps.length) {
          const nextGrid = steps[i + 1].grid;
          const dropAnims = new Map<number, CellAnimState>();
          const offsets = new Map<number, number>();
          const CELL_HEIGHT = SYMBOL_HEIGHT + SYMBOL_GAP;
          const allRemovedPositions = new Set<number>(step.winningPositions);

          for (let col = 0; col < GATES_COLS; col++) {
            let removedInCol = 0;
            for (let row = 0; row < GATES_ROWS; row++) {
              const flat = col * GATES_ROWS + row;
              if (allRemovedPositions.has(flat)) removedInCol++;
            }
            if (removedInCol > 0) {
              const survivorRows: number[] = [];
              for (let row = 0; row < GATES_ROWS; row++) {
                const flat = col * GATES_ROWS + row;
                if (!allRemovedPositions.has(flat)) survivorRows.push(row);
              }
              for (let row = 0; row < removedInCol; row++) {
                const flat = col * GATES_ROWS + row;
                dropAnims.set(flat, 'filling');
              }
              for (let idx = 0; idx < survivorRows.length; idx++) {
                const oldRow = survivorRows[idx];
                const newRow = removedInCol + idx;
                const dropRows = newRow - oldRow;
                if (dropRows > 0) {
                  const flat = col * GATES_ROWS + newRow;
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
          triggerOrbReaction(steps[i + 1]?.multiplierBombs);
          slotSounds.playClack();
          await new Promise(r => setTimeout(r, 500));
          await new Promise(r => setTimeout(r, 200));
        }

        await new Promise(r => setTimeout(r, 100));
        setCellAnimStates(new Map());
        setCellDropOffsets(new Map());
      } else {
        await new Promise(r => setTimeout(r, 300));
      }
    }

    const lastStepWithBombs = winningStepCount > 0 ? [...steps].reverse().find(s => s.multiplierBombs?.length > 0) : null;

    // Only interrupt the reaction clip when the actual bomb resolution is about to begin.
    if (lastStepWithBombs?.multiplierBombs?.length) {
      setShowOrbVideo(false);
      orbVideoPlayingRef.current = false;
    }

    // Sequential bomb blow-up AFTER all tumbles (matching Bonanza style)
    if (lastStepWithBombs?.multiplierBombs?.length) {
      const sorted = [...lastStepWithBombs.multiplierBombs].sort((a: any, b: any) => a.position - b.position);
      const explodedPositions = new Map<number, CellAnimState>();

      const gridEl = gridContainerRef.current;
      const fallbackWidth = gridEl ? gridEl.offsetWidth : 300;
      const fallbackHeight = gridEl ? gridEl.offsetHeight : 600;

      // Fly target: desktop = total multiplier orb in side panel, mobile = fallback
      const targetEl = document.getElementById("gates-total-multiplier-orb");
      const gridRect = gridEl?.getBoundingClientRect();
      const targetRect = targetEl?.getBoundingClientRect();

      const targetX = targetEl && gridRect && targetRect
        ? (targetRect.left - gridRect.left) + (targetRect.width / 2)
        : (isMobile ? fallbackWidth / 2 : -80);

      const targetY = targetEl && gridRect && targetRect
        ? (targetRect.top - gridRect.top) + (targetRect.height / 2)
        : (isMobile ? fallbackHeight + 60 : fallbackHeight / 2 - 40);

      for (const bomb of sorted) {
        const animState: CellAnimState = bomb.activated ? 'bomb-activate' : 'bomb-fizzle';
        const currentAnims = new Map(explodedPositions);
        currentAnims.set(bomb.position, animState);
        setCellAnimStates(currentAnims);
        if (bomb.activated) {
          slotSounds.playCrackle();
          const { col, row } = flatToColRow(bomb.position);
          const bombX = SYMBOL_GAP + col * (SYMBOL_WIDTH + SYMBOL_GAP) + SYMBOL_WIDTH / 2;
          const bombY = SYMBOL_GAP + row * (SYMBOL_HEIGHT + SYMBOL_GAP) + SYMBOL_HEIGHT / 2;
          const flyId = `fly-${bomb.position}-${Date.now()}`;
          setFlyingMultipliers(prev => [...prev, {
            id: flyId, value: bomb.value, startX: bombX, startY: bombY, targetX, targetY,
          }]);
          setScreenShake('normal');
          setTimeout(() => setScreenShake('none'), 400);
          setTimeout(() => {
            explodedPositions.set(bomb.position, 'bomb-exploded');
            setCellAnimStates(new Map(explodedPositions));
          }, 150);
          await new Promise(r => setTimeout(r, 500));
          setRunningMultiplier(prev => prev + bomb.value);
          setFlyingMultipliers(prev => prev.filter(f => f.id !== flyId));
        } else {
          await new Promise(r => setTimeout(r, 400));
          explodedPositions.set(bomb.position, 'bomb-exploded');
        }
      }
      setCellAnimStates(new Map(explodedPositions));
      await new Promise(r => setTimeout(r, 500));
    }

    // Clean up
    setCellAnimStates(prev => {
      const kept = new Map<number, CellAnimState>();
      for (const [pos, state] of prev) {
        if (state === 'bomb-exploded') kept.set(pos, state);
      }
      return kept;
    });
    setCellDropOffsets(new Map());
    setTumbleChainLength(0);

    // Calculate final win — use server's authoritative totalWin when available
    if (winningStepCount > 0) {
      if (serverTotalWin !== undefined && serverTotalWin > 0) {
        setWinAmount(prev => prev + serverTotalWin);
      } else {
        const rawTumbleWin = steps.reduce((sum: number, s: any) => sum + (s.stepWin || 0), 0);
        const activatedBombs = lastStepWithBombs?.multiplierBombs?.filter((b: any) => b.activated) || [];
        const totalMultiplierValue = activatedBombs.reduce((sum: number, b: any) => sum + b.value, 0);
        const finalWin = totalMultiplierValue > 0 ? rawTumbleWin * totalMultiplierValue : rawTumbleWin;
        setWinAmount(prev => prev + finalWin);
      }
    }

    // Collision effect + bonus spin win reveal
    if (winningStepCount > 0) {
      if (isBonusActiveRef.current && lastStepWithBombs?.multiplierBombs?.some((b: any) => b.activated)) {
        const rawTumbleWin = steps.reduce((sum: number, s: any) => sum + (s.stepWin || 0), 0);
        setRevealTumbleWin(rawTumbleWin);
        // runningMultiplier already includes the newly added bombs at this point
        setRevealMultiplier(runningMultiplier);
        setShowSpinWinReveal(true);
        setShowSpinWinReveal(true);
        setCollisionPhase('colliding');
        await new Promise(r => setTimeout(r, 600));
        setCollisionPhase('resolved');
        await new Promise(r => setTimeout(r, 2200));
        setShowSpinWinReveal(false);
        setCollisionPhase('idle');
        setTumbleBarVisible(false);
      } else {
        await new Promise(r => setTimeout(r, 800));
        setTumbleBarVisible(false);
      }
    }
  }, [SYMBOL_HEIGHT, SYMBOL_WIDTH, isMobile, triggerOrbReaction]);

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
    if (!isBonusSpin) setWinAmount(0);
    setRunningWin(0);
    setRunningMultiplier(isBonusSpin ? cumulativeMultiplierRef.current : 0);
    if (isBonusSpin) {
      setFreeSpinsRemaining(prev => Math.max(0, prev - 1));
      freeSpinsRemainingRef.current = Math.max(0, freeSpinsRemainingRef.current - 1);
    }
    setIsWinAnimating(false);
    pendingPostWinSpinRef.current = null;
    setWinningPositions(new Set());
    setScreenShake('none');
    setShowLightningFlash(false);
    setTumbleChainLength(0);
    setTumbleWinPopups([]);
    setCollisionPhase('idle');
    setTumbleBarVisible(false);
    setFlyingMultipliers([]);
    setShowSpinWinReveal(false);
    resetOrbReactionState();
    serverResultRef.current = null;

    const STAGGER_MS = 80;
    const DROP_OFF_DURATION = 350;
    const DROP_IN_DURATION = 400;
    const DROP_OFF_ROW_STAGGER_MS = 40;

    for (let c = 0; c < GATES_COLS; c++) {
      setTimeout(() => {
        setColumnSpinStates(prev => { const next = [...prev]; next[c] = 'dropping-off'; return next; });
      }, c * STAGGER_MS);
    }

    slotSounds.unlockAudio();
    slotSounds.playSpinStart();

    let shouldWaitForWinAnimation = false;

    try {
      const serverPromise = serverSpin(bet, isBonusSpin, clientSeedRef.current, nonceRef.current, undefined, !isBonusSpin && doubleChance, false);
      const totalDropOffTime = DROP_OFF_DURATION + (GATES_COLS - 1) * STAGGER_MS + (GATES_ROWS - 1) * DROP_OFF_ROW_STAGGER_MS;
      await new Promise(r => setTimeout(r, totalDropOffTime + 100));

      setCellAnimStates(new Map());

      const response = await serverPromise;
      if (!response) return;
      const result = response.result as any;

      if (result.tumbleSteps && result.tumbleSteps.length > 0) {
        setGrid(result.tumbleSteps[0].grid);
      }

      // Drop in
      slotSounds.playSymbolDropIn();
      for (let c = 0; c < GATES_COLS; c++) {
        setTimeout(() => {
          setColumnSpinStates(prev => { const next = [...prev]; next[c] = 'dropping-in'; return next; });
          slotSounds.playColumnStop();
        }, c * STAGGER_MS);
      }

      const totalDropInTime = DROP_IN_DURATION + (GATES_COLS - 1) * STAGGER_MS;
      await new Promise(r => setTimeout(r, totalDropInTime));
      setColumnSpinStates(Array(GATES_COLS).fill('idle'));

      if (result.tumbleSteps) {
        await processTumbleSteps(result.tumbleSteps, result.totalWin);
        const totalWin = result.totalWin || 0;

        // Scatter celebration
        const hasBonusState = !!response.bonusState;
        const finalGridForScatter = result.tumbleSteps?.[result.tumbleSteps.length - 1]?.grid || grid;
        if (!hasBonusState && finalGridForScatter && symbols) {
          const { count: scatCount, positions: scatPos } = countGatesScatters(finalGridForScatter, symbols);
          if (scatCount >= 4) {
            const scatterAnims = new Map<number, CellAnimState>();
            scatPos.forEach(pos => scatterAnims.set(pos, 'scatter-video'));
            setCellAnimStates(scatterAnims);
            slotSounds.playScatterCelebration();
            await new Promise(r => setTimeout(r, 3050));
            setCellAnimStates(new Map());
          }
        }

        if (totalWin > 0) {
          setCurrentSpinWin(totalWin);
          if (totalWin >= bet * 15) {
            setIsWinAnimating(true);
            shouldWaitForWinAnimation = true;
            slotSounds.playBigWin();
          }
        }

        // Handle bonus state
        if (response.bonusState) {
          const bs = response.bonusState as any;
          if (bs.isActive !== undefined) {
            const executeBonusAction = () => {
              if (!isBonusSpin && bs.freeSpinsRemaining > 0) {
                pendingBonusStateRef.current = bs;
                showBonusTriggerRef.current = true;
                const finalGrid = result.tumbleSteps?.[result.tumbleSteps.length - 1]?.grid || grid;
                if (finalGrid && symbols) {
                  const { positions: scatterPos } = countGatesScatters(finalGrid, symbols);
                  if (scatterPos.length > 0) {
                    const scatterAnims = new Map<number, CellAnimState>();
                    scatterPos.forEach(pos => scatterAnims.set(pos, 'scatter-video'));
                    setCellAnimStates(scatterAnims);
                    slotSounds.playScatterCelebration();
                    setTimeout(() => {
                      setCellAnimStates(new Map());
                      setShowBonusTrigger(true);
                      setScreenShake('intense');
                      setShowLightningFlash(true);
                      setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 600);
                      setRunningWin(0);
                      setRunningMultiplier(0);
                    }, 3050);
                    return;
                  }
                }
                setShowBonusTrigger(true);
                setScreenShake('intense');
                setShowLightningFlash(true);
                setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 600);
                setRunningWin(0);
                setRunningMultiplier(0);
              } else if (bs.isRetrigger) {
                showRetriggerRef.current = true;
                const finalGrid = result.tumbleSteps?.[result.tumbleSteps.length - 1]?.grid || grid;
                if (finalGrid && symbols) {
                  const { positions: scatterPos } = countGatesScatters(finalGrid, symbols);
                  if (scatterPos.length > 0) {
                    const scatterAnims = new Map<number, CellAnimState>();
                    scatterPos.forEach(pos => scatterAnims.set(pos, 'scatter-video'));
                    setCellAnimStates(scatterAnims);
                    slotSounds.playScatterCelebration();
                    setTimeout(() => {
                      setCellAnimStates(new Map());
                      setScreenShake('intense');
                      setShowLightningFlash(true);
                      setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 500);
                      setShowRetrigger(true);
                      setFreeSpinsRemaining(bs.freeSpinsRemaining);
                      freeSpinsRemainingRef.current = bs.freeSpinsRemaining;
                      setTotalFreeSpins(bs.totalFreeSpins);
                      setBonusWinnings(bs.bonusWinnings || 0);
                      setCumulativeMultiplier(bs.cumulativeMultiplier || 0);
                      cumulativeMultiplierRef.current = bs.cumulativeMultiplier || 0;
                      setRunningMultiplier(bs.cumulativeMultiplier || 0);
                    }, 3050);
                    return;
                  }
                }
                setScreenShake('intense');
                setShowLightningFlash(true);
                setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 500);
                setShowRetrigger(true);
                setFreeSpinsRemaining(bs.freeSpinsRemaining);
                freeSpinsRemainingRef.current = bs.freeSpinsRemaining;
                setTotalFreeSpins(bs.totalFreeSpins);
                setBonusWinnings(bs.bonusWinnings || 0);
                setCumulativeMultiplier(bs.cumulativeMultiplier || 0);
                cumulativeMultiplierRef.current = bs.cumulativeMultiplier || 0;
                setRunningMultiplier(bs.cumulativeMultiplier || 0);
              } else {
                setFreeSpinsRemaining(bs.freeSpinsRemaining);
                freeSpinsRemainingRef.current = bs.freeSpinsRemaining;
                setTotalFreeSpins(bs.totalFreeSpins);
                setBonusWinnings(bs.bonusWinnings || 0);
                setCumulativeMultiplier(bs.cumulativeMultiplier || 0);
                cumulativeMultiplierRef.current = bs.cumulativeMultiplier || 0;
                setRunningMultiplier(bs.cumulativeMultiplier || 0);
                if (bs.freeSpinsRemaining <= 0) {
                  setScreenShake('intense');
                  setShowLightningFlash(true);
                  setTimeout(() => { setScreenShake('none'); setShowLightningFlash(false); }, 800);
                  setShowBonusComplete(true);
                  showBonusCompleteRef.current = true;
                } else {
                  spinLockRef.current = false;
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

        if (response.spinsRemaining !== undefined) {
          const today = getTodayDanish();
          queryClient.setQueryData(
            ["slot-spins", user?.id, today, "shared"],
            (old: any) => old
              ? { ...old, spins_remaining: response.spinsRemaining }
              : { spins_remaining: response.spinsRemaining, user_id: user?.id, date: today, game_id: "shared" }
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
      } else if (isAutoSpinningRef.current && !shouldStopAutoSpinRef.current && !pendingBonusActionRef.current) {
        if (!hasEnoughSpins(bet)) { stopAutoSpin(); return; }
        if (autoSpinsRemainingRef.current !== null) {
          const newCount = autoSpinsRemainingRef.current - 1;
          setAutoSpinsRemaining(newCount);
          autoSpinsRemainingRef.current = newCount;
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
  }, [symbols, user, isSpinning, bet, isBonusActive, freeSpinsRemaining, hasEnoughSpins, serverSpin, processTumbleSteps, queryClient, stopAutoSpin, doubleChance, resetOrbReactionState]);

  handleSpinRef.current = handleSpin;

  const handleRetriggerComplete = useCallback(() => {
    setShowRetrigger(false);
    showRetriggerRef.current = false;
    spinLockRef.current = false;
    // Always resume auto-spin in bonus after retrigger
    if (isBonusActiveRef.current) {
      if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
      autoSpinTimeoutRef.current = setTimeout(() => handleSpinRef.current(), 800);
    }
  }, []);

  useEffect(() => {
    if (isAutoSpinning && !isSpinning && !showBonusTriggerRef.current && !showBonusCompleteRef.current && !showRetriggerRef.current) {
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [isAutoSpinning]);

  useEffect(() => {
    if (bonusAutoSpinPending && isBonusActive && freeSpinsRemainingRef.current > 0 && !isSpinning && !showBonusTriggerRef.current && !showBonusCompleteRef.current && !showRetriggerRef.current) {
      setBonusAutoSpinPending(false);
      autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 800);
    }
  }, [bonusAutoSpinPending, isBonusActive, isSpinning, handleSpin]);

  const handleSpinWithPress = useCallback(async () => {
    setSpinPressed(true);
    setTimeout(() => setSpinPressed(false), 200);
    handleSpin();
  }, [handleSpin]);

  const handleBuyBonus = useCallback(async () => {
    if (spinLockRef.current || !symbols || !user || isSpinning || isBonusActive || isBuyingBonus) return;
    setIsBuyingBonus(true);
    if (!hasEnoughSpins(bet * 100)) {
      toast.error("Du har ikke nok credits til at købe bonus");
      setIsBuyingBonus(false);
      return;
    }
    spinLockRef.current = true;
    nonceRef.current += 1;
    setIsSpinning(true);
    setTumblePhase('spinning');
    setRunningWin(0);
    setRunningMultiplier(0);
    setIsWinAnimating(false);
    pendingPostWinSpinRef.current = null;
    setWinningPositions(new Set());
    setScreenShake('none');
    setShowLightningFlash(false);
    setTumbleChainLength(0);
    setTumbleWinPopups([]);
    setCollisionPhase('idle');
    setTumbleBarVisible(false);
    setFlyingMultipliers([]);
    resetOrbReactionState();
    serverResultRef.current = null;

    const STAGGER_MS = 80;
    const DROP_OFF_DURATION = 350;
    const DROP_OFF_ROW_STAGGER_MS = 40;
    const DROP_IN_DURATION = 400;

    for (let c = 0; c < GATES_COLS; c++) {
      setTimeout(() => {
        setColumnSpinStates(prev => { const next = [...prev]; next[c] = 'dropping-off'; return next; });
      }, c * STAGGER_MS);
    }
    slotSounds.unlockAudio();
    slotSounds.playSpinStart();

    try {
      const serverPromise = serverSpin(bet, false, clientSeedRef.current, nonceRef.current, undefined, false, true);
      const totalDropOffTime = DROP_OFF_DURATION + (GATES_COLS - 1) * STAGGER_MS + (GATES_ROWS - 1) * DROP_OFF_ROW_STAGGER_MS;
      await new Promise(r => setTimeout(r, totalDropOffTime + 100));
      setCellAnimStates(new Map());

      const response = await serverPromise;
      if (!response) return;
      const result = response.result as any;

      if (result.tumbleSteps && result.tumbleSteps.length > 0) setGrid(result.tumbleSteps[0].grid);

      slotSounds.playSymbolDropIn();
      for (let c = 0; c < GATES_COLS; c++) {
        setTimeout(() => {
          setColumnSpinStates(prev => { const next = [...prev]; next[c] = 'dropping-in'; return next; });
          slotSounds.playColumnStop();
        }, c * STAGGER_MS);
      }
      const totalDropInTime = DROP_IN_DURATION + (GATES_COLS - 1) * STAGGER_MS;
      await new Promise(r => setTimeout(r, totalDropInTime));
      setColumnSpinStates(Array(GATES_COLS).fill('idle'));

      if (result.tumbleSteps) {
        await processTumbleSteps(result.tumbleSteps, result.totalWin);
        const totalWin = result.totalWin || 0;
        setWinAmount(totalWin);
      }

      if (response.bonusState) {
        const bs = response.bonusState as any;
        if (bs.freeSpinsRemaining > 0) {
          pendingBonusStateRef.current = bs;
          const finalGrid = result.tumbleSteps?.[result.tumbleSteps.length - 1]?.grid || grid;
          if (finalGrid && symbols) {
            const { positions: scatterPos } = countGatesScatters(finalGrid, symbols);
            if (scatterPos.length > 0) {
              const scatterAnims = new Map<number, CellAnimState>();
              scatterPos.forEach(pos => scatterAnims.set(pos, 'scatter-video'));
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
              }, 3050);
            } else {
              setShowBonusTrigger(true);
              showBonusTriggerRef.current = true;
            }
          }
        }
      }

      if (response.spinsRemaining !== undefined) {
        const today = getTodayDanish();
        queryClient.setQueryData(
          ["slot-spins", user?.id, today, "shared"],
          (old: any) => old
            ? { ...old, spins_remaining: response.spinsRemaining }
            : { spins_remaining: response.spinsRemaining, user_id: user?.id, date: today, game_id: "shared" }
        );
        queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
      }
    } catch (err) {
      console.error("Buy bonus error:", err);
      toast.error("Der opstod en fejl. Prøv igen.");
    } finally {
      setIsSpinning(false);
      setTumblePhase('idle');
      if (!pendingBonusActionRef.current) {
        spinLockRef.current = false;
      }
    }
  }, [symbols, user, isSpinning, bet, isBonusActive, isBuyingBonus, hasEnoughSpins, serverSpin, processTumbleSteps, queryClient, grid, resetOrbReactionState]);

  // Spacebar to spin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        handleSpinWithPress();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSpinWithPress]);

  // Visual intensity
  const { intensityState, bonusIntensityTier } = useGatesIntensity({
    tumblePhase,
    tumbleChainLength,
    winAmount: runningWin,
    bet,
    isBonusActive,
    cumulativeMultiplier,
  });

  if (symbolsLoading || !symbols) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  const gridWidth = GATES_COLS * (SYMBOL_WIDTH + SYMBOL_GAP) + SYMBOL_GAP;
  const gridHeight = GATES_ROWS * (SYMBOL_HEIGHT + SYMBOL_GAP) + SYMBOL_GAP;
  const totalLayoutWidth = isMobile ? gridWidth : gridWidth + 140 + 16;

  return (
    <div
      className={cn("flex flex-col items-center relative", isMobile ? "gap-2 w-full" : "gap-4")}
      style={isMobile ? undefined : { width: totalLayoutWidth, maxWidth: "100%" }}
      data-intensity={intensityState}
      data-bonus={isBonusActive ? "true" : "false"}
      data-mult-tier={bonusIntensityTier}
      data-last-spin={isBonusActive && freeSpinsRemaining === 1 ? "true" : "false"}
    >
      <CreditsExpiredOverlay isVisible={spinsRemaining <= 0 && !isBonusActive && !isSpinning && tumblePhase === 'idle'} />
      <div className="gates-lightning-ambient" />
      <div className="gates-ambient-glow" />

      

      {/* Win celebration */}
      {isWinAnimating && currentSpinWin > 0 && (
        <WinCelebration
          isActive={true}
          winAmount={currentSpinWin}
          bet={bet}
          onAnimationComplete={() => {
            setIsWinAnimating(false);
            if (pendingBonusActionRef.current) {
              const action = pendingBonusActionRef.current;
              pendingBonusActionRef.current = null;
              setTimeout(() => {
                action();
                if (isAutoSpinning && !shouldStopAutoSpinRef.current) {
                  setTimeout(() => setBonusAutoSpinPending(true), 120);
                }
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

      {/* Side panels + Grid */}
      <div className={cn("relative", isMobile ? "flex flex-col w-full" : "w-fit mx-auto")}>
        {!isMobile && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4">
            <BonanzaSidePanels
              bet={bet}
              doubleChance={doubleChance}
              onDoubleChanceToggle={() => setDoubleChance(prev => !prev)}
              onBuyBonus={handleBuyBonus}
              disabled={isSpinning || spinLockRef.current || tumblePhase !== 'idle' || isBonusActive || isBuyingBonus}
              isBonusActive={isBonusActive}
              headerContent={
                <GatesMultiplierOrb
                  multiplierValue={tumblePhase !== 'idle' ? runningMultiplier : cumulativeMultiplier}
                  isActive={isBonusActive}
                />
              }
            />
          </div>
        )}

        <div className="flex flex-col items-center relative">
          {/* Title art + character — top right outside the grid */}
          <div className="absolute z-30 pointer-events-none flex flex-col items-center" style={{
            top: isMobile ? -30 : -50,
            left: `calc(100% + ${isMobile ? 4 : 8}px)`,
            width: isMobile ? gridWidth * 0.28 : gridWidth * 0.35,
          }}>
            <img
              src={gatesTitleArt}
              alt="Gates of Fedesvin"
              className="w-full pointer-events-none block drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              draggable={false}
            />
            <div className="mt-[-250px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] flex justify-center" style={{ overflow: 'visible' }}>
              <div className="relative flex justify-center" style={{ overflow: 'visible' }}>
                {/* Idle video — hidden (not unmounted) during reaction to preserve parent sizing */}
                <div className="pointer-events-none" style={{ visibility: showOrbVideo ? 'hidden' : 'visible' }}>
                  <ChromaKeyVideo
                    key="idle"
                    src="/videos/gates-character.mp4"
                    width={isMobile ? Math.round(gridWidth * 0.5) : Math.round(gridWidth * 0.6)}
                    height={isMobile ? Math.round(gridWidth * 0.65) : Math.round(gridWidth * 0.8)}
                    className=""
                  />
                </div>
                {showOrbVideo && (
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <ChromaKeyVideo
                      key={`orb-reaction-${orbVideoTrigger}`}
                      src="/videos/gates-character-orbs.mp4"
                      playbackRate={3}
                      width={isMobile ? Math.round(gridWidth * 0.5) : Math.round(gridWidth * 0.6)}
                      height={isMobile ? Math.round(gridWidth * 0.65) : Math.round(gridWidth * 0.8)}
                      className=""
                      autoplay={true}
                      loop={false}
                      onEnded={() => { setShowOrbVideo(false); orbVideoPlayingRef.current = false; }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Main game grid */}
          <div className="relative" style={{ width: gridWidth }}>
            {/* Bonus info moved to control bar */}
            <div
              ref={gridContainerRef}
              className={cn(
                "gates-grid-container relative rounded-xl border-2 overflow-hidden",
                "bg-gradient-to-b from-blue-950/95 via-slate-950/90 to-blue-950/95",
                "border-blue-500/30",
                "gates-grid-intensity-glow",
                screenShake === 'normal' && "gates-shake",
                screenShake === 'intense' && "gates-shake-intense",
                tumbleChainLength >= 3 && "gates-intensity-high"
              )}
              style={{ width: gridWidth, height: gridHeight }}
            >
              <SlotAmbientLight isIdle={!isSpinning && tumblePhase === 'idle' && !isBonusActive} theme="blue" />
              <SlotIdleEffects isIdle={!isSpinning && tumblePhase === 'idle' && !isBonusActive} theme="blue" width={gridWidth} height={gridHeight} />
              <div className="relative flex" style={{ gap: `${SYMBOL_GAP}px`, padding: `${SYMBOL_GAP}px` }}>
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
                      bombSymbolsMap={bombSymbolsMap}
                      symbolWidth={SYMBOL_WIDTH}
                      symbolHeight={SYMBOL_HEIGHT}
                      isBonusActive={isBonusActive}
                    />
                  );
                })}
              </div>
              {/* Floating tumble win popups */}
              <BonanzaTumbleWinPopup popups={tumbleWinPopups} />
              {/* Flying multipliers */}
              <BonanzaFlyingMultiplier flyers={flyingMultipliers} className="gates-mult-fly" />
              {/* Bonus spin win reveal (center overlay) */}
              <GatesBonusSpinWinReveal
                tumbleWin={revealTumbleWin}
                multiplier={revealMultiplier}
                visible={showSpinWinReveal}
              />
              {/* Tumble win bar */}
              {!isMobile && (
                <BonanzaTumbleWinBar
                  runningWin={runningWin}
                  runningMultiplier={runningMultiplier}
                  collisionPhase={collisionPhase}
                  visible={tumbleBarVisible}
                  hideMultiplier={!isBonusActive}
                />
              )}
              {/* Bonus overlays */}
              <BonusEntrySequence
                isActive={showBonusTrigger}
                freeSpinsAwarded={pendingBonusStateRef.current?.freeSpinsRemaining || 15}
                onComplete={handleBonusEntryComplete}
              />
              <GatesRetriggerOverlay
                isActive={showRetrigger}
                spinsAwarded={5}
                onComplete={handleRetriggerComplete}
              />
              <GatesBonusEndOverlay
                isActive={showBonusComplete}
                totalWin={bonusWinnings}
                totalMultiplier={cumulativeMultiplier}
                totalSpins={totalFreeSpins}
                onComplete={() => {
                  slotSounds.playBonusEnd();
                  setShowBonusComplete(false);
                  showBonusCompleteRef.current = false;
                  setIsBonusActive(false);
                  isBonusActiveRef.current = false;
                  setBonusAutoSpinPending(false);
                  setCumulativeMultiplier(0);
                  cumulativeMultiplierRef.current = 0;
                  setRunningMultiplier(0);
                  setBonusWinnings(0);
                  setRunningWin(0);
                  setWinAmount(0);
                  setIsBuyingBonus(false);
                  try { localStorage.removeItem(bonusWinKey); } catch {}
                  if (isAutoSpinningRef.current && !shouldStopAutoSpinRef.current) {
                    if (autoSpinTimeoutRef.current) clearTimeout(autoSpinTimeoutRef.current);
                    autoSpinTimeoutRef.current = setTimeout(() => handleSpin(), 1000);
                  }
                }}
              />
            </div>
          </div>

          {/* Lightning flash */}
          {showLightningFlash && <div className="gates-lightning-overlay" />}
        </div>
      </div>

      {/* Mobile side panels */}
      {isMobile && (
        <div className="w-full px-1">
          <BonanzaSidePanels
            bet={bet}
            doubleChance={doubleChance}
            onDoubleChanceToggle={() => setDoubleChance(prev => !prev)}
            onBuyBonus={handleBuyBonus}
            disabled={isSpinning || spinLockRef.current || tumblePhase !== 'idle' || isBuyingBonus}
            isBonusActive={isBonusActive}
            horizontal
            compact
          />
        </div>
      )}

      {/* Resterende spins — bonus only */}
      {isBonusActive && (
        <div className="w-full flex justify-center">
          <div className="flex items-baseline gap-2">
            <span
              className="text-sm sm:text-lg uppercase tracking-widest font-black text-white"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(59,130,246,0.6)" }}
            >
              Resterende spins
            </span>
            <AnimatedSpinCounter
              value={freeSpinsRemaining}
              className="text-2xl sm:text-3xl font-black text-white tabular-nums [text-shadow:0_2px_6px_rgba(0,0,0,0.9),0_0_14px_rgba(255,255,255,0.3)]"
            />
            <span
              className="text-sm sm:text-lg text-white/60 font-black"
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
          maxBet={slotSettings.maxBet}
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
          bonusState={{ isActive: isBonusActive, freeSpinsRemaining, totalFreeSpins }}
          bonusLoaded={bonusLoaded}
          winAmount={winAmount}
          gameId={gameId}
          isMobile={isMobile}
          tumbleRunningWin={runningWin}
          tumbleRunningMultiplier={runningMultiplier}
          tumbleCollisionPhase={collisionPhase}
          tumbleVisible={isMobile && tumbleBarVisible}
          tumbleHideMultiplier={!isBonusActive}
          bonusCumulativeMultiplier={cumulativeMultiplier}
          bonusRunningMultiplier={runningMultiplier}
          bonusTumblePhase={tumblePhase}
        />
      </div>
    </div>
  );
}
