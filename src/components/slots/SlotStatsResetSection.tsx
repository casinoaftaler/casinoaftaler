import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Timer, Loader2 } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type ResetTarget = "leaderboard" | "spins" | "all";

interface ResetDialogState {
  open: boolean;
  target: ResetTarget;
  title: string;
  description: string;
}

export function SlotStatsResetSection() {
  const [isResetting, setIsResetting] = useState(false);
  const [resetDialog, setResetDialog] = useState<ResetDialogState>({
    open: false,
    target: "all",
    title: "",
    description: "",
  });
  const queryClient = useQueryClient();

  const openResetDialog = (target: ResetTarget) => {
    const configs: Record<ResetTarget, { title: string; description: string }> = {
      leaderboard: {
        title: "Nulstil Leaderboard",
        description: "Dette sletter alle spilleresultater og nulstiller leaderboardet. Alle brugers gevinster og statistik vil blive slettet permanent.",
      },
      spins: {
         title: "Nulstil Alle Credits",
        description: "Dette sletter alle credit-tællere. Alle brugere får nulstillet deres daglige credits og skal vente på nye.",
      },
      all: {
        title: "Nulstil Alt",
        description: "Dette sletter BÅDE leaderboard OG alle credits. Alle brugers gevinster, statistik og credits vil blive slettet permanent.",
      },
    };

    setResetDialog({
      open: true,
      target,
      ...configs[target],
    });
  };

  const handleReset = async () => {
    setIsResetting(true);
    setResetDialog((prev) => ({ ...prev, open: false }));

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        toast.error("Du skal være logget ind som admin");
        return;
      }

      const { data, error } = await supabase.functions.invoke("reset-slot-stats", {
        body: { target: resetDialog.target, source: "admin" },
      });

      if (error) {
        console.error("Reset error:", error);
        toast.error("Kunne ikke nulstille: " + error.message);
        return;
      }

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      // Invalidate relevant queries to refresh UI
      await queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
      await queryClient.invalidateQueries({ queryKey: ["slot-statistics"] });
      await queryClient.invalidateQueries({ queryKey: ["slot-admin-statistics"] });
      await queryClient.invalidateQueries({ queryKey: ["slot-spins"] });

      const targetLabels: Record<ResetTarget, string> = {
        leaderboard: "Leaderboard",
        spins: "Credits",
        all: "Alt",
      };

      toast.success(`${targetLabels[resetDialog.target]} er blevet nulstillet!`, {
        description: `Slettet: ${data.leaderboardDeleted || 0} resultater, ${data.spinsDeleted || 0} spin-poster`,
      });
    } catch (err) {
      console.error("Reset exception:", err);
      toast.error("Der opstod en fejl under nulstilling");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MenuIcon iconName="refresh-cw" className="h-5 w-5 text-destructive" />
            Nulstil Statistik
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <MenuIcon iconName="calendar" className="h-4 w-4" />
            Automatisk nulstilling: Den 1. i hver måned kl. 00:00
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => openResetDialog("leaderboard")}
              disabled={isResetting}
              className="gap-2"
            >
              {isResetting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MenuIcon iconName="trophy" className="h-4 w-4" />
              )}
              Nulstil Leaderboard
            </Button>

            <Button
              variant="outline"
              onClick={() => openResetDialog("spins")}
              disabled={isResetting}
              className="gap-2"
            >
              {isResetting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Timer className="h-4 w-4" />
              )}
              Nulstil Alle Credits
            </Button>

            <Button
              variant="destructive"
              onClick={() => openResetDialog("all")}
              disabled={isResetting}
              className="gap-2"
            >
              {isResetting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MenuIcon iconName="refresh-cw" className="h-4 w-4" />
              )}
              Nulstil Alt
            </Button>
          </div>

          <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <MenuIcon iconName="alert-triangle" className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-destructive">Advarsel:</strong> Disse handlinger kan ikke fortrydes! Alle slettede data er permanent tabt.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            <strong>Bemærk:</strong> Admin analytics (sidevisninger, klik-statistik) bevares altid og påvirkes ikke af nulstilling.
          </p>
        </CardContent>
      </Card>

      <AlertDialog open={resetDialog.open} onOpenChange={(open) => setResetDialog((prev) => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <MenuIcon iconName="alert-triangle" className="h-5 w-5 text-destructive" />
              {resetDialog.title}
            </AlertDialogTitle>
            <AlertDialogDescription>{resetDialog.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuller</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Ja, nulstil nu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
