import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { ContentPageLayout } from "@/components/ContentPageLayout";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { Separator } from "@/components/ui/separator";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { CasinospilMoneyLinks } from "@/components/CasinospilMoneyLinks";
import { type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { ReviewScreenshot } from "@/components/ReviewScreenshot";
import liveBlackjackClassic from "@/assets/screenshots/live-blackjack-classic-bordspil.webp";
import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  Layers,
  Scale,
  ShieldCheck,
  Skull,
  Target,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/heroes/martingale-blackjack-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "Virker Martingale-systemet i blackjack?",
    answer: (
      <>
        Nej. Martingale ændrer ikke house edge. Det omfordeler kun risikoen, så du vinder små beløb ofte og taber store beløb sjældent. Over tid vil <Link to="/casinospil/blackjack" className={linkClass}>basic strategy</Link> være langt vigtigere end ethvert indsatssystem.
      </>
    ),
  },
  {
    question: "Hvorfor bryder Martingale sammen i praksis?",
    answer:
      "Fordi ingen spiller har uendelig bankroll, og ingen borde har uendeligt højt maksimum. Når en tabsserie bliver lang nok, rammer du enten bordgrænsen eller din egen bankroll-grænse.",
  },
  {
    question: "Er Martingale bedre end Fibonacci?",
    answer: (
      <>
        Nej. <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link> eskalerer langsommere og giver mildere drawdowns. Martingale er mere aggressiv og langt farligere for de fleste spillere.
      </>
    ),
  },
  {
    question: "Er D'Alembert mere sikkert end Martingale?",
    answer: (
      <>
        Ja, relativt set. <Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link> bruger lineær progression i stedet for eksponentiel fordobling, hvilket gør tabsserier mindre brutale. Men heller ikke det system kan slå house edge.
      </>
    ),
  },
  {
    question: "Kan Martingale bruges i live blackjack?",
    answer: (
      <>
        Tekniskt ja, men <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link>-borde har stadig maksimumgrænser, og tabsserier kommer stadig. Systemet bliver ikke mere bæredygtigt, bare fordi dealeren er live.
      </>
    ),
  },
  {
    question: "Hvad er den største fejl spillere begår med Martingale?",
    answer:
      "At de fokuserer på hvor ofte systemet giver små gevinster, i stedet for hvor voldsomt ét enkelt kollaps kan være. Risk/reward-forholdet er skævt fra starten.",
  },
];

