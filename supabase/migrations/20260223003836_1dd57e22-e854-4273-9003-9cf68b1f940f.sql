
-- Add structured extraction columns to free_spin_campaigns
ALTER TABLE public.free_spin_campaigns
  ADD COLUMN IF NOT EXISTS deposit_amount numeric DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS eligible_players text DEFAULT 'all',
  ADD COLUMN IF NOT EXISTS campaign_type text DEFAULT 'welcome',
  ADD COLUMN IF NOT EXISTS summary text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS full_terms_clean text DEFAULT NULL;

-- Add check constraint for eligible_players enum
ALTER TABLE public.free_spin_campaigns
  ADD CONSTRAINT chk_eligible_players CHECK (eligible_players IN ('new', 'existing', 'all'));

-- Add check constraint for campaign_type enum  
ALTER TABLE public.free_spin_campaigns
  ADD CONSTRAINT chk_campaign_type CHECK (campaign_type IN ('welcome', 'no_deposit', 'daily', 'weekly', 'weekend', 'vip', 'existing', 'other'));
