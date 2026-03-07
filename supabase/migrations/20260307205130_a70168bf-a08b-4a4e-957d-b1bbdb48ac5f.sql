
-- Mark hunt #1 as completed
UPDATE bonus_hunt_sessions 
SET status = 'completed', updated_at = now()
WHERE hunt_number = 1 AND status = 'active';

-- Create new session for hunt #2
INSERT INTO bonus_hunt_sessions (hunt_number, streamsystem_hunt_id, status, host, casino_slug)
VALUES (2, 'iKJQa44N50yF9hEYSeV1', 'active', 'kevin', 'spildansknu');
