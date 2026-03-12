import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { AuthorMetaBar } from "@/components/AuthorMetaBar";
import { AuthorBio } from "@/components/AuthorBio";
import { FAQSection } from "@/components/FAQSection";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSlotCatalog } from "@/hooks/useSlotCatalog";
import { slugifySlotName } from "@/lib/slugify";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { buildSlotCatalogSchema } from "@/lib/slotCatalogSchema";
import { useLatestCatalogUpdate } from "@/hooks/useProviderSlots";
import { Search, TrendingUp, BarChart3, Gamepad2, Trophy, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { CommunitySeoSections } from "@/components/community/CommunitySeoSections";
import { SlotDatabaseSeoContent } from "@/components/seo-content/SlotDatabaseSeoContent";
import { CommunityBrandBlock } from "@/components/community/CommunityBrandBlock";
import { RelatedGuides } from "@/components/RelatedGuides";
import { Separator } from "@/components/ui/separator";
import slotDatabaseHero from "@/assets/slot-database-hero.jpg";

const SLUG_MAP: Record<string, string> = {
  "Sweet Bonanza": "sweet-bonanza",
  "Book Of Dead": "book-of-dead",
  "Gates Of Olympus": "gates-of-olympus",
  "Starburst": "starburst",
  "Razor Shark": "razor-shark",
  "Big Bass Bonanza": "big-bass-bonanza",
  "Dead Or Alive 2": "dead-or-alive-2",
  "Gonzo's Quest": "gonzos-quest",
  "Reactoonz": "reactoonz",
  "Money Train 3": "money-train-3",
  "Wolf Gold": "wolf-gold",
  "The Dog House": "the-dog-house",
  "Jammin' Jars": "jammin-jars",
  "Bonanza": "bonanza",
  "Fire Joker": "fire-joker",
  "Legacy Of Dead": "legacy-of-dead",
  "Divine Fortune": "divine-fortune",
  "Eye Of Horus": "eye-of-horus",
  "Buffalo King": "buffalo-king",
  "Sugar Rush": "sugar-rush",
  "Cleopatra": "cleopatra",
  "Mega Moolah": "mega-moolah",
  "Thunderstruck Ii": "thunderstruck-ii",
  "Immortal Romance": "immortal-romance",
  "Wild West Gold": "wild-west-gold",
  "Madame Destiny Megaways": "madame-destiny-megaways",
  "Extra Chilli Megaways": "extra-chilli-megaways",
  "Wanted Dead Or A Wild": "wanted-dead-or-a-wild",
  "Chaos Crew": "chaos-crew",
  "Joker Strike": "joker-strike",
};

function getSlotGuideUrl(name: string): string | null {
  const slug = SLUG_MAP[name];
  return slug ? `/casinospil/spillemaskiner/${slug}` : null;
}

function getVolatilityColor(vol: string | null) {
  if (!vol) return "secondary";
  const v = vol.toLowerCase();
  if (v === "extreme") return "destructive";
  if (v === "high") return "default";
  return "secondary";
}

const PROVIDER_SLUG_MAP: Record<string, string> = {
  "pragmatic play": "pragmatic-play",
  "play'n go": "play-n-go",
  "play'n go gaming": "play-n-go",
  "play n go": "play-n-go",
  "netent": "netent",
  "hacksaw gaming": "hacksaw-gaming",
  "nolimit city": "nolimit-city",
  "relax gaming": "relax-gaming",
  "big time gaming": "big-time-gaming",
  "red tiger": "red-tiger",
  "red tiger gaming": "red-tiger",
  "yggdrasil": "yggdrasil",
  "yggdrasil gaming": "yggdrasil",
  "microgaming": "microgaming",
  "elk studios": "elk-studios",
  "evolution gaming": "evolution-gaming",
};

function resolveProviderSlug(provider: string): string | null {
  return PROVIDER_SLUG_MAP[provider.trim().toLowerCase()] || null;
}

const ROWS_PER_PAGE = 100;

const faqItems = [
  {
    question: "Hvad er slot-databasen?",
    answer: "Slot-databasen er en samling af alle spillemaskiner, vi har testet i vores live bonus hunts på Twitch. Hver maskine har community-data som højeste gevinst, gennemsnitlig multiplikator og antal bonus hunt-optrædener."
  },
  {
    question: "Hvordan opdateres dataen?",
    answer: "Dataen opdateres automatisk efter hver bonus hunt. Når vi åbner en bonus, registreres gevinsten, og statistikkerne opdateres i realtid."
  },
  {
    question: "Hvad betyder 'Antal Hunts'?",
    answer: "Antal hunts viser, hvor mange gange maskinen har optrådt i vores dokumenterede bonus hunts. Jo flere hunts, jo mere pålidelig er den gennemsnitlige performance-data."
  },
  {
    question: "Kan jeg stole på RTP-tallene?",
    answer: "RTP-tallene er hentet fra de officielle spiludvikler-specifikationer og verificeret mod branchekilder. Vores community-data viser den faktiske performance i vores tests, som kan afvige fra den teoretiske RTP."
  },
];

export default function SlotDatabase() {
  const { data: slots, isLoading } = useSlotCatalog();
  const { data: freshness } = useLatestCatalogUpdate();
  const [searchQuery, setSearchQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [volatilityFilter, setVolatilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"bonus_count" | "highest_x" | "rtp">("bonus_count");
  const [currentPage, setCurrentPage] = useState(1);

  const providers = useMemo(() => {
    if (!slots) return [];
    const set = new Set(slots.map(s => s.provider).filter(p => p && p !== "Custom Slot" && p !== "Unknown"));
    return Array.from(set).sort();
  }, [slots]);

  const filtered = useMemo(() => {
    if (!slots) return [];
    let result = [...slots];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.slot_name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q));
    }
    if (providerFilter !== "all") {
      result = result.filter(s => s.provider === providerFilter);
    }
    if (volatilityFilter !== "all") {
      result = result.filter(s => s.volatility?.toLowerCase() === volatilityFilter);
    }
    result.sort((a, b) => {
      if (sortBy === "bonus_count") return b.bonus_count - a.bonus_count;
      if (sortBy === "highest_x") return (b.highest_x || 0) - (a.highest_x || 0);
      if (sortBy === "rtp") return (b.rtp || 0) - (a.rtp || 0);
      return 0;
    });
    return result;
  }, [slots, searchQuery, providerFilter, volatilityFilter, sortBy]);

  // Reset page when filters change
  useMemo(() => { setCurrentPage(1); }, [searchQuery, providerFilter, volatilityFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginatedSlots = useMemo(() => {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    return filtered.slice(start, start + ROWS_PER_PAGE);
  }, [filtered, currentPage]);

  const stats = useMemo(() => {
    if (!slots) return { total: 0, providers: 0, avgRtp: 0, totalHunts: 0 };
    const providersSet = new Set(slots.map(s => s.provider).filter(p => p && p !== "Custom Slot" && p !== "Unknown"));
    const rtpSlots = slots.filter(s => s.rtp && s.rtp > 0);
    const avgRtp = rtpSlots.length > 0 ? rtpSlots.reduce((sum, s) => sum + (s.rtp || 0), 0) / rtpSlots.length : 0;
    return {
      total: slots.length,
      providers: providersSet.size,
      avgRtp: avgRtp.toFixed(2),
      totalHunts: slots.reduce((sum, s) => sum + s.bonus_count, 0),
    };
  }, [slots]);

  const slotCount = stats.total || 1400;
  const slotCountLabel = `${slotCount}+`;

  const seoTitle = `Slot Database – ${slotCountLabel} Spillemaskiner med Community Data`;
  const seoDesc = `Komplet database over ${slotCountLabel} spillemaskiner testet i live bonus hunts. Se RTP, volatilitet, højeste gevinster og community-statistikker for alle slots.`;

  // Dynamic dateModified from real catalog data
  const dynamicDateModified = freshness?.lastUpdated
    ? freshness.lastUpdated.split("T")[0]
    : new Date().toISOString().split("T")[0];

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDesc,
    url: `${SITE_URL}/slot-database`,
    datePublished: "2026-03-05",
    dateModified: dynamicDateModified,
    authorName: "Jonas Theill",
  });

  const faqSchema = buildFaqSchema(faqItems);

  // SoftwareApplication schema for the current page of slots
  const slotSchema = paginatedSlots.length > 0
    ? buildSlotCatalogSchema(paginatedSlots, `${SITE_URL}/slot-katalog`)
    : null;

  const jsonLdSchemas = [articleSchema, faqSchema, ...(slotSchema ? [slotSchema] : [])];

  // Freshness label
  const freshnessLabel = freshness?.latestHuntNumber
    ? `Data opdateret efter Bonus Hunt #${freshness.latestHuntNumber}${
        freshness.latestHuntDate ? ` · ${freshness.latestHuntDate}` : ""
      }`
    : null;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        jsonLd={jsonLdSchemas}
      />

      {/* TYPE A: Centered hero with badge */}
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
              <Gamepad2 className="mr-1.5 h-3.5 w-3.5" />
              Live Data fra Bonus Hunts
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Slot Database – {slotCountLabel} Spillemaskiner Testet Live
            </h1>
            <p className="text-lg text-white/80">
              Komplet oversigt over alle spillemaskiner vi har testet i vores{" "}
              <Link to="/bonus-hunt" className="underline hover:text-white">live bonus hunts</Link>.
              {" "}Ægte community-data fra vores Twitch-streams – ikke teoretiske tal. Se <Link to="/ordbog/rtp" className="underline hover:text-white">RTP</Link>, <Link to="/ordbog/volatilitet" className="underline hover:text-white">volatilitet</Link> og performance for {slotCountLabel} slots.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="28 min" />

        {freshnessLabel && (
          <div className="flex items-center gap-2 mb-4 mt-2">
            <Badge variant="outline" className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" />
              {freshnessLabel}
            </Badge>
          </div>
        )}

        <div className="mb-10 overflow-hidden rounded-xl">
          <img
            src={slotDatabaseHero}
            alt="Slot database med spillemaskiners RTP, volatilitet og community-statistikker"
            className="w-full h-auto object-cover max-h-[400px]"
            loading="eager"
          />
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Gamepad2, label: "Spillemaskiner", value: stats.total },
            { icon: TrendingUp, label: "Unikke Udbydere", value: stats.providers },
            { icon: BarChart3, label: "Gns. RTP", value: `${stats.avgRtp}%` },
            { icon: Trophy, label: "Bonus Hunt Tests", value: stats.totalHunts },
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

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Søg efter spillemaskine eller udbyder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={providerFilter} onValueChange={setProviderFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Udbyder" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Udbydere</SelectItem>
              {providers.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={volatilityFilter} onValueChange={setVolatilityFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Volatilitet" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="extreme">Extreme</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sortér" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bonus_count">Flest Hunts</SelectItem>
              <SelectItem value="highest_x">Højeste X</SelectItem>
              <SelectItem value="rtp">Højeste RTP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Viser {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} af {filtered.length} spillemaskiner
        </p>

        {/* noscript fallback for crawlers that don't execute JS */}
        <noscript>
          <div className="rounded-lg border border-border p-6 my-8 bg-muted/30">
            <h2 className="text-xl font-bold mb-3">Slot Database – 1.400+ Spillemaskiner</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Denne database indeholder over 1.400 spillemaskiner testet og catalogiseret med data fra vores live bonus hunts på Twitch.
              Hver maskine har detaljerede data om RTP, volatilitet, højeste multiplikator (X) og antal
              bonus hunt-optrædener. Databasen dækker udbydere som Pragmatic Play, Hacksaw Gaming,
              Nolimit City, Play'n GO, NetEnt, Big Time Gaming, Red Tiger, ELK Studios, Yggdrasil og mange flere.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Populære spillemaskiner i databasen inkluderer Sweet Bonanza, Book of Dead, Gates of Olympus,
              Wanted Dead or a Wild, Big Bass Bonanza, Starburst, Money Train 3, Sugar Rush, Wolf Gold
              og Chaos Crew. Se den fulde interaktive tabel ved at aktivere JavaScript.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Læs mere om <a href="/casinospil/spillemaskiner" className="text-primary underline">spillemaskiner</a>,
              <a href="/bonus-hunt" className="text-primary underline"> bonus hunts</a> og
              <a href="/casino-bonus" className="text-primary underline"> casino bonusser</a>.
            </p>
          </div>
        </noscript>

        {/* Slot Table */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Indlæser slot-database...</div>
        ) : (
          <>
            <div className="rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-foreground">Spillemaskine</th>
                      <th className="px-4 py-3 text-left font-medium text-foreground">Udbyder</th>
                      <th className="px-4 py-3 text-center font-medium text-foreground">RTP</th>
                      <th className="px-4 py-3 text-center font-medium text-foreground">Volatilitet</th>
                      <th className="px-4 py-3 text-center font-medium text-foreground">Højeste X</th>
                      <th className="px-4 py-3 text-center font-medium text-foreground">Højeste Gevinst</th>
                      <th className="px-4 py-3 text-center font-medium text-foreground">Antal Hunts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSlots.map((slot) => {
                      const guideUrl = getSlotGuideUrl(slot.slot_name);
                      const providerSlug = resolveProviderSlug(slot.provider);
                      return (
                        <tr key={slot.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-medium text-foreground">
                            {guideUrl ? (
                              <Link to={guideUrl} className="text-primary hover:underline">{slot.slot_name}</Link>
                            ) : (
                              <Link to={`/slot-katalog/${slugifySlotName(slot.slot_name)}`} className="text-primary hover:underline">{slot.slot_name}</Link>
                            )}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {providerSlug ? (
                              <Link to={`/spiludviklere/${providerSlug}`} className="text-primary/80 hover:underline">{slot.provider}</Link>
                            ) : slot.provider}
                          </td>
                          <td className="px-4 py-3 text-center text-muted-foreground">
                            {slot.rtp ? `${slot.rtp}%` : "–"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {slot.volatility ? (
                              <Badge variant={getVolatilityColor(slot.volatility)}>{slot.volatility}</Badge>
                            ) : "–"}
                          </td>
                          <td className="px-4 py-3 text-center font-semibold text-foreground">
                            {slot.highest_x && slot.highest_x > 0 ? `${Number(slot.highest_x.toFixed(1))}x` : "–"}
                          </td>
                          <td className="px-4 py-3 text-center text-muted-foreground">
                            {slot.highest_win && slot.highest_win > 0 ? `${Number(slot.highest_win.toFixed(1))} kr` : "–"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Badge variant="outline">{slot.bonus_count}</Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination – uses <a href> for crawlability alongside onClick for SPA nav */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Side {currentPage} af {totalPages}
                </p>
                <nav aria-label="Sidenavigation" className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    asChild={currentPage > 1}
                  >
                    {currentPage > 1 ? (
                      <a href={`/slot-database?side=${currentPage - 1}`} onClick={(e) => e.preventDefault()}>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Forrige
                      </a>
                    ) : (
                      <span>
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Forrige
                      </span>
                    )}
                  </Button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let page: number;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    return (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        className="w-9"
                        onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        asChild={page !== currentPage}
                      >
                        {page !== currentPage ? (
                          <a href={`/slot-database?side=${page}`} onClick={(e) => e.preventDefault()}>
                            {page}
                          </a>
                        ) : (
                          <span>{page}</span>
                        )}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    asChild={currentPage < totalPages}
                  >
                    {currentPage < totalPages ? (
                      <a href={`/slot-database?side=${currentPage + 1}`} onClick={(e) => e.preventDefault()}>
                        Næste
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    ) : (
                      <span>
                        Næste
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    )}
                  </Button>
                </nav>
              </div>
            )}
          </>
        )}

        <SlotDatabaseSeoContent />

        <div className="mt-12">
          <FAQSection faqs={faqItems} />
        </div>

        <Separator className="my-12" />
        <CommunityBrandBlock />
        <Separator className="my-12" />
        <CommunitySeoSections />
        <Separator className="my-12" />
        <RelatedGuides currentPath="/slot-database" />
        <Separator className="my-12" />
        <AuthorBio author="jonas" />
      </div>
    </>
  );
}
