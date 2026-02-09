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

export function useLiveBigWins() {
  const [wins, setWins] = useState<BigWin[]>([]);
  const lastUserTimestamp = useRef<Map<string, number>>(new Map());

  const addWin = useCallback((win: BigWin) => {
    const now = Date.now();
    const lastSeen = lastUserTimestamp.current.get(win.userId) || 0;
    if (now - lastSeen < ANTI_SPAM_MS) return;

    lastUserTimestamp.current.set(win.userId, now);

    setWins((prev) => {
      const next = [...prev, win];
      if (next.length > MAX_WINS) {
        return next.slice(next.length - MAX_WINS);
      }
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

  const removeWin = useCallback((id: string) => {
    setWins((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return { wins, removeWin };
}
