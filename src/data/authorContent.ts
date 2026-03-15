/**
 * Centralized Author Content Registry
 * ═══════════════════════════════════
 * Articles are auto-derived from seoRoutes.ts when the route has
 * `author`, `articleTitle`, `articleCategory`, and `articleExcerpt` set.
 * Legacy manual entries below are merged and deduplicated by path.
 *
 * This file is organized into:
 *  - articles: Written guides, reviews, and pages
 *  - reviewVideos: Casino review videos (YouTube)
 *  - guideVideos: Educational YouTube guides
 *  - schemaVideos: All video IDs for JSON-LD (auto-derived from reviewVideos + guideVideos)
 */

import { glossaryTerms } from "@/data/glossaryTerms";

// ─── Types ──────────────────────────────────────────────────────────────

export interface AuthorArticle {
  title: string;
  path: string;
  category: string;
  excerpt: string;
}

export interface AuthorVideo {
  videoId: string;
  title: string;
  path: string;
  category: string;
}

export type AuthorId = "jonas" | "kevin" | "ajse" | "niklas";

// ─── Jonas – Articles ───────────────────────────────────────────────────

const jonasArticles: AuthorArticle[] = [
  // Hub-sider
  { title: "Bedste Casino Bonus i Danmark 2026", path: "/casino-bonus", category: "Guide", excerpt: "Komplet overblik over de bedste casino bonusser hos danske online casinoer." },
  { title: "Nye Casinoer i Danmark 2026", path: "/nye-casinoer", category: "Guide", excerpt: "Vi tester og anmelder de nyeste danske online casinoer løbende." },
  { title: "Casinospil – Komplet Guide", path: "/casinospil", category: "Guide", excerpt: "Overblik over alle casinospil – slots, bordspil, live casino og mere." },
  { title: "Live Casino Guide", path: "/live-casino", category: "Guide", excerpt: "Oplev live dealers og ægte casinostemning fra din sofa." },
  { title: "Casino Anmeldelser", path: "/casino-anmeldelser", category: "Guide", excerpt: "Alle vores dybdegående casino-anmeldelser samlet ét sted." },
  { title: "Top 10 Casino Online", path: "/top-10-casino-online", category: "Guide", excerpt: "De 10 bedste online casinoer i Danmark – testet og rangeret." },
  { title: "Sådan Tester Vi Casinoer", path: "/saadan-tester-vi-casinoer", category: "Guide", excerpt: "Vores metode og kriterier for casino-anmeldelser." },
  { title: "Casinoer – Komplet Oversigt", path: "/casinoer", category: "Guide", excerpt: "Komplet oversigt over alle anbefalede danske online casinoer." },
  { title: "Free Spins i Dag", path: "/free-spins-i-dag", category: "Guide", excerpt: "Dagligt opdaterede free spins tilbud hos danske casinoer." },
  { title: "Slot Database", path: "/slot-database", category: "Værktøj", excerpt: "Søg i 1.000+ slots – RTP, volatilitet og stats fra vores streams." },
  { title: "Casino Ordbog", path: "/ordbog", category: "Guide", excerpt: "Komplet ordbog over casinobegreber – fra RTP til wagering." },
  // Casinospil guides
  { title: "Blackjack Regler & Guide", path: "/casinospil/blackjack", category: "Guide", excerpt: "Komplet guide til blackjack regler, strategi og varianter." },
  { title: "Amerikansk Blackjack Guide", path: "/casinospil/blackjack/amerikansk-blackjack", category: "Guide", excerpt: "Regler, strategi og forskelle for amerikansk blackjack." },
  { title: "Europæisk Blackjack Guide", path: "/casinospil/blackjack/europaeisk-blackjack", category: "Guide", excerpt: "Europæisk blackjack – regler, no-peek og strategi." },
  { title: "Double Exposure Blackjack", path: "/casinospil/blackjack/double-exposure-blackjack", category: "Guide", excerpt: "Double Exposure – begge dealerkort synlige, tilpasset strategi." },
  { title: "Spanish 21 Guide", path: "/casinospil/blackjack/spanish-21", category: "Guide", excerpt: "Spanish 21 – liberale regler, bonusudbetalinger og strategi." },
  { title: "Martingale System", path: "/casinospil/blackjack/martingale-system", category: "Guide", excerpt: "Martingale-systemet forklaret – dobling ved tab i blackjack." },
  { title: "Fibonacci System", path: "/casinospil/blackjack/fibonacci-system", category: "Guide", excerpt: "Fibonacci-systemet – progressiv betting baseret på talrækken." },
  { title: "D'Alembert System", path: "/casinospil/blackjack/dalembert-system", category: "Guide", excerpt: "D'Alembert-systemet – forsigtig progressiv strategi til blackjack." },
  { title: "Roulette Regler & Guide", path: "/casinospil/roulette", category: "Guide", excerpt: "Lær roulette regler, væddemålstyper og varianter." },
  { title: "Fransk Roulette Guide", path: "/casinospil/roulette/fransk-roulette", category: "Guide", excerpt: "Fransk roulette – La Partage, En Prison og lav husfordel." },
  { title: "Amerikansk Roulette Guide", path: "/casinospil/roulette/amerikansk-roulette", category: "Guide", excerpt: "Amerikansk roulette – dobbelt nul, odds og strategier." },
  { title: "Labouchere Roulette System", path: "/casinospil/roulette/labouchere-roulette", category: "Guide", excerpt: "Labouchere-systemet – avanceret progressiv roulette-strategi." },
  { title: "D'Alembert Roulette System", path: "/casinospil/roulette/dalembert-roulette", category: "Guide", excerpt: "D'Alembert-systemet anvendt til roulette – forsigtig progression." },
  { title: "Poker Guide", path: "/casinospil/poker", category: "Guide", excerpt: "Komplet guide til online poker hos danske casinoer." },
  { title: "Texas Hold'em Guide", path: "/casinospil/poker/texas-holdem", category: "Guide", excerpt: "Texas Hold'em – regler, positioner og strategier." },
  { title: "Omaha Poker Guide", path: "/casinospil/poker/omaha", category: "Guide", excerpt: "Omaha Poker – fire hulkort, pot-limit og strategi." },
  { title: "Video Poker Guide", path: "/casinospil/poker/video-poker", category: "Guide", excerpt: "Video poker – Jacks or Better, Deuces Wild og RTP-analyse." },
  { title: "Poker Strategi Guide", path: "/casinospil/poker/strategi", category: "Guide", excerpt: "Pokerstrategi – odds, position, bluffing og bankroll management." },
  { title: "Three Card Poker Guide", path: "/casinospil/poker/three-card-poker", category: "Guide", excerpt: "Three Card Poker – regler, Pair Plus og optimal strategi." },
  { title: "Caribbean Stud Poker Guide", path: "/casinospil/poker/caribbean-stud", category: "Guide", excerpt: "Caribbean Stud Poker – regler, progressiv jackpot og strategi." },
  { title: "Craps Guide", path: "/casinospil/craps", category: "Guide", excerpt: "Lær craps regler, væddemål og strategi for begyndere." },
  { title: "Online Lotteri Guide", path: "/casinospil/online-lotteri", category: "Guide", excerpt: "Alt om online lotteri hos danske casinoer og operatører." },
  { title: "Game Shows Guide", path: "/casinospil/game-shows", category: "Guide", excerpt: "Oplev live game shows som Crazy Time og Dream Catcher." },
  { title: "Baccarat Guide", path: "/casinospil/baccarat", category: "Guide", excerpt: "Komplet guide til baccarat – regler, strategi og varianter." },
  { title: "Roulette Strategi Guide", path: "/casinospil/roulette/roulette-strategi", category: "Guide", excerpt: "Avancerede roulettestrategier – Martingale, Fibonacci og mere." },
  { title: "Spillemaskiner Guide", path: "/casinospil/spillemaskiner", category: "Guide", excerpt: "Alt om online spillemaskiner – typer, RTP og tips." },
  { title: "Spillemaskiner med Høj RTP", path: "/casinospil/spillemaskiner/hoej-rtp", category: "Guide", excerpt: "Find de bedste spillemaskiner med høj tilbagebetalingsprocent." },
  { title: "Bonus Buy Slots Guide", path: "/casinospil/spillemaskiner/bonus-buys", category: "Guide", excerpt: "Alt om bonus buy slots – EV-analyse, strategi og de bedste titler." },
  { title: "Megaways Slots Guide", path: "/megaways-slots", category: "Guide", excerpt: "Komplet guide til Megaways-mekanikken – RTP, volatilitet og de bedste titler." },
  { title: "Jackpot Slots Guide", path: "/jackpot-slots", category: "Guide", excerpt: "Alt om progressive jackpot slots – EV, strategier og de største gevinster." },
  { title: "VIP Program Guide", path: "/vip-program", category: "Guide", excerpt: "Komplet guide til casino VIP-programmer og loyalitetsordninger i Danmark." },
  { title: "Hall of Fame", path: "/hall-of-fame", category: "Community", excerpt: "De største gevinster og community-rekorder fra vores streams." },
  // Slot guides (Jonas)
  { title: "Book of Dead – Komplet Guide", path: "/casinospil/spillemaskiner/book-of-dead", category: "Slot Guide", excerpt: "Alt om Book of Dead – RTP, volatilitet, free spins og strategi." },
  { title: "Razor Shark – Komplet Guide", path: "/casinospil/spillemaskiner/razor-shark", category: "Slot Guide", excerpt: "Razor Shark – Mystery Stacks, Nudge & Reveal og volatilitetsanalyse." },
  { title: "Gates of Olympus – Komplet Guide", path: "/casinospil/spillemaskiner/gates-of-olympus", category: "Slot Guide", excerpt: "Gates of Olympus – multiplikator-mekanik, RTP og free spins strategi." },
  { title: "Sweet Bonanza – Komplet Guide", path: "/casinospil/spillemaskiner/sweet-bonanza", category: "Slot Guide", excerpt: "Sweet Bonanza – tumble-mekanik, multiplikatorer og ante bet." },
  { title: "Dead or Alive 2 – Komplet Guide", path: "/casinospil/spillemaskiner/dead-or-alive-2", category: "Slot Guide", excerpt: "Dead or Alive 2 – sticky wilds, tre free spins-modi og volatilitet." },
  { title: "Bonanza Megaways – Komplet Guide", path: "/casinospil/spillemaskiner/bonanza", category: "Slot Guide", excerpt: "Bonanza Megaways – den originale Megaways-slot analyseret." },
  { title: "Legacy of Dead – Komplet Guide", path: "/casinospil/spillemaskiner/legacy-of-dead", category: "Slot Guide", excerpt: "Legacy of Dead – expanding symbols, free spins og RTP-analyse." },
  { title: "Eye of Horus – Komplet Guide", path: "/casinospil/spillemaskiner/eye-of-horus", category: "Slot Guide", excerpt: "Eye of Horus – egyptisk tema, free spins og symbol-opgraderinger." },
  { title: "Money Train 3 – Komplet Guide", path: "/casinospil/spillemaskiner/money-train-3", category: "Slot Guide", excerpt: "Money Train 3 – Respin-feature, persistente symboler og max win." },
  { title: "The Dog House – Komplet Guide", path: "/casinospil/spillemaskiner/the-dog-house", category: "Slot Guide", excerpt: "The Dog House – sticky wilds, multiplikatorer og free spins." },
  { title: "Sugar Rush – Komplet Guide", path: "/casinospil/spillemaskiner/sugar-rush", category: "Slot Guide", excerpt: "Sugar Rush – cluster pays, multiplikatorer og volatilitetsanalyse." },
  // Live Casino guides
  { title: "Live Blackjack Guide", path: "/live-casino/live-blackjack", category: "Guide", excerpt: "Komplet guide til live blackjack – regler, strategi og de bedste borde." },
  { title: "Live Roulette Guide", path: "/live-casino/live-roulette", category: "Guide", excerpt: "Alt om live roulette – varianter, odds og de bedste udbydere." },
  { title: "Live Baccarat Guide", path: "/live-casino/live-baccarat", category: "Guide", excerpt: "Live baccarat – regler, strategi og squeeze-funktioner." },
  { title: "Lightning Roulette Guide", path: "/live-casino/lightning-roulette", category: "Guide", excerpt: "Lightning Roulette – lyn-multiplikatorer, RTP og strategi." },
  { title: "Monopoly Live Guide", path: "/live-casino/monopoly-live", category: "Guide", excerpt: "Monopoly Live – game show med bonusrunder og Mr. Monopoly." },
  { title: "Crazy Time Guide", path: "/live-casino/crazy-time", category: "Guide", excerpt: "Crazy Time – det ultimative live casino game show med fire bonusrunder." },
  { title: "Deal or No Deal Guide", path: "/live-casino/deal-or-no-deal", category: "Guide", excerpt: "Deal or No Deal Live – spil game showet med ægte dealer og kufferter." },
  { title: "Dream Catcher Guide", path: "/live-casino/dream-catcher", category: "Guide", excerpt: "Dream Catcher – money wheel game show med multiplikatorer." },
  // Nye Casinoer cluster
  { title: "Nye Casinoer 2026 – Komplet Liste", path: "/nye-casinoer/2026", category: "Guide", excerpt: "Alle nye danske casinoer lanceret i 2026 – testet og vurderet." },
  // "/nye-casinoer/bedste" – removed (301 redirect to /nye-casinoer)
  { title: "Nye Casinoer med Dansk Licens", path: "/nye-casinoer/dansk-licens", category: "Guide", excerpt: "Nye casinoer med officiel dansk spillelicens fra Spillemyndigheden." },
  { title: "Nye Casinoer med MitID", path: "/nye-casinoer/mitid", category: "Guide", excerpt: "Nye casinoer med hurtig MitID-verifikation." },
  { title: "Nye Casinoer med Hurtig Udbetaling", path: "/nye-casinoer/hurtig-udbetaling", category: "Guide", excerpt: "Nye casinoer med de hurtigste udbetalingstider i Danmark." },
  { title: "Nye Casinoer med Lav Wagering", path: "/nye-casinoer/lav-wagering", category: "Guide", excerpt: "Find nye casinoer med lave omsætningskrav på bonusser." },
  { title: "Nye Casinoer med Trustly", path: "/nye-casinoer/trustly", category: "Guide", excerpt: "Nye casinoer med Trustly som betalingsmetode." },
  { title: "Nye Casinoer Uden ROFUS", path: "/nye-casinoer/uden-rofus", category: "Guide", excerpt: "Information om nye casinoer uden ROFUS-registrering." },
  { title: "Nye Casinoer med Bonus Uden Indbetaling", path: "/nye-casinoer/bonus-uden-indbetaling", category: "Guide", excerpt: "Nye casinoer der tilbyder bonus uden indbetaling." },
  { title: "Nye vs. Etablerede Casinoer", path: "/nye-casinoer/vs-etablerede", category: "Guide", excerpt: "Sammenligning af nye og etablerede casinoer i Danmark." },
  // Casinoer cluster
  { title: "Casinoer med Hurtig Udbetaling", path: "/casinoer/hurtig-udbetaling", category: "Guide", excerpt: "Find casinoer med de hurtigste udbetalinger i Danmark." },
  { title: "Casinoer med Høj RTP", path: "/casinoer/hoej-rtp", category: "Guide", excerpt: "Casinoer med de bedste tilbagebetalingsprocenter." },
  { title: "Crypto Casino Guide", path: "/casinoer/crypto-casino", category: "Guide", excerpt: "Alt om kryptovaluta-casinoer, Bitcoin-betalinger og sikkerhed." },
  { title: "Licenserede Casinoer", path: "/casino-licenser", category: "Guide", excerpt: "Komplet liste over casinoer med dansk licens." },
  { title: "VR Casinoer Guide", path: "/casinoer/vr-casinoer", category: "Guide", excerpt: "Alt om virtual reality casinoer og fremtidens spiloplevelse." },
  { title: "Mobil Casinoer Guide", path: "/casinoer/mobil-casinoer", category: "Guide", excerpt: "De bedste mobilvenlige casinoer i Danmark." },
  { title: "Spil Casino for Sjov", path: "/casinoer/spil-casino-for-sjov", category: "Guide", excerpt: "Prøv casinospil gratis uden risiko – komplet guide." },
  // Casino og Skat moved to Niklas
  // Mobil Casino cluster
  { title: "Mobil Casino Guide", path: "/mobil-casino", category: "Guide", excerpt: "Komplet guide til casino på mobilen – app vs. browser, betalinger og performance." },
  { title: "Casino App Guide", path: "/casino-app", category: "Guide", excerpt: "Alt om casino apps i Danmark – native app vs. PWA vs. browser." },
  { title: "Casino på iPhone Guide", path: "/mobil-casino/iphone", category: "Guide", excerpt: "iOS-specifik guide: Face ID, Safari PWA, Apple Pay og performance-benchmarks." },
  { title: "Casino på Android Guide", path: "/mobil-casino/android", category: "Guide", excerpt: "Android casino guide: APK-sikkerhed, Google Play og fragmenteringshåndtering." },
  { title: "Casino på Tablet Guide", path: "/mobil-casino/tablet", category: "Guide", excerpt: "iPad vs. Android tablets – landskab, multi-tabling og live casino." },
  { title: "Bedste Casino Apps 2026", path: "/mobil-casino/bedste-apps", category: "Guide", excerpt: "Top 10 ranking af danske casino apps med vægtet scoring-model." },
  // Anmeldelser
  { title: "SpilDanskNu Anmeldelse", path: "/casino-anmeldelser/spildansknu", category: "Anmeldelse", excerpt: "Dybdegående anmeldelse af SpilDanskNu med bonus, spil og brugeroplevelse." },
  { title: "Spilleautomaten Anmeldelse", path: "/casino-anmeldelser/spilleautomaten", category: "Anmeldelse", excerpt: "Anmeldelse af Spilleautomaten med 3.000+ spil og hurtige udbetalinger." },
  { title: "Campobet Anmeldelse", path: "/casino-anmeldelser/campobet", category: "Anmeldelse", excerpt: "Campobet kombinerer casino og sportsbetting under dansk licens." },
  { title: "Betinia Anmeldelse", path: "/casino-anmeldelser/betinia", category: "Anmeldelse", excerpt: "Betinia – moderne casino med stærkt bonusprogram." },
  { title: "Swift Casino Anmeldelse", path: "/casino-anmeldelser/swift-casino", category: "Anmeldelse", excerpt: "Swift Casino – hurtige udbetalinger og moderne design." },
  { title: "Luna Casino Anmeldelse", path: "/casino-anmeldelser/luna-casino", category: "Anmeldelse", excerpt: "Luna Casino – unikt tema og solidt spiludvalg." },
  { title: "bet365 Casino Anmeldelse", path: "/casino-anmeldelser/bet365", category: "Anmeldelse", excerpt: "Er bet365 det bedste allround casino i Danmark? Vi tester alt." },
  { title: "Betano Anmeldelse", path: "/casino-anmeldelser/betano", category: "Anmeldelse", excerpt: "Betano – nyt dansk casino med fokus på sport og casino." },
  { title: "Danske Spil Anmeldelse", path: "/casino-anmeldelser/danske-spil", category: "Anmeldelse", excerpt: "Danske Spil Casino – Danmarks største spiludbyder testet." },
  { title: "ComeOn Anmeldelse", path: "/casino-anmeldelser/comeon", category: "Anmeldelse", excerpt: "ComeOn Casino – sport og casino samlet under ét tag." },
  { title: "GetLucky Anmeldelse", path: "/casino-anmeldelser/getlucky", category: "Anmeldelse", excerpt: "GetLucky Casino – moderne design og hurtigt spil." },
  { title: "Mr Green Anmeldelse", path: "/casino-anmeldelser/mr-green", category: "Anmeldelse", excerpt: "Mr Green – dansk licens, flot design og gamification-features." },
  { title: "Mr Vegas Anmeldelse", path: "/casino-anmeldelser/mr-vegas", category: "Anmeldelse", excerpt: "Mr Vegas Casino – adventure-tema med loyalitetsprogram." },
  { title: "LeoVegas Anmeldelse", path: "/casino-anmeldelser/leovegas", category: "Anmeldelse", excerpt: "LeoVegas – mobilcasino med bredt spiludvalg og dansk licens." },
  { title: "Expekt Anmeldelse", path: "/casino-anmeldelser/expekt", category: "Anmeldelse", excerpt: "Expekt – sport og casino med nordisk fokus." },
  { title: "888 Casino Anmeldelse", path: "/casino-anmeldelser/888-casino", category: "Anmeldelse", excerpt: "888 Casino – internationalt brand med dansk licens." },
  { title: "Unibet Anmeldelse", path: "/casino-anmeldelser/unibet", category: "Anmeldelse", excerpt: "Komplet anmeldelse af Unibet – casino, sports og poker samlet." },
  { title: "Royal Casino Anmeldelse", path: "/casino-anmeldelser/royal-casino", category: "Anmeldelse", excerpt: "Royal Casino – dansk casino med fokus på luksus og kvalitet." },
  { title: "Maria Casino Anmeldelse", path: "/casino-anmeldelser/maria-casino", category: "Anmeldelse", excerpt: "Maria Casino – klassisk dansk online casino med bredt udvalg." },
  { title: "Kapow Casino Anmeldelse", path: "/casino-anmeldelser/kapow-casino", category: "Anmeldelse", excerpt: "Kapow Casino – nyt dansk casino med frisk design." },
  { title: "NordicBet Anmeldelse", path: "/casino-anmeldelser/nordicbet", category: "Anmeldelse", excerpt: "NordicBet – nordisk sportsbook med stærkt casino og dansk licens." },
  { title: "One Casino Anmeldelse", path: "/casino-anmeldelser/one-casino", category: "Anmeldelse", excerpt: "One Casino – simpelt og brugervenligt online casino." },
  { title: "Spilnu Anmeldelse", path: "/casino-anmeldelser/spilnu", category: "Anmeldelse", excerpt: "Spilnu – bingo og casino under Danske Spil-koncernen." },
  { title: "Stake Casino Anmeldelse", path: "/casino-anmeldelser/stake-casino", category: "Anmeldelse", excerpt: "Stake Casino – crypto-casino med stor spilflade." },
  { title: "Casinostuen Anmeldelse", path: "/casino-anmeldelser/casinostuen", category: "Anmeldelse", excerpt: "Casinostuen – klassisk dansk casino med fokus på spilleautomater." },
  { title: "PokerStars Anmeldelse", path: "/casino-anmeldelser/pokerstars", category: "Anmeldelse", excerpt: "PokerStars – verdens største pokersite med dansk licens." },
  { title: "bwin Anmeldelse", path: "/casino-anmeldelser/bwin", category: "Anmeldelse", excerpt: "bwin – sport og casino fra en af Europas største operatører." },
  { title: "MarathonBet Anmeldelse", path: "/casino-anmeldelser/marathonbet", category: "Anmeldelse", excerpt: "MarathonBet – konkurrencedygtige odds og casino-supplement." },
  { title: "Videoslots Anmeldelse", path: "/casino-anmeldelser/videoslots", category: "Anmeldelse", excerpt: "Videoslots – 5.000+ spil, Battle of Slots og dansk licens." },
];

