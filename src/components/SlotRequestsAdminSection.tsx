import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAllSlotRequests, useUpdateSlotRequestStatus } from "@/hooks/useSlotRequests";
import { Loader2, Gamepad2, Trophy, X, Minus } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Afventer", variant: "secondary" },
  bonus_hit: { label: "Bonus Hit! 🎉", variant: "default" },
  no_bonus: { label: "Ingen Bonus", variant: "outline" },
  rejected: { label: "Afvist", variant: "destructive" },
};

export function SlotRequestsAdminSection() {
  const { data: requests, isLoading } = useAllSlotRequests();
  const updateStatus = useUpdateSlotRequestStatus();

  const handleAction = (requestId: string, userId: string, status: string, awardCredits?: boolean) => {
    updateStatus.mutate({ requestId, status, userId, awardCredits });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Slot Requests</h2>
        <p className="text-muted-foreground">Administrer brugernes slot requests til livestream.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            Alle Requests ({requests?.length ?? 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : requests && requests.length > 0 ? (
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
                {requests.map((req) => {
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
              Ingen slot requests endnu.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
