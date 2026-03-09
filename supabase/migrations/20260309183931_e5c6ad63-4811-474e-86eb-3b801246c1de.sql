-- Normalize duplicate provider names in slot_catalog
-- Fix case variations and naming inconsistencies

UPDATE slot_catalog SET provider = 'Play''n GO' WHERE LOWER(provider) = LOWER('Play''n Go') AND provider != 'Play''n GO';
UPDATE slot_catalog SET provider = 'Blueprint Gaming' WHERE LOWER(provider) IN ('blueprint gaming', 'bluering gaming', 'blueprint gaming') AND provider != 'Blueprint Gaming';
UPDATE slot_catalog SET provider = 'Red Tiger Gaming' WHERE LOWER(provider) IN ('red tiger', 'red tiger gaming') AND provider != 'Red Tiger Gaming';
UPDATE slot_catalog SET provider = 'Yggdrasil Gaming' WHERE LOWER(provider) IN ('yggdrasil', 'yggdrasil gaming') AND provider != 'Yggdrasil Gaming';
UPDATE slot_catalog SET provider = 'Nolimit City' WHERE LOWER(provider) IN ('nolimit city', 'nolimitcity') AND provider != 'Nolimit City';
UPDATE slot_catalog SET provider = 'Hacksaw Gaming' WHERE LOWER(provider) = 'hacksaw gaming' AND provider != 'Hacksaw Gaming';
UPDATE slot_catalog SET provider = 'Big Time Gaming' WHERE LOWER(provider) = 'big time gaming' AND provider != 'Big Time Gaming';
UPDATE slot_catalog SET provider = 'ELK Studios' WHERE LOWER(provider) IN ('elk studios', 'elk') AND provider != 'ELK Studios';
UPDATE slot_catalog SET provider = 'Pragmatic Play' WHERE LOWER(provider) = 'pragmatic play' AND provider != 'Pragmatic Play';
UPDATE slot_catalog SET provider = 'NetEnt' WHERE LOWER(provider) = 'netent' AND provider != 'NetEnt';
UPDATE slot_catalog SET provider = 'Microgaming' WHERE LOWER(provider) IN ('microgaming', 'games global') AND provider != 'Microgaming';
UPDATE slot_catalog SET provider = 'Push Gaming' WHERE LOWER(provider) = 'push gaming' AND provider != 'Push Gaming';
UPDATE slot_catalog SET provider = 'Relax Gaming' WHERE LOWER(provider) = 'relax gaming' AND provider != 'Relax Gaming';
UPDATE slot_catalog SET provider = 'Thunderkick' WHERE LOWER(provider) = 'thunderkick' AND provider != 'Thunderkick';
UPDATE slot_catalog SET provider = 'Quickspin' WHERE LOWER(provider) = 'quickspin' AND provider != 'Quickspin';
UPDATE slot_catalog SET provider = 'BGaming' WHERE LOWER(provider) = 'bgaming' AND provider != 'BGaming';
UPDATE slot_catalog SET provider = 'Betsoft' WHERE LOWER(provider) IN ('betsoft', 'betsoft gaming') AND provider != 'Betsoft';
UPDATE slot_catalog SET provider = 'Booming Games' WHERE LOWER(provider) = 'booming games' AND provider != 'Booming Games';
UPDATE slot_catalog SET provider = 'PearFiction Studios' WHERE LOWER(provider) = 'pearfiction studios' AND provider != 'PearFiction Studios';
UPDATE slot_catalog SET provider = 'Print Studios' WHERE LOWER(provider) = 'print studios' AND provider != 'Print Studios';
UPDATE slot_catalog SET provider = 'AvatarUX' WHERE LOWER(provider) IN ('avatarux', 'avatar ux') AND provider != 'AvatarUX';
UPDATE slot_catalog SET provider = 'Endorphina' WHERE LOWER(provider) = 'endorphina' AND provider != 'Endorphina';
UPDATE slot_catalog SET provider = 'Kalamba Games' WHERE LOWER(provider) = 'kalamba games' AND provider != 'Kalamba Games';
UPDATE slot_catalog SET provider = 'Fantasma Games' WHERE LOWER(provider) = 'fantasma games' AND provider != 'Fantasma Games';
UPDATE slot_catalog SET provider = 'Reel Kingdom' WHERE LOWER(provider) = 'reel kingdom' AND provider != 'Reel Kingdom';
UPDATE slot_catalog SET provider = 'Gameburger Studios' WHERE LOWER(provider) = 'gameburger studios' AND provider != 'Gameburger Studios';
UPDATE slot_catalog SET provider = 'Spadegaming' WHERE LOWER(provider) = 'spadegaming' AND provider != 'Spadegaming';
UPDATE slot_catalog SET provider = 'Evolution' WHERE LOWER(provider) IN ('evolution', 'evolution gaming') AND provider != 'Evolution';
UPDATE slot_catalog SET provider = 'Playtech' WHERE LOWER(provider) = 'playtech' AND provider != 'Playtech';