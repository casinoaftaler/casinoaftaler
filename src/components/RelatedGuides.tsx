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
  Users,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface GuideLink {
  to: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}

// === BONUS GUIDES ===
const bonusGuides: GuideLink[] = [
  { to: "/velkomstbonus", label: "Velkomstbonus", icon: Trophy, desc: "Få mest ud af din første indbetaling" },
  { to: "/free-spins", label: "Free Spins", icon: Sparkles, desc: "Gratis spins på populære spilleautomater" },
  { to: "/indskudsbonus", label: "Indskudsbonus", icon: CreditCard, desc: "Matchbonusser der fordobler dit indskud" },
  { to: "/omsaetningskrav", label: "Omsætningskrav", icon: Target, desc: "Forstå gennemspilningskrav på bonusser" },
  { to: "/no-sticky-bonus", label: "No-Sticky Bonus", icon: Zap, desc: "Bonusser med adskillelse af midler" },
  { to: "/sticky-bonus", label: "Sticky Bonus", icon: Gift, desc: "Klæbende bonusser med større beløb" },
  { to: "/bonus-uden-indbetaling", label: "Bonus uden Indbetaling", icon: Gift, desc: "Spil gratis uden at indbetale" },
  { to: "/bonus-uden-omsaetningskrav", label: "Uden Omsætningskrav", icon: Zap, desc: "Hæv gevinster med det samme" },
  { to: "/casino-bonus", label: "Casino Bonus Oversigt", icon: Trophy, desc: "Komplet oversigt over alle bonustyper" },
];

