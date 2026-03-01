
-- Add coupon market results to sessions so admins can mark outcomes
ALTER TABLE public.bonus_hunt_sessions
ADD COLUMN IF NOT EXISTS coupon_results jsonb DEFAULT NULL;

COMMENT ON COLUMN public.bonus_hunt_sessions.coupon_results IS 'JSON object mapping market index to boolean result, e.g. {"0": true, "1": false, ...}';
