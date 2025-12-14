-- Insert default site name setting
INSERT INTO public.site_settings (key, value)
VALUES ('site_name', 'Casinoaftaler.dk')
ON CONFLICT (key) DO NOTHING;