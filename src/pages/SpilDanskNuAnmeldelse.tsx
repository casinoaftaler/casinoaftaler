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
  Store,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const spilDanskNuFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er SpilDanskNu et sikkert og lovligt casino?",
    answer: (
      <>
        Ja. SpilDanskNu har gyldig dansk licens fra Spillemyndigheden og drives af Winteq ApS. Platformen benytter SSL-kryptering og er tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse. Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvad er velkomstbonussen hos SpilDanskNu?",
    answer: (
      <>
        Nye spillere får 100 % bonus op til 1.000 kr. fordelt over 5 dage med bonuskoden VELKOMMEN. Omsætningskravet er kun 10x (indskud + bonus) med 60 dages gyldighed. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder tilbyder SpilDanskNu?",
    answer: (
      <>
        Du kan indbetale med MobilePay, Visa, Mastercard og Trustly. Alle indbetalinger er gebyrfri med et minimum på 75 kr. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Har SpilDanskNu et loyalitetsprogram?",
    answer:
      "Ja. For hver 5 kr. omsat i slots optjener du 1 point. Pointene kan indløses til kontanter i Præmieshoppen. Du bliver automatisk medlem ved registrering og nyhedsbrevstilmelding.",
  },
  {
    question: "Kan jeg spille SpilDanskNu på mobilen?",
    answer:
      "Ja. SpilDanskNu er en web-app, der fungerer direkte i browseren på både iOS og Android. Der er ingen separat app at downloade – alle spil, bonusser og betalinger er tilgængelige mobilt.",
  },
  {
    question: "Hvem står bag SpilDanskNu?",
    answer: (
      <>
        SpilDanskNu drives af Winteq ApS, der også står bag{" "}
        <Link to="/spilleautomaten-anmeldelse" className={linkClass}>Spilleautomaten.dk</Link> og Bingo.dk. Det er en erfaren dansk operatør med mange års erfaring på det danske marked.
      </>
    ),
  },
  {
    question: "Hvad er omsætningskravet på bonussen?",
    answer: (
      <>
        Omsætningskravet er 10x (indskud + bonus), hvilket er blandt de laveste i branchen. Eksempel: Indbetaler du 200 kr. og får 200 kr. i bonus, skal du omsætte 4.000 kr. Læs om{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Tilbyder SpilDanskNu live casino?",
    answer: (
      <>
        Ja, SpilDanskNu har et bredt{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>-udvalg med roulette, blackjack og game shows fra professionelle dealere.
      </>
    ),
  },
  {
    question: "Hvor hurtigt får jeg mine penge udbetalt?",
    answer:
      "Udbetalinger behandles typisk inden for 1–3 hverdage. MobilePay og Trustly er de hurtigste metoder. Sørg for at have verificeret din konto inden første udbetaling for at undgå forsinkelser.",
  },
  {
    question: "Er der en bonuskode til SpilDanskNu?",
    answer:
      "Ja. Velkomstbonussen aktiveres med bonuskoden VELKOMMEN ved indbetaling. Du kan få op til 200 kr. i bonus pr. dag over 5 dage – i alt op til 1.000 kr.",
  },
];

const SpilDanskNuAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const casino = casinos?.find((c) => c.slug === "spildansknu");

  const handleBonusClick = () => {
    if (casino) getAffiliateRedirect(casino.slug, user?.id);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: spilDanskNuFaqs.map((faq) => ({
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
      name: "SpilDanskNu",
      url: "https://www.spildansknu.dk",
    },
    author: {
      "@type": "Organization",
      name: "Casinoaftaler",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.6",
      bestRating: "5",
    },
    reviewBody:
      "SpilDanskNu er et dansk online casino med lavt omsætningskrav, over 1.500 spilleautomater, loyalitetsprogram og hurtige udbetalinger.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Top 10 Casino Online", item: "https://casinoaftaler.dk/top-10-casino-online" },
      { "@type": "ListItem", position: 3, name: "SpilDanskNu Anmeldelse", item: "https://casinoaftaler.dk/spildansknu-anmeldelse" },
    ],
  };

  return (
    <>
      <SEO
        title="SpilDanskNu Anmeldelse 2026 – Bonus, Spil & Vilkår | Casinoaftaler"
        description="Komplet anmeldelse af SpilDanskNu.dk. 100% bonus op til 1.000 kr., kun 10x omsætning, over 1.500 slots, loyalitetsprogram og hurtige udbetalinger. Læs vores ærlige vurdering."
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
              4.6 / 5 – Anbefalet Casino
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              SpilDanskNu Anmeldelse 2026
            </h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet og ærlig anmeldelse af SpilDanskNu.dk – et etableret dansk casino siden 2017 med 100 % bonus op til 1.000 kr., kun 10x omsætningskrav, over 1.500 spilleautomater, loyalitetsprogram med kontante præmier og hurtige udbetalinger.
            </p>
            <Button
              onClick={handleBonusClick}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
            >
              <Gift className="mr-2 h-5 w-5" />
              Hent Bonus hos SpilDanskNu
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
            <span>Læsetid: <span className="font-medium text-foreground">14 Min.</span></span>
          </div>
        </div>

        {/* Quick Facts Card */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="h-6 w-6 text-primary" />
                Hurtige Fakta – SpilDanskNu
              </CardTitle>
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
                  <p className="text-lg font-bold text-foreground">2017</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Min. indbetaling</p>
                  <p className="text-lg font-bold text-foreground">75 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Bonusgyldighed</p>
                  <p className="text-lg font-bold text-foreground">60 dage</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Gns. RTP</p>
                  <p className="text-lg font-bold text-foreground">96,3%</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Operatør</p>
                  <p className="text-lg font-bold text-foreground">Winteq ApS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af SpilDanskNu</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            SpilDanskNu.dk er et af de mest etablerede danske online casinoer og har været en fast del af det danske casinolandskab siden 2017. Bag platformen står Winteq ApS – samme erfarne operatør, der driver{" "}
            <Link to="/spilleautomaten-anmeldelse" className={linkClass}>Spilleautomaten.dk</Link> og Bingo.dk. Det er altså ikke en nystartet aktør, men et velkonsolideret casino med mange års erfaring i at betjene danske spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            SpilDanskNu skiller sig ud ved at holde tingene enkle og gennemsigtige. Her finder du ikke overkomplicerede bonusstrukturer eller skjulte vilkår. I stedet tilbyder de et af markedets laveste omsætningskrav på kun 10x, en bred vifte af over 1.500 spilleautomater fra anerkendte udbydere, samt et loyalitetsprogram der faktisk giver kontante præmier – ikke blot bonusmidler med yderligere gennemspilskrav.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fokus ligger klart på casino – der er ingen sportsbetting eller bingo at finde her. Det giver SpilDanskNu en skarp og fokuseret identitet, hvor al energi er rettet mod at levere den bedste casinooplevelse. Med dansk kundeservice, kendte betalingsmetoder som MobilePay og Trustly, samt fuld regulering under Spillemyndigheden, er SpilDanskNu et solidt og trygt valg.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne dybdegående anmeldelse gennemgår vi alt fra{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> og{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> til spiludvalg,{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, kundeservice, mobiloplevelse og sikkerhed – så du kan tage en fuldt informeret beslutning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved SpilDanskNu</h2>
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
                    "Dansk licens fra Spillemyndigheden – sikkert og lovligt",
                    "Meget lavt omsætningskrav på kun 10x (d+b)",
                    "Over 1.500 spilleautomater fra topudbydere",
                    "Loyalitetsprogram med kontante præmier i Præmieshoppen",
                    "Lav minimumsindbetaling på 75 kr.",
                    "MobilePay, Trustly, Visa og Mastercard – ingen gebyrer",
                    "Etableret siden 2017 – erfaren og pålidelig operatør",
                    "60 dages bonusgyldighed – masser af tid til gennemspil",
                    "Gennemsnitlig RTP på 96,3% – fair spilleforhold",
                    "Live casino med professionelle dealere",
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
                    "Ingen sportsbetting – udelukkende casino",
                    "Kundeservice er ikke døgnåben (08:00–23:00)",
                    "Ingen dedikeret mobilapp – kun web-app",
                    "Ingen fast cashback- eller fødselsdagsbonus",
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
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus hos SpilDanskNu – Komplet Guide</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            SpilDanskNu byder nye spillere velkommen med en{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstpakke</Link> der er bygget som en femdages model. Du kan få op til 200 kr. i bonus pr. dag, så totalen rammer 1.000 kr. Det er en af de mest gennemsigtige velkomstbonusser på det danske marked.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            <Link to="/omsaetningskrav" className={linkClass}>Omsætningskravet</Link> er 10x (indskud + bonus), hvilket er standarden for alle danske casinoer med licens fra Spillemyndigheden. Bonussen har 60 dages gyldighed, og maks. indsats med bonusmidler er 40 kr. pr. runde. Bemærk at kun spilleautomater tæller med – progressive slots, bordspil og live casino er undtaget.
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
                  { step: "1", title: "Opret konto", desc: "Besøg SpilDanskNu.dk og opret en konto via MitID. Det tager under 5 minutter." },
                  { step: "2", title: "Sæt spilbegrænsninger", desc: "Fastsæt dine egne ind- og udbetalingsgrænser som det første – det er lovpligtigt." },
                  { step: "3", title: "Brug kode VELKOMMEN", desc: "Indbetal mellem 75–200 kr. med bonuskoden VELKOMMEN for at aktivere velkomstpakken." },
                  { step: "4", title: "Gentag i 5 dage", desc: "Du kan få op til 200 kr. bonus pr. dag i 5 dage – i alt op til 1.000 kr." },
                  { step: "5", title: "Gennemspil bonussen", desc: "Omsæt indskud + bonus 10 gange inden for 60 dage for at frigøre gevinster til udbetaling." },
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

        {/* Bonuskoder */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">SpilDanskNu Bonuskode – Sådan Bruger Du Den</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at aktivere velkomstbonussen hos SpilDanskNu skal du bruge bonuskoden <strong className="text-foreground">VELKOMMEN</strong> ved indbetaling. Koden skal indtastes hver gang du indbetaler for at sikre, at bonusmidlerne krediteres korrekt til din konto.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er vigtigt at huske, at du kun kan have ét aktivt bonustilbud ad gangen. Sørg derfor for at gennemspille et bonustilbud, inden du aktiverer det næste. Vilkår som gennemspil og maks. indsats gælder altid uanset bonuskode.
          </p>
          <Card className="border-border bg-card border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-bold text-foreground">Aktuel bonuskode</h3>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
                <code className="text-2xl font-bold text-primary tracking-widest">VELKOMMEN</code>
                <Badge variant="secondary" className="text-xs">Aktiv 2026</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Indtast koden ved indbetaling for at modtage 100 % bonus op til 200 kr. pr. dag i 5 dage.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Game Selection */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg hos SpilDanskNu – Over 1.500 Spil</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            SpilDanskNu har et imponerende udvalg med over 1.500 spilleautomater fra anerkendte udbydere, suppleret af et voksende{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link>. Her er hvad du kan forvente:
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
                  Over 1.500 slots fra topudbydere som Play'n GO, Pragmatic Play, NetEnt, Red Tiger og ELK Studios. Fra klassiske frugttemaer til moderne megaways og bonus buy-spil – udvalget er enormt og konstant voksende.
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
                  Professionelle dealere på roulette, blackjack og baccarat. Game shows som Crazy Time og Monopoly Live giver en interaktiv og underholdende oplevelse direkte fra studiet.
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
                  Super Wheel, Dream Catcher og andre show-baserede spil giver et friskt supplement til klassiske slots. Perfekt for spillere der søger noget anderledes og socialt.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            <strong>Bemærk:</strong> SpilDanskNu fokuserer udelukkende på casino – der er ingen sportsbetting. Til gengæld er spiludvalget dybt og velsammensat. Læs om de bedste{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Loyalty Program */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Loyalitetsprogram og Præmieshop</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            SpilDanskNu's loyalitetsprogram er en af platformens stærkeste sider. I modsætning til mange konkurrenter, der kun tilbyder bonusmidler, kan du her indløse dine optjente point til kontante præmier via Præmieshoppen – helt uden yderligere omsætningskrav.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Award, title: "Automatisk deltagelse", desc: "Du deltager automatisk ved registrering og nyhedsbrevstilmelding – ingen ekstra aktivering påkrævet." },
              { icon: TrendingUp, title: "1 point pr. 5 kr. omsat", desc: "For hver 5 kr. omsat i slots optjener du 1 point. Kun spil med rigtige penge tæller." },
              { icon: Store, title: "Kontante præmier i Præmieshoppen", desc: "Point kan indløses til kontanter i Præmieshoppen – ikke bonusmidler, men rigtige penge." },
              { icon: Gamepad2, title: "Kun slots tæller", desc: "Bordspil, live casino og bonusspil tæller ikke med i pointoptjeningen." },
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
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder hos SpilDanskNu</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            SpilDanskNu understøtter de mest populære danske{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. Alle transaktioner er gebyrfri, og indbetalinger krediteres øjeblikkeligt.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Min. indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Max. indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Udbetalingstid</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Gebyr</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Visa", min: "75 kr.", max: "50.000 kr.", time: "1–2 dage", fee: "Ingen" },
                  { name: "Mastercard", min: "75 kr.", max: "50.000 kr.", time: "1–2 dage", fee: "Ingen" },
                  { name: "MobilePay", min: "75 kr.", max: "50.000 kr.", time: "Øjeblikkelig", fee: "Ingen" },
                  { name: "Trustly", min: "75 kr.", max: "50.000 kr.", time: "1–2 dage", fee: "Ingen" },
                  { name: "Bankoverførsel", min: "75 kr.", max: "50.000 kr.", time: "2–3 dage", fee: "Ingen" },
                ].map((method) => (
                  <tr key={method.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{method.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.min}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.max}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.time}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Tip:</strong> Sørg for at have verificeret din konto med gyldig ID (pas eller kørekort) inden du anmoder om din første udbetaling. Dette fremskynder processen markant og undgår unødige forsinkelser.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Customer Support */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice hos SpilDanskNu</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            God kundeservice er afgørende for en tryg spiloplevelse. SpilDanskNu tilbyder support udelukkende på dansk, hvilket fjerner sproglige barrierer og sikrer hurtig forståelse.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Headphones className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Tilgængelig dagligt kl. 08:00–23:00. Svartiden er typisk under 2 minutter med venlige og kompetente medarbejdere.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">E-mail Support</h3>
                <p className="text-sm text-muted-foreground">
                  Henvendelser besvares typisk inden for 24 timer. God til mere komplekse spørgsmål om verifikation eller bonusvilkår.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Mobile Experience */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">SpilDanskNu på mobil – Web-app Oplevelse</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            SpilDanskNu er bygget som en web-app, der kører direkte i browseren på din smartphone eller tablet. Det betyder, at du ikke skal hente noget fra App Store eller Google Play – du går bare til hjemmesiden og begynder at spille.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Selvom der ikke er en dedikeret app, fungerer mobiloplevelsen fremragende. Alle funktioner – fra spil og bonusser til betalinger og kundeservice – er fuldt tilgængelige og optimeret til touchskærme.
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
                <h3 className="font-semibold">Ingen download</h3>
                <p className="text-sm text-muted-foreground">Spil direkte fra browseren uden installation.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Gift className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Fuld funktionalitet</h3>
                <p className="text-sm text-muted-foreground">Alle spil, bonusser og betalinger tilgængelige mobilt.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Udbetalinger */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Udbetalinger hos SpilDanskNu – Hvad Du Kan Forvente</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de hyppigste bekymringer for nye spillere er udbetalingsprocessen. Hos SpilDanskNu oplever de fleste spillere en gnidningsfri udbetaling, så længe kontoen er verificeret og bonusvilkår er opfyldt.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den typiske behandlingstid er 1–3 hverdage afhængigt af betalingsmetode. MobilePay er som regel den hurtigste mulighed. Minimum udbetalingsbeløb er 75 kr., og der opkræves ingen gebyrer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Vores anbefaling:</strong> Verificér din konto tidligt med kørekort eller pas, og sørg for at navn på betalingskonto matcher kontoen hos SpilDanskNu. Dette forebygger forsinkelser og sikrer en hurtigere udbetalingsproces.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Security & License */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed, licens og ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            SpilDanskNu opererer under dansk licens fra Spillemyndigheden, udstedt til Winteq ApS. Det sikrer fuld overholdelse af dansk spillelovgivning med strenge krav til fairness, databeskyttelse og{" "}
            <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spillemyndigheden</h3>
                <p className="text-sm text-muted-foreground">Dansk licens – reguleret og overvåget af den danske myndighed.</p>
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
                <h3 className="font-semibold">RNG Certificeret</h3>
                <p className="text-sm text-muted-foreground">Spillene er uafhængigt testet for fairness med en gennemsnitlig RTP på 96,3%.</p>
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

        {/* Final Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores endelige vurdering af SpilDanskNu</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            SpilDanskNu har siden 2017 etableret sig som et af de mest pålidelige danske online casinoer. Med en erfaren operatør i ryggen, et lavt omsætningskrav på 10x, over 1.500 spilleautomater og et loyalitetsprogram med kontante præmier, rammer de en sjælden kombination af gennemsigtighed og værdi.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Platformen er enkel at navigere, betalingsmetoderne er velkendte og gebyrfri, og kundeservicen er tilgængelig på dansk med korte svartider. Den gennemsnitlige RTP på 96,3% bekræfter fair spilleforhold.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De eneste mangler er fraværet af sportsbetting, en kundeservice der ikke er døgnåben, og manglen på en dedikeret mobilapp. Men for spillere der primært søger et solidt dansk casino med fair bonusvilkår og et stærkt spiludvalg, er SpilDanskNu et fremragende valg.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Bonus", score: "9/10" },
              { label: "Spiludvalg", score: "9/10" },
              { label: "Betalinger", score: "9/10" },
              { label: "Samlet", score: "4.6/5" },
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
              Hent Bonus hos SpilDanskNu
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
          excludeSlugs={["spildansknu"]}
        />

        <Separator className="my-10" />

        {/* FAQ Section */}
        <section className="mb-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Ofte Stillede Spørgsmål om SpilDanskNu</h2>
            </div>
            <p className="text-muted-foreground">
              Svar på de mest almindelige spørgsmål om SpilDanskNu.dk.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {spilDanskNuFaqs.map((faq, index) => (
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

        <RelatedGuides currentPath="/spildansknu-anmeldelse" />
      </div>
    </>
  );
};

export default SpilDanskNuAnmeldelse;