// ─── Jonas – Glossary terms (auto-generated from glossaryTerms.ts) ──────

const jonasGlossaryArticles: AuthorArticle[] = glossaryTerms.map((term) => ({
  title: `${term.title} – Casino Ordbog`,
  path: `/ordbog/${term.slug}`,
  category: "Ordbog",
  excerpt: term.shortDefinition.slice(0, 120) + "…",
}));

// ─── Jonas – Review Videos ──────────────────────────────────────────────

const jonasReviewVideos: AuthorVideo[] = [
  { videoId: "_hHQkRwUzoU", title: "SpilDanskNu Anmeldelse", path: "/casino-anmeldelser/spildansknu", category: "Anmeldelse" },
  { videoId: "L5JtdRVTNwk", title: "Spilleautomaten Anmeldelse", path: "/casino-anmeldelser/spilleautomaten", category: "Anmeldelse" },
  { videoId: "s7S_GRsKfK4", title: "Campobet Anmeldelse", path: "/casino-anmeldelser/campobet", category: "Anmeldelse" },
  { videoId: "GyqEjKQiCJU", title: "Betinia Anmeldelse", path: "/casino-anmeldelser/betinia", category: "Anmeldelse" },
  { videoId: "BVYnQxwqHG0", title: "Swift Casino Anmeldelse", path: "/casino-anmeldelser/swift-casino", category: "Anmeldelse" },
  { videoId: "14tI5vWShvs", title: "Luna Casino Anmeldelse", path: "/casino-anmeldelser/luna-casino", category: "Anmeldelse" },
  { videoId: "vb5nT5UGk8c", title: "bet365 Casino Anmeldelse", path: "/casino-anmeldelser/bet365", category: "Anmeldelse" },
  { videoId: "Uu3NBZzt-Sk", title: "Betano Anmeldelse", path: "/casino-anmeldelser/betano", category: "Anmeldelse" },
  { videoId: "AuYbcBpBOxY", title: "Danske Spil Anmeldelse", path: "/casino-anmeldelser/danske-spil", category: "Anmeldelse" },
  { videoId: "tW_E0RmzSHg", title: "ComeOn Anmeldelse", path: "/casino-anmeldelser/comeon", category: "Anmeldelse" },
  { videoId: "N1MyxsYcmMk", title: "GetLucky Anmeldelse", path: "/casino-anmeldelser/getlucky", category: "Anmeldelse" },
  { videoId: "htCLh4TK6tA", title: "Mr Green Anmeldelse", path: "/casino-anmeldelser/mr-green", category: "Anmeldelse" },
  { videoId: "vSkzKvgZT_0", title: "Mr Vegas Anmeldelse", path: "/casino-anmeldelser/mr-vegas", category: "Anmeldelse" },
  { videoId: "8_nQyVEJEcU", title: "LeoVegas Anmeldelse", path: "/casino-anmeldelser/leovegas", category: "Anmeldelse" },
  { videoId: "TzSmePJgd84", title: "Expekt Anmeldelse", path: "/casino-anmeldelser/expekt", category: "Anmeldelse" },
  { videoId: "crhpDPocTrQ", title: "888 Casino Anmeldelse", path: "/casino-anmeldelser/888-casino", category: "Anmeldelse" },
  { videoId: "53m8Fk6tmw8", title: "Unibet Anmeldelse", path: "/casino-anmeldelser/unibet", category: "Anmeldelse" },
  { videoId: "6R3Zt_ABaAo", title: "Royal Casino Anmeldelse", path: "/casino-anmeldelser/royal-casino", category: "Anmeldelse" },
  { videoId: "o9m02b_cAnE", title: "Maria Casino Anmeldelse", path: "/casino-anmeldelser/maria-casino", category: "Anmeldelse" },
  { videoId: "xo9vTabQgE8", title: "Videoslots Anmeldelse", path: "/casino-anmeldelser/videoslots", category: "Anmeldelse" },
];

