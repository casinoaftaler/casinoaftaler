SELECT cron.schedule(
  'slot-descriptions-bulk-job',
  '*/2 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://zhpbqqhtgnblaugrqhqi.supabase.co/functions/v1/slot-descriptions-bulk',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('supabase.service_role_key', true)
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);