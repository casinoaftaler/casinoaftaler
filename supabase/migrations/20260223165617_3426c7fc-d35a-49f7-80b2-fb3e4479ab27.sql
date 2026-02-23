
-- Slot catalog table
CREATE TABLE public.slot_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_name text UNIQUE NOT NULL,
  provider text NOT NULL DEFAULT '',
  rtp numeric,
  volatility text,
  max_potential text,
  highest_win numeric DEFAULT 0,
  highest_x numeric DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.slot_catalog ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view slot catalog"
  ON public.slot_catalog FOR SELECT USING (true);

CREATE POLICY "Admins can manage slot catalog"
  ON public.slot_catalog FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Provider overrides table
CREATE TABLE public.bonus_hunt_provider_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_name text UNIQUE NOT NULL,
  provider_override text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bonus_hunt_provider_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view provider overrides"
  ON public.bonus_hunt_provider_overrides FOR SELECT USING (true);

CREATE POLICY "Admins can manage provider overrides"
  ON public.bonus_hunt_provider_overrides FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at on slot_catalog
CREATE TRIGGER update_slot_catalog_updated_at
  BEFORE UPDATE ON public.slot_catalog
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
