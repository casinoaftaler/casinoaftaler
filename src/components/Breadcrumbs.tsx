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
  "/no-sticky-bonus": "No-Sticky Bonus",
  "/sticky-bonus": "Sticky Bonus",
  "/betalingsmetoder": "Betalingsmetoder",
  "/betalingsmetoder/apple-pay": "Apple Pay",
  "/betalingsmetoder/mobilepay": "MobilePay",
  "/betalingsmetoder/paypal": "PayPal",
  "/betalingsmetoder/skrill": "Skrill",
  "/betalingsmetoder/trustly": "Trustly",
  "/betalingsmetoder/zimpler": "Zimpler",
  "/betalingsmetoder/paysafecard": "Paysafecard",
  "/betalingsmetoder/bankoverforsler": "Bankoverførsler",
  "/betalingsmetoder/visa-mastercard": "Visa / Mastercard",
  "/betalingsmetoder/revolut": "Revolut",
  "/spiludviklere": "Spiludviklere",
  "/spiludviklere/netent": "NetEnt",
  "/spiludviklere/pragmatic-play": "Pragmatic Play",
  "/spiludviklere/relax-gaming": "Relax Gaming",
  "/spiludviklere/play-n-go": "Play'n GO",
  "/spiludviklere/hacksaw-gaming": "Hacksaw Gaming",
  "/spiludviklere/nolimit-city": "Nolimit City",
  "/spiludviklere/yggdrasil": "Yggdrasil",
  "/spiludviklere/microgaming": "Microgaming",
  "/spiludviklere/red-tiger": "Red Tiger",
  "/spiludviklere/big-time-gaming": "Big Time Gaming",
  "/spiludviklere/elk-studios": "ELK Studios",
  "/spiludviklere/evolution-gaming": "Evolution Gaming",
  "/responsible-gaming": "Ansvarligt Spil",
  "/om": "Om Teamet",
  "/forretningsmodel": "Forretningsmodel",
  "/redaktionel-politik": "Redaktionel Politik",
  "/contact": "Kontakt",
  "/privacy": "Privatlivspolitik",
  "/terms": "Vilkår",
  "/cookies": "Cookies",
  "/butik": "Butik",
  "/highlights": "Highlights",
  "/forfatter": "Forfattere",
  "/forfatter/jonas": "Jonas",
  "/forfatter/kevin": "Kevin",
  "/spillemyndigheden": "Spillemyndigheden",
  "/top-10-casino-online": "Top 10 Casino Online",
  "/casino-anmeldelser": "Casino Anmeldelser",
  "/spilleautomaten-anmeldelse": "Spilleautomaten",
  "/campobet-anmeldelse": "Campobet",
  "/betinia-anmeldelse": "Betinia",
  "/swift-casino-anmeldelse": "Swift Casino",
  "/luna-casino-anmeldelse": "Luna Casino",
  "/spildansknu-anmeldelse": "SpilDanskNu",
  "/casino-anmeldelser/danske-spil": "Danske Spil Casino",
  "/casino-anmeldelser/comeon": "ComeOn Casino",
  "/casino-anmeldelser/getlucky": "GetLucky Casino",
  "/casino-anmeldelser/mr-green": "Mr Green Casino",
  "/casino-anmeldelser/videoslots": "Videoslots Casino",
  "/casino-anmeldelser/mr-vegas": "Mr Vegas Casino",
  "/casino-anmeldelser/leovegas": "LeoVegas Casino",
  "/casino-anmeldelser/expekt": "Expekt",
  "/casino-anmeldelser/betano": "Betano",
  "/casino-anmeldelser/888-casino": "888 Casino",
  "/casino-anmeldelser/unibet": "Unibet",
  "/casino-anmeldelser/bet365": "bet365",
  "/casino-anmeldelser/royal-casino": "Royal Casino",
  "/casino-anmeldelser/maria-casino": "Maria Casino",
  "/casino-anmeldelser/kapow-casino": "Kapow Casino",
  "/casino-anmeldelser/nordicbet": "NordicBet",
  "/casino-anmeldelser/one-casino": "One Casino",
  "/casino-anmeldelser/spilnu": "Spilnu",
  "/casino-anmeldelser/stake-casino": "Stake Casino",
  "/casino-anmeldelser/casinostuen": "Casinostuen",
  "/casino-anmeldelser/pokerstars": "PokerStars",
  "/casino-anmeldelser/bwin": "bwin",
  "/casino-anmeldelser/marathonbet": "MarathonBet",
  "/casinospil": "Casinospil",
  "/casinospil/spillemaskiner": "Spillemaskiner",
  "/casinospil/spillemaskiner/hoej-rtp": "Høj RTP",
  "/casinospil/blackjack": "Blackjack",
  "/casinospil/roulette": "Roulette",
  "/casinospil/poker": "Poker",
  "/casinospil/craps": "Craps",
  "/casinospil/baccarat": "Baccarat",
  "/casinospil/roulette-strategi": "Roulette Strategi",
  "/casinospil/online-lotteri": "Online Lotteri",
  "/casinospil/game-shows": "Game Shows",
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
