-- Enable realtime for session takeover detection
ALTER PUBLICATION supabase_realtime ADD TABLE public.slot_active_sessions;