import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBonusHuntArchives } from "@/hooks/useSlotCatalog";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { Trophy, TrendingUp, Gamepad2, BarChart3, ArrowRight } from "lucide-react";
import { CommunitySeoSections } from "@/components/community/CommunitySeoSections";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Separator } from "@/components/ui/separator";
import bonusHuntArkivHero from "@/assets/bonus-hunt-arkiv-hero.jpg";

const faqItems = [
  {
    question: "Hvad er et Bonus Hunt arkiv?",
    answer: "Bonus Hunt arkivet dokumenterer alle vores live bonus hunts på Twitch med detaljerede resultater. Du kan se hvilke spillemaskiner der blev åbnet, startbalance, gennemsnitlig multiplikator og samlet performance for hver hunt."
  },
  {
    question: "Hvordan udføres en bonus hunt?",
    answer: "Vi køber bonusser på en række spillemaskiner, noterer startbalancen, og åbner dem derefter én efter én live på stream. Alle resultater logges automatisk, og gennemsnitlig X beregnes fra de samlede gevinster."
  },
  {
    question: "Kan jeg deltage i bonus hunts?",
    answer: "Ja! Du kan deltage i community bets under live hunts via vores Twitch-kanal. Du kan gætte på gennemsnitlig X (AVG X bet) eller samlet gevinst (Guess The Win) og vinde credits og præmier."
  },
  {
    question: "Hvornår streames bonus hunts?",
    answer: "Bonus hunts streames jævnligt på vores Twitch-kanal. Følg med på bonus-hunt siden for at se næste planlagte hunt og aktuelle live-sessions."
  },
];

export default function BonusHuntArkiv() {
  const { data: archives, isLoading } = useBonusHuntArchives();

  const stats = {
    total: archives?.length || 0,
    totalSlots: archives?.reduce((sum, h) => sum + (h.total_slots || 0), 0) || 0,
    avgX: archives && archives.length > 0
      ? (archives.reduce((sum, h) => sum + (Number(h.average_x) || 0), 0) / archives.length).toFixed(2)
      : "0",
    bestHunt: archives?.reduce((best, h) => (Number(h.average_x) || 0) > (Number(best?.average_x) || 0) ? h : best, archives[0]),
  };

  const seoTitle = "Bonus Hunt Arkiv – Alle Dokumenterede Resultater & Statistik";
  const seoDesc = `Se alle ${stats.total} dokumenterede bonus hunts med detaljerede resultater. Gennemsnitlig X, slot-lister og live test-data fra vores Twitch-streams.`;

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDesc,
    url: `${SITE_URL}/bonus-hunt/arkiv`,
    datePublished: "2026-03-05",
    dateModified: "2026-03-05",
    authorName: "Kevin",
  });

  const faqSchema = buildFaqSchema(faqItems);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        jsonLd={[articleSchema, faqSchema]}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-20"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(260 70% 25% / 0.95), hsl(210 80% 30% / 0.9))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Trophy className="mr-1.5 h-3.5 w-3.5" />
              Dokumenterede Resultater
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Bonus Hunt Arkiv – Alle Live Resultater
            </h1>
            <p className="text-lg text-white/80">
              Komplet arkiv over alle dokumenterede bonus hunts fra vores{" "}
              <Link to="/bonus-hunt" className="underline hover:text-white">live Twitch-streams</Link>.
              {" "}Ægte resultater, ægte penge, fuld transparens.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="kevin" readTime="3 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={bonusHuntArkivHero}
            alt="Bonus hunt arkiv med dokumenterede resultater fra live Twitch-streams"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Trophy, label: "Dokumenterede Hunts", value: stats.total },
            { icon: Gamepad2, label: "Slots Testet", value: stats.totalSlots },
            { icon: BarChart3, label: "Gennemsnitlig X", value: `${stats.avgX}x` },
            { icon: TrendingUp, label: "Bedste Hunt X", value: stats.bestHunt ? `${Number(stats.bestHunt.average_x).toFixed(2)}x` : "–" },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 p-4">
                <Icon className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Archive Cards */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Indlæser arkiv...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {archives?.map((hunt) => (
              <Card key={hunt.id} className="group hover:border-primary/50 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {hunt.hunt_name || `Bonus Hunt #${hunt.hunt_number}`}
                    </CardTitle>
                    <Badge variant="outline" className="shrink-0">#{hunt.hunt_number}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Slots</div>
                      <div className="text-lg font-bold text-foreground">{hunt.total_slots || 0}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Åbnet</div>
                      <div className="text-lg font-bold text-foreground">{hunt.opened_slots || 0}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Gns. X</div>
                      <div className="text-lg font-bold text-primary">
                        {hunt.average_x ? `${Number(hunt.average_x).toFixed(2)}x` : "–"}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Start: {hunt.start_balance ? `${Number(hunt.start_balance).toLocaleString("da-DK")} kr` : "–"}
                    </span>
                    <Link
                      to={`/bonus-hunt?hunt=${hunt.hunt_number}`}
                      className="flex items-center gap-1 text-primary hover:underline font-medium"
                    >
                      Se detaljer <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-12 space-y-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">Om Bonus Hunt Arkivet</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bonus hunt-arkivet er en komplet dokumentation af alle vores live bonus hunts på Twitch. Hver hunt
            repræsenterer en session, hvor vi køber bonusser på en række{" "}
            <Link to="/slot-database" className="text-primary hover:underline">spillemaskiner</Link> og åbner dem
            én for én foran vores community.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vi spiller altid med rigtige penge på{" "}
            <Link to="/casino-anmeldelser/spildansknu" className="text-primary hover:underline">licenserede danske casinoer</Link>,
            og alle resultater logges automatisk via vores StreamSystem-integration. Det sikrer 100% transparens
            og gør det muligt at verificere alle tal.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Sådan læser du statistikkerne</h3>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Gennemsnitlig X</strong> viser den gennemsnitlige multiplikator på tværs af alle åbnede bonusser
            i en hunt. En X over 100 betyder, at huntens samlede gevinst oversteg den samlede investering – med andre
            ord en profitabel session. <strong>Startbalance</strong> er det beløb, der var investeret i bonuskøb,
            og <strong>slots</strong> viser det totale antal maskiner i hunten.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Community-deltagelse</h3>
          <p className="text-muted-foreground leading-relaxed">
            Under aktive hunts kan du deltage i community bets direkte fra{" "}
            <Link to="/bonus-hunt" className="text-primary hover:underline font-medium">bonus hunt-siden</Link>. Gæt på
            gennemsnitlig X eller samlet gevinst og konkurrér med andre community-medlemmer om credits og præmier
            i vores <Link to="/community/turneringer" className="text-primary hover:underline">månedlige turneringer</Link>.
          </p>
        </section>

        <div className="mt-12">
          <FAQSection faqs={faqItems} />
        </div>

        <Separator className="my-12" />
        <CommunitySeoSections />
        <Separator className="my-12" />
        <RelatedGuides currentPath="/bonus-hunt/arkiv" />
        <Separator className="my-12" />
        <AuthorBio author="kevin" />
      </div>
    </>
  );
}
