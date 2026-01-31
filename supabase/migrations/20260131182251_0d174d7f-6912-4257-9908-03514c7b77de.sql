-- Insert default casino card disclaimer
INSERT INTO public.site_settings (key, value)
VALUES ('casino_card_disclaimer', 'Annoncering | 18+ | Spil ansvarligt | Selvudelukkelse via Rofus.nu | Kontakt Spillemyndighedens hjælpelinje på StopSpillet.dk – rådgivning om spilafhængighed | spillemyndigheden.dk |

Tilbud til nye spillere. Gælder indtil videre. Min. indbetaling: 100 kr. Max. bonus: 1000 kr. Tilbuddet gælder kun ved første indbetaling. Bonus og indbetalt beløb skal omsættes 10 gange. Bonusser kan kun anvendes på udvalgte spilleautomater. Bonus er gyldig i 60 dage. Regler og vilkår gælder. CasinoAftaler er ikke ansvarlig for eventuelle fejl i den offentliggjorte tilbudsinformation.')
ON CONFLICT (key) DO NOTHING;

-- Drop the existing RLS policy and recreate with the new key included
DROP POLICY IF EXISTS "Anyone can view public display settings" ON public.site_settings;

CREATE POLICY "Anyone can view public display settings"
ON public.site_settings
FOR SELECT
USING (
  key = ANY (ARRAY[
    'site_name'::text, 
    'header_icon'::text, 
    'hero_title'::text, 
    'hero_subtitle'::text, 
    'hero_background_image'::text, 
    'discord_url'::text, 
    'instagram_url'::text, 
    'twitch_url'::text,
    'casino_card_disclaimer'::text
  ]) 
  OR has_role(auth.uid(), 'admin'::app_role)
);