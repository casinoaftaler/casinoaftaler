import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { CreditCoin } from "@/components/CreditCoin";

interface ActivateBonusSpinsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  remaining: number;
  onActivate: (amount: number) => void;
  isActivating: boolean;
}

export function ActivateBonusSpinsDialog({
  open,
  onOpenChange,
  remaining,
  onActivate,
  isActivating,
}: ActivateBonusSpinsDialogProps) {
  const [amount, setAmount] = useState(remaining);

  const handleSliderChange = (value: number[]) => {
    setAmount(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      setAmount(Math.max(1, Math.min(val, remaining)));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCoin size="lg" />
            Aktiver Bonus Credits
          </DialogTitle>
          <DialogDescription>
            Vælg hvor mange bonus credits du vil aktivere. De tilføjes til din aktive credit-saldo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Antal at aktivere</span>
              <Input
                type="number"
                min={1}
                max={remaining}
                value={amount}
                onChange={handleInputChange}
                className="w-20 h-8 text-center"
              />
            </div>
            <Slider
              min={1}
              max={remaining}
              step={1}
              value={[amount]}
              onValueChange={handleSliderChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>{remaining}</span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/30 p-3 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Aktiverede credits tilføjes til dagens saldo. Ubrugte aktiverede credits nulstilles ved dagsskiftet — aktiver kun hvad du kan bruge i dag.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isActivating}>
            Annuller
          </Button>
          <Button
            onClick={() => onActivate(amount)}
            disabled={isActivating || amount < 1}
          >
            {isActivating ? "Aktiverer..." : `Aktiver ${amount} credits`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
