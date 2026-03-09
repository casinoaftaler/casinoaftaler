import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { seoRoutes } from "@/lib/seoRoutes";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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

export default function Sitemap() {
  const groups = groupRoutes();

  return (
    <>
      <SEO
        title="Sitemap"
        description="Komplet oversigt over alle sider på Casinoaftaler.dk – find hurtigt casino anmeldelser, bonusguides, spiludviklere og meget mere."
        noindex
      />
      <div className="container py-4">
        <Breadcrumbs />
      </div>
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="text-lg font-semibold mb-3 text-foreground">{group.title}</h2>
              <ul className="space-y-1.5">
                {group.routes.map((route) => (
                  <li key={route.path}>
                    <a
                      href={route.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {pathToLabel(route.path)}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <noscript>
          <div>
            <h2>Casino Anmeldelser</h2>
            <p>Se alle vores casino anmeldelser på <a href="/sitemap/casino-anmeldelser">Casino Anmeldelser Sitemap</a>.</p>
            <h2>Casino Bonus</h2>
            <p>Se alle bonustilbud på <a href="/sitemap/casino-bonus">Casino Bonus Sitemap</a>.</p>
            <h2>Casinospil</h2>
            <p>Se alle spillemaskiner på <a href="/sitemap/casinospil">Casinospil Sitemap</a>.</p>
          </div>
        </noscript>
      </div>
    </>
  );
}
