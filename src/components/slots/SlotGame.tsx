import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SlotReel } from "./SlotReel";
import { SpinsRemaining } from "./SpinsRemaining";
import { BetControls } from "./BetControls";
import { WinDisplay } from "./WinDisplay";
import { PayTable } from "./PayTable";
import { BonusOverlay } from "./BonusOverlay";
import { BonusStatusBar } from "./BonusStatusBar";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { useBonusGame } from "@/hooks/useBonusGame";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { generateGrid, calculateSpinResult, PAY_LINES, type SpinResult } from "@/lib/slotGameLogic";
import { calculateBonusSpinResult } from "@/lib/bonusGameLogic";
import { slotSounds } from "@/lib/slotSoundEffects";
import { Gamepad2, Loader2, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SlotGame() {
  const { user } = useAuth();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols();
  const { spinsRemaining, maxSpins, canSpin, decrementSpin } = useSlotSpins();
  const { settings: slotSettings } = useSlotSettings();
  const { 
    bonusState, 
    triggerBonus, 
    decrementFreeSpin, 
    addBonusWinnings, 
    retriggerBonus, 
    endBonus,
    shouldEndBonus 
  } = useBonusGame();
  
  const [bet, setBet] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [lastResult, setLastResult] = useState<SpinResult | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [isWinAnimating, setIsWinAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [expandedReels, setExpandedReels] = useState<number[]>([]);
  
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

  const toggleSound = () => {
    const newEnabled = !soundEnabled;
    setSoundEnabled(newEnabled);
    slotSounds.setEnabled(newEnabled);
    if (newEnabled) {
      slotSounds.playButtonClick();
    }
  };

  const handleSpin = async () => {
    if (!symbols || symbols.length === 0 || !user || isSpinning) return;
    
    // Check if we can spin (either normal spin or bonus free spin)
    const isBonusSpin = bonusState.isActive && bonusState.freeSpinsRemaining > 0;
    if (!isBonusSpin && !canSpin) return;

    setIsSpinning(true);
    setWinAmount(0);
    setLastResult(null);
    setIsWinAnimating(false);
    setExpandedReels([]);

    // Play spin start sound and start continuous spin sound
    slotSounds.playSpinStart();
    stopSpinSound.current = slotSounds.playReelSpin();

    try {
      // Decrement spin count (only for non-bonus spins)
      if (!isBonusSpin) {
        await decrementSpin.mutateAsync();
      } else {
        decrementFreeSpin();
      }

      // Simulate spinning animation with multiple grid changes
      const spinDuration = 2000;
      const spinInterval = 100;
      const spinCount = spinDuration / spinInterval;

      for (let i = 0; i < spinCount; i++) {
        await new Promise(resolve => setTimeout(resolve, spinInterval));
        setGrid(generateGrid(symbols));
      }

      // Stop spin sound and play reel stop
      if (stopSpinSound.current) {
        stopSpinSound.current();
        stopSpinSound.current = null;
      }
      slotSounds.playReelStop();

      // Generate final result
      const originalGrid = generateGrid(symbols);
      let result: SpinResult;
      let finalGrid = originalGrid;
      let reelsExpanded: number[] = [];

      if (isBonusSpin && bonusState.expandingSymbol) {
        // Apply expanding symbol logic during bonus
        const bonusResult = calculateBonusSpinResult(
          originalGrid,
          symbols,
          bet,
          bonusState.expandingSymbol
        );
        result = bonusResult.result;
        finalGrid = bonusResult.expandedGrid;
        reelsExpanded = bonusResult.expandedReels;
        
        if (bonusResult.didExpand) {
          setExpandedReels(reelsExpanded);
        }
      } else {
        result = calculateSpinResult(originalGrid, symbols, bet);
        finalGrid = originalGrid;
      }

      setGrid(finalGrid);
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
      if (result.bonusTriggered) {
        slotSounds.playBonusTrigger();
        
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

  const canSpinNow = bonusState.isActive ? bonusState.freeSpinsRemaining > 0 : canSpin;

  return (
    <>
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

      <Card className={cn(
        "border-amber-500/20 overflow-hidden",
        bonusState.isActive && "border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
      )}>
        {/* Egyptian-themed header gradient */}
        <div className={cn(
          "h-2",
          bonusState.isActive
            ? "bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500"
            : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"
        )} />
        
        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Bonus Status Bar */}
          <BonusStatusBar
            isActive={bonusState.isActive}
            freeSpinsRemaining={bonusState.freeSpinsRemaining}
            totalFreeSpins={bonusState.totalFreeSpins}
            expandingSymbol={bonusState.expandingSymbol}
            bonusWinnings={bonusState.bonusWinnings}
          />

          {/* Header with spins and sound toggle */}
          {!bonusState.isActive && (
            <div className="flex items-center justify-between">
              <div className="flex-1" />
              <SpinsRemaining />
              <div className="flex-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSound}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {soundEnabled ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Sound toggle during bonus (compact) */}
          {bonusState.isActive && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSound}
                className="text-muted-foreground hover:text-foreground"
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>
          )}

          {/* Slot machine reels */}
          <div className="flex justify-center">
            <div
              className={cn(
                "relative p-4 sm:p-6 rounded-xl bg-gradient-to-b from-amber-950/80 to-background border-4",
                bonusState.isActive
                  ? "border-purple-500/50 shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                  : "border-amber-600/50",
                isSpinning && !bonusState.isActive && "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              )}
            >
              {/* Reel container */}
              <div className="flex gap-2 sm:gap-4">
                {grid?.map((column, colIndex) => (
                  <SlotReel
                    key={colIndex}
                    symbols={symbols}
                    displayedSymbolIds={column}
                    isSpinning={isSpinning}
                    winningPositions={getWinningPositions(colIndex)}
                    isExpanded={isReelExpanded(colIndex)}
                    delay={colIndex}
                  />
                ))}
              </div>

              {/* Decorative frame elements */}
              <div className={cn(
                "absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 rounded-tl-lg",
                bonusState.isActive ? "border-purple-400" : "border-amber-400"
              )} />
              <div className={cn(
                "absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 rounded-tr-lg",
                bonusState.isActive ? "border-purple-400" : "border-amber-400"
              )} />
              <div className={cn(
                "absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 rounded-bl-lg",
                bonusState.isActive ? "border-purple-400" : "border-amber-400"
              )} />
              <div className={cn(
                "absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 rounded-br-lg",
                bonusState.isActive ? "border-purple-400" : "border-amber-400"
              )} />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <BetControls bet={bet} onBetChange={setBet} disabled={isSpinning || bonusState.isActive} minBet={slotSettings.minBet} maxBet={slotSettings.maxBet} />
            <WinDisplay amount={bonusState.isActive ? bonusState.bonusWinnings : winAmount} isAnimating={isWinAnimating} />
          </div>

          {/* Spin button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className={cn(
                "px-12 py-6 text-xl font-bold transition-all",
                bonusState.isActive
                  ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-[0_4px_20px_rgba(168,85,247,0.4)]"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-[0_4px_20px_rgba(251,191,36,0.4)]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={handleSpin}
              disabled={isSpinning || !canSpinNow || showBonusTrigger}
            >
              {isSpinning ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  SPINNER...
                </>
              ) : !canSpinNow ? (
                "INGEN SPINS TILBAGE"
              ) : bonusState.isActive ? (
                <>
                  <Gamepad2 className="mr-2 h-6 w-6" />
                  FREE SPIN
                </>
              ) : (
                <>
                  <Gamepad2 className="mr-2 h-6 w-6" />
                  SPIN
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
        </CardContent>
      </Card>
    </>
  );
}
