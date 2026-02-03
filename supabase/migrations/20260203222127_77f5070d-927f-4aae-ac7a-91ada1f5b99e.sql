-- Drop the view first (it depends on the columns we're altering)
DROP VIEW IF EXISTS slot_leaderboard;

-- Change win_amount from integer to numeric to support decimal wins
ALTER TABLE slot_game_results 
  ALTER COLUMN win_amount TYPE numeric(10,2) USING win_amount::numeric(10,2);

-- Change bonus_win_amount from integer to numeric  
ALTER TABLE slot_game_results 
  ALTER COLUMN bonus_win_amount TYPE numeric(10,2) USING bonus_win_amount::numeric(10,2);

-- Recreate the leaderboard view with numeric types
CREATE VIEW slot_leaderboard AS
SELECT 
  user_id,
  SUM(win_amount + bonus_win_amount)::numeric(10,2) as total_winnings,
  MAX(win_amount + bonus_win_amount)::numeric(10,2) as biggest_win,
  COUNT(*)::bigint as total_spins,
  SUM(CASE WHEN created_at >= CURRENT_DATE THEN win_amount + bonus_win_amount ELSE 0 END)::numeric(10,2) as daily_winnings,
  SUM(CASE WHEN created_at >= date_trunc('week', CURRENT_DATE) THEN win_amount + bonus_win_amount ELSE 0 END)::numeric(10,2) as weekly_winnings
FROM slot_game_results
GROUP BY user_id;