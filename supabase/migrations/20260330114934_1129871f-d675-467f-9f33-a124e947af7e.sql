-- Normalize all casino_name variants to canonical names
UPDATE bonus_hunt_archives SET casino_name = 'Campobet' WHERE LOWER(casino_name) IN ('campobet', 'campo bet') AND casino_name != 'Campobet';
UPDATE bonus_hunt_archives SET casino_name = 'Spilleautomaten' WHERE LOWER(casino_name) IN ('spilleautomaten', 'spilautomat') AND casino_name != 'Spilleautomaten';
UPDATE bonus_hunt_archives SET casino_name = 'SpilDanskNu' WHERE LOWER(casino_name) IN ('spildansknu', 'spildansknu!', 'spildansk') AND casino_name != 'SpilDanskNu';
UPDATE bonus_hunt_archives SET casino_name = 'Casino999' WHERE LOWER(casino_name) IN ('casino999', '999') AND casino_name != 'Casino999';
UPDATE bonus_hunt_archives SET casino_name = 'ComeOn' WHERE LOWER(casino_name) = 'comeon' AND casino_name != 'ComeOn';
UPDATE bonus_hunt_archives SET casino_name = 'Videoslots' WHERE LOWER(casino_name) = 'videoslots' AND casino_name != 'Videoslots';