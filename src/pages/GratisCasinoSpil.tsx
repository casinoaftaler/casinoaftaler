import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { SnippetAnswer } from "@/components/SnippetAnswer";
import { QuickComparisonTable } from "@/components/QuickComparisonTable";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Gamepad2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Gift,
  Clock,
  Target,
  Sparkles,
  TrendingUp,
  Lock,
  Eye,
  Zap,
  BookOpen,
  Star,
  Users,
  Monitor,
  Smartphone,
  DollarSign,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
import { ReviewMoneyLinks } from "@/components/ReviewMoneyLinks";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import type { ReactNode } from "react";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Kan man spille gratis casino spil på danske casinoer?",
    answer: (
      <>
        Ja, de fleste danske casinoer tilbyder demotilstande på deres{" "}
        <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link>, hvor du kan spille med virtuelle kreditter uden at indbetale. Bemærk dog at{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>-spil og visse progressive jackpots typisk kræver rigtige penge.
      </>
    ),
  },
  {
    question: "Er gratis casino spil manipulerede sammenlignet med rigtige penge?",
    answer: "Nej, alle licenserede spillemaskiner bruger den samme RNG (Random Number Generator) uanset om du spiller i demotilstand eller med rigtige penge. Gevinstprocenten (RTP) er identisk. Spillemyndigheden kræver at spilresultater er uafhængige af indsatstype. Du kan altså trygt bruge demotilstanden til at evaluere et spil, før du indbetaler.",
  },
  {
    question: "Hvad er forskellen på gratis casino spil og free spins?",
    answer: (
      <>
        Gratis casino spil (demotilstand) bruger virtuelle kreditter uden reel værdi – du kan ikke vinde rigtige penge. <Link to="/free-spins" className={linkClass}>Free spins</Link> er derimod bonusrunder med rigtige penge, hvor gevinster udbetales (eventuelt med <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>). Free spins gives typisk som del af en <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> eller kampagne.
      </>
    ),
  },
  {
    question: "Hvilke typer casino spil kan man spille gratis?",
    answer: (
      <>
        Du kan spille de fleste spilleautomater gratis, herunder populære titler som{" "}
        <Link to="/casinospil/spillemaskiner/sweet-bonanza" className={linkClass}>Sweet Bonanza</Link>,{" "}
        <Link to="/casinospil/spillemaskiner/book-of-dead" className={linkClass}>Book of Dead</Link> og{" "}
        <Link to="/casinospil/spillemaskiner/gates-of-olympus" className={linkClass}>Gates of Olympus</Link>. Bordspil som{" "}
        <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> og{" "}
        <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> tilbydes også i demoversioner. Live casino-spil kræver dog altid rigtige penge.
      </>
    ),
  },
  {
    question: "Skal man oprette en konto for at spille gratis?",
    answer: (
      <>
        Det varierer. Nogle casinoer tillader demospil direkte i browseren uden registrering, mens andre kræver en gratis konto. Hos casinoer med{" "}
        <Link to="/nye-casinoer/mitid" className={linkClass}>MitID-verifikation</Link> skal du typisk oprette konto først, da aldersverifikation er lovpligtigt. Udbydernes egne websites (fx Pragmatic Play) tilbyder ofte demoversioner helt uden login.
      </>
    ),
  },
  {
    question: "Er gratis casino spil en god måde at lære nye spil på?",
    answer: "Ja, demotilstanden er den ideelle måde at lære spillemaskiner at kende, før du risikerer rigtige penge. Du kan teste bonusfunktioner, forstå gevinstlinjer, eksperimentere med indsatsniveauer og evaluere volatilitet – alt sammen uden økonomisk risiko. Erfarne spillere bruger ofte demoversioner til at vurdere nye udgivelser før de beslutter, om spillet passer til deres spillestil og budget.",
  },
];

const spilleTyper = [
  {
    icon: Monitor,
    title: "Demo-spilleautomater",
    description: "Spil 1.000+ spillemaskiner gratis direkte i browseren. Identisk gameplay og RTP som rigtige penge-versioner – perfekt til at teste nye spil og lære bonusfunktioner at kende.",
    tag: "Mest populært",
  },
  {
    icon: Gamepad2,
    title: "Gratis bordspil",
    description: "Blackjack, roulette og baccarat i demoversioner. Øv strategi og lær regler uden økonomisk risiko. Ideelt for nye spillere eller eksperimentering med nye systemer.",
    tag: "Strategitræning",
  },
  {
    icon: Gift,
    title: "Free spins bonusser",
    description: "Modtag gratis spins med reel gevinstmulighed via velkomstbonusser eller kampagner. I modsætning til demospil kan du faktisk vinde rigtige penge med free spins.",
    tag: "Reel gevinst",
  },
  {
    icon: Users,
    title: "Social casino gaming",
    description: "Spil med venner i sociale casino-platforme med virtuelle kreditter. Fokus på underholdning og konkurrence uden økonomisk risiko. Populært som afslappet tidsfordriv.",
    tag: "Underholdning",
  },
];