// === PAYMENT GUIDES ===
const paymentGuides: GuideLink[] = [
  { to: "/betalingsmetoder", label: "Betalingsmetoder Oversigt", icon: Wallet, desc: "Sammenlign alle betalingsløsninger" },
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

// === PROVIDER GUIDES ===
const providerGuides: GuideLink[] = [
  { to: "/spiludviklere", label: "Spiludviklere Oversigt", icon: Gamepad2, desc: "Alle spiludbydere på danske casinoer" },
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

// === CASINO REVIEW GUIDES ===
const casinoReviewGuides: GuideLink[] = [
  { to: "/casino-anmeldelser", label: "Casino Anmeldelser", icon: BookOpen, desc: "Oversigt over alle anmeldelser" },
  { to: "/spildansknu-anmeldelse", label: "SpilDanskNu", icon: Star, desc: "Dansk casino med 10x omsætningskrav" },
  { to: "/spilleautomaten-anmeldelse", label: "Spilleautomaten", icon: Gamepad2, desc: "Bredt spiludvalg og hurtige udbetalinger" },
  { to: "/betinia-anmeldelse", label: "Betinia", icon: Trophy, desc: "Moderne casino med store bonusser" },
  { to: "/swift-casino-anmeldelse", label: "Swift Casino", icon: Zap, desc: "Hurtigt og enkelt casinooplevelse" },
  { to: "/campobet-anmeldelse", label: "Campobet", icon: Star, desc: "Casino og sportsbetting i ét" },
  { to: "/luna-casino-anmeldelse", label: "Luna Casino", icon: Sparkles, desc: "Nyt dansk casino med stærk bonus" },
];

// === GENERAL / MIXED GUIDES ===
const generalGuides: GuideLink[] = [
  { to: "/live-casino", label: "Live Casino", icon: Tv, desc: "Spil med rigtige dealere i realtid" },
  { to: "/nye-casinoer", label: "Nye Casinoer", icon: Sparkles, desc: "De seneste casinoer med dansk licens" },
  { to: "/top-casino-online", label: "Top 10 Casino", icon: Trophy, desc: "De bedste online casinoer i Danmark" },
  { to: "/casinospil", label: "Casinospil", icon: Gamepad2, desc: "Udforsk alle typer casinospil" },
  { to: "/casinospil/spillemaskiner", label: "Spillemaskiner", icon: Gamepad2, desc: "Guide til alle typer online slots" },
  { to: "/responsible-gaming", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
  { to: "/spillemyndigheden", label: "Spillemyndigheden", icon: Globe, desc: "Danmarks tilsynsmyndighed for spil" },
];

// === LEGAL / RESPONSIBLE GAMING GUIDES ===
const legalGuides: GuideLink[] = [
  { to: "/privacy", label: "Privatlivspolitik", icon: ShieldCheck, desc: "Læs om hvordan vi beskytter dine data" },
  { to: "/terms", label: "Vilkår og Betingelser", icon: BookOpen, desc: "Vores generelle vilkår for brug af sitet" },
  { to: "/cookies", label: "Cookiepolitik", icon: Globe, desc: "Information om vores brug af cookies" },
  { to: "/responsible-gaming", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
  { to: "/spillemyndigheden", label: "Spillemyndigheden", icon: Landmark, desc: "Danmarks tilsynsmyndighed for spil" },
];

// === COMMUNITY GUIDES ===
const communityGuides: GuideLink[] = [
  { to: "/community/slots", label: "Spillehal", icon: Gamepad2, desc: "Prøv vores gratis slot maskiner" },
  { to: "/highlights", label: "Highlights & Clips", icon: Tv, desc: "Se de bedste øjeblikke fra streamen" },
  { to: "/community/leaderboard", label: "Leaderboard", icon: Trophy, desc: "Se hvem der topper ranglisten" },
  { to: "/butik", label: "Butik", icon: Gift, desc: "Brug dine point på præmier" },
  { to: "/community/rewards", label: "Rewards", icon: Star, desc: "Optjen point og belønninger" },
];

/**
 * Determine the category of the current page and return relevant guides
 */
function getContextualGuides(currentPath: string): { guides: GuideLink[]; subtitle: string } {
  const path = currentPath.toLowerCase();

  // Community rewards page → show only relevant bonus guides
  if (path === "/community/rewards") {
    return {
      guides: [
        bonusGuides.find(g => g.to === "/free-spins")!,
        bonusGuides.find(g => g.to === "/omsaetningskrav")!,
        bonusGuides.find(g => g.to === "/bonus-uden-indbetaling")!,
        bonusGuides.find(g => g.to === "/indskudsbonus")!,
      ],
      subtitle: "Lær mere om bonusser, omsætningskrav og gratis spins på danske casinoer.",
    };
  }

  // Legal / responsible gaming pages → show other legal + responsible gaming guides
  if (path === "/privacy" || path === "/terms" || path === "/cookies" || path === "/responsible-gaming" || path === "/spillemyndigheden") {
    return {
      guides: legalGuides,
      subtitle: "Udforsk vores andre sider om ansvarligt spil, databeskyttelse og juridiske vilkår.",
    };
  }

  // Payment method pages → show other payment guides + a few general
  if (path.startsWith("/betalingsmetoder")) {
    return {
      guides: [...paymentGuides, ...generalGuides.slice(0, 2)],
      subtitle: "Udforsk vores andre dybdegående guides til betalingsmetoder på danske casinoer.",
    };
  }

  // Provider pages → show other provider guides + a few general
  if (path.startsWith("/spiludviklere")) {
    return {
      guides: [...providerGuides, ...generalGuides.slice(0, 2)],
      subtitle: "Udforsk vores andre dybdegående guides til populære spiludviklere på danske casinoer.",
    };
  }

  // Casino review pages → show other reviews + a few bonus/general
  if (path.includes("-anmeldelse") || path === "/casino-anmeldelser") {
    return {
      guides: [...casinoReviewGuides, ...bonusGuides.slice(0, 3), ...generalGuides.slice(0, 2)],
      subtitle: "Udforsk vores dybdegående anmeldelser og guides til danske online casinoer.",
    };
  }

  // Bonus pages → show other bonus guides + a few general
  if (
    path.startsWith("/velkomstbonus") ||
    path.startsWith("/free-spins") ||
    path.startsWith("/indskudsbonus") ||
    path.startsWith("/omsaetningskrav") ||
    path.startsWith("/no-sticky-bonus") ||
    path.startsWith("/sticky-bonus") ||
    path.startsWith("/bonus-uden") ||
    path.startsWith("/casino-bonus")
  ) {
    return {
      guides: [...bonusGuides, ...generalGuides.slice(0, 2)],
      subtitle: "Udforsk vores andre dybdegående guides og bliv klogere på alt inden for casino bonusser i Danmark.",
    };
  }

  // General / casino pages → show a mix of everything
  return {
    guides: [
      ...bonusGuides.slice(0, 3),
      ...paymentGuides.slice(0, 2),
      ...providerGuides.slice(0, 2),
      ...casinoReviewGuides.slice(0, 2),
      ...generalGuides,
    ],
    subtitle: "Udforsk vores dybdegående guides til bonusser, betalingsmetoder, spiludviklere og casino anmeldelser.",
  };
}

interface RelatedGuidesProps {
  currentPath: string;
  maxLinks?: number;
}

export function RelatedGuides({ currentPath, maxLinks = 6 }: RelatedGuidesProps) {
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
        <h2 className="mb-4 text-2xl font-bold">
          <Users className="mr-2 inline h-6 w-6 text-primary" />
          Vores Community
        </h2>
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          Bliv en del af vores community – spil gratis slots, deltag i turneringer, og vind præmier.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {communityGuides.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 transition-colors hover:border-primary/50 hover:bg-primary/10"
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
