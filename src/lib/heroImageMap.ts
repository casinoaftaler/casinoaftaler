/**
 * Eagerly resolve all hero images via Vite glob so we can look them up by slug.
 * Vite only resolves the hashed URL string – no image bytes in the JS bundle.
 */

const heroModules = import.meta.glob<{ default: string }>(
  "/src/assets/heroes/*-hero.{jpg,webp,png}",
  { eager: true },
);

// Build a map: slug (e.g. "casino-bonus") → resolved image URL
const heroBySlug: Record<string, string> = {};
for (const [path, mod] of Object.entries(heroModules)) {
  const filename = path.split("/").pop() ?? "";
  const slug = filename.replace(/-hero\.\w+$/, "");
  if (slug) heroBySlug[slug] = mod.default;
}

const DEFAULT_HERO_SLUG = "top-casino";

/**
 * Explicit overrides for paths where the URL slug doesn't match the hero filename.
 * Key = article path, Value = hero filename slug (without "-hero.jpg").
 */
const PATH_OVERRIDES: Record<string, string> = {
  // Shared/static
  "/om": "about",
  "/kontakt": "contact",
  "/saadan-tester-vi-casinoer": "test-metode",
  "/forretningsmodel": "forretningsmodel",
  "/redaktionel-politik": "redaktionel-politik",
  "/ansvarligt-spil": "responsible-gaming",
  "/casino-nyheder": "nye-casinoer",
  "/spillemyndigheden": "casino-licenser",

  // Jonas – hub & guides
  "/top-10-casino-online": "top-casino",
  "/casinoer": "casinoer-hub",
  "/slot-database": "spillemaskiner",
  "/hall-of-fame": "top-casino",

  // Jonas – systems / clusters
  "/casinospil/blackjack/martingale": "martingale-blackjack",
  "/casinospil/blackjack/dalembert": "dalembert-blackjack",
  "/casinospil/poker/omaha": "omaha-poker",
  "/casinospil/poker/strategi": "poker-strategi",
  "/nye-casinoer/vs-etablerede": "nye-vs-etablerede",
  "/casinoer/spil-casino-for-sjov": "spil-for-sjov",
  "/mobil-casino/iphone": "iphone-casino",
  "/mobil-casino/android": "android-casino",
  "/mobil-casino/tablet": "tablet-casino",
  "/mobil-casino/bedste-apps": "bedste-casino-apps",

  // Kevin – payments / no-account
  "/betalingsmetoder/bankoverforsler": "bank-transfer",
  "/casino-uden-konto/pay-n-play": "casino-uden-konto",
  "/casino-uden-konto/hurtig-registrering": "casino-uden-konto",
  "/casino-uden-konto/fordele-og-ulemper": "casino-uden-konto",

  // Niklas
  "/no-sticky-bonus": "no-sticky",
  "/bonus-uden-omsaetningskrav": "bonus-uden-omsaetning",

  // Ajse – ansvarligt spil cluster
  "/ansvarligt-spil/rofus": "rofus-guide",
  "/ansvarligt-spil/ludomani": "ludomani-guide",
  "/ansvarligt-spil/stopspillet": "stopspillet-guide",
  "/ansvarligt-spil/spillegraenser": "spillegraenser-guide",
  "/ansvarligt-spil/hjaelpelinjer": "hjaelpelinjer-guide",
  "/ansvarligt-spil/selvudelukkelse-guide": "selvudelukkelse-guide",

  // Community
  "/bonus-hunt": "top-casino",
  "/bonus-hunt/arkiv": "top-casino",
  "/highlights": "turneringer",
  "/community/slots": "spillemaskiner",
  "/statistik": "turneringer",
};

const SECTION_DEFAULTS: Array<{ prefix: string; slug: string }> = [
  { prefix: "/casinospil/spillemaskiner/", slug: "spillemaskiner" },
  { prefix: "/casinospil/blackjack/", slug: "blackjack" },
  { prefix: "/casinospil/roulette/", slug: "roulette" },
  { prefix: "/casinospil/poker/", slug: "poker" },
  { prefix: "/casinospil/", slug: "spillemaskiner" },
  { prefix: "/live-casino/", slug: "live-casino" },
  { prefix: "/casino-anmeldelser/", slug: "casino-anmeldelser" },
  { prefix: "/spiludviklere/", slug: "spiludviklere" },
  { prefix: "/betalingsmetoder/", slug: "betalingsmetoder" },
  { prefix: "/nye-casinoer/", slug: "nye-casinoer" },
  { prefix: "/casinoer/", slug: "casinoer-hub" },
  { prefix: "/mobil-casino/", slug: "mobil-casino" },
  { prefix: "/casino-uden-konto/", slug: "casino-uden-konto" },
  { prefix: "/ansvarligt-spil/", slug: "responsible-gaming" },
  { prefix: "/ordbog/", slug: "ordbog" },
];

/**
 * Given an article path like "/casino-bonus" or "/casinospil/spillemaskiner/book-of-dead",
 * return the matching hero image URL.
 */
export function getHeroImageForPath(articlePath: string): string {
  const normalizedPath = articlePath.replace(/\/$/, "") || "/";

  // 1) Exact override
  const overrideSlug = PATH_OVERRIDES[normalizedPath];
  if (overrideSlug && heroBySlug[overrideSlug]) {
    return heroBySlug[overrideSlug];
  }

  const segments = normalizedPath.replace(/^\//, "").split("/");
  const lastSegment = segments[segments.length - 1];

  // 2) Last segment
  if (lastSegment && heroBySlug[lastSegment]) {
    return heroBySlug[lastSegment];
  }

  // 3) Full joined path
  const joined = segments.join("-");
  if (heroBySlug[joined]) {
    return heroBySlug[joined];
  }

  // 4) Parent-child combo
  if (segments.length >= 2) {
    const parentChild = segments.slice(-2).join("-");
    if (heroBySlug[parentChild]) {
      return heroBySlug[parentChild];
    }
  }

  // 5) Section-level default image
  for (const section of SECTION_DEFAULTS) {
    if (normalizedPath.startsWith(section.prefix) && heroBySlug[section.slug]) {
      return heroBySlug[section.slug];
    }
  }

  // 6) Global guaranteed fallback (always image, never gradient)
  return heroBySlug[DEFAULT_HERO_SLUG] ?? Object.values(heroBySlug)[0] ?? "";
}
