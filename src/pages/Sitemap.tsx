import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { seoRoutes } from "@/lib/seoRoutes";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { slugifySlotName } from "@/lib/slugify";

// ── Static sitemap grouping (Tab 1) ──

interface RouteGroup {
  title: string;
  prefix: string;
  routes: typeof seoRoutes;
}

function groupRoutes(): RouteGroup[] {
  const groups: { title: string; prefix: string }[] = [
    { title: "Forside", prefix: "/" },
    { title: "Casino Anmeldelser", prefix: "/casino-anmeldelser" },
    { title: "Nye Casinoer", prefix: "/nye-casinoer" },
    { title: "Casino Spil", prefix: "/casinospil" },
    { title: "Live Casino", prefix: "/live-casino" },
    { title: "Bonusguides", prefix: "/casino-bonus|/velkomstbonus|/free-spins|/indskudsbonus|/omsaetningskrav|/bonus-uden|/no-sticky|/sticky-bonus" },
    { title: "Spiludviklere", prefix: "/spiludviklere" },
    { title: "Betalingsmetoder", prefix: "/betalingsmetoder" },
    { title: "Casino Guides", prefix: "/casinoer|/licenserede|/casino-licenser" },
    { title: "Casino Nyheder", prefix: "/casino-nyheder" },
    { title: "Info & Ansvarligt Spil", prefix: "/ansvarligt-spil|/spillemyndigheden|/om|/forretningsmodel|/redaktionel|/kontakt|/forfatter|/saadan|/privatlivspolitik|/terms|/cookies|/top-10" },
    { title: "Community", prefix: "/community|/highlights" },
  ];

  const used = new Set<string>();
  const result: RouteGroup[] = [];

  for (const group of groups) {
    const prefixes = group.prefix.split("|");
    const matching = seoRoutes.filter((r) => {
      if (used.has(r.path)) return false;
      if (group.prefix === "/" && r.path === "/") return true;
      return prefixes.some((p) => r.path.startsWith(p));
    });
    if (matching.length > 0) {
      matching.forEach((r) => used.add(r.path));
      result.push({ ...group, routes: matching });
    }
  }

  const remaining = seoRoutes.filter((r) => !used.has(r.path));
  if (remaining.length > 0) {
    result.push({ title: "Øvrige sider", prefix: "", routes: remaining });
  }

  return result;
}

function pathToLabel(path: string): string {
  if (path === "/") return "Forside";
  return path
    .split("/")
    .filter(Boolean)
    .pop()!
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ── Alphabetical grouping helper ──

const ALPHABET = [
  "#", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Æ", "Ø", "Å",
];

function groupAlphabetically<T>(items: T[], getName: (item: T) => string) {
  const groups = new Map<string, T[]>();
  for (const letter of ALPHABET) groups.set(letter, []);

  for (const item of items) {
    const firstChar = getName(item).charAt(0).toUpperCase();
    if (/[A-ZÆØÅ]/.test(firstChar)) {
      const bucket = groups.get(firstChar);
      if (bucket) bucket.push(item);
      else groups.get("#")!.push(item);
    } else {
      groups.get("#")!.push(item);
    }
  }

  return ALPHABET
    .filter((letter) => (groups.get(letter)?.length ?? 0) > 0)
    .map((letter) => ({ letter, items: groups.get(letter)! }));
}

// ── Data hooks ──

function useSitemapCasinos() {
  return useQuery({
    queryKey: ["sitemap-casinos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casinos_public")
        .select("name, slug")
        .eq("is_active", true)
        .order("name");
      if (error) throw error;
      return (data || []) as { name: string; slug: string }[];
    },
    staleTime: 3600000, // 1 hour
  });
}

function useSitemapSlots() {
  return useQuery({
    queryKey: ["sitemap-slots"],
    queryFn: async () => {
      const batchSize = 1000;
      let allData: { slot_name: string; slug: string | null }[] = [];
      let from = 0;
      while (true) {
        const { data, error } = await supabase
          .from("slot_catalog")
          .select("slot_name, slug")
          .order("slot_name")
          .range(from, from + batchSize - 1);
        if (error) throw error;
        allData = allData.concat((data || []) as { slot_name: string; slug: string | null }[]);
        if (!data || data.length < batchSize) break;
        from += batchSize;
      }
      return allData;
    },
    staleTime: 3600000,
  });
}

