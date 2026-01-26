-- Drop is_casino_owner function with CASCADE (removes dependent policies)
DROP FUNCTION IF EXISTS public.is_casino_owner(uuid) CASCADE;

-- Drop casino_owners table with CASCADE
DROP TABLE IF EXISTS public.casino_owners CASCADE;

-- Delete all casino_owner roles from user_roles
DELETE FROM public.user_roles WHERE role = 'casino_owner';

-- Recreate storage policies for shop-item-images (admin only, no is_casino_owner)
CREATE POLICY "Admins can upload shop item images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'shop-item-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update shop item images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'shop-item-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete shop item images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'shop-item-images' AND
  has_role(auth.uid(), 'admin'::app_role)
);