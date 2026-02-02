-- Create a storage bucket for slot machine frames
INSERT INTO storage.buckets (id, name, public) 
VALUES ('slot-frames', 'slot-frames', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to slot frames
CREATE POLICY "Public read access for slot frames"
ON storage.objects FOR SELECT
USING (bucket_id = 'slot-frames');

-- Allow authenticated users with admin role to upload slot frames
CREATE POLICY "Admin upload access for slot frames"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'slot-frames' 
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admin users to update slot frames
CREATE POLICY "Admin update access for slot frames"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'slot-frames'
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow admin users to delete slot frames
CREATE POLICY "Admin delete access for slot frames"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'slot-frames'
  AND auth.uid() IS NOT NULL
  AND public.has_role(auth.uid(), 'admin')
);