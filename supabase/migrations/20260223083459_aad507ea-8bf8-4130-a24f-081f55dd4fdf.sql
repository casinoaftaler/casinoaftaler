
-- Recreate the casinos_public view to include a has_affiliate flag
-- This exposes whether an affiliate link exists without revealing the URL itself
CREATE OR REPLACE VIEW public.casinos_public WITH (security_invoker = false) AS
SELECT
  id,
  name,
  slug,
  rating,
  bonus_title,
  bonus_amount,
  bonus_type,
  wagering_requirements,
  validity,
  min_deposit,
  payout_time,
  free_spins,
  features,
  pros,
  cons,
  description,
  is_active,
  is_recommended,
  is_hot,
  position,
  logo_url,
  game_providers,
  created_at,
  updated_at,
  (affiliate_url IS NOT NULL AND affiliate_url <> '') AS has_affiliate
FROM casinos
WHERE is_active = true;
