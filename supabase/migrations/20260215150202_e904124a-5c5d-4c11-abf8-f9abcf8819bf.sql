-- Allow anyone to view tournaments (read-only)
DROP POLICY IF EXISTS "Authenticated users can view tournaments" ON public.tournaments;
CREATE POLICY "Anyone can view tournaments"
  ON public.tournaments FOR SELECT
  USING (true);

-- Allow anyone to view tournament participants (read-only)
DROP POLICY IF EXISTS "Authenticated users can view participants" ON public.tournament_participants;
CREATE POLICY "Anyone can view participants"
  ON public.tournament_participants FOR SELECT
  USING (true);

-- Allow anyone to view tournament entries (read-only)
DROP POLICY IF EXISTS "Authenticated users can view tournament entries" ON public.tournament_entries;
CREATE POLICY "Anyone can view tournament entries"
  ON public.tournament_entries FOR SELECT
  USING (true);