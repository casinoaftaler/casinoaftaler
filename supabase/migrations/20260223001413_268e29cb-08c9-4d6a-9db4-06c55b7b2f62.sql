
-- Add richer campaign data columns to free_spin_campaigns
ALTER TABLE public.free_spin_campaigns
  ADD COLUMN IF NOT EXISTS game_name text,
  ADD COLUMN IF NOT EXISTS required_action text,
  ADD COLUMN IF NOT EXISTS campaign_period_start timestamp with time zone,
  ADD COLUMN IF NOT EXISTS campaign_period_end timestamp with time zone,
  ADD COLUMN IF NOT EXISTS spin_value text,
  ADD COLUMN IF NOT EXISTS short_terms_summary text,
  ADD COLUMN IF NOT EXISTS confidence_score integer DEFAULT 50,
  ADD COLUMN IF NOT EXISTS last_verified_at timestamp with time zone DEFAULT now(),
  ADD COLUMN IF NOT EXISTS dedup_key text;

-- Create unique index on dedup_key for deduplication
CREATE UNIQUE INDEX IF NOT EXISTS idx_free_spin_campaigns_dedup_key
  ON public.free_spin_campaigns (dedup_key)
  WHERE dedup_key IS NOT NULL;

-- Index for filtering out expired campaigns
CREATE INDEX IF NOT EXISTS idx_free_spin_campaigns_active_score
  ON public.free_spin_campaigns (is_active, score DESC)
  WHERE spin_count > 0;
