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
}

export const seoRoutes: SeoRoute[] = ([
  // ── Forside ──
  { path: "/", changefreq: "daily", priority: 1.0 },

  // ── Casino Anmeldelser ──
  { path: "/casino-anmeldelser", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-15" },
  { path: "/nye-casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-16" },
  { path: "/nye-casinoer/2026", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
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
  { path: "/casino-anmeldelser/spilleautomaten", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/campobet", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/betinia", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/swift-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/luna-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/spildansknu", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casino-anmeldelser/danske-spil", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/comeon", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/getlucky", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/mr-green", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/videoslots", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/mr-vegas", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/leovegas", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/expekt", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/betano", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casino-anmeldelser/888-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/unibet", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/bet365", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casino-anmeldelser/royal-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/maria-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/kapow-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/nordicbet", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/one-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/spilnu", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/stake-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/casinostuen", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casino-anmeldelser/pokerstars", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casino-anmeldelser/bwin", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casino-anmeldelser/marathonbet", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },

  // ── Casino Spil & Live ──
  { path: "/live-casino", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-18" },
  { path: "/live-casino/blackjack", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/live-casino/roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/live-casino/baccarat", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/live-casino/lightning-roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/live-casino/monopoly-live", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner", changefreq: "daily", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/hoej-rtp", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/bonus-buys", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/casinospil/spillemaskiner/sweet-bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/book-of-dead", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/gates-of-olympus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/starburst", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/razor-shark", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/big-bass-bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/dead-or-alive-2", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/gonzos-quest", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/reactoonz", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/money-train-3", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/wolf-gold", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/the-dog-house", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/jammin-jars", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/bonanza", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/fire-joker", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/legacy-of-dead", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/divine-fortune", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/eye-of-horus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/buffalo-king", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/sugar-rush", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/cleopatra", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/mega-moolah", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/thunderstruck-ii", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/immortal-romance", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/wild-west-gold", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/madame-destiny-megaways", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/extra-chilli-megaways", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/chaos-crew", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/spillemaskiner/joker-strike", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/blackjack", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/roulette", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/poker", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/craps", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/baccarat", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/roulette-strategi", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/online-lotteri", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },
  { path: "/casinospil/game-shows", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-18" },

  // ── Bonus Guides ──
  { path: "/casino-bonus", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-20" },
  { path: "/velkomstbonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/free-spins", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-22" },
  { path: "/free-spins-i-dag", changefreq: "daily", priority: 0.9, lastmod: "2026-02-22" },
  { path: "/indskudsbonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/omsaetningskrav", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/bonus-uden-indbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/bonus-uden-omsaetningskrav", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/no-sticky-bonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },
  { path: "/sticky-bonus", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-20" },

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
  // Hub is 0.9 – all spokes capped at 0.8 to maintain strict crawl hierarchy
  { path: "/casinoer", changefreq: "weekly", priority: 0.9, lastmod: "2026-02-20" },
  { path: "/casinoer/hurtig-udbetaling", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/hoej-rtp", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/crypto-casino", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  // /licenserede-casinoer excluded – 301 redirects to /casino-licenser
  { path: "/casino-licenser", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-17" },
  { path: "/casinoer/vr-casinoer", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/mobil-casinoer", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/spil-casino-for-sjov", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/casinoer/casino-og-skat", changefreq: "weekly", priority: 0.8, lastmod: "2026-02-15" },

  // ── Casino Nyheder ──
  // Hub only – article entries are dynamically generated in sitemap-news.xml
  { path: "/casino-nyheder", changefreq: "daily", priority: 0.9, lastmod: "2026-02-21" },

  // ── Community & Highlights ──
  { path: "/community", changefreq: "daily", priority: 0.6, lastmod: "2026-02-22" },
  { path: "/community/slots", changefreq: "daily", priority: 0.6, lastmod: "2026-02-22" },
  { path: "/highlights", changefreq: "daily", priority: 0.6, lastmod: "2026-02-22" },

  // ── Info & Ansvarligt Spil ──
  { path: "/ansvarligt-spil", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-14" },
  { path: "/spillemyndigheden", changefreq: "monthly", priority: 0.7, lastmod: "2026-02-14" },
  { path: "/om", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-11" },
  { path: "/forretningsmodel", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-15" },
  { path: "/redaktionel-politik", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-15" },
  { path: "/kontakt", changefreq: "monthly", priority: 0.5, lastmod: "2026-02-11" },
  { path: "/forfatter/jonas", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-20" },
  { path: "/forfatter/kevin", changefreq: "monthly", priority: 0.6, lastmod: "2026-02-17" },
  { path: "/saadan-tester-vi-casinoer", changefreq: "monthly", priority: 0.8, lastmod: "2026-02-15" },
  { path: "/privatlivspolitik", changefreq: "yearly", priority: 0.3, lastmod: "2026-02-11" },
  { path: "/terms", changefreq: "yearly", priority: 0.3, lastmod: "2026-02-11" },
  { path: "/cookies", changefreq: "yearly", priority: 0.3, lastmod: "2026-02-11" },
  { path: "/sitemap", changefreq: "weekly", priority: 0.4, lastmod: "2026-02-23" },

] as const).map((route): SeoRoute => {
  // Auto-set lastmod to today (Danish timezone) for daily-changing pages
  if (route.changefreq === "daily") {
    return { ...route, lastmod: getTodayDanish() };
  }
  return { ...route };
});
