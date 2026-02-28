
CREATE TABLE public.bonus_hunt_slot_coupons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  session_id uuid REFERENCES public.bonus_hunt_sessions(id),
  hunt_number integer NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.bonus_hunt_slot_coupons ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX idx_slot_coupons_user_session ON public.bonus_hunt_slot_coupons(user_id, hunt_number);

CREATE POLICY "Anyone can view slot coupons"
ON public.bonus_hunt_slot_coupons FOR SELECT USING (true);

CREATE POLICY "Users can insert own slot coupons"
ON public.bonus_hunt_slot_coupons FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own slot coupons"
ON public.bonus_hunt_slot_coupons FOR UPDATE USING (auth.uid() = user_id);
