-- Create storage bucket for slot sounds
INSERT INTO storage.buckets (id, name, public)
VALUES ('slot-sounds', 'slot-sounds', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to slot sounds
CREATE POLICY "Anyone can view slot sounds"
ON storage.objects FOR SELECT
USING (bucket_id = 'slot-sounds');

-- Allow admins to upload slot sounds
CREATE POLICY "Admins can upload slot sounds"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'slot-sounds' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update slot sounds
CREATE POLICY "Admins can update slot sounds"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'slot-sounds' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete slot sounds
CREATE POLICY "Admins can delete slot sounds"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'slot-sounds' 
  AND has_role(auth.uid(), 'admin'::app_role)
);