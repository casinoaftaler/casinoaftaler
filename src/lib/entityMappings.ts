/**
 * Entity mapping data for the auto-linker.
 * Separated from logic for maintainability.
 */

export interface EntityMapping {
  patterns: RegExp[];
  href: string;
  anchor: string;
  /** Optional anchor variants for diversity across pages. If set, autoLinker picks one based on content hash. */
  anchorVariants?: string[];
}

export const ENTITY_MAPPINGS: EntityMapping[] = [
  // ══════════════════════════════════════════════════════════════════
  // ── MONEY-PAGE ENTITIES (highest priority – listed first) ───────
  // ══════════════════════════════════════════════════════════════════

  // Casino Brand entities (top-10 most mentioned)
  { patterns: [/\bSpilDanskNu\b/], href: "/casino-anmeldelser/spildansknu", anchor: "SpilDanskNu" },
  { patterns: [/\bLeoVegas\b/], href: "/casino-anmeldelser/leovegas", anchor: "LeoVegas" },
  { patterns: [/\bUnibet\b/], href: "/casino-anmeldelser/unibet", anchor: "Unibet" },
  { patterns: [/\bbet365\b/], href: "/casino-anmeldelser/bet365", anchor: "bet365" },
  { patterns: [/\bDanske Spil Casino\b/i, /\bDanske Spil\b/], href: "/casino-anmeldelser/danske-spil", anchor: "" },
  { patterns: [/\bMr Green\b/i], href: "/casino-anmeldelser/mr-green", anchor: "Mr Green" },
  { patterns: [/\bComeOn Casino\b/i, /\bComeOn\b/], href: "/casino-anmeldelser/comeon", anchor: "" },
  { patterns: [/\bBetinia\b/], href: "/casino-anmeldelser/betinia", anchor: "Betinia" },
  { patterns: [/\bCampobet\b/], href: "/casino-anmeldelser/campobet", anchor: "Campobet" },
  { patterns: [/\bNordicBet\b/], href: "/casino-anmeldelser/nordicbet", anchor: "NordicBet" },
  { patterns: [/\bSpilnu\b/], href: "/casino-anmeldelser/spilnu", anchor: "Spilnu" },
  { patterns: [/\bVideoslots\b/], href: "/casino-anmeldelser/videoslots", anchor: "Videoslots" },
  { patterns: [/\bPokerStars\b/], href: "/casino-anmeldelser/pokerstars", anchor: "PokerStars" },
  { patterns: [/\bbwin\b/], href: "/casino-anmeldelser/bwin", anchor: "bwin" },
  { patterns: [/\bSpilleautomaten\b/], href: "/casino-anmeldelser/spilleautomaten", anchor: "Spilleautomaten" },
  { patterns: [/\bSwift Casino\b/i], href: "/casino-anmeldelser/swift-casino", anchor: "Swift Casino" },
  { patterns: [/\bLuna Casino\b/i], href: "/casino-anmeldelser/luna-casino", anchor: "Luna Casino" },
  { patterns: [/\bGetLucky\b/], href: "/casino-anmeldelser/getlucky", anchor: "GetLucky" },
  { patterns: [/\bMr Vegas\b/i], href: "/casino-anmeldelser/mr-vegas", anchor: "Mr Vegas" },
  { patterns: [/\bExpekt\b/], href: "/casino-anmeldelser/expekt", anchor: "Expekt" },
  { patterns: [/\bBetano\b/], href: "/casino-anmeldelser/betano", anchor: "Betano" },
  { patterns: [/\b888 Casino\b/i, /\b888casino\b/i], href: "/casino-anmeldelser/888-casino", anchor: "888 Casino" },
  { patterns: [/\bRoyal Casino\b/i], href: "/casino-anmeldelser/royal-casino", anchor: "Royal Casino" },
  { patterns: [/\bMaria Casino\b/i], href: "/casino-anmeldelser/maria-casino", anchor: "Maria Casino" },
  { patterns: [/\bKapow Casino\b/i], href: "/casino-anmeldelser/kapow-casino", anchor: "Kapow Casino" },
  { patterns: [/\bOne Casino\b/i], href: "/casino-anmeldelser/one-casino", anchor: "One Casino" },
  { patterns: [/\bCasinostuen\b/], href: "/casino-anmeldelser/casinostuen", anchor: "Casinostuen" },
  { patterns: [/\bMarathonBet\b/i], href: "/casino-anmeldelser/marathonbet", anchor: "MarathonBet" },
  { patterns: [/\bStake Casino\b/i, /\bStake\b/], href: "/casino-anmeldelser/stake", anchor: "Stake" },

  // Community data-hubs
  { patterns: [/\bbonus hunt statistik\b/i, /\bhunt[\s-]?statistik\b/i], href: "/statistik", anchor: "bonus hunt statistik" },
  { patterns: [/\bbonus hunt arkiv\b/i, /\bhunt[\s-]?arkiv\b/i], href: "/bonus-hunt/arkiv", anchor: "", anchorVariants: ["bonus hunt arkivet", "arkivet", "vores hunt-arkiv"] },
  { patterns: [/\bbonus[\s-]?hunt\b/i, /\bbonushunt\b/i], href: "/bonus-hunt", anchor: "", anchorVariants: ["bonus hunt", "live bonus hunt", "vores bonus hunts"] },
  { patterns: [/\bspillehal\b/i, /\bgratis spillehal\b/i, /\bgratis slots\b/i], href: "/community/slots", anchor: "", anchorVariants: ["gratis spillehal", "vores spillehal", "prøv gratis slots"] },
  { patterns: [/\bstream highlights\b/i, /\bbedste clips\b/i], href: "/highlights", anchor: "", anchorVariants: ["highlights", "stream highlights", "bedste clips"] },
  { patterns: [/\bslot[\s-]?turneringer\b/i, /\bturneringer\b/i], href: "/community/turneringer", anchor: "", anchorVariants: ["turneringer", "community turneringer", "slot turneringer"] },
  { patterns: [/\bhall of fame\b/i, /\bleaderboard\b/i], href: "/community/hall-of-fame", anchor: "", anchorVariants: ["Hall of Fame", "community leaderboard", "vores Hall of Fame"] },
  { patterns: [/\brewards[\s-]?program\b/i], href: "/community/rewards", anchor: "", anchorVariants: ["rewards program", "vores belønningsprogram"] },

  // Hub-termer (nævnes ofte men var ikke i auto-linker)
  { patterns: [/\bbetalingsmetoder\b/i], href: "/betalingsmetoder", anchor: "" },
  { patterns: [/\bspiludviklere\b/i], href: "/spiludviklere", anchor: "" },
  { patterns: [/\bcasinospil\b/i], href: "/casinospil", anchor: "" },
  { patterns: [/\bcasino[\s-]?kategorier\b/i, /\bcasino[\s-]?typer\b/i], href: "/casinoer", anchor: "" },

  // Live casino game shows
  { patterns: [/\bCrazy Time\b/], href: "/live-casino/crazy-time", anchor: "Crazy Time" },
  { patterns: [/\bDream Catcher\b/], href: "/live-casino/dream-catcher", anchor: "Dream Catcher" },
  { patterns: [/\bDeal or No Deal\b/], href: "/live-casino/deal-or-no-deal", anchor: "Deal or No Deal" },

  // Bankoverførsler
  { patterns: [/\bbankoverførsel\b/i, /\bbankoverførsler\b/i, /\bbankoverforsler\b/i], href: "/betalingsmetoder/bankoverforsler", anchor: "" },

  // Bonus cluster money-pages
  { patterns: [/\bomsætningskrav\b/i, /\bomsaetningskrav\b/i, /\bwagering[\s-]?krav\b/i], href: "/omsaetningskrav", anchor: "" },
  { patterns: [/\bfree spins\b/i, /\bgratis spins\b/i], href: "/free-spins", anchor: "", anchorVariants: ["free spins", "gratis spins", "free spins tilbud", "free spins bonusser"] },
  { patterns: [/\bcasino bonus\b/i, /\bcasinobonus\b/i], href: "/casino-bonus", anchor: "", anchorVariants: ["casino bonus", "casinobonusser", "bedste casino bonus", "casino bonustilbud"] },
  { patterns: [/\bvelkomstbonus\b/i, /\bvelkomst-bonus\b/i], href: "/velkomstbonus", anchor: "", anchorVariants: ["velkomstbonus", "velkomstbonusser", "bedste velkomstbonus"] },
  { patterns: [/\bindskudsbonus\b/i, /\bindskuds-bonus\b/i], href: "/indskudsbonus", anchor: "" },
  { patterns: [/\bbonus uden omsætningskrav\b/i, /\bbonus uden omsaetningskrav\b/i], href: "/bonus-uden-omsaetningskrav", anchor: "" },
  { patterns: [/\bno[\s-]?sticky bonus\b/i], href: "/no-sticky-bonus", anchor: "" },
  { patterns: [/\bsticky bonus\b/i], href: "/sticky-bonus", anchor: "" },
  { patterns: [/\bcashback bonus\b/i, /\bcashback-bonus\b/i], href: "/cashback-bonus", anchor: "" },
  { patterns: [/\breload bonus\b/i, /\breload-bonus\b/i], href: "/reload-bonus", anchor: "" },

  // Casino uden konto
  { patterns: [/\bcasino uden konto\b/i, /\bcasino uden registrering\b/i], href: "/casino-uden-konto", anchor: "" },
  { patterns: [/\bPay N Play\b/], href: "/casino-uden-konto/pay-n-play", anchor: "Pay N Play" },
  { patterns: [/\bhurtig registrering\b/i], href: "/casino-uden-konto/hurtig-registrering", anchor: "" },

  // Casino-liste money-pages
  { patterns: [/\bnye casinoer\b/i], href: "/nye-casinoer", anchor: "", anchorVariants: ["nye casinoer", "nye danske casinoer", "nyeste casinoer i Danmark"] },
  { patterns: [/\bcasino med MobilePay\b/i, /\bMobilePay casino\b/i], href: "/casino-med-mobilepay", anchor: "", anchorVariants: ["casino med MobilePay", "MobilePay casinoer", "casinoer med MobilePay"] },
  { patterns: [/\btop 10 casino\b/i, /\btop[\s-]?10 online casino\b/i, /\bbedste casino 2026\b/i], href: "/top-10-casino-online", anchor: "", anchorVariants: ["top 10 casino online", "bedste online casinoer", "top 10 casinoer"] },
  { patterns: [/\bVIP[\s-]?program\b/i, /\bVIP[\s-]?bonus\b/i, /\blojalitetsprogram\b/i], href: "/vip-program", anchor: "", anchorVariants: ["VIP program", "VIP-program", "casino loyalitetsprogram", "VIP bonus"] },
  { patterns: [/\bdansk licens\b/i, /\bdanske licenser\b/i], href: "/casino-licenser", anchor: "" },
  { patterns: [/\bhvidvask(?:regler|lovgivning|ning)?\b/i, /\bAML\b/], href: "/casino-licenser", anchor: "" },

  // Casinospil hub money-pages
  { patterns: [/\bspillemaskiner\b/i], href: "/casinospil/spillemaskiner", anchor: "" },
  { patterns: [/\bblackjack\b/i], href: "/casinospil/blackjack", anchor: "" },
  { patterns: [/\broulette\b/i], href: "/casinospil/roulette", anchor: "" },

  // Trust & compliance
  { patterns: [/\bSpillemyndigheden\b/], href: "/spillemyndigheden", anchor: "Spillemyndigheden" },
  { patterns: [/\bROFUS\b/], href: "/ansvarligt-spil/rofus", anchor: "ROFUS" },
  { patterns: [/\bansvarligt spil\b/i], href: "/ansvarligt-spil", anchor: "ansvarligt spil" },

  // Ansvarligt Spil spokes
  { patterns: [/\bludomani\b/i, /\bspilleafhængighed\b/i, /\bspilafhaengighed\b/i], href: "/ansvarligt-spil/ludomani", anchor: "" },
  { patterns: [/\bStopSpillet\b/], href: "/ansvarligt-spil/stopspillet", anchor: "StopSpillet" },
  { patterns: [/\bspillegrænser\b/i, /\bindbetalingsgrænse\b/i, /\bindbetalingsgraense\b/i], href: "/ansvarligt-spil/spillegraenser", anchor: "" },
  { patterns: [/\bselvudelukkelse\b/i], href: "/ansvarligt-spil/selvudelukkelse-guide", anchor: "" },
  { patterns: [/\bhjælpelinjer\b/i, /\bhjaelpelinjer\b/i], href: "/ansvarligt-spil/hjaelpelinjer", anchor: "" },

  // Payment money-pages
  { patterns: [/\bTrustly\b/], href: "/betalingsmetoder/trustly", anchor: "Trustly" },
  { patterns: [/\bMobilePay\b/], href: "/betalingsmetoder/mobilepay", anchor: "MobilePay" },
  { patterns: [/\bPayPal\b/], href: "/betalingsmetoder/paypal", anchor: "PayPal" },
  { patterns: [/\bVisa\b/, /\bMastercard\b/], href: "/betalingsmetoder/visa-mastercard", anchor: "" },
  { patterns: [/\bSkrill\b/], href: "/betalingsmetoder/skrill", anchor: "Skrill" },
  { patterns: [/\bPaysafecard\b/i], href: "/betalingsmetoder/paysafecard", anchor: "" },
  { patterns: [/\bApple Pay\b/], href: "/betalingsmetoder/apple-pay", anchor: "Apple Pay" },
  { patterns: [/\bZimpler\b/], href: "/betalingsmetoder/zimpler", anchor: "Zimpler" },
  { patterns: [/\bRevolut\b/], href: "/betalingsmetoder/revolut", anchor: "Revolut" },

  // Spiludviklere money-pages
  { patterns: [/\bEvolution Gaming\b/i, /\bEvolution\b/], href: "/spiludviklere/evolution-gaming", anchor: "Evolution Gaming", anchorVariants: ["Evolution Gaming", "Evolution", "Evolution Gaming live casino"] },
  { patterns: [/\bPragmatic Play\b/i], href: "/spiludviklere/pragmatic-play", anchor: "Pragmatic Play", anchorVariants: ["Pragmatic Play", "Pragmatic Play slots", "Pragmatic Play spillemaskiner"] },
  { patterns: [/\bNetEnt\b/], href: "/spiludviklere/netent", anchor: "NetEnt", anchorVariants: ["NetEnt", "NetEnt slots", "NetEnt spillemaskiner"] },
  { patterns: [/\bPlay'?n.?GO\b/i, /\bPlay n Go\b/i], href: "/spiludviklere/play-n-go", anchor: "Play'n GO", anchorVariants: ["Play'n GO", "Play n GO slots", "Play'n GO spillemaskiner"] },
  { patterns: [/\bHacksaw Gaming\b/i], href: "/spiludviklere/hacksaw-gaming", anchor: "Hacksaw Gaming", anchorVariants: ["Hacksaw Gaming", "Hacksaw Gaming slots", "Hacksaw"] },
  { patterns: [/\bNolimit City\b/i, /\bNoLimit City\b/i], href: "/spiludviklere/nolimit-city", anchor: "Nolimit City", anchorVariants: ["Nolimit City", "NoLimit City slots", "Nolimit City spillemaskiner"] },
  { patterns: [/\bBig Time Gaming\b/i], href: "/spiludviklere/big-time-gaming", anchor: "Big Time Gaming", anchorVariants: ["Big Time Gaming", "BTG slots", "Big Time Gaming Megaways"] },
  { patterns: [/\bRed Tiger Gaming\b/i, /\bRed Tiger\b/i], href: "/spiludviklere/red-tiger", anchor: "Red Tiger Gaming", anchorVariants: ["Red Tiger Gaming", "Red Tiger", "Red Tiger Gaming slots"] },
  { patterns: [/\bELK Studios\b/i], href: "/spiludviklere/elk-studios", anchor: "ELK Studios", anchorVariants: ["ELK Studios", "ELK Studios slots", "ELK Studios spillemaskiner"] },
  { patterns: [/\bYggdrasil Gaming\b/i, /\bYggdrasil\b/], href: "/spiludviklere/yggdrasil", anchor: "Yggdrasil Gaming", anchorVariants: ["Yggdrasil Gaming", "Yggdrasil", "Yggdrasil Gaming slots"] },
  { patterns: [/\bMicrogaming\b/], href: "/spiludviklere/microgaming", anchor: "Microgaming", anchorVariants: ["Microgaming", "Microgaming slots", "Microgaming spillemaskiner"] },
  { patterns: [/\bRelax Gaming\b/i], href: "/spiludviklere/relax-gaming", anchor: "Relax Gaming", anchorVariants: ["Relax Gaming", "Relax Gaming slots", "Dream Drop jackpot"] },
  { patterns: [/\bThunderkick\b/], href: "/spiludviklere/thunderkick", anchor: "Thunderkick", anchorVariants: ["Thunderkick", "Thunderkick slots", "Thunderkick spillemaskiner"] },
  { patterns: [/\bBlueprint Gaming\b/i], href: "/spiludviklere/blueprint-gaming", anchor: "Blueprint Gaming", anchorVariants: ["Blueprint Gaming", "Blueprint Gaming slots", "Blueprint"] },
  { patterns: [/\bPush Gaming\b/i], href: "/spiludviklere/push-gaming", anchor: "Push Gaming", anchorVariants: ["Push Gaming", "Push Gaming slots", "Push Gaming spillemaskiner"] },
  { patterns: [/\bQuickspin\b/], href: "/spiludviklere/quickspin", anchor: "Quickspin", anchorVariants: ["Quickspin", "Quickspin slots", "Quickspin spillemaskiner"] },
  { patterns: [/\biSoftBet\b/i], href: "/spiludviklere/isoftbet", anchor: "iSoftBet", anchorVariants: ["iSoftBet", "iSoftBet slots", "iSoftBet spillemaskiner"] },
  { patterns: [/\bBetsoft\b/i], href: "/spiludviklere/betsoft", anchor: "Betsoft", anchorVariants: ["Betsoft", "Betsoft Gaming", "Betsoft slots"] },
  { patterns: [/\bWazdan\b/], href: "/spiludviklere/wazdan", anchor: "Wazdan", anchorVariants: ["Wazdan", "Wazdan slots", "Wazdan spillemaskiner"] },
  { patterns: [/\bEndorphina\b/], href: "/spiludviklere/endorphina", anchor: "Endorphina", anchorVariants: ["Endorphina", "Endorphina slots", "Endorphina spillemaskiner"] },
  { patterns: [/\bStakelogic\b/], href: "/spiludviklere/stakelogic", anchor: "Stakelogic", anchorVariants: ["Stakelogic", "Stakelogic slots", "Stakelogic Live"] },
  { patterns: [/\bBooming Games\b/i], href: "/spiludviklere/booming-games", anchor: "Booming Games", anchorVariants: ["Booming Games", "Booming Games slots", "Booming"] },

  // Game type money-pages
  { patterns: [/\blive blackjack\b/i], href: "/live-casino/blackjack", anchor: "" },
  { patterns: [/\blive roulette\b/i], href: "/live-casino/roulette", anchor: "" },
  { patterns: [/\blightning roulette\b/i], href: "/live-casino/lightning-roulette", anchor: "" },
  { patterns: [/\blive baccarat\b/i], href: "/live-casino/baccarat", anchor: "" },
  { patterns: [/\blive casino\b/i, /\blive-casino\b/i], href: "/live-casino", anchor: "" },
  { patterns: [/\bpoker\b/i], href: "/casinospil/poker", anchor: "" },
  { patterns: [/\bbaccarat\b/i], href: "/casinospil/baccarat", anchor: "" },
  { patterns: [/\bcraps\b/i], href: "/casinospil/craps", anchor: "" },
  { patterns: [/\bgame shows?\b/i, /\btv[\s-]?spil\b/i], href: "/live-casino/game-shows", anchor: "" },

  // Slot kategori money-pages
  { patterns: [/\bmegaways slots?\b/i, /\bmegaways spillemaskiner\b/i], href: "/megaways-slots", anchor: "" },
  { patterns: [/\bjackpot slots?\b/i, /\bprogressive? jackpot slots?\b/i], href: "/jackpot-slots", anchor: "" },
  { patterns: [/\bbonus buy slots?\b/i, /\bfeature buy slots?\b/i], href: "/bonus-buy-slots", anchor: "" },

  // Additional bonus
  { patterns: [/\bbonus uden indbetaling\b/i], href: "/bonus-uden-indbetaling", anchor: "" },
  { patterns: [/\bfree spins i dag\b/i, /\bgratis spins i dag\b/i, /\bdagens free spins\b/i], href: "/free-spins-i-dag", anchor: "", anchorVariants: ["free spins i dag", "dagens free spins", "daglige free spins tilbud"] },
  { patterns: [/\bbedste pokersider\b/i, /\bbedste poker sider\b/i], href: "/casinospil/poker/bedste-sider", anchor: "", anchorVariants: ["bedste pokersider", "top pokersider", "bedste poker sider i Danmark"] },
  { patterns: [/\bcasino nyheder\b/i, /\bcasinonyheder\b/i], href: "/casino-nyheder", anchor: "", anchorVariants: ["casino nyheder", "seneste casino nyheder", "casino nyheder Danmark"] },
  

  // Mobil Casino cluster
  { patterns: [/\bmobil casino\b/i, /\bcasino på mobilen\b/i, /\bmobilcasino\b/i], href: "/mobil-casino", anchor: "" },
  { patterns: [/\bcasino app\b/i, /\bcasino apps\b/i, /\bcasino-app\b/i], href: "/casino-app", anchor: "" },
  { patterns: [/\bcasino på iphone\b/i, /\biphone casino\b/i], href: "/mobil-casino/iphone", anchor: "" },
  { patterns: [/\bcasino på android\b/i, /\bandroid casino\b/i], href: "/mobil-casino/android", anchor: "" },
  { patterns: [/\bcasino på tablet\b/i, /\btablet casino\b/i], href: "/mobil-casino/tablet", anchor: "" },

  // Slot-kategori udvidelser
  { patterns: [/\bhøj RTP\b/i, /\bhoej RTP\b/i, /\bhøj tilbagebetaling\b/i], href: "/casinospil/spillemaskiner/hoej-rtp", anchor: "" },
  { patterns: [/\bhøj volatilitet\b/i, /\bhoej volatilitet\b/i], href: "/ordbog/volatilitet", anchor: "" },
  { patterns: [/\blav volatilitet\b/i], href: "/ordbog/volatilitet", anchor: "" },
  { patterns: [/\bbonus spins\b/i, /\bbonusspins\b/i], href: "/free-spins", anchor: "" },
  { patterns: [/\bdrop[\s-]?and[\s-]?wins?\b/i], href: "/spiludviklere/pragmatic-play", anchor: "" },
  { patterns: [/\btumble[\s-]?feature\b/i], href: "/ordbog/cascading-wins", anchor: "" },
  { patterns: [/\bslot[\s-]?database\b/i, /\bslot-database\b/i], href: "/slot-database", anchor: "slot database", anchorVariants: ["slot database", "slot oversigt", "spillemaskin-database", "vores slot database"] },
  { patterns: [/\bMonopoly Live\b/i], href: "/live-casino/monopoly-live", anchor: "Monopoly Live" },

  // ══════════════════════════════════════════════════════════════════
  // ── GLOSSARY ENTITIES (informational support – lower priority) ──
  // ══════════════════════════════════════════════════════════════════
  { patterns: [/\bRTP\b/], href: "/ordbog/rtp", anchor: "RTP" },
  { patterns: [/\bvolatilitet\b/i, /\bvarians\b/i], href: "/ordbog/volatilitet", anchor: "" },
  { patterns: [/\bhouse edge\b/i], href: "/ordbog/house-edge", anchor: "" },
  { patterns: [/\bjackpot\b/i], href: "/ordbog/jackpot", anchor: "" },
  { patterns: [/\bRNG\b/, /\brandom number generator\b/i, /\btilfældighedsgenerator\b/i], href: "/ordbog/rng", anchor: "" },
  { patterns: [/\bbonusrunde\b/i, /\bbonus[\s-]?runde\b/i], href: "/ordbog/bonus-runde", anchor: "" },
  { patterns: [/\bmultiplikator\b/i, /\bmultiplier\b/i], href: "/ordbog/multiplikator", anchor: "" },
  { patterns: [/\bmax[\s-]?bet\b/i], href: "/ordbog/max-bet", anchor: "" },
  { patterns: [/\bautoplay\b/i, /\bauto[\s-]?spin\b/i], href: "/ordbog/autoplay", anchor: "" },
  { patterns: [/\bscatter[\s-]?symbol\b/i, /\bscatter\b/i], href: "/ordbog/scatter", anchor: "" },
  { patterns: [/\bwild[\s-]?symbol\b/i], href: "/ordbog/wild", anchor: "" },
  { patterns: [/\bgevinstlinjer\b/i, /\bpaylines\b/i], href: "/ordbog/paylines", anchor: "" },
  { patterns: [/\bhit frequency\b/i, /\bhit-frequency\b/i], href: "/ordbog/hit-frequency", anchor: "" },
  { patterns: [/\bcascading wins\b/i, /\btumble[\s-]?wins\b/i, /\bavalanche[\s-]?wins\b/i], href: "/ordbog/cascading-wins", anchor: "" },
  { patterns: [/\bmegaways\b/i], href: "/megaways-slots", anchor: "" },
  { patterns: [/\bgamble[\s-]?feature\b/i, /\brisikospil\b/i], href: "/ordbog/gamble-feature", anchor: "" },
  { patterns: [/\bbuy[\s-]?bonus\b/i, /\bbonus[\s-]?buy\b/i, /\bfeature[\s-]?buy\b/i], href: "/ordbog/buy-bonus", anchor: "" },
  { patterns: [/\bbankroll[\s-]?management\b/i], href: "/ordbog/bankroll-management", anchor: "" },
  { patterns: [/\bcluster[\s-]?pays\b/i, /\bklynge[\s-]?gevinst\b/i], href: "/ordbog/cluster-pays", anchor: "" },
  { patterns: [/\bexpanding[\s-]?wild\b/i], href: "/ordbog/expanding-wild", anchor: "" },
  { patterns: [/\bretrigger\b/i], href: "/ordbog/retrigger", anchor: "" },
  { patterns: [/\bKYC\b/, /\bknow your customer\b/i], href: "/ordbog/kyc", anchor: "" },
  { patterns: [/\bgamification\b/i], href: "/ordbog/gamification", anchor: "" },
  { patterns: [/\bexpected value\b/i, /\bforventet værdi\b/i], href: "/ordbog/expected-value", anchor: "" },
  { patterns: [/\bspillicens\b/i, /\bcasino[\s-]?licens\b/i], href: "/ordbog/spillicens", anchor: "" },
  { patterns: [/\bminimum indbetaling\b/i, /\bmin\.? indbetaling\b/i], href: "/ordbog/minimum-indbetaling", anchor: "" },
  { patterns: [/\bstacked wilds?\b/i], href: "/ordbog/stacked-wilds", anchor: "" },
  { patterns: [/\bsticky wilds?\b/i], href: "/ordbog/sticky-wilds", anchor: "" },
  { patterns: [/\bwalking wilds?\b/i], href: "/ordbog/walking-wilds", anchor: "" },
  { patterns: [/\bhold[\s-]?and[\s-]?spin\b/i], href: "/ordbog/hold-and-spin", anchor: "" },
  { patterns: [/\binfinity reels\b/i], href: "/ordbog/infinity-reels", anchor: "" },
  { patterns: [/\bxWays\b/, /\bx[\s-]?Ways\b/i], href: "/ordbog/xways", anchor: "" },
  { patterns: [/\bxNudge\b/, /\bx[\s-]?Nudge\b/i], href: "/ordbog/xnudge", anchor: "" },
  { patterns: [/\bante[\s-]?bet\b/i], href: "/ordbog/ante-bet", anchor: "" },
  { patterns: [/\bwin[\s-]?cap\b/i], href: "/ordbog/win-cap", anchor: "" },
  { patterns: [/\brisk of ruin\b/i], href: "/ordbog/risk-of-ruin", anchor: "" },
  { patterns: [/\bside[\s-]?bet\b/i], href: "/ordbog/side-bet", anchor: "" },
];
