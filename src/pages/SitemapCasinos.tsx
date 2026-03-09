import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { groupAlphabetically } from "@/lib/sitemapUtils";

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
    staleTime: 3600000,
  });
}

export default function SitemapCasinos() {
  const { data: casinos, isLoading } = useSitemapCasinos();
  const grouped = casinos ? groupAlphabetically(casinos, (c) => c.name) : [];

  return (
    <>
      <SEO
        title="Sitemap: Casino Anmeldelser"
        description="Komplet liste over alle casino anmeldelser på Casinoaftaler.dk. Find din næste casino med vores dybdegående anmeldelser."
        noindex
      />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Sitemap: Casino Anmeldelser</h1>
        <p className="text-muted-foreground mb-6">
          Alle casino anmeldelser på Casinoaftaler.dk.
        </p>

        <nav className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          <Link to="/sitemap" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Sitemap
          </Link>
          <span className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground">Casino Anmeldelser</span>
          <Link to="/sitemap/casino-bonus" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Casino Bonus
          </Link>
          <Link to="/sitemap/casinospil" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Casinospil
          </Link>
        </nav>

        {isLoading ? (
          <p className="text-muted-foreground">Indlæser casinoer…</p>
        ) : !casinos?.length ? (
          <p className="text-muted-foreground">Ingen casinoer fundet.</p>
        ) : (
          <>
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
                        <a
                          href={`/casino-anmeldelser/${casino.slug}`}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {casino.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}

        <noscript>
          <div>
            <p>Se alle casino anmeldelser på <a href="/casino-anmeldelser">Casino Anmeldelser</a>.</p>
          </div>
        </noscript>
      </div>
    </>
  );
}
