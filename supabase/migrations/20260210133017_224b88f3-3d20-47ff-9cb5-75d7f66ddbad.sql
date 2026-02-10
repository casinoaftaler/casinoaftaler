-- Add missing indexes for performance on slot_game_results
CREATE INDEX IF NOT EXISTS idx_slot_game_results_user_id
  ON public.slot_game_results (user_id);
CREATE INDEX IF NOT EXISTS idx_slot_game_results_created_at
  ON public.slot_game_results (created_at);

-- Drop unused view
DROP VIEW IF EXISTS public.shop_items_public;