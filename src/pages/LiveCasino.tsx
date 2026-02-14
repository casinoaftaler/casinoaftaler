import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ShieldCheck,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  Gift,
  Clock,
  Target,
  Gamepad2,
  DollarSign,
  TrendingUp,
  CreditCard,
  Monitor,
  Smartphone,
  MessageCircle,
  Star,
  Tv,
  Users,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";

const liveCasinoFaqs = [
  {
    question: "Hvad er et live casino?",
    answer:
      "Et live casino er en online platform, hvor du kan spille klassiske casinospil som blackjack, roulette og poker med en rigtig dealer i realtid. Spillet streames live via video, så det føles næsten som at sidde ved et fysisk bord på et ægte casino.",
  },
  {
    question: "Hvilke spil kan jeg spille på live casinoer?",
    answer:
      "De mest populære spil på live casinoer er blackjack, roulette, baccarat og poker. Mange casinoer tilbyder også innovative game shows som Crazy Time, Monopoly Live og Dream Catcher, der kombinerer klassiske casinospil med underholdningselementer.",
  },
  {
    question: "Er live casinoer tilgængelige i Danmark?",
    answer:
      "Ja, mange licenserede online casinoer i Danmark tilbyder live casino med danske dealere og professionelle studier. Alle casinoer på vores liste har gyldig dansk licens fra Spillemyndigheden.",
  },
  {
    question: "Kan jeg spille live casino gratis?",
    answer:
      "Live casinoer er sjældent tilgængelige i gratis versioner, da spillene kører i realtid med rigtige dealere. Dog kan du bruge velkomstbonusser til at prøve live spil med bonuspenge.",
  },
  {
    question: "Er det sikkert at spille på live casinoer?",
    answer:
      "Ja, så længe du spiller på et licenseret og reguleret casino. Alle casinoer på vores side har dansk licens, SSL-kryptering og er tilsluttet ROFUS for ansvarligt spil.",
  },
  {
    question: "Hvordan får jeg en live casino bonus?",
    answer:
      "Mange live casinoer tilbyder velkomstbonusser, der matcher din første indbetaling. Nogle casinoer har også separate bonusser specifikt til live casino-spil, cashback-tilbud og reload-bonusser.",
  },
  {
    question: "Kan jeg spille live casino på mobilen?",
    answer:
      "Ja, de fleste moderne live casinoer er fuldt optimeret til mobil. Du kan spille live roulette, blackjack og andre spil direkte fra din smartphone eller tablet, uanset om du bruger iOS eller Android.",
  },
  {
    question: "Hvordan fungerer live casinoer teknisk?",
    answer:
      "Live casinoer bruger avancerede kameraer og streaming-teknologi til at sende spillet live fra professionelle studier. Professionelle dealere styrer spillet, og du placerer dine indsatser digitalt i realtid via din skærm.",
  },
  {
    question: "Hvem er de største udviklere af live casino spil?",
    answer:
      "De største og mest anerkendte udviklere inkluderer Evolution Gaming, Pragmatic Play Live, Playtech og Microgaming. Evolution Gaming er markedsleder og står bag populære spil som Lightning Roulette og Crazy Time.",
  },
];

