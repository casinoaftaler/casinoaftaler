import { useState, useCallback } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  CalendarDays,
  BookOpen,
  Zap,
  ShieldCheck,
  BadgeCheck,
  FileText,
  ChevronLeft,
  ChevronRight,
  Pen,
  TrendingUp,
  Scale,
  Banknote,
  Shield,
  PiggyBank,
} from "lucide-react";
import niklasImage from "@/assets/niklas-forfatter.webp";

const faqs = [
  {
    question: "Hvad er Niklas' rolle på Casinoaftaler.dk?",
    answer:
      "Niklas er finansøkonom og forsikringsekspert hos Casinoaftaler.dk. Han skriver og redigerer artikler om bonusøkonomi, casino og skat, EV-analyse og finansiel risikostyring i casinosammenhæng.",
  },
  {
    question: "Hvad skriver Niklas om?",
    answer:
      "Niklas dækker emner som omsætningskrav, bonusøkonomi, casino og skat, bankroll management, cashback-analyse og forsikringsrelaterede perspektiver på casinospil.",
  },
  {
    question: "Er Niklas' artikler faktatjekket?",
    answer:
      "Ja, alle Niklas' artikler faktatjekkes af en anden redaktør inden publicering for at sikre korrekthed og troværdighed.",
  },
  {
    question: "Hvilken baggrund har Niklas?",
    answer:
      "Niklas er uddannet finansøkonom med speciale i forsikring og risikostyring. Han har 5+ års erfaring med finansiel analyse og bringer denne ekspertise ind i casinobranchen.",
  },
];

