
DELETE FROM bonus_hunt_avgx_bets WHERE session_id IN (
  SELECT id FROM bonus_hunt_sessions WHERE hunt_number IN (1,6)
);
DELETE FROM bonus_hunt_gtw_bets WHERE session_id IN (
  SELECT id FROM bonus_hunt_sessions WHERE hunt_number IN (1,6)
);
DELETE FROM bonus_hunt_slot_coupons WHERE hunt_number IN (1,6);
DELETE FROM bonus_hunt_sessions WHERE hunt_number IN (1,6);
