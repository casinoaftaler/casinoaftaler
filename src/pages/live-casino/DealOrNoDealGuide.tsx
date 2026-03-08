import React from "react";
import { Link } from "react-router-dom";
import { StickyCtaBySlug } from "@/components/StickyCtaBySlug";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Sparkles, Target, BarChart3, AlertTriangle, DollarSign,
  TrendingUp, Shield, Zap, Brain, Calculator, Activity,
  Dices, Timer, Gauge, Layers, Users,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import dealOrNoDealHero from "@/assets/heroes/deal-or-no-deal-hero.jpg";

const linkClass = "text-primary underline hover:text-primary/80 font-medium";

const faqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er RTP i Deal or No Deal Live?",
    answer: "Deal or No Deal Live har en samlet RTP på ca. 95,42 %. Dog varierer den afhængig af dine valg under spillet: accept af bankierens tilbud tidligt giver typisk lavere gevinst men højere RTP, mens det at spille til ende har højere varians men potentielt lavere RTP pga. den matematiske struktur.",
  },
  {
    question: "Hvordan fungerer kvalifikationsrunden?",
    answer: "Før hovedspillet drejer du et trehjulet pengehjul for at kvalificere dig. Du kan sætte din indsats op til 50× for at forbedre dine odds for at ramme det gyldne segment. Kvalifikationsrunden koster penge – jo mere du satser, jo hurtigere kvalificerer du dig, men jo højere er din samlede omkostning.",
  },
  {
    question: "Er det bedre at tage eller afvise bankierens tilbud?",
    answer: "Matematisk er bankierens tilbud typisk 50-85 % af den forventede værdi af de resterende kufferter. At afvise tilbuddet er statistisk optimalt, hvis du er risikovillig – men hvis du er risikoavers, kan det være rationelt at acceptere. Det er et klassisk gamble: sikker lavere gevinst vs. usikker potentielt højere gevinst.",
  },
  {
    question: "Hvor tit kommer man til hovedspillet?",
    answer: "Med minimumsindsats kvalificerer du dig gennemsnitligt hvert 20-30 spin af hjulet. Ved at øge indsatsen kan du kvalificere dig hurtigere – ved max bet (50×) kvalificerer du dig næsten hvert spin. Men husk: kvalifikationsomkostningen er en del af din samlede investering og påvirker din effektive RTP.",
  },
  {
    question: "Hvad er forskellen på Deal or No Deal og andre game shows?",
    answer: (
      <>
        Deal or No Deal skiller sig ud ved at inkludere en <em>beslutningskomponent</em>: du vælger, om du accepterer bankierens tilbud. Dette giver en illusion af kontrol, som andre <Link to="/live-casino/game-shows" className={linkClass}>game shows</Link> som <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> mangler. Dog er beslutningen rent matematisk – der er ingen information, der giver dig en edge. House edge er fastlåst uanset dine valg.
      </>
    ),
  },
  {
    question: "Er Deal or No Deal Live fair?",
    answer: "Ja – spillet er udviklet af Evolution Gaming og certificeret af uafhængige testlaboratorier. Kuffertindholdet bestemmes af en certificeret RNG (Random Number Generator) før spillet starter, og kan ikke ændres undervejs. Bankierens tilbud beregnes algoritmisk baseret på de resterende kufferters indhold.",
  },
];

