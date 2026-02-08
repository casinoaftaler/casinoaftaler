import { Progress } from "@/components/ui/progress";
import { Sparkles, Check, X } from "lucide-react";
import { SectionCompletionStatus, SPINS_PER_SECTION } from "@/hooks/useProfileRewards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProfileRewardsProgressProps {
  currentStatus: SectionCompletionStatus;
  rewardedSections: {
    profile: boolean;
    stats: boolean;
    favorites: boolean;
    playstyle: boolean;
  };
  bonusSpinsPermanent: number;
  className?: string;
}

const SECTIONS = [
  { key: "profile" as const, label: "Profil", description: "Udfyld din bio" },
  { key: "stats" as const, label: "Stats", description: "Del dine største gevinster" },
  { key: "favorites" as const, label: "Favoritter", description: "Vælg dine favoritter" },
  { key: "playstyle" as const, label: "Spillestil", description: "Beskriv din spillestil" },
];

export function ProfileRewardsProgress({
  currentStatus,
  rewardedSections,
  bonusSpinsPermanent,
  className,
}: ProfileRewardsProgressProps) {
  const totalSections = 4;
  const rewardedCount = Object.values(rewardedSections).filter(Boolean).length;
  const maxSpins = totalSections * SPINS_PER_SECTION;
  const progressPercent = (rewardedCount / totalSections) * 100;

  return (
    <Card className={cn("overflow-hidden border-primary/20", className)}>
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-primary" />
            Profilfremskridt
          </CardTitle>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 border">
            <span className="text-lg font-bold text-primary">{bonusSpinsPermanent}</span>
            <span className="text-sm text-muted-foreground">/ {maxSpins} spins</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">
              {rewardedCount} af {totalSections} sektioner udfyldt
            </span>
            <span className="font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        <div className="grid gap-2">
          {SECTIONS.map((section) => {
            const isRewarded = rewardedSections[section.key];
            const isCompleted = currentStatus[section.key];
            
            return (
              <div
                key={section.key}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isRewarded 
                    ? "bg-primary/10 border border-primary/20" 
                    : "bg-muted/50 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center h-6 w-6 rounded-full ${
                      isRewarded
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                        ? "bg-primary/20 text-primary"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    }`}
                  >
                    {isRewarded ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <X className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${isRewarded ? "text-foreground" : "text-muted-foreground"}`}>
                      {section.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                
                <div
                  className={`text-sm font-medium px-2 py-0.5 rounded ${
                    isRewarded
                      ? "text-primary"
                      : isCompleted
                      ? "text-primary/70"
                      : "text-muted-foreground"
                  }`}
                >
                  +{SPINS_PER_SECTION} spins
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
