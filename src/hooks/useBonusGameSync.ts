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
  expandingSymbolIds: string[];
  expandingSymbolNames: string[];
  bonusWinnings: number;
}

interface BonusGameStateWithSymbol extends Omit<BonusGameState, 'expandingSymbolId' | 'expandingSymbolName' | 'expandingSymbolIds' | 'expandingSymbolNames'> {
  expandingSymbol: SlotSymbol | null;
  expandingSymbols: SlotSymbol[];
}

const INITIAL_STATE: BonusGameState = {
  isActive: false,
  freeSpinsRemaining: 0,
  totalFreeSpins: 10,
  expandingSymbolId: null,
  expandingSymbolName: null,
  expandingSymbolIds: [],
  expandingSymbolNames: [],
  bonusWinnings: 0,
};

export function useBonusGameSync(symbols?: SlotSymbol[], gameId: string = "book-of-fedesvin") {
  const { user } = useAuth();
  const [bonusState, setBonusState] = useState<BonusGameState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const suppressRealtimeRef = useRef(false);

  // Load bonus state from database on mount
  useEffect(() => {
    if (!user?.id) {
      setIsLoaded(true);
      return;
    }

    const loadBonusState = async () => {
      try {
        const query = supabase
          .from("slot_bonus_state")
          .select("*")
          .eq("user_id", user.id);
        
        // Filter by game_id (column added via migration)
        const { data, error } = await (query as any).eq("game_id", gameId).maybeSingle();

        if (error) throw error;

        if (data && data.is_active && data.free_spins_remaining > 0) {
          setBonusState({
            isActive: data.is_active,
            freeSpinsRemaining: data.free_spins_remaining,
            totalFreeSpins: data.total_free_spins,
            expandingSymbolId: data.expanding_symbol_id,
            expandingSymbolName: data.expanding_symbol_name,
            expandingSymbolIds: data.expanding_symbol_ids || [],
            expandingSymbolNames: data.expanding_symbol_names || [],
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
      .channel(`bonus_state_${user.id}_${gameId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "slot_bonus_state",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Skip realtime updates while bonus trigger/retrigger overlay is pending
          if (suppressRealtimeRef.current) return;
          
          if (payload.eventType === "DELETE") {
            const oldData = payload.old as any;
            if (!oldData?.game_id || oldData.game_id === gameId) {
              setBonusState(INITIAL_STATE);
            }
          } else if (payload.new) {
            const newData = payload.new as any;
            // Only update if it's for our game
            if (newData.game_id && newData.game_id !== gameId) return;
            setBonusState({
              isActive: newData.is_active,
              freeSpinsRemaining: newData.free_spins_remaining,
              totalFreeSpins: newData.total_free_spins,
              expandingSymbolId: newData.expanding_symbol_id,
              expandingSymbolName: newData.expanding_symbol_name,
              expandingSymbolIds: newData.expanding_symbol_ids || [],
              expandingSymbolNames: newData.expanding_symbol_names || [],
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
  }, [user?.id, gameId]);

  // Update local state from server response (called after successful spin)
  const updateFromServer = useCallback((serverBonusState: {
    isActive?: boolean;
    freeSpinsRemaining: number;
    totalFreeSpins: number;
    expandingSymbolId: string;
    expandingSymbolName: string;
    expandingSymbolIds?: string[];
    expandingSymbolNames?: string[];
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
      expandingSymbolIds: serverBonusState.expandingSymbolIds || [],
      expandingSymbolNames: serverBonusState.expandingSymbolNames || [],
      bonusWinnings: serverBonusState.bonusWinnings,
    });
  }, []);

  // End bonus - clears local state (server already handled in edge function)
  const endBonus = useCallback(async () => {
    const finalWinnings = bonusState.bonusWinnings;
    const totalSpins = bonusState.totalFreeSpins;
    
    // Delete bonus state on server for this game
    if (user?.id) {
      const query = supabase
        .from("slot_bonus_state")
        .delete()
        .eq("user_id", user.id);
      
      await (query as any).eq("game_id", gameId);
    }
    
    setBonusState(INITIAL_STATE);
    return { winnings: finalWinnings, spins: totalSpins };
  }, [bonusState.bonusWinnings, bonusState.totalFreeSpins, user?.id, gameId]);

  const shouldEndBonus = bonusState.isActive && bonusState.freeSpinsRemaining === 0;

  // Get the actual expanding symbol object from ID (single - backward compat)
  const getExpandingSymbol = useCallback((): SlotSymbol | null => {
    if (!bonusState.expandingSymbolId || !symbols) return null;
    return symbols.find(s => s.id === bonusState.expandingSymbolId) || null;
  }, [bonusState.expandingSymbolId, symbols]);

  // Get all expanding symbols (multi - Rise of Fedesvin)
  const getExpandingSymbols = useCallback((): SlotSymbol[] => {
    if (!symbols) return [];
    const ids = bonusState.expandingSymbolIds;
    if (!ids || ids.length === 0) {
      // Fallback to single symbol
      const single = getExpandingSymbol();
      return single ? [single] : [];
    }
    return ids
      .map(id => symbols.find(s => s.id === id))
      .filter(Boolean) as SlotSymbol[];
  }, [bonusState.expandingSymbolIds, symbols, getExpandingSymbol]);

  // Build the state object with the resolved symbols
  const expandingSymbol = getExpandingSymbol();
  const expandingSymbols = getExpandingSymbols();

  const bonusStateWithSymbol: BonusGameStateWithSymbol = {
    isActive: bonusState.isActive,
    freeSpinsRemaining: bonusState.freeSpinsRemaining,
    totalFreeSpins: bonusState.totalFreeSpins,
    expandingSymbol,
    expandingSymbols,
    bonusWinnings: bonusState.bonusWinnings,
  };

  // Suppress/resume realtime updates (used to prevent bars showing before overlay closes)
  const suppressRealtimeUpdates = useCallback(() => {
    suppressRealtimeRef.current = true;
  }, []);

  const resumeRealtimeUpdates = useCallback(() => {
    suppressRealtimeRef.current = false;
  }, []);

  return {
    bonusState: bonusStateWithSymbol,
    isLoaded,
    updateFromServer,
    endBonus,
    shouldEndBonus,
    suppressRealtimeUpdates,
    resumeRealtimeUpdates,
  };
}
