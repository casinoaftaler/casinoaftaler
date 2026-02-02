-- Insert default slot machine settings into site_settings
INSERT INTO site_settings (key, value)
VALUES 
  ('slot_daily_spins', '100'),
  ('slot_min_bet', '1'),
  ('slot_max_bet', '10')
ON CONFLICT (key) DO NOTHING;

-- Drop existing RLS policies for site_settings SELECT
DROP POLICY IF EXISTS "Anyone can view public display settings" ON site_settings;
DROP POLICY IF EXISTS "Public can read whitelisted display settings" ON site_settings;

-- Create updated policy that includes slot settings in the public whitelist
CREATE POLICY "Public can read whitelisted display settings" 
ON site_settings 
FOR SELECT 
USING (
  key = ANY (ARRAY[
    'site_name', 
    'header_icon', 
    'hero_title', 
    'hero_subtitle', 
    'hero_background_image', 
    'discord_url', 
    'instagram_url', 
    'twitch_url', 
    'streamelements_channel_id',
    'casino_card_disclaimer',
    'slot_daily_spins',
    'slot_min_bet',
    'slot_max_bet'
  ]) 
  OR has_role(auth.uid(), 'admin')
);