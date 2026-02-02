import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface SlotSpins {
  id: string;
  user_id: string;
  date: string;
  spins_remaining: number;
}

export function useSlotSpins() {
  const { user } = useAuth();
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

      // If no record for today, create one
      if (!data) {
        const { data: newData, error: insertError } = await supabase
          .from("slot_spins")
          .insert({
            user_id: user.id,
            date: today,
            spins_remaining: 100,
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
    mutationFn: async () => {
      if (!user?.id || !spinsData) throw new Error("No user or spins data");
      if (spinsData.spins_remaining <= 0) throw new Error("No spins remaining");

      const { data, error } = await supabase
        .from("slot_spins")
        .update({ spins_remaining: spinsData.spins_remaining - 1 })
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

  return {
    spinsRemaining: spinsData?.spins_remaining ?? 0,
    isLoading,
    decrementSpin,
    canSpin: (spinsData?.spins_remaining ?? 0) > 0,
  };
}
