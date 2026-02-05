-- Enable required extensions for cron scheduling
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule monthly reset on 1st of each month at midnight UTC
SELECT cron.schedule(
  'monthly-slot-stats-reset',
  '0 0 1 * *',
  $$
  SELECT net.http_post(
    url := 'https://zhpbqqhtgnblaugrqhqi.supabase.co/functions/v1/reset-slot-stats',
    headers := '{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGJxcWh0Z25ibGF1Z3JxaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDkxMzYsImV4cCI6MjA4MTIyNTEzNn0.RY7LmE9Cgms6_PDns8gc0jAxYPcK2zX8CRIx6oZ3uDE", "Content-Type": "application/json"}'::jsonb,
    body := '{"source": "cron", "target": "all"}'::jsonb
  ) AS request_id;
  $$
);