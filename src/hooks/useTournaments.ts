import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface Tournament {
  id: string;
  title: string;
  description: string | null;
  prize_text: string | null;
  game_ids: string[];
  separate_leaderboards: boolean;
  starts_at: string;
  ends_at: string;
  status: string;
  created_by: string;
  created_at: string;
  max_credits: number | null;
  exclude_from_global_leaderboard: boolean;
  is_monthly: boolean;
}

export interface TournamentEntry {
  id: string;
  tournament_id: string;
  user_id: string;
  game_id: string;
  total_points: number;
  total_spins: number;
  biggest_win: number;
  biggest_multiplier: number;
  total_credits_used: number;
  updated_at: string;
  display_name?: string;
  avatar_url?: string;
  twitch_badges?: Record<string, unknown> | null;
}

function computeStatus(t: { starts_at: string; ends_at: string; status: string }): string {
  const now = new Date();
  const start = new Date(t.starts_at);
  const end = new Date(t.ends_at);
  if (now < start) return "upcoming";
  if (now >= start && now < end) return "active";
  return "ended";
}

export function useTournaments() {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .order("starts_at", { ascending: false });
      if (error) throw error;
      return (data as Tournament[]).map((t) => ({
        ...t,
        status: computeStatus(t),
      }));
    },
    refetchInterval: 30000,
  });
}

export interface TournamentParticipant {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  joined_at: string;
}

export function useTournamentParticipants(tournamentId: string | undefined) {
  return useQuery({
    queryKey: ["tournament-participants", tournamentId],
    queryFn: async (): Promise<TournamentParticipant[]> => {
      if (!tournamentId) return [];
      const { data: participants, error } = await supabase
        .from("tournament_participants")
        .select("user_id, joined_at")
        .eq("tournament_id", tournamentId);
      if (error) throw error;
      if (!participants || participants.length === 0) return [];

      const userIds = participants.map((p) => p.user_id);
      const { data: profiles } = await supabase
        .from("profiles_leaderboard")
        .select("user_id, display_name, avatar_url")
        .in("user_id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.user_id, p])
      );

      return participants.map((p) => {
        const profile = profileMap.get(p.user_id);
        return {
          user_id: p.user_id,
          display_name: profile?.display_name || "Anonym",
          avatar_url: profile?.avatar_url || null,
          joined_at: p.joined_at,
        };
      });
    },
    enabled: !!tournamentId,
    refetchInterval: 15000,
  });
}

export function useTournamentParticipation(tournamentId: string | undefined) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["tournament-participation", tournamentId, user?.id],
    queryFn: async () => {
      if (!tournamentId || !user?.id) return false;
      const { data } = await supabase
        .from("tournament_participants")
        .select("id")
        .eq("tournament_id", tournamentId)
        .eq("user_id", user.id)
        .maybeSingle();
      return !!data;
    },
    enabled: !!tournamentId && !!user?.id,
  });
}

export function useJoinTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tournamentId: string) => {
      const { data, error } = await supabase.functions.invoke("join-tournament", {
        body: { tournament_id: tournamentId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data as { success: boolean; creditsAwarded: number; newBalance: number };
    },
    onSuccess: (_data, tournamentId) => {
      queryClient.invalidateQueries({ queryKey: ["tournament-participation", tournamentId] });
      queryClient.invalidateQueries({ queryKey: ["tournament-leaderboard", tournamentId] });
      queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
    },
  });
}

