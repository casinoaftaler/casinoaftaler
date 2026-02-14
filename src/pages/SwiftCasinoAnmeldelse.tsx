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
import { QuickFactsProviders } from "@/components/QuickFactsProviders";
import type { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck, Star, CreditCard, Gift, Trophy, Sparkles,
  HelpCircle, User, CalendarDays, BookOpen, Smartphone, Headphones,
  Gamepad2, Wallet, Zap, RotateCcw, Check, X, Globe, Award,
} from "lucide-react";

const linkClass = "text-primary underline hover:text-primary/80";

const swiftFaqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Er Swift Casino et sikkert casino?",
    answer: (
      <>
        Ja. Swift Casino har gyldig dansk licens fra Spillemyndigheden (licensnr. 16-1066791) og drives af Skill On Net Ltd. Platformen benytter SSL-kryptering og er tilsluttet{" "}
        <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a>. Læs mere om{" "}
        <Link to="/responsible-gaming" className={linkClass}>ansvarligt spil</Link>.
      </>
    ),
  },
  {
    question: "Hvad er velkomstbonussen hos Swift Casino?",
    answer: (
      <>
        Nye spillere får 100 % bonus op til 500 kr. ved første indbetaling med bonuskoden SWIFT. Omsætningskravet er 10x (d+b) med 60 dages gyldighed. Læs mere om{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonusser</Link>.
      </>
    ),
  },
  {
    question: "Hvilke betalingsmetoder tilbyder Swift Casino?",
    answer: (
      <>
        Swift Casino tilbyder MobilePay, Visa, Mastercard, Trustly, PayPal og Skrill. Min. indbetaling er 100 kr. og min. udbetaling er 200 kr. Se vores guide til{" "}
        <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>.
      </>
    ),
  },
  {
    question: "Har Swift Casino sportsbetting?",
    answer: "Nej. Swift Casino fokuserer udelukkende på casino-spil og tilbyder ikke sportsbetting.",
  },
  {
    question: "Hvad er omsætningskravet på bonussen?",
    answer: (
      <>
        Velkomstbonussen har et omsætningskrav på 10x (indskud + bonus). Eksempel: Indbetal 500 kr., få 500 kr. bonus = 10.000 kr. i omsætning inden for 60 dage. Læs om{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
      </>
    ),
  },
  {
    question: "Hvad er Hot Or Cold-funktionen?",
    answer: "Hot Or Cold er en unik funktion hos Swift Casino, der viser hvilke spilleautomater der aktuelt udbetaler mest (Hot) og mindst (Cold). Det hjælper dig med at vælge spil baseret på aktuel performance.",
  },
  {
    question: "Tilbyder Swift Casino live casino?",
    answer: (
      <>
        Ja. Swift Casino har et veludviklet live casino med professionelle dealere, herunder blackjack, roulette og baccarat. Læs mere om{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>.
      </>
    ),
  },
  {
    question: "Hvad er bonuskoden til Swift Casino?",
    answer: "Bonuskoden er SWIFT. Indtast den efter din første indbetaling for at aktivere velkomstbonussen på 100 % op til 500 kr.",
  },
  {
    question: "Hvem står bag Swift Casino?",
    answer: "Swift Casino drives af Skill On Net Ltd, et veletableret selskab der har haft dansk spillelicens siden 2017 og driver flere andre casinoer i Danmark.",
  },
];

const SwiftCasinoAnmeldelse = () => {
  const { data: casinos } = useCasinos();
  const { data: siteSettings } = useSiteSettings();
  const { user } = useAuth();
  const heroBackgroundImage = siteSettings?.hero_background_image;
  const casino = casinos?.find((c) => c.slug === "swift-casino");
  const handleBonusClick = () => { if (casino) getAffiliateRedirect(casino.slug, user?.id); };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: swiftFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: typeof faq.answer === "string" ? faq.answer : faq.question },
    })),
  };

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: "Swift Casino" },
    author: { "@type": "Organization", name: "Casinoaftaler" },
    reviewRating: { "@type": "Rating", ratingValue: "4.7", bestRating: "5" },
    reviewBody: "Swift Casino er et dansk casino med 100% bonus op til 500 kr., 10x omsætning, over 3.300 spil, unik Hot Or Cold-funktion og hurtige udbetalinger.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forside", item: "https://casinoaftaler.dk/" },
      { "@type": "ListItem", position: 2, name: "Swift Casino Anmeldelse", item: "https://casinoaftaler.dk/swift-casino-anmeldelse" },
    ],
  };

  return (
    <>
      <SEO
        title="Swift Casino Anmeldelse 2026 – 100% Bonus, Hot Or Cold & Vilkår | Casinoaftaler"
        description="Komplet anmeldelse af Swift Casino. 100% bonus op til 500 kr., kun 10x omsætning, 3.300+ spil, unik Hot Or Cold-funktion og hurtige udbetalinger. Læs vores ærlige vurdering."
        jsonLd={[faqJsonLd, reviewJsonLd, breadcrumbJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: heroBackgroundImage
            ? `linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9)), url(${heroBackgroundImage})`
            : "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Badge variant="secondary"><Star className="mr-1.5 h-3.5 w-3.5" />4.7 / 5 – Anbefalet</Badge>
              <Badge variant="outline" className="border-white/40 text-white">Hot Or Cold</Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Swift Casino Anmeldelse 2026</h1>
            <p className="mb-6 text-lg text-white/80">
              Komplet anmeldelse af Swift Casino – et veletableret dansk casino med 100 % bonus op til 500 kr., kun 10x omsætningskrav, over 3.300 spiltitler, unik Hot Or Cold-funktion og hurtige udbetalinger via MobilePay og Trustly.
            </p>
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8">
              <Gift className="mr-2 h-5 w-5" />Hent Bonus hos Swift Casino
            </Button>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5"><User className="h-4 w-4" /><span>Skrevet af: <span className="font-medium text-foreground">Casinoaftaler</span></span></div>
          <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /><span>Opdateret: <span className="font-medium text-foreground">13-02-2026</span></span></div>
          <div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /><span>Læsetid: <span className="font-medium text-foreground">15 Min.</span></span></div>
        </div>

        {/* Quick Facts */}
        <section className="mb-12">
          <Card className="border-border bg-card border-l-4 border-l-primary">
            <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-6 w-6 text-primary" />Hurtige Fakta – Swift Casino</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Velkomstbonus", value: "100% op til 500 kr." },
                  { label: "Bonuskode", value: "SWIFT" },
                  { label: "Omsætningskrav", value: "10x (d+b)" },
                  { label: "Licens", value: "Spillemyndigheden" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{f.label}</p>
                    <p className="text-lg font-bold text-foreground">{f.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4">
                {[
                  { label: "Min. indbetaling", value: "100 kr." },
                  { label: "Bonusgyldighed", value: "60 dage" },
                  { label: "Grundlagt", value: "2020" },
                  { label: "Antal spil", value: "3.300+" },
                ].map((f) => (
                  <div key={f.label} className="rounded-lg border border-border p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">{f.label}</p>
                    <p className="text-lg font-bold text-foreground">{f.value}</p>
                  </div>
                ))}
              </div>
              <QuickFactsProviders providers={["NetEnt", "Play'n GO", "Red Tiger", "ELK Studios", "Playtech", "Microgaming", "Pragmatic Play", "Evolution Gaming"]} logoUrl={casino?.logo_url} casinoName={casino?.name} />
            </CardContent>
          </Card>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Vores vurdering af Swift Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino blev grundlagt i 2020 af det anerkendte selskab Skill On Net Ltd, der har haft dansk spillelicens siden 2017 og driver flere andre velkendte casinoer i Danmark. Med licensnr. 16-1066791 fra Spillemyndigheden er Swift Casino fuldt reguleret og sikkert for danske spillere.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Med over 3.300 spiltitler, en kompetitiv{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> på 100 % op til 500 kr. med kun 10x{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>, og den unikke Hot Or Cold-funktion har Swift Casino hurtigt etableret sig som et solidt valg. Selvom sportsbetting ikke er tilgængeligt, kompenserer casinoet med et stærkt{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link> og et omfattende udvalg af spilleautomater og bordspil.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I denne dybdegående anmeldelse gennemgår vi alt fra bonus og bonuskode til spiludvalg,{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>, kundeservice og den unikke Hot Or Cold-funktion.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Pros & Cons */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold">Fordele og ulemper ved Swift Casino</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-primary"><Check className="h-5 w-5" />Fordele</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Over 3.300 spiltitler fra mange udbydere",
                    "Kun 10x omsætningskrav (d+b)",
                    "Unik Hot Or Cold-funktion til spiludvælgelse",
                    "MobilePay, Trustly, PayPal og flere betalingsmetoder",
                    "Hjælpsom og effektiv live chat support",
                    "Fuldt mobiloptimeret hjemmeside",
                    "Dansk licens fra Spillemyndigheden",
                    "Veludviklet live casino med professionelle dealere",
                    "Simpel tilmeldingsproces via MitID",
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
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg text-destructive/80"><X className="h-5 w-5" />Ulemper</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Maks. bonus på 500 kr. (lavere end gennemsnittet)",
                    "Ingen sportsbetting tilgængelig",
                    "Kræver bonuskode SWIFT for at aktivere bonus",
                    "Gebyr på bankoverførsel under 3.700 kr.",
                    "Ingen andre bonuskampagner fundet",
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
          <h2 className="mb-4 text-3xl font-bold">Velkomstbonus hos Swift Casino – Komplet Guide</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino tilbyder en{" "}
            <Link to="/indskudsbonus" className={linkClass}>indbetalingsbonus</Link> på 100 % op til 500 kr. ved din første indbetaling. For at aktivere bonussen skal du indtaste bonuskoden <strong className="text-foreground">SWIFT</strong> efter din indbetaling.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med et{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> på kun 10x (d+b), 60 dages gyldighed og en maks. indsats på 50 kr. pr. spin er vilkårene konkurrencedygtige. Kun spilleautomater bidrager til omsætningskravet.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Gift className="h-5 w-5 text-primary" />Sådan aktiverer du bonussen</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { step: "1", title: "Tilmeld dig Swift Casino", desc: "Klik på 'Tilmeld Dig' og udfyld dine personlige oplysninger." },
                  { step: "2", title: "Bekræft med MitID", desc: "Indtast dit CPR-nummer og godkend via MitID-appen." },
                  { step: "3", title: "Sæt indbetalingsgrænser", desc: "Vælg dine daglige, ugentlige og månedlige grænser." },
                  { step: "4", title: "Foretag din første indbetaling", desc: "Indbetal mindst 100 kr. med din foretrukne metode." },
                  { step: "5", title: "Indtast bonuskoden SWIFT", desc: "Skriv SWIFT i bonuskodefeltet for at aktivere din bonus." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{item.step}</span>
                    <div><h4 className="font-semibold text-foreground">{item.title}</h4><p className="text-sm text-muted-foreground">{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><RotateCcw className="h-5 w-5 text-primary" />Beregning af omsætningskrav</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Eksempel: Du indbetaler 500 kr. og får 500 kr. i bonus.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">Indskud + Bonus</p><p className="text-xl font-bold text-foreground">1.000 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">× 10 omsætning</p><p className="text-xl font-bold text-foreground">= 10.000 kr.</p></div>
                <div className="rounded-lg border border-border p-3"><p className="text-xs text-muted-foreground">Indenfor</p><p className="text-xl font-bold text-foreground">60 dage</p></div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Hot Or Cold Feature */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hot Or Cold – Swift Casinos unikke funktion</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En af de ting der virkelig adskiller Swift Casino fra konkurrenterne er deres innovative Hot Or Cold-funktion. Denne funktion giver dig et indblik i, hvilke spilleautomater der aktuelt udbetaler mest (markeret som "Hot") og mindst (markeret som "Cold").
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom det er vigtigt at forstå at alle spilleautomater opererer med tilfældighedsgeneratorer (RNG), kan Hot Or Cold-funktionen give et sjovt og interessant perspektiv på aktuelle udbetalingsmønstre. Det er en unik tilføjelse, der gør spiloplevelsen mere engagerende.
          </p>
          <Card className="border-border bg-card border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="h-6 w-6 text-accent" />
                <h3 className="text-lg font-bold text-foreground">Sådan bruger du Hot Or Cold</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Find Hot Or Cold-sektionen på Swift Casinos forside. Spil markeret med 🔥 har udbetalte mere end gennemsnittet i den seneste periode, mens ❄️ indikerer det modsatte. Brug det som inspiration – men husk at RTP og volatilitet altid er de vigtigste faktorer.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Game Selection */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Spiludvalg – Over 3.300 Titler</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Swift Casino byder på over 3.300 spiltitler fordelt på spilleautomater, bordspil og{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link>. Udvalget dækker mange anerkendte{" "}
            <Link to="/spiludviklere" className={linkClass}>spiludbydere</Link>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Gamepad2 className="h-5 w-5 text-primary" />Spilleautomater</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Tusindvis af slots fra Pragmatic Play, NetEnt, Microgaming, Play'n GO og mange flere. Populære titler som Starburst, Gonzo's Quest og Book of Dead.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Trophy className="h-5 w-5 text-primary" />Bordspil</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Bredt udvalg af roulette, blackjack, baccarat og poker i digitale versioner med varierede indsatsniveauer.</p></CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary" />Live Casino</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground">Veludviklet live casino med professionelle dealere. Blackjack, roulette, baccarat og populære game shows.</p></CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Payment Methods */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Betalingsmetoder hos Swift Casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Swift Casino tilbyder et pænt udvalg af populære{" "}
            <Link to="/betalingsmetoder" className={linkClass}>betalingsmetoder</Link>. Min. indbetaling er 100 kr. og min. udbetaling er 200 kr. Maks. 50.000 kr. pr. transaktion.
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
                  { name: "Visa / Mastercard", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "Trustly", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "PayPal", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "Skrill", deposit: "✓", withdraw: "✓", fee: "Ingen" },
                  { name: "Bankoverførsel", deposit: "—", withdraw: "✓", fee: "Under 3.700 kr.*" },
                ].map((m) => (
                  <tr key={m.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">{m.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.deposit}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.withdraw}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{m.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">*Bankoverførsel har gebyr på udbetalinger under 3.700 kr.</p>
        </section>

        <Separator className="my-10" />

        {/* Customer Support */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Kundeservice hos Swift Casino</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Swift Casino tilbyder en hjælpsom og effektiv kundeservice via live chat. Supportteamet er tilgængeligt direkte fra hjemmesiden og besvarer henvendelser hurtigt. E-mail support er også tilgængelig.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><Headphones className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">Live Chat</h3><p className="text-sm text-muted-foreground">Hurtig og effektiv support direkte fra hjemmesiden</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><CreditCard className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">E-mail</h3><p className="text-sm text-muted-foreground">Svar inden for 24 timer</p></CardContent></Card>
            <Card className="border-border bg-card"><CardContent className="pt-6 text-center"><Smartphone className="h-8 w-8 text-primary mx-auto mb-3" /><h3 className="font-bold text-foreground mb-1">Mobilvenlig</h3><p className="text-sm text-muted-foreground">Fuldt optimeret til alle mobile enheder</p></CardContent></Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Mobiloplevelse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Mobiloplevelse hos Swift Casino</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino har ingen dedikeret app, men hjemmesiden er fuldt optimeret til mobil og fungerer problemfrit i alle moderne browsere på både iOS og Android. Designet tilpasser sig automatisk til din skærmstørrelse, og alle funktioner – inklusiv Hot Or Cold – er tilgængelige på mobilen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spilleautomater, bordspil og{" "}
            <Link to="/live-casino" className={linkClass}>live casino</Link>{" "}
            kører glidende på mobilen, og indbetalinger via{" "}
            <Link to="/betalingsmetoder" className={linkClass}>MobilePay og Trustly</Link>{" "}
            kan gennemføres med få tryk. Login via MitID fungerer sømløst, og du kan hurtigt skifte mellem spil uden forsinkelser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi testede mobilversionen på flere enheder og oplevede konsekvent hurtige loadtider, stabil streaming i live casinoet og ingen tekniske problemer. For spillere, der primært spiller på farten, er Swift Casino et godt valg.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Registrering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Tilmelding og registrering</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Tilmeldingsprocessen hos Swift Casino er hurtig og enkel takket være MitID-integration. Du behøver kun at indtaste dit CPR-nummer, godkende via MitID-appen, vælge dine indbetalingsgrænser og foretage din første indbetaling. Hele processen tager under 5 minutter.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Som med alle danske casinoer med licens fra Spillemyndigheden skal du sætte daglige, ugentlige og månedlige indbetalingsgrænser ved oprettelsen. Dette er en del af lovgivningen om{" "}
            <Link to="/responsible-gaming" className="text-primary hover:underline">ansvarligt spil</Link>{" "}
            og kan altid justeres senere via din kontoside.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Husk at indtaste bonuskoden <strong className="text-foreground">SWIFT</strong> efter din første indbetaling for at aktivere{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> på 100 % op til 500 kr. Bonussen tilføjes ikke automatisk – koden er påkrævet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Security */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Sikkerhed og licens</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino opererer med licens fra Spillemyndigheden (nr. 16-1066791). Skill On Net Ltd har haft dansk licens siden 2017, hvilket giver en solid baggrund og dokumenteret pålidelighed. Selskabet driver også flere andre velkendte casinoer i Danmark, hvilket yderligere understreger deres erfaring i branchen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Alle data beskyttes med 256-bit SSL-kryptering, og casinoet er tilsluttet{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className={linkClass}>ROFUS</a> for selvudelukkelse og{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className={linkClass}>StopSpillet</a> for rådgivning om spilleproblemer. Identitetsverifikation sker automatisk via MitID ved tilmelding, hvilket eliminerer behovet for manuel dokumentation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Swift Casino overholder desuden Spillemyndighedens strenge regler for{" "}
            <Link to="/responsible-gaming" className="text-primary hover:underline">ansvarligt spil</Link>, herunder obligatoriske indbetalingsgrænser, session-påmindelser og mulighed for midlertidig udelukkelse. Du kan altid kontakte kundeservice, hvis du har brug for hjælp til at sætte grænser.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Konklusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Konklusion – Er Swift Casino det rigtige for dig?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Swift Casino er et solidt valg for danske spillere, der prioriterer et stort spiludvalg, fair bonusvilkår og en unik spiloplevelse med Hot Or Cold-funktionen. Med over 3.300 spil, 10x omsætningskrav og pålidelig kundeservice er der meget at komme efter.
          </p>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Den lavere bonusmaksimum på 500 kr. og manglen på sportsbetting er de primære begrænsninger, men for rene casinospillere er Swift Casino svært at slå på værdi.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleBonusClick} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8">
              <Gift className="mr-2 h-5 w-5" />Hent din bonus hos Swift Casino
            </Button>
          </div>
        </section>

        <Separator className="my-10" />

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2"><HelpCircle className="h-8 w-8 text-primary" />Ofte Stillede Spørgsmål om Swift Casino</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {swiftFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="rounded-lg border border-border bg-card px-6">
                <AccordionTrigger className="text-left hover:no-underline text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <Separator className="my-10" />
        <InlineCasinoCards />
        <Separator className="my-10" />
        <RelatedGuides currentPath="/swift-casino-anmeldelse" />
      </div>
    </>
  );
};

export default SwiftCasinoAnmeldelse;
