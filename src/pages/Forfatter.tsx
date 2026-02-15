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
  Play,
} from "lucide-react";
import jonasImage from "@/assets/jonas-forfatter.png";

const FEATURED_SLUGS = ["spildansknu", "spilleautomaten", "campobet"];

const casinoDescriptions: Record<string, { title: string; link: string }> = {
  spildansknu: {
    title: "SpilDanskNu",
    link: "/spildansknu-anmeldelse",
  },
  spilleautomaten: {
    title: "Spilleautomaten",
    link: "/spilleautomaten-anmeldelse",
  },
  campobet: {
    title: "Campobet",
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
                Grundlægger
              </Badge>
            </div>
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
        <AuthorMetaBar author="redaktionen" date="15-02-2026" readTime="5 Min." />

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
                der deler hans passion for{" "}
                <Link to="/casinospil" className="text-primary hover:underline">casinospil</Link> og underholdning.
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
            Han har streamet gambling i fire år – men for ham har det aldrig kun handlet om <Link to="/spillemaskiner" className="text-primary hover:underline">slots</Link>. Det har handlet om energi, fællesskab og personlighed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mange lærte ham først at kende gennem hans kat, <strong>Fedesvin</strong>, som i dag stolt har sine helt egne to{" "}
            <a href="https://casinoaftaler.dk/community/slots" className="text-primary hover:underline">slotmaskiner</a>. Det siger meget om hans univers: Det må gerne være skørt, underholdende og lidt ud over det sædvanlige.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tilbage i tiden var han medstifter af JPLiveSlots, som på rekordtid blev en af de største slotstreamere i Danmark. Det var en intens rejse med højt tempo, store ambitioner og et stærkt drive for at skabe noget unikt. Succesen kom hurtigt og gav ham både erfaring og troen på, at han kunne bygge noget endnu større.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Senere startede han projektet Casinoholdet sammen med to andre streamere. Endnu et ambitiøst kapitel i hans karriere. Men på et tidspunkt mærkede han tydeligt, at han ville fokusere fuldt ud på sin egen vision og sit eget brand. Derfor valgte han at gå solo.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Det blev starten på <strong>Casinoaftaler.dk</strong> – et projekt, der i dag er i markant vækst. Her er der fokus på SEO, strategi og langsigtet udvikling, men vigtigst af alt: fællesskabet. Hans mål er at skabe et stærkt slot-community, hvor seerne fra streamen ikke blot kan finde og spille deres{" "}
            <Link to="/spillemaskiner" className="text-primary hover:underline">yndlingsmaskiner</Link>, men også kommunikere med hinanden og tage Twitch-fællesskabet med videre.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Han er kendt for sine store råb, sine daglige grin og sine mange – til tider vilde – historier. Han holder sig ikke tilbage. Han er åben om sit liv og deler både op- og nedture med sit publikum. For ham handler streaming ikke kun om spil – det handler om relationer, ærlighed og om at turde være sig selv fuldt ud.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4 font-medium">
            Han bygger ikke bare en platform.<br />
            Han bygger et univers.<br />
            Og rejsen er langt fra slut.
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
            fra <Link to="/casinospil" className="text-primary hover:underline">casinospil</Link> til hverdagens udfordringer.
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
                Energisk og underholdende bonus hunts med masser af interaktion på{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>{" "}
                og slots. Jonas streamer primært om aftenen fra kl. 20-21 og frem.
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
                Stor fan af Esport – især Counter-Strike, hvor han følger stort set alle turneringer. Udforsk hans{" "}
                <Link to="/highlights" className="text-primary hover:underline">bedste highlights</Link>.
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

          {/* SEO casino descriptions with internal links */}
          <div className="mt-8 space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/spildansknu-anmeldelse" className="text-primary hover:underline">SpilDanskNu</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                SpilDanskNu er et af de mest populære danske online casinoer med et stærkt fokus på det danske marked. Med en dansk licens og et bredt udvalg af{" "}
                <Link to="/spillemaskiner" className="text-primary hover:underline">spilleautomater</Link>, bordspil og{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link> tilbyder de en tryg og underholdende spiloplevelse. Deres lave{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link> på kun 10x gør dem til et oplagt valg for danske spillere.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/spilleautomaten-anmeldelse" className="text-primary hover:underline">Spilleautomaten</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Spilleautomaten er kendt for sit enorme spiludvalg og hurtige udbetalinger. Med over 3.000 spil fra førende udbydere som{" "}
                <Link to="/spiludviklere/netent" className="text-primary hover:underline">NetEnt</Link>,{" "}
                <Link to="/spiludviklere/pragmatic-play" className="text-primary hover:underline">Pragmatic Play</Link> og{" "}
                <Link to="/spiludviklere/play-n-go" className="text-primary hover:underline">Play'n GO</Link> er der altid noget nyt at udforske. Casinoet tilbyder en generøs{" "}
                <Link to="/velkomstbonus" className="text-primary hover:underline">velkomstbonus</Link> og en brugervenlig platform, der fungerer perfekt på både desktop og mobil.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/campobet-anmeldelse" className="text-primary hover:underline">Campobet</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Campobet kombinerer casino og sportsbetting under ét tag, hvilket gør det til et alsidigt valg for spillere, der gerne vil have det hele samlet. Med en dansk licens, konkurrencedygtige{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">bonusser</Link> og et solidt{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>-udbud leverer Campobet en komplet spiloplevelse til danske spillere.
              </p>
            </div>
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
