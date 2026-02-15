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
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { buildArticleSchema } from "@/lib/seo";
import { QuickFactsProviders } from "@/components/QuickFactsProviders";
import type { ReactNode } from "react";
import danskeSpilHero from "@/assets/heroes/danske-spil-hero.jpg";
import {
  ShieldCheck,
  Star,
  Clock,
  CreditCard,
  Gift,
  Trophy,
  Sparkles,
  Gamepad2,
  Wallet,
  TrendingUp,
  Award,
  Zap,
  RotateCcw,
  Check,
  X,
  Smartphone,
  Headphones,
  Users,
  Globe,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const danskeSpilFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er Danske Spil Casino et sikkert og lovligt online casino?",
    answer: (
      <>
        Ja, Danske Spil Casino er et af de mest sikre casinoer i Danmark. Det drives af Danske Spil A/S, som er delvist ejet af den danske stat og reguleret direkte af Spillemyndigheden. Casinoet har en dansk licens og er fuldt tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>{" "}
        (Register Over Frivilligt Udelukkede Spillere). Alle transaktioner beskyttes med avanceret SSL-kryptering, og platformen overholder den danske spillelovgivning til punkt og prikke. Danske Spil har desuden en lang historie som Danmarks mest betroede spiloperatør med rødder helt tilbage til 1948. Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvilken bonus tilbyder Danske Spil Casino til nye spillere?",
    answer: (
      <>
        Danske Spil Casino tilbyder en velkomstbonus til nye spillere ved første indbetaling. Bonusvilkårene følger den danske standard med et{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på 10x (indskud + bonus), som gælder for alle licenserede danske casinoer. Bonussen aktiveres automatisk ved din første kvalificerende indbetaling og skal gennemspilles inden for den angivne periode. Det er vigtigt at læse de specifikke vilkår på Danske Spils hjemmeside, da kampagner kan ændre sig. Sammenlignet med{" "}
        <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> er bonussen ofte mere konservativ, men til gengæld får du en ekstremt sikker og gennemsigtig platform.
      </>
    ),
  },
  {
    question: "Hvordan er spiludvalget hos Danske Spil Casino sammenlignet med andre danske casinoer?",
    answer: (
      <>
        Danske Spil Casino tilbyder et bredt spiludvalg med hundredvis af spilleautomater fra anerkendte udbydere som{" "}
        <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>,{" "}
        <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link> og{" "}
        <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>. Udvalget inkluderer populære titler som Starburst, Book of Dead og Gonzo's Quest samt et stærkt{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link> med roulette, blackjack og game shows. Sammenlignet med private internationale operatører kan kataloget virke en smule mindre, men kvaliteten er konsekvent høj, og alle spil er specifikt godkendt til det danske marked.
      </>
    ),
  },
  {
    question: "Hvor hurtigt udbetaler Danske Spil Casino gevinster?",
    answer: (
      <>
        Udbetalinger hos Danske Spil Casino behandles typisk inden for 1–3 hverdage afhængigt af din valgte{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetode</Link>. Bankoverførsler og Dankort/Visa-udbetalinger følger standardbehandlingstider. MobilePay er den hurtigste mulighed med udbetalinger, der ofte gennemføres inden for få timer. Da Danske Spil er en etableret dansk virksomhed med solid kapital, er der aldrig tvivl om, at dine gevinster bliver udbetalt. Kontoverifikation sker via MitID, hvilket gør processen enkel og sikker.
      </>
    ),
  },
  {
    question: "Hvem ejer Danske Spil, og kan man stole på dem?",
    answer:
      "Danske Spil A/S er delvist ejet af den danske stat, hvilket gør det til en af de mest troværdige spiloperatører i verden. Selskabet blev grundlagt i 1948 og har i årtier drevet Lotto, Tips, Oddset og andre kendte spilprodukter. Casino-divisionen blev lanceret som en del af den digitale transformation og opererer under streng regulering fra Spillemyndigheden. Overskuddet fra Danske Spil går delvist til almennyttige formål i Danmark, herunder sport og kultur. Det giver en ekstra dimension af tillid, som ingen privat operatør kan matche.",
  },
  {
    question: "Kan man spille Danske Spil Casino på mobilen?",
    answer:
      "Ja, Danske Spil Casino har en dedikeret mobilapp til både iOS og Android samt en fuldt responsiv hjemmeside, der fungerer i alle mobilbrowsere. Appen er veldesignet med hurtig navigation, nem adgang til alle spil og fuld funktionalitet for ind- og udbetalinger. Push-notifikationer holder dig opdateret om nye kampagner og bonusser. Mobiloplevelsen hos Danske Spil er blandt de bedste på det danske marked, hvilket afspejler den store investering i brugeroplevelse, som en statsligt forankret operatør kan tilbyde.",
  },
];

const DanskeSpilAnmeldelse = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background_image;

  const articleSchema = buildArticleSchema({
    headline: "Danske Spil Casino Anmeldelse 2026 – Bonus, Spil & Sikkerhed",
    description: "Komplet og ærlig anmeldelse af Danske Spil Casino. Danmarks statsligt forankrede casino med dansk licens, bredt spiludvalg og hurtige udbetalinger.",
    url: "https://casinoaftaler.dk/casino-anmeldelser/danske-spil",
    datePublished: "2026-02-15",
    dateModified: "2026-02-15",
    authorName: "Jonas",
    authorUrl: "https://casinoaftaler.dk/forfatter/jonas",
    image: "https://casinoaftaler.dk/assets/heroes/danske-spil-hero.jpg",
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: danskeSpilFaqs.map((faq) => ({
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
      name: "Danske Spil Casino",
      url: "https://www.danskespil.dk/casino",
    },
    author: {
      "@type": "Organization",
      name: "Casinoaftaler",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4.5",
      bestRating: "5",
    },
    reviewBody:
      "Danske Spil Casino er Danmarks mest troværdige online casino med dansk licens, statsligt ejerskab og et solidt spiludvalg fra topudbydere.",
  };

  return (
    <>
      <SEO
        title="Danske Spil Casino Anmeldelse 2026 – Bonus, Spil & Sikkerhed | Casinoaftaler"
        description="Komplet anmeldelse af Danske Spil Casino. Danmarks statsligt forankrede casino med dansk licens, bredt spiludvalg, hurtige udbetalinger og høj sikkerhed. Læs vores ærlige vurdering."
        jsonLd={[articleSchema, faqJsonLd, reviewJsonLd]}
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
              4.5 / 5 – Troværdigt Casino
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Danske Spil Casino Anmeldelse 2026
            </h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet og uafhængig anmeldelse af Danske Spil Casino – Danmarks statsligt forankrede online casino med dansk licens, bredt spiludvalg fra topudbydere, hurtige udbetalinger og branchens højeste sikkerhedsniveau.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="15-02-2026" readTime="14 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={danskeSpilHero} alt="Danske Spil Casino – Danmarks statsligt forankrede online casino" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Quick Facts Card */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Zap className="h-6 w-6 text-primary" />
                Hurtige Fakta – Danske Spil Casino
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Velkomstbonus</p>
                  <p className="text-lg font-bold text-foreground">Se aktuelle tilbud</p>
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
                  <p className="text-xs text-muted-foreground uppercase mb-1">Ejerskab</p>
                  <p className="text-lg font-bold text-foreground">Delvist statsligt</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center mt-4">
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Min. indbetaling</p>
                  <p className="text-lg font-bold text-foreground">50 kr.</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Udbetaling</p>
                  <p className="text-lg font-bold text-foreground">1–3 hverdage</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Grundlagt</p>
                  <p className="text-lg font-bold text-foreground">1948</p>
                </div>
              </div>
              <QuickFactsProviders providers={["NetEnt", "Play'n GO", "Evolution Gaming", "Pragmatic Play", "Red Tiger", "Big Time Gaming", "Blueprint Gaming", "Thunderkick", "Nolimit City"]} />
            </CardContent>
          </Card>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Danske Spil Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danske Spil Casino er ikke bare endnu et online casino – det er Danmarks mest etablerede og troværdige spilplatform. Som en del af Danske Spil A/S, der er delvist ejet af den danske stat, opererer casinoet under et unikt mandat, der kombinerer underholdning med samfundsansvar. Hvor{" "}
            <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link> ofte forsøger at tiltrække spillere med aggressive bonusser, satser Danske Spil på langsigtet tillid og en gennemprøvet platform.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Platformen tilbyder et bredt udvalg af{" "}
            <Link to="/casinospil/spillemaskiner" className={linkClass}>spilleautomater</Link>, bordspil og{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> fra internationalt anerkendte udbydere. Spiloplevelsen er poleret og brugervenlig med særligt fokus på mobiloplevelsen, hvor Danske Spils dedikerede app er blandt de mest downloadede i Danmark.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne anmeldelse gennemgår vi alle aspekter af Danske Spil Casino – fra{" "}
            <Link to="/velkomstbonus" className={linkClass}>bonus</Link> og spiludvalg til{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, sikkerhed og kundeservice – baseret på vores{" "}
            <Link to="/saadan-tester-vi-casinoer" className={linkClass}>grundige testmetode</Link>. Vores mål er at give dig et ærligt og nuanceret billede af, hvad du kan forvente som spiller hos Danske Spil.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Danske Spil Casino</h2>
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
                    "Delvist statsligt ejet – maksimal troværdighed og sikkerhed",
                    "Dansk licens fra Spillemyndigheden",
                    "Bredt spiludvalg fra topudbydere som NetEnt og Evolution",
                    "Dedikeret mobilapp til iOS og Android",
                    "Hurtige udbetalinger via MobilePay",
                    "Stærkt live casino med professionelle dealere",
                    "Overskud går til almennyttige formål i Danmark",
                    "Gennemsigtige vilkår og ansvarligt spil i fokus",
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
                    "Velkomstbonus er mere konservativ end hos private aktører",
                    "Færre kampagner og promotions sammenlignet med nye casinoer",
                    "Spiludvalget er lidt mindre end hos internationale operatører",
                    "Ingen kryptovaluta som betalingsmetode",
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

        {/* Bonus & Campaigns */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Bonus og kampagner hos Danske Spil Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danske Spil Casino tilbyder en{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> til nye spillere ved første indbetaling. Bonussen følger den danske standard med et{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på 10x (indskud + bonus), hvilket er lovkrav for alle danske licenserede casinoer.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Sammenlignet med{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonusser</Link> hos private operatører er Danske Spils tilbud mere konservativt. Til gengæld er vilkårene krystalklare, og der er ingen skjulte begrænsninger. Danske Spil kører løbende kampagner og sæsonbestemte tilbud, som kan inkludere{" "}
            <Link to="/free-spins" className={linkClass}>free spins</Link> og indbetalingsbonusser.
          </p>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <RotateCcw className="h-5 w-5 text-primary" />
                Standard omsætningskrav – eksempel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Eksempel: Du indbetaler 200 kr. og modtager 200 kr. i bonus.
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
                  <p className="text-xs text-muted-foreground">Vilkår</p>
                  <p className="text-xl font-bold text-foreground">Dansk standard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Game Selection */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg hos Danske Spil Casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Danske Spil Casino byder på et varieret spiludvalg, der dækker de vigtigste kategorier. Alle spil er godkendt til det danske marked og leveret af internationale topudbydere.
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
                  Hundredvis af slots fra <Link to="/spiludviklere/netent" className={linkClass}>NetEnt</Link>, <Link to="/spiludviklere/play-n-go" className={linkClass}>Play'n GO</Link>, <Link to="/spiludviklere/pragmatic-play" className={linkClass}>Pragmatic Play</Link> og <Link to="/spiludviklere/red-tiger" className={linkClass}>Red Tiger</Link>. Populære titler som Starburst, Book of Dead, Sweet Bonanza og Gates of Olympus er alle tilgængelige.
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
                  Et stærkt{" "}
                  <Link to="/live-casino" className={linkClass}>live casino</Link> drevet af{" "}
                  <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link> med professionelle dealere. Inkluderer roulette, blackjack, baccarat og populære game shows som Crazy Time og Dream Catcher.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Bordspil
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Klassiske{" "}
                  <Link to="/casinospil/roulette" className={linkClass}>roulette</Link>- og{" "}
                  <Link to="/casinospil/blackjack" className={linkClass}>blackjack</Link>-varianter i digitale versioner. Perfekt til spillere, der foretrækker at spille i eget tempo uden live dealer-pres.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            <strong>Perspektiv:</strong> Sammenlignet med internationale private operatører har Danske Spil et lidt smallere spiludvalg. Men alle tilgængelige spil er nøje udvalgt og godkendt til det danske marked. For spillere, der prioriterer kvalitet og sikkerhed over kvantitet, er det en fornuftig afvejning. Se vores oversigt over{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludviklere</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder og udbetalingstid</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Danske Spil Casino understøtter de mest populære danske{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. Som dansk virksomhed er der naturligt fokus på lokale løsninger.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "MobilePay", desc: "Danmarks foretrukne mobilbetalingsløsning. Øjeblikkelig indbetaling og hurtige udbetalinger – typisk inden for få timer.", speed: "⚡ Hurtigst" },
              { title: "Dankort / Visa / Mastercard", desc: "Klassiske kortbetalinger med øjeblikkelig indbetaling. Udbetalinger behandles inden for 1–3 hverdage.", speed: "🕐 1-3 dage" },
              { title: "Bankoverførsel", desc: "Direkte overførsel fra din bankkonto. Sikker og pålidelig, men med lidt længere behandlingstid.", speed: "🕐 2-4 dage" },
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
              <strong>Min. indbetaling:</strong> 50 kr. | <strong>Min. udbetaling:</strong> 50 kr. | <strong>Valuta:</strong> DKK
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Security & License */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed, licens og ansvarligt spil</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Når det kommer til sikkerhed, er Danske Spil Casino i en klasse for sig. Som delvist statsejet operatør er der en ekstra dimension af offentlig kontrol og gennemsigtighed, der adskiller sig markant fra private aktører. Vores{" "}
            <Link to="/forretningsmodel" className={linkClass}>forretningsmodel</Link> og{" "}
            <Link to="/redaktionel-politik" className={linkClass}>redaktionelle politik</Link> sikrer, at vi vurderer alle casinoer upartisk – også Danmarks største.
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
                <h3 className="font-semibold">Statsligt ejerskab</h3>
                <p className="text-sm text-muted-foreground">Delvist ejet af den danske stat – ekstra lag af offentlig kontrol.</p>
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

        {/* Mobile Experience */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Mobiloplevelse hos Danske Spil Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danske Spil Casino tilbyder en af de bedste mobiloplevelser på det danske marked. Udover en fuldt responsiv hjemmeside har de en dedikeret app, der giver hurtig adgang til alle spil, kampagner og kontofunktioner.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Smartphone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Dedikeret app</h3>
                <p className="text-sm text-muted-foreground">Tilgængelig for iOS og Android med push-notifikationer og hurtig login.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Optimeret design</h3>
                <p className="text-sm text-muted-foreground">Touch-optimerede menuer og hurtig navigation mellem spilkategorier.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Globe className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Browser-adgang</h3>
                <p className="text-sm text-muted-foreground">Fuld funktionalitet direkte i mobilbrowseren uden download.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Customer Support */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice hos Danske Spil Casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Som Danmarks største spiloperatør har Danske Spil en veludviklet kundeservice med flere kontaktmuligheder. Al support foregår på dansk, og svartiderne er generelt korte.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Headphones className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Live Chat & Telefon</h3>
                <p className="text-sm text-muted-foreground">
                  Dansk kundeservice via live chat og telefon. Typisk svartid under 5 minutter i åbningstiden. Professionel og venlig betjening.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">E-mail & FAQ</h3>
                <p className="text-sm text-muted-foreground">
                  Omfattende hjælpesektion og FAQ. E-mails besvares typisk inden for 24 timer med detaljerede og hjælpsomme svar.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Comparative Perspective */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Danske Spil Casino i sammenligning</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at give et retvisende billede er det relevant at sammenligne Danske Spil Casino med andre aktører på markedet. I forhold til{" "}
            <Link to="/nye-casinoer" className={linkClass}>nye casinoer</Link>, der ofte lokker med store velkomstbonusser og aggressiv markedsføring, er Danske Spils tilgang mere afdæmpet. Bonusserne er typisk mere konservative, men vilkårene er til gengæld de mest gennemsigtige på markedet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sammenlignet med internationale private operatører har Danske Spil et lidt mindre spiludvalg. Men hvad de mangler i volumen, kompenserer de for med sikkerhed og tillid. Det statslige ejerskab giver en garanti, som ingen privat aktør kan matche – dine penge er altid sikre, og udbetalinger sker uden undtagelse.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For spillere, der prioriterer tryghed, dansk support og en velkendt platform over aggressive bonusser og tusindvis af spiltitler, er Danske Spil Casino det naturlige valg. Det er et casino, hvor du kan fokusere på underholdningen uden at bekymre dig om operatørens pålidelighed.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Brugeroplevelse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Brugeroplevelse og navigation</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danske Spil Casino byder på en intuitiv og lettilgængelig brugeroplevelse. Designet er rent og overskueligt med logiske kategoriseringer, der gør det nemt at finde præcis de spil, du leder efter. Navigationens toppanel giver hurtig adgang til slots, live casino, bordspil og kampagner.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Platformen er særligt velegnet for danske spillere, der foretrækker en velkendt og ukompliceret oplevelse. Login via MitID er hurtigt, og kontostyring – herunder indbetalinger, udbetalinger og spilbegrænsninger – er samlet i en overskuelig profil-sektion. Farvepaletten er afdæmpet og professionel, hvilket giver en behagelig spiloplevelse uden distraherende elementer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Hvem passer Danske Spil Casino til?</strong> Platformen er ideel for spillere, der værdsætter sikkerhed over alt, foretrækker dansk sprog og support, og ønsker en pålidelig operatør med årtiers erfaring. Det er det perfekte valg for casual spillere og dem, der er nye i online casino-verdenen.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Final Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores endelige vurdering af Danske Spil Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Danske Spil Casino er det sikre valg for danske spillere. Det statslige ejerskab, den danske licens og årtiers erfaring giver en tryghed, som ingen konkurrent kan matche. Spiludvalget er solidt med kvalitetsspil fra de bedste udbydere, og mobiloplevelsen er blandt de bedste på markedet.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bonusstrukturen er mere konservativ end hos private aktører, men til gengæld er vilkårene krystalklare og fair. Kundeservicen er professionel og tilgængelig på dansk, og udbetalingerne er pålidelige – om end ikke de hurtigste på markedet.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For spillere, der prioriterer sikkerhed, tillid og en velkendt dansk platform, er Danske Spil Casino et oplagt og ansvarsfuldt valg. Læs mere om{" "}
            <Link to="/forfatter/jonas" className={linkClass}>forfatteren bag denne anmeldelse</Link>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Sikkerhed", score: "10/10" },
              { label: "Spiludvalg", score: "7/10" },
              { label: "Bonus", score: "7/10" },
              { label: "Samlet", score: "4.5/5" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-card p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase mb-1">{item.label}</p>
                <p className="text-2xl font-bold text-primary">{item.score}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/top-10-casino-online">
                <Trophy className="mr-2 h-5 w-5" />
                Se Top 10 Casinoer
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/casino-anmeldelser">
                <Star className="mr-2 h-5 w-5" />
                Alle Casino Anmeldelser
              </Link>
            </Button>
          </div>
        </section>

        {/* Inline Casino Cards */}
        <InlineCasinoCards
          title="Andre anbefalede casinoer"
          count={6}
          excludeSlugs={["danske-spil"]}
        />

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/casino-anmeldelser/danske-spil" />

        <FAQSection title="Ofte stillede spørgsmål om Danske Spil Casino" faqs={danskeSpilFaqs} />
      </div>
    </>
  );
};

export default DanskeSpilAnmeldelse;
