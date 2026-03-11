
CREATE OR REPLACE FUNCTION public.touch_news_hub_on_publish()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  cat text;
  matched_paths text[];
BEGIN
  IF NEW.status = 'published' THEN
    -- Always update the news hub
    UPDATE page_metadata SET updated_at = now() WHERE path = '/casino-nyheder';

    cat := COALESCE(NEW.category, 'generelt');

    -- Map article category to pages whose LatestNewsByCategory widget will show it
    matched_paths := CASE
      WHEN cat = 'betalingsmetoder' THEN
        ARRAY['/betalingsmetoder', '/betalingsmetoder/trustly', '/betalingsmetoder/mobilepay',
              '/betalingsmetoder/paypal', '/betalingsmetoder/skrill', '/betalingsmetoder/visa-mastercard']
      WHEN cat = 'licenser' THEN
        ARRAY['/casino-licenser', '/spillemyndigheden']
      WHEN cat = 'regulering' THEN
        ARRAY['/casino-licenser', '/ansvarligt-spil', '/spillemyndigheden']
      WHEN cat = 'nye-casinoer' THEN
        ARRAY['/nye-casinoer', '/casino-bonus', '/casino-anmeldelser', '/live-casino']
      WHEN cat = 'juridisk' THEN
        ARRAY['/ansvarligt-spil']
      WHEN cat = 'markedsbevægelser' THEN
        ARRAY['/casino-anmeldelser']
      ELSE
        ARRAY[]::text[]
    END;

    IF array_length(matched_paths, 1) > 0 THEN
      UPDATE page_metadata SET updated_at = now() WHERE path = ANY(matched_paths);
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;
