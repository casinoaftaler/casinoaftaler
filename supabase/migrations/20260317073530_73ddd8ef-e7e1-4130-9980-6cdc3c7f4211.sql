-- Fase 3A: Public Market Intelligence event layer
CREATE TABLE IF NOT EXISTS public.market_intelligence_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  casino_slug TEXT,
  event_type TEXT NOT NULL,
  category TEXT NOT NULL,
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  impact_level TEXT NOT NULL DEFAULT 'medium',
  source_url TEXT,
  source_label TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  effective_date TIMESTAMPTZ,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT market_intelligence_events_impact_level_check CHECK (impact_level IN ('low', 'medium', 'high')),
  CONSTRAINT market_intelligence_events_event_type_check CHECK (event_type IN ('license_verified', 'license_change', 'bonus_verified', 'bonus_change', 'wager_change', 'market_update')),
  CONSTRAINT market_intelligence_events_category_check CHECK (category IN ('licenser', 'bonus', 'regulering', 'marked'))
);

ALTER TABLE public.market_intelligence_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public market intelligence events"
ON public.market_intelligence_events
FOR SELECT
TO public
USING (is_public = true);

CREATE POLICY "Admins can manage market intelligence events"
ON public.market_intelligence_events
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can manage market intelligence events"
ON public.market_intelligence_events
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS idx_market_intelligence_events_public_published
ON public.market_intelligence_events (is_public, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_market_intelligence_events_featured_published
ON public.market_intelligence_events (is_featured, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_market_intelligence_events_casino_slug
ON public.market_intelligence_events (casino_slug);

CREATE INDEX IF NOT EXISTS idx_market_intelligence_events_category
ON public.market_intelligence_events (category);

DROP TRIGGER IF EXISTS update_market_intelligence_events_updated_at
ON public.market_intelligence_events;

CREATE TRIGGER update_market_intelligence_events_updated_at
BEFORE UPDATE ON public.market_intelligence_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();