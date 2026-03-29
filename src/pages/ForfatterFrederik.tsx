import { useState, useCallback } from "react";
import { AuthorArticleCard } from "@/components/AuthorArticleCard";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, SITE_URL, FREDERIK_SAME_AS } from "@/lib/seo";
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
  ShieldCheck,
  Scale,
  CheckCircle2,
  BadgeCheck,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Smile,
} from "lucide-react";
import frederikImage from "@/assets/frederik-forfatter.jpg";

const FEATURED_SLUGS = ["spildansknu", "betinia", "campobet"];

const faqs = [
  {
    question: "Hvem er Frederik / MerkelSpins?",
    answer:
      "Frederik er 23 år og fast streamer på Casinoaftaler.dk. Han er kendt for sin energiske streamingstil, sit smittende humør og sin evne til at engagere chatten. Han streamer under navnet MerkelSpins på YouTube.",
  },
  {
    question: "Hvornår streamer Frederik?",
    answer:
      "Frederik streamer jævnligt på Twitch med fokus på casino bonusser, slots og bonushunts. Hold øje med kanalen for de nyeste opdateringer.",
  },
  {
    question: "Hvad er Frederiks speciale?",
    answer:
      "Frederiks specialer inkluderer test af casino bonusser, live gameplay med fokus på underholdning og community-engagement. Han er kendt for sin energiske tilgang og evne til at skabe en god stemning i chatten.",
  },
  {
    question: "Hvordan blev Frederik en del af Casinoaftaler?",
    answer:
      "Frederik mødte Jonas gennem Twitch og startede først sin egen kanal Dendynamiskedue med venner, før han gik solo. Til sidst besluttede han at blive en fast del af Casinoaftaler-teamet som streamer.",
  },
];

import { getAuthorArticles } from "@/data/authorContent";
import { ContentPageLayout } from "@/components/ContentPageLayout";
const frederikArticles = getAuthorArticles("frederik");

