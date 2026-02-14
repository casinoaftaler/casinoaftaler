import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import stickyBonusHero from "@/assets/heroes/sticky-bonus-hero.jpg";

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
  AlertTriangle,
  Gift,
  Clock,
  Target,
  Gamepad2,
  DollarSign,
  Lock,
  TrendingUp,
  CreditCard,
  Scale,
  Calculator,
  Ban,
  BarChart3,
  Percent,
  Coins,
  Users,
  Check,
  X,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { RelatedGuides } from "@/components/RelatedGuides";

const stickyFaqs = [
  {
    question: "Hvad er en Sticky Bonus?",
    answer:
      "En Sticky Bonus er en casinobonus, hvor din indbetaling og bonusmidlerne sammenblandes til én saldo. Du kan ikke hæve noget – hverken gevinster eller indbetaling – før du har opfyldt omsætningskravene fuldt ud.",
  },
  {
    question: "Tilbyder danske casinoer Sticky Bonusser?",
    answer:
      "Ja, langt de fleste bonusser hos danske online casinoer er Sticky Bonusser. De tilbydes typisk som velkomstbonusser, genindbetalingsbonusser og kampagnetilbud til eksisterende spillere.",
  },
  {
    question: "Kan jeg vinde rigtige penge med en Sticky Bonus?",
    answer:
      "Ja, du kan vinde rigtige penge. Dog skal du opfylde omsætningskravene, før eventuelle gevinster kan hæves. Selve bonusbeløbet trækkes normalt fra ved udbetaling.",
  },
  {
    question: "Hvad er forskellen på en Sticky og en No-Sticky Bonus?",
    answer:
      "Med en Sticky Bonus er indbetaling og bonus sammenblandet, og du skal opfylde omsætningskrav for alt. Med en No-Sticky Bonus er midlerne adskilt, og du kan hæve gevinster fra egne penge frit.",
  },
  {
    question: "Hvordan genkender jeg en Sticky Bonus?",
    answer:
      "Kig efter formuleringer som 'd+b' (deposit + bonus) i vilkårene, hvilket indikerer at omsætningskrav gælder for både indbetaling og bonus. De fleste bonusser er Sticky som standard.",
  },
  {
    question: "Hvad sker der med bonussen, når jeg hæver?",
    answer:
      "Ved en Sticky Bonus trækkes bonusbeløbet typisk fra din saldo ved udbetaling. Du kan kun hæve gevinster ud over bonusbeløbet, og kun efter omsætningskravene er opfyldt.",
  },
  {
    question: "Er Sticky Bonusser begrænset til bestemte spil?",
    answer:
      "Ja, nogle Sticky Bonusser kan være begrænset til specifikke spil eller kategorier. Spilleautomater tæller typisk 100% mod omsætningskravet, mens bordspil bidrager med en lavere procentdel.",
  },
  {
    question: "Hvad er typiske omsætningskrav for en Sticky Bonus?",
    answer:
      "I Danmark er omsætningskravene reguleret af Spillemyndigheden med et loft på 10x (d+b). Det betyder, at du maksimalt skal gennemspille bonusbeløbet + indbetalingen 10 gange.",
  },
  {
    question: "Kan jeg spille progressive jackpots med en Sticky Bonus?",
    answer:
      "Det afhænger af casinoets vilkår. Nogle casinoer tillader det, men eventuelle jackpotgevinster kan være begrænset af bonussens gevinstloft. Læs altid vilkårene først.",
  },
];

const StickyBonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: stickyFaqs.map((faq) => ({
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
    headline: "Sticky Bonus – Komplet Guide til Klæbende Bonusser 2026",
    description: "Alt om Sticky Bonusser hos danske casinoer. Forstå hvordan de fungerer, betingelser, fordele og ulemper.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-11",
    mainEntityOfPage: "https://casinoaftaler.dk/sticky-bonus",
  };

  return (
    <>
      <SEO
        title="Sticky Bonus – Komplet Guide til Klæbende Bonusser 2026 | Casinoaftaler"
        description="Forstå Sticky Bonusser hos danske casinoer. Lær hvordan klæbende bonusser fungerer, omsætningskrav, strategier og sammenligning med No-Sticky Bonusser."
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
              Sticky Bonus på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              En Sticky Bonus sammenblander din indbetaling og bonusmidler til
              én saldo. Lær hvordan de fungerer, hvad du skal holde øje med,
              og hvornår de er det rette valg for dig.
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
              <span className="font-medium text-foreground">12 Min.</span>
            </span>
          </div>
        </div>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={stickyBonusHero} alt="Sticky bonus vs non-sticky bonus sammenligning" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvad er en Sticky Bonus?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En Sticky Bonus – også kaldet klæbende bonus – er den mest udbredte
            bonustype hos <Link to="/" className="text-primary hover:underline">danske online casinoer</Link>.
            Når du accepterer en Sticky Bonus, smelter din indbetaling og
            bonusmidlerne sammen til én samlet saldo. Det betyder, at du ikke
            kan hæve noget, før du har opfyldt{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskravene</Link> –
            heller ikke selvom du vinder med dine egne indbetalte penge.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Betegnelsen "Sticky" kommer af, at bonusmidlerne klæber sig til
            din konto. Selve bonusbeløbet kan aldrig hæves – kun de gevinster,
            du optjener ud over bonusbeløbet, efter omsætningskravene er
            opfyldt. Ved udbetaling trækkes bonusbeløbet fra din saldo.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Til gengæld er casinoerne ofte mere gavmilde med Sticky Bonusser.
            Det er ikke ualmindeligt at se matchbonusser på 100% eller mere,
            fordi casinoet har større sikkerhed for, at du spiller pengene
            igennem. Det gør Sticky Bonusser ideelle for spillere, der
            ønsker et større spillebudget.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Sådan fungerer det */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan fungerer en Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med en Sticky Bonus bliver din indbetaling og bonus sammenblandet
            fra det øjeblik, du accepterer tilbuddet. Her er et konkret
            eksempel, der viser hvordan det fungerer i praksis.
          </p>

          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  Eksempel: 100% Sticky Bonus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Du indbetaler 500 kr. og modtager 500 kr. i Sticky Bonus.
                  Din samlede saldo er 1.000 kr. Hele beløbet er underlagt
                  omsætningskrav – f.eks. 10x (d+b), hvilket kræver, at du
                  satser for 10.000 kr. Først derefter kan du hæve gevinster.
                  Ved udbetaling trækkes de 500 kr. i bonus fra din saldo.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="h-5 w-5 text-primary" />
                  Sticky Bonus med free spins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Et velkomsttilbud kan inkludere 500 kr. i bonus + 50{" "}
                  <Link to="/free-spins" className="text-primary hover:underline">free spins</Link>.
                  Selvom spins og kontant bonus er forskellige, gælder
                  bonussens vilkår for begge dele. Gevinster fra free spins
                  er også underlagt omsætningskrav, før de kan hæves.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Sammenblanding af midler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Den vigtigste forskel fra en{" "}
                  <Link to="/no-sticky-bonus" className="text-primary hover:underline">No-Sticky Bonus</Link>{" "}
                  er, at du ikke kan skelne mellem egne penge og bonuspenge.
                  Alt behandles som bonusmidler underlagt omsætningskrav.
                  Selv gevinster vundet tidligt i sessionen er låst, indtil
                  kravene er opfyldt.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        

        <Separator className="my-10" />

        {/* Fordele og ulemper */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Fordele og ulemper ved Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Sticky Bonusser er populære af en grund, men de passer ikke til
            alle spillere. Her er en ærlig gennemgang af fordele og ulemper.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-primary/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <Check className="h-5 w-5" />
                  Fordele
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><strong>Større spillebudget:</strong> Ofte større bonusbeløb, der giver flere midler at spille for</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><strong>Forlænget spilletid:</strong> Med et større budget kan du udforske flere spil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><strong>Større gevinstpotentiale:</strong> Flere midler at satse med kan øge chancerne</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span><strong>Lavere risiko per spin:</strong> Bonuspenge minimerer din egen økonomiske risiko</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <X className="h-5 w-5" />
                  Ulemper
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span><strong>Låst saldo:</strong> Ingen udbetaling mulig før omsætningskrav er opfyldt</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span><strong>Risiko for tab:</strong> Du kan miste både indbetaling og bonus, hvis kravene ikke nås</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span><strong>Tidspres:</strong> Omsætningskrav skal typisk opfyldes inden 60 dage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span><strong>Gevinstloft:</strong> Mange bonusser har en maksimal gevinst fra bonusmidler</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Betingelser */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Typiske betingelser for Sticky Bonusser
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Før du accepterer en Sticky Bonus, er det afgørende at forstå
            vilkårene. Her er de vigtigste betingelser, du bør kende til.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Omsætningskrav (d+b)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link to="/omsaetningskrav" className="text-primary hover:underline">Omsætningskravene</Link>{" "}
                  gælder fra start for både indbetaling og bonus. Med et
                  10x krav og 1.000 kr. i samlet saldo (500+500) skal du
                  satse for 10.000 kr. Forskellige spil bidrager forskelligt
                  – slots tæller typisk 100%, bordspil kun 10%.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  Tidsbegrænsning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  De fleste Sticky Bonusser har en tidsfrist for opfyldelse
                  af omsætningskravene – som minimum 60 dage hos danske
                  casinoer. Udløber fristen, mister du bonussen og alle
                  bonusgevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5 text-primary" />
                  Indsatsgrænser
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Der er typisk en maksimal indsats per spilrunde – ofte
                  omkring 50 kr. per spin. Overskrider du grænsen, kan
                  bonussen annulleres, og du mister eventuelle gevinster.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Maksimal gevinst
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mange casinoer har et loft over, hvor meget du kan vinde
                  med bonuspenge. Overskydende gevinster kan blive fjernet
                  eller konverteret til spillemidler, der ikke kan hæves.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  Spilbidrag
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ikke alle spil bidrager ens til omsætningskravet.
                  Spilleautomater tæller typisk 100%, mens{" "}
                  <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>{" "}
                  og bordspil kan tælle 10% eller være helt udelukket.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Minimumsindbetaling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Et minimumsbeløb kræves for at aktivere bonussen. En
                  større <Link to="/indskudsbonus" className="text-primary hover:underline">indbetaling</Link>{" "}
                  giver en større bonus, men husk at omsætningskravene
                  også stiger proportionelt.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sådan genkender du */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sådan genkender du en Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            De fleste bonusser er faktisk Sticky – men casinoerne kalder dem
            sjældent det direkte. Her er hvad du skal kigge efter i vilkårene.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Kig efter 'd+b' i specifikationerne",
                desc: "Udtrykket 'd+b' (deposit + bonus) betyder, at omsætningskrav gælder for både indbetaling og bonus. Det er en klassisk indikator for en Sticky Bonus.",
                icon: Target,
              },
              {
                title: "Sammenblanding af midler",
                desc: "Hvis vilkårene angiver, at bonussen tilføjes direkte til din spillesaldo uden separation, er det en Sticky Bonus.",
                icon: DollarSign,
              },
              {
                title: "Bonusbeløbet kan ikke hæves",
                desc: "Finder du formuleringer om, at bonusbeløbet trækkes fra ved udbetaling, står du over for en Sticky Bonus.",
                icon: Lock,
              },
              {
                title: "De fleste bonusser er Sticky",
                desc: "Medmindre der specifikt står 'No-Sticky', 'lifeline' eller 'forfeitable', kan du som tommelfingerregel antage, at bonussen er Sticky.",
                icon: AlertTriangle,
              },
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

        {/* Sticky vs No-Sticky */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sticky Bonus vs. No-Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For at vælge den rette bonus er det vigtigt at forstå forskellen
            mellem Sticky og{" "}
            <Link to="/no-sticky-bonus" className="text-primary hover:underline">No-Sticky Bonusser</Link>.
            Her er en direkte sammenligning.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg border border-border text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-3 text-left font-semibold">Kriterium</th>
                  <th className="border border-border p-3 text-left font-semibold">Sticky Bonus</th>
                  <th className="border border-border p-3 text-left font-semibold">No-Sticky Bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 font-medium">Midlernes status</td>
                  <td className="border border-border p-3 text-muted-foreground">Sammenblandet fra start</td>
                  <td className="border border-border p-3 text-muted-foreground">Adskilt – egne penge først</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">Omsætningskrav</td>
                  <td className="border border-border p-3 text-muted-foreground">Gælder for alt fra start</td>
                  <td className="border border-border p-3 text-muted-foreground">Kun for bonusmidler</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Udbetaling</td>
                  <td className="border border-border p-3 text-muted-foreground">Først efter fuld gennemspilning</td>
                  <td className="border border-border p-3 text-muted-foreground">Frit for egne pengegevinster</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-3 font-medium">Bonusstørrelse</td>
                  <td className="border border-border p-3 text-muted-foreground">Typisk større beløb</td>
                  <td className="border border-border p-3 text-muted-foreground">Ofte mindre beløb</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 font-medium">Bedst til</td>
                  <td className="border border-border p-3 text-muted-foreground">Erfarne spillere, highrollers</td>
                  <td className="border border-border p-3 text-muted-foreground">Nye og forsigtige spillere</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Hvem passer den til */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Hvem er Sticky Bonus bedst egnet til?
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sticky Bonusser appellerer særligt til spillere, der søger et
            større spillebudget og er villige til at navigere gennem
            omsætningskrav for at låse op for potentielt større gevinster.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Erfarne spillere</strong>, der forstår hvordan{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link>{" "}
            fungerer, og som har strategier for at opfylde dem, vil finde
            Sticky Bonusser attraktive. Det samme gælder spillere, der ønsker
            at udforske et casinos fulde spiludvalg med et forstørret budget.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Prioriterer du derimod fleksibilitet og muligheden for at hæve
            gevinster tidligt, er en{" "}
            <Link to="/no-sticky-bonus" className="text-primary hover:underline">No-Sticky Bonus</Link>{" "}
            eller en{" "}
            <Link to="/bonus-uden-omsaetningskrav" className="text-primary hover:underline">bonus uden omsætningskrav</Link>{" "}
            sandsynligvis et bedre valg.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Spilstrategi */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Strategier til at udnytte en Sticky Bonus
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            For at maksimere værdien af en Sticky Bonus kan du tilpasse din
            spilstrategi. Her er nogle praktiske råd.
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Vælg spil med høj RTP",
                desc: "Spilleautomater med høj Return to Player (96%+) og lav volatilitet giver en mere stabil oplevelse, hvor du gradvist arbejder mod omsætningskravet.",
                icon: TrendingUp,
              },
              {
                title: "Hold øje med spilbidrag",
                desc: "Fokusér på spil, der bidrager 100% til omsætningskravet. Bordspil bidrager ofte kun 10%, så slots er typisk det mest effektive valg.",
                icon: Gamepad2,
              },
              {
                title: "Undgå progressive jackpots",
                desc: "Selvom det er fristende, kan en stor jackpotgevinst være begrænset af bonussens gevinstloft. Prioriter spil med jævne udbetalinger.",
                icon: Ban,
              },
              {
                title: "Hold styr på tidsfristen",
                desc: "Planlæg dit spil, så du har tilstrækkeligt med tid til at opfylde omsætningskravene. Start tidligt og undgå at presse alting ind på de sidste dage.",
                icon: Clock,
              },
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

        {/* Sticky Bonus markedsoverblik */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Sticky Bonus i Danmark 2026 – Hvad du skal vide
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sticky bonus er fortsat den mest udbredte bonustype på det danske casinomarked i 2026. De fleste danske casinoer tilbyder en sticky bonus som deres primære velkomsttilbud, fordi denne bonusstruktur giver casinoerne mulighed for at tilbyde større bonusbeløb. For spillere betyder en sticky bonus, at hele saldoen – både indbetaling og bonus – er underlagt omsætningskrav fra start.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Fordelen ved en sticky bonus er det større spillebudget. Hvor en <Link to="/no-sticky-bonus" className="text-primary hover:underline">no-sticky bonus</Link> typisk tilbyder 100% match, kan en sticky bonus tilbyde mere generøse beløb, fordi casinoet har sikkerhed for, at du spiller pengene igennem. Det gør en sticky bonus særligt attraktiv for spillere, der planlægger længere spillesessioner og ønsker maksimal spilletid.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Det er dog vigtigt at forstå risikoen ved en sticky bonus. Da hele din saldo er låst bag omsætningskravene, kan du ikke hæve noget – heller ikke gevinster fra dine egne penge – før kravene er opfyldt. Hvis du vinder stort tidligt i en session med en sticky bonus, skal du stadig gennemspille hele beløbet. Denne binding gør det ekstra vigtigt at vælge en sticky bonus med rimelige vilkår.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I Danmark er Spillemyndighedens loft på 10x (d+b) en stor fordel for spillere, der vælger en sticky bonus. Sammenlignet med udenlandske markeder, hvor sticky bonusser kan have 50x+ omsætningskrav, er danske sticky bonusser langt mere realistiske at gennemføre. Kombineret med 60 dages minimum gyldighedsperiode giver en dansk sticky bonus en fair chance for at opfylde kravene inden for tidsfristen.
          </p>
        </section>

        <Separator className="my-10" />
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Ansvarligt spil med Sticky Bonusser
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Sticky Bonusser kan forlænge din spilletid og give flere
            gevinstchancer, men det er vigtigt at spille med omtanke. Sæt
            et fast budget og hold dig til det – også når spændingen stiger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Tag pauser, hvis du føler dig presset, og husk at{" "}
            <Link to="/responsible-gaming" className="text-primary hover:underline">ansvarligt spil</Link>{" "}
            altid bør komme først. Danske casinoer tilbyder selvudelukkelse
            via{" "}
            <a href="https://www.rofus.nu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">ROFUS</a>.
            Kontakt{" "}
            <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">StopSpillet.dk</a>{" "}
            for gratis og anonym rådgivning. 18+ | Spil ansvarligt.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Opsummering */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Opsummering</h2>
          <div className="space-y-3">
            {[
              {
                icon: Gift,
                title: "Større spillebudget",
                desc: "Sticky Bonusser tilbyder ofte mere generøse beløb, der giver dig flere midler at spille for og udforske casinoets spiludvalg.",
              },
              {
                icon: Scale,
                title: "Danske regler beskytter dig",
                desc: "Spillemyndighedens loft på 10x omsætningskrav (d+b) sikrer rimelige vilkår. In-game gevinster tæller altid med.",
              },
              {
                icon: AlertTriangle,
                title: "Forstå betingelserne",
                desc: "Omsætningskrav, tidsfrister, indsatsgrænser og gevinstloft påvirker alle bonussens reelle værdi. Læs altid vilkårene grundigt.",
              },
              {
                icon: ShieldCheck,
                title: "Spil ansvarligt",
                desc: "Sæt et budget, jagt aldrig tab, og benyt hjælpeværktøjer som StopSpillet.dk og ROFUS ved behov.",
              },
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

        <RelatedGuides currentPath="/sticky-bonus" />

        <FAQSection title="Ofte stillede spørgsmål om sticky bonus" faqs={stickyFaqs} />
      </div>
    </>
  );
};

export default StickyBonus;
