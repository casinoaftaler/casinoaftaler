import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { seoRoutes } from "@/lib/seoRoutes";

// ── Static sitemap grouping ──

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

/** Group routes alphabetically by their label's first character */
function groupByLetter(routes: typeof seoRoutes): { letter: string; items: { path: string; label: string }[] }[] {
  const labeled = routes
    .map((r) => ({ path: r.path, label: pathToLabel(r.path) }))
    .sort((a, b) => a.label.localeCompare(b.label, "da"));

  const map = new Map<string, { path: string; label: string }[]>();
  for (const item of labeled) {
    const first = item.label.charAt(0).toUpperCase();
    const letter = /[A-ZÆØÅ]/.test(first) ? first : "#";
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(item);
  }

  // Sort letters: # first, then A-Å in Danish order
  const sorted = [...map.entries()].sort((a, b) => {
    if (a[0] === "#") return -1;
    if (b[0] === "#") return 1;
    return a[0].localeCompare(b[0], "da");
  });

  return sorted.map(([letter, items]) => ({ letter, items }));
}

export default function Sitemap() {
  const groups = groupRoutes();

  return (
    <>
      <SEO
        title="Sitemap"
        description="Komplet oversigt over alle sider på Casinoaftaler.dk – find hurtigt casino anmeldelser, bonusguides, spiludviklere og meget mere."
        noindex
      />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Sitemap</h1>
        <p className="text-muted-foreground mb-6">
          Komplet oversigt over alle sider på vores website.
        </p>

        {/* Navigation to sub-sitemaps */}
        <nav className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          <span className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground">Sitemap</span>
          <Link to="/sitemap/casino-anmeldelser" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Casino Anmeldelser
          </Link>
          <Link to="/sitemap/casino-bonus" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Casino Bonus
          </Link>
          <Link to="/sitemap/casinospil" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Casinospil
          </Link>
        </nav>

        {groups.map((group) => {
          const letterGroups = groupByLetter(group.routes);
          const isSmallGroup = group.routes.length <= 5;

          return (
            <section key={group.title} className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-foreground border-b border-border pb-2">{group.title}</h2>

              {isSmallGroup ? (
                /* Small groups: simple list, no letter headers */
                <ul className="space-y-1.5 ml-1">
                  {group.routes
                    .map((r) => ({ path: r.path, label: pathToLabel(r.path) }))
                    .sort((a, b) => a.label.localeCompare(b.label, "da"))
                    .map((item) => (
                      <li key={item.path}>
                        <a href={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {item.label}
                        </a>
                      </li>
                    ))}
                </ul>
              ) : (
                /* Larger groups: alphabetical letter headers in multi-column grid */
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {letterGroups.map(({ letter, items }) => (
                    <div key={letter}>
                      <h3 className="text-base font-semibold text-foreground mb-2">{letter}</h3>
                      <ul className="space-y-1.5">
                        {items.map((item) => (
                          <li key={item.path}>
                            <a href={item.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        <noscript>
          <div>
            <h2>Casino Anmeldelser</h2>
            <p>Se alle vores casino anmeldelser på <a href="/sitemap/casino-anmeldelser">Casino Anmeldelser Sitemap</a>.</p>
            <h2>Casino Bonus</h2>
            <p>Se alle bonustilbud på <a href="/sitemap/casino-bonus">Casino Bonus Sitemap</a>.</p>
            <h2>Casinospil</h2>
            <p>Se alle spillemaskiner på <a href="/sitemap/casinospil">Casinospil Sitemap</a>.</p>
            <h2>Komplet Slot Katalog</h2>
            <p>Se alle 1.400+ spillemaskiner med direkte links: <a href="/slot-directory.html">Slot Directory</a>.</p>
          </div>
        </noscript>
      </div>
    </>
  );
}
