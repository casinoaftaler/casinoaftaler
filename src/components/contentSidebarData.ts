/**
 * Sidebar navigation data for content/money pages.
 * Each category has a title, icon name, and links.
 */

export interface SidebarLink {
  to: string;
  label: string;
}

export interface SidebarCategory {
  title: string;
  iconName: string;
  links: SidebarLink[];
}

export const SIDEBAR_CATEGORIES: SidebarCategory[] = [
  {
    title: "Online Casinoer",
    iconName: "crown",
    links: [
      { to: "/top-10-casino-online", label: "Top 10 Online Casino" },
      { to: "/casino-anmeldelser/spildansknu", label: "SpilDanskNu" },
      { to: "/casino-anmeldelser/spilleautomaten", label: "Spilleautomaten" },
      { to: "/casino-anmeldelser/betinia", label: "Betinia" },
      { to: "/casino-anmeldelser/campobet", label: "Campobet" },
      { to: "/casino-anmeldelser/swift-casino", label: "Swift Casino" },
      { to: "/casino-anmeldelser/luna-casino", label: "Luna Casino" },
      { to: "/casino-anmeldelser/playkasino", label: "PlayKasino" },
      { to: "/casino-anmeldelser/leovegas", label: "LeoVegas" },
      { to: "/casino-anmeldelser/mr-green", label: "Mr Green" },
      { to: "/casino-anmeldelser/unibet", label: "Unibet" },
      { to: "/casino-anmeldelser/bet365", label: "bet365" },
      { to: "/casino-anmeldelser/comeon", label: "ComeOn" },
      { to: "/casino-anmeldelser/danske-spil", label: "Danske Spil" },
      { to: "/casino-anmeldelser/getlucky", label: "GetLucky" },
      { to: "/casino-anmeldelser", label: "Alle anmeldelser →" },
    ],
  },
  {
    title: "Nye Casinoer",
    iconName: "sparkles",
    links: [
      { to: "/nye-casinoer", label: "Nye Casinoer 2026" },
      { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens" },
      { to: "/nye-casinoer/uden-rofus", label: "Uden ROFUS" },
      { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling" },
      { to: "/nye-casinoer/bonus-uden-indbetaling", label: "Bonus uden Indbetaling" },
      { to: "/nye-casinoer/trustly", label: "Med Trustly" },
      { to: "/nye-casinoer/mitid", label: "Med MitID" },
      { to: "/nye-casinoer/lav-wagering", label: "Lav Wagering" },
    ],
  },
  {
    title: "Bonusser",
    iconName: "gift",
    links: [
      { to: "/casino-bonus", label: "Casino Bonus" },
      { to: "/velkomstbonus", label: "Velkomstbonus" },
      { to: "/free-spins", label: "Free Spins" },
      { to: "/bonus-uden-indbetaling", label: "Bonus uden Indbetaling" },
      { to: "/no-sticky-bonus", label: "No-Sticky Bonus" },
      { to: "/cashback-bonus", label: "Cashback Bonus" },
      { to: "/reload-bonus", label: "Reload Bonus" },
      { to: "/free-spins-i-dag", label: "Free Spins i Dag" },
      { to: "/omsaetningskrav", label: "Omsætningskrav" },
      { to: "/indskudsbonus", label: "Indskudsbonus" },
      { to: "/bonus-uden-omsaetningskrav", label: "Bonus uden Omsætningskrav" },
    ],
  },
  {
    title: "Casino Spil",
    iconName: "dices",
    links: [
      { to: "/casinospil", label: "Alle Casinospil" },
      { to: "/casinospil/spillemaskiner", label: "Spillemaskiner" },
      { to: "/casinospil/blackjack", label: "Blackjack" },
      { to: "/casinospil/roulette", label: "Roulette" },
      { to: "/casinospil/poker", label: "Poker" },
      { to: "/casinospil/baccarat", label: "Baccarat" },
      { to: "/casinospil/craps", label: "Craps" },
      { to: "/live-casino", label: "Live Casino" },
      { to: "/megaways-slots", label: "Megaways Slots" },
      { to: "/jackpot-slots", label: "Jackpot Slots" },
      { to: "/bonus-buy-slots", label: "Bonus Buy Slots" },
    ],
  },
  {
    title: "Betalingsmetoder",
    iconName: "creditCard",
    links: [
      { to: "/betalingsmetoder", label: "Alle Betalingsmetoder" },
      { to: "/betalingsmetoder/apple-pay", label: "Apple Pay" },
      { to: "/betalingsmetoder/mobilepay", label: "MobilePay" },
      { to: "/betalingsmetoder/paypal", label: "PayPal" },
      { to: "/betalingsmetoder/skrill", label: "Skrill" },
      { to: "/betalingsmetoder/trustly", label: "Trustly" },
      { to: "/betalingsmetoder/paysafecard", label: "Paysafecard" },
      { to: "/betalingsmetoder/visa-mastercard", label: "Visa / Mastercard" },
      { to: "/betalingsmetoder/revolut", label: "Revolut" },
    ],
  },
  {
    title: "Spiludviklere",
    iconName: "gamepad2",
    links: [
      { to: "/spiludviklere", label: "Alle Spiludviklere" },
      { to: "/spiludviklere/netent", label: "NetEnt" },
      { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play" },
      { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming" },
      { to: "/spiludviklere/play-n-go", label: "Play'n GO" },
      { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming" },
      { to: "/spiludviklere/nolimit-city", label: "Nolimit City" },
      { to: "/spiludviklere/relax-gaming", label: "Relax Gaming" },
      { to: "/spiludviklere/microgaming", label: "Microgaming" },
      { to: "/spiludviklere/red-tiger", label: "Red Tiger" },
      { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming" },
    ],
  },
];
