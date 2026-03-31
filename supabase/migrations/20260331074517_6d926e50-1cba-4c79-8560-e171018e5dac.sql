
CREATE OR REPLACE FUNCTION public.claim_scroll_depth_bonus(p_user_id uuid, p_page_path text, p_today date)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_reward RECORD;
  v_bonus integer := 300;
BEGIN
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

  UPDATE daily_dwell_rewards
  SET scroll_depth_bonus = v_bonus
  WHERE id = v_reward.id;

  UPDATE slot_spins
  SET spins_remaining = spins_remaining + v_bonus
  WHERE user_id = p_user_id AND date = p_today AND game_id = 'shared';

  INSERT INTO credit_allocation_log (user_id, amount, source, note)
  VALUES (p_user_id, v_bonus, 'scroll_depth_bonus', 'Scroll 60%+ bonus: ' || p_page_path);

  RETURN jsonb_build_object('success', true, 'credits', v_bonus);
END;
$function$;