const expertiseItems = [
  {
    icon: TrendingUp,
    label: "Finansiel analyse & EV",
    desc: "Dybdegående analyse af expected value, bonusøkonomi og rentabilitet i casinospil.",
  },
  {
    icon: Shield,
    label: "Forsikring & risikostyring",
    desc: "Professionel baggrund i forsikring og risikovurdering, overført til bankroll management og casinoøkonomi.",
  },
  {
    icon: PiggyBank,
    label: "Bonusøkonomi & omsætningskrav",
    desc: "Detaljeret gennemgang af bonusstrukturer, wagering-krav og reel værdi for spillere.",
  },
  {
    icon: Banknote,
    label: "Casino & skat",
    desc: "Ekspertviden om beskatning af casinogevinster i Danmark og skatteregler for spillere.",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/forfatter/niklas#person`,
  name: "Niklas",
  url: `${SITE_URL}/forfatter/niklas`,
  image: `${SITE_URL}/niklas-avatar.webp`,
  jobTitle: "Finansøkonom & forsikringsekspert",
  knowsAbout: [
    "finansiel analyse",
    "forsikring",
    "risikostyring",
    "bankroll management",
    "casino og skat",
    "bonusøkonomi",
    "EV-analyse",
    "omsætningskrav",
    "Financial Analysis",
    "Insurance",
    "Risk Management",
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
    "https://www.linkedin.com/in/niclas-finscet-hansen/",
  ],
  description:
    "Niklas er finansøkonom og forsikringsekspert hos Casinoaftaler.dk med fokus på bonusøkonomi, EV-analyse, casino og skat samt finansiel risikostyring.",
};

const NIKLAS_FEATURED_SLUGS = ["spildansknu", "spilleautomaten", "campobet"];

export default function ForfatterNiklas() {
  const { data: siteSettings } = useSiteSettings();
  const { data: casinos } = useCasinos();
  const [openCasinoId, setOpenCasinoId] = useState<string | null>(null);
  const heroBackgroundImage = siteSettings?.hero_background;

  const featuredCasinos = (casinos ?? []).filter((c) =>
    NIKLAS_FEATURED_SLUGS.includes(c.slug)
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

  const niklasArticles = getAuthorArticles("niklas");

  const ARTICLES_PER_PAGE = 8;
  const totalArticlePages = Math.max(1, Math.ceil(niklasArticles.length / ARTICLES_PER_PAGE));
  const [articlePage, setArticlePage] = useState(0);
  const visibleArticles = niklasArticles.slice(
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
        title="Niklas – Finansøkonom & forsikringsekspert | Casinoaftaler.dk"
        description="Mød Niklas – finansøkonom og forsikringsekspert hos Casinoaftaler.dk med fokus på bonusøkonomi, EV-analyse, casino og skat samt finansiel risikostyring."
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
                <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
                Finansøkonom
              </Badge>
              <Badge variant="secondary">
                <Shield className="mr-1.5 h-3.5 w-3.5" />
                Forsikringsekspert
              </Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Niklas – Finansøkonom & forsikringsekspert
            </h1>
            <p className="text-lg text-white/80">
              Finansøkonom og forsikringsekspert hos Casinoaftaler.dk med fokus på bonusøkonomi,
              EV-analyse, casino og skat samt finansiel risikostyring. Han kombinerer sin
              finansielle uddannelse med analytisk tilgang til casinobranchen.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" factCheckBy="ajse" showVerified />

        {/* Profile card */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={niklasImage}
                alt="Niklas – Finansøkonom & forsikringsekspert hos Casinoaftaler.dk"
                className="w-64 h-64 rounded-2xl object-cover object-top shadow-lg"
                loading="eager"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">Om Niklas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <User className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rolle</p>
                    <p className="text-sm font-medium">Finansekspert</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Speciale</p>
                    <p className="text-sm font-medium">Bonusøkonomi & EV</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Shield className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fokusområde</p>
                    <p className="text-sm font-medium">Finans & forsikring</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Aktiv siden</p>
                    <p className="text-sm font-medium">2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Artikler</p>
                    <p className="text-sm font-medium">{niklasArticles.length}+ analyser</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                  <Banknote className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Indhold</p>
                    <p className="text-sm font-medium">Økonomi & skat</p>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Niklas er uddannet finansøkonom med speciale i forsikring og risikostyring. Han
                bringer sin analytiske baggrund ind i casinobranchen med fokus på{" "}
                <Link to="/omsaetningskrav" className="text-primary hover:underline">
                  omsætningskrav
                </Link>
                , bonusøkonomi og{" "}
                <Link to="/casinoer/casino-og-skat" className="text-primary hover:underline">
                  casino og skat
                </Link>
                . Hans mål er at hjælpe danske spillere med at forstå den finansielle side af
                casinospil.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Om Niklas */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            Om Niklas
          </h2>
          <div className="rounded-xl border border-border bg-gradient-to-br from-card to-accent/20 p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Niklas er uddannet finansøkonom med speciale i forsikring og har arbejdet professionelt
              med finansiel analyse og risikostyring i flere år. Hans interesse for casinobranchen
              opstod gennem en nysgerrighed for bonusstrukturer, expected value og den matematiske
              side af gambling.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Han blev en del af{" "}
              <Link to="/om" className="text-primary hover:underline">
                Casinoaftaler.dk
              </Link>
              {" "}for at bidrage med den finansielle ekspertise, der ofte mangler i casinoguides – fra
              skatteforhold og bankroll management til reel EV-beregning på bonustilbud.
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
              Med en uddannelse i finansøkonomi og professionel erfaring inden for forsikring og
              risikostyring bringer Niklas en unik analytisk tilgang til casinobranchen. Han
              arbejder med primære kilder som{" "}
              <Link to="/spillemyndigheden" className="text-primary hover:underline">
                Spillemyndigheden
              </Link>
              , skattelovgivning og officielle bonusvilkår fra licenserede operatører.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hans analyser bygger på finansielle modeller og reel dataanalyse – ikke gæt. Fokus er
              altid på, hvordan økonomiske forhold påvirker danske spilleres bundlinje.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Baggrund & Motivation */}
        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            Baggrund & Motivation
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Niklas har altid været fascineret af tal, økonomi og risiko. Hans karriere inden for
            forsikring gav ham stærke analytiske værktøjer, som han nu anvender til at nedbryde
            komplekse bonusstrukturer og skatteforhold for danske casinospillere.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Hans motivation er at give spillere de finansielle værktøjer til at træffe informerede
            beslutninger – hvad enten det handler om at vurdere en{" "}
            <Link to="/velkomstbonus" className="text-primary hover:underline">
              velkomstbonus
            </Link>
            , forstå{" "}
            <Link to="/omsaetningskrav" className="text-primary hover:underline">
              omsætningskrav
            </Link>{" "}
            eller navigere i skatteregler.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I dag er Niklas en fast del af redaktionen på <strong>Casinoaftaler.dk</strong>, hvor
            han bidrager med den finansielle ekspertise, der sikrer, at læserne forstår den
            økonomiske side af{" "}
            <Link to="/casino-bonus" className="text-primary hover:underline">
              casino bonusser
            </Link>{" "}
            og{" "}
            <Link to="/casinoer/casino-og-skat" className="text-primary hover:underline">
              casino og skat
            </Link>
            .
          </p>
        </section>

        <Separator className="my-10" />

        {/* Niklas Top 3 Casinoer */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Niklas' Top 3 Casinoer</h3>
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
                SpilDanskNu er et af de mest populære danske online casinoer med et stærkt fokus på det danske marked. Med en dansk licens og et bredt udvalg af{" "}
                <Link to="/casinospil/spillemaskiner" className="text-primary hover:underline">spilleautomater</Link>, bordspil og{" "}
                <Link to="/live-casino" className="text-primary hover:underline">live casino</Link> tilbyder de en tryg spiloplevelse.
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
                <Link to="/spiludviklere/play-n-go" className="text-primary hover:underline">Play'n GO</Link> er der altid noget nyt at udforske.
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

        {/* Artikler skrevet af Niklas */}
        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Pen className="h-7 w-7 text-primary" />
              Artikler af Niklas
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

          {niklasArticles.length === 0 ? (
            <p className="text-muted-foreground">Niklas' artikler er under opbygning – de første publiceres snart.</p>
          ) : (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((page) => (
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
            Niklas' artikler bygger på finansielle modeller, officielle kilder og klare redaktionelle
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
              <PiggyBank className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Casino Bonus Guide</h3>
                <p className="text-xs text-muted-foreground">Komplet guide til alle bonustyper</p>
              </div>
            </Link>
            <Link
              to="/omsaetningskrav"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <TrendingUp className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Omsætningskrav</h3>
                <p className="text-xs text-muted-foreground">Forstå gennemspilningskrav</p>
              </div>
            </Link>
            <Link
              to="/casinoer/casino-og-skat"
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
            >
              <Banknote className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold text-sm">Casino og Skat</h3>
                <p className="text-xs text-muted-foreground">Skatteforhold for casinospillere</p>
              </div>
            </Link>
          </div>
        </section>

        <Separator className="my-10" />

        <RelatedGuides currentPath="/forfatter/niklas" />

        <FAQSection title="Ofte stillede spørgsmål om Niklas" faqs={faqs} />

        <AuthorBio author="jonas" showCommunity={false} />
      </div>
    </>
  );
}
