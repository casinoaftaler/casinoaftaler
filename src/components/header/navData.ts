/**
 * Centralized navigation link data for Header.
 * Shared by both DesktopNav and MobileNav to avoid duplication.
 */

export interface NavLink {
  to: string;
  label: string;
  logoUrl?: string;
  iconName?: string;
}

export interface NavLinkWithIcon extends NavLink {
  iconName?: string;
}

export const CASINO_LINKS: NavLink[] = [
  { to: "/top-10-casino-online", label: "Top 10 Online Casino", iconName: "trophy" },
  { to: "/casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling", iconName: "zap" },
  { to: "/casinoer/hoej-rtp", label: "Høj RTP", iconName: "trending-up" },
  { to: "/casino-licenser", label: "Licenserede Casinoer", iconName: "shield-check" },
  { to: "/casino-uden-konto", label: "Casino uden Konto", iconName: "user-x" },
  { to: "/casinoer/mobil-casinoer", label: "Mobil Casinoer", iconName: "smartphone" },
  { to: "/mobil-casino", label: "Mobil Casino Guide", iconName: "tablet-smartphone" },
  { to: "/casinoer/crypto-casino", label: "Crypto Casino", iconName: "bitcoin" },
  { to: "/casinoer/vr-casinoer", label: "VR Casinoer", iconName: "glasses" },
  { to: "/casinoer/spil-casino-for-sjov", label: "Spil Casino for Sjov", iconName: "gamepad-2" },
  { to: "/casinoer/casino-og-skat", label: "Casino og Skat", iconName: "receipt" },
];

