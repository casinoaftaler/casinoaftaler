
-- Add scrape tracking columns to casino_compliance
ALTER TABLE public.casino_compliance
  ADD COLUMN IF NOT EXISTS license_last_scraped_at timestamptz,
  ADD COLUMN IF NOT EXISTS scrape_status text NOT NULL DEFAULT 'pending'
    CHECK (scrape_status IN ('success', 'failed', 'partial', 'pending'));

-- Update existing check constraint on history to allow scrape-related fields
ALTER TABLE public.casino_compliance_history
  DROP CONSTRAINT IF EXISTS casino_compliance_history_field_changed_check;

ALTER TABLE public.casino_compliance_history
  ADD CONSTRAINT casino_compliance_history_field_changed_check
  CHECK (field_changed = ANY (ARRAY[
    'license_status', 'bonus_max_amount', 'bonus_wager_requirement',
    'license_source_url', 'bonus_source_url', 'license_holder_name',
    'scrape_status'
  ]));

ALTER TABLE public.casino_compliance_history
  DROP CONSTRAINT IF EXISTS casino_compliance_history_change_type_check;

ALTER TABLE public.casino_compliance_history
  ADD CONSTRAINT casino_compliance_history_change_type_check
  CHECK (change_type = ANY (ARRAY[
    'license_change', 'bonus_change', 'wager_change', 'source_change', 'scrape_change'
  ]));

-- Create compliance scrape logs table
CREATE TABLE IF NOT EXISTS public.compliance_scrape_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  casino_slug text NOT NULL,
  casino_name text NOT NULL,
  scrape_url text NOT NULL,
  status text NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'failed', 'timeout', 'blocked', 'no_match', 'parse_error')),
  severity text NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'high', 'critical')),
  response_code integer,
  error_message text,
  matched_name text,
  similarity_score numeric,
  license_type_found text,
  raw_snippet text,
  duration_ms integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.compliance_scrape_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view scrape logs
CREATE POLICY "Admins can manage scrape logs"
  ON public.compliance_scrape_logs
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Index for efficient querying
CREATE INDEX idx_scrape_logs_casino_slug ON public.compliance_scrape_logs (casino_slug);
CREATE INDEX idx_scrape_logs_created_at ON public.compliance_scrape_logs (created_at DESC);
CREATE INDEX idx_scrape_logs_severity ON public.compliance_scrape_logs (severity);

-- Enable pg_cron and pg_net extensions for scheduled scraping
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
