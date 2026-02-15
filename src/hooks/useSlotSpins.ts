import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSlotSettings } from "@/hooks/useSlotSettings";
import { getTodayDanish } from "@/lib/danishDate";

interface SlotSpins {
  id: string;
  user_id: string;
  date: string;
  spins_remaining: number;
}

const MAX_SPINS_CAP = 220;
const ABSOLUTE_MAX_CREDITS = 1000;

export function useSlotSpins() {
  const { user } = useAuth();
  const { settings } = useSlotSettings();
  const queryClient = useQueryClient();
  const today = getTodayDanish();

  // Fetch permanent bonus spins from profile
  const { data: bonusSpinsData } = useQuery({
    queryKey: ["profile-bonus-spins", user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      
      const { data, error } = await supabase
        .from("profiles")
        .select("bonus_spins_permanent")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data?.bonus_spins_permanent || 0;
    },
    enabled: !!user?.id,
  });

  const bonusSpinsPermanent = bonusSpinsData || 0;

  // Read-only: fetch today's spin record
  // Spin initialization and deduction are handled server-side by the slot-spin edge function
  const { data: spinsData, isLoading } = useQuery({
    queryKey: ["slot-spins", user?.id, today],
    queryFn: async (): Promise<SlotSpins | null> => {
      if (!user?.id) return null;

      const { data: existing } = await supabase
        .from("slot_spins")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      // Return whatever exists - the slot-spin edge function handles initialization
      return existing || null;
    },
    enabled: !!user?.id,
  });

  // Function to check if user has enough spins for a given bet
  const hasEnoughSpins = (betAmount: number): boolean => {
    const available = spinsData ? spinsData.spins_remaining : maxSpins;
    return available >= betAmount;
  };

  // Calculate max spins (daily + permanent bonus, capped at MAX_SPINS_CAP)
  const maxSpins = Math.min(settings.dailySpins + bonusSpinsPermanent, MAX_SPINS_CAP);

  const spinsRemaining = spinsData ? spinsData.spins_remaining : maxSpins;

  return {
    spinsRemaining,
    maxSpins,
    bonusSpinsPermanent,
    isLoading,
    canSpin: spinsRemaining > 0,
    hasEnoughSpins,
  };
}
