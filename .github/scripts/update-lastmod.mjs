/**
 * Content-aware lastmod updater for seoRoutes.ts
 *
 * Only updates lastmod when actual page content files change.
 * Preserves stagger integrity (max 5 updates per run).
 * Supports [force-lastmod] override in commit messages.
 *
 * Usage: node .github/scripts/update-lastmod.mjs
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

// ── Configuration ──────────────────────────────────────────────

const SEOROUTES_PATH = "src/lib/seoRoutes.ts";
const MAX_UPDATES_PER_RUN = 5;

/**
 * Only files matching these prefixes count as "content changes".
 * Component refactors, hooks, utils, styles etc. are ignored.
 */
const CONTENT_PATHS = [
  "src/pages/",
];

/**
 * Files matching these patterns are ALWAYS ignored, even inside content paths.
 * These are infrastructure/layout files, not content.
 */
const IGNORE_PATTERNS = [
  /src\/pages\/Auth\.tsx$/,
  /src\/pages\/AuthCallback\.tsx$/,
  /src\/pages\/Admin\.tsx$/,
  /src\/pages\/Profile\.tsx$/,
  /src\/pages\/PublicProfile\.tsx$/,
  /src\/pages\/NotFound\.tsx$/,
  /src\/pages\/SlotMachine\.tsx$/,
  /src\/pages\/SpinTheReel\.tsx$/,
  /src\/pages\/GatesOfFedesvin\.tsx$/,
  /src\/pages\/RiseOfFedesvin\.tsx$/,
  /src\/pages\/BonusHunt\.tsx$/,
  /src\/pages\/Leaderboard\.tsx$/,
  /src\/pages\/RewardsProgram\.tsx$/,
  /src\/pages\/Shop\.tsx$/,
  /src\/pages\/GameLibrary\.tsx$/,
];

// ── File → Route mapping ───────────────────────────────────────
// Maps page file paths to their seoRoutes path.
// Built from App.tsx route definitions.

