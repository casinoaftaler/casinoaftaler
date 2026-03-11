import { Link } from "react-router-dom";
import { ArrowRight, Gift, Star, Sparkles, CreditCard, Zap } from "lucide-react";

/**
 * Contextual money-page CTA + sibling cross-links for casino-uden-konto spoke pages.
 * ~8 links per page × 3 pages = ~24 new links.
 */

interface CasinoUdenKontoCrossLinksProps {
  pageName: string;
  currentPath: string;
}

const MONEY_LINKS = [
  {
    to: "/casino-anmeldelser",
    icon: Star,
    title: "Casino Anmeldelser",
    getDesc: (_name: string) =>
      `Sammenlign casinoer med hurtig registrering – vi har testet oprettelsesprocessen.`,
  },
  {
    to: "/casino-bonus",
    icon: Gift,
    title: "Casino Bonus",
    getDesc: (_name: string) =>
      `Se hvilke bonusser der er tilgængelige hos casinoer med hurtig tilmelding.`,
  },
  {
    to: "/nye-casinoer",
    icon: Sparkles,
    title: "Nye Casinoer 2026",
    getDesc: (_name: string) =>
      `Nyeste danske casinoer – mange tilbyder kontoløs oplevelse eller hurtig registrering.`,
  },
  {
    to: "/velkomstbonus",
    icon: CreditCard,
    title: "Velkomstbonus",
    getDesc: (_name: string) =>
      `De bedste velkomsttilbud – tjek om de kræver fuld registrering.`,
  },
];

const SIBLINGS = [
  { to: "/casino-uden-konto", label: "Casino uden Konto Hub" },
  { to: "/casino-uden-konto/pay-n-play", label: "Pay N Play" },
  { to: "/casino-uden-konto/hurtig-registrering", label: "Hurtig Registrering" },
  { to: "/casino-uden-konto/fordele-og-ulemper", label: "Fordele og Ulemper" },
  { to: "/betalingsmetoder/trustly", label: "Trustly" },
];

export function CasinoUdenKontoCrossLinks({ pageName, currentPath }: CasinoUdenKontoCrossLinksProps) {
  const siblings = SIBLINGS.filter((s) => s.to !== currentPath);

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-2xl font-bold flex items-center gap-2">
        <Zap className="h-6 w-6 text-primary" />
        {pageName} – find det rette casino
      </h2>
      <p className="mb-6 text-muted-foreground leading-relaxed">
        Vil du spille uden besværlig registrering? Her finder du de vigtigste ressourcer til at vælge det bedste casino med hurtig adgang.
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
                {getDesc(pageName)}
              </p>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0" />
          </Link>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-border bg-card p-4">
        <p className="text-xs text-muted-foreground uppercase mb-2 flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5" />
          Udforsk casino uden konto
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
