
-- Add streak tracking columns to daily_dwell_rewards system
-- We track streaks via a view/function rather than a separate table

-- Add scroll_depth_bonus column to daily_dwell_rewards
ALTER TABLE public.daily_dwell_rewards 
ADD COLUMN IF NOT EXISTS scroll_depth_bonus integer NOT NULL DEFAULT 0;

-- Create streak tracking table
CREATE TABLE IF NOT EXISTS public.mission_streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_completed_date date,
  streak_3_claimed boolean NOT NULL DEFAULT false,
  streak_7_claimed boolean NOT NULL DEFAULT false,
  streak_30_claimed boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mission_streaks ENABLE ROW LEVEL SECURITY;

-- Users can read their own streak
CREATE POLICY "Users can read own streak"
ON public.mission_streaks FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own streak
CREATE POLICY "Users can insert own streak"
ON public.mission_streaks FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Function to update streak and award bonuses
CREATE OR REPLACE FUNCTION public.update_mission_streak(p_user_id uuid, p_today date)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_streak RECORD;
  v_completed_today integer;
  v_rewards jsonb := '[]'::jsonb;
  v_bonus integer;
  v_spins RECORD;
BEGIN
  -- Count completed missions today
  SELECT COUNT(*) INTO v_completed_today
  FROM daily_dwell_rewards
  WHERE user_id = p_user_id AND reward_date = p_today;

  -- Only update streak if all 6 missions are done
  IF v_completed_today < 6 THEN
    RETURN jsonb_build_object('streak_updated', false, 'completed_today', v_completed_today);
  END IF;

  -- Get or create streak record
  INSERT INTO mission_streaks (user_id, current_streak, last_completed_date)
  VALUES (p_user_id, 0, NULL)
  ON CONFLICT (user_id) DO NOTHING;

  SELECT * INTO v_streak
  FROM mission_streaks
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- Already processed today
  IF v_streak.last_completed_date = p_today THEN
    RETURN jsonb_build_object(
      'streak_updated', false,
      'current_streak', v_streak.current_streak,
      'longest_streak', v_streak.longest_streak
    );
  END IF;

  -- Check if streak continues (yesterday or first day)
  IF v_streak.last_completed_date = p_today - 1 OR v_streak.last_completed_date IS NULL THEN
    UPDATE mission_streaks
    SET current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_completed_date = p_today,
        updated_at = now()
    WHERE user_id = p_user_id
    RETURNING * INTO v_streak;
  ELSE
    -- Streak broken, reset to 1
    UPDATE mission_streaks
    SET current_streak = 1,
        last_completed_date = p_today,
        streak_3_claimed = false,
        streak_7_claimed = false,
        streak_30_claimed = false,
        updated_at = now()
    WHERE user_id = p_user_id
    RETURNING * INTO v_streak;
  END IF;

  -- Award streak bonuses
  -- 3-day streak: 500 credits
  IF v_streak.current_streak >= 3 AND NOT v_streak.streak_3_claimed THEN
    v_bonus := 500;
    UPDATE mission_streaks SET streak_3_claimed = true WHERE user_id = p_user_id;
    
    SELECT id, spins_remaining INTO v_spins
    FROM slot_spins WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared'
    FOR UPDATE;
    
    IF FOUND THEN
      UPDATE slot_spins SET spins_remaining = spins_remaining + v_bonus WHERE id = v_spins.id;
    ELSE
      INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
      VALUES (p_user_id, p_today, v_bonus, 'shared')
      ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + v_bonus;
    END IF;
    
    INSERT INTO credit_allocation_log (user_id, amount, source, note)
    VALUES (p_user_id, v_bonus, 'streak_bonus', '3-dags streak bonus');
    
    v_rewards := v_rewards || jsonb_build_object('type', '3-day', 'credits', v_bonus);
  END IF;

  -- 7-day streak: 1500 credits
  IF v_streak.current_streak >= 7 AND NOT v_streak.streak_7_claimed THEN
    v_bonus := 1500;
    UPDATE mission_streaks SET streak_7_claimed = true WHERE user_id = p_user_id;
    
    UPDATE slot_spins SET spins_remaining = spins_remaining + v_bonus
    WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared';
    
    INSERT INTO credit_allocation_log (user_id, amount, source, note)
    VALUES (p_user_id, v_bonus, 'streak_bonus', '7-dags streak bonus');
    
    v_rewards := v_rewards || jsonb_build_object('type', '7-day', 'credits', v_bonus);
  END IF;

  -- 30-day streak: 5000 credits
  IF v_streak.current_streak >= 30 AND NOT v_streak.streak_30_claimed THEN
    v_bonus := 5000;
    UPDATE mission_streaks SET streak_30_claimed = true WHERE user_id = p_user_id;
    
    UPDATE slot_spins SET spins_remaining = spins_remaining + v_bonus
    WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared';
    
    INSERT INTO credit_allocation_log (user_id, amount, source, note)
    VALUES (p_user_id, v_bonus, 'streak_bonus', '30-dags streak bonus');
    
    v_rewards := v_rewards || jsonb_build_object('type', '30-day', 'credits', v_bonus);
  END IF;

  RETURN jsonb_build_object(
    'streak_updated', true,
    'current_streak', v_streak.current_streak,
    'longest_streak', v_streak.longest_streak,
    'rewards', v_rewards
  );
END;
$$;

-- Function to claim scroll depth bonus (extra 100 credits for 60%+ scroll)
CREATE OR REPLACE FUNCTION public.claim_scroll_depth_bonus(p_user_id uuid, p_page_path text, p_today date)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_reward RECORD;
  v_bonus integer := 100;
BEGIN
  -- Check the dwell reward exists and scroll bonus not yet claimed
  SELECT * INTO v_reward
  FROM daily_dwell_rewards
  WHERE user_id = p_user_id AND page_path = p_page_path AND reward_date = p_today
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Complete the dwell mission first');
  END IF;

  IF v_reward.scroll_depth_bonus > 0 THEN
    RETURN jsonb_build_object('error', 'Scroll bonus already claimed');
  END IF;

  -- Award the bonus
  UPDATE daily_dwell_rewards
  SET scroll_depth_bonus = v_bonus
  WHERE id = v_reward.id;

  -- Add credits
  UPDATE slot_spins
  SET spins_remaining = spins_remaining + v_bonus
  WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared';

  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, v_bonus, 'scroll_depth_bonus', 'Scroll 60%+ bonus: ' || p_page_path);

  RETURN jsonb_build_object('success', true, 'credits', v_bonus);
END;
$$;
