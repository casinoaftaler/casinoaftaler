
-- 1. Create per-game monthly leaderboard materialized view
CREATE MATERIALIZED VIEW public.slot_leaderboard_by_game AS
SELECT 
  user_id,
  game_id,
  COALESCE(sum(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text))), 0::numeric) AS monthly_winnings,
  COALESCE(max(win_amount + bonus_win_amount) FILTER (WHERE created_at >= date_trunc('month'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text))), 0::numeric) AS monthly_biggest_win,
  COALESCE(max(
    CASE
      WHEN bet_amount > 0 THEN (win_amount + bonus_win_amount) / bet_amount::numeric
      ELSE 0::numeric
    END
  ) FILTER (WHERE created_at >= date_trunc('month'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text))), 0::numeric) AS monthly_biggest_multiplier,
  count(*) FILTER (WHERE created_at >= date_trunc('month'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text)))::integer AS monthly_spins,
  count(*) FILTER (WHERE is_bonus_triggered AND created_at >= date_trunc('month'::text, (CURRENT_DATE AT TIME ZONE 'Europe/Copenhagen'::text)))::integer AS monthly_bonuses
FROM slot_game_results
GROUP BY user_id, game_id;

CREATE UNIQUE INDEX slot_leaderboard_by_game_uid_gid_idx ON public.slot_leaderboard_by_game (user_id, game_id);
CREATE INDEX slot_leaderboard_by_game_monthly_winnings_idx ON public.slot_leaderboard_by_game (game_id, monthly_winnings DESC);
CREATE INDEX slot_leaderboard_by_game_monthly_biggest_win_idx ON public.slot_leaderboard_by_game (game_id, monthly_biggest_win DESC);
CREATE INDEX slot_leaderboard_by_game_monthly_biggest_multiplier_idx ON public.slot_leaderboard_by_game (game_id, monthly_biggest_multiplier DESC);

-- 2. Update refresh function to refresh both views
CREATE OR REPLACE FUNCTION public.refresh_slot_leaderboard()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.slot_leaderboard;
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.slot_leaderboard_by_game;
END;
$function$;

-- 3. Create monthly_tournament_config table
CREATE TABLE public.monthly_tournament_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  game_id text NOT NULL,
  game_name text NOT NULL,
  prize_1 integer NOT NULL DEFAULT 500,
  prize_2 integer NOT NULL DEFAULT 300,
  prize_3 integer NOT NULL DEFAULT 200,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(category)
);

ALTER TABLE public.monthly_tournament_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tournament config"
  ON public.monthly_tournament_config FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tournament config"
  ON public.monthly_tournament_config FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. Seed with current 3 configs
INSERT INTO public.monthly_tournament_config (category, game_id, game_name, prize_1, prize_2, prize_3) VALUES
  ('total_points', 'fedesvin-bonanza', 'Fedesvin Bonanza', 500, 300, 200),
  ('highest_x', 'book-of-fedesvin', 'Book of Fedesvin', 500, 300, 200),
  ('highest_win', 'rise-of-fedesvin', 'Rise of Fedesvin', 500, 300, 200);
