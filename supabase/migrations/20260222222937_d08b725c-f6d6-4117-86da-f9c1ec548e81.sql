
-- Table for daily free spins offers scraped from casino bonus pages
CREATE TABLE public.daily_free_spins_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  casino_id UUID REFERENCES public.casinos(id) ON DELETE CASCADE,
  casino_name TEXT NOT NULL,
  casino_slug TEXT NOT NULL,
  offer_title TEXT NOT NULL,
  offer_description TEXT,
  free_spins_count INTEGER,
  min_deposit TEXT,
  wagering_requirement TEXT,
  valid_until TEXT,
  offer_type TEXT NOT NULL DEFAULT 'welcome', -- welcome, daily, weekend, vip, no_deposit
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_manually_added BOOLEAN NOT NULL DEFAULT false,
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  scrape_source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.daily_free_spins_offers ENABLE ROW LEVEL SECURITY;

-- Anyone can view active offers
CREATE POLICY "Anyone can view active offers"
ON public.daily_free_spins_offers
FOR SELECT
USING (is_active = true);

-- Admins can manage all offers
CREATE POLICY "Admins can manage all offers"
ON public.daily_free_spins_offers
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Service role can manage offers (for edge functions)
CREATE POLICY "Service role can manage offers"
ON public.daily_free_spins_offers
FOR ALL
USING (auth.role() = 'service_role'::text)
WITH CHECK (auth.role() = 'service_role'::text);

-- Add bonus_page_url to casinos table for scraping targets
ALTER TABLE public.casinos ADD COLUMN IF NOT EXISTS bonus_page_url TEXT;

-- Trigger for updated_at
CREATE TRIGGER update_daily_free_spins_offers_updated_at
BEFORE UPDATE ON public.daily_free_spins_offers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for efficient queries
CREATE INDEX idx_daily_free_spins_active ON public.daily_free_spins_offers(is_active, scraped_at DESC);
CREATE INDEX idx_daily_free_spins_casino ON public.daily_free_spins_offers(casino_slug);
