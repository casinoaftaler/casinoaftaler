
-- Drop the old restrictive SELECT policy
DROP POLICY IF EXISTS "Public can read whitelisted display settings" ON public.site_settings;

-- Create new policy with ALL game-related keys whitelisted
CREATE POLICY "Public can read whitelisted display settings" ON public.site_settings
FOR SELECT
USING (
  key = ANY (ARRAY[
    -- General site settings
    'site_name', 'header_icon', 'hero_title', 'hero_subtitle', 'hero_background_image',
    'discord_url', 'instagram_url', 'twitch_url', 'streamelements_channel_id',
    'casino_card_disclaimer',
    
    -- Book of Fedesvin slot settings
    'slot_daily_spins', 'slot_min_bet', 'slot_max_bet',
    'slot_title_image', 'slot_background_image',
    'slot_page_locked', 'slot_page_password',
    'slot_machine_frame_image', 'slot_frame_size',
    'slot_spin_loop_ms', 'slot_reel_stagger_ms', 'slot_reel_slowdown_ms',
    
    -- Book of Fedesvin sound files
    'slot_sound_file_background_music', 'slot_sound_file_spin', 'slot_sound_file_stop',
    'slot_sound_file_small_win', 'slot_sound_file_medium_win', 'slot_sound_file_big_win',
    'slot_sound_file_bonus_trigger', 'slot_sound_file_bonus_win',
    'slot_sound_file_bonus_symbol_scroll', 'slot_sound_file_bonus_symbol_selected',
    'slot_sound_file_scatter_1', 'slot_sound_file_scatter_2', 'slot_sound_file_scatter_3',
    'slot_sound_file_scatter_celebration',
    
    -- Rise of Fedesvin settings
    'rise_of_fedesvin_background_image', 'rise_of_fedesvin_frame_image',
    'rise_of_fedesvin_frame_size', 'rise_of_fedesvin_title_image',
    'rise_of_fedesvin_locked', 'rise_of_fedesvin_password',
    
    -- Rise of Fedesvin sound files
    'rise_of_fedesvin_sound_file_background_music',
    'rise_of_fedesvin_sound_file_spin', 'rise_of_fedesvin_sound_file_stop',
    'rise_of_fedesvin_sound_file_small_win', 'rise_of_fedesvin_sound_file_medium_win',
    'rise_of_fedesvin_sound_file_big_win',
    'rise_of_fedesvin_sound_file_bonus_trigger', 'rise_of_fedesvin_sound_file_bonus_win',
    'rise_of_fedesvin_sound_file_bonus_symbol_scroll', 'rise_of_fedesvin_sound_file_bonus_symbol_selected',
    'rise_of_fedesvin_sound_file_scatter_1', 'rise_of_fedesvin_sound_file_scatter_2',
    'rise_of_fedesvin_sound_file_scatter_3', 'rise_of_fedesvin_sound_file_scatter_celebration'
  ])
  OR has_role(auth.uid(), 'admin'::app_role)
);
