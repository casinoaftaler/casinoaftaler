import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  Star,
  Gamepad2,
  Wallet,
  Landmark,
  Smartphone,
  Globe,
  BarChart3,
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

const reviewSiblings: GuideLink[] = [
  { to: "/spildansknu-anmeldelse", label: "SpilDanskNu", icon: Star, desc: "Dansk casino med 10x omsætningskrav" },
  { to: "/spilleautomaten-anmeldelse", label: "Spilleautomaten", icon: Gamepad2, desc: "Bredt spiludvalg og hurtige udbetalinger" },
  { to: "/betinia-anmeldelse", label: "Betinia", icon: Trophy, desc: "Moderne casino med store bonusser" },
  { to: "/swift-casino-anmeldelse", label: "Swift Casino", icon: Zap, desc: "Hurtigt og enkelt casinooplevelse" },
  { to: "/campobet-anmeldelse", label: "Campobet", icon: Star, desc: "Casino og sportsbetting i ét" },
  { to: "/luna-casino-anmeldelse", label: "Luna Casino", icon: Sparkles, desc: "Nyt dansk casino med stærk bonus" },
];

const casinospilSiblings: GuideLink[] = [
  { to: "/casinospil/spillemaskiner", label: "Spillemaskiner", icon: Gamepad2, desc: "Guide til alle typer online slots" },
  { to: "/casinospil/spillemaskiner/hoej-rtp", label: "Høj RTP Slots", icon: BarChart3, desc: "Find spillemaskiner med bedst tilbagebetaling" },
  { to: "/casinospil/blackjack", label: "Blackjack Regler", icon: Gamepad2, desc: "Komplet guide til online blackjack" },
  { to: "/casinospil/roulette", label: "Roulette Regler", icon: Target, desc: "Lær roulettens væddemål og varianter" },
  { to: "/casinospil/poker", label: "Poker Regler", icon: Gamepad2, desc: "Guide til casino poker og Video Poker" },
  { to: "/casinospil/craps", label: "Craps Regler", icon: Gamepad2, desc: "Terningspillet med de bedste odds" },
  { to: "/casinospil/baccarat", label: "Baccarat Regler", icon: Trophy, desc: "Elegancens kortspil med lav house edge" },
  { to: "/casinospil/roulette-strategi", label: "Roulette Strategi", icon: BarChart3, desc: "Martingale, Fibonacci og mere" },
  { to: "/casinospil/online-lotteri", label: "Online Lotteri", icon: Sparkles, desc: "Lotto, Keno og skrabespil" },
  { to: "/casinospil/game-shows", label: "Game Shows", icon: Tv, desc: "Crazy Time, Monopoly Live og mere" },
  { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil med rigtige dealere i realtid" },
];

const legalLinks: GuideLink[] = [
  { to: "/responsible-gaming", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
  { to: "/spillemyndigheden", label: "Spillemyndigheden", icon: Landmark, desc: "Danmarks tilsynsmyndighed for spil" },
  { to: "/privacy", label: "Privatlivspolitik", icon: ShieldCheck, desc: "Læs om hvordan vi beskytter dine data" },
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

  // Legal pages → show other legal links only
  if (path === "/privacy" || path === "/terms" || path === "/cookies" || path === "/responsible-gaming" || path === "/spillemyndigheden") {
    return {
      guides: legalLinks,
      subtitle: "Udforsk vores andre sider om ansvarligt spil, databeskyttelse og juridiske vilkår.",
    };
  }

  // Community rewards → limited bonus guides
  if (path === "/community/rewards") {
    return {
      guides: [bonusHub, ...bonusSiblings.filter(g => ["/free-spins", "/omsaetningskrav", "/bonus-uden-indbetaling"].includes(g.to))],
      subtitle: "Lær mere om bonusser, omsætningskrav og gratis spins på danske casinoer.",
    };
  }

  // Payment subpages → hub + 3 siblings + 1 cross-cluster
  if (path.startsWith("/betalingsmetoder/")) {
    const siblings = paymentSiblings.filter(g => g.to !== path).slice(0, MAX_SIBLINGS);
    return {
      guides: [paymentHub, ...siblings, bonusHub].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: "Udforsk andre betalingsmetoder på danske casinoer.",
    };
  }

  // Payment hub → 3 popular siblings + 1 cross-cluster
  if (path === "/betalingsmetoder") {
    return {
      guides: [...paymentSiblings.slice(0, MAX_SIBLINGS), casinospilHub],
      subtitle: "Udforsk vores dybdegående guides til populære betalingsmetoder.",
    };
  }

  // Provider subpages → hub + 3 siblings + 1 cross-cluster
  if (path.startsWith("/spiludviklere/")) {
    const siblings = providerSiblings.filter(g => g.to !== path).slice(0, MAX_SIBLINGS);
    return {
      guides: [providerHub, ...siblings, casinospilHub].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: "Udforsk andre spiludviklere på danske casinoer.",
    };
  }

  // Provider hub → 3 popular siblings + 1 cross-cluster
  if (path === "/spiludviklere") {
    return {
      guides: [...providerSiblings.slice(0, MAX_SIBLINGS), casinospilHub],
      subtitle: "Udforsk vores dybdegående guides til populære spiludviklere.",
    };
  }

  // Casino review subpages → hub + 3 siblings + 1 cross-cluster
  if (path.includes("-anmeldelse")) {
    const siblings = reviewSiblings.filter(g => g.to !== path).slice(0, MAX_SIBLINGS);
    return {
      guides: [reviewHub, ...siblings, bonusHub].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: "Udforsk andre casino anmeldelser på danske casinoer.",
    };
  }

  // Casino review hub
  if (path === "/casino-anmeldelser") {
    return {
      guides: [...reviewSiblings.slice(0, MAX_SIBLINGS), bonusHub],
      subtitle: "Udforsk vores dybdegående casino anmeldelser.",
    };
  }

  // Casinospil subpages → hub + 3 siblings + 1 cross-cluster
  if (path.startsWith("/casinospil/") || path === "/live-casino") {
    const siblings = casinospilSiblings.filter(g => g.to !== path).slice(0, MAX_SIBLINGS);
    return {
      guides: [casinospilHub, ...siblings, providerHub].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: "Udforsk andre casinospil og regler.",
    };
  }

  // Bonus subpages → hub + 3 siblings + 1 cross-cluster
  if (
    path.startsWith("/velkomstbonus") || path.startsWith("/free-spins") ||
    path.startsWith("/indskudsbonus") || path.startsWith("/omsaetningskrav") ||
    path.startsWith("/no-sticky-bonus") || path.startsWith("/sticky-bonus") ||
    path.startsWith("/bonus-uden") || path === "/casino-bonus"
  ) {
    const siblings = bonusSiblings.filter(g => g.to !== path).slice(0, MAX_SIBLINGS);
    const hub = path === "/casino-bonus" ? [] : [bonusHub];
    return {
      guides: [...hub, ...siblings, reviewHub].slice(0, MAX_SIBLINGS + 1 + MAX_CROSS_CLUSTER),
      subtitle: "Udforsk andre bonusguides til danske casinoer.",
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

export function RelatedGuides({ currentPath, maxLinks = 5 }: RelatedGuidesProps) {
  const { guides, subtitle } = getContextualGuides(currentPath);
  const filteredLinks = guides.filter((link) => link.to !== currentPath).slice(0, maxLinks);

  return (
    <>
      <Separator className="my-10" />
      <section className="mb-12">
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

      <section className="mb-12">
        <Card className="border-border bg-card border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Ansvarligt Spil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Spil skal altid være underholdning. Sæt grænser for tid og penge, og stop hvis det ikke længere er sjovt.
              Alle casinoer på vores side har dansk licens og tilbyder selvudelukkelse via{" "}
              <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>.
              Har du brug for hjælp? Kontakt{" "}
              <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>{" "}
              – gratis og anonymt. 18+ | Spil ansvarligt | Annoncering
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
