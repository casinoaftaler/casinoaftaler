import { Link } from "react-router-dom";
import { ArrowRight, Gift, Star, Sparkles, CreditCard, Tv } from "lucide-react";

/**
 * Contextual money-page CTA section for live casino spoke pages.
 * Bridges informational live-casino intent → commercial pages.
 * ~5 links per page × 8 pages = ~40 new money-page links.
 */

interface LiveCasinoMoneyLinksProps {
  gameName: string;
  currentPath: string;
}

const MONEY_LINKS = [
  {
    to: "/casino-anmeldelser",
    icon: Star,
    title: "Casino Anmeldelser",
    getDesc: (name: string) =>
      `Find det bedste casino til ${name} – vi har testet live casino-udvalget hos 29 danske casinoer.`,
  },
  {
    to: "/casino-bonus",
    icon: Gift,
    title: "Casino Bonus Guide",
    getDesc: (_name: string) =>
      `Sammenlign bonusser – husk at live casino typisk bidrager 10 % til omsætningskrav.`,
  },
  {
    to: "/nye-casinoer",
    icon: Sparkles,
    title: "Nye Casinoer 2026",
    getDesc: (name: string) =>
      `De nyeste danske casinoer med ${name} og hele Evolutions live-portefølje.`,
  },
  {
    to: "/velkomstbonus",
    icon: CreditCard,
    title: "Velkomstbonus",
    getDesc: (_name: string) =>
      `Få det bedste velkomsttilbud – vær opmærksom på live casino-bidrag til wagering.`,
  },
];

/** Sibling live casino pages for cross-linking */
const LIVE_CASINO_SIBLINGS = [
  { to: "/live-casino/crazy-time", label: "Crazy Time" },
  { to: "/live-casino/blackjack", label: "Live Blackjack" },
  { to: "/live-casino/roulette", label: "Live Roulette" },
  { to: "/live-casino/lightning-roulette", label: "Lightning Roulette" },
  { to: "/live-casino/baccarat", label: "Live Baccarat" },
  { to: "/live-casino/dream-catcher", label: "Dream Catcher" },
  { to: "/live-casino/deal-or-no-deal", label: "Deal or No Deal" },
  { to: "/live-casino/monopoly-live", label: "Monopoly Live" },
  { to: "/live-casino/game-shows", label: "Alle Game Shows" },
  { to: "/live-casino/strategi", label: "Live Casino Strategi" },
  { to: "/live-casino/udbydere", label: "Live Casino Udbydere" },
];

export function LiveCasinoMoneyLinks({ gameName, currentPath }: LiveCasinoMoneyLinksProps) {
  const siblings = LIVE_CASINO_SIBLINGS.filter((s) => s.to !== currentPath).slice(0, 4);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
        <Tv className="h-6 w-6 text-primary" />
        Spil {gameName} hos de bedste casinoer
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Klar til at prøve {gameName}? Her finder du de vigtigste ressourcer til at vælge det rette casino og den bedste bonus.
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

      {/* Cross-links to sibling live casino pages */}
      <div className="mt-4 rounded-lg border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
          <Tv className="h-3.5 w-3.5" />
          Udforsk flere live casino-spil
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
