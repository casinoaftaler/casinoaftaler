
-- Add source-verified fields to casino_compliance
ALTER TABLE public.casino_compliance
  ADD COLUMN IF NOT EXISTS license_holder_name TEXT,
  ADD COLUMN IF NOT EXISTS license_source_url TEXT NOT NULL DEFAULT 'https://spillemyndigheden.dk/tilladelsesindehavere',
  ADD COLUMN IF NOT EXISTS license_verified_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ADD COLUMN IF NOT EXISTS bonus_source_url TEXT NOT NULL DEFAULT 'https://spillemyndigheden.dk/tilladelsesindehavere',
  ADD COLUMN IF NOT EXISTS bonus_verified_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add HTTPS constraints
ALTER TABLE public.casino_compliance
  ADD CONSTRAINT chk_license_source_url_https CHECK (license_source_url LIKE 'https://%'),
  ADD CONSTRAINT chk_bonus_source_url_https CHECK (bonus_source_url LIKE 'https://%');

-- Update the log_compliance_changes trigger to also log source URL changes
CREATE OR REPLACE FUNCTION public.log_compliance_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Log license_status changes
  IF OLD.license_status IS DISTINCT FROM NEW.license_status THEN
    INSERT INTO casino_compliance_history (casino_slug, field_changed, old_value, new_value, change_type, source_url)
    VALUES (NEW.casino_slug, 'license_status', OLD.license_status::text, NEW.license_status::text, 'license_change', NEW.license_source_url);
  END IF;

  -- Log bonus_max_amount changes
  IF OLD.bonus_max_amount IS DISTINCT FROM NEW.bonus_max_amount THEN
    INSERT INTO casino_compliance_history (casino_slug, field_changed, old_value, new_value, change_type, source_url)
    VALUES (NEW.casino_slug, 'bonus_max_amount', OLD.bonus_max_amount::text, NEW.bonus_max_amount::text, 'bonus_change', NEW.bonus_source_url);
  END IF;

  -- Log bonus_wager_requirement changes
  IF OLD.bonus_wager_requirement IS DISTINCT FROM NEW.bonus_wager_requirement THEN
    INSERT INTO casino_compliance_history (casino_slug, field_changed, old_value, new_value, change_type, source_url)
    VALUES (NEW.casino_slug, 'bonus_wager_requirement', OLD.bonus_wager_requirement::text, NEW.bonus_wager_requirement::text, 'wager_change', NEW.bonus_source_url);
  END IF;

  -- Log license_source_url changes
  IF OLD.license_source_url IS DISTINCT FROM NEW.license_source_url THEN
    INSERT INTO casino_compliance_history (casino_slug, field_changed, old_value, new_value, change_type, source_url)
    VALUES (NEW.casino_slug, 'license_source_url', OLD.license_source_url, NEW.license_source_url, 'license_change', NEW.license_source_url);
  END IF;

  -- Log bonus_source_url changes
  IF OLD.bonus_source_url IS DISTINCT FROM NEW.bonus_source_url THEN
    INSERT INTO casino_compliance_history (casino_slug, field_changed, old_value, new_value, change_type, source_url)
    VALUES (NEW.casino_slug, 'bonus_source_url', OLD.bonus_source_url, NEW.bonus_source_url, 'bonus_change', NEW.bonus_source_url);
  END IF;

  RETURN NEW;
END;
$function$;
