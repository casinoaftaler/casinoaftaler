import { useState } from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
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
} from "lucide-react";
import kevinImage from "@/assets/kevin-forfatter.png";

const FEATURED_SLUGS = ["betinia", "campobet", "spildansknu"];

const casinoDescriptions: Record<string, { title: string; link: string }> = {
  betinia: {
    title: "Betinia",
    link: "/betinia-anmeldelse",
  },
  campobet: {
    title: "Campobet",
    link: "/campobet-anmeldelse",
  },
  spildansknu: {
    title: "SpilDanskNu",
    link: "/spildansknu-anmeldelse",
  },
};

const faqs = [
  {
    question: "Hvem er Kevin?",
    answer:
      "Kevin er casino-streamer og medansvarlig hos Casinoaftaler.dk. Han har streamet slots i over 3 år og er kendt for sin rolige og afslappede stil.",
  },
  {
    question: "Hvad er Kevins rolle hos Casinoaftaler.dk?",
    answer:
      "Kevin er medansvarlig for hjemmesiden og dens udvikling, samtidig med at han streamer casino på Twitch. Han bidrager aktivt til indhold og community.",
  },
  {
    question: "Hvad er Kevins største gevinst?",
    answer:
      "Kevins største slotgevinst er 5.000x – en imponerende gevinst, der cementerede hans passion for online slots.",
  },
  {
    question: "Hvornår streamer Kevin?",
    answer:
      "Kevin streamer jævnligt på Twitch med fokus på rolige bonushunts og god musik. Hold øje med kanalen for opdateringer.",
  },
];

const relatedLinks = [
  { to: "/forfatter", label: "Jonas – Grundlægger", icon: User, desc: "Mød grundlæggeren af Casinoaftaler.dk" },
  { to: "/saadan-tester-vi-casinoer", label: "Sådan tester vi", icon: ShieldCheck, desc: "Vores testmetoder og vurderingskriterier" },
  { to: "/nye-casinoer", label: "Nye Casinoer", icon: Star, desc: "De nyeste danske online casinoer" },
  { to: "/responsible-gaming", label: "Ansvarligt Spil", icon: Landmark, desc: "Spil sikkert og ansvarligt" },
];

