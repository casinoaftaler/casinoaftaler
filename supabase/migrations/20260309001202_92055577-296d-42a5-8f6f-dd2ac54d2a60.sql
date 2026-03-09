
-- Settle GTW bets for session e42d1bb9-1b5b-48f9-ba41-7a6604ba0a07 (Bonus Hunt #3 / Archive #121)
-- End balance: 2288, Average X: 63.88

-- Update GTW bets with rank, difference, and prize_points
UPDATE bonus_hunt_gtw_bets SET difference = 641, rank = 1, prize_points = 300 WHERE id = '45fd86b5-a2ac-4085-9193-b1b62c0f570f';
UPDATE bonus_hunt_gtw_bets SET difference = 2212, rank = 2, prize_points = 200 WHERE id = '40a0fbb8-04dc-41d4-bfc1-6c0a38551797';
UPDATE bonus_hunt_gtw_bets SET difference = 3142, rank = 3, prize_points = 100 WHERE id = 'c7cda1ab-2754-4c9f-90ab-6d1be20fd074';
UPDATE bonus_hunt_gtw_bets SET difference = 3712, rank = 4, prize_points = 75 WHERE id = '0879d798-9be9-49db-a1a2-e93ed80b703a';
UPDATE bonus_hunt_gtw_bets SET difference = 4691, rank = 5, prize_points = 50 WHERE id = '208b9da3-f3c7-4739-a6eb-10f62fc4dbe9';

-- Update session with end_balance
UPDATE bonus_hunt_sessions SET end_balance = 2288 WHERE id = 'e42d1bb9-1b5b-48f9-ba41-7a6604ba0a07';

-- Award credits to winners (upsert into slot_spins for today using 'shared' game_id)
-- 1st place: 2000 credits
INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
VALUES ('eaf7e0a2-1873-4e3f-804d-b4e48666ceaf', CURRENT_DATE, 2000, 'shared')
ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + 2000;

-- 2nd place: 1500 credits
INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
VALUES ('19b6d3c0-de97-47fd-b066-1ea288fe9abd', CURRENT_DATE, 1500, 'shared')
ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + 1500;

-- 3rd place: 1000 credits
INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
VALUES ('3a55b3dc-a376-45f8-acf6-ac71ae35cfe9', CURRENT_DATE, 1000, 'shared')
ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + 1000;

-- 4th place: 500 credits
INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
VALUES ('8c7e7f44-0db4-4247-92e3-84a6405c98f3', CURRENT_DATE, 500, 'shared')
ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + 500;

-- 5th place: 250 credits
INSERT INTO slot_spins (user_id, date, spins_remaining, game_id)
VALUES ('0f711829-e787-4818-a21c-daa94cf81202', CURRENT_DATE, 250, 'shared')
ON CONFLICT (user_id, date, game_id) DO UPDATE SET spins_remaining = slot_spins.spins_remaining + 250;

-- Log the credit allocations
INSERT INTO credit_allocation_log (user_id, amount, source, note) VALUES
('eaf7e0a2-1873-4e3f-804d-b4e48666ceaf', 2000, 'bonus_hunt_gtw', 'GTW 1. plads: 2000 credits (manual settle)'),
('19b6d3c0-de97-47fd-b066-1ea288fe9abd', 1500, 'bonus_hunt_gtw', 'GTW 2. plads: 1500 credits (manual settle)'),
('3a55b3dc-a376-45f8-acf6-ac71ae35cfe9', 1000, 'bonus_hunt_gtw', 'GTW 3. plads: 1000 credits (manual settle)'),
('8c7e7f44-0db4-4247-92e3-84a6405c98f3', 500, 'bonus_hunt_gtw', 'GTW 4. plads: 500 credits (manual settle)'),
('0f711829-e787-4818-a21c-daa94cf81202', 250, 'bonus_hunt_gtw', 'GTW 5. plads: 250 credits (manual settle)');
