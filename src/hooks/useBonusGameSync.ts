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

export function useBonusGameSync(symbols?: SlotSymbol[]) {
  const { user } = useAuth();
  const [bonusState, setBonusState] = useState<BonusGameState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
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

  // Update local state from server response (called after successful spin)
  const updateFromServer = useCallback((serverBonusState: {
    isActive?: boolean;
    freeSpinsRemaining: number;
    totalFreeSpins: number;
    expandingSymbolId: string;
    expandingSymbolName: string;
    bonusWinnings: number;
  } | null) => {
    if (!serverBonusState) {
      setBonusState(INITIAL_STATE);
      return;
    }
    
    setBonusState({
      isActive: serverBonusState.isActive ?? true,
      freeSpinsRemaining: serverBonusState.freeSpinsRemaining,
      totalFreeSpins: serverBonusState.totalFreeSpins,
      expandingSymbolId: serverBonusState.expandingSymbolId,
      expandingSymbolName: serverBonusState.expandingSymbolName,
      bonusWinnings: serverBonusState.bonusWinnings,
    });
  }, []);

  // End bonus - clears local state (server already handled in edge function)
  const endBonus = useCallback(async () => {
    const finalWinnings = bonusState.bonusWinnings;
    const totalSpins = bonusState.totalFreeSpins;
    
    // Delete bonus state on server
    if (user?.id) {
      await supabase
        .from("slot_bonus_state")
        .delete()
        .eq("user_id", user.id);
    }
    
    setBonusState(INITIAL_STATE);
    return { winnings: finalWinnings, spins: totalSpins };
  }, [bonusState.bonusWinnings, bonusState.totalFreeSpins, user?.id]);

  const shouldEndBonus = bonusState.isActive && bonusState.freeSpinsRemaining === 0;

  // Get the actual expanding symbol object from ID
  const getExpandingSymbol = useCallback((): SlotSymbol | null => {
    if (!bonusState.expandingSymbolId || !symbols) return null;
    return symbols.find(s => s.id === bonusState.expandingSymbolId) || null;
  }, [bonusState.expandingSymbolId, symbols]);

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
    updateFromServer,
    endBonus,
    shouldEndBonus,
  };
}
