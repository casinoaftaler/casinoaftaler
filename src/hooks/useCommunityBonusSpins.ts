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

      // Call secure edge function instead of direct DB writes
      const response = await supabase.functions.invoke("activate-community-spins", {
        body: { amount },
      });

      if (response.error) {
        throw new Error(response.error.message || "Activation failed");
      }

      const data = response.data;
      if (!data?.success) {
        throw new Error(data?.error || "Activation failed");
      }

      return amount;
    },
    onSuccess: (amount) => {
      queryClient.invalidateQueries({ queryKey: ["community-bonus-spins"] });
      queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
      toast.success(`${amount} bonus credits aktiveret!`);
    },
    onError: (error) => {
      toast.error("Kunne ikke aktivere credits: " + error.message);
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
