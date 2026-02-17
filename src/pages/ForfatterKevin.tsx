import { useState, useCallback } from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, SITE_URL } from "@/lib/seo";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CasinoCard } from "@/components/CasinoCard";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  User,
  CalendarDays,
  BookOpen,
  Gamepad2,
  Star,
  Tv,
  Heart,
  Zap,
  Trophy,
  Users,
  MapPin,
  ShieldCheck,
  Scale,
  CheckCircle2,
  BadgeCheck,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Code,
} from "lucide-react";
import kevinImage from "@/assets/kevin-forfatter.png";

const FEATURED_SLUGS = ["betinia", "campobet", "spildansknu"];

const faqs = [
  {
    question: "Hvad er Kevins rolle på Casinoaftaler.dk?",
    answer:
      "Kevin er streamer, forfatter og IT-medansvarlig på Casinoaftaler.dk. Han bidrager med praktisk erfaring fra live-streams, casinotests og platformudvikling.",
  },
  {
    question: "Streamer Kevin casino live?",
    answer:
      "Ja, Kevin streamer jævnligt slots og bonushunts på Twitch med fokus på rolig atmosfære, god musik og community-dialog.",
  },
  {
    question: "Tester Kevin selv casinoer?",
    answer:
      "Ja, Kevin deltager aktivt i test og gennemgang af danske online casinoer og bidrager med first-hand erfaring fra live gameplay og bonusanalyse.",
  },
  {
    question: "Hvad er Kevins speciale?",
    answer:
      "Kevins specialer inkluderer slot-analyse, RTP-forståelse, bonusvilkår og community-engagement. Han har desuden solid erfaring med platformudvikling og teknisk optimering.",
  },
];

const kevinArticles = [
  // Betalingsmetoder
  { title: "MobilePay Casino Guide", path: "/betalingsmetoder/mobilepay", category: "Guide", date: "17-02-2026", readTime: "10 min.", excerpt: "Alt om MobilePay som betalingsmetode hos danske online casinoer." },
  { title: "Trustly Casino Guide", path: "/betalingsmetoder/trustly", category: "Guide", date: "17-02-2026", readTime: "9 min.", excerpt: "Hurtige indbetalinger og udbetalinger med Trustly." },
  { title: "Visa Casino Guide", path: "/betalingsmetoder/visa", category: "Guide", date: "17-02-2026", readTime: "8 min.", excerpt: "Brug Visa til sikre casino-transaktioner." },
  { title: "Mastercard Casino Guide", path: "/betalingsmetoder/mastercard", category: "Guide", date: "17-02-2026", readTime: "8 min.", excerpt: "Alt om Mastercard som betalingsmetode på casinoer." },
  { title: "Neteller Casino Guide", path: "/betalingsmetoder/neteller", category: "Guide", date: "17-02-2026", readTime: "7 min.", excerpt: "Neteller – e-wallet til hurtige casino-transaktioner." },
  { title: "Skrill Casino Guide", path: "/betalingsmetoder/skrill", category: "Guide", date: "17-02-2026", readTime: "7 min.", excerpt: "Skrill som betalingsmetode hos online casinoer." },
  { title: "Apple Pay Casino Guide", path: "/betalingsmetoder/apple-pay", category: "Guide", date: "17-02-2026", readTime: "7 min.", excerpt: "Betal med Apple Pay på danske online casinoer." },
  { title: "Paysafecard Casino Guide", path: "/betalingsmetoder/paysafecard", category: "Guide", date: "17-02-2026", readTime: "7 min.", excerpt: "Anonym indbetaling med Paysafecard." },
  { title: "Bankoverførsel Casino Guide", path: "/betalingsmetoder/bankoverfoerelse", category: "Guide", date: "17-02-2026", readTime: "7 min.", excerpt: "Direkte bankoverførsel til og fra casinoer." },
  // Spiludviklere
  { title: "NetEnt – Spiludvikler Guide", path: "/spiludviklere/netent", category: "Guide", date: "17-02-2026", readTime: "10 min.", excerpt: "Alt om NetEnt – en af verdens førende spiludviklere." },
  { title: "Pragmatic Play Guide", path: "/spiludviklere/pragmatic-play", category: "Guide", date: "17-02-2026", readTime: "9 min.", excerpt: "Pragmatic Play – populære slots og live casino-spil." },
  { title: "Play'n GO Guide", path: "/spiludviklere/play-n-go", category: "Guide", date: "17-02-2026", readTime: "9 min.", excerpt: "Play'n GO – innovativ spiludvikler med dansk fokus." },
  { title: "Evolution Gaming Guide", path: "/spiludviklere/evolution", category: "Guide", date: "17-02-2026", readTime: "10 min.", excerpt: "Evolution – markedsleder inden for live casino." },
  { title: "Nolimit City Guide", path: "/spiludviklere/nolimit-city", category: "Guide", date: "17-02-2026", readTime: "8 min.", excerpt: "Nolimit City – høj volatilitet og unikke mekanikker." },
  { title: "Push Gaming Guide", path: "/spiludviklere/push-gaming", category: "Guide", date: "17-02-2026", readTime: "8 min.", excerpt: "Push Gaming – kreative slots med innovative features." },
  { title: "Hacksaw Gaming Guide", path: "/spiludviklere/hacksaw-gaming", category: "Guide", date: "17-02-2026", readTime: "8 min.", excerpt: "Hacksaw Gaming – moderne slots med høj gevinst-potentiale." },
  // Mere-sider
  { title: "Ansvarligt Spil Guide", path: "/ansvarligt-spil", category: "Guide", date: "17-02-2026", readTime: "12 min.", excerpt: "Alt om ansvarligt spil, selvudelukkelse og hjælp til spilleproblemer." },
  { title: "Spillemyndigheden – Dansk Licens", path: "/spillemyndigheden", category: "Guide", date: "17-02-2026", readTime: "10 min.", excerpt: "Information om Spillemyndigheden og den danske spillicens." },
  { title: "ROFUS Registrering", path: "/rofus", category: "Guide", date: "17-02-2026", readTime: "8 min.", excerpt: "Komplet guide til ROFUS – det danske register over frivilligt udelukkede spillere." },
  { title: "Sådan Tester Vi Casinoer", path: "/saadan-tester-vi-casinoer", category: "Guide", date: "17-02-2026", readTime: "9 min.", excerpt: "Vores metode og kriterier for casino-anmeldelser." },
  { title: "Forretningsmodel", path: "/forretningsmodel", category: "Guide", date: "17-02-2026", readTime: "6 min.", excerpt: "Sådan finansieres Casinoaftaler.dk og vores affiliate-model." },
  { title: "Redaktionel Politik", path: "/redaktionel-politik", category: "Guide", date: "17-02-2026", readTime: "6 min.", excerpt: "Vores redaktionelle retningslinjer og uafhængighed." },
];

