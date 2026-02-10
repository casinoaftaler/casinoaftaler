
-- Drop the old unique constraint on user_id only
ALTER TABLE public.slot_bonus_state DROP CONSTRAINT IF EXISTS slot_bonus_state_user_id_key;

-- Add a new unique constraint on (user_id, game_id) to support multiple games
ALTER TABLE public.slot_bonus_state ADD CONSTRAINT slot_bonus_state_user_id_game_id_key UNIQUE (user_id, game_id);
