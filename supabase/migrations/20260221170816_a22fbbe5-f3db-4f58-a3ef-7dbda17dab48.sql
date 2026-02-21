
-- Create license_status enum
CREATE TYPE public.license_status AS ENUM ('valid', 'suspended', 'revoked');

-- Create casino_compliance table
CREATE TABLE public.casino_compliance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  casino_slug TEXT NOT NULL UNIQUE,
  casino_name TEXT NOT NULL,
  license_number TEXT NOT NULL DEFAULT '',
  license_status license_status NOT NULL DEFAULT 'valid',
  bonus_max_amount NUMERIC NOT NULL DEFAULT 0,
  bonus_wager_requirement NUMERIC NOT NULL DEFAULT 0,
  bonus_compliant BOOLEAN NOT NULL DEFAULT false,
  compliance_score INTEGER NOT NULL DEFAULT 0,
  last_checked TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source_url TEXT NOT NULL DEFAULT 'https://spillemyndigheden.dk/tilladelsesindehavere',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.casino_compliance ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view compliance data"
ON public.casino_compliance
FOR SELECT
USING (true);

-- Admin full access
CREATE POLICY "Admins can manage compliance data"
ON public.casino_compliance
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_casino_compliance_updated_at
BEFORE UPDATE ON public.casino_compliance
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for fast slug lookups
CREATE INDEX idx_casino_compliance_slug ON public.casino_compliance (casino_slug);
