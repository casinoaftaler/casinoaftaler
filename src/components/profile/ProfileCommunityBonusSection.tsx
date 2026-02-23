import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gift, Video } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";
import { useCommunityBonusSpins } from "@/hooks/useCommunityBonusSpins";
import { ActivateBonusSpinsDialog } from "./ActivateBonusSpinsDialog";

interface ProfileCommunityBonusSectionProps {
  className?: string;
}

export function ProfileCommunityBonusSection({ className }: ProfileCommunityBonusSectionProps) {
  const { totalEarned, totalActivated, remaining, rewardedClipsCount, isLoading, activateSpins } = useCommunityBonusSpins();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading) return null;

  const maxEarnable = 250;
  const maxClips = 5;

  const handleActivate = (amount: number) => {
    activateSpins.mutate(amount, {
      onSuccess: () => setDialogOpen(false),
    });
  };

  return (
    <>
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Gift className="h-5 w-5 text-primary" />
            Bonus Credits (Community)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold">{totalEarned}</p>
              <p className="text-xs text-muted-foreground">Optjent / {maxEarnable}</p>
              <Progress value={(totalEarned / maxEarnable) * 100} className="mt-2 h-1.5" />
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <p className="text-2xl font-bold">{totalActivated}</p>
              <p className="text-xs text-muted-foreground">Allerede aktiveret</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <CreditCoin size="md" />
                <p className="text-2xl font-bold text-primary">{remaining}</p>
              </div>
              <p className="text-xs text-muted-foreground">Uaktiverede</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
              <div className="flex items-center justify-center gap-1">
                <Video className="h-4 w-4 text-muted-foreground" />
                <p className="text-2xl font-bold">{rewardedClipsCount}</p>
              </div>
              <p className="text-xs text-muted-foreground">Belønnet / {maxClips}</p>
            </div>
          </div>

          {/* Info text */}
          <p className="text-xs text-muted-foreground">
            Upload godkendte klips til Community Highlights og optjen +50 bonus credits per klip (maks {maxClips} klips).
          </p>

          {/* Activate button */}
          {remaining > 0 && (
            <Button onClick={() => setDialogOpen(true)} className="w-full" size="sm">
              <CreditCoin size="md" className="mr-2" />
              Aktiver Credits ({remaining} tilgængelige)
            </Button>
          )}
        </CardContent>
      </Card>

      <ActivateBonusSpinsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        remaining={remaining}
        onActivate={handleActivate}
        isActivating={activateSpins.isPending}
      />
    </>
  );
}
