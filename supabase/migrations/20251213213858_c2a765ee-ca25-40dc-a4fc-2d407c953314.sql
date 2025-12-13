-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create casinos table
CREATE TABLE public.casinos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    rating DECIMAL(2,1) NOT NULL DEFAULT 4.5 CHECK (rating >= 0 AND rating <= 5),
    bonus_title TEXT NOT NULL,
    bonus_amount TEXT NOT NULL,
    bonus_type TEXT NOT NULL DEFAULT 'Sticky',
    wagering_requirements TEXT NOT NULL DEFAULT '35x',
    validity TEXT NOT NULL DEFAULT '30 days',
    min_deposit TEXT NOT NULL DEFAULT '$20',
    payout_time TEXT NOT NULL DEFAULT '24 hours',
    features TEXT[] DEFAULT '{}',
    pros TEXT[] DEFAULT '{}',
    cons TEXT[] DEFAULT '{}',
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on casinos
ALTER TABLE public.casinos ENABLE ROW LEVEL SECURITY;

-- Everyone can view active casinos
CREATE POLICY "Anyone can view active casinos"
ON public.casinos
FOR SELECT
USING (is_active = true);

-- Admins can view all casinos
CREATE POLICY "Admins can view all casinos"
ON public.casinos
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can insert casinos
CREATE POLICY "Admins can insert casinos"
ON public.casinos
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update casinos
CREATE POLICY "Admins can update casinos"
ON public.casinos
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete casinos
CREATE POLICY "Admins can delete casinos"
ON public.casinos
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_casinos_updated_at
BEFORE UPDATE ON public.casinos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial casino data
INSERT INTO public.casinos (name, slug, rating, bonus_title, bonus_amount, bonus_type, wagering_requirements, validity, min_deposit, payout_time, features, pros, cons, description) VALUES
('Royal Casino', 'royal-casino', 4.8, 'Welcome Bonus', '100% up to $1,000', 'No-sticky', '35x', '30 days', '$20', '24 hours', ARRAY['Live betting', 'Popular slots', 'Mobile friendly'], ARRAY['Fast withdrawals', 'Great game selection', '24/7 support'], ARRAY['High wagering requirements', 'Limited payment options'], 'Royal Casino offers an exceptional gaming experience with over 2,000 games from top providers.'),
('Lucky Star Casino', 'lucky-star-casino', 4.6, 'First Deposit Bonus', '200% up to $500', 'Sticky', '40x', '14 days', '$10', '48 hours', ARRAY['Free spins', 'VIP program', 'Crypto accepted'], ARRAY['Low minimum deposit', 'Generous bonus', 'VIP rewards'], ARRAY['Sticky bonus terms', 'Slower payouts'], 'Lucky Star Casino brings the excitement with a massive 200% welcome bonus.'),
('Diamond Club', 'diamond-club', 4.9, 'Exclusive Bonus', '150% up to $750 + 100 Free Spins', 'No-sticky', '30x', '21 days', '$25', '12 hours', ARRAY['Fast payout', 'Live dealers', 'Table games'], ARRAY['Fastest payouts', 'Low wagering', 'Free spins included'], ARRAY['Higher minimum deposit', 'Limited countries'], 'Diamond Club is the premium choice for serious players with industry-leading payout speeds.'),
('Golden Tiger', 'golden-tiger', 4.5, 'Welcome Package', '$1,500 Welcome Package', 'Split bonus', '50x', '7 days', '$15', '72 hours', ARRAY['Progressive jackpots', 'Mobile app', 'Weekly promotions'], ARRAY['Huge bonus package', 'Many promotions', 'Good mobile app'], ARRAY['Short validity period', 'High wagering'], 'Golden Tiger offers one of the largest welcome packages in the industry.');