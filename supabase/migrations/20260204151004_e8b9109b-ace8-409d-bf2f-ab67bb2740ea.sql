-- Create table for active slot sessions (single-device enforcement)
CREATE TABLE public.slot_active_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  session_id TEXT NOT NULL,
  last_heartbeat TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  device_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint - one active session per user
CREATE UNIQUE INDEX idx_slot_active_sessions_user ON public.slot_active_sessions(user_id);

-- Create index for quick heartbeat checks
CREATE INDEX idx_slot_active_sessions_heartbeat ON public.slot_active_sessions(last_heartbeat);

-- Enable RLS
ALTER TABLE public.slot_active_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only manage their own sessions
CREATE POLICY "Users can view own sessions"
  ON public.slot_active_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON public.slot_active_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON public.slot_active_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
  ON public.slot_active_sessions
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create table for bonus state (cross-device sync)
CREATE TABLE public.slot_bonus_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  is_active BOOLEAN NOT NULL DEFAULT false,
  free_spins_remaining INTEGER NOT NULL DEFAULT 0,
  total_free_spins INTEGER NOT NULL DEFAULT 0,
  expanding_symbol_id UUID,
  expanding_symbol_name TEXT,
  bonus_winnings NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.slot_bonus_state ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only manage their own bonus state
CREATE POLICY "Users can view own bonus state"
  ON public.slot_bonus_state
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bonus state"
  ON public.slot_bonus_state
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bonus state"
  ON public.slot_bonus_state
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bonus state"
  ON public.slot_bonus_state
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add trigger to update updated_at
CREATE TRIGGER update_slot_bonus_state_updated_at
  BEFORE UPDATE ON public.slot_bonus_state
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for bonus state sync
ALTER PUBLICATION supabase_realtime ADD TABLE public.slot_bonus_state;