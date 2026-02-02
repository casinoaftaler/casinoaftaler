-- Add streamelements_channel_id to the public whitelist for site_settings RLS policy
DROP POLICY IF EXISTS "Public can read whitelisted display settings" ON public.site_settings;

CREATE POLICY "Public can read whitelisted display settings" 
ON public.site_settings 
FOR SELECT 
USING (
  key IN (
    'site_name', 
    'header_icon', 
    'hero_title', 
    'hero_subtitle', 
    'hero_background_image',
    'discord_url',
    'instagram_url',
    'twitch_url',
    'streamelements_channel_id'
  )
  OR public.has_role(auth.uid(), 'admin')
);