const FILE_TO_ROUTE = {
  // Forside
  "src/pages/Index.tsx": "/",

  // Top lists
  "src/pages/TopCasinoOnline.tsx": "/top-10-casino-online",

  // Nye casinoer
  "src/pages/NyeCasinoer.tsx": "/nye-casinoer",
  "src/pages/nye-casinoer/NyeCasinoer2026.tsx": "/nye-casinoer/2026",
  "src/pages/nye-casinoer/NyeCasinoerDanskLicens.tsx": "/nye-casinoer/dansk-licens",
  "src/pages/nye-casinoer/NyeCasinoerUdenRofus.tsx": "/nye-casinoer/uden-rofus",
  "src/pages/nye-casinoer/NyeCasinoerHurtigUdbetaling.tsx": "/nye-casinoer/hurtig-udbetaling",
  "src/pages/nye-casinoer/NyeCasinoerBonusUdenIndbetaling.tsx": "/nye-casinoer/bonus-uden-indbetaling",
  "src/pages/nye-casinoer/NyeCasinoerTrustly.tsx": "/nye-casinoer/trustly",
  "src/pages/nye-casinoer/NyeCasinoerMitID.tsx": "/nye-casinoer/mitid",
  "src/pages/nye-casinoer/NyeCasinoerLavWagering.tsx": "/nye-casinoer/lav-wagering",
  "src/pages/nye-casinoer/BedsteNyeCasinoer.tsx": "/nye-casinoer/bedste",
  "src/pages/nye-casinoer/NyeVsEtablerede.tsx": "/nye-casinoer/vs-etablerede",

  // Casino anmeldelser
  "src/pages/CasinoAnmeldelser.tsx": "/casino-anmeldelser",
  "src/pages/SpilleautomatenAnmeldelse.tsx": "/casino-anmeldelser/spilleautomaten",
  "src/pages/CampobetAnmeldelse.tsx": "/casino-anmeldelser/campobet",
  "src/pages/BetiniaAnmeldelse.tsx": "/casino-anmeldelser/betinia",
  "src/pages/SwiftCasinoAnmeldelse.tsx": "/casino-anmeldelser/swift-casino",
  "src/pages/LunaCasinoAnmeldelse.tsx": "/casino-anmeldelser/luna-casino",
  "src/pages/SpilDanskNuAnmeldelse.tsx": "/casino-anmeldelser/spildansknu",
  "src/pages/DanskeSpilAnmeldelse.tsx": "/casino-anmeldelser/danske-spil",
  "src/pages/ComeOnAnmeldelse.tsx": "/casino-anmeldelser/comeon",
  "src/pages/GetLuckyAnmeldelse.tsx": "/casino-anmeldelser/getlucky",
  "src/pages/MrGreenAnmeldelse.tsx": "/casino-anmeldelser/mr-green",
  "src/pages/VideoslotsAnmeldelse.tsx": "/casino-anmeldelser/videoslots",
  "src/pages/MrVegasAnmeldelse.tsx": "/casino-anmeldelser/mr-vegas",
  "src/pages/LeoVegasAnmeldelse.tsx": "/casino-anmeldelser/leovegas",
  "src/pages/ExpektAnmeldelse.tsx": "/casino-anmeldelser/expekt",
  "src/pages/BetanoAnmeldelse.tsx": "/casino-anmeldelser/betano",
  "src/pages/Casino888Anmeldelse.tsx": "/casino-anmeldelser/888-casino",
  "src/pages/UnibetAnmeldelse.tsx": "/casino-anmeldelser/unibet",
  "src/pages/Bet365Anmeldelse.tsx": "/casino-anmeldelser/bet365",
  "src/pages/RoyalCasinoAnmeldelse.tsx": "/casino-anmeldelser/royal-casino",
  "src/pages/MariaCasinoAnmeldelse.tsx": "/casino-anmeldelser/maria-casino",
  "src/pages/KapowCasinoAnmeldelse.tsx": "/casino-anmeldelser/kapow-casino",
  "src/pages/NordicBetAnmeldelse.tsx": "/casino-anmeldelser/nordicbet",
  "src/pages/OneCasinoAnmeldelse.tsx": "/casino-anmeldelser/one-casino",
  "src/pages/SpilnuAnmeldelse.tsx": "/casino-anmeldelser/spilnu",
  "src/pages/StakeCasinoAnmeldelse.tsx": "/casino-anmeldelser/stake-casino",
  "src/pages/CasinostuenAnmeldelse.tsx": "/casino-anmeldelser/casinostuen",
  "src/pages/PokerStarsAnmeldelse.tsx": "/casino-anmeldelser/pokerstars",
  "src/pages/BwinAnmeldelse.tsx": "/casino-anmeldelser/bwin",
  "src/pages/MarathonBetAnmeldelse.tsx": "/casino-anmeldelser/marathonbet",

  // Live casino
  "src/pages/LiveCasino.tsx": "/live-casino",
  "src/pages/live-casino/LiveBlackjackGuide.tsx": "/live-casino/blackjack",
  "src/pages/live-casino/LiveRouletteGuide.tsx": "/live-casino/roulette",
  "src/pages/live-casino/LiveBaccaratGuide.tsx": "/live-casino/baccarat",
  "src/pages/live-casino/LightningRouletteGuide.tsx": "/live-casino/lightning-roulette",
  "src/pages/live-casino/MonopolyLiveGuide.tsx": "/live-casino/monopoly-live",

  // Casinospil
  "src/pages/Casinospil.tsx": "/casinospil",
  "src/pages/Spillemaskiner.tsx": "/casinospil/spillemaskiner",
  "src/pages/SpillemaskinerHoejRTP.tsx": "/casinospil/spillemaskiner/hoej-rtp",
  "src/pages/casinospil/BonusBuys.tsx": "/casinospil/spillemaskiner/bonus-buys",
  "src/pages/casinospil/BlackjackGuide.tsx": "/casinospil/blackjack",
  "src/pages/casinospil/RouletteGuide.tsx": "/casinospil/roulette",
  "src/pages/casinospil/PokerGuide.tsx": "/casinospil/poker",
  "src/pages/casinospil/CrapsGuide.tsx": "/casinospil/craps",
  "src/pages/casinospil/BaccaratGuide.tsx": "/casinospil/baccarat",
  "src/pages/casinospil/RouletteStrategi.tsx": "/casinospil/roulette-strategi",
  "src/pages/casinospil/OnlineLotteri.tsx": "/casinospil/online-lotteri",
  "src/pages/casinospil/GameShows.tsx": "/casinospil/game-shows",

  // Slot guides
  "src/pages/slots/SweetBonanzaGuide.tsx": "/casinospil/spillemaskiner/sweet-bonanza",
  "src/pages/slots/BookOfDeadGuide.tsx": "/casinospil/spillemaskiner/book-of-dead",
  "src/pages/slots/GatesOfOlympusGuide.tsx": "/casinospil/spillemaskiner/gates-of-olympus",
  "src/pages/slots/StarburstGuide.tsx": "/casinospil/spillemaskiner/starburst",
  "src/pages/slots/RazorSharkGuide.tsx": "/casinospil/spillemaskiner/razor-shark",
  "src/pages/slots/BigBassBonanzaGuide.tsx": "/casinospil/spillemaskiner/big-bass-bonanza",
  "src/pages/slots/DeadOrAlive2Guide.tsx": "/casinospil/spillemaskiner/dead-or-alive-2",
  "src/pages/slots/GonzosQuestGuide.tsx": "/casinospil/spillemaskiner/gonzos-quest",
  "src/pages/slots/ReactoonzGuide.tsx": "/casinospil/spillemaskiner/reactoonz",
  "src/pages/slots/MoneyTrain3Guide.tsx": "/casinospil/spillemaskiner/money-train-3",
  "src/pages/slots/WolfGoldGuide.tsx": "/casinospil/spillemaskiner/wolf-gold",
  "src/pages/slots/TheDogHouseGuide.tsx": "/casinospil/spillemaskiner/the-dog-house",
  "src/pages/slots/JamminJarsGuide.tsx": "/casinospil/spillemaskiner/jammin-jars",
  "src/pages/slots/BonanzaGuide.tsx": "/casinospil/spillemaskiner/bonanza",
  "src/pages/slots/FireJokerGuide.tsx": "/casinospil/spillemaskiner/fire-joker",
  "src/pages/slots/LegacyOfDeadGuide.tsx": "/casinospil/spillemaskiner/legacy-of-dead",
  "src/pages/slots/DivineFortuneGuide.tsx": "/casinospil/spillemaskiner/divine-fortune",
  "src/pages/slots/EyeOfHorusGuide.tsx": "/casinospil/spillemaskiner/eye-of-horus",
  "src/pages/slots/BuffaloKingGuide.tsx": "/casinospil/spillemaskiner/buffalo-king",
  "src/pages/slots/SugarRushGuide.tsx": "/casinospil/spillemaskiner/sugar-rush",
  "src/pages/slots/CleopatraGuide.tsx": "/casinospil/spillemaskiner/cleopatra",
  "src/pages/slots/MegaMoolahGuide.tsx": "/casinospil/spillemaskiner/mega-moolah",
  "src/pages/slots/ThunderstruckIIGuide.tsx": "/casinospil/spillemaskiner/thunderstruck-ii",
  "src/pages/slots/ImmortalRomanceGuide.tsx": "/casinospil/spillemaskiner/immortal-romance",
  "src/pages/slots/WildWestGoldGuide.tsx": "/casinospil/spillemaskiner/wild-west-gold",
  "src/pages/slots/MadameDestinyMegawaysGuide.tsx": "/casinospil/spillemaskiner/madame-destiny-megaways",
  "src/pages/slots/ExtraChilliMegawaysGuide.tsx": "/casinospil/spillemaskiner/extra-chilli-megaways",
  "src/pages/slots/WantedDeadOrAWildGuide.tsx": "/casinospil/spillemaskiner/wanted-dead-or-a-wild",
  "src/pages/slots/ChaosCrewGuide.tsx": "/casinospil/spillemaskiner/chaos-crew",
  "src/pages/slots/JokerStrikeGuide.tsx": "/casinospil/spillemaskiner/joker-strike",

  // Bonus guides
  "src/pages/CasinoBonus.tsx": "/casino-bonus",
  "src/pages/Velkomstbonus.tsx": "/velkomstbonus",
  "src/pages/FreeSpins.tsx": "/free-spins",
  "src/pages/FreeSpinsIDag.tsx": "/free-spins-i-dag",
  "src/pages/Indskudsbonus.tsx": "/indskudsbonus",
  "src/pages/Omsaetningskrav.tsx": "/omsaetningskrav",
  "src/pages/BonusUdenIndbetaling.tsx": "/bonus-uden-indbetaling",
  "src/pages/BonusUdenOmsaetningskrav.tsx": "/bonus-uden-omsaetningskrav",
  "src/pages/NoStickyBonus.tsx": "/no-sticky-bonus",
  "src/pages/StickyBonus.tsx": "/sticky-bonus",
  "src/pages/CashbackBonus.tsx": "/cashback-bonus",
  "src/pages/ReloadBonus.tsx": "/reload-bonus",

  // Spiludviklere
  "src/pages/Spiludviklere.tsx": "/spiludviklere",
  "src/pages/NetEntGuide.tsx": "/spiludviklere/netent",
  "src/pages/PragmaticPlayGuide.tsx": "/spiludviklere/pragmatic-play",
  "src/pages/RelaxGamingGuide.tsx": "/spiludviklere/relax-gaming",
  "src/pages/PlayNGoGuide.tsx": "/spiludviklere/play-n-go",
  "src/pages/HacksawGamingGuide.tsx": "/spiludviklere/hacksaw-gaming",
  "src/pages/NolimitCityGuide.tsx": "/spiludviklere/nolimit-city",
  "src/pages/YggdrasilGuide.tsx": "/spiludviklere/yggdrasil",
  "src/pages/MicrogamingGuide.tsx": "/spiludviklere/microgaming",
  "src/pages/RedTigerGuide.tsx": "/spiludviklere/red-tiger",
  "src/pages/BigTimeGamingGuide.tsx": "/spiludviklere/big-time-gaming",
  "src/pages/ELKStudiosGuide.tsx": "/spiludviklere/elk-studios",
  "src/pages/EvolutionGamingGuide.tsx": "/spiludviklere/evolution-gaming",

  // Betalingsmetoder
  "src/pages/Betalingsmetoder.tsx": "/betalingsmetoder",
  "src/pages/payments/ApplePayGuide.tsx": "/betalingsmetoder/apple-pay",
  "src/pages/payments/MobilePayGuide.tsx": "/betalingsmetoder/mobilepay",
  "src/pages/payments/PayPalGuide.tsx": "/betalingsmetoder/paypal",
  "src/pages/payments/SkrillGuide.tsx": "/betalingsmetoder/skrill",
  "src/pages/payments/TrustlyGuide.tsx": "/betalingsmetoder/trustly",
  "src/pages/payments/ZimplerGuide.tsx": "/betalingsmetoder/zimpler",
  "src/pages/payments/PaysafecardGuide.tsx": "/betalingsmetoder/paysafecard",
  "src/pages/payments/BankoverfoerslerGuide.tsx": "/betalingsmetoder/bankoverforsler",
  "src/pages/payments/VisaMastercardGuide.tsx": "/betalingsmetoder/visa-mastercard",
  "src/pages/payments/RevolutGuide.tsx": "/betalingsmetoder/revolut",

  // Casinoer hub + spokes
  "src/pages/casinoer/CasinoerHub.tsx": "/casinoer",
  "src/pages/casinoer/HurtigUdbetalingGuide.tsx": "/casinoer/hurtig-udbetaling",
  "src/pages/casinoer/HoejRTPCasinoGuide.tsx": "/casinoer/hoej-rtp",
  "src/pages/casinoer/CryptoCasinoGuide.tsx": "/casinoer/crypto-casino",
  "src/pages/CasinoLicenser.tsx": "/casino-licenser",
  "src/pages/casinoer/LicenseredeCasinoerGuide.tsx": "/casinoer/licenserede",
  "src/pages/casinoer/VRCasinoGuide.tsx": "/casinoer/vr-casinoer",
  "src/pages/casinoer/MobilCasinoGuide.tsx": "/casinoer/mobil-casinoer",
  "src/pages/casinoer/SpilCasinoForSjovGuide.tsx": "/casinoer/spil-casino-for-sjov",
  "src/pages/casinoer/CasinoOgSkatGuide.tsx": "/casinoer/casino-og-skat",

  // Nyheder hub
  "src/pages/CasinoNyheder.tsx": "/casino-nyheder",

  // Info pages
  "src/pages/ResponsibleGaming.tsx": "/ansvarligt-spil",
  "src/pages/Spillemyndigheden.tsx": "/spillemyndigheden",
  "src/pages/OmTeamet.tsx": "/om",
  "src/pages/Forretningsmodel.tsx": "/forretningsmodel",
  "src/pages/RedaktionelPolitik.tsx": "/redaktionel-politik",
  "src/pages/Contact.tsx": "/kontakt",
  "src/pages/Forfatter.tsx": "/forfatter/jonas",
  "src/pages/ForfatterKevin.tsx": "/forfatter/kevin",
  "src/pages/ForfatterAjse.tsx": "/forfatter/ajse",
  "src/pages/SaadanTesterVi.tsx": "/saadan-tester-vi-casinoer",
  "src/pages/Privacy.tsx": "/privatlivspolitik",
  "src/pages/Terms.tsx": "/terms",
  "src/pages/Cookies.tsx": "/cookies",
  "src/pages/Sitemap.tsx": "/sitemap",
  "src/pages/CommunityHub.tsx": "/community",
};

