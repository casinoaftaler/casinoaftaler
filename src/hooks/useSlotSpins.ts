import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSlotSettings } from "@/hooks/useSlotSettings";

interface SlotSpins {
  id: string;
  user_id: string;
  date: string;
  spins_remaining: number;
}

export function useSlotSpins() {
  const { user } = useAuth();
  const { settings } = useSlotSettings();
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: spinsData, isLoading } = useQuery({
    queryKey: ["slot-spins", user?.id, today],
    queryFn: async (): Promise<SlotSpins | null> => {
      if (!user?.id) return null;

      // Try to get today's record
      const { data, error } = await supabase
        .from("slot_spins")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .maybeSingle();

      if (error) throw error;

      // If no record for today, create one with configured daily spins
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from("slot_spins")
          .insert({
            user_id: user.id,
            date: today,
            spins_remaining: settings.dailySpins,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        return newData;
      }

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

  return {
    spinsRemaining: spinsData?.spins_remaining ?? 0,
    maxSpins: settings.dailySpins,
    isLoading,
    decrementSpin,
    canSpin: (spinsData?.spins_remaining ?? 0) > 0,
    hasEnoughSpins,
  };
}
