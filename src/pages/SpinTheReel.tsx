import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { CommunityNav } from "@/components/community/CommunityNav";
import { SpinWheel } from "@/components/spin-the-reel/SpinWheel";
import { RewardModal } from "@/components/spin-the-reel/RewardModal";
import { CooldownTimer } from "@/components/spin-the-reel/CooldownTimer";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LogIn, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function SpinTheReel() {
  const { user, session, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();

  const [isSpinning, setIsSpinning] = useState(false);
  const [targetSegment, setTargetSegment] = useState<number | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [rewardData, setRewardData] = useState<{
    type: "points" | "spins" | "none";
    value: number;
    label: string;
  }>({ type: "none", value: 0, label: "" });

  // Fetch user profile to check twitch_id and last_spin_at
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

  // Calculate cooldown end from last_spin_at
  const cooldownEnd = profile?.last_spin_at
    ? new Date(new Date(profile.last_spin_at).getTime() + 12 * 60 * 60 * 1000).toISOString()
    : null;

  const isCooldownActive = cooldownEnd ? new Date(cooldownEnd).getTime() > Date.now() : false;
  const hasTwitchId = !!profile?.twitch_id;

  const [cooldownExpired, setCooldownExpired] = useState(false);

  const handleCooldownExpired = useCallback(() => {
    setCooldownExpired(true);
  }, []);

  const canSpin = !!user && hasTwitchId && !isCooldownActive || cooldownExpired;

  const handleSpinStart = useCallback(async () => {
    if (!session?.access_token) return;
    setIsSpinning(true);

    try {
      const response = await supabase.functions.invoke("spin-the-reel", {});

      if (response.error) {
        throw new Error(response.error.message || "Spin fejlede");
      }

      const data = response.data;

      if (!data.success) {
        throw new Error(data.error || "Spin fejlede");
      }

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

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    setTargetSegment(null);
    setShowReward(true);
    setCooldownExpired(false);

    // Invalidate queries to refresh data
    queryClient.invalidateQueries({ queryKey: ["spin-profile"] });
    queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
    queryClient.invalidateQueries({ queryKey: ["streamelements-points"] });
  }, [queryClient]);

  const getDisabledReason = () => {
    if (!user) return "Log ind for at spinne";
    if (!hasTwitchId) return "Tilknyt Twitch først";
    if (isCooldownActive && !cooldownExpired) return "Cooldown aktiv";
    return undefined;
  };

  return (
    <>
      <Helmet>
        <title>Spin the Reel | Casinoaftaler.dk</title>
        <meta name="description" content="Spin hjulet og vind points eller spins! Tilgængelig hver 12. time for community-medlemmer." />
      </Helmet>

      <CommunityNav />

      <main className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">🎡 Spin the Reel</h1>
            <p className="text-muted-foreground">
              Spin hjulet hver 12. time og vind points eller spins!
            </p>
          </div>

          {authLoading ? (
            <div className="h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
            </div>
          ) : !user ? (
            <div className="py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                <LogIn className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg text-muted-foreground">Log ind for at spinne hjulet</p>
              <Link to="/login">
                <Button>Log ind</Button>
              </Link>
            </div>
          ) : !hasTwitchId ? (
            <div className="py-16 space-y-4">
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
          ) : (
            <div className="space-y-6">
              <SpinWheel
                onSpinComplete={handleSpinComplete}
                targetSegmentId={targetSegment}
                isSpinning={isSpinning}
                onSpinStart={handleSpinStart}
                disabled={!canSpin}
                disabledReason={getDisabledReason()}
              />

              {isCooldownActive && !cooldownExpired && cooldownEnd && (
                <CooldownTimer
                  cooldownEnd={cooldownEnd}
                  onExpired={handleCooldownExpired}
                />
              )}
            </div>
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
