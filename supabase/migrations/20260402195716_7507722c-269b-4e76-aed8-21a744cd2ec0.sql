-- Create a trigger function to prevent duplicate pending slot requests
CREATE OR REPLACE FUNCTION public.prevent_duplicate_pending_slot_request()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only check on insert when status is pending
  IF NEW.status = 'pending' THEN
    IF EXISTS (
      SELECT 1 FROM public.slot_requests
      WHERE LOWER(TRIM(slot_name)) = LOWER(TRIM(NEW.slot_name))
        AND status = 'pending'
        AND id IS DISTINCT FROM NEW.id
    ) THEN
      RAISE EXCEPTION 'Denne slot er allerede blevet requested af en anden bruger'
        USING ERRCODE = 'unique_violation';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Attach trigger to slot_requests table
DROP TRIGGER IF EXISTS trg_prevent_duplicate_pending_slot ON public.slot_requests;
CREATE TRIGGER trg_prevent_duplicate_pending_slot
  BEFORE INSERT ON public.slot_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_duplicate_pending_slot_request();