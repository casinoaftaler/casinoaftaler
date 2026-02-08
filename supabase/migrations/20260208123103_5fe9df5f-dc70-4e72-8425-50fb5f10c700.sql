-- Add gambling profile fields to the profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS highest_win_amount NUMERIC,
ADD COLUMN IF NOT EXISTS highest_win_game TEXT,
ADD COLUMN IF NOT EXISTS highest_win_casino TEXT,
ADD COLUMN IF NOT EXISTS biggest_spin_win NUMERIC,
ADD COLUMN IF NOT EXISTS biggest_x_win NUMERIC,
ADD COLUMN IF NOT EXISTS favorite_slot TEXT,
ADD COLUMN IF NOT EXISTS favorite_provider TEXT,
ADD COLUMN IF NOT EXISTS favorite_casino TEXT,
ADD COLUMN IF NOT EXISTS typical_bet_size TEXT,
ADD COLUMN IF NOT EXISTS play_styles TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS preferred_game_type TEXT DEFAULT 'both',
ADD COLUMN IF NOT EXISTS volatility_preference TEXT DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS stats_public BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS hide_amounts BOOLEAN DEFAULT false;

-- Add comments for documentation
COMMENT ON COLUMN public.profiles.bio IS 'Short bio describing play style and preferences';
COMMENT ON COLUMN public.profiles.highest_win_amount IS 'User-reported highest win amount';
COMMENT ON COLUMN public.profiles.highest_win_game IS 'Game where highest win occurred';
COMMENT ON COLUMN public.profiles.highest_win_casino IS 'Casino where highest win occurred';
COMMENT ON COLUMN public.profiles.biggest_spin_win IS 'Biggest single spin win amount';
COMMENT ON COLUMN public.profiles.biggest_x_win IS 'Biggest multiplier win (e.g. 1200 for 1200x)';
COMMENT ON COLUMN public.profiles.favorite_slot IS 'Users favorite slot game';
COMMENT ON COLUMN public.profiles.favorite_provider IS 'Users favorite game provider';
COMMENT ON COLUMN public.profiles.favorite_casino IS 'Users favorite casino';
COMMENT ON COLUMN public.profiles.typical_bet_size IS 'Typical bet size range';
COMMENT ON COLUMN public.profiles.play_styles IS 'Array of play style tags';
COMMENT ON COLUMN public.profiles.preferred_game_type IS 'slots, live_casino, or both';
COMMENT ON COLUMN public.profiles.volatility_preference IS 'low, medium, or high';
COMMENT ON COLUMN public.profiles.stats_public IS 'Whether gambling stats are publicly visible';
COMMENT ON COLUMN public.profiles.hide_amounts IS 'Whether to hide monetary amounts publicly';