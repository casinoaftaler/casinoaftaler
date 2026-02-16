/**
 * Central registry of all SEO-indexable routes.
 *
 * Used by:
 *  - The Vite sitemap plugin (build-time sitemap.xml generation)
 *  - Potentially future prerender or SSR pipelines
 *
 * Rules:
 *  - Only pages that use <SEO /> without noindex belong here.
 *  - Community, auth, profile, admin, shop and highlight pages are excluded.
 *  - Canonical URLs are derived from SITE_URL + path.
 *  - lastmod should match the dateModified in the page's Article schema.
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
}

export const seoRoutes: SeoRoute[] = [
  // ── Forside ──
  { path: "/", changefreq: "daily", priority: 1.0, lastmod: "2026-02-16" },

  // ── Casino Anmeldelser ──
  { path: "/casino-anmeldelser", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/nye-casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/2026", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/dansk-licens", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/uden-rofus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/hurtig-udbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/bonus-uden-indbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/trustly", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/mitid", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/lav-wagering", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/bedste", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/vs-etablerede", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-16" },
  { path: "/top-10-casino-online", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/spilleautomaten-anmeldelse", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/campobet-anmeldelse", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/betinia-anmeldelse", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/swift-casino-anmeldelse", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/luna-casino-anmeldelse", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/spildansknu-anmeldelse", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/danske-spil", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/comeon", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/getlucky", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/mr-green", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/videoslots", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/mr-vegas", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/leovegas", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/expekt", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/betano", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/888-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/unibet", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/bet365", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/royal-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/maria-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/kapow-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/nordicbet", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/one-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/spilnu", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/stake-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/casinostuen", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/pokerstars", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/bwin", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/marathonbet", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },

  // ── Casino Spil & Live ──
  { path: "/live-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-11" },
  { path: "/casinospil", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/spillemaskiner", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/spillemaskiner/hoej-rtp", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/blackjack", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/roulette", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/poker", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/craps", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/baccarat", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/roulette-strategi", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/online-lotteri", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },
  { path: "/casinospil/game-shows", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-13" },

  // ── Bonus Guides ──
  { path: "/casino-bonus", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-14" },
  { path: "/velkomstbonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-11" },
  { path: "/free-spins", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-11" },
  { path: "/indskudsbonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-11" },
  { path: "/omsaetningskrav", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-11" },
  { path: "/bonus-uden-indbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-11" },
  { path: "/bonus-uden-omsaetningskrav", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-11" },
  { path: "/no-sticky-bonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-11" },
  { path: "/sticky-bonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-11" },

  // ── Spiludviklere ──
  { path: "/spiludviklere", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/netent", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/pragmatic-play", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/relax-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/play-n-go", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/hacksaw-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/nolimit-city", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/yggdrasil", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/microgaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/red-tiger", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/big-time-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/elk-studios", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/spiludviklere/evolution-gaming", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },

  // ── Betalingsmetoder ──
  { path: "/betalingsmetoder", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/apple-pay", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/mobilepay", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/paypal", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/skrill", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/trustly", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/zimpler", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/paysafecard", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/bankoverforsler", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/visa-mastercard", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },
  { path: "/betalingsmetoder/revolut", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-11" },

  // ── Casino Guides ──
  { path: "/casinoer/hurtig-udbetaling", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casinoer/hoej-rtp", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casinoer/crypto-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/licenserede-casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casino-licenser", changefreq: "monthly", priority: 0.9, lastmod: "2026-02-17" },
  { path: "/casinoer/vr-casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casinoer/mobil-casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casinoer/spil-casino-for-sjov", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/casinoer/casino-og-skat", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },

  // ── Info & Ansvarligt Spil ──
  { path: "/ansvarligt-spil", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-14" },
  { path: "/spillemyndigheden", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-14" },
  { path: "/om", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-11" },
  { path: "/forretningsmodel", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-15" },
  { path: "/redaktionel-politik", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-15" },
  { path: "/kontakt", changefreq: "monthly", priority: 0.5, lastmod: "2026-02-11" },
  { path: "/forfatter/jonas", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-11" },
  { path: "/forfatter/kevin", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-11" },
  { path: "/saadan-tester-vi-casinoer", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/privatlivspolitik", changefreq: "yearly", priority: 0.3, lastmod: "2026-02-11" },
  { path: "/terms", changefreq: "yearly", priority: 0.3, lastmod: "2026-02-11" },
  { path: "/cookies", changefreq: "yearly", priority: 0.3, lastmod: "2026-02-11" },

  // ── Community (indexable) ──
  { path: "/community", changefreq: "weekly", priority: 0.7, lastmod: "2026-02-16" },
  { path: "/community/slots", changefreq: "weekly", priority: 0.7, lastmod: "2026-02-16" },
];
