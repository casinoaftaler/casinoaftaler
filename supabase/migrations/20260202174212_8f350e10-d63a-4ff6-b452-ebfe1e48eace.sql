-- Fix the leaderboard view to use SECURITY INVOKER (default, safer)
DROP VIEW IF EXISTS public.slot_leaderboard;

CREATE VIEW public.slot_leaderboard 
WITH (security_invoker = true) AS
SELECT 
  user_id,
  SUM(win_amount) as total_winnings,
  MAX(win_amount) as biggest_win,
  COUNT(*) as total_spins,
  SUM(CASE WHEN created_at::date = CURRENT_DATE THEN win_amount ELSE 0 END) as daily_winnings,
  SUM(CASE WHEN created_at >= date_trunc('week', CURRENT_DATE) THEN win_amount ELSE 0 END) as weekly_winnings
FROM public.slot_game_results
GROUP BY user_id;

-- Create a separate public leaderboard policy that allows reading aggregated data
CREATE POLICY "Anyone can view leaderboard"
ON public.slot_game_results FOR SELECT
USING (true);