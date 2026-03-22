-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;

-- Daily job at 06:00 UTC: touch homepage updated_at
SELECT cron.schedule(
  'daily-touch-homepage',
  '0 6 * * *',
  $$UPDATE public.page_metadata SET updated_at = now() WHERE path = '/'$$
);