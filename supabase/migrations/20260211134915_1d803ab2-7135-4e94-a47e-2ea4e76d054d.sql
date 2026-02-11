DROP VIEW IF EXISTS public.slot_leaderboard;

CREATE VIEW public.slot_leaderboard WITH (security_invoker=on) AS
SELECT
  user_id,
  SUM(win_amount + bonus_win_amount) AS total_winnings,
  MAX(win_amount + bonus_win_amount) AS biggest_win,
  MAX((win_amount + bonus_win_amount) / NULLIF(bet_amount, 0)) AS biggest_multiplier,
  COUNT(*) AS total_spins,
  COUNT(*) FILTER (WHERE is_bonus_triggered = true) AS total_bonuses,
  SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= CURRENT_DATE) AS daily_winnings,
  SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('week', CURRENT_DATE)) AS weekly_winnings,
  SUM(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE)) AS monthly_winnings
FROM public.slot_game_results
GROUP BY user_id;