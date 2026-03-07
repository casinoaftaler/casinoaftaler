import { useState, useCallback, useMemo } from "react";
import { getAuthorArticles } from "@/data/authorContent";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { buildFaqSchema, SITE_URL } from "@/lib/seo";
import { FAQSection } from "@/components/FAQSection";
import { RelatedGuides } from "@/components/RelatedGuides";
import { CasinoCard } from "@/components/CasinoCard";
import { CASINO_SCORES } from "@/lib/reviewScoring";
import { useCasinos } from "@/hooks/useCasinos";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePublishedNewsByAuthor } from "@/hooks/useCasinoNews";
import { optimizeStorageImage } from "@/lib/imageOptimization";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  CalendarDays,
  BookOpen,
  
  Zap,
  ShieldCheck,
  Scale,
  BadgeCheck,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Pen,
  Gavel,
  Users,
  Gamepad2,
} from "lucide-react";
import ajseImage from "@/assets/ajse-avatar.webp";

const faqs = [
  {
    question: "Hvad er Ajses rolle på Casinoaftaler.dk?",
    answer:
      "Ajse er juridisk redaktør og casinoanalytiker på Casinoaftaler.dk. Hun skriver og redigerer analyser og nyheder om regulering, lovgivning og ansvarligt spil i det danske casinomarked.",
  },
  {
    question: "Hvad skriver Ajse om?",
    answer:
      "Ajse dækker dansk spillelovgivning, regulering, compliance, ansvarligt spil, nye licenser og markedstendenser i casinobranchen.",
  },
  {
    question: "Er Ajses artikler faktatjekket?",
    answer:
      "Ja, alle Ajses artikler faktatjekkes af redaktionen inden publicering for at sikre korrekthed og troværdighed.",
  },
  {
    question: "Hvordan kontakter man Ajse?",
    answer:
      "Du kan kontakte Ajse og resten af redaktionen via vores kontaktside eller på de sociale medier.",
  },
];

const expertiseItems = [
  {
    icon: Gavel,
    label: "Casino-lovgivning & regulering",
    desc: "2+ års daglig fordybelse i dansk spillelov, licenskrav og regulatoriske ændringer.",
  },
  {
    icon: ShieldCheck,
    label: "Ansvarligt spil",
    desc: "Fokus på ROFUS, selvudelukkelse, bonusvilkår og spillerbeskyttelse.",
  },
  {
    icon: Gamepad2,
    label: "Slot-marked & innovation",
    desc: "Indsigt i udviklingen på den danske slot-scene, herunder mekanikker, volatilitet og bonusstrukturer.",
  },
  {
    icon: Users,
    label: "Community & brancheindsigt",
    desc: "Aktiv i casino-community siden 2022 og følger markedet tæt via analyser, streams og branchekilder.",
  },
];


const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/forfatter/ajse#person`,
  name: "Ajse",
  url: `${SITE_URL}/forfatter/ajse`,
  image: `${SITE_URL}/ajse-avatar.webp`,
  jobTitle: "Juridisk redaktør & casinoanalytiker",
  knowsAbout: [
    "dansk spillelovgivning",
    "online casino regulering",
    "ansvarligt spil",
    "casino compliance",
    "slot-markedet",
    "Gambling Law",
    "Casino Regulation",
    "Responsible Gambling",
  ],
  areaOfExpertise: [
    "Gambling Law",
    "Casino Regulation",
    "Responsible Gambling",
  ],
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
  sameAs: [
    "https://www.linkedin.com/in/ajse-serifovski-587b25278/",
    "https://www.instagram.com/serifoaaa/",
  ],
  description:
    "Ajse er juridisk redaktør hos Casinoaftaler.dk med særligt fokus på dansk spillelovgivning, regulering og ansvarligt spil.",
};

const AJSE_FEATURED_SLUGS = ["spilleautomaten", "spildansknu", "campobet"];

