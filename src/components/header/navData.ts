/**
 * Centralized navigation link data for Header.
 * Shared by both DesktopNav and MobileNav to avoid duplication.
 */

export interface NavLink {
  to: string;
  label: string;
  logoUrl?: string;
}

export interface NavLinkWithIcon extends NavLink {
  iconName?: string;
}

export const CASINO_LINKS: NavLink[] = [
  { to: "/top-10-casino-online", label: "Top 10 Online Casino" },
  { to: "/casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling" },
  { to: "/casinoer/hoej-rtp", label: "Høj RTP" },
  { to: "/casino-licenser", label: "Licenserede Casinoer" },
  { to: "/casino-uden-konto", label: "Casino uden Konto" },
  { to: "/casinoer/mobil-casinoer", label: "Mobil Casinoer" },
  { to: "/mobil-casino", label: "Mobil Casino Guide" },
  { to: "/casinoer/crypto-casino", label: "Crypto Casino" },
  { to: "/casinoer/vr-casinoer", label: "VR Casinoer" },
  { to: "/casinoer/spil-casino-for-sjov", label: "Spil Casino for Sjov" },
  { to: "/casinoer/casino-og-skat", label: "Casino og Skat" },
];

export const NYE_CASINOER_LINKS: NavLink[] = [
  { to: "/nye-casinoer/2026", label: "Nye Casinoer 2026" },
  { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens" },
  { to: "/nye-casinoer/uden-rofus", label: "Uden ROFUS" },
  { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling" },
  { to: "/nye-casinoer/bonus-uden-indbetaling", label: "Bonus uden Indbetaling" },
  { to: "/nye-casinoer/trustly", label: "Med Trustly" },
  { to: "/nye-casinoer/mitid", label: "Med MitID" },
  { to: "/nye-casinoer/lav-wagering", label: "Lav Wagering" },
  
  { to: "/nye-casinoer/vs-etablerede", label: "Nye vs Etablerede" },
];

export const SLOT_LINKS: NavLink[] = [
  { to: "/casinospil/spillemaskiner/sweet-bonanza", label: "Sweet Bonanza" },
  { to: "/casinospil/spillemaskiner/book-of-dead", label: "Book of Dead" },
  { to: "/casinospil/spillemaskiner/gates-of-olympus", label: "Gates of Olympus" },
  { to: "/casinospil/spillemaskiner/starburst", label: "Starburst" },
  { to: "/casinospil/spillemaskiner/razor-shark", label: "Razor Shark" },
  { to: "/casinospil/spillemaskiner/big-bass-bonanza", label: "Big Bass Bonanza" },
  { to: "/casinospil/spillemaskiner/dead-or-alive-2", label: "Dead or Alive 2" },
  { to: "/casinospil/spillemaskiner/gonzos-quest", label: "Gonzo's Quest" },
  { to: "/casinospil/spillemaskiner/reactoonz", label: "Reactoonz" },
  { to: "/casinospil/spillemaskiner/money-train-3", label: "Money Train 3" },
  { to: "/casinospil/spillemaskiner/wolf-gold", label: "Wolf Gold" },
  { to: "/casinospil/spillemaskiner/the-dog-house", label: "The Dog House" },
  { to: "/casinospil/spillemaskiner/jammin-jars", label: "Jammin' Jars" },
  { to: "/casinospil/spillemaskiner/bonanza", label: "Bonanza" },
  { to: "/casinospil/spillemaskiner/fire-joker", label: "Fire Joker" },
  { to: "/casinospil/spillemaskiner/legacy-of-dead", label: "Legacy of Dead" },
  { to: "/casinospil/spillemaskiner/divine-fortune", label: "Divine Fortune" },
  { to: "/casinospil/spillemaskiner/eye-of-horus", label: "Eye of Horus" },
  { to: "/casinospil/spillemaskiner/buffalo-king", label: "Buffalo King" },
  { to: "/casinospil/spillemaskiner/sugar-rush", label: "Sugar Rush" },
  { to: "/casinospil/spillemaskiner/cleopatra", label: "Cleopatra" },
  { to: "/casinospil/spillemaskiner/mega-moolah", label: "Mega Moolah" },
  { to: "/casinospil/spillemaskiner/thunderstruck-ii", label: "Thunderstruck II" },
  { to: "/casinospil/spillemaskiner/immortal-romance", label: "Immortal Romance" },
  { to: "/casinospil/spillemaskiner/wild-west-gold", label: "Wild West Gold" },
  { to: "/casinospil/spillemaskiner/madame-destiny-megaways", label: "Madame Destiny Megaways" },
  { to: "/casinospil/spillemaskiner/extra-chilli-megaways", label: "Extra Chilli Megaways" },
  { to: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", label: "Wanted Dead or a Wild" },
  { to: "/casinospil/spillemaskiner/chaos-crew", label: "Chaos Crew" },
  { to: "/casinospil/spillemaskiner/joker-strike", label: "Joker Strike" },
];

export const SLOT_CATEGORY_LINKS: NavLink[] = [
  { to: "/megaways-slots", label: "Megaways Slots" },
  { to: "/jackpot-slots", label: "Jackpot Slots" },
  { to: "/bonus-buy-slots", label: "Bonus Buy Slots" },
];

export const BLACKJACK_LINKS: NavLink[] = [
  { to: "/casinospil/blackjack/amerikansk-blackjack", label: "Amerikansk Blackjack" },
  { to: "/casinospil/blackjack/europaeisk-blackjack", label: "Europæisk Blackjack" },
  { to: "/casinospil/blackjack/double-exposure-blackjack", label: "Double Exposure" },
  { to: "/casinospil/blackjack/spanish-21", label: "Spanish 21" },
];

export const BLACKJACK_STRATEGY_LINKS: NavLink[] = [
  { to: "/casinospil/blackjack/martingale", label: "Martingale Strategi" },
  { to: "/casinospil/blackjack/fibonacci", label: "Fibonacci Strategi" },
  { to: "/casinospil/blackjack/dalembert", label: "D'Alembert Strategi" },
];

export const ROULETTE_LINKS: NavLink[] = [
  { to: "/casinospil/roulette/amerikansk-roulette", label: "Amerikansk Roulette" },
  { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette" },
  { to: "/casinospil/roulette/fransk-roulette", label: "Fransk Roulette" },
];

export const ROULETTE_STRATEGY_LINKS: NavLink[] = [
  { to: "/casinospil/roulette/martingale-roulette", label: "Martingale Strategi" },
  { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci Strategi" },
  { to: "/casinospil/roulette/dalembert-roulette", label: "D'Alembert Strategi" },
  { to: "/casinospil/roulette/labouchere-roulette", label: "Labouchère Strategi" },
  { to: "/casinospil/roulette/james-bond-roulette", label: "James Bond Strategi" },
];

export const POKER_LINKS: NavLink[] = [
  { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em" },
  { to: "/casinospil/poker/omaha", label: "Omaha" },
  { to: "/casinospil/poker/three-card-poker", label: "Three Card Poker" },
  { to: "/casinospil/poker/caribbean-stud", label: "Caribbean Stud" },
  { to: "/casinospil/poker/video-poker", label: "Video Poker" },
  { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi" },
  { to: "/casinospil/poker/bedste-sider", label: "Bedste Pokersider" },
];

export const OTHER_CASINOSPIL_LINKS: NavLink[] = [
  { to: "/casinospil/craps", label: "Craps" },
  { to: "/casinospil/baccarat", label: "Baccarat" },
  { to: "/casinospil/online-lotteri", label: "Online Lotteri" },
];

export const LIVE_CASINO_LINKS: NavLink[] = [
  { to: "/live-casino/blackjack", label: "Live Blackjack" },
  { to: "/live-casino/roulette", label: "Live Roulette" },
  { to: "/live-casino/baccarat", label: "Live Baccarat" },
  { to: "/live-casino/lightning-roulette", label: "Lightning Roulette" },
  { to: "/live-casino/monopoly-live", label: "Monopoly Live" },
  { to: "/live-casino/game-shows", label: "Game Shows" },
  { to: "/live-casino/crazy-time", label: "Crazy Time" },
  { to: "/live-casino/dream-catcher", label: "Dream Catcher" },
  { to: "/live-casino/deal-or-no-deal", label: "Deal or No Deal" },
  { to: "/live-casino/strategi", label: "Live Casino Strategi" },
  { to: "/live-casino/udbydere", label: "Live Casino Udbydere" },
];

export const BONUS_LINKS: NavLinkWithIcon[] = [
  { to: "/velkomstbonus", label: "Velkomstbonus" },
  { to: "/free-spins", label: "Free Spins" },
  { to: "/bonus-uden-indbetaling", label: "Bonus uden Indbetaling" },
  { to: "/no-sticky-bonus", label: "No-Sticky Bonusser" },
  { to: "/sticky-bonus", label: "Sticky Bonusser" },
  { to: "/cashback-bonus", label: "Cashback Bonus" },
  { to: "/reload-bonus", label: "Reload Bonus" },
  { to: "/free-spins-i-dag", label: "Free Spins i Dag" },
  { to: "/omsaetningskrav", label: "Omsætningskrav" },
  { to: "/indskudsbonus", label: "Indskudsbonus" },
  { to: "/bonus-uden-omsaetningskrav", label: "Bonus uden Omsætningskrav" },
];

export const PAYMENT_LINKS: NavLink[] = [
  { to: "/betalingsmetoder/apple-pay", label: "Apple Pay" },
  { to: "/betalingsmetoder/mobilepay", label: "MobilePay" },
  { to: "/betalingsmetoder/paypal", label: "PayPal" },
  { to: "/betalingsmetoder/skrill", label: "Skrill" },
  { to: "/betalingsmetoder/trustly", label: "Trustly" },
  { to: "/betalingsmetoder/zimpler", label: "Zimpler" },
  { to: "/betalingsmetoder/paysafecard", label: "Paysafecard" },
  { to: "/betalingsmetoder/bankoverforsler", label: "Bankoverførsel" },
  { to: "/betalingsmetoder/visa-mastercard", label: "Visa / Mastercard" },
  { to: "/betalingsmetoder/revolut", label: "Revolut" },
];

export const PROVIDER_LINKS: NavLink[] = [
  { to: "/spiludviklere/netent", label: "NetEnt", logoUrl: "/src/assets/providers/netent.png" },
  { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play", logoUrl: "/src/assets/providers/pragmatic-play.png" },
  { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming", logoUrl: "/src/assets/providers/evolution-gaming.png" },
  { to: "/spiludviklere/relax-gaming", label: "Relax Gaming", logoUrl: "/src/assets/providers/relax-gaming.png" },
  { to: "/spiludviklere/play-n-go", label: "Play'n GO", logoUrl: "/src/assets/providers/play-n-go.png" },
  { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming", logoUrl: "/src/assets/providers/hacksaw-gaming.png" },
  { to: "/spiludviklere/nolimit-city", label: "Nolimit City", logoUrl: "/src/assets/providers/nolimit-city.png" },
  { to: "/spiludviklere/elk-studios", label: "ELK Studios", logoUrl: "/src/assets/providers/elk-studios.png" },
  { to: "/spiludviklere/yggdrasil", label: "Yggdrasil", logoUrl: "/src/assets/providers/yggdrasil.png" },
  { to: "/spiludviklere/microgaming", label: "Microgaming", logoUrl: "/src/assets/providers/microgaming.png" },
  { to: "/spiludviklere/red-tiger", label: "Red Tiger", logoUrl: "/src/assets/providers/red-tiger.png" },
  { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming", logoUrl: "/src/assets/providers/big-time-gaming.png" },
  { to: "/spiludviklere/thunderkick", label: "Thunderkick", logoUrl: "/src/assets/providers/thunderkick.png" },
  { to: "/spiludviklere/blueprint-gaming", label: "Blueprint Gaming", logoUrl: "/src/assets/providers/blueprint-gaming.png" },
  { to: "/spiludviklere/push-gaming", label: "Push Gaming", logoUrl: "/src/assets/providers/push-gaming.png" },
  { to: "/spiludviklere/quickspin", label: "Quickspin", logoUrl: "/src/assets/providers/quickspin.png" },
  { to: "/spiludviklere/isoftbet", label: "iSoftBet", logoUrl: "/src/assets/providers/isoftbet.png" },
  { to: "/spiludviklere/betsoft", label: "Betsoft", logoUrl: "/src/assets/providers/betsoft.png" },
  { to: "/spiludviklere/wazdan", label: "Wazdan", logoUrl: "/src/assets/providers/wazdan.png" },
  { to: "/spiludviklere/endorphina", label: "Endorphina", logoUrl: "/src/assets/providers/endorphina.png" },
  { to: "/spiludviklere/stakelogic", label: "Stakelogic", logoUrl: "/src/assets/providers/stakelogic.png" },
  { to: "/spiludviklere/booming-games", label: "Booming Games", logoUrl: "/src/assets/providers/booming-games.png" },
];

const CASINO_LOGO_BASE = "https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos";

export const REVIEW_TOP_LINKS: NavLink[] = [
  { to: "/casino-anmeldelser/spildansknu", label: "SpilDanskNu", logoUrl: `${CASINO_LOGO_BASE}/spildansknu-1765832906267.png` },
  { to: "/casino-anmeldelser/spilleautomaten", label: "Spilleautomaten", logoUrl: `${CASINO_LOGO_BASE}/spilleautomaten-1765832651802.png` },
  { to: "/casino-anmeldelser/betinia", label: "Betinia", logoUrl: "/src/assets/casino-logos/betinia.webp" },
  { to: "/casino-anmeldelser/campobet", label: "Campobet", logoUrl: "/src/assets/casino-logos/campobet.webp" },
  { to: "/casino-anmeldelser/swift-casino", label: "Swift Casino", logoUrl: `${CASINO_LOGO_BASE}/swift-casino-1765833754433.png` },
  { to: "/casino-anmeldelser/luna-casino", label: "Luna Casino", logoUrl: `${CASINO_LOGO_BASE}/luna-casino-1765833821820.png` },
  { to: "/casino-anmeldelser/playkasino", label: "PlayKasino", logoUrl: `${CASINO_LOGO_BASE}/new-casino-1774460542476-1774460612838.png` },
];

export const REVIEW_ALL_LINKS: NavLink[] = [
  { to: "/casino-anmeldelser/danske-spil", label: "Danske Spil Casino", logoUrl: `${CASINO_LOGO_BASE}/danskespil.png` },
  { to: "/casino-anmeldelser/comeon", label: "ComeOn Casino", logoUrl: "/src/assets/casino-logos/comeon.webp" },
  { to: "/casino-anmeldelser/getlucky", label: "GetLucky Casino", logoUrl: `${CASINO_LOGO_BASE}/getlucky.png` },
  { to: "/casino-anmeldelser/mr-green", label: "Mr Green Casino", logoUrl: `${CASINO_LOGO_BASE}/mrgreen.png` },
  { to: "/casino-anmeldelser/videoslots", label: "Videoslots Casino", logoUrl: `${CASINO_LOGO_BASE}/videoslots.png` },
  { to: "/casino-anmeldelser/mr-vegas", label: "Mr Vegas Casino", logoUrl: `${CASINO_LOGO_BASE}/mrvegas.png` },
  { to: "/casino-anmeldelser/leovegas", label: "LeoVegas", logoUrl: `${CASINO_LOGO_BASE}/leovegas.png` },
  { to: "/casino-anmeldelser/unibet", label: "Unibet", logoUrl: `${CASINO_LOGO_BASE}/unibet.png` },
  { to: "/casino-anmeldelser/bet365", label: "bet365", logoUrl: `${CASINO_LOGO_BASE}/bet365.png` },
  { to: "/casino-anmeldelser/888-casino", label: "888 Casino", logoUrl: `${CASINO_LOGO_BASE}/888casino.png` },
  { to: "/casino-anmeldelser/betano", label: "Betano", logoUrl: `${CASINO_LOGO_BASE}/betano.png` },
  { to: "/casino-anmeldelser/expekt", label: "Expekt", logoUrl: "/src/assets/casino-logos/expekt.webp" },
  { to: "/casino-anmeldelser/royal-casino", label: "Royal Casino", logoUrl: `${CASINO_LOGO_BASE}/royalcasino.png` },
  { to: "/casino-anmeldelser/maria-casino", label: "Maria Casino", logoUrl: `${CASINO_LOGO_BASE}/mariacasino.png` },
  { to: "/casino-anmeldelser/kapow-casino", label: "Kapow Casino" },
  { to: "/casino-anmeldelser/nordicbet", label: "NordicBet", logoUrl: `${CASINO_LOGO_BASE}/nordicbet.png` },
  { to: "/casino-anmeldelser/one-casino", label: "One Casino", logoUrl: `${CASINO_LOGO_BASE}/onecasino.png` },
  { to: "/casino-anmeldelser/spilnu", label: "Spilnu", logoUrl: `${CASINO_LOGO_BASE}/spilnu.png` },
  { to: "/casino-anmeldelser/stake-casino", label: "Stake Casino", logoUrl: `${CASINO_LOGO_BASE}/stake.png` },
  { to: "/casino-anmeldelser/casinostuen", label: "Casinostuen", logoUrl: `${CASINO_LOGO_BASE}/casinostuen.png` },
  { to: "/casino-anmeldelser/pokerstars", label: "PokerStars", logoUrl: `${CASINO_LOGO_BASE}/pokerstars.png` },
  { to: "/casino-anmeldelser/bwin", label: "bwin", logoUrl: `${CASINO_LOGO_BASE}/bwin.png` },
  { to: "/casino-anmeldelser/marathonbet", label: "MarathonBet", logoUrl: `${CASINO_LOGO_BASE}/marathonbet.png` },
  { to: "/casino-anmeldelser/bet365-vs-unibet", label: "bet365 vs Unibet" },
  { to: "/casino-anmeldelser/leovegas-vs-mr-green", label: "LeoVegas vs Mr Green" },
  { to: "/casino-anmeldelser/danske-spil-vs-spilnu", label: "Danske Spil vs Spilnu" },
  { to: "/casino-anmeldelser/spilleautomaten-vs-spildansknu", label: "Spilleautomaten vs SpilDanskNu" },
  { to: "/casino-anmeldelser/betinia-vs-campobet", label: "Betinia vs Campobet" },
  { to: "/casino-anmeldelser/swift-casino-vs-luna-casino", label: "Swift Casino vs Luna Casino" },
];

export const COMMUNITY_LINKS: NavLinkWithIcon[] = [
  { to: "/community/slots", label: "Spillehal" },
  { to: "/bonus-hunt", label: "Bonus Hunt" },
  { to: "/bonus-hunt/arkiv", label: "Bonus Hunt Arkiv" },
  { to: "/slot-database", label: "Slot Database" },
  { to: "/statistik", label: "Statistik" },
  { to: "/community/turneringer", label: "Turneringer" },
  { to: "/community/turneringer/arkiv", label: "Turneringsarkiv" },
  { to: "/community/hall-of-fame", label: "Hall of Fame" },
  { to: "/highlights", label: "Highlights" },
  { to: "/butik", label: "Butik" },
];

export const MORE_LINKS: NavLink[] = [
  { to: "/ordbog", label: "Casino Ordbog" },
  { to: "/om", label: "Om Casinoaftaler.dk" },
  { to: "/saadan-tester-vi-casinoer", label: "Sådan tester vi casinoer" },
  { to: "/forretningsmodel", label: "Forretningsmodel" },
  { to: "/redaktionel-politik", label: "Redaktionel Politik" },
  { to: "/ansvarligt-spil", label: "Ansvarligt Spil" },
  { to: "/casino-licenser", label: "Casino Licenser" },
  { to: "/spillemyndigheden", label: "Spillemyndigheden" },
  { to: "/kontakt", label: "Kontakt" },
  { to: "/casino-nyheder", label: "Casino Nyheder" },
];

export const FORFATTER_LINKS: NavLink[] = [
  { to: "/forfatter/jonas", label: "Jonas" },
  { to: "/forfatter/kevin", label: "Kevin" },
  { to: "/forfatter/ajse", label: "Ajse" },
  { to: "/forfatter/niklas", label: "Niklas" },
  { to: "/forfatter/frederik", label: "Frederik" },
];
