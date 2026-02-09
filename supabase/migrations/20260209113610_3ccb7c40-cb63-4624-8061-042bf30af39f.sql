-- Update the RLS policy to include the new gap settings keys
DROP POLICY IF EXISTS "Public can read whitelisted display settings" ON public.site_settings;

CREATE POLICY "Public can read whitelisted display settings"
ON public.site_settings
FOR SELECT
USING (
  (key = ANY (ARRAY[
    'site_name'::text, 'header_icon'::text, 'hero_title'::text, 'hero_subtitle'::text, 'hero_background_image'::text,
    'discord_url'::text, 'instagram_url'::text, 'twitch_url'::text, 'streamelements_channel_id'::text,
    'casino_card_disclaimer'::text,
    'slot_daily_spins'::text, 'slot_min_bet'::text, 'slot_max_bet'::text,
    'slot_title_image'::text, 'slot_background_image'::text,
    'slot_page_locked'::text, 'slot_page_password'::text,
    'slot_machine_frame_image'::text,
    'slot_frame_size'::text, 'slot_frame_width'::text, 'slot_frame_height'::text,
    'slot_frame_offset_x'::text, 'slot_frame_offset_y'::text,
    'slot_spin_loop_ms'::text, 'slot_reel_stagger_ms'::text, 'slot_reel_slowdown_ms'::text,
    'slot_sound_file_background_music'::text, 'slot_sound_file_spin'::text, 'slot_sound_file_stop'::text,
    'slot_sound_file_small_win'::text, 'slot_sound_file_medium_win'::text, 'slot_sound_file_big_win'::text,
    'slot_sound_file_bonus_trigger'::text, 'slot_sound_file_bonus_win'::text,
    'slot_sound_file_bonus_symbol_scroll'::text, 'slot_sound_file_bonus_symbol_selected'::text,
    'slot_sound_file_scatter_1'::text, 'slot_sound_file_scatter_2'::text, 'slot_sound_file_scatter_3'::text,
    'slot_sound_file_scatter_celebration'::text,
    'slot_sidepanel_gap'::text, 'slot_controls_gap'::text,
    'rise_of_fedesvin_background_image'::text, 'rise_of_fedesvin_frame_image'::text,
    'rise_of_fedesvin_frame_size'::text, 'rise_of_fedesvin_frame_width'::text, 'rise_of_fedesvin_frame_height'::text,
    'rise_of_fedesvin_frame_offset_x'::text, 'rise_of_fedesvin_frame_offset_y'::text,
    'rise_of_fedesvin_title_image'::text,
    'rise_of_fedesvin_locked'::text, 'rise_of_fedesvin_password'::text,
    'rise_of_fedesvin_sound_file_background_music'::text, 'rise_of_fedesvin_sound_file_spin'::text,
    'rise_of_fedesvin_sound_file_stop'::text, 'rise_of_fedesvin_sound_file_small_win'::text,
    'rise_of_fedesvin_sound_file_medium_win'::text, 'rise_of_fedesvin_sound_file_big_win'::text,
    'rise_of_fedesvin_sound_file_bonus_trigger'::text, 'rise_of_fedesvin_sound_file_bonus_win'::text,
    'rise_of_fedesvin_sound_file_bonus_symbol_scroll'::text, 'rise_of_fedesvin_sound_file_bonus_symbol_selected'::text,
    'rise_of_fedesvin_sound_file_scatter_1'::text, 'rise_of_fedesvin_sound_file_scatter_2'::text,
    'rise_of_fedesvin_sound_file_scatter_3'::text, 'rise_of_fedesvin_sound_file_scatter_celebration'::text,
    'rise_of_fedesvin_sidepanel_gap'::text, 'rise_of_fedesvin_controls_gap'::text
  ]))
  OR has_role(auth.uid(), 'admin'::app_role)
);