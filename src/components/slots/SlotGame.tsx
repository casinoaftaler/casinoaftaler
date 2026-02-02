import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlotReel } from "./SlotReel";
import { BetControls } from "./BetControls";
import { WinDisplay } from "./WinDisplay";
import { WinLines } from "./WinLines";
import { PayTable } from "./PayTable";
import { BonusOverlay } from "./BonusOverlay";
import { BonusStatusBar } from "./BonusStatusBar";
import { VolumeControl } from "./VolumeControl";
import { SlotMachineFrame } from "./SlotMachineFrame";
import { WinCelebration } from "./WinCelebration";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useBonusGame } from "@/hooks/useBonusGame";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { generateGrid, calculateSpinResult, PAY_LINES, type SpinResult } from "@/lib/slotGameLogic";
import { calculateBonusSpinResult } from "@/lib/bonusGameLogic";
import { slotSounds } from "@/lib/slotSoundEffects";
import { Gamepad2, Loader2, Play, Square, ChevronDown, Infinity } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Symbol dimensions for responsive design - INCREASED FOR DESKTOP
const SYMBOL_SIZE = { xs: 64, mobile: 76, sm: 96, md: 120, lg: 160, xl: 180 };
const GAP = { xs: 4, mobile: 6, sm: 8, md: 12, lg: 16, xl: 20 };

type AutoSpinCount = 10 | 25 | 50 | 100 | "infinite";

