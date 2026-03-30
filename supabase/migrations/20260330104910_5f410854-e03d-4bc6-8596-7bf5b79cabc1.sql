ALTER TABLE public.slot_catalog 
  ADD COLUMN content_archetype text,
  ADD COLUMN content_enriched_at timestamptz;