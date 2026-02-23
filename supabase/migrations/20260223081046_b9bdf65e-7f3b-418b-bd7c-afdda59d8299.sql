
-- The restrictive policies already exist, just drop the overly permissive one
DROP POLICY IF EXISTS "Anyone can view leaderboard" ON public.slot_game_results;