// ─── Jonas – YouTube Guide Videos ───────────────────────────────────────

const jonasGuideVideos: AuthorVideo[] = [
  { videoId: "WOowRz6hnH8", title: "Hvad er en No-Sticky Bonus?", path: "/no-sticky-bonus", category: "Bonus" },
  { videoId: "yUAcefgYfkc", title: "Hvad er en Sticky Bonus?", path: "/sticky-bonus", category: "Bonus" },
  { videoId: "q4jeGo9TPEk", title: "Hvad er Free Spins?", path: "/free-spins", category: "Free Spins" },
  { videoId: "3tXFTjmgdcE", title: "Hvad er omsætningskrav?", path: "/omsaetningskrav", category: "Guide" },
  { videoId: "oK5PvebkvGY", title: "Hvad er en Velkomstbonus?", path: "/velkomstbonus", category: "Bonus" },
  { videoId: "hMHHVA6vH0Y", title: "Hvad er en Indskudsbonus?", path: "/indskudsbonus", category: "Bonus" },
  { videoId: "7JQ3nFTasoQ", title: "Hvad er bonus uden omsætningskrav?", path: "/bonus-uden-omsaetningskrav", category: "Bonus" },
  { videoId: "XhbLda1HyOs", title: "Hvad er bonus uden indbetaling?", path: "/bonus-uden-indbetaling", category: "Bonus" },
  { videoId: "vai9EyLLpfU", title: "Vi gennemgår Sweet Bonanza", path: "/casinospil/spillemaskiner/sweet-bonanza", category: "Slot Guide" },
  { videoId: "uUZOHtTgFW4", title: "Vi gennemgår Gates of Olympus", path: "/casinospil/spillemaskiner/gates-of-olympus", category: "Slot Guide" },
  { videoId: "oz_VUxjLXZ0", title: "Vi gennemgår Dead or Alive 2", path: "/casinospil/spillemaskiner/dead-or-alive-2", category: "Slot Guide" },
  { videoId: "f9GAKjf63uo", title: "Vi gennemgår Money Train 3", path: "/casinospil/spillemaskiner/money-train-3", category: "Slot Guide" },
  { videoId: "_rC_ONf72gk", title: "Vi gennemgår The Dog House", path: "/casinospil/spillemaskiner/the-dog-house", category: "Slot Guide" },
  { videoId: "Ss2ZRXT0jCI", title: "Vi gennemgår Legacy of Dead", path: "/casinospil/spillemaskiner/legacy-of-dead", category: "Slot Guide" },
  { videoId: "Jw--inO4LNk", title: "Vi gennemgår Book of Dead", path: "/casinospil/spillemaskiner/book-of-dead", category: "Slot Guide" },
  { videoId: "ybFWBECwKbo", title: "Vi gennemgår Reactoonz", path: "/casinospil/spillemaskiner/reactoonz", category: "Slot Guide" },
  { videoId: "G8beL2DD1sI", title: "Vi gennemgår Eye of Horus", path: "/casinospil/spillemaskiner/eye-of-horus", category: "Slot Guide" },
  { videoId: "wk34dIvTJ-c", title: "Vi gennemgår Wolf Gold", path: "/casinospil/spillemaskiner/wolf-gold", category: "Slot Guide" },
  { videoId: "epl204siMF0", title: "Hvad er en Cashback-Bonus?", path: "/cashback-bonus", category: "Bonus" },
  { videoId: "ReM4PBQ30rw", title: "Hvad er en Reload Bonus?", path: "/reload-bonus", category: "Bonus" },
  { videoId: "5OBGaiJDHVM", title: "Sådan fungerer vores turneringer", path: "/community/turneringer", category: "Community" },
  { videoId: "SQqTH2EgYTM", title: "Hacksaw Gaming – Bonus åbninger", path: "/spiludviklere/hacksaw-gaming", category: "Spiludvikler" },
  
  { videoId: "jn5JOzWL-sY", title: "Wanted Dead or a Wild – Fuldscreen VS", path: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", category: "Bonus Åbning" },
  { videoId: "oLToV0bHrjU", title: "Nolimit City – Bonus åbninger", path: "/spiludviklere/nolimit-city", category: "Spiludvikler" },
];

// ─── Kevin – Articles ───────────────────────────────────────────────────

const kevinArticles: AuthorArticle[] = [
  // Hub-sider
  { title: "Betalingsmetoder – Komplet Guide", path: "/betalingsmetoder", category: "Guide", excerpt: "Overblik over alle betalingsmetoder hos danske online casinoer." },
  { title: "Spiludviklere – Komplet Guide", path: "/spiludviklere", category: "Guide", excerpt: "Overblik over de bedste spiludviklere til danske online casinoer." },
  { title: "Spillemyndigheden Guide", path: "/spillemyndigheden", category: "Guide", excerpt: "Alt om Spillemyndigheden og dansk casinoregulering." },
  // Betalingsmetoder
  { title: "MobilePay Casino Guide", path: "/betalingsmetoder/mobilepay", category: "Guide", excerpt: "Alt om MobilePay som betalingsmetode hos danske online casinoer." },
  { title: "Trustly Casino Guide", path: "/betalingsmetoder/trustly", category: "Guide", excerpt: "Hurtige indbetalinger og udbetalinger med Trustly." },
  { title: "Visa & Mastercard Casino Guide", path: "/betalingsmetoder/visa-mastercard", category: "Guide", excerpt: "Brug Visa eller Mastercard til sikre casino-transaktioner." },
  { title: "Skrill Casino Guide", path: "/betalingsmetoder/skrill", category: "Guide", excerpt: "Skrill som betalingsmetode hos online casinoer." },
  { title: "Apple Pay Casino Guide", path: "/betalingsmetoder/apple-pay", category: "Guide", excerpt: "Betal med Apple Pay på danske online casinoer." },
  { title: "Paysafecard Casino Guide", path: "/betalingsmetoder/paysafecard", category: "Guide", excerpt: "Anonym indbetaling med Paysafecard." },
  { title: "PayPal Casino Guide", path: "/betalingsmetoder/paypal", category: "Guide", excerpt: "PayPal som betalingsmetode hos danske casinoer." },
  { title: "Zimpler Casino Guide", path: "/betalingsmetoder/zimpler", category: "Guide", excerpt: "Zimpler – hurtig mobilbetaling til casinoer." },
  { title: "Bankoverførsel Casino Guide", path: "/betalingsmetoder/bankoverforsler", category: "Guide", excerpt: "Direkte bankoverførsel til og fra casinoer." },
  { title: "Revolut Casino Guide", path: "/betalingsmetoder/revolut", category: "Guide", excerpt: "Revolut som betalingsmetode hos online casinoer." },
  // Spiludviklere
  { title: "NetEnt – Spiludvikler Guide", path: "/spiludviklere/netent", category: "Guide", excerpt: "Alt om NetEnt – en af verdens førende spiludviklere." },
  { title: "Pragmatic Play Guide", path: "/spiludviklere/pragmatic-play", category: "Guide", excerpt: "Pragmatic Play – populære slots og live casino-spil." },
  { title: "Play'n GO Guide", path: "/spiludviklere/play-n-go", category: "Guide", excerpt: "Play'n GO – innovativ spiludvikler med dansk fokus." },
  { title: "Evolution Gaming Guide", path: "/spiludviklere/evolution-gaming", category: "Guide", excerpt: "Evolution – markedsleder inden for live casino." },
  { title: "Nolimit City Guide", path: "/spiludviklere/nolimit-city", category: "Guide", excerpt: "Nolimit City – høj volatilitet og unikke mekanikker." },
  { title: "Push Gaming Guide", path: "/spiludviklere/push-gaming", category: "Guide", excerpt: "Push Gaming – kreative slots med innovative features." },
  { title: "Hacksaw Gaming Guide", path: "/spiludviklere/hacksaw-gaming", category: "Guide", excerpt: "Hacksaw Gaming – moderne slots med høj gevinst-potentiale." },
  { title: "Relax Gaming Guide", path: "/spiludviklere/relax-gaming", category: "Guide", excerpt: "Relax Gaming – innovativ aggregator og spiludvikler." },
  { title: "Yggdrasil Guide", path: "/spiludviklere/yggdrasil", category: "Guide", excerpt: "Yggdrasil – visuel innovation og unikke spillemekanikker." },
  { title: "Microgaming Guide", path: "/spiludviklere/microgaming", category: "Guide", excerpt: "Microgaming – en af branchens ældste og mest anerkendte udviklere." },
  { title: "Red Tiger Guide", path: "/spiludviklere/red-tiger", category: "Guide", excerpt: "Red Tiger – daglige jackpots og innovative features." },
  { title: "Big Time Gaming Guide", path: "/spiludviklere/big-time-gaming", category: "Guide", excerpt: "Big Time Gaming – skaberne af Megaways-mekanikken." },
  { title: "ELK Studios Guide", path: "/spiludviklere/elk-studios", category: "Guide", excerpt: "ELK Studios – svensk kreativitet og unikke spilleoplevelser." },
  // Slot guides (Kevin)
  { title: "Big Bass Bonanza – Komplet Guide", path: "/casinospil/spillemaskiner/big-bass-bonanza", category: "Slot Guide", excerpt: "Big Bass Bonanza – fisherman-tema, free spins og money collect." },
  { title: "Gonzo's Quest – Komplet Guide", path: "/casinospil/spillemaskiner/gonzos-quest", category: "Slot Guide", excerpt: "Gonzo's Quest – avalanche-mekanik, RTP og free falls." },
  { title: "Starburst – Komplet Guide", path: "/casinospil/spillemaskiner/starburst", category: "Slot Guide", excerpt: "Starburst – expanding wilds, RTP-analyse og volatilitet." },
  { title: "Wanted Dead or a Wild – Komplet Guide", path: "/casinospil/spillemaskiner/wanted-dead-or-a-wild", category: "Slot Guide", excerpt: "Wanted Dead or a Wild – duel-feature, VS-multiplikatorer og RTP." },
  { title: "Thunderstruck II – Komplet Guide", path: "/casinospil/spillemaskiner/thunderstruck-ii", category: "Slot Guide", excerpt: "Thunderstruck II – Great Hall of Spins og fire bonusmodi." },
  { title: "Wild West Gold – Komplet Guide", path: "/casinospil/spillemaskiner/wild-west-gold", category: "Slot Guide", excerpt: "Wild West Gold – sticky wilds, free spins og volatilitetsanalyse." },
  { title: "Mega Moolah – Komplet Guide", path: "/casinospil/spillemaskiner/mega-moolah", category: "Slot Guide", excerpt: "Mega Moolah – progressiv jackpot, RTP og EV-analyse." },
  { title: "Buffalo King – Komplet Guide", path: "/casinospil/spillemaskiner/buffalo-king", category: "Slot Guide", excerpt: "Buffalo King – stacked wilds, free spins og multiplikatorer." },
  { title: "Reactoonz – Komplet Guide", path: "/casinospil/spillemaskiner/reactoonz", category: "Slot Guide", excerpt: "Reactoonz – cluster pays, quantum-features og Gargantoon." },
  { title: "Joker Strike – Komplet Guide", path: "/casinospil/spillemaskiner/joker-strike", category: "Slot Guide", excerpt: "Joker Strike – Hi Roller-mode, klassisk tema og RTP." },
  { title: "Cleopatra – Komplet Guide", path: "/casinospil/spillemaskiner/cleopatra", category: "Slot Guide", excerpt: "Cleopatra – free spins, egyptisk tema og IGT-klassiker." },
  { title: "Chaos Crew – Komplet Guide", path: "/casinospil/spillemaskiner/chaos-crew", category: "Slot Guide", excerpt: "Chaos Crew – dual-feature, wild multipliers og volatilitet." },
  { title: "Wolf Gold – Komplet Guide", path: "/casinospil/spillemaskiner/wolf-gold", category: "Slot Guide", excerpt: "Wolf Gold – Money Respin, jackpots og free spins." },
  { title: "Jammin' Jars – Komplet Guide", path: "/casinospil/spillemaskiner/jammin-jars", category: "Slot Guide", excerpt: "Jammin' Jars – cluster pays, walking wilds og multiplikatorer." },
  { title: "Divine Fortune – Komplet Guide", path: "/casinospil/spillemaskiner/divine-fortune", category: "Slot Guide", excerpt: "Divine Fortune – progressiv jackpot, free spins og falling wilds." },
  { title: "Immortal Romance – Komplet Guide", path: "/casinospil/spillemaskiner/immortal-romance", category: "Slot Guide", excerpt: "Immortal Romance – Chamber of Spins og fire bonusmodi." },
  { title: "Extra Chilli Megaways – Komplet Guide", path: "/casinospil/spillemaskiner/extra-chilli-megaways", category: "Slot Guide", excerpt: "Extra Chilli Megaways – gamble-feature, free spins og RTP." },
  { title: "Madame Destiny Megaways – Komplet Guide", path: "/casinospil/spillemaskiner/madame-destiny-megaways", category: "Slot Guide", excerpt: "Madame Destiny Megaways – ante bet, free spins og multiplikatorer." },
  { title: "Fire Joker – Komplet Guide", path: "/casinospil/spillemaskiner/fire-joker", category: "Slot Guide", excerpt: "Fire Joker – Wheel of Multipliers, respin og klassisk design." },
  // Anmeldelse
  { title: "Bedste Pokersider 2026", path: "/casinospil/poker/bedste-sider", category: "Guide", excerpt: "Sammenlign de bedste pokersider med dansk licens – bonus, rakeback og turneringer." },
  { title: "Videoslots Anmeldelse", path: "/casino-anmeldelser/videoslots", category: "Anmeldelse", excerpt: "Videoslots – kæmpe spiludvalg med unikke features." },
  // Bonus Hunt
  { title: "Bonus Hunt Live", path: "/bonus-hunt", category: "Community", excerpt: "Følg vores live bonus hunts med betting-spil og community-events." },
  { title: "Bonus Hunt Arkiv", path: "/bonus-hunt/arkiv", category: "Community", excerpt: "Komplet arkiv over alle tidligere bonus hunts med statistikker." },
  // Casino uden Konto cluster
  { title: "Casino uden Konto – Komplet Guide", path: "/casino-uden-konto", category: "Guide", excerpt: "Alt om casino uden konto i Danmark – Pay N Play, Trustly og hurtig registrering." },
  { title: "Pay N Play Guide", path: "/casino-uden-konto/pay-n-play", category: "Guide", excerpt: "Trustly Pay N Play – spil uden registrering med bankID-verifikation." },
  { title: "Hurtig Registrering Guide", path: "/casino-uden-konto/hurtig-registrering", category: "Guide", excerpt: "Sammenligning af hurtig registrering vs. traditionel kontooprettelse." },
  { title: "Fordele og Ulemper ved Casino uden Konto", path: "/casino-uden-konto/fordele-og-ulemper", category: "Guide", excerpt: "Dybdegående analyse af fordele og ulemper ved casino uden konto." },
  // Statistik & Community
  { title: "Statistik", path: "/statistik", category: "Værktøj", excerpt: "Live statistikker fra vores casino-streams og bonus hunts." },
  { title: "Highlights", path: "/highlights", category: "Community", excerpt: "De bedste øjeblikke fra vores casino-streams samlet ét sted." },
  { title: "Community Slots", path: "/community/slots", category: "Community", excerpt: "Spil community-spillemaskiner og konkurrér med andre spillere." },
];

// ─── Ajse – Static Articles ─────────────────────────────────────────────
// Note: Ajse's news articles are pulled dynamically from DB (casino_news table)

const ajseArticles: AuthorArticle[] = [
  { title: "Om Casinoaftaler.dk", path: "/om", category: "Om os", excerpt: "Om teamet bag sitet." },
  { title: "Sådan Tester Vi Casinoer", path: "/saadan-tester-vi-casinoer", category: "Guide", excerpt: "Vores testmetode og kriterier." },
  { title: "Forretningsmodel", path: "/forretningsmodel", category: "Guide", excerpt: "Sådan finansieres Casinoaftaler.dk." },
  { title: "Redaktionel Politik", path: "/redaktionel-politik", category: "Guide", excerpt: "Casinoaftaler.dk's retningslinjer." },
  { title: "Ansvarligt Spil", path: "/ansvarligt-spil", category: "Guide", excerpt: "Ressourcer til ansvarligt spil." },
  { title: "ROFUS – Selvudelukkelse", path: "/ansvarligt-spil/rofus", category: "Guide", excerpt: "Komplet guide til ROFUS og selvudelukkelse fra danske casinoer." },
  { title: "Ludomani – Spilleafhængighed", path: "/ansvarligt-spil/ludomani", category: "Guide", excerpt: "Dybdegående guide til ludomani og spilleafhængighed i Danmark." },
  { title: "StopSpillet – Gratis Rådgivning", path: "/ansvarligt-spil/stopspillet", category: "Guide", excerpt: "Guide til StopSpillet og gratis rådgivning for spillere og pårørende." },
  { title: "Spillegrænser – Komplet Guide", path: "/ansvarligt-spil/spillegraenser", category: "Guide", excerpt: "Alt om indbetalingsgrænser, tidsgrænser og tabsgrænser." },
  { title: "Selvudelukkelse – ROFUS og Alle Muligheder", path: "/ansvarligt-spil/selvudelukkelse-guide", category: "Guide", excerpt: "Step-by-step guide til selvudelukkelse via ROFUS og casinoernes egne værktøjer." },
  { title: "Hjælpelinjer for Spilleproblemer", path: "/ansvarligt-spil/hjaelpelinjer", category: "Guide", excerpt: "Samlet oversigt over alle danske hjælpemuligheder for spilleproblemer." },
  { title: "Casino Licenser", path: "/casino-licenser", category: "Guide", excerpt: "Guide til danske casinolicenser." },
  { title: "Spillemyndigheden", path: "/spillemyndigheden", category: "Guide", excerpt: "Danmarks regulering af online spil." },
  { title: "Kontakt", path: "/kontakt", category: "Guide", excerpt: "Kontakt Casinoaftaler.dk." },
  { title: "Casino Nyheder", path: "/casino-nyheder", category: "Nyheder", excerpt: "Seneste nyheder fra branchen." },
];

// ─── Niklas – Articles ───────────────────────────────────────────────────

const niklasArticles: AuthorArticle[] = [
  // Bonusøkonomi & EV (moved from Jonas)
  { title: "Omsætningskrav Forklaret", path: "/omsaetningskrav", category: "Guide", excerpt: "Forstå omsætningskrav og lær at vælge bonusser med lave krav." },
  { title: "No Sticky Bonus Guide", path: "/no-sticky-bonus", category: "Guide", excerpt: "Alt om no-sticky bonusser og hvorfor de er populære blandt spillere." },
  { title: "Velkomstbonus Guide 2026", path: "/velkomstbonus", category: "Guide", excerpt: "Find de bedste velkomstbonusser og forstå vilkår og betingelser." },
  { title: "Free Spins Guide", path: "/free-spins", category: "Guide", excerpt: "Alt om free spins – typer, vilkår og de bedste tilbud." },
  { title: "Bonus Uden Indbetaling", path: "/bonus-uden-indbetaling", category: "Guide", excerpt: "Få casino bonus helt uden at indsætte penge – se aktuelle tilbud." },
  { title: "Bonus Uden Omsætningskrav", path: "/bonus-uden-omsaetningskrav", category: "Guide", excerpt: "Find bonusser uden omsætningskrav hos danske casinoer." },
  { title: "Indskudsbonus Guide", path: "/indskudsbonus", category: "Guide", excerpt: "Alt om indskudsbonusser – typer, vilkår og de bedste tilbud." },
  { title: "Sticky Bonus Guide", path: "/sticky-bonus", category: "Guide", excerpt: "Forstå sticky bonusser og forskellen til no-sticky." },
  { title: "Reload Bonus Guide", path: "/reload-bonus", category: "Guide", excerpt: "Alt om reload bonusser – hvad de er og de bedste tilbud." },
  { title: "Cashback Bonus Guide", path: "/cashback-bonus", category: "Guide", excerpt: "Cashback bonusser forklaret – få penge retur på dine tab." },
  // Finans
  { title: "Casino og Skat Guide", path: "/casinoer/casino-og-skat", category: "Guide", excerpt: "Alt om skat på casinogevinster i Danmark." },
  { title: "Forretningsmodel", path: "/forretningsmodel", category: "Guide", excerpt: "Sådan finansieres Casinoaftaler.dk." },
];

// ─── Public API ─────────────────────────────────────────────────────────

/**
 * Get all articles for a given author.
 * Jonas's list automatically includes glossary terms.
 */
export function getAuthorArticles(author: AuthorId): AuthorArticle[] {
  switch (author) {
    case "jonas":
      return [...jonasArticles, ...jonasGlossaryArticles];
    case "kevin":
      return kevinArticles;
    case "ajse":
      return ajseArticles;
    case "niklas":
      return niklasArticles;
  }
}

/** Get casino review videos for an author */
export function getAuthorReviewVideos(author: AuthorId): AuthorVideo[] {
  switch (author) {
    case "jonas":
      return jonasReviewVideos;
    case "kevin":
    case "ajse":
    case "niklas":
      return [];
  }
}

/** Get YouTube guide videos for an author */
export function getAuthorGuideVideos(author: AuthorId): AuthorVideo[] {
  switch (author) {
    case "jonas":
      return jonasGuideVideos;
    case "kevin":
    case "ajse":
    case "niklas":
      return [];
  }
}

/** Get all video IDs for JSON-LD schema */
export function getAuthorAllVideos(author: AuthorId): { id: string; title: string }[] {
  const reviewVideos = getAuthorReviewVideos(author).map((v) => ({ id: v.videoId, title: v.title }));
  const guideVideos = getAuthorGuideVideos(author).map((v) => ({ id: v.videoId, title: v.title }));
  return [...guideVideos, ...reviewVideos];
}