export default function ForfatterKevin() {
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

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kevin",
    jobTitle: "Casino-streamer & Medansvarlig",
    worksFor: {
      "@type": "Organization",
      name: "Casinoaftaler.dk",
      url: "https://casinoaftaler.dk",
    },
    url: "https://casinoaftaler.dk/forfatter/kevin",
    sameAs: [],
    knowsAbout: ["Online Casino", "Slots", "Casino Streaming", "No-Sticky Bonus"],
  };

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
        title="Kevin – Casino-streamer & Medansvarlig | Casinoaftaler.dk"
        description="Mød Kevin – casino-streamer med 3 års erfaring og medansvarlig hos Casinoaftaler.dk. Læs om hans streamingstil, præferencer og anbefalede casinoer."
        jsonLd={[personJsonLd, faqJsonLd]}
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
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">
                <User className="mr-1.5 h-3.5 w-3.5" />
                Forfatter
              </Badge>
              <Badge variant="secondary">
                <Tv className="mr-1.5 h-3.5 w-3.5" />
                Casino-streamer
              </Badge>
              <Badge variant="secondary">
                <Zap className="mr-1.5 h-3.5 w-3.5" />
                Medansvarlig
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Kevin – Casino-streamer &amp; Medansvarlig
            </h1>
            <p className="text-lg text-white/80">
              Casino-streamer, medansvarlig og udvikler hos Casinoaftaler.dk
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" date="15-02-2026" readTime="5 Min." />

        {/* Profile card */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={kevinImage}
                alt="Kevin – Casino-streamer & medansvarlig hos Casinoaftaler.dk"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-lg"
                loading="eager"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Om Kevin</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Alder</p>
                    <p className="text-sm font-medium">26 år</p>
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
                    <p className="text-sm font-medium">Gates of Olympus</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Trophy className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Største gevinst</p>
                    <p className="text-sm font-medium">5.000x</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Heart className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Yndlingsmad</p>
                    <p className="text-sm font-medium">Faze</p>
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
                Kevin er 26 år og har været en del af det danske casino-streaming-miljø i over 3 år.
                Som medansvarlig hos Casinoaftaler.dk bidrager han til både indhold, udvikling og community
                – altid med fokus på underholdning og gennemsigtighed.
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
            Kevin er 26 år og har streamet slots i over 3 år. Han mødte{" "}
            <Link to="/forfatter" className="text-primary hover:underline">Jonas</Link> gennem Twitch,
            hvor de hurtigt fandt fælles interesse for streaming og online casino. Siden har de gæstet
            hinandens streams flere gange og opbygget et stærkt samarbejde.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kevin har tidligere arbejdet som editor for <strong>FaZe Clan</strong>, hvilket var grunden til,
            at han i en periode blev omtalt som "Kevin Faze" i communityet. Hans erfaring fra en af verdens
            største gaming-organisationer har givet ham unik indsigt i content creation og community building.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Da Instagram introducerede muligheden for at købe verificeringsbadge, købte Kevin det – hvilket
            hurtigt blev en intern joke i Twitch-chatten. Herfra opstod kælenavnet <strong>"Mr. Verify"</strong>,
            som stadig nævnes, når han dukker op på streamen.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I dag er Kevin en fast del af <strong>Casinoaftaler.dk</strong> som streamer samt medansvarlig
            for hjemmeside og udvikling. Han bringer sin tekniske baggrund og sit skarpe øje for detaljer
            ind i alt, hvad han laver.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Kendetegn og fællesskab */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Kendetegn og Fællesskab
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Kevin er kendt for sin rolige tilgang til streaming, hvor fokus er på hygge, god musik og
            community-dialog. Hans streams tiltrækker seere, der foretrækker en afslappet atmosfære
            fremfor højt tempo og store bets.
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
                Kevin streamer med en rolig og afslappet stemning, hvor god musik og mindre bonushunts
                er i fokus. Der er høj prioritet på community og dialog, og streamsene er præget af
                hyggelig atmosfære fremfor højt tempo.
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
                Kevin foretrækker primært{" "}
                <Link to="/no-sticky-bonus" className="text-primary hover:underline">
                  no sticky bonusser
                </Link>{" "}
                og spiller for underholdningens skyld. Han går efter gennemsigtige vilkår og
                realistiske{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">
                  omsætningskrav
                </Link>.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Star className="h-4 w-4 text-primary" />
                  Interesser
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Kevin følger ligesom{" "}
                <Link to="/forfatter" className="text-primary hover:underline">Jonas</Link> tæt med i
                E-sport og holder øje med de største turneringer. Hans baggrund i FaZe Clan har givet
                ham særlig interesse for gaming- og streamingmiljøet.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Kevin Top 3 Casinoer */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Kevin Top 3 Casinoer</h3>
          {featuredCasinos.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                {featuredCasinos.map((casino) => (
                  <CasinoCard
                    key={casino.id}
                    casino={mapCasino(casino)}
                    rank={1}
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
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/betinia-anmeldelse" className="text-primary hover:underline">Betinia</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Betinia er et moderne dansk casino med et stærkt bonusprogram og et bredt udvalg af{" "}
                <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link>.
                Med fokus på brugeroplevelse og hurtige udbetalinger er Betinia et oplagt valg for danske spillere,
                der værdsætter kvalitet og gennemsigtighed.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/campobet-anmeldelse" className="text-primary hover:underline">Campobet</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Campobet kombinerer casino og sportsbetting under ét tag med en dansk licens og konkurrencedygtige{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">bonusser</Link>. Sammen med et solidt{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>-udbud leverer
                Campobet en komplet spiloplevelse.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/spildansknu-anmeldelse" className="text-primary hover:underline">SpilDanskNu</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                SpilDanskNu er et af de mest populære danske online casinoer med lave{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link> på kun 10x
                og et bredt udvalg af spil fra førende{" "}
                <Link to="/spiludviklere" className="text-primary hover:underline">spiludviklere</Link>.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Relaterede Guides */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            <BookOpen className="mr-2 inline h-7 w-7 text-primary" />
            Relaterede Guides
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Udforsk mere om holdet bag Casinoaftaler.dk og vores tilgang til casinoanmeldelser.
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

        <FAQSection title="Ofte stillede spørgsmål om Kevin" faqs={faqs} />
      </div>
    </>
  );
}
