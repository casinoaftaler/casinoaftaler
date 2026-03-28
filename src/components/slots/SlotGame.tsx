import React, { useState, useCallback, useRef, useEffect } from "react";
import { CreditsExpiredOverlay } from "./CreditsExpiredOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { SlotReel } from "./SlotReel";
import { WinLines } from "./WinLines";
import { BonusOverlay } from "./BonusOverlay";
import { BonusStatusBar } from "./BonusStatusBar";
import { BonusSymbolBar } from "./BonusSymbolBar";
import { SlotMachineFrame } from "./SlotMachineFrame";
import { WinCelebration } from "./WinCelebration";
import { BonanzaControlBar } from "./BonanzaControlBar";
import { SlotIdleEffects } from "./SlotIdleEffects";
import { SlotAmbientLight } from "./SlotAmbientLight";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSymbolPreloader } from "@/hooks/useSlotSymbolPreloader";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSlotSoundLoader } from "@/hooks/useSlotSoundLoader";
import { useBonusGameSync } from "@/hooks/useBonusGameSync";
import { useServerSpin, type SpinResult, type BonusSpinResult } from "@/hooks/useServerSpin";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PAY_LINES, getScatterTeaseReels, type TeaseInfo, type SlotSymbol } from "@/lib/slotGameLogic";
import { slotSounds } from "@/lib/slotSoundEffects";
import { Loader2, Gamepad2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Fixed symbol dimensions at base resolution (scaling is handled at container level)
const SYMBOL_SIZE = 150;
const SYMBOL_GAP = 16;

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

// Helper to generate a display grid from symbols (for initial display only)
function generateDisplayGrid(symbols: SlotSymbol[]): string[][] {
  const grid: string[][] = [];
  for (let col = 0; col < 5; col++) {
    const column: string[] = [];
    const usedIds: string[] = [];
    for (let row = 0; row < 3; row++) {
      // Simple random selection for display only (actual results come from server)
      const availableSymbols = symbols.filter(s => !usedIds.includes(s.id));
      const symbol = availableSymbols[Math.floor(Math.random() * availableSymbols.length)] || symbols[0];
      column.push(symbol.id);
      usedIds.push(symbol.id);
    }
    grid.push(column);
  }
  return grid;
}

interface SlotGameProps {
  gameId?: string;
}

export function SlotGame({ gameId = "book-of-fedesvin" }: SlotGameProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols(gameId);
  const { validateSymbols } = useSlotSymbolPreloader(symbols);
  const { spinsRemaining, maxSpins, canSpin, hasEnoughSpins } = useSlotSpins(gameId);
  const { settings: slotSettings } = useSlotSettings();
  const { data: siteSettings } = useSiteSettings();
  const { spin: serverSpin } = useServerSpin(gameId);

  // Derive controls gap from site settings
  const controlsGapKey = gameId === "book-of-fedesvin" ? "slot_controls_gap" : `${gameId.replace(/-/g, "_")}_controls_gap`;
  const controlsGap = parseInt(siteSettings?.[controlsGapKey] || "16", 10);
  
  // Load custom sound files from site_settings (game-specific)
  useSlotSoundLoader(gameId);
  const { 
    bonusState, 
    isLoaded: bonusLoaded,
    updateFromServer: updateBonusFromServer,
    endBonus,
    shouldEndBonus,
    suppressRealtimeUpdates,
    resumeRealtimeUpdates,
  } = useBonusGameSync(symbols, gameId);
  
  const [bet, setBetRaw] = useState(1);
  // During active bonus, always show the locked-in bet from bonus state
  // to prevent brief flash of bet=1 on page refresh
  const effectiveBet = bonusState.isActive && bonusLoaded && bonusState.betAmount > 0
    ? bonusState.betAmount
    : bet;
  // Guard against bet changes during active bonus or while bonus state is loading
  // This is the second layer of protection (UI is also disabled via bonusLoaded prop)
  const setBet = useCallback((newBet: number) => {
    if (!bonusLoaded || bonusState.isActive) return;
    setBetRaw(newBet);
  }, [bonusLoaded, bonusState.isActive]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [lastResult, setLastResult] = useState<SpinResult | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [isWinAnimating, setIsWinAnimating] = useState(false);
  const [expandedReels, setExpandedReels] = useState<number[]>([]);
  const [newlyExpandedReels, setNewlyExpandedReels] = useState<number[]>([]);
  const [showWinLines, setShowWinLines] = useState(false);
  const [teaseReels, setTeaseReels] = useState<number[]>([]);
  const teaseReelsSet = React.useMemo(() => new Set(teaseReels), [teaseReels]);
  const [activeTeaseReelIndex, setActiveTeaseReelIndex] = useState<number | null>(null);
  const [teaseInfo, setTeaseInfo] = useState<TeaseInfo>({ reels: [], lateScatter: false, lastScatterReel: -1 });
  const [scatterReelsLanded, setScatterReelsLanded] = useState<Set<number>>(new Set());
  const isDarkenedForTeaseGlobal = scatterReelsLanded.size >= 2 && isSpinning;
  
  // Pre-compute scatter map per reel from the current grid to avoid repeated symbols.find() in onReelStop
  const scatterReelMap = React.useMemo(() => {
    if (!grid || !symbols) return new Map<number, boolean>();
    const scatterIds = new Set(symbols.filter(s => s.is_scatter).map(s => s.id));
    const map = new Map<number, boolean>();
    for (let r = 0; r < grid.length; r++) {
      map.set(r, grid[r].some(id => scatterIds.has(id)));
    }
    return map;
  }, [grid, symbols]);
  const [showExpansionDarken, setShowExpansionDarken] = useState(false);
  const [showConnectingWins, setShowConnectingWins] = useState(false);
  
  // Sequential reel stopping - which reel should currently slow down (-1 = none yet)
  const [activeSlowdownReel, setActiveSlowdownReel] = useState(-1);
  const initialSpinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Spin lock to prevent rapid clicking
  const spinLockRef = useRef(false);
  const [isSpinLocked, setIsSpinLocked] = useState(false);
  const spinLockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const winLinesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Debounced leaderboard invalidation (5s cooldown to avoid thundering herd)
  const leaderboardInvalidateRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedLeaderboardInvalidate = useCallback(() => {
    if (leaderboardInvalidateRef.current) return; // Already scheduled
    leaderboardInvalidateRef.current = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
      leaderboardInvalidateRef.current = null;
    }, 5000);
  }, [queryClient]);
  
  // Track stopped reels for tease-mode timing
  const stoppedReelsRef = useRef<Set<number>>(new Set());
  const pendingResultRef = useRef<SpinResult | null>(null);
  const pendingExpandedGridRef = useRef<string[][] | null>(null);
  const pendingExpandedReelsRef = useRef<number[]>([]);
  const pendingExpandingWinGroupsRef = useRef<Array<{ symbolId: string; reels: number[]; wins: any[] }>>([]);
  const expandedReelSymbolMapRef = useRef<Record<number, string>>({});
  const isBonusSpinRef = useRef(false);
  const pendingBonusStateRef = useRef<any>(null);
  const winCelebrationResolveRef = useRef<(() => void) | null>(null);
  const skipEndCelebrationRef = useRef(false);
  
  // Ref-based stable callback for onReelStop to prevent defeating React.memo on SlotReel
  const onReelStopRef = useRef<((reelIndex: number) => void) | null>(null);
  
  // Autospin state
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState<AutoSpinCount>(10);
  const [autoSpinsRemaining, setAutoSpinsRemaining] = useState<number | null>(null);
  const autoSpinTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldStopAutoSpinRef = useRef(false);
  const autoSpinScheduledRef = useRef(false);
  
  // Bonus overlay states
  const [showBonusTrigger, setShowBonusTrigger] = useState(false);
  const [showBonusComplete, setShowBonusComplete] = useState(false);
  const [showRetrigger, setShowRetrigger] = useState(false);
  const [retriggerSpinsAdded, setRetriggerSpinsAdded] = useState(10);
  const [pendingExpandingSymbol, setPendingExpandingSymbol] = useState<typeof bonusState.expandingSymbol>(null);
  const [pendingRetriggerSymbol, setPendingRetriggerSymbol] = useState<SlotSymbol | null>(null);
  const [bonusTotalWinnings, setBonusTotalWinnings] = useState(0);
  const [bonusTotalSpinsUsed, setBonusTotalSpinsUsed] = useState(0);
  
  // Track whether the initial bonus symbol has been confirmed (trigger overlay dismissed)
  const [bonusBarsReady, setBonusBarsReady] = useState(false);
  const [bonusBetAmount, setBonusBetAmount] = useState<number>(1);
  
  // Pending bonus trigger - to show win animation before bonus overlay
  const [pendingBonusTrigger, setPendingBonusTrigger] = useState<{
    isRetrigger: boolean;
    spinsToAdd?: number;
    expandingSymbol?: typeof bonusState.expandingSymbol;
  } | null>(null);
  
  // Scatter celebration state - pulse/glow before bonus screen
  const [showScatterCelebration, setShowScatterCelebration] = useState(false);
  
  // When resuming an active bonus from DB (page refresh mid-bonus), bars should show immediately
  // BUT: guard against the race where realtime fires before the trigger overlay is shown
  useEffect(() => {
    if (
      bonusLoaded && bonusState.isActive && !bonusBarsReady &&
      !showBonusTrigger && !showScatterCelebration && !isSpinning &&
      !pendingBonusTrigger
    ) {
      setBonusBarsReady(true);
    }
  }, [bonusLoaded, bonusState.isActive, showBonusTrigger, bonusBarsReady, showScatterCelebration, isSpinning, pendingBonusTrigger]);

  // Restore bet size from bonus state when resuming after refresh
  useEffect(() => {
    if (bonusLoaded && bonusState.isActive && bonusState.betAmount > 0) {
      setBet(bonusState.betAmount);
      setBonusBetAmount(bonusState.betAmount);
    }
  }, [bonusLoaded, bonusState.isActive, bonusState.betAmount]);
  
  const stopTeaseSound = useRef<(() => void) | null>(null);

  // Initialize grid with random symbols (display only)
  const initializeGrid = useCallback(() => {
    if (!symbols || symbols.length === 0) return;
    const newGrid = generateDisplayGrid(symbols);
    setGrid(newGrid);
  }, [symbols]);

  // Initialize on first load
  if (!grid && symbols && symbols.length > 0) {
    initializeGrid();
  }

  // Unlock audio for mobile on first user interaction
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

  // Cleanup timeouts and sounds on unmount
  useEffect(() => {
    return () => {
      if (autoSpinTimeoutRef.current) {
        clearTimeout(autoSpinTimeoutRef.current);
      }
      if (winLinesTimeoutRef.current) {
        clearTimeout(winLinesTimeoutRef.current);
      }
      if (spinLockTimeoutRef.current) {
        clearTimeout(spinLockTimeoutRef.current);
      }
      if (initialSpinTimeoutRef.current) {
        clearTimeout(initialSpinTimeoutRef.current);
      }
      slotSounds.stopMusic();
      if (stopTeaseSound.current) {
        stopTeaseSound.current();
      }
    };
  }, []);

  // Stop autospin when out of spins or on big win/bonus
  const stopAutoSpin = useCallback(() => {
    setIsAutoSpinning(false);
    setAutoSpinsRemaining(null);
    shouldStopAutoSpinRef.current = true;
    autoSpinScheduledRef.current = false;
    if (autoSpinTimeoutRef.current) {
      clearTimeout(autoSpinTimeoutRef.current);
      autoSpinTimeoutRef.current = null;
    }
  }, []);

  const startAutoSpin = useCallback(() => {
    setIsAutoSpinning(true);
    setAutoSpinsRemaining(autoSpinCount === "infinite" ? null : autoSpinCount);
    shouldStopAutoSpinRef.current = false;
  }, [autoSpinCount]);

  const decrementAutoSpins = useCallback(() => {
    if (autoSpinsRemaining !== null) {
      const newCount = autoSpinsRemaining - 1;
      setAutoSpinsRemaining(newCount);
      if (newCount <= 0) {
        stopAutoSpin();
        toast.info("Autospin afsluttet");
      }
    }
  }, [autoSpinsRemaining, stopAutoSpin]);

  const toggleAutoSpin = useCallback(() => {
    if (isAutoSpinning) {
      stopAutoSpin();
    } else {
      startAutoSpin();
    }
  }, [isAutoSpinning, stopAutoSpin, startAutoSpin]);

  // Main spin handler - now calls server
  const handleSpin = async () => {
    // Reset autospin scheduled flag since we're spinning now
    autoSpinScheduledRef.current = false;
    
    // Prevent rapid clicking with a spin lock
    if (spinLockRef.current || isSpinLocked) return;
    
    if (!symbols || symbols.length === 0 || !user || isSpinning) return;
    
    // Block spins during any bonus overlay/celebration phase
    if (showScatterCelebration || showBonusTrigger || showRetrigger || showBonusComplete || pendingBonusTrigger) return;
    
    // Validate that all symbol images are loaded correctly
    const symbolValidation = validateSymbols();
    if (!symbolValidation.isValid) {
      if (symbolValidation.failedUrls.length > 0) {
        console.warn('[SlotGame] Some symbol images failed to load:', symbolValidation.failedUrls);
        toast.error(`Symbol-billeder kunne ikke indlæses`);
      }
      spinLockRef.current = false;
      return;
    }
    
    // Check if we can spin (either normal spin or bonus free spin)
    const isBonusSpin = bonusState.isActive && bonusState.freeSpinsRemaining > 0;
    if (!isBonusSpin && !hasEnoughSpins(bet)) return;

    // Set spin lock immediately to prevent double-clicks
    spinLockRef.current = true;
    setIsSpinLocked(true);
    
    // Clear any existing lock timeout
    if (spinLockTimeoutRef.current) {
      clearTimeout(spinLockTimeoutRef.current);
    }
    
    // Safety timeout to release lock in case something goes wrong (8 seconds max)
    spinLockTimeoutRef.current = setTimeout(() => {
      spinLockRef.current = false;
      setIsSpinLocked(false);
    }, 8000);

    // Store bonus bet amount for end tracking
    if (!isBonusSpin) {
      setBonusBetAmount(bet);
    }

    // Clear visual state for new spin
    setLastResult(null);
    setWinAmount(0);
    setIsWinAnimating(false);
    setExpandedReels([]);
    setNewlyExpandedReels([]);
    expandedReelSymbolMapRef.current = {};
    setShowWinLines(false);
    stoppedReelsRef.current = new Set();
    
    // Reset sequential reel stopping
    setActiveSlowdownReel(-1);
    
    // Start the spin animation immediately for responsiveness
    setIsSpinning(true);
    
    // Start the minimum spin timer NOW (before server call) so server latency counts toward it
    const spinStartTime = performance.now();
    
    // Clear any existing win lines timeout
    if (winLinesTimeoutRef.current) {
      clearTimeout(winLinesTimeoutRef.current);
      winLinesTimeoutRef.current = null;
    }

    // Play quick spin start sound
    slotSounds.playSpinStart();

    // Suppress realtime BEFORE the server call for bonus spins to prevent
    // the DB write's realtime event from racing ahead of the HTTP response
    if (isBonusSpin) {
      suppressRealtimeUpdates();
    }

    try {
      // Call server for spin result
      const response = await serverSpin(bet, isBonusSpin);
      
      if (!response) {
        // Error already toasted by useServerSpin — just bail out
        return;
      }

      // Extract result from server response
      const result = response.result as SpinResult;
      const bonusResult = response.result as BonusSpinResult;
      
      // Update grid with server result
      setGrid(result.grid);
      
      // Calculate tease reels based on server result
      const teaseResult = getScatterTeaseReels(result.grid, symbols);
      setTeaseReels(teaseResult.reels);
      setTeaseInfo(teaseResult);
      setActiveTeaseReelIndex(null);
      setScatterReelsLanded(new Set());

      // Start tease sound if we have tease reels
      if (teaseResult.reels.length > 0) {
        stopTeaseSound.current = slotSounds.playTeaseStart();
      }

      // Store result for reel stop callback
      pendingResultRef.current = result;
      isBonusSpinRef.current = isBonusSpin;
      
      // Handle bonus-specific data
      if (isBonusSpin && 'expandedGrid' in bonusResult) {
        pendingExpandedGridRef.current = bonusResult.expandedGrid;
        pendingExpandedReelsRef.current = bonusResult.expandedReels || [];
        pendingExpandingWinGroupsRef.current = (bonusResult as any).expandingWinGroups || [];
      } else {
        pendingExpandedGridRef.current = null;
        pendingExpandedReelsRef.current = [];
        pendingExpandingWinGroupsRef.current = [];
      }

      // Store bonus state to apply AFTER reels stop (prevents spoiling the symbol)
      if (response.bonusState) {
        pendingBonusStateRef.current = response.bonusState;
        
        // Suppress realtime updates for ALL bonus spins (not just triggers),
        // so the DB update doesn't race ahead and show winnings in the status bar
        // before the win animation has played.
        suppressRealtimeUpdates();
        
        // Set expanding symbol for trigger overlay (used later, not displayed yet)
        if (!isBonusSpin && result.bonusTriggered) {
          const expandingSymbol = symbols.find(s => s.id === response.bonusState?.expandingSymbolId);
          if (expandingSymbol) {
            setPendingExpandingSymbol(expandingSymbol);
          }
        }
      } else {
        pendingBonusStateRef.current = null;
      }
      
      // Start first reel slowdown after a minimum spin time of 500ms
      // Since the timer started before the server call, subtract elapsed time
      const elapsed = performance.now() - spinStartTime;
      const remainingDelay = Math.max(0, 500 - elapsed);
      
      if (initialSpinTimeoutRef.current) {
        clearTimeout(initialSpinTimeoutRef.current);
      }
      initialSpinTimeoutRef.current = setTimeout(() => {
        setActiveSlowdownReel(0);
      }, remainingDelay);

    } catch (error) {
      console.error("Spin error:", error);
      
      // Stop tease sound on error
      if (stopTeaseSound.current) {
        stopTeaseSound.current();
        stopTeaseSound.current = null;
      }
      
      // Resume realtime if we suppressed it for a bonus spin
      if (isBonusSpin) {
        resumeRealtimeUpdates();
      }

      // Reset state on error
      setIsSpinning(false);
      setTeaseReels([]);
      setActiveTeaseReelIndex(null);
      pendingResultRef.current = null;
      pendingBonusStateRef.current = null;
      
      // Release spin lock on error
      spinLockRef.current = false;
      setIsSpinLocked(false);
      if (spinLockTimeoutRef.current) {
        clearTimeout(spinLockTimeoutRef.current);
        spinLockTimeoutRef.current = null;
      }
    }
  };

  // Check if bonus should end after spin completes
  const handleBonusEnd = useCallback(async () => {
    if (shouldEndBonus && !isSpinning && !isWinAnimating) {
      const { winnings, spins } = await endBonus();
      
      // Bonus result is now recorded server-side in the slot-spin edge function
      // when free_spins_remaining reaches 0. Just invalidate the leaderboard cache.
      if (winnings > 0) {
        debouncedLeaderboardInvalidate();
      }
      
      setBonusTotalWinnings(winnings);
      setBonusTotalSpinsUsed(spins);
      slotSounds.playBonusWin();
      setShowBonusComplete(true);
    }
  }, [shouldEndBonus, isSpinning, isWinAnimating, endBonus, user, bonusBetAmount, queryClient]);

  // Trigger bonus end check after spin and win animation complete
  useEffect(() => {
    if (shouldEndBonus && !isSpinning && !isWinAnimating && !showBonusComplete) {
      handleBonusEnd();
    }
  }, [shouldEndBonus, isSpinning, isWinAnimating, showBonusComplete, handleBonusEnd]);

  // Show pending bonus trigger after win animation completes
  useEffect(() => {
    if (pendingBonusTrigger && !isWinAnimating && !isSpinning) {
      const timer = setTimeout(() => {
        if (pendingBonusTrigger.isRetrigger) {
          slotSounds.playRetrigger();
          setShowRetrigger(true);
        } else {
          slotSounds.playBonusTrigger();
          setShowBonusTrigger(true);
        }
        setPendingBonusTrigger(null);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [pendingBonusTrigger, isWinAnimating, isSpinning]);

  // Spacebar keyboard handler for spinning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) return;
      
      const canSpinNow = bonusState.isActive 
        ? bonusState.freeSpinsRemaining > 0 
        : hasEnoughSpins(bet);
      
      if (!isSpinning && !spinLockRef.current && !isSpinLocked && canSpinNow && !showBonusTrigger && !showScatterCelebration && !showRetrigger && !showBonusComplete && !pendingBonusTrigger && !isAutoSpinning) {
        handleSpin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpinning, isSpinLocked, bonusState.isActive, bonusState.freeSpinsRemaining, bet, hasEnoughSpins, showBonusTrigger, showScatterCelebration, showRetrigger, showBonusComplete, pendingBonusTrigger, isAutoSpinning]);

  // Autospin effect for normal spins
  useEffect(() => {
    if (!isAutoSpinning || shouldStopAutoSpinRef.current) {
      autoSpinScheduledRef.current = false;
      return;
    }
    
    if (isSpinning || isWinAnimating || isSpinLocked) return;
    if (showBonusTrigger || showBonusComplete || showRetrigger) return;
    if (bonusState.isActive) return;
    
    if (!canSpin) {
      stopAutoSpin();
      return;
    }
    
    if (autoSpinScheduledRef.current) return;
    
    autoSpinScheduledRef.current = true;
    
    const delay = 1000;
    autoSpinTimeoutRef.current = setTimeout(() => {
      autoSpinScheduledRef.current = false;
      if (!shouldStopAutoSpinRef.current && isAutoSpinning) {
        handleSpinRef.current();
      }
    }, delay);
  }, [
    isAutoSpinning, 
    isSpinning, 
    isWinAnimating, 
    isSpinLocked,
    canSpin, 
    showBonusTrigger, 
    showBonusComplete, 
    showRetrigger,
    bonusState.isActive,
    stopAutoSpin
  ]);

  // Auto-spin during bonus mode
  const handleSpinRef = useRef(handleSpin);
  handleSpinRef.current = handleSpin;
  
  useEffect(() => {
    if (!bonusState.isActive || bonusState.freeSpinsRemaining === 0) return;
    if (isSpinning || isWinAnimating) return;
    if (isSpinLocked) return;
    if (showBonusTrigger || showBonusComplete || showRetrigger || showScatterCelebration) return;
    
    const timer = setTimeout(() => {
      try {
        handleSpinRef.current();
      } catch (error) {
        console.error("[BonusAutoSpin] Error during auto-spin:", error);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [bonusState.isActive, bonusState.freeSpinsRemaining, isSpinning, isWinAnimating, isSpinLocked, showBonusTrigger, showBonusComplete, showRetrigger, showScatterCelebration]);

  // Stable empty array to avoid defeating React.memo when there are no wins
  const EMPTY_POSITIONS = React.useMemo(() => [] as number[], []);

  // Find winning positions for each reel - memoized to prevent SlotReel re-renders
  const getWinningPositions = useCallback((reelIndex: number): number[] => {
    if (!lastResult || lastResult.wins.length === 0) return EMPTY_POSITIONS;
    
    if (expandedReels.length > 0 && !expandedReels.includes(reelIndex)) {
      return EMPTY_POSITIONS;
    }
    
    // If this reel is expanded, all 3 rows show the winning effect
    if (expandedReels.length > 0 && expandedReels.includes(reelIndex)) {
      return [0, 1, 2];
    }
    
    const positions: number[] = [];
    for (const win of lastResult.wins) {
      const linePattern = PAY_LINES[win.lineIndex];
      if (reelIndex < win.count) {
        positions.push(linePattern[reelIndex]);
      }
    }
    return [...new Set(positions)];
  }, [lastResult, expandedReels, EMPTY_POSITIONS]);

  const isReelExpanded = useCallback((reelIndex: number): boolean => {
    return expandedReels.includes(reelIndex);
  }, [expandedReels]);

  // Update the ref with the latest onReelStop handler (captures current closures)
  onReelStopRef.current = async (reelIndex: number) => {
    slotSounds.playReelStopSingle(reelIndex);
    
    // Trigger the next reel to slow down
    if (reelIndex < 4) {
      setTimeout(() => {
        setActiveSlowdownReel(reelIndex + 1);
      }, slotSettings.reelStaggerMs);
    }
    
    // Check for scatter sounds using pre-computed scatter map
    const hasScatterOnReel = scatterReelMap.get(reelIndex) ?? false;
    
    if (hasScatterOnReel) {
      let scattersLanded = 0;
      for (let r = 0; r <= reelIndex; r++) {
        if (scatterReelMap.get(r)) scattersLanded++;
      }
      
      let scattersOnReels123 = 0;
      for (let r = 0; r <= Math.min(reelIndex, 2); r++) {
        if (scatterReelMap.get(r)) scattersOnReels123++;
      }
      
      const isOnReels123 = reelIndex <= 2;
      const isOnReel4WithPriorScatter = reelIndex === 3 && scattersOnReels123 > 0;
      const isOnReel5WithBonusScatters = reelIndex === 4 && scattersLanded >= 3;
      
      if (isOnReels123 || isOnReel4WithPriorScatter || isOnReel5WithBonusScatters) {
        slotSounds.playScatterLand(scattersLanded);
      }
      
      const canTriggerTease = isOnReels123 || isOnReel4WithPriorScatter;
      if (canTriggerTease) {
        setScatterReelsLanded(prev => new Set([...prev, reelIndex]));
      }
    }
    
    stoppedReelsRef.current.add(reelIndex);
    
    // Handle sequential tease reel activation using Set for O(1) lookup
    if (teaseReelsSet.has(reelIndex)) {
      const currentTeaseIndex = teaseReels.indexOf(reelIndex);
      if (currentTeaseIndex < teaseReels.length - 1) {
        setActiveTeaseReelIndex(teaseReels[currentTeaseIndex + 1]);
      }
    } else if (teaseReelsSet.size > 0) {
      const nextReel = reelIndex + 1;
      if (teaseReelsSet.has(nextReel)) {
        setActiveTeaseReelIndex(nextReel);
      }
    }
    
    // Process result when all reels have stopped
    if (stoppedReelsRef.current.size === 5 && pendingResultRef.current) {
      if (stopTeaseSound.current) {
        stopTeaseSound.current();
        stopTeaseSound.current = null;
      }
      
      const result = pendingResultRef.current;
      const expandedGrid = pendingExpandedGridRef.current;
      const reelsExpanded = pendingExpandedReelsRef.current;
      const isBonusSpin = isBonusSpinRef.current;
      
      // Clear tease darkening before expansion begins
      setScatterReelsLanded(new Set());
      
      // Handle bonus expansion animation
      if (isBonusSpin && reelsExpanded.length > 0 && expandedGrid) {
        const winGroups = pendingExpandingWinGroupsRef.current;
        const hasMultipleGroups = winGroups && winGroups.length > 1;
        
        const expandingWinSymbolIds = new Set(
          (winGroups || []).flatMap(g => g.wins.map((w: any) => `${w.lineIndex}-${w.symbolId}`))
        );
        const connectingWins = result.wins.filter((w: any) => 
          !expandingWinSymbolIds.has(`${w.lineIndex}-${w.symbolId}`)
        );
        
        if (connectingWins.length > 0) {
          setLastResult({ ...result, wins: connectingWins, totalWin: connectingWins.reduce((sum: number, w: any) => sum + w.payout, 0) });
          setShowConnectingWins(true);
          setShowWinLines(true);
          await new Promise(resolve => setTimeout(resolve, 1200));
          setShowWinLines(false);
          setShowConnectingWins(false);
          setLastResult(null);
        }
        
        if (hasMultipleGroups) {
          const originalGridCopy = result.grid.map((col: string[]) => [...col]);
          skipEndCelebrationRef.current = true;
          
          for (let groupIdx = 0; groupIdx < winGroups.length; groupIdx++) {
            const group = winGroups[groupIdx];
            expandedReelSymbolMapRef.current = {};
            
            const groupReelSymbolMap: Record<number, string> = {};
            for (const reelIdx of group.reels) {
              groupReelSymbolMap[reelIdx] = group.symbolId;
            }
            expandedReelSymbolMapRef.current = groupReelSymbolMap;
            
            const partialGrid = originalGridCopy.map((col: string[]) => [...col]);
            for (const col of group.reels) {
              for (let row = 0; row < 3; row++) {
                partialGrid[col][row] = group.symbolId;
              }
            }
            
            setExpandedReels(group.reels);
            setShowExpansionDarken(true);
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setGrid(partialGrid);
            setNewlyExpandedReels(group.reels);
            slotSounds.playSymbolExpand();
            await new Promise(resolve => setTimeout(resolve, 600));
            setNewlyExpandedReels([]);
            
            const groupWin = group.wins.reduce((sum: number, w: any) => sum + w.payout, 0);
            if (group.wins.length > 0) {
              setLastResult({ ...result, wins: group.wins, totalWin: groupWin });
              setShowConnectingWins(true);
              setShowWinLines(true);
              await new Promise(resolve => setTimeout(resolve, 1200));
              setShowWinLines(false);
              setShowConnectingWins(false);
            }
            
            if (groupWin > 0) {
              if (groupWin >= bet * 50) {
                slotSounds.playBigWin();
              } else if (groupWin >= bet * 10) {
                slotSounds.playMediumWin();
              } else {
                slotSounds.playSmallWin();
              }
              
              await new Promise<void>(resolve => {
                if (groupWin >= bet * 10) {
                  winCelebrationResolveRef.current = resolve;
                  setWinAmount(groupWin);
                  setIsWinAnimating(true);
                } else {
                  setWinAmount(groupWin);
                  setIsWinAnimating(true);
                  setTimeout(() => {
                    setIsWinAnimating(false);
                    resolve();
                  }, 2000);
                }
              });
              
              setWinAmount(0);
              setIsWinAnimating(false);
            }
            
            setLastResult(null);
            setShowExpansionDarken(false);
            
            // Don't reset expansion on last group if retrigger is coming
            const isLastGroup = groupIdx === winGroups.length - 1;
            if (isLastGroup && result.bonusTriggered) {
              // Keep expanded state visible during retrigger animation
              await new Promise(resolve => setTimeout(resolve, 300));
            } else {
              expandedReelSymbolMapRef.current = {};
              setGrid(originalGridCopy);
              setExpandedReels([]);
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }
          
          pendingExpandedReelsRef.current = [];
          pendingExpandingWinGroupsRef.current = [];
      } else if (winGroups.length > 0) {
          // Show connecting (non-expanding) payline wins first, before expansion
          const singleGroupWinKeys = new Set(
            winGroups[0].wins.map((w: any) => `${w.lineIndex}-${w.symbolId}`)
          );
          const connectingWinsSingle = result.wins.filter((w: any) => 
            !singleGroupWinKeys.has(`${w.lineIndex}-${w.symbolId}`)
          );
          
          if (connectingWinsSingle.length > 0) {
            setLastResult({ ...result, wins: connectingWinsSingle, totalWin: connectingWinsSingle.reduce((sum: number, w: any) => sum + w.payout, 0) });
            setShowConnectingWins(true);
            setShowWinLines(true);
            await new Promise(resolve => setTimeout(resolve, 1200));
            setShowWinLines(false);
            setShowConnectingWins(false);
            setLastResult(null);
          }
          
          setExpandedReels(reelsExpanded);
          setShowExpansionDarken(true);
          await new Promise(resolve => setTimeout(resolve, 500));
          
          setGrid(expandedGrid);
          setNewlyExpandedReels(reelsExpanded);
          slotSounds.playSymbolExpand();
          await new Promise(resolve => setTimeout(resolve, 600));
          setNewlyExpandedReels([]);
          
          const singleGroup = winGroups[0];
          const groupWin = singleGroup.wins.reduce((sum, w) => sum + w.payout, 0);
          if (singleGroup.wins.length > 0) {
            setLastResult({ ...result, wins: singleGroup.wins, totalWin: groupWin });
            setShowConnectingWins(true);
            setShowWinLines(true);
            await new Promise(resolve => setTimeout(resolve, 1200));
            setShowWinLines(false);
            setShowConnectingWins(false);
            setLastResult(null);
          }
          setShowExpansionDarken(false);
          
          pendingExpandedReelsRef.current = [];
          pendingExpandingWinGroupsRef.current = [];
        } else {
          // Expansion happened but no wins -- show expansion visually only
          setExpandedReels(reelsExpanded);
          setShowExpansionDarken(true);
          await new Promise(resolve => setTimeout(resolve, 500));
          setGrid(expandedGrid);
          setNewlyExpandedReels(reelsExpanded);
          slotSounds.playSymbolExpand();
          await new Promise(resolve => setTimeout(resolve, 600));
          setNewlyExpandedReels([]);
          setShowExpansionDarken(false);
          pendingExpandedReelsRef.current = [];
          pendingExpandingWinGroupsRef.current = [];
        }
        
        // Filter out wins already shown during expansion to prevent re-flash
        const allExpandingWinKeys = new Set(
          winGroups.flatMap(g => g.wins.map((w: any) => `${w.lineIndex}-${w.symbolId}`))
        );
        const remainingWins = result.wins.filter(
          (w: any) => !allExpandingWinKeys.has(`${w.lineIndex}-${w.symbolId}`)
        );
        setLastResult({ ...result, wins: remainingWins });
      } else {
        setLastResult(result);
      }
      
      let shouldStopAuto = false;
      if (result.bonusTriggered) {
        suppressRealtimeUpdates();
        shouldStopAuto = true;
        
        if (isBonusSpin) {
          setRetriggerSpinsAdded(10);
          
          if (gameId === "rise-of-fedesvin" && pendingBonusStateRef.current?.expandingSymbolIds) {
            const expandingIds = pendingBonusStateRef.current.expandingSymbolIds as string[];
            const newSymbolId = expandingIds[expandingIds.length - 1];
            const newSymbol = symbols?.find(s => s.id === newSymbolId) || null;
            setPendingRetriggerSymbol(newSymbol);
          }
          
          if (result.totalWin > 0) {
            setPendingBonusTrigger({ isRetrigger: true, spinsToAdd: 10 });
          } else {
            slotSounds.playRetrigger();
            setShowRetrigger(true);
          }
        } else {
          setShowScatterCelebration(true);
          slotSounds.playScatterCelebration();
          
          setTimeout(() => {
            setShowScatterCelebration(false);
            if (result.totalWin > 0) {
              setPendingBonusTrigger({ isRetrigger: false, expandingSymbol: pendingExpandingSymbol });
            } else {
              slotSounds.playBonusTrigger();
              setShowBonusTrigger(true);
            }
          }, 1500);
        }
      }
      
      if (isAutoSpinning) {
        if (shouldStopAuto) {
          stopAutoSpin();
        } else {
          decrementAutoSpins();
        }
      }
      
      let hasWinAnimation = false;
      if (skipEndCelebrationRef.current) {
        skipEndCelebrationRef.current = false;
        if (result.totalWin > 0) {
          setWinAmount(result.totalWin);
          hasWinAnimation = true;
        }
      } else if (result.totalWin >= bet * 50) {
        slotSounds.playBigWin();
        setIsWinAnimating(true);
        setWinAmount(result.totalWin);
        hasWinAnimation = true;
        setTimeout(() => setIsWinAnimating(false), 2000);
      } else if (result.totalWin >= bet * 10) {
        slotSounds.playMediumWin();
        setIsWinAnimating(true);
        setWinAmount(result.totalWin);
        hasWinAnimation = true;
        setTimeout(() => setIsWinAnimating(false), 2000);
      } else if (result.totalWin > 0) {
        slotSounds.playSmallWin();
        setIsWinAnimating(true);
        setWinAmount(result.totalWin);
        hasWinAnimation = true;
        setTimeout(() => setIsWinAnimating(false), 2000);
      } else if (!result.bonusTriggered) {
        slotSounds.playNoWin();
      }
      
      if (result.wins.length > 0) {
        setShowWinLines(true);
      }
      
      pendingResultRef.current = null;
      
      if (pendingBonusStateRef.current && !result.bonusTriggered) {
        const deferredBonusState = pendingBonusStateRef.current;
        pendingBonusStateRef.current = null;
        
        const applyDelay = hasWinAnimation ? 2000 : 0;
        if (applyDelay > 0) {
          setTimeout(() => {
            updateBonusFromServer(deferredBonusState);
            resumeRealtimeUpdates();
          }, applyDelay);
        } else {
          updateBonusFromServer(deferredBonusState);
          resumeRealtimeUpdates();
        }
      }
      
      // Debounced leaderboard invalidation - only on wins (MV refreshes every 60s anyway)
      if (result.totalWin > 0) {
        debouncedLeaderboardInvalidate();
      }
      
      setIsSpinning(false);
      setTeaseReels([]);
      setActiveTeaseReelIndex(null);
      setActiveSlowdownReel(-1);
      
      const spinLockDelay = hasWinAnimation ? 2000 : 500;
      setTimeout(() => {
        spinLockRef.current = false;
        setIsSpinLocked(false);
        if (spinLockTimeoutRef.current) {
          clearTimeout(spinLockTimeoutRef.current);
          spinLockTimeoutRef.current = null;
        }
      }, spinLockDelay);
    }
  };
  
  // Stable callback wrapper that delegates to the ref - never changes identity
  const stableOnReelStop = useCallback((reelIndex: number) => {
    onReelStopRef.current?.(reelIndex);
  }, []);

  const symbolDimensions = { size: SYMBOL_SIZE, gap: SYMBOL_GAP };

  if (symbolsLoading) {
    return (
      <Card className={cn("border-opacity-20", gameId === "rise-of-fedesvin" ? "border-purple-500/20" : "border-amber-500/20")}>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <Loader2 className={cn("h-8 w-8 animate-spin", gameId === "rise-of-fedesvin" ? "text-purple-500" : "text-amber-500")} />
        </CardContent>
      </Card>
    );
  }

  if (!symbols || symbols.length === 0) {
    return (
      <Card className={cn("border-opacity-20", gameId === "rise-of-fedesvin" ? "border-purple-500/20" : "border-amber-500/20")}>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Gamepad2 className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Symboler indlæses...</p>
        </CardContent>
      </Card>
    );
  }

  const canSpinNow = bonusState.isActive ? bonusState.freeSpinsRemaining > 0 : hasEnoughSpins(bet);

  return (
    <div className="transition-all duration-300 relative">
      {/* Credits expired overlay */}
      <CreditsExpiredOverlay isVisible={spinsRemaining <= 0 && !bonusState.isActive && !isSpinning && !showWinLines} />
      {/* Bonus Overlays */}
      <BonusOverlay
        isVisible={showRetrigger}
        type="retrigger"
        retriggerSpins={retriggerSpinsAdded}
        totalFreeSpins={bonusState.freeSpinsRemaining}
        expandingSymbols={bonusState.expandingSymbols}
        allSymbols={symbols || []}
        newRetriggerSymbol={
          gameId === "rise-of-fedesvin" ? pendingRetriggerSymbol : undefined
        }
        excludeSymbolIds={
          gameId === "rise-of-fedesvin"
            ? bonusState.expandingSymbols.map(s => s.id)
            : []
        }
        onClose={() => {
          setShowRetrigger(false);
          setPendingRetriggerSymbol(null);
          // Clean up any lingering expansion state from pre-retrigger
          expandedReelSymbolMapRef.current = {};
          setExpandedReels([]);
          setShowExpansionDarken(false);
          resumeRealtimeUpdates();
          if (pendingBonusStateRef.current) {
            // Restore the locked-in bet from the bonus state
            const lockedBet = pendingBonusStateRef.current.betAmount || bonusBetAmount;
            if (lockedBet > 0) {
              setBet(lockedBet);
            }
            updateBonusFromServer(pendingBonusStateRef.current);
            pendingBonusStateRef.current = null;
          }
        }}
        gameId={gameId}
      />
      <BonusOverlay
        isVisible={showBonusTrigger}
        type="trigger"
        expandingSymbol={pendingExpandingSymbol}
        allSymbols={symbols || []}
        onClose={() => {
          setShowBonusTrigger(false);
          setBonusBarsReady(true);
          resumeRealtimeUpdates();
          if (pendingBonusStateRef.current) {
            // Restore the locked-in bet from the bonus state BEFORE auto-spin fires
            const lockedBet = pendingBonusStateRef.current.betAmount || bonusBetAmount;
            if (lockedBet > 0) {
              setBet(lockedBet);
            }
            updateBonusFromServer(pendingBonusStateRef.current);
            pendingBonusStateRef.current = null;
          }
        }}
        gameId={gameId}
      />
      <BonusOverlay
        isVisible={showBonusComplete}
        type="complete"
        totalWinnings={bonusTotalWinnings}
        totalFreeSpins={bonusTotalSpinsUsed}
        expandingSymbols={bonusState.expandingSymbols}
        allSymbols={symbols || []}
        onClose={() => {
          setShowBonusComplete(false);
          setBonusTotalWinnings(0);
          setBonusTotalSpinsUsed(0);
          setWinAmount(0);
          setBonusBarsReady(false);
        }}
        gameId={gameId}
      />

      <div className="max-w-fit mx-auto">
        <div className="p-4 space-y-2">
          {/* Slot machine reels with frame */}
          <div className="flex justify-center relative">
            <SlotMachineFrame isBonus={bonusState.isActive} isSpinning={isSpinning} gameId={gameId}>
              <div className="relative p-6 rounded-xl">
                {/* Win Celebration Effects */}
                <WinCelebration
                  isActive={isWinAnimating}
                  winAmount={winAmount}
                  bet={bet}
                  gameId={gameId}
                  onAnimationComplete={() => {
                    setIsWinAnimating(false);
                    if (winCelebrationResolveRef.current) {
                      winCelebrationResolveRef.current();
                      winCelebrationResolveRef.current = null;
                    }
                  }}
                />
                {/* Idle effects */}
                <SlotAmbientLight
                  isIdle={!isSpinning && !isWinAnimating && !bonusState.isActive}
                  theme={gameId === "rise-of-fedesvin" ? "purple" : "gold"}
                />
                <SlotIdleEffects
                  isIdle={!isSpinning && !isWinAnimating && !bonusState.isActive}
                  theme={gameId === "rise-of-fedesvin" ? "purple" : "gold"}
                  width={5 * SYMBOL_SIZE + 4 * 2}
                  height={3 * SYMBOL_SIZE + 2 * SYMBOL_GAP}
                />

                {/* Reel container */}
                <div className="relative flex gap-0">
                  {grid?.map((column, colIndex) => (
                    <React.Fragment key={colIndex}>
                      <SlotReel
                        symbols={symbols}
                        displayedSymbolIds={column}
                        isSpinning={isSpinning}
                        winningPositions={getWinningPositions(colIndex)}
                        isExpanded={isReelExpanded(colIndex)}
                        isNewlyExpanded={newlyExpandedReels.includes(colIndex)}
                        expandingSymbolId={expandedReelSymbolMapRef.current[colIndex] || bonusState.expandingSymbol?.id}
                        delay={colIndex}
                        shouldSlowDown={activeSlowdownReel >= colIndex}
                        spinLoopMs={slotSettings.spinLoopMs}
                        reelSlowdownMs={slotSettings.reelSlowdownMs}
                        onReelStop={stableOnReelStop}
                        teaseMode={teaseReelsSet.has(colIndex)}
                        isActiveTeaseReel={teaseReelsSet.has(colIndex) && activeTeaseReelIndex === colIndex}
                        scatterLandedOnPreviousReel={scatterReelsLanded.has(teaseInfo.lastScatterReel)}
                        extendedFakeLoop={teaseInfo.lateScatter && colIndex === 4}
                        globalTeaseActive={teaseReelsSet.size > 0 && isSpinning && activeTeaseReelIndex !== null}
                        hasLandedScatter={scatterReelsLanded.has(colIndex) && scatterReelsLanded.size >= 2 && isSpinning}
                        isScatterCelebrating={showScatterCelebration}
                        isDarkenedForTease={isDarkenedForTeaseGlobal}
                        isDarkenedForExpansion={showExpansionDarken && !expandedReels.includes(colIndex)}
                        gameId={gameId}
                        isBonusActive={bonusState.isActive}
                      />
                      {colIndex < 4 && (
                        <div className={cn("w-[2px] self-stretch", gameId === "rise-of-fedesvin" ? "bg-purple-950/70" : "bg-amber-950/70")} />
                      )}
                    </React.Fragment>
                  ))}
                  
                  {/* Win Lines Overlay */}
                  {lastResult && lastResult.wins.length > 0 && (
                    <WinLines
                      wins={lastResult.wins}
                      symbolSize={symbolDimensions.size}
                      gap={symbolDimensions.gap}
                      isVisible={showWinLines && (!isSpinning || showConnectingWins)}
                      gameId={gameId}
                    />
                  )}
                </div>
              </div>
            </SlotMachineFrame>
          </div>

          {/* Bonus Status Bar + Control Panel */}
          <div style={{ marginTop: `${controlsGap}px` }}>
            <div className={cn(
              "max-w-fit mx-auto mb-3 space-y-2",
              gameId === "rise-of-fedesvin"
                ? "min-h-[100px]"
                : "min-h-[56px]"
            )}>
              <BonusStatusBar
                isActive={bonusState.isActive && bonusBarsReady}
                freeSpinsRemaining={bonusState.freeSpinsRemaining}
                totalFreeSpins={bonusState.totalFreeSpins}
                expandingSymbol={bonusState.expandingSymbol}
                expandingSymbols={bonusState.expandingSymbols}
                bonusWinnings={bonusState.bonusWinnings}
                gameId={gameId}
              />
              {gameId === "rise-of-fedesvin" && (
                <BonusSymbolBar
                  isVisible={bonusState.isActive && bonusBarsReady}
                  allSymbols={symbols || []}
                  expandingSymbols={bonusState.expandingSymbols}
                  gameId={gameId}
                />
              )}
            </div>
            
            <BonanzaControlBar
              bet={effectiveBet}
              onBetChange={setBet}
              onSpin={handleSpin}
              onAutoSpinToggle={toggleAutoSpin}
              isSpinning={isSpinning}
              canSpin={canSpin}
              isAutoSpinning={isAutoSpinning}
              autoSpinCount={autoSpinCount}
              onAutoSpinCountChange={setAutoSpinCount}
              autoSpinsRemaining={autoSpinsRemaining}
              bonusState={bonusState}
              bonusLoaded={bonusLoaded}
              disabled={isSpinning || isSpinLocked}
              isSpinLocked={isSpinLocked}
              minBet={slotSettings.minBet}
              maxBet={slotSettings.maxBet}
              spinsRemaining={spinsRemaining}
              maxSpins={maxSpins}
              spinsLoading={false}
              showBonusTrigger={showBonusTrigger}
              winAmount={winAmount}
              gameId={gameId}
            />
          </div>

          {/* No spins message */}
          {!canSpinNow && !bonusState.isActive && (
            <div className="text-center p-4 bg-muted/50 rounded-lg mt-3">
              <p className="text-muted-foreground">
                Du har brugt alle dine spins i dag. Kom tilbage i morgen for {maxSpins} nye!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
