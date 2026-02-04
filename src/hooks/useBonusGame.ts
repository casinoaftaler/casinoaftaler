import { useState, useCallback, useEffect, useRef } from "react";
import type { SlotSymbol } from "@/lib/slotGameLogic";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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

export function useBonusGame(symbols?: SlotSymbol[]) {
  const { user } = useAuth();
  const [bonusState, setBonusState] = useState<BonusGameState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const isUpdatingRef = useRef(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // Load bonus state from database on mount
  useEffect(() => {
    if (!user?.id) {
      setIsLoaded(true);
      return;
    }

    const loadBonusState = async () => {
      try {
        const { data, error } = await supabase
          .from("slot_bonus_state")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        if (data && data.is_active && data.free_spins_remaining > 0) {
          setBonusState({
            isActive: data.is_active,
            freeSpinsRemaining: data.free_spins_remaining,
            totalFreeSpins: data.total_free_spins,
            expandingSymbolId: data.expanding_symbol_id,
            expandingSymbolName: data.expanding_symbol_name,
            bonusWinnings: Number(data.bonus_winnings),
          });
        }
      } catch (error) {
        console.error("Failed to load bonus state from database:", error);
      }
      setIsLoaded(true);
    };

    loadBonusState();

    // Subscribe to realtime updates for bonus state sync across devices
    channelRef.current = supabase
      .channel(`bonus_state_${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "slot_bonus_state",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Don't process if we initiated the update
          if (isUpdatingRef.current) return;

          if (payload.eventType === "DELETE") {
            setBonusState(INITIAL_STATE);
          } else if (payload.new) {
            const newData = payload.new as any;
            setBonusState({
              isActive: newData.is_active,
              freeSpinsRemaining: newData.free_spins_remaining,
              totalFreeSpins: newData.total_free_spins,
              expandingSymbolId: newData.expanding_symbol_id,
              expandingSymbolName: newData.expanding_symbol_name,
              bonusWinnings: Number(newData.bonus_winnings),
            });
          }
        }
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [user?.id]);

  // Save bonus state to database whenever it changes
  const saveBonusState = useCallback(async (newState: BonusGameState) => {
    if (!user?.id) return;

    isUpdatingRef.current = true;

    try {
      if (newState.isActive) {
        await supabase
          .from("slot_bonus_state")
          .upsert({
            user_id: user.id,
            is_active: newState.isActive,
            free_spins_remaining: newState.freeSpinsRemaining,
            total_free_spins: newState.totalFreeSpins,
            expanding_symbol_id: newState.expandingSymbolId,
            expanding_symbol_name: newState.expandingSymbolName,
            bonus_winnings: newState.bonusWinnings,
          }, {
            onConflict: "user_id",
          });
      } else {
        // Delete when bonus ends
        await supabase
          .from("slot_bonus_state")
          .delete()
          .eq("user_id", user.id);
      }
    } catch (error) {
      console.error("Failed to save bonus state to database:", error);
    }

    // Small delay before allowing realtime updates again
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 100);
  }, [user?.id]);

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
    saveBonusState(newState);
    return expandingSymbol;
  }, [saveBonusState]);

  const decrementFreeSpin = useCallback(() => {
    setBonusState(prev => {
      const newState = {
        ...prev,
        freeSpinsRemaining: Math.max(0, prev.freeSpinsRemaining - 1),
      };
      saveBonusState(newState);
      return newState;
    });
  }, [saveBonusState]);

  const addBonusWinnings = useCallback((amount: number) => {
    setBonusState(prev => {
      const newState = {
        ...prev,
        bonusWinnings: prev.bonusWinnings + amount,
      };
      saveBonusState(newState);
      return newState;
    });
  }, [saveBonusState]);

  const retriggerBonus = useCallback((additionalSpins: number = 10) => {
    setBonusState(prev => {
      const newState = {
        ...prev,
        freeSpinsRemaining: prev.freeSpinsRemaining + additionalSpins,
        totalFreeSpins: prev.totalFreeSpins + additionalSpins,
      };
      saveBonusState(newState);
      return newState;
    });
  }, [saveBonusState]);

  const endBonus = useCallback(() => {
    const finalWinnings = bonusState.bonusWinnings;
    const totalSpins = bonusState.totalFreeSpins;
    setBonusState(INITIAL_STATE);
    saveBonusState(INITIAL_STATE);
    return { winnings: finalWinnings, spins: totalSpins };
  }, [bonusState.bonusWinnings, bonusState.totalFreeSpins, saveBonusState]);

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
