
-- Add website_url to casinos for domain-level crawling
ALTER TABLE public.casinos ADD COLUMN IF NOT EXISTS website_url text;

-- Create the free_spin_campaigns table
CREATE TABLE public.free_spin_campaigns (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  casino_id uuid REFERENCES public.casinos(id) ON DELETE CASCADE,
  casino_name text NOT NULL,
  casino_slug text NOT NULL,
  title text NOT NULL,
  description text,
  spin_count integer NOT NULL DEFAULT 0,
  for_new_players boolean NOT NULL DEFAULT false,
  for_existing_players boolean NOT NULL DEFAULT false,
  requires_deposit boolean NOT NULL DEFAULT true,
  wagering_requirement text,
  min_deposit text,
  expiry_date timestamptz,
  source_type text NOT NULL DEFAULT 'scraped',
  source_url text,
  last_checked timestamptz NOT NULL DEFAULT now(),
  is_active boolean NOT NULL DEFAULT true,
  offer_type text NOT NULL DEFAULT 'welcome',
  casino_logo_url text,
  affiliate_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.free_spin_campaigns ENABLE ROW LEVEL SECURITY;

-- Public read access (this is public-facing content)
CREATE POLICY "Free spin campaigns are publicly readable"
  ON public.free_spin_campaigns FOR SELECT
  USING (true);

-- Only service role can insert/update/delete (edge functions)
CREATE POLICY "Service role can manage campaigns"
  ON public.free_spin_campaigns FOR ALL
  USING (
    (SELECT current_setting('request.jwt.claim.role', true)) = 'service_role'
  );

-- Indexes for performance
CREATE INDEX idx_free_spin_campaigns_active ON public.free_spin_campaigns(is_active) WHERE is_active = true;
CREATE INDEX idx_free_spin_campaigns_casino ON public.free_spin_campaigns(casino_id);
CREATE INDEX idx_free_spin_campaigns_type ON public.free_spin_campaigns(offer_type);

-- Updated_at trigger
CREATE TRIGGER update_free_spin_campaigns_updated_at
  BEFORE UPDATE ON public.free_spin_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