export default function ForfatterAjse() {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const { data: newsData } = usePublishedNewsByAuthor("ajse", 1, 100);
  const [articlePage, setArticlePage] = useState(0);
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const heroBackgroundImage = siteSettings?.hero_background;

  const featuredCasinos = (casinos ?? []).filter((c) =>
    AJSE_FEATURED_SLUGS.includes(c.slug)
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

  const newsArticles = newsData?.articles ?? [];

  const ARTICLES_PER_PAGE = 8;
  const totalArticlePages = Math.max(1, Math.ceil(newsArticles.length / ARTICLES_PER_PAGE));
  const visibleArticles = newsArticles.slice(
    articlePage * ARTICLES_PER_PAGE,
    (articlePage + 1) * ARTICLES_PER_PAGE
  );
  const prevArticlePage = useCallback(() => setArticlePage((p) => Math.max(0, p - 1)), []);
  const nextArticlePage = useCallback(
    () => setArticlePage((p) => Math.min(totalArticlePages - 1, p + 1)),
    [totalArticlePages]
  );

  const faqJsonLd = buildFaqSchema(faqs);

  return (
    <>
      <SEO
        title="Ajse – Juridisk redaktør & casinoanalytiker | Casinoaftaler.dk"
        description="Mød Ajse – juridisk redaktør hos Casinoaftaler.dk med fokus på dansk spillelovgivning, regulering og ansvarligt spil i casinobranchen."
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
                <Gavel className="mr-1.5 h-3.5 w-3.5" />
                Juridisk redaktør
              </Badge>
              <Badge variant="secondary">
                <Scale className="mr-1.5 h-3.5 w-3.5" />
                Casinoanalytiker
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Ajse – Juridisk redaktør & casinoanalytiker
            </h1>
            <p className="text-lg text-white/80">
              Juridisk redaktør hos Casinoaftaler.dk med særligt fokus på dansk spillelovgivning,
              regulering og ansvarligt spil. Hun kombinerer sit jurastudie med daglig analyse af
              udviklingen i den danske casinobranche.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="ajse" date="26-02-2026" readTime="5 Min." showVerified />

        {/* Profile card */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={ajseImage}
                alt="Ajse – Juridisk redaktør hos Casinoaftaler.dk"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-lg"
                loading="eager"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Om Ajse</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <User className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rolle</p>
                    <p className="text-sm font-medium">Juridisk redaktør</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Gavel className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Speciale</p>
                    <p className="text-sm font-medium">Regulering & lovgivning</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fokusområde</p>
                    <p className="text-sm font-medium">Spillelov & compliance</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Aktiv siden</p>
                    <p className="text-sm font-medium">2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Artikler</p>
                    <p className="text-sm font-medium">20+ analyser</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Scale className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Indhold</p>
                    <p className="text-sm font-medium">Ansvarligt spil</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Ajse er juridisk redaktør hos Casinoaftaler.dk med særligt fokus på dansk
                spillelovgivning, regulering og ansvarligt spil. Hun kombinerer sit jurastudie med
                daglig analyse af udviklingen i den danske casinobranche – fra nye licenser til
                regulatoriske ændringer og trends i slot-markedet. Hendes arbejde sikrer, at
                læserne altid er opdateret med de seneste udviklinger inden for{" "}
                <Link to="/casino-nyheder" className="text-primary hover:underline">
                  casino-nyheder
                </Link>{" "}
                og{" "}
                <Link to="/casino-licenser" className="text-primary hover:underline">
                  licenser
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Om Ajse – hovedafsnit */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Om Ajse
          </h2>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-accent/20 p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Ajse er 24 år og jurastuderende med en stærk faglig interesse for spillelovgivning og
              regulering af online casinoer i Danmark. Hun mødte{" "}
              <Link to="/forfatter/jonas" className="text-primary hover:underline">
                Jonas
              </Link>{" "}
              for to år siden og blev hurtigt engageret i arbejdet med at forstå og analysere alt,
              der bevæger sig inden for casinobranchen – fra juridiske rammer og compliance til
              innovationen på den danske slot-scene.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Siden da har hun dagligt fordybet sig i lovændringer, markedstendenser og ansvarligt
              spil. Hendes tilgang er analytisk og struktureret, og hun har et særligt fokus på
              gennemsigtighed og forbrugerbeskyttelse i branchen.
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
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-accent/20 p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Ajse kombinerer sit jurastudie med praktisk brancheindsigt. Hun arbejder struktureret
              med primære kilder som{" "}
              <Link to="/spillemyndigheden" className="text-primary hover:underline">
                Spillemyndigheden
              </Link>
              , lovforslag, regulatoriske bekendtgørelser og officielle udmeldinger fra licenserede
              operatører.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hendes analyser bygger på dokumentation frem for spekulation og har særligt fokus på,
              hvordan lovgivning og markedsændringer påvirker danske spillere.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Baggrund og Motivation */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Baggrund & Motivation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ajse har altid haft interesse for jura, forbrugerrettigheder og digital regulering.
            Mødet med{" "}
            <Link to="/forfatter/jonas" className="text-primary hover:underline">
              Jonas
            </Link>{" "}
            blev startskuddet til en dybere involvering i casinobranchen, hvor hun fandt et felt,
            der kombinerer lovgivning, teknologi og markedstendenser.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hendes motivation er at skabe gennemsigtighed i en branche, der ofte kan virke kompleks
            for almindelige spillere. Hun arbejder for, at danske spillere skal forstå både deres
            rettigheder og deres ansvar.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I dag er Ajse en fast del af redaktionen på <strong>Casinoaftaler.dk</strong> og
            bidrager dagligt med analyser, der holder læserne informeret om alt fra{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline">
              bonusændringer
            </Link>{" "}
            til ny lovgivning og{" "}
            <Link to="/nye-casinoer" className="text-primary hover:underline">
              nye casinoer
            </Link>{" "}
            på markedet.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Ajse Top 3 Casinoer */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Ajses Top 3 Casinoer</h3>
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
                <Link to="/casino-anmeldelser/spilleautomaten" className="text-primary hover:underline">Spilleautomaten</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Spilleautomaten er kendt for sit enorme spiludvalg og hurtige udbetalinger. Med over 3.000 spil fra førende udbydere som{" "}
                <Link to="/spiludviklere/netent" className="text-primary hover:underline">NetEnt</Link>,{" "}
                <Link to="/spiludviklere/pragmatic-play" className="text-primary hover:underline">Pragmatic Play</Link> og{" "}
                <Link to="/spiludviklere/play-n-go" className="text-primary hover:underline">Play'n GO</Link> er der altid noget nyt at udforske.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/spildansknu" className="text-primary hover:underline">SpilDanskNu</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                SpilDanskNu er et af de mest populære danske online casinoer med et stærkt fokus på det danske marked. Med en dansk licens og et bredt udvalg af{" "}
                <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spilleautomater</Link>, bordspil og{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link> tilbyder de en tryg spiloplevelse.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                <Link to="/casino-anmeldelser/campobet" className="text-primary hover:underline">Campobet</Link>
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Campobet kombinerer casino og sportsbetting under ét tag. Med en dansk licens, konkurrencedygtige{" "}
                <Link to="/casino-bonus" className="text-primary hover:underline">bonusser</Link> og et solidt{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link>-udbud leverer Campobet en komplet spiloplevelse.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Nyheder skrevet af Ajse */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Newspaper className="h-7 w-7 text-primary" />
              Nyheder og artikler af Ajse
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

          {/* Statiske sider af Ajse */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-muted-foreground">Sider</h3>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {getAuthorArticles("ajse").map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
                >
                  <Pen className="h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{page.title}</h4>
                    <p className="text-xs text-muted-foreground">{page.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Nyheder */}
          <h3 className="text-lg font-semibold mb-3 text-muted-foreground">Nyheder</h3>
          {newsArticles.length === 0 ? (
            <p className="text-muted-foreground">Ingen publicerede nyheder endnu.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {visibleArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/casino-nyheder/${article.slug}`}
                  className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30"
                >
                  {article.featured_image && (
                    <img
                      src={
                        optimizeStorageImage(article.featured_image, 120, 70) ||
                        article.featured_image
                      }
                      alt={article.title}
                      className="h-20 w-28 shrink-0 rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex flex-col min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Nyhed
                      </Badge>
                      {article.published_at && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(article.published_at).toLocaleDateString("da-DK")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <Separator className="my-10" />

        {/* Transparens & metode */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-primary" />
            Transparens & metode
          </h2>
          <p className="mb-6 text-muted-foreground leading-relaxed">
            Ajses artikler bygger på en dokumenteret research-metode og klare redaktionelle
            retningslinjer. Læs mere om vores tilgang til kvalitetssikring, forretningsmodel og
            redaktionel politik.
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
              <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Alle Casinoer</h3>
                <p className="text-xs text-muted-foreground">Kategoriguides og dybdegående analyser</p>
              </div>
            </Link>
            <Link
              to="/casino-licenser"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Scale className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Casino Licenser</h3>
                <p className="text-xs text-muted-foreground">Licensregulering i Danmark</p>
              </div>
            </Link>
            <Link
              to="/nye-casinoer"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Nye Casinoer</h3>
                <p className="text-xs text-muted-foreground">De nyeste casinoer med dansk licens</p>
              </div>
            </Link>
            <Link
              to="/ordbog"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Casino Ordbog</h3>
                <p className="text-xs text-muted-foreground">30+ casino-begreber forklaret</p>
              </div>
            </Link>
            <Link
              to="/ansvarligt-spil"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Ansvarligt Spil</h3>
                <p className="text-xs text-muted-foreground">Information om ansvarligt spil</p>
              </div>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/forfatter/ajse" />

        <FAQSection title="Ofte stillede spørgsmål om Ajse" faqs={faqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
}
