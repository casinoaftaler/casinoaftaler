import { useState, useCallback, lazy, Suspense } from "react";
import { SEO } from "@/components/SEO";
import { CommunityNav } from "@/components/community/CommunityNav";
import { ContentSidebar } from "@/components/ContentSidebar";
import { SpinWheel } from "@/components/spin-the-reel/SpinWheel";
import { RewardModal } from "@/components/spin-the-reel/RewardModal";
import { HeroBackground } from "@/components/spin-the-reel/HeroBackground";
import { UserStatsBar } from "@/components/spin-the-reel/UserStatsBar";
import { RewardOverview } from "@/components/spin-the-reel/RewardOverview";
import { useSpinSounds } from "@/hooks/useSpinSounds";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LogIn, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const SpinHistory = lazy(() =>
  import("@/components/spin-the-reel/SpinHistory").then((m) => ({ default: m.SpinHistory }))
);
const TodayLeaderboard = lazy(() =>
  import("@/components/spin-the-reel/TodayLeaderboard").then((m) => ({ default: m.TodayLeaderboard }))
);

export default function SpinTheReel() {
  const { user, session, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const sounds = useSpinSounds();

  const [isSpinning, setIsSpinning] = useState(false);
  const [targetSegment, setTargetSegment] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [rewardData, setRewardData] = useState<{
    type: "points" | "spins" | "none";
    value: number;
    label: string;
  }>({ type: "none", value: 0, label: "" });

  const { data: profile } = useQuery({
    queryKey: ["spin-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("twitch_id, last_spin_at")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const cooldownEnd = profile?.last_spin_at
    ? new Date(new Date(profile.last_spin_at).getTime() + 12 * 60 * 60 * 1000).toISOString()
    : null;

  const isCooldownActive = cooldownEnd ? new Date(cooldownEnd).getTime() > Date.now() : false;
  const hasTwitchId = !!profile?.twitch_id;

  const [cooldownExpired, setCooldownExpired] = useState(false);

  const handleCooldownExpired = useCallback(() => {
    setCooldownExpired(true);
  }, []);

  const canSpin = !!user && hasTwitchId && (!isCooldownActive || cooldownExpired);

  const handleSpinStart = useCallback(async () => {
    if (!session?.access_token) return;
    setIsSpinning(true);

    try {
      const response = await supabase.functions.invoke("spin-the-reel", {});
      if (response.error) throw new Error(response.error.message || "Spin fejlede");
      const data = response.data;
      if (!data.success) throw new Error(data.error || "Spin fejlede");

      setRewardData({
        type: data.rewardType,
        value: data.rewardValue,
        label: data.rewardLabel,
      });
      setTargetSegment(data.segmentId);
    } catch (error: any) {
      console.error("Spin error:", error);
      toast.error(error.message || "Der opstod en fejl");
      setIsSpinning(false);
    }
  }, [session]);

  const handleSpinAnimStart = useCallback(() => {
    sounds.playSpinStart();
    sounds.startTicking();
  }, [sounds]);

  const handleSpinAnimEnd = useCallback(() => {
    sounds.stopTicking();
    sounds.playStop();
    setTimeout(() => {
      if (rewardData.type !== "none") {
        sounds.playWin();
      } else {
        sounds.playLose();
      }
    }, 300);
  }, [sounds, rewardData.type]);

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    setTargetSegment(null);
    setShowReward(true);
    setCooldownExpired(false);
    queryClient.invalidateQueries({ queryKey: ["spin-profile"] });
    queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
    queryClient.invalidateQueries({ queryKey: ["streamelements-points"] });
    queryClient.invalidateQueries({ queryKey: ["spin-history"] });
    queryClient.invalidateQueries({ queryKey: ["spin-leaderboard-today"] });
  }, [queryClient]);

  const getDisabledReason = () => {
    if (!user) return "Log ind for at spinne";
    if (!hasTwitchId) return "Tilknyt Twitch først";
    if (isCooldownActive && !cooldownExpired) return "Cooldown aktiv";
    return undefined;
  };

  const cooldownActive = isCooldownActive && !cooldownExpired;

  // Gate content for unauthenticated / no twitch
  const renderGate = () => {
    if (authLoading) {
      return (
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>
      );
    }
    if (!user) {
      return (
        <div className="py-20 space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
            <LogIn className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">Log ind for at spinne hjulet</p>
          <Link to="/login">
            <Button>Log ind</Button>
          </Link>
        </div>
      );
    }
    if (!hasTwitchId) {
      return (
        <div className="py-20 space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg text-muted-foreground">
            Du skal tilknytte dit Twitch ID for at spinne
          </p>
          <Link to="/profil">
            <Button>Gå til profil</Button>
          </Link>
        </div>
      );
    }
    return null;
  };

  const gate = renderGate();

  return (
    <>
      <SEO
        title="Spin the Reel"
        description="Spin hjulet og vind points eller spins! Tilgængelig hver 12. time for community-medlemmer."
        noindex
      />

      <CommunityNav />

      <main className="relative min-h-screen">
        <HeroBackground />

        <div className="relative z-10 container py-6 md:py-10">
          {gate ? (
            gate
          ) : (
            <>
              {/* Mobile: title on top */}
              <div className="text-center mb-6 lg:hidden">
                <h1 className="text-2xl font-bold text-foreground">🎡 Daglig Bonus Spin</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Spin hjulet hver 12. time og vind points eller credits!
                </p>
              </div>

              {/* 2-column layout */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                {/* LEFT: Info panel (desktop) */}
                <aside className="w-full lg:w-[440px] xl:w-[460px] lg:sticky lg:top-6 flex flex-col gap-4 order-2 lg:order-1">
                  {/* Title - desktop only */}
                  <div className="hidden lg:block space-y-1">
                    <h1 className="text-2xl font-bold text-foreground">🎡 Daglig Bonus Spin</h1>
                    <p className="text-sm text-muted-foreground">
                      Spin hjulet hver 12. time og vind points til StreamElements eller ekstra credits til Spillehallen!
                    </p>
                  </div>

                  {/* User Stats */}
                  <UserStatsBar
                    cooldownEnd={cooldownEnd}
                    isCooldownActive={cooldownActive}
                    onCooldownExpired={handleCooldownExpired}
                  />

                  {/* Rewards */}
                  <RewardOverview />

                  {/* History + Leaderboard */}
                  <Suspense fallback={null}>
                    <SpinHistory />
                  </Suspense>
                  <Suspense fallback={null}>
                    <TodayLeaderboard />
                  </Suspense>
                </aside>

                {/* RIGHT: Hero Wheel */}
                <div className="flex-1 flex flex-col items-center justify-start order-1 lg:order-2 lg:sticky lg:top-6">
                  <div className={`transition-opacity duration-500 ${cooldownActive ? "opacity-60" : "opacity-100"}`}>
                    <SpinWheel
                      onSpinComplete={handleSpinComplete}
                      targetSegmentId={targetSegment}
                      isSpinning={isSpinning}
                      onSpinStart={handleSpinStart}
                      disabled={!canSpin}
                      disabledReason={getDisabledReason()}
                      muted={sounds.muted}
                      onToggleMute={sounds.toggleMute}
                      onSpinAnimStart={handleSpinAnimStart}
                      onSpinAnimEnd={handleSpinAnimEnd}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <RewardModal
        open={showReward}
        onClose={() => setShowReward(false)}
        rewardType={rewardData.type}
        rewardValue={rewardData.value}
        rewardLabel={rewardData.label}
      />
    </>
  );
}
