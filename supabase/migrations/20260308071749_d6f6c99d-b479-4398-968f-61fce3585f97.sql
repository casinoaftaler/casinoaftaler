
-- Insert missing paths from seoRoutes into page_metadata
INSERT INTO page_metadata (path, changefreq, priority, updated_at) VALUES
  ('/ansvarligt-spil/rofus', 'monthly', 0.7, '2026-03-07T00:00:00+01:00'),
  ('/ansvarligt-spil/ludomani', 'monthly', 0.7, '2026-03-07T00:00:00+01:00'),
  ('/ansvarligt-spil/stopspillet', 'monthly', 0.7, '2026-03-07T00:00:00+01:00'),
  ('/mobil-casino', 'monthly', 0.8, '2026-03-07T00:00:00+01:00'),
  ('/casino-app', 'monthly', 0.7, '2026-03-07T00:00:00+01:00'),
  ('/megaways-slots', 'monthly', 0.8, '2026-03-07T00:00:00+01:00'),
  ('/jackpot-slots', 'monthly', 0.8, '2026-03-07T00:00:00+01:00'),
  ('/bonus-buy-slots', 'monthly', 0.8, '2026-03-07T00:00:00+01:00')
ON CONFLICT (path) DO NOTHING;

-- Update stale lastmod dates to match seoRoutes
UPDATE page_metadata SET updated_at = '2026-03-07T00:00:00+01:00' WHERE path = '/ansvarligt-spil';
UPDATE page_metadata SET updated_at = '2026-03-05T00:00:00+01:00' WHERE path IN (
  '/community/rewards', '/cookies', '/forfatter/ajse', '/forfatter/kevin',
  '/forretningsmodel', '/kontakt', '/om', '/privatlivspolitik',
  '/redaktionel-politik', '/saadan-tester-vi-casinoer'
);
