
-- Step 1: Drop the public leaderboard policy
DROP POLICY IF EXISTS "Anyone can view leaderboard" ON public.slot_game_results;

-- Step 2: Create authenticated-only leaderboard policy
CREATE POLICY "Authenticated users can view leaderboard"
ON public.slot_game_results
FOR SELECT
USING (auth.uid() IS NOT NULL);
