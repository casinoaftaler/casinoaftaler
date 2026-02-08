import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";
import { SectionCompletionStatus, SPINS_PER_SECTION } from "@/hooks/useProfileRewards";

interface ProfileRewardsProgressProps {
  currentStatus: SectionCompletionStatus;
  rewardedSections: {
    profile: boolean;
    stats: boolean;
    favorites: boolean;
    playstyle: boolean;
  };
  bonusSpinsPermanent: number;
}

export function ProfileRewardsProgress({
  currentStatus,
  rewardedSections,
  bonusSpinsPermanent,
}: ProfileRewardsProgressProps) {
  const totalSections = 4;
  const rewardedCount = Object.values(rewardedSections).filter(Boolean).length;
  const maxSpins = totalSections * SPINS_PER_SECTION;
  const progressPercent = (rewardedCount / totalSections) * 100;

  return (
    <div className="rounded-lg border bg-card p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span className="font-medium">Profilbelønninger</span>
        </div>
        <div className="text-sm">
          <span className="text-amber-500 font-bold">{bonusSpinsPermanent}</span>
          <span className="text-muted-foreground">/{maxSpins} spins optjent</span>
        </div>
      </div>
      
      <Progress value={progressPercent} className="h-2 mb-3" />
      
      <div className="grid grid-cols-4 gap-2 text-xs text-center">
        <SectionIndicator
          label="Profil"
          isCompleted={currentStatus.profile}
          isRewarded={rewardedSections.profile}
        />
        <SectionIndicator
          label="Stats"
          isCompleted={currentStatus.stats}
          isRewarded={rewardedSections.stats}
        />
        <SectionIndicator
          label="Favoritter"
          isCompleted={currentStatus.favorites}
          isRewarded={rewardedSections.favorites}
        />
        <SectionIndicator
          label="Spillestil"
          isCompleted={currentStatus.playstyle}
          isRewarded={rewardedSections.playstyle}
        />
      </div>
    </div>
  );
}

function SectionIndicator({
  label,
  isCompleted,
  isRewarded,
}: {
  label: string;
  isCompleted: boolean;
  isRewarded: boolean;
}) {
  let bgColor = "bg-muted";
  let textColor = "text-muted-foreground";

  if (isRewarded) {
    bgColor = "bg-green-500/20";
    textColor = "text-green-500";
  } else if (isCompleted) {
    bgColor = "bg-amber-500/20";
    textColor = "text-amber-500";
  }

  return (
    <div className={`rounded px-2 py-1 ${bgColor} ${textColor}`}>
      {label}
      {isRewarded && " ✓"}
    </div>
  );
}
