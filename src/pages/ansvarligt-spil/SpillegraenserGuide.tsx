import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import spillegraenserHero from "@/assets/heroes/spillegraenser-guide-hero.jpg";
import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Lock,
  Scale,
  BarChart3,
  BookOpen,
  ExternalLink,
  HelpCircle,
  Phone,
  Globe,
  Gavel,
  ArrowRight,
  Timer,
  Ban,
  ShieldCheck,
  Info,
  Calculator,
  TrendingDown,
  Target,
  Wallet,
  Activity,
} from "lucide-react";

// ────────────────────────────────────────────────────────────────
// FAQ Data
// ────────────────────────────────────────────────────────────────
const spillegraenserFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er en indbetalingsgrænse, og hvordan fungerer den?",
    answer: (
      <>
        En indbetalingsgrænse er et selvvalgt loft over, hvor meget du kan indsætte på din
        casinokonto inden for en bestemt periode (dagligt, ugentligt eller månedligt). Alle
        danske licenserede casinoer er lovpligtige at tilbyde indbetalingsgrænser i henhold til{" "}
        <strong>BEK nr. 1494</strong>. Når du sætter en grænse, kan du ikke indbetale mere end
        det fastsatte beløb i den valgte periode. Nedsættelse træder i kraft øjeblikkeligt,
        mens forhøjelse kræver minimum 24 timers afkøling – dette forhindrer impulsive
        beslutninger. Grænsen gælder pr. casino, men du kan bruge{" "}
        <Link to="/ansvarligt-spil/rofus" className="text-primary underline hover:text-primary/80">ROFUS</Link>{" "}
        til at sætte en tværgående spærring, hvis du ønsker total kontrol.
      </>
    ),
  },
  {
    question: "Hvad er forskellen på indbetalingsgrænse, tabsgrænse og tidsgrænse?",
    answer: (
      <>
        <strong>Indbetalingsgrænse</strong> begrænser, hvor meget du kan overføre til din
        casinokonto. <strong>Tabsgrænse</strong> begrænser, hvor meget du kan tabe i en given
        periode (nettotab = indbetalinger minus udbetalinger). <strong>Tidsgrænse</strong>{" "}
        begrænser, hvor længe du kan være logget ind og spille. De fleste danske casinoer
        tilbyder alle tre typer, men kun indbetalingsgrænser er lovpligtige. Tabsgrænser og
        tidsgrænser er frivillige ekstra værktøjer, som vi kraftigt anbefaler at benytte.
        Den mest effektive strategi kombinerer alle tre grænsetyper.
      </>
    ),
  },
  {
    question: "Kan casinoet ændre mine grænser uden mit samtykke?",
    answer: (
      <>
        Nej. I henhold til dansk lovgivning kan et casino aldrig forhøje dine grænser uden
        dit eksplicitte samtykke. De kan dog <em>nedsætte</em> dine grænser, hvis de vurderer,
        at du udviser risikoadfærd. Denne ensidighed er designet til at beskytte spillere.
        Hvis et casino forsøger at forhøje dine grænser uden din godkendelse, er det en
        alvorlig overtrædelse af licensvilkårene, og du bør rapportere det til{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">Spillemyndigheden</Link>.
      </>
    ),
  },
  {
    question: "Hvad er afkølingsperioden på 24 timer, og hvorfor eksisterer den?",
    answer: (
      <>
        Når du ønsker at forhøje en eksisterende indbetalingsgrænse, kræver dansk lovgivning
        en obligatorisk venteperiode på minimum 24 timer, før ændringen træder i kraft. Denne
        "afkølingsperiode" er designet til at forhindre impulsive beslutninger – fx at du i
        affekt efter et stort tab forsøger at hæve grænsen for at jage tabet. Nedsættelse af
        grænser træder derimod i kraft øjeblikkeligt, fordi det er en beskyttende handling.
        Denne asymmetri er en central del af spillerbeskyttelsen i BEK nr. 1494.
      </>
    ),
  },
  {
    question: "Hvad er PGSI-testen, og kan jeg tage den online?",
    answer: (
      <>
        PGSI (Problem Gambling Severity Index) er et internationalt anerkendt screeningsværktøj
        med 9 spørgsmål, der måler risikoen for problematisk spilleadfærd. Hvert svar scores
        fra 0-3, og den samlede score klassificerer dig som: ikke-problem spiller (0), lav
        risiko (1-2), moderat risiko (3-7) eller problem spiller (8+). Du kan tage testen
        gratis via{" "}
        <a href="https://www.stopspillet.dk/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
          StopSpillet.dk
        </a>{" "}
        eller kontakte{" "}
        <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">StopSpillet</Link>{" "}
        på telefon 70 22 28 25 for en fortrolig samtale om dit resultat.
      </>
    ),
  },
  {
    question: "Gælder mine grænser på tværs af casinoer?",
    answer: "Nej, indbetalingsgrænser sættes pr. casino. Det betyder, at du i teorien kan have en grænse på 1.000 kr. hos hvert af 10 casinoer og stadig indbetale 10.000 kr. i alt. Hvis du ønsker en tværgående løsning, er ROFUS det eneste værktøj, der blokerer dig fra alle danske licenserede casinoer samtidigt. Vi anbefaler, at du kun spiller på 1-2 casinoer for at bevare overblikket over dit samlede forbrug.",
  },
  {
    question: "Hvad er nettotabsgrænse, og hvordan beregnes den?",
    answer: "En nettotabsgrænse beregner dit samlede tab som forskellen mellem indbetalinger og udbetalinger i en given periode. Eksempel: Hvis du indbetaler 2.000 kr. og hæver 500 kr., er dit nettotab 1.500 kr. Hvis din nettotabsgrænse er sat til 2.000 kr., kan du stadig indbetale 500 kr. mere, før grænsen nås. Denne type grænse giver et mere realistisk billede af dit faktiske forbrug end en ren indbetalingsgrænse, fordi den tager højde for gevinster.",
  },
  {
    question: "Hvad sker der, hvis jeg når min grænse midt i en session?",
    answer: "Hvis du rammer din indbetalingsgrænse, kan du ikke foretage yderligere indbetalinger, men du kan fortsætte med at spille for de midler, du allerede har på kontoen. Hvis du rammer en tidsgrænse, vil de fleste casinoer logge dig ud automatisk efter en advarsel. Eventuelle aktive spil afsluttes normalt, og gevinster krediteres din konto. Du kan ikke omgå en aktiv grænse uden at vente den relevante afkølingsperiode.",
  },
  {
    question: "Hvilke grænser anbefaler I for rekreative spillere?",
    answer: (
      <>
        For rekreative spillere anbefaler vi: <strong>Indbetalingsgrænse</strong> på maksimalt
        5-10% af din månedlige disponible indkomst (efter faste udgifter). <strong>Tidsgrænse</strong>{" "}
        på maksimalt 1-2 timer pr. session. <strong>Tabsgrænse</strong> på et beløb, du kan
        tabe uden at det påvirker din livskvalitet. Husk: gambling skal altid betragtes som
        underholdning med en omkostning – ikke som en investeringsstrategi. Se vores{" "}
        <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">
          ansvarligt spil-guide
        </Link>{" "}
        for flere tips.
      </>
    ),
  },
  {
    question: "Er der forskel på grænseværktøjer fra casino til casino?",
    answer: "Ja, selvom alle danske casinoer skal tilbyde indbetalingsgrænser (lovkrav), varierer de øvrige værktøjer markant. Nogle casinoer tilbyder avancerede funktioner som sessionsgrænser, reality checks hvert 30. minut, automatisk udlogning, og detaljerede forbrugsrapporter. Andre tilbyder kun det lovpligtige minimum. Vi anbefaler at vælge casinoer med de mest omfattende ansvarligt spil-værktøjer – det er et tegn på en seriøs operatør.",
  },
];

