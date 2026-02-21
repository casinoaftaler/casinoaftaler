
-- Drop old check constraints and recreate with new allowed values
ALTER TABLE public.casino_compliance_history
  DROP CONSTRAINT casino_compliance_history_field_changed_check;

ALTER TABLE public.casino_compliance_history
  ADD CONSTRAINT casino_compliance_history_field_changed_check
  CHECK (field_changed = ANY (ARRAY[
    'license_status',
    'bonus_max_amount',
    'bonus_wager_requirement',
    'license_source_url',
    'bonus_source_url',
    'license_holder_name'
  ]));

ALTER TABLE public.casino_compliance_history
  DROP CONSTRAINT casino_compliance_history_change_type_check;

ALTER TABLE public.casino_compliance_history
  ADD CONSTRAINT casino_compliance_history_change_type_check
  CHECK (change_type = ANY (ARRAY[
    'license_change',
    'bonus_change',
    'wager_change',
    'source_change'
  ]));
