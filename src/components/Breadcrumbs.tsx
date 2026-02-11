import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

const routeLabels: Record<string, string> = {
  "/": "Forside",
  "/nye-casinoer": "Nye Casinoer",
  "/live-casino": "Live Casino",
  "/bonus-guide": "Casino Bonus Guide",
  "/free-spins": "Free Spins",
  "/velkomstbonus": "Velkomstbonus",
  "/omsaetningskrav": "Omsætningskrav",
  "/indskudsbonus": "Indskudsbonus",
  "/bonus-uden-indbetaling": "Bonus uden Indbetaling",
  "/bonus-uden-omsaetningskrav": "Bonus uden Omsætningskrav",
  "/betalingsmetoder": "Betalingsmetoder",
  "/spiludviklere": "Spiludviklere",
  "/responsible-gaming": "Ansvarligt Spil",
  "/about": "Om Os",
  "/contact": "Kontakt",
  "/privacy": "Privatlivspolitik",
  "/terms": "Vilkår",
  "/cookies": "Cookies",
  "/butik": "Butik",
  "/highlights": "Highlights",
};

const BASE_URL = "https://bonushuset-buddy.lovable.app";

export function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't show breadcrumbs on home page or community/slot pages
  if (pathname === "/" || pathname.startsWith("/community/") || pathname.startsWith("/casino/") || pathname.startsWith("/auth") || pathname.startsWith("/admin") || pathname.startsWith("/profil") || pathname.startsWith("/u/")) {
    return null;
  }

  const label = routeLabels[pathname] || pathname.replace(/^\//, "").replace(/-/g, " ");

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Forside",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${BASE_URL}${pathname}`,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="container py-3">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-3.5 w-3.5" />
              <span>Forside</span>
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <span className="font-medium text-foreground">{label}</span>
          </li>
        </ol>
      </nav>
    </>
  );
}