const SpillegraenserGuide = () => {
  const { data: settings } = useSiteSettings();

  const articleSchema = buildArticleSchema({
    headline: "Spillegrænser i Danmark – Komplet Guide til Indbetalings-, Tids- og Tabsgrænser",
    description: "Dybdegående guide til alle typer spillegrænser på danske casinoer. Lær om indbetalingsgrænser, tidsgrænser, tabsgrænser, selvtest (PGSI) og dansk lovgivning (BEK 1494).",
    url: `${SITE_URL}/ansvarligt-spil/spillegraenser`,
    datePublished: "2026-03-08",
    dateModified: "2026-03-08",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  const faqSchema = buildFaqSchema(
    spillegraenserFaqs.map((f) => ({
      question: f.question,
      answer: typeof f.answer === "string" ? f.answer : "",
    }))
  );

  return (
    <>
      <SEO
        title="Spillegrænser – Guide til Indbetalings-, Tids- og Tabsgrænser"
        description="Komplet dansk guide til spillegrænser: indbetalingsgrænser, tidsgrænser, tabsgrænser, PGSI-selvtest og lovkrav (BEK 1494). Lær at beskytte dig selv."
        type="article"
        image={`${SITE_URL}/og-image.png`}
        jsonLd={[articleSchema, faqSchema]}
        breadcrumbLabel="Spillegrænser"
        datePublished="2026-03-08"
        dateModified="2026-03-08"
      />

      <div className="container max-w-4xl py-8">
        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-xl">
          <img
            src={spillegraenserHero}
            alt="Spillegrænser – Selvkontrol og ansvarligt spil"
            className="h-[260px] w-full object-cover sm:h-[320px] md:h-[380px]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <Badge className="mb-2 bg-primary/90 text-primary-foreground">Ansvarligt Spil</Badge>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Spillegrænser i Danmark – Komplet Guide til Selvkontrol
            </h1>
          </div>
        </div>

        <AuthorMetaBar author="ajse" showAffiliateDisclaimer={false} />

        {/* ── Intro ── */}
        <section className="mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Spillegrænser er det mest grundlæggende og effektive værktøj til at beskytte dig selv mod problematisk spilleadfærd. I Danmark er alle licenserede casinoer lovpligtige at tilbyde indbetalingsgrænser, men der findes langt flere muligheder for selvregulering, end de fleste spillere kender til.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Denne guide gennemgår alle typer spillegrænser, den danske lovgivning bag dem (herunder BEK nr. 1494 om spillerbeskyttelse), PGSI-selvtesten, og giver dig konkrete anbefalinger til, hvordan du sætter effektive grænser. Uanset om du er en rekreativ spiller, der vil bevare kontrollen, eller en pårørende, der ønsker at forstå mulighederne, er denne guide din primære ressource.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ansvarligt spil handler ikke om at stoppe med at spille – det handler om at spille på dine egne betingelser. Grænser er det redskab, der sikrer, at spil forbliver underholdning og aldrig bliver et problem. Læs også vores{" "}
            <Link to="/ansvarligt-spil" className="text-primary underline hover:text-primary/80">overordnede guide til ansvarligt spil</Link>{" "}
            for en bredere introduktion.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Typer af grænser ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Alle typer spillegrænser forklaret
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Der findes fem hovedtyper af spillegrænser på danske casinoer. Hver type beskytter dig på en unik måde, og den mest effektive strategi kombinerer flere grænsetyper.
          </p>

          {/* Indbetalingsgrænse */}
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Wallet className="h-5 w-5 text-primary" />
                1. Indbetalingsgrænse (Lovpligtig)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                En indbetalingsgrænse sætter et loft over, hvor meget du kan indsætte på din casinokonto inden for en bestemt periode. Dette er den <strong>eneste lovpligtige grænse</strong> i Danmark – alle licenserede casinoer skal tilbyde den.
              </p>
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-sm font-medium mb-2">Sådan fungerer det:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Du vælger en daglig, ugentlig eller månedlig grænse</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Nedsættelse træder i kraft <strong>øjeblikkeligt</strong></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Forhøjelse kræver <strong>minimum 24 timers afkøling</strong></li>
                  <li className="flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" /> Grænsen gælder kun pr. casino – ikke tværgående</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Lovhjemmel: BEK nr. 1494 om onlinekasino, § 6-8 om spillerbeskyttelsesforanstaltninger.
              </p>
            </CardContent>
          </Card>

          {/* Tidsgrænse */}
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="h-5 w-5 text-primary" />
                2. Tidsgrænse / Sessionsgrænse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                En tidsgrænse begrænser, hvor længe du kan være logget ind og spille i træk. Når tidsgrænsen nås, modtager du en advarsel og bliver typisk logget ud automatisk. Denne type grænse er særligt vigtig, fordi tidsforvrængning er et velkendt fænomen i gambling – spillere mister ofte fornemmelsen for, hvor lang tid der er gået.
              </p>
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-sm font-medium mb-2">Typiske indstillinger:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><Timer className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Sessionsgrænse: 30 min, 1 time, 2 timer, 4 timer</li>
                  <li className="flex items-start gap-2"><Timer className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Reality check-påmindelser: hvert 15., 30. eller 60. minut</li>
                  <li className="flex items-start gap-2"><Timer className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" /> Daglig spilletid: maksimalt antal timer pr. dag</li>
                </ul>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Anbefaling:</strong> Sæt en sessionsgrænse på maksimalt 1-2 timer og aktiver reality checks hvert 30. minut for at bevare overblikket.
              </p>
            </CardContent>
          </Card>

          {/* Tabsgrænse */}
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingDown className="h-5 w-5 text-primary" />
                3. Tabsgrænse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                En tabsgrænse sætter et loft over, hvor meget du kan tabe i en given periode. Til forskel fra en indbetalingsgrænse tager tabsgrænsen højde for gevinster – den beregner dit <strong>nettotab</strong> (indbetalinger minus udbetalinger). Dette giver et mere realistisk billede af dit faktiske forbrug.
              </p>
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-sm font-medium mb-2">Beregningseksempel:</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Indbetalinger denne måned: 3.000 kr.</p>
                  <p>Udbetalinger denne måned: 1.200 kr.</p>
                  <p>Nettotab: 3.000 − 1.200 = <strong>1.800 kr.</strong></p>
                  <p className="italic">Med en tabsgrænse på 2.000 kr. kan du stadig tabe 200 kr. mere.</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Tabsgrænser er ikke lovpligtige i Danmark, men tilbydes af de fleste kvalitetsscasinoer. Vi anbefaler stærkt at bruge dem som supplement til indbetalingsgrænser.
              </p>
            </CardContent>
          </Card>

          {/* Indsatsgrænse */}
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-5 w-5 text-primary" />
                4. Indsatsgrænse (Bet Limit)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                En indsatsgrænse begrænser, hvor meget du kan satse pr. spin, hånd eller runde. Denne type grænse er særligt relevant for spillemaskiner og live casino-spil, hvor det kan være fristende at øge indsatsen efter tab (chasing losses).
              </p>
              <p className="text-sm text-muted-foreground">
                I Danmark er der en lovmæssig begrænsning: bonusmidler kan maksimalt bruges med en indsats på 30 kr. pr. spin (BEK nr. 1494). For egne midler er der ingen lovpligtig grænse, men mange casinoer tilbyder frivillige indsatsgrænser som et ekstra beskyttelsesværktøj.
              </p>
            </CardContent>
          </Card>

          {/* Sessionsgrænse */}
          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-5 w-5 text-primary" />
                5. Sessionsgrænse og Reality Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Reality checks er pop-up-meddelelser, der med jævne mellemrum viser dig, hvor længe du har spillet, og hvor meget du har vundet eller tabt i sessionen. De er designet til at bryde den "flow-tilstand", som kan opstå under spil, og give dig mulighed for at reflektere over, om du ønsker at fortsætte.
              </p>
              <p className="text-sm text-muted-foreground">
                De bedste casinoer tilbyder konfigurerbare reality checks med intervaller fra 15 minutter til 1 time. Vi anbefaler at sætte dem til hvert 30. minut for optimal beskyttelse uden at det bliver forstyrrende.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ── Dansk lovgivning ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Gavel className="h-7 w-7 text-primary" />
            Dansk lovgivning om spillegrænser
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Danmark har en af Europas mest progressive lovgivninger for spillerbeskyttelse. BEK nr. 1494 om onlinekasino (bekendtgørelsen om spillerbeskyttelse) samt Spilleloven sætter klare rammer for, hvad casinoer skal tilbyde deres spillere.
          </p>

          <div className="rounded-xl border border-border bg-card p-6 space-y-4 mb-6">
            <h3 className="font-bold text-lg">Lovpligtige krav til danske casinoer:</h3>
            {[
              { title: "Indbetalingsgrænser", desc: "Alle casinoer skal tilbyde daglige, ugentlige og månedlige indbetalingsgrænser. Spillere skal aktivt vælge en grænse ved oprettelse af konto." },
              { title: "24-timers afkøling", desc: "Forhøjelse af indbetalingsgrænser kræver minimum 24 timers venteperiode. Nedsættelse træder i kraft øjeblikkeligt." },
              { title: "Bonusbegrænsninger", desc: "Maksimalt 1.000 kr. i bonus og maksimalt 10x omsætningskrav (BEK nr. 1494, § 5). Bonusindsatser er begrænset til 30 kr. pr. spin." },
              { title: "ROFUS-tilslutning", desc: "Alle licenserede casinoer skal i realtid konsultere ROFUS og blokere udelukkede spillere." },
              { title: "Forbud mod kreditspil", desc: "Casinoer må ikke tilbyde kredit eller udlån til spillere. Alle indbetalinger skal ske med spillerens egne midler." },
              { title: "Proaktiv identifikation", desc: "Casinoer er forpligtet til proaktivt at identificere og kontakte spillere med risikoadfærd (f.eks. lange sessioner, store tab)." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Overtrædelse af disse krav kan resultere i bøder, suspendering eller inddragelse af casinoets licens. Spillemyndigheden fører løbende tilsyn og offentliggør afgørelser på deres hjemmeside. Læs mere på vores{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">guide til Spillemyndigheden</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── PGSI Selvtest ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-7 w-7 text-primary" />
            PGSI Selvtest – Vurdér din spilleadfærd
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Problem Gambling Severity Index (PGSI) er det mest udbredte screeningsværktøj for spilleproblemer globalt. Testen er udviklet af Canadian Centre on Substance Abuse og valideret i over 30 lande. Den består af 9 spørgsmål, som dækker de seneste 12 måneder.
          </p>

          <Card className="border-primary/30 mb-6">
            <CardHeader>
              <CardTitle className="text-lg">PGSI-spørgsmålene</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Besvar hvert spørgsmål med: Aldrig (0), Nogle gange (1), Oftest (2), Næsten altid (3).
              </p>
              <ol className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Har du spillet for mere, end du egentlig havde råd til at tabe?",
                  "Har du haft behov for at spille for større beløb for at opnå den samme spænding?",
                  "Har du forsøgt at vinde tabte penge tilbage ved at spille mere (chasing)?",
                  "Har du lånt penge eller solgt noget for at finansiere dit spil?",
                  "Har du følt, at du måske har et problem med dit spil?",
                  "Har spil forårsaget helbredsproblemer, herunder stress eller angst?",
                  "Har andre kritiseret dit spil eller sagt, at du har et spilleproblem?",
                  "Har dit spil forårsaget økonomiske problemer for dig eller din husstand?",
                  "Har du følt skyld over den måde, du spiller på, eller over hvad der sker, når du spiller?",
                ].map((q, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-bold text-primary flex-shrink-0">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { score: "0", label: "Ikke-problem spiller", color: "bg-green-600" },
              { score: "1-2", label: "Lav risiko", color: "bg-yellow-600" },
              { score: "3-7", label: "Moderat risiko", color: "bg-orange-600" },
              { score: "8-27", label: "Problem spiller", color: "bg-destructive" },
            ].map((item) => (
              <Card key={item.score} className="border-border bg-card text-center">
                <CardContent className="p-4">
                  <Badge className={`${item.color} text-white mb-2`}>{item.score} point</Badge>
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            <strong>Vigtigt:</strong> PGSI er et screeningsværktøj, ikke en diagnose. Hvis din score er 3 eller højere, anbefaler vi, at du kontakter{" "}
            <Link to="/ansvarligt-spil/stopspillet" className="text-primary underline hover:text-primary/80">StopSpillet</Link>{" "}
            eller{" "}
            <Link to="/ansvarligt-spil/hjaelpelinjer" className="text-primary underline hover:text-primary/80">andre hjælpetjenester</Link>{" "}
            for en professionel vurdering. En score på 8+ indikerer, at du bør søge hjælp snarest – kontakt{" "}
            <a href="tel:70222825" className="text-primary underline hover:text-primary/80">StopSpillet på 70 22 28 25</a>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Casino-sammenligning ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-primary" />
            Sammenligning af grænseværktøjer hos danske casinoer
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ikke alle casinoer tilbyder de samme ansvarligt spil-værktøjer. Her er en sammenligning af de vigtigste funktioner hos populære danske licenserede casinoer.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium">Casino</th>
                  <th className="text-center py-3 px-2 font-medium">Indbetalings&shy;grænse</th>
                  <th className="text-center py-3 px-2 font-medium">Tabs&shy;grænse</th>
                  <th className="text-center py-3 px-2 font-medium">Tids&shy;grænse</th>
                  <th className="text-center py-3 px-2 font-medium">Reality Check</th>
                  <th className="text-center py-3 px-2 font-medium">Forbrugs&shy;rapport</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { name: "Danske Spil", slug: "danske-spil", indbet: true, tab: true, tid: true, reality: true, rapport: true },
                  { name: "bet365", slug: "bet365", indbet: true, tab: true, tid: true, reality: true, rapport: true },
                  { name: "Mr Green", slug: "mr-green", indbet: true, tab: true, tid: true, reality: true, rapport: true },
                  { name: "LeoVegas", slug: "leovegas", indbet: true, tab: false, tid: true, reality: true, rapport: true },
                  { name: "Unibet", slug: "unibet", indbet: true, tab: true, tid: true, reality: true, rapport: true },
                  { name: "ComeOn", slug: "comeon", indbet: true, tab: false, tid: false, reality: true, rapport: false },
                  { name: "Betano", slug: "betano", indbet: true, tab: true, tid: true, reality: true, rapport: true },
                ].map((c) => (
                  <tr key={c.slug} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-2 px-2">
                      <Link to={`/casino-anmeldelser/${c.slug}`} className="text-primary hover:underline font-medium">{c.name}</Link>
                    </td>
                    <td className="text-center py-2 px-2">{c.indbet ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                    <td className="text-center py-2 px-2">{c.tab ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                    <td className="text-center py-2 px-2">{c.tid ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                    <td className="text-center py-2 px-2">{c.reality ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                    <td className="text-center py-2 px-2">{c.rapport ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <Ban className="h-4 w-4 text-muted-foreground/40 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground italic">
            Data indsamlet marts 2026. Alle ovenstående casinoer har gyldig dansk licens udstedt af{" "}
            <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">Spillemyndigheden</Link>.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── EV-model ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Calculator className="h-7 w-7 text-primary" />
            Matematik bag spillegrænser – Expected Value (EV)
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            For at forstå, hvorfor spillegrænser er essentielle, er det vigtigt at forstå de matematiske realiteter bag casinospil. Expected Value (EV) beregner dit gennemsnitlige tab pr. indsats baseret på spillets house edge.
          </p>

          <Card className="border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                EV-beregning ved forskellige grænseniveauer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Forudsat en gennemsnitlig house edge på 3% (typisk for spillemaskiner med 97% RTP):
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 font-medium">Månedlig grænse</th>
                      <th className="text-right py-2 px-2 font-medium">Forventet tab/md</th>
                      <th className="text-right py-2 px-2 font-medium">Forventet tab/år</th>
                      <th className="text-left py-2 px-2 font-medium">Risikovurdering</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    {[
                      { limit: "500 kr.", monthly: "15 kr.", yearly: "180 kr.", risk: "Lav", color: "text-green-500" },
                      { limit: "1.000 kr.", monthly: "30 kr.", yearly: "360 kr.", risk: "Lav-Moderat", color: "text-green-500" },
                      { limit: "2.500 kr.", monthly: "75 kr.", yearly: "900 kr.", risk: "Moderat", color: "text-yellow-500" },
                      { limit: "5.000 kr.", monthly: "150 kr.", yearly: "1.800 kr.", risk: "Høj", color: "text-orange-500" },
                      { limit: "10.000 kr.", monthly: "300 kr.", yearly: "3.600 kr.", risk: "Meget høj", color: "text-destructive" },
                    ].map((row) => (
                      <tr key={row.limit} className="border-b border-border/50">
                        <td className="py-2 px-2 font-medium">{row.limit}</td>
                        <td className="text-right py-2 px-2">{row.monthly}</td>
                        <td className="text-right py-2 px-2">{row.yearly}</td>
                        <td className={`py-2 px-2 font-medium ${row.color}`}>{row.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">
                * Beregningen forudsætter, at hele det indsatte beløb gennemspilles én gang. I praksis varierer resultatet afhængigt af spilletype, sessionslængde og volatilitet. Se vores{" "}
                <Link to="/ordbog/expected-value" className="text-primary underline hover:text-primary/80">Expected Value-definition</Link>{" "}
                for mere om EV-beregninger.
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground leading-relaxed">
            Disse tal illustrerer en fundamental sandhed: huset har altid en matematisk fordel, og på lang sigt vil de fleste spillere tabe. Spillegrænser sikrer, at dette tab forbliver inden for rammer, du selv har defineret og har råd til. Jo lavere din grænse, desto mere kontrol har du over dit forbrug.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── Praktiske tips ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Praktiske tips til at sætte effektive grænser
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            At sætte en grænse er det første skridt – men at holde sig til den kræver en bevidst strategi. Her er vores anbefalinger baseret på bedste praksis og forskning i adfærdspsykologi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Wallet,
                title: "Budgetregel: 5-10%",
                desc: "Sæt din månedlige indbetalingsgrænse til maksimalt 5-10% af din disponible indkomst efter faste udgifter. Hvis du har 5.000 kr. til overs, bør din grænse være 250-500 kr.",
              },
              {
                icon: Clock,
                title: "Sæt tidsgrænse FØR du spiller",
                desc: "Beslut dig for en tidsramme, inden du logger ind. Når tiden er udløbet, stopper du – uanset om du vinder eller taber. Brug casinoets sessionsgrænse.",
              },
              {
                icon: Calculator,
                title: "Spor dit forbrug",
                desc: "Hold en simpel log over dine indbetalinger og udbetalinger. Mange casinoer tilbyder forbrugsrapporter – brug dem aktivt til at evaluere dine spillevaner.",
              },
              {
                icon: Ban,
                title: "Aldrig jag tab",
                desc: "Hvis du rammer din grænse, er det et signal om at stoppe. At forsøge at vinde tabet tilbage (chasing) er den mest almindelige årsag til spilleproblemer.",
              },
              {
                icon: Users,
                title: "Involver en pårørende",
                desc: "Fortæl en person du stoler på, om dine grænser. Ansvarlighed overfor andre er en stærk motivator for at holde sig inden for rammerne.",
              },
              {
                icon: Shield,
                title: "Brug flere grænsetyper",
                desc: "Kombinér indbetalingsgrænse med tidsgrænse og reality checks for den mest effektive beskyttelse. Én grænse alene er sjældent nok.",
              },
            ].map((tip) => (
              <Card key={tip.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <tip.icon className="h-5 w-5 text-primary" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* ── Grænser for pårørende ── */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Information til pårørende
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hvis du er pårørende til en person med spilleproblemer, er grænseværktøjer et vigtigt samtaleemne. Her er hvad du bør vide:
          </p>
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            {[
              "Du kan ikke sætte grænser på en andens konto – det kræver spillerens egne login-oplysninger",
              "Du kan opfordre til ROFUS-tilmelding, som udelukker fra alle danske casinoer – læs vores ROFUS-guide",
              "Kontakt StopSpillet (70 22 28 25) for rådgivning specifikt rettet mod pårørende",
              "Center for Ludomani tilbyder gratis familierådgivning og parterapi i forbindelse med spilleproblemer",
              "Undgå at overtage kontrollen – støt i stedet spilleren i selv at tage ansvar for sine grænser",
              "Vær opmærksom på tegn som hemmeligholdelse, lån, og ændringer i humør eller økonomi",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Læs mere i vores{" "}
            <Link to="/ansvarligt-spil/ludomani" className="text-primary underline hover:text-primary/80">guide til ludomani</Link>{" "}
            og{" "}
            <Link to="/ansvarligt-spil/hjaelpelinjer" className="text-primary underline hover:text-primary/80">oversigt over hjælpelinjer</Link>{" "}
            for pårørende.
          </p>
        </section>

        <Separator className="my-10" />

        {/* ── CTA ── */}
        <section className="mb-12">
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="mb-4 text-xl font-bold">Har du brug for hjælp?</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Spillegrænser er et stærkt værktøj, men hvis du oplever, at du har svært ved at overholde dem, er det et tegn på, at du bør søge professionel hjælp. Der er ingen skam i at bede om støtte – det er et tegn på styrke.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <a href="tel:70222825">
                    <Phone className="mr-2 h-4 w-4" />
                    Ring StopSpillet: 70 22 28 25
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.spillemyndigheden.dk/rofus" target="_blank" rel="noopener noreferrer">
                    <Shield className="mr-2 h-4 w-4" />
                    Tilmeld dig ROFUS
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* ── Hub-links ── */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Udforsk mere om ansvarligt spil</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Spillegrænser er ét element i en bredere strategi for ansvarligt spil. Udforsk vores andre guides for at lære mere om selvudelukkelse, hjælpelinjer og spillerbeskyttelse.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { to: "/ansvarligt-spil", title: "Ansvarligt Spil", desc: "Komplet guide til ansvarligt casinospil" },
              { to: "/ansvarligt-spil/rofus", title: "ROFUS Guide", desc: "Alt om selvudelukkelse via ROFUS" },
              { to: "/ansvarligt-spil/selvudelukkelse-guide", title: "Selvudelukkelse Guide", desc: "Alle former for selvudelukkelse i Danmark" },
              { to: "/ansvarligt-spil/ludomani", title: "Ludomani Guide", desc: "Alt om spilleafhængighed i Danmark" },
              { to: "/ansvarligt-spil/stopspillet", title: "StopSpillet Guide", desc: "Gratis rådgivning for spillere" },
              { to: "/ansvarligt-spil/hjaelpelinjer", title: "Hjælpelinjer", desc: "Alle danske hjælpemuligheder samlet" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-muted"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <LatestNewsByCategory pagePath="/ansvarligt-spil/spillegraenser" />
        <RelatedGuides currentPath="/ansvarligt-spil/spillegraenser" />
        <FAQSection title="Ofte Stillede Spørgsmål om Spillegrænser" faqs={spillegraenserFaqs} />
        <AuthorBio author="ajse" showCommunity={false} />
      </div>
    </>
  );
};

export default SpillegraenserGuide;
