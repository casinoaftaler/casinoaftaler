import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CasinoLatestNews } from "@/components/CasinoLatestNews";
import {
  Gift,
  Sparkles,
  CreditCard,
  Target,
  Zap,
  Trophy,
  BookOpen,
  Tv,
  ShieldCheck,
  Shield,
  Star,
  Gamepad2,
  Wallet,
  Landmark,
  Smartphone,
  Globe,
  BarChart3,
  ShoppingCart,
  TrendingUp,
  RefreshCw,
  Layers,
  Brain,
  Shuffle,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface GuideLink {
  to: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}

// === HUB LINKS (always link to primary hub) ===
const bonusHub: GuideLink = { to: "/casino-bonus", label: "Casino Bonus Oversigt", icon: Trophy, desc: "Komplet oversigt over alle bonustyper" };
const paymentHub: GuideLink = { to: "/betalingsmetoder", label: "Betalingsmetoder Oversigt", icon: Wallet, desc: "Sammenlign alle betalingsløsninger" };
const providerHub: GuideLink = { to: "/spiludviklere", label: "Spiludviklere Oversigt", icon: Gamepad2, desc: "Alle spiludbydere på danske casinoer" };
const reviewHub: GuideLink = { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: BookOpen, desc: "Oversigt over alle anmeldelser" };
const casinospilHub: GuideLink = { to: "/casinospil", label: "Casinospil", icon: Gamepad2, desc: "Udforsk alle typer casinospil" };

// === COMMUNITY ENTERPRISE HUBS ===
const slotDatabaseHub: GuideLink = { to: "/slot-database", label: "Slot Database", icon: BarChart3, desc: "163+ slots med community-data og statistik" };
const bonusHuntArkivHub: GuideLink = { to: "/bonus-hunt/arkiv", label: "Bonus Hunt Arkiv", icon: Trophy, desc: "Alle dokumenterede hunt-resultater" };
const turneringsArkivHub: GuideLink = { to: "/community/turneringer/arkiv", label: "Turneringsarkiv", icon: Trophy, desc: "Månedlige vindere og leaderboards" };

// === SIBLING LINKS (max 2-3 per cluster) ===
const bonusSiblings: GuideLink[] = [
  { to: "/velkomstbonus", label: "Velkomstbonus", icon: Trophy, desc: "Få mest ud af din første indbetaling" },
  { to: "/free-spins", label: "Free Spins", icon: Sparkles, desc: "Gratis spins på populære spilleautomater" },
  { to: "/indskudsbonus", label: "Indskudsbonus", icon: CreditCard, desc: "Matchbonusser der fordobler dit indskud" },
  { to: "/omsaetningskrav", label: "Omsætningskrav", icon: Target, desc: "Forstå gennemspilningskrav på bonusser" },
  { to: "/no-sticky-bonus", label: "No-Sticky Bonus", icon: Zap, desc: "Bonusser med adskillelse af midler" },
  { to: "/sticky-bonus", label: "Sticky Bonus", icon: Gift, desc: "Klæbende bonusser med større beløb" },
  { to: "/bonus-uden-indbetaling", label: "Bonus uden Indbetaling", icon: Gift, desc: "Spil gratis uden at indbetale" },
  { to: "/bonus-uden-omsaetningskrav", label: "Uden Omsætningskrav", icon: Zap, desc: "Hæv gevinster med det samme" },
  { to: "/cashback-bonus", label: "Cashback Bonus", icon: TrendingUp, desc: "Få penge tilbage fra dine tab" },
  { to: "/reload-bonus", label: "Reload Bonus", icon: RefreshCw, desc: "Tilbagevendende bonusser for eksisterende spillere" },
];

const paymentSiblings: GuideLink[] = [
  { to: "/betalingsmetoder/visa-mastercard", label: "Visa / Mastercard", icon: CreditCard, desc: "Kortbetaling med 3D Secure" },
  { to: "/betalingsmetoder/mobilepay", label: "MobilePay", icon: Smartphone, desc: "Danmarks populære mobilbetaling" },
  { to: "/betalingsmetoder/trustly", label: "Trustly", icon: Landmark, desc: "Direkte bankoverførsel via open banking" },
  { to: "/betalingsmetoder/paypal", label: "PayPal", icon: Globe, desc: "Verdens største e-wallet" },
  { to: "/betalingsmetoder/skrill", label: "Skrill", icon: Wallet, desc: "E-wallet med VIP-program" },
  { to: "/betalingsmetoder/zimpler", label: "Zimpler", icon: Zap, desc: "Svensk fintech med open banking" },
  { to: "/betalingsmetoder/paysafecard", label: "Paysafecard", icon: ShieldCheck, desc: "Anonym forudbetalt voucher" },
  { to: "/betalingsmetoder/apple-pay", label: "Apple Pay", icon: Smartphone, desc: "Biometrisk mobilbetaling" },
  { to: "/betalingsmetoder/bankoverforsler", label: "Bankoverførsel", icon: Landmark, desc: "Traditionel bankoverførsel" },
  { to: "/betalingsmetoder/revolut", label: "Revolut", icon: Globe, desc: "Moderne fintech-app" },
];

const providerSiblings: GuideLink[] = [
  { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play", icon: Star, desc: "Populær udbyder med store jackpots" },
  { to: "/spiludviklere/netent", label: "NetEnt", icon: Star, desc: "Nordisk kvalitet og innovation" },
  { to: "/spiludviklere/play-n-go", label: "Play'n GO", icon: Star, desc: "Book of Dead og meget mere" },
  { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming", icon: Tv, desc: "Verdens førende live casino-udbyder" },
  { to: "/spiludviklere/nolimit-city", label: "Nolimit City", icon: Zap, desc: "Høj volatilitet og unikke mekanikker" },
  { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming", icon: Sparkles, desc: "Innovative slots med stor vindpotentiale" },
  { to: "/spiludviklere/microgaming", label: "Microgaming", icon: Trophy, desc: "Pionererne bag Mega Moolah" },
  { to: "/spiludviklere/red-tiger", label: "Red Tiger", icon: Star, desc: "Daily jackpots og unikke features" },
  { to: "/spiludviklere/yggdrasil", label: "Yggdrasil", icon: Sparkles, desc: "Visuelt imponerende spiloplevelser" },
  { to: "/spiludviklere/relax-gaming", label: "Relax Gaming", icon: Gamepad2, desc: "Dream Drop jackpot-serien" },
  { to: "/spiludviklere/elk-studios", label: "ELK Studios", icon: Star, desc: "Kreative mekanikker og flot grafik" },
  { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming", icon: Zap, desc: "Opfinderne af Megaways" },
];

const allReviews: GuideLink[] = [
  { to: "/casino-anmeldelser/888-casino", label: "888 Casino", icon: Star, desc: "Poker-tradition og eksklusive spil" },
  { to: "/casino-anmeldelser/bet365", label: "bet365", icon: Star, desc: "Komplet sportsbook og casino" },
  { to: "/casino-anmeldelser/betano", label: "Betano", icon: Trophy, desc: "Moderne casino med stærk bonus" },
  { to: "/casino-anmeldelser/betinia", label: "Betinia", icon: Trophy, desc: "Moderne casino med store bonusser" },
  { to: "/casino-anmeldelser/bwin", label: "bwin", icon: Star, desc: "Internationalt casino og betting" },
  { to: "/casino-anmeldelser/campobet", label: "Campobet", icon: Star, desc: "Casino og sportsbetting i ét" },
  { to: "/casino-anmeldelser/casinostuen", label: "Casinostuen", icon: Gamepad2, desc: "Dansk casino med loyalitetsprogram" },
  { to: "/casino-anmeldelser/comeon", label: "ComeOn", icon: Zap, desc: "Enkelt casino med hurtige udbetalinger" },
  { to: "/casino-anmeldelser/danske-spil", label: "Danske Spil", icon: Landmark, desc: "Danmarks største spiludbyder" },
  { to: "/casino-anmeldelser/expekt", label: "Expekt", icon: Star, desc: "Nordisk sportsbook og casino" },
  { to: "/casino-anmeldelser/getlucky", label: "GetLucky", icon: Sparkles, desc: "Casino med bred spiludvalg" },
  { to: "/casino-anmeldelser/kapow-casino", label: "Kapow Casino", icon: Zap, desc: "Nyt dansk casino med unikke features" },
  { to: "/casino-anmeldelser/leovegas", label: "LeoVegas", icon: Trophy, desc: "Prisbelønnet mobilcasino" },
  { to: "/casino-anmeldelser/luna-casino", label: "Luna Casino", icon: Sparkles, desc: "Nyt dansk casino med stærk bonus" },
  { to: "/casino-anmeldelser/marathonbet", label: "MarathonBet", icon: Star, desc: "Høje odds og lavt margin" },
  { to: "/casino-anmeldelser/maria-casino", label: "Maria Casino", icon: Sparkles, desc: "Dansk casino med bingo og slots" },
  { to: "/casino-anmeldelser/mr-green", label: "Mr Green", icon: Star, desc: "Ansvarligt spil og Green Gaming" },
  { to: "/casino-anmeldelser/mr-vegas", label: "Mr Vegas", icon: Trophy, desc: "Casino med bred spiludvalg" },
  { to: "/casino-anmeldelser/nordicbet", label: "NordicBet", icon: Star, desc: "Nordisk casino med sportsfokus" },
  { to: "/casino-anmeldelser/one-casino", label: "One Casino", icon: Gamepad2, desc: "Simpelt casino med hurtig start" },
  { to: "/casino-anmeldelser/pokerstars", label: "PokerStars", icon: Star, desc: "Verdens største pokersite" },
  { to: "/casino-anmeldelser/royal-casino", label: "Royal Casino", icon: Trophy, desc: "Dansk licenseret casino" },
  { to: "/casino-anmeldelser/spildansknu", label: "SpilDanskNu", icon: Star, desc: "Dansk casino med 10x omsætningskrav" },
  { to: "/casino-anmeldelser/spilleautomaten", label: "Spilleautomaten", icon: Gamepad2, desc: "Bredt spiludvalg og hurtige udbetalinger" },
  { to: "/casino-anmeldelser/spilnu", label: "Spilnu", icon: Sparkles, desc: "Populært dansk online casino" },
  { to: "/casino-anmeldelser/stake-casino", label: "Stake Casino", icon: Zap, desc: "Crypto-venligt casino" },
  { to: "/casino-anmeldelser/swift-casino", label: "Swift Casino", icon: Zap, desc: "Hurtigt og enkelt casinooplevelse" },
  { to: "/casino-anmeldelser/unibet", label: "Unibet", icon: Trophy, desc: "Nordisk gigant med komplet udbud" },
  { to: "/casino-anmeldelser/videoslots", label: "Videoslots", icon: Gamepad2, desc: "Enormt spiludvalg og Battle of Slots" },
];

const casinoGuidesSiblings: GuideLink[] = [
  { to: "/casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling", icon: Zap, desc: "Casinoer med de hurtigste udbetalinger" },
  { to: "/casinoer/hoej-rtp", label: "Høj RTP", icon: BarChart3, desc: "Casinoer med bedst tilbagebetaling" },
  { to: "/casinoer/crypto-casino", label: "Crypto Casino", icon: Globe, desc: "Bitcoin og krypto-gambling" },
  { to: "/casino-licenser", label: "Licenserede Casinoer", icon: ShieldCheck, desc: "Sikre casinoer med dansk licens" },
  { to: "/casinoer/vr-casinoer", label: "VR Casinoer", icon: Gamepad2, desc: "Virtual reality casino-oplevelser" },
  { to: "/casinoer/mobil-casinoer", label: "Mobil Casinoer", icon: Zap, desc: "Casino på din smartphone" },
  { to: "/casinoer/spil-casino-for-sjov", label: "Spil for Sjov", icon: Sparkles, desc: "Gratis casinospil uden risiko" },
  { to: "/casinoer/casino-og-skat", label: "Casino og Skat", icon: Target, desc: "Skatteforhold ved casinogevinster" },
];

const casinospilSiblings: GuideLink[] = [
  { to: "/casinospil/spillemaskiner", label: "Spillemaskiner", icon: Gamepad2, desc: "Guide til alle typer online slots" },
  { to: "/casinospil/spillemaskiner/hoej-rtp", label: "Høj RTP Slots", icon: BarChart3, desc: "Find spillemaskiner med bedst tilbagebetaling" },
  { to: "/casinospil/spillemaskiner/bonus-buys", label: "Bonus Buys Guide", icon: ShoppingCart, desc: "Matematik og strategi bag buy feature" },
  { to: "/casinospil/blackjack", label: "Blackjack Regler", icon: Gamepad2, desc: "Komplet guide til online blackjack" },
  { to: "/casinospil/roulette", label: "Roulette Regler", icon: Target, desc: "Lær roulettens væddemål og varianter" },
  { to: "/casinospil/poker", label: "Poker Regler", icon: Gamepad2, desc: "Guide til casino poker og Video Poker" },
  { to: "/casinospil/craps", label: "Craps Regler", icon: Gamepad2, desc: "Terningspillet med de bedste odds" },
  { to: "/casinospil/baccarat", label: "Baccarat Regler", icon: Trophy, desc: "Elegancens kortspil med lav house edge" },
  { to: "/casinospil/roulette", label: "Roulette Strategi", icon: BarChart3, desc: "Martingale, Fibonacci og mere" },
  { to: "/casinospil/online-lotteri", label: "Online Lotteri", icon: Sparkles, desc: "Lotto, Keno og skrabespil" },
  { to: "/casinospil/game-shows", label: "Game Shows", icon: Tv, desc: "Crazy Time, Monopoly Live og mere" },
  { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil med rigtige dealere i realtid" },
];

const legalLinks: GuideLink[] = [
  { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
  { to: "/spillemyndigheden", label: "Spillemyndigheden", icon: Landmark, desc: "Danmarks tilsynsmyndighed for spil" },
  { to: "/privatlivspolitik", label: "Privatlivspolitik", icon: ShieldCheck, desc: "Læs om hvordan vi beskytter dine data" },
  { to: "/terms", label: "Vilkår og Betingelser", icon: BookOpen, desc: "Vores generelle vilkår for brug af sitet" },
  { to: "/cookies", label: "Cookiepolitik", icon: Globe, desc: "Information om vores brug af cookies" },
];

// Max siblings to show from same cluster
const MAX_SIBLINGS = 3;
// Max cross-cluster contextual links
const MAX_CROSS_CLUSTER = 1;

/**
 * Governance-compliant guide selection:
 * 1. Always include primary hub
 * 2. Max 3 sibling links from same cluster
 * 3. Max 1 cross-cluster contextual link
 * 4. Total max 5 links in RelatedGuides
 */
function getContextualGuides(currentPath: string): { guides: GuideLink[]; subtitle: string } {
  const path = currentPath.toLowerCase();

  // Casino Nyheder hub → strategic money-page links
  if (path === "/casino-nyheder") {
    return {
      guides: [
        { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: BookOpen, desc: "Dybdegående anmeldelser af danske casinoer" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Sammenlign de bedste bonusser" },
        { to: "/nye-casinoer", label: "Nye Casinoer 2026", icon: Sparkles, desc: "De nyeste casinoer på markedet" },
        { to: "/casino-licenser", label: "Casino Licenser", icon: ShieldCheck, desc: "Forstå det danske licenssystem" },
        { to: "/betalingsmetoder", label: "Betalingsmetoder", icon: CreditCard, desc: "Alle betalingsløsninger sammenlignet" },
      ],
      subtitle: "Udforsk vores dybdegående guides, anmeldelser og sammenligninger.",
    };
  }

  // Casino Nyheder articles → contextual money-page links
  if (path.startsWith("/casino-nyheder/")) {
    return {
      guides: [
        { to: "/casino-nyheder", label: "Alle Casino Nyheder", icon: BookOpen, desc: "Se alle nyheder og analyser" },
        { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: Star, desc: "Dybdegående anmeldelser af danske casinoer" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Sammenlign de bedste bonusser" },
        { to: "/nye-casinoer", label: "Nye Casinoer 2026", icon: Sparkles, desc: "De nyeste casinoer på markedet" },
        { to: "/betalingsmetoder", label: "Betalingsmetoder", icon: CreditCard, desc: "Alle betalingsløsninger sammenlignet" },
      ],
      subtitle: "Udforsk flere guides, anmeldelser og sammenligninger på Casinoaftaler.dk.",
    };
  }

  // Om teamet → specific curated links
  if (path === "/om" || path === "/om-teamet") {
    return {
      guides: [
        { to: "/saadan-tester-vi-casinoer", label: "Sådan tester vi casinoer", icon: ShieldCheck, desc: "Vores testmetode og vurderingskriterier" },
        { to: "/kontakt", label: "Kontakt", icon: Globe, desc: "Kontakt teamet bag Casinoaftaler.dk" },
        { to: "/forfatter/jonas", label: "Jonas – Forfatter", icon: BookOpen, desc: "Grundlægger og casino-streamer" },
        { to: "/forfatter/kevin", label: "Kevin – Forfatter", icon: BookOpen, desc: "Casino-streamer og IT medansvarlig" },
        { to: "/forfatter/ajse", label: "Ajse – Forfatter", icon: BookOpen, desc: "Juridisk redaktør & casinoanalytiker" },
        { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
        { to: "/spillemyndigheden", label: "Spillemyndigheden", icon: Landmark, desc: "Danmarks tilsynsmyndighed for spil" },
      ],
      subtitle: "Udforsk mere om teamet, vores metode og ansvarligt spil.",
    };
  }

  // Forfatter pages
  if (path === "/forfatter/jonas") {
    return {
      guides: [
        { to: "/forfatter/kevin", label: "Kevin – Forfatter", icon: BookOpen, desc: "Casino-streamer og IT medansvarlig" },
        { to: "/om", label: "Om Casinoaftaler.dk", icon: BookOpen, desc: "Mød teamet bag Casinoaftaler.dk" },
        { to: "/saadan-tester-vi-casinoer", label: "Sådan tester vi casinoer", icon: ShieldCheck, desc: "Vores testmetode og vurderingskriterier" },
        { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
        { to: "/kontakt", label: "Kontakt", icon: Globe, desc: "Kontakt teamet bag Casinoaftaler.dk" },
      ],
      subtitle: "Udforsk mere om holdet bag Casinoaftaler.dk og ansvarligt spil.",
    };
  }

  if (path === "/forfatter/kevin") {
    return {
      guides: [
        { to: "/forfatter/jonas", label: "Jonas – Grundlægger", icon: BookOpen, desc: "Grundlægger af Casinoaftaler.dk" },
        { to: "/forfatter/ajse", label: "Ajse – Juridisk redaktør", icon: BookOpen, desc: "Juridisk redaktør på Casinoaftaler.dk" },
        { to: "/om", label: "Om Casinoaftaler.dk", icon: BookOpen, desc: "Mød teamet bag Casinoaftaler.dk" },
        { to: "/saadan-tester-vi-casinoer", label: "Sådan tester vi casinoer", icon: ShieldCheck, desc: "Vores testmetode og vurderingskriterier" },
        { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
        { to: "/kontakt", label: "Kontakt", icon: Globe, desc: "Kontakt teamet bag Casinoaftaler.dk" },
      ],
      subtitle: "Udforsk mere om holdet bag Casinoaftaler.dk og vores tilgang til casinoanmeldelser.",
    };
  }

  if (path === "/forfatter/ajse") {
    return {
      guides: [
        { to: "/forfatter/jonas", label: "Jonas – Grundlægger", icon: BookOpen, desc: "Grundlægger af Casinoaftaler.dk" },
        { to: "/forfatter/kevin", label: "Kevin – Forfatter", icon: BookOpen, desc: "Casino-streamer og IT medansvarlig" },
        { to: "/casino-nyheder", label: "Casino Nyheder", icon: BookOpen, desc: "Seneste nyheder om danske casinoer" },
        { to: "/om", label: "Om Casinoaftaler.dk", icon: BookOpen, desc: "Mød teamet bag Casinoaftaler.dk" },
        { to: "/kontakt", label: "Kontakt", icon: Globe, desc: "Kontakt teamet bag Casinoaftaler.dk" },
      ],
      subtitle: "Udforsk mere om holdet bag Casinoaftaler.dk og vores nyhedsdækning.",
    };
  }

  // Forretningsmodel & Redaktionel politik
  if (path === "/forretningsmodel" || path === "/redaktionel-politik") {
    return {
      guides: [
        { to: "/om", label: "Om Teamet", icon: BookOpen, desc: "Mød teamet bag Casinoaftaler.dk" },
        { to: "/saadan-tester-vi-casinoer", label: "Sådan tester vi casinoer", icon: ShieldCheck, desc: "Vores testmetode og vurderingskriterier" },
        { to: path === "/forretningsmodel" ? "/redaktionel-politik" : "/forretningsmodel", label: path === "/forretningsmodel" ? "Redaktionel Politik" : "Forretningsmodel", icon: ShieldCheck, desc: path === "/forretningsmodel" ? "Vores redaktionelle retningslinjer" : "Sådan finansieres Casinoaftaler.dk" },
        { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
      ],
      subtitle: "Udforsk mere om vores tilgang, metode og ansvarligt spil.",
    };
  }

  // Legal pages → show other legal links only
  if (path === "/privatlivspolitik" || path === "/terms" || path === "/cookies" || path === "/ansvarligt-spil" || path === "/spillemyndigheden" || path.startsWith("/ansvarligt-spil/")) {
    return {
      guides: [
        ...legalLinks,
        ...(path !== "/ansvarligt-spil/rofus" ? [{ to: "/ansvarligt-spil/rofus", label: "ROFUS Guide", icon: Shield, desc: "Alt om selvudelukkelse fra danske casinoer" } as GuideLink] : []),
        ...(path !== "/ansvarligt-spil/ludomani" ? [{ to: "/ansvarligt-spil/ludomani", label: "Ludomani Guide", icon: Shield, desc: "Alt om spilleafhængighed i Danmark" } as GuideLink] : []),
        ...(path !== "/ansvarligt-spil/stopspillet" ? [{ to: "/ansvarligt-spil/stopspillet", label: "StopSpillet Guide", icon: Shield, desc: "Gratis rådgivning for spillere og pårørende" } as GuideLink] : []),
      ].filter(g => g.to !== path),
      subtitle: "Udforsk vores andre sider om ansvarligt spil, databeskyttelse og juridiske vilkår.",
    };
  }

  // Slot Database → money-page bridge links
  if (path === "/slot-database") {
    return {
      guides: [
        { to: "/bonus-hunt", label: "Bonus Hunt", icon: Trophy, desc: "Følg med i live bonus hunts på Twitch" },
        { to: "/bonus-hunt/arkiv", label: "Bonus Hunt Arkiv", icon: BarChart3, desc: "Alle dokumenterede hunt-resultater" },
        casinospilHub,
        providerHub,
        bonusHub,
      ],
      subtitle: "Udforsk bonus hunts, casinospil og de bedste spiludviklere.",
    };
  }

  // Bonus Hunt Arkiv → bridge to money-pages and community
  if (path === "/bonus-hunt/arkiv") {
    return {
      guides: [
        { to: "/bonus-hunt", label: "Bonus Hunt Live", icon: Trophy, desc: "Se aktive og kommende bonus hunts" },
        { to: "/slot-database", label: "Slot Database", icon: Gamepad2, desc: "163+ spillemaskiner med community-data" },
        { to: "/community/turneringer", label: "Turneringer", icon: Trophy, desc: "Deltag i månedlige turneringer" },
        reviewHub,
        bonusHub,
      ],
      subtitle: "Udforsk live hunts, slot-statistikker og de bedste casino bonusser.",
    };
  }

  // Turneringsarkiv → bridge to tournaments and money-pages
  if (path === "/community/turneringer/arkiv") {
    return {
      guides: [
        { to: "/community/turneringer", label: "Aktive Turneringer", icon: Trophy, desc: "Deltag i denne måneds turnering" },
        { to: "/slot-database", label: "Slot Database", icon: Gamepad2, desc: "Se statistik for alle testede slots" },
        { to: "/bonus-hunt", label: "Bonus Hunt", icon: Trophy, desc: "Live bonus hunts på Twitch" },
        reviewHub,
        casinospilHub,
      ],
      subtitle: "Udforsk aktive turneringer, slot-data og casinospil.",
    };
  }

  // Community rewards → limited bonus guides
  if (path === "/community/rewards") {
    return {
      guides: [bonusHub, ...bonusSiblings.filter(g => ["/free-spins", "/omsaetningskrav", "/bonus-uden-indbetaling"].includes(g.to))],
      subtitle: "Lær mere om bonusser, omsætningskrav og gratis spins på danske casinoer.",
    };
  }

  // Payment subpages → hub + 3 rotated siblings + 1 varied cross-cluster
  if (path.startsWith("/betalingsmetoder/")) {
    const currentIndex = paymentSiblings.findIndex(g => g.to === path);
    const filtered = paymentSiblings.filter(g => g.to !== path);
    const len = paymentSiblings.length;
    let siblings: GuideLink[];
    if (currentIndex >= 0) {
      siblings = [
        paymentSiblings[(currentIndex + 2) % len],
        paymentSiblings[(currentIndex + 5) % len],
        paymentSiblings[(currentIndex + 8) % len],
      ].filter(g => g.to !== path);
    } else {
      siblings = filtered.slice(0, MAX_SIBLINGS);
    }
    const crossCluster = currentIndex % 2 === 0 ? bonusHub : reviewHub;
    return {
      guides: [paymentHub, ...siblings, crossCluster].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: currentIndex % 2 === 0
        ? "Udforsk andre betalingsmetoder og de bedste casino bonusser."
        : "Udforsk andre betalingsmetoder og læs vores casino anmeldelser.",
    };
  }

  // Payment hub → 3 popular siblings + 1 cross-cluster
  if (path === "/betalingsmetoder") {
    return {
      guides: [...paymentSiblings.slice(0, MAX_SIBLINGS), casinospilHub],
      subtitle: "Udforsk vores dybdegående guides til populære betalingsmetoder.",
    };
  }

  // Provider subpages → hub + 3 rotated siblings + 1 varied cross-cluster
  if (path.startsWith("/spiludviklere/")) {
    const currentIndex = providerSiblings.findIndex(g => g.to === path);
    const filtered = providerSiblings.filter(g => g.to !== path);
    const len = providerSiblings.length;
    let siblings: GuideLink[];
    if (currentIndex >= 0) {
      siblings = [
        providerSiblings[(currentIndex + 3) % len],
        providerSiblings[(currentIndex + 7) % len],
        providerSiblings[(currentIndex + 11) % len],
      ].filter(g => g.to !== path);
    } else {
      siblings = filtered.slice(0, MAX_SIBLINGS);
    }
    const crossClusterOptions = [casinospilHub, bonusHub, reviewHub];
    const crossCluster = crossClusterOptions[currentIndex >= 0 ? currentIndex % 3 : 0];
    const subtitles = [
      "Udforsk andre spiludviklere og find de bedste casinospil.",
      "Udforsk andre spiludviklere og sammenlign bonusser.",
      "Udforsk andre spiludviklere og læs casino anmeldelser.",
    ];
    return {
      guides: [providerHub, ...siblings, crossCluster].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: subtitles[currentIndex >= 0 ? currentIndex % 3 : 0],
    };
  }

  // Provider hub → 3 popular siblings + 1 cross-cluster
  if (path === "/spiludviklere") {
    return {
      guides: [...providerSiblings.slice(0, MAX_SIBLINGS), casinospilHub],
      subtitle: "Udforsk vores dybdegående guides til populære spiludviklere.",
    };
  }

  // Casino review subpages → hub + 3 rotated siblings + 1 cross-cluster
  if (path.includes("-anmeldelse") || path.startsWith("/casino-anmeldelser/")) {
    const currentIndex = allReviews.findIndex(g => g.to === path);
    const filtered = allReviews.filter(g => g.to !== path);
    let siblings: GuideLink[];
    if (currentIndex >= 0) {
      const len = allReviews.length;
      siblings = [
        allReviews[(currentIndex + 3) % len],
        allReviews[(currentIndex + 7) % len],
        allReviews[(currentIndex + 11) % len],
      ].filter(g => g.to !== path);
    } else {
      siblings = filtered.slice(0, MAX_SIBLINGS);
    }
    return {
      guides: [reviewHub, ...siblings, paymentHub, bonusHub].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER + 1),
      subtitle: "Udforsk andre casino anmeldelser, betalingsmetoder og bonusser.",
    };
  }

  // Casino review hub
  if (path === "/casino-anmeldelser") {
    return {
      guides: [...allReviews.slice(0, MAX_SIBLINGS), bonusHub, bonusHuntArkivHub],
      subtitle: "Udforsk vores dybdegående casino anmeldelser og dokumenterede bonus hunt-resultater.",
    };
  }

  // ── ROULETTE CLUSTER: unique per-page related guides ──
  if (path === "/casinospil/roulette/martingale-roulette") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Guide", icon: Target, desc: "Komplet overblik over regler og varianter" },
        { to: "/casinospil/roulette/dalembert-roulette", label: "D'Alembert Strategi", icon: BarChart3, desc: "Lavrisiko-alternativ til Martingale" },
        { to: "/casinospil/roulette/labouchere-roulette", label: "Labouchère Strategi", icon: BookOpen, desc: "Fleksibel negativ progression" },
        { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette", icon: Star, desc: "2,70 % house edge – det optimale valg" },
        { to: "/omsaetningskrav", label: "Omsætningskrav", icon: Target, desc: "Hvordan bonuskrav påvirker din strategi" },
      ],
      subtitle: "Udforsk alternative strategier og de bedste roulette-varianter til Martingale.",
    };
  }

  if (path === "/casinospil/roulette/fibonacci-roulette") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Guide", icon: Target, desc: "Regler, odds og væddemålstyper" },
        { to: "/casinospil/roulette/martingale-roulette", label: "Martingale Strategi", icon: TrendingUp, desc: "Aggressiv dobling efter tab" },
        { to: "/casinospil/roulette/dalembert-roulette", label: "D'Alembert Strategi", icon: BarChart3, desc: "Blødere progression end Fibonacci" },
        { to: "/casinospil/roulette/fransk-roulette", label: "Fransk Roulette", icon: Star, desc: "La Partage halverer house edge" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Bonusser til din roulette-bankroll" },
      ],
      subtitle: "Sammenlign Fibonacci med andre systemer og find den bedste roulette-variant.",
    };
  }

  if (path === "/casinospil/roulette/dalembert-roulette") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Regler", icon: Target, desc: "Komplet guide til alle væddemål" },
        { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci Strategi", icon: BarChart3, desc: "Matematisk elegant progression" },
        { to: "/casinospil/roulette/james-bond-roulette", label: "James Bond Strategi", icon: Trophy, desc: "Flat bet-dækning over 25 numre" },
        { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette", icon: Star, desc: "Optimal variant for D'Alembert" },
        { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Sæt grænser og spil sikkert" },
      ],
      subtitle: "Udforsk relaterede strategier og find den optimale roulette-variant til D'Alembert.",
    };
  }

  if (path === "/casinospil/roulette/labouchere-roulette") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Guide", icon: Target, desc: "Regler, varianter og house edge" },
        { to: "/casinospil/roulette/martingale-roulette", label: "Martingale Strategi", icon: TrendingUp, desc: "Simpel dobling vs. Labouchère-sekvens" },
        { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci Strategi", icon: BarChart3, desc: "Naturlig talserie-progression" },
        { to: "/casinospil/roulette/amerikansk-roulette", label: "Amerikansk Roulette", icon: Zap, desc: "Dobbelt-nul og højere house edge" },
        { to: "/casinospil/blackjack", label: "Blackjack Strategi", icon: Gamepad2, desc: "Bordspil med lavere house edge" },
      ],
      subtitle: "Sammenlign Labouchère med andre progressionssystemer og bordspil.",
    };
  }

  if (path === "/casinospil/roulette/james-bond-roulette") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Regler", icon: Target, desc: "Komplet guide til roulettens regler" },
        { to: "/casinospil/roulette/dalembert-roulette", label: "D'Alembert Strategi", icon: BarChart3, desc: "Gradvis progression som alternativ" },
        { to: "/casinospil/roulette/labouchere-roulette", label: "Labouchère Strategi", icon: BookOpen, desc: "Avanceret sekvens-baseret system" },
        { to: "/casinospil/roulette/fransk-roulette", label: "Fransk Roulette", icon: Star, desc: "La Partage-reglen forbedrer Bond-oddsen" },
        { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil James Bond-strategien med live dealer" },
      ],
      subtitle: "Udforsk alternative systemer og de bedste varianter til James Bond-strategien.",
    };
  }

  if (path === "/casinospil/roulette/europaeisk-roulette") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Guide", icon: Target, desc: "Oversigt over alle varianter og strategier" },
        { to: "/casinospil/roulette/fransk-roulette", label: "Fransk Roulette", icon: Star, desc: "Endnu lavere house edge med La Partage" },
        { to: "/casinospil/roulette/amerikansk-roulette", label: "Amerikansk Roulette", icon: Zap, desc: "Dobbelt-nul – højere house edge" },
        { to: "/casinospil/roulette/martingale-roulette", label: "Martingale Strategi", icon: TrendingUp, desc: "Populær strategi til europæisk roulette" },
        { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming", icon: Tv, desc: "Førende live roulette-udbyder" },
      ],
      subtitle: "Sammenlign europæisk roulette med andre varianter og find den rette strategi.",
    };
  }

  if (path === "/casinospil/roulette/fransk-roulette") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Regler", icon: Target, desc: "Alle roulette-varianter sammenlignet" },
        { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette", icon: Star, desc: "Næstbedst uden La Partage" },
        { to: "/casinospil/roulette/dalembert-roulette", label: "D'Alembert Strategi", icon: BarChart3, desc: "Ideel strategi til even-money bets" },
        { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci Strategi", icon: BookOpen, desc: "Moderat progression til La Partage" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Bonusser der understøtter roulette" },
      ],
      subtitle: "Udforsk varianter og strategier der passer perfekt til fransk roulettes La Partage-regel.",
    };
  }

  if (path === "/casinospil/roulette/amerikansk-roulette") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Guide", icon: Target, desc: "Komplet overblik over roulette-varianter" },
        { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette", icon: Star, desc: "Halveret house edge uden dobbelt-nul" },
        { to: "/casinospil/roulette/fransk-roulette", label: "Fransk Roulette", icon: Star, desc: "Laveste house edge med La Partage" },
        { to: "/casinospil/roulette/james-bond-roulette", label: "James Bond Strategi", icon: Trophy, desc: "Bred dækning til højere volatilitet" },
        { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Hold styr på tabsgrænser" },
      ],
      subtitle: "Forstå forskellen på amerikansk roulette og bedre alternativer med lavere house edge.",
    };
  }

  // Roulette hub → link to all variants + strategies
  if (path === "/casinospil/roulette") {
    return {
      guides: [
        casinospilHub,
        { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette", icon: Star, desc: "Standardvarianten med 2,70 % house edge" },
        { to: "/casinospil/roulette/martingale-roulette", label: "Martingale Strategi", icon: TrendingUp, desc: "Den mest kendte roulette-strategi" },
        { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil roulette med live dealere" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Bonusser til roulette-spil" },
      ],
      subtitle: "Udforsk roulette-varianter, strategier og live casino-oplevelser.",
    };
  }

  // Roulette strategi overview
  if (path === "/casinospil/roulette-strategi") {
    return {
      guides: [
        { to: "/casinospil/roulette", label: "Roulette Regler", icon: Target, desc: "Grundlæggende regler og varianter" },
        { to: "/casinospil/roulette/martingale-roulette", label: "Martingale", icon: TrendingUp, desc: "Dobling efter tab – komplet analyse" },
        { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci", icon: BarChart3, desc: "Naturlig talserie-progression" },
        { to: "/casinospil/roulette/labouchere-roulette", label: "Labouchère", icon: BookOpen, desc: "Avanceret sekvens-system" },
        { to: "/casinospil/blackjack", label: "Blackjack Strategi", icon: Gamepad2, desc: "Bordspil med skill-baseret edge" },
      ],
      subtitle: "Dyk ned i specifikke strategier og sammenlign med andre bordspil.",
    };
  }

  // ── BLACKJACK CLUSTER: unique per-page related guides ──
  if (path === "/casinospil/blackjack/martingale") {
    return {
      guides: [
        { to: "/casinospil/blackjack", label: "Blackjack Guide", icon: Gamepad2, desc: "Komplet guide til regler og strategi" },
        { to: "/casinospil/blackjack/fibonacci", label: "Fibonacci Blackjack", icon: BarChart3, desc: "Blødere progression end Martingale" },
        { to: "/casinospil/blackjack/dalembert", label: "D'Alembert Blackjack", icon: BookOpen, desc: "Konservativ indsatsstyring" },
        { to: "/casinospil/roulette/martingale-roulette", label: "Martingale Roulette", icon: TrendingUp, desc: "Sammenlign med roulette-versionen" },
      ],
      subtitle: "Udforsk alternative blackjack-strategier og sammenlign med roulette.",
    };
  }

  if (path === "/casinospil/blackjack/fibonacci") {
    return {
      guides: [
        { to: "/casinospil/blackjack", label: "Blackjack Guide", icon: Gamepad2, desc: "Regler, odds og basic strategy" },
        { to: "/casinospil/blackjack/martingale", label: "Martingale Blackjack", icon: TrendingUp, desc: "Aggressiv dobling som alternativ" },
        { to: "/casinospil/blackjack/dalembert", label: "D'Alembert Blackjack", icon: BookOpen, desc: "Gradvis progression" },
        { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci Roulette", icon: BarChart3, desc: "Fibonacci anvendt på roulette" },
      ],
      subtitle: "Sammenlign Fibonacci med andre systemer og se forskellen på blackjack vs. roulette.",
    };
  }

  if (path === "/casinospil/blackjack/dalembert") {
    return {
      guides: [
        { to: "/casinospil/blackjack", label: "Blackjack Guide", icon: Gamepad2, desc: "Komplet blackjack-strategi" },
        { to: "/casinospil/blackjack/martingale", label: "Martingale Blackjack", icon: TrendingUp, desc: "Mere aggressiv progression" },
        { to: "/casinospil/blackjack/amerikansk-blackjack", label: "Amerikansk Blackjack", icon: Star, desc: "Populær variant med hole card" },
        { to: "/casinospil/roulette/dalembert-roulette", label: "D'Alembert Roulette", icon: BarChart3, desc: "D'Alembert på roulette-bordet" },
      ],
      subtitle: "Udforsk blackjack-varianter og sammenlign D'Alembert på tværs af spil.",
    };
  }

  if (path === "/casinospil/blackjack/amerikansk-blackjack") {
    return {
      guides: [
        { to: "/casinospil/blackjack", label: "Blackjack Guide", icon: Gamepad2, desc: "Alle blackjack-regler og strategier" },
        { to: "/casinospil/blackjack/europaeisk-blackjack", label: "Europæisk Blackjack", icon: Star, desc: "Ingen hole card – ændret strategi" },
        { to: "/casinospil/blackjack/double-exposure-blackjack", label: "Double Exposure", icon: Zap, desc: "Begge dealer-kort synlige" },
        { to: "/casinospil/blackjack/spanish-21", label: "Spanish 21", icon: Trophy, desc: "Ingen 10'ere – flere bonusregler" },
      ],
      subtitle: "Sammenlign amerikansk blackjack med andre varianter.",
    };
  }

  if (path === "/casinospil/blackjack/europaeisk-blackjack") {
    return {
      guides: [
        { to: "/casinospil/blackjack", label: "Blackjack Guide", icon: Gamepad2, desc: "Komplet oversigt over regler" },
        { to: "/casinospil/blackjack/amerikansk-blackjack", label: "Amerikansk Blackjack", icon: Star, desc: "Hole card-reglen sammenlignet" },
        { to: "/casinospil/blackjack/double-exposure-blackjack", label: "Double Exposure", icon: Zap, desc: "Begge kort åbne – unik variant" },
        { to: "/casinospil/blackjack/martingale", label: "Martingale Blackjack", icon: TrendingUp, desc: "Progression til europæisk blackjack" },
      ],
      subtitle: "Udforsk forskelle mellem europæisk og andre blackjack-varianter.",
    };
  }

  if (path === "/casinospil/blackjack/double-exposure-blackjack") {
    return {
      guides: [
        { to: "/casinospil/blackjack", label: "Blackjack Guide", icon: Gamepad2, desc: "Grundlæggende regler og odds" },
        { to: "/casinospil/blackjack/amerikansk-blackjack", label: "Amerikansk Blackjack", icon: Star, desc: "Standard hole card-variant" },
        { to: "/casinospil/blackjack/spanish-21", label: "Spanish 21", icon: Trophy, desc: "Anden unik blackjack-variant" },
        { to: "/live-casino/blackjack", label: "Live Blackjack", icon: Tv, desc: "Spil blackjack med live dealer" },
      ],
      subtitle: "Sammenlign Double Exposure med andre spændende blackjack-varianter.",
    };
  }

  if (path === "/casinospil/blackjack/spanish-21") {
    return {
      guides: [
        { to: "/casinospil/blackjack", label: "Blackjack Guide", icon: Gamepad2, desc: "Alle regler og strategier" },
        { to: "/casinospil/blackjack/double-exposure-blackjack", label: "Double Exposure", icon: Zap, desc: "Anden alternativ blackjack-variant" },
        { to: "/casinospil/blackjack/europaeisk-blackjack", label: "Europæisk Blackjack", icon: Star, desc: "Klassisk no-hole-card variant" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Bonusser til blackjack-spil" },
      ],
      subtitle: "Udforsk Spanish 21-alternativer og find de bedste bonusser til bordspil.",
    };
  }

  // ── POKER CLUSTER: unique per-page related guides ──
  if (path === "/casinospil/poker/texas-holdem") {
    return {
      guides: [
        { to: "/casinospil/poker", label: "Poker Guide", icon: Gamepad2, desc: "Komplet overblik over alle pokervarianter" },
        { to: "/casinospil/poker/omaha", label: "Omaha Poker", icon: Shuffle, desc: "4 hole cards – højere action og varians" },
        { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi", icon: Brain, desc: "GTO, pot odds og avanceret teori" },
        { to: "/casinospil/poker/three-card-poker", label: "Three Card Poker", icon: Zap, desc: "Hurtigt casino-bordspil med Pair Plus" },
        { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil poker med live dealere" },
      ],
      subtitle: "Udforsk andre pokervarianter, strategier og live casino-muligheder.",
    };
  }

  if (path === "/casinospil/poker/omaha") {
    return {
      guides: [
        { to: "/casinospil/poker", label: "Poker Guide", icon: Gamepad2, desc: "Hub med alle pokervarianter" },
        { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em", icon: Target, desc: "Verdens mest populære pokervariant" },
        { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi", icon: Brain, desc: "Bankroll, position og avanceret teori" },
        { to: "/casinospil/poker/caribbean-stud", label: "Caribbean Stud", icon: Trophy, desc: "5-kort poker mod dealeren" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Bonusser til poker-spil" },
      ],
      subtitle: "Sammenlign Omaha med andre pokervarianter og find de bedste strategier.",
    };
  }

  if (path === "/casinospil/poker/three-card-poker") {
    return {
      guides: [
        { to: "/casinospil/poker", label: "Poker Guide", icon: Gamepad2, desc: "Alle pokervarianter sammenlignet" },
        { to: "/casinospil/poker/caribbean-stud", label: "Caribbean Stud", icon: Trophy, desc: "Andet populært casino-bordspil" },
        { to: "/casinospil/poker/video-poker", label: "Video Poker", icon: Gamepad2, desc: "Solo poker med RTP op til 99,5 %" },
        { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em", icon: Target, desc: "Community-card poker klassikeren" },
        { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil Three Card Poker live" },
      ],
      subtitle: "Udforsk lignende casino-bordspil og pokervarianter.",
    };
  }

  if (path === "/casinospil/poker/caribbean-stud") {
    return {
      guides: [
        { to: "/casinospil/poker", label: "Poker Guide", icon: Gamepad2, desc: "Komplet oversigt over pokervarianter" },
        { to: "/casinospil/poker/three-card-poker", label: "Three Card Poker", icon: Zap, desc: "Hurtigere alternativ med Pair Plus" },
        { to: "/casinospil/poker/video-poker", label: "Video Poker", icon: Gamepad2, desc: "Solo poker med bedre RTP" },
        { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi", icon: Brain, desc: "Matematiske modeller og EV-analyse" },
        { to: "/ansvarligt-spil", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Sæt grænser og spil sikkert" },
      ],
      subtitle: "Sammenlign Caribbean Stud med andre poker-bordspil og strategier.",
    };
  }

  if (path === "/casinospil/poker/video-poker") {
    return {
      guides: [
        { to: "/casinospil/poker", label: "Poker Guide", icon: Gamepad2, desc: "Hub med alle pokervarianter" },
        { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi", icon: Brain, desc: "Avanceret strategiteori" },
        { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em", icon: Target, desc: "Multi-player poker online" },
        { to: "/casinospil/spillemaskiner", label: "Spillemaskiner", icon: Gamepad2, desc: "Sammenlign med slot-mekanikker" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Bonusser der understøtter video poker" },
      ],
      subtitle: "Udforsk pokervarianter, strategier og sammenlign med spillemaskiner.",
    };
  }

  if (path === "/casinospil/poker/poker-strategi") {
    return {
      guides: [
        { to: "/casinospil/poker", label: "Poker Guide", icon: Gamepad2, desc: "Alle pokervarianter sammenlignet" },
        { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em", icon: Target, desc: "Anvend strategien i praksis" },
        { to: "/casinospil/poker/omaha", label: "Omaha Poker", icon: Shuffle, desc: "Avanceret multi-draw strategi" },
        { to: "/casinospil/poker/video-poker", label: "Video Poker", icon: Gamepad2, desc: "Solo strategi med 99,5 % RTP" },
        { to: "/omsaetningskrav", label: "Omsætningskrav", icon: Target, desc: "Poker og bonusomsætning" },
      ],
      subtitle: "Anvend strategien på specifikke pokervarianter og forstå bonusvilkår.",
    };
  }

  // Poker hub
  if (path === "/casinospil/poker") {
    return {
      guides: [
        casinospilHub,
        { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em", icon: Target, desc: "Verdens mest populære pokervariant" },
        { to: "/casinospil/poker/video-poker", label: "Video Poker", icon: Gamepad2, desc: "Solo poker med op til 99,5 % RTP" },
        { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil poker med live dealere" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Bonusser til poker-spil" },
      ],
      subtitle: "Dyk ned i pokervarianter, strategier og live casino-muligheder.",
    };
  }

  // Blackjack hub
  if (path === "/casinospil/blackjack") {
    return {
      guides: [
        casinospilHub,
        { to: "/casinospil/blackjack/amerikansk-blackjack", label: "Amerikansk Blackjack", icon: Star, desc: "Den mest populære variant" },
        { to: "/casinospil/blackjack/martingale", label: "Martingale Blackjack", icon: TrendingUp, desc: "Progressionsstrategi til blackjack" },
        { to: "/live-casino/blackjack", label: "Live Blackjack", icon: Tv, desc: "Spil med live dealere" },
        { to: "/casino-bonus", label: "Casino Bonusser", icon: Gift, desc: "Bonusser med blackjack-bidrag" },
      ],
      subtitle: "Dyk ned i blackjack-varianter, strategier og live casino-muligheder.",
    };
  }

  // Casinospil subpages (generic fallback) → hub + 3 rotated siblings + 1 varied cross-cluster
  if (path.startsWith("/casinospil/") || path === "/live-casino") {
    const currentIndex = casinospilSiblings.findIndex(g => g.to === path);
    const filtered = casinospilSiblings.filter(g => g.to !== path);
    const len = casinospilSiblings.length;
    let siblings: GuideLink[];
    if (currentIndex >= 0) {
      siblings = [
        casinospilSiblings[(currentIndex + 2) % len],
        casinospilSiblings[(currentIndex + 5) % len],
        casinospilSiblings[(currentIndex + 9) % len],
      ].filter(g => g.to !== path);
    } else {
      siblings = filtered.slice(0, MAX_SIBLINGS);
    }
    const crossClusterOptions = [providerHub, bonusHub, slotDatabaseHub];
    const crossCluster = crossClusterOptions[currentIndex >= 0 ? currentIndex % 3 : 0];
    const subtitles = [
      "Udforsk andre casinospil og spiludviklere.",
      "Udforsk andre casinospil og de bedste bonusser.",
      "Udforsk andre casinospil og community slot-data.",
    ];
    return {
      guides: [casinospilHub, ...siblings, crossCluster].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: subtitles[currentIndex >= 0 ? currentIndex % 3 : 0],
    };
  }

  // Bonus subpages → hub + 3 rotated siblings + 1 varied cross-cluster
  if (
    path.startsWith("/velkomstbonus") || path.startsWith("/free-spins") ||
    path.startsWith("/indskudsbonus") || path.startsWith("/omsaetningskrav") ||
    path.startsWith("/no-sticky-bonus") || path.startsWith("/sticky-bonus") ||
    path.startsWith("/bonus-uden") || path === "/casino-bonus" ||
    path.startsWith("/cashback-bonus") || path.startsWith("/reload-bonus")
  ) {
    const currentIndex = bonusSiblings.findIndex(g => g.to === path);
    const len = bonusSiblings.length;
    const hub = path === "/casino-bonus" ? [] : [bonusHub];
    let siblings: GuideLink[];
    if (currentIndex >= 0) {
      siblings = [
        bonusSiblings[(currentIndex + 2) % len],
        bonusSiblings[(currentIndex + 5) % len],
        bonusSiblings[(currentIndex + 8) % len],
      ].filter(g => g.to !== path);
    } else {
      siblings = bonusSiblings.filter(g => g.to !== path).slice(0, MAX_SIBLINGS);
    }
    const crossClusterOptions = [reviewHub, bonusHuntArkivHub, casinospilHub];
    const crossCluster = crossClusterOptions[currentIndex >= 0 ? currentIndex % 3 : 0];
    const subtitles = [
      "Udforsk andre bonustyper og læs vores casino anmeldelser.",
      "Udforsk andre bonusguides og se dokumenterede bonus hunt-resultater.",
      "Udforsk andre bonusser og find de bedste casinospil.",
    ];
    return {
      guides: [...hub, ...siblings, crossCluster].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: subtitles[currentIndex >= 0 ? currentIndex % 3 : 0],
    };
  }

  // Nye casinoer cluster → rotated siblings + varied cross-cluster
  if (path.startsWith("/nye-casinoer/") || path === "/nye-casinoer") {
    const nyeCasinoerSiblings: GuideLink[] = [
      { to: "/nye-casinoer/2026", label: "Nye Casinoer 2026", icon: Sparkles, desc: "Alle nye casinoer i 2026" },
      { to: "/nye-casinoer/dansk-licens", label: "Med Dansk Licens", icon: ShieldCheck, desc: "Licenserede nye casinoer" },
      { to: "/nye-casinoer/hurtig-udbetaling", label: "Hurtig Udbetaling", icon: Zap, desc: "De hurtigste nye casinoer" },
      { to: "/nye-casinoer/bedste", label: "Bedste Nye Casinoer", icon: Trophy, desc: "Vores topvalg i 2026" },
      { to: "/nye-casinoer/lav-wagering", label: "Lav Wagering", icon: Target, desc: "Lave omsætningskrav" },
    ];
    const currentIndex = nyeCasinoerSiblings.findIndex(g => g.to === path);
    const hub: GuideLink[] = path === "/nye-casinoer" ? [] : [{ to: "/nye-casinoer", label: "Nye Casinoer", icon: Sparkles, desc: "Komplet hub med alle nye casinoer" }];
    const len = nyeCasinoerSiblings.length;
    let siblings: GuideLink[];
    if (currentIndex >= 0) {
      siblings = [
        nyeCasinoerSiblings[(currentIndex + 1) % len],
        nyeCasinoerSiblings[(currentIndex + 3) % len],
        nyeCasinoerSiblings[(currentIndex + 4) % len],
      ].filter(g => g.to !== path);
    } else {
      siblings = nyeCasinoerSiblings.filter(g => g.to !== path).slice(0, MAX_SIBLINGS);
    }
    const crossClusterOptions = [bonusHub, slotDatabaseHub, turneringsArkivHub];
    const crossCluster = crossClusterOptions[currentIndex >= 0 ? currentIndex % 3 : 0];
    const subtitles = [
      "Udforsk flere nye casinoer og de bedste bonusser.",
      "Udforsk flere nye casinoer og community slot-statistikker.",
      "Udforsk flere nye casinoer og se turneringsresultater.",
    ];
    return {
      guides: [...hub, ...siblings, crossCluster].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: subtitles[currentIndex >= 0 ? currentIndex % 3 : 0],
    };
  }

  // Casino guides subpages → rotated siblings + varied cross-cluster
  if (path.startsWith("/casinoer/") || path === "/casino-licenser") {
    const currentIndex = casinoGuidesSiblings.findIndex(g => g.to === path);
    const len = casinoGuidesSiblings.length;
    let siblings: GuideLink[];
    if (currentIndex >= 0) {
      siblings = [
        casinoGuidesSiblings[(currentIndex + 2) % len],
        casinoGuidesSiblings[(currentIndex + 4) % len],
        casinoGuidesSiblings[(currentIndex + 6) % len],
      ].filter(g => g.to !== path);
    } else {
      siblings = casinoGuidesSiblings.filter(g => g.to !== path).slice(0, MAX_SIBLINGS);
    }
    const crossClusterOptions = [bonusHub, reviewHub, casinospilHub];
    const crossCluster = crossClusterOptions[currentIndex >= 0 ? currentIndex % 3 : 0];
    const subtitles = [
      "Udforsk andre casino-guides og de bedste bonusser.",
      "Udforsk andre casino-guides og læs anmeldelser.",
      "Udforsk andre casino-guides og casinospil.",
    ];
    return {
      guides: [{ to: "/casinoer", label: "Alle Casinoer", icon: Layers, desc: "Komplet hub for alle casino-kategorier" }, ...siblings, crossCluster].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: subtitles[currentIndex >= 0 ? currentIndex % 3 : 0],
    };
  }

  // General / fallback pages → balanced mix (hub links only)
  return {
    guides: [bonusHub, paymentHub, providerHub, reviewHub],
    subtitle: "Udforsk vores dybdegående guides til bonusser, betalingsmetoder og spiludviklere.",
  };
}

interface RelatedGuidesProps {
  currentPath: string;
  maxLinks?: number;
}

export const RelatedGuides = React.forwardRef<HTMLElement, RelatedGuidesProps>(function RelatedGuides({ currentPath, maxLinks = 5 }, ref) {
  const { guides, subtitle } = getContextualGuides(currentPath);
  const filteredLinks = guides.filter((link) => link.to !== currentPath).slice(0, maxLinks);

  // Extract casino name for review pages to show latest news
  const isReviewPage = currentPath.startsWith("/casino-anmeldelser/") && currentPath !== "/casino-anmeldelser";
  const casinoNameForNews = isReviewPage
    ? allReviews.find(r => r.to === currentPath)?.label || ""
    : "";

  return (
    <>
      {isReviewPage && casinoNameForNews && (
        <CasinoLatestNews casinoName={casinoNameForNews} />
      )}
      <Separator className="my-10" />
      <section ref={ref} className="mb-12">
        <h2 className="mb-4 text-3xl font-bold">
          <BookOpen className="mr-2 inline h-7 w-7 text-primary" />
          Relaterede Guides
        </h2>
        <p className="mb-6 text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <link.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">{link.label}</h3>
                <p className="text-xs text-muted-foreground">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
});
