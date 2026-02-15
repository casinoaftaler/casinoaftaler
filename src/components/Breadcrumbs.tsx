import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

const routeLabels: Record<string, string> = {
  "/": "Forside",
  "/nye-casinoer": "Nye Casinoer",
  "/live-casino": "Live Casino",
  "/casino-bonus": "Casino Bonus",
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
  "/casinospil": "Casinospil",
  "/casinospil/spillemaskiner": "Spillemaskiner",
  "/casinospil/spillemaskiner/hoej-rtp": "Høj RTP",
};

const BASE_URL = "https://casinoaftaler.dk";

export function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname;

  // Don't show breadcrumbs on home page or community/slot pages
  if (pathname === "/" || pathname.startsWith("/community/") || pathname.startsWith("/casino/") || pathname.startsWith("/auth") || pathname.startsWith("/admin") || pathname.startsWith("/profil") || pathname.startsWith("/u/")) {
    return null;
  }

  const label = routeLabels[pathname] || pathname.replace(/^\//, "").replace(/-/g, " ");

  // Build breadcrumb segments for nested routes
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbItems: { name: string; path: string }[] = [
    { name: "Forside", path: "/" },
  ];

  if (segments.length > 1) {
    // Add intermediate segments (e.g. /casinospil for /casinospil/spillemaskiner)
    let currentPath = "";
    for (let i = 0; i < segments.length - 1; i++) {
      currentPath += `/${segments[i]}`;
      const parentLabel = routeLabels[currentPath] || segments[i].replace(/-/g, " ");
      breadcrumbItems.push({ name: parentLabel, path: currentPath });
    }
  }

  breadcrumbItems.push({ name: label, path: pathname });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="container py-3">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-medium text-foreground">{item.name}</span>
              ) : index === 0 ? (
                <Link to={item.path} className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Home className="h-3.5 w-3.5" />
                  <span>{item.name}</span>
                </Link>
              ) : (
                <Link to={item.path} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
