import React from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import responsibleGamingHero from "@/assets/heroes/responsible-gaming-hero.jpg";
import { AlertTriangle, Phone, Globe, HelpCircle, Shield, Clock, Users, User, CalendarDays, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { AuthorBio } from "@/components/AuthorBio";
import { RelatedGuides } from "@/components/RelatedGuides";
import { LatestNewsByCategory } from "@/components/LatestNewsByCategory";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, buildArticleSchema, SITE_URL } from "@/lib/seo";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const warningSignItems = [
  "Bruger flere penge, end du har råd til at tabe",
  "Jager tab ved at spille for mere for at vinde det tabte tilbage",
  "Låner penge eller sælger ejendele for at spille",
  "Forsømmer arbejde, familie eller andre ansvar",
  "Føler dig ængstelig, deprimeret eller irritabel, når du ikke spiller",
  "Skjuler dine spilleaktiviteter for familie og venner",
];

const tipCards = [
  {
    icon: Clock,
    title: "Sæt Tidsgrænser",
    description: "Beslut, hvor længe du vil spille, før du starter. Brug casinoets påmindelser om sessionstid og hold dig til din grænse.",
  },
  {
    icon: Shield,
    title: "Sæt Budgetgrænser",
    description: "Spil kun med penge, du har råd til at tabe. Sæt indbetalingsgrænser og forsøg aldrig at vinde tab tilbage.",
  },
  {
    icon: Users,
    title: "Tal med Nogen",
    description: "Hvis du er bekymret over dit spil, så tal med venner, familie eller professionelle støttetjenester.",
  },
];

const helpResources = [
  {
    icon: Globe,
    title: "StopSpillet",
    description: "Gratis, fortrolig hjælp og støtte til alle, der er bekymrede over deres eget eller andres spil.",
    url: "https://www.stopspillet.dk/",
  },
  {
    icon: Phone,
    title: "ROFUS",
    description: "Register Over Frivilligt Udelukkede Spillere. Udeluk dig selv fra alle danske online casinoer.",
    url: "https://www.spillemyndigheden.dk/rofus",
  },
  {
    icon: HelpCircle,
    title: "Ludomani",
    description: "Center for Ludomani tilbyder gratis behandling og rådgivning til personer med spilleproblemer.",
    url: "https://ludomani.dk/",
  },
];

