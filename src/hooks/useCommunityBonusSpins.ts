import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface CommunityBonusSpins {
  id: string;
  user_id: string;
  total_earned: number;
  total_activated: number;
  rewarded_clips_count: number;
  created_at: string;
  updated_at: string;
}

export function useCommunityBonusSpins() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["community-bonus-spins", user?.id],
    queryFn: async (): Promise<CommunityBonusSpins | null> => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("community_bonus_spins")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const totalEarned = data?.total_earned ?? 0;
  const totalActivated = data?.total_activated ?? 0;
  const remaining = totalEarned - totalActivated;
  const rewardedClipsCount = data?.rewarded_clips_count ?? 0;

  const activateSpins = useMutation({
    mutationFn: async (amount: number) => {
      if (!user?.id) throw new Error("Ikke logget ind");
      if (amount <= 0 || amount > remaining) throw new Error("Ugyldigt antal");

      const today = new Date().toISOString().split("T")[0];

      // 1. Update community_bonus_spins
      const { error: updateError } = await supabase
        .from("community_bonus_spins")
        .update({ total_activated: totalActivated + amount })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      // 2. Add to today's slot_spins
      // First ensure today's record exists
      await supabase
        .from("slot_spins")
        .upsert(
          { user_id: user.id, date: today, spins_remaining: 200 },
          { onConflict: "user_id,date", ignoreDuplicates: true }
        );

      // Get current spins
      const { data: spinsData, error: spinsReadError } = await supabase
        .from("slot_spins")
        .select("spins_remaining")
        .eq("user_id", user.id)
        .eq("date", today)
        .single();

      if (spinsReadError) throw spinsReadError;

      const { error: spinsError } = await supabase
        .from("slot_spins")
        .update({ spins_remaining: spinsData.spins_remaining + amount })
        .eq("user_id", user.id)
        .eq("date", today);

      if (spinsError) throw spinsError;

      // 3. Insert log entry
      const { error: logError } = await supabase
        .from("community_bonus_spins_log")
        .insert({
          user_id: user.id,
          event_type: "activation",
          amount,
        });

      if (logError) throw logError;

      return amount;
    },
    onSuccess: (amount) => {
      queryClient.invalidateQueries({ queryKey: ["community-bonus-spins"] });
      queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
      toast.success(`${amount} bonus spins aktiveret!`);
    },
    onError: (error) => {
      toast.error("Kunne ikke aktivere spins: " + error.message);
    },
  });

  return {
    totalEarned,
    totalActivated,
    remaining,
    rewardedClipsCount,
    isLoading,
    activateSpins,
  };
}