// ── Helpers ────────────────────────────────────────────────────

function getToday() {
  // ISO date in UTC
  return new Date().toISOString().slice(0, 10);
}

function getChangedFiles() {
  const commitMsg = execSync("git log -1 --pretty=%B", { encoding: "utf-8" }).trim();
  const forceAll = commitMsg.includes("[force-lastmod]");

  const diff = execSync("git diff --name-only HEAD~1 HEAD", { encoding: "utf-8" }).trim();
  if (!diff) return { files: [], forceAll };

  return { files: diff.split("\n").filter(Boolean), forceAll };
}

function isContentFile(filePath) {
  // Must be inside a content path
  const inContentPath = CONTENT_PATHS.some((prefix) => filePath.startsWith(prefix));
  if (!inContentPath) return false;

  // Must not match any ignore pattern
  return !IGNORE_PATTERNS.some((pattern) => pattern.test(filePath));
}

function resolveRoutes(files, forceAll) {
  const routes = new Set();

  for (const file of files) {
    if (forceAll || isContentFile(file)) {
      const route = FILE_TO_ROUTE[file];
      if (route) {
        routes.add(route);
      }
    }
  }

  return [...routes];
}

/**
 * Parse seoRoutes.ts and update lastmod for specific paths.
 * Uses regex replacement to preserve file structure and formatting.
 */