const expertiseItems = [
  {
    icon: Tv,
    label: "Aktiv Twitch & YouTube-streamer",
    desc: "Streamer jævnligt casino-indhold med fokus på bonustest, slots og underholdende gameplay for community'et.",
  },
  {
    icon: Gamepad2,
    label: "Test af casino bonusser",
    desc: "Systematisk gennemgang og test af bonusvilkår, omsætningskrav og reel bonusværdi hos danske casinoer.",
  },
  {
    icon: Smile,
    label: "Community engagement",
    desc: "Kendt for sin energiske og smilende streamingstil med høj interaktion og dialog med chatten.",
  },
  {
    icon: ShieldCheck,
    label: "Fokus på gennemsigtighed",
    desc: "Ærlig og åben kommunikation om casino-oplevelser, gevinster og tab – med ansvarligt spil i fokus.",
  },
  {
    icon: Users,
    label: "Fra solo-kanal til Casinoaftaler",
    desc: "Startede med Dendynamiskedue, gik solo og blev derefter fast streamer på Casinoaftaler.dk.",
  },
  {
    icon: Zap,
    label: "Energisk og underholdende",
    desc: "Frederiks streams er præget af høj energi, godt humør og en unik evne til at holde seerne engageret.",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/forfatter/frederik#person`,
  name: "Frederik Merkel",
  alternateName: "MerkelSpins",
  url: `${SITE_URL}/forfatter/frederik`,
  image: `${SITE_URL}/frederik-forfatter.jpg`,
  jobTitle: "Casino Streamer",
  knowsAbout: ["online casino", "casino streaming", "casino bonus", "spillemaskiner", "bonustest"],
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
  sameAs: FREDERIK_SAME_AS,
  description:
    "Frederik er fast streamer på Casinoaftaler.dk med fokus på test af casino bonusser og underholdende live gameplay.",
};


export default function ForfatterFrederik() {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const [articlePage, setArticlePage] = useState(0);
  const heroBackgroundImage = siteSettings?.hero_background;

  const ARTICLES_PER_PAGE = 6;
  const totalArticlePages = Math.ceil(frederikArticles.length / ARTICLES_PER_PAGE);
  const visibleArticles = frederikArticles.slice(
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

  return (
    <>
      <SEO
        title="Frederik Merkel – Streamer & Bonustester | Casinoaftaler"
        description="Mød Frederik – fast casino-streamer hos Casinoaftaler.dk. Læs om hans streamingstil, ekspertise inden for bonustest og hans vej til Casinoaftaler."
        jsonLd={[faqJsonLd, personSchema]}
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
                <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
                Bonustester
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Frederik Merkel – Streamer &amp; Bonustester
            </h1>
            <p className="text-lg text-white/80">
              Fast streamer på Casinoaftaler.dk med fokus på test af casino bonusser og underholdende live gameplay.
            </p>
          </div>
        </div>
      </section>

      <ContentPageLayout hideSidebar>
        <AuthorMetaBar author="redaktionen" factCheckBy="jonas" readTime="5 Min." showVerified />

        {/* Profile card */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={frederikImage}
                alt="Frederik Merkel – Casino-streamer hos Casinoaftaler.dk"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-lg"
                loading="eager"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Om Frederik</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <User className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rolle</p>
                    <p className="text-sm font-medium">Streamer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Speciale</p>
                    <p className="text-sm font-medium">Streaming & bonusser</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Tv className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Platform</p>
                    <p className="text-sm font-medium">Twitch / YouTube</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fokusområde</p>
                    <p className="text-sm font-medium">Test af casino bonusser</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Aktiv siden</p>
                    <p className="text-sm font-medium">2022</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Artikler</p>
                    <p className="text-sm font-medium">{frederikArticles.length > 0 ? frederikArticles.length : "Opdateres"}</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Frederik er fast streamer på Casinoaftaler.dk og bidrager med energiske live-streams, test af{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">casino bonusser</Link> og et
                naturligt talent for at engagere sit community. Hans fokus ligger på gennemsigtighed, underholdning
                og ærlig formidling af casino-oplevelser. Læs mere om{" "}
                <Link to="/saadan-tester-vi-casinoer" className="text-primary hover:underline">hvordan vi tester casinoer</Link>.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Om Frederik – hovedafsnit */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Om Frederik
          </h2>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-accent/20 p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Frederik er 23 år og har været aktiv i casino-streaming siden 2022. Han mødte{" "}
              <Link to="/forfatter/jonas" className="text-primary hover:underline">Jonas</Link> og{" "}
              <Link to="/forfatter/kevin" className="text-primary hover:underline">Kevin</Link> gennem Twitch, hvor de hurtigt fandt fælles interesse for streaming, online casino og community-opbygning. Det var starten på et samarbejde, der med tiden udviklede sig til en fast rolle hos Casinoaftaler.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Inden Frederik blev en del af Casinoaftaler, startede han sin egen kanal <strong>Dendynamiskedue</strong> sammen med sine venner. Kanalen gav ham erfaring med live-streaming, content creation og dialog med seerne. Da han senere valgte at gå solo, fik han mulighed for at udvikle sin egen streamingstil – præget af høj energi, smilende humør og en ægte passion for casinospil.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Til sidst besluttede Frederik at blive en fast del af Casinoaftaler-teamet som streamer. Her bidrager han med test af{" "}
              <Link to="/casino-bonus" className="text-primary hover:underline">casino bonusser</Link>, live gameplay og sit naturlige talent for at skabe en god stemning i chatten. Hans energiske tilgang og evne til at kommunikere med seerne gør ham til en uundværlig del af teamet.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Ekspertise & Erfaring */}
        <section className="mb-12">
          <h2 className="mb-6 text-3xl font-bold flex items-center gap-2">
            <BadgeCheck className="h-7 w-7 text-primary" />
            Ekspertise & Erfaring
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {expertiseItems.map((item) => (
              <Card
                key={item.label}
                className="group transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">{item.label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-10" />

        {/* Dokumenteret erfaring */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Dokumenteret Erfaring
          </h2>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-accent/20 p-6">
            <p className="text-muted-foreground leading-relaxed">
              Frederik har testet og streamed en bred vifte af danske online casinoer med fokus på bonusvilkår, omsætningskrav og gameplay-oplevelse.
              Han bidrager med first-hand erfaring fra live-streams og fokuserer på at give seerne ærlige og gennemsigtige vurderinger.
              Som fast streamer på Casinoaftaler.dk deltager han aktivt i bonushunts, turneringer og community-events.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Baggrund og Motivation */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Baggrund og Motivation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Frederik er 23 år og har været fascineret af streaming og online casino siden 2022. Han startede med at se{" "}
            <Link to="/forfatter/jonas" className="text-primary hover:underline">Jonas</Link> og{" "}
            <Link to="/forfatter/kevin" className="text-primary hover:underline">Kevin</Link> på Twitch og blev hurtigt inspireret til selv at begynde. Hans rejse startede med kanalen <strong>Dendynamiskedue</strong>, som han drev sammen med venner, før han valgte at gå solo.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Efter at have udviklet sin egen streamingstil og opbygget et loyalt følgerskab, blev Frederik inviteret til at blive en fast del af Casinoaftaler-teamet. Hans motivation drives af ønsket om at skabe underholdende og gennemsigtigt indhold, hvor seerne altid ved, hvad de får.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Frederik er kendt for sin smittende energi, sit konstante smil foran kameraet og sin evne til at holde chatten aktiv og engageret. Han prioriterer altid god stemning og ærlig kommunikation – hvad enten det er store gevinster eller tørre perioder.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Kendetegn og Fællesskab */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Kendetegn og Fællesskab
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Frederik er kendt for sin livlige og inkluderende streamingstil. Han skaber en atmosfære, hvor alle føler sig velkomne, og han prioriterer dialog og engagement med sit community.
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
                Frederiks streams er præget af høj energi, godt humør og konstant interaktion med chatten. Han gør casino-streaming underholdende og tilgængeligt for alle.
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
                Frederik fokuserer på test af{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">casino bonusser</Link> og foretrækker slots med høj underholdningsværdi. Han analyserer{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link> og bonusvilkår live for seerne.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Heart className="h-4 w-4 text-primary" />
                  Personlighed
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Med sit smittende smil og positive energi har Frederik opbygget et dedikeret community. Han er altid klar til en god snak med chatten og skaber en unik stemning i sine streams.
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Frederik Top 3 Casinoer */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Frederiks Top 3 Casinoer</h3>
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

          <div className="mt-8 space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/spildansknu" className="text-primary hover:underline">SpilDanskNu</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                SpilDanskNu er et af de mest populære danske online casinoer med lave{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">omsætningskrav</Link> på kun 10x
                og et bredt udvalg af spil fra førende{" "}
                <Link to="/spiludviklere" className="text-primary hover:underline">spiludviklere</Link>.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/betinia" className="text-primary hover:underline">Betinia</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Betinia er et moderne dansk casino med et stærkt bonusprogram og et bredt udvalg af{" "}
                <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spillemaskiner</Link>.
                Med fokus på brugeroplevelse og hurtige udbetalinger er Betinia et oplagt valg for danske spillere.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/campobet" className="text-primary hover:underline">Campobet</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Campobet kombinerer casino og sportsbetting under ét tag med en dansk licens og konkurrencedygtige{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">bonusser</Link>. Sammen med et solidt{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>-udbud leverer
                Campobet en komplet spiloplevelse.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Artikler skrevet af Frederik – paginated */}
        {frederikArticles.length > 0 && (
          <section className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <BookOpen className="h-7 w-7 text-primary" />
                Artikler af Frederik
              </h2>
              {totalArticlePages > 1 && (
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
              )}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((article) => (
                <AuthorArticleCard
                  key={article.path}
                  path={article.path}
                  title={article.title}
                  category={article.category}
                  excerpt={article.excerpt}
                />
              ))}
            </div>
          </section>
        )}

        <Separator className="my-10" />

        {/* Transparens & metode */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Transparens & metode
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Frederiks indhold bygger på en dokumenteret testmetode og klare redaktionelle retningslinjer.
            Læs mere om vores tilgang til test, forretningsmodel og redaktionel politik.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
            <Link
              to="/casino-bonus"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Casino Bonus Guide</h3>
                <p className="text-xs text-muted-foreground">Komplet guide til alle bonustyper</p>
              </div>
            </Link>
            <Link
              to="/casinoer"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Star className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Alle Casinoer</h3>
                <p className="text-xs text-muted-foreground">Kategoriguides og dybdegående analyser</p>
              </div>
            </Link>
            <Link
              to="/community"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Community</h3>
                <p className="text-xs text-muted-foreground">Bliv en del af fællesskabet</p>
              </div>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/forfatter/frederik" />

        <FAQSection title="Ofte stillede spørgsmål om Frederik" faqs={faqs} />

        <AuthorBio author="frederik" showCommunity={false} />
      </ContentPageLayout>
    </>
  );
}
