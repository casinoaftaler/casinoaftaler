import responsibleGamingHero from "@/assets/heroes/responsible-gaming-hero.jpg";
import { AlertTriangle, Phone, Globe, HelpCircle, Shield, Clock, Users, User, CalendarDays, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { RelatedGuides } from "@/components/RelatedGuides";
import { FAQSection } from "@/components/FAQSection";
import { SEO } from "@/components/SEO";
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

const responsibleGamingFaqs = [
  {
    question: "Hvad er ROFUS, og hvordan tilmelder jeg mig?",
    answer: "ROFUS (Register Over Frivilligt Udelukkede Spillere) er en dansk ordning, hvor du kan udelukke dig selv fra alle licenserede online casinoer i Danmark. Du tilmelder dig via spillemyndigheden.dk med dit MitID. Du kan vælge udelukkelse i 24 timer, 1 måned, 3 måneder, 6 måneder eller permanent.",
  },
  {
    question: "Hvordan sætter jeg indbetalingsgrænser på mit casino?",
    answer: "De fleste danske casinoer tilbyder indbetalingsgrænser under dine kontoindstillinger. Du kan typisk sætte daglige, ugentlige og månedlige grænser. Kontakt casinoets kundeservice, hvis du har brug for hjælp til at finde funktionen.",
  },
  {
    question: "Hvad gør jeg, hvis jeg tror, en ven eller et familiemedlem har spilleproblemer?",
    answer: "Kontakt StopSpillet (stopspillet.dk) for gratis og fortrolig rådgivning. De hjælper både spillere og pårørende. Du kan også ringe til dem anonymt. Det vigtigste er at vise forståelse og ikke dømme personen.",
  },
  {
    question: "Er der gratis hjælp til spilleproblemer i Danmark?",
    answer: "Ja, Center for Ludomani tilbyder gratis behandling og rådgivning i hele Danmark. StopSpillet tilbyder også gratis telefonisk rådgivning. Begge tjenester er fortrolige og tilgængelige for alle.",
  },
];

const ResponsibleGaming = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: responsibleGamingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Ansvarligt Spil – Hjælp og Ressourcer",
    description: "Lær om ansvarligt spil. Find advarselstegn, tips til at bevare kontrollen, selvudelukkelse via ROFUS og hjælp fra StopSpillet og Center for Ludomani.",
    author: { "@type": "Organization", name: "Casinoaftaler" },
    publisher: { "@type": "Organization", name: "Casinoaftaler" },
    datePublished: "2025-06-01",
    dateModified: "2026-02-14",
    mainEntityOfPage: "https://casinoaftaler.dk/responsible-gaming",
  };

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
              <span className="font-medium text-foreground">14-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid:{" "}
              <span className="font-medium text-foreground">5 Min.</span>
            </span>
          </div>
        </div>

        <div className="mb-10 overflow-hidden rounded-xl">
          <img src={responsibleGamingHero} alt="Ansvarligt spil – tillid og sikkerhed ved casinospil" className="w-full h-auto object-cover max-h-[400px]" loading="eager" />
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

        <RelatedGuides currentPath="/responsible-gaming" />
      </div>
    </>
  );
};

export default ResponsibleGaming;
