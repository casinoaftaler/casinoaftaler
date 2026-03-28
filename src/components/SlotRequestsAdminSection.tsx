import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAllSlotRequests, useUpdateSlotRequestStatus } from "@/hooks/useSlotRequests";
import { useBonusHuntSession } from "@/hooks/useBonusHuntSession";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Gamepad2, Trophy, X, Minus, Save, Settings } from "lucide-react";
import { toast } from "sonner";

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Afventer", variant: "secondary" },
  bonus_hit: { label: "Bonus Hit! 🎉", variant: "default" },
  no_bonus: { label: "Ingen Bonus", variant: "outline" },
  rejected: { label: "Afvist", variant: "destructive" },
};

export function SlotRequestsAdminSection() {
  const { data: requests, isLoading } = useAllSlotRequests();
  const updateStatus = useUpdateSlotRequestStatus();
  const { data: siteSettings } = useSiteSettings();
  const queryClient = useQueryClient();

  const currentMax = parseInt(siteSettings?.max_pending_slot_requests ?? "1", 10);
  const [maxLimit, setMaxLimit] = useState(currentMax);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMaxLimit(currentMax);
  }, [currentMax]);

  const handleSaveLimit = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key: "max_pending_slot_requests", value: String(maxLimit) }, { onConflict: "key" });
    setSaving(false);
    if (error) {
      toast.error("Kunne ikke gemme indstillingen");
    } else {
      toast.success("Maks requests opdateret");
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
    }
  };

  const handleAction = (requestId: string, userId: string, status: string, awardCredits?: boolean) => {
    updateStatus.mutate({ requestId, status, userId, awardCredits });
  };

  const pendingRequests = requests?.filter(req => req.status === "pending") ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Request Indstillinger
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="max-requests">Maks ventende requests pr. bruger</Label>
              <Input
                id="max-requests"
                type="number"
                min={1}
                max={20}
                value={maxLimit}
                onChange={(e) => setMaxLimit(Math.max(1, Math.min(20, Number(e.target.value))))}
                className="w-24"
              />
            </div>
            <Button
              size="sm"
              onClick={handleSaveLimit}
              disabled={saving || maxLimit === currentMax}
              className="gap-1"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Gem
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Ventende Requests ({pendingRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : pendingRequests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bruger</TableHead>
                  <TableHead>Slot</TableHead>
                  <TableHead>Udbyder</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dato</TableHead>
                  <TableHead className="text-right">Handlinger</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((req) => {
                  const config = STATUS_CONFIG[req.status] || STATUS_CONFIG.pending;
                  const isPending = req.status === "pending";
                  return (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.display_name}</TableCell>
                      <TableCell>
                        {req.slot_name}
                        {req.is_custom && (
                          <span className="ml-1.5 text-xs text-muted-foreground">(custom)</span>
                        )}
                      </TableCell>
                      <TableCell>{req.provider}</TableCell>
                      <TableCell>
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(req.created_at).toLocaleDateString("da-DK")}
                      </TableCell>
                      <TableCell className="text-right">
                        {isPending && (
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="sm"
                              onClick={() => handleAction(req.id, req.user_id, "bonus_hit", true)}
                              disabled={updateStatus.isPending}
                              className="gap-1"
                            >
                              <Trophy className="h-3.5 w-3.5" />
                              Bonus Hit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAction(req.id, req.user_id, "no_bonus")}
                              disabled={updateStatus.isPending}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleAction(req.id, req.user_id, "rejected")}
                              disabled={updateStatus.isPending}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-8">
              Ingen ventende requests 🎉
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
