
-- Enterprise audit trail for news generation
CREATE TABLE public.news_generation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Generation metadata
  model_used TEXT NOT NULL DEFAULT 'sonar-pro',
  search_query TEXT,
  topic_index INTEGER,
  
  -- Result
  article_id UUID REFERENCES public.casino_news(id) ON DELETE SET NULL,
  guardrail_pass BOOLEAN NOT NULL DEFAULT false,
  rejection_reason TEXT,
  
  -- Sources & validation
  citation_urls TEXT[] DEFAULT '{}',
  sources_provided INTEGER DEFAULT 0,
  sources_validated INTEGER DEFAULT 0,
  recency_check_result JSONB,
  domain_validation_result JSONB,
  
  -- Performance
  tokens_used INTEGER,
  response_time_ms INTEGER,
  generation_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Perplexity details
  perplexity_citations_count INTEGER DEFAULT 0,
  perplexity_model TEXT DEFAULT 'sonar-pro',
  
  -- AI generation details  
  ai_model TEXT DEFAULT 'google/gemini-2.5-flash',
  
  -- Duplicate check
  duplicate_check_result JSONB,
  
  -- Warnings
  validation_warnings TEXT[] DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.news_generation_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view logs
CREATE POLICY "Admins can view generation logs"
  ON public.news_generation_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role inserts (edge functions)
CREATE POLICY "Service role can insert generation logs"
  ON public.news_generation_logs
  FOR INSERT
  WITH CHECK (true);

-- Index for quick lookups
CREATE INDEX idx_news_gen_logs_created ON public.news_generation_logs(created_at DESC);
CREATE INDEX idx_news_gen_logs_guardrail ON public.news_generation_logs(guardrail_pass);
