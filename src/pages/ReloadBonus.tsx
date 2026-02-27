import React from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import reloadHero from "@/assets/heroes/reload-bonus-hero.jpg";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  TrendingUp,
  Calculator,
  AlertTriangle,
  Clock,
  Target,
  Sparkles,
  RefreshCw,
  Calendar,
  CheckCircle2,
  Percent,
  Wallet,
  Zap,
  BookOpen,
  Gift,
  Star,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const linkClass = "text-primary underline hover:text-primary/80";

const reloadFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er en reload bonus?",
    answer: (
      <>
        En reload bonus er en{" "}
        <Link to="/indskudsbonus" className={linkClass}>indskudsbonus</Link> for eksisterende spillere. Mens{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> kun gives én gang til nye spillere, tilbydes reload-bonusser gentagne gange – typisk ugentligt eller ved særlige lejligheder. Matchprocenten er lavere (25-50% vs. 100%), men omsætningskravene er ofte mere favorable.
      </>
    ),
  },
  {
    question: "Er reload bonus bedre end velkomstbonus?",
    answer: (
      <>
        Matematisk ja, overraskende ofte. En reload på 50% match med 3x (b) omsætning har typisk 85-90% reel EV – højere end mange velkomstbonusser med 100% match og 10x (d+b). Nøglen er de lavere omsætningskrav. En{" "}
        <Link to="/velkomstbonus" className={linkClass}>velkomstbonus</Link> med 10x (d+b) kræver, at du omsætter både indbetaling og bonus – reload-bonusser kræver typisk kun bonus-omsætning. Over tid akkumulerer reload-bonussens værdi, da du kan tage dem gentagne gange.
      </>
    ),
  },
  {
    question: "Hvor ofte kan jeg få en reload bonus?",
    answer: "Frekvensen varierer markant. De mest aktive kampagneprogrammer tilbyder daglige reload-bonusser, mens standarden er ugentlige tilbud (typisk fredag-søndag). VIP-programmer kan give personlige reload-tilbud baseret på din spilleaktivitet. Nogle casinoer kører også reload-kampagner ved helligdage, nye spiludgivelser eller store sportsbegivenheder. Tilmeld dig altid casinoets nyhedsbrev for at modtage tidsbegrænsede tilbud.",
  },
  {
    question: "Kan jeg afslå en reload bonus og spille uden?",
    answer: (
      <>
        Ja, og det er faktisk klogt i visse situationer. Hvis du spiller primært bordspil eller{" "}
        <Link to="/live-casino" className={linkClass}>live casino</Link>, hvor spilbidrag typisk er 10-20%, kan omsætningskravet reelt blive 50-100x. I det tilfælde er du bedre tjent med at spille uden bonus. Tjek altid om casinoets{" "}
        <Link to="/cashback-bonus" className={linkClass}>cashback-program</Link> er mere fordelagtigt for din spillestil end en reload bonus.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på reload bonus og cashback?",
    answer: (
      <>
        Reload bonus gives ved indbetaling (uanset om du vinder eller taber), mens{" "}
        <Link to="/cashback-bonus" className={linkClass}>cashback</Link> kun gives når du har tab. Reload kræver en aktiv indbetaling og har omsætningskrav; cashback er passiv og ofte omsætningsfri. For aktive spillere, der indbetaler regelmæssigt, er reload-bonusser bedst. For spillere, der spiller med eksisterende saldo, er cashback mere værdifuldt.
      </>
    ),
  },
  {
    question: "Hvad er et godt omsætningskrav for en reload bonus?",
    answer: (
      <>
        I Danmark er 10x det lovmæssige maksimum takket være Spillemyndighedens regulering. For reload-bonusser er 3-5x (b) exceptionelt, 5-8x (b) godt, og 10x (d+b) gennemsnitligt. Bemærk forskellen mellem (b) – kun bonus – og (d+b) – indbetaling plus bonus. En 50% reload med 5x (b) kræver kun 1.250 kr. omsætning på en 500 kr. indbetaling, mens 10x (d+b) kræver 7.500 kr. Læs mere om{" "}
        <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav og beregning</Link>.
      </>
    ),
  },
];

