
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
    '/top-10-casino-online'
  ];
  p text;
BEGIN
  -- Touch the specific casino review page
  review_path := '/casino-anmeldelser/' || NEW.casino_slug;
  UPDATE page_metadata SET updated_at = now() WHERE path = review_path;

  -- Touch hub pages
  FOREACH p IN ARRAY hub_pages LOOP
    UPDATE page_metadata SET updated_at = now() WHERE path = p;
  END LOOP;

  RETURN NEW;
END;
$$;
