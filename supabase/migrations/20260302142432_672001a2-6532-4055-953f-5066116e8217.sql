
-- Drop and recreate the materialized view with monthly_biggest_win and monthly_biggest_multiplier
DROP MATERIALIZED VIEW IF EXISTS public.slot_leaderboard;

CREATE MATERIALIZED VIEW public.slot_leaderboard AS
SELECT 
  user_id,
  sum(win_amount + bonus_win_amount) AS total_winnings,
  max(win_amount + bonus_win_amount) AS biggest_win,
  max(
    CASE
      WHEN bet_amount > 0 THEN (win_amount + bonus_win_amount) / bet_amount::numeric
      ELSE 0::numeric
    END
  ) AS biggest_multiplier,
  count(*) AS total_spins,
  count(*) FILTER (WHERE is_bonus_triggered) AS total_bonuses,
  COALESCE(sum(win_amount + bonus_win_amount) FILTER (WHERE created_at >= (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text)), 0::numeric) AS daily_winnings,
  COALESCE(sum(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('week'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text))), 0::numeric) AS weekly_winnings,
  COALESCE(sum(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text))), 0::numeric) AS monthly_winnings,
  -- NEW: Monthly biggest win (single spin/bonus)
  COALESCE(max(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text))), 0::numeric) AS monthly_biggest_win,
  -- NEW: Monthly biggest multiplier
  COALESCE(max(
    CASE
      WHEN bet_amount > 0 THEN (win_amount + bonus_win_amount) / bet_amount::numeric
      ELSE 0::numeric
    END
  ) FILTER (WHERE created_at >= date_trunc('month'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text))), 0::numeric) AS monthly_biggest_multiplier
FROM slot_game_results
GROUP BY user_id;

-- Recreate the unique index for CONCURRENTLY refresh
CREATE UNIQUE INDEX slot_leaderboard_user_id_idx ON public.slot_leaderboard (user_id);

-- Add indexes for sorting by the new monthly columns
CREATE INDEX slot_leaderboard_monthly_biggest_win_idx ON public.slot_leaderboard (monthly_biggest_win DESC);
CREATE INDEX slot_leaderboard_monthly_biggest_multiplier_idx ON public.slot_leaderboard (monthly_biggest_multiplier DESC);
CREATE INDEX slot_leaderboard_monthly_winnings_idx ON public.slot_leaderboard (monthly_winnings DESC);
