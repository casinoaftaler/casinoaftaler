import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  Loader2,
  Search,
  Plus,
  Minus,
  Users,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Ban,
  ShieldCheck,
  Check,
  X,
  RotateCw,
} from "lucide-react";
import { useProfileCompletionStats, type UserProfileStatus } from "@/hooks/useProfileCompletionStats";
import { toast } from "sonner";
import { getTodayDanish } from "@/lib/danishDate";
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
import { Textarea } from "@/components/ui/textarea";

interface UserWithSpins {
  user_id: string;
  display_name: string | null;
  twitch_username: string | null;
  avatar_url: string | null;
  spins_remaining: number;
  date: string;
  spin_record_id: string | null;
  is_banned: boolean;
  spin_reel_extra_spins: number;
}

type SortField = "name" | "credits";
type SortDir = "asc" | "desc";

export function SpinManagementSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [spinAmounts, setSpinAmounts] = useState<Record<string, number>>({});
  const [reelSpinAmounts, setReelSpinAmounts] = useState<Record<string, number>>({});
  const [bulkSpinAmount, setBulkSpinAmount] = useState(10);
  const [sortField, setSortField] = useState<SortField>("credits");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [banDialogUser, setBanDialogUser] = useState<UserWithSpins | null>(null);
  const [banReason, setBanReason] = useState("");
  const queryClient = useQueryClient();
  const today = getTodayDanish();
  const { data: profileData } = useProfileCompletionStats();
  const profileMap = new Map<string, UserProfileStatus>(
    (profileData?.users ?? []).map((u) => [u.user_id, u])
  );

  // Fetch all users with their current spins and ban status
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-user-spins", today],
    queryFn: async (): Promise<UserWithSpins[]> => {
      const [profilesRes, spinsRes, bansRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("user_id, display_name, twitch_username, avatar_url, spin_reel_extra_spins")
          .not("twitch_id", "is", null),
        supabase.from("slot_spins").select("*").eq("date", today),
        supabase.from("user_bans").select("user_id"),
      ]);

      if (profilesRes.error) throw profilesRes.error;
      if (spinsRes.error) throw spinsRes.error;
      // bans query might fail for non-admins, handle gracefully
      const bannedIds = new Set(
        (bansRes.data || []).map((b: { user_id: string }) => b.user_id)
      );

      return profilesRes.data.map((profile) => {
        const spinRecord = spinsRes.data?.find(
          (s) => s.user_id === profile.user_id
        );
        return {
          user_id: profile.user_id,
          display_name: profile.display_name,
          twitch_username: profile.twitch_username,
          avatar_url: profile.avatar_url,
          spins_remaining: spinRecord?.spins_remaining ?? 0,
          date: today,
          spin_record_id: spinRecord?.id ?? null,
          is_banned: bannedIds.has(profile.user_id),
          spin_reel_extra_spins: (profile as any).spin_reel_extra_spins ?? 0,
        };
      });
    },
  });

  // Mutation to update spins
  const updateSpins = useMutation({
    mutationFn: async ({
      userId,
      amount,
      currentSpins,
      recordId,
    }: {
      userId: string;
      amount: number;
      currentSpins: number;
      recordId: string | null;
    }) => {
      const newSpins = Math.max(0, currentSpins + amount);

      if (recordId) {
        const { error } = await supabase
          .from("slot_spins")
          .update({ spins_remaining: newSpins })
          .eq("id", recordId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("slot_spins").insert({
          user_id: userId,
          date: today,
          spins_remaining: newSpins,
        });
        if (error) throw error;
      }

      await supabase.from("credit_allocation_log").insert({
        user_id: userId,
        amount,
        source: "admin_manual",
        note: `Admin: ${amount >= 0 ? "+" : ""}${amount} credits`,
      });

      return { userId, newSpins };
    },
    onSuccess: (data) => {
      toast.success(`Credits opdateret til ${data.newSpins}`);
      queryClient.invalidateQueries({ queryKey: ["admin-user-spins"] });
      queryClient.invalidateQueries({ queryKey: ["credit-allocation-log"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
  });

  // Mutation to give spins to all users
  const giveSpinsToAll = useMutation({
    mutationFn: async (amount: number) => {
      if (!users || users.length === 0) throw new Error("No users found");

      const operations = users.map(async (user) => {
        const newSpins = Math.max(0, user.spins_remaining + amount);

        const spinResult = user.spin_record_id
          ? await supabase
              .from("slot_spins")
              .update({ spins_remaining: newSpins })
              .eq("id", user.spin_record_id)
          : await supabase.from("slot_spins").insert({
              user_id: user.user_id,
              date: today,
              spins_remaining: newSpins,
            });

        if (spinResult.error) return spinResult;

        // Log each allocation
        const actualAmount = newSpins - user.spins_remaining;
        await supabase.from("credit_allocation_log").insert({
          user_id: user.user_id,
          amount: actualAmount,
          source: "admin_manual",
          note: `Bulk: +${amount} credits (fra ${user.spins_remaining} til ${newSpins})`,
        });

        return spinResult;
      });

      const results = await Promise.all(operations);
      const errors = results.filter((r) => r.error);
      if (errors.length > 0) {
        throw new Error(`${errors.length} fejl ved opdatering`);
      }

      return { count: users.length, amount };
    },
    onSuccess: (data) => {
      toast.success(`Gav ${data.amount} credits til ${data.count} brugere`);
      queryClient.invalidateQueries({ queryKey: ["admin-user-spins"] });
      queryClient.invalidateQueries({ queryKey: ["credit-allocation-log"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
  });

  // Ban mutation (uses edge function to also delete leaderboard + credits)
  const banUser = useMutation({
    mutationFn: async ({
      userId,
      reason,
    }: {
      userId: string;
      reason: string;
    }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await supabase.functions.invoke("ban-user", {
        body: { userId, reason },
      });

      if (response.error) throw new Error(response.error.message);
      if (response.data?.error) throw new Error(response.data.error);
    },
    onSuccess: () => {
      toast.success("Bruger banned – leaderboard og credits slettet");
      queryClient.invalidateQueries({ queryKey: ["admin-user-spins"] });
      queryClient.invalidateQueries({ queryKey: ["slot-leaderboard"] });
      setBanDialogUser(null);
      setBanReason("");
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
  });

  // Unban mutation
  const unbanUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("user_bans")
        .delete()
        .eq("user_id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Bruger unbanned");
      queryClient.invalidateQueries({ queryKey: ["admin-user-spins"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
  });

  // Reset Spin the Reel cooldown
  const resetSpinCooldown = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ last_spin_at: null } as any)
        .eq("user_id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Spin the Reel cooldown nulstillet");
      queryClient.invalidateQueries({ queryKey: ["admin-user-spins"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
  });

  // Grant Spin the Reel extra spins
  const grantReelSpins = useMutation({
    mutationFn: async ({ userId, amount }: { userId: string; amount: number }) => {
      // Get current value first
      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("spin_reel_extra_spins")
        .eq("user_id", userId)
        .single();
      if (fetchError) throw fetchError;
      
      const current = (profile as any)?.spin_reel_extra_spins ?? 0;
      const newValue = Math.max(0, current + amount);
      
      const { error } = await supabase
        .from("profiles")
        .update({ spin_reel_extra_spins: newValue } as any)
        .eq("user_id", userId);
      if (error) throw error;
      return { newValue };
    },
    onSuccess: (data) => {
      toast.success(`Spin the Reel spins opdateret til ${data.newValue}`);
      queryClient.invalidateQueries({ queryKey: ["admin-user-spins"] });
    },
    onError: (error: Error) => {
      toast.error(`Fejl: ${error.message}`);
    },
  });

  const handleSpinChange = (
    userId: string,
    amount: number,
    currentSpins: number,
    recordId: string | null
  ) => {
    updateSpins.mutate({ userId, amount, currentSpins, recordId });
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "credits" ? "desc" : "asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />;
    return sortDir === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5" />
    );
  };

  const filteredUsers = users
    ?.filter((user) => {
      const search = searchTerm.toLowerCase();
      return (
        user.display_name?.toLowerCase().includes(search) ||
        user.twitch_username?.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortField === "credits") {
        return (a.spins_remaining - b.spins_remaining) * dir;
      }
      const nameA = (
        a.display_name ||
        a.twitch_username ||
        ""
      ).toLowerCase();
      const nameB = (
        b.display_name ||
        b.twitch_username ||
        ""
      ).toLowerCase();
      return nameA.localeCompare(nameB) * dir;
    });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Brugere
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Giv eller fjern credits fra brugere. Ændringer gælder for dagens
            dato.
          </p>

          {/* Bulk give spins */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg border border-border bg-muted/50">
            <Users className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm font-medium">Giv til alle:</span>
            <Input
              type="number"
              min="1"
              value={bulkSpinAmount}
              onChange={(e) =>
                setBulkSpinAmount(parseInt(e.target.value) || 10)
              }
              className="w-24 text-center"
            />
            <span className="text-sm text-muted-foreground">credits</span>
            <Button
              onClick={() => giveSpinsToAll.mutate(bulkSpinAmount)}
              disabled={
                giveSpinsToAll.isPending || !users || users.length === 0
              }
              className="sm:ml-auto"
            >
              {giveSpinsToAll.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Giv til alle ({users?.length ?? 0})
            </Button>
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Søg efter bruger..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort("name")}
                className="gap-1.5"
              >
                Navn
                <SortIcon field="name" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort("credits")}
                className="gap-1.5"
              >
                Credits
                <SortIcon field="credits" />
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : filteredUsers && filteredUsers.length > 0 ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.user_id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-3 gap-3 ${
                    user.is_banned
                      ? "border-destructive/50 bg-destructive/5"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                        <Coins className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {user.display_name ||
                            user.twitch_username ||
                            "Ukendt"}
                        </p>
                        {user.is_banned && (
                          <Badge
                            variant="destructive"
                            className="text-xs"
                          >
                            Banned
                          </Badge>
                        )}
                      </div>
                      {user.twitch_username &&
                        user.display_name !== user.twitch_username && (
                          <p className="text-xs text-muted-foreground">
                            @{user.twitch_username}
                          </p>
                        )}
                    </div>
                    {/* Profile completion badge */}
                    {(() => {
                      const ps = profileMap.get(user.user_id);
                      if (!ps) return null;
                      return (
                        <div className="flex items-center gap-1.5 mt-1">
                          <Badge variant={ps.is_fully_completed ? "default" : "secondary"} className="text-xs gap-1">
                            {ps.sections_completed}/4
                          </Badge>
                          <div className="flex gap-0.5">
                            {ps.profile_completed ? <Check className="h-3 w-3 text-primary" /> : <X className="h-3 w-3 text-muted-foreground/40" />}
                            {ps.stats_completed ? <Check className="h-3 w-3 text-primary" /> : <X className="h-3 w-3 text-muted-foreground/40" />}
                            {ps.favorites_completed ? <Check className="h-3 w-3 text-primary" /> : <X className="h-3 w-3 text-muted-foreground/40" />}
                            {ps.playstyle_completed ? <Check className="h-3 w-3 text-primary" /> : <X className="h-3 w-3 text-muted-foreground/40" />}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={spinAmounts[user.user_id] ?? 10}
                        onChange={(e) =>
                          setSpinAmounts((prev) => ({
                            ...prev,
                            [user.user_id]: parseInt(e.target.value) || 10,
                          }))
                        }
                        className="w-20 text-center"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          handleSpinChange(
                            user.user_id,
                            -(spinAmounts[user.user_id] ?? 10),
                            user.spins_remaining,
                            user.spin_record_id
                          )
                        }
                        disabled={updateSpins.isPending}
                        className="text-destructive hover:text-destructive"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          handleSpinChange(
                            user.user_id,
                            spinAmounts[user.user_id] ?? 10,
                            user.spins_remaining,
                            user.spin_record_id
                          )
                        }
                        disabled={updateSpins.isPending}
                        className="text-primary hover:text-primary"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="min-w-[80px] text-right">
                      <span className="font-mono font-bold text-primary">
                        {user.spins_remaining}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        credits
                      </span>
                    </div>

                    {/* Spin the Reel spins */}
                    <div className="flex items-center gap-1 border-l border-border pl-2">
                      <Input
                        type="number"
                        min="1"
                        value={reelSpinAmounts[user.user_id] ?? 1}
                        onChange={(e) =>
                          setReelSpinAmounts((prev) => ({
                            ...prev,
                            [user.user_id]: parseInt(e.target.value) || 1,
                          }))
                        }
                        className="w-16 text-center"
                        title="Antal Spin the Reel spins"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          grantReelSpins.mutate({
                            userId: user.user_id,
                            amount: reelSpinAmounts[user.user_id] ?? 1,
                          })
                        }
                        disabled={grantReelSpins.isPending}
                        title="Giv Spin the Reel spins"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-muted-foreground min-w-[40px] text-right">
                        {user.spin_reel_extra_spins} 🎡
                      </span>
                    </div>

                    {/* Ban/Unban button */}
                    {user.is_banned ? (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => unbanUser.mutate(user.user_id)}
                        disabled={unbanUser.isPending}
                        title="Unban bruger"
                        className="text-green-500 hover:text-green-500"
                      >
                        <ShieldCheck className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setBanDialogUser(user)}
                        title="Ban bruger"
                        className="text-destructive hover:text-destructive"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-4">
              {searchTerm
                ? "Ingen brugere fundet"
                : "Ingen Twitch-brugere registreret"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Ban confirmation dialog */}
      <AlertDialog
        open={!!banDialogUser}
        onOpenChange={(open) => {
          if (!open) {
            setBanDialogUser(null);
            setBanReason("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Ban{" "}
              {banDialogUser?.display_name ||
                banDialogUser?.twitch_username ||
                "bruger"}
              ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Brugeren vil ikke længere kunne tilgå siden. Du kan altid unban
              dem senere.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="Årsag (valgfri)..."
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
            className="mt-2"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Annuller</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (banDialogUser) {
                  banUser.mutate({
                    userId: banDialogUser.user_id,
                    reason: banReason,
                  });
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {banUser.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Ban className="h-4 w-4 mr-2" />
              )}
              Ban bruger
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