export function SlotGame() {
  const { user } = useAuth();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols();
  const { spinsRemaining, maxSpins, canSpin, decrementSpin, hasEnoughSpins } = useSlotSpins();
  const { settings: slotSettings } = useSlotSettings();
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
  
  const winLinesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Autospin state
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [autoSpinCount, setAutoSpinCount] = useState<AutoSpinCount>(10);
  const [autoSpinsRemaining, setAutoSpinsRemaining] = useState<number | null>(null);
  const autoSpinTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shouldStopAutoSpinRef = useRef(false);
  
  // Bonus overlay states
  const [showBonusTrigger, setShowBonusTrigger] = useState(false);
  const [showBonusComplete, setShowBonusComplete] = useState(false);
  const [pendingExpandingSymbol, setPendingExpandingSymbol] = useState<typeof bonusState.expandingSymbol>(null);
  const [bonusTotalWinnings, setBonusTotalWinnings] = useState(0);
  
  const stopSpinSound = useRef<(() => void) | null>(null);

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
      // Stop all slot sounds and music when leaving the page
      slotSounds.stopMusic();
      if (stopSpinSound.current) {
        stopSpinSound.current();
      }
    };
  }, []);

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
    if (!symbols || symbols.length === 0 || !user || isSpinning) return;
    
    // Check if we can spin (either normal spin or bonus free spin)
    const isBonusSpin = bonusState.isActive && bonusState.freeSpinsRemaining > 0;
    // For normal spins, check if we have enough spins for the current bet
    if (!isBonusSpin && !hasEnoughSpins(bet)) return;

    // Generate final result BEFORE starting the animation
    // This ensures SlotReel knows what symbols to land on
    const originalGrid = generateGrid(symbols);
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

    // Set the ORIGINAL grid for spinning (not the expanded one yet)
    // This creates the first phase where symbols land naturally
    setGrid(originalGrid);
    setLastResult(null); // Clear last result during spin
    setWinAmount(0);
    setIsWinAnimating(false);
    setExpandedReels([]);
    setNewlyExpandedReels([]);
    setShowWinLines(false);
    
    // Now start the spin animation
    setIsSpinning(true);
    
    // Clear any existing win lines timeout
    if (winLinesTimeoutRef.current) {
      clearTimeout(winLinesTimeoutRef.current);
      winLinesTimeoutRef.current = null;
    }

    // Play spin start sound and start continuous spin sound
    slotSounds.playSpinStart();
    stopSpinSound.current = slotSounds.playReelSpin();

    try {
      // Decrement spin count (only for non-bonus spins)
      // Bet amount determines how many spins are used
      if (!isBonusSpin) {
        await decrementSpin.mutateAsync(bet);
      } else {
        decrementFreeSpin();
      }

      // Wait for reel animation to complete
      // The SlotReel component handles the visual animation internally
      const spinDuration = 2500; // Base duration + stagger for 5 reels (1000 + 4*350 = 2400ms, add buffer)
      await new Promise(resolve => setTimeout(resolve, spinDuration));

      // Stop spin sound (individual reel stop sounds are handled by SlotReel callbacks)
      if (stopSpinSound.current) {
        stopSpinSound.current();
        stopSpinSound.current = null;
      }

      // Phase 1: Show original grid with symbols landed (already set above)
      // Wait a moment to let player see the original symbols
      if (isBonusSpin && reelsExpanded.length > 0) {
        // Brief pause to show original symbols before expansion
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Phase 2: Animate expansion
        // First update the grid to the expanded version
        setGrid(expandedGrid);
        
        // Then trigger the expansion animation state
        setExpandedReels(reelsExpanded);
        setNewlyExpandedReels(reelsExpanded);
        
        // Play expansion sound
        slotSounds.playSymbolExpand();
        
        // Wait for expansion animation to complete
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Clear the "newly expanded" state after animation completes
        setNewlyExpandedReels([]);
      }

      // Now set the result to show wins
      setLastResult(result);

      // Record the spin result
      await supabase.from("slot_game_results").insert({
        user_id: user.id,
        bet_amount: bet,
        win_amount: result.totalWin,
        is_bonus_triggered: result.bonusTriggered && !isBonusSpin,
        bonus_win_amount: isBonusSpin ? result.totalWin : 0,
      });

      // Small delay before win sounds
      await new Promise(resolve => setTimeout(resolve, 300));

      // Handle bonus trigger or retrigger
      let shouldStopAuto = false;
      if (result.bonusTriggered) {
        slotSounds.playBonusTrigger();
        shouldStopAuto = true; // Stop autospin on bonus
        
        if (isBonusSpin) {
          // Retrigger during bonus
          retriggerBonus(10);
          toast.info("📖 RETRIGGER! +10 Free Spins!", { duration: 3000 });
        } else {
          // New bonus trigger
          const expanding = triggerBonus(symbols);
          setPendingExpandingSymbol(expanding);
          setShowBonusTrigger(true);
        }
      }

      // Stop autospin on big wins
      if (result.totalWin >= bet * 50) {
        shouldStopAuto = true;
      }

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
      if (!result.bonusTriggered) {
        if (result.totalWin >= bet * 50) {
          slotSounds.playBigWin();
          setIsWinAnimating(true);
          setWinAmount(result.totalWin);
          if (!isBonusSpin) {
            toast.success(`🎉 STOR GEVINST! ${result.totalWin} point!`);
          }
          setTimeout(() => setIsWinAnimating(false), 2000);
        } else if (result.totalWin >= bet * 10) {
          slotSounds.playMediumWin();
          setIsWinAnimating(true);
          setWinAmount(result.totalWin);
          if (!isBonusSpin) {
            toast.success(`Gevinst: ${result.totalWin} point`);
          }
          setTimeout(() => setIsWinAnimating(false), 2000);
        } else if (result.totalWin > 0) {
          slotSounds.playSmallWin();
          setIsWinAnimating(true);
          setWinAmount(result.totalWin);
          if (!isBonusSpin) {
            toast.success(`Gevinst: ${result.totalWin} point`);
          }
          setTimeout(() => setIsWinAnimating(false), 2000);
        } else {
          slotSounds.playNoWin();
        }
      }
      
      // Show win lines if there are wins
      if (result.wins.length > 0) {
        setShowWinLines(true);
        // Hide win lines after a delay (shorter during autospin)
        const displayDuration = isAutoSpinning ? 2000 : 3500;
        winLinesTimeoutRef.current = setTimeout(() => {
          setShowWinLines(false);
        }, displayDuration);
      }
    } catch (error) {
      console.error("Spin error:", error);
      toast.error("Der opstod en fejl. Prøv igen.");
      
      // Stop sounds on error
      if (stopSpinSound.current) {
        stopSpinSound.current();
        stopSpinSound.current = null;
      }
    } finally {
      setIsSpinning(false);
    }
  };

  // Check if bonus should end after spin completes
  const handleBonusEnd = useCallback(() => {
    if (shouldEndBonus && !isSpinning) {
      const totalWin = endBonus();
      setBonusTotalWinnings(totalWin);
      setShowBonusComplete(true);
    }
  }, [shouldEndBonus, isSpinning, endBonus]);

  // Trigger bonus end check after spin
  if (shouldEndBonus && !isSpinning && !showBonusComplete) {
    handleBonusEnd();
  }

  // Autospin effect - trigger next spin after current one completes
  useEffect(() => {
    if (!isAutoSpinning || isSpinning || shouldStopAutoSpinRef.current) return;
    
    const isBonusSpin = bonusState.isActive && bonusState.freeSpinsRemaining > 0;
    const hasSpins = isBonusSpin || canSpin;
    
    if (!hasSpins) {
      stopAutoSpin();
      return;
    }

    // Don't auto-spin if bonus overlay is showing
    if (showBonusTrigger || showBonusComplete) return;

    // Schedule next spin with a delay
    autoSpinTimeoutRef.current = setTimeout(() => {
      if (!shouldStopAutoSpinRef.current) {
        handleSpin();
      }
    }, 1500); // 1.5 second delay between spins

    return () => {
      if (autoSpinTimeoutRef.current) {
        clearTimeout(autoSpinTimeoutRef.current);
      }
    };
  }, [isAutoSpinning, isSpinning, canSpin, bonusState.isActive, bonusState.freeSpinsRemaining, showBonusTrigger, showBonusComplete]);

  // Find winning positions for each reel
  const getWinningPositions = (reelIndex: number): number[] => {
    if (!lastResult || lastResult.wins.length === 0) return [];
    
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
        isVisible={showBonusTrigger}
        type="trigger"
        expandingSymbol={pendingExpandingSymbol}
        onClose={() => setShowBonusTrigger(false)}
      />
      <BonusOverlay
        isVisible={showBonusComplete}
        type="complete"
        totalWinnings={bonusTotalWinnings}
        onClose={() => {
          setShowBonusComplete(false);
          setBonusTotalWinnings(0);
        }}
      />

      <div 
        className={cn(
          "overflow-hidden",
          bonusState.isActive && "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
        )}
      >
        <div className="p-1 xs:p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2">
          {/* Bonus Status Bar */}
          <BonusStatusBar
            isActive={bonusState.isActive}
            freeSpinsRemaining={bonusState.freeSpinsRemaining}
            totalFreeSpins={bonusState.totalFreeSpins}
            expandingSymbol={bonusState.expandingSymbol}
            bonusWinnings={bonusState.bonusWinnings}
          />

          {/* Slot machine reels with Egyptian frame - volume control moved inline */}
          <div className="flex justify-center relative">
            <SlotMachineFrame isBonus={bonusState.isActive} isSpinning={isSpinning}>
              <div className="relative p-1 xs:p-2 sm:p-4 md:p-6 rounded-xl">
                {/* Win Celebration Effects */}
                <WinCelebration
                  isActive={isWinAnimating}
                  winAmount={winAmount}
                  bet={bet}
                />
                
                {/* Reel container */}
                <div className="relative flex gap-0.5 xs:gap-1 sm:gap-1.5 md:gap-2">
                  {grid?.map((column, colIndex) => (
                    <SlotReel
                      key={colIndex}
                      symbols={symbols}
                      displayedSymbolIds={column}
                      isSpinning={isSpinning}
                      winningPositions={getWinningPositions(colIndex)}
                      isExpanded={isReelExpanded(colIndex)}
                      isNewlyExpanded={newlyExpandedReels.includes(colIndex)}
                      expandingSymbolId={bonusState.expandingSymbol?.id}
                      delay={colIndex}
                      onReelStop={(reelIndex) => slotSounds.playReelStopSingle(reelIndex)}
                    />
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

          {/* All controls on one line */}
          <div className="flex flex-wrap items-center justify-center gap-1 xs:gap-2 sm:gap-3 mt-1 sm:mt-2">
            {/* Bet Controls */}
            <BetControls bet={bet} onBetChange={setBet} disabled={isSpinning || bonusState.isActive} minBet={slotSettings.minBet} maxBet={slotSettings.maxBet} />
            
            {/* Main Spin button */}
            <Button
              size="lg"
              className={cn(
                "px-4 sm:px-8 py-3 sm:py-5 text-base sm:text-lg font-bold transition-all",
                bonusState.isActive
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-[0_4px_20px_rgba(168,85,247,0.4)]"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-[0_4px_20px_rgba(251,191,36,0.4)]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={handleSpin}
              disabled={isSpinning || !canSpinNow || showBonusTrigger || isAutoSpinning}
            >
              {isSpinning ? (
                <>
                  <Loader2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span className="hidden xs:inline">SPINNER...</span>
                  <span className="xs:hidden">...</span>
                </>
              ) : !canSpinNow ? (
                <span className="text-xs sm:text-sm">INGEN SPINS</span>
              ) : bonusState.isActive ? (
                <>
                  <Gamepad2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden xs:inline">FREE SPIN</span>
                  <span className="xs:hidden">FREE</span>
                </>
              ) : (
                <>
                  <Gamepad2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  SPIN
                </>
              )}
            </Button>

            {/* Autospin controls */}
            <div className="flex items-center gap-1">
              {/* Autospin count selector */}
              {!isAutoSpinning && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="px-2 sm:px-3 py-3 sm:py-5 text-sm sm:text-base font-bold border-amber-500/50 hover:bg-amber-500/10 text-amber-500"
                      disabled={!canSpinNow || showBonusTrigger}
                    >
                      {autoSpinCount === "infinite" ? (
                        <Infinity className="h-4 w-4" />
                      ) : (
                        autoSpinCount
                      )}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border-amber-500/30">
                    {([10, 25, 50, 100, "infinite"] as AutoSpinCount[]).map((count) => (
                      <DropdownMenuItem
                        key={count}
                        onClick={() => setAutoSpinCount(count)}
                        className={cn(
                          "text-lg cursor-pointer",
                          autoSpinCount === count && "bg-amber-500/20"
                        )}
                      >
                        {count === "infinite" ? (
                          <span className="flex items-center gap-2">
                            <Infinity className="h-4 w-4" /> Uendelig
                          </span>
                        ) : (
                          `${count} spins`
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Autospin button */}
              <Button
                size="lg"
                variant={isAutoSpinning ? "destructive" : "outline"}
                className={cn(
                  "px-3 sm:px-4 py-3 sm:py-5 text-sm sm:text-base font-bold transition-all",
                  isAutoSpinning 
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "border-amber-500/50 hover:bg-amber-500/10 text-amber-500"
                )}
                onClick={toggleAutoSpin}
                disabled={!canSpinNow || showBonusTrigger}
              >
                {isAutoSpinning ? (
                  <>
                    <Square className="mr-1 h-4 w-4" />
                    <span className="hidden xs:inline">{autoSpinsRemaining !== null ? `STOP (${autoSpinsRemaining})` : "STOP"}</span>
                    <span className="xs:hidden">{autoSpinsRemaining !== null ? autoSpinsRemaining : "■"}</span>
                  </>
                ) : (
                  <>
                    <Play className="mr-1 h-4 w-4" />
                    AUTO
                  </>
                )}
              </Button>
            </div>
            
            {/* Win Display */}
            <WinDisplay amount={bonusState.isActive ? bonusState.bonusWinnings : winAmount} isAnimating={isWinAnimating} />
            
            {/* Volume Control */}
            <VolumeControl />
          </div>

          {/* Pay table button */}
          <div className="flex justify-center">
            <PayTable />
          </div>

          {/* No spins message */}
          {!canSpinNow && !bonusState.isActive && (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
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
