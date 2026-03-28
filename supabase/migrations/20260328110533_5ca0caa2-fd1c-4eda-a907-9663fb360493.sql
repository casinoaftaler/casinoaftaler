
-- Delete duplicate sessions for hunt 179 (keep the original 8fb3459e that has bets)
DELETE FROM bonus_hunt_sessions WHERE id IN ('0d6ffa30-e678-4ef3-85e2-d1aa997ff4a0', '8432c220-805d-48ce-8be7-cb852d98448d');
-- Also delete the leftover session still showing 126 for the same SS hunt
DELETE FROM bonus_hunt_sessions WHERE id = '3746476c-d8a4-4745-92b0-1a4e55d68f46';