const LiveCasino = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: liveCasinoFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Live Casino – Bedste Live Casinoer i Danmark 2026",
    description: "Komplet guide til live casino i Danmark 2026. Find de bedste live casinoer med rigtige dealere.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://casinoaftaler.dk/live-casino",
  };

  return (
    <>
      <SEO
        title="Live Casino – Bedste Live Casinoer i Danmark 2026 | Casinoaftaler"
        description="Komplet guide til live casino i Danmark 2026. Find de bedste live casinoer med rigtige dealere, live roulette, blackjack og baccarat. Sammenlign bonusser og spiltyper."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero Section */}
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
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Live Casino i Danmark
            </h1>
            <p className="text-lg text-white/80">
              Oplev den autentiske casinooplevelse med rigtige dealere, live
              streaming og interaktive spil – alt sammen fra din egen stue.
              Vi guider dig til de bedste live casinoer for danske spillere.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>
              Skrevet af:{" "}
              <span className="font-medium text-foreground">Casinoaftaler</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Siden opdateret:{" "}
              <span className="font-medium text-foreground">11-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid:{" "}
              <span className="font-medium text-foreground">15 Min.</span>
            </span>
          </div>
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er et live casino?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casino har revolutioneret den måde, vi spiller online på. I stedet for at spille mod en computer og en tilfældighedsgenerator, sidder du nu over for rigtige dealere, der håndterer kortene, drejer roulettehjulet og styrer spillet – alt sammen streamet i knivskarpe billeder direkte til din skærm. Det er som at have et ægte casino lige ved hånden, uanset om du sidder i sofaen eller er på farten.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Forskellen mellem et live casino og almindelige online casinospil ligger i interaktiviteten. Du kan chatte med dealeren og andre spillere, og følelsen af at være "til stede" gør hele forskellen. Det er perfekt for dig, der elsker casinospil, men ikke vil gå glip af den sociale dimension, som man normalt kun finder i fysiske casinoer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Gennem denne guide dækker vi alt, du har brug for at vide om live casino i Danmark. Vi gennemgår, hvordan du kommer i gang, hvilke spil der er populære, de førende{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>
            {" "}bag spillene, og hvilke casinoer der leverer de bedste live oplevelser til danske spillere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sådan fungerer live casinoer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan fungerer live casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Du behøver ikke være teknologiekspert for at nyde spændingen ved live casinoer. Det hele starter med avancerede kameraer i høj kvalitet, der streamer spillet live fra et professionelt casinostudie direkte til din skærm. Via flere kameravinkler og close-ups ser du hver eneste detalje – fra kuglen der danser på roulettehjulet til kortene der bliver delt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tv className="h-5 w-5 text-primary" />
                  HD & 4K Streaming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Moderne live casinoer bruger HD- og 4K-streaming, der giver knivskarpe billeder og en oplevelse, der næsten føler sig mere ægte end virkeligheden. Ingen forsinkelser, ingen pixelering – bare ren casinostemning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Interaktiv Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Via den integrerede chatfunktion kan du kommunikere direkte med dealeren og andre spillere ved bordet. Still spørgsmål, hils på dealeren eller del din begejstring – det skaber en social dimension, der gør oplevelsen unik.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  Professionelle Dealere
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Live casino dealere er trænede professionelle, der styrer spillet med præcision og karisma. De byder velkommen, holder stemningen oppe og sørger for, at alting forløber gnidningsfrit – præcis som i et fysisk casino.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Monitor className="h-5 w-5 text-primary" />
                  Professionelle Studier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Spillene produceres i dedikerede studier af førende spiludviklere som Evolution Gaming og Pragmatic Play. Det er udviklerne – ikke casinoerne – der står for streamingen og produktionen af live spillene.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Spiltyper */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Populære live casino spil
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Når det kommer til live casinoer, er det ikke bare ét spil du har adgang til – det er en hel verden af forskellige oplevelser. Fra klassiske bordspil til innovative game shows finder du noget for enhver spillestil. Her er de mest populære spiltyper:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Live Roulette
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Det mest ikoniske casinospil. Se kuglen danse hen over hjulet i realtid, mens du placerer dine indsatser. Populære varianter inkluderer Europæisk Roulette, Lightning Roulette og Speed Roulette – hver med sine unikke twists.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Live Blackjack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Kombinationen af held og strategi gør blackjack til et af de mest elskede live spil. Spil klassisk blackjack eller prøv Infinite Blackjack, hvor uendeligt mange spillere kan deltage samtidig.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-primary" />
                  Live Baccarat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Elsker du hurtigt tempo og enkle regler? Baccarat er ideelt. Vælg mellem Punto Banco for den klassiske oplevelse eller Speed Baccarat, hvor tempoet er skruet op til maksimum.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Live Poker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For strategi-elskere er live poker det oplagte valg. Prøv Casino Hold'em, Three Card Poker eller den klassiske Draw Poker – alle med rigtige dealere og den autentiske pokerstemning.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Game Shows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En ny og spændende kategori der blander casinospil med TV-underholdning. Populære titler som Crazy Time, Monopoly Live og Dream Catcher byder på lykkehjul, bonusrunder og store multiplikatorer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Lightning-serien
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Evolution Gamings populære Lightning-serie tilføjer tilfældige multiplikatorer til klassiske spil. Lightning Roulette, Lightning Blackjack og Lightning Baccarat giver ekstra spænding og mulighed for kæmpe gevinster.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med live casino" excludeSlugs={["betit"]} />

        <Separator className="my-10" />

        {/* Udviklere */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            De største udviklere af live casinospil
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Kvaliteten af live casino-oplevelsen afhænger i høj grad af de{" "}
            <Link to="/spiludviklere" className="text-primary hover:underline font-medium">spiludviklere</Link>
            , der står bag spillene. Det er faktisk kun en lille håndfuld producenter, der står bag størstedelen af markedets live spil – men de leverer til gengæld i verdensklasse.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Evolution Gaming",
                desc: "Ubestridt markedsleder inden for live casino. Står bag ikoniske spil som Lightning Roulette, Crazy Time og Monopoly Live. Evolution Gaming har revolutioneret branchen med konstant innovation og top streaming-kvalitet.",
              },
              {
                title: "Pragmatic Play Live",
                desc: "En af de mest fremadstormende udviklere, kendt for kreative nyfortolkninger af klassiske spil. Power Up Roulette, Mega Roulette og Sweet Bonanza Candy Land er blandt deres mest populære titler.",
              },
              {
                title: "Playtech",
                desc: "En af verdens ældste spiludviklere med et bredt udvalg af live baccarat, roulette, blackjack og poker. Playtech er kendt for sin pålidelige teknologi og professionelle studier.",
              },
              {
                title: "Microgaming",
                desc: "Pionerer inden for casinospil siden 1994. Ud over deres berømte spilleautomater har Microgaming også produceret populære live versioner af Casino Hold'em, blackjack og baccarat.",
              },
            ].map((dev) => (
              <div
                key={dev.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{dev.title}</h3>
                  <p className="text-sm text-muted-foreground">{dev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Bonusser til live casino */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Bonusser til live casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Uanset om du spiller live casino på en dansk platform eller et internationalt spillested, kan du næsten altid forvente en{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline font-medium">velkomstbonus</Link>
            {" "}eller{" "}
            <Link to="/indskudsbonus" className="text-primary hover:underline font-medium">indskudsbonus</Link>
            {" "}som en del af pakken. Her er de mest almindelige bonustyper, du finder hos live casinoer:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Indbetalingsbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den mest udbredte bonustype, hvor casinoet matcher din første indbetaling – typisk 100% op til 1.000 kr. Kan bruges på alle spil inklusiv live casino. Læs mere om{" "}
                  <Link to="/indskudsbonus" className="text-primary hover:underline">indskudsbonusser</Link>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Bonus uden Indbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nogle casinoer tilbyder en{" "}
                  <Link to="/bonus-uden-indbetaling" className="text-primary hover:underline">gratis bonus uden indbetaling</Link>
                  {" "}til nye spillere. Bonussen aktiveres ved registrering og kan i nogle tilfælde bruges på live spil.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Cashback Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  En stigende trend hos live casinoer. Du får en procentdel af dine tab refunderet – typisk 10-20% ugentligt. Ofte helt{" "}
                  <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline">uden omsætningskrav</Link>.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sådan kommer du i gang */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan kommer du i gang med live casino
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            At komme i gang med live casino er nemt og kræver kun få trin. Her er en trin-for-trin guide, så du hurtigt kan opleve den autentiske casinostemning:
          </p>

          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Vælg dit live casino",
                desc: "Sammenlign de bedste live casinoer og find det, der passer til din spillestil. Kig efter spiludvalg, bonusser og betalingsmetoder.",
                icon: Target,
              },
              {
                step: "2",
                title: "Opret en konto med MitID",
                desc: "Registrer dig hos det valgte casino og bekræft din identitet via MitID. Processen tager kun få minutter og sikrer, at alt foregår lovligt.",
                icon: ShieldCheck,
              },
              {
                step: "3",
                title: "Foretag din første indbetaling",
                desc: "Vælg din foretrukne betalingsmetode – MobilePay, Trustly eller kort – og indbetal. Din velkomstbonus aktiveres typisk automatisk.",
                icon: CreditCard,
              },
              {
                step: "4",
                title: "Vælg dit live spil og spil!",
                desc: "Gå til live casino-sektionen, vælg dit foretrukne spil – roulette, blackjack, baccarat eller et game show – og tag plads ved bordet.",
                icon: Gamepad2,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvad skal du kigge efter */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Dette skal du være opmærksom på ved live casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Når du skal vælge et live casino, handler det ikke kun om hvem der har de flotteste spil eller de største bonusser. Sikkerhed, support og den samlede oplevelse er mindst lige så vigtige. Her er de faktorer, du bør overveje:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Gamepad2, title: "Spiludvalg", desc: "Flere spil betyder mere variation og underholdning. Kig efter et bredt udvalg af roulette, blackjack, baccarat og game shows." },
              { icon: Gift, title: "Bonustilbud", desc: "Bonusser øger din bankroll, men tjek altid omsætningskravene. Læs vores guide til omsætningskrav for at forstå vilkårene." },
              { icon: ShieldCheck, title: "Licens og Sikkerhed", desc: "En dansk licens fra Spillemyndigheden sikrer fair spil og beskytter dig. Alle casinoer på vores liste er fuldt licenserede." },
              { icon: Users, title: "Kundesupport", desc: "Hurtig og kompetent hjælp er vigtigt, hvis du støder på tekniske problemer under live spil. Prioritér casinoer med 24/7 live chat." },
              { icon: Smartphone, title: "Mobiloplevelse", desc: "De fleste spiller fra mobilen. Sørg for, at dit valgte casino tilbyder en smidig live casino-oplevelse på alle enheder." },
              { icon: Clock, title: "Streaming-kvalitet", desc: "Knivskarpe billeder og ingen forsinkelser er afgørende for live casino. De bedste casinoer tilbyder HD- og 4K-streaming." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Live casino på mobil */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Live casino på mobilen
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Live casinospil er ikke kun forbeholdt computere. Mange tror, at det kræver en kraftig enhed for at håndtere live streaming, men i dag er alle moderne live casino-platforme fuldt kompatible med mobile enheder. Du kan spille live roulette, blackjack, baccarat og game shows direkte fra din smartphone eller tablet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle licenserede live casino-platforme fungerer gnidningsfrit på både iOS og Android. Det betyder, at du kan nyde den fulde live casino-oplevelse på farten – uanset om du har en iPhone, iPad, Android-telefon eller tablet. De fleste{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline font-medium">nye casinoer</Link>
            {" "}er designet med en mobil-first tilgang, så mobiloplevelsen er ofte lige så god – eller bedre – end på computer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Læs mere om{" "}
            <Link to="/betalingsmetoder" className="text-primary hover:underline font-medium">betalingsmetoder</Link>
            {" "}til mobil, herunder <Link to="/betalingsmetoder/mobilepay" className="text-primary hover:underline font-medium">MobilePay</Link> og <Link to="/betalingsmetoder/trustly" className="text-primary hover:underline font-medium">Trustly</Link>, der gør det nemt at indbetale og hæve gevinster direkte fra din telefon.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Trends */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Tendenser og nye funktioner for live casinoer
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Live casinoer er i konstant udvikling. Teknologien skubber hele tiden grænserne for, hvad der er muligt. Her er de vigtigste trends, vi ser i 2026:
          </p>

          <div className="space-y-3">
            {[
              { title: "4K-streaming", desc: "Knivskarpe billeder i ultra-høj opløsning, der næsten får dig til at føle, at du sidder ved bordet. 4K-streaming sætter nye standarder for den visuelle oplevelse." },
              { title: "Game Shows med multiplikatorer", desc: "Spil som Crazy Time, Monopoly Live og Sweet Bonanza Candy Land blander casinospil med TV-underholdning – komplet med lykkehjul, bonusrunder og enorme multiplikatorer." },
              { title: "Personlige bonustilbud", desc: "Casinoer bruger spilleradfærd til at skræddersy live casino-bonusser og kampagner, der passer til den enkelte spillers præferencer." },
              { title: "VR (Virtual Reality)", desc: "Virtual Reality er på vej ind i live casino-verdenen og vil give spillere en endnu mere fordybende og realistisk oplevelse i fremtiden." },
              { title: "Danske live dealere", desc: "Flere spiludviklere tilbyder nu dedikerede danske borde med dansktalende dealere, hvilket giver en mere personlig og lokal oplevelse." },
            ].map((trend) => (
              <div
                key={trend.title}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{trend.title}</h3>
                  <p className="text-sm text-muted-foreground">{trend.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Ansvarligt Spil */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Ansvarligt spil på live casinoer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Ansvarligt spil er nøglen til at have det sjovt på live casinoer uden at miste kontrollen. Sæt altid et budget, inden du begynder, og hold dig til det – tænk på det som en underholdningsudgift. Hold styr på din bankroll og undgå at jagte tab.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Live casinoer kan være utroligt spændende, og det er nemt at miste overblikket. Sæt tidsgrænser og brug de værktøjer, som alle danske casinoer tilbyder: indbetalingsgrænser, tabsgrænser og selvudelukkelse via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>
                . Har du brug for hjælp, kan du kontakte{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>
                .
              </p>
              <p className="text-xs text-muted-foreground">
                18+ | Spil ansvarligt | Annoncering
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Ofte Stillede Spørgsmål</h2>
            </div>
            <p className="text-muted-foreground">
              Alt du behøver at vide om live casino i Danmark.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {liveCasinoFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <RelatedGuides currentPath="/live-casino" />
      </div>
    </>
  );
};

export default LiveCasino;
