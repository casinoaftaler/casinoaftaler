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
 */

export interface SeoRoute {
  /** Absolute path, e.g. "/casino-bonus" */
  path: string;
  /** Sitemap changefreq */
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  /** Sitemap priority 0.0–1.0 */
  priority: number;
}

export const seoRoutes: SeoRoute[] = [
  // ── Forside ──
  { path: "/", changefreq: "daily", priority: 1.0 },

  // ── Casino Anmeldelser ──
  { path: "/casino-anmeldelser", changefreq: "weekly", priority: 0.9 },
  { path: "/nye-casinoer", changefreq: "weekly", priority: 0.9 },
  { path: "/top-10-casino-online", changefreq: "weekly", priority: 0.9 },
  { path: "/spilleautomaten-anmeldelse", changefreq: "weekly", priority: 0.9 },
  { path: "/campobet-anmeldelse", changefreq: "weekly", priority: 0.9 },
  { path: "/betinia-anmeldelse", changefreq: "weekly", priority: 0.9 },
  { path: "/swift-casino-anmeldelse", changefreq: "weekly", priority: 0.9 },
  { path: "/luna-casino-anmeldelse", changefreq: "weekly", priority: 0.9 },
  { path: "/spildansknu-anmeldelse", changefreq: "weekly", priority: 0.9 },

  // ── Casino Spil & Live ──
  { path: "/live-casino", changefreq: "weekly", priority: 0.9 },
  { path: "/casinospil", changefreq: "weekly", priority: 0.9 },
  { path: "/casinospil/spillemaskiner", changefreq: "weekly", priority: 0.9 },
  { path: "/casinospil/spillemaskiner/hoej-rtp", changefreq: "weekly", priority: 0.9 },

  // ── Bonus Guides ──
  { path: "/casino-bonus", changefreq: "weekly", priority: 0.9 },
  { path: "/velkomstbonus", changefreq: "weekly", priority: 0.8 },
  { path: "/free-spins", changefreq: "weekly", priority: 0.8 },
  { path: "/indskudsbonus", changefreq: "weekly", priority: 0.8 },
  { path: "/omsaetningskrav", changefreq: "monthly", priority: 0.8 },
  { path: "/bonus-uden-indbetaling", changefreq: "weekly", priority: 0.8 },
  { path: "/bonus-uden-omsaetningskrav", changefreq: "weekly", priority: 0.8 },
  { path: "/no-sticky-bonus", changefreq: "weekly", priority: 0.8 },
  { path: "/sticky-bonus", changefreq: "weekly", priority: 0.8 },

  // ── Spiludviklere ──
  { path: "/spiludviklere", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/netent", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/pragmatic-play", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/relax-gaming", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/play-n-go", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/hacksaw-gaming", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/nolimit-city", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/yggdrasil", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/microgaming", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/red-tiger", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/big-time-gaming", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/elk-studios", changefreq: "monthly", priority: 0.7 },
  { path: "/spiludviklere/evolution-gaming", changefreq: "monthly", priority: 0.7 },

  // ── Betalingsmetoder ──
  { path: "/betalingsmetoder", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/apple-pay", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/mobilepay", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/paypal", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/skrill", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/trustly", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/zimpler", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/paysafecard", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/bankoverforsler", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/visa-mastercard", changefreq: "monthly", priority: 0.7 },
  { path: "/betalingsmetoder/revolut", changefreq: "monthly", priority: 0.7 },

  // ── Info & Ansvarligt Spil ──
  { path: "/responsible-gaming", changefreq: "monthly", priority: 0.6 },
  { path: "/spillemyndigheden", changefreq: "monthly", priority: 0.7 },
  { path: "/about", changefreq: "monthly", priority: 0.5 },
  { path: "/contact", changefreq: "monthly", priority: 0.5 },
  { path: "/privacy", changefreq: "yearly", priority: 0.3 },
  { path: "/terms", changefreq: "yearly", priority: 0.3 },
  { path: "/cookies", changefreq: "yearly", priority: 0.3 },
];
