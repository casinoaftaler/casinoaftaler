-- Drop and recreate the slot_leaderboard view with biggest_multiplier
DROP VIEW IF EXISTS public.slot_leaderboard;

CREATE VIEW public.slot_leaderboard AS
SELECT 
  user_id,
  SUM(win_amount)::numeric as total_winnings,
  MAX(win_amount)::numeric as biggest_win,
  MAX(CASE WHEN bet_amount > 0 THEN win_amount / bet_amount ELSE 0 END)::numeric as biggest_multiplier,
  COUNT(*) as total_spins,
  SUM(CASE WHEN created_at >= CURRENT_DATE THEN win_amount ELSE 0 END)::numeric as daily_winnings,
  SUM(CASE WHEN created_at >= date_trunc('week', CURRENT_DATE) THEN win_amount ELSE 0 END)::numeric as weekly_winnings
FROM public.slot_game_results
GROUP BY user_id;