export function useTournamentLeaderboard(tournamentId: string | undefined, gameId?: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["tournament-leaderboard", tournamentId, gameId],
    queryFn: async () => {
      if (!tournamentId) return { entries: [], currentUser: null };

      let query = supabase
        .from("tournament_entries")
        .select("*")
        .eq("tournament_id", tournamentId)
        .order("total_points", { ascending: false });

      if (gameId) {
        query = query.eq("game_id", gameId);
      }

      const { data: entries, error } = await query;
      if (error) throw error;

      let aggregated: TournamentEntry[] = [];
      if (!gameId && entries) {
        const userMap = new Map<string, TournamentEntry>();
        for (const e of entries as TournamentEntry[]) {
          const existing = userMap.get(e.user_id);
          if (existing) {
            existing.total_points += Number(e.total_points);
            existing.total_spins += e.total_spins;
            existing.biggest_win = Math.max(existing.biggest_win, Number(e.biggest_win));
            existing.biggest_multiplier = Math.max(existing.biggest_multiplier, Number(e.biggest_multiplier));
            existing.total_credits_used = (existing.total_credits_used || 0) + Number(e.total_credits_used || 0);
          } else {
            userMap.set(e.user_id, { ...e, total_points: Number(e.total_points), biggest_win: Number(e.biggest_win), biggest_multiplier: Number(e.biggest_multiplier), total_credits_used: Number(e.total_credits_used || 0) });
          }
        }
        aggregated = Array.from(userMap.values()).sort((a, b) => b.total_points - a.total_points);
      } else {
        aggregated = ((entries || []) as TournamentEntry[]).map(e => ({ ...e, total_points: Number(e.total_points), biggest_win: Number(e.biggest_win), biggest_multiplier: Number(e.biggest_multiplier), total_credits_used: Number(e.total_credits_used || 0) }));
      }

      const userIds = aggregated.map((e) => e.user_id);
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles_leaderboard")
          .select("user_id, display_name, avatar_url, twitch_badges")
          .in("user_id", userIds);

        const profileMap = new Map(
          (profiles || []).map((p) => [p.user_id, p])
        );
        for (const entry of aggregated) {
          const profile = profileMap.get(entry.user_id);
          if (profile) {
            entry.display_name = profile.display_name || "Anonym";
            entry.avatar_url = profile.avatar_url || undefined;
            entry.twitch_badges = (profile as any).twitch_badges as Record<string, unknown> | null;
          } else {
            entry.display_name = "Anonym";
          }
        }
      }

      let currentUser = null;
      if (user) {
        const rank = aggregated.findIndex((e) => e.user_id === user.id);
        if (rank >= 0) {
          currentUser = { entry: aggregated[rank], rank: rank + 1 };
        }
      }

      return { entries: aggregated, currentUser };
    },
    enabled: !!tournamentId,
    refetchInterval: 15000,
  });
}

export function useCreateTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tournament: {
      title: string;
      description?: string;
      prize_text?: string;
      game_ids: string[];
      separate_leaderboards: boolean;
      starts_at: string;
      ends_at: string;
      created_by: string;
      max_credits?: number | null;
      exclude_from_global_leaderboard?: boolean;
    }) => {
      const status = new Date(tournament.starts_at) <= new Date() ? "active" : "upcoming";
      const { data, error } = await supabase
        .from("tournaments")
        .insert({ ...tournament, status })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tournaments"] }),
  });
}

export function useEndTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tournamentId: string) => {
      const { error } = await supabase
        .from("tournaments")
        .update({ status: "ended", ends_at: new Date().toISOString() })
        .eq("id", tournamentId);
      if (error) throw error;

      // Trigger clawback of unused tournament credits
      await supabase.functions.invoke("update-tournament-status");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tournaments"] });
      queryClient.invalidateQueries({ queryKey: ["slot-spins"] });
    },
  });
}

export function useDeleteTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tournamentId: string) => {
      const { error } = await supabase
        .from("tournaments")
        .delete()
        .eq("id", tournamentId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tournaments"] }),
  });
}

export function useUpdateTournament() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: {
      id: string;
      title?: string;
      description?: string | null;
      prize_text?: string | null;
      game_ids?: string[];
      separate_leaderboards?: boolean;
      starts_at?: string;
      ends_at?: string;
      max_credits?: number | null;
      exclude_from_global_leaderboard?: boolean;
    }) => {
      const { error } = await supabase
        .from("tournaments")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tournaments"] }),
  });
}
