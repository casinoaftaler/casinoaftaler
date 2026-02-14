import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
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
import { QuickFactsProviders, QuickFactsLogo } from "@/components/QuickFactsProviders";
import {
  ShieldCheck,
  Star,
  Clock,
  CreditCard,
  Gift,
  Trophy,
  Sparkles,
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
  Globe,
  Target,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const betiniaFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er Betinia et sikkert casino?",
    answer: (
      <>
        Ja. Betinia har gyldig dansk licens fra Spillemyndigheden (licensnr. 20-6359) samt licens fra Malta Gaming Authority. Platformen benytter SSL-kryptering og er tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse. Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvad er velkomstbonussen hos Betinia?",
    answer: (
      <>
        Nye spillere får 100 % No-Sticky bonus op til 1.000 kr. ved første indbetaling. Omsætningskravet er 10x (indskud + bonus) med 60 dages gyldighed. Der er også en oddsbonus på 100 % op til 1.000 kr. med 5x omsætning. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder tilbyder Betinia?",
    answer: (
      <>
        Betinia tilbyder MobilePay, Dankort, Visa, Mastercard, Trustly, PayPal, Skrill, Neteller, MiFinity samt direkte bankoverførsler. Alle indbetalinger er gebyrfri. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Tilbyder Betinia sportsbetting?",
    answer:
      "Ja. Betinia har en omfattende sportssektion med ca. 30 sportsgrene, herunder fodbold, håndbold, tennis, basketball og e-sport. Der er mulighed for pre-match og livebetting samt akkumulator-boost.",
  },
  {
    question: "Hvad er omsætningskravet på bonussen?",
    answer: (
      <>
        Casino-velkomstbonussen har et omsætningskrav på 10x (indskud + bonus). Da det er en No-Sticky bonus, starter du med din egen saldo. Bonusmidlerne aktiveres først, når din saldo når 0 kr. Læs om{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Har Betinia en No-Sticky bonus?",
    answer: (
      <>
        Ja. Betinias velkomstbonus er en{" "}
        <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link>, hvilket betyder at din indbetaling og bonusmidlerne holdes adskilt. Du spiller først med dine egne penge og kan frit hæve gevinster vundet med din egen saldo.
      </>
    ),
  },
  {
    question: "Tilbyder Betinia live casino?",
    answer: (
      <>
        Ja. Betinia har et bredt udvalg af live casino-spil med professionelle dealere fra Evolution Gaming, herunder blackjack, roulette, baccarat, poker og game shows. Læs mere om{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>.
      </>
    ),
  },
  {
    question: "Hvor hurtigt får jeg mine penge udbetalt fra Betinia?",
    answer:
      "Udbetalinger behandles typisk inden for 1–3 hverdage afhængigt af betalingsmetode. E-wallets som PayPal og Skrill er ofte hurtigere end bankoverførsler.",
  },
  {
    question: "Hvem står bag Betinia?",
    answer:
      "Betinia drives af Romabet Limited, der er baseret på Malta. Casinoet lancerede sin danske platform i 2022 med licens fra Spillemyndigheden og har hurtigt etableret sig som et populært valg.",
  },
  {
    question: "Har Betinia en app?",
    answer:
      "Betinia har ikke en dedikeret app, men hjemmesiden er fuldt mobiloptimeret og fungerer problemfrit i alle moderne browsere på både iOS og Android.",
  },
];

const BetiniaAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const casino = casinos?.find((c) => c.slug === "betinia");

  const handleBonusClick = () => {
    if (casino) getAffiliateRedirect(casino.slug, user?.id);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: betiniaFaqs.map((faq) => ({
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
      name: "Betinia",
      url: "https://www.betinia.dk",
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
      "Betinia er et dansk casino med No-Sticky velkomstbonus på 100% op til 1.000 kr., 10x omsætning, over 40 spiludbydere, sportsbetting og hurtige udbetalinger.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Top 10 Casino Online", item: "https://casinoaftaler.dk/top-10-casino-online" },
      { "@type": "ListItem", position: 3, name: "Betinia Anmeldelse", item: "https://casinoaftaler.dk/betinia-anmeldelse" },
    ],
  };

  return (
    <>
      <SEO
        title="Betinia Anmeldelse 2026 – No-Sticky Bonus, Odds & Vilkår | Casinoaftaler"
        description="Komplet anmeldelse af Betinia.dk. 100% No-Sticky bonus op til 1.000 kr., kun 10x omsætning, over 40 spiludbydere, sportsbetting og hurtige udbetalinger. Læs vores ærlige vurdering."
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
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary">
                <Star className="mr-1.5 h-3.5 w-3.5" />
                4.9 / 5 – Anbefalet Casino
              </Badge>
              <Badge variant="outline" className="border-white/40 text-white">
                No-Sticky Bonus
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Betinia Anmeldelse 2026
            </h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet og ærlig anmeldelse af Betinia.dk – et dansk casino med No-Sticky velkomstbonus på 100 % op til 1.000 kr., kun 10x omsætningskrav, over 40 spiludbydere, sportsbetting med akkumulatorboost og hurtige udbetalinger.
            </p>
            <Button
              onClick={handleBonusClick}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
            >
              <Gift className="mr-2 h-5 w-5" />
              Hent Bonus hos Betinia
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
            <span>Læsetid: <span className="font-medium text-foreground">18 Min.</span></span>
          </div>
        </div>

        {/* Quick Facts Card */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-6 w-6 text-primary" />
                  Hurtige Fakta – Betinia
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
                  <p className="text-xs text-muted-foreground uppercase mb-1">Bonustype</p>
                  <p className="text-lg font-bold text-foreground">No-Sticky</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Omsætningskrav</p>
                  <p className="text-lg font-bold text-foreground">10x (d+b)</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Licens</p>
                  <p className="text-lg font-bold text-foreground">Spillemyndigheden</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Min. indbetaling</p>
                  <p className="text-lg font-bold text-foreground">100 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Bonusgyldighed</p>
                  <p className="text-lg font-bold text-foreground">60 dage</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Grundlagt</p>
                  <p className="text-lg font-bold text-foreground">2022 (DK)</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Spiludbydere</p>
                  <p className="text-lg font-bold text-foreground">40+</p>
                </div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Evolution Gaming", "Play'n GO", "Quickspin", "Wazdan", "ELK Studios", "Big Time Gaming", "Nolimit City", "Pragmatic Play", "Yggdrasil", "Red Tiger", "Hacksaw Gaming", "Push Gaming", "Relax Gaming", "Thunderkick", "Blueprint Gaming"]} />
            </CardContent>
          </Card>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Betinia</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinia gjorde sit indtog på det danske spillemarked i 2022 og har på kort tid etableret sig som et af de mest populære casinoer i Danmark. Bag platformen står Romabet Limited fra Malta, og casinoet opererer med gyldig dansk licens fra Spillemyndigheden (nr. 20-6359) samt licens fra Malta Gaming Authority. Denne dobbelte licensering sikrer et højt niveau af spillerbeskyttelse og regulatorisk overvågning.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det der virkelig adskiller Betinia er kombinationen af en generøs{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky velkomstbonus</Link> på 100 % op til 1.000 kr. med kun 10x omsætningskrav og et enormt spiludvalg fra mere end 40{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link>. Hertil kommer en dedikeret sportssektion med ca. 30 sportsgrene, 19 forskellige betalingsmetoder og effektiv kundeservice via live chat.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spiludvalget spænder fra tusindvis af spilleautomater og bordspil til et veludviklet{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> med professionelle dealere. Med ugentlige reload-bonusser, akkumulatorboost og "Foran med 2"-bonussen i sportssektionen er der løbende incitament for at vende tilbage.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne dybdegående anmeldelse gennemgår vi alt fra{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> og{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> til spiludvalg, sportsbetting,{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, kundeservice og sikkerhed – så du kan tage en informeret beslutning.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Betinia</h2>
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
                    "No-Sticky velkomstbonus – spil med egne penge først",
                    "Kun 10x omsætningskrav (d+b) – blandt de laveste i DK",
                    "Tusindvis af spilleautomater fra 40+ udbydere",
                    "19 forskellige betalingsmetoder inkl. MobilePay og PayPal",
                    "Dedikeret sportssektion med ca. 30 sportsgrene",
                    "Akkumulatorboost op til 100 % på multibets",
                    "\"Foran med 2\" – tidlig udbetaling i fodbold",
                    "Effektiv kundeservice via live chat",
                    "Dansk licens + Malta Gaming Authority",
                    "Fuldt mobiloptimeret hjemmeside",
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
                    "Min. indbetaling på 100 kr. (højere end gennemsnittet)",
                    "Skrill og Neteller kvalificerer ikke til bonusser",
                    "Ingen dedikeret mobilapp – kun browser",
                    "Ingen andre casinobonusser udover velkomstbonussen",
                    "Relativt nyt casino i Danmark (2022)",
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

        {/* Welcome Bonus */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus hos Betinia – No-Sticky & Komplet Guide</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinias velkomstbonus er en 100 %{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> op til 1.000 kr. Det betyder, at din indbetaling og bonusmidlerne holdes helt adskilt. Du spiller først med dine egne penge og kan frit hæve gevinster vundet med din egen saldo – helt uden omsætningskrav.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Hvis din saldo når 0 kr., aktiveres bonusmidlerne automatisk, og først dér gælder{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> på 10x (indskud + bonus). Med 60 dages gyldighed og en maks. indsats på 50 kr. pr. runde er vilkårene blandt de mest spillervenlige på det danske marked.
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
                  { step: "1", title: "Gå til Betinia.dk", desc: "Besøg casinoets forside og klik på den orange tilmeldingsknap øverst på siden." },
                  { step: "2", title: "Indtast CPR og bekræft med MitID", desc: "Indtast dit CPR-nummer og godkend tilmeldelsen via MitID-appen på din telefon." },
                  { step: "3", title: "Angiv kontaktoplysninger", desc: "Indtast dit telefonnummer og eventuelle præferencer for kommunikation." },
                  { step: "4", title: "Foretag din første indbetaling", desc: "Indbetal mindst 100 kr. med din foretrukne betalingsmetode (ikke Skrill/Neteller)." },
                  { step: "5", title: "Aktiver bonussen", desc: "Gå til 'Min Bonus' på din profil og aktiver velkomstbonussen derfra." },
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

          {/* No-Sticky Explanation */}
          <Card className="border-border bg-card mb-6 border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-bold text-foreground">Hvad er en No-Sticky bonus?</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Med en No-Sticky bonus holdes din indbetaling og bonusmidlerne adskilt. Du starter altid med at spille for din egen saldo. Vinder du, kan du frit hæve dine gevinster uden krav. Bonusmidlerne aktiveres kun, hvis din egen saldo rammer 0 kr. Det er den mest spillervenlige bonusstruktur der findes. Læs mere om{" "}
                <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonusser</Link> og sammenlign med{" "}
                <Link to="/sticky-bonus" className={linkClass}>Sticky bonusser</Link>.
              </p>
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
                Eksempel: Du indbetaler 1.000 kr. og får 1.000 kr. i No-Sticky bonus.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Indskud + Bonus</p>
                  <p className="text-xl font-bold text-foreground">2.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">× 10 omsætning</p>
                  <p className="text-xl font-bold text-foreground">= 20.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Indenfor</p>
                  <p className="text-xl font-bold text-foreground">60 dage</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Husk: Med No-Sticky spiller du altid først med din egen saldo. Omsætningskravet gælder kun bonusmidlerne. Læs vores guide til{" "}
                <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Other Bonuses */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Andre bonusser hos Betinia</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Udover velkomstbonussen tilbyder Betinia flere sportsbetting-bonusser, der giver ekstra værdi for aktive spillere:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  Sports-velkomstbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  100 % matchbonus op til 1.000 kr. til sportssektionen. 5x omsætningskrav med minimum odds 2,0 for enkeltvæddemål og 1,5 pr. valg i multibets.
                </p>
                <Badge variant="secondary" className="text-xs">Sportsbetting</Badge>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Akkumulatorboost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Op til 100 % ekstra gevinst på multibets. Kræver mindst 3 valg med odds på min. 1,40 pr. valg. Boostet stiger med antallet af valg – op til 21+ valg for 100 %.
                </p>
                <Badge variant="secondary" className="text-xs">Sportsbetting</Badge>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Foran med 2 – Tidlig Udbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Placer et væddemål på kvalificerende markeder. Når dit hold fører med 2 mål, vinder du automatisk – uanset kampen slutresultat.
                </p>
                <Badge variant="secondary" className="text-xs">Fodbold</Badge>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Gratis væddemål
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Betinia tilbyder lejlighedsvis gratis væddemål til eksisterende spillere via kampagner og særlige events.
                </p>
                <Badge variant="secondary" className="text-xs">Løbende</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Game Selection */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg hos Betinia – Tusindvis af Titler</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Betinia byder på et imponerende spiludvalg med tusindvis af titler fra mere end 40 anerkendte{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link>. Fra spilleautomater og bordspil til{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> og sportsbetting er der noget for enhver smag:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilleautomater
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tusindvis af slots fra udbydere som <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>, <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link> og <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>. Populære titler som Book of Dead, Sweet Bonanza og Big Bass Bonanza.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-primary" />
                  Bordspil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Omfattende udvalg af digitale bordspil inkl. europæisk og amerikansk roulette, blackjack-varianter, baccarat og poker i mange variationer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Live Casino
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Bredt live casino-udvalg fra Evolution Gaming med professionelle dealere. Blackjack, roulette, baccarat, poker og populære game shows som Crazy Time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5 text-primary" />
                  Sportsbetting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ca. 30 sportsgrene inkl. fodbold, tennis, basketball, håndbold og e-sport. Pre-match, livebetting og akkumulatorboost.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder hos Betinia</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Betinia tilbyder hele 19 forskellige{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, hvilket gør det til et af de casinoer med flest muligheder i Danmark. Alle indbetalinger er gebyrfri.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Udbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Gebyr</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "MobilePay", deposit: "✓", withdraw: "—", fee: "Ingen" },
                  { name: "Dankort", deposit: "✓", withdraw: "—", fee: "Ingen" },
                  { name: "Visa / Mastercard", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "Trustly", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "PayPal", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "Bankoverførsel", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "Skrill*", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "Neteller*", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "MiFinity", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                ].map((method) => (
                  <tr key={method.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{method.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.deposit}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.withdraw}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            *Skrill og Neteller kvalificerer ikke til bonusser. Min. indbetaling: 100 kr. Udbetalingstid: 1–3 hverdage.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Customer Support */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice hos Betinia</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Betinia tilbyder kundeservice via live chat, der er tilgængelig direkte fra hjemmesiden. Support-teamet er hjælpsomt og effektivt, og de fleste henvendelser besvares hurtigt. E-mail support er også tilgængelig for mere komplekse forespørgsler.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Headphones className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Tilgængelig direkte fra hjemmesiden med korte ventetider</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <CreditCard className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">E-mail</h3>
                <p className="text-sm text-muted-foreground">Svar inden for 24 timer på hverdage</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Smartphone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Mobilvenlig</h3>
                <p className="text-sm text-muted-foreground">Fuldt mobiloptimeret – fungerer i alle browsere</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Security */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed og licenser</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Betinia opererer med dobbelt licensering fra Spillemyndigheden (nr. 20-6359) og Malta Gaming Authority, hvilket sikrer et af de højeste niveauer af spillerbeskyttelse. Alle data beskyttes med SSL-kryptering, og casinoet er tilsluttet{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> og{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Spillemyndigheden</h3>
                <p className="text-sm text-muted-foreground">Licensnr. 20-6359 – fuldt reguleret i Danmark</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">Malta Gaming Authority</h3>
                <p className="text-sm text-muted-foreground">International MGA-licens for ekstra sikkerhed</p>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardContent className="pt-6 text-center">
                <Award className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-foreground mb-1">ROFUS & StopSpillet</h3>
                <p className="text-sm text-muted-foreground">Tilsluttet selvudelukkelses- og rådgivningstjenester</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion – Er Betinia det rigtige casino for dig?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betinia har på kort tid vist sig som et seriøst og konkurrencedygtigt casino på det danske marked. Med en No-Sticky velkomstbonus på 100 % op til 1.000 kr. med kun 10x omsætning, tusindvis af spil fra 40+ udbydere, 19 betalingsmetoder og en dedikeret sportssektion er der meget at glæde sig over.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Særligt kombinationen af de spillervenlige bonusvilkår og det brede spiludvalg gør Betinia til et stærkt valg for både nye og erfarne spillere. Den dobbelte licensering fra Spillemyndigheden og Malta Gaming Authority giver ekstra tryghed.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={handleBonusClick}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
            >
              <Gift className="mr-2 h-5 w-5" />
              Hent din bonus hos Betinia
            </Button>
          </div>
        </section>

        <Separator className="my-10" />

        <FAQSection title="Ofte stillede spørgsmål om Betinia" faqs={betiniaFaqs} />

        <Separator className="my-10" />

        {/* Inline Casino Cards */}
        <InlineCasinoCards />

        <Separator className="my-10" />

        {/* Related Guides */}
        <RelatedGuides currentPath="/betinia-anmeldelse" />
      </div>
    </>
  );
};

export default BetiniaAnmeldelse;
