/**
 * Shared breadcrumb utilities.
 *
 * Consumed by:
 *  - Breadcrumbs.tsx  → visual <nav> rendering only (no JSON-LD)
 *  - SEO.tsx          → BreadcrumbList entity absorbed into unified @graph
 */

export const BASE_URL = "https://casinoaftaler.dk";

export const routeLabels: Record<string, string> = {
  "/": "Forside",
  // Nye Casinoer
  "/nye-casinoer": "Nye Casinoer",
  "/nye-casinoer/2026": "Nye Casinoer 2026",
  "/nye-casinoer/dansk-licens": "Med Dansk Licens",
  "/nye-casinoer/uden-rofus": "Uden ROFUS",
  "/nye-casinoer/hurtig-udbetaling": "Hurtig Udbetaling",
  "/nye-casinoer/bonus-uden-indbetaling": "Bonus uden Indbetaling",
  "/nye-casinoer/trustly": "Med Trustly",
  "/nye-casinoer/mitid": "Med MitID",
  "/nye-casinoer/lav-wagering": "Lav Wagering",
  "/nye-casinoer/bedste": "Bedste Nye Casinoer",
  "/nye-casinoer/vs-etablerede": "Nye vs. Etablerede",
  // Live Casino
  "/live-casino": "Live Casino",
  "/live-casino/blackjack": "Live Blackjack",
  "/live-casino/roulette": "Live Roulette",
  "/live-casino/baccarat": "Live Baccarat",
  "/live-casino/lightning-roulette": "Lightning Roulette",
  "/live-casino/monopoly-live": "Monopoly Live",
  // Casino Bonus
  "/casino-bonus": "Casino Bonus",
  "/free-spins": "Free Spins",
  "/velkomstbonus": "Velkomstbonus",
  "/omsaetningskrav": "Omsætningskrav",
  "/indskudsbonus": "Indskudsbonus",
  "/bonus-uden-indbetaling": "Bonus uden Indbetaling",
  "/bonus-uden-omsaetningskrav": "Bonus uden Omsætningskrav",
  "/no-sticky-bonus": "No-Sticky Bonus",
  "/sticky-bonus": "Sticky Bonus",
  // Betalingsmetoder
  "/betalingsmetoder": "Betalingsmetoder",
  "/betalingsmetoder/apple-pay": "Apple Pay",
  "/betalingsmetoder/mobilepay": "MobilePay",
  "/betalingsmetoder/paypal": "PayPal",
  "/betalingsmetoder/skrill": "Skrill",
  "/betalingsmetoder/trustly": "Trustly",
  "/betalingsmetoder/zimpler": "Zimpler",
  "/betalingsmetoder/paysafecard": "Paysafecard",
  "/betalingsmetoder/bankoverforsler": "Bankoverførsler",
  "/betalingsmetoder/visa-mastercard": "Visa / Mastercard",
  "/betalingsmetoder/revolut": "Revolut",
  // Spiludviklere
  "/spiludviklere": "Spiludviklere",
  "/spiludviklere/netent": "NetEnt",
  "/spiludviklere/pragmatic-play": "Pragmatic Play",
  "/spiludviklere/relax-gaming": "Relax Gaming",
  "/spiludviklere/play-n-go": "Play'n GO",
  "/spiludviklere/hacksaw-gaming": "Hacksaw Gaming",
  "/spiludviklere/nolimit-city": "Nolimit City",
  "/spiludviklere/yggdrasil": "Yggdrasil",
  "/spiludviklere/microgaming": "Microgaming",
  "/spiludviklere/red-tiger": "Red Tiger",
  "/spiludviklere/big-time-gaming": "Big Time Gaming",
  "/spiludviklere/elk-studios": "ELK Studios",
  "/spiludviklere/evolution-gaming": "Evolution Gaming",
  // Ansvarligt Spil & Info
  "/ansvarligt-spil": "Ansvarligt Spil",
  "/om": "Om Casinoaftaler.dk",
  "/forretningsmodel": "Forretningsmodel",
  "/redaktionel-politik": "Redaktionel Politik",
  "/kontakt": "Kontakt",
  "/privatlivspolitik": "Privatlivspolitik",
  "/terms": "Vilkår",
  "/cookies": "Cookies",
  "/highlights": "Highlights",
  // Forfattere
  "/forfatter": "Forfattere",
  "/forfatter/jonas": "Jonas Theill",
  "/forfatter/kevin": "Kevin",
  // Spillemyndighed & Licenser
  "/spillemyndigheden": "Spillemyndigheden",
  "/casino-licenser": "Casino Licenser",
  "/licenserede-casinoer": "Licenserede Casinoer",
  "/saadan-tester-vi-casinoer": "Sådan Tester Vi Casinoer",
  // Top Lister
  "/top-10-casino-online": "Top 10 Casino Online",
  // Casino Anmeldelser
  "/casino-anmeldelser": "Casino Anmeldelser",
  "/casino-anmeldelser/spilleautomaten": "Spilleautomaten",
  "/casino-anmeldelser/campobet": "Campobet",
  "/casino-anmeldelser/betinia": "Betinia",
  "/casino-anmeldelser/swift-casino": "Swift Casino",
  "/casino-anmeldelser/luna-casino": "Luna Casino",
  "/casino-anmeldelser/spildansknu": "SpilDanskNu",
  "/casino-anmeldelser/danske-spil": "Danske Spil Casino",
  "/casino-anmeldelser/comeon": "ComeOn Casino",
  "/casino-anmeldelser/getlucky": "GetLucky Casino",
  "/casino-anmeldelser/mr-green": "Mr Green Casino",
  "/casino-anmeldelser/videoslots": "Videoslots Casino",
  "/casino-anmeldelser/mr-vegas": "Mr Vegas Casino",
  "/casino-anmeldelser/leovegas": "LeoVegas Casino",
  "/casino-anmeldelser/expekt": "Expekt",
  "/casino-anmeldelser/betano": "Betano",
  "/casino-anmeldelser/888-casino": "888 Casino",
  "/casino-anmeldelser/unibet": "Unibet",
  "/casino-anmeldelser/bet365": "bet365",
  "/casino-anmeldelser/royal-casino": "Royal Casino",
  "/casino-anmeldelser/maria-casino": "Maria Casino",
  "/casino-anmeldelser/kapow-casino": "Kapow Casino",
  "/casino-anmeldelser/nordicbet": "NordicBet",
  "/casino-anmeldelser/one-casino": "One Casino",
  "/casino-anmeldelser/spilnu": "Spilnu",
  "/casino-anmeldelser/stake-casino": "Stake Casino",
  "/casino-anmeldelser/casinostuen": "Casinostuen",
  "/casino-anmeldelser/pokerstars": "PokerStars",
  "/casino-anmeldelser/bwin": "bwin",
  "/casino-anmeldelser/marathonbet": "MarathonBet",
  // Casinospil
  "/casinospil": "Casinospil",
  "/casinospil/spillemaskiner": "Spillemaskiner",
  "/casinospil/spillemaskiner/hoej-rtp": "Høj RTP",
  "/casinospil/spillemaskiner/sweet-bonanza": "Sweet Bonanza",
  "/casinospil/spillemaskiner/book-of-dead": "Book of Dead",
  "/casinospil/spillemaskiner/gates-of-olympus": "Gates of Olympus",
  "/casinospil/spillemaskiner/starburst": "Starburst",
  "/casinospil/spillemaskiner/razor-shark": "Razor Shark",
  "/casinospil/spillemaskiner/big-bass-bonanza": "Big Bass Bonanza",
  "/casinospil/spillemaskiner/dead-or-alive-2": "Dead or Alive 2",
  "/casinospil/spillemaskiner/gonzos-quest": "Gonzo's Quest",
  "/casinospil/spillemaskiner/reactoonz": "Reactoonz",
  "/casinospil/spillemaskiner/money-train-3": "Money Train 3",
  "/casinospil/spillemaskiner/wolf-gold": "Wolf Gold",
  "/casinospil/spillemaskiner/the-dog-house": "The Dog House",
  "/casinospil/spillemaskiner/jammin-jars": "Jammin' Jars",
  "/casinospil/spillemaskiner/bonanza": "Bonanza",
  "/casinospil/spillemaskiner/fire-joker": "Fire Joker",
  "/casinospil/spillemaskiner/legacy-of-dead": "Legacy of Dead",
  "/casinospil/spillemaskiner/divine-fortune": "Divine Fortune",
  "/casinospil/spillemaskiner/eye-of-horus": "Eye of Horus",
  "/casinospil/spillemaskiner/buffalo-king": "Buffalo King",
  "/casinospil/spillemaskiner/sugar-rush": "Sugar Rush",
  "/casinospil/spillemaskiner/cleopatra": "Cleopatra",
  "/casinospil/spillemaskiner/mega-moolah": "Mega Moolah",
  "/casinospil/spillemaskiner/thunderstruck-ii": "Thunderstruck II",
  "/casinospil/spillemaskiner/immortal-romance": "Immortal Romance",
  "/casinospil/spillemaskiner/wild-west-gold": "Wild West Gold",
  "/casinospil/spillemaskiner/madame-destiny-megaways": "Madame Destiny Megaways",
  "/casinospil/spillemaskiner/extra-chilli-megaways": "Extra Chilli Megaways",
  "/casinospil/spillemaskiner/wanted-dead-or-a-wild": "Wanted Dead or a Wild",
  "/casinospil/spillemaskiner/chaos-crew": "Chaos Crew",
  "/casinospil/spillemaskiner/joker-strike": "Joker Strike",
  "/casinospil/spillemaskiner/bonus-buys": "Bonus Buys",
  "/casinospil/blackjack": "Blackjack",
  "/casinospil/roulette": "Roulette",
  "/casinospil/poker": "Poker",
  "/casinospil/craps": "Craps",
  "/casinospil/baccarat": "Baccarat",
  "/casinospil/roulette-strategi": "Roulette Strategi",
  "/casinospil/online-lotteri": "Online Lotteri",
  "/casinospil/game-shows": "Game Shows",
  // Casinoer guides
  "/casinoer": "Casinoer",
  "/casinoer/hurtig-udbetaling": "Hurtig Udbetaling",
  "/casinoer/hoej-rtp": "Høj RTP",
  "/casinoer/crypto-casino": "Crypto Casino",
  "/casinoer/vr-casinoer": "VR Casinoer",
  "/casinoer/mobil-casinoer": "Mobil Casinoer",
  "/casinoer/spil-casino-for-sjov": "Spil Casino for Sjov",
  "/casinoer/casino-og-skat": "Casino og Skat",
  // Community (kun indexerbare sider)
  "/community": "Community",
  "/community/slots": "Spillehal",
};

