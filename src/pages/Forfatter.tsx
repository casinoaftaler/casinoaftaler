import { useState, useRef, useCallback } from "react";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, SITE_URL, JONAS_SAME_AS } from "@/lib/seo";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CasinoCard } from "@/components/CasinoCard";
import { CASINO_SCORES } from "@/lib/reviewScoring";
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
  Scale,
  ArrowRight,
  CheckCircle2,
  BadgeCheck,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import jonasImage from "@/assets/jonas-forfatter.webp";

const FEATURED_SLUGS = ["spildansknu", "spilleautomaten", "campobet"];

const casinoDescriptions: Record<string, { title: string; link: string }> = {
  spildansknu: {
    title: "SpilDanskNu",
    link: "/casino-anmeldelser/spildansknu",
  },
  spilleautomaten: {
    title: "Spilleautomaten",
    link: "/casino-anmeldelser/spilleautomaten",
  },
  campobet: {
    title: "Campobet",
    link: "/casino-anmeldelser/campobet",
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

/** Articles sourced from centralized registry */
import { getAuthorArticles, getAuthorReviewVideos, getAuthorGuideVideos, getAuthorAllVideos } from "@/data/authorContent";
const jonasArticles = getAuthorArticles("jonas");

const expertiseItems = [
  { icon: CalendarDays, label: "4+ års erfaring med online casino" },
  { icon: CheckCircle2, label: "Testet 50+ danske casinoer" },
  { icon: FileText, label: "Speciale i bonusvilkår & omsætningskrav" },
  { icon: Tv, label: "Aktiv Twitch-streamer siden 2021" },
  { icon: ShieldCheck, label: "Fokus på ansvarligt spil" },
];

/** Person JSON-LD schema for Jonas – canonical definition matching buildPersonEntity */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/forfatter/jonas#person`,
  name: "Jonas Theill",
  alternateName: "Fedesvinsejer",
  url: `${SITE_URL}/forfatter/jonas`,
  image: `${SITE_URL}/jonas-avatar.webp`,
  jobTitle: "Casino Bonus Ekspert",
  knowsAbout: ["online casino", "iGaming", "casino bonus", "spillemaskiner", "RTP", "ansvarligt spil"],
  nationality: { "@type": "Country", name: "Denmark" },
  worksFor: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Casinoaftaler.dk",
    url: SITE_URL,
  },
  memberOf: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
  },
  sameAs: JONAS_SAME_AS,
  description:
    "Jonas er grundlæggeren af Casinoaftaler.dk og en af Danmarks mest engagerende casino-streamere med over 4 års erfaring.",
};


const casinoReviewVideos = getAuthorReviewVideos("jonas");

