import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SEO } from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { slugifySlotName } from "@/lib/slugify";
import { groupAlphabetically } from "@/lib/sitemapUtils";

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

export default function SitemapSlots() {
  const { data: slots, isLoading } = useSitemapSlots();
  const grouped = slots ? groupAlphabetically(slots, (s) => s.slot_name) : [];

  return (
    <>
      <SEO
        title="Sitemap: Casinospil"
        description="Komplet liste over alle 1.400+ spillemaskiner på Casinoaftaler.dk med statistik, RTP og bonus hunt data."
        noindex
      />
      <div className="container py-4">
        <Breadcrumbs />
      </div>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Sitemap: Casinospil</h1>
        <p className="text-muted-foreground mb-6">
          Alle {slots?.length ? `${slots.length.toLocaleString("da-DK")} ` : ""}spillemaskiner i vores database.
        </p>

        <nav className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          <Link to="/sitemap" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Sitemap
          </Link>
          <Link to="/sitemap/casino-anmeldelser" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Casino Anmeldelser
          </Link>
          <Link to="/sitemap/casino-bonus" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Casino Bonus
          </Link>
          <span className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground">Casinospil</span>
        </nav>

        {isLoading ? (
          <p className="text-muted-foreground">Indlæser spillemaskiner…</p>
        ) : !slots?.length ? (
          <p className="text-muted-foreground">Ingen spillemaskiner fundet.</p>
        ) : (
          <>
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
                      const s = slot.slug || slugifySlotName(slot.slot_name);
                      return (
                        <li key={s}>
                          <a
                            href={`/slot-katalog/${s}`}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {slot.slot_name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}

        <noscript>
          <div>
            <p>Se alle spillemaskiner i vores <a href="/slot-database">Slot Database</a>.</p>
          </div>
        </noscript>
      </div>
    </>
  );
}
