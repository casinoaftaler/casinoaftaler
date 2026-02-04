-- Drop the existing policy
DROP POLICY IF EXISTS "Public can read whitelisted display settings" ON public.site_settings;

-- Create updated policy with slot_reel_slowdown_ms included
CREATE POLICY "Public can read whitelisted display settings"
ON public.site_settings
FOR SELECT
USING (
  key IN (
    'site_name', 'header_icon', 'hero_title', 'hero_subtitle', 'hero_background_image',
    'discord_url', 'instagram_url', 'twitch_url', 'streamelements_channel_id',
    'casino_card_disclaimer', 'slot_daily_spins', 'slot_min_bet', 'slot_max_bet',
    'slot_title_image', 'slot_background_image', 'slot_page_locked', 'slot_page_password',
    'slot_machine_frame_image', 'slot_frame_size',
    'slot_spin_loop_ms', 'slot_reel_stagger_ms', 'slot_reel_slowdown_ms'
  )
  OR has_role(auth.uid(), 'admin'::app_role)
);