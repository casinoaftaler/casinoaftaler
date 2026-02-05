-- Enable realtime for slot_game_results table so leaderboard updates instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.slot_game_results;