function CasinoReviewVideosSection() {
  const [videoPage, setVideoPage] = useState(0);
  const VIDEOS_PER_PAGE = 8;
  const totalVideoPages = Math.ceil(casinoReviewVideos.length / VIDEOS_PER_PAGE);
  const visibleVideos = casinoReviewVideos.slice(videoPage * VIDEOS_PER_PAGE, (videoPage + 1) * VIDEOS_PER_PAGE);

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tv className="h-7 w-7 text-primary" />
          <h2 className="text-3xl font-bold">Casino Anmeldelse-videoer</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground mr-2">
            {videoPage + 1} / {totalVideoPages}
          </span>
          <button
            onClick={() => setVideoPage((p) => Math.max(0, p - 1))}
            disabled={videoPage === 0}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Forrige videoer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setVideoPage((p) => Math.min(totalVideoPages - 1, p + 1))}
            disabled={videoPage >= totalVideoPages - 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
            aria-label="Næste videoer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Jonas gennemgår hvert casino indefra – navigation, spiludvalg, bonusser og features. Se videoen og læs den fulde anmeldelse.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleVideos.map((video) => (
          <Link
            key={video.videoId}
            to={video.path}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <img
                src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 shadow-lg">
                  <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-4">
              <Badge variant="secondary" className="w-fit text-xs">
                {video.category}
              </Badge>
              <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                {video.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Forfatter() {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const [articlePage, setArticlePage] = useState(0);
  const heroBackgroundImage = siteSettings?.hero_background;
  const ARTICLES_PER_PAGE = 8;
  const totalArticlePages = Math.ceil(jonasArticles.length / ARTICLES_PER_PAGE);
  const visibleArticles = jonasArticles.slice(
    articlePage * ARTICLES_PER_PAGE,
    (articlePage + 1) * ARTICLES_PER_PAGE
  );
  const prevArticlePage = useCallback(() => setArticlePage((p) => Math.max(0, p - 1)), []);
  const nextArticlePage = useCallback(() => setArticlePage((p) => Math.min(totalArticlePages - 1, p + 1)), [totalArticlePages]);

  const featuredCasinos = (casinos ?? []).filter((c) =>
    FEATURED_SLUGS.includes(c.slug)
  );

  const mapCasino = (casino: (typeof featuredCasinos)[0]) => ({
    id: casino.id,
    name: casino.name,
    slug: casino.slug,
    rating: CASINO_SCORES[casino.slug]?.total ?? Number(casino.rating),
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

  const faqJsonLd = buildFaqSchema(faqs);

  const allJonasVideos = [
    ...getAuthorAllVideos("jonas"),
    { id: "ZKDrnL7373o", title: "Jonas' bedste highlights" },
  ];

  const videoSchemas = allJonasVideos.map((v, i) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${SITE_URL}/forfatter/jonas#video-${i + 1}`,
    name: `${v.title} – Casinoaftaler.dk`,
    description: `Jonas gennemgår ${v.title.toLowerCase()} på Casinoaftaler.dk.`,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
    uploadDate: "2026-02-18T12:00:00+01:00",
    duration: "PT2M",
    embedUrl: `https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Casinoaftaler.dk",
      url: SITE_URL,
    },
  }));

  return (
    <>
      <SEO
        title="Jonas – Forfatter & Grundlægger | Casinoaftaler.dk"
        description="Mød Jonas, grundlæggeren af Casinoaftaler.dk og casino-streamer på Twitch. Læs om hans baggrund, streamingstil og passion for casinospil."
        jsonLd={[faqJsonLd, personSchema, ...videoSchemas]}
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
        <AuthorMetaBar author="kevin" date="17-02-2026" readTime="5 Min." showVerified />

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
              {/* 5️⃣ Bio with internal authority links */}
              <p className="text-muted-foreground leading-relaxed">
                Jonas, bedre kendt som <strong>Fedesvinsejer</strong>, er grundlæggeren af Casinoaftaler.dk og en af Danmarks mest engagerende casino-streamere. 
                Med sin åbne stil, smittende energi og humor har han opbygget et aktivt og loyalt community, 
                der deler hans passion for{" "}
                <Link to="/casinospil" className="text-primary hover:underline">casinospil</Link> og underholdning.
                Hans ekspertise spænder fra dybdegående{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">bonusanalyser</Link> til{" "}
                <Link to="/ansvarligt-spil" className="text-primary hover:underline">ansvarligt spil</Link>, og han arbejder løbende på at styrke gennemsigtigheden i den danske casinoindustri.
                Læs mere om{" "}
                <Link to="/om" className="text-primary hover:underline">teamet bag Casinoaftaler.dk</Link> og{" "}
                <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">hvordan vi tester casinoer</Link>.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* 2️⃣ Ekspertise & Erfaring */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <BadgeCheck className="h-7 w-7 text-primary" />
            Ekspertise & Erfaring
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expertiseItems.map((item) => (
              <Card
                key={item.label}
                className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                <CardContent className="flex items-center gap-3 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
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
            Han har streamet gambling i fire år – men for ham har det aldrig kun handlet om <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">slots</Link>. Det har handlet om energi, fællesskab og personlighed.
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
            <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">yndlingsmaskiner</Link>, men også kommunikere med hinanden og tage Twitch-fællesskabet med videre.
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
                <Link to="/casino-anmeldelser/spildansknu" className="text-primary hover:underline">SpilDanskNu</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                SpilDanskNu er et af de mest populære danske online casinoer med et stærkt fokus på det danske marked. Med en dansk licens og et bredt udvalg af{" "}
                <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spilleautomater</Link>, bordspil og{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link> tilbyder de en tryg og underholdende spiloplevelse. Deres lave{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link> på kun 10x gør dem til et oplagt valg for danske spillere.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/spilleautomaten" className="text-primary hover:underline">Spilleautomaten</Link>
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
                <Link to="/casino-anmeldelser/campobet" className="text-primary hover:underline">Campobet</Link>
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

        {/* 3️⃣ Artikler skrevet af Jonas – horizontal carousel */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              Artikler skrevet af Jonas
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground mr-2">
                {articlePage + 1} / {totalArticlePages}
              </span>
              <button
                onClick={prevArticlePage}
                disabled={articlePage === 0}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Forrige artikler"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextArticlePage}
                disabled={articlePage >= totalArticlePages - 1}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                aria-label="Næste artikler"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleArticles.map((article) => (
              <Link
                key={article.path}
                to={article.path}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                </div>
                <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* 🎬 YouTube guides af Jonas */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Play className="h-7 w-7 text-primary fill-primary" />
            <h2 className="text-3xl font-bold">YouTube-guides af Jonas</h2>
          </div>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Jonas har produceret en serie af undervisningsvideoer, der forklarer de vigtigste begreber inden for casino-bonusser. Klik på en video for at læse den fulde guide.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              {
                videoId: "WOowRz6hnH8",
                title: "Hvad er en No-Sticky Bonus?",
                path: "/no-sticky-bonus",
                category: "Bonus",
              },
              {
                videoId: "yUAcefgYfkc",
                title: "Hvad er en Sticky Bonus?",
                path: "/sticky-bonus",
                category: "Bonus",
              },
              {
                videoId: "q4jeGo9TPEk",
                title: "Hvad er Free Spins?",
                path: "/free-spins",
                category: "Free Spins",
              },
              {
                videoId: "3tXFTjmgdcE",
                title: "Hvad er omsætningskrav?",
                path: "/omsaetningskrav",
                category: "Guide",
              },
              {
                videoId: "oK5PvebkvGY",
                title: "Hvad er en Velkomstbonus?",
                path: "/velkomstbonus",
                category: "Bonus",
              },
              {
                videoId: "hMHHVA6vH0Y",
                title: "Hvad er en Indskudsbonus?",
                path: "/indskudsbonus",
                category: "Bonus",
              },
              {
                videoId: "7JQ3nFTasoQ",
                title: "Hvad er bonus uden omsætningskrav?",
                path: "/bonus-uden-omsaetningskrav",
                category: "Bonus",
              },
              {
                videoId: "XhbLda1HyOs",
                title: "Hvad er bonus uden indbetaling?",
                path: "/bonus-uden-indbetaling",
                category: "Bonus",
              },
            ].map((video) => (
              <Link
                key={video.videoId}
                to={video.path}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                    alt={video.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 shadow-lg">
                      <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                </div>
                {/* Info */}
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                  <Badge variant="secondary" className="w-fit text-xs">
                    {video.category}
                  </Badge>
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 🎬 Casino Anmeldelse-videoer af Jonas */}
        <CasinoReviewVideosSection />

        <Separator className="my-10" />
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
                src="https://www.youtube.com/embed/ZKDrnL7373o"
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

        {/* Transparens & metode */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Transparens & metode
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Jonas' anmeldelser bygger på en dokumenteret testmetode og klare redaktionelle retningslinjer.
            Læs mere om vores tilgang til test, forretningsmodel og redaktionel politik.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/saadan-tester-vi-casinoer"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Sådan tester vi casinoer</h3>
                <p className="text-xs text-muted-foreground">Vores testmetode og vurderingskriterier</p>
              </div>
            </Link>
            <Link
              to="/forretningsmodel"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Forretningsmodel</h3>
                <p className="text-xs text-muted-foreground">Sådan finansieres Casinoaftaler.dk</p>
              </div>
            </Link>
            <Link
              to="/redaktionel-politik"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Redaktionel politik</h3>
                <p className="text-xs text-muted-foreground">Vores redaktionelle retningslinjer</p>
              </div>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/forfatter/jonas" />

        <FAQSection title="Ofte stillede spørgsmål om Jonas" faqs={faqs} />

        <AuthorBio author="kevin" showCommunity={false} />
      </div>
    </>
  );
}
