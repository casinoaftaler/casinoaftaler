import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Loader2, Search, Plus, Minus, Users } from "lucide-react";
import { toast } from "sonner";
import { getTodayDanish } from "@/lib/danishDate";

interface UserWithSpins {
  user_id: string;
  display_name: string | null;
  twitch_username: string | null;
  avatar_url: string | null;
  spins_remaining: number;
  date: string;
  spin_record_id: string | null;
}

export function SpinManagementSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [spinAmounts, setSpinAmounts] = useState<Record<string, number>>({});
  const [bulkSpinAmount, setBulkSpinAmount] = useState(10);
  const queryClient = useQueryClient();
  const today = getTodayDanish();

  // Fetch all users with their current spins
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-user-spins", today],
    queryFn: async (): Promise<UserWithSpins[]> => {
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("user_id, display_name, twitch_username, avatar_url")
        .not("twitch_id", "is", null);

      if (profilesError) throw profilesError;

      // Get today's spin records
      const { data: spins, error: spinsError } = await supabase
        .from("slot_spins")
        .select("*")
        .eq("date", today);

      if (spinsError) throw spinsError;

      // Combine the data
      return profiles.map((profile) => {
        const spinRecord = spins?.find((s) => s.user_id === profile.user_id);
        return {
          user_id: profile.user_id,
          display_name: profile.display_name,
          twitch_username: profile.twitch_username,
          avatar_url: profile.avatar_url,
          spins_remaining: spinRecord?.spins_remaining ?? 0,
          date: today,
          spin_record_id: spinRecord?.id ?? null,
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

      // Log the admin credit change
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

        if (user.spin_record_id) {
          return supabase
            .from("slot_spins")
            .update({ spins_remaining: newSpins })
            .eq("id", user.spin_record_id);
        } else {
          return supabase.from("slot_spins").insert({
            user_id: user.user_id,
            date: today,
            spins_remaining: newSpins,
          });
        }
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

  const handleSpinChange = (
    userId: string,
    amount: number,
    currentSpins: number,
    recordId: string | null
  ) => {
    updateSpins.mutate({ userId, amount, currentSpins, recordId });
  };

  const filteredUsers = users?.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.display_name?.toLowerCase().includes(search) ||
      user.twitch_username?.toLowerCase().includes(search)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Giv Credits til Brugere
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Giv eller fjern credits fra brugere. Ændringer gælder for dagens dato.
        </p>

        {/* Bulk give spins */}
        <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/50">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">Giv til alle:</span>
          <Input
            type="number"
            min="1"
            value={bulkSpinAmount}
            onChange={(e) => setBulkSpinAmount(parseInt(e.target.value) || 10)}
            className="w-24 text-center"
          />
          <span className="text-sm text-muted-foreground">credits</span>
          <Button
            onClick={() => giveSpinsToAll.mutate(bulkSpinAmount)}
            disabled={giveSpinsToAll.isPending || !users || users.length === 0}
            className="ml-auto"
          >
            {giveSpinsToAll.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Giv til alle ({users?.length ?? 0})
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Søg efter bruger..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.user_id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div className="flex items-center gap-3">
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Coins className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">
                      {user.display_name || user.twitch_username || "Ukendt"}
                    </p>
                    {user.twitch_username && user.display_name !== user.twitch_username && (
                      <p className="text-xs text-muted-foreground">
                        @{user.twitch_username}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
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
                    <span className="text-muted-foreground text-sm"> credits</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground py-4">
            {searchTerm ? "Ingen brugere fundet" : "Ingen Twitch-brugere registreret"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
