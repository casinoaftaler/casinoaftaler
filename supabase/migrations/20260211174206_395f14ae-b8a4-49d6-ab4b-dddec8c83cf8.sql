
-- Fix: Protect total_activated from direct client manipulation
CREATE OR REPLACE FUNCTION public.protect_community_bonus_sensitive_fields()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Service role (edge functions / RPC with service client) can modify anything
  IF current_setting('request.jwt.claim.role', true) = 'service_role' THEN
    RETURN NEW;
  END IF;
  
  -- Regular users cannot modify any credit-related fields
  NEW.total_earned := OLD.total_earned;
  NEW.total_activated := OLD.total_activated;
  NEW.rewarded_clips_count := OLD.rewarded_clips_count;
  
  RETURN NEW;
END;
$function$;

-- Ensure the trigger exists on the table
DROP TRIGGER IF EXISTS protect_community_bonus_sensitive_fields ON community_bonus_spins;
CREATE TRIGGER protect_community_bonus_sensitive_fields
  BEFORE UPDATE ON community_bonus_spins
  FOR EACH ROW
  EXECUTE FUNCTION protect_community_bonus_sensitive_fields();
