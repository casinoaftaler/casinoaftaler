INSERT INTO page_metadata (path, priority, changefreq, show_updated_date) VALUES
  ('/spillemaskiner/pragmatic-play', 0.8, 'weekly', true),
  ('/spillemaskiner/netent', 0.8, 'weekly', true),
  ('/spillemaskiner/play-n-go', 0.8, 'weekly', true),
  ('/spillemaskiner/hacksaw-gaming', 0.8, 'weekly', true),
  ('/spillemaskiner/big-time-gaming', 0.8, 'weekly', true),
  ('/spillemaskiner/microgaming', 0.8, 'weekly', true),
  ('/spillemaskiner/nolimit-city', 0.8, 'weekly', true),
  ('/spillemaskiner/evolution-gaming', 0.8, 'weekly', true),
  ('/spillemaskiner/elk-studios', 0.8, 'weekly', true),
  ('/spillemaskiner/yggdrasil', 0.8, 'weekly', true),
  ('/spillemaskiner/relax-gaming', 0.8, 'weekly', true),
  ('/spillemaskiner/red-tiger', 0.8, 'weekly', true),
  ('/spillemaskiner/igt', 0.8, 'weekly', true)
ON CONFLICT (path) DO NOTHING;