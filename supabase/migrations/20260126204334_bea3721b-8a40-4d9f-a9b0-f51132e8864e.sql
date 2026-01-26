-- Drop and recreate view without SECURITY DEFINER (use invoker security)
DROP VIEW IF EXISTS public.shop_items_public;

CREATE VIEW public.shop_items_public 
WITH (security_invoker = true)
AS
SELECT id, name, slug, description, image_url, price, stock, position, is_active, created_at, updated_at
FROM public.shop_items
WHERE is_active = true
ORDER BY position ASC;