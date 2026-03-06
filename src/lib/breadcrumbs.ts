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
  "/free-spins-i-dag": "Free Spins i Dag",
  "/velkomstbonus": "Velkomstbonus",
  "/omsaetningskrav": "Omsætningskrav",
  "/indskudsbonus": "Indskudsbonus",
  "/bonus-uden-indbetaling": "Bonus uden Indbetaling",
  "/bonus-uden-omsaetningskrav": "Bonus uden Omsætningskrav",
  "/no-sticky-bonus": "No-Sticky Bonus",
  "/sticky-bonus": "Sticky Bonus",
  "/cashback-bonus": "Cashback Bonus",
  "/reload-bonus": "Reload Bonus",
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
  "/butik": "Butik",
  "/sitemap": "Sitemap",
  // Forfattere
  "/forfatter": "Forfattere",
  "/forfatter/jonas": "Jonas Theill",
  "/forfatter/kevin": "Kevin",
  "/forfatter/ajse": "Ajse",
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
  "/casinospil/blackjack/martingale": "Martingale Strategi",
  "/casinospil/blackjack/fibonacci": "Fibonacci Strategi",
  "/casinospil/blackjack/dalembert": "D'Alembert Strategi",
  "/casinospil/blackjack/amerikansk-blackjack": "Amerikansk Blackjack",
  "/casinospil/blackjack/europaeisk-blackjack": "Europæisk Blackjack",
  "/casinospil/blackjack/double-exposure-blackjack": "Double Exposure",
  "/casinospil/blackjack/spanish-21": "Spanish 21",
  "/casinospil/roulette": "Roulette",
  "/casinospil/roulette/amerikansk-roulette": "Amerikansk Roulette",
  "/casinospil/roulette/europaeisk-roulette": "Europæisk Roulette",
  "/casinospil/roulette/fransk-roulette": "Fransk Roulette",
  "/casinospil/roulette/dalembert-roulette": "D'Alembert Strategi",
  "/casinospil/roulette/martingale-roulette": "Martingale Strategi",
  "/casinospil/roulette/fibonacci-roulette": "Fibonacci Strategi",
  "/casinospil/roulette/labouchere-roulette": "Labouchère Strategi",
  "/casinospil/roulette/james-bond-roulette": "James Bond Strategi",
  "/casinospil/poker": "Poker",
  "/casinospil/poker/texas-holdem": "Texas Hold'em",
  "/casinospil/poker/omaha": "Omaha",
  "/casinospil/poker/three-card-poker": "Three Card Poker",
  "/casinospil/poker/caribbean-stud": "Caribbean Stud",
  "/casinospil/poker/video-poker": "Video Poker",
  "/casinospil/poker/poker-strategi": "Poker Strategi",
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
  // Casino Nyheder
  "/casino-nyheder": "Casino Nyheder",
  // Community (kun indexerbare sider)
  "/community": "Community",
  "/community/slots": "Spillehal",
  "/community/turneringer": "Turneringer",
  "/community/turneringer/arkiv": "Turneringsarkiv",
  "/community/rewards": "Rewards",
  "/bonus-hunt": "Bonus Hunt",
  "/bonus-hunt/arkiv": "Bonus Hunt Arkiv",
  "/slot-database": "Slot Database",
  "/community/hall-of-fame": "Hall of Fame",
};



