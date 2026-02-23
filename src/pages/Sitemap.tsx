import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { seoRoutes } from "@/lib/seoRoutes";

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
    { title: "Info & Ansvarligt Spil", prefix: "/ansvarligt-spil|/spillemyndigheden|/om|/forretningsmodel|/redaktionel|/kontakt|/forfatter|/saadan-tester|/privatlivspolitik|/terms|/cookies|/top-10" },
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

  // Catch any remaining
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
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
        <p className="text-muted-foreground mb-8">
          Her finder du en komplet oversigt over alle sider på vores website. Klik på et link for at navigere direkte til siden.
        </p>

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
      </div>
    </>
  );
}
