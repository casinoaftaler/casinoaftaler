import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";
import { SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PragmaticDemoPlayer } from "@/components/PragmaticDemoPlayer";
import { slugifySlotName } from "@/lib/slugify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gamepad2, Search, Play, ChevronDown, Sparkles, X } from "lucide-react";

interface DemoSlot {
  slot_name: string;
  game_id: string;
  provider: string;
  rtp: number | null;
  volatility: string | null;
  slug: string | null;
  has_buy_feature: boolean | null;
}

function useDemoSlots() {
  return useQuery({
    queryKey: ["demo-slots"],
    queryFn: async () => {
      const batchSize = 1000;
      let all: DemoSlot[] = [];
      let from = 0;
      while (true) {
        const { data, error } = await supabase
          .from("slot_catalog")
          .select("slot_name, game_id, provider, rtp, volatility, slug, has_buy_feature")
          .not("game_id", "is", null)
          .order("slot_name")
          .range(from, from + batchSize - 1);
        if (error) throw error;
        all = all.concat((data || []) as DemoSlot[]);
        if (!data || data.length < batchSize) break;
        from += batchSize;
      }
      return all;
    },
    staleTime: 300000,
  });
}

const VOLATILITY_OPTIONS = ["Low", "Medium", "Medium-High", "High", "Extreme"];
const INITIAL_SHOW = 24;
const BATCH_SIZE = 24;

