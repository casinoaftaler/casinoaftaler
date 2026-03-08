

## Plan: Automatisk freshness-opdatering ved artikelpublicering

### Problemet
Når en ny artikel publiceres (eller ændres til "published"), sker der ingen automatisk opdatering af `/casino-nyheder`-sidens `page_metadata.updated_at` i databasen. Det betyder, at sitemappet og freshness-signalerne forbliver statiske, medmindre vi manuelt kører SQL.

### Løsning: Database trigger på `casino_news`
Opretter en PostgreSQL trigger der automatisk opdaterer `page_metadata.updated_at` for `/casino-nyheder` hver gang en artikel publiceres eller opdateres. Dette dækker **alle** publiceringsflows: admin UI, generate-news-draft edge function, og direkte DB-operationer.

### Implementering

**1. Database migration — trigger-funktion + trigger**

```sql
CREATE OR REPLACE FUNCTION public.touch_news_hub_on_publish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only fire when status becomes 'published'
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
```

Dette giver:
- Automatisk `lastmod`-opdatering af `/casino-nyheder` i sitemappet ved enhver ny publicering
- Nul kodeændringer — triggeren kører på databaseniveau
- Dækker alle flows (admin UI, edge functions, direkte SQL)

**2. Ingen kodeændringer påkrævet**
Den eksisterende `sitemap-dynamic` edge function læser allerede `page_metadata.updated_at`, så opdateringen propagerer automatisk til Google via sitemappet.

| # | Hvad | Hvor |
|---|------|------|
| 1 | Trigger-funktion + trigger | Database migration |

