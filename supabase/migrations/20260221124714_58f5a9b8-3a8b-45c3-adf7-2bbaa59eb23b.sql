INSERT INTO storage.buckets (id, name, public) VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "News images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'news-images');

CREATE POLICY "Admins can upload news images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'news-images');