
-- ============================================================
-- SECURITY HARDENING: Prevent client-side manipulation
-- All write operations must go through secure edge functions
-- ============================================================

-- 1. SLOT_GAME_RESULTS: Only server (service role) can insert
-- Users could previously insert fake win records via Postman
DROP POLICY IF EXISTS "Authenticated users can insert game results" ON public.slot_game_results;

-- 2. SLOT_SPINS: Only server can insert/update
-- Users could previously give themselves unlimited credits
DROP POLICY IF EXISTS "Users can insert their own spins" ON public.slot_spins;
DROP POLICY IF EXISTS "Users can update their own spins" ON public.slot_spins;

-- 3. SLOT_BONUS_STATE: Only server can insert/update
-- Users could previously give themselves unlimited free spins
DROP POLICY IF EXISTS "Users can insert own bonus state" ON public.slot_bonus_state;
DROP POLICY IF EXISTS "Users can update own bonus state" ON public.slot_bonus_state;

-- 4. PROFILES: Trigger to protect sensitive columns from client-side manipulation
-- Users can still update their own profile (bio, favorites, etc.)
-- but cannot modify bonus_spins_permanent or section_completed flags
CREATE OR REPLACE FUNCTION public.protect_profile_sensitive_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- Service role (edge functions) can modify anything
  IF current_setting('request.jwt.claim.role', true) = 'service_role' THEN
    RETURN NEW;
  END IF;
  
  -- Regular users: silently revert changes to sensitive fields
  NEW.bonus_spins_permanent := OLD.bonus_spins_permanent;
  NEW.profile_section_completed := OLD.profile_section_completed;
  NEW.stats_section_completed := OLD.stats_section_completed;
  NEW.favorites_section_completed := OLD.favorites_section_completed;
  NEW.playstyle_section_completed := OLD.playstyle_section_completed;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS protect_profiles_sensitive ON public.profiles;
CREATE TRIGGER protect_profiles_sensitive
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profile_sensitive_fields();

-- 5. COMMUNITY_BONUS_SPINS: Trigger to protect server-managed fields
-- Users can still update total_activated (via edge function)
-- but cannot modify total_earned or rewarded_clips_count
CREATE OR REPLACE FUNCTION public.protect_community_bonus_sensitive_fields()
RETURNS TRIGGER AS $$
BEGIN
  IF current_setting('request.jwt.claim.role', true) = 'service_role' THEN
    RETURN NEW;
  END IF;
  
  -- Regular users cannot inflate their earned spins
  NEW.total_earned := OLD.total_earned;
  NEW.rewarded_clips_count := OLD.rewarded_clips_count;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS protect_community_bonus_sensitive ON public.community_bonus_spins;
CREATE TRIGGER protect_community_bonus_sensitive
  BEFORE UPDATE ON public.community_bonus_spins
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_community_bonus_sensitive_fields();
