
CREATE OR REPLACE FUNCTION public.get_community_stats()
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT jsonb_build_object(
    'active_members', (SELECT COUNT(*) FROM profiles WHERE twitch_id IS NOT NULL),
    'total_spins', (SELECT COUNT(*) FROM slot_game_results),
    'tournaments_this_month', (SELECT COUNT(*) FROM tournaments WHERE created_at >= date_trunc('month', now()))
  );
$$;