const expertiseItems = [
  { icon: Gamepad2, label: "Slots & RTP-forståelse" },
  { icon: Tv, label: "Live gameplay analyse" },
  { icon: FileText, label: "Bonusvilkår" },
  { icon: Users, label: "Community engagement" },
  { icon: Code, label: "Platformfeedback & udvikling" },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kevin",
  url: `${SITE_URL}/forfatter/kevin`,
  image: "https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/casino-logos/kevin-forfatter.png",
  jobTitle: "Casino Streamer & Content Writer",
  worksFor: {
    "@type": "Organization",
    name: "Casinoaftaler.dk",
    url: SITE_URL,
  },
  sameAs: [
    "https://www.twitch.tv/fedesvinansen",
  ],
  knowsAbout: [
    "Online Casino",
    "Casinospil",
    "Bonusvilkår",
    "Slot-analyse",
    "Community Engagement",
  ],
  description:
    "Kevin er streamer og forfatter på Casinoaftaler.dk med fokus på casinospil, bonusanalyse og teknisk udvikling af platformen.",
};


export default function ForfatterKevin() {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const [articlePage, setArticlePage] = useState(0);
  const heroBackgroundImage = siteSettings?.hero_background;

  const ARTICLES_PER_PAGE = 8;
  const totalArticlePages = Math.ceil(kevinArticles.length / ARTICLES_PER_PAGE);
  const visibleArticles = kevinArticles.slice(
    articlePage * ARTICLES_PER_PAGE,
    (articlePage + 1) * ARTICLES_PER_PAGE
  );
  const prevArticlePage = useCallback(() => setArticlePage((p) => Math.max(0, p - 1)), []);
  const nextArticlePage = useCallback(() => setArticlePage((p) => Math.min(totalArticlePages - 1, p + 1)), [totalArticlePages]);

  const featuredCasinos = (casinos ?? []).filter((c) =>
    FEATURED_SLUGS.includes(c.slug)
  );

  const mapCasino = (casino: (typeof featuredCasinos)[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: Number(casino.rating),
    bonusTitle: casino.bonus_title,
    bonusAmount: casino.bonus_amount,
    bonusType: casino.bonus_type,
    wageringRequirements: casino.wagering_requirements,
    validity: casino.validity,
    minDeposit: casino.min_deposit,
    payoutTime: casino.payout_time,
    freeSpins: casino.free_spins,
    features: casino.features ?? [],
    pros: casino.pros ?? [],
    cons: casino.cons ?? [],
    description: casino.description ?? "",
    isRecommended: casino.is_recommended,
    isHot: casino.is_hot,
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
    gameProviders: casino.game_providers ?? [],
  });

  const faqJsonLd = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Kevin – Streamer & Casinoanalytiker | Casinoaftaler.dk"
        description="Mød Kevin – casino-streamer, forfatter og IT-medansvarlig hos Casinoaftaler.dk. Læs om hans streamingstil, ekspertise og anbefalede casinoer."
        jsonLd={[faqJsonLd, personSchema]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">
                <User className="mr-1.5 h-3.5 w-3.5" />
                Forfatter
              </Badge>
              <Badge variant="secondary">
                <Tv className="mr-1.5 h-3.5 w-3.5" />
                Casino-streamer
              </Badge>
              <Badge variant="secondary">
                <Code className="mr-1.5 h-3.5 w-3.5" />
                Medudvikler
              </Badge>
            </div>
            <div className="mb-4 flex items-center justify-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Kevin – Streamer &amp; Casinoanalytiker
              </h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary-foreground/90 border border-primary/30 cursor-default">
                      <BadgeCheck className="h-4 w-4" />
                      Verificeret profil
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs text-center">
                    Aktiv skribent og streamer tilknyttet Casinoaftaler.dk
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-lg text-white/80">
              Streamer og forfatter på Casinoaftaler.dk med fokus på casinospil, bonusanalyse og teknisk udvikling af platformen.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="17-02-2026" readTime="5 Min." />

        {/* Profile card */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={kevinImage}
                alt="Kevin – Casino-streamer & IT medansvarlig hos Casinoaftaler.dk"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-lg"
                loading="eager"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Om Kevin</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <User className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rolle</p>
                    <p className="text-sm font-medium">Streamer & forfatter</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Speciale</p>
                    <p className="text-sm font-medium">Slots & turneringer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Tv className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Platform</p>
                    <p className="text-sm font-medium">Twitch / YouTube</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fokusområde</p>
                    <p className="text-sm font-medium">Bonusvilkår & gameplay</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Aktiv siden</p>
                    <p className="text-sm font-medium">2021</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Trophy className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Største gevinst</p>
                    <p className="text-sm font-medium">5.000x</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Kevin er streamer og forfatter på Casinoaftaler.dk og bidrager med praktisk erfaring fra live-spil og casinotests.
                Han deltager aktivt i community-turneringer og arbejder med udvikling og forbedring af platformens funktioner.
                Hans ekspertise dækker alt fra{" "}
                <Link to="/casinospil" className="text-primary hover:underline">casinospil</Link> og bonusanalyse til
                teknisk optimering, og han følger nøje{" "}
                <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">hvordan vi tester casinoer</Link>.
                Læs mere om{" "}
                <Link to="/community" className="text-primary hover:underline">vores community</Link>.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Ekspertise & Erfaring */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <BadgeCheck className="h-7 w-7 text-primary" />
            Ekspertise & Erfaring
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseItems.map((item) => (
              <Card
                key={item.label}
                className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Dokumenteret erfaring */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Dokumenteret Erfaring
          </h2>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-accent/20 p-6">
            <p className="text-muted-foreground leading-relaxed">
              Kevin har deltaget i test og gennemgang af en lang række danske online casinoer og bidrager med first-hand erfaring fra live-streams og gameplay.
              Han har stremet slots i over tre år og er kendt for sin analytiske tilgang til bonusvilkår, RTP-vurdering og spillemønstre.
              Kevin arbejder desuden som IT-medansvarlig for Casinoaftaler.dk og bidrager til platformens tekniske udvikling og kvalitetssikring.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Baggrund og Motivation */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Baggrund og Motivation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kevin er 26 år og har streamet slots i mere end tre år. Han mødte{" "}
            <Link to="/forfatter/jonas" className="text-primary hover:underline">Jonas</Link> gennem Twitch,
            hvor de hurtigt fandt fælles interesse for streaming, online casino og opbygning af engagerede
            communities. Siden har de samarbejdet på tværs af streams og udviklet et stærkt professionelt partnerskab.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tidligere har Kevin arbejdet som editor for <strong>FaZe Clan</strong>, en af verdens mest anerkendte
            gaming-organisationer. Erfaringen herfra har givet ham solid indsigt i content creation, digital branding
            og community management – kompetencer han i dag aktivt anvender i arbejdet med Casinoaftaler.dk.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Da Instagram introducerede muligheden for at købe et verificeringsbadge, valgte Kevin at benytte
            funktionen. Det udviklede sig hurtigt til en humoristisk intern reference i Twitch-chatten, hvor han
            siden har været kendt som <strong>"Mr. Verify"</strong> – et kælenavn, der stadig nævnes med et smil.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I dag er Kevin en fast del af <strong>Casinoaftaler.dk</strong> som både streamer og medansvarlig for
            hjemmeside og udvikling. Han bidrager med teknisk forståelse, analytisk tilgang og et skarpt øje for
            detaljer i både indhold og platformens videre udvikling.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Kendetegn og Fællesskab */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Kendetegn og Fællesskab
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kevin er kendt for sin rolige tilgang til streaming, hvor fokus er på hygge, god musik og
            community-dialog. Hans streams tiltrækker seere, der foretrækker en afslappet atmosfære
            fremfor højt tempo og store bets.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tv className="h-4 w-4 text-primary" />
                  Streamingstil
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Kevin streamer med en rolig og afslappet stemning, hvor god musik og mindre bonushunts
                er i fokus. Der er høj prioritet på community og dialog, og streamsene er præget af
                hyggelig atmosfære fremfor højt tempo.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  Spillepræferencer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Kevin foretrækker primært{" "}
                <Link to="/no-sticky-bonus" className="text-primary hover:underline">
                  no sticky bonusser
                </Link>{" "}
                og spiller for underholdningens skyld. Han går efter gennemsigtige vilkår og
                realistiske{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">
                  omsætningskrav
                </Link>.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Star className="h-4 w-4 text-primary" />
                  Interesser
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Kevin følger ligesom{" "}
                <Link to="/forfatter/jonas" className="text-primary hover:underline">Jonas</Link> tæt med i
                E-sport og holder øje med de største turneringer. Hans baggrund i FaZe Clan har givet
                ham særlig interesse for gaming- og streamingmiljøet.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Kevin Top 3 Casinoer */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Kevin Top 3 Casinoer</h3>
          {featuredCasinos.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {featuredCasinos.map((casino) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={1}
                    open={openCasinoId === casino.id}
                    onOpenChange={(open) =>
                      setOpenCasinoId(open ? casino.id : null)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* SEO casino descriptions */}
          <div className="mt-8 space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/betinia-anmeldelse" className="text-primary hover:underline">Betinia</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Betinia er et moderne dansk casino med et stærkt bonusprogram og et bredt udvalg af{" "}
                <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link>.
                Med fokus på brugeroplevelse og hurtige udbetalinger er Betinia et oplagt valg for danske spillere,
                der værdsætter kvalitet og gennemsigtighed.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/campobet-anmeldelse" className="text-primary hover:underline">Campobet</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Campobet kombinerer casino og sportsbetting under ét tag med en dansk licens og konkurrencedygtige{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">bonusser</Link>. Sammen med et solidt{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>-udbud leverer
                Campobet en komplet spiloplevelse.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/spildansknu-anmeldelse" className="text-primary hover:underline">SpilDanskNu</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                SpilDanskNu er et af de mest populære danske online casinoer med lave{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link> på kun 10x
                og et bredt udvalg af spil fra førende{" "}
                <Link to="/spiludviklere" className="text-primary hover:underline">spiludviklere</Link>.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Artikler skrevet af Kevin – paginated */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              Artikler skrevet af Kevin
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground mr-2">
                {articlePage + 1} / {totalArticlePages}
              </span>
              <button
                onClick={prevArticlePage}
                disabled={articlePage === 0}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Forrige artikler"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextArticlePage}
                disabled={articlePage >= totalArticlePages - 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Næste artikler"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleArticles.map((article) => (
              <Link
                key={article.path}
                to={article.path}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {article.date}
                  </span>
                </div>
                <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Transparens & metode */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Transparens & metode
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Kevins anmeldelser bygger på en dokumenteret testmetode og klare redaktionelle retningslinjer.
            Læs mere om vores tilgang til test, forretningsmodel og redaktionel politik.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/saadan-tester-vi-casinoer"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Sådan tester vi casinoer</h3>
                <p className="text-xs text-muted-foreground">Vores testmetode og vurderingskriterier</p>
              </div>
            </Link>
            <Link
              to="/forretningsmodel"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Forretningsmodel</h3>
                <p className="text-xs text-muted-foreground">Sådan finansieres Casinoaftaler.dk</p>
              </div>
            </Link>
            <Link
              to="/redaktionel-politik"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Redaktionel politik</h3>
                <p className="text-xs text-muted-foreground">Vores redaktionelle retningslinjer</p>
              </div>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/forfatter/kevin" />

        <FAQSection title="Ofte stillede spørgsmål om Kevin" faqs={faqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
}
