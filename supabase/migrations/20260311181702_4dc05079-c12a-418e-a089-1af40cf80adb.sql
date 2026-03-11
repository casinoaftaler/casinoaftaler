
-- Enable pg_net for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Function to ping crawl-ping edge function when content changes
CREATE OR REPLACE FUNCTION public.notify_crawl_ping()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _url text;
  _source text;
  _supabase_url text;
  _anon_key text;
BEGIN
  _supabase_url := current_setting('app.settings.supabase_url', true);
  _anon_key := current_setting('app.settings.supabase_anon_key', true);

  -- Determine the URL based on which table triggered
  IF TG_TABLE_NAME = 'casino_news' THEN
    _url := '/casino-nyheder/' || NEW.slug;
    _source := 'casino_news_trigger';
  ELSIF TG_TABLE_NAME = 'slot_catalog' THEN
    _url := '/slot-katalog/' || COALESCE(NEW.slug, lower(regexp_replace(regexp_replace(NEW.slot_name, '[''""''""]+', '', 'g'), '[^a-z0-9]+', '-', 'gi')));
    _source := 'slot_catalog_trigger';
  ELSE
    _url := '/';
    _source := TG_TABLE_NAME || '_trigger';
  END IF;

  -- Fire-and-forget HTTP call to crawl-ping edge function
  PERFORM net.http_post(
    url := 'https://zhpbqqhtgnblaugrqhqi.supabase.co/functions/v1/crawl-ping',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocGJxcWh0Z25ibGF1Z3JxaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NDkxMzYsImV4cCI6MjA4MTIyNTEzNn0.RY7LmE9Cgms6_PDns8gc0jAxYPcK2zX8CRIx6oZ3uDE'
    ),
    body := jsonb_build_object(
      'urls', jsonb_build_array(_url),
      'source', _source
    )
  );

  RETURN NEW;
END;
$$;

-- Trigger on casino_news when article is published
CREATE TRIGGER trg_crawl_ping_news
  AFTER INSERT OR UPDATE ON public.casino_news
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION public.notify_crawl_ping();

-- Trigger on slot_catalog when new slots are added or updated
CREATE TRIGGER trg_crawl_ping_slots
  AFTER INSERT OR UPDATE ON public.slot_catalog
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_crawl_ping();
