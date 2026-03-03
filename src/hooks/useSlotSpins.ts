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
  game_id: string;
}

const MAX_SPINS_CAP = 220;
const SUBSCRIBER_MAX_SPINS_CAP = 320;
const SUBSCRIBER_BONUS = 100;
const ABSOLUTE_MAX_CREDITS = 2000;

export function useSlotSpins(gameId: string = "book-of-fedesvin") {
  const { user } = useAuth();
  const { settings } = useSlotSettings();
  const queryClient = useQueryClient();
  const today = getTodayDanish();

  // Fetch permanent bonus spins and twitch badges from profile
  const { data: profileData } = useQuery({
    queryKey: ["profile-bonus-and-badges", user?.id],
    queryFn: async () => {
      if (!user?.id) return { bonus: 0, isSubscriber: false };
      
      const { data, error } = await supabase
        .from("profiles")
        .select("bonus_spins_permanent, twitch_badges")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      const badges = data?.twitch_badges as any;
      return {
        bonus: data?.bonus_spins_permanent || 0,
        isSubscriber: !!badges?.is_subscriber,
      };
    },
    enabled: !!user?.id,
  });

  const bonusSpinsPermanent = profileData?.bonus || 0;
  const isSubscriber = profileData?.isSubscriber || false;

  // Read-only: fetch today's spin record from shared pool
  const { data: spinsData, isLoading } = useQuery({
    queryKey: ["slot-spins", user?.id, today, "shared"],
    queryFn: async (): Promise<SlotSpins | null> => {
      if (!user?.id) return null;

      const { data: existing } = await supabase
        .from("slot_spins")
        .select("*")
        .eq("user_id", user.id)
        .eq("date", today)
        .eq("game_id", "shared")
        .maybeSingle();

      return existing || null;
    },
    enabled: !!user?.id,
  });

  // Function to check if user has enough spins for a given bet
  const hasEnoughSpins = (betAmount: number): boolean => {
    const available = spinsData ? spinsData.spins_remaining : maxSpins;
    return available >= betAmount;
  };

  // Calculate max spins (daily + subscriber bonus + permanent bonus, capped dynamically)
  const subBonus = isSubscriber ? SUBSCRIBER_BONUS : 0;
  const capLimit = isSubscriber ? SUBSCRIBER_MAX_SPINS_CAP : MAX_SPINS_CAP;
  const maxSpins = Math.min(settings.dailySpins + subBonus + bonusSpinsPermanent, capLimit);

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
