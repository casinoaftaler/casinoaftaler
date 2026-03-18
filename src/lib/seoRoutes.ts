import { getTodayDanish } from "./danishDate";

/**
 * Central registry of all SEO-indexable routes.
 *
 * Used by:
  *
  * Rules:
  *  - Only pages that use <SEO /> without noindex belong here.
  *  - Community, auth, profile, admin, shop and highlight pages are excluded.
  *  - Canonical URLs are derived from SITE_URL + path.
  *  - lastmod should match the dateModified in the page's Article schema.
  *  - IMPORTANT: When editing any page component, always update the corresponding
  *    lastmod date here to today's date (YYYY-MM-DD) to signal freshness to Google.
  */

export interface SeoRoute {
  /** Absolute path, e.g. "/casino-bonus" */
  path: string;
  /** Sitemap changefreq */
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  /** Sitemap priority 0.0–1.0 */
  priority: number;
  /** ISO date (YYYY-MM-DD) for sitemap lastmod. Falls back to build date if omitted. */
  lastmod?: string;
  /**
   * Whether to display "Opdateret" date in the AuthorMetaBar UI.
   * Default: true for money pages, guides, hubs. Set false for minor utility pages.
   */
  showUpdatedDate?: boolean;

  // ── Author Profile Integration ──────────────────────────────────────
  // When these fields are set, the article automatically appears on the
  // author's profile page under "Artikler skrevet af …".
  // This removes the need to manually register articles in authorContent.ts.

  /** Author ID – must match AuthorId type ("jonas" | "kevin" | "ajse" | "niklas") */
  author?: string;
  /** Article title for the author profile card */
  articleTitle?: string;
  /** Category label (e.g. "Guide", "Anmeldelse") */
  articleCategory?: string;
  /** Short excerpt for the author profile card */
  articleExcerpt?: string;
}

/**
 * Get all seoRoutes entries that have author metadata set.
 * Used by getAuthorArticles() to auto-derive articles for author profiles.
 */
export function getSeoRoutesByAuthor(authorId: string) {
  return seoRoutes.filter(
    (r) => r.author === authorId && r.articleTitle
  );
}

/** Map of path → SeoRoute for O(1) lookups */
let _routeMap: Map<string, SeoRoute> | null = null;

function getRouteMap(): Map<string, SeoRoute> {
  if (!_routeMap) {
    _routeMap = new Map(seoRoutes.map((r) => [r.path, r]));
  }
  return _routeMap;
}

/**
 * Look up route metadata by path.
 * Returns undefined if the path is not registered in seoRoutes.
 */
export function getRouteMetadata(path: string): SeoRoute | undefined {
  return getRouteMap().get(path);
}

/**
 * Get the lastmod date for a given path.
 * Returns undefined if not found.
 */
export function getRouteLastmod(path: string): string | undefined {
  return getRouteMap().get(path)?.lastmod;
}

/**
 * Format an ISO date (YYYY-MM-DD) to Danish display format (DD. måned YYYY).
 */
export function formatLastmodDanish(isoDate: string): string {
  const months = [
    "januar", "februar", "marts", "april", "maj", "juni",
    "juli", "august", "september", "oktober", "november", "december",
  ];
  const [year, month, day] = isoDate.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return `${parseInt(day, 10)}. ${months[monthIndex]} ${year}`;
}

