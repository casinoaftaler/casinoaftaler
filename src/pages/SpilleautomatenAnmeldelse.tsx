import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getAffiliateRedirect } from "@/lib/affiliateRedirect";
import { useAuth } from "@/hooks/useAuth";
import { QuickFactsProviders, QuickFactsLogo } from "@/components/QuickFactsProviders";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  Star,
  Clock,
  CreditCard,
  Gift,
  Trophy,
  Sparkles,
  CheckCircle2,
  Loader2,
  HelpCircle,
  User,
  CalendarDays,
  BookOpen,
  Smartphone,
  Headphones,
  Gamepad2,
  Wallet,
  TrendingUp,
  Award,
  Zap,
  RotateCcw,
  Check,
  X,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const spilleautomatenFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er Spilleautomaten et sikkert casino?",
    answer: (
      <>
        Ja. Spilleautomaten har gyldig dansk licens fra Spillemyndigheden (licensnr. 21-67980) og drives af Winteq ApS. Platformen benytter SSL-kryptering og er tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse. Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvad er velkomstbonussen hos Spilleautomaten?",
    answer: (
      <>
        Nye spillere får 100 % bonus op til 1.000 kr. fordelt over 5 dage med bonuskoder (VELKOMMEN1–VELKOMMEN5). Omsætningskravet er kun 10x (indskud + bonus) med 60 dages gyldighed – blandt de laveste på markedet. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder tilbyder Spilleautomaten?",
    answer: (
      <>
        Du kan indbetale med MobilePay, Dankort, Visa, Mastercard og Trustly. Udbetalinger sker via samme metode. MobilePay og Trustly er typisk de hurtigste med udbetaling inden for få timer. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Har Spilleautomaten et loyalitetsprogram?",
    answer:
      "Ja. For hver 5 kr. omsat i slots optjener du 1 point. Pointene kan indløses til kontanter i Præmieshoppen. Programmet aktiveres automatisk ved registrering og nyhedsbrevstilmelding.",
  },
  {
    question: "Kan jeg spille Spilleautomaten på mobilen?",
    answer:
      "Absolut. Spilleautomaten er fuldt optimeret til mobil og fungerer fejlfrit på både iOS og Android. Alle spil, bonusser og betalinger er tilgængelige direkte fra browseren.",
  },
  {
    question: "Hvem står bag Spilleautomaten?",
    answer: (
      <>
        Spilleautomaten drives af Winteq ApS, der også står bag Bingo.dk og SpilDanskNu.dk. Det sikrer solid erfaring og pålidelig drift fra en erfaren dansk operatør.
      </>
    ),
  },
  {
    question: "Hvad er omsætningskravet på bonussen?",
    answer: (
      <>
        Omsætningskravet er 10x (indskud + bonus), hvilket er meget lavt sammenlignet med branchen. Eksempel: Indbetaler du 200 kr. og får 200 kr. i bonus, skal du omsætte 4.000 kr. Læs om{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Tilbyder Spilleautomaten live casino?",
    answer: (
      <>
        Ja, Spilleautomaten har en voksende{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>-sektion med roulette, blackjack og game shows fra professionelle dealere.
      </>
    ),
  },
  {
    question: "Hvor hurtigt får jeg mine penge udbetalt?",
    answer:
      "Via MobilePay og Trustly kan du typisk forvente udbetaling inden for få timer. Kortbetalinger tager 1–3 hverdage afhængigt af din bank.",
  },
  {
    question: "Er der en bonuskode til Spilleautomaten?",
    answer:
      "Ja. Velkomstbonussen aktiveres med bonuskoder: VELKOMMEN1 (dag 1), VELKOMMEN2 (dag 2) osv. op til VELKOMMEN5. Husk at indtaste koden ved hver indbetaling.",
  },
];

const SpilleautomatenAnmeldelse = () => {
  const { data: casinos, isLoading } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const casino = casinos?.find((c) => c.slug === "spilleautomaten");

  const handleBonusClick = () => {
    if (casino) getAffiliateRedirect(casino.slug, user?.id);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: spilleautomatenFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.question,
      },
    })),
  };

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: "Spilleautomaten",
      url: "https://www.spilleautomaten.dk",
    },
    author: {
      "@type": "Organization",
      name: "Casinoaftaler",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.9",
      bestRating: "5",
    },
    reviewBody:
      "Spilleautomaten er et dansk online casino med lav omsætningskrav, loyalitetsprogram og hurtige udbetalinger via MobilePay.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Top 10 Casino Online", item: "https://casinoaftaler.dk/top-10-casino-online" },
      { "@type": "ListItem", position: 3, name: "Spilleautomaten Anmeldelse", item: "https://casinoaftaler.dk/spilleautomaten-anmeldelse" },
    ],
  };

  return (
    <>
      <SEO
        title="Spilleautomaten Anmeldelse 2026 – Bonus, Spil & Vilkår | Casinoaftaler"
        description="Komplet anmeldelse af Spilleautomaten.dk. 100% bonus op til 1.000 kr., kun 10x omsætning, loyalitetsprogram og hurtige udbetalinger. Læs vores ærlige vurdering."
        jsonLd={[faqJsonLd, reviewJsonLd, breadcrumbJsonLd]}
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
              <Star className="mr-1.5 h-3.5 w-3.5" />
              4.9 / 5 – Anbefalet Casino
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Spilleautomaten Anmeldelse 2026
            </h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet og ærlig anmeldelse af Spilleautomaten.dk – Danmarks nyeste casino med 100 % bonus op til 1.000 kr., kun 10x omsætningskrav, loyalitetsprogram med kontante præmier og lynhurtige udbetalinger via MobilePay.
            </p>
            <Button
              onClick={handleBonusClick}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
            >
              <Gift className="mr-2 h-5 w-5" />
              Hent Bonus hos Spilleautomaten
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta info bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>Opdateret: <span className="font-medium text-foreground">13-02-2026</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>Læsetid: <span className="font-medium text-foreground">12 Min.</span></span>
          </div>
        </div>

        {/* Quick Facts Card */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-6 w-6 text-primary" />
                  Hurtige Fakta – Spilleautomaten
                </CardTitle>
                <QuickFactsLogo logoUrl={casino?.logo_url} casinoName={casino?.name} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Velkomstbonus</p>
                  <p className="text-lg font-bold text-foreground">100% op til 1.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Omsætningskrav</p>
                  <p className="text-lg font-bold text-foreground">10x (d+b)</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Licens</p>
                  <p className="text-lg font-bold text-foreground">Spillemyndigheden</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Lanceret</p>
                  <p className="text-lg font-bold text-foreground">Juli 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Min. indbetaling</p>
                  <p className="text-lg font-bold text-foreground">75 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Bonusgyldighed</p>
                  <p className="text-lg font-bold text-foreground">60 dage</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Operatør</p>
                  <p className="text-lg font-bold text-foreground">Winteq ApS</p>
                </div>
              </div>
              <QuickFactsProviders providers={["Hacksaw Gaming", "Pragmatic Play", "Play'n GO", "Wazdan", "Quickspin", "Push Gaming", "ELK Studios", "Endorphina", "Stakelogic", "Synot"]} />
            </CardContent>
          </Card>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Spilleautomaten</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spilleautomaten.dk er et relativt nyt dansk online casino, der blev lanceret i juli 2024 af Winteq ApS – samme selskab, der driver de velkendte brands Bingo.dk og{" "}
            <Link to="/top-10-casino-online" className={linkClass}>SpilDanskNu.dk</Link>. Det betyder, at du ikke møder en uerfaren aktør, men et hold med mange års erfaring på det danske marked.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Allerede ved første besøg mødes man af et moderne og stilrent design, der giver en tryg og genkendelig atmosfære. Her er det tydeligt, at der satses på at skabe et spillested, hvor underholdning og tillid går hånd i hånd. Kombinationen af erfaring fra moderselskabet og et friskt, innovativt udtryk gør Spilleautomaten til en af de mest lovende nytilkomne på det danske casinomarked.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne anmeldelse gennemgår vi alt fra{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> og{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> til spiludvalg,{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, kundeservice og sikkerhed – så du kan tage en informeret beslutning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Spilleautomaten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <Check className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Dansk licens fra Spillemyndigheden – sikker og lovlig platform",
                    "Meget lavt omsætningskrav på kun 10x (d+b)",
                    "Attraktivt loyalitetsprogram med kontante præmier",
                    "Stort og varieret udvalg af spillemaskiner fra topudbydere",
                    "Hurtige udbetalinger via MobilePay og Trustly",
                    "Dansk kundeservice via chat og e-mail",
                    "60 dages bonusgyldighed – masser af tid",
                    "Drives af erfaren operatør (Winteq ApS)",
                  ].map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{pro}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive/80">
                  <X className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Begrænset udvalg af digitale bordspil (RNG)",
                    "Live casino sektionen kunne være mere varieret",
                    "Relativt nyt casino – endnu under udvikling",
                  ].map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{con}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Welcome Bonus Deep Dive */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus hos Spilleautomaten – Komplet Guide</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spilleautomaten byder nye spillere velkommen med en af de mest gennemsigtige{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstpakker</Link> på det danske marked. Du får 100 % bonus op til 1.000 kr. fordelt over 5 dage, hvilket giver en rolig og overskuelig indkørsel til casinoet.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det virkelig interessante er{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> på kun 10x (indskud + bonus), hvilket er standarden for alle danske casinoer med licens fra Spillemyndigheden. Bonussen er gyldig i hele 60 dage, så du har masser af tid til at gennemspille kravene.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="h-5 w-5 text-primary" />
                Sådan aktiverer du velkomstbonussen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Opret konto", desc: "Besøg Spilleautomaten.dk og opret en konto via MitID. Det tager under 5 minutter." },
                  { step: "2", title: "Sæt spilbegrænsninger", desc: "Fastsæt dine egne ind- og udbetalingsgrænser som det første – det er et lovkrav." },
                  { step: "3", title: "Dag 1: Brug kode VELKOMMEN1", desc: "Indbetal mellem 75–200 kr. med bonuskoden VELKOMMEN1 for at aktivere den første del af bonussen." },
                  { step: "4", title: "Dag 2–5: Brug VELKOMMEN2–5", desc: "Gentag processen de næste fire dage med de respektive bonuskoder for at åbne hele pakken." },
                  { step: "5", title: "Spil og gennemspil", desc: "Omsæt bonus + indskud 10 gange inden for 60 dage for at frigøre gevinster til udbetaling." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Wagering Example */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
                Beregning af omsætningskrav
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Eksempel: Du indbetaler 200 kr. og får 200 kr. i bonus.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Indskud + Bonus</p>
                  <p className="text-xl font-bold text-foreground">400 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">× 10 omsætning</p>
                  <p className="text-xl font-bold text-foreground">= 4.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Indenfor</p>
                  <p className="text-xl font-bold text-foreground">60 dage</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Alle danske casinoer opererer med 10x omsætningskrav. Læs vores dybdegående guide til{" "}
                <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Game Selection */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg hos Spilleautomaten</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Spilleautomaten har sat fokus på spilleautomater som sit kerneudbud, men tilbyder også{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> og game shows. Her er hvad du kan forvente:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilleautomater
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Et stort udvalg af slots fra topudbydere som <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og ELK Studios. Fra egyptiske eventyr i Legacy of Dead til actionfyldte Fire Joker Blitz – der er noget for enhver smag.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  Live Casino
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Professionelle dealere på roulette og blackjack. Titler som European Roulette Pro og Super Stake Blackjack leverer en intens og autentisk{" "}
                  <Link to="/live-casino" className={linkClass}>live casino</Link>-oplevelse.
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
                <p className="text-sm text-muted-foreground">
                  Super Wheel og andre game show-spil giver et friskt supplement til klassiske slots. Drej hjulet i bedste tv-show-stil og vind kontante præmier.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            <strong>Bemærk:</strong> Digitale bordspil (RNG-versioner af blackjack og roulette) er ikke tilgængelige. Hele energien er rettet mod slots og live casino, hvilket giver platformen en skarp og fokuseret identitet. Læs om de bedste{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Loyalty Program */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Loyalitetsprogram og Præmieshop</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            En af Spilleautomatens mest unikke funktioner er deres loyalitetsprogram. I modsætning til mange andre casinoer kan du faktisk konvertere dine optjente point til kontanter – ikke blot bonusmidler.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Award, title: "Automatisk deltagelse", desc: "Du deltager automatisk ved registrering og nyhedsbrevstilmelding." },
              { icon: TrendingUp, title: "Point pr. omsætning", desc: "For hver 5 kr. omsat i slots optjener du 1 point. Kun rigtige penge tæller." },
              { icon: Wallet, title: "Kontante præmier", desc: "Point kan indløses til kontanter i Præmieshoppen – ikke kun bonusmidler." },
              { icon: Gamepad2, title: "Kun slots tæller", desc: "Bordspil og live casino tæller ikke med i pointoptjeningen." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
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

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder hos Spilleautomaten</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Spilleautomaten understøtter de mest populære danske{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. Indbetalinger er øjeblikkelige, og udbetalinger sker via samme metode som indbetalingen.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "MobilePay", desc: "Øjeblikkelig indbetaling. Udbetalinger typisk inden for få timer. Danmarks mest brugte betalingsapp.", speed: "⚡ Hurtigst" },
              { title: "Trustly", desc: "Direkte bankoverførsel uden deling af kortoplysninger. Hurtig og sikker løsning.", speed: "⚡ Hurtig" },
              { title: "Dankort / Visa / Mastercard", desc: "Klassiske kortbetalinger. Bredt accepteret med hurtige indbetalinger. Udbetalinger 1–3 hverdage.", speed: "🕐 1-3 dage" },
            ].map((method) => (
              <div key={method.title} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{method.title}</h3>
                    <Badge variant="outline" className="text-xs">{method.speed}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Min. indbetaling:</strong> 75 kr. | <strong>Min. udbetaling:</strong> 75 kr. | <strong>Valuta:</strong> DKK
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Customer Support */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice hos Spilleautomaten</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            God kundeservice er afgørende for en tryg spiloplevelse. Spilleautomaten tilbyder support på dansk, hvilket fjerner sproglige barrierer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Headphones className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Tilgængelig dagligt kl. 08:00–23:00. Svartiden er typisk under 2 minutter med venlige og præcise medarbejdere.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">E-mail Support</h3>
                <p className="text-sm text-muted-foreground">
                  Beskeder besvares typisk inden for 24 timer med en imødekommende og professionel tone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Mobile Experience */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spilleautomaten på mobil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I en tid hvor flertallet af danske spillere bruger mobilen, er det afgørende at casinooplevelsen fungerer fejlfrit på alle enheder. Spilleautomaten er bygget med mobil-first design og kører direkte i browseren uden behov for en separat app.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Smartphone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Responsivt design</h3>
                <p className="text-sm text-muted-foreground">Optimeret til smartphones og tablets på iOS og Android.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hurtig loading</h3>
                <p className="text-sm text-muted-foreground">Moderne teknologi sikrer hurtige load-tider selv på mobilt netværk.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Gift className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Fuld funktionalitet</h3>
                <p className="text-sm text-muted-foreground">Alle spil, bonusser og betalinger tilgængelige fra mobilen.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Security & License */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed, licens og ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spilleautomaten opererer under dansk licens fra Spillemyndigheden (licensnr. 21-67980, udstedt til Winteq ApS). Det sikrer, at casinoet overholder den danske spillelovgivning og beskytter dig som spiller med strenge krav til fairness, datasikkerhed og{" "}
            <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spillemyndigheden</h3>
                <p className="text-sm text-muted-foreground">Dansk licens nr. 21-67980 – reguleret og overvåget af den danske myndighed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">ROFUS</h3>
                <p className="text-sm text-muted-foreground">Tilsluttet det danske register for frivillig udelukkelse fra spil.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">SSL-kryptering</h3>
                <p className="text-sm text-muted-foreground">Avanceret kryptering beskytter dine data under alle transaktioner.</p>
              </div>
            </div>
          </div>

          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-6 space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Spil altid ansvarligt. Sæt et budget, hold pauser og spil aldrig for mere, end du har råd til at tabe. Alle casinoer på Casinoaftaler.dk tilbyder selvudelukkelsesmuligheder via{" "}
                <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>.
                Har du brug for hjælp, kontakt{" "}
                <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>{" "}
                eller ring til Danske Ludomanilinje på +45 70111810.
              </p>
              <p className="text-xs text-muted-foreground">18+ | Spil ansvarligt | Annoncering</p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Our Final Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores endelige vurdering af Spilleautomaten</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spilleautomaten har på kort tid formået at etablere sig som et af de mest attraktive danske online casinoer. Kombinationen af erfaren drift fra Winteq ApS, en generøs velkomstbonus med kun 10x omsætningskrav, og et innovativt loyalitetsprogram med kontante præmier gør det til et stærkt valg for danske spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spiludvalget er fokuseret og velsammensat med slots fra topudbydere og en voksende live casino-sektion. Udbetalingerne er hurtige – særligt via MobilePay og Trustly – og kundeservicen er tilgængelig på dansk med korte svartider.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De eneste mangler er et begrænset udvalg af digitale bordspil og en live casino-sektion, der stadig er under udvikling. Men for spillere, der primært søger slots og en fair bonusstruktur, er Spilleautomaten et oplagt valg.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Bonus", score: "9/10" },
              { label: "Spiludvalg", score: "8/10" },
              { label: "Betalinger", score: "9/10" },
              { label: "Samlet", score: "4.9/5" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-primary">{item.score}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleBonusClick} size="lg" className="flex-1 font-bold">
              <Gift className="mr-2 h-5 w-5" />
              Hent Bonus hos Spilleautomaten
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/top-10-casino-online">
                <Trophy className="mr-2 h-5 w-5" />
                Se Top 10 Casinoer
              </Link>
            </Button>
          </div>
        </section>

        {/* Inline Casino Cards */}
        <InlineCasinoCards
          title="Andre anbefalede casinoer"
          count={6}
          excludeSlugs={["spilleautomaten"]}
        />

        <Separator className="my-10" />

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Ofte Stillede Spørgsmål om Spilleautomaten</h2>
            </div>
            <p className="text-muted-foreground">
              Svar på de mest almindelige spørgsmål om Spilleautomaten.dk.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {spilleautomatenFaqs.map((faq, index) => (
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

        <RelatedGuides currentPath="/spilleautomaten-anmeldelse" />
      </div>
    </>
  );
};

export default SpilleautomatenAnmeldelse;
