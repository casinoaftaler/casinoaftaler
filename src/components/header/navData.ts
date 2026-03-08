/**
 * Centralized navigation link data for Header.
 * Shared by both DesktopNav and MobileNav to avoid duplication.
 */

export interface NavLink {
  to: string;
  label: string;
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
];

export const BONUS_LINKS: NavLinkWithIcon[] = [
  { to: "/no-sticky-bonus", label: "No-Sticky Bonusser" },
  { to: "/sticky-bonus", label: "Sticky Bonusser" },
  { to: "/free-spins", label: "Free Spins" },
  { to: "/free-spins-i-dag", label: "Free Spins i Dag" },
  { to: "/velkomstbonus", label: "Velkomstbonus" },
  { to: "/omsaetningskrav", label: "Omsætningskrav" },
  { to: "/indskudsbonus", label: "Indskudsbonus" },
  { to: "/bonus-uden-indbetaling", label: "Bonus uden Indbetaling" },
  { to: "/bonus-uden-omsaetningskrav", label: "Bonus uden Omsætningskrav" },
  { to: "/cashback-bonus", label: "Cashback Bonus" },
  { to: "/reload-bonus", label: "Reload Bonus" },
  { to: "/vip-program", label: "VIP Program" },
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
  { to: "/casino-med-mobilepay", label: "Casino med MobilePay" },
];

export const PROVIDER_LINKS: NavLink[] = [
  { to: "/spiludviklere/netent", label: "NetEnt" },
  { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play" },
  { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming" },
  { to: "/spiludviklere/relax-gaming", label: "Relax Gaming" },
  { to: "/spiludviklere/play-n-go", label: "Play'n GO" },
  { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming" },
  { to: "/spiludviklere/nolimit-city", label: "Nolimit City" },
  { to: "/spiludviklere/elk-studios", label: "ELK Studios" },
  { to: "/spiludviklere/yggdrasil", label: "Yggdrasil" },
  { to: "/spiludviklere/microgaming", label: "Microgaming" },
  { to: "/spiludviklere/red-tiger", label: "Red Tiger" },
  { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming" },
];

export const REVIEW_TOP_LINKS: NavLink[] = [
  { to: "/casino-anmeldelser/spildansknu", label: "SpilDanskNu" },
  { to: "/casino-anmeldelser/spilleautomaten", label: "Spilleautomaten" },
  { to: "/casino-anmeldelser/betinia", label: "Betinia" },
  { to: "/casino-anmeldelser/campobet", label: "Campobet" },
  { to: "/casino-anmeldelser/swift-casino", label: "Swift Casino" },
  { to: "/casino-anmeldelser/luna-casino", label: "Luna Casino" },
];

export const REVIEW_ALL_LINKS: NavLink[] = [
  { to: "/casino-anmeldelser/danske-spil", label: "Danske Spil Casino" },
  { to: "/casino-anmeldelser/comeon", label: "ComeOn Casino" },
  { to: "/casino-anmeldelser/getlucky", label: "GetLucky Casino" },
  { to: "/casino-anmeldelser/mr-green", label: "Mr Green Casino" },
  { to: "/casino-anmeldelser/videoslots", label: "Videoslots Casino" },
  { to: "/casino-anmeldelser/mr-vegas", label: "Mr Vegas Casino" },
  { to: "/casino-anmeldelser/leovegas", label: "LeoVegas" },
  { to: "/casino-anmeldelser/unibet", label: "Unibet" },
  { to: "/casino-anmeldelser/bet365", label: "bet365" },
  { to: "/casino-anmeldelser/888-casino", label: "888 Casino" },
  { to: "/casino-anmeldelser/betano", label: "Betano" },
  { to: "/casino-anmeldelser/expekt", label: "Expekt" },
  { to: "/casino-anmeldelser/royal-casino", label: "Royal Casino" },
  { to: "/casino-anmeldelser/maria-casino", label: "Maria Casino" },
  { to: "/casino-anmeldelser/kapow-casino", label: "Kapow Casino" },
  { to: "/casino-anmeldelser/nordicbet", label: "NordicBet" },
  { to: "/casino-anmeldelser/one-casino", label: "One Casino" },
  { to: "/casino-anmeldelser/spilnu", label: "Spilnu" },
  { to: "/casino-anmeldelser/stake-casino", label: "Stake Casino" },
  { to: "/casino-anmeldelser/casinostuen", label: "Casinostuen" },
  { to: "/casino-anmeldelser/pokerstars", label: "PokerStars" },
  { to: "/casino-anmeldelser/bwin", label: "bwin" },
  { to: "/casino-anmeldelser/marathonbet", label: "MarathonBet" },
  { to: "/casino-anmeldelser/bet365-vs-unibet", label: "bet365 vs Unibet" },
  { to: "/casino-anmeldelser/leovegas-vs-mr-green", label: "LeoVegas vs Mr Green" },
  { to: "/casino-anmeldelser/danske-spil-vs-spilnu", label: "Danske Spil vs Spilnu" },
];

export const COMMUNITY_LINKS: NavLinkWithIcon[] = [
  { to: "/community/slots", label: "Spillehal" },
  { to: "/bonus-hunt", label: "Bonus Hunt" },
  { to: "/bonus-hunt/arkiv", label: "Bonus Hunt Arkiv" },
  { to: "/slot-database", label: "Slot Database" },
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
];
