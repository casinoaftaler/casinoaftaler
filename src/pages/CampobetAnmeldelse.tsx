import { Link } from "react-router-dom";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
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
import { QuickFactsProviders, QuickFactsLogo } from "@/components/QuickFactsProviders";
import type { ReactNode } from "react";
import campobetHero from "@/assets/heroes/campobet-hero.jpg";
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

const campobetFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Hvad betyder det, at Campobets velkomstbonus er No-Sticky?",
    answer: (
      <>
        Campobets velkomstbonus på 100 % op til 1.000 kr. er en{" "}
        <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> (også kaldet faldskærmsbonus). Det betyder, at din indbetaling og bonusmidlerne holdes adskilt i to separate saldi. Du spiller altid først med dine egne penge, og du kan til enhver tid hæve din indbetaling og eventuelle gevinster vundet med egne midler – uden at opfylde omsætningskravet. Bonusmidlerne aktiveres kun, hvis din egen saldo rammer 0 kr. Med et omsætningskrav på kun 10x (indskud + bonus) er det en af de mest spillervenlige bonusstrukturer på det danske marked. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvordan adskiller Campobets sportssektion sig fra rene casino-sider?",
    answer:
      "Campobet er en dual-platform, der kombinerer online casino med en fuldt integreret sportssektion. Sportssektionen dækker cirka 40 sportsgrene, herunder fodbold, håndbold, tennis, basketball, ishockey og e-sport. Du kan placere pre-match væddemål samt livebets med realtidsopdatering af odds. Bet Builder-funktionen giver mulighed for at kombinere flere væddemål inden for samme kamp til en samlet odds-kupon. Nye spillere kan alternativt vælge en dedikeret oddsbonus på 100 % op til 1.000 kr. med kun 5x omsætningskrav i stedet for casinobonussen. Det gør Campobet attraktivt for spillere, der ønsker begge dele under ét tag.",
  },
  {
    question: "Er Campobet et sikkert casino med gyldig dansk licens?",
    answer: (
      <>
        Campobet har tredobbelt licensering: dansk licens fra Spillemyndigheden (licensnr. 20-6359), licens fra Malta Gaming Authority (MGA) samt den svenske spillemyndighed. Platformen drives af Denix Limited, der har drevet casinoet internationalt siden 2018 og lancerede den danske version i 2024. Casinoet benytter SSL-kryptering og er fuldt tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Registrering sker via MitID, hvilket sikrer øjeblikkelig identitetsverifikation og forhindrer mindreårige i at oprette konti. Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder understøtter Campobet, og er der gebyrer?",
    answer: (
      <>
        Campobet har det bredeste udvalg af betalingsmetoder blandt danske casinoer. Udover{" "}
        <Link to="/betalingsmetoder/mobilepay" className={linkClass}>MobilePay</Link>,{" "}
        <Link to="/betalingsmetoder/visa-mastercard" className={linkClass}>Visa/Mastercard</Link> og{" "}
        <Link to="/betalingsmetoder/trustly" className={linkClass}>Trustly</Link> tilbyder de også{" "}
        <Link to="/betalingsmetoder/paypal" className={linkClass}>PayPal</Link>,{" "}
        <Link to="/betalingsmetoder/zimpler" className={linkClass}>Zimpler</Link>,{" "}
        <Link to="/betalingsmetoder/skrill" className={linkClass}>Skrill</Link>, Neteller,{" "}
        <Link to="/betalingsmetoder/paysafecard" className={linkClass}>Paysafecard</Link> samt direkte bankoverførsler fra bl.a. Danske Bank, Nordea, Jyske Bank og Sydbank. Alle transaktioner er 100 % gebyrfri, og minimumsindbetalingen er 100 kr. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Tilbyder Campobet reload-bonusser til eksisterende spillere?",
    answer: (
      <>
        Ja. Campobet har faste ugentlige reload-bonusser, der gør platformen attraktiv for langsigtede spillere. Den primære reload-bonus er 100 % op til 500 kr. hver uge, med samme lave omsætningskrav på 10x som velkomstbonussen. Derudover tilbydes en separat weekend reload-bonus med tilsvarende vilkår. Begge kræver minimum 100 kr. i indbetaling. Disse reload-bonusser er ligeledes No-Sticky, hvilket gør dem markant mere fordelagtige end konkurrenternes{" "}
        <Link to="/sticky-bonus" className={linkClass}>sticky bonusser</Link>. Kampagnerne annonceres via e-mail og direkte på platformen efter login.
      </>
    ),
  },
  {
    question: "Hvor hurtigt behandler Campobet udbetalinger?",
    answer:
      "Campobet behandler udbetalinger typisk inden for 1–3 hverdage uanset betalingsmetode. En væsentlig fordel er, at din identitet allerede er verificeret via MitID ved registrering, hvilket eliminerer forsinkelser ved første udbetaling. E-wallets som PayPal og Skrill er generelt de hurtigste med behandling inden for 24 timer. Bankoverførsler og kortbetalinger tager normalt 2–3 hverdage. Minimum udbetalingsbeløb er 100 kr. Der er ingen maksimal udbetalingsgrænse pr. transaktion, men casinoet forbeholder sig retten til at opdele meget store gevinster i flere betalinger.",
  },
  {
    question: "Hvor stort er Campobets spiludvalg, og hvilke udviklere er repræsenteret?",
    answer: (
      <>
        Campobet har over 3.000 casinospil fra mere end 50 spiludviklere, herunder{" "}
        <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>,{" "}
        <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
        <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>,{" "}
        <Link to="/spiludviklere/nolimit-city" className={linkClass}>Nolimit City</Link> og{" "}
        <Link to="/spiludviklere/hacksaw-gaming" className={linkClass}>Hacksaw Gaming</Link>. Udvalget omfatter spilleautomater, bordspil, video poker og ca. 100 live casino-borde med professionelle dealere. Casinoet tilføjer nye titler ugentligt og har en velfungerende filtreringsfunktion, der gør det nemt at finde spil efter kategori, volatilitet eller udbyder.
      </>
    ),
  },
  {
    question: "Hvem er Denix Limited, og hvilken erfaring har de som casinooperatør?",
    answer:
      "Denix Limited er et Malta-baseret selskab, der har drevet Campobet internationalt siden 2018. Selskabet har licenser i flere europæiske jurisdiktioner og lancerede den danske version af platformen i 2024 efter at have opnået licens fra Spillemyndigheden. Denix har opbygget et solidt ry for pålidelig drift, hurtige udbetalinger og omfattende spiludvalg. Deres internationale erfaring afspejles i platformens tekniske kvalitet, brede betalingsmuligheder og professionelle kundeservice, der er tilgængelig på dansk via live chat og e-mail.",
  },
];

const CampobetAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const casino = casinos?.find((c) => c.slug === "campobet");

  const handleBonusClick = () => {
    if (casino) getAffiliateRedirect(casino.slug, user?.id);
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: campobetFaqs.map((faq) => ({
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
      name: "Campobet",
      url: "https://www.campobet.dk",
    },
    author: {
      "@type": "Organization",
      name: "Casinoaftaler",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.8",
      bestRating: "5",
    },
    reviewBody:
      "Campobet er et internationalt casino med dansk licens, No-Sticky velkomstbonus på 100% op til 1.000 kr., 10x omsætning, sportsbetting og tusindvis af spil.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Top 10 Casino Online", item: "https://casinoaftaler.dk/top-10-casino-online" },
      { "@type": "ListItem", position: 3, name: "Campobet Anmeldelse", item: "https://casinoaftaler.dk/campobet-anmeldelse" },
    ],
  };

  return (
    <>
      <SEO
        title="Campobet Anmeldelse 2026 – No-Sticky Bonus, Odds & Vilkår | Casinoaftaler"
        description="Komplet anmeldelse af Campobet.dk. 100% No-Sticky bonus op til 1.000 kr., kun 10x omsætning, sportsbetting, tusindvis af spil og hurtige udbetalinger. Læs vores ærlige vurdering."
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
                4.8 / 5 – Anbefalet Casino
              </Badge>
              <Badge variant="outline" className="border-white/40 text-white">
                No-Sticky Bonus
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Campobet Anmeldelse 2026
            </h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet og ærlig anmeldelse af Campobet.dk – et internationalt casino med dansk licens, 100 % No-Sticky bonus op til 1.000 kr., kun 10x omsætningskrav, tusindvis af spilleautomater, live casino, sportsbetting og hurtige udbetalinger.
            </p>
            <Button
              onClick={handleBonusClick}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8"
            >
              <Gift className="mr-2 h-5 w-5" />
              Hent Bonus hos Campobet
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="13-02-2026" readTime="16 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={campobetHero} alt="Campobet casino – internationalt casino med dansk licens" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Quick Facts Card */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-6 w-6 text-primary" />
                  Hurtige Fakta – Campobet
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
                  <p className="text-lg font-bold text-foreground">2018 (DK 2024)</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Operatør</p>
                  <p className="text-lg font-bold text-foreground">Denix Limited</p>
                </div>
              </div>
              <QuickFactsProviders providers={["Pragmatic Play", "Hacksaw Gaming", "Nolimit City", "NetEnt", "Play'n GO", "Yggdrasil", "ELK Studios", "Quickspin", "Red Tiger", "Push Gaming", "Relax Gaming", "Evolution Gaming"]} />
            </CardContent>
          </Card>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Campobet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Campobet er et internationalt casino, der har opereret siden 2018 og lancerede sin danske platform i 2024. Bag casinoet står Denix Limited fra Malta, der også driver flere andre velkendte casinobrands. Med licenser fra Spillemyndigheden (nr. 20-6359), Malta Gaming Authority og den svenske spillemyndighed er Campobet et af de mest velregulerede casinoer tilgængelige for danske spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det der virkelig adskiller Campobet fra mange konkurrenter er kombinationen af en{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky velkomstbonus</Link> med kun 10x omsætningskrav og en dedikeret sportssektion med ca. 40 sportsgrene. Du finder sjældent et casino der tilbyder begge dele på så fordelagtige vilkår.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spiludvalget er imponerende med tusindvis af spilleautomater fra 43 anerkendte spiludbydere, ca. 100 live casino-spil og næsten 100 digitale bordspil. Hertil kommer ugentlige og weekend reload-bonusser, akkumulatorboosts til sportsbetting og hurtige udbetalinger via kendte betalingsmetoder.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne dybdegående anmeldelse gennemgår vi alt fra{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> og{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> til spiludvalg, sportsbetting,{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, kundeservice og sikkerhed. Læs mere om{" "}
            <Link to="/saadan-tester-vi-casinoer" className={linkClass}>sådan tester vi casinoer</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Campobet</h2>
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
                    "Meget lavt omsætningskrav på kun 10x (d+b)",
                    "Tusindvis af spilleautomater fra 43 udbydere",
                    "Dedikeret sportssektion med ca. 40 sportsgrene",
                    "Tre licenser: Danmark, Malta og Sverige",
                    "Ugentlig og weekend reload-bonusser",
                    "Bredt udvalg af betalingsmetoder inkl. PayPal",
                    "24/7 kundeservice via live chat",
                    "Ca. 100 live casino-spil med professionelle dealere",
                    "Livebetting og Bet Builder-væddemål",
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
                    "Kundeservice primært på engelsk (med oversættelsesprogram)",
                    "Begrænset game show-udvalg i live casinoet",
                    "Intet loyalitetsprogram med pointsystem",
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
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus hos Campobet – No-Sticky & Komplet Guide</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Campobets velkomstbonus er en 100 %{" "}
            <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonus</Link> op til 1.000 kr. Det betyder, at din indbetaling og bonusmidlerne holdes helt adskilt. Du spiller først med dine egne penge, og kan frit hæve gevinster vundet med din egen saldo – uden omsætningskrav.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Hvis din saldo når 0 kr., aktiveres bonusmidlerne automatisk, og først dér gælder{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskravet</Link> på 10x (indskud + bonus). Med 60 dages gyldighed og en maks. indsats på 50 kr. pr. runde er vilkårene blandt de mest spillervenlige i Danmark.
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
                  { step: "1", title: "Gå til Campobet.dk", desc: "Besøg casinoets forside og klik på den orange tilmeldingsknap i øverste højre hjørne." },
                  { step: "2", title: "Log ind med MitID", desc: "Bekræft din identitet via MitID-appen og indtast dit CPR-nummer." },
                  { step: "3", title: "Vælg bonus", desc: "Vælg casino-velkomstbonussen (eller alternativt odds-velkomstbonussen). Du kan også fravælge bonus." },
                  { step: "4", title: "Angiv e-mail og tlf.", desc: "Indtast din e-mailadresse og dit telefonnummer for at fuldføre registreringen." },
                  { step: "5", title: "Sæt indbetalingsgrænser", desc: "Fastsæt dine daglige, ugentlige og månedlige indbetalingsgrænser." },
                  { step: "6", title: "Foretag din første indbetaling", desc: "Indbetal mindst 100 kr. med din foretrukne betalingsmetode (ikke Skrill/Neteller) og modtag bonussen." },
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
                Med en No-Sticky bonus holdes din indbetaling og bonusmidlerne adskilt. Du starter altid med at spille for din egen saldo. Vinder du, kan du frit hæve dine gevinster uden krav. Bonusmidlerne aktiveres kun, hvis din egne saldo rammer 0 kr. Det er den mest spillervenlige bonusstruktur der findes. Læs mere om{" "}
                <Link to="/no-sticky-bonus" className={linkClass}>No-Sticky bonusser</Link>.
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
                Eksempel: Du indbetaler 500 kr. og får 500 kr. i No-Sticky bonus.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Indskud + Bonus</p>
                  <p className="text-xl font-bold text-foreground">1.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">× 10 omsætning</p>
                  <p className="text-xl font-bold text-foreground">= 10.000 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">Indenfor</p>
                  <p className="text-xl font-bold text-foreground">60 dage</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Husk: Omsætningskravet gælder kun for bonusmidlerne (No-Sticky). Gevinster fra din egen saldo kan hæves frit. Læs vores guide til{" "}
                <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Other Bonuses */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Andre bonusser hos Campobet</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ud over velkomstbonussen tilbyder Campobet flere løbende kampagner, der giver eksisterende spillere ekstra værdi. Her er de vigtigste:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  Ugentlig Reload-bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  100 % bonus op til 500 kr. hver uge. Kræver minimum 100 kr. indbetaling med 10x omsætningskrav. Maks. indsats: 50 kr. pr. runde.
                </p>
                <Badge variant="secondary" className="text-xs">Ugentlig</Badge>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Weekend Reload-bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  100 % bonus op til 500 kr. i weekenden (fredag 00:00 – søndag 23:59). Samme vilkår som den ugentlige reload.
                </p>
                <Badge variant="secondary" className="text-xs">Fredag–Søndag</Badge>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Odds-velkomstbonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  100 % op til 1.000 kr. til sportssektionen. 5x omsætningskrav med minimum odds 2,0 for enkeltvæddemål og 1,5 for multibets. Maks. 500 kr. pr. indsats.
                </p>
                <Badge variant="secondary" className="text-xs">Sportsbetting</Badge>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Akkumulator Boost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Op til 100 % ekstra på multibets. Plus "Foran med 2 – Tidlig udbetaling" der giver automatisk udbetaling, når dit hold fører med 2 mål.
                </p>
                <Badge variant="secondary" className="text-xs">Sportsbetting</Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Game Selection */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg hos Campobet – Tusindvis af Spil</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Campobet byder på et imponerende spiludvalg med tusindvis af titler fra 43 anerkendte spiludbydere. Fra spilleautomater og bordspil til{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> og sportsbetting – her er et overblik:
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
                  Tusindvis af slots fra udbydere som <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link>, <Link to="/spiludviklere/microgaming" className={linkClass}>Microgaming</Link>, <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link>, <Link to="/spiludviklere/big-time-gaming" className={linkClass}>Big Time Gaming</Link> og <Link to="/spiludviklere/yggdrasil" className={linkClass}>Yggdrasil</Link>. Populære titler som Book of Dead, Big Bass Amazon Extreme og Scroll of Dead.
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
                  Næsten 100 digitale bordspil inkl. europæisk og amerikansk roulette, blackjack-varianter, baccarat og Lightning-versioner af klassikerne.
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
                  Ca. 100 live spil med professionelle dealere. Blackjack dominerer med Speed, Lightning og VIP-rum. Plus roulette, baccarat og game shows.
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
                  Ca. 40 sportsgrene inkl. fodbold, tennis, basketball, håndbold og e-sport. Pre-match, livebetting og Bet Builder-væddemål.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Med hele 43{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link> repræsenteret sikrer Campobet et bredt og dybt udvalg, der tilfredsstiller både casual spillere og erfarne casinogæster.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder hos Campobet</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Campobet tilbyder et af de bredeste udvalg af{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link> på det danske marked. Alle transaktioner er gebyrfri med en minimumsindbetaling på 100 kr.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Metode</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Min.</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Max. indbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Max. udbetaling</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Gebyr</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "MobilePay", min: "100 kr.", maxIn: "37.500 kr.", maxOut: "—", fee: "Ingen" },
                  { name: "Visa / Mastercard", min: "100 kr.", maxIn: "15.000 kr.", maxOut: "15.000 kr.", fee: "Ingen" },
                  { name: "Trustly", min: "100 kr.", maxIn: "110.000 kr.", maxOut: "80.000 kr.", fee: "Ingen" },
                  { name: "PayPal", min: "100 kr.", maxIn: "110.000 kr.", maxOut: "15.000 kr.", fee: "Ingen" },
                  { name: "Zimpler", min: "100 kr.", maxIn: "110.000 kr.", maxOut: "15.000 kr.", fee: "Ingen" },
                  { name: "Bankoverførsel", min: "100 kr.", maxIn: "110.000 kr.", maxOut: "110.000 kr.", fee: "Ingen" },
                  { name: "Skrill*", min: "100 kr.", maxIn: "37.500 kr.", maxOut: "80.000 kr.", fee: "Ingen" },
                  { name: "Neteller*", min: "100 kr.", maxIn: "37.500 kr.", maxOut: "80.000 kr.", fee: "Ingen" },
                ].map((method) => (
                  <tr key={method.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{method.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.min}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.maxIn}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.maxOut}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{method.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            *Skrill og Neteller kvalificerer ikke til bonusser. Udbetalingstid: 1–3 hverdage for alle metoder.
          </p>

          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Tip:</strong> Campobet verificerer automatisk din identitet via MitID ved registrering, hvilket forenkler udbetalingsprocessen markant. Du behøver ikke uploade ekstra dokumentation.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Sportsbetting Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sportsbetting hos Campobet – Komplet Overblik</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Campobets sportssektion dækker alt fra de største internationale ligaer til nichemarkeder. Med ca. 40 sportsgrene er der masser af muligheder for både casual og erfarne bettere.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Du kan placere klassiske pre-match væddemål, følge med i realtid via livebetting eller bygge dine egne væddemål med Bet Builder-funktionen. Oddsbonussen på 100 % op til 1.000 kr. med kun 5x omsætningskrav gør det ekstra attraktivt for nye spillere.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              "Fodbold", "Tennis", "Basketball", "Håndbold",
              "Ishockey", "E-sport", "Amerikansk fodbold", "Dart",
            ].map((sport) => (
              <div key={sport} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{sport}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Plus mange flere inkl. vandpolo, lacrosse, volleyball, cricket og mere.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Customer Support */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice hos Campobet</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Campobet udmærker sig ved at tilbyde 24/7 kundeservice via live chat – noget der ikke er standarden blandt danske casinoer. Selvom medarbejderne primært er engelsktalende, har de oversættelsesprogrammer integreret, så du kan skrive på dansk.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Headphones className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Live Chat 24/7</h3>
                <p className="text-sm text-muted-foreground">Tilgængelig døgnet rundt. Svartid typisk under 2 minutter.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">E-mail</h3>
                <p className="text-sm text-muted-foreground">support@campobet.dk – svar inden for 1-2 hverdage.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">FAQ</h3>
                <p className="text-sm text-muted-foreground">Omfattende FAQ-side der dækker de mest stillede spørgsmål.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Mobile */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Campobet på mobil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Campobet er fuldt optimeret til mobilbrug og fungerer direkte i browseren på smartphones og tablets. Alle funktioner – fra casino og sportsbetting til betalinger og live chat – er tilgængelige mobilt.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Smartphone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Responsivt design</h3>
                <p className="text-sm text-muted-foreground">Optimeret til iOS og Android. Ingen app påkrævet.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Hurtig navigation</h3>
                <p className="text-sm text-muted-foreground">Intuitivt layout med nem adgang til casino, odds og konto.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Globe className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Livebetting mobilt</h3>
                <p className="text-sm text-muted-foreground">Fuld livebetting-oplevelse med realtidsopdateringer.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Security & License */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed, licens og ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Campobet er et af de mest velregulerede casinoer tilgængelige i Danmark med hele tre licenser fra anerkendte myndigheder. Det sikrer den højeste grad af spillerbeskyttelse og{" "}
            <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Spillemyndigheden</h3>
                <p className="text-sm text-muted-foreground">Dansk licens nr. 20-6359 – fuld regulering under dansk lov.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Malta Gaming Authority</h3>
                <p className="text-sm text-muted-foreground">International licens fra en af verdens mest respekterede spillemyndigheder.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Svensk licens</h3>
                <p className="text-sm text-muted-foreground">Licens fra den svenske spillemyndighed – triple-reguleret casino.</p>
              </div>
            </div>
          </div>

          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardContent className="pt-6 space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Spil altid ansvarligt. Sæt et budget, hold pauser og spil aldrig for mere, end du har råd til at tabe. Campobet tilbyder selvudelukkelsesmuligheder via{" "}
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
          <h2 className="mb-4 text-3xl font-bold">Vores endelige vurdering af Campobet</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Campobet imponerer som et velrunderet casino med en sjælden kombination af No-Sticky velkomstbonus, lavt omsætningskrav, bredt spiludvalg og dedikeret sportssektion. Med tre internationale licenser er det et af de mest troværdige casinoer på det danske marked.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spiludvalget med tusindvis af titler fra 43 udbydere, ca. 100 live casino-spil og en omfattende sportssektion gør Campobet til en one-stop-shop for enhver spillertype. Betalingsudvalget er blandt de bredeste i Danmark, og 24/7 kundeservice via live chat er et stort plus.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De eneste reelle mangler er en lidt højere minimumsindbetaling (100 kr.), fraværet af et loyalitetsprogram med pointsystem, og at kundeservicen primært er på engelsk. Men for spillere der søger et velreguleret casino med fair bonusvilkår, sport og et enormt spiludvalg, er Campobet et fremragende valg.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
            {[
              { label: "Bonus", score: "9/10" },
              { label: "Spiludvalg", score: "9/10" },
              { label: "Betting", score: "9/10" },
              { label: "Betalinger", score: "10/10" },
              { label: "Samlet", score: "4.8/5" },
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
              Hent Bonus hos Campobet
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
          excludeSlugs={["campobet"]}
        />

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/campobet-anmeldelse" />

        <FAQSection title="Ofte stillede spørgsmål om Campobet" faqs={campobetFaqs} />
      </div>
    </>
  );
};

export default CampobetAnmeldelse;
