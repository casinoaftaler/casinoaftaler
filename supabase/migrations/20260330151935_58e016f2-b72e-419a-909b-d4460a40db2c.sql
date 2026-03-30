
-- Table to track daily dwell rewards (which pages a user completed today)
CREATE TABLE public.daily_dwell_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  page_path text NOT NULL,
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  credits_awarded integer NOT NULL DEFAULT 300,
  reward_date date NOT NULL DEFAULT CURRENT_DATE
);

-- Unique constraint: one reward per user per page per day
CREATE UNIQUE INDEX idx_dwell_rewards_unique ON public.daily_dwell_rewards (user_id, page_path, reward_date);

-- Index for quick lookups
CREATE INDEX idx_dwell_rewards_user_date ON public.daily_dwell_rewards (user_id, reward_date);

-- Enable RLS
ALTER TABLE public.daily_dwell_rewards ENABLE ROW LEVEL SECURITY;

-- Users can view their own rewards
CREATE POLICY "Users can view own dwell rewards"
  ON public.daily_dwell_rewards FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all
CREATE POLICY "Admins can view all dwell rewards"
  ON public.daily_dwell_rewards FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RPC function to claim a dwell reward (server-side validation)
CREATE OR REPLACE FUNCTION public.claim_dwell_reward(p_user_id uuid, p_page_path text, p_today date)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_daily_count integer;
  v_credits integer := 300;
  v_spins_record RECORD;
BEGIN
  -- Validate page is in allowed list
  IF p_page_path NOT IN (
    '/top-10-casino-online',
    '/casino-bonus',
    '/free-spins',
    '/live-casino',
    '/nye-casinoer'
  ) THEN
    RETURN jsonb_build_object('error', 'Invalid page');
  END IF;

  -- Check if already claimed today for this page
  IF EXISTS (
    SELECT 1 FROM daily_dwell_rewards
    WHERE user_id = p_user_id AND page_path = p_page_path AND reward_date = p_today
  ) THEN
    RETURN jsonb_build_object('error', 'Already claimed today');
  END IF;

  -- Check daily cap (max 5 per day)
  SELECT COUNT(*) INTO v_daily_count
  FROM daily_dwell_rewards
  WHERE user_id = p_user_id AND reward_date = p_today;

  IF v_daily_count >= 5 THEN
    RETURN jsonb_build_object('error', 'Daily limit reached');
  END IF;

  -- Insert the reward record
  INSERT INTO daily_dwell_rewards (user_id, page_path, credits_awarded, reward_date)
  VALUES (p_user_id, p_page_path, v_credits, p_today);

  -- Add credits to shared slot_spins
  SELECT id, spins_remaining INTO v_spins_record
  FROM slot_spins
  WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
  FOR UPDATE;

  IF FOUND THEN
    UPDATE slot_spins
    SET spins_remaining = spins_remaining + v_credits
    WHERE id = v_spins_record.id;
  ELSE
    INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
    VALUES (p_user_id, p_today, v_credits, 'shared')
    ON CONFLICT (user_id, date, game_id) DO UPDATE
    SET spins_remaining = slot_spins.spins_remaining + v_credits;
  END IF;

  -- Log the credit allocation
  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, v_credits, 'dwell_reward', 'Dwell reward: ' || p_page_path);

  RETURN jsonb_build_object(
    'success', true,
    'credits', v_credits,
    'page', p_page_path,
    'dailyCompleted', v_daily_count + 1
  );
END;
$$;
