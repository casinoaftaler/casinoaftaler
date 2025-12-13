-- Add position column for ordering casinos
ALTER TABLE public.casinos ADD COLUMN position INTEGER;

-- Set initial positions based on current order (by rating descending)
WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY rating DESC, created_at ASC) as pos
  FROM public.casinos
)
UPDATE public.casinos c
SET position = r.pos
FROM ranked r
WHERE c.id = r.id;

-- Make position not null with default
ALTER TABLE public.casinos ALTER COLUMN position SET NOT NULL;
ALTER TABLE public.casinos ALTER COLUMN position SET DEFAULT 0;