
-- 1. Add /free-spins-i-dag and /casino-nyheder to the community activity triggers
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
    '/free-spins-i-dag',
    '/velkomstbonus',
    '/casino-bonus',
    '/live-casino',
    '/casino-anmeldelser',
    '/casino-nyheder'
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
    '/free-spins-i-dag',
    '/velkomstbonus',
    '/casino-bonus',
    '/live-casino',
    '/casino-anmeldelser',
    '/casino-nyheder'
  ];
  p text;
BEGIN
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

-- 2. Dedicated trigger on free_spin_campaigns for /free-spins-i-dag freshness
CREATE OR REPLACE FUNCTION public.touch_free_spins_page_on_campaign()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE page_metadata 
  SET updated_at = now() 
  WHERE path IN ('/free-spins-i-dag', '/free-spins');
  RETURN NEW;
END;
$$;

CREATE TRIGGER touch_pages_on_new_campaign
  AFTER INSERT OR UPDATE ON public.free_spin_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_free_spins_page_on_campaign();
