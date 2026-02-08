import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, X } from "lucide-react";

export function ProfileCompletionPrompt() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile-prompt-check", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "profile_prompt_dismissed, profile_section_completed, stats_section_completed, favorites_section_completed, playstyle_section_completed"
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (authLoading || isLoading || !user || !profileData) return;

    const allCompleted =
      profileData.profile_section_completed &&
      profileData.stats_section_completed &&
      profileData.favorites_section_completed &&
      profileData.playstyle_section_completed;

    if (!profileData.profile_prompt_dismissed && !allCompleted) {
      // Small delay so it doesn't flash immediately on page load
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [authLoading, isLoading, user, profileData]);

  const handleDismiss = async () => {
    setOpen(false);
    if (user?.id) {
      await supabase
        .from("profiles")
        .update({ profile_prompt_dismissed: true })
        .eq("user_id", user.id);
      queryClient.invalidateQueries({ queryKey: ["profile-prompt-check", user.id] });
    }
  };

  const handleAccept = () => {
    setOpen(false);
    navigate("/profile");
  };

  if (!user || !profileData) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleDismiss(); }}>
      <DialogContent className="sm:max-w-md border-primary/20">
        <DialogHeader className="text-center items-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Gift className="h-7 w-7 text-primary" />
          </div>
          <DialogTitle className="text-xl">
            Få 20 ekstra spins hver dag! 🎰
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Vil du modtage <span className="font-semibold text-primary">20 gratis spins ekstra</span> hver eneste dag? 
            Udfyld din profil, og de er dine — for altid!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
          <Button
            onClick={handleAccept}
            className="flex-1 sm:flex-none sm:min-w-[140px]"
            size="lg"
          >
            Ja, vis mig!
          </Button>
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="flex-1 sm:flex-none sm:min-w-[140px]"
            size="lg"
          >
            <X className="mr-2 h-4 w-4" />
            Nej tak
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
