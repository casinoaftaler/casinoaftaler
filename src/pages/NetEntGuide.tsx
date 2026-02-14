import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";
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
  ShieldCheck,
  Zap,
  Gamepad2,
  Award,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Star,
  User,
  CalendarDays,
  BookOpen,
} from "lucide-react";

const NetEntGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqs = [
    {
      question: "Hvad er NetEnt?",
      answer: (
        <>
          NetEnt (Net Entertainment) er en svensk spiludvikler grundlagt i 1996. De er en af verdens mest anerkendte producenter af online casinospil og leverer spilleautomater, bordspil og{" "}
          <Link to="/live-casino" className="text-primary underline hover:text-primary/80">live casino</Link>-løsninger til hundredvis af casinoer verden over.
        </>
      ),
    },
    {
      question: "Hvilke er de mest populære NetEnt-spil?",
      answer: "De mest populære NetEnt-spil inkluderer Starburst, Gonzo's Quest, Dead or Alive, Mega Fortune og Divine Fortune. Disse titler er kendte for deres innovative funktioner og høje RTP-procenter.",
    },
    {
      question: "Er NetEnt-spil fair?",
      answer: (
        <>
          Ja, alle NetEnt-spil bruger certificeret RNG-teknologi (Random Number Generator) og testes løbende af uafhængige bureauer som eCOGRA og iTech Labs. NetEnt har licenser fra Malta Gaming Authority og UK Gambling Commission, hvilket sikrer fuld{" "}
          <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>-compliance.
        </>
      ),
    },
    {
      question: "Kan man spille NetEnt-spil med bonus?",
      answer: (
        <>
          Ja, NetEnt-spil er blandt de mest populære til{" "}
          <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-tilbud og{" "}
          <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonusser</Link>. Starburst er et af de hyppigst brugte spil i bonustilbud hos danske casinoer.
        </>
      ),
    },
    {
      question: "Hvad er RTP på NetEnt-spil?",
      answer: "NetEnt-spil har generelt høje RTP-procenter, typisk mellem 95% og 98%. Starburst har f.eks. en RTP på 96,09%, mens Blood Suckers har en af branchens højeste på 98%.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.question,
      },
    })),
  };

  return (
    <>
      <SEO
        title="NetEnt – Alt om Spiludvikleren NetEnt i Danmark 2026 | Casinoaftaler"
        description="Komplet guide til NetEnt – en af verdens førende spiludviklere. Læs om deres historie, populære spil som Starburst og Gonzo's Quest, licenser og RTP."
        jsonLd={faqJsonLd}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : 'linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Spiludvikler
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              NetEnt
            </h1>
            <p className="text-lg text-white/80">
              NetEnt er synonym med kvalitet i casinobranchen. Lær alt om den svenske spiludvikler, der har revolutioneret online slots med titler som Starburst, Gonzo's Quest og Dead or Alive.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>Opdateret: <span className="font-medium text-foreground">14-02-2026</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Læsetid: <span className="font-medium text-foreground">12 Min.</span></span>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad er NetEnt?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            NetEnt (Net Entertainment) er en svensk spiludvikler, der blev grundlagt i 1996 og hurtigt voksede til at blive en af de mest dominerende kræfter i den globale online casinoindustri. Med hovedkontor i Stockholm har NetEnt i over to årtier leveret banebrydende spilleautomater, bordspil og live casino-løsninger til hundredvis af online casinoer på verdensplan. Virksomheden blev noteret på Stockholmsbørsen i 2007 og opkøbt af Evolution Gaming i 2020 for cirka 19,6 milliarder svenske kroner – et køb der understregede NetEnts enorme værdi for branchen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            NetEnt er kendt for at kombinere innovativ teknologi med kreativt design. Deres spil kendetegnes ved skarp grafik, engagerende lyddesign og unikke bonusfunktioner, der har sat standarden for moderne online spilleautomater. Når du spiller med en{" "}
            <Link to="/velkomstbonus" className="text-primary underline hover:text-primary/80">velkomstbonus</Link>{" "}
            hos et dansk casino, er der stor sandsynlighed for, at det er et NetEnt-spil, du nyder godt af – Starburst er f.eks. det mest udbredte free spins-spil i Danmark.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I dag er NetEnt en del af Evolution-koncernen, men fortsætter med at udgive nye titler under sit eget brand. De har licenser fra Malta Gaming Authority, UK Gambling Commission og Spillemyndigheden i Danmark, hvilket sikrer, at alle deres spil lever op til de strengeste krav om fairness og{" "}
            <Link to="/responsible-gaming" className="text-primary underline hover:text-primary/80">ansvarligt spil</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">NetEnts Historie og Udvikling</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            NetEnts rejse begyndte i 1996, da virksomheden blev grundlagt af Pontus Lindwall. Allerede i de tidlige år skilte NetEnt sig ud ved at satse stort på kvalitet og teknisk innovation. I 2002 lancerede de deres første Java-baserede casinoplatform, og i årene der fulgte, byggede de systematisk en portefølje af ikoniske titler, der stadig er populære i dag.
          </p>
          <div className="space-y-3 mb-6">
            {[
              { year: "1996", event: "NetEnt grundlægges i Stockholm af Pontus Lindwall" },
              { year: "2002", event: "Lancering af den første Java-baserede casinoplatform" },
              { year: "2007", event: "Børsnoteret på Stockholmsbørsen (Nasdaq Stockholm)" },
              { year: "2011", event: "Gonzo's Quest udgives og revolutionerer slots med Avalanche-mekanikken" },
              { year: "2013", event: "Starburst lanceres og bliver verdens mest populære spilleautomat" },
              { year: "2016", event: "Touch-teknologi optimerer alle spil til mobil" },
              { year: "2019", event: "NetEnt opkøber Red Tiger Gaming for £200 millioner" },
              { year: "2020", event: "Evolution Gaming opkøber NetEnt for 19,6 milliarder SEK" },
            ].map((item) => (
              <div key={item.year} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <Badge variant="outline" className="mt-0.5 flex-shrink-0">{item.year}</Badge>
                <p className="text-sm text-muted-foreground">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Populære NetEnt-spil</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            NetEnt har en imponerende portefølje på over 200 spil, og mange af dem er blevet ikoniske i casinobranchen. Deres spil bruges ofte i{" "}
            <Link to="/free-spins" className="text-primary underline hover:text-primary/80">free spins</Link>-kampagner og{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary underline hover:text-primary/80">bonusser uden omsætningskrav</Link>.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Starburst", desc: "Det mest ikoniske online slot nogensinde. Simpelt, farverigt og med expanding wilds. RTP: 96,09%. Bruges i næsten alle free spins-tilbud.", highlight: "Verdens mest spillede slot" },
              { name: "Gonzo's Quest", desc: "Revolutionerede branchen med Avalanche-mekanikken, hvor symboler falder ned i stedet for at spinne. Stigende multiplikatorer op til 15x.", highlight: "Pionér inden for Avalanche Reels" },
              { name: "Dead or Alive", desc: "Et western-tema slot kendt for ekstremt høj volatilitet og massive gevinstmuligheder. Dead or Alive 2 tilføjede endnu vildere bonusfunktioner.", highlight: "Legendary high-volatility slot" },
              { name: "Mega Fortune", desc: "Den progressive jackpot-slot der har skabt verdensrekorder. I 2013 vandt en finsk spiller €17,8 millioner – den største online jackpot nogensinde.", highlight: "Verdensrekord i online jackpot" },
              { name: "Divine Fortune", desc: "Græsk mytologi-tema med progressive jackpots. En af de mest populære jackpot-slots i regulerede markeder.", highlight: "Populær progressiv jackpot" },
              { name: "Blood Suckers", desc: "Vampyr-tema slot med en af branchens højeste RTP-procenter på 98%. Perfekt til spillere der vil opfylde omsætningskrav.", highlight: "RTP: 98% – ideel til bonusspil" },
            ].map((game) => (
              <Card key={game.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-primary" />
                    {game.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{game.desc}</p>
                  <Badge variant="outline" className="text-xs">{game.highlight}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <InlineCasinoCards title="Casinoer med NetEnt-spil" />

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Licenser og Sikkerhed</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            NetEnt er licenseret af nogle af verdens strengeste spillemyndigheder, herunder Malta Gaming Authority (MGA), UK Gambling Commission (UKGC) og den danske Spillemyndighed. Alle NetEnt-spil anvender certificeret RNG-teknologi og testes løbende af uafhængige testbureauer som eCOGRA og iTech Labs. Denne kombination sikrer, at hvert spin er 100% tilfældigt og retfærdigt.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            NetEnts fokus på sikkerhed og compliance er en af grundene til, at de er foretrukket af de fleste{" "}
            <Link to="/top-10-casino-online" className="text-primary underline hover:text-primary/80">top casinoer i Danmark</Link>. Når du spiller et NetEnt-spil, kan du være sikker på, at det lever op til de højeste standarder for fairness,{" "}
            <Link to="/omsaetningskrav" className="text-primary underline hover:text-primary/80">omsætningskrav</Link>-gennemsigtighed og spillerbeskyttelse.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Malta Gaming Authority
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                En af verdens mest respekterede spillemyndigheder med strenge krav til fairness, spillerbeskyttelse og ansvarligt spil.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  UK Gambling Commission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Den britiske spillemyndighed, kendt for sine strenge regler og høje krav til licenserede spiludviklere.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Award className="h-4 w-4 text-primary" />
                  eCOGRA Certificeret
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Uafhængig testning og certificering af alle spil sikrer, at RNG-teknologien fungerer korrekt og retfærdigt.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Fordele og Ulemper ved NetEnt</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <ThumbsUp className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Ikoniske titler som Starburst, Gonzo's Quest og Dead or Alive",
                    "Høje RTP-procenter – generelt mellem 95-98%",
                    "Avanceret grafik og lyddesign i verdensklasse",
                    "Bredt tilgængelige hos alle danske casinoer",
                    "Innovativ teknologi – Avalanche Reels, Cluster Pays m.m.",
                  ].map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <ThumbsDown className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Nogle ældre spil føles daterede sammenlignet med nyere udviklere",
                    "Færre nye udgivelser siden Evolution-opkøbet",
                    "Progressive jackpots kan have lavere basis-RTP",
                  ].map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Andre Spiludviklere</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Udforsk vores dybdegående guides til andre populære spiludviklere i casinobranchen.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { to: "/spiludviklere/pragmatic-play", label: "Pragmatic Play" },
              { to: "/spiludviklere/evolution-gaming", label: "Evolution Gaming" },
              { to: "/spiludviklere/relax-gaming", label: "Relax Gaming" },
              { to: "/spiludviklere/play-n-go", label: "Play'n GO" },
              { to: "/spiludviklere/hacksaw-gaming", label: "Hacksaw Gaming" },
              { to: "/spiludviklere/nolimit-city", label: "Nolimit City" },
              { to: "/spiludviklere/elk-studios", label: "ELK Studios" },
              { to: "/spiludviklere/yggdrasil", label: "Yggdrasil" },
              { to: "/spiludviklere/microgaming", label: "Microgaming" },
              { to: "/spiludviklere/red-tiger", label: "Red Tiger" },
              { to: "/spiludviklere/big-time-gaming", label: "Big Time Gaming" },
            ].map((dev) => (
              <Link
                key={dev.to}
                to={dev.to}
                className="flex items-center justify-center rounded-lg border border-border bg-card p-3 text-center text-sm font-medium transition-colors hover:border-primary/50 hover:bg-accent/50"
              >
                {dev.label}
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="h-5 w-5 text-primary" />
                Ansvarligt Spil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                NetEnt har altid prioriteret ansvarligt spil højt. Alle deres spil inkluderer tydelig information om RTP og volatilitet, og de samarbejder aktivt med organisationer som GamCare og GambleAware. I Danmark kan du altid søge hjælp via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>{" "}
                og{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Ofte Stillede Spørgsmål om NetEnt</h2>
            </div>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-border bg-card px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <RelatedGuides currentPath="/spiludviklere/netent" />
      </div>
    </>
  );
};

export default NetEntGuide;