/** Paths where breadcrumbs should NOT appear (visual + schema). */
export const EXCLUDED_PATHS = new Set([
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
  "/free-spins-i-dag": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/cashback-bonus": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/reload-bonus": [{ name: "Casino Bonus", path: "/casino-bonus" }],

  // Casinospil cluster – sub-hubs bound to /casinospil
  "/casinospil/roulette": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/blackjack": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/baccarat": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/poker": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/poker/texas-holdem": [{ name: "Casinospil", path: "/casinospil" }, { name: "Poker", path: "/casinospil/poker" }],
  "/casinospil/poker/omaha": [{ name: "Casinospil", path: "/casinospil" }, { name: "Poker", path: "/casinospil/poker" }],
  "/casinospil/poker/three-card-poker": [{ name: "Casinospil", path: "/casinospil" }, { name: "Poker", path: "/casinospil/poker" }],
  "/casinospil/poker/caribbean-stud": [{ name: "Casinospil", path: "/casinospil" }, { name: "Poker", path: "/casinospil/poker" }],
  "/casinospil/poker/video-poker": [{ name: "Casinospil", path: "/casinospil" }, { name: "Poker", path: "/casinospil/poker" }],
  "/casinospil/poker/poker-strategi": [{ name: "Casinospil", path: "/casinospil" }, { name: "Poker", path: "/casinospil/poker" }],
  "/casinospil/craps": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/game-shows": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/online-lotteri": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/spillemaskiner": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/roulette-strategi": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],

  // Roulette cluster – all spokes bound to /casinospil/roulette hub
  "/casinospil/roulette/amerikansk-roulette": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],
  "/casinospil/roulette/europaeisk-roulette": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],
  "/casinospil/roulette/fransk-roulette": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],
  "/casinospil/roulette/martingale-roulette": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],
  "/casinospil/roulette/fibonacci-roulette": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],
  "/casinospil/roulette/dalembert-roulette": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],
  "/casinospil/roulette/labouchere-roulette": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],
  "/casinospil/roulette/james-bond-roulette": [{ name: "Casinospil", path: "/casinospil" }, { name: "Roulette", path: "/casinospil/roulette" }],

  // Blackjack cluster – all spokes bound to /casinospil/blackjack hub
  "/casinospil/blackjack/martingale": [{ name: "Casinospil", path: "/casinospil" }, { name: "Blackjack", path: "/casinospil/blackjack" }],
  "/casinospil/blackjack/fibonacci": [{ name: "Casinospil", path: "/casinospil" }, { name: "Blackjack", path: "/casinospil/blackjack" }],
  "/casinospil/blackjack/dalembert": [{ name: "Casinospil", path: "/casinospil" }, { name: "Blackjack", path: "/casinospil/blackjack" }],
  "/casinospil/blackjack/amerikansk-blackjack": [{ name: "Casinospil", path: "/casinospil" }, { name: "Blackjack", path: "/casinospil/blackjack" }],
  "/casinospil/blackjack/europaeisk-blackjack": [{ name: "Casinospil", path: "/casinospil" }, { name: "Blackjack", path: "/casinospil/blackjack" }],
  "/casinospil/blackjack/double-exposure-blackjack": [{ name: "Casinospil", path: "/casinospil" }, { name: "Blackjack", path: "/casinospil/blackjack" }],
  "/casinospil/blackjack/spanish-21": [{ name: "Casinospil", path: "/casinospil" }, { name: "Blackjack", path: "/casinospil/blackjack" }],

  // Info-klynge – bundet til /om hubben
  "/saadan-tester-vi-casinoer": [{ name: "Om Casinoaftaler.dk", path: "/om" }],
  "/forretningsmodel": [{ name: "Om Casinoaftaler.dk", path: "/om" }],
  "/redaktionel-politik": [{ name: "Om Casinoaftaler.dk", path: "/om" }],
  "/kontakt": [{ name: "Om Casinoaftaler.dk", path: "/om" }],

  // Live Casino cluster – bundet til /live-casino hub
  "/live-casino/blackjack": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/roulette": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/baccarat": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/lightning-roulette": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/monopoly-live": [{ name: "Live Casino", path: "/live-casino" }],

  // Casinoer guides – bundet til /casinoer hub
  "/casinoer/hurtig-udbetaling": [{ name: "Casinoer", path: "/casinoer" }],
  "/casinoer/hoej-rtp": [{ name: "Casinoer", path: "/casinoer" }],
  "/casinoer/crypto-casino": [{ name: "Casinoer", path: "/casinoer" }],
  "/casinoer/vr-casinoer": [{ name: "Casinoer", path: "/casinoer" }],
  "/casinoer/mobil-casinoer": [{ name: "Casinoer", path: "/casinoer" }],
  "/casinoer/spil-casino-for-sjov": [{ name: "Casinoer", path: "/casinoer" }],
  "/casinoer/casino-og-skat": [{ name: "Casinoer", path: "/casinoer" }],

  // Spillemaskiner cluster – bundet til /casinospil/spillemaskiner hub
  "/casinospil/spillemaskiner/hoej-rtp": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/sweet-bonanza": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/book-of-dead": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/gates-of-olympus": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/starburst": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/razor-shark": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/big-bass-bonanza": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/dead-or-alive-2": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/gonzos-quest": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/reactoonz": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/money-train-3": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/wolf-gold": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/the-dog-house": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/jammin-jars": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/bonanza": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/fire-joker": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/legacy-of-dead": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/divine-fortune": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/eye-of-horus": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/buffalo-king": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/sugar-rush": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/cleopatra": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/mega-moolah": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/thunderstruck-ii": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/immortal-romance": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/wild-west-gold": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/madame-destiny-megaways": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/extra-chilli-megaways": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/wanted-dead-or-a-wild": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/chaos-crew": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/joker-strike": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/bonus-buys": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],

  // Community cluster – bundet til /community hub
  "/community/turneringer": [{ name: "Community", path: "/community" }],
  "/community/turneringer/arkiv": [{ name: "Community", path: "/community" }, { name: "Turneringer", path: "/community/turneringer" }],
  "/community/rewards": [{ name: "Community", path: "/community" }],
  "/community/hall-of-fame": [{ name: "Community", path: "/community" }],

  // Bonus Hunt – bundet til Forside (ikke Community, for SEO-isolation)
  "/bonus-hunt": [],
  "/bonus-hunt/arkiv": [{ name: "Bonus Hunt", path: "/bonus-hunt" }],

  // Slot Database – standalone hub
  "/slot-database": [],
};

/**
 * Returns ordered breadcrumb items for a given pathname,
 * or null when breadcrumbs should not be shown (homepage, excluded routes).
 */
export function getBreadcrumbItems(
  pathname: string,
  dynamicLabel?: string
): { name: string; path: string }[] | null {
  if (pathname === "/") return null;
  if (EXCLUDED_PATHS.has(pathname)) return null;
  if (EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  const label =
    dynamicLabel ||
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
  pathname: string,
  dynamicLabel?: string
): Record<string, unknown> | null {
  const items = getBreadcrumbItems(pathname, dynamicLabel);
  if (!items) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}${pathname === "/" ? "" : pathname}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