export default function GratisSlots() {
  const { data: slots, isLoading } = useDemoSlots();
  const [search, setSearch] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<DemoSlot | null>(null);
  const [volFilter, setVolFilter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW);

  const filtered = useMemo(() => {
    if (!slots) return [];
    let result = slots;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s => s.slot_name.toLowerCase().includes(q));
    }
    if (volFilter) {
      result = result.filter(s => s.volatility === volFilter);
    }
    return result;
  }, [slots, search, volFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Gratis Spillemaskiner – Prøv Demo Slots",
    description: "Spil gratis demo-versioner af Pragmatic Play spillemaskiner. Ingen registrering krævet.",
    url: `${SITE_URL}/gratis-slots`,
    numberOfItems: slots?.length || 0,
  };

  return (
    <>
      <SEO
        title="Gratis Spillemaskiner – Prøv Demo Slots | Casinoaftaler"
        description="Spil 400+ gratis Pragmatic Play spillemaskiner direkte i browseren. Ingen registrering, ingen indbetaling – kun ren demo-underholdning."
        jsonLd={jsonLd}
      />

      <div className="container py-4">
        <Breadcrumbs dynamicLabel="Gratis Slots" />
      </div>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-12 text-white md:py-16"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(260 70% 25%), hsl(250 60% 20%) 40%, hsl(210 80% 25%))",
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Gratis Demo
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Gratis Spillemaskiner
            </h1>
            <p className="text-lg text-white/80">
              Prøv {slots?.length || "400+"} Pragmatic Play spillemaskiner helt gratis – direkte i browseren.
              Ingen registrering, ingen risiko. Spil med fiktive penge.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12">
        {/* Active demo player */}
        {selectedSlot && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">{selectedSlot.slot_name}</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedSlot(null)}>
                <X className="h-4 w-4 mr-1" /> Luk demo
              </Button>
            </div>
            <PragmaticDemoPlayer gameId={selectedSlot.game_id} slotName={selectedSlot.slot_name} />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Søg efter spillemaskin..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(INITIAL_SHOW); }}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {VOLATILITY_OPTIONS.map(v => (
              <Button
                key={v}
                variant={volFilter === v ? "default" : "outline"}
                size="sm"
                onClick={() => { setVolFilter(volFilter === v ? null : v); setVisibleCount(INITIAL_SHOW); }}
              >
                {v}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Viser {Math.min(visibleCount, filtered.length)} af {filtered.length} spillemaskiner med gratis demo
        </p>

        {isLoading && <p className="text-muted-foreground">Indlæser spillemaskiner...</p>}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {visible.map(slot => (
            <div
              key={slot.game_id}
              className="group rounded-lg border border-border bg-card p-3 flex flex-col gap-2 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
              onClick={() => { setSelectedSlot(slot); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <div className="relative w-full aspect-[4/3] bg-muted/30 rounded-md overflow-hidden">
                <img
                  src={`https://zhpbqqhtgnblaugrqhqi.supabase.co/storage/v1/object/public/slot-thumbnails/${slot.game_id}.webp`}
                  alt={slot.slot_name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center">
                  <Gamepad2 className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-sm font-medium leading-tight line-clamp-2">{slot.slot_name}</h3>
              <div className="flex flex-wrap gap-1 mt-auto">
                {slot.rtp && <Badge variant="outline" className="text-[10px]">{slot.rtp}%</Badge>}
                {slot.volatility && <Badge variant="secondary" className="text-[10px]">{slot.volatility}</Badge>}
                {slot.has_buy_feature && <Badge variant="secondary" className="text-[10px]">Buy</Badge>}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-1 text-xs gap-1">
                <Play className="h-3 w-3" /> Spil Gratis
              </Button>
            </div>
          ))}
        </div>

        {hasMore && (
          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => setVisibleCount(prev => prev + BATCH_SIZE)}
          >
            <ChevronDown className="h-4 w-4 mr-2" />
            Vis {Math.min(BATCH_SIZE, filtered.length - visibleCount)} mere ({filtered.length - visibleCount} tilbage)
          </Button>
        )}

        {/* SEO content */}
        <section className="mt-12 prose prose-sm dark:prose-invert max-w-none">
          <h2>Om Gratis Spillemaskiner</h2>
          <p>
            Her kan du prøve alle Pragmatic Play spillemaskiner helt gratis, direkte i din browser.
            Demo-versionerne bruger fiktive penge og kræver ingen registrering eller indbetaling.
            Det er den perfekte måde at lære nye spil at kende, teste strategier eller bare nyde
            underholdningen uden risiko.
          </p>
          <p>
            Alle demo-spil er leveret via vores officielle{" "}
            <Link to="/pragmatic-play-partner" className="text-primary hover:underline">
              Pragmatic Play partnerskab
            </Link>
            , som sikrer at du altid spiller de nyeste og mest autentiske versioner.
          </p>
          <h3>Hvad er en demo-spillemaskin?</h3>
          <p>
            En demo-spillemaskin er en gratis version af et rigtigt casinospil. Den bruger de
            samme matematiske modeller (RTP, volatilitet, gevinsttabeller) som den rigtige
            pengeversion, men du spiller med virtuelle credits i stedet for ægte penge.
          </p>
          <h3>Fordele ved at spille gratis</h3>
          <ul>
            <li>Lær spillets mekanik og bonusfunktioner at kende</li>
            <li>Ingen økonomisk risiko – spil så meget du vil</li>
            <li>Test forskellige indsatsstrategier</li>
            <li>Find din foretrukne spillemaskin før du spiller for rigtige penge</li>
          </ul>
          <p>
            Se vores{" "}
            <Link to="/slot-database" className="text-primary hover:underline">
              komplette slot database
            </Link>{" "}
            for detaljerede statistikker, eller læs om{" "}
            <Link to="/ansvarligt-spil" className="text-primary hover:underline">
              ansvarligt spil
            </Link>{" "}
            inden du spiller for rigtige penge. 18+.
          </p>
        </section>

        <noscript>
          <ul>
            {(slots || []).map(s => (
              <li key={s.game_id}>
                <a href={`/slot-katalog/${s.slug || slugifySlotName(s.slot_name)}`}>{s.slot_name}</a>
                {s.rtp ? ` – RTP: ${s.rtp}%` : ""}
              </li>
            ))}
          </ul>
        </noscript>
      </div>
    </>
  );
}