/** Paths where breadcrumbs should NOT appear (visual + schema). */
export const EXCLUDED_PATHS = new Set([
  "/community/leaderboard",
  "/community/rewards",
  "/community/spin-the-reel",
]);

export const EXCLUDED_PREFIXES = [
  "/casino/",
  "/auth",
  "/admin",
  "/profil",
  "/u/",
  "/community/slots/",
];

/**
 * Manual parent overrides for pages whose URL doesn't reflect their
 * logical position in the hierarchy (e.g. root-level orphans).
 *
 * Key: the page's pathname
 * Value: ordered list of ancestor { name, path } to inject between Forside and the page itself.
 */
const PARENT_OVERRIDES: Record<string, { name: string; path: string }[]> = {
  "/licenserede-casinoer": [{ name: "Casinoer", path: "/casinoer" }],

  // Casinoer cluster – orphan pages bound to /casinoer hub
  "/casino-licenser": [{ name: "Casinoer", path: "/casinoer" }],
  "/spillemyndigheden": [{ name: "Casinoer", path: "/casinoer" }],

  // Top-10 bound to casino-anmeldelser hub
  "/top-10-casino-online": [{ name: "Casino Anmeldelser", path: "/casino-anmeldelser" }],

  // Bonus cluster – all bound to /casino-bonus hub
  "/free-spins": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/velkomstbonus": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/omsaetningskrav": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/indskudsbonus": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/bonus-uden-indbetaling": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/bonus-uden-omsaetningskrav": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/no-sticky-bonus": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/sticky-bonus": [{ name: "Casino Bonus", path: "/casino-bonus" }],

  // Info-klynge – bundet til /om hubben
  "/saadan-tester-vi-casinoer": [{ name: "Om Casinoaftaler.dk", path: "/om" }],
  "/forretningsmodel": [{ name: "Om Casinoaftaler.dk", path: "/om" }],
  "/redaktionel-politik": [{ name: "Om Casinoaftaler.dk", path: "/om" }],
};

