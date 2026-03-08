
CREATE OR REPLACE FUNCTION public.touch_news_hub_on_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'published' THEN
    UPDATE page_metadata 
    SET updated_at = now() 
    WHERE path = '/casino-nyheder';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_news_publish_touch_hub
AFTER INSERT OR UPDATE OF status ON casino_news
FOR EACH ROW
EXECUTE FUNCTION touch_news_hub_on_publish();
