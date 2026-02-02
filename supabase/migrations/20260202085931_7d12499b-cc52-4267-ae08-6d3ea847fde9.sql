-- Create highlights table
CREATE TABLE public.highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  url text NOT NULL,
  platform text NOT NULL DEFAULT 'youtube',
  description text,
  thumbnail_url text,
  position integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.highlights ENABLE ROW LEVEL SECURITY;

-- Public can view active highlights
CREATE POLICY "Anyone can view active highlights"
  ON public.highlights FOR SELECT
  USING (is_active = true);

-- Admins can do everything
CREATE POLICY "Admins can manage highlights"
  ON public.highlights FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE TRIGGER set_highlights_updated_at
  BEFORE UPDATE ON public.highlights
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();