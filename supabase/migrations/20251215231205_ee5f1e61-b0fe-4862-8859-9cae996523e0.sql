-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;

-- Create a more restrictive policy that only exposes known public display settings
CREATE POLICY "Anyone can view public display settings" 
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
    'twitch_url'
  )
  OR has_role(auth.uid(), 'admin'::app_role)
);