const reloadScheduleTypes = [
  {
    icon: Calendar,
    title: "Ugentlig reload (standard)",
    description: "Tilbydes typisk fredag til søndag for at booste weekendspil. Match-procent: 25-50%. Mest udbredt og mest forudsigeligt for budgetplanlægning. Aktiveres ved indbetaling i kampagneperioden.",
    tag: "Mest udbredt",
  },
  {
    icon: Sparkles,
    title: "Daglig reload",
    description: "Sjælden men værdifuld – et nyt tilbud hver dag med varierende match-procent og free spins. Kræver daglig login og indbetaling. Bedst for spillere med fleksibelt spillemønster og daglig aktivitet.",
    tag: "Sjælden",
  },
  {
    icon: Gift,
    title: "Begivenhedsbaseret reload",
    description: "Ekstra generøse tilbud ved helligdage (jul, nytår), nye spiludgivelser, eller casinoets jubilæum. Ofte 75-100% match – næsten velkomstbonus-niveau. Uforudsigelige men meget værdifulde.",
    tag: "Sæsonbestemt",
  },
  {
    icon: Star,
    title: "VIP/personlig reload",
    description: "Skræddersyede tilbud baseret på din spillehistorik og indbetalningsmønster. Højeste match-procent (50-100%), laveste omsætningskrav, og ofte med tilknyttede free spins. Kun tilgængeligt for casinoets mest loyale spillere.",
    tag: "Eksklusivt",
  },
];

