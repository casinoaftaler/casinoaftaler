
-- Enum for review status
CREATE TYPE public.review_status AS ENUM ('pending', 'approved', 'rejected');

-- Main reviews table
CREATE TABLE public.casino_user_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  casino_slug text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_name text,
  guest_email text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  review_text text NOT NULL,
  status review_status NOT NULL DEFAULT 'pending',
  rejection_reason text,
  helpful_count integer NOT NULL DEFAULT 0,
  is_verified_player boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Unique: one review per user per casino
CREATE UNIQUE INDEX idx_casino_user_reviews_user ON public.casino_user_reviews (user_id, casino_slug) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_casino_user_reviews_guest ON public.casino_user_reviews (guest_email, casino_slug) WHERE guest_email IS NOT NULL;

-- Aggregates table
CREATE TABLE public.casino_review_aggregates (
  casino_slug text PRIMARY KEY,
  avg_rating numeric NOT NULL DEFAULT 0,
  review_count integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Helpful votes tracking
CREATE TABLE public.casino_review_helpful_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid NOT NULL REFERENCES public.casino_user_reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (review_id, user_id)
);

-- Enable RLS
ALTER TABLE public.casino_user_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.casino_review_aggregates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.casino_review_helpful_votes ENABLE ROW LEVEL SECURITY;

-- RLS: casino_user_reviews
CREATE POLICY "Anyone can view approved reviews"
  ON public.casino_user_reviews FOR SELECT
  TO public
  USING (status = 'approved');

CREATE POLICY "Admins can view all reviews"
  ON public.casino_user_reviews FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can insert own reviews"
  ON public.casino_user_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Guests can insert reviews"
  ON public.casino_user_reviews FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL AND guest_name IS NOT NULL AND guest_email IS NOT NULL);

CREATE POLICY "Admins can update reviews"
  ON public.casino_user_reviews FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete reviews"
  ON public.casino_user_reviews FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS: casino_review_aggregates (public read)
CREATE POLICY "Anyone can view review aggregates"
  ON public.casino_review_aggregates FOR SELECT
  TO public
  USING (true);

-- RLS: casino_review_helpful_votes
CREATE POLICY "Anyone can view helpful votes"
  ON public.casino_review_helpful_votes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own helpful votes"
  ON public.casino_review_helpful_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own helpful votes"
  ON public.casino_review_helpful_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger function to refresh aggregates
CREATE OR REPLACE FUNCTION public.refresh_casino_review_aggregates()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
AS $$
DECLARE
  v_slug text;
BEGIN
  v_slug := COALESCE(NEW.casino_slug, OLD.casino_slug);
  
  INSERT INTO casino_review_aggregates (casino_slug, avg_rating, review_count, updated_at)
  SELECT
    v_slug,
    COALESCE(AVG(rating)::numeric, 0),
    COUNT(*),
    now()
  FROM casino_user_reviews
  WHERE casino_slug = v_slug AND status = 'approved'
  ON CONFLICT (casino_slug)
  DO UPDATE SET
    avg_rating = EXCLUDED.avg_rating,
    review_count = EXCLUDED.review_count,
    updated_at = now();
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Trigger: update aggregates on review changes
CREATE TRIGGER trg_refresh_review_aggregates
  AFTER INSERT OR UPDATE OR DELETE ON public.casino_user_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.refresh_casino_review_aggregates();

-- Trigger function to update helpful_count
CREATE OR REPLACE FUNCTION public.update_review_helpful_count()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
AS $$
DECLARE
  v_review_id uuid;
BEGIN
  v_review_id := COALESCE(NEW.review_id, OLD.review_id);
  
  UPDATE casino_user_reviews
  SET helpful_count = (
    SELECT COUNT(*) FROM casino_review_helpful_votes WHERE review_id = v_review_id
  )
  WHERE id = v_review_id;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_update_helpful_count
  AFTER INSERT OR DELETE ON public.casino_review_helpful_votes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_review_helpful_count();
