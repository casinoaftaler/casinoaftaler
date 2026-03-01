
-- Add coupon control columns to bonus_hunt_sessions
ALTER TABLE public.bonus_hunt_sessions 
ADD COLUMN coupon_betting_open boolean NOT NULL DEFAULT false,
ADD COLUMN coupon_markets jsonb NOT NULL DEFAULT '[]'::jsonb;

-- coupon_markets stores an array of market objects like:
-- [{ "q": "...", "oddsYes": 1.85, "oddsNo": 1.95, "aggressive": true, "enabled": true }]
