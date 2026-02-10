import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Ticket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface RedeemCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RedeemCodeDialog({ open, onOpenChange }: RedeemCodeDialogProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("redeem-code", {
        body: { code: code.trim().toUpperCase() },
      });

      if (error) throw error;

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message || `Du har modtaget ${data.credits_awarded} credits!`);
        queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
        queryClient.invalidateQueries({ queryKey: ["header-credits"] });
        setCode("");
        onOpenChange(false);
      }
    } catch (err: any) {
      toast.error("Der opstod en fejl. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Indløs Kode
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleRedeem} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="redeem-code">Indtast din kode</Label>
            <Input
              id="redeem-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="F.eks. BONUS50"
              className="uppercase"
              autoComplete="off"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading || !code.trim()}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Indløs
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
