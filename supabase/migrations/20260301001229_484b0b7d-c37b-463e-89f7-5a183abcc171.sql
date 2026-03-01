
-- Create storage bucket for AI-generated clip thumbnails
INSERT INTO storage.buckets (id, name, public) 
VALUES ('clip-thumbnails', 'clip-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Anyone can view clip thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'clip-thumbnails');

-- Allow service role to upload
CREATE POLICY "Service role can upload clip thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'clip-thumbnails' AND auth.role() = 'service_role');

-- Allow service role to update/delete
CREATE POLICY "Service role can manage clip thumbnails"
ON storage.objects FOR ALL
USING (bucket_id = 'clip-thumbnails' AND auth.role() = 'service_role');