export const NYE_CASINOER_LINKS: NavLink[] = [
  { to: "/nye-casinoer/2026", label: "Nye Casinoer 2026", iconName: "calendar" },
  { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens", iconName: "shield" },
  { to: "/nye-casinoer/uden-rofus", label: "Uden ROFUS", iconName: "shield-off" },
  { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling", iconName: "zap" },
  { to: "/nye-casinoer/bonus-uden-indbetaling", label: "Bonus uden Indbetaling", iconName: "gift" },
  { to: "/nye-casinoer/trustly", label: "Med Trustly", iconName: "banknote" },
  { to: "/nye-casinoer/mitid", label: "Med MitID", iconName: "scan-line" },
  { to: "/nye-casinoer/lav-wagering", label: "Lav Wagering", iconName: "percent" },
  { to: "/nye-casinoer/vs-etablerede", label: "Nye vs Etablerede", iconName: "scale" },
];

export const SLOT_LINKS: NavLink[] = [
  { to: "/casinospil/spillemaskiner/sweet-bonanza", label: "Sweet Bonanza", iconName: "candy" },
  { to: "/casinospil/spillemaskiner/book-of-dead", label: "Book of Dead", iconName: "book-open" },
  { to: "/casinospil/spillemaskiner/gates-of-olympus", label: "Gates of Olympus", iconName: "cloud-lightning" },
  { to: "/casinospil/spillemaskiner/starburst", label: "Starburst", iconName: "star" },
  { to: "/casinospil/spillemaskiner/razor-shark", label: "Razor Shark", iconName: "fish" },
  { to: "/casinospil/spillemaskiner/big-bass-bonanza", label: "Big Bass Bonanza", iconName: "fish" },
  { to: "/casinospil/spillemaskiner/dead-or-alive-2", label: "Dead or Alive 2", iconName: "crosshair" },
  { to: "/casinospil/spillemaskiner/gonzos-quest", label: "Gonzo's Quest", iconName: "compass" },
  { to: "/casinospil/spillemaskiner/reactoonz", label: "Reactoonz", iconName: "atom" },
  { to: "/casinospil/spillemaskiner/money-train-3", label: "Money Train 3", iconName: "train-front" },
  { to: "/casinospil/spillemaskiner/wolf-gold", label: "Wolf Gold", iconName: "dog" },
  { to: "/casinospil/spillemaskiner/the-dog-house", label: "The Dog House", iconName: "home" },
  { to: "/casinospil/spillemaskiner/jammin-jars", label: "Jammin' Jars", iconName: "grape" },
  { to: "/casinospil/spillemaskiner/bonanza", label: "Bonanza", iconName: "pickaxe" },
  { to: "/casinospil/spillemaskiner/fire-joker", label: "Fire Joker", iconName: "flame" },
  { to: "/casinospil/spillemaskiner/legacy-of-dead", label: "Legacy of Dead", iconName: "scroll" },
  { to: "/casinospil/spillemaskiner/divine-fortune", label: "Divine Fortune", iconName: "sparkles" },
  { to: "/casinospil/spillemaskiner/eye-of-horus", label: "Eye of Horus", iconName: "eye" },
  { to: "/casinospil/spillemaskiner/buffalo-king", label: "Buffalo King", iconName: "crown" },
  { to: "/casinospil/spillemaskiner/sugar-rush", label: "Sugar Rush", iconName: "cake" },
  { to: "/casinospil/spillemaskiner/cleopatra", label: "Cleopatra", iconName: "gem" },
  { to: "/casinospil/spillemaskiner/mega-moolah", label: "Mega Moolah", iconName: "coins" },
  { to: "/casinospil/spillemaskiner/thunderstruck-ii", label: "Thunderstruck II", iconName: "cloud-lightning" },
  { to: "/casinospil/spillemaskiner/immortal-romance", label: "Immortal Romance", iconName: "heart" },
  { to: "/casinospil/spillemaskiner/wild-west-gold", label: "Wild West Gold", iconName: "badge" },
  { to: "/casinospil/spillemaskiner/madame-destiny-megaways", label: "Madame Destiny Megaways", iconName: "moon" },
  { to: "/casinospil/spillemaskiner/extra-chilli-megaways", label: "Extra Chilli Megaways", iconName: "flame" },
  { to: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", label: "Wanted Dead or a Wild", iconName: "target" },
  { to: "/casinospil/spillemaskiner/chaos-crew", label: "Chaos Crew", iconName: "skull" },
  { to: "/casinospil/spillemaskiner/joker-strike", label: "Joker Strike", iconName: "smile" },
];

export const SLOT_CATEGORY_LINKS: NavLink[] = [
  { to: "/megaways-slots", label: "Megaways Slots", iconName: "layers" },
  { to: "/jackpot-slots", label: "Jackpot Slots", iconName: "trophy" },
  { to: "/bonus-buy-slots", label: "Bonus Buy Slots", iconName: "shopping-cart" },
];

export const BLACKJACK_LINKS: NavLink[] = [
  { to: "/casinospil/blackjack/amerikansk-blackjack", label: "Amerikansk Blackjack", iconName: "spade" },
  { to: "/casinospil/blackjack/europaeisk-blackjack", label: "Europæisk Blackjack", iconName: "club" },
  { to: "/casinospil/blackjack/double-exposure-blackjack", label: "Double Exposure", iconName: "copy" },
  { to: "/casinospil/blackjack/spanish-21", label: "Spanish 21", iconName: "hash" },
];

export const BLACKJACK_STRATEGY_LINKS: NavLink[] = [
  { to: "/casinospil/blackjack/martingale", label: "Martingale Strategi", iconName: "arrow-up-right" },
  { to: "/casinospil/blackjack/fibonacci", label: "Fibonacci Strategi", iconName: "sigma" },
  { to: "/casinospil/blackjack/dalembert", label: "D'Alembert Strategi", iconName: "minus" },
];

export const ROULETTE_LINKS: NavLink[] = [
  { to: "/casinospil/roulette/amerikansk-roulette", label: "Amerikansk Roulette", iconName: "circle-dot" },
  { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette", iconName: "circle" },
  { to: "/casinospil/roulette/fransk-roulette", label: "Fransk Roulette", iconName: "circle-dashed" },
];

export const ROULETTE_STRATEGY_LINKS: NavLink[] = [
  { to: "/casinospil/roulette/martingale-roulette", label: "Martingale Strategi", iconName: "arrow-up-right" },
  { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci Strategi", iconName: "sigma" },
  { to: "/casinospil/roulette/dalembert-roulette", label: "D'Alembert Strategi", iconName: "minus" },
  { to: "/casinospil/roulette/labouchere-roulette", label: "Labouchère Strategi", iconName: "list-ordered" },
  { to: "/casinospil/roulette/james-bond-roulette", label: "James Bond Strategi", iconName: "glasses" },
];

export const POKER_LINKS: NavLink[] = [
  { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em", iconName: "spade" },
  { to: "/casinospil/poker/omaha", label: "Omaha", iconName: "club" },
  { to: "/casinospil/poker/three-card-poker", label: "Three Card Poker", iconName: "layers" },
  { to: "/casinospil/poker/caribbean-stud", label: "Caribbean Stud", iconName: "sun" },
  { to: "/casinospil/poker/video-poker", label: "Video Poker", iconName: "monitor" },
  { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi", iconName: "brain" },
  { to: "/casinospil/poker/bedste-sider", label: "Bedste Pokersider", iconName: "award" },
];

export const OTHER_CASINOSPIL_LINKS: NavLink[] = [
  { to: "/casinospil/craps", label: "Craps", iconName: "dice-5" },
  { to: "/casinospil/baccarat", label: "Baccarat", iconName: "spade" },
  { to: "/casinospil/online-lotteri", label: "Online Lotteri", iconName: "ticket" },
];

export const LIVE_CASINO_LINKS: NavLink[] = [
  { to: "/live-casino/blackjack", label: "Live Blackjack", iconName: "spade" },
  { to: "/live-casino/roulette", label: "Live Roulette", iconName: "circle-dot" },
  { to: "/live-casino/baccarat", label: "Live Baccarat", iconName: "club" },
  { to: "/live-casino/lightning-roulette", label: "Lightning Roulette", iconName: "zap" },
  { to: "/live-casino/monopoly-live", label: "Monopoly Live", iconName: "building-2" },
  { to: "/live-casino/game-shows", label: "Game Shows", iconName: "tv" },
  { to: "/live-casino/crazy-time", label: "Crazy Time", iconName: "clock" },
  { to: "/live-casino/dream-catcher", label: "Dream Catcher", iconName: "target" },
  { to: "/live-casino/deal-or-no-deal", label: "Deal or No Deal", iconName: "briefcase" },
  { to: "/live-casino/strategi", label: "Live Casino Strategi", iconName: "brain" },
  { to: "/live-casino/udbydere", label: "Live Casino Udbydere", iconName: "users" },
];

export const BONUS_LINKS: NavLinkWithIcon[] = [
  { to: "/velkomstbonus", label: "Velkomstbonus", iconName: "party-popper" },
  { to: "/free-spins", label: "Free Spins", iconName: "rotate-cw" },
  { to: "/bonus-uden-indbetaling", label: "Bonus uden Indbetaling", iconName: "gift" },
  { to: "/no-sticky-bonus", label: "No-Sticky Bonusser", iconName: "unlink" },
  { to: "/sticky-bonus", label: "Sticky Bonusser", iconName: "link" },
  { to: "/cashback-bonus", label: "Cashback Bonus", iconName: "undo-2" },
  { to: "/reload-bonus", label: "Reload Bonus", iconName: "refresh-cw" },
  { to: "/free-spins-i-dag", label: "Free Spins i Dag", iconName: "calendar-check" },
  { to: "/omsaetningskrav", label: "Omsætningskrav", iconName: "calculator" },
  { to: "/indskudsbonus", label: "Indskudsbonus", iconName: "piggy-bank" },
  { to: "/bonus-uden-omsaetningskrav", label: "Bonus uden Omsætningskrav", iconName: "circle-check" },
];

export const PAYMENT_LINKS: NavLink[] = [
  { to: "/betalingsmetoder/apple-pay", label: "Apple Pay", iconName: "apple" },
  { to: "/betalingsmetoder/mobilepay", label: "MobilePay", iconName: "smartphone" },
  { to: "/betalingsmetoder/paypal", label: "PayPal", iconName: "wallet" },
  { to: "/betalingsmetoder/skrill", label: "Skrill", iconName: "credit-card" },
  { to: "/betalingsmetoder/trustly", label: "Trustly", iconName: "banknote" },
  { to: "/betalingsmetoder/zimpler", label: "Zimpler", iconName: "send" },
  { to: "/betalingsmetoder/paysafecard", label: "Paysafecard", iconName: "shield" },
  { to: "/betalingsmetoder/bankoverforsler", label: "Bankoverførsel", iconName: "landmark" },
  { to: "/betalingsmetoder/visa-mastercard", label: "Visa / Mastercard", iconName: "credit-card" },
  { to: "/betalingsmetoder/revolut", label: "Revolut", iconName: "circle-dollar-sign" },
];

export const PROVIDER_LINKS: NavLink[] = [
  { to: "/spiludviklere/netent", label: "NetEnt", logoUrl: "/src/assets/providers/netent.webp" },
  { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play", logoUrl: "/src/assets/providers/pragmatic-play.webp" },
  { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming", logoUrl: "/src/assets/providers/evolution-gaming.webp" },
  { to: "/spiludviklere/relax-gaming", label: "Relax Gaming", logoUrl: "/src/assets/providers/relax-gaming.webp" },
  { to: "/spiludviklere/play-n-go", label: "Play'n GO", logoUrl: "/src/assets/providers/play-n-go.webp" },
  { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming", logoUrl: "/src/assets/providers/hacksaw-gaming.webp" },
  { to: "/spiludviklere/nolimit-city", label: "Nolimit City", logoUrl: "/src/assets/providers/nolimit-city.webp" },
  { to: "/spiludviklere/elk-studios", label: "ELK Studios", logoUrl: "/src/assets/providers/elk-studios.webp" },
  { to: "/spiludviklere/yggdrasil", label: "Yggdrasil", logoUrl: "/src/assets/providers/yggdrasil.webp" },
  { to: "/spiludviklere/microgaming", label: "Microgaming", logoUrl: "/src/assets/providers/microgaming.webp" },
  { to: "/spiludviklere/red-tiger", label: "Red Tiger", logoUrl: "/src/assets/providers/red-tiger.webp" },
  { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming", logoUrl: "/src/assets/providers/big-time-gaming.webp" },
  { to: "/spiludviklere/thunderkick", label: "Thunderkick", logoUrl: "/src/assets/providers/thunderkick.webp" },
  { to: "/spiludviklere/blueprint-gaming", label: "Blueprint Gaming", logoUrl: "/src/assets/providers/blueprint-gaming.webp" },
  { to: "/spiludviklere/push-gaming", label: "Push Gaming", logoUrl: "/src/assets/providers/push-gaming.webp" },
  { to: "/spiludviklere/quickspin", label: "Quickspin", logoUrl: "/src/assets/providers/quickspin.webp" },
  { to: "/spiludviklere/isoftbet", label: "iSoftBet", logoUrl: "/src/assets/providers/isoftbet.webp" },
  { to: "/spiludviklere/betsoft", label: "Betsoft", logoUrl: "/src/assets/providers/betsoft.webp" },
  { to: "/spiludviklere/wazdan", label: "Wazdan", logoUrl: "/src/assets/providers/wazdan.webp" },
  { to: "/spiludviklere/endorphina", label: "Endorphina", logoUrl: "/src/assets/providers/endorphina.webp" },
  { to: "/spiludviklere/stakelogic", label: "Stakelogic", logoUrl: "/src/assets/providers/stakelogic.webp" },
  { to: "/spiludviklere/booming-games", label: "Booming Games", logoUrl: "/src/assets/providers/booming-games.webp" },
];

const CASINO_LOGO_BASE = "https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos";

export const REVIEW_TOP_LINKS: NavLink[] = [
  { to: "/casino-anmeldelser/spildansknu", label: "SpilDanskNu", logoUrl: "/src/assets/casino-logos/spildansknu.webp" },
  { to: "/casino-anmeldelser/spilleautomaten", label: "Spilleautomaten", logoUrl: "/src/assets/casino-logos/spilleautomaten.webp" },
  { to: "/casino-anmeldelser/betinia", label: "Betinia", logoUrl: "/src/assets/casino-logos/betinia.webp" },
  { to: "/casino-anmeldelser/campobet", label: "Campobet", logoUrl: "/src/assets/casino-logos/campobet.webp" },
  { to: "/casino-anmeldelser/swift-casino", label: "Swift Casino", logoUrl: "/src/assets/casino-logos/swift-casino.webp" },
  { to: "/casino-anmeldelser/luna-casino", label: "Luna Casino", logoUrl: "/src/assets/casino-logos/luna-casino.webp" },
  { to: "/casino-anmeldelser/playkasino", label: "PlayKasino", logoUrl: "/src/assets/casino-logos/playkasino.webp" },
];

export const REVIEW_ALL_LINKS: NavLink[] = [
  { to: "/casino-anmeldelser/danske-spil", label: "Danske Spil Casino", logoUrl: `${CASINO_LOGO_BASE}/danskespil.png` },
  { to: "/casino-anmeldelser/comeon", label: "ComeOn Casino", logoUrl: "/src/assets/casino-logos/comeon.webp" },
  { to: "/casino-anmeldelser/getlucky", label: "GetLucky Casino", logoUrl: "/src/assets/reviews/getlucky.webp" },
  { to: "/casino-anmeldelser/mr-green", label: "Mr Green Casino", logoUrl: "/src/assets/reviews/mrgreen.webp" },
  { to: "/casino-anmeldelser/videoslots", label: "Videoslots Casino", logoUrl: "/src/assets/casino-logos/videoslots.webp" },
  { to: "/casino-anmeldelser/mr-vegas", label: "Mr Vegas Casino", logoUrl: "/src/assets/casino-logos/mrvegas.webp" },
  { to: "/casino-anmeldelser/leovegas", label: "LeoVegas", logoUrl: "/src/assets/casino-logos/leovegas.webp" },
  { to: "/casino-anmeldelser/unibet", label: "Unibet", logoUrl: "/src/assets/reviews/unibet.webp" },
  { to: "/casino-anmeldelser/bet365", label: "bet365", logoUrl: "/src/assets/casino-logos/bet365.jpg" },
  { to: "/casino-anmeldelser/888-casino", label: "888 Casino", logoUrl: "/src/assets/casino-logos/888casino.webp" },
  { to: "/casino-anmeldelser/betano", label: "Betano", logoUrl: "/src/assets/reviews/betano.webp" },
  { to: "/casino-anmeldelser/expekt", label: "Expekt", logoUrl: "/src/assets/reviews/expekt.webp" },
  { to: "/casino-anmeldelser/royal-casino", label: "Royal Casino", logoUrl: "/src/assets/casino-logos/royal-casino.webp" },
  { to: "/casino-anmeldelser/maria-casino", label: "Maria Casino", logoUrl: "/src/assets/reviews/maria-casino.webp" },
  { to: "/casino-anmeldelser/kapow-casino", label: "Kapow Casino", logoUrl: "/src/assets/casino-logos/kapow.webp" },
  { to: "/casino-anmeldelser/nordicbet", label: "NordicBet", logoUrl: "/src/assets/reviews/nordicbet.webp" },
  { to: "/casino-anmeldelser/one-casino", label: "One Casino", logoUrl: "/src/assets/casino-logos/onecasino.webp" },
  { to: "/casino-anmeldelser/spilnu", label: "Spilnu", logoUrl: "/src/assets/reviews/spilnu.webp" },
  { to: "/casino-anmeldelser/stake-casino", label: "Stake Casino", logoUrl: `${CASINO_LOGO_BASE}/stake.png` },
  { to: "/casino-anmeldelser/casinostuen", label: "Casinostuen", logoUrl: "/src/assets/reviews/casinostuen.webp" },
  { to: "/casino-anmeldelser/pokerstars", label: "PokerStars", logoUrl: "/src/assets/reviews/pokerstars.webp" },
  { to: "/casino-anmeldelser/bwin", label: "bwin", logoUrl: "/src/assets/casino-logos/bwin.webp" },
  { to: "/casino-anmeldelser/marathonbet", label: "MarathonBet", logoUrl: "/src/assets/reviews/marathonbet.webp" },
  { to: "/casino-anmeldelser/bet365-vs-unibet", label: "bet365 vs Unibet", iconName: "scale" },
  { to: "/casino-anmeldelser/leovegas-vs-mr-green", label: "LeoVegas vs Mr Green", iconName: "scale" },
  { to: "/casino-anmeldelser/danske-spil-vs-spilnu", label: "Danske Spil vs Spilnu", iconName: "scale" },
  { to: "/casino-anmeldelser/spilleautomaten-vs-spildansknu", label: "Spilleautomaten vs SpilDanskNu", iconName: "scale" },
  { to: "/casino-anmeldelser/betinia-vs-campobet", label: "Betinia vs Campobet", iconName: "scale" },
  { to: "/casino-anmeldelser/swift-casino-vs-luna-casino", label: "Swift Casino vs Luna Casino", iconName: "scale" },
];

export const COMMUNITY_LINKS: NavLinkWithIcon[] = [
  { to: "/community/slots", label: "Spillehal", iconName: "gamepad-2" },
  { to: "/bonus-hunt", label: "Bonus Hunt", iconName: "crosshair" },
  { to: "/bonus-hunt/arkiv", label: "Bonus Hunt Arkiv", iconName: "archive" },
  { to: "/slot-database", label: "Slot Database", iconName: "database" },
  { to: "/statistik", label: "Statistik", iconName: "bar-chart-3" },
  { to: "/community/turneringer", label: "Turneringer", iconName: "swords" },
  { to: "/community/turneringer/arkiv", label: "Turneringsarkiv", iconName: "archive" },
  { to: "/community/hall-of-fame", label: "Hall of Fame", iconName: "medal" },
  { to: "/highlights", label: "Highlights", iconName: "play-circle" },
  { to: "/butik", label: "Butik", iconName: "shopping-bag" },
];

export const MORE_LINKS: NavLink[] = [
  { to: "/ordbog", label: "Casino Ordbog", iconName: "book-a" },
  { to: "/om", label: "Om Casinoaftaler.dk", iconName: "info" },
  { to: "/saadan-tester-vi-casinoer", label: "Sådan tester vi casinoer", iconName: "clipboard-check" },
  { to: "/forretningsmodel", label: "Forretningsmodel", iconName: "briefcase" },
  { to: "/redaktionel-politik", label: "Redaktionel Politik", iconName: "file-text" },
  { to: "/ansvarligt-spil", label: "Ansvarligt Spil", iconName: "heart-handshake" },
  { to: "/casino-licenser", label: "Casino Licenser", iconName: "shield-check" },
  { to: "/spillemyndigheden", label: "Spillemyndigheden", iconName: "landmark" },
  { to: "/kontakt", label: "Kontakt", iconName: "mail" },
  { to: "/casino-nyheder", label: "Casino Nyheder", iconName: "newspaper" },
];

export const FORFATTER_LINKS: NavLink[] = [
  { to: "/forfatter/jonas", label: "Jonas", iconName: "user" },
  { to: "/forfatter/kevin", label: "Kevin", iconName: "user" },
  { to: "/forfatter/ajse", label: "Ajse", iconName: "user" },
  { to: "/forfatter/niklas", label: "Niklas", iconName: "user" },
  { to: "/forfatter/frederik", label: "Frederik", iconName: "user" },
];
