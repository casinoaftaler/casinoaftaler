import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMonthlyTournamentArchive } from "@/hooks/useMonthlyTournamentArchive";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { Trophy, Crown, Calendar } from "lucide-react";
import turneringsArkivHero from "@/assets/turneringsarkiv-hero.jpg";

const CATEGORY_LABELS: Record<string, { label: string; game: string; metric: string }> = {
  points: { label: "Flest Point", game: "Fedesvin Bonanza", metric: "point" },
  multiplier: { label: "Højeste X", game: "Book of Fedesvin", metric: "x" },
  biggest_win: { label: "Største Gevinst", game: "Rise of Fedesvin", metric: "credits" },
};

const MONTH_NAMES = [
  "Januar", "Februar", "Marts", "April", "Maj", "Juni",
  "Juli", "August", "September", "Oktober", "November", "December",
];

function formatMonth(monthStr: string) {
  const [year, month] = monthStr.split("-");
  const monthIndex = parseInt(month, 10) - 1;
  return `${MONTH_NAMES[monthIndex]} ${year}`;
}

const faqItems = [
  {
    question: "Hvad er turneringsarkivet?",
    answer: "Turneringsarkivet dokumenterer alle afsluttede månedlige turneringer med vindere, top 10 leaderboards og præmiefordelinger. Hver måned nulstilles turneringerne, og vinderne arkiveres automatisk."
  },
  {
    question: "Hvordan vinder man en turnering?",
    answer: "Der er tre kategorier: Flest Point (Fedesvin Bonanza), Højeste X (Book of Fedesvin) og Største Gevinst (Rise of Fedesvin). Vinderne i hver kategori modtager kontante præmier på 500 kr, 300 kr og 200 kr."
  },
  {
    question: "Koster det noget at deltage?",
    answer: "Nej, deltagelse er helt gratis. Alle brugere får 2.000 daglige credits, som bruges på tværs af de tre turneringsspil. Der er ingen indbetalinger eller rigtige penge involveret."
  },
  {
    question: "Hvornår nulstilles turneringerne?",
    answer: "Turneringerne nulstilles automatisk den 1. i hver måned kl. 00:00 dansk tid. Alle spillere starter forfra, og vinderne fra den foregående måned arkiveres her."
  },
];

export default function TurneringsArkiv() {
  const { data: archiveMonths, isLoading } = useMonthlyTournamentArchive(100);
  const archives = archiveMonths?.flatMap(m => m.entries) || [];

  const byMonth = archives.reduce((acc, entry) => {
    const month = entry.month;
    if (!acc[month]) acc[month] = [];
    acc[month].push(entry);
    return acc;
  }, {} as Record<string, typeof archives>);

  const months = Object.keys(byMonth).sort().reverse();

  const seoTitle = "Turneringsarkiv – Månedlige Vindere & Leaderboards";
  const seoDesc = `Se alle tidligere turneringsvindere og top 10 leaderboards. ${months.length} måneder med community-turneringer i Fedesvin Bonanza, Book of Fedesvin og Rise of Fedesvin.`;

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDesc,
    url: `${SITE_URL}/community/turneringer/arkiv`,
    datePublished: "2026-03-05",
    dateModified: "2026-03-05",
    authorName: "Jonas Theill",
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
              <Crown className="mr-1.5 h-3.5 w-3.5" />
              Historik & Vindere
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Turneringsarkiv – Alle Månedlige Vindere
            </h1>
            <p className="text-lg text-white/80">
              Komplet historik over alle månedlige turneringsvindere. Se hvem der dominerede{" "}
              <Link to="/community/turneringer" className="underline hover:text-white">turneringerne</Link>
              {" "}og tag kampen op om kontante præmier.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="3 min" />

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={turneringsArkivHero}
            alt="Turneringsarkiv med vindere og leaderboards fra månedlige community-turneringer"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Archive by month */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Indlæser arkiv...</div>
        ) : months.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Ingen arkiverede turneringer endnu. Den første turnering arkiveres ved månedsafslutning.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {months.map((month) => (
              <section key={month}>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">{formatMonth(month)}</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {byMonth[month].map((entry) => {
                    const categoryInfo = CATEGORY_LABELS[entry.category] || { label: entry.category, game: "Ukendt", metric: "" };
                    const topEntries = Array.isArray(entry.top_entries) ? entry.top_entries as any[] : [];

                    return (
                      <Card key={entry.id} className="overflow-hidden">
                        <CardHeader className="pb-3 bg-muted/30">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{categoryInfo.label}</CardTitle>
                            <Badge variant="outline" className="text-xs">{categoryInfo.game}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <Crown className="h-5 w-5 text-primary shrink-0" />
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={entry.winner_avatar_url || undefined} />
                              <AvatarFallback className="text-xs">
                                {entry.winner_display_name?.charAt(0)?.toUpperCase() || "?"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-foreground truncate">{entry.winner_display_name}</div>
                              <div className="text-xs text-muted-foreground">
                                {Number(entry.winning_value).toLocaleString("da-DK")} {categoryInfo.metric}
                              </div>
                            </div>
                            <Badge className="shrink-0">500 kr</Badge>
                          </div>

                          {topEntries.length > 1 && (
                            <div className="space-y-1.5">
                              {topEntries.slice(1, 5).map((te: any, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <span className="w-5 text-center text-muted-foreground font-medium">
                                    {i + 2}.
                                  </span>
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={te.avatar_url || undefined} />
                                    <AvatarFallback className="text-[10px]">
                                      {te.display_name?.charAt(0)?.toUpperCase() || "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-foreground truncate flex-1">{te.display_name}</span>
                                  <span className="text-muted-foreground text-xs">
                                    {Number(te.value).toLocaleString("da-DK")} {categoryInfo.metric}
                                  </span>
                                  {i === 0 && <Badge variant="outline" className="text-[10px] px-1.5">300 kr</Badge>}
                                  {i === 1 && <Badge variant="outline" className="text-[10px] px-1.5">200 kr</Badge>}
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-12 space-y-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground">Om Turneringsarkivet</h2>
          <p className="text-muted-foreground leading-relaxed">
            Hver måned kårer vi vindere i tre kategorier baseret på community-aktivitet i vores{" "}
            <Link to="/community/turneringer" className="text-primary hover:underline">spillehal-turneringer</Link>.
            Vinderne modtager kontante præmier – 500 kr for førstepladsen, 300 kr for andenpladsen og 200 kr for
            tredjepladsen i hver kategori.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Turneringerne er gratis at deltage i. Alle brugere modtager 2.000 daglige credits, som bruges på
            vores tre turneringsspil: <strong>Fedesvin Bonanza</strong> (flest point),{" "}
            <strong>Book of Fedesvin</strong> (højeste multiplikator) og <strong>Rise of Fedesvin</strong> (største
            enkelgevinst). Credits er en fiktiv valuta – vores platform er{" "}
            <Link to="/ansvarligt-spil" className="text-primary hover:underline">ikke et casino</Link>.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Deltag i denne måneds turnering</h3>
          <p className="text-muted-foreground leading-relaxed">
            Gå til <Link to="/community/turneringer" className="text-primary hover:underline font-medium">turneringssiden</Link> for
            at se den aktive turnering, dit nuværende placering på leaderboardet og resterende tid. Du kan
            også tjekke dit spilhistorik og optimere din strategi baseret på de tidligere vinderes performance
            i dette arkiv.
          </p>
        </section>

        <div className="mt-12">
          <FAQSection faqs={faqItems} />
        </div>

        <div className="mt-12">
          <AuthorBio author="jonas" />
        </div>
      </div>
    </>
  );
}
