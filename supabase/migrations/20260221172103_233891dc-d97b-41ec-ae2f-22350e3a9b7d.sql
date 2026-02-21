
-- 1. Create compliance history table for change logging
CREATE TABLE public.casino_compliance_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  casino_slug TEXT NOT NULL,
  field_changed TEXT NOT NULL CHECK (field_changed IN ('license_status', 'bonus_max_amount', 'bonus_wager_requirement')),
  old_value TEXT NOT NULL,
  new_value TEXT NOT NULL,
  change_type TEXT NOT NULL CHECK (change_type IN ('license_change', 'bonus_change', 'wager_change')),
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source_url TEXT NOT NULL DEFAULT 'https://spillemyndigheden.dk/tilladelsesindehavere',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.casino_compliance_history ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view compliance history"
ON public.casino_compliance_history
FOR SELECT
USING (true);

-- Admin full access
CREATE POLICY "Admins can manage compliance history"
ON public.casino_compliance_history
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Index for fast queries
CREATE INDEX idx_compliance_history_changed_at ON public.casino_compliance_history (changed_at DESC);
CREATE INDEX idx_compliance_history_casino_slug ON public.casino_compliance_history (casino_slug);

-- 2. Trigger function to auto-log changes
CREATE OR REPLACE FUNCTION public.log_compliance_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Log license_status changes
  IF OLD.license_status IS DISTINCT FROM NEW.license_status THEN
    INSERT INTO casino_compliance_history (casino_slug, field_changed, old_value, new_value, change_type, source_url)
    VALUES (NEW.casino_slug, 'license_status', OLD.license_status::text, NEW.license_status::text, 'license_change', NEW.source_url);
  END IF;

  -- Log bonus_max_amount changes
  IF OLD.bonus_max_amount IS DISTINCT FROM NEW.bonus_max_amount THEN
    INSERT INTO casino_compliance_history (casino_slug, field_changed, old_value, new_value, change_type, source_url)
    VALUES (NEW.casino_slug, 'bonus_max_amount', OLD.bonus_max_amount::text, NEW.bonus_max_amount::text, 'bonus_change', NEW.source_url);
  END IF;

  -- Log bonus_wager_requirement changes
  IF OLD.bonus_wager_requirement IS DISTINCT FROM NEW.bonus_wager_requirement THEN
    INSERT INTO casino_compliance_history (casino_slug, field_changed, old_value, new_value, change_type, source_url)
    VALUES (NEW.casino_slug, 'bonus_wager_requirement', OLD.bonus_wager_requirement::text, NEW.bonus_wager_requirement::text, 'wager_change', NEW.source_url);
  END IF;

  RETURN NEW;
END;
$$;

-- 3. Attach trigger to casino_compliance table
CREATE TRIGGER trg_log_compliance_changes
AFTER UPDATE ON public.casino_compliance
FOR EACH ROW
EXECUTE FUNCTION public.log_compliance_changes();
