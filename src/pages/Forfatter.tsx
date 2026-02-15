import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { InlineCasinoCards } from "@/components/InlineCasinoCards";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  CalendarDays,
  BookOpen,
  Gamepad2,
  Star,
  Tv,
  Heart,
  Zap,
  Trophy,
  Users,
  MapPin,
} from "lucide-react";
import jonasImage from "@/assets/jonas-forfatter.png";

const faqs = [
  {
    question: "Hvem er Jonas / Fedesvinsejer?",
    answer:
      "Jonas er grundlæggeren af Casinoaftaler.dk og en dansk casino-streamer på Twitch. Han er kendt for sin energiske streamingstil, sit engagerede community og sin kat Fedesvin.",
  },
  {
    question: "Hvornår streamer Jonas?",
    answer:
      "Jonas streamer primært om aftenen fra kl. 20-21 og frem på Twitch. Hold øje med kanalen for de nyeste opdateringer.",
  },
  {
    question: "Hvad er Jonas' største gevinst?",
    answer:
      "Jonas' største slotgevinst er 12.278x på Sugar Rush 1000 – et øjeblik der er blevet legendarisk i community'et.",
  },
  {
    question: "Hvilke casinoer anbefaler Jonas?",
    answer:
      "Jonas foretrækker casinoer med no-sticky bonusser og et bredt spiludvalg. Se hans anbefalinger direkte her på Casinoaftaler.dk.",
  },
];

export default function Forfatter() {
  const { data: siteSettings } = useSiteSettings();
  const heroBackgroundImage = siteSettings?.hero_background;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Jonas – Forfatter & Grundlægger | Casinoaftaler.dk"
        description="Mød Jonas, grundlæggeren af Casinoaftaler.dk og casino-streamer på Twitch. Læs om hans baggrund, streamingstil og passion for casinospil."
        jsonLd={faqJsonLd}
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
              <User className="mr-1.5 h-3.5 w-3.5" />
              Forfatter
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Jonas – Fedesvinsejer
            </h1>
            <p className="text-lg text-white/80">
              Grundlægger af Casinoaftaler.dk, casino-streamer og community-skaber
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Meta bar */}
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>
              Skrevet af:{" "}
              <span className="font-medium text-foreground">Casinoaftaler Redaktionen</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>
              Opdateret: <span className="font-medium text-foreground">15-02-2026</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" />
            <span>
              Læsetid: <span className="font-medium text-foreground">5 Min.</span>
            </span>
          </div>
        </div>

        {/* Profile card */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={jonasImage}
                alt="Jonas – Fedesvinsejer, grundlægger af Casinoaftaler.dk"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-lg"
                loading="eager"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Om Jonas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Alder</p>
                    <p className="text-sm font-medium">30 år</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Bopæl</p>
                    <p className="text-sm font-medium">Danmark</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Star className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Yndlingsslot</p>
                    <p className="text-sm font-medium">Wanted Dead & Alive</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Trophy className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Største gevinst</p>
                    <p className="text-sm font-medium">12.278x</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Heart className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Yndlingsmad</p>
                    <p className="text-sm font-medium">Skyr & Pizza</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Tv className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Platform</p>
                    <p className="text-sm font-medium">Twitch</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Jonas, bedre kendt som <strong>Fedesvinsejer</strong>, er grundlæggeren af Casinoaftaler.dk og en af Danmarks mest engagerende casino-streamere. 
                Med sin åbne stil, smittende energi og humor har han opbygget et aktivt og loyalt community, 
                der deler hans passion for casinospil og underholdning.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Background */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Baggrund og Motivation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Jonas begyndte sin rejse som casino-streamer i maj 2022, hvor han sammen med sin ven Peter startede kanalen JPLiveslots. 
            På kort tid blev de én af Danmarks mest populære casino-kanaler på Twitch. Siden da har Jonas udviklet sin egen platform, 
            Casinoaftaler.dk, for at give danske spillere et pålideligt og gennemsigtigt sted at finde de bedste casino-tilbud og anmeldelser.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Med Casinoaftaler.dk ønsker Jonas at kombinere sin viden om casinobranchen med sin streamingerfaring 
            for at skabe en unik oplevelse, der både underholder og informerer. Hver anmeldelse og guide på sitet 
            er baseret på reel erfaring og grundig research.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Community & kendetegn */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Kendetegn og Fællesskab
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            En fast bestanddel af Jonas' streams er katten <strong>Fedesvin</strong>, der efterhånden har opnået kultstatus 
            blandt seerne – ofte er der flere spørgsmål om kattens velbefindende end om Jonas selv! 
            Fællesskabet er præget af humor, god stemning og en åben dialog, hvor der tales om alt 
            fra casinospil til hverdagens udfordringer.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tv className="h-4 w-4 text-primary" />
                  Streamingstil
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Energisk og underholdende bonus hunts med masser af interaktion. 
                Jonas streamer primært om aftenen fra kl. 20-21 og frem.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  Spillepræferencer
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Foretrækker{" "}
                <Link to="/no-sticky-bonus" className="text-primary hover:underline">
                  no-sticky bonusser
                </Link>{" "}
                og spiller udelukkende for underholdningens skyld.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Star className="h-4 w-4 text-primary" />
                  Esport-fan
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Stor fan af Esport – især Counter-Strike, hvor han følger stort set alle turneringer.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        <InlineCasinoCards title="Jonas' Anbefalede Casinoer" />

        <Separator className="my-10" />

        <RelatedGuides currentPath="/forfatter" />

        <FAQSection title="Ofte stillede spørgsmål om Jonas" faqs={faqs} />
      </div>
    </>
  );
}
