-- Settle GTW for hunt #126 with total winnings = 6611
UPDATE bonus_hunt_sessions SET end_balance = 6611 WHERE id = '8fb3459e-8273-4d0d-a99f-698944ba7019';

UPDATE bonus_hunt_gtw_bets SET difference = 589, rank = 1, prize_points = 300 WHERE id = '86a6381f-5f42-4653-9fe2-5b66ae69563b';
UPDATE bonus_hunt_gtw_bets SET difference = 678, rank = 2, prize_points = 200 WHERE id = '3ba7014f-b3b4-42a2-9ad7-f04271f58605';
UPDATE bonus_hunt_gtw_bets SET difference = 1111, rank = 3, prize_points = 100 WHERE id = '6d4e9d28-e3ec-4536-90a0-f29020c641a1';
UPDATE bonus_hunt_gtw_bets SET difference = 2253, rank = 4, prize_points = 75 WHERE id = '7f63d924-a691-4376-ab4a-8b4e25b3622d';
UPDATE bonus_hunt_gtw_bets SET difference = 2286, rank = 5, prize_points = 50 WHERE id = '20d02a39-ca7f-427a-98d6-55c435121526';
UPDATE bonus_hunt_gtw_bets SET difference = 2361, rank = 6, prize_points = 0 WHERE id = 'b735ebf6-e268-44e6-bf0a-c9e2bbb20e3b';
UPDATE bonus_hunt_gtw_bets SET difference = 2711, rank = 7, prize_points = 0 WHERE id = '10af5b20-46ca-4852-8d62-8ecae9c6e4af';
UPDATE bonus_hunt_gtw_bets SET difference = 3877, rank = 8, prize_points = 0 WHERE id = '831218fd-216d-47ed-9119-bb0a5f5b4286';

INSERT INTO credit_allocation_log (user_id, amount, source, note) VALUES ('c60ef436-0810-45b8-8ec3-da631ada2bfb', 4000, 'bonus_hunt_gtw', 'GTW 1. plads: 4000 credits (Hunt #126)');
INSERT INTO credit_allocation_log (user_id, amount, source, note) VALUES ('a04abcd8-0cd7-45a8-a2fb-03d225ce482c', 2000, 'bonus_hunt_gtw', 'GTW 2. plads: 2000 credits (Hunt #126)');
INSERT INTO credit_allocation_log (user_id, amount, source, note) VALUES ('8c7e7f44-0db4-4247-92e3-84a6405c98f3', 1000, 'bonus_hunt_gtw', 'GTW 3. plads: 1000 credits (Hunt #126)');
INSERT INTO credit_allocation_log (user_id, amount, source, note) VALUES ('d248bef8-743e-41ff-bba7-16775cabe92c', 500, 'bonus_hunt_gtw', 'GTW 4. plads: 500 credits (Hunt #126)');
INSERT INTO credit_allocation_log (user_id, amount, source, note) VALUES ('0c6699f9-6249-4899-9d2b-ed5632bdc101', 200, 'bonus_hunt_gtw', 'GTW 5. plads: 200 credits (Hunt #126)');

UPDATE bonus_hunt_archives SET end_balance = 6611 WHERE hunt_number = 126;