function updateSeoRoutes(routePaths, today) {
  let content = readFileSync(SEOROUTES_PATH, "utf-8");
  let updatedCount = 0;
  const updatedRoutes = [];

  for (const routePath of routePaths) {
    // Match: { path: "/exact-path", ... lastmod: "YYYY-MM-DD" ... }
    // Handles both with and without trailing comma after lastmod
    const escapedPath = routePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(
      `(\\{[^}]*path:\\s*"${escapedPath}"[^}]*lastmod:\\s*")\\d{4}-\\d{2}-\\d{2}(")`
    );

    const match = content.match(regex);
    if (!match) {
      console.warn(`⚠️  No matching route found for: ${routePath}`);
      continue;
    }

    // Check if already set to today
    if (match[0].includes(`lastmod: "${today}"`)) {
      console.log(`⏭️  ${routePath} already has lastmod ${today}, skipping`);
      continue;
    }

    content = content.replace(regex, `$1${today}$2`);
    updatedCount++;
    updatedRoutes.push(routePath);
    console.log(`✅  ${routePath} → lastmod: ${today}`);
  }

  if (updatedCount > 0) {
    writeFileSync(SEOROUTES_PATH, content, "utf-8");
  }

  return { updatedCount, updatedRoutes };
}

// ── Main ───────────────────────────────────────────────────────