/**
 * Returns ordered breadcrumb items for a given pathname,
 * or null when breadcrumbs should not be shown (homepage, excluded routes).
 */
export function getBreadcrumbItems(
  pathname: string
): { name: string; path: string }[] | null {
  if (pathname === "/") return null;
  if (EXCLUDED_PATHS.has(pathname)) return null;
  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  const label =
    routeLabels[pathname] ||
    pathname.replace(/^\//, "").replace(/-/g, " ");

  const items: { name: string; path: string }[] = [
    { name: "Forside", path: "/" },
  ];

  // Inject manual parent chain if defined
  if (PARENT_OVERRIDES[pathname]) {
    items.push(...PARENT_OVERRIDES[pathname]);
    items.push({ name: label, path: pathname });
    return items;
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 1) {
    let currentPath = "";
    for (let i = 0; i < segments.length - 1; i++) {
      currentPath += `/${segments[i]}`;
      const parentLabel =
        routeLabels[currentPath] || segments[i].replace(/-/g, " ");
      items.push({ name: parentLabel, path: currentPath });
    }
  }

  items.push({ name: label, path: pathname });
  return items;
}

/**
 * Builds a BreadcrumbList JSON-LD object for the given pathname.
 * Returns null for homepage and excluded routes.
 * Designed to be absorbed into the unified @graph in SEO.tsx.
 */
export function buildBreadcrumbListSchema(
  pathname: string
): Record<string, unknown> | null {
  const items = getBreadcrumbItems(pathname);
  if (!items) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
