import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StaleAlert {
  id: string;
  casino_slug: string;
  casino_name: string;
  days_stale: number;
  alert_type: string;
  created_at: string;
  resolved_at: string | null;
}

export function StaleContentAlerts() {
  const queryClient = useQueryClient();

  const { data: alerts, isLoading } = useQuery({
    queryKey: ["stale-content-alerts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stale_content_alerts")
        .select("*")
        .is("resolved_at", null)
        .order("days_stale", { ascending: false });
      if (error) throw error;
      return (data ?? []) as StaleAlert[];
    },
  });

  const resolveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("stale_content_alerts")
        .update({ resolved_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Alert markeret som løst");
      queryClient.invalidateQueries({ queryKey: ["stale-content-alerts"] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const getSeverity = (days: number) => {
    if (days > 60) return "destructive";
    if (days > 45) return "default";
    return "secondary";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Stale Content Alerts
          {alerts && alerts.length > 0 && (
            <Badge variant="destructive" className="ml-2">{alerts.length}</Badge>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Casinoer der ikke er verificeret i over 30 dage. Opdateres automatisk hver søndag.
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : !alerts || alerts.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
            <CheckCircle className="h-4 w-4 text-green-500" />
            Alle casinoer er verificeret inden for de seneste 30 dage.
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto space-y-1">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between gap-2 py-2 px-3 rounded-md hover:bg-muted/50 text-sm"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium block truncate">{alert.casino_name}</span>
                  <span className="text-muted-foreground text-xs font-mono">{alert.casino_slug}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={getSeverity(alert.days_stale)}>
                    {alert.days_stale} dage
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => resolveMutation.mutate(alert.id)}
                    disabled={resolveMutation.isPending}
                  >
                    {resolveMutation.isPending ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      "Løst"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
