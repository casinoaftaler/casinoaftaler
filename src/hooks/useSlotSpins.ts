import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

  const { data: spinsData, isLoading } = useQuery({
    queryKey: ["slot-spins", user?.id, today],
    queryFn: async (): Promise<SlotSpins | null> => {
      if (!user?.id) return null;

      // Upsert today's record - ignoreDuplicates prevents overwriting existing data
      const totalDailySpins = Math.min(settings.dailySpins + bonusSpinsPermanent, MAX_SPINS_CAP);
      await supabase
        .from("slot_spins")
        .upsert(
          {
            user_id: user.id,
            date: today,
            spins_remaining: totalDailySpins,
          },
          {
            onConflict: "user_id,date",
            ignoreDuplicates: true,
          }
        );

      // Fetch the record (guaranteed to exist after upsert)
      const { data, error } = await supabase
        .from("slot_spins")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const decrementSpin = useMutation({
    mutationFn: async (count: number = 1) => {
      if (!user?.id || !spinsData) throw new Error("No user or spins data");
      if (spinsData.spins_remaining < count) throw new Error("Not enough spins remaining");

      const { data, error } = await supabase
        .from("slot_spins")
        .update({ spins_remaining: spinsData.spins_remaining - count })
        .eq("id", spinsData.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["slot-spins", user?.id, today], data);
    },
  });

  // Function to check if user has enough spins for a given bet
  const hasEnoughSpins = (betAmount: number): boolean => {
    return (spinsData?.spins_remaining ?? 0) >= betAmount;
  };

  // Calculate max spins (daily + permanent bonus, capped at MAX_SPINS_CAP)
  const maxSpins = Math.min(settings.dailySpins + bonusSpinsPermanent, MAX_SPINS_CAP);

  return {
    spinsRemaining: spinsData?.spins_remaining ?? 0,
    maxSpins,
    bonusSpinsPermanent,
    isLoading,
    decrementSpin,
    canSpin: (spinsData?.spins_remaining ?? 0) > 0,
    hasEnoughSpins,
  };
}
