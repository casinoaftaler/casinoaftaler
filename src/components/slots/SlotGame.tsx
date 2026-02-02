import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SlotReel } from "./SlotReel";
import { SpinsRemaining } from "./SpinsRemaining";
import { BetControls } from "./BetControls";
import { WinDisplay } from "./WinDisplay";
import { PayTable } from "./PayTable";
import { useSlotSymbols } from "@/hooks/useSlotSymbols";
import { useSlotSpins } from "@/hooks/useSlotSpins";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { generateGrid, calculateSpinResult, PAY_LINES, type SpinResult } from "@/lib/slotGameLogic";
import { Gamepad2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SlotGame() {
  const { user } = useAuth();
  const { data: symbols, isLoading: symbolsLoading } = useSlotSymbols();
  const { spinsRemaining, canSpin, decrementSpin } = useSlotSpins();
  
  const [bet, setBet] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [lastResult, setLastResult] = useState<SpinResult | null>(null);
  const [winAmount, setWinAmount] = useState(0);
  const [isWinAnimating, setIsWinAnimating] = useState(false);

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

  const handleSpin = async () => {
    if (!symbols || symbols.length === 0 || !user || !canSpin || isSpinning) return;

    setIsSpinning(true);
    setWinAmount(0);
    setLastResult(null);
    setIsWinAnimating(false);

    try {
      // Decrement spin count
      await decrementSpin.mutateAsync();

      // Simulate spinning animation with multiple grid changes
      const spinDuration = 2000;
      const spinInterval = 100;
      const spinCount = spinDuration / spinInterval;

      for (let i = 0; i < spinCount; i++) {
        await new Promise(resolve => setTimeout(resolve, spinInterval));
        setGrid(generateGrid(symbols));
      }

      // Generate final result
      const finalGrid = generateGrid(symbols);
      setGrid(finalGrid);

      const result = calculateSpinResult(finalGrid, symbols, bet);
      setLastResult(result);

      // Record the spin result
      await supabase.from("slot_game_results").insert({
        user_id: user.id,
        bet_amount: bet,
        win_amount: result.totalWin,
        is_bonus_triggered: result.bonusTriggered,
        bonus_win_amount: result.bonusTriggered ? result.totalWin : 0,
      });

      // Animate win if any
      if (result.totalWin > 0) {
        setIsWinAnimating(true);
        setWinAmount(result.totalWin);
        
        if (result.totalWin >= bet * 50) {
          toast.success(`🎉 STOR GEVINST! ${result.totalWin} point!`);
        } else {
          toast.success(`Gevinst: ${result.totalWin} point`);
        }

        setTimeout(() => setIsWinAnimating(false), 2000);
      }

      if (result.bonusTriggered) {
        toast.info("📖 BONUS! 3+ Books - Free spins kommer snart!", {
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Spin error:", error);
      toast.error("Der opstod en fejl. Prøv igen.");
    } finally {
      setIsSpinning(false);
    }
  };

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

  return (
    <Card className="border-amber-500/20 overflow-hidden">
      {/* Egyptian-themed header gradient */}
      <div className="h-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
      
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Spins remaining */}
        <div className="flex justify-center">
          <SpinsRemaining />
        </div>

        {/* Slot machine reels */}
        <div className="flex justify-center">
          <div
            className={cn(
              "relative p-4 sm:p-6 rounded-xl bg-gradient-to-b from-amber-950/80 to-background border-4 border-amber-600/50",
              isSpinning && "shadow-[0_0_30px_rgba(251,191,36,0.3)]"
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
                  delay={colIndex}
                />
              ))}
            </div>

            {/* Decorative frame elements */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-lg" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-lg" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-amber-400 rounded-bl-lg" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-amber-400 rounded-br-lg" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <BetControls bet={bet} onBetChange={setBet} disabled={isSpinning} />
          <WinDisplay amount={winAmount} isAnimating={isWinAnimating} />
        </div>

        {/* Spin button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className={cn(
              "px-12 py-6 text-xl font-bold transition-all",
              "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
              "shadow-[0_4px_20px_rgba(251,191,36,0.4)]",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            onClick={handleSpin}
            disabled={isSpinning || !canSpin}
          >
            {isSpinning ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                SPINNER...
              </>
            ) : !canSpin ? (
              "INGEN SPINS TILBAGE"
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
        {!canSpin && (
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">
              Du har brugt alle dine spins i dag. Kom tilbage i morgen for 100 nye!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
