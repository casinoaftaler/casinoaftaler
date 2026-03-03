import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { getTodayDanish } from "@/lib/danishDate";

interface LineWin {
  lineIndex: number;
  symbolId: string;
  count: number;
  payout: number;
}

interface SpinResult {
  grid: string[][];
  wins: LineWin[];
  totalWin: number;
  bonusTriggered: boolean;
  scatterCount: number;
}

interface BonusSpinResult extends SpinResult {
  expandedGrid: string[][];
  expandedReels: number[];
  isRetrigger: boolean;
  expandedReelSymbolIds?: Record<string, string>;
  expandingWinGroups?: Array<{ symbolId: string; reels: number[]; wins: LineWin[] }>;
}

interface BonusState {
  isActive: boolean;
  freeSpinsRemaining: number;
  totalFreeSpins: number;
  expandingSymbolId: string;
  expandingSymbolName: string;
  bonusWinnings: number;
  betAmount?: number;
}

interface SpinResponse {
  success: boolean;
  result: SpinResult | BonusSpinResult;
  spinsRemaining?: number;
  maxSpins?: number;
  bonusState?: BonusState & {
    expandingSymbolIds?: string[];
    expandingSymbolNames?: string[];
  } | null;
}

interface SpinRequest {
  bet: number;
  sessionId: string;
  isBonusSpin: boolean;
  gameId: string;
  clientSeed: string;
  nonce: number;
  debugScatters?: boolean;
}

// Get session ID from sessionStorage
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem("slot_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("slot_session_id", sessionId);
  }
  return sessionId;
};

export function useServerSpin(gameId: string = "book-of-fedesvin") {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const spinMutation = useMutation({
    mutationFn: async (request: SpinRequest): Promise<SpinResponse> => {
      if (!session?.access_token) {
        throw new Error("Not authenticated");
      }

      const response = await supabase.functions.invoke("slot-spin", {
        body: {
          bet: request.bet,
          sessionId: request.sessionId,
          isBonusSpin: request.isBonusSpin,
          gameId: request.gameId,
          clientSeed: request.clientSeed,
          nonce: request.nonce,
          ...(request.debugScatters ? { debugScatters: true } : {}),
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Spin request failed");
      }

      const data = response.data as SpinResponse;
      
      if (!data.success) {
        throw new Error((data as any).error || "Spin failed");
      }

      return data;
    },
    onSuccess: (data) => {
      // IMPORTANT: Do NOT invalidate leaderboard or spins queries here!
      // The server responds before the reels finish spinning, so invalidating
      // these queries would reveal the win result (via leaderboard totals or
      // spins count) before the player sees it. Invalidation is handled in
      // SlotGame.tsx after all reels have stopped and the result is displayed.
      
      // Only update spins cache immediately (spending spins is expected UX)
      if (data.spinsRemaining !== undefined) {
        const today = getTodayDanish();
        queryClient.setQueryData(
          ["slot-spins", session?.user?.id, today, gameId],
          (old: any) => old ? { ...old, spins_remaining: data.spinsRemaining } : old
        );
      }
    },
    onError: (error: Error) => {
      console.error("Server spin error:", error);
      
      // Handle specific errors
      if (error.message.includes("Session blocked")) {
        toast.error("Spillet er aktivt på en anden enhed");
      } else if (error.message.includes("Not enough spins")) {
        toast.error("Du har ikke nok spins tilbage");
      } else if (error.message.includes("No active bonus")) {
        toast.error("Ingen aktiv bonus");
      } else {
        toast.error("Der opstod en fejl. Prøv igen.");
      }
    },
  });

  const spin = async (bet: number, isBonusSpin: boolean, clientSeed?: string, nonce?: number, debugScatters?: boolean): Promise<SpinResponse | null> => {
    const sessionId = getSessionId();
    
    try {
      const result = await spinMutation.mutateAsync({
        bet,
        sessionId,
        isBonusSpin,
        gameId,
        clientSeed: clientSeed || crypto.randomUUID(),
        nonce: nonce || 0,
        debugScatters,
      });
      return result;
    } catch (error) {
      return null;
    }
  };

  return {
    spin,
    isSpinning: spinMutation.isPending,
    error: spinMutation.error,
  };
}

// Re-export types for use in components
export type { SpinResult, BonusSpinResult, BonusState, SpinResponse };
