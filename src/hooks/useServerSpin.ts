import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

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
}

interface BonusState {
  isActive: boolean;
  freeSpinsRemaining: number;
  totalFreeSpins: number;
  expandingSymbolId: string;
  expandingSymbolName: string;
  bonusWinnings: number;
}

interface SpinResponse {
  success: boolean;
  result: SpinResult | BonusSpinResult;
  spinsRemaining?: number;
  maxSpins?: number;
  bonusState?: BonusState | null;
}

interface SpinRequest {
  bet: number;
  sessionId: string;
  isBonusSpin: boolean;
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

export function useServerSpin() {
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
      // Invalidate relevant queries to refresh state
      queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
      queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
      
      // Update spins cache immediately for responsive UI
      if (data.spinsRemaining !== undefined) {
        const today = new Date().toISOString().split("T")[0];
        queryClient.setQueryData(
          ["slot-spins", session?.user?.id, today],
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

  const spin = async (bet: number, isBonusSpin: boolean): Promise<SpinResponse | null> => {
    const sessionId = getSessionId();
    
    try {
      const result = await spinMutation.mutateAsync({
        bet,
        sessionId,
        isBonusSpin,
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
