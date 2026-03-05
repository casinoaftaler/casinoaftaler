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
import { useSlotCatalog } from "@/hooks/useSlotCatalog";
import { buildArticleSchema, buildFaqSchema, SITE_URL } from "@/lib/seo";
import { Search, TrendingUp, Zap, BarChart3, Gamepad2, Trophy } from "lucide-react";
import { CommunitySeoSections } from "@/components/community/CommunitySeoSections";
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
  "Pragmatic Play": "pragmatic-play",
  "Play'n GO": "play-n-go",
  "Play'n Go": "play-n-go",
  "NetEnt": "netent",
  "Hacksaw Gaming": "hacksaw-gaming",
  "Nolimit City": "nolimit-city",
  "Relax Gaming": "relax-gaming",
  "Big Time Gaming": "big-time-gaming",
  "Red Tiger": "red-tiger",
  "Yggdrasil": "yggdrasil",
  "Microgaming": "microgaming",
  "ELK Studios": "elk-studios",
  "Evolution Gaming": "evolution-gaming",
};

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
  const [searchQuery, setSearchQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [volatilityFilter, setVolatilityFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"bonus_count" | "highest_x" | "rtp">("bonus_count");

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

  const seoTitle = "Slot Database – 163+ Spillemaskiner Testet i Live Bonus Hunts";
  const seoDesc = "Komplet database over spillemaskiner testet i vores live bonus hunts på Twitch. Se RTP, volatilitet, højeste gevinster og community-statistikker for 163+ slots.";

  const articleSchema = buildArticleSchema({
    headline: seoTitle,
    description: seoDesc,
    url: `${SITE_URL}/slot-database`,
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
              Slot Database – Alle Spillemaskiner Testet Live
            </h1>
            <p className="text-lg text-white/80">
              Komplet oversigt over alle spillemaskiner vi har testet i vores{" "}
              <Link to="/bonus-hunt" className="underline hover:text-white">live bonus hunts</Link>.
              {" "}Ægte community-data fra vores Twitch-streams – ikke teoretiske tal.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        <AuthorMetaBar author="jonas" readTime="5 min" />

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
          Viser {filtered.length} af {slots?.length || 0} spillemaskiner
        </p>

        {/* Slot Table */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Indlæser slot-database...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
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
                {filtered.map((slot) => {
                  const guideUrl = getSlotGuideUrl(slot.slot_name);
                  const providerSlug = PROVIDER_SLUG_MAP[slot.provider];
                  return (
                    <tr key={slot.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">
                        {guideUrl ? (
                          <Link to={guideUrl} className="text-primary hover:underline">{slot.slot_name}</Link>
                        ) : slot.slot_name}
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
                        {slot.highest_x && slot.highest_x > 0 ? `${slot.highest_x}x` : "–"}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground">
                        {slot.highest_win && slot.highest_win > 0 ? `${slot.highest_win} kr` : "–"}
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