const ReloadBonus = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(reloadFaqs);
  const articleJsonLd = buildArticleSchema({
    headline: "Reload Bonus – Komplet Guide til Casino Reload Bonusser 2026",
    description: "Alt om reload bonusser på danske casinoer. Lær hvordan reload fungerer, hvornår de tilbydes, og hvordan du maksimerer din bonusværdi som eksisterende spiller.",
    url: `${SITE_URL}/reload-bonus`,
    datePublished: "2026-02-27",
    dateModified: "2026-02-27",
  });

  return (
    <>
      <SEO
        title="Reload Bonus – Bonusser for Eksisterende Spillere 2026 | Casinoaftaler"
        description="Alt om reload bonusser på danske casinoer. Lær hvordan reload fungerer, hvornår de tilbydes, og find de bedste tilbud til eksisterende spillere."
        jsonLd={[faqJsonLd, articleJsonLd]}
      />

      {/* Hero */}
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
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Opdateret Februar 2026
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Reload Bonus på Danske Casinoer
            </h1>
            <p className="text-lg text-white/80">
              Reload-bonusser er velkomstbonussens tilbagevendende fætter – og matematisk ofte mere fordelagtige. Lær hvordan du finder de bedste reload-tilbud og maksimerer din langsigtede bonusværdi.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="27-02-2026" readTime="10 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={reloadHero} alt="Reload bonus – tilbagevendende casinobonus med genopladningssymbol" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Intro */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Hvad er en reload bonus?</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            En reload bonus er casinoets måde at belønne dig for at komme tilbage. Mens{" "}
            <Link to="/velkomstbonus" className={linkClass}>velkomstbonussen</Link> er designet til at tiltrække nye spillere, er reload-bonussen skabt til at fastholde eksisterende kunder med tilbagevendende indbetalingsbonusser. Tænk på det som en "velkomstbonus light" – lavere match-procent, men med den afgørende fordel, at du kan tage den igen og igen.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I det danske casinomarked tilbyder de fleste operatører ugentlige eller månedlige reload-bonusser som en fast del af deres kampagneprogram. Typisk matcher casinoet din indbetaling med 25-50% op til et bestemt beløb, med{" "}
            <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link> der er lavere end velkomstbonussens. Det er denne kombination af gentagelse og favorable vilkår, der gør reload-bonussen til en af de mest undervurderede bonustyper.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Overraskende nok er reload-bonussen matematisk ofte mere fordelagtig end velkomstbonussen, når man beregner den reelle forventede værdi (EV). En reload på 50% match med 3x (b) omsætning har typisk en EV på 85-90% af bonusbeløbet – sammenlignet med velkomstbonussens typiske 60-80%. Grunden er enkel: lavere matchprocent kompenseres af markant lavere omsætningskrav.
          </p>
          <p className="mb-8 text-muted-foreground leading-relaxed">
            For en komplet sammenligning af alle bonustyper, se vores{" "}
            <Link to="/casino-bonus" className={linkClass}>casino bonus hub</Link>. Vil du forstå hvordan{" "}
            <Link to="/cashback-bonus" className={linkClass}>cashback bonus</Link> adskiller sig fra reload, har vi en dedikeret guide.
          </p>
        </section>

        {/* Reload-typer */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">De fire typer reload bonus</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Reload-bonusser kommer i flere formater med varierende frekvens, generøsitet og vilkår. Her er de fire hovedkategorier:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {reloadScheduleTypes.map((type) => (
              <Card key={type.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <type.icon className="h-5 w-5 text-primary" />
                      {type.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">{type.tag}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* EV-analyse */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Reload bonus EV-analyse: Matematikken bag den reelle værdi</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Lad os køre en konkret beregning for at demonstrere, hvorfor reload-bonusser ofte slår velkomstbonussen i reel værdi:
          </p>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="border-primary/30 bg-accent/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Reload bonus (50% match, 3x (b))
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground font-mono">
                <p>Indbetaling: 500 kr.</p>
                <p>Bonus: 250 kr. (50% match)</p>
                <p>Omsætning: 250 × 3 = 750 kr.</p>
                <p>Forventet tab: 750 × 0,04 = 30 kr.</p>
                <p className="text-primary font-semibold">EV = 250 - 30 = 220 kr. (88%)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gift className="h-5 w-5 text-muted-foreground" />
                  Velkomstbonus (100% match, 10x (d+b))
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground font-mono">
                <p>Indbetaling: 500 kr.</p>
                <p>Bonus: 500 kr. (100% match)</p>
                <p>Omsætning: 1.000 × 10 = 10.000 kr.</p>
                <p>Forventet tab: 10.000 × 0,04 = 400 kr.</p>
                <p className="font-semibold">EV = 500 - 400 = 100 kr. (20%)</p>
              </CardContent>
            </Card>
          </div>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            I dette eksempel giver reload-bonussen 220 kr. i forventet værdi mod velkomstbonussens 100 kr. – mere end dobbelt så meget. Selvfølgelig er det totale bonusbeløb lavere (250 vs. 500 kr.), men den procentvise retur er markant bedre. Over 12 uger med ugentlige reloads akkumulerer du 12 × 220 = 2.640 kr. i forventet værdi – langt mere end nogen enkeltstående velkomstbonus.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtig pointe:</strong> Ikke alle reload-bonusser er lige gode. En reload med 25% match og 10x (d+b) har kun ca. 40% EV – dårligere end de fleste velkomstbonusser. Beregn ALTID den forventede værdi inden du accepterer et reload-tilbud. Vores{" "}
            <Link to="/omsaetningskrav" className={linkClass}>guide til omsætningskrav</Link> viser dig præcis hvordan.
          </p>
        </section>

        {/* Strategisk brug */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Strategisk brug af reload bonusser</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Med den rette tilgang kan reload-bonusser blive din mest konsistente indtægtskilde fra casinobonusser:
          </p>
          <div className="space-y-4">
            {[
              {
                icon: Calendar,
                title: "Synkroniser indbetalinger med kampagnekalenderen",
                desc: "De fleste casinoer kører reload-kampagner fredag-søndag. I stedet for at indbetale tilfældigt, saml dine indbetalinger til kampagneperioderne. En enkelt 500 kr. indbetaling med 50% reload er langt mere værdifuld end tre tilfældige indbetalinger á 200 kr. uden bonus.",
              },
              {
                icon: Calculator,
                title: "Beregn break-even point for hvert tilbud",
                desc: "Accepter kun reload-bonusser med positiv forventet værdi. Tommelfingerregel: Hvis match-% × (1 - house edge × omsætning/match) > 0, er tilbuddet positivt. For 50% match med 3x (b): 0,50 × (1 - 0,04 × 3/0,50) = 0,50 × 0,76 = 0,38 – positivt.",
              },
              {
                icon: TrendingUp,
                title: "Kombinér med VIP-progression",
                desc: "Mange casinoer giver bedre reload-vilkår jo højere dit VIP-niveau er. Omsætning fra reload-bonus tæller typisk mod VIP-progression. Strategien er at starte med standard-reloads og gradvist opbygge VIP-status for at låse op for bedre tilbud.",
              },
              {
                icon: ShieldCheck,
                title: "Brug no-sticky logik til reload",
                desc: (
                  <>
                    Tjek om casinoets reload-bonus er{" "}
                    <Link to="/no-sticky-bonus" className={linkClass}>no-sticky</Link> eller{" "}
                    <Link to="/sticky-bonus" className={linkClass}>sticky</Link>. No-sticky reload er den hellige gral: du spiller med egne penge først, og bonuspengene aktiveres kun hvis du taber. Det giver dig fuld fleksibilitet til at hæve gevinster fra dine egne penge uden omsætningskrav.
                  </>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{typeof item.desc === 'string' ? item.desc : item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3-måneders EV scenario */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">3-måneders værdi-analyse: Reload vs. kun velkomstbonus</h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            For at illustrere reload-bonussens langsigtede potentiale, lad os sammenligne to spillere over 3 måneder:
          </p>
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Spiller A: Kun velkomstbonus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Velkomstbonus EV: +300 kr.</p>
                <p>Reload-bonusser: 0 kr. (ignorerer tilbud)</p>
                <p>Cashback: 0 kr.</p>
                <p className="font-semibold border-t border-border pt-2 mt-2">Samlet 3-måneders bonus-EV: +300 kr.</p>
              </CardContent>
            </Card>
            <Card className="border-primary/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-primary">Spiller B: Velkomst + ugentlig reload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                <p>Velkomstbonus EV: +300 kr.</p>
                <p>Reload-bonusser (12 uger × 150 kr.): +1.800 kr.</p>
                <p><Link to="/cashback-bonus" className={linkClass}>Cashback</Link> (supplerende): +200 kr.</p>
                <p className="font-semibold text-primary border-t border-border pt-2 mt-2">Samlet 3-måneders bonus-EV: +2.300 kr.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Forskellen er dramatisk: Spiller B, der konsekvent udnytter reload-bonusser, genererer 7,7x mere bonusværdi over 3 måneder. Det er vigtigt at pointere, at dette kræver disciplin – du skal beregne EV for hvert tilbud og kun acceptere positive tilbud. Blindt at tage alle bonusser er ikke en strategi.
          </p>
        </section>

        {/* Tjekliste */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">5-trins tjekliste: Evaluer enhver reload bonus</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Brug denne checkliste hver gang du modtager et reload-tilbud:
          </p>
          <div className="space-y-3">
            {[
              { icon: Percent, title: "Trin 1: Match-procent og maksbeløb", desc: "25% er lavt, 50% er standard, 75%+ er exceptionelt (typisk sæsonbestemt). Tjek det maksimale bonusbeløb – en 50% match op til 500 kr. kræver 1.000 kr. indbetaling for fuld udnyttelse." },
              { icon: Calculator, title: "Trin 2: Omsætningskrav – (b) eller (d+b)?", desc: "Dette er den vigtigste variabel. 5x (b) på 250 kr. bonus = 1.250 kr. omsætning. 10x (d+b) på 500 kr. indbetaling + 250 kr. bonus = 7.500 kr. omsætning. Forskellen er 6x i krævende omsætning." },
              { icon: Clock, title: "Trin 3: Tidsramme for omsætning", desc: "De fleste reload-bonusser har 7-14 dages gyldighed – kortere end velkomstbonusser. Med 1.250 kr. omsætning og 10 kr. bet-størrelse er det 125 spins – overkommeligt. Med 7.500 kr. er det 750 spins og kræver planlægning." },
              { icon: Target, title: "Trin 4: Aktiver KUN med positiv EV", desc: "Beregn: EV = Bonusbeløb – (Omsætning × House Edge). Hvis resultatet er negativt eller under 30% af bonusbeløbet, spring tilbuddet over. Din tid er mere værd end en bonus med 5 kr. i EV." },
              { icon: ShieldCheck, title: "Trin 5: Tjek bonusstruktur (sticky/no-sticky)", desc: "No-sticky reload er sjælden men markant mere værdifuld. Med no-sticky spiller du med egne penge først og kan hæve gevinster frit. Sticky reload kræver gennemspilning af hele omsætningskravet før udbetaling." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-lg border border-primary/30 bg-accent/30 p-4">
                <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InlineCasinoCards
          title="Casinoer med de bedste reload-bonusser"
        />

        <Separator className="my-10" />

        <AuthorBio />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/reload-bonus" />

        <FAQSection title="Ofte stillede spørgsmål om reload bonus" faqs={reloadFaqs} />
      </div>
    </>
  );
};

export default ReloadBonus;
