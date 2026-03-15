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

/**
 * Explicit overrides for paths where the URL slug doesn't match the hero filename.
 * Key = article path, Value = hero filename slug (without "-hero.jpg").
 */
const PATH_OVERRIDES: Record<string, string> = {
  // Jonas – hub & guide pages
  "/top-10-casino-online": "top-casino",
  "/saadan-tester-vi-casinoer": "test-metode",
  "/casinoer": "casinoer-hub",
  "/hall-of-fame": "top-casino",

  // Jonas – blackjack strategy systems
  "/casinospil/blackjack/martingale-system": "martingale-blackjack",
  "/casinospil/blackjack/dalembert-system": "dalembert-blackjack",

  // Jonas – poker
  "/casinospil/poker/omaha": "omaha-poker",
  "/casinospil/poker/strategi": "poker-strategi",

  // Jonas – nye casinoer cluster
  "/nye-casinoer/vs-etablerede": "nye-vs-etablerede",

  // Jonas – casinoer cluster
  "/casinoer/spil-casino-for-sjov": "spil-for-sjov",

  // Jonas – mobil casino cluster
  "/mobil-casino/iphone": "iphone-casino",
  "/mobil-casino/android": "android-casino",
  "/mobil-casino/tablet": "tablet-casino",
  "/mobil-casino/bedste-apps": "bedste-casino-apps",

  // Kevin – betalingsmetoder
  "/betalingsmetoder/bankoverforsler": "bank-transfer",

  // Kevin – casino uden konto (use parent hero)
  "/casino-uden-konto/pay-n-play": "casino-uden-konto",
  "/casino-uden-konto/hurtig-registrering": "casino-uden-konto",
  "/casino-uden-konto/fordele-og-ulemper": "casino-uden-konto",

  // Niklas – bonus guides
  "/no-sticky-bonus": "no-sticky",
  "/bonus-uden-omsaetningskrav": "bonus-uden-omsaetning",

  // Ajse – ansvarligt spil cluster
  "/ansvarligt-spil": "responsible-gaming",
  "/ansvarligt-spil/rofus": "rofus-guide",
  "/ansvarligt-spil/ludomani": "ludomani-guide",
  "/ansvarligt-spil/stopspillet": "stopspillet-guide",
  "/ansvarligt-spil/spillegraenser": "spillegraenser-guide",
  "/ansvarligt-spil/hjaelpelinjer": "hjaelpelinjer-guide",
  "/kontakt": "contact",
};

/**
 * Given an article path like "/casino-bonus" or "/casinospil/spillemaskiner/book-of-dead",
 * return the matching hero image URL (or undefined if none found).
 */
export function getHeroImageForPath(articlePath: string): string | undefined {
  // 1. Check explicit overrides first
  const overrideSlug = PATH_OVERRIDES[articlePath];
  if (overrideSlug && heroBySlug[overrideSlug]) {
    return heroBySlug[overrideSlug];
  }

  const segments = articlePath.replace(/^\/|\/$/g, "").split("/");
  const lastSegment = segments[segments.length - 1];

  // 2. Try last segment (most common: /casino-bonus → casino-bonus-hero.jpg)
  if (lastSegment && heroBySlug[lastSegment]) {
    return heroBySlug[lastSegment];
  }

  // 3. Try all segments joined (e.g. /nye-casinoer/dansk-licens → nye-casinoer-dansk-licens)
  const joined = segments.join("-");
  if (heroBySlug[joined]) {
    return heroBySlug[joined];
  }

  // 4. Try parent-child combo (e.g. /casinospil/roulette → roulette)
  if (segments.length >= 2) {
    const parentChild = segments.slice(-2).join("-");
    if (heroBySlug[parentChild]) {
      return heroBySlug[parentChild];
    }
  }

  return undefined;
}
