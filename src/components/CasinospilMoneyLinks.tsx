import { Link } from "react-router-dom";
import { ArrowRight, Gift, Star, Sparkles, CreditCard, Gamepad2, ShieldCheck } from "lucide-react";

/**
 * Contextual money-page CTA + sibling cross-links for casinospil spoke pages.
 * Bridges informational game-guide intent → commercial pages.
 * Now includes direct links to specific casino reviews for authority flow.
 * ~14 links per page × 29 pages = ~400+ money-page links.
 */

interface CasinospilMoneyLinksProps {
  gameName: string;
  currentPath: string;
}

const MONEY_LINKS = [
  {
    to: "/casino-anmeldelser",
    icon: Star,
    title: "Casino Anmeldelser",
    getDesc: (name: string) =>
      `Find det bedste casino til ${name} – vi har testet udvalget hos 29 danske casinoer.`,
  },
  {
    to: "/casino-bonus",
    icon: Gift,
    title: "Casino Bonus Guide",
    getDesc: (name: string) =>
      `Sammenlign bonusser og omsætningskrav – se hvilke tilbud der passer bedst til ${name}.`,
  },
  {
    to: "/nye-casinoer",
    icon: Sparkles,
    title: "Nye Casinoer 2026",
    getDesc: (name: string) =>
      `De nyeste danske casinoer med ${name} og et stort udvalg af bordspil.`,
  },
  {
    to: "/velkomstbonus",
    icon: CreditCard,
    title: "Velkomstbonus",
    getDesc: (_name: string) =>
      `Få det bedste velkomsttilbud – tjek om bordspil bidrager til omsætningskrav.`,
  },
];

/** Top-rated casinos with strong table game selection for direct review links */
const TOP_TABLE_CASINOS = [
  { slug: "betinia", name: "Betinia", score: 4.9 },
  { slug: "spilleautomaten", name: "Spilleautomaten", score: 4.8 },
  { slug: "campobet", name: "Campobet", score: 4.7 },
  { slug: "leovegas", name: "LeoVegas", score: 4.5 },
  { slug: "bet365", name: "Bet365", score: 4.4 },
  { slug: "unibet", name: "Unibet", score: 4.3 },
];

/** All casinospil sibling pages for cross-linking */
const CASINOSPIL_SIBLINGS = [
  // Hub
  { to: "/casinospil", label: "Casinospil Hub" },
  // Blackjack cluster
  { to: "/casinospil/blackjack", label: "Blackjack" },
  { to: "/casinospil/blackjack/amerikansk-blackjack", label: "Amerikansk Blackjack" },
  { to: "/casinospil/blackjack/europaeisk-blackjack", label: "Europæisk Blackjack" },
  { to: "/casinospil/blackjack/double-exposure-blackjack", label: "Double Exposure" },
  { to: "/casinospil/blackjack/spanish-21", label: "Spanish 21" },
  { to: "/casinospil/blackjack/martingale", label: "Martingale (BJ)" },
  { to: "/casinospil/blackjack/fibonacci", label: "Fibonacci (BJ)" },
  { to: "/casinospil/blackjack/dalembert-system", label: "D'Alembert (BJ)" },
  // Roulette cluster
  { to: "/casinospil/roulette", label: "Roulette" },
  { to: "/casinospil/roulette/fransk-roulette", label: "Fransk Roulette" },
  { to: "/casinospil/roulette/europaeisk-roulette", label: "Europæisk Roulette" },
  { to: "/casinospil/roulette/amerikansk-roulette", label: "Amerikansk Roulette" },
  { to: "/casinospil/roulette/martingale-roulette", label: "Martingale (Roulette)" },
  { to: "/casinospil/roulette/fibonacci-roulette", label: "Fibonacci (Roulette)" },
  { to: "/casinospil/roulette/labouchere-roulette", label: "Labouchère" },
  { to: "/casinospil/roulette/james-bond-roulette", label: "James Bond" },
  { to: "/casinospil/roulette-strategi", label: "Roulette Strategi" },
  // Poker cluster
  { to: "/casinospil/poker", label: "Poker" },
  { to: "/casinospil/poker/texas-holdem", label: "Texas Hold'em" },
  { to: "/casinospil/poker/omaha", label: "Omaha" },
  { to: "/casinospil/poker/three-card-poker", label: "Three Card Poker" },
  { to: "/casinospil/poker/caribbean-stud", label: "Caribbean Stud" },
  { to: "/casinospil/poker/video-poker", label: "Video Poker" },
  { to: "/casinospil/poker/poker-strategi", label: "Poker Strategi" },
  // Other
  { to: "/casinospil/baccarat", label: "Baccarat" },
  { to: "/casinospil/craps", label: "Craps" },
  { to: "/casinospil/spillemaskiner", label: "Spillemaskiner" },
  { to: "/casinospil/online-lotteri", label: "Online Lotteri" },
  { to: "/live-casino/game-shows", label: "Game Shows" },
];

function simpleHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Determine which cluster a path belongs to for smart sibling selection.
 */
function getClusterSiblings(currentPath: string) {
  const all = CASINOSPIL_SIBLINGS.filter((s) => s.to !== currentPath);

  const isBlackjack = currentPath.includes("/blackjack");
  const isRoulette = currentPath.includes("/roulette");
  const isPoker = currentPath.includes("/poker");

  const sameCluster = all.filter((s) => {
    if (isBlackjack) return s.to.includes("/blackjack");
    if (isRoulette) return s.to.includes("/roulette");
    if (isPoker) return s.to.includes("/poker");
    return false;
  });

  const crossCluster = all.filter((s) => !sameCluster.includes(s));

  return [...sameCluster.slice(0, 4), ...crossCluster.slice(0, 3)];
}

/**
 * Get rotated casino review links based on current path hash.
 */
function getReviewLinks(currentPath: string) {
  const hash = simpleHash(currentPath);
  const offset = hash % TOP_TABLE_CASINOS.length;
  return [...TOP_TABLE_CASINOS, ...TOP_TABLE_CASINOS].slice(offset, offset + 4);
}

export function CasinospilMoneyLinks({ gameName, currentPath }: CasinospilMoneyLinksProps) {
  const siblings = getClusterSiblings(currentPath);
  const reviewCasinos = getReviewLinks(currentPath);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
        <Gamepad2 className="h-6 w-6 text-primary" />
        Spil {gameName} hos de bedste casinoer
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Klar til at spille {gameName}? Her finder du de vigtigste ressourcer til at vælge det rette casino og den bedste bonus.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {MONEY_LINKS.map(({ to, icon: Icon, title, getDesc }) => (
          <Link
            key={to}
            to={to}
            className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/50"
          >
            <Icon className="mt-0.5 h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getDesc(gameName)}
              </p>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Direct links to specific casino reviews */}
      <div className="mt-4 rounded-lg border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          Bedste casinoer til {gameName}
        </p>
        <div className="flex flex-wrap gap-2">
          {reviewCasinos.map(({ slug, name, score }) => (
            <Link
              key={slug}
              to={`/casino-anmeldelser/${slug}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Star className="h-3 w-3 text-primary" />
              {name}
              <span className="text-muted-foreground">({score})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Cross-links to sibling casinospil pages */}
      <div className="mt-3 rounded-lg border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
          <Gamepad2 className="h-3.5 w-3.5" />
          Udforsk flere casinospil
        </p>
        <div className="flex flex-wrap gap-2">
          {siblings.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
