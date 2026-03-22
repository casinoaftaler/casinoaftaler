CREATE OR REPLACE FUNCTION public.touch_on_compliance_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  review_path text;
  hub_pages text[] := ARRAY[
    '/casino-licenser',
    '/markedsindsigt',
    '/casino-anmeldelser',
    '/',
    '/casino-bonus',
    '/velkomstbonus',
    '/top-10-casino-online',
    '/bonus-hunt'
  ];
  p text;
BEGIN
  review_path := '/casino-anmeldelser/' || NEW.casino_slug;
  UPDATE page_metadata SET updated_at = now() WHERE path = review_path;

  FOREACH p IN ARRAY hub_pages LOOP
    UPDATE page_metadata SET updated_at = now() WHERE path = p;
  END LOOP;

  RETURN NEW;
END;
$$;