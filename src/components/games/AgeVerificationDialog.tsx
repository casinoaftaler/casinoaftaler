import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldCheck } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AgeVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetHref: string;
}

export function AgeVerificationDialog({ open, onOpenChange, targetHref }: AgeVerificationDialogProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ age_verified: true })
        .eq("user_id", user.id);

      if (error) throw error;

      onOpenChange(false);
      navigate(targetHref);
    } catch (err) {
      console.error("Age verification error:", err);
      toast.error("Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <MenuIcon iconName="shield-check" className="h-6 w-6 text-primary" />
            <AlertDialogTitle>Aldersbekræftelse</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base pt-2">
            Du skal bekræfte, at du er 18 år eller ældre for at spille. Dette er et krav i henhold til dansk lovgivning.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Annuller</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={loading}>
            {loading ? "Bekræfter..." : "Jeg er 18 år eller ældre"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
