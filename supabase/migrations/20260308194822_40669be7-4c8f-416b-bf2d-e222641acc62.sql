ALTER TABLE bonus_hunt_archives
  ADD COLUMN IF NOT EXISTS twitch_vod_id text,
  ADD COLUMN IF NOT EXISTS vod_date text,
  ADD COLUMN IF NOT EXISTS casino_name text;