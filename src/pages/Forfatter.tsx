import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { FAQSection } from "@/components/FAQSection";
import { CasinoCard } from "@/components/CasinoCard";
import { useCasinos } from "@/hooks/useCasinos";
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
  ShieldCheck,
  Landmark,
  Phone,
  Play,
} from "lucide-react";
import jonasImage from "@/assets/jonas-forfatter.png";

const FEATURED_SLUGS = ["spildansknu", "spilleautomaten", "campobet"];

const casinoDescriptions: Record<string, { title: string; text: string; link: string }> = {
  spildansknu: {
    title: "SpilDanskNu",
    text: "SpilDanskNu er et af de mest populære danske online casinoer med et stærkt fokus på det danske marked. Med en dansk licens og et bredt udvalg af spilleautomater, bordspil og live casino tilbyder de en tryg og underholdende spiloplevelse. Deres lave omsætningskrav på kun 10x gør dem til et oplagt valg for danske spillere.",
    link: "/spildansknu-anmeldelse",
  },
  spilleautomaten: {
    title: "Spilleautomaten",
    text: "Spilleautomaten er kendt for sit enorme spiludvalg og hurtige udbetalinger. Med over 3.000 spil fra førende udbydere som NetEnt, Pragmatic Play og Play'n GO er der altid noget nyt at udforske. Casinoet tilbyder en generøs velkomstbonus og en brugervenlig platform, der fungerer perfekt på både desktop og mobil.",
    link: "/spilleautomaten-anmeldelse",
  },
  campobet: {
    title: "Campobet",
    text: "Campobet kombinerer casino og sportsbetting under ét tag, hvilket gør det til et alsidigt valg for spillere, der gerne vil have det hele samlet. Med en dansk licens, konkurrencedygtige bonusser og et solidt live casino-udbud leverer Campobet en komplet spiloplevelse til danske spillere.",
    link: "/campobet-anmeldelse",
  },
};

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

const relatedLinks = [
  { to: "/about", label: "Om Os", icon: Users, desc: "Læs mere om holdet bag Casinoaftaler.dk" },
  { to: "/contact", label: "Kontakt", icon: Phone, desc: "Kontakt os med spørgsmål eller feedback" },
  { to: "/responsible-gaming", label: "Ansvarligt Spil", icon: ShieldCheck, desc: "Spil sikkert og ansvarligt" },
  { to: "/spillemyndigheden", label: "Spillemyndigheden", icon: Landmark, desc: "Danmarks tilsynsmyndighed for spil" },
];

export default function Forfatter() {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const heroBackgroundImage = siteSettings?.hero_background;

  const featuredCasinos = (casinos ?? []).filter((c) =>
    FEATURED_SLUGS.includes(c.slug)
  );

  const mapCasino = (casino: (typeof featuredCasinos)[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: Number(casino.rating),
    bonusTitle: casino.bonus_title,
    bonusAmount: casino.bonus_amount,
    bonusType: casino.bonus_type,
    wageringRequirements: casino.wagering_requirements,
    validity: casino.validity,
    minDeposit: casino.min_deposit,
    payoutTime: casino.payout_time,
    freeSpins: casino.free_spins,
    features: casino.features ?? [],
    pros: casino.pros ?? [],
    cons: casino.cons ?? [],
    description: casino.description ?? "",
    isRecommended: casino.is_recommended,
    isHot: casino.is_hot,
    logoUrl: casino.logo_url,
    affiliateUrl: casino.affiliate_url,
    gameProviders: casino.game_providers ?? [],
  });

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

        {/* Jonas Top 3 Casinoer */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Jonas Top 3 Casinoer</h3>
          {featuredCasinos.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {featuredCasinos.map((casino, index) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={index + 1}
                    open={openCasinoId === casino.id}
                    onOpenChange={(open) =>
                      setOpenCasinoId(open ? casino.id : null)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* SEO casino descriptions */}
          <div className="mt-8 space-y-6">
            {FEATURED_SLUGS.map((slug) => {
              const desc = casinoDescriptions[slug];
              if (!desc) return null;
              return (
                <div key={slug}>
                  <h4 className="text-lg font-semibold mb-2">
                    <Link to={desc.link} className="text-primary hover:underline">
                      {desc.title}
                    </Link>
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{desc.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Bedste Highlights fra Jonas */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Play className="h-7 w-7 text-primary" />
            Bedste Highlights fra Jonas
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Se nogle af Jonas' mest ikoniske øjeblikke fra hans casino-streams – store gevinster, sjove reaktioner og ren underholdning.
          </p>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/tWTMTXdrr1I?start=14"
                title="Jonas' bedste highlights – Casinoaftaler.dk"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Relaterede Guides – manual links */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            <BookOpen className="mr-2 inline h-7 w-7 text-primary" />
            Relaterede Guides
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Udforsk mere om holdet bag Casinoaftaler.dk og ansvarligt spil.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
              >
                <link.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">{link.label}</h3>
                  <p className="text-xs text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <FAQSection title="Ofte stillede spørgsmål om Jonas" faqs={faqs} />
      </div>
    </>
  );
}
