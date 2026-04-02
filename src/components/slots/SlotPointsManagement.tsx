import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Pencil, Trash2, Loader2, History } from "lucide-react"
import { MenuIcon } from "@/components/MenuIcon";;
import { toast } from "sonner";

interface UserWithPoints {
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  total_points: number;
}

interface AuditLogEntry {
  id: string;
  admin_user_id: string;
  target_user_id: string;
  action_type: string;
  previous_points: number;
  new_points: number;
  reason: string | null;
  created_at: string;
}

function useUsersWithPoints(searchQuery: string) {
  return useQuery({
    queryKey: ["users-with-points", searchQuery],
    queryFn: async (): Promise<UserWithPoints[]> => {
      // Get all users from slot_leaderboard view
      const { data: leaderboardData, error: leaderboardError } = await supabase
        .from("slot_leaderboard")
        .select("user_id, total_winnings");

      if (leaderboardError) throw leaderboardError;

      // Get profiles for display names
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url");

      if (profilesError) throw profilesError;

      // Merge data
      const profileMap = new Map(
        profilesData?.map((p) => [p.user_id, p]) ?? []
      );

      const users: UserWithPoints[] = (leaderboardData ?? []).map((entry) => {
        const profile = profileMap.get(entry.user_id);
        return {
          user_id: entry.user_id!,
          display_name: profile?.display_name || null,
          avatar_url: profile?.avatar_url || null,
          total_points: Number(entry.total_winnings) || 0,
        };
      });

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return users.filter(
          (u) =>
            u.display_name?.toLowerCase().includes(query) ||
            u.user_id.toLowerCase().includes(query)
        );
      }

      return users.sort((a, b) => b.total_points - a.total_points);
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: false,
  });
}

function useRecentAuditLogs() {
  return useQuery({
    queryKey: ["slot-points-audit-logs"],
    queryFn: async (): Promise<AuditLogEntry[]> => {
      const { data, error } = await supabase
        .from("slot_points_audit_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      return data ?? [];
    },
  });
}

function useManagePoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      targetUserId: string;
      action: "edit" | "reset";
      newPoints?: number;
      reason?: string;
    }) => {
      const { data, error } = await supabase.functions.invoke("admin-manage-points", {
        body: params,
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-with-points"] });
      queryClient.invalidateQueries({ queryKey: ["slot-points-audit-logs"] });
      queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
    },
  });
}

export function SlotPointsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserWithPoints | null>(null);
  const [editPoints, setEditPoints] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);

  const { data: users, isLoading: isLoadingUsers } = useUsersWithPoints(searchQuery);
  const { data: auditLogs, isLoading: isLoadingAudit } = useRecentAuditLogs();
  const managePoints = useManagePoints();

  useEffect(() => {
    if (selectedUser) {
      setEditPoints(String(Math.max(0, selectedUser.total_points)));
    }
  }, [selectedUser]);

  const handleEditPoints = async () => {
    if (!selectedUser) return;

    const newPoints = Math.max(0, Math.floor(Number(editPoints) || 0));
    
    try {
      await managePoints.mutateAsync({
        targetUserId: selectedUser.user_id,
        action: "edit",
        newPoints,
      });
      toast.success(`Points opdateret til ${newPoints}`);
      setIsEditing(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Kunne ikke opdatere points");
      console.error(error);
    }
  };

  const handleResetPoints = async () => {
    if (!selectedUser) return;

    try {
      await managePoints.mutateAsync({
        targetUserId: selectedUser.user_id,
        action: "reset",
      });
      toast.success("Points nulstillet");
      setShowResetConfirm(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Kunne ikke nulstille points");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and User Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MenuIcon iconName="coins" className="h-5 w-5 text-amber-500" />
            Points Administration
          </CardTitle>
          <CardDescription>
            Søg efter brugere og administrer deres slot machine points
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Søg efter brugernavn eller user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* User List */}
          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {isLoadingUsers ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : users && users.length > 0 ? (
              users.map((user) => (
                <button
                  key={user.user_id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left ${
                    selectedUser?.user_id === user.user_id
                      ? "bg-primary/10 border-primary"
                      : "bg-card hover:bg-muted/50 border-border"
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar_url || undefined} />
                    <AvatarFallback>
                      <MenuIcon iconName="user" className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {user.display_name || "Ukendt bruger"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.user_id}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    <span className="text-primary font-semibold">{user.total_points.toLocaleString()}</span> pts
                  </Badge>
                </button>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                {searchQuery ? "Ingen brugere fundet" : "Ingen brugere med points"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected User Actions */}
      {selectedUser && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MenuIcon iconName="user" className="h-5 w-5" />
              Valgt bruger
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Avatar className="h-14 w-14">
                <AvatarImage src={selectedUser.avatar_url || undefined} />
                <AvatarFallback>
                  <MenuIcon iconName="user" className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-lg">
                  {selectedUser.display_name || "Ukendt bruger"}
                </p>
                <p className="text-sm text-muted-foreground">{selectedUser.user_id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Nuværende points</p>
                <p className="text-2xl font-bold text-amber-500">
                  {selectedUser.total_points.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Edit Points Form */}
            {isEditing ? (
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="edit-points">Nye points (minimum 0)</Label>
                  <Input
                    id="edit-points"
                    type="number"
                    min="0"
                    value={editPoints}
                    onChange={(e) => {
                      const val = Math.max(0, Number(e.target.value) || 0);
                      setEditPoints(String(val));
                    }}
                    placeholder="Indtast nye points..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleEditPoints}
                    disabled={managePoints.isPending}
                  >
                    {managePoints.isPending && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    Gem ændringer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    disabled={managePoints.isPending}
                  >
                    Annuller
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => setIsEditing(true)} className="flex-1">
                  <Pencil className="h-4 w-4 mr-2" />
                  Rediger points
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowResetConfirm(true)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Nulstil til 0
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Audit Log */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setShowAuditLog(!showAuditLog)}>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            Seneste ændringer
            <Badge variant="outline" className="ml-auto">
              {auditLogs?.length ?? 0}
            </Badge>
          </CardTitle>
        </CardHeader>
        {showAuditLog && (
          <CardContent>
            {isLoadingAudit ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : auditLogs && auditLogs.length > 0 ? (
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm"
                  >
                    <div>
                      <span className="font-medium">
                        {log.action_type === "reset" ? "Nulstilling" : "Redigering"}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        {log.previous_points.toLocaleString()} → {log.new_points.toLocaleString()} pts
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleString("da-DK")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">
                Ingen ændringer endnu
              </p>
            )}
          </CardContent>
        )}
      </Card>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={showResetConfirm} onOpenChange={setShowResetConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nulstil points?</AlertDialogTitle>
            <AlertDialogDescription>
              Er du sikker på at du vil nulstille alle points for{" "}
              <strong>{selectedUser?.display_name || "denne bruger"}</strong>?
              <br />
              <br />
              Nuværende points:{" "}
              <strong className="text-amber-500">
                {selectedUser?.total_points.toLocaleString()}
              </strong>
              <br />
              <br />
              Denne handling kan ikke fortrydes. Brugeren vil blive fjernet fra
              leaderboardet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={managePoints.isPending}>
              Annuller
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetPoints}
              disabled={managePoints.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {managePoints.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Nulstil points
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
