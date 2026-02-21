
-- Casino News table
CREATE TABLE public.casino_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'generelt',
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  author_id TEXT NOT NULL DEFAULT 'jonas',
  meta_title TEXT,
  meta_description TEXT
);

-- Enable RLS
ALTER TABLE public.casino_news ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
CREATE POLICY "Anyone can view published news"
ON public.casino_news FOR SELECT
USING (status = 'published');

-- Admins can manage all news
CREATE POLICY "Admins can manage all news"
ON public.casino_news FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Auto-update updated_at
CREATE TRIGGER update_casino_news_updated_at
BEFORE UPDATE ON public.casino_news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for slug lookups and status filtering
CREATE INDEX idx_casino_news_slug ON public.casino_news (slug);
CREATE INDEX idx_casino_news_status_published ON public.casino_news (status, published_at DESC);
