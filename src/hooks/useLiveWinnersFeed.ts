import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const GAME_LABELS: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
  "gates-of-fedesvin": "Gates of Fedesvin",
  "fedesvin-bonanza": "Fedesvin Bonanza",
};

export type FeedEventType = "big_win" | "overtake";

export interface FeedEvent {
  id: string;
  type: FeedEventType;
  timestamp: string;
  // Big win fields
  userName?: string;
  avatarUrl?: string | null;
  winAmount?: number;
  multiplier?: number;
  gameId?: string;
  gameName?: string;
  // Overtake fields
  overtakerName?: string;
  overtakerAvatar?: string | null;
  previousHolderName?: string;
  newRank?: number;
}

interface LeaderboardSnapshot {
  [gameId: string]: { user_id: string; display_name: string; total: number }[];
}

const MAX_EVENTS = 15;
const BIG_WIN_THRESHOLD = 100;
const LEADERBOARD_POLL_MS = 60_000;

export function useLiveWinnersFeed() {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const leaderboardRef = useRef<LeaderboardSnapshot>({});
  const profileCacheRef = useRef<Map<string, { display_name: string; avatar_url: string | null }>>(new Map());

  const addEvent = useCallback((event: FeedEvent) => {
    setEvents((prev) => [event, ...prev].slice(0, MAX_EVENTS));
  }, []);

  // Fetch profile info, with caching
  const getProfile = useCallback(async (userId: string) => {
    if (profileCacheRef.current.has(userId)) {
      return profileCacheRef.current.get(userId)!;
    }
    const { data } = await supabase
      .from("profiles_leaderboard")
      .select("user_id, display_name, avatar_url")
      .eq("user_id", userId)
      .single();
    const profile = {
      display_name: data?.display_name || "Anonym",
      avatar_url: data?.avatar_url || null,
    };
    profileCacheRef.current.set(userId, profile);
    return profile;
  }, []);

  // Fetch top 5 per game for leaderboard comparison
  const fetchLeaderboard = useCallback(async () => {
    const gameIds = Object.keys(GAME_LABELS);
    const snapshot: LeaderboardSnapshot = {};

    for (const gameId of gameIds) {
      const { data } = await supabase
        .from("slot_game_results")
        .select("user_id, win_amount")
        .eq("game_id", gameId)
        .gt("win_amount", 0)
        .order("created_at", { ascending: false })
        .limit(1000);

      if (!data) {
        snapshot[gameId] = [];
        continue;
      }

      // Aggregate total winnings per user
      const userTotals = new Map<string, number>();
      data.forEach((r) => {
        userTotals.set(r.user_id, (userTotals.get(r.user_id) || 0) + Number(r.win_amount));
      });

      // Sort and get top 5
      const sorted = [...userTotals.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      const profiles = await Promise.all(
        sorted.map(async ([uid, total]) => {
          const p = await getProfile(uid);
          return { user_id: uid, display_name: p.display_name, total };
        })
      );

      snapshot[gameId] = profiles;
    }

    return snapshot;
  }, [getProfile]);

  // Compare leaderboard snapshots for overtakes
  const checkOvertakes = useCallback(
    (oldSnap: LeaderboardSnapshot, newSnap: LeaderboardSnapshot) => {
      for (const gameId of Object.keys(newSnap)) {
        const oldTop = oldSnap[gameId] || [];
        const newTop = newSnap[gameId] || [];

        for (let rank = 0; rank < newTop.length; rank++) {
          const newEntry = newTop[rank];
          const oldEntry = oldTop[rank];

          if (!oldEntry) continue;
          if (newEntry.user_id === oldEntry.user_id) continue;

          // Someone new is at this rank — check if they moved UP
          const oldRankOfNew = oldTop.findIndex((e) => e.user_id === newEntry.user_id);
          if (oldRankOfNew === -1 || oldRankOfNew > rank) {
            addEvent({
              id: `overtake-${gameId}-${rank}-${Date.now()}`,
              type: "overtake",
              timestamp: new Date().toISOString(),
              overtakerName: newEntry.display_name,
              overtakerAvatar: null,
              previousHolderName: oldEntry.display_name,
              newRank: rank + 1,
              gameId,
              gameName: GAME_LABELS[gameId] || gameId,
            });
          }
        }
      }
    },
    [addEvent]
  );

  // Initial load: recent big wins
  useEffect(() => {
    async function loadInitial() {
      const { data } = await supabase
        .from("slot_game_results")
        .select("id, user_id, bet_amount, win_amount, game_id, created_at")
        .gt("win_amount", 0)
        .order("created_at", { ascending: false })
        .limit(200);

      if (!data) return;

      const bigWins = data.filter((r) => {
        if (r.bet_amount <= 0) return false;
        return Number(r.win_amount) / r.bet_amount >= BIG_WIN_THRESHOLD;
      }).slice(0, 10);

      const initialEvents: FeedEvent[] = [];
      for (const r of bigWins) {
        const profile = await getProfile(r.user_id);
        const multiplier = r.bet_amount > 0 ? Math.round(Number(r.win_amount) / r.bet_amount) : 0;
        initialEvents.push({
          id: r.id,
          type: "big_win",
          timestamp: r.created_at,
          userName: profile.display_name,
          avatarUrl: profile.avatar_url,
          winAmount: Number(r.win_amount),
          multiplier,
          gameId: r.game_id ?? undefined,
          gameName: r.game_id ? GAME_LABELS[r.game_id] || r.game_id : "Ukendt",
        });
      }

      setEvents(initialEvents);

      // Initial leaderboard snapshot
      const snap = await fetchLeaderboard();
      leaderboardRef.current = snap;
    }

    loadInitial();
  }, [getProfile, fetchLeaderboard]);

  // Realtime listener for new big wins
  useEffect(() => {
    const channel = supabase
      .channel("live-winners-feed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "slot_game_results",
        },
        async (payload) => {
          const r = payload.new as any;
          if (!r.win_amount || !r.bet_amount || r.bet_amount <= 0) return;

          const multiplier = Number(r.win_amount) / r.bet_amount;
          if (multiplier < BIG_WIN_THRESHOLD) return;

          const profile = await getProfile(r.user_id);
          addEvent({
            id: r.id,
            type: "big_win",
            timestamp: r.created_at,
            userName: profile.display_name,
            avatarUrl: profile.avatar_url,
            winAmount: Number(r.win_amount),
            multiplier: Math.round(multiplier),
            gameId: r.game_id ?? undefined,
            gameName: r.game_id ? GAME_LABELS[r.game_id] || r.game_id : "Ukendt",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [getProfile, addEvent]);

  // Leaderboard polling for overtakes
  useEffect(() => {
    const interval = setInterval(async () => {
      const newSnap = await fetchLeaderboard();
      checkOvertakes(leaderboardRef.current, newSnap);
      leaderboardRef.current = newSnap;
    }, LEADERBOARD_POLL_MS);

    return () => clearInterval(interval);
  }, [fetchLeaderboard, checkOvertakes]);

  return { events, gameLabels: GAME_LABELS };
}