// ── Tab Components ──

function StaticSitemapTab() {
  const groups = groupRoutes();
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="text-lg font-semibold mb-3 text-foreground">{group.title}</h2>
          <ul className="space-y-1.5">
            {group.routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {pathToLabel(route.path)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function CasinoSitemapTab() {
  const { data: casinos, isLoading } = useSitemapCasinos();

  if (isLoading) return <p className="text-muted-foreground">Indlæser casinoer…</p>;
  if (!casinos?.length) return <p className="text-muted-foreground">Ingen casinoer fundet.</p>;

  const grouped = groupAlphabetically(casinos, (c) => c.name);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {grouped.map(({ letter }) => (
          <a
            key={letter}
            href={`#casino-${letter}`}
            className="px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {grouped.map(({ letter, items }) => (
          <section key={letter} id={`casino-${letter}`}>
            <h2 className="text-lg font-semibold mb-3 text-foreground">{letter}</h2>
            <ul className="space-y-1.5">
              {items.map((casino) => (
                <li key={casino.slug}>
                  <Link
                    to={`/casino-anmeldelser/${casino.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {casino.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function SlotSitemapTab() {
  const { data: slots, isLoading } = useSitemapSlots();

  if (isLoading) return <p className="text-muted-foreground">Indlæser spillemaskiner…</p>;
  if (!slots?.length) return <p className="text-muted-foreground">Ingen spillemaskiner fundet.</p>;

  const grouped = groupAlphabetically(slots, (s) => s.slot_name);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {grouped.map(({ letter }) => (
          <a
            key={letter}
            href={`#slot-${letter}`}
            className="px-2 py-1 text-xs font-medium rounded bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {grouped.map(({ letter, items }) => (
          <section key={letter} id={`slot-${letter}`}>
            <h2 className="text-lg font-semibold mb-3 text-foreground">{letter}</h2>
            <ul className="space-y-1.5">
              {items.map((slot) => {
                const slug = slot.slug || slugifySlotName(slot.slot_name);
                return (
                  <li key={slug}>
                    <Link
                      to={`/slot-katalog/${slug}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {slot.slot_name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

// ── Noscript fallback for crawlers ──

function NoscriptFallback() {
  return (
    <noscript>
      <div>
        <h2>Casino Anmeldelser</h2>
        <p>Se alle vores casino anmeldelser på <a href="/casino-anmeldelser">Casino Anmeldelser</a>.</p>
        <h2>Slot Katalog</h2>
        <p>Udforsk alle spillemaskiner i vores <a href="/slot-katalog">Slot Katalog</a> med over 1.400 slots inklusiv statistik fra live bonus hunts.</p>
      </div>
    </noscript>
  );
}

// ── Main Component ──

export default function Sitemap() {
  return (
    <>
      <SEO
        title="Sitemap"
        description="Komplet oversigt over alle sider på Casinoaftaler.dk – find hurtigt casino anmeldelser, bonusguides, spiludviklere og meget mere."
        noindex
      />
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
        <p className="text-muted-foreground mb-8">
          Her finder du en komplet oversigt over alle sider på vores website. Klik på et link for at navigere direkte til siden.
        </p>

        <Tabs defaultValue="sitemap" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
            <TabsTrigger value="casinos">Anmeldelser af Casinoer</TabsTrigger>
            <TabsTrigger value="slots">Casinospil</TabsTrigger>
          </TabsList>

          <TabsContent value="sitemap">
            <StaticSitemapTab />
          </TabsContent>

          <TabsContent value="casinos">
            <CasinoSitemapTab />
          </TabsContent>

          <TabsContent value="slots">
            <SlotSitemapTab />
          </TabsContent>
        </Tabs>

        <NoscriptFallback />
      </div>
    </>
  );
}