const DealOrNoDealGuide = () => {
  const { data: siteSettings } = useSiteSettings();
  const faqJsonLd = buildFaqSchema(faqs);
  const articleSchema = buildArticleSchema({
    headline: "Deal or No Deal Live – Komplet Guide til Casino Game Show",
    description: "Alt om Deal or No Deal Live: RTP, kvalifikationsrunde, bankierens tilbud og matematisk analyse. Det interaktive live game show forklaret.",
    url: `${SITE_URL}/live-casino/deal-or-no-deal`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Jonas",
    authorUrl: `${SITE_URL}/forfatter/jonas`,
  });

  return (
    <>
      <SEO
        title="Deal or No Deal Live – RTP, Strategi & Komplet Guide"
        description="Alt om Deal or No Deal Live: RTP på 95,4 %, kvalifikationsrunde, bankierens tilbud-matematik og kuffert-strategi. Det interaktive casino game show analyseret."
        jsonLd={[articleSchema, faqJsonLd]}
      />

      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{ backgroundImage: `linear-gradient(135deg, hsl(280 60% 20% / 0.92), hsl(45 70% 25% / 0.88)), url(${dealOrNoDealHero})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Live Game Show – Marts 2026</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Deal or No Deal Live – Bankierens Matematik</h1>
            <p className="text-lg text-white/80">
              Evolutions interaktive game show med kufferter, bankier-tilbud og spillervalg. Den komplette matematiske analyse af odds og strategi.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" date="08-03-2026" readTime="22 Min." />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={dealOrNoDealHero} alt="Deal or No Deal Live casino game show med kufferter og bankier" width={1920} height={1080} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* ── H2 1 ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Sparkles className="mr-2 inline h-6 w-6 text-primary" />
            Hvad er Deal or No Deal Live
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal Live er et live <Link to="/live-casino/game-shows" className={linkClass}>casino game show</Link> udviklet af <Link to="/spiludviklere/evolution-gaming" className={linkClass}>Evolution Gaming</Link>, baseret på det ikoniske tv-show. Spillet kombinerer en kvalifikationsrunde med det klassiske kuffert-koncept, hvor du vælger mellem bankierens tilbud og chancen for en større gevinst. Det er unikt blandt live game shows, fordi det inkluderer en reel beslutningskomponent.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Spillet foregår i tre faser: først kvalificerer du dig via et pengehjul, derefter vælger du din kuffert, og endelig navigerer du bankierens tilbud. I modsætning til <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> eller <Link to="/live-casino/dream-catcher" className={linkClass}>Dream Catcher</Link>, hvor udfaldet afgøres af ét hjulspin, strækker Deal or No Deal sig over flere runder med strategiske beslutninger.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            For danske spillere er Deal or No Deal Live tilgængeligt hos alle casinoer med <Link to="/casino-licenser" className={linkClass}>dansk licens</Link>, der samarbejder med Evolution Gaming. Indsatser starter fra 1 kr., og max gevinst er 500x indsatsen.
          </p>
        </section>

        {/* ── H2 2: Spillets struktur ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Layers className="mr-2 inline h-6 w-6 text-primary" />
            Spillets tre faser – fra kvalifikation til finale
          </h2>

          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span> Kvalifikation</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Et trehjulet pengehjul spinner. Du skal ramme det gyldne segment på alle tre hjul. Du kan øge din indsats (op til 50×) for at forbedre odds. Gennemsnitligt koster kvalifikation 10-15× din basisindsats.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span> Kuffert-åbning</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>16 kufferter med multiplikatorer (1x-500x) åbnes i grupper. Efter hver gruppe præsenterer bankieren et tilbud baseret på de resterende kufferters gennemsnitlige værdi.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader className="pb-2"><CardTitle className="text-lg flex items-center gap-2"><span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span> Deal or No Deal</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Du vælger: DEAL (acceptér tilbud) eller NO DEAL (fortsæt). Bankierens tilbud stiger typisk mod slutningen, men risikoen for at åbne de store kufferter stiger også.</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Den vigtigste indsigt er, at kvalifikationsrunden er en skjult omkostning. Mange spillere fokuserer kun på kuffert-spillet, men kvalifikationsomkostningen er typisk 30-50 % af din samlede investering pr. runde. En "gratis" kvalifikation ved lav indsats koster dig tid (20-30 spins), mens hurtig kvalifikation ved høj indsats koster dig penge direkte. Uanset hvad betaler du.
          </p>
        </section>

        {/* ── H2 3: Bankierens matematik ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Calculator className="mr-2 inline h-6 w-6 text-primary" />
            Bankierens tilbuds-matematik
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Bankierens tilbud er ikke tilfældigt – det beregnes algoritmisk baseret på den forventede værdi (EV) af de resterende kufferter. Typisk tilbyder bankieren 50-85 % af den reelle EV, stigende jo færre kufferter der er tilbage:
          </p>

          <Card className="mb-6 border-border">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Runde</TableHead>
                    <TableHead className="text-center">Kufferter tilbage</TableHead>
                    <TableHead className="text-center">Typisk tilbud (% af EV)</TableHead>
                    <TableHead className="text-center">Anbefaling</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow><TableCell className="font-medium">1. tilbud</TableCell><TableCell className="text-center">13</TableCell><TableCell className="text-center">50-60 %</TableCell><TableCell className="text-center text-destructive">No Deal</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">2. tilbud</TableCell><TableCell className="text-center">10</TableCell><TableCell className="text-center">55-65 %</TableCell><TableCell className="text-center text-destructive">No Deal</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">3. tilbud</TableCell><TableCell className="text-center">7</TableCell><TableCell className="text-center">65-75 %</TableCell><TableCell className="text-center text-muted-foreground">Situationsbestemt</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">4. tilbud</TableCell><TableCell className="text-center">4</TableCell><TableCell className="text-center">75-85 %</TableCell><TableCell className="text-center text-muted-foreground">Situationsbestemt</TableCell></TableRow>
                  <TableRow><TableCell className="font-medium">Finalen</TableCell><TableCell className="text-center">2</TableCell><TableCell className="text-center">80-90 %</TableCell><TableCell className="text-center text-primary">Deal anbefales</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <p className="mb-4 text-muted-foreground leading-relaxed">
            Den matematisk optimale strategi afhænger af din risikoprofil. En risikoneutral spiller bør altid afvise tilbuddet (da EV ved "No Deal" altid er højere end tilbuddet). Men de fleste mennesker er risikoaverse – og for dem kan det være rationelt at acceptere et tilbud, der er 80 %+ af EV, specielt hvis alternativet indebærer en 50/50 chance for at tabe det hele.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Eksempel:</strong> 2 kufferter tilbage med 5x og 500x. EV = 252,5x. Bankierens tilbud: ~200x (79 % af EV). At tage 200x er en "dårlig" beslutning ifølge ren EV-teori, men for de fleste spillere er en garanteret 200x bedre end en 50 % chance for 5x. Dette er prospect theory i praksis – og det er præcis den psykologiske spænding, der gør Deal or No Deal engagerende.
          </p>
        </section>

        {/* ── H2 4: House Edge ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <BarChart3 className="mr-2 inline h-6 w-6 text-primary" />
            House edge og RTP – den samlede omkostning
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal Lives samlede RTP er ca. 95,42 % (house edge 4,58 %). Men denne RTP inkluderer kvalifikationsomkostningen, som mange spillere overser. Den effektive house edge fordeler sig over to komponenter:
          </p>

          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <p className="text-lg font-semibold mb-2">EV-beregning pr. komplet runde</p>
              <p className="text-muted-foreground mb-1">Kvalifikation: ~10-15× basisindsats (gennemsnit)</p>
              <p className="text-muted-foreground mb-1">Kuffert-spil: 1× basisindsats</p>
              <p className="text-muted-foreground mb-4">Total investering pr. runde: ~12× basisindsats</p>
              <p className="text-2xl font-bold text-primary">Effektiv house edge: ~4,58 % af total investering</p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Sammenlignet med <Link to="/live-casino/blackjack" className={linkClass}>live blackjack</Link> (0,5 % HE) er Deal or No Deal ca. 9× dyrere. Sammenlignet med <Link to="/live-casino/crazy-time" className={linkClass}>Crazy Time</Link> (~4,5 % HE) er omkostningen næsten identisk – men Deal or No Deal tilbyder den unikke beslutningskomponent som ekstra underholdning.
          </p>
        </section>

        {/* ── H2 5: Strategi-guide ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Brain className="mr-2 inline h-6 w-6 text-primary" />
            Optimal strategi – hvornår du tager Deal
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Selvom Deal or No Deal har en beslutningskomponent, kan ingen strategi eliminere house edge. Men du kan optimere dine valg:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">1. Kvalifikation: Brug lav indsats</p>
                <p className="text-sm text-muted-foreground">Medmindre du har en stor bankroll, er lav-indsats kvalifikation (1-5×) mest effektiv. Det koster mere tid men mindre penge. Max bet kvalifikation er kun fornuftigt, hvis din tidspræference overstiger den ekstra omkostning.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">2. Afvis tidlige tilbud</p>
                <p className="text-sm text-muted-foreground">Bankierens tidlige tilbud (50-60 % af EV) er objektivt dårlige. Afvis dem medmindre du allerede har åbnet de store kufferter og EV er faldet dramatisk.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">3. Overvej Deal ved 75 %+ af EV</p>
                <p className="text-sm text-muted-foreground">Når tilbuddet nærmer sig 75-85 % af EV, og der er høj varians i resterende kufferter (stor spredning), er Deal en fornuftig risikostyring for de fleste spillere.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-4">
                <p className="font-semibold mb-1">4. Ignorer sunk costs</p>
                <p className="text-sm text-muted-foreground">Din kvalifikationsomkostning er allerede tabt. Lad den ikke påvirke din beslutning om Deal/No Deal. Evaluer kun baseret på tilbud vs. resterende kufferters EV.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── H2 6: Bedste casinoer ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <Shield className="mr-2 inline h-6 w-6 text-primary" />
            Bedste danske casinoer med Deal or No Deal Live
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deal Live er tilgængeligt hos alle danske Evolution Gaming-casinoer. Spillet er identisk uanset operatør – vælg baseret på <Link to="/casino-bonus" className={linkClass}>bonus</Link>, udbetalingshastighed og kundeservice. Husk: live casino bidrager typisk kun 10 % til <Link to="/omsaetningskrav" className={linkClass}>omsætningskrav</Link>.
          </p>
          {showCasinoCards && <InlineCasinoCards maxCards={3} />}
        </section>

        <Separator className="my-10" />

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            <AlertTriangle className="mr-2 inline h-6 w-6 text-primary" />
            Ansvarligt spil med Deal or No Deal
          </h2>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            Deal or No Deals kvalifikationsrunde kan føre til "chasing" – spillere øger indsatsen for at kvalificere sig hurtigere efter en dårlig runde. Sæt altid en fast grænse for kvalifikationsomkostninger pr. session. Den samlede omkostning (kvalifikation + kuffert) kan hurtigt overstige budgettet. Brug <Link to="/ansvarligt-spil/spillegraenser" className={linkClass}>spillegrænser</Link> og kontakt <Link to="/ansvarligt-spil/stopspillet" className={linkClass}>StopSpillet</Link> ved behov.
          </p>
        </section>

        <StickyCtaBySlug />
        <FAQSection title="Ofte Stillede Spørgsmål om Deal or No Deal Live" faqs={faqs} />
        <RelatedGuides currentPath="/live-casino/deal-or-no-deal" />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
};

export default DealOrNoDealGuide;
