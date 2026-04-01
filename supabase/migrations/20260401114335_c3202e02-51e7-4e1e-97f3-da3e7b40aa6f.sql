CREATE OR REPLACE FUNCTION public.get_community_stats()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT jsonb_build_object(
    'active_members', (SELECT COUNT(*) FROM profiles WHERE twitch_id IS NOT NULL),
    'total_spins', (
      SELECT COALESCE((SELECT total_spins FROM slot_statistics_archive WHERE id = '00000000-0000-0000-0000-000000000001'), 0)
           + (SELECT COUNT(*) FROM slot_game_results)
    ),
    'tournaments_this_month', (SELECT COUNT(*) FROM monthly_tournament_config WHERE is_active = true)
  );
$function$;