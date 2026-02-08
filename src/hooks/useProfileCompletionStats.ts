import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ProfileCompletionStats {
  totalUsers: number;
  completedProfiles: number;
  incompleteProfiles: number;
  completionRate: number;
}

export interface UserProfileStatus {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  profile_completed: boolean;
  stats_completed: boolean;
  favorites_completed: boolean;
  playstyle_completed: boolean;
  sections_completed: number;
  is_fully_completed: boolean;
  created_at: string;
}

export function useProfileCompletionStats() {
  return useQuery({
    queryKey: ["admin-profile-completion-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "user_id, display_name, avatar_url, profile_section_completed, stats_section_completed, favorites_section_completed, playstyle_section_completed, created_at"
        );

      if (error) throw error;

      const users: UserProfileStatus[] = (data || []).map((profile) => {
        const profileCompleted = profile.profile_section_completed ?? false;
        const statsCompleted = profile.stats_section_completed ?? false;
        const favoritesCompleted = profile.favorites_section_completed ?? false;
        const playstyleCompleted = profile.playstyle_section_completed ?? false;

        const sectionsCompleted = [
          profileCompleted,
          statsCompleted,
          favoritesCompleted,
          playstyleCompleted,
        ].filter(Boolean).length;

        return {
          user_id: profile.user_id,
          display_name: profile.display_name,
          avatar_url: profile.avatar_url,
          profile_completed: profileCompleted,
          stats_completed: statsCompleted,
          favorites_completed: favoritesCompleted,
          playstyle_completed: playstyleCompleted,
          sections_completed: sectionsCompleted,
          is_fully_completed: sectionsCompleted === 4,
          created_at: profile.created_at,
        };
      });

      const totalUsers = users.length;
      const completedProfiles = users.filter((u) => u.is_fully_completed).length;
      const incompleteProfiles = totalUsers - completedProfiles;
      const completionRate = totalUsers > 0 ? (completedProfiles / totalUsers) * 100 : 0;

      const stats: ProfileCompletionStats = {
        totalUsers,
        completedProfiles,
        incompleteProfiles,
        completionRate,
      };

      return { stats, users };
    },
  });
}
