
-- 1. Compliance trigger: touch casino review pages when compliance data changes
CREATE OR REPLACE FUNCTION public.touch_on_compliance_change()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
AS $function$
DECLARE
  review_path text;
  hub_pages text[] := ARRAY[
    '/casino-licenser',
    '/markedsindsigt',
    '/casino-anmeldelser',
    '/',
    '/casino-bonus',
    '/velkomstbonus'
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
$function$;

CREATE TRIGGER trg_touch_on_compliance_change
  AFTER UPDATE ON public.casino_compliance
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_on_compliance_change();

-- 2. Stale content alerts table
CREATE TABLE public.stale_content_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  casino_slug text NOT NULL,
  casino_name text NOT NULL,
  days_stale integer NOT NULL DEFAULT 0,
  alert_type text NOT NULL DEFAULT 'stale_verification',
  created_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz
);

ALTER TABLE public.stale_content_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read stale alerts"
  ON public.stale_content_alerts
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update stale alerts"
  ON public.stale_content_alerts
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert stale alerts"
  ON public.stale_content_alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete stale alerts"
  ON public.stale_content_alerts
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
