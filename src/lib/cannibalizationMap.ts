export const cannibalizationMap = {
  bonus: {
    primaryUrl: "/casino-bonus",
    supportUrls: ["/velkomstbonus", "/free-spins-i-dag", "/vip-program", "/bonus-uden-omsaetningskrav"],
    demotedUrls: ["/sticky-bonus", "/reload-bonus"],
    titleOwner: "Bonus-intent skal ejes af /casino-bonus og støttes af stærke money spokes.",
  },
  casino: {
    primaryUrl: "/top-10-casino-online",
    supportUrls: ["/casino-anmeldelser", "/nye-casinoer", "/casino-med-mobilepay"],
    demotedUrls: ["/casinoer", "/casino-app"],
    titleOwner: "Best/top-intent skal ejes af /top-10-casino-online, mens reviews og nye casinoer støtter uden at kannibalisere.",
  },
  provider: {
    primaryUrl: "/spiludviklere",
    supportUrls: ["/spiludviklere/pragmatic-play", "/spiludviklere/play-n-go", "/spiludviklere/hacksaw-gaming"],
    demotedUrls: ["/slot-database"],
    titleOwner: "Provider-intent skal samles på hubben og forstærkes af prioriterede provider-spokes.",
  },
  slots: {
    primaryUrl: "/slot-database",
    supportUrls: ["/slot-katalog/sweet-bonanza", "/slot-katalog/book-of-dead", "/slot-katalog/gates-of-olympus"],
    demotedUrls: ["/slot-directory.html"],
    titleOwner: "Datadrevet slot-intent skal ejes af /slot-database og fødes videre til de stærkeste programmatic slot-sider.",
  },
} as const;

export const moneyPageRoutePriority = {
  bonusHub: [
    "/casino-bonus",
    "/velkomstbonus",
    "/free-spins-i-dag",
    "/vip-program",
    "/casino-anmeldelser",
  ],
  newsHub: [
    "/top-10-casino-online",
    "/casino-anmeldelser",
    "/casino-bonus",
    "/nye-casinoer",
    "/casino-med-mobilepay",
    "/velkomstbonus",
  ],
  nyeCasinoerHub: [
    "/nye-casinoer",
    "/top-10-casino-online",
    "/casino-anmeldelser",
    "/casino-bonus",
    "/casino-med-mobilepay",
  ],
  reviewHub: [
    "/top-10-casino-online",
    "/casino-bonus",
    "/nye-casinoer",
    "/casino-med-mobilepay",
    "/vip-program",
  ],
  slotDatabase: [
    "/top-10-casino-online",
    "/casino-anmeldelser",
    "/casino-bonus",
    "/free-spins-i-dag",
    "/vip-program",
  ],
} as const;

export const programmaticPriorityBuckets = {
  strengthen: [
    {
      to: "/slot-katalog/sweet-bonanza",
      label: "Sweet Bonanza data",
      reason: "Høj efterspørgsel og stærk kobling til bonus- og slot-intent.",
    },
    {
      to: "/slot-katalog/book-of-dead",
      label: "Book of Dead data",
      reason: "Vedvarende dansk søgevolumen og stærk entry-side til slots clusteret.",
    },
    {
      to: "/slot-katalog/gates-of-olympus",
      label: "Gates of Olympus data",
      reason: "Community-intent og slot-data matcher stærkt med hubben.",
    },
    {
      to: "/spiludviklere/pragmatic-play",
      label: "Pragmatic Play guide",
      reason: "Kommercielt stærk provider-side med høj intern synergi.",
    },
    {
      to: "/spiludviklere/play-n-go",
      label: "Play'n GO guide",
      reason: "Stærk dansk brand- og spil-intent i samme cluster.",
    },
    {
      to: "/spiludviklere/hacksaw-gaming",
      label: "Hacksaw Gaming guide",
      reason: "Høj volatilitet-intent og naturlig kobling til slots-data.",
    },
  ],
  neutral: [
    "/slot-katalog/starburst",
    "/slot-katalog/money-train-3",
    "/spiludviklere/netent",
  ],
  deprioritize: [
    "/slot-directory.html",
  ],
} as const;
