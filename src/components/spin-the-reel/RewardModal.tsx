import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Coins, Zap } from "lucide-react";

interface RewardModalProps {
  open: boolean;
  onClose: () => void;
  rewardType: "points" | "spins" | "none";
  rewardValue: number;
  rewardLabel: string;
}

export function RewardModal({ open, onClose, rewardType, rewardValue, rewardLabel }: RewardModalProps) {
  const isWin = rewardType !== "none";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {isWin ? "🎉 Tillykke!" : "😔 Desværre!"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-6 space-y-4">
          {isWin ? (
            <>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    {rewardType === "points" ? (
                      <Coins className="h-10 w-10 text-primary" />
                    ) : (
                      <Zap className="h-10 w-10 text-primary" />
                    )}
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-primary animate-bounce" />
                </div>
              </div>
              <p className="text-xl font-bold text-foreground">
                Du vandt {rewardLabel}!
              </p>
              <p className="text-sm text-muted-foreground">
                {rewardType === "points"
                  ? "Points er blevet tilføjet til din konto."
                  : "Spins er blevet tilføjet til din saldo og kan bruges i spillehallen."}
              </p>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center">
                  <span className="text-4xl">🎰</span>
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                Bedre held næste gang! Kom tilbage om 12 timer.
              </p>
            </>
          )}
        </div>
        <Button onClick={onClose} className="w-full">
          {isWin ? "Fedt! 🎉" : "OK"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