export const seoRoutes: SeoRoute[] = ([
  // ── Forside ──
  { path: "/", changefreq: "daily", priority: 1.0 },

  // ── Casino Anmeldelser ──
  { path: "/casino-anmeldelser", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-08" },
  { path: "/nye-casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-18" },
  { path: "/nye-casinoer/2026", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/nye-casinoer/dansk-licens", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/nye-casinoer/uden-rofus", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/nye-casinoer/hurtig-udbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/nye-casinoer/bonus-uden-indbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/nye-casinoer/trustly", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/nye-casinoer/mitid", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/nye-casinoer/lav-wagering", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-07" },
  // /nye-casinoer/bedste – 301 redirected to /nye-casinoer (cannibalization fix: spoke undermined hub)
  { path: "/nye-casinoer/vs-etablerede", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/top-10-casino-online", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/spilleautomaten", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/campobet", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/betinia", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/swift-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/luna-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/spildansknu", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/danske-spil", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/comeon", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/getlucky", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/mr-green", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/videoslots", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/mr-vegas", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/leovegas", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/expekt", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/betano", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/888-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/unibet", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/bet365", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/royal-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/maria-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/kapow-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/nordicbet", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/one-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/spilnu", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/stake-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/casinostuen", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/pokerstars", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/bwin", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/marathonbet", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },

  // ── VS / Sammenligningssider ──
  { path: "/casino-anmeldelser/bet365-vs-unibet", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/leovegas-vs-mr-green", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/danske-spil-vs-spilnu", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-08" },
  { path: "/casino-anmeldelser/spilleautomaten-vs-spildansknu", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-16" },
  { path: "/casino-anmeldelser/betinia-vs-campobet", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-16" },
  { path: "/casino-anmeldelser/swift-casino-vs-luna-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-16" },

  // ── Casino Spil & Live ──
  { path: "/live-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-18" },
  { path: "/live-casino/blackjack", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/live-casino/roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/live-casino/baccarat", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/live-casino/lightning-roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/live-casino/monopoly-live", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/live-casino/game-shows", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-06" },
  { path: "/live-casino/crazy-time", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/live-casino/dream-catcher", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/live-casino/deal-or-no-deal", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/live-casino/strategi", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-16", author: "jonas", articleTitle: "Live Casino Strategi Guide 2026", articleCategory: "Guide", articleExcerpt: "Bankroll management, house edge-analyse og betting-systemanalyse for live casino." },
  { path: "/live-casino/udbydere", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-16", author: "jonas", articleTitle: "Live Casino Udbydere – Evolution, Pragmatic Play & Mere", articleCategory: "Guide", articleExcerpt: "Komplet sammenligning af live casino-udbydere: spilkatalog, teknologi og danske casinoer." },
  { path: "/casinospil", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner", changefreq: "daily", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/hoej-rtp", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/bonus-buys", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/sweet-bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/book-of-dead", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/gates-of-olympus", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/starburst", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/razor-shark", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/big-bass-bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/dead-or-alive-2", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/gonzos-quest", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/reactoonz", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/money-train-3", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/wolf-gold", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/the-dog-house", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/jammin-jars", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/fire-joker", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/legacy-of-dead", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/divine-fortune", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/eye-of-horus", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/buffalo-king", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/sugar-rush", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/cleopatra", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/mega-moolah", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/thunderstruck-ii", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/immortal-romance", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/wild-west-gold", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/madame-destiny-megaways", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/extra-chilli-megaways", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/chaos-crew", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/spillemaskiner/joker-strike", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/blackjack", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-18" },
  { path: "/casinospil/blackjack/amerikansk-blackjack", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-18" },
  { path: "/casinospil/blackjack/europaeisk-blackjack", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-18" },
  { path: "/casinospil/blackjack/double-exposure-blackjack", changefreq: "weekly", priority: 0.76, lastmod: "2026-03-18" },
  { path: "/casinospil/blackjack/spanish-21", changefreq: "weekly", priority: 0.78, lastmod: "2026-03-18" },
  { path: "/casinospil/blackjack/martingale", changefreq: "weekly", priority: 0.74, lastmod: "2026-03-18" },
  { path: "/casinospil/blackjack/fibonacci", changefreq: "weekly", priority: 0.74, lastmod: "2026-03-18" },
  { path: "/casinospil/blackjack/dalembert", changefreq: "weekly", priority: 0.74, lastmod: "2026-03-18" },
  { path: "/casinospil/roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/roulette/amerikansk-roulette", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/roulette/europaeisk-roulette", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/roulette/fransk-roulette", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/roulette/dalembert-roulette", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/roulette/martingale-roulette", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/roulette/fibonacci-roulette", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/roulette/labouchere-roulette", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/roulette/james-bond-roulette", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/poker", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/poker/texas-holdem", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/poker/omaha", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/poker/three-card-poker", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/poker/caribbean-stud", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/poker/video-poker", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/poker/poker-strategi", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/casinospil/poker/bedste-sider", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-15", author: "kevin", articleTitle: "Bedste Pokersider i Danmark 2026", articleCategory: "Guide", articleExcerpt: "Komplet guide til de bedste pokersider med dansk licens – sammenlign PokerStars, Unibet, bet365 og Campobet." },
  { path: "/casinospil/craps", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casinospil/baccarat", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  // /casinospil/roulette-strategi – 301 redirected to /casinospil/roulette (cannibalization fix)
  { path: "/casinospil/online-lotteri", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  // /casinospil/game-shows – 301 redirected to /live-casino/game-shows

  // ── Bonus Guides ──
  { path: "/casino-bonus", changefreq: "weekly", priority: 0.95, lastmod: "2026-03-18" },
  {
    path: "/markedsindsigt",
    changefreq: "daily",
    priority: 0.85,
    lastmod: "2026-03-17",
    author: "jonas",
    articleTitle: "Markedsindsigt 2026 – Offentligt casinooverblik",
    articleCategory: "Analyse",
    articleExcerpt: "Offentligt overblik over verificerede licens-, bonus- og compliance-opdateringer på det danske casinomarked.",
  },
  { path: "/velkomstbonus", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-18" },
  { path: "/free-spins", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-18" },
  { path: "/free-spins-i-dag", changefreq: "daily", priority: 0.9, lastmod: "2026-03-10" },
  { path: "/indskudsbonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/omsaetningskrav", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/bonus-uden-indbetaling", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-18" },
  { path: "/bonus-uden-omsaetningskrav", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/no-sticky-bonus", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-18" },
  { path: "/sticky-bonus", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-18" },
  { path: "/cashback-bonus", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-18" },
  { path: "/reload-bonus", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-18" },

  // ── Spiludviklere ──
  { path: "/spiludviklere", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/netent", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/pragmatic-play", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/relax-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/play-n-go", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/hacksaw-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/nolimit-city", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/yggdrasil", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/microgaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/red-tiger", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/big-time-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/elk-studios", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/evolution-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/spiludviklere/thunderkick", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/blueprint-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/push-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/quickspin", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/isoftbet", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/betsoft", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/wazdan", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/endorphina", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/stakelogic", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },
  { path: "/spiludviklere/booming-games", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-12" },

  // ── Provider Slot Hubs ──
  { path: "/spillemaskiner/pragmatic-play", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/netent", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/play-n-go", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/hacksaw-gaming", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/big-time-gaming", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/microgaming", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/nolimit-city", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/evolution-gaming", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/elk-studios", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/yggdrasil", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/relax-gaming", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/red-tiger", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/igt", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-10" },
  { path: "/spillemaskiner/thunderkick", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/blueprint-gaming", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/push-gaming", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/quickspin", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/isoftbet", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/betsoft", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/wazdan", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/endorphina", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/stakelogic", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },
  { path: "/spillemaskiner/booming-games", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-12" },

  // ── Betalingsmetoder ──
  { path: "/betalingsmetoder", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/apple-pay", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/mobilepay", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/paypal", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/skrill", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/trustly", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/zimpler", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/paysafecard", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/bankoverforsler", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/visa-mastercard", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },
  { path: "/betalingsmetoder/revolut", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-04" },

  // ── Casino Guides ──
  // Hub is 0.9 – all spokes capped at 0.8 to maintain strict crawl hierarchy
  { path: "/casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-04" },
  { path: "/casinoer/hurtig-udbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-04" },
  { path: "/casinoer/hoej-rtp", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-04" },
  { path: "/casinoer/crypto-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-04" },
  // /licenserede-casinoer excluded – 301 redirects to /casino-licenser
  { path: "/casino-licenser", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-04" },
  { path: "/casinoer/vr-casinoer", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-04" },
  { path: "/casinoer/mobil-casinoer", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-04" },
  { path: "/casinoer/spil-casino-for-sjov", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-04" },
  { path: "/casinoer/casino-og-skat", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-04" },

  // ── Casino Nyheder ──
  // Hub only – article entries are dynamically generated in sitemap-news.xml
  { path: "/casino-nyheder", changefreq: "daily", priority: 0.9, lastmod: "2026-03-05" },

  // ── Casino Ordbog ──
  { path: "/ordbog", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-07" },
  { path: "/ordbog/rtp", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/wagering", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/volatilitet", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/house-edge", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  // /ordbog/free-spins – 301 redirected to /free-spins (cannibalization fix)
  { path: "/ordbog/scatter", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/wild", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/jackpot", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/rng", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/paylines", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/bonus-runde", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/multiplikator", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/max-bet", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/autoplay", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/hit-frequency", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/gamble-feature", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/cascading-wins", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/megaways", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/buy-bonus", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  // removed: sticky-bonus-term, progressiv-jackpot, gevinstprocent, mitid-casino (cannibalization fixes – 301 redirected)
  { path: "/ordbog/bankroll-management", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/minimum-indbetaling", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/kyc", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/gamification", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/retrigger", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/cluster-pays", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/expanding-wild", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  // ── Batch 3 (44 nye termer) ──
  { path: "/ordbog/stacked-wilds", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/sticky-wilds", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/walking-wilds", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/random-wilds", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/mystery-symbols", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/hold-and-spin", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/colossal-symbols", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/split-symbols", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/nudge", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/infinity-reels", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/xways", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/xnudge", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/ante-bet", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/win-cap", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/turnover-contribution", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/bonus-abuse", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/wager-free-spins", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/deposit-match", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/comp-points", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/promo-code", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/pending-time", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/reverse-withdrawal", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/e-wallet", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/indbetalingsgraense", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/gebyr", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/valutaveksling", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/expected-value", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/varians", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/standard-deviation", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/risk-of-ruin", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/payout-table", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/coin-value", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/spillicens", changefreq: "monthly", priority: 0.75, lastmod: "2026-03-07" },
  { path: "/ordbog/fairness-audit", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/ssl-kryptering", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/geo-blocking", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/spilgraenser", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/side-bet", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/dealer", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/table-limits", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/shoe", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/instant-play", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/lobby", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ordbog/reels", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },

  // ── Community & Highlights ──
  { path: "/bonus-hunt", changefreq: "daily", priority: 0.8, lastmod: "2026-02-28" },
  { path: "/bonus-hunt/arkiv", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/slot-database", changefreq: "weekly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/community", changefreq: "daily", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/community/turneringer", changefreq: "daily", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/community/turneringer/arkiv", changefreq: "weekly", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/community/hall-of-fame", changefreq: "weekly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/community/slots", changefreq: "daily", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/community/rewards", changefreq: "weekly", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/highlights", changefreq: "daily", priority: 0.6, lastmod: "2026-03-05" },

  // ── Info & Ansvarligt Spil ──
  { path: "/ansvarligt-spil", changefreq: "monthly", priority: 0.6, lastmod: "2026-03-07" },
  { path: "/ansvarligt-spil/rofus", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ansvarligt-spil/ludomani", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ansvarligt-spil/stopspillet", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-07" },
  { path: "/ansvarligt-spil/spillegraenser", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-08" },
  { path: "/ansvarligt-spil/selvudelukkelse-guide", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-08" },
  { path: "/ansvarligt-spil/hjaelpelinjer", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-08" },

  // ── Mobil Casino ──
  { path: "/mobil-casino", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/casino-app", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/mobil-casino/iphone", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/mobil-casino/android", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/mobil-casino/tablet", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/mobil-casino/bedste-apps", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },

  // ── Casino uden Konto ──
  { path: "/casino-uden-konto", changefreq: "weekly", priority: 0.9, lastmod: "2026-03-06" },
  { path: "/casino-uden-konto/pay-n-play", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/casino-uden-konto/hurtig-registrering", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-06" },
  { path: "/casino-uden-konto/fordele-og-ulemper", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-06" },

  // ── Slot Kategorier ──
  { path: "/megaways-slots", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/jackpot-slots", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-07" },
  { path: "/bonus-buy-slots", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-07" },

  // ── Statistik (linkable asset) ──
  { path: "/statistik", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-11" },

  // ── Batch 2: VIP & MobilePay ──
  { path: "/vip-program", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-06" },
  { path: "/casino-med-mobilepay", changefreq: "weekly", priority: 0.85, lastmod: "2026-03-04" },

  { path: "/spillemyndigheden", changefreq: "monthly", priority: 0.7, lastmod: "2026-03-05" },
  { path: "/om", changefreq: "monthly", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/forretningsmodel", changefreq: "monthly", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/redaktionel-politik", changefreq: "monthly", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/kontakt", changefreq: "monthly", priority: 0.5, lastmod: "2026-03-05" },
  { path: "/forfatter/jonas", changefreq: "monthly", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/forfatter/kevin", changefreq: "monthly", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/forfatter/ajse", changefreq: "monthly", priority: 0.6, lastmod: "2026-03-05" },
  { path: "/forfatter/niklas", changefreq: "monthly", priority: 0.6, lastmod: "2026-03-15" },
  { path: "/saadan-tester-vi-casinoer", changefreq: "monthly", priority: 0.8, lastmod: "2026-03-05" },
  { path: "/privatlivspolitik", changefreq: "yearly", priority: 0.3, lastmod: "2026-03-05" },
  { path: "/terms", changefreq: "yearly", priority: 0.3, lastmod: "2026-03-05" },
  { path: "/cookies", changefreq: "yearly", priority: 0.3, lastmod: "2026-03-05" },
  // /sitemap – excluded: has noindex in Sitemap.tsx (noindex + sitemap = conflicting signals)

] as const).map((route): SeoRoute => {
  // Auto-set lastmod to today (Danish timezone) for daily-changing pages
  if (route.changefreq === "daily") {
    return { ...route, lastmod: getTodayDanish() };
  }
  return { ...route };
});
