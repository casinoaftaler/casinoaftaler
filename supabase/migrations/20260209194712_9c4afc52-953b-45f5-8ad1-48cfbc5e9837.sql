
-- Table: community_bonus_spins
CREATE TABLE public.community_bonus_spins (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  total_earned integer NOT NULL DEFAULT 0,
  total_activated integer NOT NULL DEFAULT 0,
  rewarded_clips_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.community_bonus_spins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own community bonus spins"
  ON public.community_bonus_spins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own community bonus spins"
  ON public.community_bonus_spins FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own community bonus spins"
  ON public.community_bonus_spins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all community bonus spins"
  ON public.community_bonus_spins FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Table: community_bonus_spins_log
CREATE TABLE public.community_bonus_spins_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  clip_id uuid,
  event_type text NOT NULL,
  amount integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.community_bonus_spins_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bonus spins log"
  ON public.community_bonus_spins_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bonus spins log"
  ON public.community_bonus_spins_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all bonus spins log"
  ON public.community_bonus_spins_log FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger: updated_at on community_bonus_spins
CREATE TRIGGER update_community_bonus_spins_updated_at
  BEFORE UPDATE ON public.community_bonus_spins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger function: auto-reward on clip approval
CREATE OR REPLACE FUNCTION public.reward_community_bonus_spins()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
AS $$
DECLARE
  v_record community_bonus_spins%ROWTYPE;
BEGIN
  -- Only fire when status changes TO 'approved'
  IF NEW.status = 'approved' AND (OLD.status IS DISTINCT FROM 'approved') THEN
    -- Upsert the user's community_bonus_spins row
    INSERT INTO community_bonus_spins (user_id)
      VALUES (NEW.user_id)
      ON CONFLICT (user_id) DO NOTHING;

    SELECT * INTO v_record
      FROM community_bonus_spins
      WHERE user_id = NEW.user_id
      FOR UPDATE;

    IF v_record.rewarded_clips_count < 5 THEN
      UPDATE community_bonus_spins
        SET total_earned = total_earned + 50,
            rewarded_clips_count = rewarded_clips_count + 1
        WHERE user_id = NEW.user_id;

      INSERT INTO community_bonus_spins_log (user_id, clip_id, event_type, amount)
        VALUES (NEW.user_id, NEW.id, 'reward', 50);
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_reward_community_bonus_spins
  AFTER UPDATE ON public.community_clips
  FOR EACH ROW
  EXECUTE FUNCTION public.reward_community_bonus_spins();
