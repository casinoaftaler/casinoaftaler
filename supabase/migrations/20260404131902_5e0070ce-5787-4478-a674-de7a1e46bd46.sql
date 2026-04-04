-- Mark all existing users as having dismissed the welcome message
-- so only truly NEW users (created after this migration) will see it
UPDATE profiles SET welcome_message_dismissed = true WHERE welcome_message_dismissed = false;

-- Delete the stale "daily missions" broadcast
DELETE FROM chat_broadcasts WHERE id = 'd2f78bc2-7086-4448-ab4e-0f273a94d07f';