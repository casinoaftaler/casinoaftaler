import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useActiveRaffle() {
  return useQuery({
    queryKey: ["active-raffle"],
    queryFn: async () => {
      // First ensure there's an active raffle
      await supabase.rpc("ensure_active_raffle");

      const { data, error } = await supabase
        .from("raffles")
        .select("*")
        .eq("status", "active")
        .gt("ends_at", new Date().toISOString())
        .order("ends_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    refetchInterval: 10_000,
    staleTime: 5_000,
  });
}

export function useRaffleEntries(raffleId: string | undefined) {
  return useQuery({
    queryKey: ["raffle-entries", raffleId],
    queryFn: async () => {
      if (!raffleId) return [];
      const { data, error } = await supabase
        .from("raffle_entries")
        .select("id, user_id, created_at")
        .eq("raffle_id", raffleId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Fetch profiles for entries
      const userIds = data.map((e) => e.user_id);
      if (userIds.length === 0) return [];

      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profiles ?? []).map((p) => [p.user_id, p])
      );

      return data.map((entry) => ({
        ...entry,
        profile: profileMap.get(entry.user_id) ?? null,
      }));
    },
    enabled: !!raffleId,
    refetchInterval: 10_000,
  });
}

export function useJoinRaffle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (raffleId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("raffle_entries")
        .insert({ raffle_id: raffleId, user_id: user.id });

      if (error) {
        if (error.code === "23505") throw new Error("Du deltager allerede i denne raffle");
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Du er nu med i denne raffle! 🎉");
      qc.invalidateQueries({ queryKey: ["raffle-entries"] });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}

export function useRecentRaffleWinners() {
  return useQuery({
    queryKey: ["raffle-winners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("raffles")
        .select("id, prize_credits, ends_at, winner_id")
        .eq("status", "completed")
        .not("winner_id", "is", null)
        .order("ends_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      if (!data || data.length === 0) return [];

      const winnerIds = [...new Set(data.map((r) => r.winner_id!))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url")
        .in("user_id", winnerIds);

      const profileMap = new Map(
        (profiles ?? []).map((p) => [p.user_id, p])
      );

      return data.map((raffle) => ({
        ...raffle,
        winner_profile: profileMap.get(raffle.winner_id!) ?? null,
      }));
    },
    staleTime: 30_000,
  });
}
