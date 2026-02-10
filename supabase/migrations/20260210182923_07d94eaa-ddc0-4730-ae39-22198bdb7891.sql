
-- Create redeem_codes table
CREATE TABLE public.redeem_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  credits_amount INTEGER NOT NULL,
  usage_type TEXT NOT NULL DEFAULT 'one_per_user' CHECK (usage_type IN ('single_user', 'one_per_user')),
  max_uses INTEGER,
  times_used INTEGER NOT NULL DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create redeem_code_uses table
CREATE TABLE public.redeem_code_uses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code_id UUID NOT NULL REFERENCES public.redeem_codes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  credits_awarded INTEGER NOT NULL,
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(code_id, user_id)
);

-- RLS for redeem_codes
ALTER TABLE public.redeem_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view active codes"
  ON public.redeem_codes FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert codes"
  ON public.redeem_codes FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update codes"
  ON public.redeem_codes FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete codes"
  ON public.redeem_codes FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS for redeem_code_uses
ALTER TABLE public.redeem_code_uses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own redemptions"
  ON public.redeem_code_uses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all redemptions"
  ON public.redeem_code_uses FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
