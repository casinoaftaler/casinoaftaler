import { useState, useCallback, useEffect } from "react";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { useAuth } from "@/hooks/useAuth";

export interface BonusGameState {
  isActive: boolean;
  freeSpinsRemaining: number;
  totalFreeSpins: number;
  expandingSymbolId: string | null;
  expandingSymbolName: string | null;
  bonusWinnings: number;
}

interface BonusGameStateWithSymbol extends Omit<BonusGameState, 'expandingSymbolId' | 'expandingSymbolName'> {
  expandingSymbol: SlotSymbol | null;
}

const INITIAL_STATE: BonusGameState = {
  isActive: false,
  freeSpinsRemaining: 0,
  totalFreeSpins: 10,
  expandingSymbolId: null,
  expandingSymbolName: null,
  bonusWinnings: 0,
};

const STORAGE_KEY = "slot_bonus_state";

export function useBonusGame(symbols?: SlotSymbol[]) {
  const { user } = useAuth();
  const [bonusState, setBonusState] = useState<BonusGameState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bonus state from localStorage on mount
  useEffect(() => {
    if (!user?.id) {
      setIsLoaded(true);
      return;
    }

    const storageKey = `${STORAGE_KEY}_${user.id}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as BonusGameState;
        // Only restore if bonus is still active
        if (parsed.isActive && parsed.freeSpinsRemaining > 0) {
          setBonusState(parsed);
        } else {
          // Clear stale data
          localStorage.removeItem(storageKey);
        }
      }
    } catch (error) {
      console.error("Failed to load bonus state:", error);
    }
    setIsLoaded(true);
  }, [user?.id]);

  // Save bonus state to localStorage whenever it changes
  useEffect(() => {
    if (!user?.id || !isLoaded) return;

    const storageKey = `${STORAGE_KEY}_${user.id}`;
    if (bonusState.isActive) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(bonusState));
      } catch (error) {
        console.error("Failed to save bonus state:", error);
      }
    } else {
      // Clear when bonus ends
      localStorage.removeItem(storageKey);
    }
  }, [bonusState, user?.id, isLoaded]);

  // Get the actual expanding symbol object from ID
  const getExpandingSymbol = useCallback((): SlotSymbol | null => {
    if (!bonusState.expandingSymbolId || !symbols) return null;
    return symbols.find(s => s.id === bonusState.expandingSymbolId) || null;
  }, [bonusState.expandingSymbolId, symbols]);

  const triggerBonus = useCallback((availableSymbols: SlotSymbol[]) => {
    // Select a random symbol to be the expanding symbol (excluding scatter)
    const eligibleSymbols = availableSymbols.filter(s => !s.is_scatter);
    const randomIndex = Math.floor(Math.random() * eligibleSymbols.length);
    const expandingSymbol = eligibleSymbols[randomIndex];

    const newState: BonusGameState = {
      isActive: true,
      freeSpinsRemaining: 10,
      totalFreeSpins: 10,
      expandingSymbolId: expandingSymbol.id,
      expandingSymbolName: expandingSymbol.name,
      bonusWinnings: 0,
    };
    
    setBonusState(newState);
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

  // Build the state object with the resolved symbol
  const expandingSymbol = getExpandingSymbol();
  const bonusStateWithSymbol: BonusGameStateWithSymbol = {
    isActive: bonusState.isActive,
    freeSpinsRemaining: bonusState.freeSpinsRemaining,
    totalFreeSpins: bonusState.totalFreeSpins,
    expandingSymbol,
    bonusWinnings: bonusState.bonusWinnings,
  };

  return {
    bonusState: bonusStateWithSymbol,
    isLoaded,
    triggerBonus,
    decrementFreeSpin,
    addBonusWinnings,
    retriggerBonus,
    endBonus,
    shouldEndBonus,
  };
}
