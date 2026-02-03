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
import { generateGrid, calculateSpinResult, PAY_LINES, getScatterTeaseReels, type SpinResult } from "@/lib/slotGameLogic";
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
  const [teaseReels, setTeaseReels] = useState<number[]>([]);
  const [activeTeaseReelIndex, setActiveTeaseReelIndex] = useState<number | null>(null);
  
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
  const [pendingExpandingSymbol, setPendingExpandingSymbol] = useState<typeof bonusState.expandingSymbol>(null);
  const [bonusTotalWinnings, setBonusTotalWinnings] = useState(0);
  
  const stopSpinSound = useRef<(() => void) | null>(null);
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
      // Stop all slot sounds and music when leaving the page
      slotSounds.stopMusic();
      if (stopSpinSound.current) {
        stopSpinSound.current();
      }
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

    // Calculate which reels should tease (slow down) based on scatter positions
    const teaseReelIndices = getScatterTeaseReels(originalGrid, symbols);
    setTeaseReels(teaseReelIndices);
    setActiveTeaseReelIndex(null); // Reset active tease reel for new spin

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
    
    // Start tease sound if we have tease reels
    if (teaseReelIndices.length > 0) {
      stopTeaseSound.current = slotSounds.playTeaseStart();
    }

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
      
      // Stop sounds on error
      if (stopSpinSound.current) {
        stopSpinSound.current();
        stopSpinSound.current = null;
      }
      if (stopTeaseSound.current) {
        stopTeaseSound.current();
        stopTeaseSound.current = null;
      }
      
      // Reset state on error
      setIsSpinning(false);
      setTeaseReels([]);
      setActiveTeaseReelIndex(null);
      pendingResultRef.current = null;
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
    
    // Wait for win animation to complete before spinning again
    if (isWinAnimating) return;
    
    const isBonusSpin = bonusState.isActive && bonusState.freeSpinsRemaining > 0;
    const hasSpins = isBonusSpin || canSpin;
    
    if (!hasSpins) {
      stopAutoSpin();
      return;
    }

    // Don't auto-spin if bonus overlay is showing
    if (showBonusTrigger || showBonusComplete) return;

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
  }, [isAutoSpinning, isSpinning, isWinAnimating, winAmount, canSpin, bonusState.isActive, bonusState.freeSpinsRemaining, showBonusTrigger, showBonusComplete]);

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
                      onReelStop={async (reelIndex) => {
                        slotSounds.playReelStopSingle(reelIndex);
                        
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
                          // Stop spin and tease sounds
                          if (stopSpinSound.current) {
                            stopSpinSound.current();
                            stopSpinSound.current = null;
                          }
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
                            await new Promise(resolve => setTimeout(resolve, 500));
                            setGrid(expandedGrid);
                            setExpandedReels(reelsExpanded);
                            setNewlyExpandedReels(reelsExpanded);
                            slotSounds.playSymbolExpand();
                            await new Promise(resolve => setTimeout(resolve, 600));
                            setNewlyExpandedReels([]);
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
                            });
                          }
                          
                          // Handle bonus trigger or retrigger
                          let shouldStopAuto = false;
                          if (result.bonusTriggered) {
                            slotSounds.playBonusTrigger();
                            shouldStopAuto = true;
                            
                            if (isBonusSpin) {
                              retriggerBonus(10);
                              toast.info("📖 RETRIGGER! +10 Free Spins!", { duration: 3000 });
                            } else {
                              const expanding = triggerBonus(symbols || []);
                              setPendingExpandingSymbol(expanding);
                              setShowBonusTrigger(true);
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
                            const displayDuration = isAutoSpinning ? 2000 : 3500;
                            winLinesTimeoutRef.current = setTimeout(() => {
                              setShowWinLines(false);
                            }, displayDuration);
                          }
                          
                          // Clear pending result
                          pendingResultRef.current = null;
                          
                          // End spinning state
                          setIsSpinning(false);
                          setTeaseReels([]);
                          setActiveTeaseReelIndex(null);
                        }
                      }}
                      teaseMode={teaseReels.includes(colIndex)}
                      isActiveTeaseReel={teaseReels.includes(colIndex) && activeTeaseReelIndex === colIndex}
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

          {/* Controls row without spin button */}
          <div className="flex flex-wrap items-center justify-center gap-1 xs:gap-2 sm:gap-3 mt-1 sm:mt-2">
            {/* Bet Controls */}
            <BetControls bet={bet} onBetChange={setBet} disabled={isSpinning || bonusState.isActive} minBet={slotSettings.minBet} maxBet={slotSettings.maxBet} />
            
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

          {/* Large round spin button - centered on mobile, right-aligned on desktop */}
          <div className="flex justify-center md:justify-end my-3 sm:my-4 md:pr-8 lg:pr-16">
            <Button
              className={cn(
                // Round shape
                "rounded-full aspect-square",
                // Responsive sizing - MUCH larger on desktop
                "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44",
                // Golden gradient with 3D effect
                bonusState.isActive
                  ? "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-700"
                  : "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700",
                // Golden border - thicker on desktop
                bonusState.isActive
                  ? "border-2 md:border-4 border-purple-400/60"
                  : "border-2 md:border-4 border-amber-400/60",
                // Deep glow shadow - larger on desktop
                bonusState.isActive
                  ? "shadow-[0_0_30px_rgba(168,85,247,0.5),0_4px_20px_rgba(0,0,0,0.3)] md:shadow-[0_0_50px_rgba(168,85,247,0.6),0_8px_30px_rgba(0,0,0,0.4)]"
                  : "shadow-[0_0_30px_rgba(251,191,36,0.5),0_4px_20px_rgba(0,0,0,0.3)] md:shadow-[0_0_50px_rgba(251,191,36,0.6),0_8px_30px_rgba(0,0,0,0.4)]",
                // Hover effects
                !isSpinning && canSpinNow && !isAutoSpinning && (
                  bonusState.isActive
                    ? "hover:shadow-[0_0_60px_rgba(168,85,247,0.8),0_10px_40px_rgba(0,0,0,0.5)]"
                    : "hover:shadow-[0_0_60px_rgba(251,191,36,0.8),0_10px_40px_rgba(0,0,0,0.5)]"
                ),
                "hover:scale-105 transition-all duration-200",
                // Active/press effect
                "active:scale-95 active:shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]",
                // Spinning animation
                isSpinning && "animate-pulse",
                // Disabled state
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
                // Text styling
                "text-white font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl flex flex-col items-center justify-center"
              )}
              onClick={handleSpin}
              disabled={isSpinning || !canSpinNow || showBonusTrigger || isAutoSpinning}
            >
              {isSpinning ? (
                <div className="relative">
                  {/* Outer rotating ring */}
                  <div className="absolute inset-0 rounded-full border-4 md:border-6 border-transparent border-t-white/80 border-r-white/40 animate-spin" 
                       style={{ animationDuration: '0.8s' }} />
                  {/* Inner spinning icon */}
                  <Gamepad2 
                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 animate-spin drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" 
                    style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
                  />
                </div>
              ) : !canSpinNow ? (
                <span className="text-xs sm:text-sm md:text-base lg:text-lg text-center leading-tight">INGEN<br/>SPINS</span>
              ) : bonusState.isActive ? (
                <>
                  <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 mb-1 transition-transform group-hover:rotate-12" />
                  <span className="text-xs sm:text-sm md:text-base lg:text-xl">FREE</span>
                </>
              ) : (
                <>
                  <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 xl:h-16 xl:w-16 mb-1 transition-transform hover:rotate-12" />
                  <span className="text-sm sm:text-base md:text-lg lg:text-2xl">SPIN</span>
                </>
              )}
            </Button>
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