const GratisCasinoSpil = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(faqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Gratis Casino Spil – Spil Spillemaskiner Gratis Online 2026",
    description: "Spil gratis casino spil online: demo-spillemaskiner, bordspil og free spins. Lær forskellen på demotilstand og rigtige penge – og find de bedste gratis tilbud.",
    url: `${SITE_URL}/gratis-casino-spil`,
    datePublished: "2026-03-31",
  });

  return (
    <>
      <SEO
        title="Gratis Casino Spil – Spil Spillemaskiner Gratis Online 2026 | Casinoaftaler"
        description="Spil gratis casino spil online: 1.000+ demo-spillemaskiner, bordspil og free spins. Identisk RTP som rigtige penge – ingen indbetaling nødvendig."
        jsonLd={[faqJsonLd, articleJsonLd]}
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
            <Badge variant="secondary" className="mb-4">
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Gratis spillemaskiner & casino spil
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Gratis Casino Spil Online
            </h1>
            <p className="text-lg text-white/80">
              Spil spillemaskiner, bordspil og live casino gratis i demotilstand – identisk RTP og gameplay som med rigtige penge. Ingen indbetaling, ingen risiko.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="14 Min." />

        <SnippetAnswer answer="Gratis casino spil lader dig spille spillemaskiner og bordspil i demotilstand med virtuelle kreditter – identisk RTP og gameplay som rigtige penge. Perfekt til at teste nye spil, lære bonusfunktioner og evaluere volatilitet uden økonomisk risiko." />

        <QuickComparisonTable count={3} title="Bedste casinoer med gratis demospil" prioritySlugs={["spilleautomaten", "leovegas", "mr-green"]} />

        {/* Intro */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Hvad er gratis casino spil?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Gratis casino spil – også kaldet demospil eller "play for fun" – giver dig mulighed for at spille <Link to="/casinospil/spillemaskiner" className={linkClass}>spillemaskiner</Link> og bordspil uden at risikere rigtige penge. Du bruger virtuelle kreditter, og gameplay er 100% identisk med rigtige penge-versioner: samme <Link to="/ordbog/rtp" className={linkClass}>RTP</Link>, samme <Link to="/ordbog/volatilitet" className={linkClass}>volatilitet</Link> og samme bonusfunktioner.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er den ideelle måde at lære nye spil at kende, før du investerer dit eget budget. Erfarne spillere bruger demotilstanden til at evaluere nye udgivelser, mens nybegyndere kan øve sig på bordspil som <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link> og <Link to="/casinospil/roulette" className={linkClass}>roulette</Link> helt risikofrit.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hos danske casinoer med <Link to="/casino-med-dansk-licens" className={linkClass}>dansk licens</Link> kan du typisk finde hundredvis af demospil fra førende <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link> som <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link> og <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Typer af gratis casino spil */}
        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-bold">4 typer af gratis casino spil</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {spilleTyper.map((type) => (
              <Card key={type.title} className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <type.icon className="h-6 w-6 text-primary" />
                    <Badge variant="outline" className="text-xs">{type.tag}</Badge>
                  </div>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Fordele ved gratis spil */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Fordele ved at spille gratis casino spil</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            At spille gratis er ikke kun for nybegyndere. Selv erfarne spillere bruger demotilstanden som et strategisk værktøj. Her er de primære fordele:
          </p>
          <div className="space-y-3">
            {[
              { icon: ShieldCheck, title: "Ingen økonomisk risiko", desc: "Spil ubegrænset uden at risikere en krone. Virtuelle kreditter genopfyldes automatisk, så du aldrig løber tør." },
              { icon: Eye, title: "Test nye spil", desc: "Evaluer RTP, volatilitet og bonusfunktioner, før du beslutter om et spil passer til din spillestil og budget." },
              { icon: BookOpen, title: "Lær strategier", desc: "Øv blackjack-strategi, roulette-systemer eller forstå bonus buy-funktioner uden konsekvenser." },
              { icon: TrendingUp, title: "Evaluer spiludviklere", desc: "Sammenlign spillevæld fra forskellige udbydere for at finde dine foretrukne spiludviklere og temaer." },
              { icon: Clock, title: "Ren underholdning", desc: "Nyd casino-oplevelsen som tidsfordriv uden det økonomiske pres – perfekt til afslappet gaming." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Demotilstand vs. rigtige penge */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Demotilstand vs. rigtige penge – hvad er forskellen?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Mange spillere er usikre på, om demotilstanden afspejler den "rigtige" oplevelse. Svaret er entydigt ja – med få vigtige undtagelser:
          </p>
          <div className="rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-3 gap-0 bg-muted/50 p-3 text-sm font-semibold">
              <span>Egenskab</span>
              <span className="text-center">Demotilstand</span>
              <span className="text-center">Rigtige penge</span>
            </div>
            {[
              ["RTP (gevinstprocent)", "✅ Identisk", "✅ Identisk"],
              ["Volatilitet", "✅ Identisk", "✅ Identisk"],
              ["Bonusfunktioner", "✅ Identisk", "✅ Identisk"],
              ["Reel gevinst", "❌ Nej", "✅ Ja"],
              ["Progressive jackpots", "❌ Ikke altid", "✅ Ja"],
              ["Live casino", "❌ Nej", "✅ Ja"],
              ["Bonusser & free spins", "❌ Nej", "✅ Ja"],
            ].map(([label, demo, real]) => (
              <div key={label} className="grid grid-cols-3 gap-0 border-t border-border p-3 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-center">{demo}</span>
                <span className="text-center">{real}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <strong>Takeaway:</strong> Demotilstanden er et præcist værktøj til at evaluere spillets mekanik og matematiske profil. Den eneste forskel er, at gevinster ikke kan udbetales. Brug demo til research, og skift til rigtige penge når du har fundet dit spil.
          </p>
        </section>

        <Separator className="my-8" />

        {/* Populære gratis spil */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Mest populære gratis spillemaskiner i 2026</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Disse spillemaskiner tilbyder alle demoversioner og er blandt de mest spillede titler på danske casinoer:
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Sweet Bonanza", provider: "Pragmatic Play", rtp: "96.48%", path: "/casinospil/spillemaskiner/sweet-bonanza" },
              { name: "Book of Dead", provider: "Play'n GO", rtp: "96.21%", path: "/casinospil/spillemaskiner/book-of-dead" },
              { name: "Gates of Olympus", provider: "Pragmatic Play", rtp: "96.50%", path: "/casinospil/spillemaskiner/gates-of-olympus" },
              { name: "Starburst", provider: "NetEnt", rtp: "96.09%", path: "/casinospil/spillemaskiner/starburst" },
              { name: "Reactoonz", provider: "Play'n GO", rtp: "96.51%", path: "/casinospil/spillemaskiner/reactoonz" },
              { name: "Big Bass Bonanza", provider: "Pragmatic Play", rtp: "96.71%", path: "/casinospil/spillemaskiner/big-bass-bonanza" },
            ].map((slot) => (
              <Link key={slot.name} to={slot.path} className="rounded-lg border border-border p-4 transition-colors hover:border-primary/50 hover:bg-accent/50">
                <p className="font-semibold">{slot.name}</p>
                <p className="text-xs text-muted-foreground">{slot.provider} · RTP: {slot.rtp}</p>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* Ansvarligt spil */}
        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold">Gratis spil og ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Gratis casino spil er et vigtigt element i <Link to="/ansvarligt-spil" className={linkClass}>ansvarligt spil</Link>. Demotilstanden giver dig mulighed for at nyde casino-oplevelsen uden økonomisk risiko. Dog er der vigtige forbehold:
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
              <div>
                <p className="font-semibold mb-2">Vigtigt at huske</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Demospil kan skabe en falsk tryghed – gevinster i demotilstand sker lige så ofte som tab</li>
                  <li>• Overgangen fra gratis til rigtige penge bør være bevidst og planlagt</li>
                  <li>• Sæt altid et budget FØR du skifter fra demo til rigtige penge</li>
                  <li>• Brug <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>spillegrænser</Link> og <Link to="/ansvarligt-spil/rofus" className={linkClass}>ROFUS</Link> hvis du har brug for hjælp</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med bredt udvalg af gratis demospil" />

        <LatestNewsByCategory pagePath="/gratis-casino-spil" />
        <ReviewMoneyLinks />
        <RelatedGuides currentPath="/gratis-casino-spil" />
        <FAQSection title="Ofte stillede spørgsmål om gratis casino spil" faqs={faqs} />
        <AuthorBio author="jonas" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="spilleautomaten" />
    </>
  );
};

export default GratisCasinoSpil;
