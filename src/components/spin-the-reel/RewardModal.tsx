import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, Gamepad2, ShoppingBag, Sparkles, Zap } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { Confetti } from "./Confetti";
import "@/styles/spin-the-reel.css";

interface RewardModalProps {
  open: boolean;
  onClose: () => void;
  rewardType: "points" | "spins" | "none";
  rewardValue: number;
  rewardLabel: string;
}

export function RewardModal({
  open,
  onClose,
  rewardType,
  rewardValue,
  rewardLabel,
}: RewardModalProps) {
  const isWin = rewardType !== "none";

  return (
    <>
      <Confetti active={open && isWin} />
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md text-center border-primary/30 overflow-hidden">
          {/* Background glow for wins */}
          {isWin && (
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, hsl(260, 70%, 50%), transparent 70%)",
              }}
            />
          )}

          <DialogHeader>
            <DialogTitle className="text-2xl relative">
              {isWin ? "🎉 Tillykke!" : "😔 Desværre!"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-6 space-y-5 relative">
            {isWin ? (
              <>
                <div className="flex justify-center reward-pop-in">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, hsl(260, 70%, 25%), hsl(280, 60%, 30%))",
                        boxShadow: "0 0 40px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.2)",
                      }}
                    >
                      {rewardType === "points" ? (
                        <MenuIcon iconName="coins" className="h-12 w-12 text-primary" />
                      ) : (
                        <MenuIcon iconName="zap" className="h-12 w-12 text-primary" />
                      )}
                    </div>
                    <MenuIcon iconName="sparkles" className="absolute -top-2 -right-2 h-6 w-6 text-primary animate-bounce" />
                    <Sparkles className="absolute -bottom-1 -left-2 h-5 w-5 text-primary/70 animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
                <div className="reward-pop-in [animation-delay:0.2s]">
                  <p className="text-2xl font-bold text-foreground">
                    Du vandt {rewardLabel}!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    {rewardType === "points"
                      ? "Points er blevet tilføjet til din konto."
                      : "Spins er blevet tilføjet til din saldo og kan bruges i spillehallen."}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, hsl(220, 15%, 18%), hsl(220, 15%, 22%))",
                    }}
                  >
                    <span className="text-5xl">🎰</span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">
                  Bedre held næste gang! Kom tilbage om 12 timer.
                </p>
              </>
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-2">
            {isWin ? (
              <>
                <Button asChild className="flex-1 gap-2">
                  <Link to="/community/slots" onClick={onClose}>
                    <MenuIcon iconName="gamepad2" className="h-4 w-4" />
                    Gå til Spillehal
                  </Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 gap-2">
                  <Link to="/butik" onClick={onClose}>
                    <MenuIcon iconName="shopping-bag" className="h-4 w-4" />
                    Gå til Butik
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="flex-1 gap-2">
                  <Link to="/community/slots" onClick={onClose}>
                    <MenuIcon iconName="gamepad2" className="h-4 w-4" />
                    Gå til Spillehal
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  OK
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