function main() {
  const today = getToday();
  console.log(`\n📅 Today: ${today}`);
  console.log("─".repeat(50));

  const { files, forceAll } = getChangedFiles();
  if (forceAll) {
    console.log("🔓 [force-lastmod] detected – allowing all file types");
  }

  console.log(`\n📁 Changed files (${files.length}):`);
  files.forEach((f) => console.log(`   ${f}`));

  const contentFiles = files.filter((f) => forceAll || isContentFile(f));
  console.log(`\n📝 Content files (${contentFiles.length}):`);
  contentFiles.forEach((f) => console.log(`   ${f}`));

  const routePaths = resolveRoutes(files, forceAll);
  console.log(`\n🗺️  Resolved routes (${routePaths.length}):`);
  routePaths.forEach((r) => console.log(`   ${r}`));

  if (routePaths.length === 0) {
    console.log("\n✨ No content routes affected – nothing to update.");
    // Set GitHub Actions output
    console.log("::set-output name=updated::false");
    return;
  }

  // ── Stagger safeguard ──
  if (routePaths.length > MAX_UPDATES_PER_RUN && !forceAll) {
    console.error(
      `\n🛑 ABORT: ${routePaths.length} routes would be updated (max ${MAX_UPDATES_PER_RUN}).`
    );
    console.error("   This looks like a batch update. Use [force-lastmod] in commit message to override.");
    process.exit(1);
  }

  // ── Update seoRoutes.ts ──
  const { updatedCount, updatedRoutes } = updateSeoRoutes(routePaths, today);

  console.log("\n─".repeat(50));
  console.log(`\n📊 Summary:`);
  console.log(`   Routes detected:  ${routePaths.length}`);
  console.log(`   Routes updated:   ${updatedCount}`);
  console.log(`   Routes skipped:   ${routePaths.length - updatedCount}`);

  if (updatedCount > 0) {
    console.log(`\n🔄 Updated routes:`);
    updatedRoutes.forEach((r) => console.log(`   ${r} → ${today}`));
  }

  // Set GitHub Actions output
  const hasUpdates = updatedCount > 0 ? "true" : "false";
  console.log(`::set-output name=updated::${hasUpdates}`);
}

main();
