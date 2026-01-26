-- Create shop_items table
CREATE TABLE public.shop_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  price TEXT NOT NULL DEFAULT '0 Points',
  stock TEXT NOT NULL DEFAULT '0 STK',
  external_url TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create public view (excludes external_url for security)
CREATE VIEW public.shop_items_public AS
SELECT id, name, slug, description, image_url, price, stock, position, is_active, created_at, updated_at
FROM public.shop_items
WHERE is_active = true
ORDER BY position ASC;

-- Enable RLS
ALTER TABLE public.shop_items ENABLE ROW LEVEL SECURITY;

-- Public read policy for active items
CREATE POLICY "Anyone can view active shop items" ON public.shop_items
  FOR SELECT USING (is_active = true);

-- Admin full access
CREATE POLICY "Admins can manage shop items" ON public.shop_items
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Casino owner full access
CREATE POLICY "Casino owners can manage shop items" ON public.shop_items
  FOR ALL USING (is_casino_owner(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_shop_items_updated_at
  BEFORE UPDATE ON public.shop_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for shop item images
INSERT INTO storage.buckets (id, name, public) VALUES ('shop-item-images', 'shop-item-images', true);

-- Storage policies for shop-item-images bucket
CREATE POLICY "Anyone can view shop item images"
ON storage.objects FOR SELECT
USING (bucket_id = 'shop-item-images');

CREATE POLICY "Admins can upload shop item images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'shop-item-images' AND (has_role(auth.uid(), 'admin'::app_role) OR is_casino_owner(auth.uid())));

CREATE POLICY "Admins can update shop item images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'shop-item-images' AND (has_role(auth.uid(), 'admin'::app_role) OR is_casino_owner(auth.uid())));

CREATE POLICY "Admins can delete shop item images"
ON storage.objects FOR DELETE
USING (bucket_id = 'shop-item-images' AND (has_role(auth.uid(), 'admin'::app_role) OR is_casino_owner(auth.uid())));