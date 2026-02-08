-- Recreate profiles_public as a security-definer view so any user can view public profiles
-- This is safe because the view only exposes non-sensitive fields and respects hide_amounts
DROP VIEW IF EXISTS public.profiles_public;

CREATE VIEW public.profiles_public
WITH (security_invoker = false) AS
SELECT 
    user_id,
    display_name,
    avatar_url,
    bio,
    CASE WHEN hide_amounts = true THEN NULL::numeric ELSE highest_win_amount END AS highest_win_amount,
    highest_win_game,
    highest_win_casino,
    CASE WHEN hide_amounts = true THEN NULL::numeric ELSE biggest_spin_win END AS biggest_spin_win,
    CASE WHEN hide_amounts = true THEN NULL::numeric ELSE biggest_x_win END AS biggest_x_win,
    favorite_slot,
    favorite_provider,
    favorite_casino,
    typical_bet_size,
    play_styles,
    preferred_game_type,
    volatility_preference,
    hide_amounts,
    created_at
FROM profiles
WHERE display_name IS NOT NULL;