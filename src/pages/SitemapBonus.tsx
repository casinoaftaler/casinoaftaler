import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { seoRoutes } from "@/lib/seoRoutes";

/** Extract all bonus-related routes from seoRoutes */
function getBonusRoutes() {
  const bonusPrefixes = [
    "/casino-bonus", "/velkomstbonus", "/free-spins", "/indskudsbonus",
    "/omsaetningskrav", "/bonus-uden", "/no-sticky", "/sticky-bonus",
    "/bonus-buy", "/vip-program",
  ];

  return seoRoutes.filter((r) =>
    bonusPrefixes.some((p) => r.path.startsWith(p))
  );
}

function pathToLabel(path: string): string {
  return path
    .split("/")
    .filter(Boolean)
    .pop()!
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SitemapBonus() {
  const bonusRoutes = getBonusRoutes();

  // Group into categories
  const groups: { title: string; routes: typeof bonusRoutes }[] = [
    { title: "Velkomstbonus & Indskudsbonus", routes: bonusRoutes.filter((r) => r.path.includes("velkomstbonus") || r.path.includes("indskudsbonus")) },
    { title: "Free Spins", routes: bonusRoutes.filter((r) => r.path.includes("free-spins")) },
    { title: "Casino Bonus Guides", routes: bonusRoutes.filter((r) => r.path.startsWith("/casino-bonus")) },
    { title: "Omsætningskrav & Vilkår", routes: bonusRoutes.filter((r) => r.path.includes("omsaetningskrav") || r.path.includes("no-sticky") || r.path.includes("sticky-bonus")) },
    { title: "Bonus uden Indbetaling", routes: bonusRoutes.filter((r) => r.path.includes("bonus-uden")) },
    { title: "Bonus Buy & VIP", routes: bonusRoutes.filter((r) => r.path.includes("bonus-buy") || r.path.includes("vip-program")) },
  ].filter((g) => g.routes.length > 0);

  // Catch any remaining
  const usedPaths = new Set(groups.flatMap((g) => g.routes.map((r) => r.path)));
  const remaining = bonusRoutes.filter((r) => !usedPaths.has(r.path));
  if (remaining.length > 0) {
    groups.push({ title: "Øvrige Bonusguides", routes: remaining });
  }

  return (
    <>
      <SEO
        title="Sitemap: Casino Bonus"
        description="Komplet oversigt over alle casino bonus guides på Casinoaftaler.dk – velkomstbonus, free spins, omsætningskrav og mere."
        noindex
      />
      <div className="container py-4">
        <Breadcrumbs />
      </div>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Sitemap: Casino Bonus</h1>
        <p className="text-muted-foreground mb-6">
          Alle bonusguides og tilbud på Casinoaftaler.dk.
        </p>

        <nav className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          <Link to="/sitemap" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Sitemap
          </Link>
          <Link to="/sitemap/casino-anmeldelser" className="px-3 py-1.5 text-sm font-medium rounded-md bg-muted text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
            Casino Anmeldelser
          </Link>
          <span className="px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground">Casino Bonus</span>
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
      </div>
    </>
  );
}
