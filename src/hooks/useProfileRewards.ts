import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "@/hooks/use-toast";
import { ProfileData } from "./useProfile";

export const SPINS_PER_SECTION = 50;

export interface SectionCompletionStatus {
  profile: boolean;
  stats: boolean;
  favorites: boolean;
  playstyle: boolean;
}

export interface ProfileRewardsData {
  profile_section_completed: boolean;
  stats_section_completed: boolean;
  favorites_section_completed: boolean;
  playstyle_section_completed: boolean;
  bonus_spins_permanent: number;
}

// Check if the Profile section is complete (bio filled)
export function isProfileSectionComplete(formData: { bio: string }): boolean {
  return formData.bio.trim().length > 0;
}

// Check if the Stats section is complete (at least highest win amount and game)
export function isStatsSectionComplete(formData: {
  highest_win_amount: string;
  highest_win_game: string;
  highest_win_casino: string;
}): boolean {
  return (
    formData.highest_win_amount.trim().length > 0 &&
    formData.highest_win_game.trim().length > 0 &&
    formData.highest_win_casino.trim().length > 0
  );
}

// Check if the Favorites section is complete
export function isFavoritesSectionComplete(formData: {
  favorite_slot: string;
  favorite_provider: string;
  favorite_casino: string;
  typical_bet_size: string;
}): boolean {
  return (
    formData.favorite_slot.trim().length > 0 &&
    formData.favorite_provider.trim().length > 0 &&
    formData.favorite_casino.trim().length > 0 &&
    formData.typical_bet_size.trim().length > 0
  );
}

// Check if the Play Style section is complete
export function isPlaystyleSectionComplete(formData: {
  play_styles: string[];
  preferred_game_type: string;
  volatility_preference: string;
}): boolean {
  return (
    formData.play_styles.length > 0 &&
    formData.preferred_game_type.trim().length > 0 &&
    formData.volatility_preference.trim().length > 0
  );
}

// Get all section completion statuses
export function getSectionCompletionStatus(formData: {
  bio: string;
  highest_win_amount: string;
  highest_win_game: string;
  highest_win_casino: string;
  favorite_slot: string;
  favorite_provider: string;
  favorite_casino: string;
  typical_bet_size: string;
  play_styles: string[];
  preferred_game_type: string;
  volatility_preference: string;
}): SectionCompletionStatus {
  return {
    profile: isProfileSectionComplete({ bio: formData.bio }),
    stats: isStatsSectionComplete({
      highest_win_amount: formData.highest_win_amount,
      highest_win_game: formData.highest_win_game,
      highest_win_casino: formData.highest_win_casino,
    }),
    favorites: isFavoritesSectionComplete({
      favorite_slot: formData.favorite_slot,
      favorite_provider: formData.favorite_provider,
      favorite_casino: formData.favorite_casino,
      typical_bet_size: formData.typical_bet_size,
    }),
    playstyle: isPlaystyleSectionComplete({
      play_styles: formData.play_styles,
      preferred_game_type: formData.preferred_game_type,
      volatility_preference: formData.volatility_preference,
    }),
  };
}

// Calculate total completed sections
export function getCompletedSectionsCount(status: SectionCompletionStatus): number {
  return Object.values(status).filter(Boolean).length;
}

// Calculate total bonus spins earned
export function calculateTotalBonusSpins(status: SectionCompletionStatus): number {
  return getCompletedSectionsCount(status) * SPINS_PER_SECTION;
}

export function useProfileRewards() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const claimReward = useMutation({
    mutationFn: async ({
      section,
    }: {
      section: "profile" | "stats" | "favorites" | "playstyle";
      currentBonusSpins: number;
    }) => {
      if (!user?.id) throw new Error("Not authenticated");

      // Call secure edge function instead of direct DB writes
      const response = await supabase.functions.invoke("claim-profile-reward", {
        body: { section },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to claim reward");
      }

      const data = response.data;
      if (!data?.success) {
        throw new Error(data?.error || "Failed to claim reward");
      }

      return { section, spinsEarned: data.spinsEarned };
    },
    onSuccess: ({ section, spinsEarned }) => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["slot-spins", user?.id] });
      
      const sectionNames: Record<string, string> = {
        profile: "Profil",
        stats: "Stats",
        favorites: "Favoritter",
        playstyle: "Spillestil",
      };

      toast({
        title: `+${spinsEarned} Spins Låst Op! 🎰`,
        description: `Du har udfyldt ${sectionNames[section]} sektionen og modtaget ${spinsEarned} ekstra spins!`,
      });
    },
    onError: (error) => {
      console.error("Error claiming reward:", error);
      toast({
        title: "Fejl",
        description: "Kunne ikke tildele belønning. Prøv igen.",
        variant: "destructive",
      });
    },
  });

  // Check and claim rewards for newly completed sections
  const checkAndClaimRewards = (
    formData: {
      bio: string;
      highest_win_amount: string;
      highest_win_game: string;
      highest_win_casino: string;
      favorite_slot: string;
      favorite_provider: string;
      favorite_casino: string;
      typical_bet_size: string;
      play_styles: string[];
      preferred_game_type: string;
      volatility_preference: string;
    },
    profile: ProfileData & ProfileRewardsData
  ) => {
    const currentStatus = getSectionCompletionStatus(formData);
    const rewards: Array<{ section: "profile" | "stats" | "favorites" | "playstyle"; currentBonusSpins: number }> = [];

    // Check each section for new completion
    if (currentStatus.profile && !profile.profile_section_completed) {
      rewards.push({ section: "profile", currentBonusSpins: profile.bonus_spins_permanent || 0 });
    }
    if (currentStatus.stats && !profile.stats_section_completed) {
      const prevSpins = profile.bonus_spins_permanent || 0;
      rewards.push({ section: "stats", currentBonusSpins: prevSpins + (rewards.length * SPINS_PER_SECTION) });
    }
    if (currentStatus.favorites && !profile.favorites_section_completed) {
      const prevSpins = profile.bonus_spins_permanent || 0;
      rewards.push({ section: "favorites", currentBonusSpins: prevSpins + (rewards.length * SPINS_PER_SECTION) });
    }
    if (currentStatus.playstyle && !profile.playstyle_section_completed) {
      const prevSpins = profile.bonus_spins_permanent || 0;
      rewards.push({ section: "playstyle", currentBonusSpins: prevSpins + (rewards.length * SPINS_PER_SECTION) });
    }

    return rewards;
  };

  return {
    claimReward: claimReward.mutateAsync,
    isClaiming: claimReward.isPending,
    checkAndClaimRewards,
  };
}
