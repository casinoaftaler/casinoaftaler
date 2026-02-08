-- Update profiles_public view to make all profiles public
-- Remove the stats_public filter so all profiles with display_name are visible
CREATE OR REPLACE VIEW public.profiles_public 
WITH (security_invoker = on)
AS
SELECT 
    user_id,
    display_name,
    avatar_url,
    bio,
    CASE
        WHEN hide_amounts = true THEN NULL::numeric
        ELSE highest_win_amount
    END AS highest_win_amount,
    highest_win_game,
    highest_win_casino,
    CASE
        WHEN hide_amounts = true THEN NULL::numeric
        ELSE biggest_spin_win
    END AS biggest_spin_win,
    CASE
        WHEN hide_amounts = true THEN NULL::numeric
        ELSE biggest_x_win
    END AS biggest_x_win,
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