ALTER TABLE public.tournaments
ADD COLUMN exclude_from_global_leaderboard boolean NOT NULL DEFAULT false;