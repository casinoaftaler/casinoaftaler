-- Create highlight_categories table
CREATE TABLE public.highlight_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.highlight_categories ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view categories"
  ON public.highlight_categories FOR SELECT
  USING (true);

-- Admin write access
CREATE POLICY "Admins can manage categories"
  ON public.highlight_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add category_id to highlights table
ALTER TABLE public.highlights
ADD COLUMN category_id uuid REFERENCES public.highlight_categories(id) ON DELETE SET NULL;

-- Index for faster filtering
CREATE INDEX idx_highlights_category ON public.highlights(category_id);