const MartingaleBlackjackGuide = () => {
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Martingale-Systemet i Blackjack 2026 – Matematik, Risiko & Realitet",
    description: "Dybdegående analyse af Martingale-systemet i blackjack: matematisk bevis, risk of ruin og hvorfor fordoblingsstrategien kollapser i praksis.",
    url: `${SITE_URL}/casinospil/blackjack/martingale`,
    datePublished: "2026-03-02",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Martingale Blackjack 2026 – Matematik, Risiko & Fejl"
        description="Martingale i blackjack: Vi analyserer matematikken, risk of ruin og hvorfor fordoblingsstrategien bryder sammen. Se simuleringen og vores vurdering."
        type="article"
        datePublished="2026-03-02"
        jsonLd={[faqJsonLd, articleSchema]}
      />

      <section className="relative overflow-hidden py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-muted">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> Kritisk analyse
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Martingale-Systemet i Blackjack – Hvorfor Fordoblingsstrategien Fejler
            </h1>
            <p className="text-lg text-muted-foreground">
              Martingale lover kontrol, men bygger på en farlig illusion: at du altid kan fordoble én gang mere. I blackjack er det sjældent virkeligheden.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout>
        <AuthorMetaBar author="jonas" readTime="18 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={heroImage}
            alt="Blackjack-bord med stigende chipstakke som visualiserer Martingale-systemets fordoblinger"
            width={1920}
            height={600}
            className="h-auto max-h-[400px] w-full object-cover"
            loading="eager"
          />
        </div>

        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold">
            <Skull className="h-7 w-7 text-destructive" />
            Hvorfor Martingale kollapser hurtigere end de fleste tror
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Martingale er simpelt: du fordobler efter hvert tab og nulstiller efter en gevinst. Problemet er ikke logikken i næste hånd — problemet er kapitalbehovet. Efter få tab i træk bliver indsatsen voldsom, og det er præcis dér, systemet mister sin praktiske anvendelighed.
          </p>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            I stedet for at reducere risiko koncentrerer Martingale den i sjældne, men meget dyre sekvenser. Derfor giver systemet ofte mange små sejre og enkelte meget store nederlag. Hvis du vil sammenligne med mildere progressioner, så se også <Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link> og <Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link>.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5 text-primary" /> Eksponentiel vækst
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Hver tabsserie fordobler presset. 50 → 100 → 200 → 400 → 800 bliver hurtigt en bankroll-test i stedet for en strategi.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" /> Lille gevinst, stor risiko
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Du risikerer ofte tusindvis af kroner for at vinde én basisindsats tilbage. Risk/reward er skævt fra første fordobling.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Scale className="h-5 w-5 text-primary" /> House edge består
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Ingen progression ændrer den matematiske fordel. Kun bordregler og korrekt strategi påvirker dit forventede tab.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="mb-12" />

        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold">
            <BarChart3 className="h-7 w-7 text-primary" /> Sammenligning: Martingale vs. mildere systemer
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Hvis man absolut vil analysere progressioner, er det vigtigt at forstå, at Martingale er den mest aggressive model. De langsommere systemer føles mere stabile, men de slår stadig ikke blackjack.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="py-3 px-4 text-left font-semibold">Parameter</th>
                  <th className="py-3 px-4 text-left font-semibold">Martingale</th>
                  <th className="py-3 px-4 text-left font-semibold"><Link to="/casinospil/blackjack/fibonacci" className={linkClass}>Fibonacci</Link></th>
                  <th className="py-3 px-4 text-left font-semibold"><Link to="/casinospil/blackjack/dalembert" className={linkClass}>D'Alembert</Link></th>
                  <th className="py-3 px-4 text-left font-semibold">Flat betting</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Eskalering</td><td className="py-2 px-4">Meget høj</td><td className="py-2 px-4">Høj</td><td className="py-2 px-4">Moderat</td><td className="py-2 px-4">Lav</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Bankroll-krav</td><td className="py-2 px-4">Ekstremt højt</td><td className="py-2 px-4">Højt</td><td className="py-2 px-4">Mellem</td><td className="py-2 px-4">Lavt</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Stressniveau</td><td className="py-2 px-4">Meget højt</td><td className="py-2 px-4">Højt</td><td className="py-2 px-4">Mellem</td><td className="py-2 px-4">Lavt</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">House edge</td><td className="py-2 px-4">Uændret</td><td className="py-2 px-4">Uændret</td><td className="py-2 px-4">Uændret</td><td className="py-2 px-4">Uændret</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 px-4 font-medium">Samlet vurdering</td><td className="py-2 px-4 text-destructive font-semibold">Frarådes</td><td className="py-2 px-4 text-muted-foreground font-semibold">Mildere, men stadig negativ</td><td className="py-2 px-4 text-muted-foreground font-semibold">Mest kontrollerbar af systemerne</td><td className="py-2 px-4 text-primary font-semibold">Bedste praksis</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Konklusionen er enkel: hvis målet er ansvarlig bankrollstyring, er flat betting stadig bedst. Progressionssystemer ændrer primært sessionens følelsesmæssige profil — ikke det matematiske slutresultat.
          </p>
        </section>

        <Separator className="mb-12" />

        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold">
            <ShieldCheck className="h-7 w-7 text-primary" /> Hvad du bør gøre i stedet
          </h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2 flex items-center gap-2 font-bold text-lg"><CheckCircle className="h-5 w-5 text-primary" /> Perfektionér basic strategy</h3>
                <p className="text-muted-foreground">Brug energi på beslutningerne ved bordet, ikke på at fordoble efter tab. Det er her den reelle EV-forbedring ligger.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2 flex items-center gap-2 font-bold text-lg"><CheckCircle className="h-5 w-5 text-primary" /> Vælg bedre regler</h3>
                <p className="text-muted-foreground">S17, 3:2 og gode split-regler gør mere for dig end noget indsatssystem. Sammenlign især <Link to="/casinospil/blackjack/amerikansk-blackjack" className={linkClass}>amerikansk</Link> og <Link to="/casinospil/blackjack/europaeisk-blackjack" className={linkClass}>europæisk blackjack</Link>.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2 flex items-center gap-2 font-bold text-lg"><CheckCircle className="h-5 w-5 text-primary" /> Brug fast indsats og tabsloft</h3>
                <p className="text-muted-foreground">Fast indsats, korte sessioner og et klart loft er stadig den sundeste tilgang til blackjack som underholdning.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <ReviewScreenshot
          src={liveBlackjackClassic}
          alt="Live Blackjack Classic bord med dealer, Super Stake-multiplikatorer og flere spillere – eksempel på et bordspil hvor Martingale typisk testes"
          caption="Live Blackjack Classic – et populært bord med indsatsgrænser fra 50 til 25.000 kr., der illustrerer bordmaksimumets begrænsning af Martingale"
          size="full"
        />

        <Separator className="mb-12" />

        <section className="mb-12">
          <h2 className="mb-4 flex items-center gap-2 text-3xl font-bold">
            <BookOpen className="h-7 w-7 text-primary" /> Konklusion
          </h2>
          <p className="mb-4 leading-relaxed text-muted-foreground">
            Martingale er ikke en fordelagtig blackjack-strategi. Det er en måde at komprimere mange små sejre og få store nederlag ind i samme sessionstype. Det kan føles effektivt kortvarigt, men det er netop dét, der gør systemet farligt.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Hvis du vil spille bedre blackjack, så lær strategien, vælg det rigtige bord og hold din indsats stabil. Det er mindre dramatisk — og langt mere holdbart.
          </p>
        </section>

        <CasinospilMoneyLinks gameName="Martingale Blackjack" currentPath="/casinospil/blackjack/martingale" />
        <LatestNewsByCategory pagePath="/casinospil/blackjack/martingale" />
        <RelatedGuides currentPath="/casinospil/blackjack/martingale" />
        <FAQSection faqs={faqs} />
        <AuthorBio author="jonas" />
      </ContentPageLayout>
      <StickyCtaBySlug slug="campobet" />
    </>
  );
};

export default MartingaleBlackjackGuide;
