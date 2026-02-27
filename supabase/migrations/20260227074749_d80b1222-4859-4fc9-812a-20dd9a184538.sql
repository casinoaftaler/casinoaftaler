
-- Add cornerstone flag to casino_news
ALTER TABLE public.casino_news 
ADD COLUMN is_cornerstone boolean NOT NULL DEFAULT false;

-- Index for efficient cornerstone queries
CREATE INDEX idx_casino_news_cornerstone ON public.casino_news (is_cornerstone) WHERE is_cornerstone = true;
