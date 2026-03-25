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
  // Sitemap
  "/sitemap": "Sitemap",
  "/sitemap/casino-anmeldelser": "Casino Anmeldelser",
  "/sitemap/casino-bonus": "Casino Bonus",
  "/sitemap/casinospil": "Casinospil",
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
  // "/nye-casinoer/bedste" – removed (301 redirect to /nye-casinoer)
  "/nye-casinoer/vs-etablerede": "Nye vs. Etablerede",
  // Live Casino
  "/live-casino": "Live Casino",
  "/live-casino/blackjack": "Live Blackjack",
  "/live-casino/roulette": "Live Roulette",
  "/live-casino/baccarat": "Live Baccarat",
  "/live-casino/lightning-roulette": "Lightning Roulette",
  "/live-casino/monopoly-live": "Monopoly Live",
  "/live-casino/game-shows": "Game Shows",
  "/live-casino/crazy-time": "Crazy Time",
  "/live-casino/dream-catcher": "Dream Catcher",
  "/live-casino/deal-or-no-deal": "Deal or No Deal",
  "/live-casino/strategi": "Live Casino Strategi",
  "/live-casino/udbydere": "Live Casino Udbydere",
  // Casino Bonus
  "/casino-bonus": "Casino Bonus",
  "/markedsindsigt": "Markedsindsigt",
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
  "/spiludviklere/thunderkick": "Thunderkick",
  "/spiludviklere/blueprint-gaming": "Blueprint Gaming",
  "/spiludviklere/push-gaming": "Push Gaming",
  "/spiludviklere/quickspin": "Quickspin",
  "/spiludviklere/isoftbet": "iSoftBet",
  "/spiludviklere/betsoft": "Betsoft",
  "/spiludviklere/wazdan": "Wazdan",
  "/spiludviklere/endorphina": "Endorphina",
  "/spiludviklere/stakelogic": "Stakelogic",
  "/spiludviklere/booming-games": "Booming Games",
  // Ansvarligt Spil & Info
  "/ansvarligt-spil": "Ansvarligt Spil",
  "/ansvarligt-spil/rofus": "ROFUS – Selvudelukkelse",
  "/ansvarligt-spil/ludomani": "Ludomani – Spilleafhængighed",
  "/ansvarligt-spil/stopspillet": "StopSpillet – Gratis Rådgivning",
  "/ansvarligt-spil/spillegraenser": "Spillegrænser – Indbetalings- og Tidsgrænser",
  "/ansvarligt-spil/selvudelukkelse-guide": "Selvudelukkelse – Komplet Guide",
  "/ansvarligt-spil/hjaelpelinjer": "Hjælpelinjer – Danske Støttetilbud",
  // Mobil Casino
  "/mobil-casino": "Mobil Casino",
  "/casino-app": "Casino App",
  "/mobil-casino/iphone": "Casino på iPhone",
  "/mobil-casino/android": "Casino på Android",
  "/mobil-casino/tablet": "Casino på Tablet",
  "/mobil-casino/bedste-apps": "Bedste Casino Apps 2026",
  // Casino uden Konto cluster
  "/casino-uden-konto": "Casino uden Konto",
  "/casino-uden-konto/pay-n-play": "Pay N Play",
  "/casino-uden-konto/hurtig-registrering": "Hurtig Registrering",
  "/casino-uden-konto/fordele-og-ulemper": "Fordele og Ulemper",
  // Slot Kategorier
  "/megaways-slots": "Megaways Slots",
  "/jackpot-slots": "Jackpot Slots",
  "/bonus-buy-slots": "Bonus Buy Slots",
  // Provider Slot Hubs
  "/spillemaskiner/pragmatic-play": "Pragmatic Play Slots",
  "/spillemaskiner/netent": "NetEnt Slots",
  "/spillemaskiner/play-n-go": "Play'n GO Slots",
  "/spillemaskiner/hacksaw-gaming": "Hacksaw Gaming Slots",
  "/spillemaskiner/big-time-gaming": "Big Time Gaming Slots",
  "/spillemaskiner/microgaming": "Microgaming Slots",
  "/spillemaskiner/nolimit-city": "Nolimit City Slots",
  "/spillemaskiner/evolution-gaming": "Evolution Slots",
  "/spillemaskiner/elk-studios": "ELK Studios Slots",
  "/spillemaskiner/yggdrasil": "Yggdrasil Slots",
  "/spillemaskiner/relax-gaming": "Relax Gaming Slots",
  "/spillemaskiner/red-tiger": "Red Tiger Slots",
  "/spillemaskiner/igt": "IGT Slots",
  "/spillemaskiner/thunderkick": "Thunderkick Slots",
  "/spillemaskiner/blueprint-gaming": "Blueprint Gaming Slots",
  "/spillemaskiner/push-gaming": "Push Gaming Slots",
  "/spillemaskiner/quickspin": "Quickspin Slots",
  "/spillemaskiner/isoftbet": "iSoftBet Slots",
  "/spillemaskiner/betsoft": "Betsoft Slots",
  "/spillemaskiner/wazdan": "Wazdan Slots",
  "/spillemaskiner/endorphina": "Endorphina Slots",
  "/spillemaskiner/stakelogic": "Stakelogic Slots",
  "/spillemaskiner/booming-games": "Booming Games Slots",
  // Batch 2 – VIP & MobilePay
  "/vip-program": "VIP Program",
  "/casino-med-mobilepay": "Casino med MobilePay",
  "/om": "Om Casinoaftaler.dk",
  "/forretningsmodel": "Forretningsmodel",
  "/pragmatic-play-partner": "Pragmatic Play Partner",
  "/redaktionel-politik": "Redaktionel Politik",
  "/kontakt": "Kontakt",
  "/privatlivspolitik": "Privatlivspolitik",
  "/terms": "Vilkår",
  "/cookies": "Cookies",
  "/highlights": "Highlights",
  "/butik": "Butik",
  // "/sitemap" already defined above
  // Forfattere
  "/forfatter": "Forfattere",
  "/forfatter/jonas": "Jonas Theill",
  "/forfatter/kevin": "Kevin",
  "/forfatter/ajse": "Ajse",
  "/forfatter/niklas": "Niklas",
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
  "/casino-anmeldelser/playkasino": "PlayKasino",
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
  // VS-sider
  "/casino-anmeldelser/bet365-vs-unibet": "bet365 vs Unibet",
  "/casino-anmeldelser/leovegas-vs-mr-green": "LeoVegas vs Mr Green",
  "/casino-anmeldelser/danske-spil-vs-spilnu": "Danske Spil vs Spilnu",
  "/casino-anmeldelser/spilleautomaten-vs-spildansknu": "Spilleautomaten vs SpilDanskNu",
  "/casino-anmeldelser/betinia-vs-campobet": "Betinia vs Campobet",
  "/casino-anmeldelser/swift-casino-vs-luna-casino": "Swift Casino vs Luna Casino",
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
  // Batch 2 – 13 nye slot guides
  "/casinospil/spillemaskiner/big-bad-wolf": "Big Bad Wolf",
  "/casinospil/spillemaskiner/buffalo-rising-megaways": "Buffalo Rising Megaways",
  "/casinospil/spillemaskiner/chilli-pop": "Chilli Pop",
  "/casinospil/spillemaskiner/classic-fruits": "Classic Fruits",
  "/casinospil/spillemaskiner/cygnus": "Cygnus",
  "/casinospil/spillemaskiner/esqueleto-explosivo-2": "Esqueleto Explosivo 2",
  "/casinospil/spillemaskiner/gold-vein": "Gold Vein",
  "/casinospil/spillemaskiner/hot-spin-deluxe": "Hot Spin Deluxe",
  "/casinospil/spillemaskiner/magic-hot": "Magic Hot",
  "/casinospil/spillemaskiner/mystery-reels-megaways": "Mystery Reels Megaways",
  "/casinospil/spillemaskiner/satoshis-secret": "Satoshi's Secret",
  "/casinospil/spillemaskiner/tombstone-rip": "Tombstone RIP",
  "/casinospil/spillemaskiner/vikings-go-berzerk": "Vikings Go Berzerk",
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
  "/casinospil/poker/bedste-sider": "Bedste Pokersider",
  "/casinospil/craps": "Craps",
  "/casinospil/baccarat": "Baccarat",
  // "/casinospil/roulette-strategi" – removed (301 redirect to /casinospil/roulette)
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
  // Casino Ordbog
  "/ordbog": "Casino Ordbog",
  "/ordbog/rtp": "RTP (Return to Player)",
  "/ordbog/wagering": "Omsætningskrav (Wagering)",
  "/ordbog/volatilitet": "Volatilitet",
  "/ordbog/house-edge": "House Edge",
  "/ordbog/free-spins": "Free Spins",
  "/ordbog/scatter": "Scatter-symbol",
  "/ordbog/wild": "Wild-symbol",
  "/ordbog/jackpot": "Jackpot",
  "/ordbog/rng": "RNG (Random Number Generator)",
  "/ordbog/paylines": "Gevinstlinjer (Paylines)",
  "/ordbog/bonus-runde": "Bonusrunde",
  "/ordbog/multiplikator": "Multiplikator",
  "/ordbog/max-bet": "Max Bet",
  "/ordbog/autoplay": "Autoplay",
  "/ordbog/hit-frequency": "Hit Frequency",
  "/ordbog/gamble-feature": "Gamble Feature",
  "/ordbog/cascading-wins": "Cascading Wins",
  "/ordbog/megaways": "Megaways",
  "/ordbog/buy-bonus": "Buy Bonus",
  "/ordbog/sticky-bonus-term": "Sticky Bonus",
  "/ordbog/bankroll-management": "Bankroll Management",
  "/ordbog/progressiv-jackpot": "Progressiv Jackpot",
  "/ordbog/gevinstprocent": "Gevinstprocent",
  "/ordbog/minimum-indbetaling": "Minimum Indbetaling",
  "/ordbog/kyc": "KYC (Know Your Customer)",
  "/ordbog/mitid-casino": "MitID Casino",
  "/ordbog/gamification": "Gamification",
  "/ordbog/retrigger": "Retrigger",
  "/ordbog/cluster-pays": "Cluster Pays",
  "/ordbog/expanding-wild": "Expanding Wild",
  // Batch 3 – 44 nye termer
  "/ordbog/stacked-wilds": "Stacked Wilds",
  "/ordbog/sticky-wilds": "Sticky Wilds",
  "/ordbog/walking-wilds": "Walking Wilds",
  "/ordbog/random-wilds": "Random Wilds",
  "/ordbog/mystery-symbols": "Mystery Symbols",
  "/ordbog/hold-and-spin": "Hold and Spin",
  "/ordbog/colossal-symbols": "Colossal Symbols",
  "/ordbog/split-symbols": "Split Symbols",
  "/ordbog/nudge": "Nudge",
  "/ordbog/infinity-reels": "Infinity Reels",
  "/ordbog/xways": "xWays",
  "/ordbog/xnudge": "xNudge",
  "/ordbog/ante-bet": "Ante Bet",
  "/ordbog/win-cap": "Win Cap",
  "/ordbog/turnover-contribution": "Turnover Contribution",
  "/ordbog/bonus-abuse": "Bonus Abuse",
  "/ordbog/wager-free-spins": "Wager-Free Spins",
  "/ordbog/deposit-match": "Deposit Match",
  "/ordbog/comp-points": "Comp Points",
  "/ordbog/promo-code": "Promo Code",
  "/ordbog/pending-time": "Pending Time",
  "/ordbog/reverse-withdrawal": "Reverse Withdrawal",
  "/ordbog/e-wallet": "E-Wallet",
  "/ordbog/indbetalingsgraense": "Indbetalingsgrænse",
  "/ordbog/gebyr": "Gebyr",
  "/ordbog/valutaveksling": "Valutaveksling",
  "/ordbog/expected-value": "Expected Value",
  "/ordbog/varians": "Varians",
  "/ordbog/standard-deviation": "Standard Deviation",
  "/ordbog/risk-of-ruin": "Risk of Ruin",
  "/ordbog/payout-table": "Payout Table",
  "/ordbog/coin-value": "Coin Value",
  "/ordbog/spillicens": "Spillicens",
  "/ordbog/fairness-audit": "Fairness Audit",
  "/ordbog/ssl-kryptering": "SSL-Kryptering",
  "/ordbog/geo-blocking": "Geo-Blocking",
  "/ordbog/spilgraenser": "Spilgrænser",
  "/ordbog/side-bet": "Side Bet",
  "/ordbog/dealer": "Dealer",
  "/ordbog/table-limits": "Table Limits",
  "/ordbog/shoe": "Shoe",
  "/ordbog/instant-play": "Instant Play",
  "/ordbog/lobby": "Lobby",
  "/ordbog/reels": "Reels",
  // Community (kun indexerbare sider)
  "/community": "Community",
  "/community/slots": "Spillehal",
  "/community/turneringer": "Turneringer",
  "/community/turneringer/arkiv": "Turneringsarkiv",
  "/community/rewards": "Rewards",
  "/bonus-hunt": "Bonus Hunt",
  "/bonus-hunt/arkiv": "Bonus Hunt Arkiv",
  "/slot-database": "Slot Database",
  "/slot-katalog": "Slot Database",
  "/statistik": "Statistik",
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
  // Sitemap sub-pages
  "/sitemap/casino-anmeldelser": [{ name: "Sitemap", path: "/sitemap" }],
  "/sitemap/casino-bonus": [{ name: "Sitemap", path: "/sitemap" }],
  "/sitemap/casinospil": [{ name: "Sitemap", path: "/sitemap" }],

  "/licenserede-casinoer": [{ name: "Casinoer", path: "/casinoer" }],

  // Casinoer cluster – orphan pages bound to /casinoer hub
  "/casino-licenser": [{ name: "Casinoer", path: "/casinoer" }],
  "/spillemyndigheden": [{ name: "Casinoer", path: "/casinoer" }],

  // Top-10 bound to casino-anmeldelser hub
  "/top-10-casino-online": [{ name: "Casino Anmeldelser", path: "/casino-anmeldelser" }],

  // VS-sider – bundet til /casino-anmeldelser hub
  "/casino-anmeldelser/bet365-vs-unibet": [{ name: "Casino Anmeldelser", path: "/casino-anmeldelser" }],
  "/casino-anmeldelser/leovegas-vs-mr-green": [{ name: "Casino Anmeldelser", path: "/casino-anmeldelser" }],
  "/casino-anmeldelser/danske-spil-vs-spilnu": [{ name: "Casino Anmeldelser", path: "/casino-anmeldelser" }],
  "/casino-anmeldelser/spilleautomaten-vs-spildansknu": [{ name: "Casino Anmeldelser", path: "/casino-anmeldelser" }],
  "/casino-anmeldelser/betinia-vs-campobet": [{ name: "Casino Anmeldelser", path: "/casino-anmeldelser" }],
  "/casino-anmeldelser/swift-casino-vs-luna-casino": [{ name: "Casino Anmeldelser", path: "/casino-anmeldelser" }],

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
  "/vip-program": [{ name: "Casino Bonus", path: "/casino-bonus" }],
  "/casino-med-mobilepay": [{ name: "Betalingsmetoder", path: "/betalingsmetoder" }],

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
  "/casinospil/poker/bedste-sider": [{ name: "Casinospil", path: "/casinospil" }, { name: "Poker", path: "/casinospil/poker" }],
  "/casinospil/craps": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/game-shows": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/game-shows": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/crazy-time": [{ name: "Live Casino", path: "/live-casino" }, { name: "Game Shows", path: "/live-casino/game-shows" }],
  "/live-casino/dream-catcher": [{ name: "Live Casino", path: "/live-casino" }, { name: "Game Shows", path: "/live-casino/game-shows" }],
  "/live-casino/deal-or-no-deal": [{ name: "Live Casino", path: "/live-casino" }, { name: "Game Shows", path: "/live-casino/game-shows" }],
  "/casinospil/online-lotteri": [{ name: "Casinospil", path: "/casinospil" }],
  "/casinospil/spillemaskiner": [{ name: "Casinospil", path: "/casinospil" }],

  // Provider Slot Hubs – bound to /casinospil/spillemaskiner
  "/spillemaskiner/pragmatic-play": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/netent": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/play-n-go": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/hacksaw-gaming": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/big-time-gaming": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/microgaming": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/nolimit-city": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/evolution-gaming": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/elk-studios": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/yggdrasil": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/relax-gaming": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/red-tiger": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/igt": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/thunderkick": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/blueprint-gaming": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/push-gaming": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/quickspin": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/isoftbet": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/betsoft": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/wazdan": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/endorphina": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/stakelogic": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/spillemaskiner/booming-games": [{ name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],

  // /casinospil/roulette-strategi – removed (301 redirect to /casinospil/roulette)

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
  "/pragmatic-play-partner": [{ name: "Om Casinoaftaler.dk", path: "/om" }],
  "/redaktionel-politik": [{ name: "Om Casinoaftaler.dk", path: "/om" }],
  "/kontakt": [{ name: "Om Casinoaftaler.dk", path: "/om" }],

  // Ansvarligt Spil cluster – bundet til /ansvarligt-spil hub
  "/ansvarligt-spil/rofus": [{ name: "Ansvarligt Spil", path: "/ansvarligt-spil" }],
  "/ansvarligt-spil/ludomani": [{ name: "Ansvarligt Spil", path: "/ansvarligt-spil" }],
  "/ansvarligt-spil/stopspillet": [{ name: "Ansvarligt Spil", path: "/ansvarligt-spil" }],
  "/ansvarligt-spil/spillegraenser": [{ name: "Ansvarligt Spil", path: "/ansvarligt-spil" }],
  "/ansvarligt-spil/selvudelukkelse-guide": [{ name: "Ansvarligt Spil", path: "/ansvarligt-spil" }],
  "/ansvarligt-spil/hjaelpelinjer": [{ name: "Ansvarligt Spil", path: "/ansvarligt-spil" }],

  // Mobil Casino cluster – bundet til /mobil-casino hub
  "/casino-app": [{ name: "Mobil Casino", path: "/mobil-casino" }],
  "/mobil-casino/iphone": [{ name: "Mobil Casino", path: "/mobil-casino" }],
  "/mobil-casino/android": [{ name: "Mobil Casino", path: "/mobil-casino" }],
  "/mobil-casino/tablet": [{ name: "Mobil Casino", path: "/mobil-casino" }],
  "/mobil-casino/bedste-apps": [{ name: "Mobil Casino", path: "/mobil-casino" }],

  // Casino uden Konto cluster – spokes bound to hub
  "/casino-uden-konto/pay-n-play": [{ name: "Casino uden Konto", path: "/casino-uden-konto" }],
  "/casino-uden-konto/hurtig-registrering": [{ name: "Casino uden Konto", path: "/casino-uden-konto" }],
  "/casino-uden-konto/fordele-og-ulemper": [{ name: "Casino uden Konto", path: "/casino-uden-konto" }],

  // Slot Kategorier – bundet til /casinospil/spillemaskiner hub
  "/megaways-slots": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/jackpot-slots": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/bonus-buy-slots": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],

  // Live Casino cluster – bundet til /live-casino hub
  "/live-casino/blackjack": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/roulette": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/baccarat": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/lightning-roulette": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/monopoly-live": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/strategi": [{ name: "Live Casino", path: "/live-casino" }],
  "/live-casino/udbydere": [{ name: "Live Casino", path: "/live-casino" }],

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
  // Batch 2 – 13 nye slot guides
  "/casinospil/spillemaskiner/big-bad-wolf": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/buffalo-rising-megaways": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/chilli-pop": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/classic-fruits": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/cygnus": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/esqueleto-explosivo-2": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/gold-vein": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/hot-spin-deluxe": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/magic-hot": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/mystery-reels-megaways": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/satoshis-secret": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/tombstone-rip": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],
  "/casinospil/spillemaskiner/vikings-go-berzerk": [{ name: "Casinospil", path: "/casinospil" }, { name: "Spillemaskiner", path: "/casinospil/spillemaskiner" }],

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

  // Statistik – standalone linkable asset
  "/statistik": [],

  // Ordbog cluster – alle termer bundet til /ordbog hub
  "/ordbog/rtp": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/wagering": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/volatilitet": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/house-edge": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/free-spins": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/scatter": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/wild": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/jackpot": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/rng": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/paylines": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/bonus-runde": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/multiplikator": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/max-bet": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/autoplay": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/hit-frequency": [{ name: "Casino Ordbog", path: "/ordbog" }],

  // Batch 2 – remaining terms
  "/ordbog/gamble-feature": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/cascading-wins": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/megaways": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/buy-bonus": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/bankroll-management": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/minimum-indbetaling": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/kyc": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/gamification": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/retrigger": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/cluster-pays": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/expanding-wild": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/expected-value": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/spillicens": [{ name: "Casino Ordbog", path: "/ordbog" }],

  // Batch 3 – 44 nye termer
  "/ordbog/stacked-wilds": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/sticky-wilds": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/walking-wilds": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/random-wilds": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/mystery-symbols": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/hold-and-spin": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/colossal-symbols": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/split-symbols": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/nudge": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/infinity-reels": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/xways": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/xnudge": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/ante-bet": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/win-cap": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/turnover-contribution": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/bonus-abuse": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/wager-free-spins": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/deposit-match": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/comp-points": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/promo-code": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/pending-time": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/reverse-withdrawal": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/e-wallet": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/indbetalingsgraense": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/gebyr": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/valutaveksling": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/varians": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/standard-deviation": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/risk-of-ruin": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/payout-table": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/coin-value": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/fairness-audit": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/ssl-kryptering": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/geo-blocking": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/spilgraenser": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/side-bet": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/dealer": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/table-limits": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/shoe": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/instant-play": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/lobby": [{ name: "Casino Ordbog", path: "/ordbog" }],
  "/ordbog/reels": [{ name: "Casino Ordbog", path: "/ordbog" }],
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

  // Dynamic prefix overrides (e.g. /slot-katalog/:slug → Slot Database)
  const DYNAMIC_PARENT_MAP: Record<string, { name: string; path: string }> = {
    "/slot-katalog": { name: "Slot Database", path: "/slot-database" },
  };

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 1) {
    let currentPath = "";
    for (let i = 0; i < segments.length - 1; i++) {
      currentPath += `/${segments[i]}`;
      const dynamicParent = DYNAMIC_PARENT_MAP[currentPath];
      if (dynamicParent) {
        items.push(dynamicParent);
      } else {
        const parentLabel =
          routeLabels[currentPath] || segments[i].replace(/-/g, " ");
        items.push({ name: parentLabel, path: currentPath });
      }
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
