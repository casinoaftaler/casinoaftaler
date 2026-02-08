-- Create a public view for viewing public profiles
-- This view only exposes profiles where stats_public = true
-- and respects hide_amounts setting

CREATE VIEW public.profiles_public
WITH (security_invoker=false) AS
SELECT 
  user_id,
  display_name,
  avatar_url,
  bio,
  -- Stats (hidden if hide_amounts is true)
  CASE WHEN hide_amounts = true THEN NULL ELSE highest_win_amount END as highest_win_amount,
  highest_win_game,
  highest_win_casino,
  CASE WHEN hide_amounts = true THEN NULL ELSE biggest_spin_win END as biggest_spin_win,
  CASE WHEN hide_amounts = true THEN NULL ELSE biggest_x_win END as biggest_x_win,
  -- Preferences (always shown for public profiles)
  favorite_slot,
  favorite_provider,
  favorite_casino,
  typical_bet_size,
  play_styles,
  preferred_game_type,
  volatility_preference,
  -- Privacy flags
  hide_amounts,
  created_at
FROM public.profiles
WHERE stats_public = true 
  AND display_name IS NOT NULL;