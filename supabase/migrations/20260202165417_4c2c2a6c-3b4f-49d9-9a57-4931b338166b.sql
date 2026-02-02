-- Create junction table for many-to-many relationship between highlights and categories
CREATE TABLE public.highlight_category_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  highlight_id uuid NOT NULL REFERENCES public.highlights(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES public.highlight_categories(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(highlight_id, category_id)
);

-- Enable RLS
ALTER TABLE public.highlight_category_assignments ENABLE ROW LEVEL SECURITY;

-- Anyone can view assignments (for filtering)
CREATE POLICY "Anyone can view category assignments"
ON public.highlight_category_assignments
FOR SELECT
USING (true);

-- Admins can manage assignments
CREATE POLICY "Admins can manage category assignments"
ON public.highlight_category_assignments
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Migrate existing category_id data to the new junction table
INSERT INTO public.highlight_category_assignments (highlight_id, category_id)
SELECT id, category_id FROM public.highlights WHERE category_id IS NOT NULL;