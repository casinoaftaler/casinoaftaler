
-- Delete related bets for sessions 2-5
DELETE FROM bonus_hunt_avgx_bets WHERE session_id IN (
  SELECT id FROM bonus_hunt_sessions WHERE hunt_number IN (2,3,4,5)
);

DELETE FROM bonus_hunt_gtw_bets WHERE session_id IN (
  SELECT id FROM bonus_hunt_sessions WHERE hunt_number IN (2,3,4,5)
);

DELETE FROM bonus_hunt_slot_coupons WHERE hunt_number IN (2,3,4,5);

-- Delete the sessions themselves
DELETE FROM bonus_hunt_sessions WHERE hunt_number IN (2,3,4,5);
