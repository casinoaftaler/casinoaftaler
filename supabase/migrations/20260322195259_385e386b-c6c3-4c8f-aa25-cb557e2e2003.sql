DROP POLICY IF EXISTS "Guests can insert reviews" ON public.casino_user_reviews;

CREATE POLICY "Guests can insert reviews"
ON public.casino_user_reviews
FOR INSERT
TO anon
WITH CHECK (
  user_id IS NULL
  AND guest_name IS NOT NULL
);