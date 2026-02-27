-- Remove duplicate cron jobs
SELECT cron.unschedule('scrape-daily-free-spins');
SELECT cron.unschedule('daily-free-spins-scrape');

-- Re-create with proper timeout (300s) using net.http_post with timeout parameter
-- Schedule at 06:00 UTC = 07:00 CET
SELECT cron.schedule(
  'daily-free-spins-scrape',
  '0 6 * * *',
  $$
  SELECT net.http_post(
    url := 'https://zhpbqqhtgnblaugrqhqi.supabase.co/functions/v1/scrape-daily-offers',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGJxcWh0Z25ibGF1Z3JxaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDkxMzYsImV4cCI6MjA4MTIyNTEzNn0.RY7LmE9Cgms6_PDns8gc0jAxYPcK2zX8CRIx6oZ3uDE"}'::jsonb,
    body := '{}'::jsonb,
    timeout_milliseconds := 300000
  ) AS request_id;
  $$
);