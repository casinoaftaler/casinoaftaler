-- Drop and recreate views with security_invoker=on
-- This ensures RLS policies are enforced based on the querying user, not the view creator

-- 1. Recreate casinos_public view with security invoker
DROP VIEW IF EXISTS public.casinos_public;
CREATE VIEW public.casinos_public
WITH (security_invoker=on) AS
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
  updated_at
FROM casinos
WHERE is_active = true;

-- 2. Recreate shop_items_public view with security invoker
DROP VIEW IF EXISTS public.shop_items_public;
CREATE VIEW public.shop_items_public
WITH (security_invoker=on) AS
SELECT 
  id,
  name,
  slug,
  description,
  image_url,
  price,
  stock,
  position,
  is_active,
  created_at,
  updated_at
FROM shop_items
WHERE is_active = true
ORDER BY position;

-- 3. Recreate slot_leaderboard view with security invoker
DROP VIEW IF EXISTS public.slot_leaderboard;
CREATE VIEW public.slot_leaderboard
WITH (security_invoker=on) AS
SELECT 
  user_id,
  SUM(win_amount + bonus_win_amount)::numeric(10,2) AS total_winnings,
  MAX(win_amount + bonus_win_amount)::numeric(10,2) AS biggest_win,
  COUNT(*) AS total_spins,
  SUM(CASE WHEN created_at >= CURRENT_DATE THEN win_amount + bonus_win_amount ELSE 0 END)::numeric(10,2) AS daily_winnings,
  SUM(CASE WHEN created_at >= date_trunc('week', CURRENT_DATE) THEN win_amount + bonus_win_amount ELSE 0 END)::numeric(10,2) AS weekly_winnings
FROM slot_game_results
GROUP BY user_id;