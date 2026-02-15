import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Users,
  Target,
  Shield,
  CheckCircle2,
  Search,
  RefreshCw,
  Scale,
  Eye,
  Heart,
  Sparkles,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Gamepad2,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import jonasImage from "@/assets/jonas-forfatter.png";
import kevinImage from "@/assets/kevin-forfatter.png";
import { RelatedGuides } from "@/components/RelatedGuides";

const OmTeamet = () => {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Casinoaftaler.dk",
    url: "https://casinoaftaler.dk",
    description:
      "Casinoaftaler.dk drives af et dedikeret team af aktive casino-streamere og content-specialister med praktisk erfaring fra det danske online casinomarked.",
    foundingDate: "2024",
    member: [
      {
        "@type": "Person",
        name: "Jonas",
        jobTitle: "Grundlægger & Indholdsansvarlig",
        url: "https://casinoaftaler.dk/forfatter",
        sameAs: ["https://www.twitch.tv/fedesvinansen"],
      },
      {
        "@type": "Person",
        name: "Kevin",
        jobTitle: "Casino-streamer & IT Medansvarlig",
        url: "https://casinoaftaler.dk/forfatter/kevin",
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: "https://casinoaftaler.dk/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Om Teamet",
        item: "https://casinoaftaler.dk/om-teamet",
      },
    ],
  };

  const missionPoints = [
    {
      icon: CheckCircle2,
      text: "At give ærlige og opdaterede anmeldelser",
    },
    {
      icon: Search,
      text: "At teste casinoer systematisk",
    },
    {
      icon: Heart,
      text: "At skabe et engageret community",
    },
    {
      icon: Sparkles,
      text: "At kombinere streaming og ekspertise",
    },
  ];

  const workMethods = [
    { icon: Gamepad2, text: "Vi tester casinoer praktisk" },
    { icon: RefreshCw, text: "Vi opdaterer bonusser løbende" },
    { icon: Search, text: "Vi analyserer vilkår" },
    { icon: Eye, text: "Vi prioriterer gennemsigtighed" },
    { icon: Scale, text: "Vi adskiller kommercielle samarbejder fra vurdering" },
  ];



  return (
    <>
      <SEO
        title="Om teamet bag Casinoaftaler.dk | Streamere & Casinoeksperter"
        description="Mød teamet bag Casinoaftaler.dk. Læs om Jonas og Kevin – casino-streamere og medansvarlige for test, anmeldelser og udvikling."
        jsonLd={[organizationJsonLd, breadcrumbJsonLd]}
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
              <Users className="mr-1.5 h-3.5 w-3.5" />
              Om Teamet
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Teamet bag Casinoaftaler.dk
            </h1>
            <p className="text-lg text-white/80">
              Casinoaftaler.dk drives af et dedikeret team af aktive casino-streamere og
              content-specialister med praktisk erfaring fra det danske online casinomarked.
            </p>
            <p className="mt-3 text-white/70">
              Vores mål er at skabe gennemsigtighed, troværdighed og et stærkt community
              omkring online casino i Danmark.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Vores mission */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Target className="h-7 w-7 text-primary" />
            Vores mission
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vi arbejder hver dag for at gøre det nemmere og sikrere for danske spillere at navigere
            i verden af online casino. Vores tilgang bygger på reel erfaring, systematisk testning
            og et stærkt fokus på gennemsigtighed.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {missionPoints.map((point) => (
              <div
                key={point.text}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
              >
                <point.icon className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm font-medium">{point.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/saadan-tester-vi-casinoer">
              <Button variant="outline" size="sm">
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Sådan tester vi casinoer
              </Button>
            </Link>
            <Link to="/nye-casinoer">
              <Button variant="outline" size="sm">
                <Sparkles className="mr-1.5 h-4 w-4" />
                Nye Casinoer
              </Button>
            </Link>
            <Link to="/responsible-gaming">
              <Button variant="outline" size="sm">
                <Shield className="mr-1.5 h-4 w-4" />
                Ansvarligt Spil
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Mød teamet */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Mød teamet
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Jonas */}
            <Card className="border-border bg-card overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/30">
                    <img
                      src={jonasImage}
                      alt="Jonas – Grundlægger af Casinoaftaler.dk"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Jonas</CardTitle>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-xs">Grundlægger</Badge>
                      <Badge variant="secondary" className="text-xs">Casino-streamer</Badge>
                      <Badge variant="secondary" className="text-xs">Indholdsansvarlig</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Grundlægger af Casinoaftaler.dk og casino-streamer med over 4 års erfaring.
                  Ansvarlig for strategi, test og community.
                </p>
                <Link to="/forfatter">
                  <Button variant="outline" size="sm" className="w-full">
                    Se Jonas' fulde profil
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Kevin */}
            <Card className="border-border bg-card overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary/30">
                    <img
                      src={kevinImage}
                      alt="Kevin – Casino-streamer & IT Medansvarlig"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Kevin</CardTitle>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-xs">Casino-streamer</Badge>
                      <Badge variant="secondary" className="text-xs">IT Medansvarlig</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Casino-streamer med 3+ års erfaring og medansvarlig for udvikling og optimering
                  af platformen. Baggrund i professionel content creation og gaming.
                </p>
                <Link to="/forfatter/kevin">
                  <Button variant="outline" size="sm" className="w-full">
                    Se Kevins fulde profil
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Sådan arbejder vi */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Sådan arbejder teamet
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vores arbejdsproces er designet til at sikre, at alle anmeldelser og anbefalinger
            bygger på reel test og dokumenteret vurdering.
          </p>
          <div className="space-y-3">
            {workMethods.map((method) => (
              <div
                key={method.text}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4"
              >
                <method.icon className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="font-medium">{method.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link to="/saadan-tester-vi-casinoer">
              <Button variant="outline" size="sm">
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Læs mere om vores testmetode
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Transparens & ansvar */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            Transparens & ansvar
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Casinoaftaler.dk modtager kommission gennem affiliate-samarbejder med udvalgte casinoer.
            Dette påvirker dog ikke vores vurderingsmetode, som bygger på faste kriterier og reel test.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Vi mener, at gennemsigtighed er fundamentet for tillid. Derfor adskiller vi altid
            kommercielle samarbejder fra vores redaktionelle vurderinger, og vi oplyser tydeligt
            om alle bonusvilkår og betingelser.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/responsible-gaming">
              <Button variant="outline" size="sm">
                <Shield className="mr-1.5 h-4 w-4" />
                Ansvarligt Spil
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="sm">
                <Users className="mr-1.5 h-4 w-4" />
                Kontakt os
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Relaterede guides */}
        <RelatedGuides currentPath="/om-teamet" />
      </div>
    </>
  );
};

export default OmTeamet;
