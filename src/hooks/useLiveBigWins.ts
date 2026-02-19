import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface BigWin {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string | null;
  slotName: string;
  betAmount: number;
  winAmount: number;
  winMultiplier: number;
  timestamp: number;
}

const GAME_LABELS: Record<string, string> = {
  "book-of-fedesvin": "Book of Fedesvin",
  "rise-of-fedesvin": "Rise of Fedesvin",
};

const MAX_WINS = 10;
const MIN_MULTIPLIER = 100;
const ANTI_SPAM_MS = 30_000;
const STORAGE_KEY = "live_big_wins";
const WIN_TTL_MS = 10 * 60 * 1000; // 10 minutes

function loadPersistedWins(): BigWin[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const wins = JSON.parse(raw) as BigWin[];
    // Filter out wins older than 10 minutes on load
    const now = Date.now();
    return wins.filter((w) => now - w.timestamp < WIN_TTL_MS);
  } catch {
    return [];
  }
}

function persistWins(wins: BigWin[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wins));
  } catch { /* ignore */ }
}

export function useLiveBigWins() {
  const [wins, setWins] = useState<BigWin[]>(() => loadPersistedWins());
  const lastUserTimestamp = useRef<Map<string, number>>(new Map());

  // Auto-remove wins older than 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setWins((prev) => {
        const next = prev.filter((w) => now - w.timestamp < WIN_TTL_MS);
        if (next.length !== prev.length) persistWins(next);
        return next;
      });
    }, 60_000); // check every minute
    return () => clearInterval(interval);
  }, []);

  const addWin = useCallback((win: BigWin) => {
    const now = Date.now();
    const lastSeen = lastUserTimestamp.current.get(win.userId) || 0;
    if (now - lastSeen < ANTI_SPAM_MS) return;

    lastUserTimestamp.current.set(win.userId, now);

    setWins((prev) => {
      const next = [...prev, win];
      const trimmed = next.length > MAX_WINS ? next.slice(next.length - MAX_WINS) : next;
      persistWins(trimmed);
      return trimmed;
    });
  }, []);

  // Persist on remove too
  const removeWin = useCallback((id: string) => {
    setWins((prev) => {
      const next = prev.filter((w) => w.id !== id);
      persistWins(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("live-big-wins")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "slot_game_results",
        },
        async (payload) => {
          const row = payload.new as {
            id: string;
            user_id: string;
            bet_amount: number;
            win_amount: number;
            bonus_win_amount: number;
            game_id: string;
            created_at: string;
          };

          const totalWin = Number(row.win_amount) + Number(row.bonus_win_amount);
          const bonusWin = Number(row.bonus_win_amount);
          const multiplier = row.bet_amount > 0 ? totalWin / row.bet_amount : 0;
          const bonusMultiplier = row.bet_amount > 0 ? bonusWin / row.bet_amount : 0;

          // Show if total multiplier >= 100x OR bonus-only multiplier >= 200x
          if (multiplier < MIN_MULTIPLIER && bonusMultiplier < 200) return;

          // Fetch profile info
          const { data: profile } = await supabase
            .from("profiles_leaderboard")
            .select("display_name, avatar_url")
            .eq("user_id", row.user_id)
            .single();

          const bigWin: BigWin = {
            id: row.id,
            userId: row.user_id,
            username: profile?.display_name || "Anonym",
            avatarUrl: profile?.avatar_url || null,
            slotName: GAME_LABELS[row.game_id] || row.game_id,
            betAmount: row.bet_amount,
            winAmount: totalWin,
            winMultiplier: Math.round(multiplier * 10) / 10,
            timestamp: Date.now(),
          };

          addWin(bigWin);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [addWin]);

  return { wins, removeWin };
}
