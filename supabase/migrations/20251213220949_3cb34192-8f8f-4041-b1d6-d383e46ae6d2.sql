-- Add logo_url column to casinos
ALTER TABLE public.casinos ADD COLUMN logo_url TEXT;

-- Create storage bucket for casino logos
INSERT INTO storage.buckets (id, name, public) VALUES ('casino-logos', 'casino-logos', true);

-- Allow anyone to view logos (public bucket)
CREATE POLICY "Anyone can view casino logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'casino-logos');

-- Allow authenticated admins to upload logos
CREATE POLICY "Admins can upload casino logos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'casino-logos' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to update logos
CREATE POLICY "Admins can update casino logos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'casino-logos' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to delete logos
CREATE POLICY "Admins can delete casino logos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'casino-logos' 
  AND public.has_role(auth.uid(), 'admin')
);