
-- Remove duplicate slots that generate the same slug, keeping the one with highest bonus_count
-- First, handle all duplicates by deleting the row with lower bonus_count (or higher id as tiebreak)
DELETE FROM public.slot_catalog
WHERE id IN (
  SELECT id FROM (
    SELECT id,
      ROW_NUMBER() OVER (
        PARTITION BY regexp_replace(regexp_replace(regexp_replace(lower(slot_name), '[''""''"]+', '', 'g'), '[^a-z0-9]+', '-', 'g'), '^-+|-+$', '', 'g')
        ORDER BY bonus_count DESC, created_at ASC
      ) as rn
    FROM public.slot_catalog
  ) ranked
  WHERE rn > 1
);

-- Now add slug column (it was dropped because migration failed partially - re-add if not exists)
ALTER TABLE public.slot_catalog ADD COLUMN IF NOT EXISTS slug text;

-- Populate all slugs
UPDATE public.slot_catalog
SET slug = regexp_replace(
  regexp_replace(
    regexp_replace(
      lower(slot_name),
      '[''""''"]+', '', 'g'
    ),
    '[^a-z0-9]+', '-', 'g'
  ),
  '^-+|-+$', '', 'g'
);

-- Create unique index
CREATE UNIQUE INDEX IF NOT EXISTS idx_slot_catalog_slug ON public.slot_catalog (slug);

-- Create lookup function
CREATE OR REPLACE FUNCTION public.get_slot_by_slug(p_slug text)
RETURNS SETOF public.slot_catalog
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT * FROM public.slot_catalog WHERE slug = p_slug LIMIT 1;
$$;

-- Auto-populate slug on INSERT/UPDATE via trigger
CREATE OR REPLACE FUNCTION public.set_slot_slug()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.slug := regexp_replace(
    regexp_replace(
      regexp_replace(lower(NEW.slot_name), '[''""''"]+', '', 'g'),
      '[^a-z0-9]+', '-', 'g'
    ),
    '^-+|-+$', '', 'g'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_slot_slug ON public.slot_catalog;
CREATE TRIGGER trg_set_slot_slug
  BEFORE INSERT OR UPDATE OF slot_name ON public.slot_catalog
  FOR EACH ROW
  EXECUTE FUNCTION public.set_slot_slug();
