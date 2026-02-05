import React, { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SlotReel } from "./SlotReel";
import { WinDisplay } from "./WinDisplay";
import { WinLines } from "./WinLines";
import { BonusOverlay } from "./BonusOverlay";
import { BonusStatusBar } from "./BonusStatusBar";
import { SlotMachineFrame } from "./SlotMachineFrame";
import { WinCelebration } from "./WinCelebration";
import { SlotControlPanel } from "./SlotControlPanel";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSymbolPreloader } from "@/hooks/useSlotSymbolPreloader";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useSlotSoundLoader } from "@/hooks/useSlotSoundLoader";
import { useBonusGame } from "@/hooks/useBonusGame";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { generateGrid, calculateSpinResult, PAY_LINES, getScatterTeaseReels, type SpinResult, type TeaseInfo } from "@/lib/slotGameLogic";
import { calculateBonusSpinResult } from "@/lib/bonusGameLogic";
import { slotSounds } from "@/lib/slotSoundEffects";
import { Loader2, Gamepad2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Symbol dimensions for responsive design - INCREASED FOR DESKTOP
const SYMBOL_SIZE = { xs: 64, mobile: 76, sm: 96, md: 120, lg: 160, xl: 180 };
const GAP = { xs: 4, mobile: 6, sm: 8, md: 12, lg: 16, xl: 20 };

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

export function SlotGame() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols();
  const { validateSymbols } = useSlotSymbolPreloader(symbols);
  const { spinsRemaining, maxSpins, canSpin, decrementSpin, hasEnoughSpins } = useSlotSpins();
  const { settings: slotSettings } = useSlotSettings();
  
  // Load custom sound files from site_settings
  useSlotSoundLoader();
  const { 
    bonusState, 
    isLoaded: bonusLoaded,
    triggerBonus, 
    decrementFreeSpin,
    addBonusWinnings, 
    retriggerBonus, 
    endBonus,
    shouldEndBonus 
  } = useBonusGame(symbols);
  
  const [bet, setBet] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [lastResult, setLastResult] = useState<SpinResult | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [isWinAnimating, setIsWinAnimating] = useState(false);
  const [expandedReels, setExpandedReels] = useState<number[]>([]);
  const [newlyExpandedReels, setNewlyExpandedReels] = useState<number[]>([]);
  const [showWinLines, setShowWinLines] = useState(false);
  const [teaseReels, setTeaseReels] = useState<number[]>([]);
  const [activeTeaseReelIndex, setActiveTeaseReelIndex] = useState<number | null>(null);
  const [teaseInfo, setTeaseInfo] = useState<TeaseInfo>({ reels: [], lateScatter: false, lastScatterReel: -1 });
  const [scatterReelsLanded, setScatterReelsLanded] = useState<Set<number>>(new Set());
  const [showExpansionDarken, setShowExpansionDarken] = useState(false);
  
  // Sequential reel stopping - which reel should currently slow down (-1 = none yet)
  const [activeSlowdownReel, setActiveSlowdownReel] = useState(-1);
  const initialSpinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Spin lock to prevent rapid clicking
  const spinLockRef = useRef(false);
  const [isSpinLocked, setIsSpinLocked] = useState(false);
  const spinLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const winLinesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track stopped reels for tease-mode timing
  const stoppedReelsRef = useRef<Set<number>>(new Set());
  const pendingResultRef = useRef<SpinResult | null>(null);
  const pendingExpandedGridRef = useRef<string[][] | null>(null);
  const pendingExpandedReelsRef = useRef<number[]>([]);
  const isBonusSpinRef = useRef(false);
  
  // Autospin state
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState<AutoSpinCount>(10);
  const [autoSpinsRemaining, setAutoSpinsRemaining] = useState<number | null>(null);
  const autoSpinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldStopAutoSpinRef = useRef(false);
  
  // Bonus overlay states
  const [showBonusTrigger, setShowBonusTrigger] = useState(false);
  const [showBonusComplete, setShowBonusComplete] = useState(false);
  const [showRetrigger, setShowRetrigger] = useState(false);
  const [retriggerSpinsAdded, setRetriggerSpinsAdded] = useState(10);
  const [pendingExpandingSymbol, setPendingExpandingSymbol] = useState<typeof bonusState.expandingSymbol>(null);
  const [bonusTotalWinnings, setBonusTotalWinnings] = useState(0);
  const [bonusTotalSpinsUsed, setBonusTotalSpinsUsed] = useState(0);
  
  // Pending bonus trigger - to show win animation before bonus overlay
  const [pendingBonusTrigger, setPendingBonusTrigger] = useState<{
    isRetrigger: boolean;
    spinsToAdd?: number;
    expandingSymbol?: typeof bonusState.expandingSymbol;
  } | null>(null);
  
  // Scatter celebration state - pulse/glow before bonus screen
  const [showScatterCelebration, setShowScatterCelebration] = useState(false);
  
  const stopTeaseSound = useRef<(() => void) | null>(null);

  // Initialize grid with random symbols
  const initializeGrid = useCallback(() => {
    if (!symbols || symbols.length === 0) return;
    const newGrid = generateGrid(symbols);
    setGrid(newGrid);
  }, [symbols]);

  // Initialize on first load
  if (!grid && symbols && symbols.length > 0) {
    initializeGrid();
  }

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
      // Stop all slot sounds and music when leaving the page
      slotSounds.stopMusic();
      if (stopTeaseSound.current) {
        stopTeaseSound.current();
      }
    };
  }, []);

  // Spacebar keyboard handler for spinning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle spacebar
      if (e.code !== "Space") return;
      
      // Prevent scroll (default browser behavior)
      e.preventDefault();
      
      // Ignore if focus is on an input element
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "SELECT"
      ) return;
      
      // Check if we can spin
      const canSpinNow = bonusState.isActive 
        ? bonusState.freeSpinsRemaining > 0 
        : hasEnoughSpins(bet);
      
      // Also check spinLockRef AND isSpinLocked to prevent spinning before reel 5 has landed
      if (!isSpinning && !spinLockRef.current && !isSpinLocked && canSpinNow && !showBonusTrigger && !isAutoSpinning) {
        handleSpin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpinning, isSpinLocked, bonusState.isActive, bonusState.freeSpinsRemaining, bet, hasEnoughSpins, showBonusTrigger, isAutoSpinning]);

  // Stop autospin when out of spins or on big win/bonus
  const stopAutoSpin = useCallback(() => {
    setIsAutoSpinning(false);
    setAutoSpinsRemaining(null);
    shouldStopAutoSpinRef.current = true;
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

  const handleSpin = async () => {
    // Prevent rapid clicking with a spin lock - use BOTH ref and state for safety
    if (spinLockRef.current || isSpinLocked) return;
    
    if (!symbols || symbols.length === 0 || !user || isSpinning) return;
    
    // Validate that all symbol images are loaded correctly
    const symbolValidation = validateSymbols();
    if (!symbolValidation.isValid) {
      if (symbolValidation.failedUrls.length > 0) {
        console.warn('[SlotGame] Some symbol images failed to load:', symbolValidation.failedUrls);
        toast.error(`Symbol-billeder kunne ikke indlæses: ${symbolValidation.failedUrls.join(', ')}`);
      } else if (symbolValidation.missingSymbols.length > 0) {
        console.warn('[SlotGame] Some symbols are missing images:', symbolValidation.missingSymbols);
        toast.error(`Manglende symbol-billeder: ${symbolValidation.missingSymbols.join(', ')}`);
      }
      spinLockRef.current = false;
      return;
    }
    
    // Check if we can spin (either normal spin or bonus free spin)
    const isBonusSpin = bonusState.isActive && bonusState.freeSpinsRemaining > 0;
    // For normal spins, check if we have enough spins for the current bet
    if (!isBonusSpin && !hasEnoughSpins(bet)) return;

    // Set spin lock immediately to prevent double-clicks
    spinLockRef.current = true;
    setIsSpinLocked(true);
    
    // Clear any existing lock timeout
    if (spinLockTimeoutRef.current) {
      clearTimeout(spinLockTimeoutRef.current);
    }
    
    // Safety timeout to release lock in case something goes wrong (5 seconds max)
    spinLockTimeoutRef.current = setTimeout(() => {
      spinLockRef.current = false;
    }, 5000);

    // Generate final result BEFORE starting the animation
    // This ensures SlotReel knows what symbols to land on
    // Pass isBonusSpin to reduce scatter weight during bonus rounds
    const originalGrid = generateGrid(symbols, isBonusSpin);
    let result: SpinResult;
    let expandedGrid = originalGrid;
    let reelsExpanded: number[] = [];

    // For bonus spins, we need to calculate the result but show original grid first
    if (isBonusSpin && bonusState.expandingSymbol) {
      // Apply expanding symbol logic during bonus
      const bonusResult = calculateBonusSpinResult(
        originalGrid,
        symbols,
        bet,
        bonusState.expandingSymbol
      );
      result = bonusResult.result;
      expandedGrid = bonusResult.expandedGrid;
      reelsExpanded = bonusResult.expandedReels;
    } else {
      result = calculateSpinResult(originalGrid, symbols, bet);
      expandedGrid = originalGrid;
    }

    // Calculate which reels should tease (slow down) based on scatter positions
    const teaseResult = getScatterTeaseReels(originalGrid, symbols);
    setTeaseReels(teaseResult.reels);
    setTeaseInfo(teaseResult);
    setActiveTeaseReelIndex(null); // Reset active tease reel for new spin
    setScatterReelsLanded(new Set()); // Reset scatter reel landing tracking

    // Set the ORIGINAL grid for spinning (not the expanded one yet)
    // This creates the first phase where symbols land naturally
    setGrid(originalGrid);
    setLastResult(null); // Clear last result during spin
    setWinAmount(0);
    setIsWinAnimating(false);
    setExpandedReels([]);
    setNewlyExpandedReels([]);
    setShowWinLines(false);
    
    // Reset reel tracking for tease-mode timing
    stoppedReelsRef.current = new Set();
    pendingResultRef.current = result;
    pendingExpandedGridRef.current = expandedGrid;
    pendingExpandedReelsRef.current = reelsExpanded;
    isBonusSpinRef.current = isBonusSpin;
    
    // Reset sequential reel stopping
    setActiveSlowdownReel(-1);
    
    // Now start the spin animation
    setIsSpinning(true);
    
    // Clear any existing win lines timeout
    if (winLinesTimeoutRef.current) {
      clearTimeout(winLinesTimeoutRef.current);
      winLinesTimeoutRef.current = null;
    }

    // Play quick spin start sound only (no continuous loop)
    slotSounds.playSpinStart();
    
    // Start tease sound if we have tease reels
    if (teaseResult.reels.length > 0) {
      stopTeaseSound.current = slotSounds.playTeaseStart();
    }
    
    // After 500ms initial spin, start reel 0 slowing down
    if (initialSpinTimeoutRef.current) {
      clearTimeout(initialSpinTimeoutRef.current);
    }
    initialSpinTimeoutRef.current = setTimeout(() => {
      setActiveSlowdownReel(0);
    }, 500);

    try {
      // Decrement spin count (only for non-bonus spins)
      // Bet amount determines how many spins are used
      if (!isBonusSpin) {
        await decrementSpin.mutateAsync(bet);
      } else {
        decrementFreeSpin();
      }
      
      // Result processing is now handled in onReelStop callback
      // when all 5 reels have stopped - this ensures proper timing
      // for tease-mode where reels stop sequentially with delays
      
    } catch (error) {
      console.error("Spin error:", error);
      toast.error("Der opstod en fejl. Prøv igen.");
      
      // Stop tease sound on error
      if (stopTeaseSound.current) {
        stopTeaseSound.current();
        stopTeaseSound.current = null;
      }
      
      // Reset state on error
      setIsSpinning(false);
      setTeaseReels([]);
      setActiveTeaseReelIndex(null);
      pendingResultRef.current = null;
      
      // Release spin lock on error
      spinLockRef.current = false;
      setIsSpinLocked(false);
      if (spinLockTimeoutRef.current) {
        clearTimeout(spinLockTimeoutRef.current);
        spinLockTimeoutRef.current = null;
      }
    }
  };

  // Check if bonus should end after spin completes - wait for win animation
  const handleBonusEnd = useCallback(() => {
    if (shouldEndBonus && !isSpinning && !isWinAnimating) {
      const { winnings, spins } = endBonus();
      setBonusTotalWinnings(winnings);
      setBonusTotalSpinsUsed(spins);
      slotSounds.playBonusWin(); // Play bonus complete sound
      setShowBonusComplete(true);
    }
  }, [shouldEndBonus, isSpinning, isWinAnimating, endBonus]);

  // Trigger bonus end check after spin and win animation complete
  useEffect(() => {
    if (shouldEndBonus && !isSpinning && !isWinAnimating && !showBonusComplete) {
      handleBonusEnd();
    }
  }, [shouldEndBonus, isSpinning, isWinAnimating, showBonusComplete, handleBonusEnd]);

  // Show pending bonus trigger after win animation completes
  useEffect(() => {
    if (pendingBonusTrigger && !isWinAnimating && !isSpinning) {
      // Short delay to let user see the win
      const timer = setTimeout(() => {
        if (pendingBonusTrigger.isRetrigger) {
          slotSounds.playRetrigger();
          setShowRetrigger(true);
        } else {
          slotSounds.playBonusTrigger();
          setShowBonusTrigger(true);
        }
        setPendingBonusTrigger(null);
      }, 500); // Short delay after win animation
      
      return () => clearTimeout(timer);
    }
  }, [pendingBonusTrigger, isWinAnimating, isSpinning]);

  // Autospin effect - trigger next spin after current one completes
  useEffect(() => {
    if (!isAutoSpinning || isSpinning || shouldStopAutoSpinRef.current) return;
    
    // Wait for win animation to complete before spinning again
    if (isWinAnimating) return;
    
    const isBonusSpin = bonusState.isActive && bonusState.freeSpinsRemaining > 0;
    const hasSpins = isBonusSpin || canSpin;
    
    if (!hasSpins) {
      stopAutoSpin();
      return;
    }

    // Don't auto-spin if bonus overlay is showing
    if (showBonusTrigger || showBonusComplete || showRetrigger) return;

    // Calculate delay based on whether there was a win
    // If there was a win, add extra time for the counter animation
    // Counter animation duration: Math.min(500 + amount * 10, 2000)
    const counterAnimationBuffer = winAmount > 0 ? 500 : 0; // Extra buffer after counter finishes
    const baseDelay = 800; // Reduced base delay since we now wait for animation
    
    // Schedule next spin with a delay
    autoSpinTimeoutRef.current = setTimeout(() => {
      if (!shouldStopAutoSpinRef.current) {
        handleSpin();
      }
    }, baseDelay + counterAnimationBuffer);

    return () => {
      if (autoSpinTimeoutRef.current) {
        clearTimeout(autoSpinTimeoutRef.current);
      }
    };
  }, [isAutoSpinning, isSpinning, isWinAnimating, winAmount, canSpin, bonusState.isActive, bonusState.freeSpinsRemaining, showBonusTrigger, showBonusComplete, showRetrigger]);

  // Auto-spin during bonus mode - spins automatically without user clicking
  useEffect(() => {
    // Only run during active bonus with remaining spins
    if (!bonusState.isActive || bonusState.freeSpinsRemaining === 0) return;
    
    // Don't trigger if already spinning or animating
    if (isSpinning || isWinAnimating) return;
    
    // Don't trigger if any overlay is showing OR scatter celebration is active
    if (showBonusTrigger || showBonusComplete || showRetrigger || showScatterCelebration) return;
    
    // Wait a moment before auto-spinning
    const timer = setTimeout(() => {
      handleSpin();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [bonusState.isActive, bonusState.freeSpinsRemaining, isSpinning, isWinAnimating, showBonusTrigger, showBonusComplete, showRetrigger, showScatterCelebration]);

  // Find winning positions for each reel
  const getWinningPositions = (reelIndex: number): number[] => {
    if (!lastResult || lastResult.wins.length === 0) return [];
    
    // If we have an expanding win, only show animation on expanded reels
    if (expandedReels.length > 0 && !expandedReels.includes(reelIndex)) {
      return []; // Don't highlight non-expanded reels
    }
    
    const positions: number[] = [];
    for (const win of lastResult.wins) {
      const linePattern = PAY_LINES[win.lineIndex];
      // Check if this position is part of the win (first N symbols where N = count)
      if (reelIndex < win.count) {
        positions.push(linePattern[reelIndex]);
      }
    }
    return [...new Set(positions)];
  };

  // Check if a position is expanded
  const isReelExpanded = (reelIndex: number): boolean => {
    return expandedReels.includes(reelIndex);
  };

  // Get responsive symbol dimensions for WinLines
  const getSymbolDimensions = () => {
    if (typeof window === "undefined") return { size: SYMBOL_SIZE.xl, gap: GAP.xl };
    const width = window.innerWidth;
    if (width < 400) return { size: SYMBOL_SIZE.xs, gap: GAP.xs };
    if (width < 640) return { size: SYMBOL_SIZE.mobile, gap: GAP.mobile };
    if (width < 768) return { size: SYMBOL_SIZE.sm, gap: GAP.sm };
    if (width < 1024) return { size: SYMBOL_SIZE.md, gap: GAP.md };
    if (width < 1280) return { size: SYMBOL_SIZE.lg, gap: GAP.lg };
    return { size: SYMBOL_SIZE.xl, gap: GAP.xl };
  };

  const symbolDimensions = getSymbolDimensions();

  if (symbolsLoading) {
    return (
      <Card className="border-amber-500/20">
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        </CardContent>
      </Card>
    );
  }

  if (!symbols || symbols.length === 0) {
    return (
      <Card className="border-amber-500/20">
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Gamepad2 className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Symboler indlæses...</p>
        </CardContent>
      </Card>
    );
  }

  const canSpinNow = bonusState.isActive ? bonusState.freeSpinsRemaining > 0 : hasEnoughSpins(bet);

  return (
    <div className="transition-all duration-300">
      {/* Bonus Overlays */}
      <BonusOverlay
        isVisible={showRetrigger}
        type="retrigger"
        retriggerSpins={retriggerSpinsAdded}
        totalFreeSpins={bonusState.freeSpinsRemaining}
        onClose={() => setShowRetrigger(false)}
      />
      <BonusOverlay
        isVisible={showBonusTrigger}
        type="trigger"
        expandingSymbol={pendingExpandingSymbol}
        allSymbols={symbols || []}
        onClose={() => setShowBonusTrigger(false)}
      />
      <BonusOverlay
        isVisible={showBonusComplete}
        type="complete"
        totalWinnings={bonusTotalWinnings}
        totalFreeSpins={bonusTotalSpinsUsed}
        onClose={() => {
          setShowBonusComplete(false);
          setBonusTotalWinnings(0);
          setBonusTotalSpinsUsed(0);
        }}
      />

      <div className="max-w-fit mx-auto">
        <div className="p-1 xs:p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
          {/* Slot machine reels with Egyptian frame */}
          <div className="flex justify-center relative">
            <SlotMachineFrame isBonus={bonusState.isActive} isSpinning={isSpinning}>
              <div className="relative p-1 xs:p-2 sm:p-4 md:p-6 rounded-xl">
              {/* Win Celebration Effects */}
                <WinCelebration
                  isActive={isWinAnimating}
                  winAmount={winAmount}
                  bet={bet}
                  onAnimationComplete={() => setIsWinAnimating(false)}
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
                      expandingSymbolId={bonusState.expandingSymbol?.id}
                      delay={colIndex}
                      shouldSlowDown={activeSlowdownReel >= colIndex}
                      spinLoopMs={slotSettings.spinLoopMs}
                      reelSlowdownMs={slotSettings.reelSlowdownMs}
                      onReelStop={async (reelIndex) => {
                        slotSounds.playReelStopSingle(reelIndex);
                        
                        // SEQUENTIAL: Trigger the next reel to slow down with configurable delay
                        if (reelIndex < 4) {
                          setTimeout(() => {
                            setActiveSlowdownReel(reelIndex + 1);
                          }, slotSettings.reelStaggerMs);
                        }
                        
                        // Check if this reel has a scatter and play progressive scatter land sound
                        const hasScatterOnReel = grid?.[reelIndex]?.some(symbolId => {
                          const symbol = symbols?.find(s => s.id === symbolId);
                          return symbol?.is_scatter;
                        });
                        
                        // Play scatter land sound with specific rules
                        if (hasScatterOnReel) {
                          // Count how many scatters have landed up to and including this reel
                          let scattersLanded = 0;
                          for (let r = 0; r <= reelIndex; r++) {
                            const reelHasScatter = grid?.[r]?.some(symbolId => {
                              const symbol = symbols?.find(s => s.id === symbolId);
                              return symbol?.is_scatter;
                            });
                            if (reelHasScatter) scattersLanded++;
                          }
                          
                          // Count scatters specifically on reels 1-3 (index 0-2)
                          let scattersOnReels123 = 0;
                          for (let r = 0; r <= Math.min(reelIndex, 2); r++) {
                            const reelHasScatter123 = grid?.[r]?.some(symbolId => {
                              const symbol = symbols?.find(s => s.id === symbolId);
                              return symbol?.is_scatter;
                            });
                            if (reelHasScatter123) scattersOnReels123++;
                          }
                          
                          // Play sound if:
                          // 1. Scatter is on reel 1-3 (index 0-2), OR
                          // 2. Scatter is on reel 4 AND there's already a scatter on reel 1-3, OR
                          // 3. Scatter is on reel 5 AND we already have 3+ scatters (triggers bonus sound)
                          const isOnReels123 = reelIndex <= 2;
                          const isOnReel4WithPriorScatter = reelIndex === 3 && scattersOnReels123 > 0;
                          const isOnReel5WithBonusScatters = reelIndex === 4 && scattersLanded >= 3;
                          
                          if (isOnReels123 || isOnReel4WithPriorScatter || isOnReel5WithBonusScatters) {
                            slotSounds.playScatterLand(scattersLanded);
                          }
                          
                          // Only track scatter reels for glow when tease mode is possible
                          // Tease requires 2nd scatter to land on reel 1-4 (not reel 5)
                          // Reel 5 scatters NEVER trigger glow
                          const canTriggerTease = isOnReels123 || isOnReel4WithPriorScatter;
                          
                          if (canTriggerTease) {
                            setScatterReelsLanded(prev => new Set([...prev, reelIndex]));
                          }
                        }
                        
                        // Track this reel as stopped
                        stoppedReelsRef.current.add(reelIndex);
                        
                        // Handle sequential tease reel activation
                        if (teaseReels.includes(reelIndex)) {
                          // Current tease reel stopped, activate next tease reel
                          const currentTeaseIndex = teaseReels.indexOf(reelIndex);
                          if (currentTeaseIndex < teaseReels.length - 1) {
                            setActiveTeaseReelIndex(teaseReels[currentTeaseIndex + 1]);
                          }
                        } else if (teaseReels.length > 0) {
                          // Non-tease reel stopped, check if next reel is tease
                          const nextReel = reelIndex + 1;
                          if (teaseReels.includes(nextReel)) {
                            setActiveTeaseReelIndex(nextReel);
                          }
                        }
                        
                        // Check if ALL 5 reels have stopped - only then process the result
                        if (stoppedReelsRef.current.size === 5 && pendingResultRef.current) {
                          // Stop tease sound when all reels have landed
                          if (stopTeaseSound.current) {
                            stopTeaseSound.current();
                            stopTeaseSound.current = null;
                          }
                          
                          const result = pendingResultRef.current;
                          const expandedGrid = pendingExpandedGridRef.current;
                          const reelsExpanded = pendingExpandedReelsRef.current;
                          const isBonusSpin = isBonusSpinRef.current;
                          
                          // Handle bonus expansion animation
                          if (isBonusSpin && reelsExpanded.length > 0 && expandedGrid) {
                            setShowExpansionDarken(true); // Enable darkening for non-expanded reels
                            await new Promise(resolve => setTimeout(resolve, 500));
                            setGrid(expandedGrid);
                            setExpandedReels(reelsExpanded);
                            setNewlyExpandedReels(reelsExpanded);
                            slotSounds.playSymbolExpand();
                            await new Promise(resolve => setTimeout(resolve, 600));
                            setNewlyExpandedReels([]);
                            setShowExpansionDarken(false); // Disable darkening after animation
                          }
                          
                          // Now show the result
                          setLastResult(result);
                          
                          // Record the spin result
                          if (user) {
                            supabase.from("slot_game_results").insert({
                              user_id: user.id,
                              bet_amount: bet,
                              win_amount: result.totalWin,
                              is_bonus_triggered: result.bonusTriggered && !isBonusSpin,
                              bonus_win_amount: isBonusSpin ? result.totalWin : 0,
                            }).then(() => {
                              // Invalidate leaderboard to show updated data
                              queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
                            });
                          }
                          
                          // Handle bonus trigger or retrigger
                          let shouldStopAuto = false;
                          if (result.bonusTriggered) {
                            shouldStopAuto = true;
                            
                            if (isBonusSpin) {
                              // Retrigger during bonus
                              const spinsToAdd = 10;
                              retriggerBonus(spinsToAdd);
                              setRetriggerSpinsAdded(spinsToAdd);
                              
                              if (result.totalWin > 0) {
                                // Defer overlay until win animation completes
                                setPendingBonusTrigger({ isRetrigger: true, spinsToAdd });
                              } else {
                                // No win, show immediately
                                slotSounds.playRetrigger();
                                setShowRetrigger(true);
                              }
                            } else {
                              // Initial bonus trigger
                              const expanding = triggerBonus(symbols || []);
                              setPendingExpandingSymbol(expanding);
                              
                              // Always show scatter celebration first, then bonus overlay
                              setShowScatterCelebration(true);
                              
                              // Delay bonus trigger to allow celebration animation
                              setTimeout(() => {
                                setShowScatterCelebration(false);
                                if (result.totalWin > 0) {
                                  // Defer overlay until win animation completes
                                  setPendingBonusTrigger({ isRetrigger: false, expandingSymbol: expanding });
                                } else {
                                  // No win, show immediately after celebration
                                  slotSounds.playBonusTrigger();
                                  setShowBonusTrigger(true);
                                }
                              }, 1500); // 1.5 second celebration
                            }
                          }
                          
                          // Handle autospin
                          if (isAutoSpinning) {
                            if (shouldStopAuto) {
                              stopAutoSpin();
                            } else {
                              decrementAutoSpins();
                            }
                          }
                          
                          // Handle winnings during bonus
                          if (isBonusSpin && result.totalWin > 0) {
                            addBonusWinnings(result.totalWin);
                          }
                          
                          // Play appropriate sound based on result
                          let hasWinAnimation = false;
                          // Play win sounds regardless of bonus trigger
                          if (result.totalWin >= bet * 50) {
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
                            // Only play no-win sound if no bonus triggered
                            slotSounds.playNoWin();
                          }
                          
                          // Show win lines if there are wins
                          if (result.wins.length > 0) {
                            setShowWinLines(true);
                            // Win lines stay visible until next spin starts (cleared in handleSpin)
                          }
                          
                          // Clear pending result
                          pendingResultRef.current = null;
                          
                          // End spinning state
                          setIsSpinning(false);
                          setTeaseReels([]);
                          setActiveTeaseReelIndex(null);
                          setActiveSlowdownReel(-1);
                          
                          // Release spin lock after 500ms delay (wait for win animation if present)
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
                      }}
                      teaseMode={teaseReels.includes(colIndex)}
                      isActiveTeaseReel={teaseReels.includes(colIndex) && activeTeaseReelIndex === colIndex}
                      scatterLandedOnPreviousReel={scatterReelsLanded.has(teaseInfo.lastScatterReel)}
                      extendedFakeLoop={teaseInfo.lateScatter && colIndex === 4}
                      globalTeaseActive={teaseReels.length > 0 && isSpinning && activeTeaseReelIndex !== null}
                      hasLandedScatter={scatterReelsLanded.has(colIndex) && scatterReelsLanded.size >= 2 && isSpinning}
                      isScatterCelebrating={showScatterCelebration}
                      isDarkenedForTease={scatterReelsLanded.size >= 2 && isSpinning}
                      isDarkenedForExpansion={showExpansionDarken && !expandedReels.includes(colIndex)}
                    />
                    {/* Separator line between reels */}
                    {colIndex < 4 && (
                      <div className="w-[1px] sm:w-[2px] bg-amber-950/70 self-stretch" />
                    )}
                    </React.Fragment>
                  ))}
                  
                  {/* Win Lines Overlay */}
                  {lastResult && lastResult.wins.length > 0 && (
                    <WinLines
                      wins={lastResult.wins}
                      symbolSize={symbolDimensions.size}
                      gap={symbolDimensions.gap}
                      isVisible={showWinLines && !isSpinning}
                    />
                  )}
                </div>
              </div>
            </SlotMachineFrame>
          </div>
          {/* Bonus Status Bar + Control Panel - responsive positioning */}
          <div className="mt-2 sm:-mt-12 md:-mt-16 lg:-mt-[200px]">
            {/* Bonus Status Bar - positioned just above controls */}
            <div className="max-w-fit mx-auto mb-1 sm:mb-2">
              <BonusStatusBar
                isActive={bonusState.isActive}
                freeSpinsRemaining={bonusState.freeSpinsRemaining}
                totalFreeSpins={bonusState.totalFreeSpins}
                expandingSymbol={bonusState.expandingSymbol}
                bonusWinnings={bonusState.bonusWinnings}
              />
            </div>
            <SlotControlPanel
              bet={bet}
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
              disabled={isSpinning || isSpinLocked}
              isSpinLocked={isSpinLocked}
              minBet={slotSettings.minBet}
              maxBet={slotSettings.maxBet}
              spinsRemaining={spinsRemaining}
              maxSpins={maxSpins}
              spinsLoading={false}
              showBonusTrigger={showBonusTrigger}
              winAmount={winAmount}
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