const responsibleGamingFaqs: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Hvad er ROFUS præcist, og hvad sker der teknisk, når jeg tilmelder mig?",
    answer: (
      <>
        ROFUS (Register Over Frivilligt Udelukkede Spillere) er en centraliseret database administreret af{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">Spillemyndigheden</Link>, som alle danske licenserede casinoer er lovpligtige at konsultere i realtid. Tilmelding sker via spillemyndigheden.dk med dit MitID. Inden for 24 timer blokeres din adgang til alle licenserede online casinoer, væddemålssider og fysiske casinoer i Danmark. Du vælger mellem midlertidig udelukkelse (24 timer, 1 måned, 3 måneder, 6 måneder eller 1 år) eller permanent udelukkelse. Permanent udelukkelse kan tidligst ophæves efter 1 år med en obligatorisk afkølingsperiode på 7 dage. ROFUS dækker kun licenserede danske operatører – ulicenserede sider er ikke tilsluttet.
      </>
    ),
  },
  {
    question: "Hvordan sætter jeg indbetalingsgrænser, og kan casinoet ændre dem?",
    answer:
      "Alle danske licenserede casinoer tilbyder indbetalingsgrænser under kontoindstillinger – typisk kan du sætte daglige, ugentlige og månedlige lofter. Nedsættelse af en grænse træder i kraft øjeblikkeligt for at beskytte dig, mens forhøjelse kræver en lovpligtig afkølingsperiode på minimum 24 timer. Casinoet kan aldrig forhøje dine grænser uden din aktive godkendelse. Spillemyndigheden kræver desuden, at casinoer sætter en default indbetalingsgrænse for nye spillere. Mange casinoer tilbyder også tabsgrænser og sessionstidsadvarsler. Vi anbefaler altid at sætte en grænse, der matcher dit underholdningsbudget – betragt det som en biograf- eller koncertudgift.",
  },
  {
    question: "Hvad gør jeg, hvis jeg er bekymret for en vens eller familiemedlems spillevaner?",
    answer:
      "Kontakt StopSpillet (stopspillet.dk / tlf. 70 22 28 25) for gratis, fortrolig rådgivning – de hjælper både spillere og pårørende. Det vigtigste er at vise forståelse uden at dømme. Undgå ultimatummer eller beskyldninger, da det ofte forstærker skam og hemmeligholdelse. Konkrete tegn at være opmærksom på inkluderer: uforklarlige økonomiske problemer, humørsvingninger knyttet til spilresultater, social tilbagetrækning og løgne om tidsforbrugt online. Center for Ludomani (ludomani.dk) tilbyder gratis behandlingsprogrammer for hele familien. Du kan ikke tvinge nogen til at stoppe, men du kan skabe et miljø, hvor det er sikkert at bede om hjælp.",
  },
  {
    question: "Hvilke gratis behandlingsmuligheder findes der for spilleproblemer i Danmark?",
    answer:
      "Center for Ludomani tilbyder gratis, professionel behandling i hele Danmark – både individuel terapi, gruppeterapi og online-rådgivning. Behandlingen er baseret på kognitiv adfærdsterapi og har dokumenteret høj succesrate. StopSpillet tilbyder telefonisk rådgivning (70 22 28 25) og chat-rådgivning med uddannede konsulenter. Kommunerne kan desuden tilbyde gratis misbrugsbehandling via visitering. Anonyme Gamblere (AG) holder regelmæssige møder i flere danske byer med 12-trinsprogrammet. Alle tjenester er 100 % fortrolige. Ventetiden varierer, men akut rådgivning er typisk tilgængelig inden for 1–3 hverdage.",
  },
  {
    question: "Hvad er de psykologiske mekanismer bag problematisk spil?",
    answer:
      "Problematisk spil aktiverer hjernens belønningssystem via dopaminfrigivelse – den samme mekanisme, der driver andre afhængigheder. Nær-vinst-effekten (near miss) er særligt kraftfuld: hjernens reaktion på et næsten-vinst er næsten identisk med en reel gevinst, hvilket motiverer fortsat spil. Intermitterende forstærkning – uforudsigelige gevinster i tilfældige intervaller – skaber den stærkeste vanedannende adfærd. Tabsjagt (chasing losses) er drevet af tapsaversion, et kognitivt bias hvor tab føles ca. 2x stærkere end tilsvarende gevinster. Forståelse af disse mekanismer er første skridt mod at genkende, hvornår spil overgår fra underholdning til problem.",
  },
  {
    question: "Hvad er forskellen på sundt spil og problematisk spil?",
    answer: (
      <>
        Sundt spil er kendetegnet ved: et forudbestemt budget du overholder, tidsgrænser du respekterer, accept af tab som prisen for underholdning, og glæde ved selve spillet uanset resultat. Problematisk spil viser sig ved: jagt på tab, budgetoverskridelser, skjult spil for familie, lån til spil, forsømmelse af ansvar og humørsvingninger knyttet til resultater. Overgangen er ofte gradvis – mange spillere erkender først problemet, når de økonomiske konsekvenser er alvorlige. Hvis du genkender tre eller flere af advarselstegnene ovenfor, anbefaler vi at kontakte StopSpillet for en fortrolig samtale. Læs også om{" "}
        <Link to="/spillemyndigheden" className="text-primary underline hover:text-primary/80">Spillemyndighedens</Link> spillerbeskyttelsestiltag.
      </>
    ),
  },
];

