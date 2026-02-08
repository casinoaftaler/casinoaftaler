-- Add profile completion tracking and permanent bonus spins columns
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS profile_section_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS stats_section_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS favorites_section_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS playstyle_section_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS bonus_spins_permanent INTEGER DEFAULT 0;

-- Add comment explaining the columns
COMMENT ON COLUMN public.profiles.bonus_spins_permanent IS 'Permanently earned bonus spins from profile completion rewards';