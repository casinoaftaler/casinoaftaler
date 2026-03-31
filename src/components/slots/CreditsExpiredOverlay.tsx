import { useState, useEffect } from "react";
import { activateMissionMode } from "@/hooks/useDwellReward";
import { Clock, Sparkles, ExternalLink, Coins, ArrowRight, Check, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { CreditCoin } from "@/components/CreditCoin";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCasinoBySlug } from "@/hooks/useCasinoBySlug";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useDwellRewardProgress } from "@/hooks/useDwellReward";
import { useMissionStreak, STREAK_MILESTONES } from "@/hooks/useMissionStreak";

function getTimeUntilMidnightCopenhagen(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const copenhagenNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Copenhagen" }));
  const midnight = new Date(copenhagenNow);
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  const diffMs = midnight.getTime() - copenhagenNow.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

interface CreditsExpiredOverlayProps {
  isVisible: boolean;
}

export function CreditsExpiredOverlay({ isVisible }: CreditsExpiredOverlayProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnightCopenhagen);
  const { data: spildansknu } = useCasinoBySlug("spildansknu");
  const { data: spilleautomaten } = useCasinoBySlug("spilleautomaten");
  const { user } = useAuth();
  const { pages, completedCount, totalPages } = useDwellRewardProgress();
  const { currentStreak, nextMilestone } = useMissionStreak();
  const uncompletedMissions = pages.filter((p) => !p.completed);

  const totalCredits = pages.reduce((sum, p) => sum + p.credits, 0);
  const earnedCredits = pages.filter((p) => p.completed).reduce((sum, p) => sum + p.credits, 0);
  const hasNoneCompleted = completedCount === 0;
  const allCompleted = completedCount === totalPages;

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilMidnightCopenhagen());
    }, 1000);
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  const promoCasinos = [
    { casino: spildansknu, slug: "spildansknu", name: "SpilDanskNu", tagline: "Danmarks mest populære online casino" },
    { casino: spilleautomaten, slug: "spilleautomaten", name: "Spilleautomaten", tagline: "Fantastisk bonus og hurtigt spil" },
  ];

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/70 pt-1">
            <Sparkles className="h-3 w-3" />
            <span>Credits nulstilles ved midnat (dansk tid)</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}