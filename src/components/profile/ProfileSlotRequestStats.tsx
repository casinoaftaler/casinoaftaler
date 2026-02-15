import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useMySlotRequests } from "@/hooks/useSlotRequests";
import { Gamepad2, Loader2 } from "lucide-react";

interface ProfileSlotRequestStatsProps {
  className?: string;
}

export function ProfileSlotRequestStats({ className }: ProfileSlotRequestStatsProps) {
  const { data: requests, isLoading } = useMySlotRequests();

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!requests || requests.length === 0) return null;

  const bonusHits = requests.filter((r) => r.status === "bonus_hit").length;
  const noBonus = requests.filter((r) => r.status === "no_bonus").length;
  const pending = requests.filter((r) => r.status === "pending").length;
  const resolved = bonusHits + noBonus;
  const hitRate = resolved > 0 ? (bonusHits / resolved) * 100 : 0;
  const creditsEarned = requests.reduce((sum, r) => sum + (r.credits_awarded || 0), 0);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Gamepad2 className="h-5 w-5 text-primary" />
          Slot Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Bonus Hit</p>
            <p className="text-2xl font-bold text-primary">{bonusHits}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Ingen Bonus</p>
            <p className="text-2xl font-bold">{noBonus}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Hit Rate</p>
            <p className="text-2xl font-bold">{hitRate.toFixed(1)}%</p>
            <Progress value={hitRate} className="mt-2 h-2" />
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Credits Optjent</p>
            <p className="text-2xl font-bold">{creditsEarned}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Afventer</p>
            <p className="text-2xl font-bold">{pending}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{requests.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
