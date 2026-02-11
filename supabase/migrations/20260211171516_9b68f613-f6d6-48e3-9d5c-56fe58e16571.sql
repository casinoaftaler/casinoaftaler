
-- Fix: Update protect_profile_sensitive_fields trigger to allow claim_profile_section_reward RPC
CREATE OR REPLACE FUNCTION public.protect_profile_sensitive_fields()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Service role (edge functions) can modify anything
  IF current_setting('request.jwt.claim.role', true) = 'service_role' THEN
    RETURN NEW;
  END IF;
  
  -- Allow updates from claim_profile_section_reward RPC by checking if flag is set
  IF current_setting('app.allow_profile_update', true) = 'true' THEN
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
$function$;

-- Update claim_profile_section_reward to set the flag before updating
CREATE OR REPLACE FUNCTION public.claim_profile_section_reward(p_user_id uuid, p_section text, p_today date)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_profile RECORD;
  v_completed_col text;
  v_new_bonus int;
  v_spins_record RECORD;
  v_max_credits int := 1000;
BEGIN
  -- Validate section
  IF p_section NOT IN ('profile', 'stats', 'favorites', 'playstyle') THEN
    RETURN jsonb_build_object('error', 'Invalid section');
  END IF;

  v_completed_col := p_section || '_section_completed';

  -- Lock the profile row to prevent concurrent claims
  SELECT bonus_spins_permanent,
         profile_section_completed,
         stats_section_completed,
         favorites_section_completed,
         playstyle_section_completed
  INTO v_profile
  FROM profiles
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Profile not found');
  END IF;

  -- Check if already completed (atomic, under lock)
  IF (v_completed_col = 'profile_section_completed' AND v_profile.profile_section_completed) OR
     (v_completed_col = 'stats_section_completed' AND v_profile.stats_section_completed) OR
     (v_completed_col = 'favorites_section_completed' AND v_profile.favorites_section_completed) OR
     (v_completed_col = 'playstyle_section_completed' AND v_profile.playstyle_section_completed) THEN
    RETURN jsonb_build_object('error', 'Section already completed');
  END IF;

  v_new_bonus := COALESCE(v_profile.bonus_spins_permanent, 0) + 5;

  -- Set flag to allow trigger to pass
  PERFORM set_config('app.allow_profile_update', 'true', false);

  -- Update profile: mark section completed + increment bonus
  UPDATE profiles
  SET bonus_spins_permanent = v_new_bonus,
      profile_section_completed = CASE WHEN p_section = 'profile' THEN true ELSE profile_section_completed END,
      stats_section_completed = CASE WHEN p_section = 'stats' THEN true ELSE stats_section_completed END,
      favorites_section_completed = CASE WHEN p_section = 'favorites' THEN true ELSE favorites_section_completed END,
      playstyle_section_completed = CASE WHEN p_section = 'playstyle' THEN true ELSE playstyle_section_completed END
  WHERE user_id = p_user_id;

  -- Update today's spins (with cap)
  SELECT id, spins_remaining INTO v_spins_record
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_today
  FOR UPDATE;

  IF FOUND THEN
    UPDATE slot_spins
    SET spins_remaining = LEAST(v_spins_record.spins_remaining + 5, v_max_credits)
    WHERE id = v_spins_record.id;
  END IF;

  -- Log the allocation
  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, 5, 'profile_reward', 'Profil sektion: ' || p_section);

  RETURN jsonb_build_object('success', true, 'newBonusSpins', v_new_bonus);
END;
$function$;
