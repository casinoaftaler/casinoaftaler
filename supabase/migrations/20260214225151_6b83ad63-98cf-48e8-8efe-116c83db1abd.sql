
-- Drop the existing regular view
DROP VIEW IF EXISTS public.slot_leaderboard;

-- Create materialized view with pre-computed data
CREATE MATERIALIZED VIEW public.slot_leaderboard AS
SELECT
  user_id,
  SUM(win_amount + bonus_win_amount) AS total_winnings,
  MAX(win_amount + bonus_win_amount) AS biggest_win,
  MAX(CASE WHEN bet_amount > 0 THEN (win_amount + bonus_win_amount) / bet_amount ELSE 0 END) AS biggest_multiplier,
  COUNT(*)::bigint AS total_spins,
  COUNT(*) FILTER (WHERE is_bonus_triggered)::bigint AS total_bonuses,
  COALESCE(SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen')), 0) AS daily_winnings,
  COALESCE(SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('week', CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen')), 0) AS weekly_winnings,
  COALESCE(SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen')), 0) AS monthly_winnings
FROM public.slot_game_results
GROUP BY user_id;

-- Unique index required for CONCURRENTLY refresh
CREATE UNIQUE INDEX idx_slot_leaderboard_user_id ON public.slot_leaderboard (user_id);

-- Indexes for fast sorting by period
CREATE INDEX idx_slot_leaderboard_total ON public.slot_leaderboard (total_winnings DESC);
CREATE INDEX idx_slot_leaderboard_daily ON public.slot_leaderboard (daily_winnings DESC);
CREATE INDEX idx_slot_leaderboard_weekly ON public.slot_leaderboard (weekly_winnings DESC);
CREATE INDEX idx_slot_leaderboard_monthly ON public.slot_leaderboard (monthly_winnings DESC);

-- Grant read access (same as before)
GRANT SELECT ON public.slot_leaderboard TO anon, authenticated;

-- Function to refresh the materialized view
CREATE OR REPLACE FUNCTION public.refresh_slot_leaderboard()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.slot_leaderboard;
END;
$$;

-- Enable pg_cron and pg_net for scheduled refresh
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
