
-- Function to touch money pages in page_metadata when community activity happens
-- This gives real lastmod freshness signals in the sitemap
CREATE OR REPLACE FUNCTION public.touch_money_pages_on_activity()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  money_pages text[] := ARRAY[
    '/',
    '/nye-casinoer',
    '/nye-casinoer/bonus-uden-indbetaling',
    '/free-spins',
    '/velkomstbonus',
    '/casino-bonus',
    '/live-casino',
    '/casino-anmeldelser'
  ];
  p text;
BEGIN
  FOREACH p IN ARRAY money_pages LOOP
    UPDATE page_metadata 
    SET updated_at = now() 
    WHERE path = p;
  END LOOP;
  RETURN NEW;
END;
$$;

-- Trigger: when a new spin result is recorded (high frequency - throttle with daily check)
CREATE OR REPLACE FUNCTION public.touch_money_pages_daily()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  last_touch timestamptz;
  money_pages text[] := ARRAY[
    '/',
    '/nye-casinoer',
    '/nye-casinoer/bonus-uden-indbetaling',
    '/free-spins',
    '/velkomstbonus',
    '/casino-bonus',
    '/live-casino',
    '/casino-anmeldelser'
  ];
  p text;
BEGIN
  -- Only update once per day to avoid excessive writes
  SELECT updated_at INTO last_touch
  FROM page_metadata
  WHERE path = '/'
  LIMIT 1;

  IF last_touch IS NULL OR last_touch < now() - interval '12 hours' THEN
    FOREACH p IN ARRAY money_pages LOOP
      UPDATE page_metadata 
      SET updated_at = now() 
      WHERE path = p;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger on slot_game_results: fires daily when people spin
CREATE TRIGGER touch_pages_on_spin
  AFTER INSERT ON public.slot_game_results
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_money_pages_daily();

-- Trigger on profiles: fires when new member joins
CREATE TRIGGER touch_pages_on_new_member
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_money_pages_on_activity();

-- Trigger on tournament_entries: fires when tournament activity happens
CREATE TRIGGER touch_pages_on_tournament
  AFTER INSERT ON public.tournament_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_money_pages_daily();

-- Trigger on bonus_hunt_archives: fires when a new hunt is archived
CREATE TRIGGER touch_pages_on_hunt_archive
  AFTER INSERT ON public.bonus_hunt_archives
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_money_pages_on_activity();