const ResponsibleGaming = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = buildFaqSchema(responsibleGamingFaqs);

  const articleJsonLd = buildArticleSchema({
    headline: "Ansvarligt Spil – Hjælp og Ressourcer",
    description: "Lær om ansvarligt spil. Find advarselstegn, tips til at bevare kontrollen, selvudelukkelse via ROFUS og hjælp fra StopSpillet og Center for Ludomani.",
    url: `${SITE_URL}/ansvarligt-spil`,
    datePublished: "2025-06-01",
    dateModified: "2026-02-26",
    authorName: "Ajse",
    authorUrl: `${SITE_URL}/forfatter/ajse`,
  });

  return (
    <>
      <SEO
        title="Ansvarligt Spil – Hjælp og Ressourcer | Casinoaftaler"
        description="Lær om ansvarligt spil. Find advarselstegn, tips til at bevare kontrollen, selvudelukkelse via ROFUS og hjælp fra StopSpillet og Center for Ludomani."
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
              <Shield className="mr-1.5 h-3.5 w-3.5" />
              Ansvarligt Spil
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Ansvarligt Spil
            </h1>
            <p className="text-lg text-white/80">
              Spil bør være sjovt og underholdende. Hvis det holder op med at være
              fornøjeligt, er det tid til at stoppe.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" date="26-02-2026" readTime="8 Min." />
        <p className="text-sm text-muted-foreground mt-2 mb-6">Juridisk gennemgået og opdateret af Ajse, juridisk redaktør hos Casinoaftaler.dk.</p>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={responsibleGamingHero} alt="Ansvarligt spil – tillid og sikkerhed ved casinospil" width={1920} height={600} className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
        </div>

        {/* Warning Signs */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            Advarselstegn på Problematisk Spil
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Det er vigtigt at kende advarselstegnene på problematisk spilleadfærd. Hvis du genkender et eller flere af følgende tegn hos dig selv eller en person tæt på dig, bør du søge hjælp.
          </p>
          <Card className="border-destructive/30">
            <CardContent className="pt-6">
              <ul className="space-y-3 text-muted-foreground">
                {warningSignItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        {/* Tips Grid */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Tips til at Bevare Kontrollen
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Her er nogle praktiske råd, der kan hjælpe dig med at holde dit spil sundt og kontrolleret.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tipCards.map((tip) => (
              <Card key={tip.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <tip.icon className="h-5 w-5 text-primary" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Self-Exclusion */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Selvudelukkelsesmuligheder</h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Hvis du har brug for en pause fra spil, tilbyder de fleste anerkendte
            online casinoer selvudelukkelsesmuligheder. Du kan typisk:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Tage en afkølingsperiode (24 timer til 30 dage)",
              "Selvudelukke i en længere periode (6 måneder til 5 år)",
              "Permanent lukke din konto",
              "Bruge nationale selvudelukkelsesordninger som ROFUS (Danmark)",
            ].map((item, i) => (
              <Card key={i} className="border-border bg-card">
                <CardContent className="flex items-center gap-3 pt-6">
                  <Shield className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Kontakt casinoets kundesupport for at lære om deres specifikke
            værktøjer og muligheder for ansvarligt spil. Læs mere om dansk spilleregulering på vores <Link to="/spillemyndigheden" className="text-primary hover:underline font-medium">guide til Spillemyndigheden</Link>.
          </p>
        </section>

        <InlineCasinoCards title="Casinoer med ansvarligt spil-værktøjer" />

        <Separator className="my-10" />

        {/* Help Resources */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Få Hjælp & Støtte
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Der findes flere danske organisationer, der tilbyder gratis og fortrolig hjælp til personer med spilleproblemer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {helpResources.map((resource) => (
              <Card key={resource.title} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <resource.icon className="h-5 w-5 text-primary" />
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                    {resource.description}
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Besøg Hjemmeside
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Final Message */}
        <section className="mb-12">
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="mb-4 text-xl font-bold">Husk</h3>
              <p className="text-muted-foreground leading-relaxed">
                Spil bør altid være en form for underholdning, ikke en måde at
                tjene penge på. Huset har altid en fordel, og på lang sigt vil de
                fleste spillere tabe. Hvis spil nogensinde holder op med at være
                sjovt, så tag en pause. Der er ingen skam i at bede om hjælp.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10" />

        <FAQSection title="Ofte Stillede Spørgsmål om Ansvarligt Spil" faqs={responsibleGamingFaqs} />

        <AuthorBio author="ajse" showCommunity={false} />

        <LatestNewsByCategory pagePath="/ansvarligt-spil" />

        <RelatedGuides currentPath="/ansvarligt-spil" />
      </div>
    </>
  );
};

export default ResponsibleGaming;
