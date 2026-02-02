import { useState, useCallback } from "react";
import type { SlotSymbol, SpinResult } from "@/lib/slotGameLogic";

export interface BonusGameState {
  isActive: boolean;
  freeSpinsRemaining: number;
  totalFreeSpins: number;
  expandingSymbol: SlotSymbol | null;
  bonusWinnings: number;
}

const INITIAL_STATE: BonusGameState = {
  isActive: false,
  freeSpinsRemaining: 0,
  totalFreeSpins: 10,
  expandingSymbol: null,
  bonusWinnings: 0,
};

export function useBonusGame() {
  const [bonusState, setBonusState] = useState<BonusGameState>(INITIAL_STATE);

  const triggerBonus = useCallback((symbols: SlotSymbol[]) => {
    // Select a random symbol to be the expanding symbol (excluding scatter)
    const eligibleSymbols = symbols.filter(s => !s.is_scatter);
    const randomIndex = Math.floor(Math.random() * eligibleSymbols.length);
    const expandingSymbol = eligibleSymbols[randomIndex];

    setBonusState({
      isActive: true,
      freeSpinsRemaining: 10,
      totalFreeSpins: 10,
      expandingSymbol,
      bonusWinnings: 0,
    });

    return expandingSymbol;
  }, []);

  const decrementFreeSpin = useCallback(() => {
    setBonusState(prev => ({
      ...prev,
      freeSpinsRemaining: Math.max(0, prev.freeSpinsRemaining - 1),
    }));
  }, []);

  const addBonusWinnings = useCallback((amount: number) => {
    setBonusState(prev => ({
      ...prev,
      bonusWinnings: prev.bonusWinnings + amount,
    }));
  }, []);

  const retriggerBonus = useCallback((additionalSpins: number = 10) => {
    setBonusState(prev => ({
      ...prev,
      freeSpinsRemaining: prev.freeSpinsRemaining + additionalSpins,
      totalFreeSpins: prev.totalFreeSpins + additionalSpins,
    }));
  }, []);

  const endBonus = useCallback(() => {
    const finalWinnings = bonusState.bonusWinnings;
    setBonusState(INITIAL_STATE);
    return finalWinnings;
  }, [bonusState.bonusWinnings]);

  const shouldEndBonus = bonusState.isActive && bonusState.freeSpinsRemaining === 0;

  return {
    bonusState,
    triggerBonus,
    decrementFreeSpin,
    addBonusWinnings,
    retriggerBonus,
    endBonus,
    shouldEndBonus,
  };
}
