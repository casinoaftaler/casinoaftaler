-- Insert hero section settings
INSERT INTO public.site_settings (key, value)
VALUES 
  ('hero_title', 'Find de Bedste Casinobonusser i 2024'),
  ('hero_subtitle', 'Sammenlign velkomstbonusser, gratis spins og eksklusive tilbud fra de bedste online casinoer. Vi hjælper dig med at finde den perfekte bonus til din spillestil.'),
  ('hero_background_image', NULL)
ON CONFLICT (key) DO NOTHING;