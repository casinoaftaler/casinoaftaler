import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile, ProfileUpdateData } from "@/hooks/useProfile";
import { useProfileRewards, getSectionCompletionStatus } from "@/hooks/useProfileRewards";
import { useStreamElementsPoints } from "@/hooks/useStreamElementsPoints";
import { useTwitchBadges } from "@/hooks/useTwitchBadges";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileBasicSection } from "@/components/profile/ProfileBasicSection";
import { ProfileStatsSection } from "@/components/profile/ProfileStatsSection";
import { ProfileFavoritesSection } from "@/components/profile/ProfileFavoritesSection";
import { ProfilePlayStyleSection } from "@/components/profile/ProfilePlayStyleSection";
import { ProfilePrivacySection } from "@/components/profile/ProfilePrivacySection";
import { ProfileRewardsProgress } from "@/components/profile/ProfileRewardsProgress";
import { ProfileCommunityBonusSection } from "@/components/profile/ProfileCommunityBonusSection";
import { ProfileSlotRequestStats } from "@/components/profile/ProfileSlotRequestStats";
import { TwitchBadges } from "@/components/TwitchBadges";
import { Loader2, Save, User, Trophy, Heart, Zap, Shield, Coins } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { profile, isLoading: profileLoading, updateProfile, isUpdating } = useProfile();
  const { claimReward, checkAndClaimRewards } = useProfileRewards();
  const { points: storePoints, isLoading: pointsLoading, hasTwitchUsername } = useStreamElementsPoints();
  const { data: badgesData, isLoading: badgesLoading } = useTwitchBadges(user?.id);
  
  const [formData, setFormData] = useState({
    display_name: "",
    bio: "",
    highest_win_amount: "",
    highest_win_game: "",
    highest_win_casino: "",
    biggest_spin_win: "",
    biggest_x_win: "",
    favorite_slot: "",
    favorite_provider: "",
    favorite_casino: "",
    typical_bet_size: "",
    play_styles: [] as string[],
    preferred_game_type: "both",
    volatility_preference: "medium",
    stats_public: false,
    hide_amounts: false,
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [authLoading, user, navigate]);

  // Populate form with profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        display_name: profile.display_name || "",
        bio: profile.bio || "",
        highest_win_amount: profile.highest_win_amount?.toString() || "",
        highest_win_game: profile.highest_win_game || "",
        highest_win_casino: profile.highest_win_casino || "",
        biggest_spin_win: profile.biggest_spin_win?.toString() || "",
        biggest_x_win: profile.biggest_x_win?.toString() || "",
        favorite_slot: profile.favorite_slot || "",
        favorite_provider: profile.favorite_provider || "",
        favorite_casino: profile.favorite_casino || "",
        typical_bet_size: profile.typical_bet_size || "",
        play_styles: profile.play_styles || [],
        preferred_game_type: profile.preferred_game_type || "both",
        volatility_preference: profile.volatility_preference || "medium",
        stats_public: profile.stats_public || false,
        hide_amounts: profile.hide_amounts || false,
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile || isSaving) return;
    setIsSaving(true);

    try {
      const updates: ProfileUpdateData = {
        display_name: formData.display_name || null,
        bio: formData.bio || null,
        highest_win_amount: formData.highest_win_amount ? parseFloat(formData.highest_win_amount) : null,
        highest_win_game: formData.highest_win_game || null,
        highest_win_casino: formData.highest_win_casino || null,
        biggest_spin_win: formData.biggest_spin_win ? parseFloat(formData.biggest_spin_win) : null,
        biggest_x_win: formData.biggest_x_win ? parseFloat(formData.biggest_x_win) : null,
        favorite_slot: formData.favorite_slot || null,
        favorite_provider: formData.favorite_provider || null,
        favorite_casino: formData.favorite_casino || null,
        typical_bet_size: formData.typical_bet_size || null,
        play_styles: formData.play_styles.length > 0 ? formData.play_styles : null,
        preferred_game_type: formData.preferred_game_type || null,
        volatility_preference: formData.volatility_preference || null,
        stats_public: formData.stats_public,
        hide_amounts: formData.hide_amounts,
      };

      // First update the profile and wait for it
      updateProfile(updates);

      // Then check for new rewards to claim
      const profileWithRewards = {
        ...profile,
        profile_section_completed: profile.profile_section_completed ?? false,
        stats_section_completed: profile.stats_section_completed ?? false,
        favorites_section_completed: profile.favorites_section_completed ?? false,
        playstyle_section_completed: profile.playstyle_section_completed ?? false,
        bonus_spins_permanent: profile.bonus_spins_permanent ?? 0,
      };

      const rewards = checkAndClaimRewards(formData, profileWithRewards);
      
      // Claim rewards sequentially to ensure correct bonus spin accumulation
      for (const reward of rewards) {
        await claimReward(reward);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Get current section completion status
  const currentStatus = getSectionCompletionStatus(formData);
  
  // Get rewarded sections from profile
  const rewardedSections = {
    profile: profile?.profile_section_completed ?? false,
    stats: profile?.stats_section_completed ?? false,
    favorites: profile?.favorites_section_completed ?? false,
    playstyle: profile?.playstyle_section_completed ?? false,
  };

  if (authLoading || profileLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container py-8 text-center">
        <p className="text-muted-foreground">Kunne ikke indlæse profil</p>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 sm:py-8">
      <SEO title="Min Profil" description="Administrer din profil, præferencer og spillestatistik på Casinoaftaler." noindex />
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Min Profil</h1>
        <p className="text-muted-foreground mt-1">
          Administrer din gambling-persona og præferencer
        </p>
      </div>

      {/* Twitch Badges & Points Row */}
      {hasTwitchUsername && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg border border-border/50 bg-muted/30 px-4 py-3">
          {/* Twitch Badges */}
          <TwitchBadges 
            userId={user?.id} 
            badges={badgesData?.badges}
            isLoading={badgesLoading}
            size="md"
          />
          
          {/* Divider - only show if badges exist */}
          {badgesData?.badges && (
            <div className="h-6 w-px bg-border/50" />
          )}
          
          {/* Points */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-1.5">
              <Coins className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Butik Points:</span>
            {pointsLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <span className="font-semibold">
                {storePoints?.toLocaleString("da-DK") ?? 0}
              </span>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-auto">
            <TabsTrigger value="profile" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favoritter</span>
            </TabsTrigger>
            <TabsTrigger value="playstyle" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Spillestil</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex flex-col sm:flex-row gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privatliv</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileBasicSection
              profile={profile}
              formData={{ display_name: formData.display_name, bio: formData.bio }}
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="stats">
            <ProfileStatsSection
              formData={{
                highest_win_amount: formData.highest_win_amount,
                highest_win_game: formData.highest_win_game,
                highest_win_casino: formData.highest_win_casino,
                biggest_spin_win: formData.biggest_spin_win,
                biggest_x_win: formData.biggest_x_win,
              }}
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="favorites">
            <ProfileFavoritesSection
              formData={{
                favorite_slot: formData.favorite_slot,
                favorite_provider: formData.favorite_provider,
                favorite_casino: formData.favorite_casino,
                typical_bet_size: formData.typical_bet_size,
              }}
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="playstyle">
            <ProfilePlayStyleSection
              formData={{
                play_styles: formData.play_styles,
                preferred_game_type: formData.preferred_game_type,
                volatility_preference: formData.volatility_preference,
              }}
              onChange={handleChange}
            />
          </TabsContent>

          <TabsContent value="privacy">
            <ProfilePrivacySection
              formData={{
                stats_public: formData.stats_public,
                hide_amounts: formData.hide_amounts,
              }}
              onChange={handleChange}
            />
          </TabsContent>
        </Tabs>

        {/* Rewards Progress - moved below basic info tabs */}
        <ProfileRewardsProgress
          currentStatus={currentStatus}
          rewardedSections={rewardedSections}
          bonusSpinsPermanent={profile.bonus_spins_permanent ?? 0}
          className="mt-6"
        />

        <ProfileCommunityBonusSection className="mt-6" />
        <ProfileSlotRequestStats className="mt-6" />

        {/* Save Button - Fixed at bottom on mobile */}
        <div className="mt-6 flex justify-end sticky bottom-4 sm:static">
          <Button 
            type="submit" 
            disabled={isUpdating || isSaving}
            size="lg"
            className="w-full sm:w-auto shadow-lg sm:shadow-none"
          >
            {isUpdating || isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gemmer...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Gem ændringer
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
